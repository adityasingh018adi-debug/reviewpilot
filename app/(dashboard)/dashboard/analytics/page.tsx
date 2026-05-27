export const dynamic = "force-dynamic";

import { AnalyticsCharts } from "@/components/analytics/charts";
import { MOCK_RATING_TREND, MOCK_SENTIMENT, MOCK_TOP_KEYWORDS, MOCK_STATS } from "@/lib/mock-data";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Rating trends, sentiment, and review performance over time
        </p>
      </div>

      <AnalyticsCharts
        ratingTrend={MOCK_RATING_TREND}
        sentiment={MOCK_SENTIMENT}
        keywords={MOCK_TOP_KEYWORDS}
        stats={MOCK_STATS}
      />
    </div>
  );
}
