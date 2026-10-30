'use client';

import React from 'react';
import { useStockStore } from '@/store/useStockStore';

const SECTORS = ['All', 'Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer Goods'];

export function StockToolbar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedSector,
    setSelectedSector,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minVolume,
    setMinVolume,
  } = useStockStore();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6 shadow-xl space-y-4">
      {/* Top Row: Search & Sectors */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search symbol or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-950 border border-gray-800 text-white px-4 py-2 rounded-lg w-full md:w-72 focus:outline-none focus:border-emerald-500 text-sm"
        />

        <div className="flex flex-wrap gap-2">
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedSector === sector
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Row: Advanced Multi-Criteria Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Min Price ($):</span>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="bg-gray-950 border border-gray-800 text-white px-2 py-1 rounded w-full focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Max Price ($):</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="bg-gray-950 border border-gray-800 text-white px-2 py-1 rounded w-full focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Min Volume:</span>
          <input
            type="number"
            value={minVolume}
            onChange={(e) => setMinVolume(Number(e.target.value))}
            className="bg-gray-950 border border-gray-800 text-white px-2 py-1 rounded w-full focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}