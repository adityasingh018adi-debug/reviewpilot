"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Users, Star, TrendingUp, DollarSign, Zap, Activity,
  ArrowUpRight, ArrowDownRight, ShieldCheck, LogOut, RefreshCw,
  Building2, MessageSquare, BarChart2, Globe, Cpu, Eye,
  ChevronRight, MoreHorizontal, Circle,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Users",      value: 1247,  suffix: "",   change: +12.4, icon: Users,        gradient: "from-violet-600 to-purple-700",  glow: "shadow-violet-500/30" },
  { label: "Monthly Revenue",  value: 241865,suffix: "₹",  change: +8.7,  icon: DollarSign,   gradient: "from-emerald-500 to-teal-600",   glow: "shadow-emerald-500/30" },
  { label: "Total Reviews",    value: 18432, suffix: "",   change: +21.3, icon: Star,         gradient: "from-amber-500 to-orange-600",   glow: "shadow-amber-500/30" },
  { label: "AI Replies Sent",  value: 12340, suffix: "",   change: +34.1, icon: Zap,          gradient: "from-blue-500 to-indigo-600",    glow: "shadow-blue-500/30" },
  { label: "Active Businesses",value: 89,   suffix: "",   change: +5.2,  icon: Building2,    gradient: "from-rose-500 to-pink-600",      glow: "shadow-rose-500/30" },
  { label: "Avg Rating",       value: 4.3,  suffix: "★",  change: +0.2,  icon: BarChart2,    gradient: "from-cyan-500 to-sky-600",       glow: "shadow-cyan-500/30" },
];

const USERS = [
  { name: "Sharma's Kitchen",    email: "owner@sharmaskitchen.in",  plan: "Growth",   reviews: 342, status: "active",   joined: "May 12, 2026", avatar: "S", color: "bg-violet-500" },
  { name: "Tech Sphere Mumbai",  email: "admin@techsphere.co",      plan: "Starter",  reviews: 128, status: "active",   joined: "May 8, 2026",  avatar: "T", color: "bg-blue-500" },
  { name: "Wellness Hub Delhi",  email: "info@wellnesshub.in",      plan: "Growth",   reviews: 215, status: "active",   joined: "Apr 30, 2026", avatar: "W", color: "bg-emerald-500" },
  { name: "GadgetZone Pvt Ltd",  email: "support@gadgetzone.com",   plan: "Free",     reviews: 44,  status: "trial",    joined: "May 20, 2026", avatar: "G", color: "bg-amber-500" },
  { name: "Royal Eats Pune",     email: "royal@royaleats.in",       plan: "Enterprise",reviews: 891, status: "active",  joined: "Feb 14, 2026", avatar: "R", color: "bg-rose-500" },
  { name: "FitLife Gym Hyd",     email: "fitlife@gyms.in",          plan: "Starter",  reviews: 76,  status: "inactive", joined: "Mar 3, 2026",  avatar: "F", color: "bg-cyan-500" },
  { name: "CloudNine Resorts",   email: "contact@cloudnine.co",     plan: "Enterprise",reviews: 1203,status: "active",  joined: "Jan 5, 2026",  avatar: "C", color: "bg-indigo-500" },
];

const REVENUE_BARS = [
  { month: "Dec", value: 165000 },
  { month: "Jan", value: 188000 },
  { month: "Feb", value: 172000 },
  { month: "Mar", value: 201000 },
  { month: "Apr", value: 224000 },
  { month: "May", value: 241865 },
];

const PLAN_DIST = [
  { label: "Enterprise", pct: 18, color: "bg-violet-500",  ring: "#7c3aed" },
  { label: "Growth",     pct: 34, color: "bg-indigo-500",  ring: "#4f46e5" },
  { label: "Starter",    pct: 31, color: "bg-blue-500",    ring: "#3b82f6" },
  { label: "Free",       pct: 17, color: "bg-gray-600",    ring: "#4b5563" },
];

