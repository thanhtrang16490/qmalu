/**
 * Haptic Feedback Utility
 * 
 * Provides haptic feedback for mobile interactions
 */

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const HAPTIC_PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 30,
  success: [10, 50, 10],
  warning: [20, 100, 20],
  error: [30, 100, 30, 100, 30],
};

export class HapticFeedback {
  private isSupported: boolean;

  constructor() {
    this.isSupported = 'vibrate' in navigator;
  }

  /**
   * Trigger haptic feedback with a pattern
   */
  public trigger(pattern: HapticPattern = 'light') {
    if (!this.isSupported) return;

    const vibrationPattern = HAPTIC_PATTERNS[pattern];
    navigator.vibrate(vibrationPattern);
  }

  /**
   * Trigger custom vibration pattern
   */
  public custom(pattern: number | number[]) {
    if (!this.isSupported) return;
    navigator.vibrate(pattern);
  }

  /**
   * Stop all vibrations
   */
  public stop() {
    if (!this.isSupported) return;
    navigator.vibrate(0);
  }

  /**
   * Check if haptic feedback is supported
   */
  public get supported(): boolean {
    return this.isSupported;
  }
}

// Singleton instance
const haptic = new HapticFeedback();

// Convenience functions
export const triggerHaptic = (pattern: HapticPattern = 'light') => haptic.trigger(pattern);
export const customHaptic = (pattern: number | number[]) => haptic.custom(pattern);
export const stopHaptic = () => haptic.stop();

// Auto-add haptic feedback to interactive elements
export function initHapticFeedback() {
  if (typeof window === 'undefined' || window.innerWidth >= 768) {
    return;
  }

  // Add haptic to buttons
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.getAttribute('role') === 'button'
    ) {
      triggerHaptic('light');
    }
  }, { passive: true });

  // Add haptic to form submissions
  document.addEventListener('submit', () => {
    triggerHaptic('success');
  }, { passive: true });

  // Add haptic to input focus
  document.addEventListener('focusin', (e) => {
    const target = e.target as HTMLElement;
    
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT'
    ) {
      triggerHaptic('light');
    }
  }, { passive: true });
}

export default haptic;
