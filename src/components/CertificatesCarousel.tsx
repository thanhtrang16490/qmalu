/**
 * CertificatesCarousel Component
 * 
 * Interactive 3D carousel for certificates with navigation and indicators.
 * Similar to Product3DCarousel with 3D transforms and smooth transitions.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Certificate {
  id: number;
  image: string;
  alt: string;
}

interface CertificatesCarouselProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  navigationHint?: string;
  screenReaderTitle?: string;
}

export default function CertificatesCarousel({
  title = 'Chất Lượng Được Chứng Nhận',
  subtitle = 'Đạt tiêu chuẩn quốc tế ISO 9001:2015, test reports đầy đủ, cam kết chất lượng dài hạn',
  badge = 'Chứng nhận & Kiểm định',
  navigationHint = 'Sử dụng phím mũi tên để điều hướng • Vuốt trên mobile',
  screenReaderTitle = 'Chứng nhận chất lượng:'
}: CertificatesCarouselProps) {
  const certificates: Certificate[] = [
    { id: 1, image: '/certificate/certificate-1.png', alt: 'Chứng nhận ISO 9001:2015' },
    { id: 2, image: '/certificate/certificate-2.png', alt: 'Test Report - Kiểm tra tải trọng' },
    { id: 3, image: '/certificate/certificate-3.png', alt: 'Giấy phép xuất khẩu' },
    { id: 4, image: '/certificate/certificate-4.png', alt: 'Chứng nhận chất lượng sản phẩm' },
    { id: 5, image: '/certificate/certificate-5.png', alt: 'Certificate of Conformity' },
    { id: 6, image: '/certificate/certificate-6.png', alt: 'Chứng nhận an toàn' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      console.log('isMobile:', mobile, 'width:', window.innerWidth);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Log activeIndex changes
  useEffect(() => {
    console.log('activeIndex changed to:', activeIndex);
  }, [activeIndex]);

  // Reset auto-rotate timer
  const resetAutoRotate = useCallback(() => {
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }
    
    if (isAutoRotating) {
      autoRotateTimerRef.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % certificates.length);
      }, 5000);
    }
  }, [isAutoRotating, certificates.length]);

  // Navigate to next certificate
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % certificates.length;
      console.log('goToNext:', prev, '->', next);
      return next;
    });
    resetAutoRotate();
  }, [certificates.length, resetAutoRotate]);

  // Navigate to previous certificate
  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + certificates.length) % certificates.length;
      console.log('goToPrevious:', prev, '->', next);
      return next;
    });
    resetAutoRotate();
  }, [certificates.length, resetAutoRotate]);

  // Navigate to specific index
  const goToIndex = useCallback((index: number) => {
    console.log('goToIndex:', activeIndex, '->', index);
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
        goToNext();
      } else {
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

  // Calculate position class for each certificate
  const getPositionClass = (index: number) => {
    let diff = index - activeIndex;
    
    if (diff > certificates.length / 2) {
      diff -= certificates.length;
    } else if (diff < -certificates.length / 2) {
      diff += certificates.length;
    }
    
    if (diff === 0) return 'active';
    if (Math.abs(diff) === 1) return 'adjacent';
    return 'far';
  };

  // Calculate transform offset for positioning
  const getTransformOffset = (index: number) => {
    let diff = index - activeIndex;
    
    if (diff > certificates.length / 2) {
      diff -= certificates.length;
    } else if (diff < -certificates.length / 2) {
      diff += certificates.length;
    }
    
    return diff * 280; // Spacing for portrait certificates
  };

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden bg-white" aria-label="Certificates carousel">
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{badge}</span>
          </div>
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
          className="relative h-[380px] md:h-[450px] mb-8"
          style={{ 
            perspective: isMobile ? 'none' : '800px', 
            perspectiveOrigin: '50% 50%' 
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label={`Certificates - ${activeIndex + 1} of ${certificates.length}`}
        >
          {/* Carousel Track */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {certificates.map((cert, index) => {
              const positionClass = getPositionClass(index);
              const transformOffset = getTransformOffset(index);
              
              // Check if this is the active card
              const isActive = index === activeIndex;
              
              // Simpler transforms for mobile, full 3D for desktop
              let scale = 0.75;
              let translateZ = -100;
              let opacity = 0.5;
              
              if (isMobile) {
                // Mobile: Stack all cards in center, only show active
                if (isActive) {
                  scale = 1;
                  translateZ = 0;
                  opacity = 1;
                } else {
                  scale = 0.9;
                  translateZ = 0;
                  opacity = 0;
                }
              } else {
                // Desktop: Full 3D effect
                if (positionClass === 'active') {
                  scale = 1;
                  translateZ = 0;
                  opacity = 1;
                } else if (positionClass === 'adjacent') {
                  scale = 0.88;
                  translateZ = -60;
                  opacity = 0.75;
                } else {
                  scale = 0.75;
                  translateZ = -100;
                  opacity = 0.5;
                }
              }
              
              return (
                <div
                  key={cert.id}
                  className={`certificate-carousel-card ${positionClass}`}
                  style={{
                    position: 'absolute',
                    width: isMobile ? '280px' : '240px',
                    height: '320px',
                    left: '50%',
                    top: '50%',
                    marginLeft: isMobile ? '-140px' : '0',
                    marginTop: '-160px',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    transition: 'all 700ms cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: isMobile 
                      ? `scale(${scale})`
                      : `translateX(${transformOffset}px) translateZ(${translateZ}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: isActive ? 10 : 1,
                    pointerEvents: isActive ? 'auto' : 'none',
                    visibility: isMobile && !isActive ? 'hidden' : 'visible',
                  }}
                  role="group"
                  aria-label={`Slide ${index + 1} of ${certificates.length}`}
                  aria-roledescription="slide"
                  aria-hidden={!isActive}
                >
                  {/* Certificate Card */}
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden h-full border border-gray-200">
                    <div className="relative h-full bg-gradient-to-br from-gray-50 to-white p-4 flex items-center justify-center">
                      <img
                        src={cert.image}
                        alt={cert.alt}
                        className="w-full h-full object-contain"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg md:shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label="Previous certificate"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg md:shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label="Next certificate"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Carousel Indicators */}
        <div
          className="flex justify-center items-center gap-2 mt-8"
          role="tablist"
          aria-label="Certificate navigation"
        >
          {certificates.map((cert, index) => (
            <button
              key={cert.id}
              onClick={() => goToIndex(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                index === activeIndex
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to ${cert.alt}`}
              aria-controls={`slide-${index}`}
            />
          ))}
        </div>

        {/* Keyboard Navigation Hint */}
        <p className="text-center text-sm text-gray-500 mt-4 hidden md:block">
          {navigationHint}
        </p>

        {/* Accessibility: Screen reader only text */}
        <div className="sr-only">
          <h3>{screenReaderTitle}</h3>
          <ul>
            {certificates.map((cert) => (
              <li key={cert.id}>{cert.alt}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* CSS for screen reader only */}
      <style>{`
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
