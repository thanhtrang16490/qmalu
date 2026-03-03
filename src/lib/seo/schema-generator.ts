// Schema Generator for On-Page SEO Optimization
// Feature: on-page-seo-optimization
// Generates Schema.org structured data in JSON-LD format

import type {
  ProductSchema,
  OrganizationSchema,
  FAQSchema,
  LocalBusinessSchema,
  BreadcrumbSchema,
  Language,
} from './types';
import { SITE_CONFIG } from '../../data/seo-config';

/**
 * Options for generating Product schema
 */
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

/**
 * Options for generating FAQ schema
 */
export interface FAQSchemaOptions {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Options for generating Breadcrumb schema
 */
export interface BreadcrumbSchemaOptions {
  items: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * SchemaGenerator class for creating Schema.org structured data
 * 
 * This class generates various types of Schema.org markup including:
 * - Product schema for product pages
 * - Organization schema for company information
 * - FAQPage schema for FAQ pages
 * - LocalBusiness schema for local business information
 * - BreadcrumbList schema for navigation
 * 
 * All schemas are output in JSON-LD format for easy integration with HTML.
 */
export class SchemaGenerator {
  /**
   * Generate Product schema
   * 
   * Creates a Product schema with all required fields including name, description,
   * image, brand, and offers. Optionally includes aggregateRating if rating data
   * is provided.
   * 
   * @param options - Product schema options
   * @returns ProductSchema object
   * 
   * @example
   * ```typescript
   * const schema = generator.generateProductSchema({
   *   name: 'Solar Mounting Rail',
   *   description: 'High-quality aluminum rail for solar panels',
   *   image: '/images/rail.jpg',
   *   url: 'https://qmalu.com/products/rail',
   *   price: '150000',
   *   currency: 'VND',
   *   availability: 'InStock',
   *   rating: { value: 4.5, count: 10, best: 5 }
   * });
   * ```
   */
  generateProductSchema(options: ProductSchemaOptions): ProductSchema {
    const schema: ProductSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: options.name,
      description: options.description,
      image: options.image,
      brand: {
        '@type': 'Brand',
        name: SITE_CONFIG.name,
      },
      offers: {
        '@type': 'Offer',
        availability: this.mapAvailability(options.availability || 'InStock'),
        url: options.url,
      },
    };

    // Add price information if provided
    if (options.price) {
      schema.offers.price = options.price;
      schema.offers.priceCurrency = options.currency || 'VND';
    }

    // Add aggregate rating if provided
    if (options.rating) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: options.rating.value,
        reviewCount: options.rating.count,
        bestRating: options.rating.best,
      };
    }

