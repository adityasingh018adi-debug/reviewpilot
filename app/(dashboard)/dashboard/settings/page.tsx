export const dynamic = "force-dynamic";

import { SettingsPage } from "@/components/settings/settings-page";

export const metadata = { title: "Settings — ReviewDot" };

export default function Page() {
  return (
    <div className="p-6 h-full">
      <SettingsPage />
    </div>
  );
}
