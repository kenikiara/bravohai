import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Accordion } from "@/components/Accordion";
import { GoldTicker } from "@/components/landing/GoldTicker";

const FEATURES = [
  {
    title: "The AI that analyzes like a pro trader, in seconds",
    body: "No more hours wasted on TradingView without knowing whether to buy or sell. Support/resistance, order blocks, Fibonacci, RSI, macro context, probable scenarios — in seconds you have everything, without spending years training.",
    icon: "⚡",
  },
  {
    title: "Built around Gold — XAUUSD is our home turf",
    body: "BravohAi is tuned for the metal that moves: DXY correlation, real yields, session liquidity and news sensitivity are baked into every XAUUSD read. Forex, crypto and indices work great too.",
    icon: "🥇",
  },
  {
    title: "Your AI agent adapts to you over time",
    body: "After 10 analyses, BravohAi understands if you're a scalper, day trader or swing trader and adjusts its trade plans accordingly. It's like having a coach who knows you inside out.",
    icon: "🧠",
  },
  {
    title: "Trade (finally) with confidence",
    body: "BravohAi gives you clear scenarios with probabilities: “If price breaks 4,548, bullish scenario toward 4,558 (58% probability)”. No more “maybe”. You have a plan A and a plan B — and when there's no edge, it tells you not to trade.",
    icon: "🎯",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Create your account (2 minutes)",
    body: "Sign up and answer 5 questions about your trading style. The AI calibrates your profile to adapt to you from the very first analysis.",
  },
  {
    n: "2",
    title: "Analyze your first chart",
    body: "Upload a screenshot of any chart — XAUUSD is one click away. Seconds later: trend, key zones, and 2 scenarios (bullish/bearish) with probabilities.",
  },
  {
    n: "3",
    title: "Trade with confidence",
    body: "Follow BravohAi's plan for your profile: entry, stop-loss, take-profit. Every analysis is saved — you see your win rate evolve and correct your mistakes.",
  },
];

const PLAN_FEATURES = [
  "AI trade plans on every chart you upload",
  "XAUUSD-tuned macro & economic context",
  "Scalper / day trader / swing trader plans",
  "Full history of your analyses + win rate",
  "Live economic calendar (high-impact USD events)",
  "All BravohAi updates included",
];

const TESTIMONIALS = [
  { quote: "First day trading gold with BravohAi, super happy — profitable in less than one afternoon.", name: "BravohAi Member", role: "Gold trader" },
  { quote: "Great tool when you don't want to fight with charts — it does almost everything for you. I recommend it.", name: "Marc D.", role: "Member" },
  { quote: "Took my best XAUUSD trade today. The analysis was perfect, no drawdown. So happy.", name: "BravohAi Member", role: "Trader" },
  { quote: "Started 3 days ago and I'm already profitable. The explanations teach me the logic behind every position.", name: "Maxime L.", role: "Member" },
  { quote: "The macro data is always up to date and the entry zones are honestly really good.", name: "Hugo N.", role: "Member" },
  { quote: "As a beginner I was skeptical — the detailed plans with precise levels changed everything for me.", name: "Kenza S.", role: "Member" },
  { quote: "Best AI trading tool I've tried, and I've tried a few. Nothing reads gold like this.", name: "Bella H.", role: "Member" },
  { quote: "10k funded thanks to a plan from this AI. It's insane.", name: "Jake T.", role: "Prop trader" },
];

const FAQ = [
  {
    q: "What exactly is BravohAi?",
    a: "BravohAi is an AI specialized in trading chart analysis, with Gold (XAUUSD) as its primary market. You upload your chart, and in seconds you receive a complete analysis: key levels, probable scenarios with probabilities, and a clear action plan for your trading style.",
  },
  {
    q: "Does it really work?",
    a: "BravohAi analyzes the same elements a professional does: market structure, support/resistance, order blocks, fair value gaps, Fibonacci, RSI and macro context. When there is no edge, it says so instead of forcing a trade — that discipline is where most of the value comes from.",
  },
  {
    q: "Why XAUUSD first?",
    a: "Gold is the most traded chart among our users and one of the most technical instruments in the world. BravohAi's macro layer (DXY, real yields, high-impact USD news) is tuned for it — although forex, crypto and indices are fully supported.",
  },
  {
    q: "I'm a beginner, is it right for me?",
    a: "Absolutely. BravohAi is made for all levels. The AI explains its analyses clearly and gives you concrete action plans — entry, stop, target — plus the reasoning behind each one so you actually learn while you trade.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes, you can cancel your subscription whenever you want from your member area. No commitment, no questions asked.",
  },
  {
    q: "What assets does it work with?",
    a: "All of them: gold and commodities, forex, crypto, indices, stocks. You can analyze any chart screenshot from any platform (TradingView, MT4/MT5, Binance, etc.).",
  },
];

