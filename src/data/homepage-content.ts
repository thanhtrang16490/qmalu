/**
 * Homepage Content Data Structure
 * 
 * This file contains TypeScript interfaces and initial content data for all
 * homepage sections following the Apple-inspired design improvements.
 * 
 * Requirements: 30.1, 30.2, 30.4
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string; // SVG icon or emoji
}

export interface ProcessTimelineSection {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface CounterMetric {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface AnimatedCounterSection {
  title: string;
  subtitle: string;
  metrics: CounterMetric[];
  duration?: number; // Animation duration in ms, default: 2000
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
}

export interface Product3DCarouselSection {
  title: string;
  subtitle: string;
  products: Product[];
  autoRotateInterval?: number; // Default: 5000ms
}

export interface ComparisonSliderSection {
  title: string;
  subtitle: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  defaultPosition?: number; // 0-100, default: 50
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  sparklineData?: number[];
}

export interface LiveMetricsDashboardSection {
  title: string;
  subtitle: string;
  metrics: Metric[];
  updateInterval?: number; // Default: 5000ms
}

export interface TrustBadge {
  id: string;
  name: string;
  logo: string;
  type: 'partner' | 'certification';
}

export interface TrustBadgesCarouselSection {
  title: string;
  subtitle: string;
  badges: TrustBadge[];
  speed?: number; // Pixels per second, default: 50
}

export interface VideoTestimonial {
  id: string;
  videoUrl: string;
  posterImage: string;
  customerName: string;
  role: string;
  company: string;
  duration: number; // Seconds
}

export interface VideoTestimonialsSection {
  title: string;
  subtitle: string;
  testimonials: VideoTestimonial[];
}

export interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  address: string;
  phone: string;
  photo?: string;
}

export interface InteractiveMapSection {
  title: string;
  subtitle: string;
  location: MapLocation;
  zoom?: number; // Default: 15
  fallbackImage?: string;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'range';
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  defaultValue: number | string;
}

export interface ComparisonOption {
  id: string;
  name: string;
  basePrice: number;
  features: string[];
  recommended?: boolean;
}

export interface ComparisonCalculatorSection {
  title: string;
  subtitle: string;
  inputs: CalculatorInput[];
  options: ComparisonOption[];
}

export interface HomepageContent {
  processTimeline: ProcessTimelineSection;
  animatedCounter: AnimatedCounterSection;
  product3DCarousel: Product3DCarouselSection;
  comparisonSlider: ComparisonSliderSection;
  liveMetrics: LiveMetricsDashboardSection;
  trustBadges: TrustBadgesCarouselSection;
  videoTestimonials: VideoTestimonialsSection;
  interactiveMap: InteractiveMapSection;
  comparisonCalculator: ComparisonCalculatorSection;
}

// ============================================================================
// Content Data Validation
// ============================================================================

function validateRequired<T>(value: T | null | undefined, fieldName: string): T {
  if (value === null || value === undefined || value === '') {
    throw new Error(`Required field "${fieldName}" is missing or empty`);
  }
  return value;
}

function validateProcessStep(step: ProcessStep): void {
  validateRequired(step.number, 'ProcessStep.number');
  validateRequired(step.title, 'ProcessStep.title');
  validateRequired(step.description, 'ProcessStep.description');
  validateRequired(step.icon, 'ProcessStep.icon');
}

function validateProduct(product: Product): void {
  validateRequired(product.id, 'Product.id');
  validateRequired(product.name, 'Product.name');
  validateRequired(product.image, 'Product.image');
  validateRequired(product.description, 'Product.description');
  if (!product.features || product.features.length === 0) {
    throw new Error('Product.features must have at least one feature');
  }
}

function validateMetric(metric: CounterMetric | Metric): void {
  validateRequired(metric.label, 'Metric.label');
  if (typeof metric.value !== 'number') {
    throw new Error('Metric.value must be a number');
  }
}

function validateVideoTestimonial(testimonial: VideoTestimonial): void {
  validateRequired(testimonial.id, 'VideoTestimonial.id');
  validateRequired(testimonial.videoUrl, 'VideoTestimonial.videoUrl');
  validateRequired(testimonial.posterImage, 'VideoTestimonial.posterImage');
  validateRequired(testimonial.customerName, 'VideoTestimonial.customerName');
  validateRequired(testimonial.role, 'VideoTestimonial.role');
  validateRequired(testimonial.company, 'VideoTestimonial.company');
  if (typeof testimonial.duration !== 'number' || testimonial.duration <= 0) {
    throw new Error('VideoTestimonial.duration must be a positive number');
  }
}

function validateTrustBadge(badge: TrustBadge): void {
  validateRequired(badge.id, 'TrustBadge.id');
  validateRequired(badge.name, 'TrustBadge.name');
  validateRequired(badge.logo, 'TrustBadge.logo');
  validateRequired(badge.type, 'TrustBadge.type');
}

function validateMapLocation(location: MapLocation): void {
  validateRequired(location.name, 'MapLocation.name');
  validateRequired(location.address, 'MapLocation.address');
  validateRequired(location.phone, 'MapLocation.phone');
  if (typeof location.lat !== 'number' || typeof location.lng !== 'number') {
    throw new Error('MapLocation coordinates must be numbers');
  }
}

function validateCalculatorInput(input: CalculatorInput): void {
  validateRequired(input.id, 'CalculatorInput.id');
  validateRequired(input.label, 'CalculatorInput.label');
  validateRequired(input.type, 'CalculatorInput.type');
  if (input.defaultValue === null || input.defaultValue === undefined) {
    throw new Error('CalculatorInput.defaultValue is required');
  }
}

function validateComparisonOption(option: ComparisonOption): void {
  validateRequired(option.id, 'ComparisonOption.id');
  validateRequired(option.name, 'ComparisonOption.name');
  if (typeof option.basePrice !== 'number') {
    throw new Error('ComparisonOption.basePrice must be a number');
  }
  if (!option.features || option.features.length === 0) {
    throw new Error('ComparisonOption.features must have at least one feature');
  }
}

// ============================================================================
// Initial Content Data
// ============================================================================

export const homepageContent: HomepageContent = {
  // 1. Process Timeline Section (6 steps)
  processTimeline: {
    title: 'Quy trình làm việc chuyên nghiệp',
    subtitle: 'Từ tư vấn hệ thống lắp đặt điện mặt trời đến giao hàng, chúng tôi đồng hành cùng bạn trong mọi bước',
    steps: [
      {
        number: 1,
        title: 'Tư vấn & Báo giá',
        description: 'Đội ngũ chuyên gia tư vấn giải pháp giá đỡ năng lượng mặt trời tối ưu và báo giá chi tiết trong 24h',
        icon: '💬'
      },
      {
        number: 2,
        title: 'Thiết kế kỹ thuật',
        description: 'Thiết kế bản vẽ kỹ thuật 2D/3D chi tiết theo yêu cầu của khách hàng',
        icon: '📐'
      },
      {
        number: 3,
        title: 'Xác nhận mẫu',
        description: 'Sản xuất mẫu thử để khách hàng kiểm tra và xác nhận trước khi sản xuất hàng loạt',
        icon: '✓'
      },
      {
        number: 4,
        title: 'Sản xuất',
        description: 'Sản xuất phụ kiện nhôm solar với dây chuyền hiện đại, kiểm soát chất lượng nghiêm ngặt từng công đoạn',
        icon: '⚙️'
      },
      {
        number: 5,
        title: 'Kiểm tra chất lượng',
        description: 'Kiểm tra 100% sản phẩm theo tiêu chuẩn quốc tế trước khi đóng gói',
        icon: '🔍'
      },
      {
        number: 6,
        title: 'Giao hàng & Bảo hành',
        description: 'Giao hàng đúng hạn và hỗ trợ bảo hành, bảo trì trong suốt quá trình sử dụng',
        icon: '🚚'
      }
    ]
  },

  // 2. Animated Number Counter (4+ metrics)
  animatedCounter: {
    title: 'Con số ấn tượng',
    subtitle: 'Những thành tựu đáng tự hào trong sản xuất giá đỡ năng lượng mặt trời',
    metrics: [
      {
        value: 15,
        label: 'Năm kinh nghiệm',
        suffix: '+',
        icon: '📅',
        trend: 'up'
      },
      {
        value: 5000,
        label: 'Dự án hoàn thành',
        suffix: '+',
        icon: '✨',
        trend: 'up'
      },
      {
        value: 1200,
        label: 'Khách hàng tin tưởng',
        suffix: '+',
        icon: '🤝',
        trend: 'up'
      },
      {
        value: 98,
        label: 'Tỷ lệ hài lòng',
        suffix: '%',
        icon: '⭐',
        trend: 'up'
      },
      {
        value: 50000,
        label: 'Tấn nhôm định hình/năm',
        suffix: '+',
        icon: '🏭',
        trend: 'up'
      }
    ],
    duration: 2000
  },

  // 3. Product 3D Carousel (5+ products)
  product3DCarousel: {
    title: 'Sản phẩm nổi bật',
    subtitle: 'Khám phá dòng sản phẩm giá đỡ nhôm A6005-T6 chất lượng cao cho năng lượng mặt trời',
    products: [
      {
        id: 'thanh-ray-nhom-26x45mm',
        name: 'Thanh Ray Nhôm 26x45mm',
        image: '/products/rail-26x45.jpg',
        description: 'Thanh ray năng lượng mặt trời A6005-T6 dài 4.2m, anod 10-12µm, cứng vững và chịu tải tốt cho hệ thống lắp đặt điện mặt trời',
        features: [
          'Vật liệu: A6005-T6',
          'Kích thước: 26x45mm, dài 4.2m',
          'Tỉ trọng: 0.52kg/m (±5%)',
          'Bề mặt: Anod 10-12µm'
        ]
      },
      {
        id: 'kep-giua-40x50mm',
        name: 'Kẹp Giữa 40x50mm',
        image: '/products/mid-clamp.jpg',
        description: 'Kẹp giữa phụ kiện nhôm solar A6005-T6, dày 4mm, chịu lực tốt, bao gồm bulong và con chạy',
        features: [
          'Vật liệu: A6005-T6',
          'Kích thước: 40x50x15mm',
          'Độ dày: 4mm, chịu lực tốt',
          'Bao gồm: Bulong inox 304 + con chạy'
        ]
      },
      {
        id: 'kep-bien-z30-35-40',
        name: 'Kẹp Biên Z30/35/40',
        image: '/products/end-clamp.jpg',
        description: 'Kẹp biên giá đỡ năng lượng mặt trời A6005-T6, dày 2.5-4mm, bao gồm bulong M8x25 và con chạy',
        features: [
          'Vật liệu: A6005-T6',
          'Kích thước: 30/35/40x50mm',
          'Độ dày: 2.5-4mm',
          'Bao gồm: Bulong inox 304 + con chạy'
        ]
      },
      {
        id: 'chan-l-85x50x6mm-co-vit-ton',
        name: 'Chân L 85x50x6mm',
        image: '/products/l-bracket-with-screw.jpg',
        description: 'Chân L giá đỡ nhôm A6005-T6, bao gồm bulong, con chạy, vít bắn tôn và đệm cao su',
        features: [
          'Vật liệu: A6005-T6',
          'Kích thước: 85x50x6mm',
          'Bao gồm: Vít tôn + đệm cao su',
          'Ứng dụng: Lắp trên mái tôn'
        ]
      },
      {
        id: 'thanh-noi-rail-150mm',
        name: 'Thanh Nối Rail 150mm',
        image: '/products/rail-connector-150.jpg',
        description: 'Thanh nối rail hệ thống lắp đặt điện mặt trời A6005-T6, bao gồm 2 bulong M8x20 và đệm vênh inox 304',
        features: [
          'Vật liệu: A6005-T6',
          'Kích thước: 150x21.5mm',
          'Độ dày: 8mm, chịu lực tốt',
          'Bao gồm: 2 bulong inox 304'
        ]
      },
      {
        id: 'kep-seamlook-kliplock-55mm',
        name: 'Kẹp Seamlook/Kliplock 55mm',
        image: '/products/seamlook-clamp.jpg',
        description: 'Kẹp seamlook theo sóng tôn, bao gồm 2 bulong M8x25, ecu và đệm cao su inox 304',
        features: [
          'Vật liệu: A6005-T6',
          'Chiều dài: 55mm',
          'Bao gồm: Bulong + ecu + đệm cao su',
          'Ứng dụng: Mái tôn seamlook, kliplock'
        ]
      }
    ]
  },

  // 4. Before/After Comparison Slider
  comparisonSlider: {
    title: 'Chất lượng bề mặt vượt trội',
    subtitle: 'So sánh trước và sau xử lý bề mặt anodize',
    beforeImage: '/images/comparison/before-anodize.jpg',
    afterImage: '/images/comparison/after-anodize.jpg',
    beforeLabel: 'Trước xử lý',
    afterLabel: 'Sau anodize',
    defaultPosition: 50
  },

  // 5. Live Metrics Dashboard (4+ metrics)
  liveMetrics: {
    title: 'Hoạt động sản xuất',
    subtitle: 'Theo dõi các chỉ số sản xuất phụ kiện nhôm solar trong thời gian thực',
    metrics: [
      {
        id: 'production-today',
        label: 'Sản lượng hôm nay',
        value: 12500,
        unit: 'kg',
        trend: 'up',
        trendValue: 8.5,
        sparklineData: [10200, 10800, 11200, 11500, 11800, 12100, 12500]
      },
      {
        id: 'orders-processing',
        label: 'Đơn hàng đang xử lý',
        value: 47,
        unit: 'đơn',
        trend: 'neutral',
        trendValue: 0,
        sparklineData: [45, 46, 48, 47, 46, 47, 47]
      },
      {
        id: 'quality-rate',
        label: 'Tỷ lệ đạt chuẩn',
        value: 99.2,
        unit: '%',
        trend: 'up',
        trendValue: 0.3,
        sparklineData: [98.8, 98.9, 99.0, 99.1, 99.0, 99.1, 99.2]
      },
      {
        id: 'delivery-ontime',
        label: 'Giao hàng đúng hạn',
        value: 96.8,
        unit: '%',
        trend: 'up',
        trendValue: 1.2,
        sparklineData: [95.5, 95.8, 96.0, 96.2, 96.5, 96.6, 96.8]
      }
    ],
    updateInterval: 5000
  },

  // 6. Trust Badges Carousel (8+ badges)
  trustBadges: {
    title: 'Đối tác & Chứng nhận',
    subtitle: 'Được tin tưởng bởi các tổ chức uy tín trong lĩnh vực hệ thống lắp đặt điện mặt trời',
    badges: [
      {
        id: 'iso-9001',
        name: 'ISO 9001:2015',
        logo: '/partners/placeholder-logo.svg',
        type: 'certification'
      },
      {
        id: 'iso-14001',
        name: 'ISO 14001:2015',
        logo: '/partners/placeholder-logo.svg',
        type: 'certification'
      },
      {
        id: 'quacert',
        name: 'Quacert',
        logo: '/partners/placeholder-logo.svg',
        type: 'certification'
      },
      {
        id: 'vinacert',
        name: 'Vinacert',
        logo: '/partners/placeholder-logo.svg',
        type: 'certification'
      },
      {
        id: 'partner-tisco',
        name: 'Tisco',
        logo: '/partners/tisco.png',
        type: 'partner'
      },
      {
        id: 'partner-hoa-phat',
        name: 'Hòa Phát',
        logo: '/partners/hoa-phat.png',
        type: 'partner'
      },
      {
        id: 'partner-vinacomin',
        name: 'Vinacomin',
        logo: '/partners/vinacomin.png',
        type: 'partner'
      },
      {
        id: 'partner-vas',
        name: 'VAS Steel',
        logo: '/partners/vas-steel.png',
        type: 'partner'
      },
      {
        id: 'partner-komatsu',
        name: 'Komatsu',
        logo: '/partners/komatsu.png',
        type: 'partner'
      },
      {
        id: 'partner-scg',
        name: 'SCG',
        logo: '/partners/scg.png',
        type: 'partner'
      }
    ],
    speed: 50
  },

  // 7. Video Testimonials (3 videos)
  videoTestimonials: {
    title: 'Khách hàng nói gì về chúng tôi',
    subtitle: 'Những chia sẻ chân thực từ khách hàng đã sử dụng giá đỡ nhôm A6005-T6 của chúng tôi',
    testimonials: [
      {
        id: 'testimonial-1',
        videoUrl: '/videos/testimonials/customer-1.mp4',
        posterImage: '/images/testimonials/customer-1-poster.jpg',
        customerName: 'Nguyễn Văn A',
        role: 'Giám đốc Dự án',
        company: 'Công ty Xây dựng ABC',
        duration: 120
      },
      {
        id: 'testimonial-2',
        videoUrl: '/videos/testimonials/customer-2.mp4',
        posterImage: '/images/testimonials/customer-2-poster.jpg',
        customerName: 'Trần Thị B',
        role: 'Kiến trúc sư trưởng',
        company: 'Studio Kiến trúc XYZ',
        duration: 95
      },
      {
        id: 'testimonial-3',
        videoUrl: '/videos/testimonials/customer-3.mp4',
        posterImage: '/images/testimonials/customer-3-poster.jpg',
        customerName: 'Lê Văn C',
        role: 'Chủ đầu tư',
        company: 'Tập đoàn Bất động sản DEF',
        duration: 150
      }
    ]
  },

  // 8. Interactive Map (factory location)
  interactiveMap: {
    title: 'Nhà máy sản xuất',
    subtitle: 'Ghé thăm cơ sở sản xuất hiện đại của chúng tôi',
    location: {
      lat: 21.0285,
      lng: 105.8542,
      name: 'Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh',
      address: 'Lô CN09 KCN Nguyên Khê, Xã Phúc Thịnh, TP Hà Nội',
      phone: '+84 947 776 662',
      photo: '/images/factory/exterior.jpg'
    },
    zoom: 15,
    fallbackImage: '/images/factory/map-fallback.jpg'
  },

  // 9. Comparison Calculator
  comparisonCalculator: {
    title: 'Tính toán chi phí',
    subtitle: 'So sánh giá thành giữa các loại thanh ray năng lượng mặt trời và phụ kiện nhôm solar',
    inputs: [
      {
        id: 'length',
        label: 'Chiều dài (m)',
        type: 'number',
        min: 1,
        max: 100,
        step: 0.5,
        defaultValue: 10
      },
      {
        id: 'profile-type',
        label: 'Loại nhôm',
        type: 'select',
        options: [
          { value: '6063', label: 'Nhôm 6063' },
          { value: '6061', label: 'Nhôm 6061' },
          { value: '6005', label: 'Nhôm 6005' }
        ],
        defaultValue: '6063'
      },
      {
        id: 'surface-treatment',
        label: 'Xử lý bề mặt',
        type: 'select',
        options: [
          { value: 'mill-finish', label: 'Nguyên bản' },
          { value: 'anodize', label: 'Anodize' },
          { value: 'powder-coating', label: 'Sơn tĩnh điện' },
          { value: 'wood-grain', label: 'Vân gỗ' }
        ],
        defaultValue: 'anodize'
      },
      {
        id: 'quantity',
        label: 'Số lượng (kg)',
        type: 'range',
        min: 100,
        max: 10000,
        step: 100,
        defaultValue: 1000
      }
    ],
    options: [
      {
        id: 'standard',
        name: 'Gói Tiêu chuẩn',
        basePrice: 85000,
        features: [
          'Nhôm định hình chất lượng cao',
          'Kiểm tra chất lượng cơ bản',
          'Bảo hành 12 tháng',
          'Giao hàng tiêu chuẩn'
        ],
        recommended: false
      },
      {
        id: 'premium',
        name: 'Gói Cao cấp',
        basePrice: 95000,
        features: [
          'Nhôm định hình chất lượng cao',
          'Kiểm tra chất lượng toàn diện',
          'Bảo hành 24 tháng',
          'Giao hàng ưu tiên',
          'Hỗ trợ kỹ thuật 24/7',
          'Tư vấn thiết kế miễn phí'
        ],
        recommended: true
      }
    ]
  }
};

// ============================================================================
// Validation on Export
// ============================================================================

// Validate all content on module load
try {
  // Validate Process Timeline
  homepageContent.processTimeline.steps.forEach(validateProcessStep);
  if (homepageContent.processTimeline.steps.length !== 6) {
    throw new Error('Process Timeline must have exactly 6 steps');
  }

  // Validate Animated Counter
  homepageContent.animatedCounter.metrics.forEach(validateMetric);
  if (homepageContent.animatedCounter.metrics.length < 4) {
    throw new Error('Animated Counter must have at least 4 metrics');
  }

  // Validate Product 3D Carousel
  homepageContent.product3DCarousel.products.forEach(validateProduct);
  if (homepageContent.product3DCarousel.products.length < 5) {
    throw new Error('Product 3D Carousel must have at least 5 products');
  }

  // Validate Comparison Slider
  validateRequired(homepageContent.comparisonSlider.beforeImage, 'ComparisonSlider.beforeImage');
  validateRequired(homepageContent.comparisonSlider.afterImage, 'ComparisonSlider.afterImage');

  // Validate Live Metrics
  homepageContent.liveMetrics.metrics.forEach(validateMetric);
  if (homepageContent.liveMetrics.metrics.length < 4) {
    throw new Error('Live Metrics Dashboard must have at least 4 metrics');
  }

  // Validate Trust Badges
  homepageContent.trustBadges.badges.forEach(validateTrustBadge);
  if (homepageContent.trustBadges.badges.length < 8) {
    throw new Error('Trust Badges Carousel must have at least 8 badges');
  }

  // Validate Video Testimonials
  homepageContent.videoTestimonials.testimonials.forEach(validateVideoTestimonial);
  if (homepageContent.videoTestimonials.testimonials.length !== 3) {
    throw new Error('Video Testimonials must have exactly 3 testimonials');
  }

  // Validate Interactive Map
  validateMapLocation(homepageContent.interactiveMap.location);

  // Validate Comparison Calculator
  homepageContent.comparisonCalculator.inputs.forEach(validateCalculatorInput);
  homepageContent.comparisonCalculator.options.forEach(validateComparisonOption);
  if (homepageContent.comparisonCalculator.options.length < 2) {
    throw new Error('Comparison Calculator must have at least 2 options');
  }

  console.log('✓ Homepage content validation passed');
} catch (error) {
  console.error('✗ Homepage content validation failed:', error);
  throw error;
}
