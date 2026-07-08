import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Reviewdot.in",
  description: "Reviewdot.in Admin Command Center",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {children}
    </div>
  );
}
