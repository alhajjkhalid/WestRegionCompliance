'use client';

import { useState } from 'react';
import { MetricsRow, DoDRow } from '@/lib/types';
import DodIndicator from './DodIndicator';

interface DataTableProps {
  previousDay: MetricsRow[];
  today: MetricsRow[];
  dayOverDay: DoDRow[];
}

type TabType = 'previous' | 'today' | 'dod';

export default function DataTable({ previousDay, today, dayOverDay }: DataTableProps) {
  const [activeTab, setActiveTab] = useState<TabType>('today');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'previous', label: 'Previous Day' },
    { id: 'today', label: 'Today' },
    { id: 'dod', label: 'Day over Day' },
  ];

  const renderMetricsTable = (data: MetricsRow[]) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Main Header Row */}
        <thead>
          <tr>
            <th className="bg-slate-700 text-left px-3 py-3 text-sm font-bold text-slate-100 border-b-2 border-slate-500 sticky left-0 z-10 min-w-[100px]">
              City
            </th>
            <th className="bg-slate-700 text-left px-3 py-3 text-sm font-bold text-slate-100 border-b-2 border-slate-500 border-r-2 border-r-slate-500 min-w-[140px]">
              Manager
            </th>
            {/* Sequence Number Group */}
            <th colSpan={3} className="bg-blue-900/50 text-center px-3 py-3 text-sm font-bold text-blue-200 border-b-2 border-blue-400 border-r-2 border-r-slate-500">
              Sequence Number
            </th>
            {/* Cheating Group */}
            <th className="bg-red-900/50 text-center px-3 py-3 text-sm font-bold text-red-200 border-b-2 border-red-400 border-r-2 border-r-slate-500">
              Cheating
            </th>
            {/* Driver Card Group */}
            <th colSpan={3} className="bg-green-900/50 text-center px-3 py-3 text-sm font-bold text-green-200 border-b-2 border-green-400 border-r-2 border-r-slate-500">
              Driver Card
            </th>
            {/* Face ID Group */}
            <th colSpan={4} className="bg-purple-900/50 text-center px-3 py-3 text-sm font-bold text-purple-200 border-b-2 border-purple-400 border-r-2 border-r-slate-500">
              Face ID Recognition
            </th>
            {/* Sponsorship Group */}
            <th className="bg-yellow-900/50 text-center px-3 py-3 text-sm font-bold text-yellow-200 border-b-2 border-yellow-400">
              Sponsorship
            </th>
          </tr>
          {/* Sub Header Row */}
          <tr className="bg-slate-800">
            <th className="sticky left-0 z-10 bg-slate-800"></th>
            <th className="border-r-2 border-r-slate-500"></th>
            {/* Sequence sub-headers */}
            <th className="px-3 py-2 text-xs font-semibold text-blue-300 text-center min-w-[60px]">&gt;3</th>
            <th className="px-3 py-2 text-xs font-semibold text-blue-300 text-center min-w-[70px]">&gt;3 %</th>
            <th className="px-3 py-2 text-xs font-semibold text-blue-300 text-center border-r-2 border-r-slate-500 min-w-[60px]">&gt;9</th>
            {/* Cheating sub-header */}
            <th className="px-3 py-2 text-xs font-semibold text-red-300 text-center border-r-2 border-r-slate-500 min-w-[70px]">Count</th>
            {/* Driver Card sub-headers */}
            <th className="px-3 py-2 text-xs font-semibold text-green-300 text-center min-w-[70px]">Active</th>
            <th className="px-3 py-2 text-xs font-semibold text-green-300 text-center min-w-[70px]">Expired</th>
            <th className="px-3 py-2 text-xs font-semibold text-green-300 text-center border-r-2 border-r-slate-500 min-w-[80px]">Active %</th>
            {/* Face ID sub-headers */}
            <th className="px-3 py-2 text-xs font-semibold text-purple-300 text-center min-w-[80px]">Triggers</th>
            <th className="px-3 py-2 text-xs font-semibold text-purple-300 text-center min-w-[70px]">Pass</th>
            <th className="px-3 py-2 text-xs font-semibold text-purple-300 text-center min-w-[70px]">Fail</th>
            <th className="px-3 py-2 text-xs font-semibold text-purple-300 text-center border-r-2 border-r-slate-500 min-w-[70px]">Skip</th>
            {/* Sponsorship sub-header */}
            <th className="px-3 py-2 text-xs font-semibold text-yellow-300 text-center min-w-[80px]">Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-900/50'} hover:bg-slate-700/50 transition-colors`}
            >
              <td className={`sticky left-0 z-10 px-3 py-3 font-semibold text-slate-100 ${index % 2 === 0 ? 'bg-slate-800/95' : 'bg-slate-900/95'}`}>
                {row.cityName}
              </td>
              <td className="px-3 py-3 text-slate-300 border-r-2 border-r-slate-600">
                {row.manager}
              </td>
              {/* Sequence Number values */}
              <td className="px-3 py-3 text-center font-medium text-slate-100">
                {row.sequenceMore3}
              </td>
              <td className="px-3 py-3 text-center text-slate-300">
                {row.sequenceMore3Pct}
              </td>
              <td className="px-3 py-3 text-center font-medium text-slate-100 border-r-2 border-r-slate-600">
                {row.sequenceMore9}
              </td>
              {/* Cheating value */}
              <td className="px-3 py-3 text-center border-r-2 border-r-slate-600">
                <span className={`font-bold ${row.cheatingCouriers > 0 ? 'text-red-400 bg-red-900/30 px-2 py-1 rounded' : 'text-slate-400'}`}>
                  {row.cheatingCouriers}
                </span>
              </td>
              {/* Driver Card values */}
              <td className="px-3 py-3 text-center">
                <span className="text-green-400 font-semibold">{row.activeDriverCard}</span>
              </td>
              <td className="px-3 py-3 text-center">
                <span className={`font-semibold ${row.expiredDriverCard > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                  {row.expiredDriverCard}
                </span>
              </td>
              <td className="px-3 py-3 text-center text-slate-200 border-r-2 border-r-slate-600">
                {row.activeDriverCardPct}
              </td>
              {/* Face ID values */}
              <td className="px-3 py-3 text-center text-slate-200 font-medium">
                {row.totalTriggers.toLocaleString()}
              </td>
              <td className="px-3 py-3 text-center">
                <span className="text-green-400 font-semibold">{row.passedRate}</span>
              </td>
              <td className="px-3 py-3 text-center">
                <span className="text-red-400 font-semibold">{row.failedRate}</span>
              </td>
              <td className="px-3 py-3 text-center border-r-2 border-r-slate-600">
                <span className="text-yellow-400 font-semibold">{row.skippedRate}</span>
              </td>
              {/* Sponsorship value */}
              <td className="px-3 py-3 text-center">
                <span className={`font-semibold ${parseFloat(row.sponsorshipRate.replace('%', '')) > 90 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {row.sponsorshipRate}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDoDTable = (data: DoDRow[]) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Main Header Row */}
        <thead>
          <tr>
            <th className="bg-slate-700 text-left px-3 py-3 text-sm font-bold text-slate-100 border-b-2 border-slate-500 sticky left-0 z-10 min-w-[100px]">
              City
            </th>
            <th className="bg-slate-700 text-left px-3 py-3 text-sm font-bold text-slate-100 border-b-2 border-slate-500 border-r-2 border-r-slate-500 min-w-[140px]">
              Manager
            </th>
            {/* Sequence Number Group */}
            <th colSpan={3} className="bg-blue-900/50 text-center px-3 py-3 text-sm font-bold text-blue-200 border-b-2 border-blue-400 border-r-2 border-r-slate-500">
              Sequence Number
            </th>
            {/* Cheating Group */}
            <th className="bg-red-900/50 text-center px-3 py-3 text-sm font-bold text-red-200 border-b-2 border-red-400 border-r-2 border-r-slate-500">
              Cheating
            </th>
            {/* Driver Card Group */}
            <th colSpan={3} className="bg-green-900/50 text-center px-3 py-3 text-sm font-bold text-green-200 border-b-2 border-green-400 border-r-2 border-r-slate-500">
              Driver Card
            </th>
            {/* Face ID Group */}
            <th colSpan={4} className="bg-purple-900/50 text-center px-3 py-3 text-sm font-bold text-purple-200 border-b-2 border-purple-400 border-r-2 border-r-slate-500">
              Face ID Recognition
            </th>
            {/* Sponsorship Group */}
            <th className="bg-yellow-900/50 text-center px-3 py-3 text-sm font-bold text-yellow-200 border-b-2 border-yellow-400">
              Sponsorship
            </th>
          </tr>
          {/* Sub Header Row */}
          <tr className="bg-slate-800">
            <th className="sticky left-0 z-10 bg-slate-800"></th>
            <th className="border-r-2 border-r-slate-500"></th>
            {/* Sequence sub-headers */}
            <th className="px-3 py-2 text-xs font-semibold text-blue-300 text-center min-w-[80px]">&gt;3</th>
            <th className="px-3 py-2 text-xs font-semibold text-blue-300 text-center min-w-[80px]">&gt;3 %</th>
            <th className="px-3 py-2 text-xs font-semibold text-blue-300 text-center border-r-2 border-r-slate-500 min-w-[80px]">&gt;9</th>
            {/* Cheating sub-header */}
            <th className="px-3 py-2 text-xs font-semibold text-red-300 text-center border-r-2 border-r-slate-500 min-w-[80px]">Count</th>
            {/* Driver Card sub-headers */}
            <th className="px-3 py-2 text-xs font-semibold text-green-300 text-center min-w-[80px]">Active</th>
            <th className="px-3 py-2 text-xs font-semibold text-green-300 text-center min-w-[80px]">Expired</th>
            <th className="px-3 py-2 text-xs font-semibold text-green-300 text-center border-r-2 border-r-slate-500 min-w-[80px]">Active %</th>
            {/* Face ID sub-headers */}
            <th className="px-3 py-2 text-xs font-semibold text-purple-300 text-center min-w-[80px]">Triggers</th>
            <th className="px-3 py-2 text-xs font-semibold text-purple-300 text-center min-w-[80px]">Pass</th>
            <th className="px-3 py-2 text-xs font-semibold text-purple-300 text-center min-w-[80px]">Fail</th>
            <th className="px-3 py-2 text-xs font-semibold text-purple-300 text-center border-r-2 border-r-slate-500 min-w-[80px]">Skip</th>
            {/* Sponsorship sub-header */}
            <th className="px-3 py-2 text-xs font-semibold text-yellow-300 text-center min-w-[80px]">Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-900/50'} hover:bg-slate-700/50 transition-colors`}
            >
              <td className={`sticky left-0 z-10 px-3 py-3 font-semibold text-slate-100 ${index % 2 === 0 ? 'bg-slate-800/95' : 'bg-slate-900/95'}`}>
                {row.cityName}
              </td>
              <td className="px-3 py-3 text-slate-300 border-r-2 border-r-slate-600">
                {row.manager}
              </td>
              {/* Sequence Number DoD values */}
              <td className="px-3 py-3 text-center">
                <DodIndicator value={row.sequenceMore3} inverse />
              </td>
              <td className="px-3 py-3 text-center">
                <DodIndicator value={row.sequenceMore3Pct} inverse />
              </td>
              <td className="px-3 py-3 text-center border-r-2 border-r-slate-600">
                <DodIndicator value={row.sequenceMore9} inverse />
              </td>
              {/* Cheating DoD value */}
              <td className="px-3 py-3 text-center border-r-2 border-r-slate-600">
                <DodIndicator value={row.cheatingCouriers} inverse />
              </td>
              {/* Driver Card DoD values */}
              <td className="px-3 py-3 text-center">
                <DodIndicator value={row.activeDriverCard} />
              </td>
              <td className="px-3 py-3 text-center">
                <DodIndicator value={row.expiredDriverCard} inverse />
              </td>
              <td className="px-3 py-3 text-center border-r-2 border-r-slate-600">
                <DodIndicator value={row.activeDriverCardPct} />
              </td>
              {/* Face ID DoD values */}
              <td className="px-3 py-3 text-center">
                <DodIndicator value={row.totalTriggers} />
              </td>
              <td className="px-3 py-3 text-center">
                <DodIndicator value={row.passedRate} />
              </td>
              <td className="px-3 py-3 text-center">
                <DodIndicator value={row.failedRate} inverse />
              </td>
              <td className="px-3 py-3 text-center border-r-2 border-r-slate-600">
                <DodIndicator value={row.skippedRate} inverse />
              </td>
              {/* Sponsorship DoD value */}
              <td className="px-3 py-3 text-center">
                <DodIndicator value={row.sponsorshipRate} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-700 text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="p-4">
        {activeTab === 'previous' && renderMetricsTable(previousDay)}
        {activeTab === 'today' && renderMetricsTable(today)}
        {activeTab === 'dod' && renderDoDTable(dayOverDay)}
      </div>
    </div>
  );
}
