/**
 * Test script to verify sitemap exclusion logic
 * Validates that noindex pages and admin/private directories are excluded
 * 
 * Requirements: 8.6
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const EXCLUDED_PATHS = [
  '/test-3d',
  '/showcase',
  '/api',
  '/admin',
  '/private',
];

function testSitemapExclusion() {
  console.log('🧪 Testing sitemap exclusion logic...\n');
  
  let allTestsPassed = true;
  
  // Test each language sitemap
  const languages = ['vi', 'en', 'cn'];
  
  for (const lang of languages) {
    const filename = `sitemap-${lang}.xml`;
    const filepath = join(process.cwd(), 'public', filename);
    
    try {
      const content = readFileSync(filepath, 'utf-8');
      
      console.log(`Testing ${filename}:`);
      
      // Check that excluded paths are NOT in the sitemap
      for (const excludedPath of EXCLUDED_PATHS) {
        if (content.includes(excludedPath)) {
          console.error(`  ❌ FAIL: Found excluded path "${excludedPath}" in sitemap`);
          allTestsPassed = false;
        } else {
          console.log(`  ✓ PASS: Excluded path "${excludedPath}" not found`);
        }
      }
      
      // Count URLs
      const urlCount = (content.match(/<url>/g) || []).length;
      console.log(`  ℹ️  Total URLs: ${urlCount}`);
      
      // Verify sitemap has expected structure
      if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
        console.error(`  ❌ FAIL: Missing XML declaration`);
        allTestsPassed = false;
      } else {
        console.log(`  ✓ PASS: Valid XML structure`);
      }
      
      if (!content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
        console.error(`  ❌ FAIL: Missing sitemap namespace`);
        allTestsPassed = false;
      } else {
        console.log(`  ✓ PASS: Valid sitemap namespace`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`  ❌ ERROR: Could not read ${filename}:`, error.message);
      allTestsPassed = false;
    }
  }
  
  // Test sitemap index
  console.log('Testing sitemap.xml (index):');
  try {
    const indexPath = join(process.cwd(), 'public', 'sitemap.xml');
    const indexContent = readFileSync(indexPath, 'utf-8');
    
    if (!indexContent.includes('<sitemapindex')) {
      console.error('  ❌ FAIL: Missing sitemapindex element');
      allTestsPassed = false;
    } else {
      console.log('  ✓ PASS: Valid sitemap index structure');
    }
    
    // Check that all language sitemaps are referenced
    for (const lang of languages) {
      if (!indexContent.includes(`sitemap-${lang}.xml`)) {
        console.error(`  ❌ FAIL: Missing reference to sitemap-${lang}.xml`);
        allTestsPassed = false;
      } else {
        console.log(`  ✓ PASS: References sitemap-${lang}.xml`);
      }
    }
  } catch (error) {
    console.error('  ❌ ERROR: Could not read sitemap.xml:', error.message);
    allTestsPassed = false;
  }
  
  console.log('\n' + '='.repeat(50));
  if (allTestsPassed) {
    console.log('✅ All tests passed!');
    console.log('Noindex pages and admin/private directories are properly excluded.');
    process.exit(0);
  } else {
    console.error('❌ Some tests failed!');
    process.exit(1);
  }
}

testSitemapExclusion();
