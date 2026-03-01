/**
 * LiveMetricsDashboard Component (Simplified)
 * 
 * Displays static metrics with trend indicators.
 * Simplified version without real-time updates for better performance.
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

import type { LiveMetricsDashboardSection, Metric } from '../data/homepage-content';

interface LiveMetricsDashboardProps {
  section: LiveMetricsDashboardSection;
}

export default function LiveMetricsDashboard({ section }: LiveMetricsDashboardProps) {
  const { title, subtitle, metrics } = section;

  // Format metric value with appropriate precision
  const formatValue = (value: number, unit: string): string => {
    if (unit === '%') {
      return value.toFixed(1);
    } else if (value >= 1000) {
      return value.toLocaleString('vi-VN', { maximumFractionDigits: 0 });
    } else {
      return value.toFixed(0);
    }
  };

  // Get trend color class
  const getTrendColor = (trend: 'up' | 'down' | 'neutral'): string => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'neutral':
        return 'text-gray-600';
    }
  };

  // Get trend icon
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral'): string => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'neutral':
        return '→';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map(metric => (
            <MetricCard
              key={metric.id}
              metric={metric}
              formatValue={formatValue}
              getTrendColor={getTrendColor}
              getTrendIcon={getTrendIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface MetricCardProps {
  metric: Metric;
  formatValue: (value: number, unit: string) => string;
  getTrendColor: (trend: 'up' | 'down' | 'neutral') => string;
  getTrendIcon: (trend: 'up' | 'down' | 'neutral') => string;
}

function MetricCard({ metric, formatValue, getTrendColor, getTrendIcon }: MetricCardProps) {
  const { label, value, unit, trend, trendValue } = metric;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
      {/* Metric Value */}
      <div className="mb-4">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {formatValue(value, unit)}
          <span className="text-2xl ml-1">{unit}</span>
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>

      {/* Trend Indicator */}
      <div className={`flex items-center gap-2 ${getTrendColor(trend)}`}>
        <span className="text-xl font-bold">{getTrendIcon(trend)}</span>
        <span className="text-sm font-semibold">
          {trend === 'up' && 'Tăng'}
          {trend === 'down' && 'Giảm'}
          {trend === 'neutral' && 'Ổn định'}
          {trend !== 'neutral' && ` ${trendValue.toFixed(1)}%`}
        </span>
      </div>
    </div>
  );
}
