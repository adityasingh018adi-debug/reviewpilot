import Razorpay from "razorpay";

// Lazily instantiated so build-time doesn't fail when env vars are missing
let _razorpay: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!_razorpay) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set");
    }
    _razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return _razorpay;
}

// Convenience alias — use getRazorpay() in route handlers instead
export const razorpay = { get instance() { return getRazorpay(); } };

export const PLANS = {
  FREE: {
    id: "FREE",
    name: "Free Trial",
    price: 0,
    currency: "INR",
    trialDays: 14,
    features: [
      "14-day free trial — all features included",
      "Unlimited AI replies during trial",
      "20+ language auto-detection",
      "Negative review alerts",
      "Analytics dashboard",
      "Daily email digest",
    ],
    limits: { locations: 1, aiRepliesPerMonth: Infinity },
    razorpayPlanId: null,
  },
  STARTER: {
    id: "STARTER",
    name: "Pro",
    price: 399,
    currency: "INR",
    trialDays: 0,
    features: [
      "Unlimited AI replies",
      "20+ languages auto-detected",
      "Negative review alerts",
      "Analytics & rating trends",
      "Daily email digest",
      "1 business location",
      "Google Business Profile sync",
      "Priority support",
    ],
    limits: { locations: 1, aiRepliesPerMonth: Infinity },
    razorpayPlanId: process.env.RAZORPAY_STARTER_PLAN_ID,
  },
  GROWTH: {
    id: "GROWTH",
    name: "Enterprise",
    price: 799,
    currency: "INR",
    trialDays: 0,
    features: [
      "Everything in Pro",
      "Up to 5 locations",
      "Zomato & Swiggy reviews",
      "WhatsApp alerts & campaigns",
      "Team management",
      "Multi-location analytics",
      "Dedicated account manager",
    ],
    limits: { locations: 5, aiRepliesPerMonth: Infinity },
    razorpayPlanId: process.env.RAZORPAY_GROWTH_PLAN_ID,
  },
} as const;

export type PlanId = keyof typeof PLANS;

// Create a Razorpay subscription for a given plan
export async function createSubscription(
  planId: string,
  customerId?: string
): Promise<{ id: string; short_url: string }> {
  const rp = getRazorpay();
  const subscription = await rp.subscriptions.create({
    plan_id: planId,
    customer_notify: 1,
    total_count: 12,
    ...(customerId ? { customer_id: customerId } : {}),
  });

  return subscription as unknown as { id: string; short_url: string };
}

// Verify Razorpay webhook signature
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

// Create a Razorpay order (for one-time payments or plan upgrades)
export async function createOrder(
  amount: number,
  currency = "INR",
  receipt: string
) {
  const rp = getRazorpay();
  return rp.orders.create({
    amount: amount * 100,
    currency,
    receipt,
  });
}
