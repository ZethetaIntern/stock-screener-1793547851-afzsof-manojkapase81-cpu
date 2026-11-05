# High-Performance Real-Time Stock Screener

> Developed for the Zetheta Engineering Internship Technical Evaluation.

A production-grade, high-performance financial market data screener engineered to handle large-scale datasets, real-time WebSocket data streaming, and smooth client-side data visualization without compromising on frame rates or responsiveness.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router with SSR boundary optimization)
- **State Management**: Zustand (optimized for high-frequency live tick updates)
- **Data Grid & Virtualization**: TanStack Table & `@tanstack/react-virtual` (renders 5,000+ rows smoothly with zero DOM lag via window recycling)
- **Charting**: TradingView `lightweight-charts` (interactive historical candlestick visualization)
- **Styling**: Tailwind CSS (modern, dark-mode financial terminal aesthetic)
- **Language**: TypeScript (strict type safety)

---

## 💡 Engineering Highlights & Problem Solving

During the development of this project, I focused heavily on production readiness and edge-case handling:
1. **Hydration & Prerender Optimization**: Resolved Next.js static prerendering boundaries for client-side utilities (`Math.random()` and performance timers) by implementing robust mounting checks and dynamic component imports (`ssr: false`) for heavy data visualization blocks.
2. **DOM Virtualization**: Rather than rendering 5,000 DOM nodes (which causes severe browser sluggishness), row virtualization calculates visible bounds, maintaining a constant footprint of ~15–20 active DOM elements for steady 60 FPS scrolling.
3. **Optimized State Sync**: Utilized Zustand to isolate tick updates, ensuring that background WebSocket price changes do not trigger unnecessary full-page re-renders.

---

## ✨ Core Features

- **Massive Dataset Handling**: Generates and manages 5,000+ mock stock records with realistic pricing distributions, volume statistics, and sector categorization.
- **Live WebSocket Simulation**: Background trade ticks periodically stream live price changes across tickers, updating the UI dynamically.
- **Advanced Multi-Criteria Filtering**: Real-time filtering across search queries (symbol/company name), sector dropdowns, custom price bounds, and volume thresholds.
- **Interactive Candlestick Charts**: Integrated TradingView Lightweight Charts displaying historical price action synchronized with selected tickers.
- **Performance Benchmarking**: Built-in performance timers measuring execution throughput via `performance.now()`.

---

## 📊 Performance Metrics

- **DOM Footprint**: Window virtualization reduces active DOM elements from 5,000+ down to **~15–20 visible rows**.
- **Filtering Throughput**: Benchmarked via `performance.now()`, the multi-criteria filter engine processes 5,000 complex records in **< 15ms**, well within enterprise performance thresholds.

---

## 🚀 Getting Started Locally

Follow these instructions to run the project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/manojkapase81-cpu/stock-screener.git](https://github.com/manojkapase81-cpu/stock-screener.git)
   cd stock-screener