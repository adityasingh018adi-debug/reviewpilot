"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  QrCode, Download, Copy, Check, ExternalLink, Smartphone,
  Star, Sparkles, TrendingUp, Share2, Printer, Link2,
  CheckCircle2, ChevronRight, Zap, Globe, MessageSquare,
  Users, BarChart2, RefreshCw,
} from "lucide-react";

// ─── Config ───────────────────────────────────────────────────────────────────

const BUSINESS_NAME = "Sharma's Kitchen";
const BUSINESS_SLUG = "sharmas-kitchen";
const APP_BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://reviewpilot-eosin.vercel.app";

function qrUrl(platform: string, size = 220): string {
  const target = `${APP_BASE_URL}/review/${BUSINESS_SLUG}?platform=${platform}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(target)}&color=7c3aed&bgcolor=ffffff&format=png&margin=12`;
}

// ─── Platform data ─────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    id: "google",
    name: "Google Reviews",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    ring: "ring-blue-300",
    qrAccent: "#1a73e8",
    scans: 87,
    conversions: 34,
    badge: "Most Popular",
    badgeBg: "bg-blue-600",
    logo: (
      <svg className="h-7 w-7" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: "yelp",
    name: "Yelp",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    ring: "ring-red-300",
    qrAccent: "#d32323",
    scans: 42,
    conversions: 18,
    badge: null,
    badgeBg: "",
    logo: (
      <div className="h-7 w-7 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white font-black text-lg leading-none" style={{ fontFamily: "Georgia, serif" }}>y</span>
      </div>
    ),
  },
  {
    id: "tripadvisor",
    name: "TripAdvisor",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    ring: "ring-emerald-300",
    qrAccent: "#00aa6c",
    scans: 29,
    conversions: 11,
    badge: null,
    badgeBg: "",
    logo: (
      <div className="h-7 w-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-sm">TA</span>
      </div>
    ),
  },
];

