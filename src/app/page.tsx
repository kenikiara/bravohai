import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Accordion } from "@/components/Accordion";
import { GoldTicker } from "@/components/landing/GoldTicker";

const FEATURES = [
  {
    n: "01",
    title: "Analysis like a pro trader, in seconds",
    body: "No more hours on TradingView without knowing whether to buy or sell. Market structure, support and resistance, order blocks, Fibonacci, RSI, macro context and probable scenarios: everything a professional reads on a chart, delivered in seconds.",
  },
  {
    n: "02",
    title: "Gold is our home turf",
    body: "BravohAi is tuned for XAUUSD: DXY correlation, real yields, session liquidity and news sensitivity are baked into every read. Forex, crypto and indices are fully supported too.",
  },
  {
    n: "03",
    title: "It adapts to you over time",
    body: "After 10 analyses, BravohAi knows whether you scalp, day trade or swing, and weighs its trade plans toward your style. Like a coach who knows you inside out.",
  },
  {
    n: "04",
    title: "A plan A, a plan B, and the discipline to say no",
    body: "Clear scenarios with probabilities: \"if price breaks 4,548, bullish toward 4,558 (58%)\". And when a setup is weak, BravohAi refuses to manufacture a trade. That honesty is the edge.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Create your account",
    body: "Two minutes, five questions about your trading style. The AI calibrates to you from the very first analysis.",
  },
  {
    n: "2",
    title: "Analyze your first chart",
    body: "Upload a screenshot of any chart. Seconds later: trend, key zones, and two scenarios with probabilities.",
  },
  {
    n: "3",
    title: "Trade with confidence",
    body: "Follow the plan for your profile: entry, stop, target. Every analysis is saved so your win rate is always honest.",
  },
];

const PLAN_FEATURES = [
  "AI trade plans on every chart you upload",
  "XAUUSD-tuned macro and economic context",
  "Scalper, day trader and swing trader plans",
  "Full history of your analyses with win rate",
  "Live economic calendar (high-impact USD events)",
  "All BravohAi updates included",
];

