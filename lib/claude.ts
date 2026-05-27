import Anthropic from "@anthropic-ai/sdk";

// Lazily instantiated to avoid build-time failures when env vars are absent
let _anthropic: Anthropic | null = null;

function getAnthropic(): Anthropic {
  if (!_anthropic) {
    if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set");
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _anthropic;
}

const SYSTEM_PROMPT = `You are a helpful, friendly business owner responding to Google reviews.
Write a short (2-3 sentence), professional and warm reply to the review.
Match the language of the review — if the review is in Hindi, reply in Hindi; if in English, reply in English; if mixed (Hinglish), use Hinglish.
Never be defensive or argumentative.
For negative reviews (1-2 stars), sincerely apologize, acknowledge the specific issue, and invite them back with a commitment to do better.
For positive reviews (4-5 stars), express genuine gratitude and encourage them to visit again.
For neutral reviews (3 stars), thank them and ask what you can do to earn a 5-star experience.
Do NOT use generic filler phrases. Be specific to the review content.
Do NOT start with "Dear [Name]" — keep it natural and conversational.
Maximum 3 sentences.`;

export interface GenerateReplyInput {
  reviewText: string;
  rating: number;
  authorName: string;
  businessName: string;
  businessCategory?: string;
}

export async function generateAIReply(input: GenerateReplyInput): Promise<string> {
  const { reviewText, rating, authorName, businessName, businessCategory } = input;

  const userMessage = `Business: ${businessName}${businessCategory ? ` (${businessCategory})` : ""}
Customer: ${authorName}
Rating: ${rating}/5 stars
Review: "${reviewText || "(No written review — just a star rating)"}"

Write a reply from the business owner's perspective.`;

  const message = await getAnthropic().messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 256,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  return content.text.trim();
}

// Batch-generate replies for multiple reviews (used during initial sync)
export async function batchGenerateReplies(
  reviews: GenerateReplyInput[]
): Promise<string[]> {
  const results = await Promise.allSettled(
    reviews.map((r) => generateAIReply(r))
  );

  return results.map((r, i) => {
    if (r.status === "fulfilled") return r.value;
    console.error(`Failed to generate reply for review ${i}:`, r.reason);
    return "Thank you for your feedback! We appreciate you taking the time to share your experience.";
  });
}
