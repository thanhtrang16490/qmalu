/**
 * Sitemap Generation Script
 * Feature: on-page-seo-optimization
 * 
 * Generates comprehensive sitemaps for the qmalu.com website including:
 * - Language-specific sitemaps (vi, en, cn)
 * - Sitemap index file
 * - Product pages with images
 * - Blog posts
 * - Static pages
 * 
 * Requirements: 8.1, 8.2, 8.4
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://qmalu.com';
const LANGUAGES = ['vi', 'en', 'cn'];

// Page type configuration for sitemap metadata
const PAGE_TYPE_CONFIG = {
  homepage: { changefreq: 'daily', priority: 1.0 },
  product: { changefreq: 'weekly', priority: 0.8 },
  'product-list': { changefreq: 'weekly', priority: 0.9 },
  'blog-post': { changefreq: 'monthly', priority: 0.6 },
  'blog-list': { changefreq: 'daily', priority: 0.7 },
  about: { changefreq: 'monthly', priority: 0.7 },
  contact: { changefreq: 'yearly', priority: 0.5 },
  faq: { changefreq: 'monthly', priority: 0.6 },
  generic: { changefreq: 'monthly', priority: 0.5 },
};

/**
 * Static pages configuration
 */
const staticPages = [
  // Homepage
  {
    path: '/',
    changefreq: PAGE_TYPE_CONFIG.homepage.changefreq,
    priority: PAGE_TYPE_CONFIG.homepage.priority,
    languages: ['vi', 'en', 'cn'],
  },
  
  // About pages
  {
    path: '/gioi-thieu',
    changefreq: PAGE_TYPE_CONFIG.about.changefreq,
    priority: PAGE_TYPE_CONFIG.about.priority,
    languages: ['vi'],
  },
  {
    path: '/about',
    changefreq: PAGE_TYPE_CONFIG.about.changefreq,
    priority: PAGE_TYPE_CONFIG.about.priority,
    languages: ['en', 'cn'],
  },
  
  // Product list pages
  {
    path: '/san-pham',
    changefreq: PAGE_TYPE_CONFIG['product-list'].changefreq,
    priority: PAGE_TYPE_CONFIG['product-list'].priority,
    languages: ['vi'],
  },
  {
    path: '/products',
    changefreq: PAGE_TYPE_CONFIG['product-list'].changefreq,
    priority: PAGE_TYPE_CONFIG['product-list'].priority,
    languages: ['en', 'cn'],
  },
  
  // Blog list pages
  {
    path: '/tin-tuc',
    changefreq: PAGE_TYPE_CONFIG['blog-list'].changefreq,
    priority: PAGE_TYPE_CONFIG['blog-list'].priority,
    languages: ['vi'],
  },
  {
    path: '/news',
    changefreq: PAGE_TYPE_CONFIG['blog-list'].changefreq,
    priority: PAGE_TYPE_CONFIG['blog-list'].priority,
    languages: ['en', 'cn'],
  },
  
  // Contact pages
  {
    path: '/lien-he',
    changefreq: PAGE_TYPE_CONFIG.contact.changefreq,
    priority: PAGE_TYPE_CONFIG.contact.priority,
    languages: ['vi'],
  },
  {
    path: '/contact',
    changefreq: PAGE_TYPE_CONFIG.contact.changefreq,
    priority: PAGE_TYPE_CONFIG.contact.priority,
    languages: ['en', 'cn'],
  },
  
  // FAQ pages
  {
    path: '/cau-hoi-thuong-gap',
    changefreq: PAGE_TYPE_CONFIG.faq.changefreq,
    priority: PAGE_TYPE_CONFIG.faq.priority,
    languages: ['vi'],
  },
  {
    path: '/faq',
    changefreq: PAGE_TYPE_CONFIG.faq.changefreq,
    priority: PAGE_TYPE_CONFIG.faq.priority,
    languages: ['en', 'cn'],
  },
  
  // Downloads pages
  {
    path: '/tai-lieu',
    changefreq: 'weekly',
    priority: 0.7,
    languages: ['vi'],
  },
  {
    path: '/downloads',
    changefreq: 'weekly',
    priority: 0.7,
    languages: ['en', 'cn'],
  },
  
  // Partners pages
  {
    path: '/doi-tac',
    changefreq: 'monthly',
    priority: 0.6,
    languages: ['vi'],
  },
  {
    path: '/partners',
    changefreq: 'monthly',
    priority: 0.6,
    languages: ['en', 'cn'],
  },
  
  // App pages
  {
    path: '/ung-dung',
    changefreq: 'monthly',
    priority: 0.6,
    languages: ['vi'],
  },
  {
    path: '/app',
    changefreq: 'monthly',
    priority: 0.6,
    languages: ['en', 'cn'],
  },
  
  // Legal pages (lower priority)
  {
    path: '/chinh-sach-bao-mat',
    changefreq: 'yearly',
    priority: 0.3,
    languages: ['vi'],
  },
  {
    path: '/privacy-policy',
    changefreq: 'yearly',
    priority: 0.3,
    languages: ['en', 'cn'],
  },
  {
    path: '/dieu-khoan-su-dung',
    changefreq: 'yearly',
    priority: 0.3,
    languages: ['vi'],
  },
  {
    path: '/terms-of-service',
    changefreq: 'yearly',
    priority: 0.3,
    languages: ['en', 'cn'],
  },
  {
    path: '/chinh-sach-cookie',
    changefreq: 'yearly',
    priority: 0.3,
    languages: ['vi'],
  },
  {
    path: '/cookie-policy',
    changefreq: 'yearly',
    priority: 0.3,
    languages: ['en', 'cn'],
  },
];

/**
 * Get product pages dynamically
 * 
 * Requirements: 8.7 - Include product images in sitemap with loc, title, caption
 */
