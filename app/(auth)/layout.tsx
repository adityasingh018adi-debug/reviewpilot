export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
      style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 40%, #fce7f3 100%)" }}
    >
      {/* Background blobs */}
      <div className="absolute top-20 left-16 w-64 h-64 bg-violet-300/25 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-20 right-16 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-300/15 rounded-full blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "6s" }} />

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-300/50"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
            >
              <span className="text-white font-bold text-base">R</span>
            </div>
            <span className="font-bold text-2xl" style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Reviewdot.in</span>
          </div>
          <p className="text-slate-500 text-sm mt-2">AI-powered review management · 20+ languages</p>
        </div>

        {children}
      </div>
    </div>
  );
}
