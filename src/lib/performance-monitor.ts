/**
 * Performance Monitor Utility
 * 
 * Detects low FPS and disables complex animations to maintain smooth experience.
 * Requirements: 25.8, 29.8
 */

interface PerformanceMetrics {
  fps: number;
  avgFps: number;
  isLowPerformance: boolean;
}

const FPS_THRESHOLD = 30; // Disable animations below 30 FPS
const SAMPLE_SIZE = 60; // Number of frames to average
const CHECK_INTERVAL = 2000; // Check every 2 seconds

let frameCount = 0;
let lastTime = performance.now();
let fpsHistory: number[] = [];
let isMonitoring = false;
let monitoringInterval: number | null = null;

/**
 * Calculate current FPS
 */
function calculateFPS(): number {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;
  
  if (deltaTime > 0) {
    const fps = 1000 / deltaTime;
    lastTime = currentTime;
    return fps;
  }
  
  return 60; // Default to 60 FPS
}

/**
 * Get average FPS from history
 */
function getAverageFPS(): number {
  if (fpsHistory.length === 0) return 60;
  
  const sum = fpsHistory.reduce((acc, fps) => acc + fps, 0);
  return sum / fpsHistory.length;
}

/**
 * Check if performance is low
 */
function checkPerformance(): PerformanceMetrics {
  const currentFPS = calculateFPS();
  
  // Add to history
  fpsHistory.push(currentFPS);
  
  // Keep only recent samples
  if (fpsHistory.length > SAMPLE_SIZE) {
    fpsHistory.shift();
  }
  
  const avgFps = getAverageFPS();
  const isLowPerformance = avgFps < FPS_THRESHOLD;
  
  return {
    fps: currentFPS,
    avgFps,
    isLowPerformance,
  };
}

/**
 * Disable complex animations
 */
function disableComplexAnimations() {
  // Add no-animations class to body
  document.body.classList.add('no-animations');
  
  // Log for debugging
  console.warn('Performance degradation detected. Disabling complex animations.');
  
  // Dispatch custom event for components to react
  window.dispatchEvent(new CustomEvent('performance-degradation', {
    detail: { avgFps: getAverageFPS() }
  }));
}

/**
 * Enable animations (if performance improves)
 */
function enableAnimations() {
  document.body.classList.remove('no-animations');
  
  console.log('Performance improved. Re-enabling animations.');
  
  window.dispatchEvent(new CustomEvent('performance-restored', {
    detail: { avgFps: getAverageFPS() }
  }));
}

/**
 * Monitor performance continuously
 */
function monitorPerformance() {
  const metrics = checkPerformance();
  
  if (metrics.isLowPerformance && !document.body.classList.contains('no-animations')) {
    disableComplexAnimations();
  } else if (!metrics.isLowPerformance && document.body.classList.contains('no-animations')) {
    // Only re-enable if performance has been good for a while
    const recentAvg = fpsHistory.slice(-10).reduce((a, b) => a + b, 0) / 10;
    if (recentAvg >= FPS_THRESHOLD + 10) { // Add buffer to prevent flickering
      enableAnimations();
    }
  }
}

/**
 * Start performance monitoring
 */
export function startPerformanceMonitoring() {
  if (isMonitoring) return;
  
  isMonitoring = true;
  lastTime = performance.now();
  fpsHistory = [];
  
  // Check performance periodically
  monitoringInterval = window.setInterval(monitorPerformance, CHECK_INTERVAL);
  
  // Add CSS for no-animations class
  if (!document.getElementById('performance-monitor-styles')) {
    const style = document.createElement('style');
    style.id = 'performance-monitor-styles';
    style.textContent = `
      /* Disable complex animations on low-performance devices */
      body.no-animations * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      
      body.no-animations [data-parallax],
      body.no-animations [data-depth] {
        transform: none !important;
      }
      
      body.no-animations .magnetic-button {
        transform: none !important;
      }
      
      body.no-animations .custom-cursor {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Stop performance monitoring
 */
export function stopPerformanceMonitoring() {
  if (!isMonitoring) return;
  
  isMonitoring = false;
  
  if (monitoringInterval) {
    clearInterval(monitoringInterval);
    monitoringInterval = null;
  }
  
  // Re-enable animations
  enableAnimations();
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  return {
    fps: fpsHistory[fpsHistory.length - 1] || 60,
    avgFps: getAverageFPS(),
    isLowPerformance: getAverageFPS() < FPS_THRESHOLD,
  };
}

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitor() {
  if (typeof window === 'undefined') return { fps: 60, avgFps: 60, isLowPerformance: false };
  
  return getPerformanceMetrics();
}

// Auto-start monitoring on page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startPerformanceMonitoring);
  } else {
    startPerformanceMonitoring();
  }
}
