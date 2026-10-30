export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  marketCap: number;
  sector: string;
}