# BravohAi

AI trading copilot for chart analysis — **XAUUSD (Gold) first**, forex, crypto and indices supported. Upload a chart screenshot and get a professional trade plan in seconds: trend, key levels, bullish/bearish scenarios with probabilities, and entry / stop-loss / take-profit adapted to your trading profile.

## Features

- **AI chart analysis** — Claude vision reads your chart screenshot(s): market structure, support/resistance, order blocks, fair value gaps, Fibonacci, RSI, macro context.
- **Adapted trading plans** — separate plans for scalpers, day traders and swing traders; your onboarding profile picks the default tab.
- **Probable scenarios** — bullish and bearish scenarios with probabilities that sum to 100.
- **No-trade discipline** — when the setup is weak, the AI refuses to manufacture a trade and says why.
- **Live XAUUSD price** — real-time gold quote + sparkline (Yahoo Finance).
- **Economic calendar** — high-impact USD events from the public Forex Factory feed.
- **History & win rate** — every analysis is saved locally; mark wins/losses and watch your stats evolve. After 10 analyses the AI calibrates to your profile.
- **Onboarding quiz** — 5 questions calibrate the AI to your style from the first analysis.

## Getting started

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

Without an `ANTHROPIC_API_KEY`, the app runs in **demo mode**: analyses return a realistic sample so the entire flow (upload → analysis → history → stats) stays testable. Add a key to `.env.local` for live AI analysis.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Anthropic Claude (vision) for chart analysis — model configurable via `ANTHROPIC_MODEL`
- Yahoo Finance (quotes) and Forex Factory calendar feed (no keys required)
- LocalStorage persistence (no database needed)

## Disclaimer

BravohAi is an AI-powered chart analysis tool for educational purposes only. Nothing in this app constitutes financial advice. Trading involves significant risk of loss.
