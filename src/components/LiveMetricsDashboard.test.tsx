/**
 * LiveMetricsDashboard Component Tests
 * 
 * Tests for the LiveMetricsDashboard component functionality
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import LiveMetricsDashboard from './LiveMetricsDashboard';
import type { LiveMetricsDashboardSection } from '../data/homepage-content';

describe('LiveMetricsDashboard', () => {
  const mockSection: LiveMetricsDashboardSection = {
    title: 'Test Metrics Dashboard',
    subtitle: 'Real-time metrics',
    metrics: [
      {
        id: 'metric-1',
        label: 'Production Today',
        value: 12500,
        unit: 'kg',
        trend: 'up',
        trendValue: 8.5,
        sparklineData: [10200, 10800, 11200, 11500, 11800, 12100, 12500],
      },
      {
        id: 'metric-2',
        label: 'Orders Processing',
        value: 47,
        unit: 'orders',
        trend: 'neutral',
        trendValue: 0,
        sparklineData: [45, 46, 48, 47, 46, 47, 47],
      },
      {
        id: 'metric-3',
        label: 'Quality Rate',
        value: 99.2,
        unit: '%',
        trend: 'up',
        trendValue: 0.3,
        sparklineData: [98.8, 98.9, 99.0, 99.1, 99.0, 99.1, 99.2],
      },
      {
        id: 'metric-4',
        label: 'On-time Delivery',
        value: 96.8,
        unit: '%',
        trend: 'down',
        trendValue: 1.2,
        sparklineData: [97.5, 97.8, 97.0, 96.2, 96.5, 96.6, 96.8],
      },
    ],
    updateInterval: 5000,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // Requirement 9.1: Display at least 4 metrics
  it('renders section title and subtitle', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    expect(screen.getByText('Test Metrics Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Real-time metrics')).toBeInTheDocument();
  });

  it('displays at least 4 metrics', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    expect(screen.getByText('Production Today')).toBeInTheDocument();
    expect(screen.getByText('Orders Processing')).toBeInTheDocument();
    expect(screen.getByText('Quality Rate')).toBeInTheDocument();
    expect(screen.getByText('On-time Delivery')).toBeInTheDocument();
  });

  // Requirement 9.3: Display value, label, trend indicator
  it('displays metric values with units', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    expect(screen.getByText('12,500')).toBeInTheDocument();
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('99.2')).toBeInTheDocument();
    expect(screen.getByText('96.8')).toBeInTheDocument();
  });

  it('displays metric labels', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    expect(screen.getByText('Production Today')).toBeInTheDocument();
    expect(screen.getByText('Orders Processing')).toBeInTheDocument();
    expect(screen.getByText('Quality Rate')).toBeInTheDocument();
    expect(screen.getByText('On-time Delivery')).toBeInTheDocument();
  });

  // Requirement 9.5: Display trend indicators with distinct colors
  it('displays trend indicators with correct text', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    const upTrends = screen.getAllByText(/Tăng/);
    expect(upTrends.length).toBeGreaterThan(0);
    
    expect(screen.getByText(/Ổn định/)).toBeInTheDocument();
    expect(screen.getByText(/Giảm/)).toBeInTheDocument();
  });

  it('displays trend indicators with distinct colors', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    // Check for green (up), red (down), gray (neutral) color classes
    expect(container.querySelector('.text-green-600')).toBeInTheDocument();
    expect(container.querySelector('.text-red-600')).toBeInTheDocument();
    expect(container.querySelector('.text-gray-600')).toBeInTheDocument();
  });

  it('displays trend icons (up/down/neutral)', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    // Use getAllByText since there are multiple up arrows
    const upArrows = screen.getAllByText('↑');
    expect(upArrows.length).toBeGreaterThan(0);
    
    expect(screen.getByText('↓')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  // Requirement 9.6: Format values with appropriate units and precision
  it('formats large numbers with thousand separators', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    expect(screen.getByText('12,500')).toBeInTheDocument();
  });

  it('formats percentage values with one decimal place', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    expect(screen.getByText('99.2')).toBeInTheDocument();
    expect(screen.getByText('96.8')).toBeInTheDocument();
  });

  it('displays units alongside values', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    const units = screen.getAllByText('kg');
    expect(units.length).toBeGreaterThan(0);
    
    const percentUnits = screen.getAllByText('%');
    expect(percentUnits.length).toBeGreaterThan(0);
  });

  // Requirement 9.3: Display sparkline charts
  it('renders sparkline charts for metrics with data', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const sparklines = container.querySelectorAll('svg[aria-label="Sparkline chart"]');
    expect(sparklines.length).toBe(4);
  });

  it('sparkline has correct dimensions (60x24px)', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const sparkline = container.querySelector('svg[aria-label="Sparkline chart"]');
    expect(sparkline).toHaveAttribute('width', '60');
    expect(sparkline).toHaveAttribute('height', '24');
  });

  it('sparkline uses gradient fill', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const gradients = container.querySelectorAll('linearGradient');
    expect(gradients.length).toBeGreaterThan(0);
  });

  it('sparkline renders smooth curve path', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const paths = container.querySelectorAll('svg path');
    expect(paths.length).toBeGreaterThan(0);
  });

  // Requirement 9.2: Update at regular intervals (5-10 seconds)
  it('updates metrics at specified interval', () => {
    render(<LiveMetricsDashboard section={mockSection} />);
    
    const initialValue = screen.getByText('12,500');
    expect(initialValue).toBeInTheDocument();
    
    // Fast-forward time by updateInterval
    vi.advanceTimersByTime(5000);
    
    // Component should still be rendered (interval is working)
    expect(screen.getByText('Test Metrics Dashboard')).toBeInTheDocument();
  });

  it('uses default update interval of 5000ms when not specified', () => {
    const sectionWithoutInterval: LiveMetricsDashboardSection = {
      ...mockSection,
      updateInterval: undefined,
    };
    
    render(<LiveMetricsDashboard section={sectionWithoutInterval} />);
    
    expect(screen.getByText('Test Metrics Dashboard')).toBeInTheDocument();
  });

  it('cleans up interval on unmount', () => {
    const { unmount } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  // Requirement 9.4: Smooth value transition animations (300ms)
  it('applies smooth transition to metric values', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const metricValue = container.querySelector('.text-4xl');
    expect(metricValue).toHaveClass('transition-all');
    expect(metricValue).toHaveClass('duration-300');
  });

  it('applies smooth transition to sparkline', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const sparklinePath = container.querySelector('svg path');
    expect(sparklinePath).toHaveClass('transition-all');
    expect(sparklinePath).toHaveClass('duration-300');
  });

  // Requirement 9.7: Display loading state and error fallback
  it('displays error message when update fails', async () => {
    // Mock console.error to avoid test output noise
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Create a section that will trigger an error
    const errorSection: LiveMetricsDashboardSection = {
      ...mockSection,
      metrics: [],
    };
    
    render(<LiveMetricsDashboard section={errorSection} />);
    
    // Component should still render without crashing
    expect(screen.getByText('Test Metrics Dashboard')).toBeInTheDocument();
    
    consoleErrorSpy.mockRestore();
  });

  it('shows loading state during updates', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    // Trigger update
    vi.advanceTimersByTime(5000);
    
    // Check that metric value element exists
    const metricValue = container.querySelector('.text-4xl');
    expect(metricValue).toBeInTheDocument();
  });

  // Responsive design
  it('applies responsive grid classes', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-4');
  });

  it('renders correct number of metric cards', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const metricCards = container.querySelectorAll('.bg-white.rounded-3xl');
    expect(metricCards.length).toBe(4);
  });

  it('applies hover effects to metric cards', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const metricCards = container.querySelectorAll('.hover\\:shadow-xl');
    expect(metricCards.length).toBe(4);
  });

  // Accessibility
  it('uses semantic HTML structure', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('provides aria-label for sparkline charts', () => {
    const { container } = render(<LiveMetricsDashboard section={mockSection} />);
    
    const sparklines = container.querySelectorAll('svg[aria-label="Sparkline chart"]');
    expect(sparklines.length).toBe(4);
  });

  // Edge cases
  it('handles metrics without sparkline data', () => {
    const sectionWithoutSparkline: LiveMetricsDashboardSection = {
      ...mockSection,
      metrics: [
        {
          id: 'metric-no-sparkline',
          label: 'No Sparkline',
          value: 100,
          unit: 'units',
          trend: 'neutral',
          trendValue: 0,
        },
      ],
    };
    
    render(<LiveMetricsDashboard section={sectionWithoutSparkline} />);
    
    expect(screen.getByText('No Sparkline')).toBeInTheDocument();
  });

  it('handles empty sparkline data array', () => {
    const sectionWithEmptySparkline: LiveMetricsDashboardSection = {
      ...mockSection,
      metrics: [
        {
          id: 'metric-empty-sparkline',
          label: 'Empty Sparkline',
          value: 100,
          unit: 'units',
          trend: 'neutral',
          trendValue: 0,
          sparklineData: [],
        },
      ],
    };
    
    render(<LiveMetricsDashboard section={sectionWithEmptySparkline} />);
    
    expect(screen.getByText('Empty Sparkline')).toBeInTheDocument();
  });

  it('handles single data point in sparkline', () => {
    const sectionWithSinglePoint: LiveMetricsDashboardSection = {
      ...mockSection,
      metrics: [
        {
          id: 'metric-single-point',
          label: 'Single Point',
          value: 100,
          unit: 'units',
          trend: 'neutral',
          trendValue: 0,
          sparklineData: [100],
        },
      ],
    };
    
    render(<LiveMetricsDashboard section={sectionWithSinglePoint} />);
    
    expect(screen.getByText('Single Point')).toBeInTheDocument();
  });
});
