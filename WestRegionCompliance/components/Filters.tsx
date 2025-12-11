'use client';

import { MetricsRow } from '@/lib/types';
import { getCities, getManagers } from '@/lib/parseCSV';

interface FiltersProps {
  data: MetricsRow[];
  selectedCity: string;
  selectedManager: string;
  onCityChange: (city: string) => void;
  onManagerChange: (manager: string) => void;
}

export default function Filters({
  data,
  selectedCity,
  selectedManager,
  onCityChange,
  onManagerChange,
}: FiltersProps) {
  const cities = getCities(data);
  const managers = getManagers(data, selectedCity === 'all' ? undefined : selectedCity);

  const handleCityChange = (city: string) => {
    onCityChange(city);
    // Reset manager when city changes
    onManagerChange('all');
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-400 font-medium">City</label>
        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className="min-w-[180px]"
        >
          <option value="all">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-400 font-medium">Manager</label>
        <select
          value={selectedManager}
          onChange={(e) => onManagerChange(e.target.value)}
          className="min-w-[200px]"
        >
          <option value="all">All Managers</option>
          {managers.map((manager) => (
            <option key={manager} value={manager}>
              {manager}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
