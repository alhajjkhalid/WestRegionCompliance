'use client';

interface DodIndicatorProps {
  value: string | number;
  inverse?: boolean; // For metrics where decrease is good (like cheating)
  compact?: boolean; // For table cells
}

export default function DodIndicator({ value, inverse = false, compact = false }: DodIndicatorProps) {
  const numValue = typeof value === 'string'
    ? parseFloat(value.replace('%', '').replace(',', ''))
    : value;

  if (isNaN(numValue) || numValue === 0) {
    return (
      <span className="inline-flex items-center justify-center gap-1 text-slate-600 dark:text-slate-500 text-sm">
        <span>-</span>
        <span className="text-xs">0%</span>
      </span>
    );
  }

  const isPositive = numValue > 0;
  // For inverse metrics (like cheating, fail rate), decrease is good
  const isGood = inverse ? !isPositive : isPositive;

  const colorClass = isGood ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400';
  const bgClass = isGood ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20';
  const arrow = isPositive ? '▲' : '▼';

  const displayValue = typeof value === 'string'
    ? value
    : `${Math.abs(numValue).toFixed(1)}%`;

  return (
    <span className={`inline-flex items-center justify-center gap-1 ${colorClass} ${bgClass} px-2 py-0.5 rounded text-sm font-medium`}>
      <span className="text-xs">{arrow}</span>
      <span>{displayValue}</span>
    </span>
  );
}
