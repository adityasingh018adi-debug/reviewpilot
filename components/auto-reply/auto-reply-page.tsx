"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Bot, Sparkles, CheckCircle2, Clock, Zap, Star, Shield,
  Settings2, Eye, TrendingUp, MessageSquare, RefreshCw,
  ChevronDown, AlertTriangle, Globe, Languages,
} from "lucide-react";

// ─── Mock auto-reply log ──────────────────────────────────────────────────────
const AUTO_LOG = [
  { id: 1, author: "Priya Sharma", rating: 5, platform: "Google", reply: "Thank you so much, Priya ji! We're absolutely delighted you loved the butter chicken…", delay: "5 min", posted: "2 hrs ago" },
  { id: 2, author: "Ananya Krishnan", rating: 5, platform: "Google", reply: "Ananya ji, your Friday visits make our week complete! We're so glad the biryani always hits the mark…", delay: "5 min", posted: "3 hrs ago" },
  { id: 3, author: "Deepika Nair", rating: 4, platform: "Google", reply: "Thank you Deepika ji! We're glad you enjoyed the paneer dishes — our chef will be thrilled…", delay: "5 min", posted: "Yesterday" },
  { id: 4, author: "Vikram Singh", rating: 5, platform: "Google", reply: "Vikram ji, wishing your wife a very happy birthday from all of us! 🎂 …", delay: "5 min", posted: "2 days ago" },
];

const TONES = ["Friendly", "Luxury", "Professional", "Funny"];
const LANGUAGES = ["English", "Hindi", "Marathi", "Gujarati", "Spanish", "French", "German", "Italian", "Arabic", "Japanese", "Chinese", "Indonesian", "Punjabi", "Turkish", "Korean"];
const DELAYS = [
  { label: "Immediately", value: 0, desc: "Post reply the moment a review arrives" },
  { label: "After 5 minutes", value: 5, desc: "Looks human — slight delay before posting" },
  { label: "After 1 hour", value: 60, desc: "Gives you time to review before it posts" },
  { label: "After 24 hours", value: 1440, desc: "Posts next day if you don't manually override" },
];
const MIN_RATINGS = [
  { label: "All reviews (1–5 ★)", value: 1 },
  { label: "3 stars and above", value: 3 },
  { label: "4 stars and above", value: 4 },
  { label: "5 stars only", value: 5 },
];

