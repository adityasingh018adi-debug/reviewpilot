"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Newspaper, Mail, Star, TrendingUp, Send, CheckCircle2,
  Clock, Eye, BarChart2, MessageSquare, Sparkles, Calendar,
  Check, ChevronDown,
} from "lucide-react";

// ─── Mock digest history ──────────────────────────────────────────────────────
const DIGEST_HISTORY = [
  { id: 1, date: "May 26, 2025", reviews: 18, opens: 1, rating: 4.3, status: "delivered" },
  { id: 2, date: "May 19, 2025", reviews: 14, opens: 1, rating: 4.1, status: "delivered" },
  { id: 3, date: "May 12, 2025", reviews: 21, opens: 1, rating: 4.4, status: "delivered" },
  { id: 4, date: "May 5, 2025", reviews: 9, opens: 1, rating: 4.0, status: "delivered" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIMES = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "12:00 PM", "6:00 PM"];

// ─── Content checkboxes ───────────────────────────────────────────────────────
const CONTENT_OPTIONS = [
  { id: "new_reviews", label: "New reviews this week", default: true },
  { id: "avg_rating", label: "Average rating trend", default: true },
  { id: "reply_rate", label: "Reply rate & response time", default: true },
  { id: "top_keywords", label: "Top mentioned keywords", default: true },
  { id: "ai_suggestions", label: "AI reply suggestions for pending reviews", default: true },
  { id: "competitor", label: "Competitor comparison (Pro feature)", default: false, pro: true },
  { id: "sentiment", label: "Sentiment breakdown", default: false },
  { id: "qr_stats", label: "QR code scan stats", default: false },
];

// ─── Main component ────────────────────────────────────────────────────────────
export function DigestPage() {
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("9:00 AM");
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [testSent, setTestSent] = useState(false);
  const [content, setContent] = useState<Record<string, boolean>>(
    Object.fromEntries(CONTENT_OPTIONS.map((o) => [o.id, o.default]))
  );

  const toggleContent = (id: string) => setContent((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleTestSend = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <Newspaper className="h-4 w-4 text-white" />
              </div>
              Weekly Digest
            </h1>
            <p className="text-sm text-gray-500 mt-1">A beautiful email summary of your review performance, delivered every week.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Digest emails</span>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">

            {/* Schedule */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 stagger-1">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" /> Delivery Schedule
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-gray-600">Send every</span>
                <div className="relative">
                  <button
                    onClick={() => { setShowDayPicker(!showDayPicker); setShowTimePicker(false); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-800 font-semibold text-sm hover:bg-blue-100 transition-colors"
                  >
                    {day} <ChevronDown className="h-4 w-4" />
                  </button>
                  {showDayPicker && (
                    <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden min-w-[140px]">
                      {DAYS.map((d) => (
                        <button key={d} onClick={() => { setDay(d); setShowDayPicker(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${d === day ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700"}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-600">at</span>
                <div className="relative">
                  <button
                    onClick={() => { setShowTimePicker(!showTimePicker); setShowDayPicker(false); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-800 font-semibold text-sm hover:bg-blue-100 transition-colors"
                  >
                    {time} <ChevronDown className="h-4 w-4" />
                  </button>
                  {showTimePicker && (
                    <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden min-w-[120px]">
                      {TIMES.map((t) => (
                        <button key={t} onClick={() => { setTime(t); setShowTimePicker(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${t === time ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-600">to</span>
                <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg">adityasingh018adi@gmail.com</span>
              </div>
            </div>

            {/* Email preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-2">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Eye className="h-4 w-4 text-gray-400" />Email Preview</h2>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Last week's digest</Badge>
              </div>
              {/* Simulated email */}
              <div className="p-6 bg-gray-50">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-sm">
                  {/* Email header */}
                  <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="font-black text-white text-xs">R</span>
                      </div>
                      <span className="font-bold text-white">ReviewDot</span>
                    </div>
                    <h3 className="font-bold text-lg">Weekly Review Summary</h3>
                    <p className="text-violet-200 text-xs mt-0.5">May 19 – May 25, 2025 · Sharma's Kitchen</p>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
                    {[{ n: "18", l: "New Reviews" }, { n: "4.3★", l: "Avg Rating" }, { n: "67%", l: "Reply Rate" }].map((s) => (
                      <div key={s.l} className="px-4 py-3 text-center">
                        <p className="text-lg font-bold text-gray-900">{s.n}</p>
                        <p className="text-xs text-gray-500">{s.l}</p>
                      </div>
                    ))}
                  </div>
                  {/* Top review */}
                  <div className="px-5 py-4 border-b border-gray-50">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">⭐ Top Review This Week</p>
                    <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map((i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}</div>
                    <p className="text-xs text-gray-700 italic">"Absolutely loved the butter chicken here! The naan is so soft…"</p>
                    <p className="text-xs text-gray-400 mt-1">— Priya Sharma · Google</p>
                  </div>
                  {/* Pending */}
                  <div className="px-5 py-4 bg-amber-50">
                    <p className="text-xs font-semibold text-amber-800">⏳ 3 reviews need a reply</p>
                    <p className="text-xs text-amber-600 mt-0.5">Click below to reply with AI in 30 seconds</p>
                    <div className="mt-3 bg-violet-600 text-white text-xs text-center py-2 rounded-lg font-semibold">Reply with AI →</div>
                  </div>
                </div>
              </div>
            </div>

            {/* History table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-3">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Digest History</h2>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>{["Sent Date", "New Reviews", "Avg Rating", "Opened", "Status"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {DIGEST_HISTORY.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50/60">
                      <td className="px-6 py-3.5 font-medium text-gray-900">{d.date}</td>
                      <td className="px-6 py-3.5 text-gray-600">+{d.reviews}</td>
                      <td className="px-6 py-3.5">
                        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{d.rating}</span>
                      </td>
                      <td className="px-6 py-3.5 text-gray-600"><Eye className="h-3.5 w-3.5 inline mr-1 text-blue-400" />{d.opens}</td>
                      <td className="px-6 py-3.5">
                        <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 w-fit">
                          <CheckCircle2 className="h-3 w-3" />Delivered
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Customize */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 stagger-1">
              <h2 className="font-semibold text-gray-900 mb-4">Customize Content</h2>
              <div className="space-y-3">
                {CONTENT_OPTIONS.map((opt) => (
                  <div key={opt.id} className="flex items-start gap-3">
                    <button
                      onClick={() => !opt.pro && toggleContent(opt.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        content[opt.id] && !opt.pro ? "bg-blue-600 border-blue-600" : "border-gray-300"
                      } ${opt.pro ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {content[opt.id] && !opt.pro && <Check className="h-3 w-3 text-white" />}
                    </button>
                    <div className="flex-1">
                      <span className="text-sm text-gray-700">{opt.label}</span>
                      {opt.pro && <Badge className="ml-2 text-xs bg-amber-50 text-amber-700 border-amber-200">Pro</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Send test */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5 stagger-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Send a Test</p>
                  <p className="text-xs text-gray-500">Preview it in your inbox right now</p>
                </div>
              </div>
              <Button
                onClick={handleTestSend}
                className={`w-full h-10 gap-2 text-sm font-semibold rounded-xl transition-all ${testSent ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
              >
                {testSent ? <><CheckCircle2 className="h-4 w-4" />Test Sent!</> : <><Send className="h-4 w-4" />Send Test Email</>}
              </Button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 stagger-3">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">All-Time Stats</h2>
              {[
                { label: "Digests Sent", value: "18" },
                { label: "Avg Open Rate", value: "94%" },
                { label: "Reviews Replied via Digest", value: "43" },
                { label: "Next Digest", value: `${day}, ${time}` },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500">{s.label}</span>
                  <span className="text-xs font-bold text-gray-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
