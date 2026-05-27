-- ReviewPilot — Supabase SQL Schema
-- Run this in the Supabase SQL editor to set up your database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE plan_type AS ENUM ('FREE', 'STARTER', 'GROWTH');
CREATE TYPE platform_type AS ENUM ('GOOGLE', 'ZOMATO', 'SWIGGY');
CREATE TYPE campaign_type AS ENUM ('EMAIL', 'WHATSAPP');
CREATE TYPE alert_type AS ENUM ('WHATSAPP_NEGATIVE', 'EMAIL_DIGEST');

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id                      TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  email                   TEXT UNIQUE NOT NULL,
  name                    TEXT,
  avatar_url              TEXT,
  plan                    plan_type NOT NULL DEFAULT 'FREE',
  razorpay_subscription_id TEXT,
  razorpay_customer_id    TEXT,
  ai_replies_used         INTEGER NOT NULL DEFAULT 0,
  ai_replies_reset_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  onboarding_completed    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BUSINESSES
-- ============================================================
CREATE TABLE businesses (
  id                   TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id              TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name                 TEXT NOT NULL,
  category             TEXT,
  location             TEXT,
  google_location_id   TEXT,
  google_access_token  TEXT,
  google_refresh_token TEXT,
  google_token_expiry  TIMESTAMPTZ,
  timezone             TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_businesses_user_id ON businesses(user_id);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  business_id      TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  google_review_id TEXT UNIQUE,
  author           TEXT NOT NULL,
  author_photo_url TEXT,
  rating           SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text             TEXT,
  platform         platform_type NOT NULL DEFAULT 'GOOGLE',
  review_date      TIMESTAMPTZ NOT NULL,
  is_answered      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_reviews_business_date ON reviews(business_id, review_date DESC);
CREATE INDEX idx_reviews_business_rating ON reviews(business_id, rating);

-- ============================================================
-- REPLIES
-- ============================================================
CREATE TABLE replies (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  review_id         TEXT UNIQUE NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  ai_generated_text TEXT NOT NULL,
  final_text        TEXT,
  posted_at         TIMESTAMPTZ,
  approved_at       TIMESTAMPTZ,
  approved_by       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CAMPAIGNS
-- ============================================================
CREATE TABLE campaigns (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  business_id  TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  type         campaign_type NOT NULL,
  recipient    TEXT NOT NULL,
  review_link  TEXT NOT NULL,
  sent_at      TIMESTAMPTZ,
  clicked_at   TIMESTAMPTZ,
  reviewed_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_campaigns_business_id ON campaigns(business_id);

-- ============================================================
-- ALERTS
-- ============================================================
CREATE TABLE alerts (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  business_id  TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  type         alert_type NOT NULL,
  enabled      BOOLEAN NOT NULL DEFAULT TRUE,
  config       JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(business_id, type)
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own row
CREATE POLICY "users: own row" ON users
  USING (id = auth.uid()::TEXT)
  WITH CHECK (id = auth.uid()::TEXT);

-- Businesses: scoped to owner
CREATE POLICY "businesses: owner" ON businesses
  USING (user_id = auth.uid()::TEXT)
  WITH CHECK (user_id = auth.uid()::TEXT);

-- Reviews: via business ownership
CREATE POLICY "reviews: via business" ON reviews
  USING (business_id IN (
    SELECT id FROM businesses WHERE user_id = auth.uid()::TEXT
  ));

-- Replies: via review → business ownership
CREATE POLICY "replies: via business" ON replies
  USING (review_id IN (
    SELECT r.id FROM reviews r
    JOIN businesses b ON b.id = r.business_id
    WHERE b.user_id = auth.uid()::TEXT
  ));

-- Campaigns & alerts: scoped to business owner
CREATE POLICY "campaigns: via business" ON campaigns
  USING (business_id IN (
    SELECT id FROM businesses WHERE user_id = auth.uid()::TEXT
  ));

CREATE POLICY "alerts: via business" ON alerts
  USING (business_id IN (
    SELECT id FROM businesses WHERE user_id = auth.uid()::TEXT
  ));

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER trg_replies_updated_at
  BEFORE UPDATE ON replies
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
