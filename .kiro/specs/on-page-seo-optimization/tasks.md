# Implementation Plan: On-Page SEO Optimization

## Overview

Implement comprehensive on-page SEO optimization for qmalu.com website including meta tags, schema markup, sitemap generation, URL optimization, keyword analysis, and internal linking. The implementation follows a priority-based approach starting with Google Analytics integration, then SEO content optimization, followed by technical SEO infrastructure.

## Tasks

- [x] 1. Update Google Analytics tag and tracking
  - [x] 1.1 Update Google Analytics tag to G-KL7B65498K
    - Replace existing GA tag in BaseLayout or tracking component
    - Verify tag fires correctly on all pages
    - Test tracking in GA4 Real-Time reports
    - _Requirements: User priority 1_

- [x] 2. Add SEO keywords to homepage content
  - [x] 2.1 Enhance homepage content with primary keywords
    - Update `src/data/homepage-content.ts` to include primary keywords naturally
    - Add keywords: "giá đỡ năng lượng mặt trời", "hệ thống lắp đặt điện mặt trời", "phụ kiện nhôm solar", "giá đỡ nhôm A6005-T6", "thanh ray năng lượng mặt trời"
    - Ensure keyword density between 1-2%
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [x] 2.2 Update multilingual homepage content files
    - Update `src/data/homepage-content-en.ts` with English keyword equivalents
    - Update `src/data/homepage-content-cn.ts` with Chinese keyword equivalents
    - Maintain natural language flow in all versions
    - _Requirements: 11.4_

- [x] 3. Create core SEO type definitions and configuration
  - [x] 3.1 Create SEO type definitions
    - Create `src/lib/seo/types.ts` with all TypeScript interfaces
    - Define Language, PageType, SEOConfig, MetaTags, Schema types
    - Include ProductSchema, OrganizationSchema, FAQSchema, LocalBusinessSchema, BreadcrumbSchema
    - _Requirements: 1.1-1.7, 2.1-2.8_
  
  - [x] 3.2 Create SEO configuration file
    - Create `src/data/seo-config.ts` with PRIMARY_KEYWORDS, SECONDARY_KEYWORDS
    - Add SITE_CONFIG with company information, address, geo coordinates
    - Add PAGE_TYPE_CONFIG with default titles and descriptions for all page types
    - _Requirements: 1.1, 1.2, 3.6, 11.6_

- [x] 4. Implement Schema Markup utilities
  - [x] 4.1 Create SchemaGenerator class
    - Create `src/lib/seo/schema-generator.ts`
    - Implement generateProductSchema method
    - Implement generateOrganizationSchema method
    - Implement generateFAQSchema method
    - Implement generateLocalBusinessSchema method
    - Implement generateBreadcrumbSchema method
    - Implement toJSONLD method for JSON-LD serialization
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  
  - [ ]* 4.2 Write property test for Product schema completeness
    - **Property 7: Product Schema Completeness**
    - **Validates: Requirements 2.1**
  
  - [ ]* 4.3 Write property test for schema JSON-LD format
    - **Property 11: Schema JSON-LD Format**
    - **Validates: Requirements 2.7**
  
  - [ ]* 4.4 Write property test for schema serialization round-trip
    - **Property 12: Schema Serialization Round-Trip**
    - **Validates: Requirements 2.8**
  
  - [x] 4.5 Create StructuredData Astro component
    - Create `src/components/StructuredData.astro`
    - Accept schemas array prop and render as JSON-LD script tags
    - _Requirements: 2.7_

- [ ] 5. Implement Sitemap Generator
  - [x] 5.1 Create sitemap generation script
    - Create `scripts/generate-sitemap.ts`
    - Implement generateSitemapXML function
    - Implement generateLanguageSitemap function for each language (vi, en, cn)
    - Implement generateSitemapIndex function
    - Include lastmod, changefreq, priority for each URL
    - _Requirements: 8.1, 8.2, 8.4_
  
  - [x] 5.2 Add image sitemap support
    - Extend sitemap entries to include product images
    - Generate image sitemap with loc, title, caption
    - _Requirements: 8.7_
  
  - [x] 5.3 Implement noindex page exclusion
    - Filter out pages with noindex directive from sitemap
    - Exclude admin and private directories
    - _Requirements: 8.6_
  
  - [ ]* 5.4 Write property test for sitemap completeness
    - **Property 37: Sitemap Public Pages Completeness**
    - **Validates: Requirements 8.1**
  
  - [ ]* 5.5 Write property test for sitemap entry metadata
    - **Property 38: Sitemap Entry Metadata Completeness**
    - **Validates: Requirements 8.2**
  
  - [ ] 5.6 Create robots.txt generation script
    - Create `scripts/generate-robots.ts`
    - Allow all public pages, disallow admin/api/private paths
    - Include all sitemap URLs
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [ ] 5.7 Integrate sitemap generation with build process
    - Update `astro.config.mjs` to run sitemap generation after build
    - Add npm scripts for SEO generation
    - Test sitemap generation with full site build
    - _Requirements: 8.3_

