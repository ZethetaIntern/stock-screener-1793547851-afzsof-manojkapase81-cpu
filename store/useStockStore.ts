import { create } from 'zustand';
import { Stock } from '@/types/stock';

interface StockState {
  stocks: Stock[];
  searchQuery: string;
  selectedSector: string;
  minPrice: number;
  maxPrice: number;
  minVolume: number;
  setStocks: (stocks: Stock[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedSector: (sector: string) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setMinVolume: (volume: number) => void;
  updateStockPrice: (id: string, newPrice: number) => void;
}

export const useStockStore = create<StockState>((set) => ({
  stocks: [],
  searchQuery: '',
  selectedSector: 'All',
  minPrice: 0,
  maxPrice: 10000,
  minVolume: 0,
  setStocks: (stocks) => set({ stocks }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedSector: (selectedSector) => set({ selectedSector }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setMinVolume: (minVolume) => set({ minVolume }),
  updateStockPrice: (id, newPrice) =>
    set((state) => ({
      stocks: state.stocks.map((stock) => {
        if (stock.id === id) {
          const change = parseFloat((newPrice - stock.price).toFixed(2));
          const percentChange = parseFloat(((change / stock.price) * 100).toFixed(2));
          return { ...stock, price: newPrice, change, percentChange };
        }
        return stock;
      }),
    })),
}));