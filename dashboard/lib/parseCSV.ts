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
    sponsorshipRate: parsePercentage(row[14]),
  };
}

function calculatePercentageChange(previous: number, current: number): string {
  if (previous === 0) {
    if (current === 0) return '0.00%';
    return '100.00%';
  }
  const change = ((current - previous) / previous) * 100;
  return change.toFixed(2) + '%';
}

function calculatePercentagePointChange(previousPct: string, currentPct: string): string {
  const prev = parseFloat(previousPct.replace('%', '')) || 0;
  const curr = parseFloat(currentPct.replace('%', '')) || 0;
  const change = curr - prev;
  return change.toFixed(2) + '%';
}

function calculateDayOverDay(previousDay: MetricsRow[], today: MetricsRow[]): DoDRow[] {
  const dodRows: DoDRow[] = [];

  today.forEach(todayRow => {
    const previousRow = previousDay.find(
      prev => prev.cityId === todayRow.cityId && prev.manager === todayRow.manager
    );

    if (previousRow) {
      dodRows.push({
        cityId: todayRow.cityId,
        cityName: todayRow.cityName,
        manager: todayRow.manager,
        sequenceMore3: calculatePercentageChange(previousRow.sequenceMore3, todayRow.sequenceMore3),
        sequenceMore3Pct: calculatePercentagePointChange(previousRow.sequenceMore3Pct, todayRow.sequenceMore3Pct),
        sequenceMore9: calculatePercentageChange(previousRow.sequenceMore9, todayRow.sequenceMore9),
        cheatingCouriers: calculatePercentageChange(previousRow.cheatingCouriers, todayRow.cheatingCouriers),
        activeDriverCard: calculatePercentageChange(previousRow.activeDriverCard, todayRow.activeDriverCard),
        expiredDriverCard: calculatePercentageChange(previousRow.expiredDriverCard, todayRow.expiredDriverCard),
        activeDriverCardPct: calculatePercentagePointChange(previousRow.activeDriverCardPct, todayRow.activeDriverCardPct),
        totalTriggers: calculatePercentageChange(previousRow.totalTriggers, todayRow.totalTriggers),
        passedRate: calculatePercentagePointChange(previousRow.passedRate, todayRow.passedRate),
        failedRate: calculatePercentagePointChange(previousRow.failedRate, todayRow.failedRate),
        skippedRate: calculatePercentagePointChange(previousRow.skippedRate, todayRow.skippedRate),
        sponsorshipRate: calculatePercentagePointChange(previousRow.sponsorshipRate, todayRow.sponsorshipRate),
      });
    }
  });

  return dodRows;
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

  // Table 2: Today (after second header)
  if (headerIndices.length >= 2) {
    const startIdx = headerIndices[1] + 1;
    const endIdx = rows.length;

    for (let i = startIdx; i < endIdx; i++) {
      const parsed = parseMetricsRow(rows[i]);
      if (parsed) {
        today.push(parsed);
      }
    }
  }

  // Calculate Day over Day automatically
  const dayOverDay = calculateDayOverDay(previousDay, today);

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
