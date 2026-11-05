'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useStockStore } from '@/store/useStockStore';
import { generateMockStocks } from '@/utils/generateStocks';
import { generateCandleData, Candle } from '@/utils/generateCandles';
import { StockToolbar } from '@/components/Table/StockToolbar';
import { useWebSocketMock } from '@/hooks/useWebSocketMock';

// Dynamically import client-only components with SSR disabled to prevent prerender errors
const StockTable = dynamic(
  () => import('@/components/Table/StockTable').then((mod) => mod.StockTable),
  { ssr: false, loading: () => <div className="h-[600px] bg-gray-900 border border-gray-800 rounded-lg animate-pulse" /> }
);

const StockChart = dynamic(
  () => import('@/components/Charts/StockChart').then((mod) => mod.StockChart),
  { ssr: false, loading: () => <div className="h-[400px] bg-gray-900 border border-gray-800 rounded-lg animate-pulse" /> }
);

export default function Home() {
  const { stocks, setStocks } = useStockStore();
  const [candles, setCandles] = useState<Candle[]>([]);
  const [chartSymbol, setChartSymbol] = useState<string>('AAPL');

  useEffect(() => {
    const mockData = generateMockStocks(5000);
    setStocks(mockData);
  }, [setStocks]);

  // Activate WebSocket live price simulation
  useWebSocketMock();

  useEffect(() => {
    if (stocks.length > 0) {
      const basePrice = stocks[0].price;
      const symbol = stocks[0].symbol;
      const candleData = generateCandleData(basePrice, 90);
      setCandles(candleData);
      setChartSymbol(symbol);
    }
  }, [stocks]);

  return (
    <main className="p-8 bg-[#090D16] text-slate-100 min-h-screen space-y-6 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Real-Time Stock Screener</h1>
            <p className="text-slate-400">
              Zetheta Engineering Internship Project — Loaded <span className="text-emerald-400 font-semibold">{stocks.length}</span> stocks successfully.
            </p>
          </div>
          
          {/* PASTE IT HERE */}
          <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">WebSocket Feed Active</span>
          </div>
        </div>

        {/* Interactive Candlestick Chart */}
        <div className="mb-6">
          <StockChart data={candles} symbol={chartSymbol} />
        </div>

        {/* Search & Sector Filter Toolbar */}
        <StockToolbar />

        {/* High-Performance Virtualized Table */}
        <StockTable />
      </div>
    </main>
  );
}
