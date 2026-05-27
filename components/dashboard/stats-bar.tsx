import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Star, CheckCircle, TrendingUp } from "lucide-react";
import type { DashboardStats } from "@/types";

interface StatsBarProps {
  stats: DashboardStats;
}

export function StatsBar({ stats }: StatsBarProps) {
  const items = [
    {
      label: "Total Reviews",
      value: stats.totalReviews.toLocaleString("en-IN"),
      icon: MessageSquare,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Avg Rating",
      value: stats.avgRating.toFixed(1),
      icon: Star,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-950",
      suffix: "/ 5",
    },
    {
      label: "Replied",
      value: `${stats.repliedPercent}%`,
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950",
    },
    {
      label: "This Month",
      value: `+${stats.newThisMonth}`,
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950",
      suffix: "new",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <p className="text-2xl font-bold">{item.value}</p>
                    {item.suffix && (
                      <span className="text-sm text-muted-foreground">{item.suffix}</span>
                    )}
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
