/**
 * Parallax Effects Utilities Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initScrollParallax, initMouseParallax } from './parallax';

describe('Parallax Utilities', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock window properties
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });
    
    // Mock requestAnimationFrame
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  describe('initScrollParallax', () => {
    it('should not initialize on mobile devices', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 767,
      });
      
      const element = document.createElement('div');
      element.setAttribute('data-parallax', '0.5');
      document.body.appendChild(element);
      
      initScrollParallax();
      
      // Should not have transform applied
      expect(element.style.transform).toBe('');
    });

    it('should apply parallax transform on desktop', () => {
      const element = document.createElement('div');
      element.setAttribute('data-parallax', '0.5');
      document.body.appendChild(element);
      
      initScrollParallax();
      
      // Should have initial transform
      expect(element.style.transform).toContain('translate3d');
    });

    it('should limit parallax movement to ±200px', () => {
      const element = document.createElement('div');
      element.setAttribute('data-parallax', '1');
      document.body.appendChild(element);
      
      // Set large scroll value
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 1000,
      });
      
      initScrollParallax();
      
      const transform = element.style.transform;
      const match = transform.match(/translate3d\(0,\s*(-?\d+)px,\s*0\)/);
      
      if (match) {
        const yValue = Math.abs(parseInt(match[1]));
        expect(yValue).toBeLessThanOrEqual(200);
      }
    });

    it('should handle multiple parallax elements', () => {
      const element1 = document.createElement('div');
      element1.setAttribute('data-parallax', '0.5');
      const element2 = document.createElement('div');
      element2.setAttribute('data-parallax', '0.3');
      
      document.body.appendChild(element1);
      document.body.appendChild(element2);
      
      initScrollParallax();
      
      expect(element1.style.transform).toContain('translate3d');
      expect(element2.style.transform).toContain('translate3d');
    });
  });

  describe('initMouseParallax', () => {
    it('should not initialize on touch devices', () => {
      Object.defineProperty(window, 'ontouchstart', {
        writable: true,
        configurable: true,
        value: {},
      });
      
      const hero = document.createElement('div');
      hero.id = 'hero-section';
      const layer = document.createElement('div');
      layer.setAttribute('data-depth', '1');
      hero.appendChild(layer);
      document.body.appendChild(hero);
      
      initMouseParallax();
      
      // Should not have transform applied
      expect(layer.style.transform).toBe('');
    });

    it('should initialize event listeners on desktop', () => {
      const hero = document.createElement('div');
      hero.id = 'hero-section';
      const layer = document.createElement('div');
      layer.setAttribute('data-depth', '1');
      hero.appendChild(layer);
      document.body.appendChild(hero);
      
      hero.getBoundingClientRect = vi.fn(() => ({
        width: 1000,
        height: 600,
        top: 0,
        left: 0,
        right: 1000,
        bottom: 600,
        x: 0,
        y: 0,
        toJSON: () => {},
      }));
      
      // Should not throw error
      expect(() => initMouseParallax()).not.toThrow();
    });

    it('should handle missing hero section gracefully', () => {
      // No hero section in DOM
      expect(() => initMouseParallax()).not.toThrow();
    });

    it('should handle missing layers gracefully', () => {
      const hero = document.createElement('div');
      hero.id = 'hero-section';
      document.body.appendChild(hero);
      
      // No layers with data-depth
      expect(() => initMouseParallax()).not.toThrow();
    });
  });
});
