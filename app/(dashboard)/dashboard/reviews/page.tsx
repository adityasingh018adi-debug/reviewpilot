export const dynamic = "force-dynamic";

import { ReviewsPage } from "@/components/dashboard/reviews-page";

export const metadata = { title: "Reviews — Reviewdot.in" };

export default function ReviewsRoute() {
  return <ReviewsPage />;
}
