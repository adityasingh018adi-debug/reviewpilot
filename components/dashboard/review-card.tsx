"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./star-rating";
import { cn, formatRelative, getRatingBgColor } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { ReviewWithReply } from "@/types";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  Loader2,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";

interface ReviewCardProps {
  review: ReviewWithReply;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [replyText, setReplyText] = useState(
    review.reply?.finalText ?? review.reply?.aiGeneratedText ?? ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isPosted, setIsPosted] = useState(!!review.reply?.postedAt);
  const { toast } = useToast();

  const isLongText = (review.text?.length ?? 0) > 200;
  const displayText = isLongText && !isExpanded
    ? review.text!.slice(0, 200) + "…"
    : review.text;

  async function handleApproveAndPost() {
    setIsPosting(true);
    try {
      const res = await fetch("/api/replies/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: review.id, replyText }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setIsPosted(true);
      setIsEditing(false);
      toast({ title: "Reply posted!", description: "Your reply has been published to Google." });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to post reply";
      toast({ title: "Failed to post", description: message, variant: "destructive" });
    } finally {
      setIsPosting(false);
    }
  }

  async function handleRegenerate() {
    setIsRegenerating(true);
    try {
      const res = await fetch("/api/replies/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: review.id }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const data = await res.json();
      setReplyText(data.reply);
      toast({ title: "New reply generated" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to regenerate";
      toast({ title: "Regeneration failed", description: message, variant: "destructive" });
    } finally {
      setIsRegenerating(false);
    }
  }

  return (
    <div
      className={cn(
        "rounded-lg border p-5 space-y-4 transition-all",
        getRatingBgColor(review.rating),
        isPosted && "opacity-80"
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={review.authorPhotoUrl ?? undefined} />
            <AvatarFallback className="text-sm">
              {review.author[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-sm">{review.author}</p>
              {isPosted && (
                <Badge variant="success" className="gap-1 h-5">
                  <CheckCircle2 className="h-3 w-3" />
                  Replied
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-xs text-muted-foreground">
                {formatRelative(review.reviewDate)}
              </span>
            </div>
          </div>
        </div>
        <Badge variant={review.platform === "GOOGLE" ? "default" : "secondary"} className="shrink-0">
          {review.platform === "GOOGLE" ? "Google" : review.platform}
        </Badge>
      </div>

      {/* Review text */}
      {review.text && (
        <div>
          <p className="text-sm leading-relaxed">{displayText}</p>
          {isLongText && (
            <button
              className="text-xs text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {/* AI reply section */}
      {review.reply && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              AI-suggested reply
            </span>
          </div>

          {isEditing ? (
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="text-sm min-h-[80px] bg-background/80"
              placeholder="Write your reply…"
            />
          ) : (
            <p className="text-sm text-muted-foreground bg-background/60 rounded-md p-3 border border-border/50 leading-relaxed">
              {replyText}
            </p>
          )}

          {!isPosted && (
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                size="sm"
                onClick={handleApproveAndPost}
                disabled={isPosting || !replyText.trim()}
                className="gap-1.5"
              >
                {isPosting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                {isEditing ? "Post edited reply" : "Approve & Post"}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="gap-1.5"
              >
                <Edit3 className="h-3.5 w-3.5" />
                {isEditing ? "Cancel edit" : "Edit reply"}
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="gap-1.5 text-violet-600 hover:text-violet-700"
              >
                {isRegenerating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                Regenerate
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
