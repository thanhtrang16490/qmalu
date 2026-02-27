/**
 * Unit tests for custom cursor utilities
 * 
 * Tests Requirements: 17.1, 17.2, 17.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initCustomCursor, destroyCustomCursor, updateCustomCursorElements } from './custom-cursor';

describe('Custom Cursor', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // Create test container
    container = document.createElement('div');
    document.body.appendChild(container);

    // Mock matchMedia for hover support (desktop device)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(hover: hover)' ? true : false,
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
    destroyCustomCursor();
    document.body.removeChild(container);
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should create cursor element on initialization', () => {
      initCustomCursor();
      
      const cursor = document.querySelector('.custom-cursor');
      expect(cursor).toBeTruthy();
      expect(cursor?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should add custom-cursor-active class to body', () => {
      initCustomCursor();
      
      expect(document.body.classList.contains('custom-cursor-active')).toBe(true);
    });

    it('should not initialize on touch devices', () => {
      // Mock touch device (no hover support)
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(hover: hover)' ? false : true,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      initCustomCursor();
      
      const cursor = document.querySelector('.custom-cursor');
      expect(cursor).toBeFalsy();
    });

    it('should inject cursor styles', () => {
      initCustomCursor();
      
      const styles = Array.from(document.head.querySelectorAll('style'));
      const cursorStyle = styles.find(style => 
        style.textContent?.includes('.custom-cursor')
      );
      
      expect(cursorStyle).toBeTruthy();
    });
  });

  describe('Mouse Tracking', () => {
    it('should follow mouse position', async () => {
      initCustomCursor();
      
      const cursor = document.querySelector('.custom-cursor') as HTMLElement;
      expect(cursor).toBeTruthy();

      // Simulate mouse move
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200,
      });
      document.dispatchEvent(mouseEvent);

      // Wait for animation frame
      await new Promise(resolve => setTimeout(resolve, 50));

      // Check that transform is applied (cursor should be moving towards target)
      const transform = cursor.style.transform;
      expect(transform).toContain('translate3d');
    });

    it('should use smooth lerp interpolation', async () => {
      initCustomCursor();
      
      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Move mouse to position
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      document.dispatchEvent(mouseEvent);

      // Wait for first frame
      await new Promise(resolve => setTimeout(resolve, 20));
      
      const transform1 = cursor.style.transform;

      // Wait for more frames - cursor should continue moving
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const transform2 = cursor.style.transform;

      // Transforms should be different (smooth interpolation)
      expect(transform1).not.toBe(transform2);
    });
  });

  describe('Interactive Element Hover', () => {
    it('should scale cursor on link hover', async () => {
      initCustomCursor();
      
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = 'Test Link';
      container.appendChild(link);

      // Re-attach listeners to new element
      updateCustomCursorElements();

      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Simulate mouse enter
      const enterEvent = new MouseEvent('mouseenter', { bubbles: true });
      link.dispatchEvent(enterEvent);

      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 20));

      // Check cursor has link class
      expect(cursor.classList.contains('cursor-link')).toBe(true);
    });

    it('should scale cursor on button hover', async () => {
      initCustomCursor();
      
      const button = document.createElement('button');
      button.textContent = 'Test Button';
      container.appendChild(button);

      updateCustomCursorElements();

      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Simulate mouse enter
      const enterEvent = new MouseEvent('mouseenter', { bubbles: true });
      button.dispatchEvent(enterEvent);

      await new Promise(resolve => setTimeout(resolve, 20));

      expect(cursor.classList.contains('cursor-button')).toBe(true);
    });

    it('should show draggable state on draggable elements', async () => {
      initCustomCursor();
      
      const draggable = document.createElement('div');
      draggable.draggable = true;
      draggable.textContent = 'Draggable';
      container.appendChild(draggable);

      updateCustomCursorElements();

      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Simulate mouse enter
      const enterEvent = new MouseEvent('mouseenter', { bubbles: true });
      draggable.dispatchEvent(enterEvent);

      await new Promise(resolve => setTimeout(resolve, 20));

      expect(cursor.classList.contains('cursor-draggable')).toBe(true);
    });

    it('should return to default state on mouse leave', async () => {
      initCustomCursor();
      
      const button = document.createElement('button');
      button.textContent = 'Test Button';
      container.appendChild(button);

      updateCustomCursorElements();

      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Enter
      const enterEvent = new MouseEvent('mouseenter', { bubbles: true });
      button.dispatchEvent(enterEvent);
      await new Promise(resolve => setTimeout(resolve, 20));

      expect(cursor.classList.contains('cursor-button')).toBe(true);

      // Leave
      const leaveEvent = new MouseEvent('mouseleave', { bubbles: true });
      button.dispatchEvent(leaveEvent);
      await new Promise(resolve => setTimeout(resolve, 20));

      expect(cursor.classList.contains('cursor-button')).toBe(false);
    });
  });

  describe('Inactivity Fade', () => {
    it('should fade out after 3 seconds of inactivity', async () => {
      vi.useFakeTimers();
      
      initCustomCursor();
      
      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Move mouse to activate
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      document.dispatchEvent(mouseEvent);

      // Fast-forward 3 seconds
      await vi.advanceTimersByTimeAsync(3100);

      // Cursor should have opacity 0
      expect(cursor.style.opacity).toBe('0');

      vi.useRealTimers();
    });

    it('should reset inactivity timer on mouse movement', async () => {
      vi.useFakeTimers();
      
      initCustomCursor();
      
      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Move mouse
      const mouseEvent1 = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      document.dispatchEvent(mouseEvent1);

      // Fast-forward 2 seconds (not enough to fade)
      await vi.advanceTimersByTimeAsync(2000);

      // Move mouse again (resets timer)
      const mouseEvent2 = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 150,
      });
      document.dispatchEvent(mouseEvent2);

      // Fast-forward 2 more seconds (total 4s, but timer was reset)
      await vi.advanceTimersByTimeAsync(2000);

      // Cursor should still be visible (only 2s since last movement)
      expect(cursor.style.opacity).toBe('1');

      vi.useRealTimers();
    });
  });

  describe('Cleanup', () => {
    it('should remove cursor element on destroy', () => {
      initCustomCursor();
      
      let cursor = document.querySelector('.custom-cursor');
      expect(cursor).toBeTruthy();

      destroyCustomCursor();

      cursor = document.querySelector('.custom-cursor');
      expect(cursor).toBeFalsy();
    });

    it('should remove custom-cursor-active class on destroy', () => {
      initCustomCursor();
      expect(document.body.classList.contains('custom-cursor-active')).toBe(true);

      destroyCustomCursor();
      expect(document.body.classList.contains('custom-cursor-active')).toBe(false);
    });

    it('should cancel animation frame on destroy', () => {
      const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
      
      initCustomCursor();
      destroyCustomCursor();

      expect(cancelSpy).toHaveBeenCalled();
    });
  });

  describe('Dynamic Content', () => {
    it('should update listeners for dynamically added elements', () => {
      initCustomCursor();
      
      // Add new button after initialization
      const button = document.createElement('button');
      button.textContent = 'Dynamic Button';
      container.appendChild(button);

      // Update cursor elements
      updateCustomCursorElements();

      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Test hover on new button
      const enterEvent = new MouseEvent('mouseenter', { bubbles: true });
      button.dispatchEvent(enterEvent);

      // Check cursor has button class (synchronous check)
      expect(cursor.classList.contains('cursor-button')).toBe(true);
    });
  });

  describe('Hardware Acceleration', () => {
    it('should use transform3d for positioning', () => {
      initCustomCursor();
      
      const cursor = document.querySelector('.custom-cursor') as HTMLElement;

      // Move mouse
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 100,
      });
      document.dispatchEvent(mouseEvent);

      // Check initial transform is set (even if at 0,0)
      const transform = cursor.style.transform;
      expect(transform).toContain('translate3d');
    });
  });
});