const TESTIMONIALS = [
  { quote: "First day trading gold with BravohAi, super happy. Profitable in less than one afternoon.", name: "BravohAi Member", role: "Gold trader" },
  { quote: "Great tool when you don't want to fight with charts. It does almost everything for you.", name: "Marc D.", role: "Member" },
  { quote: "Took my best XAUUSD trade today. The analysis was perfect, no drawdown.", name: "BravohAi Member", role: "Trader" },
  { quote: "Started 3 days ago and I'm already profitable. The explanations teach me the logic behind every position.", name: "Maxime L.", role: "Member" },
  { quote: "The macro data is always up to date and the entry zones are honestly really good.", name: "Hugo N.", role: "Member" },
  { quote: "As a beginner I was skeptical. The detailed plans with precise levels changed everything for me.", name: "Kenza S.", role: "Member" },
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
    a: "BravohAi analyzes the same elements a professional does: market structure, support and resistance, order blocks, fair value gaps, Fibonacci, RSI and macro context. When there is no edge, it says so instead of forcing a trade. That discipline is where most of the value comes from.",
  },
  {
    q: "Why XAUUSD first?",
    a: "Gold is the most traded chart among our users and one of the most technical instruments in the world. BravohAi's macro layer (DXY, real yields, high-impact USD news) is tuned for it, although forex, crypto and indices are fully supported.",
  },
  {
    q: "I'm a beginner, is it right for me?",
    a: "Absolutely. BravohAi is made for all levels. The AI explains its analyses clearly and gives you concrete action plans: entry, stop, target, plus the reasoning behind each one so you actually learn while you trade.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes, you can cancel your subscription whenever you want from your member area. No commitment, no questions asked.",
  },
  {
    q: "What assets does it work with?",
    a: "All of them: gold and commodities, forex, crypto, indices, stocks. You can analyze any chart screenshot from any platform (TradingView, MT4/MT5, Binance, and others).",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-bg text-ink">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-edge bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted">
            <a href="#how-it-works" className="hover:text-ink transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-ink transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-ink transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-ink transition-colors">FAQ</a>
          </nav>
          <Link
            href="/dashboard"
            className="rounded-lg bg-royal px-4 py-2 text-sm font-semibold text-white hover:bg-royal-deep transition-colors"
          >
            Open the app
          </Link>
        </div>
      </header>

      {/* Hero: drenched royal blue */}
      <section className="relative overflow-hidden bg-royal-deep text-white">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 pt-16 md:pt-24 pb-40 text-center">
          <div className="rise-in">
            <GoldTicker onDark />
          </div>
          <h1 className="font-display rise-in rise-in-1 mt-8 text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] font-bold tracking-tight">
            Pro-level <span className="text-flame">gold</span> analysis,
            <br className="hidden md:block" /> from a single screenshot.
          </h1>
          <p className="rise-in rise-in-2 mx-auto mt-6 max-w-xl text-lg text-white/75">
            BravohAi reads your chart the way a professional does and hands you a plan: entry, stop, target, probabilities. XAUUSD first, everything else too.
          </p>
          <div className="rise-in rise-in-3 mt-9 flex flex-col items-center gap-3">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 rounded-xl bg-flame px-8 py-4 text-base font-bold text-royal-deep hover:bg-flame-deep hover:text-white transition-colors"
            >
              Get started now <span aria-hidden>→</span>
            </Link>
            <span className="text-xs text-white/55">Sign up in 2 minutes. No commitment.</span>
          </div>
        </div>
      </section>

      {/* Product proof panel, overlapping the hero */}
      <div className="relative mx-auto max-w-2xl px-5 -mt-28">
        <div className="rounded-2xl border border-edge bg-surface p-5 shadow-[0_24px_60px_-24px_oklch(0.36_0.11_265/0.35)]">
          <div className="flex items-center justify-between border-b border-edge pb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="size-9 rounded-full bg-flame-tint border border-flame/50 flex items-center justify-center text-flame-deep text-xs font-bold">
                Au
              </span>
              <div>
                <div className="text-sm font-bold text-ink">Gold · XAUUSD</div>
                <div className="text-[11px] text-faint">1H + 15M · analyzed in 6.4s</div>
              </div>
            </div>
            <span className="rounded-full border border-bull/40 bg-bull/10 px-3 py-1 text-[11px] font-bold text-bull">
              BUY LIMIT
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              ["Trade price", "4,534 to 4,540"],
              ["Stop-Loss", "4,526"],
              ["Take Profit", "4,558"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-well px-3 py-3">
                <div className="text-sm md:text-base font-bold text-ink">{v}</div>
                <div className="mt-0.5 text-[11px] text-faint">{k}</div>
              </div>
            ))}
          </div>
          <div className="mt-3.5 flex items-center gap-2 text-[11px] text-muted">
            <span className="rounded bg-royal-tint px-2 py-0.5 font-semibold text-royal">Bullish 58%</span>
            <span className="rounded bg-well px-2 py-0.5">Bearish 42%</span>
            <span className="ml-auto hidden sm:block text-faint">Golden-pocket confluence at 4,538</span>
          </div>
        </div>
      </div>

      {/* Features: numbered editorial rows */}
      <section className="mx-auto max-w-5xl px-5 pt-24 pb-8">
        <h2 className="font-display max-w-2xl text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight">
          Built by profitable traders, tuned for the gold market.
        </h2>
        <div className="mt-14 space-y-14">
          {FEATURES.map((f, i) => (
            <div
              key={f.n}
              className={`flex flex-col md:flex-row gap-5 md:gap-12 md:items-baseline ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="font-display shrink-0 text-5xl font-bold text-royal/20 md:w-40 md:text-right">
                {f.n}
              </div>
              <div className={i % 2 === 1 ? "md:mr-auto md:max-w-lg" : "md:max-w-lg"}>
                <h3 className="font-display text-xl font-bold text-ink">{f.title}</h3>
                <p className="mt-2.5 leading-relaxed text-muted">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-16 border-y border-edge bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="md:flex md:items-end md:justify-between">
            <h2 className="font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold tracking-tight">
              Three steps to your best trading copilot
            </h2>
            <Link
              href="/onboarding"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-lg bg-royal px-5 py-2.5 text-sm font-semibold text-white hover:bg-royal-deep transition-colors"
            >
              Get started now →
            </Link>
          </div>
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {STEPS.map((s) => (
              <li key={s.n} className="border-t-2 border-royal pt-5">
                <div className="text-xs font-bold text-royal">STEP {s.n}</div>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-5xl px-5 py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold tracking-tight">Choose your plan</h2>
          <p className="mt-3 text-muted">Most users recover their investment on their first winning trade.</p>
        </div>
        <div className="mt-10 grid max-w-3xl grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-edge bg-surface p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-ink">Monthly</h3>
              <span className="rounded-full bg-well px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">popular</span>
            </div>
            <div className="mt-5 flex items-end gap-1.5">
              <span className="font-display text-4xl font-bold text-ink">$40</span>
              <span className="pb-1 text-sm text-faint">/month</span>
            </div>
            <Link
              href="/onboarding"
              className="mt-6 flex items-center justify-center rounded-lg border border-royal px-5 py-3 text-sm font-semibold text-royal hover:bg-royal-tint transition-colors"
            >
              Get started now
            </Link>
            <ul className="mt-6 space-y-2.5 text-sm text-muted">
              {PLAN_FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="text-bull font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-royal bg-surface p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-ink">Lifetime</h3>
              <span className="rounded-full bg-flame px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">best value</span>
            </div>
            <div className="mt-5 flex items-end gap-1.5">
              <span className="font-display text-4xl font-bold text-ink">$180</span>
              <span className="pb-1 text-sm text-faint">one-time payment</span>
            </div>
            <Link
              href="/onboarding"
              className="mt-6 flex items-center justify-center rounded-lg bg-royal px-5 py-3 text-sm font-semibold text-white hover:bg-royal-deep transition-colors"
            >
              Get started now
            </Link>
            <ul className="mt-6 space-y-2.5 text-sm text-muted">
              {PLAN_FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="text-bull font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-y border-edge bg-surface py-20 overflow-hidden">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold tracking-tight">
            What BravohAi traders are saying
          </h2>
        </div>
        <div className="mt-12">
          <div className="flex w-max animate-marquee gap-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <figure key={i} className="w-80 shrink-0 rounded-2xl border border-edge bg-bg p-5">
                <div className="text-flame text-xs tracking-widest" aria-label="5 star rating">★★★★★</div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-xs text-faint">
                  <span className="font-semibold text-muted">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA: royal band */}
      <section className="bg-royal-deep text-white">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight">
            Your next chart could come with a plan.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            Upload your first XAUUSD chart and get a professional trade plan in seconds.
          </p>
          <Link
            href="/onboarding"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-flame px-8 py-4 text-base font-bold text-royal-deep hover:bg-flame-deep hover:text-white transition-colors"
          >
            Get started now <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="font-display text-center text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((f) => (
            <Accordion key={f.q} title={f.q}>
              <p>{f.a}</p>
            </Accordion>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-edge bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-3 text-sm text-muted">
                The gold-first trading AI that helps you gain an edge in the markets.
              </p>
            </div>
            <div className="flex gap-14 text-sm">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-faint mb-3">Product</div>
                <ul className="space-y-2 text-muted">
                  <li><a href="#how-it-works" className="hover:text-ink transition-colors">How it works</a></li>
                  <li><a href="#pricing" className="hover:text-ink transition-colors">Pricing</a></li>
                  <li><a href="#testimonials" className="hover:text-ink transition-colors">Testimonials</a></li>
                  <li><a href="#faq" className="hover:text-ink transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-faint mb-3">App</div>
                <ul className="space-y-2 text-muted">
                  <li><Link href="/dashboard" className="hover:text-ink transition-colors">Dashboard</Link></li>
                  <li><Link href="/onboarding" className="hover:text-ink transition-colors">Create account</Link></li>
                  <li><Link href="/dashboard/stats" className="hover:text-ink transition-colors">Performance</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-edge pt-6 text-[11px] leading-relaxed text-faint">
            <p>
              BravohAi is an AI-powered chart analysis tool for educational purposes only. Nothing on this site
              constitutes financial advice, investment advice, or a solicitation to buy or sell any financial
              instrument. Not Financial Advice (NFA). Do Your Own Research (DYOR). Trading involves significant risk of
              loss. Past performance is not indicative of future results. Results are not typical and may vary.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <p>© {new Date().getFullYear()} BravohAi. All rights reserved.</p>
              <p>
                Made by{" "}
                <a
                  href="https://kendesigners.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-royal hover:text-royal-deep transition-colors"
                >
                  kendesigners.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
