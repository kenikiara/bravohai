"use client";

import { useEffect, useState } from "react";
import { Sparkline } from "@/components/Sparkline";
import type { PriceQuote } from "@/lib/types";

export function GoldTicker() {
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

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-2">
      <span className="size-2 rounded-full bg-gold animate-pulse-soft" />
      <span className="text-xs font-semibold text-gold">XAUUSD LIVE</span>
      <span className="text-sm font-bold text-white">
        ${quote.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </span>
      <span className={`text-xs font-semibold ${quote.changePct >= 0 ? "text-bull" : "text-bear"}`}>
        {quote.changePct >= 0 ? "▲" : "▼"} {Math.abs(quote.changePct).toFixed(2)}%
      </span>
      <Sparkline data={quote.spark} width={64} height={20} stroke={quote.changePct >= 0 ? "#02B365" : "#FF6243"} fill={false} />
    </div>
  );
}
