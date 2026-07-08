export const dynamic = "force-dynamic";

import { OwnerPage } from "@/components/owner/owner-page";

export const metadata = { title: "Owner — Reviewdot.in" };

export default function Page() {
  return (
    <div className="p-6">
      <OwnerPage />
    </div>
  );
}
