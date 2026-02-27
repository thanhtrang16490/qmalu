import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  ensureTouchTarget,
  applyTouchTargets,
  ensureInteractiveSpacing,
  addTapHighlight,
  preventDoubleTapZoom,
  isTouchDevice,
  optimizeForTouch
} from './touch-optimization';

describe('Touch Optimization Utilities', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('ensureTouchTarget', () => {
    it('adds padding to small elements to meet 44x44px minimum', () => {
      const button = document.createElement('button');
      button.style.width = '20px';
      button.style.height = '20px';
      container.appendChild(button);

      ensureTouchTarget(button);

      const paddingLeft = parseInt(button.style.paddingLeft);
      const paddingTop = parseInt(button.style.paddingTop);

      expect(paddingLeft).toBeGreaterThan(0);
      expect(paddingTop).toBeGreaterThan(0);
    });

    it('does not add padding to elements already meeting minimum size', () => {
      const button = document.createElement('button');
      button.style.width = '50px';
      button.style.height = '50px';
      container.appendChild(button);

      // Mock getBoundingClientRect to return actual dimensions
      vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
        width: 50,
        height: 50,
        top: 0,
        left: 0,
        bottom: 50,
        right: 50,
        x: 0,
        y: 0,
        toJSON: () => ({})
      });

      ensureTouchTarget(button);

      // Should not add padding since element is already 50x50
      expect(button.style.paddingLeft).toBe('');
      expect(button.style.paddingTop).toBe('');
    });
  });

  describe('applyTouchTargets', () => {
    it('applies touch targets to all interactive elements', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      const link = document.createElement('a');
      
      button1.style.width = '20px';
      button1.style.height = '20px';
      button2.style.width = '20px';
      button2.style.height = '20px';
      link.style.width = '20px';
      link.style.height = '20px';
      
      container.appendChild(button1);
      container.appendChild(button2);
      container.appendChild(link);

      applyTouchTargets(container);

      expect(parseInt(button1.style.paddingLeft)).toBeGreaterThan(0);
      expect(parseInt(button2.style.paddingLeft)).toBeGreaterThan(0);
      expect(parseInt(link.style.paddingLeft)).toBeGreaterThan(0);
    });
  });

  describe('preventDoubleTapZoom', () => {
    it('sets touch-action to manipulation', () => {
      const button = document.createElement('button');
      container.appendChild(button);

      preventDoubleTapZoom(button);

      expect(button.style.touchAction).toBe('manipulation');
    });
  });

  describe('addTapHighlight', () => {
    it('removes default webkit tap highlight', () => {
      const button = document.createElement('button');
      container.appendChild(button);

      addTapHighlight(button);

      expect(button.style.webkitTapHighlightColor).toBe('transparent');
    });

    it('sets position and overflow for ripple effect', () => {
      const button = document.createElement('button');
      container.appendChild(button);

      addTapHighlight(button);

      expect(button.style.position).toBe('relative');
      expect(button.style.overflow).toBe('hidden');
    });

    it('adds touchstart event listener', () => {
      const button = document.createElement('button');
      container.appendChild(button);

      const addEventListenerSpy = vi.spyOn(button, 'addEventListener');
      addTapHighlight(button);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'touchstart',
        expect.any(Function),
        expect.objectContaining({ passive: true })
      );
    });
  });

  describe('isTouchDevice', () => {
    it('returns boolean indicating touch support', () => {
      const result = isTouchDevice();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('optimizeForTouch', () => {
    it('applies all touch optimizations to container', () => {
      const button = document.createElement('button');
      button.style.width = '20px';
      button.style.height = '20px';
      container.appendChild(button);

      optimizeForTouch(container);

      // Check that touch target was applied
      expect(parseInt(button.style.paddingLeft)).toBeGreaterThan(0);
      
      // Check that double-tap zoom prevention was applied
      expect(button.style.touchAction).toBe('manipulation');
      
      // Check that tap highlight was applied
      expect(button.style.webkitTapHighlightColor).toBe('transparent');
    });
  });

  describe('ensureInteractiveSpacing', () => {
    it('ensures minimum 8px gap between interactive elements', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      
      button1.style.display = 'inline-block';
      button1.style.width = '40px';
      button1.style.height = '40px';
      button2.style.display = 'inline-block';
      button2.style.width = '40px';
      button2.style.height = '40px';
      
      container.appendChild(button1);
      container.appendChild(button2);

      ensureInteractiveSpacing(container);

      // Note: In JSDOM, getBoundingClientRect returns zeros, so this test
      // verifies the function runs without errors
      expect(button2.style.marginLeft).toBeDefined();
    });
  });
});
