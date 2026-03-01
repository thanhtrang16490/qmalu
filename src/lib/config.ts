/**
 * Configuration constants for Quang Minh
 * Centralized place for all hardcoded values
 */

// Site Configuration
export const SITE_CONFIG = {
  name: 'Quang Minh',
  nameEn: 'Quang Minh',
  nameCn: '光明',
  shortName: 'QMTECH.,JSC',
  companyName: 'Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh',
  companyNameEn: 'Quang Minh Technology Joint Stock Company',
  companyNameCn: '光明技术股份公司',
  legalRepresentative: 'Đinh Xuân Kiên',
  description: 'Quang Minh chuyên sản xuất, gia công các loại vật tư thiết bị phụ kiện điện năng lượng mặt trời và nhôm công nghiệp. Sản phẩm siêu bền dưới mọi thời tiết, dễ vệ sinh, chống cháy.',
  descriptionEn: 'Quang Minh specializes in manufacturing equipment and accessories for solar energy and industrial aluminum. Super durable products in all weather conditions.',
  descriptionCn: '光明专业生产太阳能设备配件和工业铝材。产品在各种天气条件下超耐用。',
  url: 'https://qmalu.com',
  appUrl: 'https://app.qmalu.com',
  foundedYear: '2008',
  establishedYear: 2008,
  registeredDate: '2013-03-18',
  status: 'Đang hoạt động',
} as const

// Contact Information
export const CONTACT_CONFIG = {
  phone: '+84-947-776-662',
  phoneDisplay: '0947 776 662',
  phoneShort: '0947776662',
  email: 'info@qmalu.com',
  taxCode: '0106124982',
  address: {
    street: 'Lô CN09 Khu Công nghiệp Nguyên Khê',
    ward: 'Xã Phúc Thịnh',
    city: 'Thành phố Hà Nội',
    country: 'Việt Nam',
    full: 'Lô CN09 Khu Công nghiệp Nguyên Khê, Xã Phúc Thịnh, Thành phố Hà Nội, Việt Nam',
    coordinates: {
      lat: 21.1477,
      lng: 105.8342,
    },
  },
  geo: {
    region: 'VN-HN',
    placename: 'Hà Nội',
  },
} as const

// Social Media Links
export const SOCIAL_CONFIG = {
  facebook: 'https://www.facebook.com/quangminhsolar',
  youtube: '#',
  linkedin: '#',
  zalo: 'https://zalo.me/0947776662',
  website: 'https://qmalu.com',
} as const

// SEO Configuration
export const SEO_CONFIG = {
  googleVerification: '', // Add your Google verification code
  googleAnalyticsId: 'G-RGN1EGREY6',
  facebookPixelId: '', // Add your Facebook Pixel ID
  facebookDomainVerification: '', // Add your Facebook domain verification
  bingVerification: '', // Add Bing verification code
  yandexVerification: '', // Add Yandex verification code
  zaloAppId: '', // Add your Zalo App ID
} as const

// Business Registration
export const BUSINESS_CONFIG = {
  ministryOfIndustryAndTrade: 'http://online.gov.vn/Home/WebDetails/110913',
  taxId: '',
} as const

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: 'pig',
    name: 'Thức ăn cho heo',
    nameEn: 'Pig Feed',
    nameCn: '猪饲料',
    slug: 'thuc-an-heo',
    slugEn: 'pig-feed',
    slugCn: 'pig-feed-cn',
    icon: '🐷',
    color: '#e11d48',
  },
  {
    id: 'poultry',
    name: 'Thức ăn cho gia cầm',
    nameEn: 'Poultry Feed',
    nameCn: '家禽饲料',
    slug: 'thuc-an-gia-cam',
    slugEn: 'poultry-feed',
    slugCn: 'poultry-feed-cn',
    icon: '🐔',
    color: '#f59e0b',
  },
  {
    id: 'fish',
    name: 'Thức ăn cho thủy sản',
    nameEn: 'Fish Feed',
    nameCn: '水产饲料',
    slug: 'thuy-san',
    slugEn: 'fish-feed',
    slugCn: 'fish-feed-cn',
    icon: '🐟',
    color: '#e6282b',
  },
] as const

// Statistics
export const STATS_CONFIG = {
  yearsExperience: 16,
  customers: 1500,
  productsPerYear: 50000,
  satisfactionRate: 98,
} as const

// Feature Flags
import { shouldDisableAnimations, shouldEnableParallax, shouldEnableMagneticButtons } from './mobile-detect';

export const FEATURE_FLAGS = {
  enable3DAnimations: typeof window !== 'undefined' ? !shouldDisableAnimations() : true,
  enableExitIntentPopup: false, // Disabled - annoying UX
  enableStickyCTA: true,
  enableParallax: typeof window !== 'undefined' ? shouldEnableParallax() : true,
  enableMagneticButtons: typeof window !== 'undefined' ? shouldEnableMagneticButtons() : true,
  enableCustomCursor: typeof window !== 'undefined' ? shouldEnableMagneticButtons() : false, // Same as magnetic buttons
  enableCountUpAnimations: true,
} as const

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  threeJsLazyLoad: true,
  imageLazyLoad: true,
  prefetchStrategy: 'viewport' as const,
  cacheVersion: '1.0.0',
} as const

