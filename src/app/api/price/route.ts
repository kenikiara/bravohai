import { NextRequest, NextResponse } from "next/server";
import { findInstrument, PRIMARY_INSTRUMENT } from "@/lib/instruments";
import type { PriceQuote } from "@/lib/types";

export const revalidate = 0;

// Proxies Yahoo Finance chart data for live quotes + sparkline.
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("symbol") ?? PRIMARY_INSTRUMENT.code;
  const instrument = findInstrument(code);
  if (!instrument) {
    return NextResponse.json({ error: `Unknown symbol: ${code}` }, { status: 400 });
  }

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    instrument.yahoo
  )}?interval=5m&range=1d`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (BravohAi price feed)" },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Yahoo responded ${res.status}`);
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    const meta = result?.meta;
    if (!meta?.regularMarketPrice) throw new Error("No price in response");

    const closes: number[] = (result?.indicators?.quote?.[0]?.close ?? []).filter(
      (v: number | null): v is number => v != null
    );
    const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? closes[0];
    const price = meta.regularMarketPrice as number;
    const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

    // Downsample sparkline to ~40 points.
    const step = Math.max(1, Math.floor(closes.length / 40));
    const spark = closes.filter((_, i) => i % step === 0);

    const quote: PriceQuote = {
      symbol: instrument.code,
      price,
      changePct,
      spark,
      currency: meta.currency ?? "USD",
    };
    return NextResponse.json(quote);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Price fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