// ─── Main component ────────────────────────────────────────────────────────────
export function AutoReplyPage() {
  const [enabled, setEnabled] = useState(false);
  const [tone, setTone] = useState("Friendly");
  const [language, setLanguage] = useState("English");
  const [delay, setDelay] = useState(5);
  const [minRating, setMinRating] = useState(1);
  const [skipKeywords, setSkipKeywords] = useState("refund, legal, health, FSSAI");
  const [showToneDD, setShowToneDD] = useState(false);
  const [showLangDD, setShowLangDD] = useState(false);
  const [showDelayDD, setShowDelayDD] = useState(false);
  const [showRatingDD, setShowRatingDD] = useState(false);

  const repliesPosted = AUTO_LOG.length;
  const timeSaved = (repliesPosted * 11).toFixed(0); // 11 min avg per reply

  const Dropdown = ({
    open, setOpen, value, options, onChange, label,
  }: {
    open: boolean; setOpen: (v: boolean) => void;
    value: string | number; options: (string | { label: string; value: number; desc?: string })[];
    onChange: (v: string | number) => void; label?: string;
  }) => {
    const displayLabel = typeof options[0] === "string"
      ? String(value)
      : (options as { label: string; value: number }[]).find((o) => o.value === value)?.label ?? String(value);
    return (
      <div className="relative inline-block">
        {label && <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</p>}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-violet-200 bg-violet-50 text-violet-800 font-semibold text-sm hover:bg-violet-100 transition-colors min-w-[160px] justify-between"
        >
          {displayLabel} <ChevronDown className="h-4 w-4" />
        </button>
        {open && (
          <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden min-w-[200px] max-h-60 overflow-y-auto">
            {options.map((opt) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const lbl = typeof opt === "string" ? opt : opt.label;
              const desc = typeof opt === "object" && "desc" in opt ? opt.desc : undefined;
              return (
                <button key={String(val)} onClick={() => { onChange(val); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${val === value ? "bg-violet-50 text-violet-700 font-semibold" : "text-gray-700"}`}
                >
                  <div>{lbl}</div>
                  {desc && <div className="text-xs text-gray-400">{desc}</div>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" onClick={() => { setShowToneDD(false); setShowLangDD(false); setShowDelayDD(false); setShowRatingDD(false); }}>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-sm">
              <Bot className="h-4 w-4 text-white" />
            </div>
            Auto-Reply Mode
          </h1>
          <p className="text-sm text-gray-500 mt-1">Let AI automatically reply to every new review — hands-free reputation management.</p>
        </div>

        {/* Big toggle card */}
        <div className={`rounded-2xl border-2 p-6 transition-all duration-300 stagger-1 ${enabled ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-500 shadow-xl shadow-violet-200" : "bg-white border-gray-200 shadow-sm"}`}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${enabled ? "bg-white/20" : "bg-violet-50"}`}>
                <Bot className={`h-7 w-7 transition-all ${enabled ? "text-white" : "text-violet-600"}`} />
              </div>
              <div>
                <h2 className={`text-xl font-bold transition-all ${enabled ? "text-white" : "text-gray-900"}`}>
                  Auto-Reply is {enabled ? "ENABLED" : "DISABLED"}
                </h2>
                <p className={`text-sm mt-0.5 transition-all ${enabled ? "text-violet-200" : "text-gray-500"}`}>
                  {enabled
                    ? "AI is watching for new reviews and will reply automatically"
                    : "Enable to let AI handle all replies without manual action"}
                </p>
              </div>
            </div>
            <div className={`transform scale-125 ${enabled ? "ring-2 ring-white/40 rounded-full" : ""}`}>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>
          </div>

          {enabled && (
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Replies Posted", value: String(repliesPosted), icon: <CheckCircle2 className="h-4 w-4" /> },
                { label: "Time Saved", value: `~${timeSaved} min`, icon: <Clock className="h-4 w-4" /> },
                { label: "Response Time", value: `${delay === 0 ? "0" : delay >= 60 ? `${delay/60}h` : `${delay}m`} avg`, icon: <Zap className="h-4 w-4" /> },
                { label: "Auto-Rate", value: `${minRating}★+`, icon: <Star className="h-4 w-4" /> },
              ].map((s) => (
                <div key={s.label} className="bg-white/15 rounded-xl p-3 text-white">
                  <div className="flex items-center gap-1.5 text-violet-200 text-xs mb-1">{s.icon}{s.label}</div>
                  <p className="text-lg font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Config section */}
        <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-opacity duration-300 stagger-2 ${!enabled ? "opacity-50 pointer-events-none" : ""}`}
          onClick={(e) => e.stopPropagation()}>
          <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-gray-400" /> Configuration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div onClick={(e) => e.stopPropagation()}>
              <Dropdown label="Reply Tone" open={showToneDD} setOpen={setShowToneDD} value={tone} options={TONES} onChange={(v) => setTone(String(v))} />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Dropdown label="Reply Language" open={showLangDD} setOpen={setShowLangDD} value={language} options={LANGUAGES} onChange={(v) => setLanguage(String(v))} />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Dropdown label="Post Delay" open={showDelayDD} setOpen={setShowDelayDD} value={delay} options={DELAYS} onChange={(v) => setDelay(Number(v))} />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Dropdown label="Min Rating" open={showRatingDD} setOpen={setShowRatingDD} value={minRating} options={MIN_RATINGS} onChange={(v) => setMinRating(Number(v))} />
            </div>
          </div>

          {/* Skip keywords */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-amber-500" />
                Skip auto-reply if review contains:
              </label>
              <input
                value={skipKeywords}
                onChange={(e) => setSkipKeywords(e.target.value)}
                placeholder="refund, legal, complaint, FSSAI…"
                className="w-full text-sm rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 px-4 py-2.5 outline-none transition-all"
              />
              <p className="text-xs text-gray-400 mt-1.5">Comma-separated. These reviews will be flagged for manual review instead.</p>
            </div>
          </div>
        </div>

        {/* Preview + Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 stagger-3">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Eye className="h-4 w-4 text-gray-400" />Example Auto-Reply Preview</h2>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center text-xs font-bold text-violet-700">P</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Priya Sharma</p>
                  <div className="flex gap-0.5">{[1,2,3,4,5].map((i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 italic">"Absolutely loved the butter chicken! The masala is perfectly balanced and the naan is so soft."</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-violet-600" />
              <span className="text-xs font-semibold text-violet-700">Auto-reply ({delay === 0 ? "instant" : delay < 60 ? `${delay} min delay` : `${delay/60}h delay`}):</span>
            </div>
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="text-sm text-violet-900 leading-relaxed">
                "Thank you so much, Priya ji! We're absolutely delighted you enjoyed the butter chicken and naan — those are our chef's pride. Your kind words truly mean the world to us, and we can't wait to welcome you back soon! 🙏"
              </p>
              <p className="text-xs text-violet-400 mt-2">{tone} tone · {language}</p>
            </div>
          </div>

          {/* Log */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-3">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-sm">Auto-Post Log</h2>
              <Badge className="bg-violet-50 text-violet-700 border-violet-200 text-xs">{repliesPosted} posted</Badge>
            </div>
            <div className="divide-y divide-gray-50">
              {AUTO_LOG.map((entry) => (
                <div key={entry.id} className="px-5 py-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-xs font-bold text-violet-700 shrink-0">
                    {entry.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900">{entry.author}</p>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{entry.posted}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {[1,2,3,4,5].map((i) => <Star key={i} className={`h-3 w-3 ${i <= entry.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />)}
                      <span className="text-xs text-gray-400">· {entry.platform} · {entry.delay} delay</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{entry.reply}</p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
