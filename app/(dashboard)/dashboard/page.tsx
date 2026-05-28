export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { StatsBar } from "@/components/dashboard/stats-bar";
import { ReviewFeed } from "@/components/dashboard/review-feed";
import { FeatureSlides } from "@/components/dashboard/feature-slides";
import { ReviewHeroAnimation } from "@/components/dashboard/review-hero-animation";
import { Button } from "@/components/ui/button";
import { MOCK_REVIEWS, MOCK_STATS, MOCK_BUSINESS } from "@/lib/mock-data";
import { RefreshCw, Wifi, QrCode, Sparkles, TrendingUp, ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Dashboard — ReviewPilot" };

async function getDashboardData() {
  return {
    stats: MOCK_STATS,
    reviews: MOCK_REVIEWS,
    business: MOCK_BUSINESS,
    lastSynced: new Date().toISOString(),
  };
}

export default async function DashboardPage() {
  const { stats, reviews, business, lastSynced } = await getDashboardData();

  const lastSyncedFormatted = new Date(lastSynced).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in mesh-gradient min-h-screen">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text">{business.name}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {business.category} · {business.location}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/60 border border-border px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Wifi className="h-3 w-3 text-green-500" />
            Synced at {lastSyncedFormatted}
          </div>
          <form action="/api/reviews/sync" method="POST">
            <Button type="submit" variant="outline" size="sm" className="gap-1.5 bg-white/70 backdrop-blur-sm">
              <RefreshCw className="h-3.5 w-3.5" />
              Sync
            </Button>
          </form>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <Suspense fallback={
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl skeleton" />
          ))}
        </div>
      }>
        <StatsBar stats={stats} />
      </Suspense>

      {/* ── Hero animation + quick actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 3D animation card */}
        <div className="rounded-2xl overflow-hidden relative" style={{ background: "#0C1020", border: "1px solid #1E2540" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(123,92,255,0.08) 0%, transparent 65%)" }} />
          <div className="relative p-4 pb-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7B5CFF,#00CFFF)" }}>
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <p className="font-bold text-sm" style={{ color: "#E4E8F7" }}>How ReviewPilot Works</p>
          </div>
          <ReviewHeroAnimation />
        </div>

        {/* Quick actions column */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard/qr-reviews"
            className="group flex items-center gap-4 p-5 rounded-2xl text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#7B5CFF,#6366F1)", boxShadow: "0 8px 24px rgba(123,92,255,0.3)" }}>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold">QR Review Generator</p>
              <p className="text-sm text-white/70">Customers scan → AI writes → they post</p>
            </div>
            <ArrowRight className="h-5 w-5 text-white/50 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/dashboard/ai-replies"
            className="group flex items-center gap-4 p-5 rounded-2xl text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#00CFFF,#0891B2)", boxShadow: "0 8px 24px rgba(0,207,255,0.2)" }}>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold">AI Reply Studio</p>
              <p className="text-sm text-white/70">15 languages · 4 tones · 5-min human delay</p>
            </div>
            <ArrowRight className="h-5 w-5 text-white/50 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/dashboard/tools"
            className="group flex items-center gap-4 p-5 rounded-2xl text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#FFB020,#F97316)", boxShadow: "0 8px 24px rgba(255,176,32,0.2)" }}>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold">All 18 Tools</p>
              <p className="text-sm text-white/70">Every feature in one place</p>
            </div>
            <ArrowRight className="h-5 w-5 text-white/50 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Feature Slides ── */}
      <div className="rounded-2xl p-5" style={{ background: "#0C1020", border: "1px solid #1E2540" }}>
        <FeatureSlides />
      </div>

      {/* ── Review feed ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-violet-500" />
            Recent Reviews
          </h2>
          <Link
            href="/dashboard/reviews"
            className="text-sm text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <ReviewFeed reviews={reviews} />
      </div>
    </div>
  );
}