// ─── CopyLink component ───────────────────────────────────────────────────────

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet-700 px-2 py-1.5 rounded-lg hover:bg-violet-50 transition-colors"
    >
      {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /><span className="text-emerald-600 font-medium">Copied!</span></> : <><Link2 className="h-3.5 w-3.5" />Copy link</>}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function QRReviewsPage() {
  const [activePlatform, setActivePlatform] = useState("google");

  const totalScans = PLATFORMS.reduce((s, p) => s + p.scans, 0);
  const totalConversions = PLATFORMS.reduce((s, p) => s + p.conversions, 0);
  const conversionRate = totalScans > 0 ? Math.round((totalConversions / totalScans) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center glow-violet">
                <QrCode className="h-4 w-4 text-white" />
              </div>
              QR Review Generator
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Customers scan → AI writes their review → they just post it. More reviews, zero effort.
            </p>
          </div>
          <Badge className="bg-violet-100 text-violet-700 border-violet-200 px-3 py-1.5 text-sm font-semibold">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            AI-Powered
          </Badge>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-1">
          {[
            { icon: Smartphone, label: "Total Scans", value: String(totalScans), sub: "this month", bg: "bg-violet-50", col: "text-violet-600" },
            { icon: MessageSquare, label: "Reviews Generated", value: String(totalConversions), sub: "via QR codes", bg: "bg-emerald-50", col: "text-emerald-600" },
            { icon: TrendingUp, label: "Conversion Rate", value: `${conversionRate}%`, sub: "scan → review", bg: "bg-blue-50", col: "text-blue-600" },
            { icon: Star, label: "Avg QR Rating", value: "4.7", sub: "stars from QR reviews", bg: "bg-amber-50", col: "text-amber-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 stat-card-3d">
              <div className={`p-2.5 rounded-lg ${s.bg} shrink-0`}>
                <s.icon className={`h-5 w-5 ${s.col}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── How it works ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 stagger-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            How It Works — 3 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                icon: <QrCode className="h-6 w-6 text-violet-600" />,
                title: "Print & Display",
                desc: "Print your QR code and place it at your counter, table, or receipt. Customers scan it with any smartphone.",
                bg: "bg-violet-50",
              },
              {
                step: "02",
                icon: <Sparkles className="h-6 w-6 text-blue-600" />,
                title: "AI Writes the Review",
                desc: "Customer rates their experience (1–5 stars) + optionally adds a few words. Our AI instantly crafts a polished, authentic review.",
                bg: "bg-blue-50",
              },
              {
                step: "03",
                icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />,
                title: "One-Tap Post",
                desc: "Customer copies the review and taps 'Open Google' — they're taken straight to your review page to paste & post. Done!",
                bg: "bg-emerald-50",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-0.5">STEP {item.step}</div>
                  <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── QR Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger-3">
          {PLATFORMS.map((platform) => {
            const link = `${APP_BASE_URL}/review/${BUSINESS_SLUG}?platform=${platform.id}`;
            const isActive = activePlatform === platform.id;
            return (
              <div
                key={platform.id}
                className={`bg-white rounded-2xl border-2 shadow-sm transition-all duration-200 overflow-hidden card-3d cursor-pointer ${
                  isActive ? `${platform.border} ring-2 ${platform.ring} shadow-md` : "border-gray-100 hover:border-gray-200"
                }`}
                onClick={() => setActivePlatform(platform.id)}
              >
                {/* Card header */}
                <div className={`px-5 py-3 flex items-center justify-between ${platform.bg} border-b ${platform.border}`}>
                  <div className="flex items-center gap-2.5">
                    {platform.logo}
                    <span className="font-semibold text-gray-900 text-sm">{platform.name}</span>
                  </div>
                  {platform.badge && (
                    <span className={`text-xs text-white font-semibold px-2 py-0.5 rounded-full ${platform.badgeBg}`}>
                      {platform.badge}
                    </span>
                  )}
                </div>

                {/* QR Code */}
                <div className="px-5 pt-5 pb-3 flex justify-center">
                  <div className="relative p-3 bg-white rounded-2xl shadow-inner border border-gray-100">
                    <Image
                      src={qrUrl(platform.id, 180)}
                      alt={`QR code for ${platform.name}`}
                      width={180}
                      height={180}
                      className="rounded-lg"
                      unoptimized
                    />
                    {/* Center logo overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-100">
                        {platform.logo}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-5 py-3 grid grid-cols-2 gap-2 border-t border-gray-50">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{platform.scans}</p>
                    <p className="text-xs text-gray-400">Scans</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{platform.conversions}</p>
                    <p className="text-xs text-gray-400">Reviews</p>
                  </div>
                </div>
                <div className="px-5 pb-3">
                  <Progress
                    value={platform.scans > 0 ? Math.round((platform.conversions / platform.scans) * 100) : 0}
                    className="h-1.5"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {platform.scans > 0 ? Math.round((platform.conversions / platform.scans) * 100) : 0}% conversion rate
                  </p>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4 flex flex-col gap-2">
                  <Button
                    className="w-full h-8 text-xs bg-violet-600 hover:bg-violet-700 text-white gap-2"
                    onClick={(e) => { e.stopPropagation(); window.open(qrUrl(platform.id, 400), "_blank"); }}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download QR Code
                  </Button>
                  <div className="flex gap-2">
                    <CopyLinkButton url={link} />
                    <button
                      onClick={(e) => { e.stopPropagation(); window.print(); }}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Printer className="h-3.5 w-3.5" />Print
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (navigator.share) navigator.share({ title: `Review ${BUSINESS_NAME}`, url: link });
                      }}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Share2 className="h-3.5 w-3.5" />Share
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Tips banner ── */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white stagger-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Pro Tips to Get More Reviews</h3>
              <ul className="text-sm text-violet-100 space-y-1.5">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300 shrink-0" /> Place QR codes at the checkout counter & on tables — scan rate increases by 3x</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300 shrink-0" /> Add "Scan to leave us a review" text below the QR — customers need the prompt</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300 shrink-0" /> Train staff to mention it verbally after a positive experience</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300 shrink-0" /> Include QR code on printed receipts for after-dining reviews</li>
              </ul>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="text-right">
                <p className="text-2xl font-black">+340%</p>
                <p className="text-xs text-violet-200">avg review increase</p>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />vs manual ask
              </Badge>
            </div>
          </div>
        </div>

        {/* ── Preview link ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between stagger-5">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Preview Customer Experience</h3>
            <p className="text-xs text-gray-500 mt-0.5">See exactly what your customers see when they scan the QR code</p>
          </div>
          <div className="flex items-center gap-3">
            <code className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
              /review/{BUSINESS_SLUG}
            </code>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 border-violet-200 text-violet-700 hover:bg-violet-50"
              onClick={() => window.open(`/review/${BUSINESS_SLUG}?platform=google`, "_blank")}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Preview Page
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
