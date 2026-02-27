/**
 * Unit tests for magnetic button utilities
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initMagneticButtons, addMagneticButton } from './magnetic-buttons';

describe('Magnetic Buttons', () => {
  let container: HTMLDivElement;
  let cleanup: (() => void) | null = null;

  beforeEach(() => {
    // Create test container
    container = document.createElement('div');
    document.body.appendChild(container);

    // Mock matchMedia for hover support
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(hover: none)' ? false : true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(() => cb(performance.now()), 16);
      return 1;
    });

    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    document.body.removeChild(container);
    vi.restoreAllMocks();
  });

  describe('initMagneticButtons', () => {
    it('should initialize magnetic buttons with default selector', () => {
      // Create buttons
      const button1 = document.createElement('button');
      button1.className = 'magnetic-button';
      const button2 = document.createElement('button');
      button2.className = 'magnetic-button';
      container.appendChild(button1);
      container.appendChild(button2);

      // Initialize
      cleanup = initMagneticButtons();

      // Check that buttons have transform styles applied
      expect(button1.style.willChange).toBe('transform');
      expect(button2.style.willChange).toBe('transform');
    });

    it('should initialize magnetic buttons with custom selector', () => {
      // Create button with custom class
      const button = document.createElement('button');
      button.className = 'custom-magnetic';
      container.appendChild(button);

      // Initialize with custom selector
      cleanup = initMagneticButtons('.custom-magnetic');

      // Check that button has transform styles applied
      expect(button.style.willChange).toBe('transform');
    });

    it('should return cleanup function', () => {
      const button = document.createElement('button');
      button.className = 'magnetic-button';
      container.appendChild(button);

      cleanup = initMagneticButtons();

      expect(typeof cleanup).toBe('function');
    });

    it('should clean up button styles on cleanup', () => {
      const button = document.createElement('button');
      button.className = 'magnetic-button';
      container.appendChild(button);

      cleanup = initMagneticButtons();
      
      // Button should have styles
      expect(button.style.willChange).toBe('transform');

      // Clean up
      cleanup();
      cleanup = null;

      // Styles should be removed
      expect(button.style.transform).toBe('');
      expect(button.style.willChange).toBe('');
    });

    it('should not initialize on touch devices', () => {
      // Mock touch device
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(hover: none)' ? true : false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const button = document.createElement('button');
      button.className = 'magnetic-button';
      container.appendChild(button);

      cleanup = initMagneticButtons();

      // Button should not have styles on touch device
      expect(button.style.willChange).toBe('');
    });

    it('should return no-op cleanup when no buttons found', () => {
      cleanup = initMagneticButtons();
      
      expect(typeof cleanup).toBe('function');
      // Should not throw when called
      expect(() => cleanup!()).not.toThrow();
    });
  });

  describe('addMagneticButton', () => {
    it('should add magnetic effect to single button', () => {
      const button = document.createElement('button');
      container.appendChild(button);

      cleanup = addMagneticButton(button);

      expect(button.style.willChange).toBe('transform');
    });

    it('should return cleanup function', () => {
      const button = document.createElement('button');
      container.appendChild(button);

      cleanup = addMagneticButton(button);

      expect(typeof cleanup).toBe('function');
    });

    it('should clean up single button on cleanup', () => {
      const button = document.createElement('button');
      container.appendChild(button);

      cleanup = addMagneticButton(button);
      
      expect(button.style.willChange).toBe('transform');

      cleanup();
      cleanup = null;

      expect(button.style.transform).toBe('');
      expect(button.style.willChange).toBe('');
    });

    it('should not add effect on touch devices', () => {
      // Mock touch device
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(hover: none)' ? true : false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const button = document.createElement('button');
      container.appendChild(button);

      cleanup = addMagneticButton(button);

      expect(button.style.willChange).toBe('');
    });
  });

  describe('Button functionality', () => {
    it('should maintain button click functionality during animation', () => {
      const button = document.createElement('button');
      button.className = 'magnetic-button';
      container.appendChild(button);

      let clicked = false;
      button.addEventListener('click', () => {
        clicked = true;
      });

      cleanup = initMagneticButtons();

      // Simulate click
      button.click();

      expect(clicked).toBe(true);
    });
  });

  describe('Spring animation', () => {
    it('should return to original position when cursor leaves', async () => {
      const button = document.createElement('button');
      button.className = 'magnetic-button';
      button.style.width = '100px';
      button.style.height = '40px';
      button.style.position = 'absolute';
      button.style.left = '100px';
      button.style.top = '100px';
      container.appendChild(button);

      cleanup = initMagneticButtons();

      // Move cursor near button
      const rect = button.getBoundingClientRect();
      let event = new MouseEvent('mousemove', {
        clientX: rect.left + rect.width / 2 + 50,
        clientY: rect.top + rect.height / 2,
      });
      document.dispatchEvent(event);

      // Wait for attraction
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Move cursor far away (outside 100px radius)
      event = new MouseEvent('mousemove', {
        clientX: rect.left + rect.width / 2 + 200,
        clientY: rect.top + rect.height / 2,
      });
      document.dispatchEvent(event);

      // Wait for return animation
      await new Promise((resolve) => setTimeout(resolve, 500));

      const transform = button.style.transform;
      // Should be close to original position (0, 0)
      expect(transform).toContain('translate3d');
      // Extract values and check they're close to 0
      const match = transform.match(/translate3d\(([^,]+)px,\s*([^,]+)px/);
      if (match) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[2]);
        expect(Math.abs(x)).toBeLessThan(5); // Allow small deviation
        expect(Math.abs(y)).toBeLessThan(5);
      }
    });
  });

  describe('Attraction radius', () => {
    it('should not attract beyond 100px radius', async () => {
      const button = document.createElement('button');
      button.className = 'magnetic-button';
      button.style.width = '100px';
      button.style.height = '40px';
      button.style.position = 'absolute';
      button.style.left = '200px';
      button.style.top = '200px';
      container.appendChild(button);

      cleanup = initMagneticButtons();

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Move cursor 150px from center (beyond 100px radius)
      const event = new MouseEvent('mousemove', {
        clientX: centerX + 150,
        clientY: centerY,
      });
      document.dispatchEvent(event);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const transform = button.style.transform;
      // Should be at or near original position
      const match = transform.match(/translate3d\(([^,]+)px,\s*([^,]+)px/);
      if (match) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[2]);
        expect(Math.abs(x)).toBeLessThan(1);
        expect(Math.abs(y)).toBeLessThan(1);
      }
    });
  });

  describe('Movement constraints', () => {
    it('should limit movement to prevent overlapping', async () => {
      const button = document.createElement('button');
      button.className = 'magnetic-button';
      button.style.width = '100px';
      button.style.height = '40px';
      button.style.position = 'absolute';
      button.style.left = '200px';
      button.style.top = '200px';
      container.appendChild(button);

      cleanup = initMagneticButtons();

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Move cursor very close to button (should trigger max movement limit)
      const event = new MouseEvent('mousemove', {
        clientX: centerX + 10,
        clientY: centerY,
      });
      document.dispatchEvent(event);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const transform = button.style.transform;
      const match = transform.match(/translate3d\(([^,]+)px,\s*([^,]+)px/);
      if (match) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[2]);
        // Movement should be limited to MAX_MOVEMENT (20px)
        expect(Math.abs(x)).toBeLessThanOrEqual(20);
        expect(Math.abs(y)).toBeLessThanOrEqual(20);
      }
    });
  });
});
