"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { Sparkline } from "@/components/Sparkline";
import { getEntry, setOutcome } from "@/lib/storage";
import type { EconomicEvent, HistoryEntry, PriceQuote, TradeOutcome, TraderProfile } from "@/lib/types";

const PROFILE_TABS: { key: TraderProfile; label: string }[] = [
  { key: "scalper", label: "Scalper" },
  { key: "dayTrader", label: "Day Trader" },
  { key: "swingTrader", label: "Swing Trader" },
];

export default function AnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<HistoryEntry | null | undefined>(undefined);
  const [tab, setTab] = useState<TraderProfile>("dayTrader");
  const [quote, setQuote] = useState<PriceQuote | null>(null);
  const [events, setEvents] = useState<EconomicEvent[]>([]);

  useEffect(() => {
    const e = getEntry(id) ?? null;
    setEntry(e);
    if (e) setTab(e.profileUsed);
  }, [id]);

  useEffect(() => {
    if (!entry) return;
    fetch(`/api/price?symbol=${entry.instrument}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((q) => q && !q.error && setQuote(q))
      .catch(() => {});
    fetch("/api/calendar")
      .then((r) => (r.ok ? r.json() : { events: [] }))
      .then((d) => setEvents(d.events ?? []))
      .catch(() => {});
  }, [entry]);

  const r = entry?.result;
  const plan = useMemo(() => r?.plans?.[tab], [r, tab]);

  if (entry === undefined) {
    return <div className="p-10 text-neutral-500 text-sm">Loading analysis…</div>;
  }
  if (entry === null || !r) {
    return (
      <div className="p-10">
        <p className="text-neutral-400">Analysis not found — it may have been created on another device.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-gold hover:underline">
          ← Run a new analysis
        </Link>
      </div>
    );
  }

  function markOutcome(outcome: TradeOutcome) {
    setOutcome(entry!.id, outcome);
    setEntry({ ...entry!, outcome });
    window.dispatchEvent(new Event("bravohai:history"));
  }

  const trendColor =
    r.trend.direction === "bullish" ? "text-bull" : r.trend.direction === "bearish" ? "text-bear" : "text-neutral-300";

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm text-neutral-500">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>{" "}
          / Conversation
        </div>
        {r.demoMode && (
          <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-medium text-gold">
            Demo mode — set ANTHROPIC_API_KEY for live AI analysis
          </span>
        )}
      </div>

      {/* Instrument header */}
      <div className="flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-3">
          <span className="size-11 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-bold">
            {r.instrumentLabel?.[0] ?? "?"}
          </span>
          <div>
            <div className="text-xl font-semibold text-white">{r.instrumentLabel}</div>
            <div className="text-xs text-neutral-500">
              {r.instrument} · {r.detectedTimeframes?.join(", ") || "chart"}
            </div>
          </div>
        </div>
        <div className="text-3xl font-bold text-white tracking-tight">
          {quote ? quote.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : r.currentPrice}
        </div>
        {quote && (
          <span className={`text-sm font-semibold ${quote.changePct >= 0 ? "text-bull" : "text-bear"}`}>
            {quote.changePct >= 0 ? "+" : ""}
            {quote.changePct.toFixed(2)}%
          </span>
        )}
        {quote && <Sparkline data={quote.spark} width={140} height={40} stroke={quote.changePct >= 0 ? "#02B365" : "#FF6243"} />}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-neutral-500 mr-1">Result:</span>
          <button
            type="button"
            onClick={() => markOutcome(entry.outcome === "win" ? "pending" : "win")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors ${
              entry.outcome === "win"
                ? "border-bull bg-bull/15 text-bull"
                : "border-edge text-neutral-400 hover:border-bull hover:text-bull"
            }`}
          >
            Win
          </button>
          <button
            type="button"
            onClick={() => markOutcome(entry.outcome === "loss" ? "pending" : "loss")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors ${
              entry.outcome === "loss"
                ? "border-bear bg-bear/15 text-bear"
                : "border-edge text-neutral-400 hover:border-bear hover:text-bear"
            }`}
          >
            Loss
          </button>
        </div>
      </div>

      {/* Trend banner */}
      <div className="mt-6 rounded-xl border border-edge bg-card px-5 py-4 flex flex-wrap items-center gap-3">
        <span className={`text-sm font-semibold uppercase tracking-wide ${trendColor}`}>{r.trend.direction}</span>
        <span className="text-sm text-neutral-300">{r.trend.summary}</span>
        <span className="ml-auto text-xs text-neutral-500">Confidence {r.confidence}%</span>
      </div>

      {r.noTrade?.isNoTrade && (
        <div className="mt-4 rounded-xl border border-gold/40 bg-gold/[0.07] px-5 py-4">
          <div className="text-sm font-semibold text-gold">No trade — and that&apos;s the edge</div>
          <p className="mt-1 text-sm text-neutral-300">{r.noTrade.reason}</p>
        </div>
      )}

      {/* Key figures */}
      <h2 className="mt-10 mb-4 text-sm font-semibold text-white tracking-wide">Key figures</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <FigureCard title="Market stability" value={`${r.keyFigures.marketStability.score}/10`} note={r.keyFigures.marketStability.note} />
        <FigureCard
          title="RSI"
          value={String(r.keyFigures.rsi.value)}
          valueClass={r.keyFigures.rsi.value >= 70 ? "text-bear" : r.keyFigures.rsi.value <= 30 ? "text-bull" : "text-white"}
          note={r.keyFigures.rsi.note}
        />
        <FigureCard
          title="Economic context"
          value={r.keyFigures.economicContext.label}
          valueClass={
            r.keyFigures.economicContext.label === "Bullish"
              ? "text-bull"
              : r.keyFigures.economicContext.label === "Bearish"
                ? "text-bear"
                : "text-gold"
          }
          note={r.keyFigures.economicContext.note}
        />
        <FigureCard title="Volatility" value={r.keyFigures.volatility.label} note={r.keyFigures.volatility.note} />
      </div>

      {/* Key levels */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-edge bg-card p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2.5">Supports</div>
          <div className="flex flex-wrap gap-2">
            {r.keyLevels.supports.map((s) => (
              <span key={s} className="rounded-md border border-bull/40 bg-bull/10 px-2.5 py-1 text-xs font-medium text-bull">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-edge bg-card p-4">
          <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2.5">Resistances</div>
          <div className="flex flex-wrap gap-2">
            {r.keyLevels.resistances.map((s) => (
              <span key={s} className="rounded-md border border-bear/40 bg-bear/10 px-2.5 py-1 text-xs font-medium text-bear">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Adapted trading plan */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white tracking-wide">Adapted trading plan</h2>
        <div className="flex rounded-lg border border-edge bg-card p-1 gap-1">
          {PROFILE_TABS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setTab(p.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === p.key ? "bg-gold text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              {p.label}
              {entry.profileUsed === p.key && tab !== p.key ? " •" : ""}
            </button>
          ))}
        </div>
      </div>

      {plan && (
        <>
          <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <PlanCard
              label="Trade type"
              value={plan.tradeType}
              valueClass={
                plan.tradeType.startsWith("BUY")
                  ? "text-bull"
                  : plan.tradeType.startsWith("SELL") || plan.tradeType.startsWith("MARKET SELL")
                    ? "text-bear"
                    : "text-neutral-300"
              }
            />
            <PlanCard label="Trade price" value={plan.entry || "—"} />
            <PlanCard label="Stop-Loss" value={plan.stopLoss || "—"} />
            <PlanCard label="Take Profit" value={plan.takeProfit || "—"} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
            {plan.riskReward && (
              <span className="rounded-md border border-edge bg-card px-2.5 py-1">
                R:R <span className="text-white font-medium">{plan.riskReward}</span>
              </span>
            )}
            <span>{plan.rationale}</span>
          </div>
        </>
      )}

      {/* Explanations */}
      <div className="mt-8 space-y-3">
        <Accordion title="Explanations" defaultOpen icon={<span>🧠</span>}>
          <p>{r.explanation}</p>
        </Accordion>
      </div>

      <h2 className="mt-10 mb-4 text-sm font-semibold text-white tracking-wide">Other information</h2>
      <div className="space-y-3">
        <Accordion title="Technical Analysis" icon={<span>📐</span>}>
          <div className="space-y-5">
            <TechBlock title="Multi timeframe trends" body={r.technicalAnalysis.multiTimeframeTrends} />
            <TechBlock title="Order blocks" body={r.technicalAnalysis.orderBlocks} />
            <TechBlock title="Fair value gaps" body={r.technicalAnalysis.fairValueGaps} />
            <TechBlock title="Fibonacci" body={r.technicalAnalysis.fibonacci} />
          </div>
        </Accordion>

        <Accordion title="Probable Scenarios" icon={<span>🎯</span>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScenarioCard kind="bullish" s={r.scenarios.bullish} />
            <ScenarioCard kind="bearish" s={r.scenarios.bearish} />
          </div>
        </Accordion>
      </div>

      {/* Economic announcements */}
      {events.length > 0 && (
        <>
          <h2 className="mt-10 mb-4 text-sm font-semibold text-white tracking-wide">Economic announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {events.slice(0, 6).map((ev, i) => (
              <div key={i} className="rounded-xl border border-edge bg-card p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-bear/15 border border-bear/40 px-2 py-0.5 text-[10px] font-semibold text-bear uppercase">
                    {ev.impact}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {new Date(ev.date).toLocaleString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="mt-2.5 text-sm font-medium text-white">
                  {ev.title} <span className="text-neutral-500">({ev.country})</span>
                </div>
                <div className="mt-1.5 text-xs text-neutral-400">
                  {ev.forecast && <span>Forecast {ev.forecast} · </span>}
                  {ev.previous && <span>Previous {ev.previous}</span>}
                </div>
                <div className="mt-2 text-[11px] text-neutral-600">via Forex Factory calendar</div>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="mt-10 text-xs text-neutral-600">
        BravohAi is an AI-powered chart analysis tool for educational purposes only. Nothing here constitutes financial
        advice. Trading involves significant risk of loss.
      </p>
    </div>
  );
}

function FigureCard({
  title,
  value,
  note,
  valueClass = "text-white",
}: {
  title: string;
  value: string;
  note: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-edge bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400">{title}</span>
        <span className={`text-base font-bold ${valueClass}`}>{value}</span>
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed text-neutral-500">{note}</p>
    </div>
  );
}

function PlanCard({ label, value, valueClass = "text-white" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="rounded-xl border border-edge bg-card p-5">
      <div className={`text-xl md:text-2xl font-bold tracking-tight ${valueClass}`}>{value}</div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function TechBlock({ title, body }: { title: string; body: string }) {
  if (!body) return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">{title}</div>
      <p className="text-sm leading-relaxed text-neutral-300">{body}</p>
    </div>
  );
}

function ScenarioCard({ kind, s }: { kind: "bullish" | "bearish"; s: { trigger: string; target: string; probability: number; description: string } }) {
  return (
    <div className={`rounded-xl border p-4 ${kind === "bullish" ? "border-bull/40 bg-bull/[0.06]" : "border-bear/40 bg-bear/[0.06]"}`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold capitalize ${kind === "bullish" ? "text-bull" : "text-bear"}`}>{kind} scenario</span>
        <span className="text-lg font-bold text-white">{s.probability}%</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={kind === "bullish" ? "h-full bg-bull" : "h-full bg-bear"}
          style={{ width: `${Math.min(100, Math.max(0, s.probability))}%` }}
        />
      </div>
      <div className="mt-3 text-xs text-neutral-400">
        Trigger: <span className="text-neutral-200">{s.trigger}</span>
      </div>
      <div className="mt-1 text-xs text-neutral-400">
        Target: <span className="text-neutral-200">{s.target}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-neutral-400">{s.description}</p>
    </div>
  );
}
