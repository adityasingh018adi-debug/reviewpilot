"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2, Sparkles, Zap, ArrowRight, Crown } from "lucide-react";
import type { PlanId } from "@/lib/razorpay";

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  trialDays?: number;
  features: readonly string[];
  limits: { locations: number; aiRepliesPerMonth: number };
  razorpayPlanId: string | null | undefined;
}

interface BillingPageProps {
  plans: Plan[];
  currentPlan: PlanId;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

export function BillingPage({ plans, currentPlan }: BillingPageProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleUpgrade(planId: string) {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/billing/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const { subscriptionId, amount, planName } = await res.json();

      if (!window.Razorpay) {
        await loadRazorpayScript();
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subscriptionId,
        name: "ReviewPilot",
        description: `${planName} Plan Subscription`,
        currency: "INR",
        amount: amount * 100,
        handler: function () {
          toast({ title: "Payment successful!", description: `You're now on the ${planName} plan.` });
          window.location.reload();
        },
        prefill: { email: "" },
        theme: { color: "#7c3aed" },
      });

      rzp.open();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment failed";
      toast({ title: "Upgrade failed", description: message, variant: "destructive" });
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Current plan banner */}
      <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-900">
            Current plan: <span className="text-violet-700">{plans.find(p => p.id === currentPlan)?.name ?? currentPlan}</span>
          </p>
          <p className="text-sm text-slate-500 mt-0.5">
            {currentPlan === "FREE"
              ? "You're on the 14-day free trial. Upgrade to continue after your trial ends."
              : "Thank you for subscribing to ReviewPilot!"}
          </p>
        </div>
      </div>

      {/* Trial notice */}
      {currentPlan === "FREE" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-3">
          <div className="text-amber-500 flex-shrink-0">⏰</div>
          <p className="text-sm text-amber-800 font-medium">
            Your 14-day free trial gives you access to all Pro features. After your trial, subscribe for ₹399/month to keep access.
          </p>
        </div>
      )}

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          const isPopular = plan.id === "STARTER";
          const isEnterprise = plan.id === "GROWTH";
          const isTrial = plan.id === "FREE";

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border flex flex-col overflow-hidden transition-all ${
                isPopular
                  ? "border-violet-400 shadow-2xl shadow-violet-100"
                  : isCurrent
                  ? "border-violet-300 shadow-lg shadow-violet-50"
                  : "border-slate-200 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50"
              }`}
            >
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  <Zap className="inline w-3 h-3 mr-1" />
                  MOST POPULAR
                </div>
              )}

              <div className={`p-6 flex-1 flex flex-col ${isPopular ? "pt-10" : ""}`}>
                {/* Plan header */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                    {isCurrent && (
                      <span className="text-xs font-semibold text-violet-700 bg-violet-100 px-2.5 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                    {isEnterprise && (
                      <Crown className="w-4 h-4 text-amber-500" />
                    )}
                  </div>

                  <div className="flex items-baseline gap-1 mb-1">
                    {plan.price === 0 ? (
                      <span className="text-4xl font-bold text-slate-900">Free</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-slate-900">₹{plan.price}</span>
                        <span className="text-slate-500 text-sm">/month</span>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-slate-500">
                    {isTrial ? "14 days free · All features included" :
                     isEnterprise ? "For chains & multi-location businesses" :
                     "Best for growing businesses"}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isCurrent ? (
                  <button className="w-full py-3 text-sm font-semibold text-slate-500 bg-slate-100 rounded-xl cursor-default">
                    Current Plan
                  </button>
                ) : isTrial ? (
                  <button className="w-full py-3 text-sm font-semibold text-violet-700 bg-violet-50 border-2 border-violet-200 rounded-xl cursor-default">
                    Your active trial
                  </button>
                ) : isEnterprise ? (
                  <button className="w-full py-3 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-violet-300 hover:bg-violet-50 transition-all flex items-center justify-center gap-2">
                    Contact Sales
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    className="w-full py-3 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-violet-200/60 transition-all hover:shadow-violet-300/60 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={!!loadingPlan}
                  >
                    {loadingPlan === plan.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    Upgrade to {plan.name}
                    {!loadingPlan && <ArrowRight className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="pt-2 space-y-5">
        <h3 className="font-semibold text-slate-900">Frequently asked questions</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { q: "Do I need a credit card for the trial?", a: "No credit card required for the 14-day free trial. You'll be asked for payment details only when you choose to upgrade." },
            { q: "Can I cancel anytime?", a: "Yes, cancel any time from this page. Your plan stays active until the end of the billing period." },
            { q: "What payment methods do you accept?", a: "UPI, cards (Visa / Mastercard / RuPay), net banking, and wallets via Razorpay." },
            { q: "Is my review data secure?", a: "All data is stored with row-level security. Tokens are encrypted at rest and never shared with third parties." },
          ].map(({ q, a }) => (
            <div key={q} className="p-4 rounded-xl border border-slate-100 bg-white space-y-1.5">
              <p className="font-medium text-slate-900 text-sm">{q}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}
