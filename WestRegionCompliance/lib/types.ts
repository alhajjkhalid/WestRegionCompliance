export interface MetricsRow {
  cityId: string;
  cityName: string;
  manager: string;
  sequenceMore3: number;
  sequenceMore3Pct: string;
  sequenceMore9: number;
  cheatingCouriers: number;
  activeDriverCard: number;
  expiredDriverCard: number;
  activeDriverCardPct: string;
  totalTriggers: number;
  passedRate: string;
  failedRate: string;
  skippedRate: string;
  sponsorshipRate: string;
}

export interface DoDRow {
  cityId: string;
  cityName: string;
  manager: string;
  sequenceMore3: string;
  sequenceMore3Pct: string;
  sequenceMore9: string;
  cheatingCouriers: string;
  activeDriverCard: string;
  expiredDriverCard: string;
  activeDriverCardPct: string;
  totalTriggers: string;
  passedRate: string;
  failedRate: string;
  skippedRate: string;
  sponsorshipRate: string;
}

export interface DashboardData {
  previousDay: MetricsRow[];
  today: MetricsRow[];
  dayOverDay: DoDRow[];
  lastUpdated: string;
}

export interface AggregatedMetrics {
  sequenceMore3: number;
  sequenceMore3Pct: number;
  sequenceMore9: number;
  cheatingCouriers: number;
  activeDriverCard: number;
  expiredDriverCard: number;
  activeDriverCardPct: number;
  totalTriggers: number;
  passedRate: number;
  failedRate: number;
  skippedRate: number;
  sponsorshipRate: number;
}

export interface CategoryData {
  title: string;
  icon: string;
  metrics: {
    label: string;
    previousDay: string | number;
    today: string | number;
    dod: string;
    isPercentage?: boolean;
  }[];
}
