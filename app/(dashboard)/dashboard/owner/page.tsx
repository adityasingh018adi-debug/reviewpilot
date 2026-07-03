export const dynamic = "force-dynamic";

import { OwnerPage } from "@/components/owner/owner-page";

export const metadata = { title: "Owner — ReviewDot" };

export default function Page() {
  return (
    <div className="p-6">
      <OwnerPage />
    </div>
  );
}
