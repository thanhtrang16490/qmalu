// Chinese product data for Quang Minh - Based on actual quotations
import type { Product, Category } from './products'

// Categories - Chinese
export const categoriesCn: Category[] = [
  {
    id: 'solar-rails',
    name: '太阳能铝导轨',
    slug: 'solar-aluminum-rails',
    description: 'A6005-T6铝导轨用于太阳能系统',
    icon: '☀️',
    display_order: 1
  },
  {
    id: 'solar-clamps',
    name: '夹具和太阳能配件',
    slug: 'clamps-solar-accessories',
    description: '中间夹、边缘夹、seamlook夹和安装配件',
    icon: '🔧',
    display_order: 2
  },
  {
    id: 'mounting-brackets',
    name: '安装支架和支撑',
    slug: 'mounting-brackets-supports',
    description: 'L型支架、支撑和面板安装结构',
    icon: '🏗️',
    display_order: 3
  },
  {
    id: 'grounding-accessories',
    name: '接地配件',
    slug: 'grounding-accessories',
    description: '接地夹、接地板和电气安全配件',
    icon: '⚡',
    display_order: 4
  }
]

// Products - Chinese translations (first 15 products)
export const productsCn: Product[] = [
  // Solar Rails
  {
    id: '1',
    code: 'QM-001',
    name: '铝导轨 26x45mm',
    slug: 'aluminum-rail-26x45mm',
    category_id: 'solar-rails',
    price: 218500,
    unit: '根',
    stock: 1000,
    image_url: '/products/rail-26x45.jpg',
    description: 'A6005-T6铝导轨长4.2米，阳极氧化10-12µm，坚固耐用',
    specifications: `产品代码：QM-001
尺寸：26x45mm
长度：4.2米/根
重量：0.52kg/米（±5%）
材料：A6005-T6
表面：阳极氧化10-12µm
特点：坚固、平衡槽、承载能力好
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    code: 'QM-001-52',
    name: '铝导轨 26x52mm',
    slug: 'aluminum-rail-26x52mm',
    category_id: 'solar-rails',
    price: 61500,
    unit: '米',
    stock: 1000,
    image_url: '/products/rail-26x52.jpg',
    description: 'A6005-T6铝导轨长4.2米，重量0.65kg/米，高承载能力',
    specifications: `产品代码：QM-001
尺寸：26x52mm
长度：4.2米/根
重量：0.65kg/米（±5%）
材料：A6005-T6
表面：阳极氧化10-12µm
特点：坚固、平衡槽、承载能力好
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '3',
    code: 'QM-001-50',
    name: '铝导轨 26x50mm',
    slug: 'aluminum-rail-26x50mm',
    category_id: 'solar-rails',
    price: 60000,
    unit: '米',
    stock: 1000,
    image_url: '/products/rail-26x50.jpg',
    description: 'A6005-T5铝导轨长4.2米，太阳能项目最常用',
    specifications: `尺寸：26x50mm
长度：4.2米/根
材料：A6005-T5
表面：阳极氧化
特点：常用、价格优惠
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Rail Connectors
  {
    id: '4',
    code: 'QM-008',
    name: '导轨连接件 150mm',
    slug: 'rail-connector-150mm',
    category_id: 'solar-rails',
    price: 13000,
    unit: '套',
    stock: 2000,
    image_url: '/products/rail-connector-150.jpg',
    description: 'A6005-T6导轨连接件，包含2个M8x20螺栓和304不锈钢垫圈',
    specifications: `产品代码：QM-008
尺寸：150x21.5mm
材料：A6005-T6
表面：阳极氧化10-12µm
包含：
- 02 304不锈钢螺栓 M8x20
- 02 304不锈钢弹簧垫圈 M8
厚度：8mm，高强度
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '5',
    code: 'QM-008-140',
    name: '导轨连接件 140mm',
    slug: 'rail-connector-140mm',
    category_id: 'solar-rails',
    price: 10000,
    unit: '套',
    stock: 2000,
    image_url: '/products/rail-connector-140.jpg',
    description: '导轨连接件140mm，包含2个M8x20螺栓和弹簧垫圈',
    specifications: `尺寸：140x21.5mm
材料：A6005-T6
包含：
- 02 螺栓 M8x20
- 02 弹簧垫圈
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Solar Clamps
  {
    id: '6',
    code: 'QM-016',
    name: '中间夹 40x50mm',
    slug: 'mid-clamp-40x50mm',
    category_id: 'solar-clamps',
    price: 6200,
    unit: '套',
    stock: 5000,
    image_url: '/products/mid-clamp.jpg',
    description: 'A6005-T6铝中间夹，厚4mm，高强度，包含螺栓和T型螺母',
    specifications: `产品代码：QM-016
尺寸：40x50x15mm
材料：A6005-T6
表面：阳极氧化10-12µm
厚度：4mm，高强度
包含：
- 01 铝T型螺母 M8
- 01 304不锈钢螺栓 M8x40
- 01 304不锈钢弹簧垫圈 M8
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '7',
    code: 'QM-020',
    name: '边缘夹 Z30/35/40',
    slug: 'end-clamp-z30-35-40',
    category_id: 'solar-clamps',
    price: 6200,
    unit: '套',
    stock: 5000,
    image_url: '/products/end-clamp.jpg',
    description: 'A6005-T6铝边缘夹，厚2.5-4mm，包含M8x25螺栓和T型螺母',
    specifications: `产品代码：QM-020
尺寸：30/35/40x50mm
材料：A6005-T6
表面：阳极氧化10-12µm
厚度：2.5-4mm，高强度
包含：
- 01 铝T型螺母 M8
- 01 304不锈钢螺栓 M8x25
- 01 304不锈钢弹簧垫圈 M8
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '8',
    code: 'QM-SEAMLOOK',
    name: 'Seamlook/Kliplock夹 55mm',
    slug: 'seamlook-kliplock-clamp-55mm',
    category_id: 'solar-clamps',
    price: 18000,
    unit: '套',
    stock: 3000,
    image_url: '/products/seamlook-clamp.jpg',
    description: 'Seamlook波纹屋顶夹，包含2个M8x25螺栓、螺母和橡胶垫',
    specifications: `长度：55mm
材料：A6005-T6
包含：
- 02 304不锈钢螺栓 M8x25 / 自攻螺丝 M5.5x75
- 02 304不锈钢弹簧垫圈 M8
- 02 304不锈钢螺母 M8
- 01 橡胶垫 40x40x2mm
应用：用于seamlook、kliplock屋顶
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Mounting Brackets
  {
    id: '9',
    code: 'QM-011',
    name: 'L型支架 85x50x6mm（带螺丝）',
    slug: 'l-bracket-85x50x6mm-with-screw',
    category_id: 'mounting-brackets',
    price: 15000,
    unit: '套',
    stock: 3000,
    image_url: '/products/l-bracket-with-screw.jpg',
    description: 'A6005-T6铝L型支架，包含螺栓、T型螺母、自攻螺丝和橡胶垫',
    specifications: `产品代码：QM-011
尺寸：85x50x6mm
材料：A6005-T6
长度：50mm
包含：
- 01 铝T型螺母 M8
- 01 304不锈钢螺栓 M8x25
- 01 304不锈钢弹簧垫圈 M8
- 01 自攻螺丝 5.5x75mm
- 01 橡胶垫 50x40x2mm
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '10',
    code: 'QM-011-NO-SCREW',
    name: 'L型支架 85x50x6mm（不带螺丝）',
    slug: 'l-bracket-85x50x6mm-no-screw',
    category_id: 'mounting-brackets',
    price: 13500,
    unit: '套',
    stock: 3000,
    image_url: '/products/l-bracket-no-screw.jpg',
    description: 'A6005-T6铝L型支架，不包含自攻螺丝和橡胶垫',
    specifications: `产品代码：QM-011
尺寸：85x50x6mm
材料：A6005-T6
长度：50mm
包含：
- 01 铝T型螺母 M8
- 01 304不锈钢螺栓 M8x25
- 01 304不锈钢弹簧垫圈 M8
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '11',
    code: 'QM-L-85x40',
    name: 'L型支架 85x40x6mm',
    slug: 'l-bracket-85x40x6mm',
    category_id: 'mounting-brackets',
    price: 14000,
    unit: '套',
    stock: 3000,
    image_url: '/products/l-bracket-85x40.jpg',
    description: '铝L型支架厚6mm，包含M8x25螺栓、T型螺母和自攻螺丝',
    specifications: `尺寸：85x40x6mm
材料：A6005-T6
包含：
- 螺栓 M8x25
- T型螺母
- 自攻螺丝
- 垫片
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Grounding Accessories
  {
    id: '12',
    code: 'QM-028',
    name: '导轨接地夹',
    slug: 'rail-grounding-clamp',
    category_id: 'grounding-accessories',
    price: 10000,
    unit: '套',
    stock: 2000,
    image_url: '/products/grounding-clamp-rail.jpg',
    description: '导轨接地夹，包含螺栓和迷你接地板',
    specifications: `产品代码：QM-028
材料：A6005-T6
长度：40mm
包含：
- 01 铝T型螺母 M8
- 01 304不锈钢螺栓 M8x25
- 01 304不锈钢弹簧垫圈 M8
- 01 304不锈钢螺栓 M8
- 01 迷你接地板
产地：QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '13',
    code: 'QM-028-20',
    name: '接地夹 20mm',
    slug: 'grounding-clamp-20mm',
    category_id: 'grounding-accessories',
    price: 12000,
    unit: '套',
    stock: 2000,
    image_url: '/products/grounding-clamp-20.jpg',
    description: '接地夹20mm，包含304不锈钢螺栓、弹簧垫圈和接地法兰',
    specifications: `尺寸：20mm
包含：
- 01 304不锈钢螺栓 M8x25
- 01 螺栓 M6x16
- 弹簧垫圈
- T型螺母
- 接地法兰
材料：304不锈钢`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '14',
    code: 'QM-033',
    name: '接地板',
    slug: 'grounding-plate',
    category_id: 'grounding-accessories',
    price: 1100,
    unit: '个',
    stock: 10000,
    image_url: '/products/grounding-plate.jpg',
    description: '304不锈钢接地板，高质量，耐腐蚀',
    specifications: `产品代码：QM-033
材料：304不锈钢
特点：耐腐蚀、高耐用性
应用：太阳能系统安全接地`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '15',
    code: 'QM-034',
    name: 'DC电缆夹',
    slug: 'dc-cable-clamp',
    category_id: 'grounding-accessories',
    price: 1250,
    unit: '个',
    stock: 10000,
    image_url: '/products/dc-cable-clamp.jpg',
    description: '304不锈钢DC电缆夹，安全固定电缆',
    specifications: `产品代码：QM-034
材料：304不锈钢
特点：耐腐蚀、安全固定
应用：太阳能系统DC电缆固定`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Additional products with null prices
  {
    id: '16',
    code: 'QM-00909',
    name: 'Z型支架 200x100x2mm',
    slug: 'z-bracket-200x100x2mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: '个',
    stock: 1000,
    image_url: '/products/z-bracket.jpg',
    description: '铝Z型支架，尺寸200x100x2mm，用于特殊结构',
    specifications: `产品代码：QM-00909
尺寸：200x100x2mm
材料：铝A6005
应用：特殊结构、支撑`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '17',
    code: 'QM-01010',
    name: 'L型支架 40x80x6mm',
    slug: 'l-bracket-40x80x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: '套',
    stock: 2000,
    image_url: '/products/l-bracket-40x80.jpg',
    description: '铝L型支架40x80x6mm，高承载能力',
    specifications: `产品代码：QM-01010
尺寸：40x80x6mm
材料：铝A6005
厚度：6mm`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '18',
    code: 'QM-01111',
    name: 'L型支架套装 L1 40x80x6mm',
    slug: 'l-bracket-set-l1-40x80x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: '套',
    stock: 2000,
    image_url: '/products/l-bracket-set-1.jpg',
    description: '完整的L1支架套装带配件',
    specifications: `产品代码：QM-01111
尺寸：40x80x6mm
包含：L型支架 + 安装配件`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '19',
    code: 'QM-01212',
    name: 'L型支架套装 L2 40x125x6mm',
    slug: 'l-bracket-set-l2-40x125x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: '套',
    stock: 1500,
    image_url: '/products/l-bracket-set-2.jpg',
    description: '大型L2支架套装40x125x6mm',
    specifications: `产品代码：QM-01212
尺寸：40x125x6mm
包含：L型支架 + 安装配件`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '20',
    code: 'QM-01313',
    name: '平衡T型螺母 21mm',
    slug: 'balanced-t-nut-21mm',
    category_id: 'solar-clamps',
    price: null,
    unit: '个',
    stock: 5000,
    image_url: '/products/sliding-nut-21.jpg',
    description: '平衡T型螺母21mm，安装配件',
    specifications: `产品代码：QM-01313
尺寸：21mm
材料：铝
应用：用于导轨安装`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '21',
    code: 'QM-01414',
    name: 'T型螺母 + 304不锈钢螺栓',
    slug: 't-nut-stainless-steel-304-bolt',
    category_id: 'solar-clamps',
    price: null,
    unit: '套',
    stock: 5000,
    image_url: '/products/sliding-nut-bolt.jpg',
    description: 'T型螺母套装带304不锈钢螺栓',
    specifications: `产品代码：QM-01414
包含：T型螺母 + 304不锈钢螺栓
材料：304不锈钢`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '22',
    code: 'QM-01515',
    name: 'U型夹 30x60mm 镀锌',
    slug: 'u-clamp-30x60mm-galvanized',
    category_id: 'solar-clamps',
    price: null,
    unit: '个',
    stock: 3000,
    image_url: '/products/u-clamp-galvanized.jpg',
    description: '镀锌U型夹30x60mm，防锈',
    specifications: `产品代码：QM-01515
尺寸：30x60mm
材料：镀锌钢
特点：防锈、耐用`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '23',
    code: 'QM-01616',
    name: '中间夹 35/40 嵌入式',
    slug: 'mid-clamp-35-40-flush-mount',
    category_id: 'solar-clamps',
    price: null,
    unit: '套',
    stock: 3000,
    image_url: '/products/mid-clamp-flush.jpg',
    description: '中间夹35/40mm嵌入式，高美观性',
    specifications: `产品代码：QM-01616
尺寸：35/40mm
类型：嵌入式
材料：铝A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '24',
    code: 'QM-01717',
    name: '中间夹 35/40 凸起式',
    slug: 'mid-clamp-35-40-raised-mount',
    category_id: 'solar-clamps',
    price: null,
    unit: '套',
    stock: 3000,
    image_url: '/products/mid-clamp-raised.jpg',
    description: '中间夹35/40mm凸起式',
    specifications: `产品代码：QM-01717
尺寸：35/40mm
类型：凸起式
材料：铝A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '25',
    code: 'QM-01818',
    name: '接地夹（目录）',
    slug: 'grounding-clamp-catalog',
    category_id: 'grounding-accessories',
    price: null,
    unit: '套',
    stock: 2000,
    image_url: '/products/grounding-clamp-catalog.jpg',
    description: '按目录的接地夹',
    specifications: `产品代码：QM-01818
材料：铝A6005 + 304不锈钢
应用：安全接地`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '26',
    code: 'QM-01919',
    name: '方形瓦夹',
    slug: 'square-tile-clamp',
    category_id: 'solar-clamps',
    price: null,
    unit: '套',
    stock: 2000,
    image_url: '/products/square-tile-clamp.jpg',
    description: '方形瓦夹，用于波纹屋顶',
    specifications: `产品代码：QM-01919
材料：铝A6005
应用：方形波纹屋顶`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '27',
    code: 'QM-02020',
    name: '边缘夹 30mm',
    slug: 'end-clamp-30mm',
    category_id: 'solar-clamps',
    price: null,
    unit: '套',
    stock: 3000,
    image_url: '/products/end-clamp-30.jpg',
    description: '边缘夹30mm用于薄面板',
    specifications: `产品代码：QM-02020
尺寸：30mm
材料：铝A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '28',
    code: 'QM-02121',
    name: '边缘夹 35mm',
    slug: 'end-clamp-35mm',
    category_id: 'solar-clamps',
    price: null,
    unit: '套',
    stock: 3000,
    image_url: '/products/end-clamp-35.jpg',
    description: '边缘夹35mm，最常用',
    specifications: `产品代码：QM-02121
尺寸：35mm
材料：铝A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '29',
    code: 'QM-02222',
    name: '边缘夹 40mm',
    slug: 'end-clamp-40mm',
    category_id: 'solar-clamps',
    price: null,
    unit: '套',
    stock: 3000,
    image_url: '/products/end-clamp-40.jpg',
    description: '边缘夹40mm用于厚面板',
    specifications: `产品代码：QM-02222
尺寸：40mm
材料：铝A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '30',
    code: 'QM-03131',
    name: '自攻螺丝 5.5x75mm',
    slug: 'self-drilling-screw-5-5x75mm',
    category_id: 'grounding-accessories',
    price: null,
    unit: '个',
    stock: 10000,
    image_url: '/products/self-drilling-screw-55.jpg',
    description: '自攻螺丝5.5x75mm，304不锈钢',
    specifications: `产品代码：QM-03131
尺寸：5.5x75mm
材料：304不锈钢
应用：用于金属板、钢结构`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '31',
    code: 'QM-03131-63',
    name: '自攻螺丝 6.3x75mm',
    slug: 'self-drilling-screw-6-3x75mm',
    category_id: 'grounding-accessories',
    price: null,
    unit: '个',
    stock: 10000,
    image_url: '/products/self-drilling-screw-63.jpg',
    description: '自攻螺丝6.3x75mm，304不锈钢',
    specifications: `产品代码：QM-03131
尺寸：6.3x75mm
材料：304不锈钢
应用：用于金属板、钢结构`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '32',
    code: 'QM-03232',
    name: '六角螺栓 M8（20/25/40/50mm）',
    slug: 'hex-bolt-m8',
    category_id: 'grounding-accessories',
    price: null,
    unit: '个',
    stock: 20000,
    image_url: '/products/hex-bolt-m8.jpg',
    description: '六角螺栓M8 304不锈钢，多种长度',
    specifications: `产品代码：QM-03232
尺寸：M8x20、M8x25、M8x40、M8x50mm
材料：304不锈钢
类型：六角头`,
    created_at: '2025-01-01T00:00:00Z'
  }
]

// Helper functions
export function getProductsCn(categoryId?: string): Product[] {
  if (!categoryId || categoryId === 'all') {
    return productsCn.filter(p => !p.deleted_at)
  }
  return productsCn.filter(p => p.category_id === categoryId && !p.deleted_at)
}

export function getProductBySlugCn(slug: string): Product | null {
  const product = productsCn.filter(p => p.slug === slug && !p.deleted_at)[0]
  return product || null
}

export function getCategoriesCn(): Category[] {
  return categoriesCn
}

export function getCategoryByIdCn(id: string): Category | null {
  const category = categoriesCn.filter(c => c.id === id)[0]
  return category || null
}
