"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { getProfile, saveProfile } from "@/lib/storage";
import type { TraderProfile, UserProfile } from "@/lib/types";

interface Question {
  key: keyof Pick<UserProfile, "style" | "experience" | "risk" | "markets" | "goal">;
  title: string;
  subtitle: string;
  multi?: boolean;
  options: { value: string; label: string; hint: string }[];
}

const QUESTIONS: Question[] = [
  {
    key: "style",
    title: "How do you like to trade?",
    subtitle: "BravohAi calibrates every trade plan to your holding period.",
    options: [
      { value: "scalper", label: "Scalper", hint: "In and out in minutes — tight stops, quick targets" },
      { value: "dayTrader", label: "Day trader", hint: "Intraday positions, flat by session close" },
      { value: "swingTrader", label: "Swing trader", hint: "Multi-day holds on higher-timeframe structure" },
    ],
  },
  {
    key: "experience",
    title: "How much trading experience do you have?",
    subtitle: "This adjusts how much the AI explains its reasoning.",
    options: [
      { value: "beginner", label: "Beginner", hint: "Less than a year — explain everything" },
      { value: "intermediate", label: "Intermediate", hint: "1–3 years — keep it practical" },
      { value: "advanced", label: "Advanced", hint: "3+ years — straight to the levels" },
    ],
  },
  {
    key: "risk",
    title: "What's your risk appetite?",
    subtitle: "Used to bias stop placement and target selection.",
    options: [
      { value: "conservative", label: "Conservative", hint: "Protect capital first, smaller targets" },
      { value: "moderate", label: "Moderate", hint: "Balanced risk-to-reward" },
      { value: "aggressive", label: "Aggressive", hint: "Wider stops, extended targets" },
    ],
  },
  {
    key: "markets",
    title: "Which markets do you trade?",
    subtitle: "Pick all that apply — Gold traders get macro context by default.",
    multi: true,
    options: [
      { value: "gold", label: "Gold (XAUUSD)", hint: "Our primary market" },
      { value: "forex", label: "Forex", hint: "Majors and crosses" },
      { value: "crypto", label: "Crypto", hint: "BTC, ETH and alts" },
      { value: "indices", label: "Indices", hint: "S&P 500, Nasdaq" },
    ],
  },
  {
    key: "goal",
    title: "What's your main goal right now?",
    subtitle: "Helps us tailor guidance and mentoring suggestions.",
    options: [
      { value: "consistency", label: "Consistency", hint: "Stop the boom-and-bust cycle" },
      { value: "funded", label: "Pass a prop challenge", hint: "Get and keep funded capital" },
      { value: "learning", label: "Learn to read charts", hint: "Understand the why behind trades" },
      { value: "income", label: "Trade for income", hint: "Make trading a reliable side income" },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({ markets: [] });

  useEffect(() => {
    const existing = getProfile();
    if (existing) {
      setName(existing.name);
      setEmail(existing.email);
      setAnswers({
        style: existing.style,
        experience: existing.experience,
        risk: existing.risk,
        markets: existing.markets,
        goal: existing.goal,
      });
    }
  }, []);

  const totalSteps = QUESTIONS.length + 1; // +1 for the account step
  const isAccountStep = step === 0;
  const q = isAccountStep ? null : QUESTIONS[step - 1];

  function select(value: string) {
    if (!q) return;
    if (q.multi) {
      const current = (answers[q.key] as string[]) ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      setAnswers({ ...answers, [q.key]: next });
    } else {
      setAnswers({ ...answers, [q.key]: value });
      // auto-advance for single-select
      setTimeout(() => setStep((s) => Math.min(s + 1, totalSteps - 1)), 180);
      if (step === totalSteps - 1) finish({ ...answers, [q.key]: value });
    }
  }

  function canContinue(): boolean {
    if (isAccountStep) return name.trim().length > 0;
    if (!q) return false;
    const a = answers[q.key];
    return q.multi ? Array.isArray(a) && a.length > 0 : Boolean(a);
  }

  function finish(finalAnswers = answers) {
    saveProfile({
      name: name.trim() || "Trader",
      email: email.trim(),
      style: (finalAnswers.style as TraderProfile) ?? "dayTrader",
      experience: (finalAnswers.experience as UserProfile["experience"]) ?? "beginner",
      risk: (finalAnswers.risk as UserProfile["risk"]) ?? "moderate",
      markets: (finalAnswers.markets as string[]) ?? ["gold"],
      goal: (finalAnswers.goal as string) ?? "consistency",
      onboardedAt: Date.now(),
    });
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-ink flex flex-col">
      <header className="p-5">
        <Logo />
      </header>
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-lg">
          {/* progress */}
          <div className="flex gap-1.5 mb-8">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-gold" : "bg-white/10"}`} />
            ))}
          </div>

          {isAccountStep ? (
            <>
              <h1 className="text-2xl font-semibold text-white">Create your account</h1>
              <p className="mt-1.5 text-sm text-neutral-400">
                2 minutes, 5 questions — the AI calibrates to you from your very first analysis.
              </p>
              <div className="mt-6 space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-edge bg-card px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-gold/60 focus:outline-none"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional — stays on this device)"
                  type="email"
                  className="w-full rounded-lg border border-edge bg-card px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-gold/60 focus:outline-none"
                />
              </div>
            </>
          ) : (
            q && (
              <>
                <h1 className="text-2xl font-semibold text-white">{q.title}</h1>
                <p className="mt-1.5 text-sm text-neutral-400">{q.subtitle}</p>
                <div className="mt-6 space-y-2.5">
                  {q.options.map((opt) => {
                    const selected = q.multi
                      ? ((answers[q.key] as string[]) ?? []).includes(opt.value)
                      : answers[q.key] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => select(opt.value)}
                        className={`w-full text-left rounded-xl border px-5 py-4 transition-colors ${
                          selected
                            ? "border-gold bg-gold/[0.08]"
                            : "border-edge bg-card hover:border-neutral-500"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{opt.label}</span>
                          {selected && <span className="text-gold text-sm">✓</span>}
                        </span>
                        <span className="mt-0.5 block text-xs text-neutral-500">{opt.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`text-sm text-neutral-500 hover:text-white transition-colors ${step === 0 ? "invisible" : ""}`}
            >
              ← Back
            </button>
            {step < totalSteps - 1 ? (
              <button
                type="button"
                disabled={!canContinue()}
                onClick={() => setStep((s) => s + 1)}
                className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black hover:bg-gold-soft disabled:opacity-40 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                disabled={!canContinue()}
                onClick={() => finish()}
                className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black hover:bg-gold-soft disabled:opacity-40 transition-colors"
              >
                Enter the dashboard →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
