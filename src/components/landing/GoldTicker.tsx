"use client";

import { useEffect, useState } from "react";
import { Sparkline } from "@/components/Sparkline";
import type { PriceQuote } from "@/lib/types";

export function GoldTicker({ onDark = false }: { onDark?: boolean }) {
  const [quote, setQuote] = useState<PriceQuote | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetch("/api/price?symbol=XAUUSD")
        .then((r) => (r.ok ? r.json() : null))
        .then((q) => !cancelled && q && !q.error && setQuote(q))
        .catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  if (!quote) return null;

  const up = quote.changePct >= 0;
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 ${
        onDark ? "border-white/25 bg-white/10" : "border-edge bg-surface"
      }`}
    >
      <span className="size-2 rounded-full bg-flame animate-pulse-soft" />
      <span className={`text-xs font-bold tracking-wide ${onDark ? "text-white/85" : "text-royal"}`}>
        XAUUSD LIVE
      </span>
      <span className={`text-sm font-bold ${onDark ? "text-white" : "text-ink"}`}>
        ${quote.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </span>
      <span className={`text-xs font-semibold ${up ? (onDark ? "text-[#7fd6a6]" : "text-bull") : onDark ? "text-[#ffb3a0]" : "text-bear"}`}>
        {up ? "▲" : "▼"} {Math.abs(quote.changePct).toFixed(2)}%
      </span>
      <Sparkline
        data={quote.spark}
        width={64}
        height={20}
        stroke={up ? (onDark ? "#7fd6a6" : "#1f9d57") : onDark ? "#ffb3a0" : "#c94f38"}
        fill={false}
      />
    </div>
  );
}
