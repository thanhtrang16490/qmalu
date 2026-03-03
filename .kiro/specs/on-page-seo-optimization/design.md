# Design Document - On-Page SEO Optimization

## Overview

Hệ thống On-Page SEO Optimization được thiết kế để tự động hóa và tối ưu hóa các yếu tố SEO quan trọng cho website Quang Minh (qmalu.com). Hệ thống bao gồm các module độc lập nhưng tích hợp chặt chẽ để xử lý meta tags, structured data (Schema.org), sitemap generation, URL optimization, keyword analysis, và internal linking strategy.

### Design Goals

1. **Automation**: Tự động tạo và cập nhật các yếu tố SEO mà không cần can thiệp thủ công
2. **Consistency**: Đảm bảo tính nhất quán của SEO elements trên toàn bộ website
3. **Multilingual Support**: Hỗ trợ đầy đủ cho 3 ngôn ngữ (VI, EN, CN) với proper hreflang implementation
4. **Performance**: Không ảnh hưởng đến build time và runtime performance
5. **Maintainability**: Code structure rõ ràng, dễ mở rộng và bảo trì
6. **Type Safety**: Sử dụng TypeScript để đảm bảo type safety cho tất cả SEO utilities

### Key Features

- **Meta Generator**: Tự động tạo optimized meta tags (title, description, OG, Twitter Card)
- **Schema Generator**: Tạo structured data theo chuẩn Schema.org (Product, Organization, FAQ, LocalBusiness, BreadcrumbList, Review)
- **Sitemap Generator**: Tự động tạo và cập nhật sitemap.xml cho tất cả pages và languages
- **URL Optimizer**: Tạo SEO-friendly URLs với proper slug generation và canonical URLs
- **Keyword Analyzer**: Phân tích keyword density và đề xuất optimization
- **Internal Linker**: Tự động tạo contextual internal links
- **Multilingual SEO**: Proper hreflang tags và language-specific optimization

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Astro Pages Layer                        │
│  (index.astro, products/[slug].astro, blog/[slug].astro)   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   BaseLayout Component                       │
│         (Integrates all SEO components)                      │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Meta         │ │ Schema       │ │ Hreflang     │
│ Generator    │ │ Generator    │ │ Manager      │
└──────────────┘ └──────────────┘ └──────────────┘
        │            │            │
        └────────────┼────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    SEO Utilities Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ URL          │  │ Keyword      │  │ Internal     │     │
│  │ Optimizer    │  │ Analyzer     │  │ Linker       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Build-Time Generators                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Sitemap      │  │ Robots.txt   │  │ SEO Health   │     │
│  │ Generator    │  │ Generator    │  │ Monitor      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Module Responsibilities

#### 1. Meta Generator (`src/lib/seo/meta-generator.ts`)
- Tạo meta title và description với optimal length
- Tạo Open Graph tags
- Tạo Twitter Card tags
- Inject keywords vào meta tags một cách tự nhiên
- Đảm bảo uniqueness của meta tags

#### 2. Schema Generator (`src/lib/seo/schema-generator.ts`)
- Tạo Product schema cho product pages
- Tạo Organization schema cho website
- Tạo FAQPage schema cho FAQ pages
- Tạo LocalBusiness schema với geo coordinates
- Tạo BreadcrumbList schema cho navigation
- Tạo AggregateRating schema cho products với reviews
- Output JSON-LD format

#### 3. URL Optimizer (`src/lib/seo/url-optimizer.ts`)
- Tạo kebab-case slugs
- Remove Vietnamese diacritics
- Inject keywords vào URLs
- Tạo canonical URLs
- Manage URL hierarchy

#### 4. Keyword Analyzer (`src/lib/seo/keyword-analyzer.ts`)
- Calculate keyword density
- Detect keyword stuffing
- Suggest keyword placement
- Identify LSI keywords
- Analyze search intent
- Suggest long-tail keywords

#### 5. Internal Linker (`src/lib/seo/internal-linker.ts`)
- Tạo contextual links từ blog posts đến product pages
- Tạo related products links
- Tạo breadcrumb navigation
- Manage link distribution

#### 6. Sitemap Generator (`scripts/generate-sitemap.ts`)
- Tạo sitemap.xml cho tất cả public pages
- Tạo separate sitemaps cho mỗi language
- Tạo sitemap index file
- Tạo image sitemap
- Auto-update on build

#### 7. Hreflang Manager (`src/lib/seo/hreflang-manager.ts`)
- Tạo hreflang tags cho multilingual pages
- Manage x-default tag
- Ensure proper language URL structure

#### 8. SEO Health Monitor (`src/lib/seo/seo-health-monitor.ts`)
- Check broken internal links
- Check missing meta tags
- Check duplicate meta tags
- Check missing alt texts
- Validate schema markup
- Generate SEO health reports

### Data Flow

1. **Page Request** → Astro page component receives props
2. **Meta Generation** → Meta Generator creates optimized meta tags based on page type and content
3. **Schema Generation** → Schema Generator creates appropriate structured data
4. **URL Processing** → URL Optimizer ensures proper URL structure
5. **Content Analysis** → Keyword Analyzer validates content optimization
6. **Link Injection** → Internal Linker adds contextual links
7. **Render** → BaseLayout renders page with all SEO elements
8. **Build Time** → Sitemap Generator creates/updates sitemap.xml

## Components and Interfaces

### Core Types

```typescript
// src/lib/seo/types.ts

export type Language = 'vi' | 'en' | 'cn';

export type PageType = 
  | 'homepage' 
  | 'product' 
  | 'product-list' 
  | 'blog-post' 
  | 'blog-list'
  | 'about'
  | 'contact'
  | 'faq'
  | 'generic';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  lang: Language;
  pageType: PageType;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogLocale: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string | string[];
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: {
    '@type': 'Offer';
    price?: string;
    priceCurrency?: string;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
  };
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
  sameAs?: string[];
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  image: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  telephone: string;
  openingHours?: string[];
  url: string;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface KeywordAnalysis {
  keyword: string;
  density: number;
  count: number;
  positions: number[];
  isOptimal: boolean;
  warning?: string;
  suggestions?: string[];
}

export interface InternalLink {
  text: string;
  url: string;
  title?: string;
  rel?: string;
}

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

export interface HreflangTag {
  lang: string;
  url: string;
}

export interface SEOHealthIssue {
  severity: 'critical' | 'warning' | 'info';
  type: string;
  message: string;
  location: string;
  suggestedFix?: string;
}

export interface SEOHealthReport {
  timestamp: string;
  totalPages: number;
  issues: SEOHealthIssue[];
  summary: {
    critical: number;
    warning: number;
    info: number;
  };
}
```

### Meta Generator Interface

