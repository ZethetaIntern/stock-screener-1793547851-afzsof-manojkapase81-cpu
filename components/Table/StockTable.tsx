'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  HeaderGroup,
  Header,
  Cell,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Stock } from '@/types/stock';
import { useStockStore } from '@/store/useStockStore';

const columnHelper = createColumnHelper<Stock>();

export function StockTable() {
  const [isMounted, setIsMounted] = useState(false);
  const stocks = useStockStore((state) => state.stocks);
  const searchQuery = useStockStore((state) => state.searchQuery);
  const selectedSector = useStockStore((state) => state.selectedSector);
  const minPrice = useStockStore((state) => state.minPrice);
  const maxPrice = useStockStore((state) => state.maxPrice);
  const minVolume = useStockStore((state) => state.minVolume);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Advanced multi-criteria filter engine with performance benchmarking
  const filteredData = useMemo(() => {
    const startTime = performance.now();

    const result = stocks.filter((stock) => {
      const matchesSearch =
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector =
        selectedSector === 'All' || stock.sector === selectedSector;
      const matchesPrice = stock.price >= minPrice && stock.price <= maxPrice;
      const matchesVolume = stock.volume >= minVolume;

      return matchesSearch && matchesSector && matchesPrice && matchesVolume;
    });

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    
    // Log benchmark throughput for your Zetheta documentation
    if (stocks.length > 0) {
      console.log(`[Zetheta Benchmark] Filtered ${stocks.length} records down to ${result.length} matches in ${duration}ms`);
    }

    return result;
  }, [stocks, searchQuery, selectedSector, minPrice, maxPrice, minVolume]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('symbol', {
        header: 'Symbol',
        cell: (info) => <span className="font-bold text-white">{info.getValue()}</span>,
      }),
      columnHelper.accessor('name', {
        header: 'Company Name',
        cell: (info) => <span className="text-gray-300">{info.getValue()}</span>,
      }),
      columnHelper.accessor('sector', {
        header: 'Sector',
        cell: (info) => (
          <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('price', {
        header: 'Price ($)',
        cell: (info) => <span className="text-white">${info.getValue().toFixed(2)}</span>,
      }),
      columnHelper.accessor('change', {
        header: 'Change',
        cell: (info) => {
          const val = info.getValue();
          const isPositive = val >= 0;
          return (
            <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
              {isPositive ? '+' : ''}{val.toFixed(2)}
            </span>
          );
        },
      }),
      columnHelper.accessor('percentChange', {
        header: '% Change',
        cell: (info) => {
          const val = info.getValue();
          const isPositive = val >= 0;
          return (
            <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
              {isPositive ? '+' : ''}{val.toFixed(2)}%
            </span>
          );
        },
      }),
      columnHelper.accessor('volume', {
        header: 'Volume',
        cell: (info) => <span className="text-gray-400">{info.getValue().toLocaleString()}</span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  if (!isMounted) {
    return <div className="h-[600px] bg-gray-900 border border-gray-800 rounded-lg animate-pulse" />;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div
        ref={parentRef}
        className="h-[600px] overflow-auto relative scrollbar-thin scrollbar-thumb-gray-700"
      >
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-950 sticky top-0 z-10 border-b border-gray-800">
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<Stock>) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<Stock, unknown>) => (
                  <th
                    key={header.id}
                    className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors flex items-center"
                >
                  {row.getVisibleCells().map((cell: Cell<Stock, unknown>) => (
                    <td
                      key={cell.id}
                      className="p-4 text-sm flex-1 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}