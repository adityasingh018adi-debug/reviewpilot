import { Suspense } from "react";
import { ReviewKiosk } from "@/components/review-kiosk/review-kiosk";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props) {
  const name = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `Leave a Review — ${name}`,
    description: `Share your experience at ${name}. Our AI will write the perfect review for you in seconds — just rate and post!`,
  };
}

export default function ReviewPage({ params }: Props) {
  // In production: fetch real business name/category from DB using params.slug
  const businessName = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("'s ");

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-violet-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-violet-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-violet-600 font-medium">Loading…</p>
          </div>
        </div>
      }
    >
      <ReviewKiosk businessName={businessName} businessCategory="Restaurant" />
    </Suspense>
  );
}
