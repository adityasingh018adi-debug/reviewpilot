export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getGoogleAuthUrl } from "@/lib/google";

// Initiates the Google Business Profile OAuth flow (separate from Supabase login OAuth)
export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL!));
  }

  // Use user ID as state for CSRF protection
  const authUrl = getGoogleAuthUrl(session.user.id);
  return NextResponse.redirect(authUrl);
}
