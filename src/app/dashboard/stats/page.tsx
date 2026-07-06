"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { computeStats, getHistory, type Stats } from "@/lib/storage";
import type { HistoryEntry } from "@/lib/types";

export default function StatsPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const h = getHistory();
    setHistory(h);
    setStats(computeStats(h));
  }, []);

  if (!stats) return <div className="p-10 text-sm text-neutral-500">Loading…</div>;

  const adaptationPct = Math.min(100, Math.round((stats.total / 10) * 100));

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="text-sm text-neutral-500 mb-8">Dashboard / Performance</div>
      <h1 className="text-2xl font-semibold text-white">Your performance</h1>
      <p className="mt-1.5 text-sm text-neutral-400">
        Every analysis is saved — mark wins and losses to watch your edge evolve.
      </p>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Analyses" value={String(stats.total)} />
        <StatCard
          label="Win rate"
          value={stats.decided ? `${stats.winRate}%` : "—"}
          valueClass={stats.winRate >= 50 ? "text-bull" : stats.decided ? "text-bear" : "text-white"}
          sub={stats.decided ? `${stats.wins}W · ${stats.losses}L` : "mark outcomes to track"}
        />
        <StatCard
          label="Current streak"
          value={stats.streak === 0 ? "—" : `${Math.abs(stats.streak)} ${stats.streak > 0 ? "wins" : "losses"}`}
          valueClass={stats.streak > 0 ? "text-bull" : stats.streak < 0 ? "text-bear" : "text-white"}
        />
        <StatCard label="Pending outcomes" value={String(stats.total - stats.decided)} />
      </div>

      {/* AI adaptation */}
      <div className="mt-6 rounded-xl border border-edge bg-card p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-white">AI profile adaptation</div>
          <div className="text-xs text-neutral-400">{Math.min(stats.total, 10)}/10 analyses</div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gold transition-all" style={{ width: `${adaptationPct}%` }} />
        </div>
        <p className="mt-2.5 text-xs text-neutral-500">
          {stats.total >= 10
            ? "Calibrated — BravohAi now weighs its recommendations toward your trading style."
            : `After ${10 - stats.total} more analyses, BravohAi fully adapts its recommendations to your style.`}
        </p>
      </div>

      {/* Per instrument */}
      {Object.keys(stats.byInstrument).length > 0 && (
        <>
          <h2 className="mt-10 mb-4 text-sm font-semibold text-white tracking-wide">By instrument</h2>
          <div className="rounded-xl border border-edge bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-edge text-left text-xs text-neutral-500">
                  <th className="px-5 py-3 font-medium">Instrument</th>
                  <th className="px-5 py-3 font-medium">Analyses</th>
                  <th className="px-5 py-3 font-medium">Wins</th>
                  <th className="px-5 py-3 font-medium">Losses</th>
                  <th className="px-5 py-3 font-medium">Win rate</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.byInstrument).map(([code, s]) => {
                  const decided = s.wins + s.losses;
                  const wr = decided ? Math.round((s.wins / decided) * 100) : null;
                  return (
                    <tr key={code} className="border-b border-edge/50 last:border-0">
                      <td className="px-5 py-3 font-medium text-white">{code}</td>
                      <td className="px-5 py-3 text-neutral-300">{s.total}</td>
                      <td className="px-5 py-3 text-bull">{s.wins}</td>
                      <td className="px-5 py-3 text-bear">{s.losses}</td>
                      <td className="px-5 py-3">
                        {wr === null ? (
                          <span className="text-neutral-600">—</span>
                        ) : (
                          <span className={wr >= 50 ? "text-bull" : "text-bear"}>{wr}%</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Recent analyses */}
      <h2 className="mt-10 mb-4 text-sm font-semibold text-white tracking-wide">Recent analyses</h2>
      {history.length === 0 ? (
        <div className="rounded-xl border border-edge bg-card p-8 text-center">
          <p className="text-sm text-neutral-400">No analyses yet.</p>
          <Link href="/dashboard" className="mt-3 inline-block rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black">
            Analyze your first chart
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {history.slice(0, 12).map((e) => (
            <Link
              key={e.id}
              href={`/dashboard/analysis/${e.id}`}
              className="rounded-xl border border-edge bg-card overflow-hidden hover:border-gold/50 transition-colors"
            >
              {e.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={e.thumbnail} alt="" className="h-24 w-full object-cover opacity-80" />
              ) : (
                <div className="h-24 bg-white/[0.03]" />
              )}
              <div className="p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{e.instrumentLabel}</span>
                  {e.outcome === "win" && <span className="text-[10px] font-bold text-bull">WIN</span>}
                  {e.outcome === "loss" && <span className="text-[10px] font-bold text-bear">LOSS</span>}
                  {e.outcome === "pending" && <span className="text-[10px] text-neutral-500">PENDING</span>}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500">
                  {new Date(e.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  {" · "}
                  {e.result.trend.direction}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-edge bg-card p-5">
      <div className={`text-2xl font-bold tracking-tight ${valueClass}`}>{value}</div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
      {sub && <div className="mt-0.5 text-[11px] text-neutral-600">{sub}</div>}
    </div>
  );
}
