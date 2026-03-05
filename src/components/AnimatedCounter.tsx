/**
 * AnimatedCounter Component
 * 
 * Displays key metrics with animated count-up effect when entering viewport.
 * 
 * Requirements: 6.1, 6.3, 6.4, 6.6, 6.7
 * 
 * Features:
 * - Count-up animation using requestAnimationFrame
 * - Cubic easing function (starts fast, decelerates)
 * - 2000ms animation duration
 * - Number formatting with separators (commas)
 * - Trend indicators with colors (up: green, down: red, neutral: gray)
 * - Intersection Observer to trigger animation once
 */

import React, { useEffect, useRef, useState } from 'react';
import type { AnimatedCounterSection } from '../data/homepage-content';

interface AnimatedCounterProps {
  section: AnimatedCounterSection;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ section }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    section.metrics.map(() => 0)
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrameIds = useRef<number[]>([]);

  // Cubic easing function: starts fast, decelerates
  const cubicEasing = (t: number): number => {
    return t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  // Format number with thousand separators
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(Math.floor(value));
  };

  // Animate a single counter value
  const animateValue = (
    index: number,
    start: number,
    end: number,
    duration: number
  ) => {
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = cubicEasing(progress);
      const current = start + (end - start) * easedProgress;

      setAnimatedValues((prev) => {
        const newValues = [...prev];
        newValues[index] = current;
        return newValues;
      });

      if (progress < 1) {
        animationFrameIds.current[index] = requestAnimationFrame(update);
      }
    };

    animationFrameIds.current[index] = requestAnimationFrame(update);
  };

  // Set up Intersection Observer
  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible]);

  // Start animations when visible
  useEffect(() => {
    if (isVisible) {
      const duration = section.duration || 2000;

      section.metrics.forEach((metric, index) => {
        animateValue(index, 0, metric.value, duration);
      });
    }

    // Cleanup animation frames on unmount
    return () => {
      animationFrameIds.current.forEach((id) => {
        if (id) cancelAnimationFrame(id);
      });
    };
  }, [isVisible, section.metrics, section.duration]);

  // Get trend indicator color
  const getTrendColor = (trend?: 'up' | 'down' | 'neutral'): string => {
    switch (trend) {
      case 'up':
        return 'text-accent-green-500';
      case 'down':
        return 'text-accent-red-500';
      case 'neutral':
      default:
        return 'text-gray-400';
    }
  };

  // Get trend indicator icon
  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral'): string => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'neutral':
      default:
        return '→';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        {/* Metrics Grid - 4 columns on desktop, 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {section.metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-normal hover:-translate-y-2"
            >
              {/* Icon */}
              {metric.icon && (
                <div className="text-4xl md:text-5xl mb-4 text-center">{metric.icon}</div>
              )}

              {/* Value with prefix/suffix */}
              <div className="flex items-baseline justify-center mb-2">
                {metric.prefix && (
                  <span className="text-2xl md:text-3xl font-semibold text-primary-600 mr-1">
                    {metric.prefix}
                  </span>
                )}
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  {formatNumber(animatedValues[index])}
                </span>
                {metric.suffix && (
                  <span className="text-2xl md:text-3xl font-semibold text-primary-600 ml-1">
                    {metric.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-sm md:text-base text-gray-600 text-center mb-3">
                {metric.label}
              </p>

              {/* Trend Indicator */}
              {metric.trend && (
                <div
                  className={`flex items-center justify-center text-sm font-medium ${getTrendColor(
                    metric.trend
                  )}`}
                >
                  <span className="text-lg mr-1">{getTrendIcon(metric.trend)}</span>
                  <span>
                    {metric.trend === 'up' && 'Tăng trưởng'}
                    {metric.trend === 'down' && 'Giảm'}
                    {metric.trend === 'neutral' && 'Ổn định'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedCounter;
