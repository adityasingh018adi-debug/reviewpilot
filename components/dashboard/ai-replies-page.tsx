"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Star, Sparkles, RefreshCw, Send, CheckCircle2, Clock, AlertCircle,
  ChevronRight, Copy, Check, Zap, MessageSquare, Globe, Languages,
  Timer, CalendarClock,
} from "lucide-react";
import type { ReviewWithReply } from "@/types";
import { MOCK_REVIEWS, MOCK_BUSINESS } from "@/lib/mock-data";

// ─── Config ───────────────────────────────────────────────────────────────────

export type ReplyTone = "friendly" | "luxury" | "professional" | "funny";
export type ReplyLanguage =
  | "en" | "hi" | "mr" | "gu" | "es" | "fr" | "de"
  | "it" | "ar" | "ja" | "zh" | "id" | "pa" | "tr" | "ko";

const TONES: { id: ReplyTone; label: string; emoji: string; active: string; desc: string }[] = [
  { id: "friendly", label: "Friendly", emoji: "😊", active: "bg-green-100 border-green-400 text-green-800", desc: "Warm & casual" },
  { id: "luxury", label: "Luxury", emoji: "✨", active: "bg-amber-100 border-amber-400 text-amber-800", desc: "Sophisticated" },
  { id: "professional", label: "Professional", emoji: "💼", active: "bg-blue-100 border-blue-400 text-blue-800", desc: "Formal & polished" },
  { id: "funny", label: "Funny", emoji: "😄", active: "bg-pink-100 border-pink-400 text-pink-800", desc: "Witty & playful" },
];

