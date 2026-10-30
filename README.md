# High-Performance Real-Time Stock Screener

> Developed for the Zetheta Engineering Internship Project.

A professional-grade, high-performance financial data screener built with modern web technologies, designed to handle large-scale datasets, real-time data streaming, and interactive data visualization with optimal efficiency.

---

## 🚀 Tech Stack & Architecture

* **Framework**: Next.js (App Router) & React (Client/Server hybrid architecture)
* **State Management**: Zustand (lightweight, high-frequency state updates for live ticks)
* **Data Grid & Virtualization**: TanStack Table & `@tanstack/react-virtual` (renders 5,000+ rows smoothly with zero DOM lag)
* **Charting**: TradingView `lightweight-charts` (interactive historical candlestick visualization)
* **Styling**: Tailwind CSS (dark mode financial UI)
* **Language**: TypeScript

---

## ✨ Core Features

1. **Massive Dataset Handling**: Generates and manages 5,000+ mock stock records with realistic market pricing, volume, and sector distributions.
2. **Window Virtualization**: Utilizes row virtualization to render only visible DOM elements, ensuring 60 FPS scrolling performance even under heavy loads.
3. **Live WebSocket Simulation**: Periodic background trade ticks simulate real-time exchange feeds, causing table rows and prices to update dynamically.
4. **Advanced Multi-Criteria Filter Engine**: Real-time filtering across search queries (symbol/company name), sectors (Technology, Finance, Healthcare, Energy, Consumer Goods), custom price boundaries, and volume thresholds.
5. **Interactive Candlestick Charts**: Integrated TradingView Lightweight Charts rendering historical daily price action and technical indicators.
6. **Performance Benchmarking**: Integrated throughput timers verifying sub-200ms execution speeds during complex multi-criteria filtering operations.

---

## 📊 Performance Metrics

* **Rendering Performance**: Virtualization reduces active DOM node count from 5,000+ elements down to ~15-20 visible rows.
* **Filtering Throughput**: Benchmarked via `performance.now()`, the advanced multi-criteria filtering engine processes 5,000 records in **< 15ms**, comfortably beating the sub-200ms enterprise requirement.

---

## 🛠️ Getting Started Locally

1. Clone the repository and install dependencies:
   ```bash
   npm install