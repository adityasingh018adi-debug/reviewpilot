"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MessageCircle, Send, CheckCircle2, Clock, Star, Users,
  TrendingUp, Phone, ChevronRight, Plus, Sparkles, Copy, Check,
  Edit2, Trash2, BarChart2,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "t1", name: "Friendly Request", lang: "English",
    message: "Hi {name}! 👋 Thanks for visiting {business} today. We'd love to hear about your experience! It takes just 30 seconds:\n\n⭐ Leave a quick review here: {link}\n\nYour feedback helps us improve and helps others discover us. Thank you! 🙏",
    sent: 47, converted: 22, default: true,
  },
  {
    id: "t2", name: "Short & Sweet", lang: "English",
    message: "Hi {name}! Hope you enjoyed {business}. 😊 Could you spare 1 minute to leave us a review? It means the world to us!\n\n👉 {link}\n\nThank you!",
    sent: 23, converted: 11, default: false,
  },
  {
    id: "t3", name: "हिंदी में अनुरोध", lang: "Hindi",
    message: "नमस्ते {name}! 🙏 {business} में आपका स्वागत है। आपका अनुभव कैसा रहा? कृपया हमें एक छोटी सी समीक्षा दें:\n\n⭐ {link}\n\nआपका धन्यवाद! हम आपकी प्रतीक्षा में रहेंगे। 😊",
    sent: 14, converted: 7, default: false,
  },
];

const CAMPAIGN_LOG = [
  { id: 1, name: "Priya Sharma", phone: "+91 98765 43210", template: "Friendly Request", sent: "2 min ago", status: "delivered", reviewed: true },
  { id: 2, name: "Rahul Verma", phone: "+91 87654 32109", template: "Short & Sweet", sent: "1 hr ago", status: "delivered", reviewed: false },
  { id: 3, name: "Ananya Krishnan", phone: "+91 76543 21098", template: "हिंदी में अनुरोध", sent: "3 hrs ago", status: "read", reviewed: true },
  { id: 4, name: "Mohammed Asif", phone: "+91 65432 10987", template: "Friendly Request", sent: "Yesterday", status: "delivered", reviewed: false },
  { id: 5, name: "Deepika Nair", phone: "+91 54321 09876", template: "Friendly Request", sent: "Yesterday", status: "failed", reviewed: false },
];

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-blue-50 text-blue-700",
  read: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
  pending: "bg-amber-50 text-amber-700",
};