const ACTIVITY = [
  { icon: Users,        text: "New signup: CloudNine Resorts",  time: "2m ago",  color: "text-violet-400" },
  { icon: Star,         text: "1★ alert triggered for FitLife", time: "8m ago",  color: "text-red-400" },
  { icon: Zap,          text: "AI replied to 12 reviews",       time: "15m ago", color: "text-amber-400" },
  { icon: DollarSign,   text: "Payment received ₹9,999/mo",     time: "22m ago", color: "text-emerald-400" },
  { icon: Building2,    text: "New business location added",    time: "41m ago", color: "text-blue-400" },
  { icon: MessageSquare,text: "Support ticket #1234 resolved",  time: "1h ago",  color: "text-cyan-400" },
];

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = "", duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(update);
      else setVal(target);
    };
    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);

  const formatted = val >= 100000
    ? `₹${(val / 100000).toFixed(1)}L`
    : val >= 1000
    ? (val / 1000).toFixed(val >= 10000 ? 1 : 2) + "k"
    : val.toFixed(target % 1 !== 0 ? 1 : 0);

  return <span>{suffix === "₹" ? formatted : suffix === "★" ? `${val.toFixed(1)}${suffix}` : val.toLocaleString()}{suffix !== "₹" && suffix !== "★" ? suffix : ""}</span>;
}