const LANGUAGES: { code: ReplyLanguage; label: string; flag: string; native: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧", native: "English" },
  { code: "hi", label: "Hindi", flag: "🇮🇳", native: "हिंदी" },
  { code: "mr", label: "Marathi", flag: "🇮🇳", native: "मराठी" },
  { code: "gu", label: "Gujarati", flag: "🇮🇳", native: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", flag: "🇮🇳", native: "ਪੰਜਾਬੀ" },
  { code: "es", label: "Spanish", flag: "🇪🇸", native: "Español" },
  { code: "fr", label: "French", flag: "🇫🇷", native: "Français" },
  { code: "de", label: "German", flag: "🇩🇪", native: "Deutsch" },
  { code: "it", label: "Italian", flag: "🇮🇹", native: "Italiano" },
  { code: "ar", label: "Arabic", flag: "🇸🇦", native: "العربية" },
  { code: "ja", label: "Japanese", flag: "🇯🇵", native: "日本語" },
  { code: "zh", label: "Chinese", flag: "🇨🇳", native: "中文" },
  { code: "id", label: "Indonesian", flag: "🇮🇩", native: "Bahasa Indonesia" },
  { code: "tr", label: "Turkish", flag: "🇹🇷", native: "Türkçe" },
  { code: "ko", label: "Korean", flag: "🇰🇷", native: "한국어" },
];

const SCHEDULE_DELAY_MS = 5 * 60 * 1000; // 5 minutes

// ─── Mock replies by tone ─────────────────────────────────────────────────────

const MOCK_REPLIES: Record<ReplyTone, string[]> = {
  friendly: [
    "Hey there! Honestly, your review just made our whole team's day! 😊 We're so glad you had an amazing experience, and we can't wait to see you again soon!",
    "Thank you so much for taking the time to share this — it truly means a lot to us! We love having guests like you and hope to see you back real soon!",
    "Wow, this made us smile! Your kind words are such great motivation for our team. See you next time — we'll make it even better!",
  ],
  luxury: [
    "We are deeply honoured by your gracious review, valued guest. Your appreciation is the highest compliment we could receive, and we look forward to welcoming you once more at your earliest convenience.",
    "Thank you for your esteemed feedback. It is our privilege to have exceeded your expectations, and we remain committed to delivering an unparalleled experience on your next visit.",
    "Your kind words are truly a testament to the dedication of our team. We are delighted to have created a memorable experience and eagerly anticipate your return.",
  ],
  professional: [
    "Thank you for taking the time to share your experience with us. We are pleased that your visit met your expectations and look forward to serving you again in the near future.",
    "We appreciate your detailed feedback and are glad to hear that our team delivered quality service. Your satisfaction remains our top priority, and we welcome you back at any time.",
    "Thank you for your thoughtful review. We take all customer feedback seriously and are committed to maintaining the high standards that made your visit enjoyable.",
  ],
  funny: [
    "You just made our team do a happy dance — and trust us, it wasn't pretty! 💃 Seriously though, thank you so much for the kind words. See you next time (we promise to dance less)!",
    "Warning: reading reviews this good may cause uncontrollable smiling in our kitchen! 😄 Thank you for making our day — we'll keep the quality up so you keep the reviews coming!",
    "We tried to play it cool when we read this, but we definitely did a little celebration. Thank you! We'll be here, working hard to earn that same reaction every visit! 🎉",
  ],
};

const MOCK_REPLIES_LANG: Record<ReplyLanguage, string> = {
  en: "", // uses tone-based replies above
  hi: "आपकी समीक्षा के लिए बहुत-बहुत धन्यवाद! आपका अनुभव सुनकर हमें बहुत खुशी हुई। हम आशा करते हैं कि आप जल्द ही फिर से आएंगे! 🙏",
  mr: "आपल्या अभिप्रायाबद्दल मनापासून आभारी आहोत! तुमचा अनुभव जाणून आम्हाला खूप आनंद झाला. लवकरच परत या! 🙏",
  gu: "તમારી સમીક્ષા માટે ખૂબ ખૂબ આભાર! તમારો અનુભવ જાણીને અમને ખૂબ આનંદ થયો. ટૂંક સમયમાં ફરી આવો! 🙏",
  pa: "ਤੁਹਾਡੀ ਸਮੀਖਿਆ ਲਈ ਬਹੁਤ ਬਹੁਤ ਧੰਨਵਾਦ! ਤੁਹਾਡਾ ਤਜਰਬਾ ਸੁਣ ਕੇ ਸਾਨੂੰ ਬਹੁਤ ਖੁਸ਼ੀ ਹੋਈ। ਜਲਦੀ ਹੀ ਦੁਬਾਰਾ ਆਓ! 🙏",
  es: "¡Muchas gracias por tu reseña! Nos alegra mucho que hayas tenido una experiencia tan positiva. ¡Esperamos verte pronto de nuevo!",
  fr: "Merci infiniment pour votre avis ! Nous sommes ravis que votre expérience vous ait plu. Nous espérons vous accueillir à nouveau très prochainement !",
  de: "Vielen herzlichen Dank für Ihre Bewertung! Es freut uns sehr, dass Ihr Besuch ein positives Erlebnis war. Wir freuen uns darauf, Sie bald wieder begrüßen zu dürfen!",
  it: "Grazie mille per la sua recensione! Siamo felicissimi che la sua esperienza sia stata positiva. Speriamo di rivederla presto!",
  ar: "شكراً جزيلاً على مراجعتك الكريمة! يسعدنا جداً أن تجربتك كانت إيجابية. نتطلع إلى رؤيتك مجدداً قريباً!",
  ja: "素晴らしいレビューをありがとうございます！素敵なご体験をお届けできて光栄です。またのお越しを心よりお待ちしております！",
  zh: "非常感谢您的宝贵评价！很高兴您有愉快的体验。期待您的再次光临！",
  id: "Terima kasih banyak atas ulasan Anda! Kami sangat senang mendengar pengalaman positif Anda. Kami berharap dapat menyambut Anda kembali segera!",
  tr: "Değerli yorumunuz için çok teşekkür ederiz! Olumlu deneyiminizi duymak bizi çok mutlu etti. Sizi yakında tekrar ağırlamayı dört gözle bekliyoruz!",
  ko: "소중한 리뷰 감사합니다! 좋은 경험을 드릴 수 있어서 정말 기쁩니다. 다음에 또 뵙겠습니다! 😊",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type ReplyState = {
  text: string;
  isEdited: boolean;
  isPosted: boolean;
  isGenerating: boolean;
  isScheduled: boolean;
  scheduledAt: number | null;   // unix ms timestamp
};

type FilterTab = "all" | "pending" | "posted";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "h-4 w-4" : "h-3 w-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${sz} ${i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}

function formatCountdown(scheduledAt: number): string {
  const remaining = Math.max(0, scheduledAt - Date.now());
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700", "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700", "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700", "bg-teal-100 text-teal-700",
];

function getRatingColor(rating: number) {
  if (rating >= 4) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (rating === 3) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-rose-600 bg-rose-50 border-rose-200";
}

// ─── Countdown display component ──────────────────────────────────────────────

function CountdownBadge({ scheduledAt }: { scheduledAt: number }) {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceUpdate((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, scheduledAt - Date.now());
  const pct = Math.max(0, (remaining / SCHEDULE_DELAY_MS) * 100);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
          <circle
            cx="24" cy="24" r="20" fill="none"
            stroke="#7c3aed" strokeWidth="3.5"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - pct / 100)}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.9s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Timer className="h-4 w-4 text-violet-600" />
        </div>
      </div>
      <span className="text-xs font-bold text-violet-700 tabular-nums">{formatCountdown(scheduledAt)}</span>
    </div>
  );
}

