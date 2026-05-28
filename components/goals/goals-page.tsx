"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy, Star, TrendingUp, Target, Zap, CheckCircle2,
  Plus, Flame, Award, Lock, Gift, Crown, Medal,
} from "lucide-react";

// ─── Circle progress SVG component ────────────────────────────────────────────
function CircleProgress({
  value, size = 80, stroke = 7, color = "#7c3aed", bg = "#e5e7eb",
  children,
}: {
  value: number; size?: number; stroke?: number;
  color?: string; bg?: string; children?: React.ReactNode;
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(100, value) / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" style={{ position: "absolute", top: 0, left: 0 }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">{children}</div>
    </div>
  );
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const GOALS = [
  {
    id: "g1", label: "Total Reviews", current: 142, target: 200, unit: "reviews",
    color: "#7c3aed", bg: "#ede9fe", icon: <MessageSquareIcon />, deadline: "Jun 30",
  },
  {
    id: "g2", label: "Avg Rating", current: 4.3, target: 4.5, unit: "★",
    color: "#f59e0b", bg: "#fef3c7", icon: <Star className="h-5 w-5 text-amber-500 fill-amber-500" />, deadline: "Jun 30",
  },
  {
    id: "g3", label: "Reply Rate", current: 67, target: 90, unit: "%",
    color: "#10b981", bg: "#d1fae5", icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />, deadline: "Jun 30",
  },
  {
    id: "g4", label: "Monthly Reviews", current: 18, target: 25, unit: "/ month",
    color: "#6366f1", bg: "#e0e7ff", icon: <TrendingUp className="h-5 w-5 text-indigo-600" />, deadline: "May 31",
  },
];

function MessageSquareIcon() {
  return <svg className="h-5 w-5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}

type MilestoneStatus = "locked" | "unlocked" | "progress";

interface Milestone {
  id: string; icon: string; label: string;
  desc: string; status: MilestoneStatus; progress?: number;
}

const MILESTONES: Milestone[] = [
  { id: "m1", icon: "🌱", label: "First 10 Reviews", desc: "You're on the map!", status: "unlocked" },
  { id: "m2", icon: "🥉", label: "50 Reviews", desc: "Growing fast!", status: "unlocked" },
  { id: "m3", icon: "🥈", label: "100 Reviews", desc: "Century achieved!", status: "unlocked" },
  { id: "m4", icon: "⭐", label: "4.0★ Average", desc: "Above average!", status: "unlocked" },
  { id: "m5", icon: "🔥", label: "7-Day Reply Streak", desc: "Replied every day", status: "unlocked" },
  { id: "m6", icon: "🥇", label: "150 Reviews", desc: "Almost there…", status: "progress", progress: (142 / 150) * 100 },
  { id: "m7", icon: "💎", label: "200 Reviews", desc: "Diamond tier!", status: "locked" },
  { id: "m8", icon: "⚡", label: "Perfect Month", desc: "100% reply rate in a month", status: "locked" },
  { id: "m9", icon: "🌟", label: "500 Reviews", desc: "Legend status", status: "locked" },
  { id: "m10", icon: "👑", label: "4.8★ Average", desc: "Near-perfect rating", status: "locked" },
];

const STREAK_DAYS = [true, true, true, true, true, true, true]; // last 7 days

// ─── Main component ────────────────────────────────────────────────────────────
export function GoalsPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-sm">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              Review Goals
            </h1>
            <p className="text-sm text-gray-500 mt-1">Track targets, unlock milestones, and grow your reputation with purpose.</p>
          </div>
          <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-200" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4" />Add Goal
          </Button>
        </div>

        {/* Streak banner */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-white stagger-1 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🔥</div>
            <div>
              <p className="font-black text-xl">7-Day Reply Streak!</p>
              <p className="text-orange-100 text-sm">You've replied to every review this week. Keep it up!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {STREAK_DAYS.map((active, i) => (
              <div key={i} className={`flex flex-col items-center gap-1`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${active ? "bg-white text-orange-600 font-bold shadow-md" : "bg-white/20 text-white/60"}`}>
                  {active ? "✓" : "·"}
                </div>
                <span className="text-xs text-orange-200">{["M","T","W","T","F","S","S"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goal progress rings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-2">
          {GOALS.map((goal) => {
            const pct = Math.round((goal.current / goal.target) * 100);
            return (
              <div key={goal.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center card-3d">
                <CircleProgress value={pct} size={96} stroke={8} color={goal.color} bg={goal.bg}>
                  <span className="text-lg font-black text-gray-900">{pct}%</span>
                </CircleProgress>
                <div className="mt-4">
                  <p className="font-bold text-gray-900 text-sm">{goal.label}</p>
                  <p className="text-2xl font-black mt-1" style={{ color: goal.color }}>
                    {goal.current}<span className="text-sm font-medium text-gray-400 ml-0.5">{goal.unit}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Target: {goal.target}{goal.unit} · by {goal.deadline}</p>
                </div>
                <div className="w-full mt-3">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: goal.color }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {goal.target - goal.current > 0
                      ? `${typeof goal.current === "number" && typeof goal.target === "number" ? (goal.target - goal.current).toFixed(goal.unit === "★" ? 1 : 0) : "—"} ${goal.unit} to go`
                      : "🎉 Goal reached!"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 stagger-3">
          <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Achievement Milestones
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {MILESTONES.map((m) => (
              <div
                key={m.id}
                className={`relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all ${
                  m.status === "unlocked"
                    ? "border-amber-200 bg-amber-50"
                    : m.status === "progress"
                    ? "border-violet-200 bg-violet-50"
                    : "border-gray-100 bg-gray-50 opacity-60"
                }`}
              >
                {m.status === "locked" && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                )}
                {m.status === "unlocked" && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />
                  </div>
                )}
                <span className="text-3xl mb-2">{m.icon}</span>
                <p className={`text-xs font-bold ${m.status === "locked" ? "text-gray-500" : "text-gray-900"}`}>{m.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
                {m.status === "progress" && m.progress !== undefined && (
                  <div className="w-full mt-2">
                    <div className="h-1 bg-violet-100 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${m.progress}%` }} />
                    </div>
                    <p className="text-xs text-violet-600 font-medium mt-0.5">{Math.round(m.progress)}%</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Monthly progress */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 stagger-4">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-500" />Monthly Review Count
          </h2>
          <div className="flex items-end gap-2 h-28">
            {[8, 12, 11, 17, 14, 20, 16, 13, 19, 15, 21, 18].map((val, i) => {
              const max = 25;
              const ht = Math.round((val / max) * 100);
              const months = ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-lg transition-all duration-700 bg-gradient-to-t from-violet-600 to-indigo-400"
                    style={{ height: `${ht}%`, opacity: i === 11 ? 1 : 0.6 + (i / 11) * 0.4 }}
                    title={`${val} reviews`}
                  />
                  <span className="text-xs text-gray-400">{months[i]}</span>
                </div>
              );
            })}
            {/* Target line */}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-0.5 w-8 bg-dashed border-t-2 border-dashed border-amber-400" />
            <span className="text-xs text-amber-600 font-medium">Target: 25/month</span>
          </div>
        </div>

      </div>
    </div>
  );
}
