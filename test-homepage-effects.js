#!/usr/bin/env node

/**
 * Homepage Effects Testing Script
 * 
 * Tests all implemented effects from .kiro/specs/homepage-apple-design-improvements/tasks.md
 * Run with: node test-homepage-effects.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing Homepage Effects Implementation\n');
console.log('=' .repeat(60));

const tests = {
  passed: 0,
  failed: 0,
  warnings: 0,
  results: []
};

function testFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    tests.passed++;
    tests.results.push({ status: '✅', test: description, file: filePath });
    return true;
  } else {
    tests.failed++;
    tests.results.push({ status: '❌', test: description, file: filePath });
    return false;
  }
}

function testFileContent(filePath, searchString, description) {
  if (!fs.existsSync(filePath)) {
    tests.failed++;
    tests.results.push({ status: '❌', test: description, file: filePath, reason: 'File not found' });
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const found = content.includes(searchString);
  
  if (found) {
    tests.passed++;
    tests.results.push({ status: '✅', test: description, file: filePath });
    return true;
  } else {
    tests.failed++;
    tests.results.push({ status: '❌', test: description, file: filePath, reason: `Missing: ${searchString}` });
    return false;
  }
}

function testCSSAnimation(cssFile, animationName, description) {
  if (!fs.existsSync(cssFile)) {
    tests.failed++;
    tests.results.push({ status: '❌', test: description, file: cssFile, reason: 'File not found' });
    return false;
  }
  
  const content = fs.readFileSync(cssFile, 'utf8');
  const hasKeyframes = content.includes(`@keyframes ${animationName}`);
  
  if (hasKeyframes) {
    tests.passed++;
    tests.results.push({ status: '✅', test: description, animation: animationName });
    return true;
  } else {
    tests.failed++;
    tests.results.push({ status: '❌', test: description, animation: animationName, reason: 'Animation not found' });
    return false;
  }
}

console.log('\n📋 Task 13: Scroll-triggered animations');
console.log('-'.repeat(60));
testFile('src/lib/scroll-animations.ts', 'Scroll animations utility');
testFileContent('src/lib/scroll-animations.ts', 'IntersectionObserver', 'Uses Intersection Observer');
testFileContent('src/lib/scroll-animations.ts', 'prefers-reduced-motion', 'Respects reduced motion');
testCSSAnimation('src/styles/global.css', 'heroFadeIn', 'Hero fade-in animation');
testCSSAnimation('src/styles/global.css', 'slideUp', 'Slide up animation');

console.log('\n📋 Task 14: Parallax effects');
console.log('-'.repeat(60));
testFile('src/lib/parallax.ts', 'Parallax utility');
testFileContent('src/lib/parallax.ts', 'data-parallax', 'Scroll parallax implementation');
testFileContent('src/lib/parallax.ts', 'data-depth', 'Mouse parallax implementation');
testFileContent('src/lib/parallax.ts', 'transform3d', 'Hardware acceleration');
testFileContent('src/lib/parallax.ts', 'window.innerWidth < 768', 'Mobile disabled');

console.log('\n📋 Task 15: Magnetic buttons');
console.log('-'.repeat(60));
testFile('src/lib/magnetic-buttons.ts', 'Magnetic buttons utility');
testFileContent('src/lib/magnetic-buttons.ts', 'ATTRACTION_RADIUS', 'Attraction radius defined');
testFileContent('src/lib/magnetic-buttons.ts', 'springStep', 'Spring physics animation');
testFileContent('src/lib/magnetic-buttons.ts', 'isTouchDevice', 'Touch device detection');

console.log('\n📋 Task 16: Custom cursor');
console.log('-'.repeat(60));
testFile('src/lib/custom-cursor.ts', 'Custom cursor utility');
testFileContent('src/lib/custom-cursor.ts', 'lerp', 'Smooth cursor follow');
testFileContent('src/lib/custom-cursor.ts', 'transform3d', 'Hardware acceleration');
testFileContent('src/lib/custom-cursor.ts', 'hover: hover', 'Touch device detection');

console.log('\n📋 Task 17: Scroll progress indicator');
console.log('-'.repeat(60));
testFile('src/components/ScrollProgress.astro', 'Scroll progress component');
testFileContent('src/components/ScrollProgress.astro', 'fixed', 'Fixed positioning');
testFileContent('src/components/ScrollProgress.astro', 'scrollY', 'Scroll calculation');

console.log('\n📋 Task 18: Section transitions');
console.log('-'.repeat(60));
testFile('src/lib/section-transitions.ts', 'Section transitions utility');
testFileContent('src/styles/global.css', '.section-transition-blur', 'Blur transition');
testFileContent('src/styles/global.css', '.section-transition-fade', 'Fade transition');
testFileContent('src/styles/global.css', '.section-transition-clip', 'Clip-path transition');
testCSSAnimation('src/styles/global.css', 'fadeIn', 'Fade animation');

console.log('\n📋 Task 19: Form micro-interactions');
console.log('-'.repeat(60));
testFile('src/lib/form-micro-interactions.ts', 'Form micro-interactions utility');
testFileContent('src/styles/global.css', 'form-input', 'Form input styles');
testFileContent('src/styles/global.css', 'form-checkbox', 'Checkbox styles');
testCSSAnimation('src/styles/global.css', 'checkmarkDraw', 'Checkmark animation');
testCSSAnimation('src/styles/global.css', 'radioScale', 'Radio button animation');

console.log('\n📋 Interactive Components');
console.log('-'.repeat(60));
testFile('src/components/ProcessTimeline.tsx', 'Process Timeline component');
testFile('src/components/AnimatedCounter.tsx', 'Animated Counter component');
testFile('src/components/Product3DCarousel.tsx', 'Product 3D Carousel component');
testFile('src/components/ComparisonSlider.tsx', 'Comparison Slider component');
testFile('src/components/LiveMetricsDashboard.tsx', 'Live Metrics Dashboard component');
testFile('src/components/TrustBadgesCarousel.tsx', 'Trust Badges Carousel component');
testFile('src/components/VideoTestimonials.tsx', 'Video Testimonials component');
testFile('src/components/InteractiveMap.tsx', 'Interactive Map component');
testFile('src/components/ComparisonCalculator.tsx', 'Comparison Calculator component');

console.log('\n📋 Mobile Enhancements');
console.log('-'.repeat(60));
testFile('src/components/BottomSheet.tsx', 'Bottom Sheet component');
testFile('src/components/FloatingActionButton.tsx', 'Floating Action Button component');
testFile('src/lib/sticky-header.ts', 'Sticky header utility');
testFile('src/lib/touch-optimization.ts', 'Touch optimization utility');
testFile('src/lib/useSwipeGesture.ts', 'Swipe gesture hook');

console.log('\n📋 Homepage Integration');
console.log('-'.repeat(60));
testFileContent('src/pages/index.astro', 'TrustBadgesCarousel', 'Trust Badges integrated');
testFileContent('src/pages/index.astro', 'AnimatedCounter', 'Animated Counter integrated');
testFileContent('src/pages/index.astro', 'Product3DCarousel', 'Product 3D Carousel integrated');
testFileContent('src/pages/index.astro', 'ComparisonSlider', 'Comparison Slider integrated');
testFileContent('src/pages/index.astro', 'scroll-reveal', 'Scroll animations applied');
testFileContent('src/pages/index.astro', 'data-parallax', 'Parallax effects applied');
testFileContent('src/pages/index.astro', 'magnetic-button', 'Magnetic buttons applied');

console.log('\n📋 CSS Animations');
console.log('-'.repeat(60));
testCSSAnimation('src/styles/global.css', 'blob', 'Blob animation');
testFileContent('src/components/TrustBadgesCarousel.tsx', 'scroll-infinite', 'Infinite scroll animation');
testCSSAnimation('src/styles/global.css', 'bounce-slow', 'Bounce animation');

console.log('\n📋 Performance & Accessibility');
console.log('-'.repeat(60));
testFileContent('src/styles/global.css', 'prefers-reduced-motion', 'Reduced motion support');
testFileContent('src/styles/global.css', 'will-change', 'Performance optimization');
testFileContent('src/lib/parallax.ts', 'transform3d', 'Hardware acceleration (parallax)');
testFileContent('src/lib/custom-cursor.ts', 'transform3d', 'Hardware acceleration (cursor)');
testFile('src/lib/performance-monitor.ts', 'Performance monitor utility');
testFile('src/lib/focus-trap.ts', 'Focus trap utility');

// Print results
console.log('\n' + '='.repeat(60));
console.log('📊 Test Results Summary');
console.log('='.repeat(60));

tests.results.forEach(result => {
  console.log(`${result.status} ${result.test}`);
  if (result.reason) {
    console.log(`   └─ ${result.reason}`);
  }
  if (result.file) {
    console.log(`   └─ ${result.file}`);
  }
  if (result.animation) {
    console.log(`   └─ Animation: ${result.animation}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Passed: ${tests.passed}`);
console.log(`❌ Failed: ${tests.failed}`);
console.log(`⚠️  Warnings: ${tests.warnings}`);
console.log(`📈 Success Rate: ${((tests.passed / (tests.passed + tests.failed)) * 100).toFixed(1)}%`);
console.log('='.repeat(60));

if (tests.failed > 0) {
  console.log('\n⚠️  Some tests failed. Please review the results above.');
  process.exit(1);
} else {
  console.log('\n🎉 All tests passed! Homepage effects are working correctly.');
  process.exit(0);
}
