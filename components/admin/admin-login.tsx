"use client";

import { useState, useRef, useEffect } from "react";
import { ShieldCheck, Eye, EyeOff, Lock, Zap } from "lucide-react";

interface Props { onLogin: (pw: string) => boolean; }

export function AdminLogin({ onLogin }: Props) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = onLogin(pw);
    if (!ok) {
      setError(true);
      setShake(true);
      setPw("");
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-[blob_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-[blob_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-[blob_12s_ease-in-out_infinite_4s]" />
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-violet-400/40"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              animation: `float ${3 + (i % 4)}s ease-in-out infinite ${(i * 0.3) % 2}s`,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <div
        className={`relative z-10 w-full max-w-sm mx-4 transition-all duration-300 ${shake ? "animate-[adminShake_0.5s_ease-in-out]" : ""}`}
        style={{ filter: "drop-shadow(0 0 40px rgba(139,92,246,0.3))" }}
      >
        {/* Top glow line */}
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

        <div className="bg-[#111118]/90 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              {/* Orbit ring */}
              <div className="absolute inset-[-6px] rounded-[20px] border border-violet-500/30 animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-[-12px] rounded-[26px] border border-indigo-500/20 animate-[spin_12s_linear_infinite_reverse]" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-white mb-1">Admin Command Center</h1>
            <p className="text-sm text-gray-400">Reviewdot.in · Restricted Access</p>
          </div>

          {/* Hint badge */}
          <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-xl px-3 py-2 mb-5">
            <Zap className="h-3.5 w-3.5 text-violet-400 shrink-0" />
            <p className="text-xs text-violet-300">Demo password: <span className="font-mono font-bold text-violet-200">admin@2024</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                ref={inputRef}
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(false); }}
                placeholder="Enter admin password"
                className={`w-full bg-[#1a1a25] border rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all focus:ring-2 ${error ? "border-red-500/60 focus:ring-red-500/20" : "border-white/10 focus:border-violet-500/60 focus:ring-violet-500/20"}`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                Incorrect password. Try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Access Admin Panel
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-4">
            Unauthorized access is prohibited
          </p>
        </div>

        {/* Bottom glow */}
        <div className="absolute -bottom-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes adminShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
