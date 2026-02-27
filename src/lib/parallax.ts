/**
 * Parallax Effects Utilities
 * 
 * Scroll and mouse-move parallax with hardware acceleration
 * Requirements: 15.1, 15.2, 15.4, 15.5, 15.6, 15.7, 15.8
 */

export function initScrollParallax() {
  // Disable on mobile (viewport < 768px)
  if (window.innerWidth < 768) {
    return;
  }

  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) {
    return;
  }

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const element = el as HTMLElement;
      const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
      
      // Limit movement to prevent excessive motion (max ±200px)
      const yPos = Math.max(-200, Math.min(200, -(scrolled * speed)));
      
      // Use transform3d for hardware acceleration
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    ticking = false;
  }

  // Use passive event listener for performance
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial update
  updateParallax();
}

export function initMouseParallax() {
  // Disable on touch devices
  if ('ontouchstart' in window) {
    return;
  }

  const hero = document.querySelector('#hero-section');
  if (!hero) {
    return;
  }

  const layers = hero.querySelectorAll('[data-depth]');
  
  if (layers.length === 0) {
    return;
  }

  let ticking = false;
  let mouseX = 0;
  let mouseY = 0;

  function updateMouseParallax() {
    const rect = hero.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const xPercent = (mouseX - centerX) / centerX;
    const yPercent = (mouseY - centerY) / centerY;
    
    layers.forEach(layer => {
      const element = layer as HTMLElement;
      const depth = parseFloat(element.getAttribute('data-depth') || '1');
      
      // Limit movement to prevent excessive motion (max ±30px)
      const xMove = Math.max(-30, Math.min(30, xPercent * depth * 20));
      const yMove = Math.max(-30, Math.min(30, yPercent * depth * 20));
      
      // Use transform3d for hardware acceleration
      element.style.transform = `translate3d(${xMove}px, ${yMove}px, 0)`;
    });
    
    ticking = false;
  }

  hero.addEventListener('mousemove', (e: Event) => {
    const mouseEvent = e as MouseEvent;
    const rect = hero.getBoundingClientRect();
    mouseX = mouseEvent.clientX - rect.left;
    mouseY = mouseEvent.clientY - rect.top;
    
    if (!ticking) {
      window.requestAnimationFrame(updateMouseParallax);
      ticking = true;
    }
  });

  hero.addEventListener('mouseleave', () => {
    // Reset to center position
    layers.forEach(layer => {
      const element = layer as HTMLElement;
      element.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

// Auto-initialize
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollParallax();
      initMouseParallax();
    });
  } else {
    initScrollParallax();
    initMouseParallax();
  }
}
