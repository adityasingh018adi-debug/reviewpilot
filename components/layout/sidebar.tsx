"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Crown,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  Moon,
  Plug,
  Settings,
  Sparkles,
  Star,
  Sun,
  Users,
  FileText,
  UserCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { User, Business } from "@/types";

interface SidebarProps {
  user: User;
  business: Business | null;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/ai-replies", label: "AI Replies", icon: Sparkles },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/campaigns", label: "Review Requests", icon: Mail },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/templates", label: "Templates", icon: FileText },
  { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/team", label: "Team", icon: Building2 },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
  { href: "/dashboard/owner", label: "Owner", icon: UserCircle },
];

export function Sidebar({ user, business }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo + collapse toggle */}
      <div className="flex items-center justify-between p-4 h-16 border-b">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-xs">R</span>
            </div>
            <span className="font-bold">ReviewPilot</span>
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
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCollapsed(true)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="mx-auto mt-2 h-7 w-7"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t space-y-2">
        {/* Plan info box */}
        {!collapsed && (
          <Link
            href="/dashboard/growth-plan"
            className="block px-3 py-3 rounded-xl bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                <Crown className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-800">Growth Plan</span>
              <span className="text-xs font-bold text-indigo-600 ml-auto">₹999</span>
            </div>
            <div className="h-1.5 bg-indigo-100 rounded-full overflow-hidden mb-1.5">
              <div className="h-full bg-indigo-500 rounded-full w-[63%]" />
            </div>
            <p className="text-xs text-gray-400">Renews on Jun 15, 2024</p>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard/growth-plan" className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <Crown className="h-4 w-4 text-white" />
            </div>
          </Link>
        )}

        {/* Theme toggle */}
        <Button
          variant="ghost"
          className={cn(
            "w-full text-muted-foreground hover:text-foreground",
            collapsed ? "justify-center px-2" : "justify-start gap-3 px-3"
          )}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted ? (
            theme === "dark" ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />
          ) : (
            <div className="h-4 w-4 shrink-0" />
          )}
          {!collapsed && <span className="text-sm font-medium">Toggle theme</span>}
        </Button>

        {/* User profile */}
        <div className={cn("flex items-center gap-2 px-3 py-2", collapsed && "justify-center px-2")}>
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback className="text-xs">
              {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name ?? "User"}</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-xs text-muted-foreground truncate">Online</p>
              </div>
            </div>
          )}
          {!collapsed && <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
        </div>

        {/* Sign out */}
        <form action="/api/auth/signout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className={cn(
              "w-full text-muted-foreground hover:text-destructive",
              collapsed ? "justify-center px-2" : "justify-start gap-3 px-3"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Sign out</span>}
          </Button>
        </form>
      </div>
    </aside>
  );
}
