import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDailyDigest } from "@/lib/resend";
import { formatDate } from "@/lib/utils";

// GET /api/cron/daily-digest
// Invoked by Vercel Cron at 9:00 AM IST (3:30 UTC) every day
// Sends email digest to all business owners with new reviews from last 24 hours
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Fetch all users with the email digest alert enabled
  const businesses = await prisma.business.findMany({
    where: {
      alerts: {
        some: { type: "EMAIL_DIGEST", enabled: true },
      },
    },
    include: {
      user: true,
      reviews: {
        where: { reviewDate: { gte: since } },
        include: { reply: true },
        orderBy: { reviewDate: "desc" },
      },
    },
  });

  let emailsSent = 0;
  const errors: string[] = [];

  for (const business of businesses) {
    try {
      const newReviews = business.reviews;
      const pendingReplies = await prisma.reply.count({
        where: {
          review: { businessId: business.id },
          postedAt: null,
        },
      });

      await sendDailyDigest(business.user.email, {
        ownerName: business.user.name ?? "there",
        businessName: business.name,
        newReviews: newReviews.map((r) => ({
          author: r.author,
          rating: r.rating,
          text: r.text ?? "",
          date: formatDate(r.reviewDate),
        })),
        pendingReplies,
        dashboardUrl: process.env.NEXTAUTH_URL!,
      });

      emailsSent++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`Business ${business.id}: ${msg}`);
    }
  }

  return NextResponse.json({ emailsSent, ...(errors.length > 0 && { errors }) });
}
