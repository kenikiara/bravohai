"use client";

import type { HistoryEntry, TradeOutcome, UserProfile } from "./types";

const HISTORY_KEY = "bravohai_history";
const PROFILE_KEY = "bravohai_profile";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse<HistoryEntry[]>(localStorage.getItem(HISTORY_KEY)) ?? [];
}

export function getEntry(id: string): HistoryEntry | undefined {
  return getHistory().find((e) => e.id === id);
}

export function saveEntry(entry: HistoryEntry): void {
  const history = [entry, ...getHistory().filter((e) => e.id !== entry.id)];
  // Thumbnails are small, but cap history to keep localStorage well under quota.
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
}

export function setOutcome(id: string, outcome: TradeOutcome): void {
  const history = getHistory().map((e) => (e.id === id ? { ...e, outcome } : e));
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function deleteEntry(id: string): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(getHistory().filter((e) => e.id !== id)));
}

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  return safeParse<UserProfile>(localStorage.getItem(PROFILE_KEY));
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export interface Stats {
  total: number;
  decided: number;
  wins: number;
  losses: number;
  winRate: number; // 0-100, only over decided trades
  byInstrument: Record<string, { total: number; wins: number; losses: number }>;
  streak: number; // positive = win streak, negative = loss streak
}

export function computeStats(history: HistoryEntry[]): Stats {
  const wins = history.filter((e) => e.outcome === "win").length;
  const losses = history.filter((e) => e.outcome === "loss").length;
  const decided = wins + losses;
  const byInstrument: Stats["byInstrument"] = {};
  for (const e of history) {
    const key = e.instrument;
    byInstrument[key] ??= { total: 0, wins: 0, losses: 0 };
    byInstrument[key].total++;
    if (e.outcome === "win") byInstrument[key].wins++;
    if (e.outcome === "loss") byInstrument[key].losses++;
  }
  let streak = 0;
  for (const e of history) {
    if (e.outcome !== "win" && e.outcome !== "loss") continue;
    if (streak === 0) streak = e.outcome === "win" ? 1 : -1;
    else if (streak > 0 && e.outcome === "win") streak++;
    else if (streak < 0 && e.outcome === "loss") streak--;
    else break;
  }
  return {
    total: history.length,
    decided,
    wins,
    losses,
    winRate: decided ? Math.round((wins / decided) * 100) : 0,
    byInstrument,
    streak,
  };
}
