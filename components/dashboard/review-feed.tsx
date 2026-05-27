"use client";

import { useState, useMemo } from "react";
import { ReviewCard } from "./review-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { ReviewWithReply } from "@/types";
import { InboxIcon } from "lucide-react";

type Filter = "all" | "unanswered" | "1star" | "5star";

interface ReviewFeedProps {
  reviews: ReviewWithReply[];
  loading?: boolean;
}

const filterLabels: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unanswered", label: "Unanswered" },
  { value: "1star", label: "1-star" },
  { value: "5star", label: "5-star" },
];

export function ReviewFeed({ reviews, loading }: ReviewFeedProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    switch (activeFilter) {
      case "unanswered":
        return reviews.filter((r) => !r.isAnswered && !r.reply?.postedAt);
      case "1star":
        return reviews.filter((r) => r.rating === 1);
      case "5star":
        return reviews.filter((r) => r.rating === 5);
      default:
        return reviews;
    }
  }, [reviews, activeFilter]);

  // Count badges for filters
  const counts: Record<Filter, number> = {
    all: reviews.length,
    unanswered: reviews.filter((r) => !r.isAnswered && !r.reply?.postedAt).length,
    "1star": reviews.filter((r) => r.rating === 1).length,
    "5star": reviews.filter((r) => r.rating === 5).length,
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-5 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-9 w-40" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterLabels.map((f) => (
          <Button
            key={f.value}
            variant={activeFilter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(f.value)}
            className="gap-1.5 h-8"
          >
            {f.label}
            <span className={`text-xs rounded-full px-1.5 py-0 ${activeFilter === f.value ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {counts[f.value]}
            </span>
          </Button>
        ))}
      </div>

      {/* Review cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <InboxIcon className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-medium text-muted-foreground">No reviews found</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            {activeFilter === "unanswered"
              ? "All reviews have been replied to. Great work!"
              : `No ${activeFilter} reviews yet.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
