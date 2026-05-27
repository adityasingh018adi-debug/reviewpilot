export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/demo-mode";
import LandingPage from "@/components/landing/landing-page";

export default async function RootPage() {
  if (isDemoMode()) {
    redirect("/dashboard");
  }

  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}
