export const dynamic = "force-dynamic";

import { TemplatesPage } from "@/components/templates/templates-page";

export const metadata = { title: "Templates — ReviewPilot" };

export default function Page() {
  return (
    <div className="p-6 h-full">
      <TemplatesPage />
    </div>
  );
}
