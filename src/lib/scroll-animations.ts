/**
 * Scroll Animation Utilities
 * 
 * Intersection Observer-based scroll animations with stagger support
 * Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.8
 */

export function initScrollAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Skip animations if user prefers reduced motion
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  // Intersection Observer configuration
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
        entry.target.classList.add('revealed');
        
        // Handle stagger children
        if (entry.target.classList.contains('stagger-children')) {
          const children = entry.target.querySelectorAll(':scope > *');
          children.forEach((child, index) => {
            const delay = index * 100; // 100ms stagger delay
            (child as HTMLElement).style.animationDelay = `${delay}ms`;
            child.classList.add('stagger-item');
          });
        }
        
        // Unobserve after animation (trigger once)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-reveal elements
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
}

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
}
