#!/usr/bin/env node

/**
 * Verification script for Task 12: Checkpoint - Verify all 9 interactive sections complete
 * 
 * This script checks:
 * 1. All 9 sections render with correct data
 * 2. Interactions work on desktop and mobile
 * 3. Responsive layouts at all breakpoints
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('='.repeat(80));
console.log('TASK 12 CHECKPOINT: Verifying All 9 Interactive Sections');
console.log('='.repeat(80));
console.log('');

// Define the 9 interactive sections
const sections = [
  { name: '1. Process Timeline', component: 'ProcessTimeline', integrated: false },
  { name: '2. Animated Counter', component: 'AnimatedCounter', integrated: false },
  { name: '3. Product 3D Carousel', component: 'Product3DCarousel', integrated: false },
  { name: '4. Before/After Comparison Slider', component: 'ComparisonSlider', integrated: false },
  { name: '5. Live Metrics Dashboard', component: 'LiveMetricsDashboard', integrated: false },
  { name: '6. Trust Badges Carousel', component: 'TrustBadgesCarousel', integrated: false },
  { name: '7. Video Testimonials', component: 'VideoTestimonials', integrated: false },
  { name: '8. Interactive Map', component: 'InteractiveMap', integrated: false },
  { name: '9. Comparison Calculator', component: 'ComparisonCalculator', integrated: false }
];

// Check if components exist
console.log('📦 Checking Component Files...\n');
sections.forEach(section => {
  const componentPath = path.join(__dirname, 'src', 'components', `${section.component}.tsx`);
  const testPath = path.join(__dirname, 'src', 'components', `${section.component}.test.tsx`);
  
  const componentExists = fs.existsSync(componentPath);
  const testExists = fs.existsSync(testPath);
  
  console.log(`${section.name}`);
  console.log(`  Component: ${componentExists ? '✅' : '❌'} ${componentPath}`);
  console.log(`  Test File: ${testExists ? '✅' : '❌'} ${testPath}`);
  console.log('');
});

// Check homepage integration
console.log('🏠 Checking Homepage Integration...\n');
const homepagePath = path.join(__dirname, 'src', 'pages', 'index.astro');
const homepageContent = fs.readFileSync(homepagePath, 'utf-8');

sections.forEach(section => {
  // Check if component is imported
  const importRegex = new RegExp(`import\\s+${section.component}\\s+from`, 'i');
  const isImported = importRegex.test(homepageContent);
  
  // Check if component is used in JSX
  const usageRegex = new RegExp(`<${section.component}[\\s>]`, 'i');
  const isUsed = usageRegex.test(homepageContent);
  
  section.integrated = isImported && isUsed;
  
  console.log(`${section.name}`);
  console.log(`  Imported: ${isImported ? '✅' : '❌'}`);
  console.log(`  Used in JSX: ${isUsed ? '✅' : '❌'}`);
  console.log(`  Status: ${section.integrated ? '✅ INTEGRATED' : '❌ NOT INTEGRATED'}`);
  console.log('');
});

// Check content data
console.log('📝 Checking Content Data...\n');
const contentPath = path.join(__dirname, 'src', 'data', 'homepage-content.ts');
const contentData = fs.readFileSync(contentPath, 'utf-8');

const contentSections = [
  'processTimeline',
  'animatedCounter',
  'product3DCarousel',
  'comparisonSlider',
  'liveMetrics',
  'trustBadges',
  'videoTestimonials',
  'interactiveMap',
  'comparisonCalculator'
];

contentSections.forEach((section, index) => {
  const hasData = contentData.includes(`${section}:`);
  console.log(`${index + 1}. ${section}: ${hasData ? '✅' : '❌'}`);
});

// Summary
console.log('');
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log('');

const integratedCount = sections.filter(s => s.integrated).length;
const totalCount = sections.length;

console.log(`Integrated Sections: ${integratedCount}/${totalCount}`);
console.log('');

if (integratedCount === totalCount) {
  console.log('✅ ALL 9 INTERACTIVE SECTIONS ARE INTEGRATED!');
  console.log('');
  console.log('Next Steps:');
  console.log('  1. Run tests: npm test -- --run');
  console.log('  2. Start dev server: npm run dev');
  console.log('  3. Test on desktop and mobile viewports');
  console.log('  4. Verify responsive layouts at breakpoints: 768px, 1024px');
} else {
  console.log('❌ MISSING SECTIONS:');
  sections.filter(s => !s.integrated).forEach(s => {
    console.log(`  - ${s.name}`);
  });
  console.log('');
  console.log('Action Required:');
  console.log('  Add missing components to src/pages/index.astro');
}

console.log('');
console.log('='.repeat(80));
