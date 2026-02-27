/**
 * Responsive Layout Adaptations
 * 
 * Utilities for implementing responsive breakpoints and layout adaptations.
 * 
 * Breakpoints:
 * - mobile: < 768px
 * - tablet: 768-1024px
 * - desktop: > 1024px
 * 
 * Requirements: 27.1, 27.2, 27.3, 27.4, 27.5, 27.8
 */

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
} as const;

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Get current breakpoint based on window width
 */
export function getCurrentBreakpoint(): Breakpoint {
  const width = window.innerWidth;
  
  if (width < breakpoints.mobile) {
    return 'mobile';
  } else if (width < breakpoints.tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Check if current viewport matches a breakpoint
 */
export function isBreakpoint(breakpoint: Breakpoint): boolean {
  const current = getCurrentBreakpoint();
  return current === breakpoint;
}

/**
 * Check if viewport is mobile
 */
export function isMobile(): boolean {
  return window.innerWidth < breakpoints.mobile;
}

/**
 * Check if viewport is tablet
 */
export function isTablet(): boolean {
  const width = window.innerWidth;
  return width >= breakpoints.mobile && width < breakpoints.tablet;
}

/**
 * Check if viewport is desktop
 */
export function isDesktop(): boolean {
  return window.innerWidth >= breakpoints.tablet;
}

/**
 * React hook for responsive breakpoint detection
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>(getCurrentBreakpoint());

  React.useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

/**
 * Apply responsive classes based on breakpoint
 */
export function getResponsiveClasses(
  mobile: string,
  tablet?: string,
  desktop?: string
): string {
  const classes = [mobile];
  
  if (tablet) {
    classes.push(`md:${tablet}`);
  }
  
  if (desktop) {
    classes.push(`lg:${desktop}`);
  }
  
  return classes.join(' ');
}

/**
 * Scale typography proportionally across breakpoints
 */
export function getResponsiveFontSize(
  baseSize: number,
  scale: { mobile?: number; tablet?: number; desktop?: number } = {}
): string {
  const mobileSize = scale.mobile || baseSize;
  const tabletSize = scale.tablet || baseSize * 1.2;
  const desktopSize = scale.desktop || baseSize * 1.5;

  return `text-[${mobileSize}px] md:text-[${tabletSize}px] lg:text-[${desktopSize}px]`;
}

/**
 * Get responsive spacing values
 */
export function getResponsiveSpacing(
  mobile: number,
  tablet?: number,
  desktop?: number
): string {
  const tabletValue = tablet || mobile * 1.5;
  const desktopValue = desktop || mobile * 2;

  return `${mobile} md:${tabletValue} lg:${desktopValue}`;
}

/**
 * Add visual indicators for horizontal scrolling
 */
export function addScrollIndicators(container: HTMLElement): void {
  const hasHorizontalScroll = container.scrollWidth > container.clientWidth;

  if (hasHorizontalScroll) {
    container.classList.add('overflow-x-auto');
    container.style.scrollbarWidth = 'thin';
    container.style.scrollbarColor = '#cbd5e0 #f7fafc';

    // Add gradient indicators
    const leftIndicator = document.createElement('div');
    leftIndicator.className = 'absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10';
    
    const rightIndicator = document.createElement('div');
    rightIndicator.className = 'absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10';

    container.style.position = 'relative';
    container.appendChild(leftIndicator);
    container.appendChild(rightIndicator);

    // Hide indicators when scrolled to edges
    const updateIndicators = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      leftIndicator.style.opacity = scrollLeft > 0 ? '1' : '0';
      rightIndicator.style.opacity = scrollLeft < maxScroll ? '1' : '0';
    };

    container.addEventListener('scroll', updateIndicators, { passive: true });
    updateIndicators();
  }
}

/**
 * Test layout changes on viewport resize
 */
export function testResponsiveLayout(
  element: HTMLElement,
  callback: (breakpoint: Breakpoint) => void
): () => void {
  let currentBreakpoint = getCurrentBreakpoint();
  callback(currentBreakpoint);

  const handleResize = () => {
    const newBreakpoint = getCurrentBreakpoint();
    if (newBreakpoint !== currentBreakpoint) {
      currentBreakpoint = newBreakpoint;
      callback(newBreakpoint);
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}

/**
 * Apply single-column layout on mobile, multi-column on desktop
 */
export function applyResponsiveColumns(container: HTMLElement): void {
  const breakpoint = getCurrentBreakpoint();

  if (breakpoint === 'mobile') {
    container.style.gridTemplateColumns = '1fr';
  } else if (breakpoint === 'tablet') {
    container.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else {
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
  }
}

// Import React for hooks
import * as React from 'react';
