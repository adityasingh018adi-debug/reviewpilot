import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ReviewPilot — AI Review Management for Businesses Worldwide",
    template: "%s | ReviewPilot",
  },
  description:
    "Reply to Google reviews in seconds with AI, in 20+ languages. Protect your reputation and grow your business automatically — used by 500+ businesses worldwide.",
  keywords: [
    "Google reviews", "review management", "AI replies", "review automation",
    "multi-language reviews", "business reputation", "review response",
    "Hindi", "French", "German", "Arabic", "global",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
