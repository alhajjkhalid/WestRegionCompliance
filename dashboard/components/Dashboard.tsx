'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardData, MetricsRow, DoDRow, AggregatedMetrics } from '@/lib/types';
import { aggregateMetrics, aggregateDoDMetrics, filterByCity, filterByManager, filterDoDByCity, filterDoDByManager } from '@/lib/aggregation';
import Filters from './Filters';
import CategoryCard from './CategoryCard';
import DataTable from './DataTable';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedManager, setSelectedManager] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/data', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-400 font-semibold mb-2">Error Loading Data</h2>
          <p className="text-slate-300">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Filter data based on selections
  let filteredPrevious = filterByCity(data.previousDay, selectedCity);
  filteredPrevious = filterByManager(filteredPrevious, selectedManager);

  let filteredToday = filterByCity(data.today, selectedCity);
  filteredToday = filterByManager(filteredToday, selectedManager);

  let filteredDoD = filterDoDByCity(data.dayOverDay, selectedCity);
  filteredDoD = filterDoDByManager(filteredDoD, selectedManager);

  // Aggregate metrics for category cards
  const prevAgg = aggregateMetrics(filteredPrevious);
  const todayAgg = aggregateMetrics(filteredToday);
  const dodAgg = aggregateDoDMetrics(filteredDoD);

  // Category card data
  const categories = [
    {
      title: 'Sequence Number',
      icon: '📊',
      color: 'bg-blue-600/20',
      metrics: [
        {
          label: 'More than 3',
          previousDay: prevAgg.sequenceMore3,
          today: todayAgg.sequenceMore3,
          dod: `${dodAgg.sequenceMore3 >= 0 ? '+' : ''}${dodAgg.sequenceMore3.toFixed(1)}%`,
          inverse: true,
        },
        {
          label: 'More than 3 %',
          previousDay: `${prevAgg.sequenceMore3Pct.toFixed(2)}%`,
          today: `${todayAgg.sequenceMore3Pct.toFixed(2)}%`,
          dod: `${dodAgg.sequenceMore3Pct >= 0 ? '+' : ''}${dodAgg.sequenceMore3Pct.toFixed(2)}%`,
          inverse: true,
        },
        {
          label: 'More than 9',
          previousDay: prevAgg.sequenceMore9,
          today: todayAgg.sequenceMore9,
          dod: `${dodAgg.sequenceMore9 >= 0 ? '+' : ''}${dodAgg.sequenceMore9.toFixed(1)}%`,
          inverse: true,
        },
      ],
    },
    {
      title: 'Cheating Couriers',
      icon: '⚠️',
      color: 'bg-red-600/20',
      metrics: [
        {
          label: 'Total Cheating',
          previousDay: prevAgg.cheatingCouriers,
          today: todayAgg.cheatingCouriers,
          dod: `${dodAgg.cheatingCouriers >= 0 ? '+' : ''}${dodAgg.cheatingCouriers.toFixed(1)}%`,
          inverse: true,
        },
      ],
    },
    {
      title: 'Driver Card',
      icon: '🪪',
      color: 'bg-green-600/20',
      metrics: [
        {
          label: 'Active',
          previousDay: prevAgg.activeDriverCard,
          today: todayAgg.activeDriverCard,
          dod: `${dodAgg.activeDriverCard >= 0 ? '+' : ''}${dodAgg.activeDriverCard.toFixed(1)}%`,
          inverse: false,
        },
        {
          label: 'Expired',
          previousDay: prevAgg.expiredDriverCard,
          today: todayAgg.expiredDriverCard,
          dod: `${dodAgg.expiredDriverCard >= 0 ? '+' : ''}${dodAgg.expiredDriverCard.toFixed(1)}%`,
          inverse: true,
        },
        {
          label: 'Active %',
          previousDay: `${prevAgg.activeDriverCardPct.toFixed(2)}%`,
          today: `${todayAgg.activeDriverCardPct.toFixed(2)}%`,
          dod: `${dodAgg.activeDriverCardPct >= 0 ? '+' : ''}${dodAgg.activeDriverCardPct.toFixed(2)}%`,
          inverse: false,
        },
      ],
    },
    {
      title: 'Face ID Recognition',
      icon: '👤',
      color: 'bg-purple-600/20',
      metrics: [
        {
          label: 'Total Triggers',
          previousDay: prevAgg.totalTriggers.toLocaleString(),
          today: todayAgg.totalTriggers.toLocaleString(),
          dod: `${dodAgg.totalTriggers >= 0 ? '+' : ''}${dodAgg.totalTriggers.toFixed(1)}%`,
          inverse: false,
        },
        {
          label: 'Pass Rate',
          previousDay: `${prevAgg.passedRate.toFixed(2)}%`,
          today: `${todayAgg.passedRate.toFixed(2)}%`,
          dod: `${dodAgg.passedRate >= 0 ? '+' : ''}${dodAgg.passedRate.toFixed(2)}%`,
          inverse: false,
        },
        {
          label: 'Fail Rate',
          previousDay: `${prevAgg.failedRate.toFixed(2)}%`,
          today: `${todayAgg.failedRate.toFixed(2)}%`,
          dod: `${dodAgg.failedRate >= 0 ? '+' : ''}${dodAgg.failedRate.toFixed(2)}%`,
          inverse: true,
        },
        {
          label: 'Skip Rate',
          previousDay: `${prevAgg.skippedRate.toFixed(2)}%`,
          today: `${todayAgg.skippedRate.toFixed(2)}%`,
          dod: `${dodAgg.skippedRate >= 0 ? '+' : ''}${dodAgg.skippedRate.toFixed(2)}%`,
          inverse: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">
              SW Region Compliance Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Real-time compliance metrics for Southwest Region
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>↻</span>
              <span>Refresh</span>
            </button>
            {lastUpdated && (
              <span className="text-sm text-slate-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Filters */}
      <Filters
        data={data.today}
        selectedCity={selectedCity}
        selectedManager={selectedManager}
        onCityChange={setSelectedCity}
        onManagerChange={setSelectedManager}
      />

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            icon={category.icon}
            color={category.color}
            metrics={category.metrics}
          />
        ))}
      </div>

      {/* Data Table */}
      <DataTable
        previousDay={filteredPrevious}
        today={filteredToday}
        dayOverDay={filteredDoD}
      />
    </div>
  );
}
