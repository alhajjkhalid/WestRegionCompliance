'use client';

import { MetricsRow } from '@/lib/types';
import ProgressBar from './ProgressBar';

interface CityOverviewProps {
  data: MetricsRow[];
}

interface CityMetrics {
  cityName: string;
  totalCouriers: number;
  problemScore: number;
  issues: {
    type: string;
    severity: 'high' | 'medium' | 'low';
    description: string;
    value: string;
  }[];
  metrics: MetricsRow;
}

export default function CityOverview({ data }: CityOverviewProps) {
  const analyzeCityMetrics = (cityData: MetricsRow[]): CityMetrics[] => {
    const cityMap = new Map<string, MetricsRow[]>();

    cityData.forEach(row => {
      if (!cityMap.has(row.cityName)) {
        cityMap.set(row.cityName, []);
      }
      cityMap.get(row.cityName)!.push(row);
    });

    const cityMetrics: CityMetrics[] = [];

    cityMap.forEach((rows, cityName) => {
      const aggregated: MetricsRow = {
        cityId: rows[0].cityId,
        cityName: cityName,
        manager: rows.map(r => r.manager).join(', '),
        sequenceMore3: rows.reduce((sum, r) => sum + r.sequenceMore3, 0),
        sequenceMore3Pct: '0%',
        sequenceMore9: rows.reduce((sum, r) => sum + r.sequenceMore9, 0),
        cheatingCouriers: rows.reduce((sum, r) => sum + r.cheatingCouriers, 0),
        activeDriverCard: rows.reduce((sum, r) => sum + r.activeDriverCard, 0),
        expiredDriverCard: rows.reduce((sum, r) => sum + r.expiredDriverCard, 0),
        activeDriverCardPct: '0%',
        totalTriggers: rows.reduce((sum, r) => sum + r.totalTriggers, 0),
        passedRate: '0%',
        failedRate: '0%',
        skippedRate: '0%',
        sponsorshipRate: '0%',
      };

      const totalDriverCards = aggregated.activeDriverCard + aggregated.expiredDriverCard;
      aggregated.activeDriverCardPct = totalDriverCards > 0
        ? `${((aggregated.activeDriverCard / totalDriverCards) * 100).toFixed(2)}%`
        : '0%';

      const sponsorshipRates = rows.map(r => parseFloat(r.sponsorshipRate.replace('%', '')));
      const avgSponsorship = sponsorshipRates.reduce((a, b) => a + b, 0) / sponsorshipRates.length;
      aggregated.sponsorshipRate = `${avgSponsorship.toFixed(2)}%`;

      const issues: CityMetrics['issues'] = [];
      let problemScore = 0;

      if (aggregated.cheatingCouriers > 0) {
        issues.push({
          type: 'Cheating Detected',
          severity: 'high',
          description: 'Active cheating cases',
          value: aggregated.cheatingCouriers.toString()
        });
        problemScore += aggregated.cheatingCouriers * 10;
      }

      if (aggregated.expiredDriverCard > 5) {
        issues.push({
          type: 'Expired Driver Cards',
          severity: 'high',
          description: 'Cards need renewal',
          value: aggregated.expiredDriverCard.toString()
        });
        problemScore += aggregated.expiredDriverCard * 2;
      }

      if (aggregated.sequenceMore9 > 0) {
        issues.push({
          type: 'High Sequence Numbers',
          severity: 'medium',
          description: 'Sequences > 9',
          value: aggregated.sequenceMore9.toString()
        });
        problemScore += aggregated.sequenceMore9 * 3;
      }

      const sponsorshipValue = parseFloat(aggregated.sponsorshipRate.replace('%', ''));
      if (sponsorshipValue < 90) {
        issues.push({
          type: 'Low Sponsorship',
          severity: sponsorshipValue < 80 ? 'high' : 'medium',
          description: 'Below 90% target',
          value: aggregated.sponsorshipRate
        });
        problemScore += (90 - sponsorshipValue) * 2;
      }

      if (aggregated.sequenceMore3 > 10) {
        issues.push({
          type: 'Sequence Violations',
          severity: 'medium',
          description: 'Sequences > 3',
          value: aggregated.sequenceMore3.toString()
        });
        problemScore += aggregated.sequenceMore3;
      }

      cityMetrics.push({
        cityName,
        totalCouriers: totalDriverCards,
        problemScore,
        issues: issues.sort((a, b) => {
          const severityOrder = { high: 0, medium: 1, low: 2 };
          return severityOrder[a.severity] - severityOrder[b.severity];
        }),
        metrics: aggregated
      });
    });

    return cityMetrics.sort((a, b) => b.problemScore - a.problemScore);
  };

  const cityMetrics = analyzeCityMetrics(data);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-900/30 border-red-500';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500';
      case 'low': return 'text-blue-400 bg-blue-900/30 border-blue-500';
      default: return 'text-slate-400 bg-slate-800/30 border-slate-500';
    }
  };

  const getHealthStatus = (score: number) => {
    if (score === 0) return { status: 'Excellent', color: 'text-green-400', icon: '✓' };
    if (score < 20) return { status: 'Good', color: 'text-blue-400', icon: 'ℹ' };
    if (score < 50) return { status: 'Needs Attention', color: 'text-yellow-400', icon: '⚠' };
    return { status: 'Critical', color: 'text-red-400', icon: '⛔' };
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-100 mb-4">City Overview - Problem Analysis</h2>
      <p className="text-slate-400 mb-6">Quick snapshot of compliance issues by city for management review</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {cityMetrics.map((city) => {
          const health = getHealthStatus(city.problemScore);
          return (
            <div
              key={city.cityName}
              className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{city.cityName}</h3>
                  <p className="text-sm text-slate-400">{city.totalCouriers} Total Couriers</p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/50 ${health.color}`}>
                  <span className="text-xl">{health.icon}</span>
                  <span className="font-semibold text-sm">{health.status}</span>
                </div>
              </div>

              {city.issues.length > 0 ? (
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Issues Detected</p>
                  {city.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-lg p-3 ${getSeverityColor(issue.severity)}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-sm">{issue.type}</span>
                        <span className="text-lg font-bold">{issue.value}</span>
                      </div>
                      <p className="text-xs opacity-80">{issue.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
                  <p className="text-green-400 text-sm font-semibold text-center">
                    ✓ No compliance issues detected
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-3 border-t border-slate-700">
                <ProgressBar
                  value={city.metrics.activeDriverCard}
                  max={city.totalCouriers}
                  color="green"
                  label="Active Cards"
                />
                <ProgressBar
                  value={parseFloat(city.metrics.sponsorshipRate.replace('%', ''))}
                  max={100}
                  color={parseFloat(city.metrics.sponsorshipRate.replace('%', '')) > 90 ? 'green' : 'yellow'}
                  label="Sponsorship Rate"
                  showLabel={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
