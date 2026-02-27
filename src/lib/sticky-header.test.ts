import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initStickyHeader } from './sticky-header';

describe('Sticky Header', () => {
  let header: HTMLElement;
  let cleanup: (() => void) | undefined;

  beforeEach(() => {
    header = document.createElement('header');
    header.id = 'test-header';
    document.body.appendChild(header);
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
      cleanup = undefined;
    }
    document.body.removeChild(header);
    window.scrollTo(0, 0);
  });

  it('initializes with fixed positioning', () => {
    cleanup = initStickyHeader('#test-header');

    expect(header.style.position).toBe('fixed');
    expect(header.style.top).toBe('0px');
    expect(header.style.zIndex).toBe('100');
  });

  it('adds sticky class after scrolling past threshold', () => {
    cleanup = initStickyHeader('#test-header', { threshold: 100 });

    // Simulate scroll past threshold
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 150
    });

    window.dispatchEvent(new Event('scroll'));

    // Wait for requestAnimationFrame
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        expect(header.classList.contains('sticky')).toBe(true);
        expect(header.style.background).toContain('rgba(255, 255, 255, 0.8)');
        expect(header.style.backdropFilter).toBe('blur(12px)');
        expect(header.style.boxShadow).toBeTruthy();
        resolve();
      });
    });
  });

  it('removes sticky class when scrolled back to top', () => {
    cleanup = initStickyHeader('#test-header', { threshold: 100 });

    // First scroll past threshold
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 150
    });
    window.dispatchEvent(new Event('scroll'));

    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        expect(header.classList.contains('sticky')).toBe(true);

        // Then scroll back to top
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          configurable: true,
          value: 0
        });
        window.dispatchEvent(new Event('scroll'));

        requestAnimationFrame(() => {
          expect(header.classList.contains('sticky')).toBe(false);
          expect(header.style.background).toBe('');
          resolve();
        });
      });
    });
  });

  it('applies transition styles', () => {
    cleanup = initStickyHeader('#test-header', { transitionDuration: 300 });

    expect(header.style.transition).toContain('transform 300ms');
    expect(header.style.transition).toContain('background 300ms');
    expect(header.style.transition).toContain('box-shadow 300ms');
  });

  it('uses custom threshold', () => {
    cleanup = initStickyHeader('#test-header', { threshold: 200 });

    // Scroll to 150px (below custom threshold)
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 150
    });
    window.dispatchEvent(new Event('scroll'));

    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        expect(header.classList.contains('sticky')).toBe(false);

        // Scroll to 250px (above custom threshold)
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          configurable: true,
          value: 250
        });
        window.dispatchEvent(new Event('scroll'));

        requestAnimationFrame(() => {
          expect(header.classList.contains('sticky')).toBe(true);
          resolve();
        });
      });
    });
  });

  it('cleans up on unmount', () => {
    cleanup = initStickyHeader('#test-header');

    expect(header.style.position).toBe('fixed');

    cleanup();

    expect(header.style.position).toBe('');
    expect(header.classList.contains('sticky')).toBe(false);
  });

  it('warns when header element not found', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    cleanup = initStickyHeader('#non-existent-header');

    expect(consoleSpy).toHaveBeenCalledWith(
      'Sticky header: Element "#non-existent-header" not found'
    );

    consoleSpy.mockRestore();
  });

  it('uses default threshold of 100px', () => {
    cleanup = initStickyHeader('#test-header');

    // Scroll to 99px (below default threshold)
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 99
    });
    window.dispatchEvent(new Event('scroll'));

    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        expect(header.classList.contains('sticky')).toBe(false);

        // Scroll to 101px (above default threshold)
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          configurable: true,
          value: 101
        });
        window.dispatchEvent(new Event('scroll'));

        requestAnimationFrame(() => {
          expect(header.classList.contains('sticky')).toBe(true);
          resolve();
        });
      });
    });
  });
});
