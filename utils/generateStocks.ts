import { Stock } from '@/types/stock';

const SECTORS = ['Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer Goods'];
const COMPANIES = ['Alpha', 'Beta', 'Global', 'Prime', 'NextGen', 'Apex', 'Zenith', 'Vanguard', 'Quantum', 'Vertex'];

export function generateMockStocks(count: number = 5000): Stock[] {
  const stocks: Stock[] = [];
  
  for (let i = 1; i <= count; i++) {
    const symbol = `STK${i}`;
    const name = `${COMPANIES[i % COMPANIES.length]} Corp ${i}`;
    const price = parseFloat((Math.random() * 500 + 10).toFixed(2));
    const change = parseFloat((Math.random() * 20 - 10).toFixed(2));
    const percentChange = parseFloat(((change / price) * 100).toFixed(2));
    const volume = Math.floor(Math.random() * 1000000 + 50000);
    const marketCap = volume * price * 10;
    const sector = SECTORS[i % SECTORS.length];

    stocks.push({
      id: `stock-${i}`,
      symbol,
      name,
      price,
      change,
      percentChange,
      volume,
      marketCap,
      sector,
    });
  }

  return stocks;
}