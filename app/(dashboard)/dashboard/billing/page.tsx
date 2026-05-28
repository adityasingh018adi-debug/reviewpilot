export const dynamic = "force-dynamic";

import { BillingPage } from "@/components/billing/billing-page";

export const metadata = { title: "Billing — ReviewPilot" };

export default function Page() {
  return (
    <div className="p-6">
      <BillingPage />
    </div>
  );
}