```typescript
// src/lib/seo/meta-generator.ts

export interface MetaGeneratorOptions {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  lang: Language;
  pageType: PageType;
  siteUrl: string;
}

export class MetaGenerator {
  private readonly MIN_TITLE_LENGTH = 50;
  private readonly MAX_TITLE_LENGTH = 60;
  private readonly MIN_DESCRIPTION_LENGTH = 150;
  private readonly MAX_DESCRIPTION_LENGTH = 160;
  
  /**
   * Generate optimized meta tags for a page
   */
  generate(options: MetaGeneratorOptions): MetaTags;
  
  /**
   * Optimize title length and keyword placement
   */
  private optimizeTitle(title: string, keywords: string[]): string;
  
  /**
   * Optimize description with CTA and keywords
   */
  private optimizeDescription(description: string, keywords: string[]): string;
  
  /**
   * Generate Open Graph tags
   */
  private generateOGTags(options: MetaGeneratorOptions): Partial<MetaTags>;
  
  /**
   * Generate Twitter Card tags
   */
  private generateTwitterTags(options: MetaGeneratorOptions): Partial<MetaTags>;
  
  /**
   * Ensure meta tags are unique
   */
  private ensureUniqueness(tags: MetaTags, existingTags: MetaTags[]): MetaTags;
}
```

### Schema Generator Interface

```typescript
// src/lib/seo/schema-generator.ts

export interface ProductSchemaOptions {
  name: string;
  description: string;
  image: string | string[];
  url: string;
  price?: string;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: {
    value: number;
    count: number;
    best: number;
  };
}

export interface FAQSchemaOptions {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface BreadcrumbSchemaOptions {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export class SchemaGenerator {
  /**
   * Generate Product schema
   */
  generateProductSchema(options: ProductSchemaOptions): ProductSchema;
  
  /**
   * Generate Organization schema
   */
  generateOrganizationSchema(lang: Language): OrganizationSchema;
  
  /**
   * Generate FAQPage schema
   */
  generateFAQSchema(options: FAQSchemaOptions): FAQSchema;
  
  /**
   * Generate LocalBusiness schema
   */
  generateLocalBusinessSchema(lang: Language): LocalBusinessSchema;
  
  /**
   * Generate BreadcrumbList schema
   */
  generateBreadcrumbSchema(options: BreadcrumbSchemaOptions): BreadcrumbSchema;
  
  /**
   * Convert schema to JSON-LD string
   */
  toJSONLD(schema: any): string;
  
  /**
   * Validate schema structure
   */
  private validateSchema(schema: any): boolean;
}
```

### URL Optimizer Interface

```typescript
// src/lib/seo/url-optimizer.ts

export interface URLOptimizerOptions {
  text: string;
  maxLength?: number;
  keywords?: string[];
  lang: Language;
}

export class URLOptimizer {
  private readonly MAX_SLUG_LENGTH = 60;
  
  /**
   * Generate SEO-friendly slug from text
   */
  generateSlug(options: URLOptimizerOptions): string;
  
  /**
   * Remove Vietnamese diacritics
   */
  private removeDiacritics(text: string): string;
  
  /**
   * Convert to kebab-case
   */
  private toKebabCase(text: string): string;
  
  /**
   * Inject keywords into slug naturally
   */
  private injectKeywords(slug: string, keywords: string[]): string;
  
  /**
   * Generate canonical URL
   */
  generateCanonicalURL(path: string, lang: Language, siteUrl: string): string;
  
  /**
   * Validate URL structure
   */
  validateURL(url: string): boolean;
}
```

### Keyword Analyzer Interface

```typescript
// src/lib/seo/keyword-analyzer.ts

export interface KeywordAnalyzerOptions {
  content: string;
  keywords: string[];
  minDensity?: number;
  maxDensity?: number;
}

export class KeywordAnalyzer {
  private readonly MIN_DENSITY = 0.01; // 1%
  private readonly MAX_DENSITY = 0.02; // 2%
  
  /**
   * Analyze keyword density in content
   */
  analyzeKeywords(options: KeywordAnalyzerOptions): KeywordAnalysis[];
  
  /**
   * Calculate keyword density
   */
  private calculateDensity(content: string, keyword: string): number;
  
  /**
   * Find keyword positions in content
   */
  private findKeywordPositions(content: string, keyword: string): number[];
  
  /**
   * Check for keyword stuffing
   */
  private checkKeywordStuffing(density: number): boolean;
  
  /**
   * Suggest keyword placement
   */
  suggestPlacement(content: string, keyword: string): string[];
  
  /**
   * Identify LSI keywords
   */
  identifyLSIKeywords(primaryKeyword: string): string[];
  
  /**
   * Analyze search intent
   */
  analyzeSearchIntent(keyword: string): 'informational' | 'navigational' | 'transactional' | 'commercial';
  
  /**
   * Suggest long-tail keywords
   */
  suggestLongTailKeywords(primaryKeyword: string): string[];
}
```

### Internal Linker Interface

```typescript
// src/lib/seo/internal-linker.ts

export interface InternalLinkerOptions {
  content: string;
  currentUrl: string;
  lang: Language;
  maxLinksPerTarget?: number;
}

export class InternalLinker {
  private readonly MAX_LINKS_PER_TARGET = 5;
  private readonly MIN_INTERNAL_LINKS = 3;
  
  /**
   * Generate contextual internal links
   */
  generateLinks(options: InternalLinkerOptions): InternalLink[];
  
  /**
   * Find link opportunities in content
   */
  private findLinkOpportunities(content: string, lang: Language): InternalLink[];
  
  /**
   * Generate related product links
   */
  generateRelatedProductLinks(productSlug: string, lang: Language): InternalLink[];
  
  /**
   * Generate breadcrumb navigation
   */
  generateBreadcrumbs(url: string, lang: Language): InternalLink[];
  
  /**
   * Check link distribution
   */
  private checkLinkDistribution(links: InternalLink[]): boolean;
  
  /**
   * Prioritize high-value pages
   */
  private prioritizeLinks(links: InternalLink[]): InternalLink[];
}
```

### Hreflang Manager Interface

```typescript
// src/lib/seo/hreflang-manager.ts

export interface HreflangManagerOptions {
  currentPath: string;
  currentLang: Language;
  siteUrl: string;
  availableLanguages: Language[];
}

export class HreflangManager {
  /**
   * Generate hreflang tags for multilingual pages
   */
  generateHreflangTags(options: HreflangManagerOptions): HreflangTag[];
  
  /**
   * Get default language URL
   */
  private getDefaultLanguageURL(path: string, siteUrl: string): string;
  
  /**
   * Convert path to language-specific URL
   */
  private getLanguageURL(path: string, lang: Language, siteUrl: string): string;
  
  /**
   * Validate hreflang implementation
   */
  validateHreflang(tags: HreflangTag[]): boolean;
}
```

## Data Models

### SEO Configuration

