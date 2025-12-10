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
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden card-hover">
      {/* Header */}
      <div className={`px-4 py-3 border-b border-slate-700 ${color}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase">
              <th className="text-left pb-2 font-medium">Metric</th>
              <th className="text-right pb-2 font-medium">Yesterday</th>
              <th className="text-right pb-2 font-medium">Today</th>
              <th className="text-right pb-2 font-medium">DoD</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, index) => (
              <tr key={index} className="border-t border-slate-700/50">
                <td className="py-2 text-slate-300">{metric.label}</td>
                <td className="py-2 text-right text-slate-400">{metric.previousDay}</td>
                <td className="py-2 text-right font-medium">{metric.today}</td>
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
