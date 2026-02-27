import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  breakpoints,
  getCurrentBreakpoint,
  isBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  getResponsiveClasses,
  getResponsiveSpacing,
  addScrollIndicators,
  applyResponsiveColumns
} from './responsive-layout';

describe('Responsive Layout Utilities', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe('breakpoints', () => {
    it('defines correct breakpoint values', () => {
      expect(breakpoints.mobile).toBe(768);
      expect(breakpoints.tablet).toBe(1024);
      expect(breakpoints.desktop).toBe(1280);
    });
  });

  describe('getCurrentBreakpoint', () => {
    it('returns mobile for width < 768px', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      expect(getCurrentBreakpoint()).toBe('mobile');
    });

    it('returns tablet for width 768-1023px', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      });

      expect(getCurrentBreakpoint()).toBe('tablet');
    });

    it('returns desktop for width >= 1024px', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      });

      expect(getCurrentBreakpoint()).toBe('desktop');
    });
  });

  describe('isBreakpoint', () => {
    it('returns true when current breakpoint matches', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      expect(isBreakpoint('mobile')).toBe(true);
      expect(isBreakpoint('tablet')).toBe(false);
      expect(isBreakpoint('desktop')).toBe(false);
    });
  });

  describe('isMobile', () => {
    it('returns true for mobile viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      expect(isMobile()).toBe(true);
    });

    it('returns false for non-mobile viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      expect(isMobile()).toBe(false);
    });
  });

  describe('isTablet', () => {
    it('returns true for tablet viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      });

      expect(isTablet()).toBe(true);
    });

    it('returns false for non-tablet viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      expect(isTablet()).toBe(false);
    });
  });

  describe('isDesktop', () => {
    it('returns true for desktop viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      });

      expect(isDesktop()).toBe(true);
    });

    it('returns false for non-desktop viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      expect(isDesktop()).toBe(false);
    });
  });

  describe('getResponsiveClasses', () => {
    it('returns mobile class only when no other breakpoints provided', () => {
      const classes = getResponsiveClasses('text-sm');
      expect(classes).toBe('text-sm');
    });

    it('returns mobile and tablet classes', () => {
      const classes = getResponsiveClasses('text-sm', 'text-base');
      expect(classes).toBe('text-sm md:text-base');
    });

    it('returns all breakpoint classes', () => {
      const classes = getResponsiveClasses('text-sm', 'text-base', 'text-lg');
      expect(classes).toBe('text-sm md:text-base lg:text-lg');
    });
  });

  describe('getResponsiveSpacing', () => {
    it('scales spacing proportionally', () => {
      const spacing = getResponsiveSpacing(4);
      expect(spacing).toContain('4');
      expect(spacing).toContain('md:6');
      expect(spacing).toContain('lg:8');
    });

    it('uses custom tablet and desktop values', () => {
      const spacing = getResponsiveSpacing(4, 8, 12);
      expect(spacing).toContain('4');
      expect(spacing).toContain('md:8');
      expect(spacing).toContain('lg:12');
    });
  });

  describe('addScrollIndicators', () => {
    it('adds scroll indicators when content overflows', () => {
      const container = document.createElement('div');
      container.style.width = '200px';
      container.style.overflow = 'hidden';
      
      const content = document.createElement('div');
      content.style.width = '400px';
      container.appendChild(content);
      
      document.body.appendChild(container);

      // Mock scrollWidth to be larger than clientWidth
      Object.defineProperty(container, 'scrollWidth', {
        writable: true,
        configurable: true,
        value: 400
      });
      Object.defineProperty(container, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 200
      });

      addScrollIndicators(container);

      expect(container.classList.contains('overflow-x-auto')).toBe(true);
      expect(container.style.position).toBe('relative');

      document.body.removeChild(container);
    });
  });

  describe('applyResponsiveColumns', () => {
    it('applies single column on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const container = document.createElement('div');
      applyResponsiveColumns(container);

      expect(container.style.gridTemplateColumns).toBe('1fr');
    });

    it('applies two columns on tablet', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      });

      const container = document.createElement('div');
      applyResponsiveColumns(container);

      expect(container.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
    });

    it('applies three columns on desktop', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      });

      const container = document.createElement('div');
      applyResponsiveColumns(container);

      expect(container.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
    });
  });
});