```typescript
// src/data/seo-config.ts

export const PRIMARY_KEYWORDS = [
  'giá đỡ năng lượng mặt trời',
  'hệ thống lắp đặt điện mặt trời',
  'phụ kiện nhôm solar',
  'giá đỡ nhôm A6005-T6',
  'thanh ray năng lượng mặt trời',
] as const;

export const SECONDARY_KEYWORDS = [
  'kẹp giá đỡ pin mặt trời',
  'chân đế điện mặt trời',
  'dây tiếp địa solar',
  'giá đỡ mái tôn',
  'giá đỡ mái bằng',
] as const;

export const SITE_CONFIG = {
  name: 'Nhôm Quang Minh',
  alternateName: 'Công ty Cổ phần Nhôm Quang Minh',
  url: 'https://qmalu.com',
  logo: '/quang-minh-logo.svg',
  foundingDate: '2008',
  address: {
    street: 'Km 50 Quốc lộ 1A, Xã Tiên Tân',
    city: 'Phủ Lý',
    region: 'Hà Nam',
    country: 'VN',
  },
  geo: {
    latitude: 20.5385,
    longitude: 105.9189,
  },
  contact: {
    phone: '+84-947-776-662',
    email: 'info@qmalu.com',
  },
  social: {
    facebook: 'https://www.facebook.com/appevn',
    website: 'https://appe.com.vn',
  },
} as const;

export const PAGE_TYPE_CONFIG: Record<PageType, {
  defaultTitle: Record<Language, string>;
  defaultDescription: Record<Language, string>;
  changefreq: SitemapEntry['changefreq'];
  priority: number;
}> = {
  homepage: {
    defaultTitle: {
      vi: 'Nhôm Quang Minh - Giá đỡ năng lượng mặt trời A6005-T6',
      en: 'Quang Minh Aluminum - Solar Mounting Systems A6005-T6',
      cn: '光明铝材 - 太阳能支架系统 A6005-T6',
    },
    defaultDescription: {
      vi: 'Chuyên sản xuất giá đỡ năng lượng mặt trời, thanh ray nhôm A6005-T6, kẹp giữa/biên, phụ kiện tiếp địa. Chất lượng cao, giá cạnh tranh.',
      en: 'Specialized in manufacturing solar mounting systems, A6005-T6 aluminum rails, mid/end clamps, grounding accessories. High quality, competitive prices.',
      cn: '专业生产太阳能支架系统、A6005-T6铝导轨、中间夹/端夹、接地配件。高质量、有竞争力的价格。',
    },
    changefreq: 'daily',
    priority: 1.0,
  },
  product: {
    defaultTitle: {
      vi: '{name} - Nhôm Quang Minh',
      en: '{name} - Quang Minh Aluminum',
      cn: '{name} - 光明铝材',
    },
    defaultDescription: {
      vi: '{name} chất lượng cao từ Nhôm Quang Minh. Nhôm A6005-T6 cho hệ thống năng lượng mặt trời.',
      en: 'High-quality {name} from Quang Minh Aluminum. A6005-T6 aluminum for solar energy systems.',
      cn: '光明铝材的高质量{name}。用于太阳能系统的A6005-T6铝材。',
    },
    changefreq: 'weekly',
    priority: 0.8,
  },
  'product-list': {
    defaultTitle: {
      vi: 'Sản phẩm - Nhôm Quang Minh',
      en: 'Products - Quang Minh Aluminum',
      cn: '产品 - 光明铝材',
    },
    defaultDescription: {
      vi: 'Danh sách sản phẩm nhôm công nghiệp A6005-T6 cho năng lượng mặt trời: thanh ray, kẹp, phụ kiện.',
      en: 'A6005-T6 industrial aluminum products for solar energy: rails, clamps, accessories.',
      cn: 'A6005-T6工业铝材产品用于太阳能：导轨、夹具、配件。',
    },
    changefreq: 'weekly',
    priority: 0.9,
  },
  'blog-post': {
    defaultTitle: {
      vi: '{title} - Blog Nhôm Quang Minh',
      en: '{title} - Quang Minh Blog',
      cn: '{title} - 光明博客',
    },
    defaultDescription: {
      vi: '{excerpt}',
      en: '{excerpt}',
      cn: '{excerpt}',
    },
    changefreq: 'monthly',
    priority: 0.6,
  },
  'blog-list': {
    defaultTitle: {
      vi: 'Tin tức - Nhôm Quang Minh',
      en: 'News - Quang Minh Aluminum',
      cn: '新闻 - 光明铝材',
    },
    defaultDescription: {
      vi: 'Tin tức và bài viết về nhôm công nghiệp, năng lượng mặt trời, và công nghệ sản xuất.',
      en: 'News and articles about industrial aluminum, solar energy, and manufacturing technology.',
      cn: '关于工业铝材、太阳能和制造技术的新闻和文章。',
    },
    changefreq: 'daily',
    priority: 0.7,
  },
  about: {
    defaultTitle: {
      vi: 'Giới thiệu - Nhôm Quang Minh',
      en: 'About - Quang Minh Aluminum',
      cn: '关于我们 - 光明铝材',
    },
    defaultDescription: {
      vi: 'Công ty Cổ phần Nhôm Quang Minh - Chuyên sản xuất nhôm công nghiệp A6005-T6 từ năm 2008.',
      en: 'Quang Minh Aluminum Corporation - Specialized in A6005-T6 industrial aluminum since 2008.',
      cn: '光明铝材股份公司 - 自2008年以来专业生产A6005-T6工业铝材。',
    },
    changefreq: 'monthly',
    priority: 0.7,
  },
  contact: {
    defaultTitle: {
      vi: 'Liên hệ - Nhôm Quang Minh',
      en: 'Contact - Quang Minh Aluminum',
      cn: '联系我们 - 光明铝材',
    },
    defaultDescription: {
      vi: 'Liên hệ Nhôm Quang Minh để được tư vấn về giá đỡ năng lượng mặt trời và nhôm công nghiệp.',
      en: 'Contact Quang Minh Aluminum for consultation on solar mounting systems and industrial aluminum.',
      cn: '联系光明铝材咨询太阳能支架系统和工业铝材。',
    },
    changefreq: 'yearly',
    priority: 0.5,
  },
  faq: {
    defaultTitle: {
      vi: 'Câu hỏi thường gặp - Nhôm Quang Minh',
      en: 'FAQ - Quang Minh Aluminum',
      cn: '常见问题 - 光明铝材',
    },
    defaultDescription: {
      vi: 'Câu hỏi thường gặp về sản phẩm nhôm công nghiệp và giá đỡ năng lượng mặt trời.',
      en: 'Frequently asked questions about industrial aluminum products and solar mounting systems.',
      cn: '关于工业铝材产品和太阳能支架系统的常见问题。',
    },
    changefreq: 'monthly',
    priority: 0.6,
  },
  generic: {
    defaultTitle: {
      vi: 'Nhôm Quang Minh',
      en: 'Quang Minh Aluminum',
      cn: '光明铝材',
    },
    defaultDescription: {
      vi: 'Nhôm Quang Minh - Sản xuất nhôm công nghiệp A6005-T6',
      en: 'Quang Minh Aluminum - A6005-T6 Industrial Aluminum Manufacturing',
      cn: '光明铝材 - A6005-T6工业铝材制造',
    },
    changefreq: 'monthly',
    priority: 0.5,
  },
};
```

