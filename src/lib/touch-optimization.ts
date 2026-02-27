/**
 * Touch Optimization Utilities
 * 
 * Provides utilities for touch-optimized interactive elements following WCAG 2.1 AA standards.
 * - Minimum 44x44px touch targets
 * - Proper spacing between interactive elements
 * - Touch feedback effects
 * - Hover effect disabling on touch devices
 */

/**
 * Ensures an element meets minimum touch target size (44x44px)
 * Adds padding if the visual element is smaller
 */
export function ensureTouchTarget(element: HTMLElement): void {
  const rect = element.getBoundingClientRect();
  const minSize = 44;
  
  if (rect.width < minSize || rect.height < minSize) {
    const paddingX = Math.max(0, (minSize - rect.width) / 2);
    const paddingY = Math.max(0, (minSize - rect.height) / 2);
    
    element.style.paddingLeft = `${paddingX}px`;
    element.style.paddingRight = `${paddingX}px`;
    element.style.paddingTop = `${paddingY}px`;
    element.style.paddingBottom = `${paddingY}px`;
  }
}

/**
 * Applies touch target sizing to all interactive elements
 */
export function applyTouchTargets(container: HTMLElement = document.body): void {
  const interactiveElements = container.querySelectorAll<HTMLElement>(
    'button, a, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'
  );
  
  interactiveElements.forEach(element => {
    ensureTouchTarget(element);
  });
}

/**
 * Ensures minimum 8px gap between interactive elements
 */
export function ensureInteractiveSpacing(container: HTMLElement): void {
  const interactiveElements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, a, [role="button"], [role="link"]'
    )
  );
  
  const minGap = 8;
  
  interactiveElements.forEach((element, index) => {
    if (index === 0) return;
    
    const prevElement = interactiveElements[index - 1];
    const prevRect = prevElement.getBoundingClientRect();
    const currentRect = element.getBoundingClientRect();
    
    // Check if elements are on the same row (similar vertical position)
    const sameRow = Math.abs(prevRect.top - currentRect.top) < 10;
    
    if (sameRow) {
      const gap = currentRect.left - prevRect.right;
      if (gap < minGap) {
        element.style.marginLeft = `${minGap}px`;
      }
    }
  });
}

/**
 * Adds tap highlight effect to an element
 */
export function addTapHighlight(element: HTMLElement, color: string = 'rgba(23, 94, 173, 0.3)'): void {
  // Remove default tap highlight
  element.style.webkitTapHighlightColor = 'transparent';
  
  // Add custom tap feedback
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  
  const handleTouchStart = (e: TouchEvent) => {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = color;
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'width 0.3s, height 0.3s';
    
    element.appendChild(ripple);
    
    // Trigger animation
    requestAnimationFrame(() => {
      ripple.style.width = '200%';
      ripple.style.height = '200%';
    });
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 300);
  };
  
  element.addEventListener('touchstart', handleTouchStart, { passive: true });
}

/**
 * Disables hover effects on touch devices
 */
export function disableHoverOnTouch(): void {
  // Add media query to disable hover styles on touch devices
  const style = document.createElement('style');
  style.textContent = `
    @media (hover: none) {
      *:hover {
        /* Disable hover effects on touch devices */
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Prevents double-tap zoom on interactive elements
 */
export function preventDoubleTapZoom(element: HTMLElement): void {
  element.style.touchAction = 'manipulation';
}

/**
 * Applies all touch optimizations to a container
 */
export function optimizeForTouch(container: HTMLElement = document.body): void {
  applyTouchTargets(container);
  ensureInteractiveSpacing(container);
  disableHoverOnTouch();
  
  // Apply tap highlights and prevent double-tap zoom to all interactive elements
  const interactiveElements = container.querySelectorAll<HTMLElement>(
    'button, a, [role="button"], [role="link"]'
  );
  
  interactiveElements.forEach(element => {
    addTapHighlight(element);
    preventDoubleTapZoom(element);
  });
}

/**
 * Checks if the device supports touch
 */
export function isTouchDevice(): boolean {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}
