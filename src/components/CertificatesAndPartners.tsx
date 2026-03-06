/**
 * CertificatesAndPartners Component
 * 
 * Combined component displaying certificates carousel on top and partners logos scrolling below.
 * Features scroll-driven animation for partners and 3D carousel for certificates.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { TrustBadgesCarouselSection } from '../data/homepage-content';

interface Certificate {
  id: number;
  image: string;
  alt: string;
}

interface CertificatesAndPartnersProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  partnersSection: TrustBadgesCarouselSection;
}

export default function CertificatesAndPartners({
  title = 'Chứng nhận & Đối tác',
  subtitle = 'Đạt tiêu chuẩn quốc tế ISO 9001:2015, test reports đầy đủ, cam kết chất lượng dài hạn',
  badge = 'Chứng nhận & Đối tác',
  partnersSection
}: CertificatesAndPartnersProps) {
  const certificates: Certificate[] = [
    { id: 1, image: '/certificate/certificate-1.png', alt: 'Chứng nhận ISO 9001:2015' },
    { id: 2, image: '/certificate/certificate-2.png', alt: 'Test Report - Kiểm tra tải trọng' },
    { id: 3, image: '/certificate/certificate-3.png', alt: 'Giấy phép xuất khẩu' },
    { id: 4, image: '/certificate/certificate-4.png', alt: 'Chứng nhận chất lượng sản phẩm' },
    { id: 5, image: '/certificate/certificate-5.png', alt: 'Certificate of Conformity' },
    { id: 6, image: '/certificate/certificate-6.png', alt: 'Chứng nhận an toàn' },
  ];

  // Certificates carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Partners scroll state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPartnersPaused, setIsPartnersPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { badges } = partnersSection;
  
  // Mobile optimization: Limit certificates and partners
  const displayCertificates = isMobile ? certificates.slice(0, 3) : certificates;
  const displayBadges = isMobile ? badges.slice(0, 8) : badges;
  
  // Split badges into two equal rows
  const halfLength = Math.ceil(displayBadges.length / 2);
  const row1Badges = displayBadges.slice(0, halfLength);
  const row2Badges = displayBadges.slice(halfLength);
  
  // Triplicate each row for seamless loop
  const triplicatedRow1 = [...row1Badges, ...row1Badges, ...row1Badges];
  const triplicatedRow2 = [...row2Badges, ...row2Badges, ...row2Badges];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Partners scroll-driven animation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isPartnersPaused) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const scrolled = windowHeight - sectionTop;
        const total = windowHeight + sectionHeight;
        const progress = Math.max(0, Math.min(1, scrolled / total));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPartnersPaused]);

  // Certificates navigation with transition state
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % displayCertificates.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [displayCertificates.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + displayCertificates.length) % displayCertificates.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [displayCertificates.length, isTransitioning]);

  const goToIndex = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  // Keyboard navigation for certificates
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

  // Touch handlers for certificates
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

  const getPositionClass = (index: number) => {
    let diff = index - activeIndex;
    if (diff > displayCertificates.length / 2) diff -= displayCertificates.length;
    else if (diff < -displayCertificates.length / 2) diff += displayCertificates.length;
    if (diff === 0) return 'active';
    if (Math.abs(diff) === 1) return 'adjacent';
    return 'far';
  };

  const getTransformOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > displayCertificates.length / 2) diff -= displayCertificates.length;
    else if (diff < -displayCertificates.length / 2) diff += displayCertificates.length;
    return diff * 280;
  };

  // Row 1: starts at middle (-16.67%), moves right to start (0%) as user scrolls
  // Row 2: starts at middle (-16.67%), moves left to end (-33.33%) as user scrolls
  // This ensures both rows are in the middle of their journey when section first appears
  const translateXRow1 = -16.67 + (scrollProgress * 16.67); // Starts at -16.67%, ends at 0%
  const translateXRow2 = -16.67 - (scrollProgress * 16.67); // Starts at -16.67%, ends at -33.33%

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-gradient-to-b from-gray-50/40 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
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

        {/* Certificates 3D Carousel */}
        <div
          ref={containerRef}
          className="relative h-[380px] md:h-[450px] mb-16"
          style={{ 
            perspective: isMobile ? 'none' : '800px', 
            perspectiveOrigin: '50% 50%' 
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {displayCertificates.map((cert, index) => {
              const positionClass = getPositionClass(index);
              const transformOffset = getTransformOffset(index);
              const isActive = index === activeIndex;
              
              let scale = 0.75;
              let translateZ = -100;
              let opacity = 0.5;
              
              if (isMobile) {
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
                  className="certificate-card"
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
                    transition: 'transform 700ms cubic-bezier(0.19, 1, 0.22, 1), opacity 700ms cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: isMobile 
                      ? `scale(${scale})`
                      : `translateX(${transformOffset}px) translateZ(${translateZ}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: isActive ? 10 : 1,
                    pointerEvents: isActive ? 'auto' : 'none',
                    visibility: isMobile && !isActive ? 'hidden' : 'visible',
                  }}
                >
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden h-full border border-gray-200">
                    <div className="relative h-full bg-gradient-to-br from-gray-50 to-white p-4 flex items-center justify-center">
                      <img
                        src={cert.image}
                        alt={cert.alt}
                        className="w-full h-full object-contain"
                        loading={index === 0 ? 'eager' : 'lazy'}
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
            disabled={isTransitioning}
            className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous certificate"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next certificate"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Partners Logos Scrolling - Two Rows in Opposite Directions */}
        <div className="relative space-y-4">
          {/* Row 1 - Starts at end, moves right as user scrolls */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="carousel-track-wrapper">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(${translateXRow1}%)`,
                  transition: isPartnersPaused ? 'none' : 'transform 0.1s linear'
                }}
              >
                {triplicatedRow1.map((badge, index) => (
                  <div 
                    key={`row1-${badge.id}-${index}`} 
                    className="carousel-item"
                    onMouseEnter={() => setIsPartnersPaused(true)}
                    onMouseLeave={() => setIsPartnersPaused(false)}
                  >
                    <img
                      src={badge.logo}
                      alt={badge.name}
                      className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 - Starts at beginning, moves left as user scrolls */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="carousel-track-wrapper">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(${translateXRow2}%)`,
                  transition: isPartnersPaused ? 'none' : 'transform 0.1s linear'
                }}
              >
                {triplicatedRow2.map((badge, index) => (
                  <div 
                    key={`row2-${badge.id}-${index}`} 
                    className="carousel-item"
                    onMouseEnter={() => setIsPartnersPaused(true)}
                    onMouseLeave={() => setIsPartnersPaused(false)}
                  >
                    <img
                      src={badge.logo}
                      alt={badge.name}
                      className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .carousel-track-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .carousel-track {
          display: flex;
          gap: 1rem;
          width: fit-content;
          will-change: transform;
        }

        @media (min-width: 640px) {
          .carousel-track {
            gap: 1.5rem;
          }
        }

        @media (min-width: 768px) {
          .carousel-track {
            gap: 3rem;
          }
        }

        .carousel-item {
          flex-shrink: 0;
          width: 6rem;
          height: 6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (min-width: 640px) {
          .carousel-item {
            width: 8rem;
            height: 8rem;
            padding: 1rem;
          }
        }

        @media (min-width: 768px) {
          .carousel-item {
            width: 10rem;
            height: 10rem;
            padding: 1.5rem;
          }
        }

        .carousel-item:hover {
          box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
          border-color: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
}
