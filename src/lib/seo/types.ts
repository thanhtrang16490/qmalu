// SEO Type Definitions for On-Page SEO Optimization
// Feature: on-page-seo-optimization

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
