// Static product data for Nhôm Quang Minh - Based on actual quotations
export interface Product {
  id: string
  code?: string
  name: string
  slug: string
  category_id?: string
  price: number | null  // null means "contact for price"
  unit: string
  stock?: number
  image_url?: string
  description?: string
  specifications?: string
  created_at: string
  updated_at?: string
  deleted_at?: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  display_order?: number
}

// Categories - Based on Quang Minh's actual products
export const categories: Category[] = [
  {
    id: 'solar-rails',
    name: 'Thanh Ray Nhôm Solar',
    slug: 'thanh-ray-nhom-solar',
    description: 'Thanh ray nhôm A6005-T6 cho hệ thống năng lượng mặt trời',
    icon: '☀️',
    display_order: 1
  },
  {
    id: 'solar-clamps',
    name: 'Kẹp & Phụ Kiện Solar',
    slug: 'kep-phu-kien-solar',
    description: 'Kẹp giữa, kẹp biên, kẹp seamlook và phụ kiện lắp đặt',
    icon: '🔧',
    display_order: 2
  },
  {
    id: 'mounting-brackets',
    name: 'Chân Đế & Giá Đỡ',
    slug: 'chan-de-gia-do',
    description: 'Chân L, giá đỡ và kết cấu lắp đặt tấm pin',
    icon: '🏗️',
    display_order: 3
  },
  {
    id: 'grounding-accessories',
    name: 'Phụ Kiện Tiếp Địa',
    slug: 'phu-kien-tiep-dia',
    description: 'Kẹp tiếp địa, lá tiếp địa và phụ kiện an toàn điện',
    icon: '⚡',
    display_order: 4
  }
]

