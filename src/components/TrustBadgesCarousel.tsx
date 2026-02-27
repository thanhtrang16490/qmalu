/**
 * TrustBadgesCarousel Component
 * 
 * Infinite auto-scrolling carousel displaying partner logos and certifications.
 * Features seamless loop, pause on hover, and grayscale-to-color transition.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7
 */

import React, { useEffect, useRef, useState } from 'react';
import type { TrustBadgesCarouselSection } from '../data/homepage-content';

interface TrustBadgesCarouselProps {
  section: TrustBadgesCarouselSection;
}

export default function TrustBadgesCarousel({ section }: TrustBadgesCarouselProps) {
  const { title, subtitle, badges, speed = 50 } = section;
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);

  // Duplicate badges array for seamless infinite loop
  const duplicatedBadges = [...badges, ...badges];

  useEffect(() => {
    // Calculate animation duration based on content width and speed
    // Speed is in pixels per second, we need to move 50% of the track (since duplicated)
    if (trackRef.current) {
      const trackWidth = trackRef.current.scrollWidth / 2; // Half because duplicated
      const calculatedDuration = trackWidth / speed; // Duration in seconds
      setDuration(calculatedDuration);
    }
  }, [badges, speed]);

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div
            ref={trackRef}
            className="flex gap-8 md:gap-12"
            style={{
              animationName: duration > 0 ? 'scroll' : 'none',
              animationDuration: duration > 0 ? `${duration}s` : '0s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedBadges.map((badge, index) => (
              <div
                key={`${badge.id}-${index}`}
                className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center p-4 md:p-6 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <img
                  src={badge.logo}
                  alt={badge.name}
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility: Screen reader only text */}
        <div className="sr-only">
          <h3>Đối tác và chứng nhận:</h3>
          <ul>
            {badges.map((badge) => (
              <li key={badge.id}>
                {badge.name} - {badge.type === 'partner' ? 'Đối tác' : 'Chứng nhận'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Screen reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </section>
  );
}