- [ ] 6. Checkpoint - Verify schema and sitemap generation
  - Ensure all tests pass, verify sitemaps are generated correctly, ask the user if questions arise.

- [ ] 7. Implement Meta Tags optimization
  - [ ] 7.1 Create MetaGenerator class
    - Create `src/lib/seo/meta-generator.ts`
    - Implement generate method for creating optimized meta tags
    - Implement optimizeTitle method (50-60 chars)
    - Implement optimizeDescription method (150-160 chars with CTA)
    - Implement generateOGTags method
    - Implement generateTwitterTags method
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6, 1.7_
  
  - [ ]* 7.2 Write property test for meta title length
    - **Property 1: Meta Title Length Optimization**
    - **Validates: Requirements 1.1**
  
  - [ ]* 7.3 Write property test for meta description length
    - **Property 2: Meta Description Length Optimization**
    - **Validates: Requirements 1.2**
  
  - [ ]* 7.4 Write property test for product meta title keywords
    - **Property 3: Product Meta Title Keyword Inclusion**
    - **Validates: Requirements 1.3**
  
  - [ ]* 7.5 Write property test for meta tags uniqueness
    - **Property 4: Meta Tags Uniqueness**
    - **Validates: Requirements 1.4**
  
  - [ ]* 7.6 Write property test for meta description CTA
    - **Property 5: Meta Description Call-to-Action**
    - **Validates: Requirements 1.5**
  
  - [ ] 7.7 Create SEOHead Astro component
    - Create `src/components/SEOHead.astro`
    - Render all meta tags (basic, OG, Twitter Card)
    - Integrate HreflangManager for multilingual tags
    - _Requirements: 1.1-1.7, 3.6_
  
  - [ ] 7.8 Integrate MetaGenerator into BaseLayout
    - Update `src/layouts/BaseLayout.astro` to use MetaGenerator
    - Replace existing meta tag logic with SEOHead component
    - Test on all page types
    - _Requirements: 1.1-1.7_

- [ ] 8. Implement URL optimization
  - [ ] 8.1 Create URLOptimizer class
    - Create `src/lib/seo/url-optimizer.ts`
    - Implement generateSlug method (kebab-case, max 60 chars)
    - Implement removeDiacritics method for Vietnamese text
    - Implement toKebabCase method
    - Implement injectKeywords method
    - Implement generateCanonicalURL method
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ]* 8.2 Write property test for URL slug format
    - **Property 13: URL Slug Format Validity**
    - **Validates: Requirements 3.1, 3.2, 3.4**
  
  - [ ]* 8.3 Write property test for URL slug keyword injection
    - **Property 14: URL Slug Keyword Injection**
    - **Validates: Requirements 3.3**
  
  - [ ]* 8.4 Write property test for canonical URL uniqueness
    - **Property 15: Canonical URL Uniqueness**
    - **Validates: Requirements 3.5**

- [ ] 9. Implement Internal Linking strategy
  - [ ] 9.1 Create InternalLinker class
    - Create `src/lib/seo/internal-linker.ts`
    - Implement generateLinks method for contextual links
    - Implement generateRelatedProductLinks method
    - Implement generateBreadcrumbs method
    - Ensure min 3 links per page, max 5 links to same target
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_
  
  - [ ]* 9.2 Write property test for internal link count constraints
    - **Property 34: Internal Link Count Constraints**
    - **Validates: Requirements 7.4, 7.5**
  
  - [ ]* 9.3 Write property test for breadcrumb navigation
    - **Property 36: Breadcrumb Navigation Generation**
    - **Validates: Requirements 7.7**
  
  - [ ] 9.4 Integrate internal linking into product pages
    - Update product page templates to use InternalLinker
    - Add related products section with generated links
    - Add breadcrumb navigation
    - _Requirements: 7.1, 7.2, 7.7_