// ─── 3D Stat card ────────────────────────────────────────────────────────────
function StatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px) scale(1.02)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateZ(0) scale(1)";
  }

  const Icon = stat.icon;
  const up = stat.change > 0;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 cursor-default shadow-xl ${stat.glow} transition-all duration-200`}
      style={{ animation: `fadeInUp 0.5s ease forwards ${delay}ms`, opacity: 0, transformStyle: "preserve-3d" }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Shine */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

      <div className="relative flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${up ? "bg-white/20 text-white" : "bg-red-500/30 text-red-200"}`}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(stat.change)}%
        </span>
      </div>

      <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</p>
      <p className="text-white text-2xl font-black">
        <Counter target={stat.value} suffix={stat.suffix} duration={1200 + delay} />
      </p>

      {/* Bottom sparkle dots */}
      <div className="absolute bottom-3 right-3 flex gap-1">
        {[0.4,0.6,1].map((o,i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" style={{ opacity: o }} />)}
      </div>
    </div>
  );
}

// ─── 3D Globe orb ────────────────────────────────────────────────────────────
function GlobeOrb() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Outer rings */}
      {[0,1,2].map(i => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-violet-500/20"
          style={{
            transform: `scale(${1 + i * 0.18}) rotateX(${60 + i * 10}deg)`,
            animation: `spin ${8 + i * 3}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
          }}
        />
      ))}
      {/* Core sphere */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 shadow-2xl shadow-violet-500/50 flex items-center justify-center">
        <Globe className="h-8 w-8 text-white/80" />
      </div>
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-xl" />
      {/* Orbiting dot */}
      <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 rounded-full bg-violet-400 shadow-lg shadow-violet-400/80" />
      </div>
    </div>
  );
}

// ─── Main dashboard ──────────────────────────────────────────────────────────
interface Props { onLogout: () => void; }

export function AdminDashboard({ onLogout }: Props) {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"overview"|"users"|"revenue">("overview");

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const maxRevenue = Math.max(...REVENUE_BARS.map(b => b.value));

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      {/* ── Top nav ── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-sm">Admin Command Center</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live clock */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/5 hover:border-red-500/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 p-6 space-y-8 max-w-[1600px] mx-auto">

        {/* ── Hero row ── */}
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
                <Activity className="h-3 w-3 text-violet-400" />
                <span className="text-xs text-violet-300 font-medium">System Operational</span>
              </div>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
              Admin Command Center
            </h1>
            <p className="text-gray-500 text-sm mt-1">Full visibility across all ReviewDot operations</p>
          </div>

          <GlobeOrb />
        </div>

        {/* ── Stat cards grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} delay={i * 80} />)}
        </div>

        {/* ── Tab nav ── */}
        <div className="flex items-center gap-1 bg-[#111118] border border-white/5 rounded-xl p-1 w-fit">
          {(["overview","users","revenue"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20" : "text-gray-500 hover:text-gray-300"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Overview tab ── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Activity feed */}
            <div className="lg:col-span-1 bg-[#111118]/80 backdrop-blur border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-sm flex items-center gap-2">
                  <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-violet-500 to-indigo-500" />
                  Live Activity
                </h2>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                        <Icon className={`h-3.5 w-3.5 ${a.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-300 leading-snug truncate">{a.text}</p>
                        <p className="text-[10px] text-gray-600 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Revenue chart */}
            <div className="lg:col-span-2 bg-[#111118]/80 backdrop-blur border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-sm flex items-center gap-2">
                    <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
                    Revenue Trend
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">Last 6 months · MRR</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-emerald-400">₹2.42L</p>
                  <p className="text-xs text-emerald-600">+8.7% this month</p>
                </div>
              </div>
              <div className="flex items-end gap-3 h-32">
                {REVENUE_BARS.map((b, i) => {
                  const h = (b.value / maxRevenue) * 100;
                  const isCurrent = i === REVENUE_BARS.length - 1;
                  return (
                    <div key={b.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                      <div className="w-full relative" style={{ height: `${h}%` }}>
                        <div
                          className={`w-full h-full rounded-t-lg transition-all duration-300 group-hover:opacity-100 ${isCurrent ? "bg-gradient-to-t from-emerald-600 to-emerald-400 opacity-100" : "bg-gradient-to-t from-emerald-900 to-emerald-700 opacity-60 group-hover:from-emerald-700 group-hover:to-emerald-500"}`}
                          style={{ animation: `growBar 0.7s ease forwards ${i * 100}ms`, transform: "scaleY(0)", transformOrigin: "bottom" }}
                        />
                        {isCurrent && (
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-400 whitespace-nowrap">₹2.42L</div>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-600">{b.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan distribution */}
            <div className="bg-[#111118]/80 backdrop-blur border border-white/5 rounded-2xl p-5">
              <h2 className="font-bold text-sm flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-indigo-500 to-blue-500" />
                Plan Distribution
              </h2>
              <div className="space-y-3">
                {PLAN_DIST.map((p) => (
                  <div key={p.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                        <span className="text-xs text-gray-300">{p.label}</span>
                      </div>
                      <span className="text-xs font-bold text-white">{p.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${p.color} rounded-full transition-all`}
                        style={{ width: `${p.pct}%`, animation: `growWidth 1s ease forwards ${PLAN_DIST.indexOf(p) * 150}ms`, transform: "scaleX(0)", transformOrigin: "left" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System health */}
            <div className="lg:col-span-2 bg-[#111118]/80 backdrop-blur border border-white/5 rounded-2xl p-5">
              <h2 className="font-bold text-sm flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-cyan-500 to-blue-500" />
                System Health
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "API Uptime",    value: "99.97%",  sub: "30d avg",       color: "text-emerald-400", ring: "#10b981" },
                  { label: "Avg Latency",   value: "142ms",   sub: "API response",  color: "text-blue-400",    ring: "#3b82f6" },
                  { label: "AI Queue",      value: "0",       sub: "pending jobs",  color: "text-violet-400",  ring: "#7c3aed" },
                  { label: "DB Health",     value: "100%",    sub: "no issues",     color: "text-cyan-400",    ring: "#06b6d4" },
                ].map((m, i) => (
                  <div key={m.label} className="bg-white/3 rounded-xl p-4 border border-white/5 text-center group hover:border-white/10 transition-all">
                    {/* Ring spinner */}
                    <div className="relative w-12 h-12 mx-auto mb-3">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <circle cx="24" cy="24" r="20" fill="none" stroke={m.ring} strokeWidth="3"
                          strokeDasharray="125.6" strokeDashoffset="8" strokeLinecap="round"
                          style={{ animation: `dashDraw 1.2s ease forwards ${i * 200}ms` }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu className={`h-4 w-4 ${m.color}`} />
                      </div>
                    </div>
                    <p className={`text-base font-black ${m.color}`}>{m.value}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{m.label}</p>
                    <p className="text-[9px] text-gray-700">{m.sub}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── Users tab ── */}
        {activeTab === "users" && (
          <div className="bg-[#111118]/80 backdrop-blur border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h2 className="font-bold text-sm">All Businesses ({USERS.length})</h2>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-emerald-400" /> Live data
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Business","Plan","Reviews","Status","Joined",""].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {USERS.map((u, i) => (
                    <tr
                      key={u.email}
                      className="border-b border-white/3 hover:bg-white/3 transition-colors group"
                      style={{ animation: `fadeInUp 0.4s ease forwards ${i * 60}ms`, opacity: 0 }}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${u.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                            {u.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-white text-xs">{u.name}</p>
                            <p className="text-[10px] text-gray-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          u.plan === "Enterprise" ? "bg-violet-500/20 text-violet-300" :
                          u.plan === "Growth"     ? "bg-indigo-500/20 text-indigo-300" :
                          u.plan === "Starter"    ? "bg-blue-500/20 text-blue-300" :
                          "bg-gray-800 text-gray-400"
                        }`}>{u.plan}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-white text-xs">{u.reviews.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className={`flex items-center gap-1.5 ${u.status === "active" ? "text-emerald-400" : u.status === "trial" ? "text-amber-400" : "text-gray-500"}`}>
                          <Circle className="h-2 w-2 fill-current" />
                          <span className="text-[10px] capitalize font-medium">{u.status}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[11px] text-gray-500">{u.joined}</td>
                      <td className="px-5 py-3.5">
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Revenue tab ── */}
        {activeTab === "revenue" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large revenue chart */}
            <div className="lg:col-span-2 bg-[#111118]/80 backdrop-blur border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-bold">Monthly Recurring Revenue</h2>
                  <p className="text-xs text-gray-500 mt-0.5">6-month view · All plans</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-400">₹2,41,865</p>
                  <p className="text-xs text-emerald-600 flex items-center gap-1 justify-end"><ArrowUpRight className="h-3 w-3" />+8.7% MoM</p>
                </div>
              </div>
              <div className="flex items-end gap-4 h-48">
                {REVENUE_BARS.map((b, i) => {
                  const h = (b.value / maxRevenue) * 100;
                  const isCurrent = i === REVENUE_BARS.length - 1;
                  return (
                    <div key={b.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full relative flex items-end" style={{ height: "100%" }}>
                        <div
                          className={`w-full rounded-t-xl transition-all duration-300 group-hover:opacity-100 ${isCurrent ? "bg-gradient-to-t from-emerald-700 via-emerald-500 to-emerald-300 opacity-100 shadow-lg shadow-emerald-500/20" : "bg-gradient-to-t from-gray-800 to-gray-600 opacity-50 group-hover:from-emerald-900 group-hover:to-emerald-700 group-hover:opacity-80"}`}
                          style={{ height: `${h}%`, animation: `growBar 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards ${i * 120}ms`, transform: "scaleY(0)", transformOrigin: "bottom" }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-400">{b.month}</p>
                        <p className="text-[9px] text-gray-600">₹{(b.value / 1000).toFixed(0)}k</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Revenue breakdown */}
            <div className="space-y-4">
              {[
                { label: "Enterprise",  mrr: 86400,  users: 16,  color: "from-violet-600 to-purple-700" },
                { label: "Growth",      mrr: 102000, users: 34,  color: "from-indigo-600 to-blue-700" },
                { label: "Starter",     mrr: 46500,  users: 31,  color: "from-blue-600 to-cyan-700" },
                { label: "Free",        mrr: 0,      users: 17,  color: "from-gray-700 to-gray-800" },
              ].map((p, i) => (
                <div
                  key={p.label}
                  className={`relative overflow-hidden bg-gradient-to-br ${p.color} rounded-2xl p-4 border border-white/5`}
                  style={{ animation: `fadeInUp 0.5s ease forwards ${i * 100}ms`, opacity: 0 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-xs font-medium">{p.label} Plan</p>
                      <p className="text-white font-black text-lg">
                        {p.mrr > 0 ? `₹${(p.mrr / 1000).toFixed(0)}k` : "Free"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/70 text-xs">{p.users} businesses</p>
                      <p className="text-white/50 text-xs">{p.mrr > 0 ? `₹${(p.mrr / p.users / 1000).toFixed(1)}k/user` : "—"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes growBar {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes growWidth {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes dashDraw {
          from { stroke-dashoffset: 125.6; }
          to   { stroke-dashoffset: 8; }
        }
      `}</style>
    </div>
  );
}
