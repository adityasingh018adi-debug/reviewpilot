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

// ─── Tone prompts ──────────────────────────────────────────────────────────────

export type ReplyTone = "friendly" | "luxury" | "professional" | "funny";

const TONE_INSTRUCTIONS: Record<ReplyTone, string> = {
  friendly:
    "Use a warm, casual, and approachable tone — like a friendly local business owner chatting with a neighbour. Use the customer's first name naturally. Be genuine and conversational, not corporate.",
  luxury:
    "Use a sophisticated, premium, and refined tone befitting a high-end establishment. Refer to the customer as 'valued guest' or 'esteemed patron'. Use elevated vocabulary. Exude exclusivity and grace.",
  professional:
    "Use a formal, courteous, and business-like tone. Be polished, measured, and objective. Avoid slang or overly casual language. Maintain professional boundaries while still being warm.",
  funny:
    "Use a witty, light-hearted, and playful tone with tasteful humour. Make the customer smile or chuckle. Use clever wordplay or gentle self-deprecation where appropriate — but stay respectful and on-brand.",
};

// ─── Language instructions ────────────────────────────────────────────────────

export type ReplyLanguage =
  | "en" | "hi" | "mr" | "gu" | "es" | "fr" | "de"
  | "it" | "ar" | "ja" | "zh" | "id" | "pa" | "tr" | "ko";

const LANGUAGE_INSTRUCTIONS: Record<ReplyLanguage, string> = {
  en: "Write the reply in English.",
  hi: "Write the reply entirely in Hindi (हिंदी में लिखें). Use Devanagari script.",
  mr: "Write the reply entirely in Marathi (मराठीत लिहा). Use Devanagari script.",
  gu: "Write the reply entirely in Gujarati (ગુજરાતીમાં લખો). Use Gujarati script.",
  es: "Write the reply entirely in Spanish (Escribe la respuesta en español).",
  fr: "Write the reply entirely in French (Écris la réponse en français).",
  de: "Write the reply entirely in German (Schreibe die Antwort auf Deutsch).",
  it: "Write the reply entirely in Italian (Scrivi la risposta in italiano).",
  ar: "Write the reply entirely in Arabic (اكتب الرد كاملاً بالعربية). Use right-to-left script.",
  ja: "Write the reply entirely in Japanese (返信を日本語で書いてください).",
  zh: "Write the reply entirely in Simplified Chinese (用简体中文写回复).",
  id: "Write the reply entirely in Indonesian (Tulis balasan dalam Bahasa Indonesia).",
  pa: "Write the reply entirely in Punjabi (ਪੰਜਾਬੀ ਵਿੱਚ ਲਿਖੋ). Use Gurmukhi script.",
  tr: "Write the reply entirely in Turkish (Yanıtı Türkçe yaz).",
  ko: "Write the reply entirely in Korean (한국어로 답변을 작성해 주세요).",
};

// ─── Base system prompt ────────────────────────────────────────────────────────

const BASE_SYSTEM_PROMPT = `You are a business owner responding to a customer review on Google, Yelp, or TripAdvisor.
Write a SHORT (2–3 sentences max), thoughtful reply.
Never be defensive or argumentative.
For negative reviews (1–2 stars): sincerely apologise, acknowledge the specific issue, and invite them back.
For positive reviews (4–5 stars): express genuine gratitude and encourage them to return.
For neutral reviews (3 stars): thank them and ask how you can earn a 5-star experience.
Do NOT use generic filler phrases. Be specific to the review content.
Do NOT start with "Dear [Name]" — keep it natural.
Maximum 3 sentences.`;

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface GenerateReplyInput {
  reviewText: string;
  rating: number;
  authorName: string;
  businessName: string;
  businessCategory?: string;
  tone?: ReplyTone;
  language?: ReplyLanguage;
}

// ─── Main generate function ───────────────────────────────────────────────────

export async function generateAIReply(input: GenerateReplyInput): Promise<string> {
  const {
    reviewText, rating, authorName, businessName, businessCategory,
    tone = "friendly",
    language = "en",
  } = input;

  const toneInstruction = TONE_INSTRUCTIONS[tone];
  const langInstruction = LANGUAGE_INSTRUCTIONS[language];

  const systemPrompt = `${BASE_SYSTEM_PROMPT}

TONE: ${toneInstruction}

LANGUAGE: ${langInstruction}`;

  const userMessage = `Business: ${businessName}${businessCategory ? ` (${businessCategory})` : ""}
Customer: ${authorName}
Rating: ${rating}/5 stars
Review: "${reviewText || "(No written review — just a star rating)"}"

Write a reply from the business owner's perspective.`;

  const message = await getAnthropic().messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 300,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type from Claude");
  return content.text.trim();
}

// ─── Batch generate ───────────────────────────────────────────────────────────

export async function batchGenerateReplies(
  reviews: GenerateReplyInput[]
): Promise<string[]> {
  const results = await Promise.allSettled(reviews.map((r) => generateAIReply(r)));
  return results.map((r, i) => {
    if (r.status === "fulfilled") return r.value;
    console.error(`Failed to generate reply for review ${i}:`, r.reason);
    return "Thank you for your feedback! We appreciate you taking the time to share your experience.";
  });
}