    return schema;
  }

  /**
   * Generate Organization schema
   * 
   * Creates an Organization schema with company information including name,
   * logo, address, contact point, and social media links. The content is
   * localized based on the provided language.
   * 
   * @param lang - Language for localized content
   * @returns OrganizationSchema object
   * 
   * @example
   * ```typescript
   * const schema = generator.generateOrganizationSchema('vi');
   * ```
   */
  generateOrganizationSchema(lang: Language): OrganizationSchema {
    const descriptions = {
      vi: 'Công ty Cổ phần Nhôm Quang Minh chuyên sản xuất nhôm công nghiệp A6005-T6 và giá đỡ năng lượng mặt trời chất lượng cao.',
      en: 'Quang Minh Aluminum Corporation specializes in manufacturing high-quality A6005-T6 industrial aluminum and solar mounting systems.',
      cn: '光明铝材股份公司专业生产高质量A6005-T6工业铝材和太阳能支架系统。',
    };

    const schema: OrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      alternateName: SITE_CONFIG.alternateName,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      description: descriptions[lang],
      foundingDate: SITE_CONFIG.foundingDate,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.region,
        addressCountry: SITE_CONFIG.address.country,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.contact.phone,
        contactType: 'customer service',
        areaServed: 'VN',
        availableLanguage: ['vi', 'en', 'zh'],
      },
      sameAs: [
        SITE_CONFIG.social.facebook,
        SITE_CONFIG.social.website,
      ],
    };

    return schema;
  }

  /**
   * Generate FAQPage schema
   * 
   * Creates a FAQPage schema with a list of questions and answers.
   * Each question-answer pair is structured as a Question entity with
   * an acceptedAnswer.
   * 
   * @param options - FAQ schema options with questions and answers
   * @returns FAQSchema object
   * 
   * @example
   * ```typescript
   * const schema = generator.generateFAQSchema({
   *   questions: [
   *     {
   *       question: 'What is A6005-T6 aluminum?',
   *       answer: 'A6005-T6 is a high-strength aluminum alloy...'
   *     }
   *   ]
   * });
   * ```
   */
  generateFAQSchema(options: FAQSchemaOptions): FAQSchema {
    const schema: FAQSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: options.questions.map((qa) => ({
        '@type': 'Question',
        name: qa.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: qa.answer,
        },
      })),
    };

    return schema;
  }

  /**
   * Generate LocalBusiness schema
   * 
   * Creates a LocalBusiness schema with business information including
   * name, address, geo coordinates, telephone, and URL. The content is
   * localized based on the provided language.
   * 
   * @param lang - Language for localized content
   * @returns LocalBusinessSchema object
   * 
   * @example
   * ```typescript
   * const schema = generator.generateLocalBusinessSchema('vi');
   * ```
   */
  generateLocalBusinessSchema(lang: Language): LocalBusinessSchema {
    const schema: LocalBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SITE_CONFIG.name,
      image: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.region,
        addressCountry: SITE_CONFIG.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.geo.latitude,
        longitude: SITE_CONFIG.geo.longitude,
      },
      telephone: SITE_CONFIG.contact.phone,
      url: SITE_CONFIG.url,
    };

    return schema;
  }

  /**
   * Generate BreadcrumbList schema
   * 
   * Creates a BreadcrumbList schema for navigation breadcrumbs.
   * Each item in the breadcrumb trail is represented as a ListItem
   * with a position, name, and URL.
   * 
   * @param options - Breadcrumb schema options with navigation items
   * @returns BreadcrumbSchema object
   * 
   * @example
   * ```typescript
   * const schema = generator.generateBreadcrumbSchema({
   *   items: [
   *     { name: 'Home', url: 'https://qmalu.com/' },
   *     { name: 'Products', url: 'https://qmalu.com/products' },
   *     { name: 'Solar Rails', url: 'https://qmalu.com/products/rails' }
   *   ]
   * });
   * ```
   */
  generateBreadcrumbSchema(options: BreadcrumbSchemaOptions): BreadcrumbSchema {
    const schema: BreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: options.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    return schema;
  }

  /**
   * Convert schema to JSON-LD string
   * 
   * Serializes a schema object to a JSON-LD string that can be embedded
   * in HTML script tags. The output is formatted with 2-space indentation
   * for readability.
   * 
   * @param schema - Any schema object to serialize
   * @returns JSON-LD string representation
   * 
   * @example
   * ```typescript
   * const jsonLD = generator.toJSONLD(productSchema);
   * // Returns: '{\n  "@context": "https://schema.org",\n  ...\n}'
   * ```
   */
  toJSONLD(schema: any): string {
    try {
      return JSON.stringify(schema, null, 2);
    } catch (error) {
      console.error('Error serializing schema to JSON-LD:', error);
      return '{}';
    }
  }

  /**
   * Map availability status to Schema.org format
   * 
   * Converts simple availability strings to full Schema.org URLs.
   * 
   * @param availability - Simple availability status
   * @returns Full Schema.org availability URL
   * @private
   */
  private mapAvailability(availability: 'InStock' | 'OutOfStock' | 'PreOrder'): string {
    const availabilityMap = {
      InStock: 'https://schema.org/InStock',
      OutOfStock: 'https://schema.org/OutOfStock',
      PreOrder: 'https://schema.org/PreOrder',
    };

    return availabilityMap[availability];
  }
}
