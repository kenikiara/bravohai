import type { AnalysisResult } from "./types";

// Returned when ANTHROPIC_API_KEY is not configured, so the full product flow
// stays testable. Mirrors a realistic XAUUSD read.
export function demoAnalysis(instrument: string, instrumentLabel: string): AnalysisResult {
  return {
    instrument,
    instrumentLabel,
    detectedTimeframes: ["1H", "15M"],
    currentPrice: "4,540.53",
    trend: {
      direction: "bearish",
      summary:
        "Price is drifting down from the 4,562 swing high into a base near 4,540, with sellers still in control on the hourly but momentum slowing into support.",
    },
    keyFigures: {
      marketStability: {
        score: 7,
        note: "ATR is cooling after the impulsive selloff — conditions are stable enough for limit entries.",
      },
      rsi: {
        value: 42,
        note: "RSI holds below 50 on H1, consistent with a corrective bearish phase, but printing higher lows against price — early divergence.",
      },
      economicContext: {
        label: "Neutral",
        note: "DXY is flat ahead of this week's US data; real yields steady. No macro tailwind either way for gold today.",
      },
      volatility: {
        label: "Moderate",
        note: "Intraday ranges are compressing after the impulse — favors mean-reversion entries over breakout chasing.",
      },
    },
    keyLevels: {
      supports: ["4,534-4,540", "4,526", "4,510"],
      resistances: ["4,556-4,562", "4,568", "4,584"],
    },
    plans: {
      scalper: {
        tradeType: "SELL LIMIT",
        entry: "4,556-4,562",
        stopLoss: "4,568",
        takeProfit: "4,544",
        riskReward: "1:2.0",
        rationale: "Fade the retest of the broken 4,556 shelf while H1 structure stays bearish.",
      },
      dayTrader: {
        tradeType: "BUY LIMIT",
        entry: "4,534-4,540",
        stopLoss: "4,526",
        takeProfit: "4,558",
        riskReward: "1:2.2",
        rationale: "Accumulate at the intraday demand base targeting a rotation back into the mid-range.",
      },
      swingTrader: {
        tradeType: "BUY LIMIT",
        entry: "4,510-4,526",
        stopLoss: "4,492",
        takeProfit: "4,584",
        riskReward: "1:2.8",
        rationale: "Deeper H4 demand aligns with the 0.618 retracement of the last major leg up.",
      },
    },
    explanation:
      "The chart shows price drifting down into a base around 4,540 with multiple small rejections and a clear attempt to stabilize after the earlier selloff leg. With low-to-moderate volatility and a visible consolidation, a day trader can focus on buying the range low and targeting the range top rather than chasing breakouts. The idea is invalidated if price cleanly breaks and holds below the base: use a Buy Limit at 4,534-4,540 with a protective stop under 4,526, aiming for a rotation back toward 4,558 as the most likely intraday liquidity target.",
    technicalAnalysis: {
      multiTimeframeTrends:
        "H4 remains in a corrective decline (lower highs from 4,620), while H1 shows a short-term bearish impulse followed by a late-stage consolidation around 4,540. H1 RSI below 50 keeps the momentum backdrop bearish until price reclaims 4,562, but compression at support often precedes an intraday reversal leg.",
      orderBlocks:
        "The strong impulse down from 4,568 left a bearish order block at 4,556-4,562 (supply) — the natural fade zone. Below, the 4,534-4,540 base sits on a prior bullish order block from the last accumulation, which is why bids keep absorbing there.",
      fairValueGaps:
        "A small fair value gap remains unfilled between 4,548 and 4,552 from the last displacement candle; price is likely to rebalance into it on any bounce, making 4,550 a sensible partial-take level.",
      fibonacci:
        "Measuring the 4,510 → 4,584 swing, the current base at 4,538 sits between the 0.618 (4,538) and 0.5 (4,547) retracements — classic golden-pocket confluence with the demand zone.",
    },
    scenarios: {
      bullish: {
        trigger: "Hold above 4,534 and reclaim 4,548",
        target: "4,558",
        probability: 58,
        description:
          "Buyers defend the golden-pocket base and price rebalances the FVG toward the mid-range liquidity at 4,558.",
      },
      bearish: {
        trigger: "H1 close below 4,526",
        target: "4,510",
        probability: 42,
        description:
          "A clean break of the base opens the run on the 4,510 H4 demand and the liquidity resting under the prior lows.",
      },
    },
    noTrade: { isNoTrade: false, reason: "" },
    confidence: 72,
    demoMode: true,
  };
}
