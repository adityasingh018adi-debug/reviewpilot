import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { exchangeCodeForTokens, listBusinessAccounts } from "@/lib/google";
import { prisma } from "@/lib/prisma";

// Handles the return from Google's consent screen for Business Profile access
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state"); // user ID we passed earlier
  const error = url.searchParams.get("error");

  const dashboardUrl = new URL("/dashboard", process.env.NEXTAUTH_URL!);

  if (error || !code) {
    dashboardUrl.searchParams.set("error", "google_connect_failed");
    return NextResponse.redirect(dashboardUrl);
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    // Validate state matches the logged-in user
    if (!session || session.user.id !== state) {
      throw new Error("Invalid state parameter");
    }

    const tokens = await exchangeCodeForTokens(code);
    const tokenExpiry = new Date(Date.now() + tokens.expires_in * 1000);

    // Fetch the first business account & location to auto-link
    const accounts = await listBusinessAccounts(tokens.access_token);
    const firstAccount = accounts.accounts?.[0];

    // Save tokens to the user's first business in the DB
    await prisma.business.updateMany({
      where: { userId: session.user.id },
      data: {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleTokenExpiry: tokenExpiry,
        googleLocationId: firstAccount?.name ?? null,
      },
    });

    dashboardUrl.searchParams.set("success", "google_connected");
    return NextResponse.redirect(dashboardUrl);
  } catch (err) {
    console.error("Google callback error:", err);
    dashboardUrl.searchParams.set("error", "google_connect_failed");
    return NextResponse.redirect(dashboardUrl);
  }
}
