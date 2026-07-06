"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Logo";
import { getHistory, getProfile } from "@/lib/storage";
import type { HistoryEntry, UserProfile } from "@/lib/types";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setHistory(getHistory());
    setProfile(getProfile());
    const onStorage = () => setHistory(getHistory());
    window.addEventListener("bravohai:history", onStorage);
    return () => window.removeEventListener("bravohai:history", onStorage);
  }, [pathname]);

  const adapted = history.length >= 10;

  return (
    <aside className="hidden md:flex w-64 shrink-0 h-screen sticky top-0 flex-col border-r border-edge bg-panel">
      <div className="p-4 flex items-center gap-2.5">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size={26} />
          <span className="font-semibold tracking-tight text-white">
            Bravoh<span className="text-gold">Ai</span>
          </span>
        </Link>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full rounded-lg bg-gold text-black font-semibold text-sm py-2.5 hover:bg-gold-soft transition-colors"
        >
          + New analysis
        </button>
      </div>

      <nav className="px-3 mt-4 space-y-1">
        <Link
          href="/dashboard/stats"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
            pathname === "/dashboard/stats"
              ? "bg-white/[0.06] text-white"
              : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 14h12M4 10v4M8 6v8M12 2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Performance
        </Link>
      </nav>

      <div className="mt-5 px-3 flex-1 overflow-y-auto">
        <div className="px-3 text-[11px] uppercase tracking-wider text-neutral-500 mb-2">History</div>
        {history.length === 0 && (
          <p className="px-3 text-xs text-neutral-600">No analyses yet. Upload your first chart.</p>
        )}
        <ul className="space-y-0.5">
          {history.slice(0, 30).map((e) => {
            const active = pathname === `/dashboard/analysis/${e.id}`;
            return (
              <li key={e.id}>
                <Link
                  href={`/dashboard/analysis/${e.id}`}
                  className={`block rounded-lg px-3 py-2 transition-colors ${
                    active ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm text-neutral-200 truncate">{e.instrumentLabel}</span>
                    {e.outcome === "win" && <span className="text-[10px] font-semibold text-bull">WIN</span>}
                    {e.outcome === "loss" && <span className="text-[10px] font-semibold text-bear">LOSS</span>}
                  </span>
                  <span className="block text-[11px] text-neutral-500">{timeAgo(e.createdAt)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-edge p-4">
        {adapted && (
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-gold/25 bg-gold/[0.07] px-3 py-2">
            <span className="size-1.5 rounded-full bg-gold animate-pulse-soft" />
            <span className="text-[11px] text-gold-soft">AI calibrated to your profile</span>
          </div>
        )}
        <Link href="/onboarding" className="flex items-center gap-3 group">
          <span className="size-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold">
            {(profile?.name?.[0] ?? "T").toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-white truncate group-hover:text-gold transition-colors">
              {profile?.name || "Set up your profile"}
            </span>
            <span className="block text-[11px] text-neutral-500 truncate">
              {profile
                ? profile.email ||
                  { scalper: "Scalper", dayTrader: "Day trader", swingTrader: "Swing trader" }[profile.style]
                : "5 quick questions"}
            </span>
          </span>
        </Link>
      </div>
    </aside>
  );
}