### Product Data Enhancement

```typescript
// Enhancement to existing product data structure
export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  slug: string;
  canonicalUrl?: string;
  schema?: {
    price?: string;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    rating?: {
      value: number;
      count: number;
    };
  };
}

// Add to existing product interface
export interface Product {
  // ... existing fields
  seo: ProductSEO;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Meta Title Length Optimization

*For any* page generated by the Meta_Generator, the meta title length SHALL be between 50 and 60 characters inclusive.

**Validates: Requirements 1.1**

### Property 2: Meta Description Length Optimization

*For any* page generated by the Meta_Generator, the meta description length SHALL be between 150 and 160 characters inclusive.

**Validates: Requirements 1.2**

### Property 3: Product Meta Title Keyword Inclusion

*For any* product page, the generated meta title SHALL contain at least one keyword from either the Primary_Keywords list or Secondary_Keywords list.

**Validates: Requirements 1.3**

### Property 4: Meta Tags Uniqueness

*For any* set of pages generated by the Meta_Generator, no two pages SHALL have identical meta title and meta description combinations.

**Validates: Requirements 1.4**

### Property 5: Meta Description Call-to-Action

*For any* page generated by the Meta_Generator, the meta description SHALL contain at least one call-to-action phrase (e.g., "Liên hệ ngay", "Xem thêm", "Tìm hiểu", "Contact us", "Learn more").

**Validates: Requirements 1.5**

### Property 6: Complete Social Media Meta Tags

*For any* page generated by the Meta_Generator, the output SHALL include all required Open Graph tags (og:title, og:description, og:image, og:url) and all required Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image).

**Validates: Requirements 1.6, 1.7**

### Property 7: Product Schema Completeness

*For any* product page, the generated Product schema SHALL include all required fields: name, description, image, offers (with url and availability), and brand.

**Validates: Requirements 2.1**

### Property 8: FAQ Schema Structure

*For any* FAQ page, the generated FAQPage schema SHALL include mainEntity array where each element contains a Question with name and an acceptedAnswer with Answer text.

**Validates: Requirements 2.3**

### Property 9: Breadcrumb Schema Structure

*For any* page with breadcrumb navigation, the generated BreadcrumbList schema SHALL include itemListElement array where each element has position, name, and item URL in sequential order starting from 1.

**Validates: Requirements 2.5**

### Property 10: Conditional Rating Schema

*For any* product with rating data (ratingValue and reviewCount), the generated Product schema SHALL include an aggregateRating object with ratingValue, reviewCount, and bestRating fields.

**Validates: Requirements 2.6**

### Property 11: Schema JSON-LD Format

*For any* schema generated by the Schema_Generator, the output SHALL be valid JSON-LD format that can be parsed by JSON.parse() without errors.

**Validates: Requirements 2.7**

### Property 12: Schema Serialization Round-Trip

*For any* schema object generated by the Schema_Generator, serializing to JSON-LD string then parsing back to object SHALL produce an equivalent structured data object.

**Validates: Requirements 2.8**

### Property 13: URL Slug Format Validity

*For any* text input to the URL_Optimizer, the generated slug SHALL be in kebab-case format, contain no Vietnamese diacritics or special characters, and have maximum length of 60 characters.

**Validates: Requirements 3.1, 3.2, 3.4**

### Property 14: URL Slug Keyword Injection

*For any* text input containing Primary_Keywords or Secondary_Keywords, the generated URL slug SHALL include at least one of those keywords.

**Validates: Requirements 3.3**

### Property 15: Canonical URL Uniqueness

*For any* page, the generated canonical URL SHALL be unique and follow the format: {siteUrl}/{lang-prefix}/{path} where lang-prefix is empty for Vietnamese, "en" for English, and "cn" for Chinese.

**Validates: Requirements 3.5**

### Property 16: Hreflang Tags Completeness

*For any* page with multilingual versions, the generated hreflang tags SHALL include entries for all three languages (vi, en, cn) plus an x-default tag pointing to the Vietnamese version.

**Validates: Requirements 3.6, 11.1, 11.2**

### Property 17: URL Hierarchy Structure

*For any* generated URL, the path SHALL follow a clear hierarchy pattern where each segment is separated by "/" and represents a logical navigation level (e.g., /san-pham/category/product-name).

**Validates: Requirements 3.7**

### Property 18: Keyword Density Calculation

*For any* content and keyword pair, the Keyword_Analyzer SHALL calculate density as (keyword_count / total_words) * 100, returning a value between 0 and 100.

**Validates: Requirements 4.1**

### Property 19: Keyword Density Optimal Range

*For any* content analyzed by the Keyword_Analyzer, if keyword density is below 1% the system SHALL suggest adding keywords, and if density exceeds 2% the system SHALL warn about keyword stuffing.

**Validates: Requirements 4.2, 4.3**

### Property 20: Keyword Distribution Evenness

*For any* content page with word count over 1000, keywords SHALL appear in at least 3 different sections (beginning, middle, end) of the content.

**Validates: Requirements 4.7**

### Property 21: Single H1 Tag Constraint

*For any* page, the rendered HTML SHALL contain exactly one H1 tag.

**Validates: Requirements 5.1**

### Property 22: H1 Keyword Inclusion

*For any* page, the H1 tag content SHALL contain at least one keyword from either Primary_Keywords or Secondary_Keywords lists.

**Validates: Requirements 5.2**

### Property 23: Heading Hierarchy Validity

*For any* page, the heading tags SHALL follow proper hierarchy where H1 appears first, followed by H2, then H3, without skipping levels (e.g., H1 → H3 without H2 is invalid).

**Validates: Requirements 5.3**

### Property 24: Subheading Keyword Inclusion

*For any* page with H2 or H3 tags, at least 50% of these subheadings SHALL contain relevant keywords related to the page topic.

**Validates: Requirements 5.4**

### Property 25: H1 Length Constraint

*For any* page, the H1 tag content length SHALL be between 20 and 70 characters inclusive.

**Validates: Requirements 5.5**

### Property 26: Image Alt Text Completeness

*For any* non-decorative image on a page, the image SHALL have an alt attribute with descriptive text between 125 and 150 characters.

**Validates: Requirements 6.1, 6.3**

### Property 27: Product Image Alt Text Content

*For any* product image, the alt text SHALL include both the product name and at least one keyword from Primary_Keywords or Secondary_Keywords.

**Validates: Requirements 6.2**

### Property 28: Descriptive Image Filenames

*For any* image, the filename SHALL not match generic patterns (e.g., "image1.jpg", "photo.png", "img_001.jpg") and SHALL contain at least 2 descriptive words separated by hyphens.

**Validates: Requirements 6.4**

### Property 29: Image Filename Keyword Inclusion

*For any* image where keywords are contextually relevant, the filename SHALL include at least one keyword from Primary_Keywords or Secondary_Keywords.

**Validates: Requirements 6.5**

### Property 30: Decorative Image Alt Attribute

*For any* decorative image (images used purely for visual design), the alt attribute SHALL be an empty string (alt="") to allow screen readers to skip it.

**Validates: Requirements 6.6**

### Property 31: Blog to Product Contextual Links

*For any* blog post containing product-related keywords, the Internal_Linker SHALL generate at least one contextual link to a relevant product page with descriptive anchor text.

**Validates: Requirements 7.1**

### Property 32: Related Product Links

*For any* product page, the Internal_Linker SHALL generate at least 3 links to related products in the same category or with similar attributes.

**Validates: Requirements 7.2**

### Property 33: Automatic Keyword-Based Linking

*For any* content containing a keyword that matches a product name or page title, the Internal_Linker SHALL create an internal link with the keyword as anchor text.

**Validates: Requirements 7.3**

### Property 34: Internal Link Count Constraints

*For any* page, the Internal_Linker SHALL ensure there are at least 3 internal links to other pages, and no single target page receives more than 5 links from the current page.

**Validates: Requirements 7.4, 7.5**

### Property 35: High-Priority Page Link Distribution

*For any* set of internal links generated, high-priority pages (homepage, key product pages, key landing pages) SHALL receive proportionally more links than low-priority pages.

**Validates: Requirements 7.6**

### Property 36: Breadcrumb Navigation Generation

*For any* page with depth > 1 in the site hierarchy, the Internal_Linker SHALL generate breadcrumb navigation with proper hierarchy from homepage to current page.

**Validates: Requirements 7.7**

### Property 37: Sitemap Public Pages Completeness

*For any* build of the website, the generated sitemap.xml SHALL include all public pages (pages without noindex directive and not in admin/private directories).

**Validates: Requirements 8.1**

### Property 38: Sitemap Entry Metadata Completeness

*For any* URL entry in the sitemap, the entry SHALL include lastmod (ISO 8601 date), changefreq (valid frequency value), and priority (number between 0.0 and 1.0) attributes.

**Validates: Requirements 8.2**

### Property 39: Language-Specific Sitemaps

*For any* build of the multilingual website, the Sitemap_Generator SHALL create separate sitemap files for each language: sitemap-vi.xml, sitemap-en.xml, and sitemap-cn.xml.

**Validates: Requirements 8.4**

### Property 40: Noindex Page Exclusion

*For any* page with noindex meta tag or robots directive, that page SHALL NOT appear in any generated sitemap file.

**Validates: Requirements 8.6**

### Property 41: Product Image Sitemap

*For any* product page with images, the image sitemap SHALL include entries for all product images with loc (image URL) and optional title attributes.

**Validates: Requirements 8.7**

### Property 42: Robots.txt Public Page Allowance

*For any* public page path, the robots.txt file SHALL contain an "Allow" directive or no "Disallow" directive for that path.

**Validates: Requirements 9.2**

### Property 43: Robots.txt Private Path Disallowance

*For any* admin page, API endpoint, or private directory path, the robots.txt file SHALL contain a "Disallow" directive for that path pattern.

**Validates: Requirements 9.3**

### Property 44: Robots.txt Multiple Sitemap Listing

*For any* build with multiple sitemap files, the robots.txt SHALL list all sitemap URLs using separate "Sitemap:" directives.

**Validates: Requirements 9.6**

### Property 45: Content Length Warning Generation

*For any* page where content word count is below the recommended minimum for its page type (1000 for landing pages, 500 for products, 1500 for blog posts), the SEO_System SHALL generate a warning with topic suggestions.

**Validates: Requirements 10.4**

### Property 46: Language-Specific Meta Tags

*For any* page with multiple language versions, each language version SHALL have unique meta title and meta description in the appropriate language.

**Validates: Requirements 11.4**

### Property 47: Language-Specific Schema Markup

*For any* page with multiple language versions, each language version SHALL have schema markup with text content (name, description) in the appropriate language.

**Validates: Requirements 11.5**

### Property 48: Multilingual URL Structure

*For any* multilingual page, the URL structure SHALL clearly indicate language with Vietnamese at root path (/), English with /en/ prefix, and Chinese with /cn/ prefix.

**Validates: Requirements 11.6**

### Property 49: Broken Link Detection

*For any* internal link on the website, the SEO Health Monitor SHALL detect if the link target returns 404 or does not exist and report it as a broken link issue.

**Validates: Requirements 12.1**

### Property 50: Missing Meta Tags Detection

*For any* page, the SEO Health Monitor SHALL detect if required meta tags (title, description) are missing and report it as a critical issue.

**Validates: Requirements 12.2**

### Property 51: Duplicate Meta Tags Detection

*For any* pair of pages, the SEO Health Monitor SHALL detect if they have identical meta title and description and report it as a warning issue.

**Validates: Requirements 12.3**

### Property 52: Missing Alt Text Detection

*For any* non-decorative image, the SEO Health Monitor SHALL detect if the alt attribute is missing or empty and report it as a warning issue.

**Validates: Requirements 12.4**

### Property 53: Invalid Schema Markup Detection

*For any* schema markup on a page, the SEO Health Monitor SHALL validate it against Schema.org specifications and report any validation errors as critical issues.

**Validates: Requirements 12.5**

### Property 54: SEO Issue Logging Format

*For any* SEO issue detected, the logged issue SHALL include severity level (critical/warning/info), issue type, descriptive message, location (page URL), and suggested fix when available.

**Validates: Requirements 12.6**

## Error Handling

### Meta Generator Error Handling

1. **Missing Required Fields**: If title or description is not provided, use default values from PAGE_TYPE_CONFIG
2. **Invalid Language**: If language is not in ['vi', 'en', 'cn'], default to 'vi'
3. **Keyword Injection Failure**: If keywords cannot be naturally injected, proceed without keyword injection rather than forcing unnatural placement
4. **Image URL Validation**: If ogImage URL is invalid or missing, use default OG image from site config

### Schema Generator Error Handling

1. **Missing Schema Data**: If required fields for schema are missing, log warning and skip that schema type
2. **Invalid JSON-LD**: If schema cannot be serialized to valid JSON-LD, log error and return empty schema
3. **Schema Validation Failure**: If schema doesn't match Schema.org spec, log warning but still output the schema
4. **Circular References**: Detect and break circular references in schema objects before serialization

### URL Optimizer Error Handling

1. **Empty Input**: If input text is empty, return a generated slug based on page type (e.g., "page-{timestamp}")
2. **Special Characters Only**: If input contains only special characters after cleaning, use fallback slug
3. **Slug Collision**: If generated slug already exists, append numeric suffix (-2, -3, etc.)
4. **Invalid URL Characters**: Remove or replace any characters that are invalid in URLs

### Keyword Analyzer Error Handling

1. **Empty Content**: If content is empty, return zero density for all keywords
2. **Invalid Keywords**: Filter out empty or whitespace-only keywords before analysis
3. **Division by Zero**: If total word count is zero, return density of 0 rather than throwing error
4. **Malformed Content**: Handle HTML tags and special characters gracefully during word counting

### Internal Linker Error Handling

1. **No Link Opportunities**: If no suitable link targets found, return empty array rather than forcing inappropriate links
2. **Circular Links**: Prevent linking a page to itself
3. **Broken Link Targets**: Validate that link targets exist before creating links
4. **Excessive Links**: If link count exceeds maximum, prioritize by relevance and page priority

### Sitemap Generator Error Handling

1. **File Write Failure**: Log error and attempt retry, fallback to previous sitemap if write fails
2. **Invalid URLs**: Skip URLs that don't pass validation rather than breaking entire sitemap
3. **Missing Metadata**: Use default values for lastmod (current date), changefreq (monthly), priority (0.5)
4. **Large Sitemap**: Automatically split into multiple sitemaps if URL count exceeds 50,000

### SEO Health Monitor Error Handling

1. **Page Crawl Failure**: Log failed pages and continue monitoring other pages
2. **Schema Validation API Failure**: Use local validation as fallback
3. **Report Generation Failure**: Log error and send notification to administrators
4. **Storage Failure**: Attempt to save report to alternative location or send via email

## Testing Strategy

### Dual Testing Approach

The SEO Optimization system will use both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests** will focus on:
- Specific examples of meta tag generation for different page types
- Edge cases like empty content, special characters, extremely long text
- Integration points between modules (e.g., Meta Generator using URL Optimizer)
- Error handling scenarios
- Configuration loading and validation

**Property-Based Tests** will focus on:
- Universal properties that hold for all inputs (as defined in Correctness Properties section)
- Comprehensive input coverage through randomization
- Invariants that must be maintained (e.g., slug format, schema structure)
- Round-trip properties (e.g., schema serialization/deserialization)

### Property-Based Testing Configuration

**Testing Library**: We will use `fast-check` for TypeScript property-based testing

**Test Configuration**:
- Minimum 100 iterations per property test (to ensure statistical confidence)
- Each property test must reference its design document property using comment tags
- Tag format: `// Feature: on-page-seo-optimization, Property {number}: {property_text}`

