import type { HomepageContent } from './homepage-content';

export const homepageContentEn: HomepageContent = {
  // 1. Process Timeline Section (6 steps)
  processTimeline: {
    title: 'Professional Solar Installation Systems Process',
    subtitle: 'From solar mounting systems consultation to delivery, we accompany you every step of the way',
    steps: [
      {
        number: 1,
        title: 'Consultation & Quote',
        description: 'Expert team provides optimal solar mounting systems solutions and detailed quotes within 24 hours',
        icon: '💬'
      },
      {
        number: 2,
        title: 'Technical Design',
        description: 'Design detailed 2D/3D technical drawings according to customer requirements',
        icon: '📐'
      },
      {
        number: 3,
        title: 'Sample Confirmation',
        description: 'Produce trial samples for customer inspection and confirmation before mass production',
        icon: '✓'
      },
      {
        number: 4,
        title: 'Production',
        description: 'Manufacturing solar aluminum accessories with modern production lines, strict quality control at every stage',
        icon: '⚙️'
      },
      {
        number: 5,
        title: 'Quality Inspection',
        description: 'Inspect 100% of products according to international standards before packaging',
        icon: '🔍'
      },
      {
        number: 6,
        title: 'Delivery & Warranty',
        description: 'On-time delivery and warranty support, maintenance throughout the usage period',
        icon: '🚚'
      }
    ]
  },

  // 2. Animated Number Counter (4+ metrics)
  animatedCounter: {
    title: 'Impressive Numbers',
    subtitle: 'Our proud achievements in solar mounting systems manufacturing',
    metrics: [
      {
        value: 15,
        label: 'Years of Experience',
        suffix: '+',
        icon: '📅',
        trend: 'up'
      },
      {
        value: 5000,
        label: 'Completed Projects',
        suffix: '+',
        icon: '✨',
        trend: 'up'
      },
      {
        value: 1200,
        label: 'Trusted Customers',
        suffix: '+',
        icon: '🤝',
        trend: 'up'
      },
      {
        value: 98,
        label: 'Satisfaction Rate',
        suffix: '%',
        icon: '⭐',
        trend: 'up'
      },
      {
        value: 3000,
        label: 'Factory Area',
        suffix: 'm²',
        icon: '🏭',
        trend: 'up'
      }
    ]
  },

  // Continue with other sections using English translations
  product3DCarousel: {
    title: 'Featured Solar Mounting Systems',
    subtitle: 'Explore our high-quality A6005-T6 aluminum mounting and solar aluminum rails for solar installation systems',
    products: [
      {
        id: 'thanh-ray-nhom-26x45mm',
        name: 'Solar Aluminum Rail 26x45mm',
        image: '/products/rail-26x45.jpg',
        description: 'A6005-T6 aluminum mounting rail 4.2m long, anodized 10-12µm, sturdy and load-bearing for solar installation systems',
        features: [
          'Material: A6005-T6 aluminum mounting',
          'Size: 26x45mm, 4.2m long',
          'Weight: 0.52kg/m (±5%)',
          'Surface: Anodized 10-12µm'
        ]
      },
      {
        id: 'kep-giua-40x50mm',
        name: 'Solar Mid Clamp 40x50mm',
        image: '/products/mid-clamp.jpg',
        description: 'A6005-T6 aluminum mounting mid clamp for solar aluminum accessories, 4mm thick, high load capacity, includes bolt and T-nut',
        features: [
          'Material: A6005-T6',
          'Size: 40x50x15mm',
          'Thickness: 4mm, high strength',
          'Includes: Stainless steel 304 bolt + T-nut'
        ]
      },
      {
        id: 'kep-bien-z30-35-40',
        name: 'Solar End Clamp Z30/35/40',
        image: '/products/end-clamp.jpg',
        description: 'A6005-T6 aluminum mounting end clamp for solar mounting systems, 2.5-4mm thick, includes M8x25 bolt and T-nut',
        features: [
          'Material: A6005-T6',
          'Size: 30/35/40x50mm',
          'Thickness: 2.5-4mm',
          'Includes: Stainless steel 304 bolt + T-nut'
        ]
      },
      {
        id: 'chan-l-85x50x6mm-co-vit-ton',
        name: 'Solar L-Bracket 85x50x6mm',
        image: '/products/l-bracket-with-screw.jpg',
        description: 'A6005-T6 aluminum mounting L-bracket for solar installation systems, includes bolt, T-nut, self-drilling screw and rubber pad',
        features: [
          'Material: A6005-T6',
          'Size: 85x50x6mm',
          'Includes: Self-drilling screw + rubber pad',
          'Application: Roof mounting'
        ]
      },
      {
        id: 'thanh-noi-rail-150mm',
        name: 'Solar Rail Connector 150mm',
        image: '/products/rail-connector-150.jpg',
        description: 'A6005-T6 aluminum mounting rail connector for solar aluminum rails, includes 2 M8x20 bolts and stainless steel 304 washers',
        features: [
          'Material: A6005-T6',
          'Size: 150x21.5mm',
          'Thickness: 8mm, high strength',
          'Includes: 2 stainless steel 304 bolts'
        ]
      },
      {
        id: 'kep-seamlook-kliplock-55mm',
        name: 'Solar Seamlook/Kliplock Clamp 55mm',
        image: '/products/seamlook-clamp.jpg',
        description: 'Solar aluminum accessories seamlook clamp for corrugated roof mounting, includes 2 M8x25 bolts, nuts and rubber pad',
        features: [
          'Material: A6005-T6',
          'Length: 55mm',
          'Includes: Bolts + nuts + rubber pad',
          'Application: Seamlook, kliplock roofs'
        ]
      }
    ],
    autoRotateInterval: 5000
  },

  comparisonSlider: {
    title: 'Superior Surface Quality',
    subtitle: 'Compare before and after anodizing surface treatment',
    beforeImage: '/images/comparison/before-anodize.jpg',
    afterImage: '/images/comparison/after-anodize.jpg',
    beforeLabel: 'Before Treatment',
    afterLabel: 'After Anodizing',
    defaultPosition: 50
  },

  liveMetrics: {
    title: 'Solar Aluminum Accessories Production',
    subtitle: 'Track solar mounting systems production metrics in real-time',
    metrics: [
      {
        id: 'production-today',
        label: "Today's Output",
        value: 12500,
        unit: 'kg',
        trend: 'up',
        trendValue: 8.5,
        sparklineData: [10200, 10800, 11200, 11500, 11800, 12100, 12500]
      },
      {
        id: 'orders-processing',
        label: 'Orders Processing',
        value: 47,
        unit: 'orders',
        trend: 'neutral',
        trendValue: 0,
        sparklineData: [45, 46, 48, 47, 46, 47, 47]
      },
      {
        id: 'quality-rate',
        label: 'Quality Rate',
        value: 99.2,
        unit: '%',
        trend: 'up',
        trendValue: 0.3,
        sparklineData: [98.8, 98.9, 99.0, 99.1, 99.0, 99.1, 99.2]
      },
      {
        id: 'delivery-ontime',
        label: 'On-time Delivery',
        value: 96.8,
        unit: '%',
        trend: 'up',
        trendValue: 1.2,
        sparklineData: [95.5, 95.8, 96.0, 96.2, 96.5, 96.6, 96.8]
      }
    ],
    updateInterval: 5000
  },

  trustBadges: {
    title: 'Partners & Certifications',
    subtitle: 'Trusted by reputable organizations in solar installation systems industry',
    badges: [
      {
        id: 'iso-9001',
        name: 'ISO 9001:2015',
        logo: '/images/badges/iso-9001.svg',
        type: 'certification'
      },
      {
        id: 'iso-14001',
        name: 'ISO 14001:2015',
        logo: '/images/badges/iso-14001.svg',
        type: 'certification'
      },
      {
        id: 'quacert',
        name: 'Quacert',
        logo: '/images/badges/quacert.svg',
        type: 'certification'
      },
      {
        id: 'vinacert',
        name: 'Vinacert',
        logo: '/images/badges/vinacert.svg',
        type: 'certification'
      },
      {
        id: 'partner-1',
        name: 'Vingroup',
        logo: '/images/badges/vingroup.svg',
        type: 'partner'
      },
      {
        id: 'partner-2',
        name: 'Hoa Phat',
        logo: '/images/badges/hoa-phat.svg',
        type: 'partner'
      },
      {
        id: 'partner-3',
        name: 'Coteccons',
        logo: '/images/badges/coteccons.svg',
        type: 'partner'
      },
      {
        id: 'partner-4',
        name: 'Hung Thinh',
        logo: '/images/badges/hung-thinh.svg',
        type: 'partner'
      },
      {
        id: 'partner-5',
        name: 'Novaland',
        logo: '/images/badges/novaland.svg',
        type: 'partner'
      },
      {
        id: 'partner-6',
        name: 'Vinhomes',
        logo: '/images/badges/vinhomes.svg',
        type: 'partner'
      }
    ],
    speed: 50
  },

  videoTestimonials: {
    title: 'What Customers Say About Us',
    subtitle: 'Genuine feedback from customers who have used our A6005-T6 aluminum mounting products',
    testimonials: [
      {
        id: 'testimonial-1',
        videoUrl: '/videos/testimonials/customer-1.mp4',
        posterImage: '/images/testimonials/customer-1-poster.jpg',
        customerName: 'Nguyen Van A',
        role: 'Project Director',
        company: 'ABC Construction Company',
        duration: 120
      },
      {
        id: 'testimonial-2',
        videoUrl: '/videos/testimonials/customer-2.mp4',
        posterImage: '/images/testimonials/customer-2-poster.jpg',
        customerName: 'Tran Thi B',
        role: 'Chief Architect',
        company: 'XYZ Architecture Studio',
        duration: 95
      },
      {
        id: 'testimonial-3',
        videoUrl: '/videos/testimonials/customer-3.mp4',
        posterImage: '/images/testimonials/customer-3-poster.jpg',
        customerName: 'Le Van C',
        role: 'Investor',
        company: 'DEF Real Estate Group',
        duration: 150
      }
    ]
  },

  comparisonCalculator: {
    title: 'Solar Mounting Systems Cost Calculator',
    subtitle: 'Compare costs for solar aluminum rails and accessories',
    inputs: [
      {
        id: 'length',
        label: 'Length (m)',
        type: 'number',
        min: 1,
        max: 100,
        step: 0.5,
        defaultValue: 10
      },
      {
        id: 'profile-type',
        label: 'Aluminum Type',
        type: 'select',
        options: [
          { value: '6063', label: 'Aluminum 6063' },
          { value: '6061', label: 'Aluminum 6061' },
          { value: '6005', label: 'Aluminum 6005' }
        ],
        defaultValue: '6063'
      },
      {
        id: 'surface-treatment',
        label: 'Surface Treatment',
        type: 'select',
        options: [
          { value: 'mill-finish', label: 'Mill Finish' },
          { value: 'anodize', label: 'Anodize' },
          { value: 'powder-coating', label: 'Powder Coating' },
          { value: 'wood-grain', label: 'Wood Grain' }
        ],
        defaultValue: 'anodize'
      },
      {
        id: 'quantity',
        label: 'Quantity (kg)',
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
        name: 'Standard Package',
        basePrice: 85000,
        features: [
          'High-quality aluminum profiles',
          'Basic quality inspection',
          '12-month warranty',
          'Standard delivery'
        ],
        recommended: false
      },
      {
        id: 'premium',
        name: 'Premium Package',
        basePrice: 95000,
        features: [
          'High-quality aluminum profiles',
          'Comprehensive quality inspection',
          '24-month warranty',
          'Priority delivery',
          '24/7 technical support',
          'Free design consultation'
        ],
        recommended: true
      }
    ]
  },

  interactiveMap: {
    title: 'Our Factory Location',
    subtitle: 'Visit us at our modern facility',
    location: {
      lat: 21.165485437772254,
      lng: 105.83500360198961,
      name: 'Quang Minh Technology Joint Stock Company',
      address: 'Lot CN09, Nguyen Khe Industrial Park, Phuc Thinh Commune, Dong Anh, Hanoi',
      phone: '+84 947 776 662'
    },
    zoom: 15,
    fallbackImage: '/factory-map.jpg'
  }
};
