"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Sparkles, QrCode, Bell, MessageCircle, Bot, Trophy,
  Newspaper, MapPin, Code2, BarChart3, Mail, Users,
  FileText, Plug, Building2, Settings, CreditCard, LifeBuoy,
  ArrowRight, Search, Star, Zap, TrendingUp,
} from "lucide-react";

const TOOLS = [
  {
    href: "/dashboard/ai-replies",
    icon: Sparkles,
    name: "AI Reply Studio",
    tagline: "Reply in seconds",
    desc: "4 tones · 15 languages · 5-min human-delay scheduling",
    from: "#7B5CFF", to: "#9B6FFF",
    category: "AI",
    badge: "⭐ Popular",
    uses: 2340,
  },
  {
    href: "/dashboard/qr-reviews",
    icon: QrCode,
    name: "QR Review Generator",
    tagline: "Scan → AI writes → post",
    desc: "Customer scans QR, AI crafts review, they post with one tap. 3× more reviews.",
    from: "#6366F1", to: "#4F46E5",
    category: "Growth",
    badge: "📱 New",
    uses: 890,
  },
  {
    href: "/dashboard/alerts",
    icon: Bell,
    name: "Smart Alerts",
    tagline: "Never miss a 1★ review",
    desc: "Instant email, SMS, Slack or push when critical reviews land.",
    from: "#EF4444", to: "#DC2626",
    category: "AI",
    badge: "🔔 Must have",
    uses: 1120,
  },
  {
    href: "/dashboard/whatsapp",
    icon: MessageCircle,
    name: "WhatsApp Requests",
    tagline: "90% open rate",
    desc: "Send personalised WhatsApp review requests after every visit.",
    from: "#22C55E", to: "#16A34A",
    category: "Growth",
    badge: "📲 WhatsApp",
    uses: 760,
  },
  {
    href: "/dashboard/auto-reply",
    icon: Bot,
    name: "Auto-Reply Mode",
    tagline: "Fully hands-free",
    desc: "AI replies to every new review automatically — set tone, language & delay.",
    from: "#8B5CF6", to: "#7C3AED",
    category: "AI",
    badge: "🤖 Set & forget",
    uses: 430,
  },
  {
    href: "/dashboard/goals",
    icon: Trophy,
    name: "Review Goals",
    tagline: "Track & celebrate",
    desc: "Set targets for reviews, rating & reply rate. Unlock milestone badges.",
    from: "#F97316", to: "#EA580C",
    category: "Growth",
    badge: "🏆 Gamified",
    uses: 340,
  },
  {
    href: "/dashboard/digest",
    icon: Newspaper,
    name: "Weekly Digest",
    tagline: "Inbox every Monday",
    desc: "Beautiful weekly email: new reviews, rating trend, AI suggestions.",
    from: "#0EA5E9", to: "#0284C7",
    category: "Reports",
    badge: "📧 Auto-report",
    uses: 210,
  },
  {
    href: "/dashboard/locations",
    icon: MapPin,
    name: "Multi-Location",
    tagline: "All branches, one view",
    desc: "Manage every location from one dashboard. Compare ratings side-by-side.",
    from: "#10B981", to: "#059669",
    category: "Manage",
    badge: "📍 Scale up",
    uses: 180,
  },
  {
    href: "/dashboard/widget",
    icon: Code2,
    name: "Review Widget",
    tagline: "Reviews on your site",
    desc: "Embeddable widget in 4 layouts — grid, list, badge, carousel.",
    from: "#14B8A6", to: "#0D9488",
    category: "Growth",
    badge: "🌐 Embed",
    uses: 290,
  },
  {
    href: "/dashboard/analytics",
    icon: BarChart3,
    name: "Analytics",
    tagline: "Deep insights",
    desc: "Rating trends, sentiment analysis, keyword tracking over time.",
    from: "#06B6D4", to: "#0891B2",
    category: "Reports",
    badge: "📊 Insights",
    uses: 670,
  },
  {
    href: "/dashboard/campaigns",
    icon: Mail,
    name: "Review Requests",
    tagline: "Email campaigns",
    desc: "Send personalised review request emails to your customers.",
    from: "#EC4899", to: "#DB2777",
    category: "Growth",
    badge: "📬 Campaigns",
    uses: 520,
  },
  {
    href: "/dashboard/customers",
    icon: Users,
    name: "Customers",
    tagline: "Know your reviewers",
    desc: "Full customer database with review history and sentiment scores.",
    from: "#A855F7", to: "#9333EA",
    category: "Manage",
    badge: "👥 CRM",
    uses: 390,
  },
  {
    href: "/dashboard/templates",
    icon: FileText,
    name: "Reply Templates",
    tagline: "Save time",
    desc: "Create and reuse AI-generated reply templates for any scenario.",
    from: "#EAB308", to: "#CA8A04",
    category: "AI",
    badge: "📝 Templates",
    uses: 480,
  },
  {
    href: "/dashboard/integrations",
    icon: Plug,
    name: "Integrations",
    tagline: "Connect everything",
    desc: "Slack, Zapier, Google My Business, Yelp, Trustpilot and more.",
    from: "#F59E0B", to: "#D97706",
    category: "Manage",
    badge: "🔌 Connect",
    uses: 150,
  },
  {
    href: "/dashboard/team",
    icon: Building2,
    name: "Team",
    tagline: "Collaborate",
    desc: "Invite team members, assign roles, manage reply permissions.",
    from: "#60A5FA", to: "#3B82F6",
    category: "Manage",
    badge: "👨‍💼 Team",
    uses: 120,
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    name: "Settings",
    tagline: "Customise everything",
    desc: "Business profile, notification preferences, AI tone settings.",
    from: "#64748B", to: "#475569",
    category: "Account",
    badge: "⚙️ Settings",
    uses: 310,
  },
  {
    href: "/dashboard/billing",
    icon: CreditCard,
    name: "Billing",
    tagline: "Manage subscription",
    desc: "View plan details, usage, invoices and upgrade options.",
    from: "#FBBF24", to: "#F59E0B",
    category: "Account",
    badge: "💳 Billing",
    uses: 90,
  },
  {
    href: "/dashboard/support",
    icon: LifeBuoy,
    name: "Support",
    tagline: "We're here to help",
    desc: "Live chat, help docs, video tutorials and priority support.",
    from: "#2DD4BF", to: "#14B8A6",
    category: "Account",
    badge: "🆘 Support",
    uses: 60,
  },
];

