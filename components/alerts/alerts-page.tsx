"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Bell, BellRing, Mail, MessageSquare, Zap, Plus, Trash2,
  Star, AlertTriangle, Clock, CheckCircle2, ChevronRight,
  Slack, Smartphone, Shield, TrendingDown, Settings2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Channel = "email" | "sms" | "push" | "slack";
type Trigger = "1star" | "2star" | "keyword" | "no_reply" | "rating_drop" | "5star";

interface AlertRule {
  id: string;
  trigger: Trigger;
  label: string;
  description: string;
  channels: Channel[];
  delay: string;
  enabled: boolean;
  icon: React.ReactNode;
  iconBg: string;
  priority: "critical" | "high" | "medium" | "low";
}

interface AlertLog {
  id: string;
  time: string;
  author: string;
  rating: number;
  trigger: string;
  sentTo: string;
  status: "sent" | "pending" | "failed";
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const INITIAL_RULES: AlertRule[] = [
  {
    id: "r1", trigger: "1star",
    label: "1★ Review Alert",
    description: "Instant alert when a 1-star review is posted — respond fast to protect your reputation",
    channels: ["email", "sms"], delay: "Immediately",
    enabled: true, priority: "critical",
    iconBg: "bg-red-100",
    icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
  },
  {
    id: "r2", trigger: "2star",
    label: "2★ Review Alert",
    description: "Get notified of 2-star reviews within minutes",
    channels: ["email"], delay: "Within 5 min",
    enabled: true, priority: "high",
    iconBg: "bg-orange-100",
    icon: <TrendingDown className="h-5 w-5 text-orange-600" />,
  },
  {
    id: "r3", trigger: "keyword",
    label: "Negative Keyword Detected",
    description: "Alert when keywords like 'hair', 'cold', 'rude', 'refund' appear in a review",
    channels: ["email", "slack"], delay: "Within 15 min",
    enabled: true, priority: "high",
    iconBg: "bg-amber-100",
    icon: <MessageSquare className="h-5 w-5 text-amber-600" />,
  },
  {
    id: "r4", trigger: "no_reply",
    label: "Unanswered Review (24h)",
    description: "Daily reminder for reviews with no reply after 24 hours",
    channels: ["email"], delay: "After 24 hrs",
    enabled: true, priority: "medium",
    iconBg: "bg-blue-100",
    icon: <Clock className="h-5 w-5 text-blue-600" />,
  },
  {
    id: "r5", trigger: "rating_drop",
    label: "Rating Drops Below 4.0★",
    description: "Alert when your rolling average falls below 4.0 stars",
    channels: ["email", "slack"], delay: "Immediately",
    enabled: false, priority: "high",
    iconBg: "bg-violet-100",
    icon: <Star className="h-5 w-5 text-violet-600" />,
  },
  {
    id: "r6", trigger: "5star",
    label: "New 5★ Review",
    description: "Celebrate! Get notified of every glowing review",
    channels: ["push"], delay: "Immediately",
    enabled: false, priority: "low",
    iconBg: "bg-emerald-100",
    icon: <Star className="h-5 w-5 text-emerald-600 fill-emerald-600" />,
  },
];

const ALERT_LOG: AlertLog[] = [
  { id: "l1", time: "2 min ago", author: "Mohammed Asif", rating: 1, trigger: "1★ Review", sentTo: "Email + SMS", status: "sent" },
  { id: "l2", time: "1 hr ago", author: "Rahul Verma", rating: 2, trigger: "2★ Review", sentTo: "Email", status: "sent" },
  { id: "l3", time: "3 hrs ago", author: "Karan Mehta", rating: 3, trigger: "Keyword: 'cold'", sentTo: "Email + Slack", status: "sent" },
  { id: "l4", time: "Yesterday 6pm", author: "Priya Sharma", rating: 5, trigger: "Unanswered (24h)", sentTo: "Email", status: "sent" },
  { id: "l5", time: "Yesterday 2pm", author: "Deepika Nair", rating: 4, trigger: "Unanswered (24h)", sentTo: "Email", status: "failed" },
];

const PRIORITY_STYLES = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  low: "bg-gray-100 text-gray-600 border-gray-200",
};

const CHANNEL_ICONS: Record<Channel, React.ReactNode> = {
  email: <Mail className="h-3.5 w-3.5" />,
  sms: <Smartphone className="h-3.5 w-3.5" />,
  push: <Bell className="h-3.5 w-3.5" />,
  slack: <Slack className="h-3.5 w-3.5" />,
};

