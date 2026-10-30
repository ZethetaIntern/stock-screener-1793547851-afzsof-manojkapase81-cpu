export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function generateCandleData(basePrice: number, days: number = 90): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = basePrice;
  const baseTime = new Date('2026-01-01').getTime();

  for (let i = 0; i < days; i++) {
    const date = new Date(baseTime + i * 24 * 60 * 60 * 1000);
    const timeStr = date.toISOString().split('T')[0];

    const volatility = currentPrice * 0.02;
    const change = (Math.random() - 0.48) * volatility;
    const open = currentPrice;
    const close = parseFloat((open + change).toFixed(2));
    const high = parseFloat((Math.max(open, close) + Math.random() * (volatility * 0.5)).toFixed(2));
    const low = parseFloat((Math.min(open, close) - Math.random() * (volatility * 0.5)).toFixed(2));

    candles.push({ time: timeStr, open, high, low, close });
    currentPrice = close;
  }

  return candles;
}