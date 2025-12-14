'use client';

import { MetricsRow } from '@/lib/types';
import { getCities, getManagers } from '@/lib/parseCSV';
import { getAllRegions } from '@/lib/regions';

interface FiltersProps {
  data: MetricsRow[];
  selectedRegion: string;
  selectedCity: string;
  selectedManager: string;
  onRegionChange: (region: string) => void;
  onCityChange: (city: string) => void;
  onManagerChange: (manager: string) => void;
}

export default function Filters({
  data,
  selectedRegion,
  selectedCity,
  selectedManager,
  onRegionChange,
  onCityChange,
  onManagerChange,
}: FiltersProps) {
  const regions = getAllRegions();
  const cities = getCities(data);
  const managers = getManagers(data, selectedCity === 'all' ? undefined : selectedCity);

  const handleRegionChange = (region: string) => {
    onRegionChange(region);
    // Reset city and manager when region changes
    onCityChange('all');
    onManagerChange('all');
  };

  const handleCityChange = (city: string) => {
    onCityChange(city);
    // Reset manager when city changes
    onManagerChange('all');
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-600 dark:text-slate-400 font-medium">Region</label>
        <select
          value={selectedRegion}
          onChange={(e) => handleRegionChange(e.target.value)}
          className="min-w-[180px]"
        >
          <option value="all">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-600 dark:text-slate-400 font-medium">City</label>
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
        <label className="text-sm text-slate-600 dark:text-slate-400 font-medium">Manager</label>
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
