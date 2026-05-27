import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const FROM = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";

// Send WhatsApp alert for a new negative review
export async function sendNegativeReviewAlert({
  to,
  authorName,
  rating,
  reviewText,
  dashboardUrl,
}: {
  to: string;
  authorName: string;
  rating: number;
  reviewText: string;
  dashboardUrl: string;
}): Promise<void> {
  const stars = "⭐".repeat(rating);
  const text = reviewText
    ? `"${reviewText.slice(0, 120)}${reviewText.length > 120 ? "…" : ""}"`
    : "(No written comment)";

  const message = `⚠️ *New ${rating}-star review* from *${authorName}*\n\n${stars}\n${text}\n\n👉 Reply now: ${dashboardUrl}`;

  await client.messages.create({
    from: FROM,
    to: `whatsapp:${to}`,
    body: message,
  });
}

// Send a review request via WhatsApp
export async function sendReviewRequestWhatsApp({
  to,
  businessName,
  reviewLink,
  campaignId,
}: {
  to: string;
  businessName: string;
  reviewLink: string;
  campaignId: string;
}): Promise<void> {
  const trackingUrl = `${process.env.NEXTAUTH_URL}/api/campaigns/track?id=${campaignId}&action=click`;

  const message = `Hi! Thanks for visiting *${businessName}* 🙏\n\nWe'd love to hear your feedback. If you enjoyed your experience, please share a quick Google review — it means the world to small businesses like us:\n\n${reviewLink}\n\nThank you! 😊`;

  await client.messages.create({
    from: FROM,
    to: `whatsapp:${to}`,
    body: message,
  });
}
