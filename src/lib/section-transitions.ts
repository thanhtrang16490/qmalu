/**
 * Section Transitions Utility
 * 
 * Implements smooth transitions between major sections using Intersection Observer.
 * Supports multiple transition types: blur, fade, clip-path, slide, and scale.
 * 
 * Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.7, 19.8
 */

export type TransitionType = 'blur' | 'fade' | 'clip' | 'slide-up' | 'slide-down' | 'scale';

export interface SectionTransitionOptions {
  /** Transition type to apply */
  type: TransitionType;
  /** Threshold for triggering transition (0-1), default: 0.5 (viewport center) */
  threshold?: number;
  /** Root margin for observer, default: '0px' */
  rootMargin?: string;
  /** Whether to trigger only once, default: true */
  once?: boolean;
  /** Disable on mobile (< 768px), default: false for simple transitions, true for complex */
  disableOnMobile?: boolean;
}

/**
 * Initialize section transitions for elements with data-section-transition attribute
 */
export function initSectionTransitions(): () => void {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Skip transitions if user prefers reduced motion
    return () => {};
  }

  // Check if mobile
  const isMobile = window.innerWidth < 768;

  // Find all elements with section transition data attribute
  const elements = document.querySelectorAll<HTMLElement>('[data-section-transition]');

  if (elements.length === 0) {
    return () => {};
  }

  const observers: IntersectionObserver[] = [];

  elements.forEach((element) => {
    const transitionType = element.dataset.sectionTransition as TransitionType;
    const threshold = parseFloat(element.dataset.transitionThreshold || '0.5');
    const rootMargin = element.dataset.transitionRootMargin || '0px';
    const once = element.dataset.transitionOnce !== 'false';
    
    // Determine if this transition should be disabled on mobile
    const disableOnMobile = transitionType === 'blur' || transitionType === 'clip';
    
    if (isMobile && disableOnMobile) {
      // Skip complex transitions on mobile
      element.classList.add('in-view');
      return;
    }

    // Add the appropriate transition class
    const transitionClass = `section-transition-${transitionType}`;
    element.classList.add(transitionClass);

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add in-view class to trigger transition
            entry.target.classList.add('in-view');
            
            // For blur transition, add in-transition class
            if (transitionType === 'blur') {
              entry.target.classList.add('in-transition');
            }

            // Unobserve if once is true
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // Remove classes if not once (allows re-triggering)
            entry.target.classList.remove('in-view');
            if (transitionType === 'blur') {
              entry.target.classList.remove('in-transition');
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    observers.push(observer);
  });

  // Return cleanup function
  return () => {
    observers.forEach((observer) => observer.disconnect());
  };
}

/**
 * Apply section transition to a specific element programmatically
 */
export function applySectionTransition(
  element: HTMLElement,
  options: SectionTransitionOptions
): () => void {
  const {
    type,
    threshold = 0.5,
    rootMargin = '0px',
    once = true,
    disableOnMobile = type === 'blur' || type === 'clip',
  } = options;

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    element.classList.add('in-view');
    return () => {};
  }

  // Check if mobile
  const isMobile = window.innerWidth < 768;
  if (isMobile && disableOnMobile) {
    element.classList.add('in-view');
    return () => {};
  }

  // Add the appropriate transition class
  const transitionClass = `section-transition-${type}`;
  element.classList.add(transitionClass);

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          if (type === 'blur') {
            entry.target.classList.add('in-transition');
          }

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove('in-view');
          if (type === 'blur') {
            entry.target.classList.remove('in-transition');
          }
        }
      });
    },
    {
      threshold,
      rootMargin,
    }
  );

  observer.observe(element);

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
}

/**
 * Batch apply transitions to multiple elements
 */
export function applySectionTransitions(
  elements: HTMLElement[],
  options: SectionTransitionOptions
): () => void {
  const cleanupFunctions = elements.map((element) =>
    applySectionTransition(element, options)
  );

  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}
