"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { INSTRUMENTS, PRIMARY_INSTRUMENT } from "@/lib/instruments";
import { prepareImage, makeThumbnail, type PreparedImage } from "@/lib/images";
import { getHistory, getProfile, saveEntry } from "@/lib/storage";
import { Sparkline } from "@/components/Sparkline";
import type { AnalysisResult, PriceQuote, TraderProfile } from "@/lib/types";

const PROGRESS_STEPS = [
  "Initializing analysis",
  "Collecting market data",
  "Reading market structure",
  "Scoring confluences",
  "Building trade plans",
];

export default function DashboardPage() {
  const router = useRouter();
  const [instrument, setInstrument] = useState(PRIMARY_INSTRUMENT.code);
  const [images, setImages] = useState<PreparedImage[]>([]);
  const [notes, setNotes] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<PriceQuote | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    setQuote(null);
    fetch(`/api/price?symbol=${instrument}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((q) => !cancelled && q && !q.error && setQuote(q))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [instrument]);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    setError(null);
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    const prepared = await Promise.all(list.map(prepareImage));
    setImages((prev) => [...prev, ...prepared].slice(0, 4));
  }, []);

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      if (e.clipboardData?.files.length) addFiles(e.clipboardData.files);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [addFiles]);

  async function runAnalysis() {
    if (!images.length || analyzing) return;
    setAnalyzing(true);
    setError(null);
    setStepIdx(0);
    const stepTimer = setInterval(
      () => setStepIdx((i) => Math.min(i + 1, PROGRESS_STEPS.length - 1)),
      1800
    );
    try {
      const profile = getProfile();
      const traderProfile: TraderProfile = profile?.style ?? "dayTrader";
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: images.map(({ data, mediaType }) => ({ data, mediaType })),
          instrument,
          profile: traderProfile,
          livePrice: quote ? String(quote.price) : undefined,
          notes: notes || undefined,
          analysisCount: getHistory().length,
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || `Analysis failed (${res.status})`);
      const result = payload as AnalysisResult;
      const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
      const thumbnail = await makeThumbnail(images[0].previewUrl).catch(() => undefined);
      saveEntry({
        id,
        createdAt: Date.now(),
        instrument: result.instrument || instrument,
        instrumentLabel: result.instrumentLabel || instrument,
        profileUsed: traderProfile,
        outcome: "pending",
        result,
        thumbnail,
      });
      window.dispatchEvent(new Event("bravohai:history"));
      router.push(`/dashboard/analysis/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
      setAnalyzing(false);
    } finally {
      clearInterval(stepTimer);
    }
  }

  if (analyzing) {
    return (
      <div className="p-10">
        <div className="text-sm text-faint mb-8">Dashboard / Conversation</div>
        <h2 className="text-lg font-semibold text-ink mb-6 flex items-center gap-3">
          <span className="size-2 rounded-full bg-royal animate-pulse-soft" />
          Chart analysis in progress…
        </h2>
        <ul className="space-y-3">
          {PROGRESS_STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-3 text-sm">
              {i < stepIdx ? (
                <span className="text-bull font-bold">✓</span>
              ) : i === stepIdx ? (
                <span className="size-3 rounded-full border-2 border-royal border-t-transparent animate-spin" />
              ) : (
                <span className="size-3 rounded-full border border-edge" />
              )}
              <span className={i <= stepIdx ? "text-ink" : "text-faint"}>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-10">
        <div className="text-sm text-faint">Dashboard</div>
        {quote && (
          <div className="flex items-center gap-3 rounded-lg border border-edge bg-surface px-3 py-1.5">
            <span className="text-xs font-semibold text-muted">{quote.symbol}</span>
            <span className="text-sm font-bold text-ink">
              {quote.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
            <span className={`text-xs font-semibold ${quote.changePct >= 0 ? "text-bull" : "text-bear"}`}>
              {quote.changePct >= 0 ? "+" : ""}
              {quote.changePct.toFixed(2)}%
            </span>
            <Sparkline data={quote.spark} width={72} height={24} stroke={quote.changePct >= 0 ? "#1f9d57" : "#c94f38"} fill={false} />
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Analyze your chart</h1>
        <p className="mt-2 text-sm text-muted">
          Upload multiple timeframes (1m, 5m, 1h) for a better AI analysis.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {INSTRUMENTS.map((ins) => (
            <button
              key={ins.code}
              type="button"
              onClick={() => setInstrument(ins.code)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                instrument === ins.code
                  ? "border-royal bg-royal-tint text-royal"
                  : "border-edge bg-surface text-muted hover:border-faint hover:text-ink"
              }`}
            >
              {ins.primary ? "★ " : ""}
              {ins.code}
            </button>
          ))}
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label="Upload chart screenshots"
          onClick={() => fileInput.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInput.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`mt-8 rounded-2xl border-2 border-dashed px-8 py-14 cursor-pointer transition-colors duration-150 ${
            dragOver ? "border-royal bg-royal-tint" : "border-edge bg-surface hover:border-royal/50"
          }`}
        >
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
          {images.length === 0 ? (
            <>
              <div className="mx-auto mb-4 size-14 rounded-xl bg-royal-tint border border-royal/25 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-royal" aria-hidden>
                  <path d="M4 17l4-6 3 4 3-5 6 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </div>
              <p className="text-sm text-ink">
                Drag an image, paste a screenshot, or <span className="text-royal font-semibold underline underline-offset-2">click to import</span>
              </p>
              <p className="mt-1.5 text-xs text-faint">PNG or JPG · up to 4 timeframes</p>
            </>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.previewUrl} alt={img.name} className="h-28 rounded-lg border border-edge object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImages((prev) => prev.filter((_, j) => j !== i));
                    }}
                    className="absolute -top-2 -right-2 size-6 rounded-full bg-surface border border-edge text-muted hover:text-bear hover:border-bear text-xs shadow-sm"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <div className="h-28 w-20 rounded-lg border border-dashed border-edge flex items-center justify-center text-faint text-2xl">
                  +
                </div>
              )}
            </div>
          )}
        </div>

        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional note for the AI, e.g. focus on the London session range"
          className="mt-4 w-full rounded-lg border border-edge bg-surface px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-royal focus:outline-none"
        />

        {error && (
          <div role="alert" className="mt-4 rounded-lg border border-bear/40 bg-bear/10 px-4 py-3 text-sm text-bear">
            {error}
          </div>
        )}

        <button
          type="button"
          disabled={!images.length}
          onClick={runAnalysis}
          className="mt-6 w-full rounded-xl bg-royal py-3.5 font-bold text-white transition-colors duration-150 hover:bg-royal-deep disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Analyze {images.length > 1 ? `${images.length} charts` : "chart"} →
        </button>
        <p className="mt-3 text-xs text-faint">
          Educational analysis only. Not financial advice. Trading involves significant risk.
        </p>
      </div>
    </div>
  );
}
