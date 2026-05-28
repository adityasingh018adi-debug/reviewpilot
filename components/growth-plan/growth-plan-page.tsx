"use client";

import { useState } from "react";
import {
  Crown, CheckCircle2, ArrowRight, Download, MessageSquare,
  Sparkles, Users, Star, TrendingUp, LifeBuoy, Zap,
  Globe, BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  current?: boolean;
  action: string;
  actionStyle: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MONTHLY_PLANS: Plan[] = [
  {
    id: "starter", name: "Starter", price: "₹399", period: "/ month",
    desc: "Perfect for getting started",
    features: ["Up to 500 reviews / month", "Up to 250 AI replies / month", "3 team members", "Basic analytics", "Email support"],
    action: "Downgrade", actionStyle: "border border-indigo-300 text-indigo-600 hover:bg-indigo-50",
  },
  {
    id: "growth", name: "Growth", price: "₹999", period: "/ month",
    desc: "Best for growing businesses",
    features: ["Up to 2,000 reviews / month", "Up to 1,000 AI replies / month", "10 team members", "Advanced analytics", "All integrations", "Email & chat support"],
    current: true,
    action: "Current Plan", actionStyle: "bg-indigo-600 text-white",
  },
  {
    id: "pro", name: "Pro", price: "₹1,999", period: "/ month",
    desc: "For businesses scaling fast",
    features: ["Up to 5,000 reviews / month", "Up to 2,500 AI replies / month", "25 team members", "Advanced analytics", "All integrations", "Priority support"],
    action: "Upgrade", actionStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  },
  {
    id: "enterprise", name: "Enterprise", price: "Custom pricing", period: "",
    desc: "For large teams & enterprises",
    features: ["Unlimited reviews", "Unlimited AI replies", "Unlimited team members", "Advanced analytics", "Custom integrations", "Dedicated account manage..."],
    action: "Contact Sales", actionStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  },
];

const ANNUAL_PLANS: Plan[] = MONTHLY_PLANS.map((p) => ({
  ...p,
  price: p.price.startsWith("₹")
    ? `₹${Math.round(parseInt(p.price.replace("₹", "").replace(",", "")) * 0.8).toLocaleString("en-IN")}`
    : p.price,
}));

const PLAN_BENEFITS = [
  { icon: TrendingUp, label: "Boost your online reputation" },
  { icon: Sparkles, label: "Save time with AI-powered replies" },
  { icon: BarChart2, label: "Get deeper insights with advanced analytics" },
  { icon: Users, label: "Collaborate with your team" },
  { icon: Plug2, label: "Integrate with the tools you use" },
  { icon: LifeBuoy, label: "Priority email & chat support" },
];

function Plug2({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22v-4M12 6V2M8 10V6M16 10V6M8 14v4M16 14v4M4 10h16v4H4z" />
    </svg>
  );
}

const GROWTH_TIPS = [
  {
    icon: Star, title: "Track more reviews",
    sub: "You're at 63% of your review limit.",
    link: "Learn how to get more reviews",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Sparkles, title: "Reply more with AI",
    sub: "You're at 42% of your AI replies limit.",
    link: "Improve reply efficiency",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Users, title: "Invite your team",
    sub: "You have 6 member slots available.",
    link: "Invite members",
    color: "bg-blue-100 text-blue-600",
  },
];

const usageItems = [
  { label: "Reviews Tracked", used: 1250, limit: 2000, pct: 63, color: "bg-indigo-600", icon: MessageSquare },
  { label: "AI Replies", used: 420, limit: 1000, pct: 42, color: "bg-green-500", icon: Sparkles },
  { label: "Team Members", used: 4, limit: 10, pct: 40, color: "bg-blue-500", icon: Users },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export function GrowthPlanPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const plans = billing === "monthly" ? MONTHLY_PLANS : ANNUAL_PLANS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Growth Plan</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your subscription, view usage, and explore features to grow your business.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download Invoices
          </Button>
          <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Crown className="h-4 w-4" />
            Change Plan
          </Button>
        </div>
      </div>

      {/* Top 3-col row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Current Plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-semibold text-gray-500 mb-4">Your Current Plan</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">Growth Plan</h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Active</span>
              </div>
              <p className="text-lg font-bold text-gray-900 mt-0.5">
                ₹999 <span className="text-sm font-normal text-gray-500">/ month</span>
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4">Billed monthly · Next billing on Jun 15, 2024</p>
          <ul className="space-y-2 mb-5">
            {["Up to 2,000 reviews / month", "Up to 1,000 AI replies / month", "10 team members", "All integrations", "Advanced analytics", "Email & chat support"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50">
            Manage Subscription
          </Button>
        </div>

        {/* Usage */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-700">Usage This Month</p>
              <p className="text-xs text-gray-400">May 1 – May 31</p>
            </div>
            <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">View All Usage</button>
          </div>
          <div className="space-y-4">
            {usageItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${item.color.replace("bg-", "bg-").replace("-600", "-100").replace("-500", "-100")} flex items-center justify-center`}>
                      <item.icon className={`h-4 w-4 ${item.color.replace("bg-", "text-")}`} />
                    </div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{item.used.toLocaleString()} / {item.limit.toLocaleString()}</span>
                    <span className="text-sm font-bold text-gray-600">{item.pct}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center gap-2">
            <Zap className="h-4 w-4 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-indigo-800">You're making great progress!</p>
              <p className="text-xs text-indigo-600">Keep going to unlock more growth and insights.</p>
            </div>
          </div>
        </div>

        {/* Plan Benefits */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm font-semibold text-gray-700 mb-4">Plan Benefits</p>
          <ul className="space-y-3">
            {PLAN_BENEFITS.map((b) => (
              <li key={b.label} className="flex items-center gap-3 text-sm text-gray-700">
                <b.icon className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                {b.label}
              </li>
            ))}
          </ul>
          <button className="mt-4 text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
            Compare All Plans <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Explore All Plans */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Explore All Plans</h3>
            <p className="text-sm text-gray-500 mt-0.5">Choose the perfect plan for your business.</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${billing === "monthly" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${billing === "yearly" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
            >
              Yearly
              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">Save 20%</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border-2 p-5 ${plan.current ? "border-indigo-500" : "border-gray-200"}`}
            >
              {plan.current && (
                <div className="bg-indigo-600 text-white text-xs font-semibold text-center py-1 rounded-lg mb-3">Current Plan</div>
              )}
              <h4 className="text-base font-bold text-gray-900 mb-0.5">{plan.name}</h4>
              <div className="mb-0.5">
                <span className="text-xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">{plan.desc}</p>
              <ul className="space-y-1.5 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button size="sm" className={`w-full text-sm ${plan.actionStyle}`}>
                {plan.action}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Tips + Banner */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold">Need more? We've got you covered.</p>
              <p className="text-sm text-indigo-200">Contact our team to discuss a custom plan that fits your business needs.</p>
            </div>
          </div>
          <Button size="sm" className="bg-white text-indigo-700 hover:bg-indigo-50 gap-2 flex-shrink-0">
            <LifeBuoy className="h-4 w-4" />
            Contact Sales
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900">Growth Tips</h4>
            <span className="text-xs text-gray-400">Make the most of your plan.</span>
          </div>
          <div className="space-y-3">
            {GROWTH_TIPS.map((tip) => (
              <div key={tip.title} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tip.color}`}>
                  <tip.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{tip.title}</p>
                  <p className="text-xs text-gray-500">{tip.sub}</p>
                  <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 mt-0.5">{tip.link} →</button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs text-indigo-600 font-medium">View All Tips →</button>
        </div>
      </div>
    </div>
  );
}
