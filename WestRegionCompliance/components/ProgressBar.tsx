'use client';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  showLabel?: boolean;
  label?: string;
}

export default function ProgressBar({
  value,
  max,
  color = 'blue',
  showLabel = true,
  label
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  const bgColorClasses = {
    blue: 'bg-blue-500/20',
    green: 'bg-green-500/20',
    red: 'bg-red-500/20',
    yellow: 'bg-yellow-500/20',
    purple: 'bg-purple-500/20',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">{label}</span>
          <span className="text-slate-300 font-semibold">
            {value}{max > 100 ? '' : `/${max}`}
          </span>
        </div>
      )}
      <div className={`h-2 rounded-full ${bgColorClasses[color]} overflow-hidden`}>
        <div
          className={`h-full ${colorClasses[color]} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
