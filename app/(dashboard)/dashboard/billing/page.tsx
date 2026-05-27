export const dynamic = "force-dynamic";

import { BillingPage } from "@/components/billing/billing-page";
import { PLANS } from "@/lib/razorpay";

export const metadata = { title: "Billing" };

export default function Page() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Plans & Billing</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Manage your subscription and upgrade for more AI replies
        </p>
      </div>
      <BillingPage plans={Object.values(PLANS)} currentPlan="FREE" />
    </div>
  );
}
