'use client';

import DodIndicator from './DodIndicator';

interface MetricItem {
  label: string;
  previousDay: string | number;
  today: string | number;
  dod: string;
  inverse?: boolean;
}

interface CategoryCardProps {
  title: string;
  icon: string;
  metrics: MetricItem[];
  color: string;
}

export default function CategoryCard({ title, icon, metrics, color }: CategoryCardProps) {
  const isSponsorshipCard = title === 'Sponsorship Rate';

  const getTodayValueColor = (value: string | number): string => {
    if (!isSponsorshipCard) return '';

    const stringValue = String(value);
    const numericValue = parseFloat(stringValue.replace('%', ''));

    if (numericValue > 90) {
      return 'text-green-400';
    }
    return '';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden card-hover shadow-sm">
      {/* Header */}
      <div className={`px-4 py-3 border-b border-slate-300 dark:border-slate-700 ${color}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">{title}</h3>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-600 dark:text-slate-400 text-xs uppercase">
              <th className="text-left pb-2 font-medium">Metric</th>
              <th className="text-right pb-2 font-medium">Yesterday</th>
              <th className="text-right pb-2 font-medium">Today</th>
              <th className="text-right pb-2 font-medium">DoD</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, index) => (
              <tr key={index} className="border-t border-slate-200 dark:border-slate-700/50">
                <td className="py-2 text-slate-700 dark:text-slate-300">{metric.label}</td>
                <td className={`py-2 text-right ${isSponsorshipCard && parseFloat(String(metric.previousDay).replace('%', '')) > 90 ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  {metric.previousDay}
                </td>
                <td className={`py-2 text-right font-medium text-slate-900 dark:text-slate-100 ${getTodayValueColor(metric.today)}`}>
                  {metric.today}
                </td>
                <td className="py-2 text-right">
                  <DodIndicator value={metric.dod} inverse={metric.inverse} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
