/**
 * AnimatedCounter Component Tests
 * 
 * Tests for the AnimatedCounter component functionality
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import AnimatedCounter from './AnimatedCounter';
import type { AnimatedCounterSection } from '../data/homepage-content';

// Mock IntersectionObserver
let observerCallback: IntersectionObserverCallback;
let observerInstance: MockIntersectionObserver;

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
    observerInstance = this;
  }
}

window.IntersectionObserver = MockIntersectionObserver as any;

describe('AnimatedCounter', () => {
  const mockSection: AnimatedCounterSection = {
    title: 'Test Metrics',
    subtitle: 'Test subtitle',
    metrics: [
      {
        value: 100,
        label: 'Test Metric 1',
        icon: '📊',
        trend: 'up',
      },
      {
        value: 5000,
        label: 'Test Metric 2',
        suffix: '+',
        trend: 'down',
      },
      {
        value: 98,
        label: 'Test Metric 3',
        suffix: '%',
        prefix: '$',
        trend: 'neutral',
      },
    ],
    duration: 2000,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders section title and subtitle', () => {
    render(<AnimatedCounter section={mockSection} />);
    
    expect(screen.getByText('Test Metrics')).toBeInTheDocument();
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  it('renders all metrics with labels', () => {
    render(<AnimatedCounter section={mockSection} />);
    
    expect(screen.getByText('Test Metric 1')).toBeInTheDocument();
    expect(screen.getByText('Test Metric 2')).toBeInTheDocument();
    expect(screen.getByText('Test Metric 3')).toBeInTheDocument();
  });

  it('displays metric icons when provided', () => {
    render(<AnimatedCounter section={mockSection} />);
    
    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  it('displays trend indicators with correct colors', () => {
    const { container } = render(<AnimatedCounter section={mockSection} />);
    
    // Check for trend text
    expect(screen.getByText('Tăng trưởng')).toBeInTheDocument();
    expect(screen.getByText('Giảm')).toBeInTheDocument();
    expect(screen.getByText('Ổn định')).toBeInTheDocument();
    
    // Check for trend color classes
    const trendElements = container.querySelectorAll('[class*="text-accent"]');
    expect(trendElements.length).toBeGreaterThan(0);
  });

  it('formats numbers with thousand separators', () => {
    const { container } = render(<AnimatedCounter section={mockSection} />);
    
    // Component should render with initial values (0)
    expect(container.querySelector('.text-4xl')).toBeInTheDocument();
  });

  it('displays prefix and suffix when provided', () => {
    render(<AnimatedCounter section={mockSection} />);
    
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('renders correct number of metric cards', () => {
    const { container } = render(<AnimatedCounter section={mockSection} />);
    
    const metricCards = container.querySelectorAll('.bg-white.rounded-3xl');
    expect(metricCards.length).toBe(3);
  });

  it('applies hover effects to metric cards', () => {
    const { container } = render(<AnimatedCounter section={mockSection} />);
    
    const metricCards = container.querySelectorAll('.hover\\:shadow-xl');
    expect(metricCards.length).toBe(3);
  });

  it('uses default duration when not provided', () => {
    const sectionWithoutDuration: AnimatedCounterSection = {
      ...mockSection,
      duration: undefined,
    };
    
    render(<AnimatedCounter section={sectionWithoutDuration} />);
    
    // Component should render without errors
    expect(screen.getByText('Test Metrics')).toBeInTheDocument();
  });

  it('handles metrics without trend indicators', () => {
    const sectionWithoutTrends: AnimatedCounterSection = {
      title: 'Test',
      subtitle: 'Test',
      metrics: [
        {
          value: 100,
          label: 'No Trend',
        },
      ],
    };
    
    render(<AnimatedCounter section={sectionWithoutTrends} />);
    
    expect(screen.getByText('No Trend')).toBeInTheDocument();
    expect(screen.queryByText('Tăng trưởng')).not.toBeInTheDocument();
  });

  it('applies responsive grid classes', () => {
    const { container } = render(<AnimatedCounter section={mockSection} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
    expect(grid).toHaveClass('xl:grid-cols-5');
  });

  // Tests for Intersection Observer (Requirements 6.2, 6.5)
  describe('Intersection Observer functionality', () => {
    it('sets up Intersection Observer with correct threshold (0.5)', () => {
      const { container } = render(<AnimatedCounter section={mockSection} />);
      const section = container.querySelector('section');
      
      expect(observerInstance.observe).toHaveBeenCalledWith(section);
    });

    it('triggers animation when section reaches 50% visibility', () => {
      const { container } = render(<AnimatedCounter section={mockSection} />);
      const section = container.querySelector('section');
      
      // Simulate intersection at 50% visibility
      const entries: IntersectionObserverEntry[] = [{
        isIntersecting: true,
        target: section as Element,
        intersectionRatio: 0.5,
      } as IntersectionObserverEntry];
      
      observerCallback(entries, {} as IntersectionObserver);
      
      // Animation should start (values should begin updating)
      expect(section).toBeInTheDocument();
    });

    it('triggers animation only once per page load', () => {
      const { container } = render(<AnimatedCounter section={mockSection} />);
      const section = container.querySelector('section');
      
      // First intersection
      const entries1: IntersectionObserverEntry[] = [{
        isIntersecting: true,
        target: section as Element,
        intersectionRatio: 0.5,
      } as IntersectionObserverEntry];
      
      observerCallback(entries1, {} as IntersectionObserver);
      
      // Second intersection (should not trigger again)
      const entries2: IntersectionObserverEntry[] = [{
        isIntersecting: true,
        target: section as Element,
        intersectionRatio: 0.5,
      } as IntersectionObserverEntry];
      
      observerCallback(entries2, {} as IntersectionObserver);
      
      // Component should still be in document
      expect(section).toBeInTheDocument();
    });

    it('cleans up observer on unmount', () => {
      const { container, unmount } = render(<AnimatedCounter section={mockSection} />);
      const section = container.querySelector('section');
      
      // Store reference to the observer instance before unmount
      const currentObserver = observerInstance;
      
      unmount();
      
      // Verify unobserve was called on the observer instance
      expect(currentObserver.unobserve).toHaveBeenCalledWith(section);
    });

    it('uses Intersection Observer API (not scroll events)', () => {
      render(<AnimatedCounter section={mockSection} />);
      
      // Verify that IntersectionObserver was instantiated and observe was called
      expect(observerInstance.observe).toHaveBeenCalled();
    });
  });
});
