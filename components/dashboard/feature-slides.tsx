"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  QrCode, Bell, Newspaper, MessageCircle, Bot, Trophy,
  MapPin, Code2, Sparkles, ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    href: "/dashboard/ai-replies",
    icon: Sparkles,
    label: "AI Replies",
    tagline: "Reply in seconds",
    desc: "4 tones · 15 languages · 5-min human-delay scheduling so replies look natural",
    gradient: "from-violet-600 to-indigo-600",
    glow: "shadow-violet-300/40",
    badge: "✨ Fan favourite",
  },
  {
    href: "/dashboard/qr-reviews",
    icon: QrCode,
    label: "QR Reviews",
    tagline: "Scan → AI writes → post",
    desc: "Customer scans QR, AI crafts their review, they post with one tap. 3× more reviews.",
    gradient: "from-indigo-600 to-blue-600",
    glow: "shadow-blue-300/40",
    badge: "📱 New",
  },
  {
    href: "/dashboard/alerts",
    icon: Bell,
    label: "Smart Alerts",
    tagline: "Never miss a 1★ review",
    desc: "Instant email, SMS, Slack or push when critical reviews land. Respond in minutes.",
    gradient: "from-red-500 to-orange-500",
    glow: "shadow-red-300/40",
    badge: "🔔 Protect reputation",
  },
  {
    href: "/dashboard/whatsapp",
    icon: MessageCircle,
    label: "WhatsApp Requests",
    tagline: "90% open rate",
    desc: "Send personalised WhatsApp review requests after every visit. Includes Hindi template.",
    gradient: "from-green-500 to-teal-500",
    glow: "shadow-green-300/40",
    badge: "📲 WhatsApp",
  },
  {
    href: "/dashboard/auto-reply",
    icon: Bot,
    label: "Auto-Reply Mode",
    tagline: "Fully hands-free",
    desc: "AI replies to every new review automatically — configured tone, language & delay.",
    gradient: "from-purple-600 to-violet-600",
    glow: "shadow-purple-300/40",
    badge: "🤖 Set & forget",
  },
  {
    href: "/dashboard/goals",
    icon: Trophy,
    label: "Review Goals",
    tagline: "Track & celebrate",
    desc: "Set targets for reviews, rating & reply rate. Unlock milestone badges as you grow.",
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-300/40",
    badge: "🏆 Gamified",
  },
  {
    href: "/dashboard/digest",
    icon: Newspaper,
    label: "Weekly Digest",
    tagline: "Inbox every Monday",
    desc: "Beautiful weekly email: new reviews, rating trend, pending replies, AI suggestions.",
    gradient: "from-blue-600 to-cyan-500",
    glow: "shadow-blue-300/40",
    badge: "📧 Auto-report",
  },
  {
    href: "/dashboard/locations",
    icon: MapPin,
    label: "Multi-Location",
    tagline: "All branches, one view",
    desc: "Manage every location from one dashboard. Compare ratings, reply rates side-by-side.",
    gradient: "from-teal-600 to-emerald-500",
    glow: "shadow-teal-300/40",
    badge: "📍 Scale up",
  },
  {
    href: "/dashboard/widget",
    icon: Code2,
    label: "Review Widget",
    tagline: "Reviews on your site",
    desc: "Embeddable widget in 4 layouts — grid, list, badge, carousel. One script tag.",
    gradient: "from-emerald-600 to-green-500",
    glow: "shadow-emerald-300/40",
    badge: "🌐 Embed",
  },
];

// ─── How many slides visible per viewport ────────────────────────────────────
function useSlideCount() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCount(4);
      else if (w >= 1024) setCount(3);
      else if (w >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

// ─── Main component ────────────────────────────────────────────────────────────
export function FeatureSlides() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleCount = useSlideCount();
  const maxIndex = FEATURES.length - visibleCount;

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, maxIndex)), [maxIndex]);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setCurrent((c) => {
        if (c >= maxIndex) return 0;
        return c + 1;
      });
    }, 3500);
    return () => clearInterval(id);
  }, [autoplay, maxIndex]);

  // Sync scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / FEATURES.length;
    track.scrollTo({ left: current * cardWidth, behavior: "smooth" });
  }, [current]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            All Features
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Explore everything ReviewDot can do for you</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Dot indicators */}
          <div className="flex gap-1.5 mr-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-violet-600 w-5" : "bg-gray-300 w-1.5 hover:bg-gray-400"}`}
              />
            ))}
          </div>
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            disabled={current >= maxIndex}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slide track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.href}
              href={f.href}
              className={`
                feature-slide group shrink-0 flex flex-col justify-between
                bg-gradient-to-br ${f.gradient}
                rounded-2xl p-5 text-white cursor-pointer
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl ${f.glow}
                card-3d
              `}
              style={{ width: `calc((100% - ${(visibleCount - 1) * 16}px) / ${visibleCount})` }}
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full font-medium text-white/90">
                  {f.badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-base">{f.label}</h3>
                <p className="text-white/80 text-xs font-semibold mt-0.5">{f.tagline}</p>
                <p className="text-white/70 text-xs mt-2 leading-relaxed line-clamp-2">{f.desc}</p>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                Explore
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
