/**
 * Mobile Features Initialization
 * 
 * Initialize all Phase 4 mobile features
 */

import { initPullToRefresh } from './pull-to-refresh';
import { initSectionSwipeNavigation } from './swipe-gestures';
import { initHapticFeedback } from './haptic-feedback';
import { initPWAInstall } from './pwa-install';

export function initMobileFeatures() {
  if (typeof window === 'undefined') return;

  // Only initialize on mobile
  if (window.innerWidth >= 768) return;

  console.log('🚀 Initializing mobile features...');

  // 1. Pull-to-Refresh
  const pullToRefresh = initPullToRefresh({
    threshold: 80,
    onRefresh: async () => {
      console.log('Refreshing page...');
      // Custom refresh logic here
      // For now, just reload
      await new Promise(resolve => setTimeout(resolve, 500));
      window.location.reload();
    }
  });

  if (pullToRefresh) {
    console.log('✓ Pull-to-refresh enabled');
  }

  // 2. Swipe Gestures
  const swipeGestures = initSectionSwipeNavigation();
  
  if (swipeGestures) {
    console.log('✓ Swipe gestures enabled');
  }

  // 3. Haptic Feedback
  initHapticFeedback();
  console.log('✓ Haptic feedback enabled');

  // 4. PWA Install Prompt
  const pwaInstall = initPWAInstall();
  
  if (pwaInstall) {
    console.log('✓ PWA install prompt ready');
  }

  console.log('✅ Mobile features initialized');
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileFeatures);
  } else {
    initMobileFeatures();
  }
}