// ─── Main component ────────────────────────────────────────────────────────────
export function AlertsPage() {
  const [rules, setRules] = useState<AlertRule[]>(INITIAL_RULES);

  const toggleRule = (id: string) =>
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));

  const activeCount = rules.filter((r) => r.enabled).length;
  const criticalActive = rules.filter((r) => r.enabled && r.priority === "critical").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center shadow-sm">
                <BellRing className="h-4 w-4 text-white" />
              </div>
              Smart Alerts
            </h1>
            <p className="text-sm text-gray-500 mt-1">Get instant notifications when reviews need your attention — never miss a critical moment.</p>
          </div>
          <Button className="gap-2 bg-gray-900 hover:bg-gray-800 text-white">
            <Plus className="h-4 w-4" /> Add Rule
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-1">
          {[
            { icon: Shield, label: "Active Rules", value: `${activeCount}/${rules.length}`, sub: "monitoring 24/7", bg: "bg-violet-50", col: "text-violet-600" },
            { icon: BellRing, label: "Alerts Today", value: "3", sub: "2 acted upon", bg: "bg-blue-50", col: "text-blue-600" },
            { icon: AlertTriangle, label: "Critical (1★)", value: String(criticalActive), sub: "rules active", bg: "bg-red-50", col: "text-red-600" },
            { icon: Zap, label: "Avg Response", value: "18 min", sub: "after alert", bg: "bg-emerald-50", col: "text-emerald-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 stat-card-3d">
              <div className={`p-2.5 rounded-lg ${s.bg} shrink-0`}><s.icon className={`h-5 w-5 ${s.col}`} /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alert Rules */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-2">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2"><Bell className="h-4 w-4 text-gray-400" /> Alert Rules</h2>
            <span className="text-xs text-gray-400">{activeCount} active</span>
          </div>
          <div className="divide-y divide-gray-50">
            {rules.map((rule) => (
              <div key={rule.id} className={`px-6 py-4 flex items-center gap-4 transition-colors ${rule.enabled ? "" : "opacity-60"}`}>
                <div className={`w-10 h-10 rounded-xl ${rule.iconBg} flex items-center justify-center shrink-0`}>
                  {rule.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-gray-900">{rule.label}</span>
                    <Badge className={`text-xs px-2 py-0 border ${PRIORITY_STYLES[rule.priority]}`}>{rule.priority}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{rule.description}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" />{rule.delay}</span>
                    {rule.channels.map((ch) => (
                      <span key={ch} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {CHANNEL_ICONS[ch]} {ch}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors">
                    <Settings2 className="h-4 w-4" />
                  </button>
                  <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Channels */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 stagger-3">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Settings2 className="h-4 w-4 text-gray-400" /> Notification Channels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { ch: "Email", icon: <Mail className="h-5 w-5 text-blue-600" />, bg: "bg-blue-50", detail: "adityasingh018adi@gmail.com", connected: true },
              { ch: "SMS", icon: <Smartphone className="h-5 w-5 text-green-600" />, bg: "bg-green-50", detail: "+91 98765 43210", connected: true },
              { ch: "Slack", icon: <Slack className="h-5 w-5 text-purple-600" />, bg: "bg-purple-50", detail: "#reviews-alerts", connected: true },
              { ch: "Push", icon: <Bell className="h-5 w-5 text-amber-600" />, bg: "bg-amber-50", detail: "Browser & Mobile", connected: false },
            ].map((c) => (
              <div key={c.ch} className={`flex items-center gap-3 p-4 rounded-xl border ${c.connected ? "border-gray-100 bg-gray-50" : "border-dashed border-gray-200"} card-3d`}>
                <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>{c.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">{c.ch}</p>
                  <p className="text-xs text-gray-500 truncate">{c.detail}</p>
                </div>
                {c.connected
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  : <Button size="sm" variant="outline" className="text-xs h-7 px-2 shrink-0">Connect</Button>}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts Log */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-4">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Alerts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Time", "Customer", "Rating", "Trigger", "Sent To", "Status"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ALERT_LOG.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-3.5 text-xs text-gray-400 whitespace-nowrap">{log.time}</td>
                    <td className="px-6 py-3.5 font-medium text-gray-900 whitespace-nowrap">{log.author}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((i) => <Star key={i} className={`h-3 w-3 ${i <= log.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />)}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600 whitespace-nowrap">{log.trigger}</td>
                    <td className="px-6 py-3.5 text-gray-600 whitespace-nowrap">{log.sentTo}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${log.status === "sent" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                        {log.status === "sent" ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
