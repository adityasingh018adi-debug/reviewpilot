import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getRazorpay, PLANS, createSubscription } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import type { PlanId } from "@/lib/razorpay";

// POST /api/billing/create-subscription
// Body: { planId: "STARTER" | "GROWTH" }
// Returns a Razorpay subscription ID for the frontend to open the checkout
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { planId } = await request.json() as { planId: PlanId };
  const plan = PLANS[planId];

  if (!plan || plan.price === 0) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (!plan.razorpayPlanId) {
    return NextResponse.json(
      { error: `Razorpay plan ID for ${planId} is not configured` },
      { status: 500 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Create or reuse Razorpay customer ID
  let customerId = user.razorpayCustomerId;
  if (!customerId) {
    const rp = getRazorpay();
    const customer = (await (rp.customers.create as unknown as (opts: Record<string, unknown>) => Promise<{ id: string }>)({
      name: user.name ?? user.email,
      email: user.email,
    }));
    customerId = customer.id;
    await prisma.user.update({ where: { id: user.id }, data: { razorpayCustomerId: customerId } });
  }

  const subscription = await createSubscription(plan.razorpayPlanId, customerId);

  return NextResponse.json({
    subscriptionId: subscription.id,
    planId,
    planName: plan.name,
    amount: plan.price,
    currency: plan.currency,
  });
}
