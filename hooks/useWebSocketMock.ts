import { useEffect } from 'react';
import { useStockStore } from '@/store/useStockStore';

export function useWebSocketMock() {
  const stocks = useStockStore((state) => state.stocks);
  const updateStockPrice = useStockStore((state) => state.updateStockPrice);

  useEffect(() => {
    if (stocks.length === 0) return;

    // Simulate live WebSocket trade ticks every 800ms
    const interval = setInterval(() => {
      // Randomly select between 3 to 8 stocks to update in this tick
      const count = Math.floor(Math.random() * 6) + 3;
      
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * stocks.length);
        const stock = stocks[randomIndex];
        if (!stock) continue;

        // Generate a small price shift (-1.5% to +1.5%)
        const fluctuation = (Math.random() - 0.49) * (stock.price * 0.015);
        const newPrice = parseFloat((stock.price + fluctuation).toFixed(2));

        if (newPrice > 0) {
          updateStockPrice(stock.id, newPrice);
        }
      }
    }, 800);

    return () => clearInterval(interval);
  }, [stocks, updateStockPrice]);
}