**Example Property Test Structure**:

```typescript
import fc from 'fast-check';
import { describe, it, expect } from 'vitest';
import { MetaGenerator } from './meta-generator';

describe('MetaGenerator Properties', () => {
  // Feature: on-page-seo-optimization, Property 1: Meta Title Length Optimization
  it('should generate meta titles between 50-60 characters for any page', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 200 }),
          lang: fc.constantFrom('vi', 'en', 'cn'),
          pageType: fc.constantFrom('homepage', 'product', 'blog-post'),
        }),
        (pageData) => {
          const generator = new MetaGenerator();
          const result = generator.generate({
            ...pageData,
            siteUrl: 'https://qmalu.com',
          });
          
          expect(result.title.length).toBeGreaterThanOrEqual(50);
          expect(result.title.length).toBeLessThanOrEqual(60);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Testing Balance

- Unit tests should focus on specific examples and edge cases
- Avoid writing too many unit tests for scenarios already covered by property tests
- Property tests handle comprehensive input coverage through randomization
- Unit tests are valuable for:
  - Demonstrating correct behavior with real-world examples
  - Testing integration between components
  - Verifying error handling with specific error conditions
  - Testing configuration and setup

### Test Coverage Goals

- **Line Coverage**: Minimum 80% for all SEO utility modules
- **Branch Coverage**: Minimum 75% for conditional logic
- **Property Coverage**: 100% of correctness properties must have corresponding property tests
- **Integration Coverage**: All module interactions must have integration tests

### Testing Tools

- **Unit Testing**: Vitest
- **Property-Based Testing**: fast-check
- **Schema Validation**: @hyperjump/json-schema for Schema.org validation
- **HTML Parsing**: jsdom for testing HTML output
- **Link Checking**: Custom link validator for internal link testing

### Continuous Testing

- All tests run on every commit via CI/CD pipeline
- Property tests run with increased iterations (500+) on nightly builds
- SEO Health Monitor runs weekly and generates reports
- Sitemap validation runs on every build
- Schema markup validation runs on every page build


## Implementation Details

### File Structure

```
src/
├── lib/
│   └── seo/
│       ├── types.ts                    # TypeScript type definitions
│       ├── meta-generator.ts           # Meta tags generation
│       ├── schema-generator.ts         # Schema.org structured data
│       ├── url-optimizer.ts            # URL slug and canonical URL generation
│       ├── keyword-analyzer.ts         # Keyword density and analysis
│       ├── internal-linker.ts          # Internal linking strategy
│       ├── hreflang-manager.ts         # Multilingual hreflang tags
│       ├── seo-health-monitor.ts       # SEO health checking
│       ├── utils.ts                    # Shared utility functions
│       └── index.ts                    # Public API exports
├── data/
│   └── seo-config.ts                   # SEO configuration and constants
├── components/
│   ├── SEOHead.astro                   # Reusable SEO head component
│   └── StructuredData.astro            # Schema markup component
└── layouts/
    └── BaseLayout.astro                # Enhanced with SEO components

