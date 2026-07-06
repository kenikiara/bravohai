export type TraderProfile = "scalper" | "dayTrader" | "swingTrader";

export type TradeType =
  | "BUY LIMIT"
  | "SELL LIMIT"
  | "BUY STOP"
  | "SELL STOP"
  | "MARKET BUY"
  | "MARKET SELL"
  | "NO TRADE";

export interface TradePlan {
  tradeType: TradeType;
  entry: string;
  stopLoss: string;
  takeProfit: string;
  riskReward: string;
  rationale: string;
}

export interface Scenario {
  trigger: string;
  target: string;
  probability: number;
  description: string;
}

export interface AnalysisResult {
  instrument: string;
  instrumentLabel: string;
  detectedTimeframes: string[];
  currentPrice: string;
  trend: {
    direction: "bullish" | "bearish" | "neutral";
    summary: string;
  };
  keyFigures: {
    marketStability: { score: number; note: string };
    rsi: { value: number; note: string };
    economicContext: { label: string; note: string };
    volatility: { label: string; note: string };
  };
  keyLevels: {
    supports: string[];
    resistances: string[];
  };
  plans: {
    scalper: TradePlan;
    dayTrader: TradePlan;
    swingTrader: TradePlan;
  };
  explanation: string;
  technicalAnalysis: {
    multiTimeframeTrends: string;
    orderBlocks: string;
    fairValueGaps: string;
    fibonacci: string;
  };
  scenarios: {
    bullish: Scenario;
    bearish: Scenario;
  };
  noTrade: {
    isNoTrade: boolean;
    reason: string;
  };
  confidence: number;
  demoMode?: boolean;
}

export type TradeOutcome = "pending" | "win" | "loss" | "skipped";

export interface HistoryEntry {
  id: string;
  createdAt: number;
  instrument: string;
  instrumentLabel: string;
  profileUsed: TraderProfile;
  outcome: TradeOutcome;
  result: AnalysisResult;
  thumbnail?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  style: TraderProfile;
  experience: "beginner" | "intermediate" | "advanced";
  risk: "conservative" | "moderate" | "aggressive";
  markets: string[];
  goal: string;
  onboardedAt: number;
}

export interface EconomicEvent {
  title: string;
  country: string;
  date: string;
  impact: string;
  forecast?: string;
  previous?: string;
}

export interface PriceQuote {
  symbol: string;
  price: number;
  changePct: number;
  spark: number[];
  currency: string;
}
