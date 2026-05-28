"use client";

import { useState } from "react";
import {
  CreditCard,
  Download,
  CheckCircle2,
  Crown,
  Zap,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Calendar,
  Receipt,
  Users,
  MessageSquare,
  BarChart2,
  Sparkles,
  Shield,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Invoice {
  id: string;
  date: string;
  period: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  plan: string;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  icon: typeof Crown;
  color: string;
  bgColor: string;
  features: string[];
  current?: boolean;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹399",
    period: "/month",
    description: "For small businesses just getting started",
    icon: Star,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    features: [
      "Up to 100 reviews/month",
      "50 AI replies/month",
      "2 team members",
      "Google & Facebook integrations",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹799",
    period: "/month",
    description: "For growing businesses that need more power",
    icon: Zap,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 border-indigo-200",
    current: true,
    features: [
      "Up to 500 reviews/month",
      "300 AI replies/month",
      "5 team members",
      "All integrations",
      "Priority support",
      "Advanced analytics",
      "Custom templates",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large businesses with custom needs",
    icon: Crown,
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    features: [
      "Unlimited reviews",
      "Unlimited AI replies",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "White-label option",
    ],
  },
];

const INVOICES: Invoice[] = [
  { id: "INV-2024-00123", date: "Dec 1, 2024", period: "Dec 2024", amount: "₹999", status: "paid", plan: "Growth" },
  { id: "INV-2024-00112", date: "Nov 1, 2024", period: "Nov 2024", amount: "₹999", status: "paid", plan: "Growth" },
  { id: "INV-2024-00098", date: "Oct 1, 2024", period: "Oct 2024", amount: "₹999", status: "paid", plan: "Growth" },
  { id: "INV-2024-00089", date: "Sep 1, 2024", period: "Sep 2024", amount: "₹999", status: "paid", plan: "Growth" },
  { id: "INV-2024-00078", date: "Aug 1, 2024", period: "Aug 2024", amount: "₹999", status: "paid", plan: "Growth" },
];

const FAQS = [
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Yes, you can change your plan at any time. Upgrades take effect immediately and you'll be charged a prorated amount. Downgrades take effect at the end of your current billing cycle.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Rupay), UPI, Net Banking, and Wallets through our secure Razorpay payment gateway.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes! Every new account starts with a 14-day free trial of the Growth plan. No credit card required to start your trial.",
  },
  {
    q: "What happens when I exceed my monthly limits?",
    a: "You'll receive email notifications when you reach 80% and 100% of your limits. Reviews will stop syncing until your cycle resets or you upgrade your plan.",
  },
  {
    q: "Can I get a refund if I'm not satisfied?",
    a: "We offer a 7-day money-back guarantee for new subscriptions. Contact our support team within 7 days of your first payment for a full refund.",
  },
];

const STATUS_CONFIG = {
  paid: { label: "Paid", color: "bg-green-100 text-green-700" },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
  failed: { label: "Failed", color: "bg-red-100 text-red-700" },
};

// ─── Main Component ────────────────────────────────────────────────────────────

export function BillingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const currentPlan = PLANS.find((p) => p.current)!;

  const usageItems = [
    { label: "Reviews Tracked", used: 312, limit: 500, icon: Star, color: "bg-indigo-500" },
    { label: "AI Replies", used: 187, limit: 300, icon: Sparkles, color: "bg-purple-500" },
    { label: "Team Members", used: 3, limit: 5, icon: Users, color: "bg-blue-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your subscription, usage, and payment details</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Receipt className="h-4 w-4" />
          View All Invoices
        </Button>
      </div>

      {/* Top Row: Current Plan + Usage */}
      <div className="grid grid-cols-3 gap-6">
        {/* Current Plan Card */}
        <div className="col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full">Current Plan</span>
              <Zap className="h-5 w-5 text-yellow-300" />
            </div>
            <h2 className="text-3xl font-bold mb-1">{currentPlan.name}</h2>
            <p className="text-indigo-200 text-sm mb-4">{currentPlan.description}</p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold">₹799</span>
              <span className="text-indigo-300 text-sm">/month</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-200 mb-5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Renews on Jan 1, 2025</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold">
                Upgrade Plan
              </Button>
              <Button size="sm" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Meters */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-gray-900">Plan Usage</h3>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Resets Jan 1, 2025</span>
          </div>
          <div className="space-y-5">
            {usageItems.map((item) => {
              const pct = Math.round((item.used / item.limit) * 100);
              const isWarning = pct >= 80;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isWarning && <AlertCircle className="h-4 w-4 text-amber-500" />}
                      <span className={`text-sm font-semibold ${isWarning ? "text-amber-600" : "text-gray-700"}`}>
                        {item.used} / {item.limit}
                      </span>
                      <span className="text-xs text-gray-400">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isWarning ? "bg-amber-400" : item.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Need more capacity?</p>
            <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
              Upgrade to Enterprise <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-gray-900">Available Plans</h3>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "monthly" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
              }`}
            >
              Annual
              <span className="text-xs text-green-600 font-semibold">-20%</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border-2 p-5 transition-all ${
                plan.current
                  ? "border-indigo-400 bg-indigo-50/50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <plan.icon className={`h-5 w-5 ${plan.color}`} />
                  <span className="font-semibold text-gray-900">{plan.name}</span>
                </div>
                {plan.current && (
                  <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-medium">
                    Current
                  </span>
                )}
              </div>
              <div className="mb-1">
                <span className="text-2xl font-bold text-gray-900">
                  {billingCycle === "annual" && plan.price !== "Custom"
                    ? `₹${Math.round(parseInt(plan.price.replace("₹", "")) * 0.8)}`
                    : plan.price}
                </span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">{plan.description}</p>
              <ul className="space-y-1.5 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                size="sm"
                className={`w-full ${
                  plan.current
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : plan.id === "enterprise"
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {plan.current ? "Current Plan" : plan.id === "enterprise" ? "Contact Sales" : `Switch to ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Info + Billing History */}
      <div className="grid grid-cols-5 gap-6">
        {/* Payment Method */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-5">Payment Method</h3>

          {/* Card Display */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl p-5 mb-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-6 translate-x-6" />
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium opacity-70">ReviewPilot</span>
              <CreditCard className="h-6 w-6 opacity-70" />
            </div>
            <p className="text-lg font-mono tracking-widest mb-4">•••• •••• •••• 4242</p>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="opacity-60 text-xs">Card Holder</p>
                <p className="font-medium">Aditya Singh</p>
              </div>
              <div className="text-right">
                <p className="opacity-60 text-xs">Expires</p>
                <p className="font-medium">09/27</p>
              </div>
              <div className="text-right">
                <p className="opacity-60 text-xs">Type</p>
                <p className="font-medium">Visa</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-5">
            <Button size="sm" variant="outline" className="flex-1 gap-2">
              <CreditCard className="h-4 w-4" />
              Update Card
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Add Card
            </Button>
          </div>

          {/* Billing Address */}
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700">Billing Address</h4>
              <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Edit</button>
            </div>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p className="font-medium text-gray-800">Aditya Singh</p>
              <p>42 MG Road, Indiranagar</p>
              <p>Bengaluru, Karnataka 560038</p>
              <p>India</p>
              <p className="text-gray-500">GSTIN: 29AABCT1332L1ZX</p>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="col-span-3 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-gray-900">Billing History</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export All
            </Button>
          </div>

          <div className="space-y-1">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <span>Invoice</span>
              <span>Date</span>
              <span>Plan</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {/* Rows */}
            {INVOICES.map((inv) => (
              <div
                key={inv.id}
                className="grid grid-cols-5 gap-4 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors items-center"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{inv.id}</p>
                  <p className="text-xs text-gray-500">{inv.period}</p>
                </div>
                <span className="text-sm text-gray-600">{inv.date}</span>
                <span className="text-sm text-gray-700 font-medium">{inv.plan}</span>
                <span className="text-sm font-semibold text-gray-900">{inv.amount}</span>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_CONFIG[inv.status].color}`}>
                    {STATUS_CONFIG[inv.status].label}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing 5 of 18 invoices</p>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View all invoices <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <HelpCircle className="h-5 w-5 text-indigo-600" />
          <h3 className="text-base font-semibold text-gray-900">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm text-gray-600 pt-3 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