- [ ] 10. Implement Multilingual SEO
  - [ ] 10.1 Create HreflangManager class
    - Create `src/lib/seo/hreflang-manager.ts`
    - Implement generateHreflangTags method
    - Support vi, en, cn languages with x-default
    - Ensure proper URL structure for each language
    - _Requirements: 3.6, 11.1, 11.2, 11.6_
  
  - [ ]* 10.2 Write property test for hreflang completeness
    - **Property 16: Hreflang Tags Completeness**
    - **Validates: Requirements 3.6, 11.1, 11.2**
  
  - [ ]* 10.3 Write property test for multilingual URL structure
    - **Property 48: Multilingual URL Structure**
    - **Validates: Requirements 11.6**
  
  - [ ] 10.4 Integrate hreflang tags into SEOHead component
    - Update SEOHead.astro to include hreflang tags
    - Test on all multilingual pages
    - _Requirements: 11.1, 11.2_

- [ ] 11. Checkpoint - Verify meta tags and multilingual SEO
  - Ensure all tests pass, verify meta tags on all page types, check hreflang implementation, ask the user if questions arise.

- [ ] 12. Implement Keyword Analysis utilities
  - [ ] 12.1 Create KeywordAnalyzer class
    - Create `src/lib/seo/keyword-analyzer.ts`
    - Implement analyzeKeywords method
    - Implement calculateDensity method (1-2% optimal range)
    - Implement checkKeywordStuffing method
    - Implement suggestPlacement method
    - _Requirements: 4.1, 4.2, 4.3, 4.7_
  
  - [ ]* 12.2 Write property test for keyword density calculation
    - **Property 18: Keyword Density Calculation**
    - **Validates: Requirements 4.1**
  
  - [ ]* 12.3 Write property test for keyword density warnings
    - **Property 19: Keyword Density Optimal Range**
    - **Validates: Requirements 4.2, 4.3**
  
  - [ ] 12.4 Create keyword analysis utility script
    - Create script to analyze existing content
    - Generate reports for pages needing keyword optimization
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 13. Implement Image SEO optimization
  - [ ] 13.1 Create image alt text generation utilities
    - Add utility functions for generating descriptive alt text
    - Ensure alt text includes product name and keywords
    - Limit alt text to 125-150 characters
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ]* 13.2 Write property test for image alt text completeness
    - **Property 26: Image Alt Text Completeness**
    - **Validates: Requirements 6.1, 6.3**
  
  - [ ]* 13.3 Write property test for product image alt text
    - **Property 27: Product Image Alt Text Content**
    - **Validates: Requirements 6.2**
  
  - [ ] 13.4 Update product data with optimized image metadata
    - Add descriptive filenames for product images
    - Add alt text with keywords to all product images
    - Mark decorative images with empty alt attribute
    - _Requirements: 6.1, 6.2, 6.4, 6.5, 6.6_

- [ ] 14. Implement Heading Structure optimization
  - [ ] 14.1 Create heading validation utilities
    - Add utility to validate H1 uniqueness
    - Add utility to check heading hierarchy
    - Add utility to verify keyword inclusion in headings
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ]* 14.2 Write property test for single H1 constraint
    - **Property 21: Single H1 Tag Constraint**
    - **Validates: Requirements 5.1**
  
  - [ ]* 14.3 Write property test for heading hierarchy
    - **Property 23: Heading Hierarchy Validity**
    - **Validates: Requirements 5.3**
  
  - [ ] 14.4 Update page templates with optimized headings
    - Ensure all pages have single H1 with keywords
    - Fix heading hierarchy issues
    - Add keywords to H2 and H3 tags naturally
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 15. Implement SEO Health Monitor
  - [ ] 15.1 Create SEOHealthMonitor class
    - Create `src/lib/seo/seo-health-monitor.ts`
    - Implement broken link detection
    - Implement missing meta tags detection
    - Implement duplicate meta tags detection
    - Implement missing alt text detection
    - Implement schema validation
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ]* 15.2 Write property test for broken link detection
    - **Property 49: Broken Link Detection**
    - **Validates: Requirements 12.1**
  
  - [ ]* 15.3 Write property test for missing meta tags detection
    - **Property 50: Missing Meta Tags Detection**
    - **Validates: Requirements 12.2**
  
  - [ ] 15.4 Create SEO health check script
    - Create `scripts/seo-health-check.ts`
    - Generate weekly SEO health reports
    - Log issues with severity levels and suggested fixes
    - _Requirements: 12.6, 12.7_
  
  - [ ] 15.5 Set up automated SEO monitoring
    - Add npm script for running health checks
    - Configure weekly automated checks
    - Set up email notifications for critical issues
    - _Requirements: 12.7_

