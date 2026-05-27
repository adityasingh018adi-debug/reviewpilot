import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// PATCH /api/settings
// Updates business profile and alert preferences
export async function PATCH(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { businessName, category, location, alerts } = await request.json();

  const business = await prisma.business.findFirst({
    where: { userId: session.user.id },
  });

  if (!business) {
    return NextResponse.json({ error: "No business found" }, { status: 404 });
  }

  // Update business profile
  await prisma.business.update({
    where: { id: business.id },
    data: { name: businessName, category, location },
  });

  // Upsert alert settings
  if (alerts) {
    await prisma.alert.upsert({
      where: { businessId_type: { businessId: business.id, type: "EMAIL_DIGEST" } },
      create: { businessId: business.id, type: "EMAIL_DIGEST", enabled: alerts.emailDigest ?? true },
      update: { enabled: alerts.emailDigest ?? true },
    });

    await prisma.alert.upsert({
      where: { businessId_type: { businessId: business.id, type: "WHATSAPP_NEGATIVE" } },
      create: {
        businessId: business.id,
        type: "WHATSAPP_NEGATIVE",
        enabled: alerts.whatsappAlerts ?? false,
        config: alerts.whatsappPhone ? { phone: alerts.whatsappPhone } : {},
      },
      update: {
        enabled: alerts.whatsappAlerts ?? false,
        config: alerts.whatsappPhone ? { phone: alerts.whatsappPhone } : {},
      },
    });
  }

  return NextResponse.json({ success: true });
}