scripts/
├── generate-sitemap.ts                 # Sitemap generation script
├── generate-robots.ts                  # Robots.txt generation script
└── seo-health-check.ts                 # SEO health monitoring script

public/
├── sitemap.xml                         # Main sitemap (generated)
├── sitemap-vi.xml                      # Vietnamese sitemap (generated)
├── sitemap-en.xml                      # English sitemap (generated)
├── sitemap-cn.xml                      # Chinese sitemap (generated)
├── sitemap-index.xml                   # Sitemap index (generated if needed)
└── robots.txt                          # Robots.txt (generated)
```

### Integration with Existing BaseLayout

The existing `BaseLayout.astro` already has basic SEO implementation. We will enhance it by:

1. **Extracting SEO logic into utilities**: Move meta tag generation logic to `MetaGenerator` class
2. **Adding Schema Generator**: Integrate `SchemaGenerator` for structured data
3. **Adding Hreflang Manager**: Enhance existing hreflang implementation with `HreflangManager`
4. **Creating SEOHead component**: Extract SEO-related head tags into reusable component

**Enhanced BaseLayout Integration**:

```astro
---
// src/layouts/BaseLayout.astro
import SEOHead from '../components/SEOHead.astro';
import StructuredData from '../components/StructuredData.astro';
import { MetaGenerator } from '../lib/seo/meta-generator';
import { SchemaGenerator } from '../lib/seo/schema-generator';
import type { SEOConfig } from '../lib/seo/types';

interface Props extends SEOConfig {
  // ... other props
}

const seoConfig: SEOConfig = {
  title: Astro.props.title,
  description: Astro.props.description,
  keywords: Astro.props.keywords || [],
  ogImage: Astro.props.ogImage,
  canonical: Astro.props.canonical,
  lang: Astro.props.lang || 'vi',
  pageType: Astro.props.pageType || 'generic',
};

const metaGenerator = new MetaGenerator();
const schemaGenerator = new SchemaGenerator();

