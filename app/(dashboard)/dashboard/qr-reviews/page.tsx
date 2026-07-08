export const dynamic = "force-dynamic";

import { QRReviewsPage } from "@/components/qr-reviews/qr-reviews-page";

export const metadata = { title: "QR Reviews — Reviewdot.in" };

export default function Page() {
  return (
    <div className="p-0">
      <QRReviewsPage />
    </div>
  );
}
