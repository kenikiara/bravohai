import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bravohai.vercel.app"),
  title: "BravohAi | AI Trading Software for Gold (XAUUSD) Chart Analysis",
  description:
    "BravohAi is an AI trading copilot that analyzes XAUUSD, forex & crypto charts in seconds. Get clear trade scenarios with probabilities, entries, stops and targets.",
  openGraph: {
    title: "BravohAi — AI chart analysis, gold first",
    description:
      "Upload a chart screenshot, get a professional trade plan in seconds: trend, key levels, scenarios with probabilities, entry, stop and target.",
    url: "https://bravohai.vercel.app",
    siteName: "BravohAi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BravohAi — AI chart analysis, gold first",
    description:
      "Upload a chart screenshot, get a professional trade plan in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
