'use client';

import { useState, useEffect, useMemo } from 'react';
import { useStockStore } from '@/store/useStockStore';
import { generateMockStocks } from '@/utils/generateStocks';
import { generateCandleData } from '@/utils/generateCandles';
import { StockToolbar } from '@/components/Table/StockToolbar';
import { StockTable } from '@/components/Table/StockTable';
import { StockChart } from '@/components/Charts/StockChart';
import { useWebSocketMock } from '@/hooks/useWebSocketMock';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { stocks, setStocks } = useStockStore();

  useEffect(() => {
    setIsMounted(true);
    const mockData = generateMockStocks(5000);
    setStocks(mockData);
  }, [setStocks]);

  // Activate WebSocket live price simulation
  useWebSocketMock();

  const sampleCandles = useMemo(() => {
    if (!isMounted) return { data: [], symbol: 'AAPL' };
    const basePrice = stocks.length > 0 ? stocks[0].price : 150;
    const symbol = stocks.length > 0 ? stocks[0].symbol : 'AAPL';
    return {
      data: generateCandleData(basePrice, 90),
      symbol,
    };
  }, [isMounted, stocks]);

  if (!isMounted) {
    return (
      <main className="p-8 bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-emerald-400 font-semibold text-lg">Loading Stock Screener...</div>
      </main>
    );
  }

  return (
    <main className="p-8 bg-gray-950 text-white min-h-screen space-y-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Real-Time Stock Screener</h1>
        <p className="text-gray-400 mb-6">
          Zetheta Engineering Internship Project — Loaded <span className="text-emerald-400 font-semibold">{stocks.length}</span> stocks successfully (Live WebSocket Streaming Active)!
        </p>

        {/* Interactive Candlestick Chart */}
        <div className="mb-6">
          <StockChart data={sampleCandles.data} symbol={sampleCandles.symbol} />
        </div>

        {/* Search & Sector Filter Toolbar */}
        <StockToolbar />

        {/* High-Performance Virtualized Table */}
        <StockTable />
      </div>
    </main>
  );
}