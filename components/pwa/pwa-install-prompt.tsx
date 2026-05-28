"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone, Zap, Wifi, Star } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already installed as standalone
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Previously dismissed
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after 3 seconds
      setTimeout(() => setShow(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setShow(false);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setShow(false);
    } else {
      setInstalling(false);
    }
    setDeferredPrompt(null);
  }

  function handleDismiss() {
    setShow(false);
    localStorage.setItem("pwa-prompt-dismissed", "1");
  }

  if (!show) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:right-4 md:w-[360px] animate-[slideUpPWA_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
      style={{ filter: "drop-shadow(0 20px 40px rgba(124,58,237,0.35))" }}
    >
      {/* Glow top line */}
      <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <div className="relative bg-[#0f0f1a]/95 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 overflow-hidden">
        {/* Animated bg orb */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30">
            <span className="text-white font-black text-lg">R</span>
          </div>
          <div>
            <p className="font-bold text-white text-sm">Install ReviewPilot</p>
            <p className="text-xs text-violet-300">Add to your Android home screen</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: Zap,      label: "Instant\nAccess",  color: "text-amber-400" },
            { icon: Wifi,     label: "Works\nOffline",   color: "text-emerald-400" },
            { icon: Star,     label: "Full\nScreen",     color: "text-violet-400" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
              <Icon className={`h-4 w-4 ${color} mx-auto mb-1`} />
              <p className="text-[10px] text-gray-400 leading-tight whitespace-pre-line">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleInstall}
          disabled={installing}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
        >
          {installing ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Installing…
            </>
          ) : (
            <>
              <Smartphone className="h-4 w-4" />
              Install App — Free
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-gray-600 mt-2">No App Store needed · 0 MB storage</p>
      </div>

      <style jsx>{`
        @keyframes slideUpPWA {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
