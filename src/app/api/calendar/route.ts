import { NextResponse } from "next/server";
import type { EconomicEvent } from "@/lib/types";

// Forex Factory's public weekly calendar feed (no key required).
const FEED_URL = "https://nfs.faireconomy.media/ff_calendar_thisweek.json";

interface FeedItem {
  title: string;
  country: string;
  date: string;
  impact: string;
  forecast: string;
  previous: string;
}

export async function GET() {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (BravohAi calendar)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Calendar feed responded ${res.status}`);
    const items: FeedItem[] = await res.json();

    // High-impact USD events move XAUUSD the most.
    const events: EconomicEvent[] = items
      .filter((e) => e.impact === "High" && e.country === "USD")
      .slice(0, 6)
      .map((e) => ({
        title: e.title,
        country: e.country,
        date: e.date,
        impact: e.impact,
        forecast: e.forecast || undefined,
        previous: e.previous || undefined,
      }));

    return NextResponse.json({ events });
  } catch {
    // Calendar is an enrichment, not a blocker — return empty on failure.
    return NextResponse.json({ events: [] });
  }
}
