"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import {
  Star, Zap, Globe, Shield, TrendingUp, CheckCircle,
  ArrowRight, Sparkles, MessageSquare, BarChart3,
  ChevronRight, ChevronDown, Play, Bell, Menu, X,
  Sun, Moon, ShieldCheck, Linkedin, Twitter, Facebook, Instagram,
  CreditCard, RotateCcw, Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero3D = dynamic(() => import("./hero-3d").then((m) => m.Hero3D), { ssr: false });

const NAV_LINKS = ["Features", "Languages", "Pricing"];

const RESOURCES_LINKS = [
  { label: "Blog", desc: "Tips on growing your reputation" },
  { label: "Help Center", desc: "Guides and setup docs" },
  { label: "Changelog", desc: "What's new in ReviewDot" },
  { label: "Affiliate Program", desc: "Earn by referring businesses" },
];

const TRUST_LOGOS = ["Google", "Capterra", "GetApp", "Software Advice"];

const FEATURE_PILLARS = [
  { icon: Sparkles, title: "AI That Understands", desc: "Smart replies that match your brand tone." },
  { icon: Globe, title: "Reply in 20+ Languages", desc: "Connect with customers globally." },
  { icon: Zap, title: "Save Time, Every Day", desc: "Automate replies and focus on what matters." },
  { icon: ShieldCheck, title: "Build Trust & Loyalty", desc: "Happy customers. Stronger reputation." },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Restaurant Owner, Mumbai",
    flag: "IN",
    text: "ReviewDot transformed how we manage Google reviews. The AI replies in Hindi and English perfectly match our friendly tone. Our rating went from 4.1 to 4.7 in just 3 months!",
  },
  {
    name: "Marie Dupont",
    role: "Boutique Owner, Paris",
    flag: "FR",
    text: "The French language support is flawless. Our customers are always impressed when they receive replies in perfect French within seconds. C'est magnifique!",
  },
  {
    name: "Ahmad Hassan",
    role: "Café Owner, Dubai",
    flag: "AE",
    text: "Managing reviews in Arabic was no longer a nightmare. Now ReviewDot handles everything automatically. The negative review alerts saved us from a PR crisis twice!",
  },
];

