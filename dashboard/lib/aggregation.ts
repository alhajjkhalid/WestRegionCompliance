import { MetricsRow, DoDRow, AggregatedMetrics } from './types';

function parsePercentToNumber(pct: string): number {
  if (!pct) return 0;
  const cleaned = pct.replace('%', '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function aggregateMetrics(rows: MetricsRow[]): AggregatedMetrics {
  if (rows.length === 0) {
    return {
      sequenceMore3: 0,
      sequenceMore3Pct: 0,
      sequenceMore9: 0,
      cheatingCouriers: 0,
      activeDriverCard: 0,
      expiredDriverCard: 0,
      activeDriverCardPct: 0,
      totalTriggers: 0,
      passedRate: 0,
      failedRate: 0,
      skippedRate: 0,
    };
  }

  // Sum counts
  const sums = rows.reduce((acc, row) => ({
    sequenceMore3: acc.sequenceMore3 + row.sequenceMore3,
    sequenceMore9: acc.sequenceMore9 + row.sequenceMore9,
    cheatingCouriers: acc.cheatingCouriers + row.cheatingCouriers,
    activeDriverCard: acc.activeDriverCard + row.activeDriverCard,
    expiredDriverCard: acc.expiredDriverCard + row.expiredDriverCard,
    totalTriggers: acc.totalTriggers + row.totalTriggers,
    sequenceMore3Pct: acc.sequenceMore3Pct + parsePercentToNumber(row.sequenceMore3Pct),
    activeDriverCardPct: acc.activeDriverCardPct + parsePercentToNumber(row.activeDriverCardPct),
    passedRate: acc.passedRate + parsePercentToNumber(row.passedRate),
    failedRate: acc.failedRate + parsePercentToNumber(row.failedRate),
    skippedRate: acc.skippedRate + parsePercentToNumber(row.skippedRate),
  }), {
    sequenceMore3: 0,
    sequenceMore9: 0,
    cheatingCouriers: 0,
    activeDriverCard: 0,
    expiredDriverCard: 0,
    totalTriggers: 0,
    sequenceMore3Pct: 0,
    activeDriverCardPct: 0,
    passedRate: 0,
    failedRate: 0,
    skippedRate: 0,
  });

  // Average percentages
  const count = rows.length;
  return {
    sequenceMore3: sums.sequenceMore3,
    sequenceMore3Pct: sums.sequenceMore3Pct / count,
    sequenceMore9: sums.sequenceMore9,
    cheatingCouriers: sums.cheatingCouriers,
    activeDriverCard: sums.activeDriverCard,
    expiredDriverCard: sums.expiredDriverCard,
    activeDriverCardPct: sums.activeDriverCardPct / count,
    totalTriggers: sums.totalTriggers,
    passedRate: sums.passedRate / count,
    failedRate: sums.failedRate / count,
    skippedRate: sums.skippedRate / count,
  };
}

export function aggregateDoDMetrics(rows: DoDRow[]): Record<string, number> {
  if (rows.length === 0) {
    return {
      sequenceMore3: 0,
      sequenceMore3Pct: 0,
      sequenceMore9: 0,
      cheatingCouriers: 0,
      activeDriverCard: 0,
      expiredDriverCard: 0,
      activeDriverCardPct: 0,
      totalTriggers: 0,
      passedRate: 0,
      failedRate: 0,
      skippedRate: 0,
    };
  }

  const sums = rows.reduce((acc, row) => ({
    sequenceMore3: acc.sequenceMore3 + parsePercentToNumber(row.sequenceMore3),
    sequenceMore3Pct: acc.sequenceMore3Pct + parsePercentToNumber(row.sequenceMore3Pct),
    sequenceMore9: acc.sequenceMore9 + parsePercentToNumber(row.sequenceMore9),
    cheatingCouriers: acc.cheatingCouriers + parsePercentToNumber(row.cheatingCouriers),
    activeDriverCard: acc.activeDriverCard + parsePercentToNumber(row.activeDriverCard),
    expiredDriverCard: acc.expiredDriverCard + parsePercentToNumber(row.expiredDriverCard),
    activeDriverCardPct: acc.activeDriverCardPct + parsePercentToNumber(row.activeDriverCardPct),
    totalTriggers: acc.totalTriggers + parsePercentToNumber(row.totalTriggers),
    passedRate: acc.passedRate + parsePercentToNumber(row.passedRate),
    failedRate: acc.failedRate + parsePercentToNumber(row.failedRate),
    skippedRate: acc.skippedRate + parsePercentToNumber(row.skippedRate),
  }), {
    sequenceMore3: 0,
    sequenceMore3Pct: 0,
    sequenceMore9: 0,
    cheatingCouriers: 0,
    activeDriverCard: 0,
    expiredDriverCard: 0,
    activeDriverCardPct: 0,
    totalTriggers: 0,
    passedRate: 0,
    failedRate: 0,
    skippedRate: 0,
  });

  const count = rows.length;
  return {
    sequenceMore3: sums.sequenceMore3 / count,
    sequenceMore3Pct: sums.sequenceMore3Pct / count,
    sequenceMore9: sums.sequenceMore9 / count,
    cheatingCouriers: sums.cheatingCouriers / count,
    activeDriverCard: sums.activeDriverCard / count,
    expiredDriverCard: sums.expiredDriverCard / count,
    activeDriverCardPct: sums.activeDriverCardPct / count,
    totalTriggers: sums.totalTriggers / count,
    passedRate: sums.passedRate / count,
    failedRate: sums.failedRate / count,
    skippedRate: sums.skippedRate / count,
  };
}

export function filterByCity(rows: MetricsRow[], city: string): MetricsRow[] {
  if (!city || city === 'all') return rows;
  return rows.filter(row => row.cityName === city);
}

export function filterByManager(rows: MetricsRow[], manager: string): MetricsRow[] {
  if (!manager || manager === 'all') return rows;
  return rows.filter(row => row.manager === manager);
}

export function filterDoDByCity(rows: DoDRow[], city: string): DoDRow[] {
  if (!city || city === 'all') return rows;
  return rows.filter(row => row.cityName === city);
}

export function filterDoDByManager(rows: DoDRow[], manager: string): DoDRow[] {
  if (!manager || manager === 'all') return rows;
  return rows.filter(row => row.manager === manager);
}
