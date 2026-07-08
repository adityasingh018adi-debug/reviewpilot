export const dynamic = "force-dynamic";

import { GrowthPlanPage } from "@/components/growth-plan/growth-plan-page";

export const metadata = { title: "Growth Plan — Reviewdot.in" };

export default function Page() {
  return (
    <div className="p-6">
      <GrowthPlanPage />
    </div>
  );
}
