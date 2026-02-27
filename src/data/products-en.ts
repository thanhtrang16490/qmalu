// English product data for Quang Minh - Based on actual quotations
import type { Product, Category } from './products'

// Categories - English
export const categoriesEn: Category[] = [
  {
    id: 'solar-rails',
    name: 'Solar Aluminum Rails',
    slug: 'solar-aluminum-rails',
    description: 'A6005-T6 aluminum rails for solar energy systems',
    icon: '☀️',
    display_order: 1
  },
  {
    id: 'solar-clamps',
    name: 'Clamps & Solar Accessories',
    slug: 'clamps-solar-accessories',
    description: 'Mid clamps, end clamps, seamlook clamps and installation accessories',
    icon: '🔧',
    display_order: 2
  },
  {
    id: 'mounting-brackets',
    name: 'Mounting Brackets & Supports',
    slug: 'mounting-brackets-supports',
    description: 'L-brackets, supports and panel mounting structures',
    icon: '🏗️',
    display_order: 3
  },
  {
    id: 'grounding-accessories',
    name: 'Grounding Accessories',
    slug: 'grounding-accessories',
    description: 'Grounding clamps, grounding plates and electrical safety accessories',
    icon: '⚡',
    display_order: 4
  }
]

// Products - English translations
export const productsEn: Product[] = [
  // Solar Rails
  {
    id: '1',
    code: 'QM-001',
    name: 'Aluminum Rail 26x45mm',
    slug: 'aluminum-rail-26x45mm',
    category_id: 'solar-rails',
    price: 218500,
    unit: 'piece',
    stock: 1000,
    image_url: '/products/rail-26x45.jpg',
    description: 'A6005-T6 aluminum rail 4.2m long, anodized 10-12µm, sturdy and load-bearing',
    specifications: `Product Code: QM-001
Size: 26x45mm
Length: 4.2m/piece
Weight: 0.52kg/m (±5%)
Material: A6005-T6
Surface: Anodized 10-12µm
Features: Sturdy, balanced groove, good load capacity
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    code: 'QM-001-52',
    name: 'Aluminum Rail 26x52mm',
    slug: 'aluminum-rail-26x52mm',
    category_id: 'solar-rails',
    price: 61500,
    unit: 'meter',
    stock: 1000,
    image_url: '/products/rail-26x52.jpg',
    description: 'A6005-T6 aluminum rail 4.2m long, weight 0.65kg/m, high load capacity',
    specifications: `Product Code: QM-001
Size: 26x52mm
Length: 4.2m/piece
Weight: 0.65kg/m (±5%)
Material: A6005-T6
Surface: Anodized 10-12µm
Features: Sturdy, balanced groove, good load capacity
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '3',
    code: 'QM-001-50',
    name: 'Aluminum Rail 26x50mm',
    slug: 'aluminum-rail-26x50mm',
    category_id: 'solar-rails',
    price: 60000,
    unit: 'meter',
    stock: 1000,
    image_url: '/products/rail-26x50.jpg',
    description: 'A6005-T5 aluminum rail 4.2m long, most popular for solar projects',
    specifications: `Size: 26x50mm
Length: 4.2m/piece
Material: A6005-T5
Surface: Anodized
Features: Common, good price
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Rail Connectors
  {
    id: '4',
    code: 'QM-008',
    name: 'Rail Connector 150mm',
    slug: 'rail-connector-150mm',
    category_id: 'solar-rails',
    price: 13000,
    unit: 'set',
    stock: 2000,
    image_url: '/products/rail-connector-150.jpg',
    description: 'A6005-T6 rail connector, includes 2 M8x20 bolts and stainless steel 304 washers',
    specifications: `Product Code: QM-008
Size: 150x21.5mm
Material: A6005-T6
Surface: Anodized 10-12µm
Includes:
- 02 Stainless steel 304 bolts M8x20
- 02 Stainless steel 304 spring washers M8
Thickness: 8mm, high strength
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '5',
    code: 'QM-008-140',
    name: 'Rail Connector 140mm',
    slug: 'rail-connector-140mm',
    category_id: 'solar-rails',
    price: 10000,
    unit: 'set',
    stock: 2000,
    image_url: '/products/rail-connector-140.jpg',
    description: 'Rail connector 140mm, includes 2 M8x20 bolts and spring washers',
    specifications: `Size: 140x21.5mm
Material: A6005-T6
Includes:
- 02 Bolts M8x20
- 02 Spring washers
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Solar Clamps
  {
    id: '6',
    code: 'QM-016',
    name: 'Mid Clamp 40x50mm',
    slug: 'mid-clamp-40x50mm',
    category_id: 'solar-clamps',
    price: 6200,
    unit: 'set',
    stock: 5000,
    image_url: '/products/mid-clamp.jpg',
    description: 'A6005-T6 aluminum mid clamp, 4mm thick, high strength, includes bolt and T-nut',
    specifications: `Product Code: QM-016
Size: 40x50x15mm
Material: A6005-T6
Surface: Anodized 10-12µm
Thickness: 4mm, high strength
Includes:
- 01 Aluminum T-nut M8
- 01 Stainless steel 304 bolt M8x40
- 01 Stainless steel 304 spring washer M8
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '7',
    code: 'QM-020',
    name: 'End Clamp Z30/35/40',
    slug: 'end-clamp-z30-35-40',
    category_id: 'solar-clamps',
    price: 6200,
    unit: 'set',
    stock: 5000,
    image_url: '/products/end-clamp.jpg',
    description: 'A6005-T6 aluminum end clamp, 2.5-4mm thick, includes M8x25 bolt and T-nut',
    specifications: `Product Code: QM-020
Size: 30/35/40x50mm
Material: A6005-T6
Surface: Anodized 10-12µm
Thickness: 2.5-4mm, high strength
Includes:
- 01 Aluminum T-nut M8
- 01 Stainless steel 304 bolt M8x25
- 01 Stainless steel 304 spring washer M8
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '8',
    code: 'QM-SEAMLOOK',
    name: 'Seamlook/Kliplock Clamp 55mm',
    slug: 'seamlook-kliplock-clamp-55mm',
    category_id: 'solar-clamps',
    price: 18000,
    unit: 'set',
    stock: 3000,
    image_url: '/products/seamlook-clamp.jpg',
    description: 'Seamlook clamp for corrugated roof, includes 2 M8x25 bolts, nuts and rubber pad',
    specifications: `Length: 55mm
Material: A6005-T6
Includes:
- 02 Stainless steel 304 bolts M8x25 / Self-drilling screws M5.5x75
- 02 Stainless steel 304 spring washers M8
- 02 Stainless steel 304 nuts M8
- 01 Rubber pad 40x40x2mm
Application: For seamlook, kliplock roofs
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Mounting Brackets
  {
    id: '9',
    code: 'QM-011',
    name: 'L-Bracket 85x50x6mm (With Screw)',
    slug: 'l-bracket-85x50x6mm-with-screw',
    category_id: 'mounting-brackets',
    price: 15000,
    unit: 'set',
    stock: 3000,
    image_url: '/products/l-bracket-with-screw.jpg',
    description: 'A6005-T6 aluminum L-bracket, includes bolt, T-nut, self-drilling screw and rubber pad',
    specifications: `Product Code: QM-011
Size: 85x50x6mm
Material: A6005-T6
Length: 50mm
Includes:
- 01 Aluminum T-nut M8
- 01 Stainless steel 304 bolt M8x25
- 01 Stainless steel 304 spring washer M8
- 01 Self-drilling screw 5.5x75mm
- 01 Rubber pad 50x40x2mm
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '10',
    code: 'QM-011-NO-SCREW',
    name: 'L-Bracket 85x50x6mm (No Screw)',
    slug: 'l-bracket-85x50x6mm-no-screw',
    category_id: 'mounting-brackets',
    price: 13500,
    unit: 'set',
    stock: 3000,
    image_url: '/products/l-bracket-no-screw.jpg',
    description: 'A6005-T6 aluminum L-bracket, does not include self-drilling screw and rubber pad',
    specifications: `Product Code: QM-011
Size: 85x50x6mm
Material: A6005-T6
Length: 50mm
Includes:
- 01 Aluminum T-nut M8
- 01 Stainless steel 304 bolt M8x25
- 01 Stainless steel 304 spring washer M8
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '11',
    code: 'QM-L-85x40',
    name: 'L-Bracket 85x40x6mm',
    slug: 'l-bracket-85x40x6mm',
    category_id: 'mounting-brackets',
    price: 14000,
    unit: 'set',
    stock: 3000,
    image_url: '/products/l-bracket-85x40.jpg',
    description: 'Aluminum L-bracket 6mm thick, includes M8x25 bolt, T-nut and self-drilling screw',
    specifications: `Size: 85x40x6mm
Material: A6005-T6
Includes:
- Bolt M8x25
- T-nut
- Self-drilling screw
- Pad
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Grounding Accessories
  {
    id: '12',
    code: 'QM-028',
    name: 'Rail Grounding Clamp',
    slug: 'rail-grounding-clamp',
    category_id: 'grounding-accessories',
    price: 10000,
    unit: 'set',
    stock: 2000,
    image_url: '/products/grounding-clamp-rail.jpg',
    description: 'Grounding clamp for rail, includes bolt and mini grounding plate',
    specifications: `Product Code: QM-028
Material: A6005-T6
Length: 40mm
Includes:
- 01 Aluminum T-nut M8
- 01 Stainless steel 304 bolt M8x25
- 01 Stainless steel 304 spring washer M8
- 01 Stainless steel 304 bolt M8
- 01 Mini grounding plate
Origin: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '13',
    code: 'QM-028-20',
    name: 'Grounding Clamp 20mm',
    slug: 'grounding-clamp-20mm',
    category_id: 'grounding-accessories',
    price: 12000,
    unit: 'set',
    stock: 2000,
    image_url: '/products/grounding-clamp-20.jpg',
    description: 'Grounding clamp 20mm, includes stainless steel 304 bolt, spring washer and grounding flange',
    specifications: `Size: 20mm
Includes:
- 01 Stainless steel 304 bolt M8x25
- 01 Bolt M6x16
- Spring washer
- T-nut
- Grounding flange
Material: Stainless steel 304`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '14',
    code: 'QM-033',
    name: 'Grounding Plate',
    slug: 'grounding-plate',
    category_id: 'grounding-accessories',
    price: 1100,
    unit: 'piece',
    stock: 10000,
    image_url: '/products/grounding-plate.jpg',
    description: 'Stainless steel 304 grounding plate, high quality, corrosion resistant',
    specifications: `Product Code: QM-033
Material: Stainless steel 304
Features: Corrosion resistant, high durability
Application: Safe grounding for solar systems`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '15',
    code: 'QM-034',
    name: 'DC Cable Clamp',
    slug: 'dc-cable-clamp',
    category_id: 'grounding-accessories',
    price: 1250,
    unit: 'piece',
    stock: 10000,
    image_url: '/products/dc-cable-clamp.jpg',
    description: 'Stainless steel 304 DC cable clamp, secure cable fixing',
    specifications: `Product Code: QM-034
Material: Stainless steel 304
Features: Corrosion resistant, secure fixing
Application: DC cable fixing in solar systems`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Additional products with null prices
  {
    id: '16',
    code: 'QM-00909',
    name: 'Z-Bracket 200x100x2mm',
    slug: 'z-bracket-200x100x2mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: 'piece',
    stock: 1000,
    image_url: '/products/z-bracket.jpg',
    description: 'Aluminum Z-bracket, size 200x100x2mm, for special structures',
    specifications: `Product Code: QM-00909
Size: 200x100x2mm
Material: Aluminum A6005
Application: Special structures, supports`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '17',
    code: 'QM-01010',
    name: 'L-Bracket 40x80x6mm',
    slug: 'l-bracket-40x80x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: 'set',
    stock: 2000,
    image_url: '/products/l-bracket-40x80.jpg',
    description: 'Aluminum L-bracket 40x80x6mm, high load capacity',
    specifications: `Product Code: QM-01010
Size: 40x80x6mm
Material: Aluminum A6005
Thickness: 6mm`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '18',
    code: 'QM-01111',
    name: 'L-Bracket Set L1 40x80x6mm',
    slug: 'l-bracket-set-l1-40x80x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: 'set',
    stock: 2000,
    image_url: '/products/l-bracket-set-1.jpg',
    description: 'Complete L1 bracket set with accessories',
    specifications: `Product Code: QM-01111
Size: 40x80x6mm
Includes: L-bracket + installation accessories`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '19',
    code: 'QM-01212',
    name: 'L-Bracket Set L2 40x125x6mm',
    slug: 'l-bracket-set-l2-40x125x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: 'set',
    stock: 1500,
    image_url: '/products/l-bracket-set-2.jpg',
    description: 'Large L2 bracket set 40x125x6mm',
    specifications: `Product Code: QM-01212
Size: 40x125x6mm
Includes: L-bracket + installation accessories`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '20',
    code: 'QM-01313',
    name: 'Balanced T-Nut 21mm',
    slug: 'balanced-t-nut-21mm',
    category_id: 'solar-clamps',
    price: null,
    unit: 'piece',
    stock: 5000,
    image_url: '/products/sliding-nut-21.jpg',
    description: 'Balanced T-nut 21mm, installation accessory',
    specifications: `Product Code: QM-01313
Size: 21mm
Material: Aluminum
Application: For rail mounting`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '21',
    code: 'QM-01414',
    name: 'T-Nut + Stainless Steel 304 Bolt',
    slug: 't-nut-stainless-steel-304-bolt',
    category_id: 'solar-clamps',
    price: null,
    unit: 'set',
    stock: 5000,
    image_url: '/products/sliding-nut-bolt.jpg',
    description: 'T-nut set with stainless steel 304 bolt',
    specifications: `Product Code: QM-01414
Includes: T-nut + Stainless steel 304 bolt
Material: Stainless steel 304`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '22',
    code: 'QM-01515',
    name: 'U-Clamp 30x60mm Galvanized',
    slug: 'u-clamp-30x60mm-galvanized',
    category_id: 'solar-clamps',
    price: null,
    unit: 'piece',
    stock: 3000,
    image_url: '/products/u-clamp-galvanized.jpg',
    description: 'Galvanized U-clamp 30x60mm, rust resistant',
    specifications: `Product Code: QM-01515
Size: 30x60mm
Material: Galvanized steel
Features: Rust resistant, durable`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '23',
    code: 'QM-01616',
    name: 'Mid Clamp 35/40 Flush Mount',
    slug: 'mid-clamp-35-40-flush-mount',
    category_id: 'solar-clamps',
    price: null,
    unit: 'set',
    stock: 3000,
    image_url: '/products/mid-clamp-flush.jpg',
    description: 'Mid clamp 35/40mm flush mount style, high aesthetics',
    specifications: `Product Code: QM-01616
Size: 35/40mm
Type: Flush mount
Material: Aluminum A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '24',
    code: 'QM-01717',
    name: 'Mid Clamp 35/40 Raised Mount',
    slug: 'mid-clamp-35-40-raised-mount',
    category_id: 'solar-clamps',
    price: null,
    unit: 'set',
    stock: 3000,
    image_url: '/products/mid-clamp-raised.jpg',
    description: 'Mid clamp 35/40mm raised mount style',
    specifications: `Product Code: QM-01717
Size: 35/40mm
Type: Raised mount
Material: Aluminum A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '25',
    code: 'QM-01818',
    name: 'Grounding Clamp (Catalog)',
    slug: 'grounding-clamp-catalog',
    category_id: 'grounding-accessories',
    price: null,
    unit: 'set',
    stock: 2000,
    image_url: '/products/grounding-clamp-catalog.jpg',
    description: 'Grounding clamp per catalog',
    specifications: `Product Code: QM-01818
Material: Aluminum A6005 + Stainless steel 304
Application: Safe grounding`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '26',
    code: 'QM-01919',
    name: 'Square Tile Clamp',
    slug: 'square-tile-clamp',
    category_id: 'solar-clamps',
    price: null,
    unit: 'set',
    stock: 2000,
    image_url: '/products/square-tile-clamp.jpg',
    description: 'Square tile clamp, for corrugated roofs',
    specifications: `Product Code: QM-01919
Material: Aluminum A6005
Application: Square corrugated roofs`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '27',
    code: 'QM-02020',
    name: 'End Clamp 30mm',
    slug: 'end-clamp-30mm',
    category_id: 'solar-clamps',
    price: null,
    unit: 'set',
    stock: 3000,
    image_url: '/products/end-clamp-30.jpg',
    description: 'End clamp 30mm for thin panels',
    specifications: `Product Code: QM-02020
Size: 30mm
Material: Aluminum A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '28',
    code: 'QM-02121',
    name: 'End Clamp 35mm',
    slug: 'end-clamp-35mm',
    category_id: 'solar-clamps',
    price: null,
    unit: 'set',
    stock: 3000,
    image_url: '/products/end-clamp-35.jpg',
    description: 'End clamp 35mm, most popular',
    specifications: `Product Code: QM-02121
Size: 35mm
Material: Aluminum A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '29',
    code: 'QM-02222',
    name: 'End Clamp 40mm',
    slug: 'end-clamp-40mm',
    category_id: 'solar-clamps',
    price: null,
    unit: 'set',
    stock: 3000,
    image_url: '/products/end-clamp-40.jpg',
    description: 'End clamp 40mm for thick panels',
    specifications: `Product Code: QM-02222
Size: 40mm
Material: Aluminum A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '30',
    code: 'QM-03131',
    name: 'Self-Drilling Screw 5.5x75mm',
    slug: 'self-drilling-screw-5-5x75mm',
    category_id: 'grounding-accessories',
    price: null,
    unit: 'piece',
    stock: 10000,
    image_url: '/products/self-drilling-screw-55.jpg',
    description: 'Self-drilling screw 5.5x75mm, stainless steel 304',
    specifications: `Product Code: QM-03131
Size: 5.5x75mm
Material: Stainless steel 304
Application: For metal sheets, steel structures`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '31',
    code: 'QM-03131-63',
    name: 'Self-Drilling Screw 6.3x75mm',
    slug: 'self-drilling-screw-6-3x75mm',
    category_id: 'grounding-accessories',
    price: null,
    unit: 'piece',
    stock: 10000,
    image_url: '/products/self-drilling-screw-63.jpg',
    description: 'Self-drilling screw 6.3x75mm, stainless steel 304',
    specifications: `Product Code: QM-03131
Size: 6.3x75mm
Material: Stainless steel 304
Application: For metal sheets, steel structures`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '32',
    code: 'QM-03232',
    name: 'Hex Bolt M8 (20/25/40/50mm)',
    slug: 'hex-bolt-m8',
    category_id: 'grounding-accessories',
    price: null,
    unit: 'piece',
    stock: 20000,
    image_url: '/products/hex-bolt-m8.jpg',
    description: 'Hex bolt M8 stainless steel 304, various lengths',
    specifications: `Product Code: QM-03232
Size: M8x20, M8x25, M8x40, M8x50mm
Material: Stainless steel 304
Type: Hex head`,
    created_at: '2025-01-01T00:00:00Z'
  }
]

// Helper functions
export function getProductsEn(categoryId?: string): Product[] {
  if (!categoryId || categoryId === 'all') {
    return productsEn.filter(p => !p.deleted_at)
  }
  return productsEn.filter(p => p.category_id === categoryId && !p.deleted_at)
}

export function getProductBySlugEn(slug: string): Product | null {
  const product = productsEn.filter(p => p.slug === slug && !p.deleted_at)[0]
  return product || null
}

export function getCategoriesEn(): Category[] {
  return categoriesEn
}

export function getCategoryByIdEn(id: string): Category | null {
  const category = categoriesEn.filter(c => c.id === id)[0]
  return category || null
}
