"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Star, Sparkles, BarChart3, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard",           icon: LayoutDashboard, label: "Home"     },
  { href: "/dashboard/reviews",   icon: Star,            label: "Reviews"  },
  { href: "/dashboard/qr-reviews",icon: QrCode,          label: "QR"       },
  { href: "/dashboard/ai-replies",icon: Sparkles,        label: "AI Reply" },
  { href: "/dashboard/analytics", icon: BarChart3,       label: "Analytics"},
];

export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]",
                active
                  ? "text-violet-600 dark:text-violet-400"
                  : "text-gray-400 dark:text-gray-600 hover:text-gray-700"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                active ? "bg-violet-100 dark:bg-violet-500/20 scale-110" : ""
              )}>
                <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-all",
                active ? "text-violet-600 dark:text-violet-400 font-bold" : "text-gray-400"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
