"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Code2, Copy, Check, Star, ExternalLink, Eye, Palette,
  Layout, Grid3X3, List, ChevronRight, Globe, Sparkles,
  Monitor, Smartphone, Download, Settings2,
} from "lucide-react";

// ─── Mock reviews for widget preview ──────────────────────────────────────────
const PREVIEW_REVIEWS = [
  { author: "Priya S.", rating: 5, text: "Absolutely loved the butter chicken! The masala is perfectly balanced and the naan is so soft.", date: "2 days ago", platform: "Google" },
  { author: "Vikram S.", rating: 5, text: "Came for my wife's birthday. Staff went above and beyond — arranged a surprise dessert!", date: "5 days ago", platform: "Google" },
  { author: "Ananya K.", rating: 5, text: "Best biryani in Delhi! We come here every Friday. Never disappointed!", date: "1 week ago", platform: "Google" },
  { author: "Deepika N.", rating: 4, text: "Great ambiance and the paneer dishes are great. Parking on weekends is the only issue.", date: "2 weeks ago", platform: "Yelp" },
  { author: "Karan M.", rating: 4, text: "Good food, friendly staff. Price is reasonable for the quality.", date: "3 weeks ago", platform: "Google" },
];

const THEMES = [
  { id: "light", label: "Light", bg: "bg-white", border: "border-gray-200", text: "text-gray-900", sub: "text-gray-500", card: "bg-white border border-gray-100" },
  { id: "dark", label: "Dark", bg: "bg-gray-900", border: "border-gray-700", text: "text-white", sub: "text-gray-400", card: "bg-gray-800 border border-gray-700" },
  { id: "violet", label: "Branded", bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-900", sub: "text-violet-600", card: "bg-white border border-violet-100" },
];

const COLORS = ["#7c3aed", "#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#1f2937"];

type WidgetLayout = "grid" | "list" | "badge" | "carousel";

// ─── Widget Preview ────────────────────────────────────────────────────────────
function WidgetPreview({
  layout, themeId, maxReviews, minRating, showSummary, showName, primaryColor, businessName,
}: {
  layout: WidgetLayout; themeId: string; maxReviews: number; minRating: number;
  showSummary: boolean; showName: boolean; primaryColor: string; businessName: string;
}) {
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  const reviews = PREVIEW_REVIEWS.filter((r) => r.rating >= minRating).slice(0, maxReviews);
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const StarRow = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => <Star key={i} className={`h-3 w-3 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />)}
    </div>
  );

  if (layout === "badge") {
    return (
      <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg ${theme.bg} ${theme.border} border`}>
        <div className="flex gap-0.5">{[1,2,3,4,5].map((i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}</div>
        <div>
          <p className="font-black text-lg" style={{ color: primaryColor }}>{avgRating}</p>
          <p className={`text-xs ${theme.sub}`}>{reviews.length} reviews</p>
        </div>
        {showName && <div className={`border-l pl-3 ${theme.border}`}><p className={`text-sm font-bold ${theme.text}`}>{businessName}</p><p className={`text-xs ${theme.sub}`}>Google Reviews</p></div>}
      </div>
    );
  }

  if (layout === "list") {
    return (
      <div className={`rounded-2xl ${theme.bg} ${theme.border} border p-5 space-y-3 max-w-sm shadow-lg`}>
        {showSummary && (
          <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: themeId === "dark" ? "#374151" : "#e5e7eb" }}>
            <div>
              <p className="font-black text-2xl" style={{ color: primaryColor }}>{avgRating}</p>
              <StarRow rating={5} />
            </div>
            <div className={`text-xs ${theme.sub}`}>{reviews.length} verified reviews</div>
          </div>
        )}
        {reviews.map((r) => (
          <div key={r.author} className="flex gap-3">
            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: primaryColor }}>{r.author[0]}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2"><span className={`text-xs font-semibold ${theme.text}`}>{r.author}</span><span className={`text-xs ${theme.sub}`}>{r.date}</span></div>
              <StarRow rating={r.rating} />
              <p className={`text-xs mt-0.5 ${theme.sub} line-clamp-2`}>{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // grid or carousel
  return (
    <div className={`rounded-2xl ${theme.bg} ${theme.border} border p-5 shadow-lg`} style={{ maxWidth: layout === "carousel" ? 320 : 480 }}>
      {showSummary && (
        <div className="flex items-center gap-4 mb-4 pb-4 border-b" style={{ borderColor: themeId === "dark" ? "#374151" : "#e5e7eb" }}>
          <div>
            <p className="font-black text-3xl" style={{ color: primaryColor }}>{avgRating}</p>
            <StarRow rating={5} />
          </div>
          <div>
            <p className={`font-bold text-sm ${theme.text}`}>{showName ? businessName : "Overall Rating"}</p>
            <p className={`text-xs ${theme.sub}`}>Based on {reviews.length} reviews</p>
            <div className="flex gap-1 mt-1">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Google</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Yelp</span>
            </div>
          </div>
        </div>
      )}
      <div className={layout === "grid" ? "grid grid-cols-2 gap-3" : "flex gap-3 overflow-x-auto pb-1"}>
        {reviews.map((r) => (
          <div key={r.author} className={`${theme.card} rounded-xl p-3 ${layout === "carousel" ? "min-w-[200px]" : ""}`}>
            <StarRow rating={r.rating} />
            <p className={`text-xs mt-1.5 ${theme.sub} line-clamp-3`}>{r.text}</p>
            <p className={`text-xs font-semibold mt-1.5 ${theme.text}`}>{r.author}</p>
            <p className={`text-xs ${theme.sub}`}>{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function WidgetPage() {
  const [layout, setLayout] = useState<WidgetLayout>("grid");
  const [themeId, setThemeId] = useState("light");
  const [maxReviews, setMaxReviews] = useState(4);
  const [minRating, setMinRating] = useState(4);
  const [showSummary, setShowSummary] = useState(true);
  const [showName, setShowName] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#7c3aed");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  const businessSlug = "sharmas-kitchen";
  const embedCode = `<!-- Reviewdot.in Widget -->
<div id="reviewdot-widget"></div>
<script
  src="https://reviewdot.in/widget.js"
  data-business="${businessSlug}"
  data-layout="${layout}"
  data-theme="${themeId}"
  data-max="${maxReviews}"
  data-min-rating="${minRating}"
  data-show-summary="${showSummary}"
  data-color="${primaryColor}"
  async>
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const LAYOUTS: { id: WidgetLayout; label: string; icon: React.ReactNode }[] = [
    { id: "grid", label: "Grid", icon: <Grid3X3 className="h-4 w-4" /> },
    { id: "list", label: "List", icon: <List className="h-4 w-4" /> },
    { id: "badge", label: "Badge", icon: <Star className="h-4 w-4" /> },
    { id: "carousel", label: "Carousel", icon: <Layout className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">

        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            Review Widget
          </h1>
          <p className="text-sm text-gray-500 mt-1">Embed live reviews on your website. Customize design, copy the code, done.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Settings panel */}
          <div className="lg:col-span-2 space-y-5">

            {/* Layout picker */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 stagger-1">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><Layout className="h-4 w-4 text-gray-400" />Layout</h3>
              <div className="grid grid-cols-2 gap-2">
                {LAYOUTS.map((l) => (
                  <button key={l.id} onClick={() => setLayout(l.id)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${layout === l.id ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                    {l.icon}{l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme picker */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 stagger-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><Palette className="h-4 w-4 text-gray-400" />Theme</h3>
              <div className="flex gap-2 mb-4">
                {THEMES.map((t) => (
                  <button key={t.id} onClick={() => setThemeId(t.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${themeId === t.id ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-gray-200 text-gray-600"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Primary Color</p>
              <div className="flex gap-2 flex-wrap">
                {COLORS.map((c) => (
                  <button key={c} onClick={() => setPrimaryColor(c)}
                    className={`w-7 h-7 rounded-lg transition-transform ${primaryColor === c ? "scale-125 ring-2 ring-offset-1 ring-gray-400" : "hover:scale-110"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 stagger-3 space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Settings2 className="h-4 w-4 text-gray-400" />Options</h3>
              {[
                { label: "Show rating summary", val: showSummary, set: setShowSummary },
                { label: "Show business name", val: showName, set: setShowName },
              ].map((opt) => (
                <div key={opt.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{opt.label}</span>
                  <Switch checked={opt.val} onCheckedChange={opt.set} />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Max Reviews: {maxReviews}</label>
                <input type="range" min={2} max={10} value={maxReviews} onChange={(e) => setMaxReviews(+e.target.value)} className="w-full accent-emerald-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Min Rating: {minRating}★+</label>
                <input type="range" min={1} max={5} value={minRating} onChange={(e) => setMinRating(+e.target.value)} className="w-full accent-emerald-600" />
              </div>
            </div>
          </div>

          {/* Preview + Embed code */}
          <div className="lg:col-span-3 space-y-5">

            {/* Preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-1">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2"><Eye className="h-4 w-4 text-gray-400" />Live Preview</h3>
                <div className="flex bg-gray-100 rounded-lg overflow-hidden text-xs">
                  {(["desktop", "mobile"] as const).map((d) => (
                    <button key={d} onClick={() => setPreviewDevice(d)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${previewDevice === d ? "bg-white shadow-sm text-gray-900 font-semibold" : "text-gray-500"}`}>
                      {d === "desktop" ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`p-6 flex justify-center bg-[#f0f0f0] overflow-auto`}
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1d5db' fill-opacity='0.4'%3E%3Cpath d='M0 0h1v1H0zm9 0h1v1H9zm10 0h1v1h-1zM0 9h1v1H0zm9 9h1v1H9zm10 0h1v1h-1zM0 19h1v1H0z'/%3E%3C/g%3E%3C/svg%3E\")" }}>
                <div style={{ width: previewDevice === "mobile" ? 340 : "100%", maxWidth: 600 }}>
                  <WidgetPreview
                    layout={layout} themeId={themeId} maxReviews={maxReviews} minRating={minRating}
                    showSummary={showSummary} showName={showName} primaryColor={primaryColor}
                    businessName="Sharma's Kitchen"
                  />
                </div>
              </div>
            </div>

            {/* Embed code */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-2">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2"><Code2 className="h-4 w-4 text-gray-400" />Embed Code</h3>
                <Button size="sm" onClick={handleCopy}
                  className={`gap-2 text-xs h-8 transition-all ${copied ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-gray-900 hover:bg-gray-700 text-white"}`}>
                  {copied ? <><Check className="h-3.5 w-3.5" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy Code</>}
                </Button>
              </div>
              <div className="p-5 bg-gray-950 rounded-b-2xl">
                <pre className="text-xs text-green-400 font-mono leading-relaxed overflow-x-auto">{embedCode}</pre>
              </div>
            </div>

            {/* Install guides */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 stagger-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Installation Guides</h3>
              <div className="space-y-2">
                {[
                  { platform: "Any Website", desc: "Paste the script before </body>", icon: <Globe className="h-4 w-4 text-gray-500" /> },
                  { platform: "WordPress", desc: "Use the Custom HTML block or theme footer", icon: <Code2 className="h-4 w-4 text-blue-500" /> },
                  { platform: "Shopify", desc: "Add to theme.liquid before </body>", icon: <Sparkles className="h-4 w-4 text-emerald-500" /> },
                  { platform: "Wix / Squarespace", desc: "Use Embed HTML widget and paste code", icon: <Layout className="h-4 w-4 text-purple-500" /> },
                ].map((g) => (
                  <div key={g.platform} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">{g.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{g.platform}</p>
                      <p className="text-xs text-gray-500">{g.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
