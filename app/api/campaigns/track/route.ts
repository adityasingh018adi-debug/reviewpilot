import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/campaigns/track?id=xxx&action=click
// Tracks when a customer clicks the review link from a campaign
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const action = searchParams.get("action");

  if (!id || action !== "click") {
    return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL!));
  }

  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) {
    return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL!));
  }

  // Record the click
  if (!campaign.clickedAt) {
    await prisma.campaign.update({
      where: { id },
      data: { clickedAt: new Date() },
    });
  }

  // Redirect to the actual Google review link
  return NextResponse.redirect(campaign.reviewLink);
}
