import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sendReviewRequestWhatsApp } from "@/lib/twilio";
import { resend } from "@/lib/resend";
import type { CampaignType } from "@/types";

// POST /api/campaigns/send
// Body: { recipient: string, type: "WHATSAPP" | "EMAIL" }
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { recipient, type } = await request.json() as { recipient: string; type: CampaignType };

  if (!recipient || !type) {
    return NextResponse.json({ error: "recipient and type are required" }, { status: 400 });
  }

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
    include: { user: true },
  });

  if (!business) {
    return NextResponse.json({ error: "No business found" }, { status: 404 });
  }

  // Check plan limits: WhatsApp requires Growth plan
  if (type === "WHATSAPP" && business.user.plan !== "GROWTH") {
    return NextResponse.json(
      { error: "WhatsApp campaigns require the Growth plan. Please upgrade." },
      { status: 403 }
    );
  }

  // Email campaigns require Starter or Growth
  if (type === "EMAIL" && business.user.plan === "FREE") {
    return NextResponse.json(
      { error: "Email campaigns require the Starter plan or above. Please upgrade." },
      { status: 403 }
    );
  }

  // Google review link — use actual Maps link if location ID is set
  const reviewLink = business.googleLocationId
    ? `https://search.google.com/local/writereview?placeid=${business.googleLocationId}`
    : `https://g.page/review`; // fallback

  // Create campaign record
  const campaign = await prisma.campaign.create({
    data: {
      businessId: business.id,
      type,
      recipient,
      reviewLink,
      sentAt: new Date(),
    },
  });

  // Send the actual message
  if (type === "WHATSAPP") {
    await sendReviewRequestWhatsApp({
      to: recipient,
      businessName: business.name,
      reviewLink,
      campaignId: campaign.id,
    });
  } else {
    await resend.emails.send({
      from: "ReviewDot <noreply@reviewpilot.in>",
      to: recipient,
      subject: `How was your experience at ${business.name}?`,
      html: `
        <p>Hi there,</p>
        <p>Thank you for visiting <strong>${business.name}</strong>! We'd love to hear about your experience.</p>
        <p>It would mean a lot to us if you could leave a quick Google review:</p>
        <p><a href="${reviewLink}" style="background:#1a1a2e;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">Leave a Review</a></p>
        <p>Thank you for your support! 🙏</p>
        <p>— Team ${business.name}</p>
      `,
    });
  }

  return NextResponse.json({ success: true, campaignId: campaign.id });
}
