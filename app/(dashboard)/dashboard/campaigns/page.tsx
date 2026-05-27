export const dynamic = "force-dynamic";

import { CampaignsPage } from "@/components/campaigns/campaigns-page";

export const metadata = { title: "Campaigns" };

export default function Page() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Review Campaigns</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Request reviews from customers via WhatsApp or email
        </p>
      </div>
      <CampaignsPage />
    </div>
  );
}
