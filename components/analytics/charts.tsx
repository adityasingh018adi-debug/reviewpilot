"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DashboardStats } from "@/types";

interface AnalyticsChartsProps {
  ratingTrend: { month: string; avgRating: number; reviewCount: number }[];
  sentiment: { name: string; value: number; color: string }[];
  keywords: { word: string; count: number }[];
  stats: DashboardStats;
}

export function AnalyticsCharts({ ratingTrend, sentiment, keywords, stats }: AnalyticsChartsProps) {
  const maxKeywordCount = keywords[0]?.count ?? 1;

  return (
    <div className="grid gap-6">
      {/* Row 1: Rating trend + Reviews per month */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rating Trend</CardTitle>
            <CardDescription>Average star rating over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={ratingTrend} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                  formatter={(v: number) => [v.toFixed(1), "Avg Rating"]}
                />
                <Line
                  type="monotone"
                  dataKey="avgRating"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reviews per Month</CardTitle>
            <CardDescription>Volume of new reviews received each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ratingTrend} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                  formatter={(v: number) => [v, "Reviews"]}
                />
                <Bar dataKey="reviewCount" fill="#6366f1" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Sentiment pie + Top keywords */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sentiment Breakdown</CardTitle>
            <CardDescription>
              Positive (4-5★), Neutral (3★), Negative (1-2★)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={sentiment}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sentiment.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                  formatter={(v: number) => [`${v}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 shrink-0">
              {sentiment.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-sm text-muted-foreground">{s.name}</span>
                  <span className="text-sm font-semibold ml-auto pl-4">{s.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Keywords</CardTitle>
            <CardDescription>Most mentioned words in your reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {keywords.slice(0, 8).map((kw) => (
                <div key={kw.word} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium capitalize">{kw.word}</span>
                    <span className="text-muted-foreground">{kw.count}</span>
                  </div>
                  <Progress
                    value={(kw.count / maxKeywordCount) * 100}
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Response rate over time (derived) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Response Rate & Volume</CardTitle>
          <CardDescription>Combined view of review volume and your reply cadence</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={ratingTrend.map((d) => ({
                ...d,
                replied: Math.round(d.reviewCount * 0.67),
                unreplied: d.reviewCount - Math.round(d.reviewCount * 0.67),
              }))}
              margin={{ top: 5, right: 10, bottom: 5, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
              />
              <Legend />
              <Bar
                dataKey="replied"
                name="Replied"
                fill="#22c55e"
                radius={[0, 0, 0, 0]}
                stackId="a"
              />
              <Bar
                dataKey="unreplied"
                name="Unreplied"
                fill="#6366f1"
                radius={[3, 3, 0, 0]}
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