const metaTags = metaGenerator.generate({
  ...seoConfig,
  siteUrl: Astro.url.origin,
});

const organizationSchema = schemaGenerator.generateOrganizationSchema(seoConfig.lang);
const localBusinessSchema = schemaGenerator.generateLocalBusinessSchema(seoConfig.lang);
---

<!DOCTYPE html>
<html lang={seoConfig.lang}>
  <head>
    <SEOHead metaTags={metaTags} lang={seoConfig.lang} />
    <StructuredData schemas={[organizationSchema, localBusinessSchema]} />
    <!-- Other head elements -->
  </head>
  <body>
    <!-- Body content -->
  </body>
</html>
```

### SEOHead Component

```astro
---
// src/components/SEOHead.astro
import { HreflangManager } from '../lib/seo/hreflang-manager';
import type { MetaTags, Language } from '../lib/seo/types';

interface Props {
  metaTags: MetaTags;
  lang: Language;
}

const { metaTags, lang } = Astro.props;

const hreflangManager = new HreflangManager();
const hreflangTags = hreflangManager.generateHreflangTags({
  currentPath: Astro.url.pathname,
  currentLang: lang,
  siteUrl: Astro.url.origin,
  availableLanguages: ['vi', 'en', 'cn'],
});
---

<!-- Basic Meta Tags -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
<title>{metaTags.title}</title>
<meta name="description" content={metaTags.description} />
<meta name="keywords" content={metaTags.keywords} />
<link rel="canonical" href={metaTags.canonical} />

<!-- Open Graph Tags -->
<meta property="og:type" content={metaTags.ogType} />
<meta property="og:url" content={metaTags.ogUrl} />
<meta property="og:title" content={metaTags.ogTitle} />
<meta property="og:description" content={metaTags.ogDescription} />
<meta property="og:image" content={metaTags.ogImage} />
<meta property="og:locale" content={metaTags.ogLocale} />

<!-- Twitter Card Tags -->
<meta name="twitter:card" content={metaTags.twitterCard} />
<meta name="twitter:title" content={metaTags.twitterTitle} />
<meta name="twitter:description" content={metaTags.twitterDescription} />
<meta name="twitter:image" content={metaTags.twitterImage} />

<!-- Hreflang Tags -->
{hreflangTags.map(tag => (
  <link rel="alternate" hreflang={tag.lang} href={tag.url} />
))}
```

### StructuredData Component

```astro
---
// src/components/StructuredData.astro
interface Props {
  schemas: any[];
}

const { schemas } = Astro.props;
---

{schemas.map(schema => (
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
))}
```

### Product Page Integration

```astro
---
// src/pages/san-pham/[slug].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import { SchemaGenerator } from '../../lib/seo/schema-generator';
import { URLOptimizer } from '../../lib/seo/url-optimizer';
import { InternalLinker } from '../../lib/seo/internal-linker';
import type { Product } from '../../data/products';

const { slug } = Astro.params;
const product = getProductBySlug(slug);

const schemaGenerator = new SchemaGenerator();
const internalLinker = new InternalLinker();

// Generate product schema
const productSchema = schemaGenerator.generateProductSchema({
  name: product.name,
  description: product.description,
  image: product.images,
  url: Astro.url.href,
  price: product.price,
  currency: 'VND',
  availability: product.inStock ? 'InStock' : 'OutOfStock',
  rating: product.rating,
});

// Generate breadcrumb schema
const breadcrumbSchema = schemaGenerator.generateBreadcrumbSchema({
  items: [
    { name: 'Trang chủ', url: '/' },
    { name: 'Sản phẩm', url: '/san-pham' },
    { name: product.name, url: Astro.url.pathname },
  ],
});

// Generate internal links
const relatedLinks = internalLinker.generateRelatedProductLinks(slug, 'vi');
---

<BaseLayout
  title={product.seo?.metaTitle || `${product.name} - Nhôm Quang Minh`}
  description={product.seo?.metaDescription || product.description}
  keywords={product.seo?.keywords || [product.name, ...product.categories]}
  pageType="product"
  lang="vi"
>
  <StructuredData schemas={[productSchema, breadcrumbSchema]} />
  
  <!-- Product content -->
  <div class="product-content">
    <h1>{product.name}</h1>
    <div set:html={product.description} />
    
    <!-- Related products with internal links -->
    <div class="related-products">
      <h2>Sản phẩm liên quan</h2>
      {relatedLinks.map(link => (
        <a href={link.url} title={link.title}>{link.text}</a>
      ))}
    </div>
  </div>
</BaseLayout>
```

### Build-Time Sitemap Generation

```typescript
// scripts/generate-sitemap.ts
import { writeFileSync } from 'fs';
import { join } from 'path';
import type { SitemapEntry, Language } from '../src/lib/seo/types';

const SITE_URL = 'https://qmalu.com';
const LANGUAGES: Language[] = ['vi', 'en', 'cn'];

interface PageInfo {
  path: string;
  changefreq: SitemapEntry['changefreq'];
  priority: number;
  languages: Language[];
}

// Collect all pages
const pages: PageInfo[] = [
  { path: '/', changefreq: 'daily', priority: 1.0, languages: ['vi', 'en', 'cn'] },
  { path: '/gioi-thieu', changefreq: 'monthly', priority: 0.7, languages: ['vi', 'en', 'cn'] },
  { path: '/san-pham', changefreq: 'weekly', priority: 0.9, languages: ['vi', 'en', 'cn'] },
  // ... collect all pages dynamically
];

function generateSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries.map(entry => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    ${entry.images?.map(img => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      ${img.title ? `<image:title>${img.title}</image:title>` : ''}
    </image:image>`).join('') || ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

function generateLanguageSitemap(lang: Language) {
  const entries: SitemapEntry[] = pages
    .filter(page => page.languages.includes(lang))
    .map(page => ({
      url: `${SITE_URL}${lang === 'vi' ? '' : `/${lang}`}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority,
    }));

  const xml = generateSitemapXML(entries);
  const filename = `sitemap-${lang}.xml`;
  writeFileSync(join('public', filename), xml);
  console.log(`Generated ${filename} with ${entries.length} URLs`);
}

