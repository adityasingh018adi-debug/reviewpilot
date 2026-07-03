import { Resend } from "resend";

// Lazily instantiated to avoid build-time failures when env vars are absent
let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// Keep backward-compat export — callers must be in a request context
export const resend = { get emails() { return getResend().emails; } };

export interface DigestEmailData {
  ownerName: string;
  businessName: string;
  newReviews: {
    author: string;
    rating: number;
    text: string;
    date: string;
  }[];
  pendingReplies: number;
  dashboardUrl: string;
}

// Daily digest email template (HTML)
export function buildDigestEmailHtml(data: DigestEmailData): string {
  const { ownerName, businessName, newReviews, pendingReplies, dashboardUrl } = data;

  const reviewRows = newReviews
    .map(
      (r) => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #f0f0f0;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:16px;">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
          <strong>${r.author}</strong>
          <span style="color:#888;font-size:12px;">${r.date}</span>
        </div>
        <p style="margin:4px 0 0;color:#444;">${r.text || "(No written comment)"}</p>
      </td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f7f7f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#1a1a2e;padding:24px 32px;">
      <h1 style="margin:0;color:#fff;font-size:22px;">ReviewDot</h1>
      <p style="margin:4px 0 0;color:#8888aa;font-size:14px;">Your Daily Review Digest</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="margin:0 0 16px;color:#333;">Hi ${ownerName},</p>
      <p style="margin:0 0 24px;color:#333;">
        Here's what happened with <strong>${businessName}</strong> in the last 24 hours.
      </p>

      <!-- Stats row -->
      <div style="display:flex;gap:16px;margin-bottom:24px;">
        <div style="flex:1;background:#f7f7f8;border-radius:8px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#1a1a2e;">${newReviews.length}</div>
          <div style="font-size:12px;color:#888;margin-top:4px;">New Reviews</div>
        </div>
        <div style="flex:1;background:#fff7ed;border-radius:8px;padding:16px;text-align:center;border:1px solid #fed7aa;">
          <div style="font-size:28px;font-weight:700;color:#ea580c;">${pendingReplies}</div>
          <div style="font-size:12px;color:#888;margin-top:4px;">Pending Replies</div>
        </div>
      </div>

      ${
        newReviews.length > 0
          ? `
      <h3 style="margin:0 0 12px;color:#1a1a2e;font-size:16px;">New Reviews</h3>
      <table style="width:100%;border-collapse:collapse;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
        <tbody>${reviewRows}</tbody>
      </table>`
          : `<p style="color:#888;text-align:center;padding:24px;">No new reviews yesterday. Keep it up!</p>`
      }

      <!-- CTA -->
      <div style="margin-top:32px;text-align:center;">
        <a href="${dashboardUrl}" style="display:inline-block;background:#1a1a2e;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
          View Dashboard & Reply
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;background:#f7f7f8;text-align:center;">
      <p style="margin:0;font-size:12px;color:#999;">
        ReviewDot · Helping Indian businesses build trust, one reply at a time.<br>
        <a href="${dashboardUrl}/settings" style="color:#888;">Manage email preferences</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// Send the daily digest
export async function sendDailyDigest(
  to: string,
  data: DigestEmailData
): Promise<void> {
  await resend.emails.send({
    from: "ReviewDot <digest@reviewpilot.in>",
    to,
    subject: `${data.newReviews.length} new review${data.newReviews.length !== 1 ? "s" : ""} for ${data.businessName} — Daily Digest`,
    html: buildDigestEmailHtml(data),
  });
}
