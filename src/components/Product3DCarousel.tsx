/**
 * Product3DCarousel Component
 * 
 * Interactive 3D carousel for product exploration with depth and perspective.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8
 * 
 * Features:
 * - 3D transforms with perspective (1200px) and preserve-3d
 * - Center item: scale 1.1, translateZ 0
 * - Adjacent items: scale 0.9, translateZ -100px
 * - Far items: scale 0.7, translateZ -200px
 * - Click/tap navigation with ARIA labels
 * - Swipe gesture detection (50px threshold)
 * - Keyboard navigation (arrow keys)
 * - Auto-rotate after 5s inactivity
 * - Smooth transitions (700ms expo-out easing)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Product3DCarouselSection } from '../data/homepage-content';

interface Product3DCarouselProps {
  section: Product3DCarouselSection;
}

export default function Product3DCarousel({ section }: Product3DCarouselProps) {
  const { title, subtitle, products, autoRotateInterval = 5000 } = section;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Reset auto-rotate timer
  const resetAutoRotate = useCallback(() => {
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }
    
    if (isAutoRotating) {
      autoRotateTimerRef.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % products.length);
      }, autoRotateInterval);
    }
  }, [isAutoRotating, autoRotateInterval, products.length]);

  // Navigate to next product
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % products.length);
    resetAutoRotate();
  }, [products.length, resetAutoRotate]);

  // Navigate to previous product
  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    resetAutoRotate();
  }, [products.length, resetAutoRotate]);

  // Navigate to specific index
  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
    resetAutoRotate();
  }, [resetAutoRotate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Handle touch/swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swiped left - go to next
        goToNext();
      } else {
        // Swiped right - go to previous
        goToPrevious();
      }
    }
  };

  // Auto-rotate effect
  useEffect(() => {
    resetAutoRotate();
    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, [resetAutoRotate]);

  // Pause auto-rotate on hover
  const handleMouseEnter = () => {
    setIsAutoRotating(false);
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoRotating(true);
    resetAutoRotate();
  };

  // Calculate position class for each product
  const getPositionClass = (index: number) => {
    let diff = index - activeIndex;
    
    // Normalize difference to handle circular array
    if (diff > products.length / 2) {
      diff -= products.length;
    } else if (diff < -products.length / 2) {
      diff += products.length;
    }
    
    if (diff === 0) return 'active';
    if (Math.abs(diff) === 1) return 'adjacent';
    return 'far';
  };

  // Calculate transform offset for positioning
  const getTransformOffset = (index: number) => {
    let diff = index - activeIndex;
    
    // Normalize difference to handle circular array
    if (diff > products.length / 2) {
      diff -= products.length;
    } else if (diff < -products.length / 2) {
      diff += products.length;
    }
    
    return diff * 320; // 320px spacing between cards
  };

  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      aria-label="Product showcase carousel"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div
          ref={containerRef}
          className="relative h-[500px] md:h-[600px]"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${title} - ${activeIndex + 1} of ${products.length}`}
        >
          {/* Carousel Track */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {products.map((product, index) => {
              const positionClass = getPositionClass(index);
              const transformOffset = getTransformOffset(index);
              
              // Determine scale and translateZ based on position
              let scale = 0.7;
              let translateZ = -200;
              
              if (positionClass === 'active') {
                scale = 1.1;
                translateZ = 0;
              } else if (positionClass === 'adjacent') {
                scale = 0.9;
                translateZ = -100;
              }
              
              return (
                <div
                  key={product.id}
                  className={`carousel-card ${positionClass}`}
                  style={{
                    position: 'absolute',
                    width: '280px',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    transition: 'all 700ms cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: `translateX(${transformOffset}px) translateZ(${translateZ}px) scale(${scale})`,
                    opacity: positionClass === 'active' ? 1 : positionClass === 'adjacent' ? 0.7 : 0.4,
                    zIndex: positionClass === 'active' ? 10 : positionClass === 'adjacent' ? 5 : 1,
                    pointerEvents: positionClass === 'active' ? 'auto' : 'none',
                  }}
                  role="group"
                  aria-label={`Slide ${index + 1} of ${products.length}`}
                  aria-roledescription="slide"
                  aria-hidden={positionClass !== 'active'}
                >
                  {/* Product Card */}
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-1">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-500 flex items-start">
                            <span className="text-primary-600 mr-2">•</span>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-600/30"
            aria-label="Previous product"
            aria-controls="carousel-track"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-600/30"
            aria-label="Next product"
            aria-controls="carousel-track"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Carousel Indicators */}
        <div
          className="flex justify-center items-center gap-2 mt-8"
          role="tablist"
          aria-label="Product navigation"
        >
          {products.map((product, index) => (
            <button
              key={product.id}
              onClick={() => goToIndex(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 ${
                index === activeIndex
                  ? 'w-8 h-2 bg-primary-600'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to ${product.name}`}
              aria-controls={`slide-${index}`}
            />
          ))}
        </div>

        {/* Keyboard Navigation Hint */}
        <p className="text-center text-sm text-gray-500 mt-4 hidden md:block">
          Use arrow keys to navigate • Swipe on mobile
        </p>
      </div>
    </section>
  );
}
