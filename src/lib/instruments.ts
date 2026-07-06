export interface Instrument {
  code: string;
  label: string;
  yahoo: string;
  category: "commodities" | "forex" | "crypto" | "indices";
  decimals: number;
  primary?: boolean;
}

// XAUUSD is the primary instrument of BravohAi.
export const INSTRUMENTS: Instrument[] = [
  { code: "XAUUSD", label: "Gold", yahoo: "GC=F", category: "commodities", decimals: 2, primary: true },
  { code: "XAGUSD", label: "Silver", yahoo: "SI=F", category: "commodities", decimals: 3 },
  { code: "USOIL", label: "Crude Oil WTI", yahoo: "CL=F", category: "commodities", decimals: 2 },
  { code: "EURUSD", label: "Euro / US Dollar", yahoo: "EURUSD=X", category: "forex", decimals: 5 },
  { code: "GBPUSD", label: "Pound / US Dollar", yahoo: "GBPUSD=X", category: "forex", decimals: 5 },
  { code: "USDJPY", label: "US Dollar / Yen", yahoo: "USDJPY=X", category: "forex", decimals: 3 },
  { code: "BTCUSD", label: "Bitcoin", yahoo: "BTC-USD", category: "crypto", decimals: 2 },
  { code: "ETHUSD", label: "Ethereum", yahoo: "ETH-USD", category: "crypto", decimals: 2 },
  { code: "US500", label: "S&P 500", yahoo: "^GSPC", category: "indices", decimals: 2 },
  { code: "US100", label: "Nasdaq 100", yahoo: "^NDX", category: "indices", decimals: 2 },
];

export const PRIMARY_INSTRUMENT = INSTRUMENTS[0];

export function findInstrument(code: string): Instrument | undefined {
  return INSTRUMENTS.find((i) => i.code === code);
}
