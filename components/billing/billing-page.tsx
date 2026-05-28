"use client";

import { useState } from "react";
import {
  Crown, Zap, Star, ArrowRight, ChevronDown, ChevronUp,
  CheckCircle2, Download, CreditCard, Calendar, Receipt,
  Users, Sparkles, MessageSquare, HelpCircle, LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "paid" | "pending" | "failed";
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const INVOICES: Invoice[] = [
  { id: "INV-2024-00123", date: "May 15, 2024", description: "Growth Plan – Monthly", amount: "₹999.00", status: "paid" },
  { id: "INV-2024-00112", date: "Apr 15, 2024", description: "Growth Plan – Monthly", amount: "₹999.00", status: "paid" },
  { id: "INV-2024-00101", date: "Mar 15, 2024", description: "Growth Plan – Monthly", amount: "₹999.00", status: "paid" },
  { id: "INV-2024-00089", date: "Feb 15, 2024", description: "Growth Plan – Monthly", amount: "₹999.00", status: "paid" },
  { id: "INV-2024-00078", date: "Jan 15, 2024", description: "Growth Plan – Monthly", amount: "₹999.00", status: "paid" },
];

const FAQS = [
  { q: "How does billing work?", a: "You're billed monthly or annually based on your selected plan. Payments are processed securely via Razorpay." },
  { q: "Can I change or cancel my plan anytime?", a: "Yes. Upgrades take effect immediately. Downgrades and cancellations take effect at the end of your current billing period." },
  { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, Rupay, UPI, Net Banking, and major digital wallets via our Razorpay gateway." },
  { q: "How do I get an invoice for my purchase?", a: "Invoices are automatically emailed after each successful payment. You can also download them from the Billing History table below." },
  { q: "What happens if I exceed my plan limits?", a: "You'll receive alerts at 80% and 100% usage. Reviews stop syncing until your cycle resets or you upgrade." },
];

const PLAN_INCLUDES = [
  "Up to 2,000 reviews / month",
  "Up to 1,000 AI replies / month",
  "10 team members",
  "All integrations",
  "Advanced analytics",
  "Email & chat support",
];

// ─── Main Component ────────────────────────────────────────────────────────────

export function BillingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const usageItems = [
    { label: "Reviews Tracked", used: 1250, limit: 2000, pct: 63, color: "bg-indigo-600", icon: MessageSquare },
    { label: "AI Replies", used: 420, limit: 1000, pct: 42, color: "bg-green-500", icon: Sparkles },
    { label: "Team Members", used: 4, limit: 10, pct: 40, color: "bg-blue-500", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your subscription, payments and billing details.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download Invoices
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Update Payment Method
          </Button>
        </div>
      </div>

      {/* Top 3-col row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Current Plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-500 mb-4">Current Plan</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-gray-900">Growth Plan</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Active</span>
              </div>
              <p className="text-xl font-bold text-gray-900 mt-0.5">
                ₹999 <span className="text-sm font-normal text-gray-500">/ month</span>
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4">Billed monthly · Next billing on Jun 15, 2024</p>
          <Button variant="outline" size="sm" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50">
            Change Plan
          </Button>
        </div>

        {/* Usage This Month */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700">Usage This Month <span className="font-normal text-gray-400">(May 1 – May 31)</span></p>
            <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700">View Usage</button>
          </div>
          <div className="space-y-4">
            {usageItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{item.used.toLocaleString()} / {item.limit.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-gray-600">{item.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Includes */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">Plan Includes</p>
          <ul className="space-y-2.5">
            {PLAN_INCLUDES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Payment Information</h3>
        <div className="flex items-center justify-between py-3 border border-gray-200 rounded-lg px-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">VISA</div>
            <div>
              <p className="text-sm font-medium text-gray-800">Visa ending in 4242</p>
              <p className="text-xs text-gray-500">Expires 12/27</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Primary</span>
          </div>
          <Button variant="outline" size="sm">Update Card</Button>
        </div>

        <div className="flex items-start justify-between py-3">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Billing Address</p>
            <p className="text-sm text-gray-600">123, MG Road, Connaught Place, New Delhi, Delhi 110001, India</p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5 text-gray-600">
            <span className="text-base">✏️</span>
            Edit
          </Button>
        </div>
      </div>

      {/* Billing History + FAQ */}
      <div className="grid grid-cols-5 gap-6">
        {/* Billing History */}
        <div className="col-span-3 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-gray-900">Billing History</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All Invoices</button>
          </div>
          <div>
            <div className="grid grid-cols-5 gap-3 px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              <span>Invoice</span>
              <span>Date</span>
              <span className="col-span-2">Description</span>
              <span>Amount</span>
            </div>
            {INVOICES.map((inv) => (
              <div key={inv.id} className="grid grid-cols-5 gap-3 px-2 py-3 items-center border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-800">{inv.id}</span>
                <span className="text-sm text-gray-600">{inv.date}</span>
                <span className="text-sm text-gray-600 col-span-2">{inv.description}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{inv.amount}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Paid</span>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">Showing 1 to 5 of 12 invoices</p>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">‹</button>
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-7 h-7 flex items-center justify-center rounded text-sm font-medium ${p === 1 ? "bg-indigo-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
              ))}
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">›</button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                      <p className="text-sm text-gray-600 pt-3 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Need Help?</h3>
            <p className="text-sm text-gray-500 mb-4">If you have any questions about billing or your subscription, our support team is here to help.</p>
            <Button size="sm" variant="outline" className="w-full gap-2">
              <LifeBuoy className="h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
