/**
 * Unit tests for section transitions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initSectionTransitions,
  applySectionTransition,
  applySectionTransitions,
  type TransitionType,
} from './section-transitions';

describe('Section Transitions', () => {
  let mockIntersectionObserver: any;
  let observeCallback: IntersectionObserverCallback;
  let observedElements: Set<Element>;

  beforeEach(() => {
    observedElements = new Set();

    // Mock IntersectionObserver
    mockIntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => {
      observeCallback = callback;
      return {
        observe: vi.fn((element: Element) => {
          observedElements.add(element);
        }),
        unobserve: vi.fn((element: Element) => {
          observedElements.delete(element);
        }),
        disconnect: vi.fn(() => {
          observedElements.clear();
        }),
      };
    });

    global.IntersectionObserver = mockIntersectionObserver;

    // Mock matchMedia for reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  describe('initSectionTransitions', () => {
    it('should initialize transitions for elements with data-section-transition attribute', () => {
      // Create test elements
      const element1 = document.createElement('div');
      element1.dataset.sectionTransition = 'fade';
      document.body.appendChild(element1);

      const element2 = document.createElement('div');
      element2.dataset.sectionTransition = 'slide-up';
      document.body.appendChild(element2);

      // Initialize transitions
      const cleanup = initSectionTransitions();

      // Verify transition classes were added
      expect(element1.classList.contains('section-transition-fade')).toBe(true);
      expect(element2.classList.contains('section-transition-slide-up')).toBe(true);

      // Verify observers were created
      expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
      expect(observedElements.size).toBe(2);

      // Cleanup
      cleanup();
    });

    it('should skip transitions when prefers-reduced-motion is enabled', () => {
      // Mock reduced motion preference
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const element = document.createElement('div');
      element.dataset.sectionTransition = 'fade';
      document.body.appendChild(element);

      const cleanup = initSectionTransitions();

      // Verify no observers were created
      expect(mockIntersectionObserver).not.toHaveBeenCalled();

      cleanup();
    });

    it('should disable complex transitions on mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      const blurElement = document.createElement('div');
      blurElement.dataset.sectionTransition = 'blur';
      document.body.appendChild(blurElement);

      const fadeElement = document.createElement('div');
      fadeElement.dataset.sectionTransition = 'fade';
      document.body.appendChild(fadeElement);

      const cleanup = initSectionTransitions();

      // Blur should be skipped on mobile
      expect(blurElement.classList.contains('in-view')).toBe(true);
      expect(blurElement.classList.contains('section-transition-blur')).toBe(false);

      // Fade should still work on mobile
      expect(fadeElement.classList.contains('section-transition-fade')).toBe(true);

      cleanup();
    });

    it('should use custom threshold and rootMargin from data attributes', () => {
      const element = document.createElement('div');
      element.dataset.sectionTransition = 'fade';
      element.dataset.transitionThreshold = '0.8';
      element.dataset.transitionRootMargin = '100px';
      document.body.appendChild(element);

      initSectionTransitions();

      // Verify observer was created with custom options
      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 0.8,
          rootMargin: '100px',
        })
      );
    });

    it('should trigger transition when element enters viewport', () => {
      const element = document.createElement('div');
      element.dataset.sectionTransition = 'fade';
      document.body.appendChild(element);

      initSectionTransitions();

      // Simulate intersection
      const entries: IntersectionObserverEntry[] = [
        {
          target: element,
          isIntersecting: true,
          intersectionRatio: 0.5,
        } as IntersectionObserverEntry,
      ];

      observeCallback(entries, {} as IntersectionObserver);

      // Verify in-view class was added
      expect(element.classList.contains('in-view')).toBe(true);
    });

    it('should unobserve element after first intersection when once is true', () => {
      const element = document.createElement('div');
      element.dataset.sectionTransition = 'fade';
      document.body.appendChild(element);

      initSectionTransitions();

      const observer = mockIntersectionObserver.mock.results[0].value;

      // Simulate intersection
      const entries: IntersectionObserverEntry[] = [
        {
          target: element,
          isIntersecting: true,
          intersectionRatio: 0.5,
        } as IntersectionObserverEntry,
      ];

      observeCallback(entries, observer);

      // Verify unobserve was called
      expect(observer.unobserve).toHaveBeenCalledWith(element);
    });
  });

  describe('applySectionTransition', () => {
    it('should apply transition to a single element', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const cleanup = applySectionTransition(element, {
        type: 'slide-up',
        threshold: 0.5,
      });

      // Verify transition class was added
      expect(element.classList.contains('section-transition-slide-up')).toBe(true);

      // Verify observer was created
      expect(mockIntersectionObserver).toHaveBeenCalled();

      cleanup();
    });

    it('should handle blur transition with in-transition class', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      applySectionTransition(element, {
        type: 'blur',
      });

      // Simulate intersection
      const entries: IntersectionObserverEntry[] = [
        {
          target: element,
          isIntersecting: true,
          intersectionRatio: 0.5,
        } as IntersectionObserverEntry,
      ];

      observeCallback(entries, {} as IntersectionObserver);

      // Verify both classes were added
      expect(element.classList.contains('in-view')).toBe(true);
      expect(element.classList.contains('in-transition')).toBe(true);
    });

    it('should disable complex transitions on mobile when disableOnMobile is true', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      const element = document.createElement('div');
      document.body.appendChild(element);

      applySectionTransition(element, {
        type: 'blur',
        disableOnMobile: true,
      });

      // Verify in-view class was added immediately
      expect(element.classList.contains('in-view')).toBe(true);

      // Verify no observer was created
      expect(mockIntersectionObserver).not.toHaveBeenCalled();
    });

    it('should allow re-triggering when once is false', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      applySectionTransition(element, {
        type: 'fade',
        once: false,
      });

      const observer = mockIntersectionObserver.mock.results[0].value;

      // Simulate entering viewport
      let entries: IntersectionObserverEntry[] = [
        {
          target: element,
          isIntersecting: true,
          intersectionRatio: 0.5,
        } as IntersectionObserverEntry,
      ];

      observeCallback(entries, observer);
      expect(element.classList.contains('in-view')).toBe(true);

      // Simulate leaving viewport
      entries = [
        {
          target: element,
          isIntersecting: false,
          intersectionRatio: 0,
        } as IntersectionObserverEntry,
      ];

      observeCallback(entries, observer);
      expect(element.classList.contains('in-view')).toBe(false);

      // Verify unobserve was NOT called
      expect(observer.unobserve).not.toHaveBeenCalled();
    });
  });

  describe('applySectionTransitions', () => {
    it('should apply transitions to multiple elements', () => {
      const elements = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
      ];

      elements.forEach((el) => document.body.appendChild(el));

      const cleanup = applySectionTransitions(elements, {
        type: 'scale',
      });

      // Verify all elements have transition class
      elements.forEach((el) => {
        expect(el.classList.contains('section-transition-scale')).toBe(true);
      });

      // Verify observers were created for all elements
      expect(mockIntersectionObserver).toHaveBeenCalledTimes(3);

      cleanup();
    });

    it('should cleanup all observers when cleanup function is called', () => {
      const elements = [
        document.createElement('div'),
        document.createElement('div'),
      ];

      elements.forEach((el) => document.body.appendChild(el));

      const cleanup = applySectionTransitions(elements, {
        type: 'fade',
      });

      const observers = mockIntersectionObserver.mock.results.map((r: any) => r.value);

      cleanup();

      // Verify all observers were disconnected
      observers.forEach((observer: any) => {
        expect(observer.disconnect).toHaveBeenCalled();
      });
    });
  });

  describe('Transition Types', () => {
    const transitionTypes: TransitionType[] = [
      'blur',
      'fade',
      'clip',
      'slide-up',
      'slide-down',
      'scale',
    ];

    transitionTypes.forEach((type) => {
      it(`should apply ${type} transition correctly`, () => {
        const element = document.createElement('div');
        document.body.appendChild(element);

        applySectionTransition(element, { type });

        expect(element.classList.contains(`section-transition-${type}`)).toBe(true);
      });
    });
  });
});
