export const dynamic = "force-dynamic";

import { TeamPage } from "@/components/team/team-page";

export const metadata = { title: "Team — ReviewDot" };

export default function Page() {
  return (
    <div className="p-6">
      <TeamPage />
    </div>
  );
}
