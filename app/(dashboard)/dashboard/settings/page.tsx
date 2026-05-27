export const dynamic = "force-dynamic";

import { SettingsPage } from "@/components/settings/settings-page";

export const metadata = { title: "Settings" };

export default function Page() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Manage your business profile, notifications, and integrations
        </p>
      </div>
      <SettingsPage />
    </div>
  );
}
