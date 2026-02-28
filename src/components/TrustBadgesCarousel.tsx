/**
 * TrustBadgesCarousel Component
 * 
 * Infinite auto-scrolling carousel displaying partner logos and certifications.
 * Features seamless loop, pause on hover, and grayscale-to-color transition.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7
 */

import React, { useState } from 'react';
import type { TrustBadgesCarouselSection } from '../data/homepage-content';

interface TrustBadgesCarouselProps {
  section: TrustBadgesCarouselSection;
}

export default function TrustBadgesCarousel({ section }: TrustBadgesCarouselProps) {
  const { title, subtitle, badges } = section;
  const [isPaused, setIsPaused] = useState(false);

  // Triple the badges for seamless infinite loop
  const triplicatedBadges = [...badges, ...badges, ...badges];

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
          <div className="carousel-track-wrapper">
            <div
              className={`carousel-track ${isPaused ? 'paused' : ''}`}
            >
              {triplicatedBadges.map((badge, index) => (
                <div
                  key={`${badge.id}-${index}`}
                  className="carousel-item"
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
        .carousel-track-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .carousel-track {
          display: flex;
          gap: 2rem;
          width: fit-content;
          animation: scroll-infinite 40s linear infinite;
        }

        @media (min-width: 768px) {
          .carousel-track {
            gap: 3rem;
          }
        }

        .carousel-track.paused {
          animation-play-state: paused;
        }

        .carousel-item {
          flex-shrink: 0;
          width: 8rem;
          height: 8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        @media (min-width: 768px) {
          .carousel-item {
            width: 10rem;
            height: 10rem;
            padding: 1.5rem;
          }
        }

        .carousel-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
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

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .carousel-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
