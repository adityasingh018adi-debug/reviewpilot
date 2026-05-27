import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { generateAIReply } from "@/lib/claude";
import { prisma } from "@/lib/prisma";
import { PLANS } from "@/lib/razorpay";

// POST /api/replies/generate
// Body: { reviewId: string }
// Generates (or regenerates) an AI reply for a review, respecting plan limits
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { reviewId } = body;
  if (!reviewId) {
    return NextResponse.json({ error: "reviewId is required" }, { status: 400 });
  }

  // Fetch the review and verify it belongs to this user's business
  const review = await prisma.review.findFirst({
    where: {
      id: reviewId,
      business: { userId: session.user.id },
    },
    include: {
      business: { include: { user: true } },
      reply: true,
    },
  });

  if (!review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  const user = review.business.user;
  const plan = PLANS[user.plan];

  // Enforce monthly reply limit for FREE plan
  if (user.plan === "FREE") {
    // Reset counter if it's a new month
    const resetAt = new Date(user.aiRepliesResetAt);
    const now = new Date();
    const isNewMonth = resetAt.getMonth() !== now.getMonth() || resetAt.getFullYear() !== now.getFullYear();

    if (isNewMonth) {
      await prisma.user.update({ where: { id: user.id }, data: { aiRepliesUsed: 0, aiRepliesResetAt: now } });
    } else if (user.aiRepliesUsed >= plan.limits.aiRepliesPerMonth) {
      return NextResponse.json(
        { error: `Free plan limit reached (${plan.limits.aiRepliesPerMonth} replies/month). Upgrade to continue.` },
        { status: 429 }
      );
    }
  }

  // Generate the reply with Claude
  const aiReply = await generateAIReply({
    reviewText: review.text ?? "",
    rating: review.rating,
    authorName: review.author,
    businessName: review.business.name,
    businessCategory: review.business.category ?? undefined,
  });

  // Upsert the reply record (create if new, update if regenerating)
  const reply = await prisma.reply.upsert({
    where: { reviewId },
    create: { reviewId, aiGeneratedText: aiReply },
    update: { aiGeneratedText: aiReply, finalText: null, postedAt: null },
  });

  // Increment usage counter
  await prisma.user.update({
    where: { id: user.id },
    data: { aiRepliesUsed: { increment: 1 } },
  });

  return NextResponse.json({ reply: reply.aiGeneratedText });
}
