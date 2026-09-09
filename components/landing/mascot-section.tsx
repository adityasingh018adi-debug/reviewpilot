"use client";

import Image from "next/image";
import {
  MessageSquare, Star, QrCode, Lock, Clock, Zap, TrendingUp, Users,
} from "lucide-react";
import { Reveal } from "./reveal";

/* Multi-color Google "G" mark. */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

const FEATURES = [
  { icon: MessageSquare, title: "Auto Reply to Reviews", sub: "Instant & Smart", tint: "bg-blue-500/12 text-blue-500" },
  { icon: Star, title: "Google Reviews Automation", sub: "Increase 5★ Ratings", tint: "bg-primary/12 text-primary" },
  { icon: MessageSquare, title: "Zomato Reviews Management", sub: "Reply. Engage. Grow.", tint: "bg-red-500/12 text-red-500" },
  { icon: QrCode, title: "QR Code Solution", sub: "Scan. Review. Done", tint: "bg-emerald-500/12 text-emerald-500" },
];

const TRUST = [
  { icon: Lock, title: "Secure & Safe", sub: "100% Secure Data", tint: "text-blue-500" },
  { icon: Clock, title: "24/7 Automation", sub: "Always Working for You", tint: "text-purple-500" },
  { icon: Zap, title: "Save Time", sub: "Focus on Your Business", tint: "text-emerald-500" },
  { icon: TrendingUp, title: "Grow Faster", sub: "More Reviews, More Trust", tint: "text-primary" },
];

export function MascotSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background">
      {/* soft brand glows */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal from="up" className="text-center mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-primary" /> Meet Your AI Assistant
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Automate Reviews. Build Trust.{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-primary to-accent bg-clip-text text-transparent">Grow Faster.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            ReviewBot handles every review across Google &amp; Zomato — replying, engaging, and growing your reputation on autopilot.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left — feature callouts */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} from="left" delay={i * 90}>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${f.tint}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-foreground leading-tight">{f.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.sub}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Center — robot mascot */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* halo rings */}
              <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-b from-primary/15 to-accent/10 blur-2xl" />
              <div className="absolute top-4 right-2 sm:right-6 z-20 animate-bob">
                <div className="relative px-6 py-3 rounded-2xl rounded-br-sm bg-white shadow-xl border border-border">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hi!</span>
                </div>
              </div>
              <Image
                src="/mascot/robot-violet.png"
                alt="ReviewBot — the ReviewDot AI assistant, a friendly white robot waving hello"
                width={480}
                height={640}
                priority
                className="relative z-10 w-64 sm:w-80 lg:w-full max-w-sm h-auto drop-shadow-2xl animate-float"
              />
            </div>
          </div>

          {/* Right — rating + stats cards */}
          <div className="lg:col-span-4 space-y-4 order-3">
            <Reveal from="right" delay={0}>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
                <GoogleG className="w-9 h-9 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground">Google Reviews</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Stars /> <span className="text-sm font-bold text-foreground">5.0</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" delay={90}>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-extrabold text-lg leading-none">z</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground">Zomato Reviews</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Stars /> <span className="text-sm font-bold text-foreground">5.0</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" delay={180}>
              <div className="relative p-5 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <BarSpark />
                  <h3 className="text-sm font-bold">
                    Grow Your <span className="text-accent">Online Reputation</span>
                  </h3>
                </div>
                {/* mini rising graph */}
                <svg viewBox="0 0 260 70" className="w-full h-16 mb-4" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="mascotArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 60 C40 55 55 40 90 42 C130 44 150 20 190 16 C220 13 240 8 260 4 L260 70 L0 70 Z" fill="url(#mascotArea)" />
                  <path d="M0 60 C40 55 55 40 90 42 C130 44 150 20 190 16 C220 13 240 8 260 4" fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="260" cy="4" r="4" fill="#fff" />
                </svg>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: MessageSquare, label: "Auto Replies", value: "24/7" },
                    { icon: Star, label: "Positive Reviews", value: "+95%" },
                    { icon: Users, label: "Happy Customers", value: "+10K" },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="space-y-1">
                        <Icon className="w-4 h-4 mx-auto text-accent" />
                        <div className="text-lg font-extrabold leading-none">{s.value}</div>
                        <div className="text-[10px] text-white/60 leading-tight">{s.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Trust strip */}
        <Reveal from="up" delay={120}>
          <div className="mt-14 pt-8 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 ${t.tint}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground leading-tight">{t.title}</h4>
                    <p className="text-xs text-muted-foreground">{t.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* tiny bar-chart glyph for the stats card header */
function BarSpark() {
  return (
    <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
      <span className="w-1 h-2 rounded-sm bg-accent/70" />
      <span className="w-1 h-3 rounded-sm bg-accent/80" />
      <span className="w-1 h-4 rounded-sm bg-accent" />
    </div>
  );
}