async function getProductPages() {
  try {
    const { getProducts } = await import('../src/lib/supabase.ts');
    const products = await getProducts();
    
    return products.map(product => {
      // Prepare image data with proper title and caption
      const images = product.image_url ? [{
        loc: product.image_url.startsWith('http') 
          ? product.image_url 
          : `${SITE_URL}${product.image_url}`,
        title: product.name || product.slug,
        caption: product.description 
          ? product.description.substring(0, 150) // Limit caption length
          : `${product.name} - Nhôm Quang Minh A6005-T6`,
      }] : undefined;
      
      return {
        path: `/san-pham/${product.slug}`,
        changefreq: PAGE_TYPE_CONFIG.product.changefreq,
        priority: PAGE_TYPE_CONFIG.product.priority,
        languages: ['vi', 'en', 'cn'],
        images,
      };
    });
  } catch (error) {
    console.warn('⚠️  Could not fetch products:', error.message);
    return [];
  }
}

/**
 * Get blog post pages dynamically
 * 
 * Requirements: 8.7 - Include blog post images in sitemap with loc, title, caption
 */
async function getBlogPages() {
  try {
    const { allPosts } = await import('../src/data/blog-posts.ts');
    const { allPosts: allPostsEn } = await import('../src/data/blog-posts-en.ts');
    const { allPosts: allPostsCn } = await import('../src/data/blog-posts-cn.ts');
    
    const viPages = allPosts.map(post => ({
      path: `/tin-tuc/${post.slug}`,
      changefreq: PAGE_TYPE_CONFIG['blog-post'].changefreq,
      priority: PAGE_TYPE_CONFIG['blog-post'].priority,
      languages: ['vi'],
      images: post.image ? [{
        loc: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        title: post.title,
        caption: post.excerpt 
          ? post.excerpt.substring(0, 150) 
          : `${post.title} - Tin tức Nhôm Quang Minh`,
      }] : undefined,
    }));
    
    const enPages = allPostsEn.map(post => ({
      path: `/news/${post.slug}`,
      changefreq: PAGE_TYPE_CONFIG['blog-post'].changefreq,
      priority: PAGE_TYPE_CONFIG['blog-post'].priority,
      languages: ['en'],
      images: post.image ? [{
        loc: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        title: post.title,
        caption: post.excerpt 
          ? post.excerpt.substring(0, 150) 
          : `${post.title} - Quang Minh Aluminum News`,
      }] : undefined,
    }));
    
    const cnPages = allPostsCn.map(post => ({
      path: `/news/${post.slug}`,
      changefreq: PAGE_TYPE_CONFIG['blog-post'].changefreq,
      priority: PAGE_TYPE_CONFIG['blog-post'].priority,
      languages: ['cn'],
      images: post.image ? [{
        loc: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        title: post.title,
        caption: post.excerpt 
          ? post.excerpt.substring(0, 150) 
          : `${post.title} - 光明铝材新闻`,
      }] : undefined,
    }));
    
    return [...viPages, ...enPages, ...cnPages];
  } catch (error) {
    console.warn('⚠️  Could not load blog posts:', error.message);
    return [];
  }
}

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate sitemap XML from entries
 */
export function generateSitemapXML(entries) {
  const urls = entries.map(entry => {
    const imageSection = entry.images && entry.images.length > 0
      ? entry.images.map(img => `
    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>${img.title ? `
      <image:title>${escapeXml(img.title)}</image:title>` : ''}${img.caption ? `
      <image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>`).join('')
      : '';

    return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>${imageSection}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

/**
 * Generate language-specific sitemap
 */
export async function generateLanguageSitemap(lang) {
  const productPages = await getProductPages();
  const blogPages = await getBlogPages();
  const allPages = [...staticPages, ...productPages, ...blogPages];
  
  // Filter pages for this language
  const languagePages = allPages.filter(page => page.languages.includes(lang));
  
  // Convert to sitemap entries
  const entries = languagePages.map(page => {
    // Construct URL based on language
    let url;
    if (lang === 'vi') {
      // Vietnamese is at root
      url = `${SITE_URL}${page.path}`;
    } else {
      // English and Chinese have language prefix
      const pathWithoutLeadingSlash = page.path === '/' ? '' : page.path;
      url = `${SITE_URL}/${lang}${pathWithoutLeadingSlash}`;
    }
    
    return {
      url,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority,
      images: page.images,
    };
  });
  
  // Generate XML
  const xml = generateSitemapXML(entries);
  
  // Write to file
  const filename = `sitemap-${lang}.xml`;
  const filepath = join(process.cwd(), 'public', filename);
  writeFileSync(filepath, xml, 'utf-8');
  
  console.log(`✓ Generated ${filename} with ${entries.length} URLs`);
}

/**
 * Generate sitemap index file
 */
export function generateSitemapIndex() {
  const lastmod = new Date().toISOString().split('T')[0];
  
  const sitemaps = LANGUAGES.map(lang => `  <sitemap>
    <loc>${SITE_URL}/sitemap-${lang}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  const filepath = join(process.cwd(), 'public', 'sitemap-index.xml');
  writeFileSync(filepath, xml, 'utf-8');
  
  console.log(`✓ Generated sitemap-index.xml with ${LANGUAGES.length} sitemaps`);
}

/**
 * Main execution
 */
console.log('🗺️  Generating sitemaps...\n');

(async () => {
  try {
    // Generate language-specific sitemaps
    for (const lang of LANGUAGES) {
      await generateLanguageSitemap(lang);
    }
    
    // Generate sitemap index
    generateSitemapIndex();
    
    console.log('\n✅ Sitemap generation complete!');
  } catch (error) {
    console.error('\n❌ Error generating sitemaps:', error);
    process.exit(1);
  }
})();
