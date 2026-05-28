"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3, Bell, Bot, Building2, ChevronLeft, ChevronRight,
  Code2, CreditCard, LayoutDashboard, LifeBuoy, LogOut, Mail,
  MapPin, MessageCircle, Moon, Newspaper, Plug, QrCode, Settings,
  Sparkles, Star, Sun, Trophy, UserCircle, Users, FileText,
  ShieldCheck, Wrench,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { User, Business } from "@/types";

interface SidebarProps { user: User; business: Business | null; }

// Each item has a gradient (from→to) for its icon box
const NAV_GROUPS = [
  {
    label: null,
    items: [
      { href: "/dashboard",              label: "Dashboard",      icon: LayoutDashboard, from: "#7B5CFF", to: "#9B6FFF" },
      { href: "/dashboard/tools",        label: "All Tools",      icon: Wrench,          from: "#00CFFF", to: "#0099DD" },
    ],
  },
  {
    label: "REVIEWS & AI",
    items: [
      { href: "/dashboard/reviews",      label: "Reviews",        icon: Star,            from: "#FFB020", to: "#FF8C00" },
      { href: "/dashboard/ai-replies",   label: "AI Replies",     icon: Sparkles,        from: "#A855F7", to: "#7C3AED" },
      { href: "/dashboard/auto-reply",   label: "Auto-Reply",     icon: Bot,             from: "#3B82F6", to: "#2563EB" },
      { href: "/dashboard/alerts",       label: "Smart Alerts",   icon: Bell,            from: "#EF4444", to: "#DC2626" },
    ],
  },
  {
    label: "GROWTH",
    items: [
      { href: "/dashboard/qr-reviews",   label: "QR Reviews",     icon: QrCode,          from: "#6366F1", to: "#4F46E5" },
      { href: "/dashboard/whatsapp",     label: "WhatsApp",       icon: MessageCircle,   from: "#22C55E", to: "#16A34A" },
      { href: "/dashboard/goals",        label: "Review Goals",   icon: Trophy,          from: "#F97316", to: "#EA580C" },
      { href: "/dashboard/widget",       label: "Review Widget",  icon: Code2,           from: "#14B8A6", to: "#0D9488" },
      { href: "/dashboard/digest",       label: "Weekly Digest",  icon: Newspaper,       from: "#0EA5E9", to: "#0284C7" },
    ],
  },
  {
    label: "MANAGE",
    items: [
      { href: "/dashboard/analytics",    label: "Analytics",      icon: BarChart3,       from: "#06B6D4", to: "#0891B2" },
      { href: "/dashboard/campaigns",    label: "Review Requests",icon: Mail,            from: "#EC4899", to: "#DB2777" },
      { href: "/dashboard/customers",    label: "Customers",      icon: Users,           from: "#8B5CF6", to: "#7C3AED" },
      { href: "/dashboard/templates",    label: "Templates",      icon: FileText,        from: "#EAB308", to: "#CA8A04" },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { href: "/dashboard/locations",    label: "Locations",      icon: MapPin,          from: "#10B981", to: "#059669" },
      { href: "/dashboard/integrations", label: "Integrations",   icon: Plug,            from: "#F59E0B", to: "#D97706" },
      { href: "/dashboard/team",         label: "Team",           icon: Building2,       from: "#60A5FA", to: "#3B82F6" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { href: "/dashboard/settings",     label: "Settings",       icon: Settings,        from: "#64748B", to: "#475569" },
      { href: "/dashboard/billing",      label: "Billing",        icon: CreditCard,      from: "#FBBF24", to: "#F59E0B" },
      { href: "/dashboard/support",      label: "Support",        icon: LifeBuoy,        from: "#2DD4BF", to: "#14B8A6" },
      { href: "/dashboard/owner",        label: "Owner",          icon: UserCircle,      from: "#C084FC", to: "#A855F7" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { href: "/admin",                  label: "Admin Panel",    icon: ShieldCheck,     from: "#F43F5E", to: "#E11D48" },
    ],
  },
];

export function Sidebar({ user, business }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <aside className={cn(
      "flex flex-col h-screen sticky top-0 transition-all duration-300 overflow-y-auto overflow-x-hidden",
      "border-r",
      "bg-[#060818] dark:bg-[#060818] border-[#172030]",
      collapsed ? "w-[58px]" : "w-[218px]"
    )}>

      {/* ── Logo ── */}
      <div className={cn(
        "flex items-center h-[54px] border-b border-[#172030] shrink-0 px-3",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
              style={{ background: "linear-gradient(135deg, #7B5CFF, #9B6FFF)", boxShadow: "0 4px 12px rgba(123,92,255,0.4)" }}>
              <span className="text-white font-black text-[13px]">R</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[13px] text-white leading-none">ReviewPilot</p>
              <p className="text-[10px] mt-0.5 truncate" style={{ color: "#5D6590" }}>AI Review Management</p>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg,#7B5CFF,#9B6FFF)", boxShadow: "0 4px 12px rgba(123,92,255,0.4)" }}>
              <span className="text-white font-black text-[13px]">R</span>
            </div>
          </Link>
        )}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0"
            style={{ color: "#5D6590" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E4E8F7")}
            onMouseLeave={e => (e.currentTarget.style.color = "#5D6590")}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors"
          style={{ color: "#5D6590" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#E4E8F7")}
          onMouseLeave={e => (e.currentTarget.style.color = "#5D6590")}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}

      {/* ── Nav ── */}
      <nav className="flex-1 py-2 px-2 overflow-y-auto overflow-x-hidden space-y-px">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-1" : ""}>
            {group.label && !collapsed && (
              <p className="px-2 pt-3 pb-1 text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: "#3A4060" }}>
                {group.label}
              </p>
            )}
            {group.label && collapsed && gi > 0 && (
              <div className="my-1.5 mx-2 border-t" style={{ borderColor: "#172030" }} />
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-2.5 px-1.5 py-1.5 rounded-xl text-[12.5px] font-medium transition-all duration-150 group relative",
                    collapsed && "justify-center"
                  )}
                  style={{
                    color: active ? "#E4E8F7" : "#5D6590",
                    background: active ? "rgba(123,92,255,0.12)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "#C8CCEE";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#5D6590";
                    }
                  }}
                >
                  {/* Gradient icon box */}
                  <div
                    className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200", active ? "scale-105" : "group-hover:scale-105")}
                    style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})`, boxShadow: active ? `0 3px 10px ${item.from}55` : "none" }}
                  >
                    <Icon className="h-[14px] w-[14px] text-white" />
                  </div>

                  {!collapsed && <span className="truncate flex-1">{item.label}</span>}

                  {/* Active bar */}
                  {active && !collapsed && (
                    <div className="w-1 h-4 rounded-full shrink-0" style={{ background: `linear-gradient(to bottom, ${item.from}, ${item.to})` }} />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Bottom ── */}
      <div className="p-2 shrink-0 space-y-1" style={{ borderTop: "1px solid #172030" }}>
        {/* Dark/Light toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn("w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-[12.5px] font-medium transition-all", collapsed && "justify-center")}
          style={{ color: "#5D6590" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#C8CCEE")}
          onMouseLeave={e => (e.currentTarget.style.color = "#5D6590")}
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#101828" }}>
            {mounted
              ? theme === "dark" ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-blue-400" />
              : <div className="h-3.5 w-3.5" />}
          </div>
          {!collapsed && mounted && (
            <>
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              <div className={cn("ml-auto w-9 h-[18px] rounded-full relative transition-colors shrink-0", theme === "dark" ? "bg-violet-600" : "bg-gray-600")}>
                <div className={cn("absolute top-[3px] w-3 h-3 rounded-full bg-white shadow transition-all", theme === "dark" ? "left-[21px]" : "left-[3px]")} />
              </div>
            </>
          )}
        </button>

        {/* User */}
        <div className={cn("flex items-center gap-2 px-2 py-1.5 rounded-xl cursor-pointer transition-all", collapsed && "justify-center")}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback className="text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#7B5CFF,#9B6FFF)" }}>
              {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold truncate text-white">{user.name ?? "Demo User"}</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-[10px]" style={{ color: "#5D6590" }}>Online</p>
              </div>
            </div>
          )}
        </div>

        {/* Sign out */}
        <form action="/api/auth/signout" method="POST">
          <button type="submit"
            className={cn("w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-[12.5px] font-medium transition-all", collapsed && "justify-center")}
            style={{ color: "#5D6590" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#FF4060")}
            onMouseLeave={e => (e.currentTarget.style.color = "#5D6590")}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(244,63,94,0.12)" }}>
              <LogOut className="h-[14px] w-[14px] text-rose-500" />
            </div>
            {!collapsed && <span>Sign out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
