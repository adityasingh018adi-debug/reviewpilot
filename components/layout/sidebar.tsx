"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Moon,
  Send,
  Settings,
  Sparkles,
  Star,
  Sun,
  Users,
  FileText,
  Plug,
  LifeBuoy,
  Mail,
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
  { href: "/dashboard/team", label: "Team", icon: Building2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
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

      {/* Business switcher */}
      {business && !collapsed && (
        <div className="mx-3 mt-3 p-3 rounded-lg bg-muted/50 border">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{business.name}</p>
              <p className="text-xs text-muted-foreground truncate">{business.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
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
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs py-0 h-5">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t space-y-1">
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
            theme === "dark" ? (
              <Sun className="h-4 w-4 shrink-0" />
            ) : (
              <Moon className="h-4 w-4 shrink-0" />
            )
          ) : (
            <div className="h-4 w-4 shrink-0" />
          )}
          {!collapsed && <span className="text-sm font-medium">Toggle theme</span>}
        </Button>

        {/* User profile */}
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2",
            collapsed && "justify-center px-2"
          )}
        >
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback className="text-xs">
              {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name ?? "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user.plan} plan</p>
            </div>
          )}
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