const CATEGORIES = ["All", "AI", "Growth", "Reports", "Manage", "Account"];

export function ToolsHub() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = TOOLS.filter(t => {
    const matchCat = cat === "All" || t.category === cat;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const topTools = [...TOOLS].sort((a, b) => b.uses - a.uses).slice(0, 3);

  return (
    <div className="min-h-screen p-6 space-y-8" style={{ background: "transparent" }}>

      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7B5CFF,#00CFFF)" }}>
            <Zap className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-black" style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #C8CCEE 50%, #7B5CFF 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>All Tools</h1>
        </div>
        <p className="text-sm" style={{ color: "#5D6590" }}>Every ReviewPilot feature in one place — {TOOLS.length} tools total</p>
      </div>

      {/* ── Quick stats ── */}
      <div className="grid grid-cols-3 gap-4">
        {topTools.map((t, i) => {
          const Icon = t.icon;
          return (
            <Link key={t.href} href={t.href}
              className="group relative rounded-2xl p-4 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "#0C1020", border: "1px solid #1E2540" }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${t.from}10, ${t.to}08)` }} />
              <div className="relative flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg,${t.from},${t.to})`, boxShadow: `0 4px 12px ${t.from}40` }}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{t.name}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-2.5 w-2.5" style={{ color: t.from }} />
                    <p className="text-[10px]" style={{ color: "#5D6590" }}>{t.uses.toLocaleString()} uses</p>
                  </div>
                </div>
                <div className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: `${t.from}20`, color: t.from }}>
                  #{i + 1}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Search + filter ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#5D6590" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tools…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 transition-all"
            style={{
              background: "#0C1020", border: "1px solid #1E2540",
              color: "#E4E8F7", caretColor: "#7B5CFF",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "#7B5CFF")}
            onBlur={e => (e.currentTarget.style.borderColor = "#1E2540")}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: cat === c ? "linear-gradient(135deg,#7B5CFF,#9B6FFF)" : "#0C1020",
                color: cat === c ? "#FFFFFF" : "#5D6590",
                border: cat === c ? "1px solid transparent" : "1px solid #1E2540",
                boxShadow: cat === c ? "0 4px 12px rgba(123,92,255,0.3)" : "none",
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tools grid ── */}
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((tool) => {
          const Icon = tool.icon;
          const isHov = hovered === tool.href;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              onMouseEnter={() => setHovered(tool.href)}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl p-5 overflow-hidden flex flex-col gap-3 transition-all duration-300"
              style={{
                background: isHov ? "#0F1525" : "#0C1020",
                border: `1px solid ${isHov ? tool.from + "50" : "#1E2540"}`,
                transform: isHov ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHov ? `0 16px 40px ${tool.from}20, 0 0 0 1px ${tool.from}20` : "none",
              }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 0%, ${tool.from}12 0%, transparent 65%)` }} />

              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg,${tool.from},${tool.to})`, boxShadow: isHov ? `0 6px 20px ${tool.from}50` : `0 3px 10px ${tool.from}30` }}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${tool.from}18`, color: tool.from, border: `1px solid ${tool.from}30` }}>
                  {tool.badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-[13px] text-white">{tool.name}</h3>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: tool.from }}>{tool.tagline}</p>
                <p className="text-[11px] mt-1.5 leading-relaxed line-clamp-2" style={{ color: "#5D6590" }}>{tool.desc}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid #1E2540" }}>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" style={{ color: "#5D6590" }} />
                  <span className="text-[10px]" style={{ color: "#5D6590" }}>{tool.uses.toLocaleString()} uses</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold transition-all group-hover:gap-2"
                  style={{ color: tool.from }}>
                  Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-sm font-medium text-white">No tools found for "{search}"</p>
          <p className="text-xs mt-1" style={{ color: "#5D6590" }}>Try a different keyword</p>
        </div>
      )}
    </div>
  );
}