// ─── Review list item ─────────────────────────────────────────────────────────

function ReviewListItem({
  review, index, isSelected, state, onClick,
}: {
  review: ReviewWithReply;
  index: number;
  isSelected: boolean;
  state: ReplyState;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3.5 border-b border-gray-50 transition-all ${
        isSelected ? "bg-violet-50 border-l-2 border-l-violet-600" : "hover:bg-gray-50/60 border-l-2 border-l-transparent"
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 shrink-0 mt-0.5">
          <AvatarFallback className={`text-xs font-semibold ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
            {getInitials(review.author)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-sm font-semibold text-gray-900 truncate">{review.author}</span>
            {state.isPosted ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            ) : state.isScheduled ? (
              <Timer className="h-3.5 w-3.5 text-violet-500 shrink-0 animate-pulse" />
            ) : state.text ? (
              <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            )}
          </div>
          <StarDisplay rating={review.rating} />
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {review.text ?? "(No written review)"}
          </p>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-xs text-gray-400">{formatDate(review.reviewDate)}</p>
            {state.isScheduled && state.scheduledAt && (
              <span className="text-xs text-violet-600 font-semibold tabular-nums">
                {formatCountdown(state.scheduledAt)}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Copy button ───────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
    >
      {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /><span className="text-emerald-600">Copied!</span></> : <><Copy className="h-3.5 w-3.5" />Copy</>}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface AIRepliesPageProps {
  reviews?: ReviewWithReply[];
  businessName?: string;
  aiRepliesUsed?: number;
  aiRepliesLimit?: number;
}

export function AIRepliesPage({
  reviews = MOCK_REVIEWS,
  businessName = MOCK_BUSINESS.name,
  aiRepliesUsed = 12,
  aiRepliesLimit = 30,
}: AIRepliesPageProps) {
  const [selectedId, setSelectedId] = useState<string>(reviews[0]?.id ?? "");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [tone, setTone] = useState<ReplyTone>("friendly");
  const [language, setLanguage] = useState<ReplyLanguage>("en");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const [replyStates, setReplyStates] = useState<Record<string, ReplyState>>(() => {
    const init: Record<string, ReplyState> = {};
    reviews.forEach((r) => {
      init[r.id] = {
        text: r.reply?.aiGeneratedText ?? "",
        isEdited: false,
        isPosted: !!r.reply?.postedAt,
        isGenerating: false,
        isScheduled: false,
        scheduledAt: null,
      };
    });
    return init;
  });

  // Auto-post scheduled replies when countdown reaches 0
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      setReplyStates((prev) => {
        let changed = false;
        const next = { ...prev };
        for (const rid of Object.keys(next)) {
          const s = next[rid];
          if (s.isScheduled && s.scheduledAt && now >= s.scheduledAt) {
            next[rid] = { ...s, isScheduled: false, scheduledAt: null, isPosted: true };
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 500);
    return () => clearInterval(id);
  }, []);

  const selectedReview = reviews.find((r) => r.id === selectedId);
  const selectedState = replyStates[selectedId];

  const filteredReviews = reviews.filter((r) => {
    const s = replyStates[r.id];
    if (filterTab === "pending") return !s?.isPosted && !s?.isScheduled;
    if (filterTab === "posted") return s?.isPosted;
    return true;
  });

  const postedCount = Object.values(replyStates).filter((s) => s.isPosted).length;
  const scheduledCount = Object.values(replyStates).filter((s) => s.isScheduled).length;
  const pendingCount = reviews.length - postedCount - scheduledCount;
  const usagePercent = aiRepliesLimit > 0 ? Math.min(100, Math.round((aiRepliesUsed / aiRepliesLimit) * 100)) : 0;

  const getMockReply = useCallback((reviewId: string, t: ReplyTone, lang: ReplyLanguage): string => {
    if (lang !== "en" && MOCK_REPLIES_LANG[lang]) return MOCK_REPLIES_LANG[lang];
    const pool = MOCK_REPLIES[t];
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  const handleRegenerate = useCallback(async (reviewId: string) => {
    setReplyStates((prev) => ({ ...prev, [reviewId]: { ...prev[reviewId], isGenerating: true } }));
    await new Promise((res) => setTimeout(res, 1400));
    setReplyStates((prev) => ({
      ...prev,
      [reviewId]: { ...prev[reviewId], text: getMockReply(reviewId, tone, language), isEdited: false, isPosted: false, isGenerating: false, isScheduled: false, scheduledAt: null },
    }));
  }, [tone, language, getMockReply]);

  const handleSchedule = useCallback((reviewId: string) => {
    if (!replyStates[reviewId]?.text.trim()) return;
    setReplyStates((prev) => ({
      ...prev,
      [reviewId]: { ...prev[reviewId], isScheduled: true, scheduledAt: Date.now() + SCHEDULE_DELAY_MS, isPosted: false },
    }));
  }, [replyStates]);

  const handlePostNow = useCallback((reviewId: string) => {
    setReplyStates((prev) => ({ ...prev, [reviewId]: { ...prev[reviewId], isPosted: true, isScheduled: false, scheduledAt: null } }));
  }, []);

  const handleCancelSchedule = useCallback((reviewId: string) => {
    setReplyStates((prev) => ({ ...prev, [reviewId]: { ...prev[reviewId], isScheduled: false, scheduledAt: null } }));
  }, []);

  const handleTextChange = useCallback((reviewId: string, text: string) => {
    setReplyStates((prev) => ({ ...prev, [reviewId]: { ...prev[reviewId], text, isEdited: true } }));
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language)!;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center glow-violet">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              AI Replies
            </h1>
            <p className="text-gray-500 text-sm mt-1">Generate, schedule, and post AI replies with custom tone and language.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-1">
              <p className="text-xs text-gray-500 font-medium">Monthly AI usage</p>
              <p className="text-xs text-gray-400">{aiRepliesUsed} / {aiRepliesLimit} replies</p>
            </div>
            <div className="w-28">
              <Progress value={usagePercent} className="h-2" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-1">
          {[
            { icon: MessageSquare, label: "Total Reviews", value: String(reviews.length), sub: "across all platforms", bg: "bg-violet-50", col: "text-violet-600" },
            { icon: CheckCircle2, label: "Replies Posted", value: String(postedCount), sub: `${reviews.length ? Math.round((postedCount / reviews.length) * 100) : 0}% response rate`, bg: "bg-emerald-50", col: "text-emerald-600" },
            { icon: CalendarClock, label: "Scheduled", value: String(scheduledCount), sub: "posting in 5 min", bg: "bg-violet-50", col: "text-violet-500" },
            { icon: Clock, label: "Awaiting Reply", value: String(pendingCount), sub: "need your attention", bg: "bg-amber-50", col: "text-amber-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 card-3d">
              <div className={`p-2.5 rounded-lg ${s.bg} shrink-0`}>
                <s.icon className={`h-5 w-5 ${s.col}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 truncate">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tone + Language selectors */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 stagger-2">
          <div className="flex items-center gap-6 flex-wrap">
            {/* Tone selector */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                Reply Tone
              </p>
              <div className="flex gap-2 flex-wrap">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                      tone === t.id
                        ? `${t.active} shadow-md scale-105`
                        : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-base">{t.emoji}</span>
                    <div className="text-left">
                      <div>{t.label}</div>
                      <div className="text-xs font-normal opacity-70">{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language selector */}
            <div className="relative flex-shrink-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5 text-blue-500" />
                Reply Language
              </p>
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 transition-all min-w-[180px]"
              >
                <span className="text-xl">{currentLang.flag}</span>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-indigo-800">{currentLang.label}</p>
                  <p className="text-xs text-indigo-600">{currentLang.native}</p>
                </div>
                <ChevronRight className={`h-4 w-4 text-indigo-400 transition-transform ${showLangDropdown ? "rotate-90" : ""}`} />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-2 max-h-72 overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setShowLangDropdown(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          language === lang.code ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div>
                          <p className="text-sm font-medium">{lang.label}</p>
                          <p className="text-xs text-gray-400">{lang.native}</p>
                        </div>
                        {language === lang.code && <CheckCircle2 className="h-4 w-4 text-indigo-600 ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main two-panel layout */}
        <div className="flex gap-4 min-h-[580px]" onClick={() => showLangDropdown && setShowLangDropdown(false)}>

          {/* Left panel: review list */}
          <div className="w-80 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="p-3 border-b border-gray-100">
              <Tabs value={filterTab} onValueChange={(v) => setFilterTab(v as FilterTab)}>
                <TabsList className="w-full h-8 bg-gray-100 p-0.5 rounded-lg">
                  <TabsTrigger value="all" className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md h-7">
                    All ({reviews.length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md h-7">
                    Pending ({pendingCount})
                  </TabsTrigger>
                  <TabsTrigger value="posted" className="flex-1 text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md h-7">
                    Posted ({postedCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredReviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-10 px-4 text-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">All caught up!</p>
                </div>
              ) : (
                filteredReviews.map((review, idx) => (
                  <ReviewListItem
                    key={review.id}
                    review={review}
                    index={idx}
                    isSelected={review.id === selectedId}
                    state={replyStates[review.id] ?? { text: "", isEdited: false, isPosted: false, isGenerating: false, isScheduled: false, scheduledAt: null }}
                    onClick={() => setSelectedId(review.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right panel: reply editor */}
          {selectedReview && selectedState ? (
            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">

              {/* Review header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className={`font-semibold ${AVATAR_COLORS[reviews.indexOf(selectedReview) % AVATAR_COLORS.length]}`}>
                      {getInitials(selectedReview.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">{selectedReview.author}</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarDisplay rating={selectedReview.rating} size="md" />
                          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${getRatingColor(selectedReview.rating)}`}>
                            {selectedReview.rating}/5
                          </span>
                          <span className="text-xs text-gray-400">{formatDate(selectedReview.reviewDate)}</span>
                          <Badge variant="outline" className="text-xs text-gray-500 border-gray-200 h-5 px-1.5">
                            <Globe className="h-3 w-3 mr-1" />
                            {selectedReview.platform === "GOOGLE" ? "Google" : selectedReview.platform}
                          </Badge>
                        </div>
                      </div>
                      {selectedState.isPosted ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5" />Posted
                        </Badge>
                      ) : selectedState.isScheduled ? (
                        <Badge className="bg-violet-50 text-violet-700 border-violet-200 gap-1.5 text-xs">
                          <Timer className="h-3.5 w-3.5 animate-pulse" />Scheduled
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200 gap-1.5 text-xs">
                          <Clock className="h-3.5 w-3.5" />Awaiting reply
                        </Badge>
                      )}
                    </div>
                    <div className="mt-3 p-3.5 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedReview.text ?? "(No written review — star rating only)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply section */}
              <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">

                {/* Label + controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                      <Sparkles className="h-4 w-4 text-violet-600" />
                      AI-Generated Reply
                    </div>
                    {selectedState.isEdited && (
                      <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50">Edited</Badge>
                    )}
                    {/* Current tone + lang badges */}
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TONES.find((t) => t.id === tone)?.active ?? ""}`}>
                      {TONES.find((t) => t.id === tone)?.emoji} {TONES.find((t) => t.id === tone)?.label}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 font-medium">
                      {currentLang.flag} {currentLang.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CopyButton text={selectedState.text} />
                    <button
                      onClick={() => handleRegenerate(selectedReview.id)}
                      disabled={selectedState.isGenerating || selectedState.isScheduled}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet-600 px-2 py-1 rounded-md hover:bg-violet-50 disabled:opacity-40 transition-colors"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${selectedState.isGenerating ? "animate-spin text-violet-600" : ""}`} />
                      {selectedState.isGenerating ? "Generating…" : "Regenerate"}
                    </button>
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative">
                  {selectedState.isGenerating ? (
                    <div className="w-full min-h-[140px] rounded-lg border border-violet-200 bg-violet-50/40 flex flex-col items-center justify-center gap-3 text-sm text-violet-600">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-violet-400 rounded-full typing-dot" />
                        <div className="w-2 h-2 bg-violet-400 rounded-full typing-dot" />
                        <div className="w-2 h-2 bg-violet-400 rounded-full typing-dot" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span>Claude is crafting a <strong>{TONES.find((t) => t.id === tone)?.label}</strong> reply in <strong>{currentLang.label}</strong>…</span>
                      </div>
                    </div>
                  ) : (
                    <Textarea
                      value={selectedState.text}
                      onChange={(e) => handleTextChange(selectedReview.id, e.target.value)}
                      placeholder="AI reply will appear here…"
                      disabled={selectedState.isPosted || selectedState.isScheduled}
                      className="min-h-[140px] resize-none text-sm leading-relaxed border-gray-200 focus:border-violet-400 focus:ring-violet-400/20 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  )}
                  <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                    {selectedState.text.length} chars
                  </div>
                </div>

                {/* Scheduled countdown display */}
                {selectedState.isScheduled && selectedState.scheduledAt && (
                  <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl border border-violet-200">
                    <CountdownBadge scheduledAt={selectedState.scheduledAt} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-violet-800">Reply scheduled!</p>
                      <p className="text-xs text-violet-600 mt-0.5">
                        This reply will be automatically posted in{" "}
                        <span className="font-bold tabular-nums">{formatCountdown(selectedState.scheduledAt)}</span>.
                        Customers won't know it was AI-generated — it looks like a human replied after reviewing.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancelSchedule(selectedReview.id)}
                      className="text-violet-700 border-violet-300 hover:bg-violet-100 flex-shrink-0"
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-1">
                  {selectedState.isPosted ? (
                    <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Reply posted to {selectedReview.platform === "GOOGLE" ? "Google" : selectedReview.platform}
                    </div>
                  ) : selectedState.isScheduled ? (
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handlePostNow(selectedReview.id)} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Send className="h-4 w-4" />
                        Post Now Instead
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleSchedule(selectedReview.id)}
                        disabled={!selectedState.text.trim() || selectedState.isGenerating}
                        className="gap-2 bg-violet-600 hover:bg-violet-700 text-white"
                      >
                        <CalendarClock className="h-4 w-4" />
                        Schedule (5 min)
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handlePostNow(selectedReview.id)}
                        disabled={!selectedState.text.trim() || selectedState.isGenerating}
                        className="gap-2 text-gray-700 border-gray-200"
                      >
                        <Send className="h-4 w-4" />
                        Post Now
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={selectedState.isGenerating}
                        className="gap-2 text-gray-500"
                        onClick={() => handleRegenerate(selectedReview.id)}
                      >
                        <Zap className="h-4 w-4 text-violet-500" />
                        New variation
                      </Button>
                    </>
                  )}
                </div>

                {/* Navigation */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Review {reviews.indexOf(selectedReview) + 1} of {reviews.length}
                  </span>
                  <div className="flex gap-1">
                    {reviews.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedId(r.id)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          r.id === selectedId ? "bg-violet-600"
                          : replyStates[r.id]?.isPosted ? "bg-emerald-400"
                          : replyStates[r.id]?.isScheduled ? "bg-violet-300"
                          : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        title={r.author}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => { const idx = reviews.findIndex((r) => r.id === selectedId); if (idx > 0) setSelectedId(reviews[idx - 1].id); }}
                      disabled={reviews.indexOf(selectedReview) === 0}
                      className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-40 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => { const idx = reviews.findIndex((r) => r.id === selectedId); if (idx < reviews.length - 1) setSelectedId(reviews[idx + 1].id); }}
                      disabled={reviews.indexOf(selectedReview) === reviews.length - 1}
                      className="text-xs text-gray-500 hover:text-gray-700 disabled:opacity-40 flex items-center gap-0.5 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      Next <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-3 glow-violet">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Select a review to get started</p>
                <p className="text-xs text-gray-400 mt-1">Choose a review from the left panel</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