function ThemeToggle({ className = "", testId }: { className?: string; testId?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={`w-9 h-9 ${className}`} />;

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle light and dark mode"
      data-testid={testId}
      className={`w-9 h-9 rounded-xl flex items-center justify-center border border-border bg-card text-foreground hover:bg-muted transition-colors ${className}`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (!demoOpen) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDemoOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [demoOpen]);

  function scrollToTestimonial(i: number) {
    const track = testimonialTrackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
    setActiveTestimonial(i);
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-primary/30 bg-gradient-to-br from-primary to-primary/70">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ReviewDot
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                  {item}
                </a>
              ))}

              <div className="relative" ref={resourcesRef}>
                <button
                  onClick={() => setResourcesOpen((v) => !v)}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  aria-expanded={resourcesOpen}
                >
                  Resources
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-card border border-border rounded-2xl shadow-xl p-2 animate-fade-in">
                    {RESOURCES_LINKS.map((r) => (
                      <a key={r.label} href="#"
                        className="flex flex-col gap-0.5 px-3.5 py-2.5 rounded-xl hover:bg-muted transition-colors">
                        <span className="text-sm font-semibold text-foreground">{r.label}</span>
                        <span className="text-xs text-muted-foreground">{r.desc}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle testId="theme-toggle-desktop" />
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                Sign in
              </Link>
              <Link href="/signup">
                <button className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-white rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-105 bg-gradient-to-r from-primary to-primary/80">
                  Start Free Trial
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle testId="theme-toggle-mobile" />
              <button className="p-2 text-muted-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {NAV_LINKS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="block text-sm text-muted-foreground hover:text-primary py-2.5 font-medium"
                onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <div className="pt-1 pb-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-0.5 pt-1.5 pb-1">Resources</p>
              {RESOURCES_LINKS.map((r) => (
                <a key={r.label} href="#"
                  className="block text-sm text-muted-foreground hover:text-primary py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}>
                  {r.label}
                </a>
              ))}
            </div>
            <div className="flex gap-3 pt-3">
              <Link href="/login" className="flex-1 text-center py-2.5 text-sm font-medium text-primary border border-border rounded-xl">Sign in</Link>
              <Link href="/signup" className="flex-1 text-center py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary to-primary/80">
                Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/60" />

        {/* Animated blobs */}
        <div className="absolute top-24 left-8 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-16 right-8 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-4 py-1.5 text-sm font-semibold border border-border/50">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered · 20+ Languages · Global
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] text-balance">
              Turn Every{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Review</span>
              <br />Into Growth
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Reply to Google reviews in seconds with AI that matches your brand tone —
              in any language. Protect your reputation and grow on autopilot.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <button className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-105 w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80">
                  Start 14-day Free Trial
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <button
                onClick={() => setDemoOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-foreground bg-card border-2 border-border rounded-2xl hover:bg-muted transition-all w-full sm:w-auto"
              >
                <Play className="w-4 h-4" />
                View Live Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              {["No credit card", "Cancel anytime", "Free 14 days"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-primary" /> {t}
                </span>
              ))}
            </div>

            {/* Social proof row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex -space-x-2.5">
                {["S", "M", "A", "R"].map((letter, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-primary to-accent">
                    {letter}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">2K+</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-sm text-muted-foreground">Trusted by 2,000+ businesses worldwide</span>
              </div>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 border-t border-border/70">
              {TRUST_LOGOS.map((logo) => (
                <span key={logo} className="text-sm font-semibold text-muted-foreground/70 tracking-tight">{logo}</span>
              ))}
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl" />

            <Hero3D className="hidden sm:block absolute -top-16 -left-10 z-20 w-40 h-40 pointer-events-none" />

            <div className="relative dashboard-3d-card w-full max-w-md">
              <div className="absolute -top-5 -right-3 z-20 flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-full shadow-xl animate-bounce-slow bg-gradient-to-r from-primary to-primary/80">
                <Zap className="w-3 h-3" /> Replied in 2s
              </div>

              <div className="absolute -bottom-5 -left-3 z-20 flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-foreground bg-card border border-border rounded-2xl shadow-xl animate-float">
                <Globe className="w-3.5 h-3.5 text-primary" />
                20+ Languages
              </div>

              <div className="bg-card rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden border border-border/50">
                <div className="px-5 py-3.5 flex items-center justify-between bg-gradient-to-r from-primary to-primary/80">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-[10px]">R</span>
                    </div>
                    <span className="text-white font-semibold text-sm">ReviewDot</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1,2,3].map((i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/30" />)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 bg-secondary/60">
                  {[
                    { value: "4.8★", label: "Rating" },
                    { value: "247", label: "Reviews" },
                    { value: "94%", label: "Replied" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card rounded-xl p-3 text-center shadow-sm border border-border/50">
                      <div className="text-lg font-bold text-primary">{stat.value}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 space-y-3 pb-5">
                  <div className="border border-border rounded-xl p-3.5 bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">S</div>
                        <span className="text-xs font-semibold text-foreground">Sarah M.</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
                      "Amazing food and great service! Will definitely come back."
                    </p>
                    <div className="bg-secondary rounded-lg p-2.5 border border-border/50">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-primary mb-1">
                        <Sparkles className="w-2.5 h-2.5" /> AI REPLY
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        "Thank you so much, Sarah! We're thrilled you enjoyed your visit. We look forward to welcoming you again very soon! 🌟"
                      </p>
                    </div>
                  </div>

                  <div className="border border-accent/20 rounded-xl p-3.5 bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">M</div>
                        <span className="text-xs font-semibold text-foreground">Marie D.</span>
                        <span className="text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">French</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4].map((i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                        <Star className="w-3 h-3 text-muted fill-muted" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2.5">"Très bon service, je recommande!"</p>
                    <div className="bg-accent/10 rounded-lg p-2.5 border border-accent/20">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-accent mb-1">
                        <Sparkles className="w-2.5 h-2.5" /> AI REPLY (French)
                      </div>
                      <p className="text-xs text-muted-foreground">
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

      {/* ── FEATURE PILLARS ── */}
      <section className="py-14 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {FEATURE_PILLARS.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex flex-col items-start gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-secondary">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-10 pt-8 border-t border-border">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Globe className="w-4 h-4 text-primary" />
              Supports 20+ Languages
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {["🇺🇸", "🇪🇸", "🇫🇷", "🇩🇪", "🇮🇹", "🇧🇷", "🇯🇵", "🇮🇳", "🇦🇪"].map((flag, i) => (
                <span key={i} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                  {flag}
                </span>
              ))}
              <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[11px] font-bold text-muted-foreground">
                +10
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Businesses worldwide" },
              { value: "20+", label: "Languages supported" },
              { value: "2s", label: "Average reply time" },
              { value: "4.9★", label: "Product rating" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Everything you need to dominate reviews</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From AI replies to multi-language support — ReviewDot handles your entire review strategy automatically.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI Tone Selection",
                description: "Reply in your brand's voice — friendly, luxury, professional, or funny. The AI adapts perfectly to every review.",
                tags: ["Friendly", "Luxury", "Professional", "Funny"],
              },
              {
                icon: Globe,
                title: "20+ Languages",
                description: "Auto-detect the review language and reply in the same language — English, Hindi, French, German, Arabic & more.",
                tags: ["English", "Hindi", "French", "German"],
              },
              {
                icon: Shield,
                title: "Negative Review Alerts",
                description: "Instant alerts for 1-3 star reviews. AI suggests a de-escalation reply — you approve before it posts.",
                tags: ["Instant alerts", "Owner approval"],
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Track rating trends, sentiment analysis, response rate, and top keywords from all your reviews.",
                tags: ["Trends", "Sentiment", "Keywords"],
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-secondary group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {feature.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium bg-secondary text-secondary-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LANGUAGES ── */}
      <section id="languages" className="py-24 bg-gradient-to-br from-secondary via-background to-secondary/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                Global Reach
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
                Reply in any language, automatically
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether your customer writes in Hindi, French, German, or Arabic —
                ReviewDot detects the language and crafts a perfect, on-brand reply in the same language.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Sparkles, label: "AI-Powered Replies" },
                  { icon: Globe, label: "20+ Languages" },
                  { icon: CheckCircle, label: "On-Brand & Natural" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 bg-card border border-border rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary" /> {label}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { code: "IN", lang: "Hindi / English" },
                  { code: "MR", lang: "Marathi" },
                  { code: "GJ", lang: "Gujarati" },
                  { code: "EN", lang: "English" },
                  { code: "DE", lang: "German" },
                  { code: "FR", lang: "French" },
                ].map(({ code, lang }) => (
                  <div key={lang} className="flex items-center gap-2.5 bg-card rounded-xl p-3 border border-border shadow-sm hover:border-primary/40 transition-colors">
                    <span className="text-[10px] font-bold text-primary bg-secondary rounded px-1.5 py-0.5">{code}</span>
                    <span className="text-sm font-medium text-foreground">{lang}</span>
                    <CheckCircle className="w-4 h-4 text-primary ml-auto flex-shrink-0" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">+ 15 more languages supported</p>
            </div>

            {/* Language demo card */}
            <div className="relative">
              <div className="bg-card rounded-2xl shadow-2xl shadow-primary/10 border border-border overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-primary to-primary/80">
                  <p className="text-white/70 text-xs font-medium mb-1.5">Incoming review (Hindi) IN</p>
                  <p className="text-white font-medium text-sm leading-relaxed">
                    "खाना बहुत स्वादिष्ट था और सर्विस भी बहुत अच्छी थी!"
                  </p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-secondary rounded-lg px-3.5 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                    Language detected: <span className="font-semibold text-primary">Hindi</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-secondary rounded-lg px-3.5 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" style={{ animationDelay: "0.5s" }} />
                    <span>Generating reply in Hindi...</span>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary mb-2">
                      <Sparkles className="w-3 h-3" /> AI REPLY (Hindi)
                    </div>
                    <p className="text-foreground text-sm leading-relaxed">
                      "धन्यवाद! हमें खुशी है कि आपको हमारा खाना और सर्विस पसंद आई। हम आपकी अगली विज़िट का इंतज़ार करेंगे! 🙏"
                    </p>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary to-primary/80">
                    <CheckCircle className="w-4 h-4" /> Approve & Post Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Set up in under 5 minutes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[28%] right-[28%] h-0.5 bg-gradient-to-r from-primary to-accent" />

            {[
              { step: "1", icon: Globe, title: "Connect", desc: "Link your Google Business Profile with one click. No technical skills needed — takes under 60 seconds." },
              { step: "2", icon: Sparkles, title: "AI Replies", desc: "ReviewDot reads every new review and crafts a personalized, on-brand reply in the right language instantly." },
              { step: "3", icon: TrendingUp, title: "Grow", desc: "Approve replies, track your ratings over time, and watch your business reputation grow automatically." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative text-center space-y-5 group">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110 bg-secondary">
                      <Icon className="w-9 h-9 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg bg-gradient-to-r from-primary to-primary/80">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-secondary via-background to-secondary/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-lg">Start free for 14 days. No credit card required.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pro Plan */}
            <div className="relative rounded-3xl p-8 text-white shadow-2xl shadow-primary/20 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
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
                      <CheckCircle className="w-4 h-4 text-white/80 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className="block">
                  <button className="w-full py-3.5 text-base font-bold text-primary bg-white rounded-2xl hover:bg-white/90 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2">
                    Start 14-day Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-card rounded-3xl p-8 border border-border shadow-xl shadow-black/[0.02]">
              <h3 className="text-2xl font-bold text-foreground mb-1">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-foreground">Custom</span>
              </div>
              <p className="text-muted-foreground text-sm mb-8">For chains and multi-location businesses</p>

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
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-3.5 text-base font-semibold text-primary bg-secondary border-2 border-border rounded-2xl hover:bg-secondary/70 transition-all flex items-center justify-center gap-2">
                Contact Sales
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Trusted Globally
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Loved by businesses worldwide</h2>
          </div>

          <div
            ref={testimonialTrackRef}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name}
                className="min-w-[85%] sm:min-w-[360px] md:min-w-0 snap-center p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 space-y-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border/60">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold border border-border bg-secondary text-primary">
                    {t.flag}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators (mobile carousel) */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => scrollToTestimonial(i)}
                className={`h-2 rounded-full transition-all ${
                  activeTestimonial === i ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] bg-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="inline-block bg-white/15 text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20 uppercase tracking-wide">
            Join 500+ businesses
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
            Ready to automate<br />your reviews?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Join 500+ businesses using ReviewDot to grow their reputation on autopilot — in any language.
          </p>
          <Link href="/signup">
            <button className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold text-primary bg-white rounded-2xl hover:bg-white/90 transition-all shadow-2xl shadow-black/20 hover:scale-105">
              Start 14-day Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> No credit card</span>
            <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4" /> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><Gift className="w-4 h-4" /> Free for 14 days</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0b0812] dark:bg-background text-slate-400 dark:text-muted-foreground py-16 border-t border-white/5 dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-primary/70">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="font-bold text-white text-lg">ReviewDot</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI-powered review management that helps businesses collect, manage, respond, and grow — in any language.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">Available in 20+ languages</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                  <a key={i} href="#" aria-label="Social link"
                    className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: ["Features", "Languages", "AI Replies", "Integrations", "Pricing", "Changelog"] },
              { title: "Company", links: ["About Us", "Blog", "Careers", "Contact Us", "Affiliate Program"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Data Processing", "Security"] },
            ].map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="font-semibold text-white relative inline-block pb-2">
                  {col.title}
                  <span className="absolute bottom-0 left-0 w-6 h-0.5 bg-primary rounded-full" />
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-primary transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 dark:border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2024 ReviewDot. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                ISO 27001 Certified
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                Made with <span className="text-accent">♥</span> by ReviewDot
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── DEMO VIDEO MODAL ── */}
      {demoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDemoOpen(false)}
              aria-label="Close demo video"
              className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <video
              src="/videos/demo.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full aspect-video"
            />
          </div>
        </div>
      )}
    </div>
  );
}
