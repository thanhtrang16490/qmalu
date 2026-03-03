// SEO Configuration for On-Page SEO Optimization
// Feature: on-page-seo-optimization

import type { PageType, Language, SitemapEntry } from '../lib/seo/types';

// Primary Keywords - Main focus keywords for SEO optimization
export const PRIMARY_KEYWORDS = [
  'giá đỡ năng lượng mặt trời',
  'hệ thống lắp đặt điện mặt trời',
  'phụ kiện nhôm solar',
  'giá đỡ nhôm A6005-T6',
  'thanh ray năng lượng mặt trời',
] as const;

// Secondary Keywords - Supporting keywords for SEO
export const SECONDARY_KEYWORDS = [
  'kẹp giá đỡ pin mặt trời',
  'chân đế điện mặt trời',
  'dây tiếp địa solar',
  'giá đỡ mái tôn',
  'giá đỡ mái bằng',
] as const;

// Site Configuration - Company information and contact details
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

// Page Type Configuration - Default titles, descriptions, and sitemap settings for each page type
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
