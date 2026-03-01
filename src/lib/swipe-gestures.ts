/**
 * Swipe Gestures Library
 * 
 * Detect and handle swipe gestures for mobile navigation
 */

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

interface SwipeGestureOptions {
  threshold?: number;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  element?: HTMLElement;
}

export class SwipeGestures {
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private threshold: number;
  private element: HTMLElement;
  private handlers: {
    up?: () => void;
    down?: () => void;
    left?: () => void;
    right?: () => void;
  };

  constructor(options: SwipeGestureOptions = {}) {
    this.threshold = options.threshold || 50;
    this.element = options.element || document.body;
    this.handlers = {
      up: options.onSwipeUp,
      down: options.onSwipeDown,
      left: options.onSwipeLeft,
      right: options.onSwipeRight,
    };

    this.init();
  }

  private init() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }

  private handleTouchStart(e: TouchEvent) {
    this.startX = e.touches[0].pageX;
    this.startY = e.touches[0].pageY;
  }

  private handleTouchEnd(e: TouchEvent) {
    this.endX = e.changedTouches[0].pageX;
    this.endY = e.changedTouches[0].pageY;

    this.detectSwipe();
  }

  private detectSwipe() {
    const deltaX = this.endX - this.startX;
    const deltaY = this.endY - this.startY;

    // Determine if horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > this.threshold) {
        if (deltaX > 0) {
          this.handleSwipe('right');
        } else {
          this.handleSwipe('left');
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > this.threshold) {
        if (deltaY > 0) {
          this.handleSwipe('down');
        } else {
          this.handleSwipe('up');
        }
      }
    }
  }

  private handleSwipe(direction: SwipeDirection) {
    const handler = this.handlers[direction];
    if (handler) {
      handler();
      this.vibrate(10);
    }
  }

  private vibrate(duration: number) {
    if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  }

  public destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }
}

// Section navigation with swipe
export function initSectionSwipeNavigation() {
  if (typeof window === 'undefined' || window.innerWidth >= 768) {
    return null;
  }

  const sections = Array.from(document.querySelectorAll('section'));
  let currentSectionIndex = 0;

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      currentSectionIndex = index;
    }
  };

  return new SwipeGestures({
    threshold: 80,
    onSwipeUp: () => {
      // Swipe up = next section
      scrollToSection(currentSectionIndex + 1);
    },
    onSwipeDown: () => {
      // Swipe down = previous section (only if at top of current section)
      if (window.scrollY <= sections[currentSectionIndex]?.offsetTop + 50) {
        scrollToSection(currentSectionIndex - 1);
      }
    },
  });
}
