/**
 * UX Effects Verification Script
 * 
 * This script verifies that all UX effects are properly implemented:
 * - Scroll animations
 * - Parallax effects
 * - Magnetic buttons
 * - Custom cursor
 * - Scroll progress indicator
 * - Section transitions
 * - Form micro-interactions
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const results = {
  passed: [],
  failed: [],
  warnings: []
};

function checkFile(path, description) {
  if (existsSync(path)) {
    results.passed.push(`✓ ${description}: ${path}`);
    return true;
  } else {
    results.failed.push(`✗ ${description}: ${path} not found`);
    return false;
  }
}

function checkFileContent(path, pattern, description) {
  if (!existsSync(path)) {
    results.failed.push(`✗ ${description}: ${path} not found`);
    return false;
  }
  
  const content = readFileSync(path, 'utf-8');
  if (pattern.test(content)) {
    results.passed.push(`✓ ${description}`);
    return true;
  } else {
    results.failed.push(`✗ ${description}: pattern not found in ${path}`);
    return false;
  }
}

console.log('🔍 Verifying UX Effects Implementation...\n');

// 1. Scroll Animations
console.log('📜 Checking Scroll Animations...');
checkFile('src/lib/scroll-animations.ts', 'Scroll animations utility');
checkFile('src/lib/scroll-animations.test.ts', 'Scroll animations tests');
checkFileContent(
  'src/lib/scroll-animations.ts',
  /initScrollAnimations/,
  'Scroll animations initialization function'
);
checkFileContent(
  'src/lib/scroll-animations.ts',
  /IntersectionObserver/,
  'Intersection Observer usage'
);

// 2. Parallax Effects
console.log('\n🎨 Checking Parallax Effects...');
checkFile('src/lib/parallax.ts', 'Parallax utility');
checkFile('src/lib/parallax.test.ts', 'Parallax tests');
checkFileContent(
  'src/lib/parallax.ts',
  /initScrollParallax/,
  'Scroll parallax function'
);
checkFileContent(
  'src/lib/parallax.ts',
  /initMouseParallax/,
  'Mouse parallax function'
);
checkFileContent(
  'src/lib/parallax.ts',
  /transform3d/,
  'Hardware acceleration (transform3d)'
);

// 3. Magnetic Buttons
console.log('\n🧲 Checking Magnetic Buttons...');
checkFile('src/lib/magnetic-buttons.ts', 'Magnetic buttons utility');
checkFile('src/lib/magnetic-buttons.test.ts', 'Magnetic buttons tests');
checkFileContent(
  'src/lib/magnetic-buttons.ts',
  /initMagneticButtons/,
  'Magnetic buttons initialization'
);
checkFileContent(
  'src/lib/magnetic-buttons.ts',
  /spring/i,
  'Spring animation configuration'
);

// 4. Custom Cursor
console.log('\n🖱️  Checking Custom Cursor...');
checkFile('src/lib/custom-cursor.ts', 'Custom cursor utility');
checkFile('src/lib/custom-cursor.test.ts', 'Custom cursor tests');
checkFileContent(
  'src/lib/custom-cursor.ts',
  /initCustomCursor/,
  'Custom cursor initialization'
);
checkFileContent(
  'src/lib/custom-cursor.ts',
  /lerp|interpolat/i,
  'Smooth cursor following (lerp/interpolation)'
);

// 5. Scroll Progress Indicator
console.log('\n📊 Checking Scroll Progress Indicator...');
checkFile('src/components/ScrollProgress.astro', 'Scroll progress component');
checkFileContent(
  'src/components/ScrollProgress.astro',
  /scroll/i,
  'Scroll progress implementation'
);

// 6. Section Transitions
console.log('\n🔄 Checking Section Transitions...');
checkFile('src/lib/section-transitions.ts', 'Section transitions utility');
checkFile('src/lib/section-transitions.test.ts', 'Section transitions tests');
checkFileContent(
  'src/lib/section-transitions.ts',
  /initSectionTransitions/,
  'Section transitions initialization'
);
checkFileContent(
  'src/styles/global.css',
  /section-transition-blur/,
  'Blur transition CSS'
);
checkFileContent(
  'src/styles/global.css',
  /section-transition-fade/,
  'Fade transition CSS'
);
checkFileContent(
  'src/styles/global.css',
  /section-transition-clip/,
  'Clip-path transition CSS'
);
checkFileContent(
  'src/styles/global.css',
  /section-transition-slide/,
  'Slide transition CSS'
);
checkFileContent(
  'src/styles/global.css',
  /section-transition-scale/,
  'Scale transition CSS'
);

// 7. Form Micro-Interactions
console.log('\n📝 Checking Form Micro-Interactions...');
checkFile('src/lib/form-micro-interactions.ts', 'Form micro-interactions utility');
checkFile('src/lib/form-micro-interactions.test.ts', 'Form micro-interactions tests');
checkFileContent(
  'src/lib/form-micro-interactions.ts',
  /initFormMicroInteractions/,
  'Form micro-interactions initialization'
);
checkFileContent(
  'src/styles/global.css',
  /form-checkbox.*checkmark/s,
  'Checkbox checkmark animation CSS'
);
checkFileContent(
  'src/styles/global.css',
  /form-toggle-handle/,
  'Toggle switch handle animation CSS'
);
checkFileContent(
  'src/styles/global.css',
  /form-input.*focus/s,
  'Input focus animation CSS'
);
checkFileContent(
  'src/styles/global.css',
  /form-error|form-success/,
  'Validation feedback CSS'
);

// 8. Accessibility - Reduced Motion Support
console.log('\n♿ Checking Accessibility...');
checkFileContent(
  'src/styles/global.css',
  /prefers-reduced-motion/,
  'Reduced motion media query'
);
checkFileContent(
  'src/lib/scroll-animations.ts',
  /prefers-reduced-motion/,
  'Reduced motion check in scroll animations'
);
checkFileContent(
  'src/lib/section-transitions.ts',
  /prefers-reduced-motion/,
  'Reduced motion check in section transitions'
);
checkFileContent(
  'src/lib/form-micro-interactions.ts',
  /prefers-reduced-motion/,
  'Reduced motion check in form interactions'
);

// 9. Mobile Optimization
console.log('\n📱 Checking Mobile Optimization...');
checkFileContent(
  'src/lib/parallax.ts',
  /768|mobile/i,
  'Mobile detection for parallax'
);
checkFileContent(
  'src/lib/magnetic-buttons.ts',
  /touch|hover/i,
  'Touch device detection for magnetic buttons'
);
checkFileContent(
  'src/lib/custom-cursor.ts',
  /touch|hover/i,
  'Touch device detection for custom cursor'
);
checkFileContent(
  'src/styles/global.css',
  /@media.*max-width.*767/,
  'Mobile-specific CSS rules'
);

// Print Results
console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION RESULTS');
console.log('='.repeat(60));

if (results.passed.length > 0) {
  console.log('\n✅ PASSED (' + results.passed.length + '):');
  results.passed.forEach(msg => console.log('  ' + msg));
}

if (results.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS (' + results.warnings.length + '):');
  results.warnings.forEach(msg => console.log('  ' + msg));
}

if (results.failed.length > 0) {
  console.log('\n❌ FAILED (' + results.failed.length + '):');
  results.failed.forEach(msg => console.log('  ' + msg));
}

console.log('\n' + '='.repeat(60));
console.log(`Total: ${results.passed.length} passed, ${results.failed.length} failed, ${results.warnings.length} warnings`);
console.log('='.repeat(60) + '\n');

// Exit with error code if any checks failed
if (results.failed.length > 0) {
  process.exit(1);
}

console.log('✨ All UX effects are properly implemented!\n');
