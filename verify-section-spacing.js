#!/usr/bin/env node

/**
 * Section Spacing & Visual Transitions Verification
 * 
 * Checks the visual design and spacing between sections:
 * - Padding consistency (py-16, py-24, py-32)
 * - Background color transitions
 * - Visual separators
 * - Gradient overlays
 * - Section borders
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎨 Verifying Section Spacing & Visual Transitions...\n');

const homepageFiles = [
  { path: 'src/pages/index.astro', lang: 'Vietnamese' },
  { path: 'src/pages/en/index.astro', lang: 'English' },
  { path: 'src/pages/cn/index.astro', lang: 'Chinese' }
];

// Analyze each homepage file
homepageFiles.forEach(({ path: filePath, lang }) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📄 ${lang} Homepage: ${filePath}`);
  console.log('='.repeat(60));

  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
    
    // Extract all section tags
    const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
    const sections = [];
    let match;
    
    while ((match = sectionRegex.exec(content)) !== null) {
      sections.push(match[0]);
    }
    
    console.log(`\n📊 Found ${sections.length} sections\n`);
    
    // Analyze each section
    sections.forEach((section, index) => {
      console.log(`\n--- Section ${index + 1} ---`);
      
      // Extract section attributes
      const classMatch = section.match(/class="([^"]*)"/);
      const idMatch = section.match(/id="([^"]*)"/);
      
      const classes = classMatch ? classMatch[1] : '';
      const id = idMatch ? idMatch[1] : 'no-id';
      
      console.log(`ID: ${id}`);
      
      // Check padding
      const paddingClasses = classes.match(/py-\d+|pt-\d+|pb-\d+/g) || [];
      if (paddingClasses.length > 0) {
        console.log(`✅ Padding: ${paddingClasses.join(', ')}`);
      } else {
        console.log(`⚠️  No padding classes found`);
      }
      
      // Check background
      const bgClasses = classes.match(/bg-[^\s]+/g) || [];
      if (bgClasses.length > 0) {
        console.log(`🎨 Background: ${bgClasses.join(', ')}`);
      } else {
        console.log(`   No background classes`);
      }
      
      // Check for gradient
      if (classes.includes('gradient')) {
        console.log(`✨ Has gradient`);
      }
      
      // Check for overflow
      if (classes.includes('overflow-hidden')) {
        console.log(`📦 Overflow: hidden`);
      }
      
      // Check for relative positioning
      if (classes.includes('relative')) {
        console.log(`📍 Position: relative`);
      }
      
      // Check for absolute positioned children (overlays)
      if (section.includes('absolute inset-0')) {
        console.log(`🖼️  Has overlay/background layer`);
      }
    });
    
    // Summary analysis
    console.log(`\n\n${'─'.repeat(60)}`);
    console.log('📋 SUMMARY ANALYSIS');
    console.log('─'.repeat(60));
    
    // Count padding variations
    const py16Count = (content.match(/py-16/g) || []).length;
    const py24Count = (content.match(/py-24/g) || []).length;
    const py32Count = (content.match(/py-32/g) || []).length;
    
    console.log('\n📏 Padding Distribution:');
    console.log(`  py-16: ${py16Count} sections`);
    console.log(`  py-24: ${py24Count} sections`);
    console.log(`  py-32: ${py32Count} sections`);
    
    // Count background variations
    const bgWhite = (content.match(/bg-white/g) || []).length;
    const bgGray = (content.match(/bg-gray-/g) || []).length;
    const bgGradient = (content.match(/bg-gradient-/g) || []).length;
    
    console.log('\n🎨 Background Distribution:');
    console.log(`  bg-white: ${bgWhite} occurrences`);
    console.log(`  bg-gray-*: ${bgGray} occurrences`);
    console.log(`  bg-gradient-*: ${bgGradient} occurrences`);
    
    // Check for visual separators
    const hasBorders = content.includes('border-t') || content.includes('border-b');
    const hasDividers = content.includes('divider') || content.includes('separator');
    
    console.log('\n🔲 Visual Separators:');
    console.log(`  Borders: ${hasBorders ? '✅ Yes' : '❌ No'}`);
    console.log(`  Dividers: ${hasDividers ? '✅ Yes' : '❌ No'}`);
    
    // Check for spacing utilities
    const hasSpaceY = content.includes('space-y-');
    const hasGap = content.includes('gap-');
    
    console.log('\n📐 Spacing Utilities:');
    console.log(`  space-y-*: ${hasSpaceY ? '✅ Used' : '❌ Not used'}`);
    console.log(`  gap-*: ${hasGap ? '✅ Used' : '❌ Not used'}`);
    
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
  }
});

// Recommendations
console.log(`\n\n${'='.repeat(60)}`);
console.log('💡 RECOMMENDATIONS');
console.log('='.repeat(60));

console.log(`
📝 Best Practices for Section Transitions:

1. PADDING CONSISTENCY:
   ✅ Use py-32 for major sections (hero, products, testimonials)
   ✅ Use py-24 for medium sections (stats, features)
   ✅ Use py-16 for compact sections (banners, CTAs)

2. BACKGROUND ALTERNATION:
   ✅ Alternate between white and gray backgrounds
   ✅ Use gradients sparingly for emphasis
   ✅ Pattern: white → gray-50 → white → gradient → white

3. VISUAL FLOW:
   ✅ Add subtle shadows between sections
   ✅ Use overflow-hidden for sections with backgrounds
   ✅ Add relative positioning for overlay effects

4. SPACING RHYTHM:
   ✅ Maintain consistent vertical rhythm
   ✅ Use mb-16 or mb-20 for section headers
   ✅ Use space-y-8 or space-y-12 for content blocks

5. MOBILE OPTIMIZATION:
   ✅ Reduce padding on mobile (py-16 md:py-32)
   ✅ Simplify backgrounds on small screens
   ✅ Ensure touch targets are 44px minimum
`);

console.log('\n✨ Verification complete!\n');
