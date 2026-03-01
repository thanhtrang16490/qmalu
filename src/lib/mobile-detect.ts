/**
 * Mobile Detection Utilities
 * 
 * Utilities for detecting mobile devices and touch capabilities
 */

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

export const isTouch = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const isMobileDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

export const shouldDisableAnimations = (): boolean => {
  // Disable animations on mobile for performance
  return isMobile() || isMobileDevice();
};

export const shouldEnableParallax = (): boolean => {
  // Only enable parallax on desktop
  return isDesktop() && !isTouch();
};

export const shouldEnableMagneticButtons = (): boolean => {
  // Only enable magnetic buttons on desktop with mouse
  return isDesktop() && !isTouch();
};