function CTA({ children = "Get started now", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <Link
      href="/onboarding"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3.5 font-semibold text-black transition-colors hover:bg-gold-soft gold-glow ${className}`}
    >
      {children} <span aria-hidden>→</span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-ink text-neutral-200">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-edge/60 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm text-neutral-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <Link
            href="/dashboard"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black hover:bg-gold-soft transition-colors"
          >
            Get started now
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 pt-20 pb-16 text-center">
          <GoldTicker />
          <h1 className="mt-7 text-4xl md:text-6xl font-bold tracking-tight text-white">
            Get pro-level <span className="text-gold">Gold</span> analysis
            <br className="hidden md:block" /> instantly with AI.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-400">
            BravohAi analyzes any chart in seconds and tells you exactly what to do — entry, stop, target. Just with a photo. XAUUSD first, everything else too.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <CTA className="text-base" />
            <span className="text-xs text-neutral-500">Sign up in 2 min. No commitment.</span>
          </div>

          {/* mock analysis strip */}
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-edge bg-panel/90 p-5 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-edge pb-3">
              <div className="flex items-center gap-2.5">
                <span className="size-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold text-xs font-bold">G</span>
                <div>
                  <div className="text-sm font-semibold text-white">Gold · XAUUSD</div>
                  <div className="text-[11px] text-neutral-500">1H + 15M · analyzed in 6.4s</div>
                </div>
              </div>
              <span className="rounded-full border border-bull/40 bg-bull/10 px-2.5 py-1 text-[11px] font-semibold text-bull">
                BUY LIMIT
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                ["Trade price", "4,534–4,540"],
                ["Stop-Loss", "4,526"],
                ["Take Profit", "4,558"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-edge bg-card p-3">
                  <div className="text-base font-bold text-white">{v}</div>
                  <div className="text-[11px] text-neutral-500">{k}</div>
                </div>
              ))}
            </div>
            <div className="mt-3.5 flex items-center gap-2 text-[11px] text-neutral-500">
              <span className="rounded bg-white/5 px-2 py-0.5">Bullish 58%</span>
              <span className="rounded bg-white/5 px-2 py-0.5">Bearish 42%</span>
              <span className="ml-auto">Golden-pocket confluence at 4,538</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">With expert-level precision</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            Built by profitable traders,
            <br className="hidden md:block" /> tuned for the gold market.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-edge bg-card p-7 hover:border-gold/40 transition-colors">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-edge/60 bg-panel/50">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">3 simple steps</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">How to get started with BravohAi</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">
              You&apos;re just a few steps away from having your best trading copilot.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-edge bg-card p-7">
                <div className="size-9 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-bold">
                  {s.n}
                </div>
                <h3 className="mt-4 font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTA />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Pricing</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Choose your plan</h2>
          <p className="mt-3 text-sm text-neutral-400">Most of our users recover their investment on their first winning trade.</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 md:grid-cols-2 gap-4">
          {/* Monthly */}
          <div className="rounded-2xl border border-edge bg-card p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Monthly</h3>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-neutral-300">popular</span>
            </div>
            <p className="mt-1.5 text-xs text-neutral-500">Instant access to the gold-first trading AI.</p>
            <div className="mt-5 flex items-end gap-1.5">
              <span className="text-4xl font-bold text-white">$40</span>
              <span className="pb-1 text-sm text-neutral-500">/month</span>
            </div>
            <CTA className="mt-6 w-full text-sm !py-3" />
            <ul className="mt-6 space-y-2.5 text-sm text-neutral-300">
              {PLAN_FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="text-gold">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Lifetime */}
          <div className="relative rounded-2xl border border-gold/60 bg-card p-7 gold-glow">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Lifetime</h3>
              <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase text-black">best value</span>
            </div>
            <p className="mt-1.5 text-xs text-neutral-500">One payment. Every update, forever.</p>
            <div className="mt-5 flex items-end gap-1.5">
              <span className="text-4xl font-bold text-white">$180</span>
              <span className="pb-1 text-sm text-neutral-500">one-time payment</span>
            </div>
            <CTA className="mt-6 w-full text-sm !py-3" />
            <ul className="mt-6 space-y-2.5 text-sm text-neutral-300">
              {PLAN_FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="text-gold">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-y border-edge/60 bg-panel/50 py-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Testimonials</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">What BravohAi traders are saying</h2>
        </div>
        <div className="mt-12">
          <div className="flex w-max animate-marquee gap-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <figure key={i} className="w-80 shrink-0 rounded-2xl border border-edge bg-card p-5 text-left">
                <div className="text-gold text-xs tracking-widest">★★★★★</div>
                <blockquote className="mt-3 text-sm leading-relaxed text-neutral-300">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-xs text-neutral-500">
                  <span className="text-neutral-300 font-medium">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          You&apos;ve made it this far — what are you waiting for?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-neutral-400">
          There&apos;s no better time to start. Upload your first XAUUSD chart and get a professional trade plan in seconds.
        </p>
        <div className="mt-8">
          <CTA className="text-base" />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 pb-20">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">FAQ</div>
          <h2 className="mt-3 text-3xl font-bold text-white">Frequently asked questions</h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQ.map((f) => (
            <Accordion key={f.q} title={f.q}>
              <p>{f.a}</p>
            </Accordion>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-edge/60 bg-panel/60">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm text-neutral-500">
                The gold-first trading AI that helps you gain an edge in the markets.
              </p>
            </div>
            <div className="flex gap-14 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-3">Product</div>
                <ul className="space-y-2 text-neutral-400">
                  <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-3">App</div>
                <ul className="space-y-2 text-neutral-400">
                  <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link href="/onboarding" className="hover:text-white transition-colors">Create account</Link></li>
                  <li><Link href="/dashboard/stats" className="hover:text-white transition-colors">Performance</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-edge/60 pt-6 text-[11px] leading-relaxed text-neutral-600">
            <p>
              BravohAi is an AI-powered chart analysis tool for educational purposes only. Nothing on this site
              constitutes financial advice, investment advice, or a solicitation to buy or sell any financial
              instrument. Not Financial Advice (NFA). Do Your Own Research (DYOR). Trading involves significant risk of
              loss. Past performance is not indicative of future results. Results are not typical and may vary.
            </p>
            <p className="mt-3">© {new Date().getFullYear()} BravohAi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
