"use client";

import { useEffect, useState } from "react";

/* ─── CSS-animated scene: person writes review → AI replies → person smiles ── */
export function ReviewHeroAnimation() {
  const [phase, setPhase] = useState<0|1|2|3|4>(0);
  // 0 = idle  1 = typing  2 = review sent  3 = AI thinking  4 = happy

  useEffect(() => {
    const seq: [number, 0|1|2|3|4][] = [
      [800,  1],  // start typing
      [3200, 2],  // review sent
      [4200, 3],  // AI thinking
      [6000, 4],  // happy
      [8500, 0],  // reset
    ];
    let timers = seq.map(([ms, p]) => setTimeout(() => setPhase(p), ms));
    const loop = setInterval(() => {
      setPhase(0);
      setTimeout(() => {
        timers.forEach(clearTimeout);
        timers = seq.map(([ms, p]) => setTimeout(() => setPhase(p), ms));
      }, 400);
    }, 9200);
    return () => { timers.forEach(clearTimeout); clearInterval(loop); };
  }, []);

  const typing = phase === 1;
  const sent   = phase >= 2;
  const think  = phase === 3;
  const happy  = phase === 4;

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none overflow-hidden" style={{ minHeight: 320 }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #7B5CFF 0%, #00CFFF 60%, transparent 80%)" }} />
      </div>

      {/* ── Scene ── */}
      <div className="relative z-10 flex items-end justify-center gap-6 flex-wrap">

        {/* ─── Person ─── */}
        <div className="flex flex-col items-center gap-1" style={{ animation: happy ? "personBounce 0.5s ease" : "none" }}>

          {/* Floating hearts when happy */}
          {happy && [0,1,2].map(i => (
            <div key={i} className="absolute text-lg pointer-events-none"
              style={{
                animation: `heartFloat 1.2s ease forwards ${i * 0.25}s`,
                left: `calc(50% + ${(i-1) * 22}px)`,
                top: "10%",
                opacity: 0,
              }}>
              {["❤️","⭐","😊"][i]}
            </div>
          ))}

          {/* Speech bubble */}
          <div className={`mb-2 px-3 py-2 rounded-2xl rounded-bl-sm text-xs font-medium max-w-[160px] text-center transition-all duration-500 ${phase === 0 ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
            style={{ background: "#151E30", border: "1px solid #2A3350", color: "#C8CCEE", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
            {phase === 1 && <span>Hmm, let me write a review... <span className="animate-pulse">✍️</span></span>}
            {phase === 2 && <span>★★★★★ Amazing service! Really loved it!</span>}
            {phase === 3 && <span>Waiting for reply... <span className="inline-flex gap-0.5">{[0,1,2].map(i=><span key={i} className="w-1 h-1 rounded-full bg-current inline-block" style={{animation:`typingDot 1.2s ease-in-out infinite ${i*0.2}s`}}/>)}</span></span>}
            {phase === 4 && <span>Wow, what a fast, kind reply! 🤩</span>}
            {/* Bubble tail */}
            <div className="absolute -bottom-2 left-4 w-3 h-3 rotate-45" style={{ background: "#151E30", borderRight: "1px solid #2A3350", borderBottom: "1px solid #2A3350" }} />
          </div>

          {/* SVG Person */}
          <svg width="90" height="140" viewBox="0 0 90 140" fill="none">
            {/* Shadow */}
            <ellipse cx="45" cy="136" rx="22" ry="5" fill="rgba(0,0,0,0.25)" />

            {/* Body */}
            <rect x="26" y="58" width="38" height="44" rx="10"
              fill={happy ? "#7B5CFF" : "#3B4680"}
              style={{ transition: "fill 0.4s" }} />

            {/* Collar */}
            <path d="M38 58 L45 68 L52 58" stroke="#5B6FCC" strokeWidth="2" fill="none" />

            {/* Left arm */}
            <rect
              x={typing || sent ? "8" : "12"}
              y={typing || sent ? "68" : "65"}
              width="14" height="28" rx="7"
              fill={happy ? "#7B5CFF" : "#3B4680"}
              style={{ transition: "all 0.3s", transformOrigin: "20px 70px", transform: typing ? "rotate(-15deg)" : "rotate(0deg)" }}
            />
            {/* Right arm */}
            <rect
              x={typing || sent ? "68" : "64"}
              y={typing || sent ? "68" : "65"}
              width="14" height="28" rx="7"
              fill={happy ? "#7B5CFF" : "#3B4680"}
              style={{ transition: "all 0.3s", transformOrigin: "70px 70px", transform: typing ? "rotate(15deg)" : "rotate(0deg)" }}
            />

            {/* Legs */}
            <rect x="29" y="98" width="13" height="30" rx="6" fill="#1E2540" />
            <rect x="48" y="98" width="13" height="30" rx="6" fill="#1E2540" />
            {/* Shoes */}
            <ellipse cx="35" cy="130" rx="9" ry="5" fill="#0A0D1A" />
            <ellipse cx="55" cy="130" rx="9" ry="5" fill="#0A0D1A" />

            {/* Neck */}
            <rect x="40" y="48" width="10" height="12" rx="5" fill="#F4C08E" />

            {/* Head */}
            <circle cx="45" cy="36" r="20" fill="#F4C08E" />

            {/* Hair */}
            <path d="M25 30 Q30 14 45 15 Q60 14 65 30 Q62 20 45 20 Q28 20 25 30Z" fill="#2C1810" />
            <rect x="25" y="26" width="5" height="10" rx="2.5" fill="#2C1810" />
            <rect x="60" y="26" width="5" height="10" rx="2.5" fill="#2C1810" />

            {/* Eyes */}
            {happy ? (
              <>
                {/* Happy eyes (^‿^) */}
                <path d="M35 34 Q38 30 41 34" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M49 34 Q52 30 55 34" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Rosy cheeks */}
                <circle cx="33" cy="38" r="4" fill="#FFB3B3" opacity="0.6" />
                <circle cx="57" cy="38" r="4" fill="#FFB3B3" opacity="0.6" />
              </>
            ) : (
              <>
                <circle cx="38" cy="35" r="3" fill="#2C1810" />
                <circle cx="52" cy="35" r="3" fill="#2C1810" />
                <circle cx="39" cy="34" r="1" fill="white" />
                <circle cx="53" cy="34" r="1" fill="white" />
              </>
            )}

            {/* Mouth */}
            {happy
              ? <path d="M37 43 Q45 50 53 43" stroke="#CC6666" strokeWidth="2.5" fill="#FF9999" strokeLinecap="round" />
              : typing
              ? <path d="M39 43 Q45 46 51 43" stroke="#AA7777" strokeWidth="2" fill="none" strokeLinecap="round" />
              : <line x1="40" y1="43" x2="50" y2="43" stroke="#AA7777" strokeWidth="2" strokeLinecap="round" />
            }
          </svg>
        </div>

        {/* ─── Phone with review/reply ─── */}
        <div className="flex flex-col items-center gap-3 mb-4">
          {/* AI reply card */}
          <div className={`relative rounded-2xl px-4 py-3 text-xs max-w-[200px] transition-all duration-700 ${phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ background: "linear-gradient(135deg, #151E30, #1E2A45)", border: "1px solid #2A3A60", color: "#C8CCEE", boxShadow: "0 8px 24px rgba(123,92,255,0.2)" }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7B5CFF,#9B6FFF)" }}>
                <span className="text-white text-[8px] font-black">AI</span>
              </div>
              <span className="text-[11px] font-bold" style={{ color: "#7B5CFF" }}>Reviewdot.in AI</span>
              {phase >= 4 && <span className="text-[9px] text-emerald-400 ml-auto">✓ Sent</span>}
            </div>
            <p style={{ color: "#A0AABF" }}>Thank you so much for your kind words! We truly appreciate your support and look forward to seeing you again! 🙏</p>
            {/* Tail */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 rotate-45" style={{ background: "#151E30", borderRight: "1px solid #2A3A60", borderBottom: "1px solid #2A3A60" }} />
          </div>

          {/* Phone */}
          <div className="relative" style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.5))" }}>
            {/* Phone body */}
            <div className="relative w-[110px] rounded-[22px] overflow-hidden"
              style={{ height: 190, background: "#0A0D1A", border: "2px solid #2A3050", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}>

              {/* Screen glow */}
              <div className="absolute inset-1 rounded-[18px] overflow-hidden" style={{ background: "#080B16" }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-3 pt-2 pb-1">
                  <span className="text-[8px]" style={{ color: "#5D6590" }}>9:41</span>
                  <div className="flex gap-1">
                    {[0,1,2].map(i=><div key={i} className="w-1 rounded-sm" style={{ height: 4+i*2, background: "#5D6590" }} />)}
                  </div>
                </div>

                {/* App bar */}
                <div className="flex items-center gap-1.5 px-2 py-1.5 mx-2 rounded-xl mb-2" style={{ background: "#151E30" }}>
                  <div className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7B5CFF,#9B6FFF)" }}>
                    <span className="text-white text-[7px] font-black">R</span>
                  </div>
                  <span className="text-[8px] font-bold text-white">Write a Review</span>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-2">
                  {[1,2,3,4,5].map(s=>(
                    <span key={s} className="text-[14px] transition-all duration-300"
                      style={{ color: (sent && s <= 5) || (typing && s <= 3) ? "#FFB020" : "#2A3050",
                        transform: sent && s <= 5 ? "scale(1.2)" : "scale(1)" }}>★</span>
                  ))}
                </div>

                {/* Text area */}
                <div className="mx-2 rounded-xl p-2 text-[7px] leading-relaxed" style={{ background: "#0F1525", color: "#C8CCEE", minHeight: 50 }}>
                  {typing && (
                    <span>Amazing service! The food was <span className="animate-pulse">|</span></span>
                  )}
                  {sent && (
                    <span style={{ color: "#A0AABF" }}>★★★★★ Amazing service! Really loved every bit of it!</span>
                  )}
                  {!typing && !sent && (
                    <span style={{ color: "#3A4060" }}>Tap to write your review...</span>
                  )}
                </div>

                {/* Submit button */}
                <div className="mx-2 mt-2 py-1.5 rounded-xl text-center text-[8px] font-bold text-white transition-all"
                  style={{ background: sent ? "linear-gradient(135deg,#22C55E,#16A34A)" : "linear-gradient(135deg,#7B5CFF,#9B6FFF)" }}>
                  {sent ? "✓ Submitted!" : "Submit Review"}
                </div>

                {/* AI thinking indicator */}
                {think && (
                  <div className="flex items-center gap-1.5 mx-2 mt-2 px-2 py-1.5 rounded-xl" style={{ background: "#151E30" }}>
                    <div className="w-3 h-3 rounded flex items-center justify-center" style={{ background: "#7B5CFF" }}>
                      <span className="text-white text-[6px]">AI</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[0,1,2].map(i=><div key={i} className="w-1 h-1 rounded-full bg-violet-400" style={{ animation: `typingDot 1.2s ease-in-out infinite ${i*0.2}s` }} />)}
                    </div>
                  </div>
                )}
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full" style={{ background: "#2A3050" }} />
            </div>

            {/* Side buttons */}
            <div className="absolute top-10 -right-[3px] w-[3px] h-8 rounded-r-full" style={{ background: "#1E2540" }} />
            <div className="absolute top-8 -left-[3px] w-[3px] h-5 rounded-l-full" style={{ background: "#1E2540" }} />
            <div className="absolute top-[52px] -left-[3px] w-[3px] h-8 rounded-l-full" style={{ background: "#1E2540" }} />
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="relative z-10 mt-4 text-center">
        <p className="text-xs font-medium" style={{ color: "#5D6590" }}>
          {phase === 0 && "Customer visits your business"}
          {phase === 1 && "Customer writes a review ✍️"}
          {phase === 2 && "Review posted instantly ✅"}
          {phase === 3 && "Reviewdot.in AI crafting reply..."}
          {phase === 4 && "AI replied in seconds — customer delighted! 🎉"}
        </p>
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {[0,1,2,3,4].map(i=>(
            <div key={i} className="h-1 rounded-full transition-all duration-300"
              style={{ width: phase === i ? 16 : 6, background: phase === i ? "#7B5CFF" : "#172030" }} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes personBounce {
          0%,100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
        @keyframes heartFloat {
          0%   { opacity:0; transform: translateY(0) scale(0.5); }
          30%  { opacity:1; transform: translateY(-20px) scale(1.1); }
          100% { opacity:0; transform: translateY(-60px) scale(0.8); }
        }
      `}</style>
    </div>
  );
}
