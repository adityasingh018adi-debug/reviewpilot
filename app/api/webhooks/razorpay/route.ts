import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/razorpay";
import type { Plan } from "@/types";

// POST /api/webhooks/razorpay
// Handles subscription lifecycle events from Razorpay
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

  if (!verifyWebhookSignature(body, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body) as RazorpayWebhookEvent;

  switch (event.event) {
    case "subscription.activated":
    case "subscription.charged": {
      const sub = event.payload.subscription.entity;
      const planNotes = sub.notes as Record<string, string>;
      const newPlan = (planNotes?.plan_id ?? "FREE") as Plan;

      await prisma.user.updateMany({
        where: { razorpaySubscriptionId: sub.id },
        data: { plan: newPlan },
      });

      // Link subscription if first charge (subscription.activated)
      if (event.event === "subscription.activated") {
        // Find user by customer ID embedded in notes
        const customerId = sub.customer_id;
        await prisma.user.updateMany({
          where: { razorpayCustomerId: customerId },
          data: { razorpaySubscriptionId: sub.id, plan: newPlan },
        });
      }
      break;
    }

    case "subscription.cancelled":
    case "subscription.completed":
    case "subscription.expired": {
      const sub = event.payload.subscription.entity;
      await prisma.user.updateMany({
        where: { razorpaySubscriptionId: sub.id },
        data: { plan: "FREE", razorpaySubscriptionId: null },
      });
      break;
    }

    case "subscription.paused": {
      // Keep plan active until the period ends — handled on next charge failure
      break;
    }
  }

  return NextResponse.json({ received: true });
}

// Minimal Razorpay webhook type
interface RazorpayWebhookEvent {
  event: string;
  payload: {
    subscription: {
      entity: {
        id: string;
        customer_id: string;
        notes: unknown;
      };
    };
  };
}
