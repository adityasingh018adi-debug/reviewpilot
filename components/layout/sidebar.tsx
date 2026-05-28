"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3, Bell, Bot, Building2, ChevronDown, ChevronLeft, ChevronRight,
  Code2, CreditCard, LayoutDashboard, LifeBuoy, LogOut, Mail,
  MapPin, MessageCircle, Moon, Newspaper, Plug, QrCode, Settings,
  Sparkles, Star, Sun, Trophy, UserCircle, Users, FileText, ShieldCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { User, Business } from "@/types";

interface SidebarProps { user: User; business: Business | null; }

// ─── Nav groups with individual icon colors (DoclifyAI-style) ────────────────
const NAV_GROUPS = [
  {
    label: null,
    items: [
      { href: "/dashboard",              label: "Dashboard",      icon: LayoutDashboard, color: "bg-violet-600",  text: "text-white" },
    ],
  },
  {
    label: "REVIEWS & AI",
    items: [
      { href: "/dashboard/reviews",      label: "Reviews",        icon: Star,            color: "bg-amber-500",   text: "text-white" },
      { href: "/dashboard/ai-replies",   label: "AI Replies",     icon: Sparkles,        color: "bg-purple-600",  text: "text-white" },
      { href: "/dashboard/auto-reply",   label: "Auto-Reply",     icon: Bot,             color: "bg-blue-600",    text: "text-white" },
      { href: "/dashboard/alerts",       label: "Smart Alerts",   icon: Bell,            color: "bg-red-500",     text: "text-white" },
    ],
  },
  {
    label: "GROWTH TOOLS",
    items: [
      { href: "/dashboard/qr-reviews",   label: "QR Reviews",     icon: QrCode,          color: "bg-indigo-600",  text: "text-white" },
      { href: "/dashboard/whatsapp",     label: "WhatsApp",        icon: MessageCircle,   color: "bg-emerald-500", text: "text-white" },
      { href: "/dashboard/goals",        label: "Review Goals",    icon: Trophy,          color: "bg-orange-500",  text: "text-white" },
      { href: "/dashboard/widget",       label: "Review Widget",   icon: Code2,           color: "bg-teal-600",    text: "text-white" },
      { href: "/dashboard/digest",       label: "Weekly Digest",   icon: Newspaper,       color: "bg-sky-600",     text: "text-white" },
    ],
  },
  {
    label: "MANAGE",
    items: [
      { href: "/dashboard/analytics",    label: "Analytics",       icon: BarChart3,       color: "bg-cyan-600",    text: "text-white" },
      { href: "/dashboard/campaigns",    label: "Review Requests", icon: Mail,            color: "bg-pink-600",    text: "text-white" },
      { href: "/dashboard/customers",    label: "Customers",       icon: Users,           color: "bg-violet-600",  text: "text-white" },
      { href: "/dashboard/templates",    label: "Templates",       icon: FileText,        color: "bg-amber-600",   text: "text-white" },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { href: "/dashboard/locations",    label: "Locations",       icon: MapPin,          color: "bg-green-600",   text: "text-white" },
      { href: "/dashboard/integrations", label: "Integrations",    icon: Plug,            color: "bg-orange-600",  text: "text-white" },
      { href: "/dashboard/team",         label: "Team",            icon: Building2,       color: "bg-blue-500",    text: "text-white" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { href: "/dashboard/settings",     label: "Settings",        icon: Settings,        color: "bg-slate-600",   text: "text-white" },
      { href: "/dashboard/billing",      label: "Billing",         icon: CreditCard,      color: "bg-yellow-600",  text: "text-white" },
      { href: "/dashboard/support",      label: "Support",         icon: LifeBuoy,        color: "bg-teal-500",    text: "text-white" },
      { href: "/dashboard/owner",        label: "Owner",           icon: UserCircle,      color: "bg-purple-500",  text: "text-white" },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { href: "/admin",                  label: "Admin Panel",     icon: ShieldCheck,     color: "bg-red-600",     text: "text-white" },
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
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 border-r border-border bg-card transition-all duration-300 overflow-y-auto",
        collapsed ? "w-[60px]" : "w-[220px]"
      )}
    >
      {/* ── Logo row ── */}
      <div className="flex items-center justify-between px-3 h-[52px] border-b border-border shrink-0">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[13px] leading-none text-foreground">ReviewPilot</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">Smart Tools, AI Replies</p>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-white font-black text-sm">R</span>
            </div>
          </Link>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all shrink-0"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all shrink-0"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}

      {/* ── Nav ── */}
      <nav className="flex-1 py-2 px-2 space-y-0 overflow-y-auto">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-0.5" : ""}>
            {/* Group label */}
            {group.label && !collapsed && (
              <p className="px-2 pt-3 pb-1 text-[9.5px] font-bold text-muted-foreground/50 uppercase tracking-[0.12em]">
                {group.label}
              </p>
            )}
            {group.label && collapsed && gi > 0 && (
              <div className="my-1.5 mx-2 border-t border-border/50" />
            )}

            {/* Nav items */}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-[13px] font-medium transition-all duration-150 group",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    collapsed && "justify-center px-1.5"
                  )}
                >
                  {/* Colored icon box */}
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all",
                    item.color,
                    active ? "shadow-md scale-105" : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                  )}>
                    <Icon className={cn("h-3.5 w-3.5", item.text)} />
                  </div>

                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}

                  {/* Active indicator dot */}
                  {active && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Bottom section ── */}
      <div className="p-2 border-t border-border space-y-1 shrink-0">
        {/* Theme toggle */}
        <button
          className={cn(
            "w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all",
            collapsed && "justify-center"
          )}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
            {mounted
              ? theme === "dark"
                ? <Sun className="h-3.5 w-3.5 text-amber-400" />
                : <Moon className="h-3.5 w-3.5 text-slate-300" />
              : <div className="h-3.5 w-3.5" />
            }
          </div>
          {!collapsed && (
            <span>{mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          )}
          {/* Toggle pill */}
          {!collapsed && mounted && (
            <div className={cn(
              "ml-auto w-8 h-4 rounded-full transition-all duration-300 relative shrink-0",
              theme === "dark" ? "bg-violet-600" : "bg-gray-300"
            )}>
              <div className={cn(
                "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-300",
                theme === "dark" ? "left-[18px]" : "left-0.5"
              )} />
            </div>
          )}
        </button>

        {/* User profile */}
        <div className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-muted/60 transition-all cursor-pointer",
          collapsed && "justify-center"
        )}>
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback className="text-xs bg-violet-600 text-white font-bold">
              {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-foreground truncate">{user.name ?? "Demo User"}</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[10px] text-muted-foreground">Online</p>
                </div>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
            </>
          )}
        </div>

        {/* Sign out */}
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className={cn(
              "w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-[13px] font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all",
              collapsed && "justify-center"
            )}
          >
            <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
              <LogOut className="h-3.5 w-3.5 text-red-500" />
            </div>
            {!collapsed && <span>Sign out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}