function generateSitemapIndex() {
  const sitemaps = LANGUAGES.map(lang => `
  <sitemap>
    <loc>${SITE_URL}/sitemap-${lang}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  writeFileSync(join('public', 'sitemap.xml'), xml);
  console.log('Generated sitemap index');
}

// Generate all sitemaps
LANGUAGES.forEach(generateLanguageSitemap);
generateSitemapIndex();
```

### Robots.txt Generation

```typescript
// scripts/generate-robots.ts
import { writeFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = 'https://qmalu.com';

const robotsTxt = `# Robots.txt for qmalu.com
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
Disallow: /test/

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-vi.xml
Sitemap: ${SITE_URL}/sitemap-en.xml
Sitemap: ${SITE_URL}/sitemap-cn.xml

# Crawl delay (optional, uncomment if needed)
# Crawl-delay: 1
`;

writeFileSync(join('public', 'robots.txt'), robotsTxt);
console.log('Generated robots.txt');
```

### Astro Config Integration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ... other config
  
  integrations: [
    // ... other integrations
  ],
  
  // Build hooks for SEO generation
  build: {
    // Generate sitemap and robots.txt after build
  },
  
  vite: {
    plugins: [
      {
        name: 'seo-generation',
        closeBundle: async () => {
          // Run sitemap generation
          await import('./scripts/generate-sitemap.ts');
          // Run robots.txt generation
          await import('./scripts/generate-robots.ts');
        },
      },
    ],
  },
});
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && npm run generate:seo",
    "generate:seo": "tsx scripts/generate-sitemap.ts && tsx scripts/generate-robots.ts",
    "seo:check": "tsx scripts/seo-health-check.ts",
    "test": "vitest",
    "test:properties": "vitest --run --reporter=verbose"
  }
}
```

### Dependencies

Add these dependencies to `package.json`:

```json
{
  "dependencies": {
    "@hyperjump/json-schema": "^1.9.0",
    "slugify": "^1.6.6"
  },
  "devDependencies": {
    "fast-check": "^3.15.0",
    "tsx": "^4.7.0"
  }
}
```

## Migration Strategy

### Phase 1: Core Utilities (Week 1)

1. Create type definitions in `src/lib/seo/types.ts`
2. Implement `URLOptimizer` class
3. Implement `MetaGenerator` class
4. Write unit tests and property tests for Phase 1
5. Update existing product data with SEO fields

### Phase 2: Schema and Structured Data (Week 2)

1. Implement `SchemaGenerator` class
2. Create `StructuredData.astro` component
3. Integrate schema generation into product pages
4. Add Organization and LocalBusiness schemas to BaseLayout
5. Write tests for Phase 2

### Phase 3: Advanced Features (Week 3)

1. Implement `KeywordAnalyzer` class
2. Implement `InternalLinker` class
3. Implement `HreflangManager` class
4. Create `SEOHead.astro` component
5. Integrate into BaseLayout
6. Write tests for Phase 3

### Phase 4: Build-Time Generation (Week 4)

1. Implement sitemap generation script
2. Implement robots.txt generation script
3. Integrate with Astro build process
4. Test sitemap generation with all pages
5. Validate sitemap XML format

### Phase 5: Monitoring and Health Checks (Week 5)

1. Implement `SEOHealthMonitor` class
2. Create health check script
3. Set up automated weekly health checks
4. Create health report dashboard
5. Write tests for Phase 5

### Phase 6: Optimization and Refinement (Week 6)

1. Performance optimization for build-time generation
2. Add caching for expensive operations
3. Refine keyword analysis algorithms
4. Improve internal linking strategy
5. Comprehensive testing and bug fixes

## Performance Considerations

### Build-Time Performance

1. **Sitemap Generation**: Use streaming for large sitemaps to avoid memory issues
2. **Schema Generation**: Cache schema templates to avoid repeated generation
3. **URL Optimization**: Memoize slug generation for repeated calls
4. **Parallel Processing**: Generate language-specific sitemaps in parallel

### Runtime Performance

1. **Meta Tag Generation**: Pre-compute meta tags at build time when possible
2. **Schema Markup**: Generate schemas during SSG build, not at runtime
3. **Internal Links**: Cache link opportunities to avoid repeated content scanning
4. **Lazy Loading**: Load SEO utilities only when needed

### Caching Strategy

1. **URL Slugs**: Cache generated slugs in memory during build
2. **Schema Templates**: Cache organization and business schemas
3. **Keyword Analysis**: Cache keyword density calculations for unchanged content
4. **Link Opportunities**: Cache internal link mappings

## Security Considerations

1. **XSS Prevention**: Sanitize all user-generated content before including in meta tags
2. **URL Validation**: Validate all URLs before including in sitemaps or canonical tags
3. **Schema Injection**: Validate schema data to prevent JSON injection attacks
4. **File System Access**: Restrict sitemap and robots.txt generation to authorized build processes
5. **Rate Limiting**: Implement rate limiting for SEO health check crawling

## Monitoring and Maintenance

### SEO Health Monitoring

1. **Weekly Automated Checks**: Run SEO health monitor every week
2. **Critical Issue Alerts**: Send email notifications for critical SEO issues
3. **Trend Analysis**: Track SEO metrics over time to identify degradation
4. **Broken Link Monitoring**: Check for broken internal links weekly

### Metrics to Track

1. **Meta Tag Coverage**: Percentage of pages with optimized meta tags
2. **Schema Markup Coverage**: Percentage of pages with valid schema markup
3. **Sitemap Coverage**: Percentage of public pages in sitemap
4. **Internal Link Distribution**: Average internal links per page
5. **Keyword Optimization**: Percentage of pages with optimal keyword density
6. **Hreflang Coverage**: Percentage of multilingual pages with proper hreflang tags

### Maintenance Tasks

1. **Monthly**: Review and update primary/secondary keywords based on search trends
2. **Quarterly**: Audit schema markup for compliance with latest Schema.org updates
3. **Bi-annually**: Review and optimize internal linking strategy
4. **Annually**: Comprehensive SEO audit and strategy review

## Future Enhancements

### Potential Improvements

1. **AI-Powered Meta Generation**: Use AI to generate more compelling meta descriptions
2. **Automatic Keyword Research**: Integrate with keyword research APIs for automatic keyword discovery
3. **Competitor Analysis**: Monitor competitor SEO strategies and adapt
4. **Voice Search Optimization**: Optimize content for voice search queries
5. **Featured Snippet Optimization**: Structure content to target featured snippets
6. **Video SEO**: Add video schema markup and video sitemap generation
7. **Local SEO Enhancement**: Expand LocalBusiness schema with more detailed information
8. **Mobile-First Indexing**: Ensure all SEO elements are optimized for mobile
9. **Core Web Vitals Integration**: Monitor and optimize for Core Web Vitals
10. **Structured Data Testing**: Integrate with Google's Rich Results Test API

### Scalability Considerations

1. **Multi-Site Support**: Extend to support multiple domains/subdomains
2. **CDN Integration**: Optimize sitemap delivery through CDN
3. **Database Integration**: Store SEO data in database for large-scale sites
4. **API Endpoints**: Expose SEO utilities as API endpoints for external tools
5. **Plugin Architecture**: Create plugin system for custom SEO extensions

## Conclusion

This design provides a comprehensive, maintainable, and scalable solution for on-page SEO optimization. The modular architecture allows for incremental implementation and easy testing. The combination of automated generation, health monitoring, and property-based testing ensures high-quality SEO implementation that can adapt to changing requirements and search engine algorithms.

The system is designed to integrate seamlessly with the existing Astro-based website while providing powerful SEO capabilities that will help improve search engine rankings, increase organic traffic, and enhance the overall discoverability of Quang Minh's products and services.