// Products - Based on actual Quang Minh quotations
export const products: Product[] = [
  // Solar Rails
  {
    id: '1',
    code: 'QM-001',
    name: 'Thanh Ray Nhôm 26x45mm',
    slug: 'thanh-ray-nhom-26x45mm',
    category_id: 'solar-rails',
    price: 218500,
    unit: 'thanh',
    stock: 1000,
    image_url: '/products/rail-26x45.jpg',
    description: 'Thanh ray nhôm A6005-T6 dài 4.2m, anod 10-12µm, cứng vững và chịu tải tốt',
    specifications: `Mã sản phẩm: QM-001
Kích thước: 26x45mm
Chiều dài: 4.2m/thanh
Tỉ trọng: 0.52kg/m (±5%)
Vật liệu: A6005-T6
Bề mặt: Anod 10-12µm
Đặc điểm: Cứng vững, rãnh cân, chịu tải tốt
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    code: 'QM-001-52',
    name: 'Thanh Ray Nhôm 26x52mm',
    slug: 'thanh-ray-nhom-26x52mm',
    category_id: 'solar-rails',
    price: 61500,
    unit: 'mét',
    stock: 1000,
    image_url: '/products/rail-26x52.jpg',
    description: 'Thanh ray nhôm A6005-T6 dài 4.2m, tỉ trọng 0.65kg/m, chịu tải cao',
    specifications: `Mã sản phẩm: QM-001
Kích thước: 26x52mm
Chiều dài: 4.2m/thanh
Tỉ trọng: 0.65kg/m (±5%)
Vật liệu: A6005-T6
Bề mặt: Anod 10-12µm
Đặc điểm: Cứng vững, rãnh cân, chịu tải tốt
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '3',
    code: 'QM-001-50',
    name: 'Thanh Ray Nhôm 26x50mm',
    slug: 'thanh-ray-nhom-26x50mm',
    category_id: 'solar-rails',
    price: 60000,
    unit: 'mét',
    stock: 1000,
    image_url: '/products/rail-26x50.jpg',
    description: 'Thanh ray nhôm A6005-T5 dài 4.2m, phổ biến nhất cho dự án solar',
    specifications: `Kích thước: 26x50mm
Chiều dài: 4.2m/thanh
Vật liệu: A6005-T5
Bề mặt: Anod
Đặc điểm: Thông dụng, giá tốt
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Rail Connectors
  {
    id: '4',
    code: 'QM-008',
    name: 'Thanh Nối Rail 150mm',
    slug: 'thanh-noi-rail-150mm',
    category_id: 'solar-rails',
    price: 13000,
    unit: 'bộ',
    stock: 2000,
    image_url: '/products/rail-connector-150.jpg',
    description: 'Thanh nối rail A6005-T6, bao gồm 2 bulong M8x20 và đệm vênh inox 304',
    specifications: `Mã sản phẩm: QM-008
Kích thước: 150x21.5mm
Vật liệu: A6005-T6
Bề mặt: Anod 10-12µm
Bao gồm:
- 02 Bulong inox 304 M8x20
- 02 Long đen vênh inox 304 M8
Độ dày: 8mm, chịu lực tốt
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '5',
    code: 'QM-008-140',
    name: 'Thanh Nối Rail 140mm',
    slug: 'thanh-noi-rail-140mm',
    category_id: 'solar-rails',
    price: 10000,
    unit: 'bộ',
    stock: 2000,
    image_url: '/products/rail-connector-140.jpg',
    description: 'Thanh nối rail 140mm, bao gồm 2 bulong M8x20 và đệm vênh',
    specifications: `Kích thước: 140x21.5mm
Vật liệu: A6005-T6
Bao gồm:
- 02 Bulong M8x20
- 02 Đệm vênh
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Solar Clamps
  {
    id: '6',
    code: 'QM-016',
    name: 'Kẹp Giữa 40x50mm',
    slug: 'kep-giua-40x50mm',
    category_id: 'solar-clamps',
    price: 6200,
    unit: 'bộ',
    stock: 5000,
    image_url: '/products/mid-clamp.jpg',
    description: 'Kẹp giữa nhôm A6005-T6, dày 4mm, chịu lực tốt, bao gồm bulong và con chạy',
    specifications: `Mã sản phẩm: QM-016
Kích thước: 40x50x15mm
Vật liệu: A6005-T6
Bề mặt: Anod 10-12µm
Độ dày: 4mm, chịu lực tốt
Bao gồm:
- 01 Trượt nhôm M8
- 01 Bulong inox 304 M8x40
- 01 Long đen vênh inox 304 M8
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '7',
    code: 'QM-020',
    name: 'Kẹp Biên Z30/35/40',
    slug: 'kep-bien-z30-35-40',
    category_id: 'solar-clamps',
    price: 6200,
    unit: 'bộ',
    stock: 5000,
    image_url: '/products/end-clamp.jpg',
    description: 'Kẹp biên nhôm A6005-T6, dày 2.5-4mm, bao gồm bulong M8x25 và con chạy',
    specifications: `Mã sản phẩm: QM-020
Kích thước: 30/35/40x50mm
Vật liệu: A6005-T6
Bề mặt: Anod 10-12µm
Độ dày: 2.5-4mm, chịu lực tốt
Bao gồm:
- 01 Trượt nhôm M8
- 01 Bulong inox 304 M8x25
- 01 Long đen vênh inox 304 M8
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '8',
    code: 'QM-SEAMLOOK',
    name: 'Kẹp Seamlook/Kliplock 55mm',
    slug: 'kep-seamlook-kliplock-55mm',
    category_id: 'solar-clamps',
    price: 18000,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/seamlook-clamp.jpg',
    description: 'Kẹp seamlook theo sóng tôn, bao gồm 2 bulong M8x25, ecu và đệm cao su inox 304',
    specifications: `Chiều dài: 55mm
Vật liệu: A6005-T6
Bao gồm:
- 02 Bulong inox 304 M8x25 / Vít tôn M5.5x75
- 02 Long đen vênh inox 304 M8
- 02 Ecu inox 304 M8
- 01 Đệm cao su 40x40x2mm
Ứng dụng: Lắp trên mái tôn seamlook, kliplock
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Mounting Brackets
  {
    id: '9',
    code: 'QM-011',
    name: 'Chân L 85x50x6mm (Có vít tôn)',
    slug: 'chan-l-85x50x6mm-co-vit-ton',
    category_id: 'mounting-brackets',
    price: 15000,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/l-bracket-with-screw.jpg',
    description: 'Chân L nhôm A6005-T6, bao gồm bulong, con chạy, vít bắn tôn và đệm cao su',
    specifications: `Mã sản phẩm: QM-011
Kích thước: 85x50x6mm
Vật liệu: A6005-T6
Chiều dài: 50mm
Bao gồm:
- 01 Trượt nhôm M8
- 01 Bulong inox 304 M8x25
- 01 Long đen vênh inox 304 M8
- 01 Vít tôn 5.5x75mm
- 01 Đệm cao su 50x40x2mm
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '10',
    code: 'QM-011-NO-SCREW',
    name: 'Chân L 85x50x6mm (Không vít tôn)',
    slug: 'chan-l-85x50x6mm-khong-vit-ton',
    category_id: 'mounting-brackets',
    price: 13500,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/l-bracket-no-screw.jpg',
    description: 'Chân L nhôm A6005-T6, không bao gồm vít tôn và đệm cao su',
    specifications: `Mã sản phẩm: QM-011
Kích thước: 85x50x6mm
Vật liệu: A6005-T6
Chiều dài: 50mm
Bao gồm:
- 01 Trượt nhôm M8
- 01 Bulong inox 304 M8x25
- 01 Long đen vênh inox 304 M8
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '11',
    code: 'QM-L-85x40',
    name: 'Chân L 85x40x6mm',
    slug: 'chan-l-85x40x6mm',
    category_id: 'mounting-brackets',
    price: 14000,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/l-bracket-85x40.jpg',
    description: 'Chân L nhôm dày 6mm, bao gồm bulong M8x25, con chạy và vít bắn tôn',
    specifications: `Kích thước: 85x40x6mm
Vật liệu: A6005-T6
Bao gồm:
- Bulong M8x25
- Con chạy
- Vít bắn tôn
- Đệm
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Grounding Accessories
  {
    id: '12',
    code: 'QM-028',
    name: 'Kẹp Tiếp Địa Thanh Rail',
    slug: 'kep-tiep-dia-thanh-rail',
    category_id: 'grounding-accessories',
    price: 10000,
    unit: 'bộ',
    stock: 2000,
    image_url: '/products/grounding-clamp-rail.jpg',
    description: 'Kẹp tiếp địa cho thanh rail, bao gồm bulong và mảnh tiếp địa mini',
    specifications: `Mã sản phẩm: QM-028
Vật liệu: A6005-T6
Chiều dài: 40mm
Bao gồm:
- 01 Trượt nhôm M8
- 01 Bulong inox 304 M8x25
- 01 Long đen vênh inox 304 M8
- 01 Bulong inox 304 M8
- 01 Mảnh tiếp địa mini
Xuất xứ: QM Solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '13',
    code: 'QM-028-20',
    name: 'Kẹp Tiếp Địa 20mm',
    slug: 'kep-tiep-dia-20mm',
    category_id: 'grounding-accessories',
    price: 12000,
    unit: 'bộ',
    stock: 2000,
    image_url: '/products/grounding-clamp-20.jpg',
    description: 'Kẹp tiếp địa 20mm, bao gồm bulong inox 304, đệm vênh và bích tiếp địa',
    specifications: `Kích thước: 20mm
Bao gồm:
- 01 Bulong inox 304 M8x25
- 01 Bulong M6x16
- Đệm vênh
- Con trượt
- Bích tiếp địa
Vật liệu: Inox 304`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '14',
    code: 'QM-033',
    name: 'Lá Tiếp Địa',
    slug: 'la-tiep-dia',
    category_id: 'grounding-accessories',
    price: 1100,
    unit: 'cái',
    stock: 10000,
    image_url: '/products/grounding-plate.jpg',
    description: 'Lá tiếp địa inox 304, chất lượng cao, chống ăn mòn',
    specifications: `Mã sản phẩm: QM-033
Vật liệu: Inox 304
Đặc điểm: Chống ăn mòn, độ bền cao
Ứng dụng: Tiếp địa an toàn cho hệ thống solar`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '15',
    code: 'QM-034',
    name: 'Kẹp Dây DC',
    slug: 'kep-day-dc',
    category_id: 'grounding-accessories',
    price: 1250,
    unit: 'chiếc',
    stock: 10000,
    image_url: '/products/dc-cable-clamp.jpg',
    description: 'Kẹp dây DC inox 304, cố định dây điện an toàn',
    specifications: `Mã sản phẩm: QM-034
Vật liệu: Inox 304
Đặc điểm: Chống ăn mòn, cố định chắc chắn
Ứng dụng: Cố định dây DC trong hệ thống solar`,
    created_at: '2025-01-01T00:00:00Z'
  },

  // Additional Accessories & Hardware
  {
    id: '16',
    code: 'QM-00909',
    name: 'Pat Chữ Z 200x100x2mm',
    slug: 'pat-chu-z-200x100x2mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: 'cái',
    stock: 1000,
    image_url: '/products/z-bracket.jpg',
    description: 'Pat chữ Z nhôm, kích thước 200x100x2mm, dùng cho kết cấu đặc biệt',
    specifications: `Mã sản phẩm: QM-00909
Kích thước: 200x100x2mm
Vật liệu: Nhôm A6005
Ứng dụng: Kết cấu đặc biệt, giá đỡ`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '17',
    code: 'QM-01010',
    name: 'Chân Chữ L 40x80x6mm',
    slug: 'chan-chu-l-40x80x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: 'bộ',
    stock: 2000,
    image_url: '/products/l-bracket-40x80.jpg',
    description: 'Chân L nhôm 40x80x6mm, chịu lực tốt',
    specifications: `Mã sản phẩm: QM-01010
Kích thước: 40x80x6mm
Vật liệu: Nhôm A6005
Độ dày: 6mm`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '18',
    code: 'QM-01111',
    name: 'Bộ Chân Chữ L1 40x80x6mm',
    slug: 'bo-chan-chu-l1-40x80x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: 'bộ',
    stock: 2000,
    image_url: '/products/l-bracket-set-1.jpg',
    description: 'Bộ chân L1 hoàn chỉnh với phụ kiện',
    specifications: `Mã sản phẩm: QM-01111
Kích thước: 40x80x6mm
Bao gồm: Chân L + phụ kiện lắp đặt`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '19',
    code: 'QM-01212',
    name: 'Bộ Chân Chữ L2 40x125x6mm',
    slug: 'bo-chan-chu-l2-40x125x6mm',
    category_id: 'mounting-brackets',
    price: null,
    unit: 'bộ',
    stock: 1500,
    image_url: '/products/l-bracket-set-2.jpg',
    description: 'Bộ chân L2 kích thước lớn 40x125x6mm',
    specifications: `Mã sản phẩm: QM-01212
Kích thước: 40x125x6mm
Bao gồm: Chân L + phụ kiện lắp đặt`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '20',
    code: 'QM-01313',
    name: 'Con Trượt Cân 21mm',
    slug: 'con-truot-can-21mm',
    category_id: 'solar-clamps',
    price: null,
    unit: 'cái',
    stock: 5000,
    image_url: '/products/sliding-nut-21.jpg',
    description: 'Con trượt cân 21mm, phụ kiện lắp đặt',
    specifications: `Mã sản phẩm: QM-01313
Kích thước: 21mm
Vật liệu: Nhôm
Ứng dụng: Lắp với thanh ray`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '21',
    code: 'QM-01414',
    name: 'Con Trượt + Bulong Inox 304',
    slug: 'con-truot-bulong-inox-304',
    category_id: 'solar-clamps',
    price: null,
    unit: 'bộ',
    stock: 5000,
    image_url: '/products/sliding-nut-bolt.jpg',
    description: 'Bộ con trượt kèm bulong inox 304',
    specifications: `Mã sản phẩm: QM-01414
Bao gồm: Con trượt + Bulong inox 304
Vật liệu: Inox 304`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '22',
    code: 'QM-01515',
    name: 'Kẹp U 30x60mm Mạ Kẽm',
    slug: 'kep-u-30x60mm-ma-kem',
    category_id: 'solar-clamps',
    price: null,
    unit: 'cái',
    stock: 3000,
    image_url: '/products/u-clamp-galvanized.jpg',
    description: 'Kẹp U mạ kẽm 30x60mm, chống gỉ',
    specifications: `Mã sản phẩm: QM-01515
Kích thước: 30x60mm
Vật liệu: Thép mạ kẽm
Đặc điểm: Chống gỉ, bền bỉ`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '23',
    code: 'QM-01616',
    name: 'Kẹp Giữa 35/40 Chìm',
    slug: 'kep-giua-35-40-chim',
    category_id: 'solar-clamps',
    price: null,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/mid-clamp-flush.jpg',
    description: 'Kẹp giữa 35/40mm kiểu chìm, thẩm mỹ cao',
    specifications: `Mã sản phẩm: QM-01616
Kích thước: 35/40mm
Kiểu: Chìm (flush mount)
Vật liệu: Nhôm A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '24',
    code: 'QM-01717',
    name: 'Kẹp Giữa 35/40 Nổi',
    slug: 'kep-giua-35-40-noi',
    category_id: 'solar-clamps',
    price: null,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/mid-clamp-raised.jpg',
    description: 'Kẹp giữa 35/40mm kiểu nổi',
    specifications: `Mã sản phẩm: QM-01717
Kích thước: 35/40mm
Kiểu: Nổi (raised mount)
Vật liệu: Nhôm A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '25',
    code: 'QM-01818',
    name: 'Kẹp Tiếp Địa (Catalog)',
    slug: 'kep-tiep-dia-catalog',
    category_id: 'grounding-accessories',
    price: null,
    unit: 'bộ',
    stock: 2000,
    image_url: '/products/grounding-clamp-catalog.jpg',
    description: 'Kẹp tiếp địa theo catalog',
    specifications: `Mã sản phẩm: QM-01818
Vật liệu: Nhôm A6005 + Inox 304
Ứng dụng: Tiếp địa an toàn`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '26',
    code: 'QM-01919',
    name: 'Kẹp Sóng Tôn Vuông',
    slug: 'kep-song-ton-vuong',
    category_id: 'solar-clamps',
    price: null,
    unit: 'bộ',
    stock: 2000,
    image_url: '/products/square-tile-clamp.jpg',
    description: 'Kẹp sóng tôn vuông, lắp trên mái tôn',
    specifications: `Mã sản phẩm: QM-01919
Vật liệu: Nhôm A6005
Ứng dụng: Mái tôn sóng vuông`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '27',
    code: 'QM-02020',
    name: 'Kẹp Biên 30mm',
    slug: 'kep-bien-30mm',
    category_id: 'solar-clamps',
    price: null,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/end-clamp-30.jpg',
    description: 'Kẹp biên 30mm cho tấm pin mỏng',
    specifications: `Mã sản phẩm: QM-02020
Kích thước: 30mm
Vật liệu: Nhôm A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '28',
    code: 'QM-02121',
    name: 'Kẹp Biên 35mm',
    slug: 'kep-bien-35mm',
    category_id: 'solar-clamps',
    price: null,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/end-clamp-35.jpg',
    description: 'Kẹp biên 35mm, phổ biến nhất',
    specifications: `Mã sản phẩm: QM-02121
Kích thước: 35mm
Vật liệu: Nhôm A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '29',
    code: 'QM-02222',
    name: 'Kẹp Biên 40mm',
    slug: 'kep-bien-40mm',
    category_id: 'solar-clamps',
    price: null,
    unit: 'bộ',
    stock: 3000,
    image_url: '/products/end-clamp-40.jpg',
    description: 'Kẹp biên 40mm cho tấm pin dày',
    specifications: `Mã sản phẩm: QM-02222
Kích thước: 40mm
Vật liệu: Nhôm A6005-T6`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '30',
    code: 'QM-03131',
    name: 'Vít Bắn Tôn 5.5x75mm',
    slug: 'vit-ban-ton-5-5x75mm',
    category_id: 'grounding-accessories',
    price: null,
    unit: 'cái',
    stock: 10000,
    image_url: '/products/self-drilling-screw-55.jpg',
    description: 'Vít bắn tôn 5.5x75mm, inox 304',
    specifications: `Mã sản phẩm: QM-03131
Kích thước: 5.5x75mm
Vật liệu: Inox 304
Ứng dụng: Bắn vào tôn, kết cấu thép`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '31',
    code: 'QM-03131-63',
    name: 'Vít Bắn Tôn 6.3x75mm',
    slug: 'vit-ban-ton-6-3x75mm',
    category_id: 'grounding-accessories',
    price: null,
    unit: 'cái',
    stock: 10000,
    image_url: '/products/self-drilling-screw-63.jpg',
    description: 'Vít bắn tôn 6.3x75mm, inox 304',
    specifications: `Mã sản phẩm: QM-03131
Kích thước: 6.3x75mm
Vật liệu: Inox 304
Ứng dụng: Bắn vào tôn, kết cấu thép`,
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: '32',
    code: 'QM-03232',
    name: 'Bulong Lục Giác M8 (20/25/40/50mm)',
    slug: 'bulong-luc-giac-m8',
    category_id: 'grounding-accessories',
    price: null,
    unit: 'cái',
    stock: 20000,
    image_url: '/products/hex-bolt-m8.jpg',
    description: 'Bulong lục giác M8 inox 304, nhiều chiều dài',
    specifications: `Mã sản phẩm: QM-03232
Kích thước: M8x20, M8x25, M8x40, M8x50mm
Vật liệu: Inox 304
Loại: Lục giác`,
    created_at: '2025-01-01T00:00:00Z'
  }
]

// Helper functions
export function getProducts(categoryId?: string): Product[] {
  if (!categoryId || categoryId === 'all') {
    return products.filter(p => !p.deleted_at)
  }
  return products.filter(p => p.category_id === categoryId && !p.deleted_at)
}

export function getProductBySlug(slug: string): Product | null {
  const product = products.filter(p => p.slug === slug && !p.deleted_at)[0]
  return product || null
}

export function getCategories(): Category[] {
  return categories
}

export function getCategoryById(id: string): Category | null {
  const category = categories.filter(c => c.id === id)[0]
  return category || null
}
