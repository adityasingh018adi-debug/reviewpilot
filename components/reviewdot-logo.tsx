// Reviewdot.in — Brand Logo Component

interface ReviewdotLogoProps {
  size?: number;          // icon size in px
  showWordmark?: boolean; // show "Reviewdot.in" text beside icon
  collapsed?: boolean;    // sidebar collapsed mode
}

export function ReviewdotIcon({ size = 36 }: { size?: number }) {
  const id = `rd-${size}`;
  // Unit 5-point star (outer r=1, inner r=0.4), point-up, centered at origin
  const STAR =
    "M0 -1 L0.235 -0.324 L0.951 -0.309 L0.38 0.124 L0.588 0.809 L0 0.4 L-0.588 0.809 L-0.38 0.124 L-0.951 -0.309 L-0.235 -0.324 Z";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-r`} x1="6" y1="4" x2="30" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E3A8A" />
          <stop offset="0.55" stopColor="#2563EB" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* ── Letter "R" ── */}
      {/* Stem */}
      <rect x="6.5" y="4" width="6" height="27" rx="2" fill={`url(#${id}-r)`} />
      {/* Bowl */}
      <path
        d="M10 4H20C25 4 28.5 7.4 28.5 11.75C28.5 16.1 25 19.5 20 19.5H10Z"
        fill={`url(#${id}-r)`}
      />
      {/* Leg */}
      <path d="M15 15.5H22.5L29 31H21.5Z" fill={`url(#${id}-r)`} />

      {/* ── White chat bubble in the bowl ── */}
      <path
        d="M13 8.5C13 7.4 13.9 6.5 15 6.5H24C25.1 6.5 26 7.4 26 8.5V13C26 14.1 25.1 15 24 15H17.5L15 17.6V15C13.9 15 13 14.1 13 13V8.5Z"
        fill="white"
      />
      <circle cx="16.2" cy="10.7" r="1" fill="#1E3A8A" />
      <circle cx="19.3" cy="10.7" r="1" fill="#1E3A8A" />
      <circle cx="22.4" cy="10.7" r="1" fill="#1E3A8A" />

      {/* ── Gold star cascade (right side, descending) ── */}
      <path d={STAR} transform="translate(30 15.5) scale(3.3)" fill="#F5B301" />
      <path d={STAR} transform="translate(32.2 20.5) scale(2.1)" fill="#F5B301" />
      <path d={STAR} transform="translate(31 25) scale(1.45)" fill="#F5B301" />
      <path d={STAR} transform="translate(28.6 28.6) scale(1)" fill="#F5B301" />

      {/* ── Blue checkmark swoosh (bottom-left) ── */}
      <path
        d="M5.5 24L10 29L18.5 19.5"
        stroke="#38BDF8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ReviewdotLogo({ size = 36, showWordmark = true, collapsed = false }: ReviewdotLogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <ReviewdotIcon size={size} />
      {showWordmark && !collapsed && (
        <div className="flex items-baseline leading-none">
          <span className="font-black text-[15px] tracking-tight text-white">
            Review
          </span>
          <span
            className="font-black text-[15px] tracking-tight"
            style={{
              background: "linear-gradient(90deg,#3B82F6,#60A5FA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            dot
          </span>
          <span className="font-bold text-[11px] tracking-tight ml-0.5 text-[#93C5FD]">
            .in
          </span>
        </div>
      )}
    </div>
  );
}
