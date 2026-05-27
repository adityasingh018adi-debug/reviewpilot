export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { StatsBar } from "@/components/dashboard/stats-bar";
import { ReviewFeed } from "@/components/dashboard/review-feed";
import { Button } from "@/components/ui/button";
import { MOCK_REVIEWS, MOCK_STATS, MOCK_BUSINESS } from "@/lib/mock-data";
import { RefreshCw, Wifi } from "lucide-react";

export const metadata = { title: "Dashboard" };

// In production, replace with actual Prisma queries
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
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">{business.name}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {business.category} · {business.location}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Wifi className="h-3 w-3 text-green-500" />
            Synced at {lastSyncedFormatted}
          </div>
          <form action="/api/reviews/sync" method="POST">
            <Button type="submit" variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Sync reviews
            </Button>
          </form>
        </div>
      </div>

      {/* Stats bar */}
      <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({length:4}).map((_,i)=><div key={i} className="h-24 rounded-lg skeleton"/>)}</div>}>
        <StatsBar stats={stats} />
      </Suspense>

      {/* Google connect banner — shown when no Google account linked */}
      {!business.googleLocationId && (
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-medium text-sm text-blue-900 dark:text-blue-100">
              Connect Google My Business
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
              Link your Google Business Profile to pull live reviews and post AI replies automatically.
            </p>
          </div>
          <Button size="sm" variant="default" asChild>
            <a href="/api/auth/google">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Connect Google
            </a>
          </Button>
        </div>
      )}

      {/* Review feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Reviews</h2>
          <span className="text-sm text-muted-foreground">{reviews.length} total</span>
        </div>
        <ReviewFeed reviews={reviews} />
      </div>
    </div>
  );
}
