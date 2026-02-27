/**
 * LiveMetricsDashboard Component
 * 
 * Displays real-time or recent metrics with trend indicators and sparkline charts.
 * Updates at regular intervals with smooth value transitions.
 * 
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7
 */

import React, { useState, useEffect, useRef } from 'react';
import type { LiveMetricsDashboardSection, Metric } from '../data/homepage-content';

interface LiveMetricsDashboardProps {
  section: LiveMetricsDashboardSection;
}

export default function LiveMetricsDashboard({ section }: LiveMetricsDashboardProps) {
  const { title, subtitle, metrics: initialMetrics, updateInterval = 5000 } = section;
  const [metrics, setMetrics] = useState<Metric[]>(initialMetrics);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate metric updates with random data
  const updateMetrics = () => {
    setIsLoading(true);
    setError(null);

    try {
      setMetrics(prevMetrics =>
        prevMetrics.map(metric => {
          // Simulate value change (±5% variation)
          const variation = (Math.random() - 0.5) * 0.1;
          const newValue = Math.max(0, metric.value * (1 + variation));
          
          // Calculate trend
          const diff = newValue - metric.value;
          const trendValue = (diff / metric.value) * 100;
          let trend: 'up' | 'down' | 'neutral' = 'neutral';
          
          if (Math.abs(trendValue) > 0.5) {
            trend = trendValue > 0 ? 'up' : 'down';
          }

          // Update sparkline data
          const newSparklineData = metric.sparklineData
            ? [...metric.sparklineData.slice(1), newValue]
            : [newValue];

          return {
            ...metric,
            value: newValue,
            trend,
            trendValue: Math.abs(trendValue),
            sparklineData: newSparklineData,
          };
        })
      );
      setIsLoading(false);
    } catch (err) {
      setError('Failed to update metrics');
      setIsLoading(false);
    }
  };

  // Set up update interval
  useEffect(() => {
    intervalRef.current = setInterval(updateMetrics, updateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateInterval]);

  // Format metric value with appropriate precision
  const formatValue = (value: number, unit: string): string => {
    if (unit === '%') {
      return value.toFixed(1);
    } else if (value >= 1000) {
      return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
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

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-8">{subtitle}</p>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              isLoading={isLoading}
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
  isLoading: boolean;
}

function MetricCard({ metric, formatValue, getTrendColor, getTrendIcon, isLoading }: MetricCardProps) {
  const { label, value, unit, trend, trendValue, sparklineData } = metric;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
      {/* Metric Value */}
      <div className="mb-4">
        <div
          className="text-4xl font-bold text-gray-900 mb-2 transition-all duration-300"
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          {formatValue(value, unit)}
          <span className="text-2xl ml-1">{unit}</span>
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>

      {/* Trend Indicator */}
      <div className={`flex items-center gap-2 mb-4 ${getTrendColor(trend)}`}>
        <span className="text-xl font-bold">{getTrendIcon(trend)}</span>
        <span className="text-sm font-semibold">
          {trend === 'up' && 'Tăng'}
          {trend === 'down' && 'Giảm'}
          {trend === 'neutral' && 'Ổn định'}
          {trend !== 'neutral' && ` ${trendValue.toFixed(1)}%`}
        </span>
      </div>

      {/* Sparkline Chart */}
      {sparklineData && sparklineData.length > 0 && (
        <Sparkline data={sparklineData} trend={trend} />
      )}
    </div>
  );
}

interface SparklineProps {
  data: number[];
  trend: 'up' | 'down' | 'neutral';
}

function Sparkline({ data, trend }: SparklineProps) {
  const width = 60;
  const height = 24;
  const padding = 2;

  if (data.length < 2) {
    return <div className="h-6" />;
  }

  // Calculate min and max for scaling
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Generate SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  // Get gradient color based on trend
  const getGradientColor = () => {
    switch (trend) {
      case 'up':
        return { start: '#10b981', end: '#10b98120' };
      case 'down':
        return { start: '#ef4444', end: '#ef444420' };
      case 'neutral':
        return { start: '#6b7280', end: '#6b728020' };
    }
  };

  const { start, end } = getGradientColor();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      aria-label="Sparkline chart"
    >
      <defs>
        <linearGradient id={`gradient-${trend}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={start} stopOpacity="0.8" />
          <stop offset="100%" stopColor={end} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Area fill */}
      <path
        d={areaD}
        fill={`url(#gradient-${trend})`}
        className="transition-all duration-300"
      />
      
      {/* Line stroke */}
      <path
        d={pathD}
        fill="none"
        stroke={start}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />
    </svg>
  );
}