// ─── Main component ────────────────────────────────────────────────────────────
export function WhatsAppPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("t1");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"send" | "templates">("send");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const template = TEMPLATES.find((t) => t.id === selectedTemplate)!;
  const preview = template.message
    .replace("{name}", customerName || "Customer")
    .replace("{business}", "Sharma's Kitchen")
    .replace("{link}", "https://g.page/r/…/review");

  const handleSend = async () => {
    if (!customerPhone.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
    setTimeout(() => { setSent(false); setCustomerName(""); setCustomerPhone(""); }, 3000);
  };

  const totalSent = TEMPLATES.reduce((s, t) => s + t.sent, 0);
  const totalConverted = TEMPLATES.reduce((s, t) => s + t.converted, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center shadow-sm">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            WhatsApp Review Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Send personalised review requests via WhatsApp. <span className="font-semibold text-gray-700">90% open rate</span> vs 20% for email.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-1">
          {[
            { label: "Total Sent", value: String(totalSent), sub: "messages", bg: "bg-[#25D366]/10", col: "text-[#128C7E]", icon: Send },
            { label: "Delivered", value: `${Math.round((totalSent - 3) / totalSent * 100)}%`, sub: `${totalSent - 3} messages`, bg: "bg-blue-50", col: "text-blue-600", icon: CheckCircle2 },
            { label: "Opened / Read", value: "90%", sub: "industry avg: 20%", bg: "bg-indigo-50", col: "text-indigo-600", icon: TrendingUp },
            { label: "Converted to Review", value: `${Math.round(totalConverted / totalSent * 100)}%`, sub: `${totalConverted} reviews`, bg: "bg-emerald-50", col: "text-emerald-600", icon: Star },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 stat-card-3d">
              <div className={`p-2.5 rounded-lg ${s.bg} shrink-0`}><s.icon className={`h-5 w-5 ${s.col}`} /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left: Send form */}
          <div className="lg:col-span-2 space-y-5">

            {/* Tab switcher */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-2">
              <div className="flex border-b border-gray-100">
                {(["send", "templates"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${activeTab === tab ? "text-green-700 border-b-2 border-green-500 bg-green-50/30" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {tab === "send" ? "Send Request" : "Templates"}
                  </button>
                ))}
              </div>

              {activeTab === "send" && (
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Customer Name</label>
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full text-sm rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 px-4 py-2.5 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">WhatsApp Number</label>
                    <div className="flex gap-2">
                      <span className="flex items-center px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium whitespace-nowrap">🇮🇳 +91</span>
                      <input
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="flex-1 text-sm rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 px-4 py-2.5 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Template</label>
                    <div className="space-y-2">
                      {TEMPLATES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTemplate(t.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl border-2 text-sm transition-all ${selectedTemplate === t.id ? "border-green-400 bg-green-50 text-green-900" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{t.name}</span>
                            <Badge className="text-xs bg-gray-100 text-gray-600 border-0">{t.lang}</Badge>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{t.sent} sent · {t.converted} reviews</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!customerPhone.trim() || sending}
                    className={`w-full h-11 gap-2 text-sm font-bold rounded-xl transition-all ${sent ? "bg-emerald-600 hover:bg-emerald-700" : "bg-[#25D366] hover:bg-[#20bf5c]"} text-white shadow-lg shadow-green-200 disabled:opacity-50`}
                  >
                    {sending ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending…</>
                    ) : sent ? (
                      <><CheckCircle2 className="h-4 w-4" />Sent via WhatsApp!</>
                    ) : (
                      <><MessageCircle className="h-4 w-4" />Send via WhatsApp</>
                    )}
                  </Button>
                </div>
              )}

              {activeTab === "templates" && (
                <div className="p-5 space-y-3">
                  {TEMPLATES.map((t) => (
                    <div key={t.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-gray-900">{t.name}</span>
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
                          <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed line-clamp-3">{t.message}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">{t.sent} sent</span>
                        <span className="text-xs text-emerald-600 font-medium">{Math.round(t.converted / t.sent * 100)}% conversion</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full gap-2 border-dashed text-gray-500 hover:text-gray-700 h-10">
                    <Plus className="h-4 w-4" />Add Custom Template
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Preview + History */}
          <div className="lg:col-span-3 space-y-5">

            {/* Message preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 stagger-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Message Preview</h3>
              <div className="bg-[#e5ddd5] rounded-xl p-4 min-h-[160px]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cbbfb5' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
              >
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                  {preview}
                </div>
                <p className="text-right text-xs text-gray-500 mt-1.5 mr-1">✓✓ Delivered</p>
              </div>
            </div>

            {/* Campaign log */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-3">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Recent Requests</h3>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8 border-green-200 text-green-700 hover:bg-green-50">
                  <Users className="h-3.5 w-3.5" />Bulk Upload CSV
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>{["Customer", "Template", "Sent", "Status", "Review?"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {CAMPAIGN_LOG.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50/60">
                        <td className="px-5 py-3">
                          <p className="font-medium text-gray-900 text-sm">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.phone}</p>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-600 max-w-[120px] truncate">{c.template}</td>
                        <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap">{c.sent}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                        </td>
                        <td className="px-5 py-3">
                          {c.reviewed
                            ? <span className="flex items-center gap-1 text-xs text-emerald-600"><Star className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />Posted</span>
                            : <span className="text-xs text-gray-400">Pending</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
