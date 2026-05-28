"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

// ─── Nav groups ───────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: null, // no label for top item
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "REVIEWS & AI",
    items: [
      { href: "/dashboard/reviews", label: "Reviews", icon: Star },
      { href: "/dashboard/ai-replies", label: "AI Replies", icon: Sparkles },
      { href: "/dashboard/auto-reply", label: "Auto-Reply", icon: Bot },
      { href: "/dashboard/alerts", label: "Smart Alerts", icon: Bell },
    ],
  },
  {
    label: "GROWTH TOOLS",
    items: [
      { href: "/dashboard/qr-reviews", label: "QR Reviews", icon: QrCode },
      { href: "/dashboard/whatsapp", label: "WhatsApp", icon: MessageCircle },
      { href: "/dashboard/goals", label: "Review Goals", icon: Trophy },
      { href: "/dashboard/widget", label: "Review Widget", icon: Code2 },
      { href: "/dashboard/digest", label: "Weekly Digest", icon: Newspaper },
    ],
  },
  {
    label: "MANAGE",
    items: [
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/campaigns", label: "Review Requests", icon: Mail },
      { href: "/dashboard/customers", label: "Customers", icon: Users },
      { href: "/dashboard/templates", label: "Templates", icon: FileText },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { href: "/dashboard/locations", label: "Locations", icon: MapPin },
      { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
      { href: "/dashboard/team", label: "Team", icon: Building2 },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
      { href: "/dashboard/owner", label: "Owner", icon: UserCircle },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { href: "/admin", label: "Admin Panel", icon: ShieldCheck },
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
        "flex flex-col h-screen sticky top-0 border-r bg-card transition-all duration-300 overflow-y-auto",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo + collapse toggle */}
      <div className="flex items-center justify-between px-4 h-14 border-b shrink-0">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0 glow-violet">
              <span className="text-primary-foreground font-bold text-xs">R</span>
            </div>
            <span className="font-bold text-sm">ReviewPilot</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">R</span>
            </div>
          </Link>
        )}
        {!collapsed && (
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setCollapsed(true)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <Button variant="ghost" size="icon" className="mx-auto mt-2 h-7 w-7 shrink-0" onClick={() => setCollapsed(false)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Nav */}
      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-1" : ""}>
            {/* Group label */}
            {group.label && !collapsed && (
              <p className="px-3 pt-3 pb-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                {group.label}
              </p>
            )}
            {group.label && collapsed && gi > 0 && (
              <div className="my-1.5 mx-3 border-t border-border/50" />
            )}
            {/* Nav items */}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t space-y-2 shrink-0">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          className={cn("w-full text-muted-foreground hover:text-foreground", collapsed ? "justify-center px-2" : "justify-start gap-3 px-3")}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted
            ? theme === "dark" ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />
            : <div className="h-4 w-4 shrink-0" />}
          {!collapsed && <span className="text-sm font-medium">Toggle theme</span>}
        </Button>

        {/* User profile */}
        <div className={cn("flex items-center gap-2 px-3 py-2", collapsed && "justify-center px-2")}>
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback className="text-xs bg-violet-100 text-violet-700 font-semibold">
              {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name ?? "User"}</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          )}
          {!collapsed && <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
        </div>

        {/* Sign out */}
        <form action="/api/auth/signout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className={cn("w-full text-muted-foreground hover:text-destructive", collapsed ? "justify-center px-2" : "justify-start gap-3 px-3")}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Sign out</span>}
          </Button>
        </form>
      </div>
    </aside>
  );
}
