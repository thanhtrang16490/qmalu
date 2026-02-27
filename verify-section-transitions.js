#!/usr/bin/env node

/**
 * Verification Script for Section Transitions
 * 
 * This script checks:
 * 1. Section transition CSS classes are defined
 * 2. Section transition library exists and exports correct functions
 * 3. Provides recommendations for applying transitions
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Section Transitions Implementation...\n');

// Check CSS file
const cssPath = path.join(__dirname, 'src/styles/global.css');
let cssContent = '';
try {
  cssContent = fs.readFileSync(cssPath, 'utf-8');
  console.log('✅ Found global.css');
} catch (error) {
  console.error('❌ Could not read global.css:', error.message);
  process.exit(1);
}

// Check for transition classes
const transitionTypes = ['blur', 'fade', 'clip', 'slide-up', 'slide-down', 'scale'];
const foundTransitions = [];
const missingTransitions = [];

transitionTypes.forEach(type => {
  const className = `.section-transition-${type}`;
  if (cssContent.includes(className)) {
    foundTransitions.push(type);
  } else {
    missingTransitions.push(type);
  }
});

console.log('\n📋 CSS Transition Classes:');
foundTransitions.forEach(type => {
  console.log(`  ✅ .section-transition-${type}`);
});

if (missingTransitions.length > 0) {
  console.log('\n⚠️  Missing transition classes:');
  missingTransitions.forEach(type => {
    console.log(`  ❌ .section-transition-${type}`);
  });
}

// Check TypeScript library
const libPath = path.join(__dirname, 'src/lib/section-transitions.ts');
let libContent = '';
try {
  libContent = fs.readFileSync(libPath, 'utf-8');
  console.log('\n✅ Found section-transitions.ts library');
} catch (error) {
  console.error('\n❌ Could not read section-transitions.ts:', error.message);
  process.exit(1);
}

// Check for required exports
const requiredExports = [
  'initSectionTransitions',
  'applySectionTransition',
  'applySectionTransitions'
];

console.log('\n📦 Library Exports:');
requiredExports.forEach(exportName => {
  if (libContent.includes(`export function ${exportName}`)) {
    console.log(`  ✅ ${exportName}`);
  } else {
    console.log(`  ❌ ${exportName} (missing)`);
  }
});

// Check homepage files for transition usage
const homepageFiles = [
  'src/pages/index.astro',
  'src/pages/en/index.astro',
  'src/pages/cn/index.astro'
];

console.log('\n🏠 Homepage Transition Usage:');
let transitionsApplied = false;

homepageFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const hasDataAttribute = content.includes('data-section-transition');
    const hasInitCall = content.includes('initSectionTransitions');
    
    console.log(`\n  ${file}:`);
    console.log(`    data-section-transition: ${hasDataAttribute ? '✅' : '❌'}`);
    console.log(`    initSectionTransitions(): ${hasInitCall ? '✅' : '❌'}`);
    
    if (hasDataAttribute || hasInitCall) {
      transitionsApplied = true;
    }
  } catch (error) {
    console.log(`  ⚠️  Could not read ${file}`);
  }
});

// Recommendations
console.log('\n\n📝 RECOMMENDATIONS:\n');

if (!transitionsApplied) {
  console.log('⚠️  Section transitions are NOT currently applied to homepage sections.');
  console.log('\nTo enable section transitions, you need to:');
  console.log('\n1. Add data-section-transition attributes to sections:');
  console.log('   <section data-section-transition="fade">...</section>');
  console.log('   <section data-section-transition="slide-up">...</section>');
  console.log('   <section data-section-transition="scale">...</section>');
  console.log('\n2. Initialize transitions in a script tag:');
  console.log('   <script>');
  console.log('     import { initSectionTransitions } from "../lib/section-transitions";');
  console.log('     initSectionTransitions();');
  console.log('   </script>');
  console.log('\n3. Recommended transition types per section:');
  console.log('   - Hero: No transition (immediate)');
  console.log('   - Stats/Counter: fade or slide-up');
  console.log('   - Products: scale');
  console.log('   - Testimonials: fade');
  console.log('   - Process Timeline: slide-up');
  console.log('   - FAQ: fade');
  console.log('   - Map: slide-up');
} else {
  console.log('✅ Section transitions are already applied!');
  console.log('\nCurrent implementation looks good.');
}

console.log('\n✨ Verification complete!\n');
