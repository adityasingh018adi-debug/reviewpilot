"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Sparkles,
  RefreshCw,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Copy,
  Check,
  Zap,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Globe,
  Languages,
} from "lucide-react";
import type { ReviewWithReply } from "@/types";
import { MOCK_REVIEWS, MOCK_BUSINESS } from "@/lib/mock-data";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type ReplyState = {
  text: string;
  isEdited: boolean;
  isPosted: boolean;
  isGenerating: boolean;
};

type FilterTab = "all" | "pending" | "posted";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "h-4 w-4" : "h-3 w-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} ${i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
];

function getRatingColor(rating: number) {
  if (rating >= 4) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (rating === 3) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-rose-600 bg-rose-50 border-rose-200";
}

// ─────────────────────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
      <div className={`p-2.5 rounded-lg ${iconBg} shrink-0`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 truncate">{sub}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Review list item (left panel)
// ─────────────────────────────────────────────────────────────
function ReviewListItem({
  review,
  index,
  isSelected,
  isPosted,
  isPending,
  onClick,
}: {
  review: ReviewWithReply;
  index: number;
  isSelected: boolean;
  isPosted: boolean;
  isPending: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3.5 border-b border-gray-50 transition-all ${
        isSelected
          ? "bg-violet-50 border-l-2 border-l-violet-600"
          : "hover:bg-gray-50/60 border-l-2 border-l-transparent"
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 shrink-0 mt-0.5">
          <AvatarFallback className={`text-xs font-semibold ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
            {getInitials(review.author)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-sm font-semibold text-gray-900 truncate">{review.author}</span>
            {isPosted ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            ) : isPending ? (
              <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            )}
          </div>
          <StarDisplay rating={review.rating} />
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {review.text ?? "(No written review)"}
          </p>
          <p className="text-xs text-gray-400 mt-1.5">{formatDate(review.reviewDate)}</p>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Copy button (small util)
// ─────────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-emerald-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copy
        </>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
interface AIRepliesPageProps {
  reviews?: ReviewWithReply[];
  businessName?: string;
  aiRepliesUsed?: number;
  aiRepliesLimit?: number;
}

export function AIRepliesPage({
  reviews = MOCK_REVIEWS,
  businessName = MOCK_BUSINESS.name,
  aiRepliesUsed = 12,
  aiRepliesLimit = 30,
}: AIRepliesPageProps) {
  const [selectedId, setSelectedId] = useState<string>(reviews[0]?.id ?? "");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [replyStates, setReplyStates] = useState<Record<string, ReplyState>>(() => {
    const initial: Record<string, ReplyState> = {};
    reviews.forEach((r) => {
      initial[r.id] = {
        text: r.reply?.aiGeneratedText ?? "",
        isEdited: false,
        isPosted: !!r.reply?.postedAt,
        isGenerating: false,
      };
    });
    return initial;
  });

  const selectedReview = reviews.find((r) => r.id === selectedId);
  const selectedState = replyStates[selectedId];

  // Filter reviews by tab
  const filteredReviews = reviews.filter((r) => {
    const state = replyStates[r.id];
    if (filterTab === "pending") return !state?.isPosted;
    if (filterTab === "posted") return state?.isPosted;
    return true;
  });

  const postedCount = Object.values(replyStates).filter((s) => s.isPosted).length;
  const pendingCount = reviews.length - postedCount;
  const usagePercent = Math.round((aiRepliesUsed / aiRepliesLimit) * 100);

  const handleRegenerate = useCallback(
    async (reviewId: string) => {
      setReplyStates((prev) => ({
        ...prev,
        [reviewId]: { ...prev[reviewId], isGenerating: true },
      }));

      // In demo mode, simulate a delay + return a mock reply
      await new Promise((res) => setTimeout(res, 1200));

      const review = reviews.find((r) => r.id === reviewId);
      const mockReplies = [
        `Thank you so much for taking the time to share your experience, ${review?.author?.split(" ")[0]}! We truly appreciate your kind words and look forward to welcoming you back soon.`,
        `We're thrilled you enjoyed your visit, ${review?.author?.split(" ")[0]}! Your feedback means everything to our team — see you again!`,
        `Thank you for your honest feedback, ${review?.author?.split(" ")[0]}. We take all reviews seriously and are always working to improve our service for guests like you.`,
      ];
      const newText = mockReplies[Math.floor(Math.random() * mockReplies.length)];

      setReplyStates((prev) => ({
        ...prev,
        [reviewId]: {
          text: newText,
          isEdited: false,
          isPosted: false,
          isGenerating: false,
        },
      }));
    },
    [reviews]
  );

  const handlePost = useCallback((reviewId: string) => {
    setReplyStates((prev) => ({
      ...prev,
      [reviewId]: { ...prev[reviewId], isPosted: true },
    }));
  }, []);

  const handleTextChange = useCallback((reviewId: string, text: string) => {
    setReplyStates((prev) => ({
      ...prev,
      [reviewId]: { ...prev[reviewId], text, isEdited: true },
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              AI Replies
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Review, edit, and post AI-generated replies to your customer reviews.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right mr-1">
              <p className="text-xs text-gray-500 font-medium">Monthly AI usage</p>
              <p className="text-xs text-gray-400">
                {aiRepliesUsed} / {aiRepliesLimit} replies
              </p>
            </div>
            <div className="w-28">
              <Progress
                value={usagePercent}
                className="h-2"
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={MessageSquare}
            label="Total Reviews"
            value={String(reviews.length)}
            sub="across all platforms"
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
          <StatCard
            icon={CheckCircle2}
            label="Replies Posted"
            value={String(postedCount)}
            sub={`${Math.round((postedCount / reviews.length) * 100)}% response rate`}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            icon={Clock}
            label="Awaiting Reply"
            value={String(pendingCount)}
            sub="need your attention"
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
          />
          <StatCard
            icon={Languages}
            label="Languages"
            value="20+"
            sub="auto-detected & matched"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
        </div>

        {/* Main two-panel layout */}
        <div className="flex gap-4 min-h-[600px]">

          {/* ── Left panel: review list ── */}
          <div className="w-80 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
            {/* Tabs */}
            <div className="p-3 border-b border-gray-100">
              <Tabs value={filterTab} onValueChange={(v) => setFilterTab(v as FilterTab)}>
                <TabsList className="w-full h-8 bg-gray-100 p-0.5 rounded-lg">
                  <TabsTrigger
                    value="all"
                    className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md h-7"
                  >
                    All ({reviews.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md h-7"
                  >
                    Pending ({pendingCount})
                  </TabsTrigger>
                  <TabsTrigger
                    value="posted"
                    className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md h-7"
                  >
                    Posted ({postedCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filteredReviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">All caught up!</p>
                  <p className="text-xs text-gray-400 mt-1">No reviews in this category.</p>
                </div>
              ) : (
                filteredReviews.map((review, idx) => (
                  <ReviewListItem
                    key={review.id}
                    review={review}
                    index={idx}
                    isSelected={review.id === selectedId}
                    isPosted={replyStates[review.id]?.isPosted ?? false}
                    isPending={!!(review.reply?.aiGeneratedText) && !replyStates[review.id]?.isPosted}
                    onClick={() => setSelectedId(review.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* ── Right panel: reply editor ── */}
          {selectedReview && selectedState ? (
            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">

              {/* Review header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className={`font-semibold ${AVATAR_COLORS[reviews.indexOf(selectedReview) % AVATAR_COLORS.length]}`}>
                      {getInitials(selectedReview.author)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">{selectedReview.author}</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarDisplay rating={selectedReview.rating} size="md" />
                          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${getRatingColor(selectedReview.rating)}`}>
                            {selectedReview.rating}/5
                          </span>
                          <span className="text-xs text-gray-400">{formatDate(selectedReview.reviewDate)}</span>
                          <Badge
                            variant="outline"
                            className="text-xs text-gray-500 border-gray-200 h-5 px-1.5"
                          >
                            <Globe className="h-3 w-3 mr-1" />
                            {selectedReview.platform === "GOOGLE" ? "Google" : selectedReview.platform}
                          </Badge>
                        </div>
                      </div>

                      {selectedState.isPosted ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Posted
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200 gap-1.5 text-xs">
                          <Clock className="h-3.5 w-3.5" />
                          Awaiting reply
                        </Badge>
                      )}
                    </div>

                    {/* Review text */}
                    <div className="mt-3 p-3.5 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedReview.text ?? "(No written review — star rating only)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply section */}
              <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">

                {/* AI reply label */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                      <Sparkles className="h-4 w-4 text-violet-600" />
                      AI-Generated Reply
                    </div>
                    {selectedState.isEdited && (
                      <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50">
                        Edited
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <CopyButton text={selectedState.text} />
                    <button
                      onClick={() => handleRegenerate(selectedReview.id)}
                      disabled={selectedState.isGenerating}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet-600 transition-colors px-2 py-1 rounded-md hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 ${selectedState.isGenerating ? "animate-spin text-violet-600" : ""}`}
                      />
                      {selectedState.isGenerating ? "Generating…" : "Regenerate"}
                    </button>
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative">
                  {selectedState.isGenerating ? (
                    <div className="w-full min-h-[140px] rounded-lg border border-violet-200 bg-violet-50/40 flex items-center justify-center gap-2 text-sm text-violet-600 animate-pulse">
                      <Sparkles className="h-4 w-4" />
                      Claude is writing your reply…
                    </div>
                  ) : (
                    <Textarea
                      value={selectedState.text}
                      onChange={(e) => handleTextChange(selectedReview.id, e.target.value)}
                      placeholder="AI reply will appear here…"
                      disabled={selectedState.isPosted}
                      className="min-h-[140px] resize-none text-sm leading-relaxed border-gray-200 focus:border-violet-400 focus:ring-violet-400/20 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  )}
                  <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                    {selectedState.text.length} chars
                  </div>
                </div>

                {/* Language hint */}
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-700">
                  <Languages className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Auto-detected language:</strong> Claude matches the review&apos;s language automatically —
                    English, Hindi, Hinglish, and 17+ other languages.
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-1">
                  {selectedState.isPosted ? (
                    <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Reply posted to Google
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={() => handlePost(selectedReview.id)}
                        disabled={!selectedState.text.trim() || selectedState.isGenerating}
                        className="gap-2 bg-violet-600 hover:bg-violet-700 text-white"
                      >
                        <Send className="h-4 w-4" />
                        Post Reply
                      </Button>
                      <Button
                        variant="outline"
                        disabled={selectedState.isGenerating}
                        className="gap-2 text-gray-700 border-gray-200"
                        onClick={() => handleRegenerate(selectedReview.id)}
                      >
                        <Zap className="h-4 w-4 text-violet-500" />
                        New variation
                      </Button>
                    </>
                  )}
                </div>

                {/* Navigation between reviews */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Review {reviews.indexOf(selectedReview) + 1} of {reviews.length}
                  </span>
                  <div className="flex gap-1">
                    {reviews.map((r, i) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedId(r.id)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          r.id === selectedId
                            ? "bg-violet-600"
                            : replyStates[r.id]?.isPosted
                            ? "bg-emerald-400"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        title={r.author}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const idx = reviews.findIndex((r) => r.id === selectedId);
                        if (idx > 0) setSelectedId(reviews[idx - 1].id);
                      }}
                      disabled={reviews.indexOf(selectedReview) === 0}
                      className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-40 flex items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => {
                        const idx = reviews.findIndex((r) => r.id === selectedId);
                        if (idx < reviews.length - 1) setSelectedId(reviews[idx + 1].id);
                      }}
                      disabled={reviews.indexOf(selectedReview) === reviews.length - 1}
                      className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-40 flex items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      Next <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">No review selected</p>
                <p className="text-xs text-gray-400 mt-1">Pick a review from the list to get started.</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom tip */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-100">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
            <BarChart3 className="h-4 w-4 text-violet-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-violet-900">Pro tip: Reply within 24 hours</p>
            <p className="text-xs text-violet-700/80 mt-0.5">
              Businesses that respond to reviews within 24 hours see up to 35% more repeat customers.
              ReviewPilot&apos;s daily digest reminds you every morning.
            </p>
          </div>
          <TrendingUp className="h-5 w-5 text-violet-400 shrink-0" />
        </div>
      </div>
    </div>
  );
}
