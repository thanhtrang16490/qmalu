import { useEffect, useRef } from 'react';
import type { ProcessTimelineSection } from '../data/homepage-content';

interface ProcessTimelineProps {
  data: ProcessTimelineSection;
}

/**
 * ProcessTimeline Component
 * 
 * Displays a 6-step process timeline with:
 * - Horizontal scroll on desktop (≥768px) with snap points
 * - Vertical stack on mobile (<768px)
 * - Cards: 320px width, 400px height, 24px gap
 * - Hover effect: translateY -8px with enhanced shadow
 * - Scroll-triggered animations with Intersection Observer
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 14.2, 14.3, 14.5
 */
export default function ProcessTimeline({ data }: ProcessTimelineProps) {
  const { title, subtitle, steps } = data;
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class when element enters viewport
          entry.target.classList.add('animate-in');
          // Unobserve to trigger animation only once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all card elements
    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth scroll to card on indicator click
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    const card = cardsRef.current[index];
    
    if (container && card) {
      const cardLeft = card.offsetLeft;
      const containerWidth = container.offsetWidth;
      const cardWidth = card.offsetWidth;
      const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <section className="w-full py-16 md:py-20 bg-gray-50">
      {/* Section Header - Centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Process Steps Container - Full width on desktop for horizontal scroll */}
      <div className="relative">
        {/* Desktop: Full-width horizontal scroll */}
        {/* Mobile: Centered with max-width */}
        <div 
          ref={scrollContainerRef}
          className="
            process-timeline-scroll
            md:w-full md:overflow-x-auto
            max-w-7xl md:max-w-none mx-auto px-4 sm:px-6 lg:px-8 md:px-0
          "
        >
          <div className="
            flex flex-col gap-4
            md:flex-row md:gap-6 md:px-8
            md:snap-x md:snap-mandatory
            md:pb-4 md:scrollbar-thin md:scrollbar-thumb-primary-600 md:scrollbar-track-gray-200
          ">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={setCardRef(index)}
                className="
                  process-card
                  scroll-reveal
                  flex-shrink-0
                  w-full
                  md:w-[320px]
                  h-auto
                  md:h-[400px]
                  bg-white
                  rounded-3xl
                  p-6 md:p-8
                  shadow-md
                  transition-all
                  duration-normal
                  ease-smooth
                  md:snap-center
                  hover:shadow-xl
                  hover:-translate-y-2
                  opacity-0
                  translate-y-[30px]
                "
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Step Number Badge */}
                <div className="
                  inline-flex
                  items-center
                  justify-center
                  w-12 h-12
                  rounded-full
                  bg-primary-100
                  text-primary-600
                  font-bold
                  text-xl
                  mb-4
                ">
                  {step.number}
                </div>

                {/* Step Icon */}
                <div className="text-5xl mb-4">
                  {step.icon}
                </div>

                {/* Step Title */}
                <h3 className="
                  text-2xl
                  font-semibold
                  text-gray-900
                  mb-3
                  tracking-tight
                ">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="
                  text-base
                  text-gray-600
                  leading-relaxed
                ">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator for Desktop */}
        <div className="hidden md:flex justify-center mt-6 gap-2">
          {steps.map((step, index) => (
            <button
              key={`indicator-${step.number}`}
              onClick={() => scrollToCard(index)}
              aria-label={`Scroll to step ${step.number}`}
              className="
                w-2 h-2
                rounded-full
                bg-gray-300
                hover:bg-primary-400
                transition-colors
                duration-normal
                cursor-pointer
                focus:outline-none
                focus:ring-2
                focus:ring-primary-600
                focus:ring-offset-2
              "
            />
          ))}
        </div>
      </div>
    </section>
  );
}