- [ ] 16. Enhance product pages with complete SEO
  - [ ] 16.1 Update product data structure with SEO fields
    - Add ProductSEO interface to product types
    - Add metaTitle, metaDescription, keywords, slug fields
    - Add schema data (price, currency, availability, rating)
    - _Requirements: 1.3, 2.1, 3.1_
  
  - [ ] 16.2 Update all product data files with SEO metadata
    - Update `src/data/products.ts` with SEO fields
    - Update `src/data/products-en.ts` with English SEO
    - Update `src/data/products-cn.ts` with Chinese SEO
    - _Requirements: 1.3, 11.4_
  
  - [ ] 16.3 Integrate all SEO components into product pages
    - Update product page template with MetaGenerator
    - Add Product schema and Breadcrumb schema
    - Add internal links and related products
    - Add optimized images with alt text
    - _Requirements: 1.1-1.7, 2.1, 2.5, 6.1-6.6, 7.1-7.7_

- [ ] 17. Enhance blog pages with complete SEO
  - [ ] 17.1 Update blog post data with SEO fields
    - Add SEO metadata to blog post interface
    - Update existing blog posts with optimized meta tags
    - _Requirements: 1.1, 1.2_
  
  - [ ] 17.2 Integrate SEO components into blog pages
    - Add MetaGenerator to blog post template
    - Add FAQPage schema where applicable
    - Add internal links to related products and posts
    - Add breadcrumb navigation
    - _Requirements: 1.1-1.7, 2.3, 7.1, 7.7_

- [ ] 18. Checkpoint - Comprehensive SEO integration test
  - Ensure all tests pass, verify SEO elements on all page types, run SEO health check, ask the user if questions arise.

- [ ] 19. Optimize homepage SEO
  - [ ] 19.1 Update homepage with optimized meta tags
    - Apply MetaGenerator with primary keywords
    - Ensure meta title and description are compelling
    - Add all social media meta tags
    - _Requirements: 1.1-1.7_
  
  - [ ] 19.2 Add Organization and LocalBusiness schema to homepage
    - Integrate Organization schema with company info
    - Add LocalBusiness schema with geo coordinates
    - Add BreadcrumbList schema
    - _Requirements: 2.2, 2.4, 2.5_
  
  - [ ] 19.3 Optimize homepage heading structure
    - Ensure single H1 with primary keyword
    - Optimize H2 and H3 tags with keywords
    - Verify heading hierarchy
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ] 19.4 Add internal links to key pages
    - Link to top product categories
    - Link to key landing pages
    - Add contextual links in content sections
    - _Requirements: 7.6_

- [ ] 20. Performance optimization and testing
  - [ ] 20.1 Optimize build-time SEO generation
    - Add caching for schema templates
    - Optimize sitemap generation for large sites
    - Parallelize language-specific sitemap generation
    - _Requirements: 8.1, 8.4_
  
  - [ ] 20.2 Add error handling to all SEO utilities
    - Implement error handling in MetaGenerator
    - Implement error handling in SchemaGenerator
    - Implement error handling in URLOptimizer
    - Implement error handling in sitemap generation
    - _Requirements: All requirements_
  
  - [ ]* 20.3 Run comprehensive property-based tests
    - Execute all property tests with 100+ iterations
    - Verify all correctness properties hold
    - Fix any failing properties
  
  - [ ] 20.4 Validate generated SEO elements
    - Validate all sitemaps with XML validator
    - Test schema markup with Google Rich Results Test
    - Verify hreflang implementation with validator
    - Check meta tags on all page types
    - _Requirements: 2.7, 8.1, 11.1_

- [ ] 21. Final checkpoint and documentation
  - [ ] 21.1 Run final SEO health check
    - Execute complete SEO health check script
    - Verify zero critical issues
    - Document any warnings and resolutions
    - _Requirements: 12.1-12.7_
  
  - [ ] 21.2 Verify success metrics baseline
    - Document current organic traffic baseline
    - Document current keyword rankings
    - Document schema markup coverage
    - Set up tracking for success metrics
    - _Requirements: Success Metrics_
  
  - [ ] 21.3 Create SEO maintenance documentation
    - Document monthly maintenance tasks
    - Document quarterly audit procedures
    - Document how to update keywords and content
    - Create troubleshooting guide
  
  - [ ] 21.4 Final verification
    - Ensure all tests pass
    - Verify all sitemaps are generated and accessible
    - Verify robots.txt is correct
    - Verify meta tags on sample pages from each type
    - Verify schema markup on sample pages
    - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties from the design document
- Implementation uses TypeScript for type safety across all SEO utilities
- Priority order follows user's specified sequence: GA tag → SEO content → schema → sitemap → meta tags → internal linking → multilingual
