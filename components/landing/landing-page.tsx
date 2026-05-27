"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star, Zap, Globe, Shield, TrendingUp, CheckCircle,
  ArrowRight, Sparkles, MessageSquare, BarChart3,
  ChevronRight, Play, Bell, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-violet-100 shadow-sm"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-violet-200"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-xl" style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>ReviewPilot</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {["Features", "Languages", "Pricing"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className="text-sm text-slate-600 hover:text-violet-600 transition-colors font-medium">
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="text-sm text-slate-600 hover:text-violet-600 transition-colors font-medium">
                Sign in
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2 text-sm font-semibold text-white rounded-xl shadow-lg shadow-violet-200/60 transition-all hover:scale-105 hover:shadow-violet-300/60"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  Start Free Trial
                </button>
              </Link>
            </div>

            <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-violet-100 px-4 py-4 space-y-3">
            {["Features", "Languages", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="block text-sm text-slate-600 hover:text-violet-600 py-1.5 font-medium"
                onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="flex-1 text-center py-2.5 text-sm font-medium text-violet-700 border border-violet-200 rounded-xl">Sign in</Link>
              <Link href="/signup" className="flex-1 text-center py-2.5 text-sm font-semibold text-white rounded-xl"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 45%, #fce7f3 100%)"
        }} />

        {/* Animated blobs */}
        <div className="absolute top-24 left-8 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-16 right-8 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 rounded-full px-4 py-1.5 text-sm font-semibold border border-violet-200/50">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered · 20+ Languages · Global
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Turn Every{" "}
              <span style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Review</span>
              <br />Into Growth
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Reply to Google reviews in seconds with AI that matches your brand tone —
              in any language. Protect your reputation and grow on autopilot.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <button className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-xl shadow-violet-300/40 transition-all hover:scale-105 hover:shadow-violet-400/50 w-full sm:w-auto"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  Start 14-day Free Trial
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-violet-700 bg-white border-2 border-violet-200 rounded-2xl hover:bg-violet-50 hover:border-violet-300 transition-all w-full sm:w-auto">
                  <Play className="w-4 h-4" />
                  View Live Demo
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
              {["No credit card", "Cancel anytime", "Free 14 days"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-violet-500" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — 3D dashboard mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-rose-400/10 rounded-3xl blur-3xl" />

            <div className="relative dashboard-3d-card w-full max-w-md">
              {/* Floating badge top-right */}
              <div className="absolute -top-5 -right-3 z-20 flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-full shadow-xl animate-bounce-slow"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                <Zap className="w-3 h-3" /> Replied in 2s
              </div>

              {/* Floating badge bottom-left */}
              <div className="absolute -bottom-5 -left-3 z-20 flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-violet-200 rounded-2xl shadow-xl animate-float">
                <Globe className="w-3.5 h-3.5 text-violet-600" />
                20+ Languages
              </div>

              {/* Main card */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-violet-200/50 overflow-hidden border border-violet-100/50">
                {/* Header */}
                <div className="px-5 py-3.5 flex items-center justify-between"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-[10px]">R</span>
                    </div>
                    <span className="text-white font-semibold text-sm">ReviewPilot</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/30" />
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-violet-50/60">
                  {[
                    { value: "4.8★", label: "Rating", color: "text-violet-700" },
                    { value: "247", label: "Reviews", color: "text-purple-700" },
                    { value: "94%", label: "Replied", color: "text-rose-600" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-violet-50">
                      <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Review cards */}
                <div className="p-4 space-y-3 pb-5">
                  {/* English review */}
                  <div className="border border-violet-100 rounded-xl p-3.5 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">S</div>
                        <span className="text-xs font-semibold text-slate-800">Sarah M.</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                      "Amazing food and great service! Will definitely come back."
                    </p>
                    <div className="bg-violet-50 rounded-lg p-2.5 border border-violet-100">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-violet-600 mb-1">
                        <Sparkles className="w-2.5 h-2.5" /> AI REPLY
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        "Thank you so much, Sarah! We're thrilled you enjoyed your visit. We look forward to welcoming you again very soon! 🌟"
                      </p>
                    </div>
                  </div>

                  {/* French review */}
                  <div className="border border-rose-100 rounded-xl p-3.5 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-xs font-bold text-rose-700">M</div>
                        <span className="text-xs font-semibold text-slate-800">Marie D.</span>
                        <span className="text-[9px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">🇫🇷 French</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4].map((i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                        <Star className="w-3 h-3 text-slate-200 fill-slate-200" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-2.5">"Très bon service, je recommande!"</p>
                    <div className="bg-rose-50 rounded-lg p-2.5 border border-rose-100">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 mb-1">
                        <Sparkles className="w-2.5 h-2.5" /> AI REPLY (French)
                      </div>
                      <p className="text-xs text-slate-600">
                        "Merci beaucoup, Marie! Votre retour nous touche. À très bientôt! 😊"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-12 bg-white border-y border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Businesses worldwide" },
              { value: "20+", label: "Languages supported" },
              { value: "2s", label: "Average reply time" },
              { value: "4.9★", label: "Product rating" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-3xl font-bold" style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full">
              Features
            </span>
            <h2 className="text-4xl font-bold text-slate-900">Everything you need to dominate reviews</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From AI replies to multi-language support — ReviewPilot handles your entire review strategy automatically.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                gradient: "from-violet-500 to-purple-600",
                bg: "bg-violet-50",
                iconBg: "bg-violet-100",
                iconColor: "text-violet-600",
                tagBg: "bg-violet-50 text-violet-700",
                title: "AI Tone Selection",
                description: "Reply in your brand's voice — friendly, luxury, professional, or funny. The AI adapts perfectly to every review.",
                tags: ["Friendly", "Luxury", "Professional", "Funny"],
              },
              {
                icon: Globe,
                gradient: "from-rose-500 to-pink-600",
                bg: "bg-rose-50",
                iconBg: "bg-rose-100",
                iconColor: "text-rose-600",
                tagBg: "bg-rose-50 text-rose-700",
                title: "20+ Languages",
                description: "Auto-detect the review language and reply in the same language — English, Hindi, French, German, Arabic & more.",
                tags: ["English", "Hindi", "French", "German"],
              },
              {
                icon: Shield,
                gradient: "from-amber-500 to-orange-500",
                bg: "bg-amber-50",
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600",
                tagBg: "bg-amber-50 text-amber-700",
                title: "Negative Review Alerts",
                description: "Instant alerts for 1-3 star reviews. AI suggests a de-escalation reply — you approve before it posts.",
                tags: ["Instant alerts", "Owner approval"],
              },
              {
                icon: BarChart3,
                gradient: "from-emerald-500 to-teal-500",
                bg: "bg-emerald-50",
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-600",
                tagBg: "bg-emerald-50 text-emerald-700",
                title: "Analytics Dashboard",
                description: "Track rating trends, sentiment analysis, response rate, and top keywords from all your reviews.",
                tags: ["Trends", "Sentiment", "Keywords"],
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title}
                  className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-violet-200 hover:shadow-xl hover:shadow-violet-50/80 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.iconBg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-base">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {feature.tags.map((tag) => (
                      <span key={tag} className={`text-xs px-2.5 py-1 rounded-full font-medium ${feature.tagBg}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LANGUAGES ── */}
      <section id="languages" className="py-24" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fce7f3 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                Global Reach
              </span>
              <h2 className="text-4xl font-bold text-slate-900">
                Reply in any language, automatically
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Whether your customer writes in Hindi, French, German, or Arabic —
                ReviewPilot detects the language and crafts a perfect, on-brand reply in the same language.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { flag: "🇮🇳", lang: "Hindi / English" },
                  { flag: "🇫🇷", lang: "French" },
                  { flag: "🇩🇪", lang: "German" },
                  { flag: "🇪🇸", lang: "Spanish" },
                  { flag: "🇦🇪", lang: "Arabic" },
                  { flag: "🇯🇵", lang: "Japanese" },
                  { flag: "🇧🇷", lang: "Portuguese" },
                  { flag: "🇨🇳", lang: "Chinese" },
                ].map(({ flag, lang }) => (
                  <div key={lang} className="flex items-center gap-2.5 bg-white rounded-xl p-3 border border-violet-100 shadow-sm hover:border-violet-300 transition-colors">
                    <span className="text-xl">{flag}</span>
                    <span className="text-sm font-medium text-slate-700">{lang}</span>
                    <CheckCircle className="w-4 h-4 text-violet-500 ml-auto flex-shrink-0" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500">+ Italian, Korean, Russian, Turkish, Dutch, and 8 more...</p>
            </div>

            {/* Language demo card */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl shadow-violet-100/80 border border-violet-100 overflow-hidden">
                <div className="p-5" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  <p className="text-violet-200 text-xs font-medium mb-1.5">Incoming review (Arabic) 🇦🇪</p>
                  <p className="text-white font-medium text-sm leading-relaxed">
                    "الخدمة ممتازة والطعام لذيذ جداً، سأعود مرة أخرى!"
                  </p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-violet-50 rounded-lg px-3.5 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse flex-shrink-0" />
                    Language detected: <span className="font-semibold text-violet-700">Arabic 🇦🇪</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-600 bg-purple-50 rounded-lg px-3.5 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse flex-shrink-0" style={{ animationDelay: "0.5s" }} />
                    <span>Generating reply in Arabic...</span>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-violet-700 mb-2">
                      <Sparkles className="w-3 h-3" /> AI REPLY (Arabic)
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed" dir="rtl">
                      "شكراً جزيلاً على كلماتك الطيبة! يسعدنا أنك استمتعت بتجربتك معنا. نتطلع دائماً لاستقبالك! 🌟"
                    </p>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white rounded-xl"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                    <CheckCircle className="w-4 h-4" /> Approve & Post Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full">
              How It Works
            </span>
            <h2 className="text-4xl font-bold text-slate-900">Set up in under 5 minutes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[28%] right-[28%] h-0.5"
              style={{ background: "linear-gradient(90deg, #7c3aed, #ec4899)" }} />

            {[
              { step: "1", icon: Globe, title: "Connect", desc: "Link your Google Business Profile with one click. No technical skills needed — takes under 60 seconds." },
              { step: "2", icon: Sparkles, title: "AI Replies", desc: "ReviewPilot reads every new review and crafts a personalized, on-brand reply in the right language instantly." },
              { step: "3", icon: TrendingUp, title: "Grow", desc: "Approve replies, track your ratings over time, and watch your business reputation grow automatically." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative text-center space-y-5 group">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, #ede9fe, #fce7f3)" }}>
                      <Icon className="w-9 h-9 text-violet-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fce7f3 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-slate-900">Simple, transparent pricing</h2>
            <p className="text-slate-600 text-lg">Start free for 14 days. No credit card required.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pro Plan */}
            <div className="relative rounded-3xl p-8 text-white shadow-2xl shadow-violet-400/30 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%, #5b21b6 100%)" }}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative">
                <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-5 border border-white/20">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-1">Pro</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-bold">₹399</span>
                  <span className="text-white/70 text-lg">/month</span>
                </div>
                <p className="text-white/60 text-sm mb-8">14-day free trial · No credit card needed</p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited AI replies",
                    "20+ languages auto-detected",
                    "Negative review alerts",
                    "Analytics & rating trends",
                    "Daily email digest",
                    "1 business location",
                    "Google Business Profile sync",
                    "Priority support",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 text-violet-300 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className="block">
                  <button className="w-full py-3.5 text-base font-bold text-violet-700 bg-white rounded-2xl hover:bg-violet-50 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2">
                    Start 14-day Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 border border-violet-100 shadow-xl shadow-violet-50">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-slate-900">Custom</span>
              </div>
              <p className="text-slate-500 text-sm mb-8">For chains and multi-location businesses</p>

              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Pro",
                  "Unlimited locations",
                  "Zomato & Swiggy reviews",
                  "WhatsApp alerts",
                  "Team management",
                  "API access",
                  "Custom integrations",
                  "Dedicated account manager",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3.5 text-base font-semibold text-violet-700 bg-violet-50 border-2 border-violet-200 rounded-2xl hover:bg-violet-100 hover:border-violet-300 transition-all flex items-center justify-center gap-2">
                Contact Sales
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-slate-900">Loved by businesses worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                role: "Restaurant Owner, Mumbai",
                flag: "🇮🇳",
                text: "ReviewPilot transformed how we manage Google reviews. The AI replies in Hindi and English perfectly match our friendly tone. Our rating went from 4.1 to 4.7 in just 3 months!",
              },
              {
                name: "Marie Dupont",
                role: "Boutique Owner, Paris",
                flag: "🇫🇷",
                text: "The French language support is flawless. Our customers are always impressed when they receive replies in perfect French within seconds. C'est magnifique!",
              },
              {
                name: "Ahmad Hassan",
                role: "Café Owner, Dubai",
                flag: "🇦🇪",
                text: "Managing reviews in Arabic used to be a nightmare. Now ReviewPilot handles everything automatically. The negative review alerts saved us from a PR crisis twice!",
              },
            ].map((t) => (
              <div key={t.name}
                className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-violet-200 hover:shadow-xl hover:shadow-violet-50 transition-all duration-300 hover:-translate-y-1 space-y-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl border border-violet-100 bg-violet-50">
                    {t.flag}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 relative overflow-hidden" style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #4f1d96 100%)"
      }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] bg-rose-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to automate<br />your reviews?
          </h2>
          <p className="text-violet-200 text-lg max-w-xl mx-auto">
            Join 500+ businesses using ReviewPilot to grow their reputation on autopilot — in any language.
          </p>
          <Link href="/signup">
            <button className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold text-violet-700 bg-white rounded-2xl hover:bg-violet-50 transition-all shadow-2xl shadow-black/20 hover:scale-105">
              Start 14-day Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="text-violet-300 text-sm">No credit card · Cancel anytime · Free for 14 days</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-bold text-white text-lg">ReviewPilot</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI-powered review management for businesses worldwide. Grow your reputation on autopilot.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-violet-400" />
                <span className="text-violet-400 font-medium">Available worldwide</span>
              </div>
            </div>

            {[
              { title: "Product", links: ["Features", "Pricing", "Languages", "Analytics", "Integrations"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="font-semibold text-white">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-violet-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2024 ReviewPilot. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                20+ Languages
              </span>
              <span className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-violet-400" />
                Instant Alerts
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
