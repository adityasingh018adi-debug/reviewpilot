export const dynamic = "force-dynamic";

import { IntegrationsPage } from "@/components/integrations/integrations-page";

export const metadata = { title: "Integrations — ReviewDot" };

export default function Page() {
  return (
    <div className="p-6 h-full">
      <IntegrationsPage />
    </div>
  );
}
