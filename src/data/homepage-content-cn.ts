import type { HomepageContent } from './homepage-content';

export const homepageContentCn: HomepageContent = {
  // 1. Process Timeline Section (6 steps)
  processTimeline: {
    title: '专业太阳能安装系统流程',
    subtitle: '从太阳能支架系统咨询到交付，我们陪伴您每一步',
    steps: [
      {
        number: 1,
        title: '咨询和报价',
        description: '专家团队在24小时内提供最佳太阳能支架系统解决方案和详细报价',
        icon: '💬'
      },
      {
        number: 2,
        title: '技术设计',
        description: '根据客户要求设计详细的2D/3D技术图纸',
        icon: '📐'
      },
      {
        number: 3,
        title: '样品确认',
        description: '生产试样供客户检查和确认后再批量生产',
        icon: '✓'
      },
      {
        number: 4,
        title: '生产',
        description: '采用现代化生产线制造太阳能铝配件，每个阶段严格质量控制',
        icon: '⚙️'
      },
      {
        number: 5,
        title: '质量检验',
        description: '包装前按国际标准检验100%产品',
        icon: '🔍'
      },
      {
        number: 6,
        title: '交付和保修',
        description: '准时交付并在整个使用期间提供保修支持和维护',
        icon: '🚚'
      }
    ]
  },

  // 2. Animated Number Counter (4+ metrics)
  animatedCounter: {
    title: '令人印象深刻的数字',
    subtitle: '我们在太阳能支架系统制造方面引以为豪的成就',
    metrics: [
      {
        value: 15,
        label: '年经验',
        suffix: '+',
        icon: '📅',
        trend: 'up'
      },
      {
        value: 5000,
        label: '完成项目',
        suffix: '+',
        icon: '✨',
        trend: 'up'
      },
      {
        value: 1200,
        label: '信赖客户',
        suffix: '+',
        icon: '🤝',
        trend: 'up'
      },
      {
        value: 98,
        label: '满意率',
        suffix: '%',
        icon: '⭐',
        trend: 'up'
      },
      {
        value: 3000,
        label: '工厂面积',
        suffix: 'm²',
        icon: '🏭',
        trend: 'up'
      }
    ]
  },

  // Continue with other sections using Chinese translations
  product3DCarousel: {
    title: '特色太阳能支架系统',
    subtitle: '探索我们的高质量A6005-T6铝支架和太阳能铝导轨用于太阳能安装系统',
    products: [
      {
        id: 'thanh-ray-nhom-26x45mm',
        name: '太阳能铝导轨26x45mm',
        image: '/products/rail-26x45.jpg',
        description: 'A6005-T6铝支架导轨长4.2米，阳极氧化10-12µm，坚固耐用用于太阳能安装系统',
        features: [
          '材料：A6005-T6铝支架',
          '尺寸：26x45mm，长4.2米',
          '重量：0.52kg/m (±5%)',
          '表面：阳极氧化10-12µm'
        ]
      },
      {
        id: 'kep-giua-40x50mm',
        name: '太阳能中间夹40x50mm',
        image: '/products/mid-clamp.jpg',
        description: 'A6005-T6铝支架中间夹用于太阳能铝配件，厚4mm，高承载力，包括螺栓和T型螺母',
        features: [
          '材料：A6005-T6',
          '尺寸：40x50x15mm',
          '厚度：4mm，高强度',
          '包括：不锈钢304螺栓 + T型螺母'
        ]
      },
      {
        id: 'kep-bien-z30-35-40',
        name: '太阳能端夹Z30/35/40',
        image: '/products/end-clamp.jpg',
        description: 'A6005-T6铝支架端夹用于太阳能支架系统，厚2.5-4mm，包括M8x25螺栓和T型螺母',
        features: [
          '材料：A6005-T6',
          '尺寸：30/35/40x50mm',
          '厚度：2.5-4mm',
          '包括：不锈钢304螺栓 + T型螺母'
        ]
      },
      {
        id: 'chan-l-85x50x6mm-co-vit-ton',
        name: '太阳能L型支架85x50x6mm',
        image: '/products/l-bracket-with-screw.jpg',
        description: 'A6005-T6铝支架L型支架用于太阳能安装系统，包括螺栓、T型螺母、自攻螺丝和橡胶垫',
        features: [
          '材料：A6005-T6',
          '尺寸：85x50x6mm',
          '包括：自攻螺丝 + 橡胶垫',
          '应用：屋顶安装'
        ]
      },
      {
        id: 'thanh-noi-rail-150mm',
        name: '太阳能导轨连接器150mm',
        image: '/products/rail-connector-150.jpg',
        description: 'A6005-T6铝支架导轨连接器用于太阳能铝导轨，包括2个M8x20螺栓和不锈钢304垫圈',
        features: [
          '材料：A6005-T6',
          '尺寸：150x21.5mm',
          '厚度：8mm，高强度',
          '包括：2个不锈钢304螺栓'
        ]
      },
      {
        id: 'kep-seamlook-kliplock-55mm',
        name: '太阳能Seamlook/Kliplock夹55mm',
        image: '/products/seamlook-clamp.jpg',
        description: '太阳能铝配件波纹屋顶Seamlook夹用于屋顶安装，包括2个M8x25螺栓、螺母和橡胶垫',
        features: [
          '材料：A6005-T6',
          '长度：55mm',
          '包括：螺栓 + 螺母 + 橡胶垫',
          '应用：Seamlook、kliplock屋顶'
        ]
      }
    ],
    autoRotateInterval: 5000
  },

  comparisonSlider: {
    title: '卓越的表面质量',
    subtitle: '阳极氧化表面处理前后对比',
    beforeImage: '/images/comparison/before-anodize.jpg',
    afterImage: '/images/comparison/after-anodize.jpg',
    beforeLabel: '处理前',
    afterLabel: '阳极氧化后',
    defaultPosition: 50
  },

  liveMetrics: {
    title: '太阳能铝配件生产',
    subtitle: '实时跟踪太阳能支架系统生产指标',
    metrics: [
      {
        id: 'production-today',
        label: '今日产量',
        value: 12500,
        unit: 'kg',
        trend: 'up',
        trendValue: 8.5,
        sparklineData: [10200, 10800, 11200, 11500, 11800, 12100, 12500]
      },
      {
        id: 'orders-processing',
        label: '处理中订单',
        value: 47,
        unit: '订单',
        trend: 'neutral',
        trendValue: 0,
        sparklineData: [45, 46, 48, 47, 46, 47, 47]
      },
      {
        id: 'quality-rate',
        label: '质量达标率',
        value: 99.2,
        unit: '%',
        trend: 'up',
        trendValue: 0.3,
        sparklineData: [98.8, 98.9, 99.0, 99.1, 99.0, 99.1, 99.2]
      },
      {
        id: 'delivery-ontime',
        label: '准时交货',
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
    title: '合作伙伴和认证',
    subtitle: '受到太阳能安装系统行业知名组织的信赖',
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
        name: 'Hòa Phát',
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
        name: 'Hưng Thịnh',
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
    title: '客户评价',
    subtitle: '使用过我们A6005-T6铝支架产品的客户的真实反馈',
    testimonials: [
      {
        id: 'testimonial-1',
        videoUrl: '/videos/testimonials/customer-1.mp4',
        posterImage: '/images/testimonials/customer-1-poster.jpg',
        customerName: '阮文A',
        role: '项目总监',
        company: 'ABC建筑公司',
        duration: 120
      },
      {
        id: 'testimonial-2',
        videoUrl: '/videos/testimonials/customer-2.mp4',
        posterImage: '/images/testimonials/customer-2-poster.jpg',
        customerName: '陈氏B',
        role: '首席建筑师',
        company: 'XYZ建筑工作室',
        duration: 95
      },
      {
        id: 'testimonial-3',
        videoUrl: '/videos/testimonials/customer-3.mp4',
        posterImage: '/images/testimonials/customer-3-poster.jpg',
        customerName: '黎文C',
        role: '投资者',
        company: 'DEF房地产集团',
        duration: 150
      }
    ]
  },

  comparisonCalculator: {
    title: '太阳能支架系统成本计算器',
    subtitle: '比较太阳能铝导轨和配件的成本',
    inputs: [
      {
        id: 'length',
        label: '长度 (m)',
        type: 'number',
        min: 1,
        max: 100,
        step: 0.5,
        defaultValue: 10
      },
      {
        id: 'profile-type',
        label: '铝类型',
        type: 'select',
        options: [
          { value: '6063', label: '铝6063' },
          { value: '6061', label: '铝6061' },
          { value: '6005', label: '铝6005' }
        ],
        defaultValue: '6063'
      },
      {
        id: 'surface-treatment',
        label: '表面处理',
        type: 'select',
        options: [
          { value: 'mill-finish', label: '原始表面' },
          { value: 'anodize', label: '阳极氧化' },
          { value: 'powder-coating', label: '粉末涂层' },
          { value: 'wood-grain', label: '木纹' }
        ],
        defaultValue: 'anodize'
      },
      {
        id: 'quantity',
        label: '数量 (kg)',
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
        name: '标准套餐',
        basePrice: 85000,
        features: [
          '高质量铝型材',
          '基本质量检验',
          '12个月保修',
          '标准交货'
        ],
        recommended: false
      },
      {
        id: 'premium',
        name: '高级套餐',
        basePrice: 95000,
        features: [
          '高质量铝型材',
          '全面质量检验',
          '24个月保修',
          '优先交货',
          '24/7技术支持',
          '免费设计咨询'
        ],
        recommended: true
      }
    ]
  },

  interactiveMap: {
    title: '我们的工厂位置',
    subtitle: '参观我们的现代化设施',
    location: {
      lat: 21.0285,
      lng: 105.8542,
      name: '光明技术股份公司',
      address: 'CN09地块，阮溪工业区，福盛社，河内市',
      phone: '+84 947 776 662'
    },
    zoom: 15,
    fallbackImage: '/factory-map.jpg'
  }
};
