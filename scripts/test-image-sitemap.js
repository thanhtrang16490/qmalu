/**
 * Test script to verify image sitemap generation
 * Feature: on-page-seo-optimization
 * Task: 5.2 - Add image sitemap support
 */

import { generateSitemapXML } from './generate-sitemap.js';

// Sample product entries with images
const testEntries = [
  {
    url: 'https://qmalu.com/san-pham/thanh-ray-26x45',
    lastmod: '2026-03-03',
    changefreq: 'weekly',
    priority: 0.8,
    images: [
      {
        loc: 'https://qmalu.com/products/rail-26x45.jpg',
        title: 'Thanh Ray Nhôm 26x45mm A6005-T6',
        caption: 'Thanh ray nhôm A6005-T6 dài 4.2m, anod 10-12µm, cứng vững và chịu tải tốt',
      }
    ],
  },
  {
    url: 'https://qmalu.com/san-pham/kep-giua',
    lastmod: '2026-03-03',
    changefreq: 'weekly',
    priority: 0.8,
    images: [
      {
        loc: 'https://qmalu.com/products/mid-clamp.jpg',
        title: 'Kẹp Giữa Nhôm A6005-T6',
        caption: 'Kẹp giữa nhôm A6005-T6, dày 4mm, chịu lực tốt, bao gồm bulong và con chạy',
      }
    ],
  },
  {
    url: 'https://qmalu.com/san-pham/kep-bien',
    lastmod: '2026-03-03',
    changefreq: 'weekly',
    priority: 0.8,
    images: [
      {
        loc: 'https://qmalu.com/products/end-clamp.jpg',
        title: 'Kẹp Biên Nhôm A6005-T6',
      }
    ],
  },
  {
    url: 'https://qmalu.com/san-pham/no-image',
    lastmod: '2026-03-03',
    changefreq: 'weekly',
    priority: 0.8,
    // No images
  },
];

console.log('🧪 Testing image sitemap generation...\n');

// Generate sitemap XML
const xml = generateSitemapXML(testEntries);

console.log('Generated XML:\n');
console.log(xml);

// Verify the XML contains expected elements
const checks = [
  { name: 'Image namespace', test: xml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"') },
  { name: 'Image loc tag', test: xml.includes('<image:loc>') },
  { name: 'Image title tag', test: xml.includes('<image:title>') },
  { name: 'Image caption tag', test: xml.includes('<image:caption>') },
  { name: 'Multiple images', test: (xml.match(/<image:image>/g) || []).length === 3 },
  { name: 'No image tag for product without images', test: !xml.substring(xml.indexOf('no-image')).includes('<image:image>') },
  { name: 'XML escaping', test: xml.includes('&amp;') || !xml.includes(' & ') },
];

console.log('\n✅ Verification Results:\n');
checks.forEach(check => {
  const status = check.test ? '✓' : '✗';
  console.log(`${status} ${check.name}`);
});

const allPassed = checks.every(check => check.test);
if (allPassed) {
  console.log('\n✅ All checks passed! Image sitemap support is working correctly.');
  process.exit(0);
} else {
  console.log('\n❌ Some checks failed. Please review the implementation.');
  process.exit(1);
}
