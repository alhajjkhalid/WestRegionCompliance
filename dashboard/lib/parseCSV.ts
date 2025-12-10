import { MetricsRow, DoDRow, DashboardData } from './types';

function parseNumber(value: string): number {
  if (!value || value === '') return 0;
  // Remove commas and parse
  const cleaned = value.replace(/,/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function parsePercentage(value: string): string {
  if (!value || value === '') return '0.00%';
  return value.trim();
}

function parseMetricsRow(row: string[]): MetricsRow | null {
  if (!row[0] || row[0].trim() === '' || row[0].includes('city_id')) {
    return null;
  }

  return {
    cityId: row[0]?.trim() || '',
    cityName: row[1]?.trim() || '',
    manager: row[2]?.trim() || '',
    sequenceMore3: parseNumber(row[3]),
    sequenceMore3Pct: parsePercentage(row[4]),
    sequenceMore9: parseNumber(row[5]),
    cheatingCouriers: parseNumber(row[6]),
    activeDriverCard: parseNumber(row[7]),
    expiredDriverCard: parseNumber(row[8]),
    activeDriverCardPct: parsePercentage(row[9]),
    totalTriggers: parseNumber(row[10]),
    passedRate: parsePercentage(row[11]),
    failedRate: parsePercentage(row[12]),
    skippedRate: parsePercentage(row[13]),
  };
}

function parseDoDRow(row: string[]): DoDRow | null {
  if (!row[0] || row[0].trim() === '' || row[0].includes('city_id')) {
    return null;
  }

  return {
    cityId: row[0]?.trim() || '',
    cityName: row[1]?.trim() || '',
    manager: row[2]?.trim() || '',
    sequenceMore3: row[3]?.trim() || '0.0%',
    sequenceMore3Pct: row[4]?.trim() || '0.00%',
    sequenceMore9: row[5]?.trim() || '0.0%',
    cheatingCouriers: row[6]?.trim() || '0.0%',
    activeDriverCard: row[7]?.trim() || '0.0%',
    expiredDriverCard: row[8]?.trim() || '0.0%',
    activeDriverCardPct: row[9]?.trim() || '0.00%',
    totalTriggers: row[10]?.trim() || '0.0%',
    passedRate: row[11]?.trim() || '0.00%',
    failedRate: row[12]?.trim() || '0.00%',
    skippedRate: row[13]?.trim() || '0.00%',
  };
}

export function parseCSVData(csvContent: string): DashboardData {
  const lines = csvContent.split('\n');
  const rows: string[][] = [];

  for (const line of lines) {
    // Simple CSV parsing - split by comma but handle quoted values
    const row: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current);
    rows.push(row);
  }

  // Find table boundaries by looking for header rows
  const headerIndices: number[] = [];
  rows.forEach((row, index) => {
    if (row[0]?.includes('city_id')) {
      headerIndices.push(index);
    }
  });

  // Parse each table
  const previousDay: MetricsRow[] = [];
  const today: MetricsRow[] = [];
  const dayOverDay: DoDRow[] = [];

  // Table 1: Previous Day (after first header until second header)
  if (headerIndices.length >= 1) {
    const startIdx = headerIndices[0] + 1;
    const endIdx = headerIndices.length >= 2 ? headerIndices[1] : rows.length;

    for (let i = startIdx; i < endIdx; i++) {
      const parsed = parseMetricsRow(rows[i]);
      if (parsed) {
        previousDay.push(parsed);
      }
    }
  }

  // Table 2: Today (after second header until third header)
  if (headerIndices.length >= 2) {
    const startIdx = headerIndices[1] + 1;
    const endIdx = headerIndices.length >= 3 ? headerIndices[2] : rows.length;

    for (let i = startIdx; i < endIdx; i++) {
      const parsed = parseMetricsRow(rows[i]);
      if (parsed) {
        today.push(parsed);
      }
    }
  }

  // Table 3: Day over Day (after third header)
  if (headerIndices.length >= 3) {
    const startIdx = headerIndices[2] + 1;

    for (let i = startIdx; i < rows.length; i++) {
      const parsed = parseDoDRow(rows[i]);
      if (parsed) {
        dayOverDay.push(parsed);
      }
    }
  }

  return {
    previousDay,
    today,
    dayOverDay,
    lastUpdated: new Date().toISOString(),
  };
}

export function getCities(data: MetricsRow[]): string[] {
  const cities = new Set<string>();
  data.forEach(row => {
    if (row.cityName) {
      cities.add(row.cityName);
    }
  });
  return Array.from(cities).sort();
}

export function getManagers(data: MetricsRow[], city?: string): string[] {
  const managers = new Set<string>();
  data.forEach(row => {
    if (row.manager && (!city || row.cityName === city)) {
      managers.add(row.manager);
    }
  });
  return Array.from(managers).sort();
}
