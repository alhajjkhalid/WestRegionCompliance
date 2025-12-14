export type Region = 'Jeddah' | 'North' | 'South';

export const REGION_CITY_MAP: Record<Region, string[]> = {
  'Jeddah': ['Jeddah'],
  'North': ['Madinah', 'Yanbu', 'Tabuk'],
  'South': ['Abha', 'Jazan', 'Najran', 'Makkah', 'Taif'],
};

export const CITY_REGION_MAP: Record<string, Region> = {
  'Jeddah': 'Jeddah',
  'Madinah': 'North',
  'Yanbu': 'North',
  'Tabuk': 'North',
  'Abha': 'South',
  'Jazan': 'South',
  'Najran': 'South',
  'Makkah': 'South',
  'Taif': 'South',
};

export function getCityRegion(cityName: string): Region | undefined {
  return CITY_REGION_MAP[cityName];
}

export function getRegionCities(region: Region): string[] {
  return REGION_CITY_MAP[region] || [];
}

export function getAllRegions(): Region[] {
  return Object.keys(REGION_CITY_MAP) as Region[];
}
