// Thông tin đối tác và dự án từ QUANG MINH PROFILE FILE

export const partnerStats = {
  totalCustomers: 1000,
  totalPartners: 100,
  yearsExperience: 16,
  projectsCompleted: 500
}

// Dự án tiêu biểu
export const featuredProjects = [
  {
    id: 1,
    name: 'Dự án điện mặt trời áp mái',
    type: 'Năng lượng mặt trời',
    client: 'Công ty TNHH Huệ Anh',
    description: 'Lắp đặt hệ thống điện mặt trời áp mái công suất lớn',
    year: 2023,
    image: '/projects/hue-anh.jpg',
    category: 'solar'
  },
  {
    id: 2,
    name: 'Dự án điện mặt trời áp mái',
    type: 'Năng lượng mặt trời',
    client: 'Công ty TNHH May mặc Hoàng Tùng',
    description: 'Hệ thống điện mặt trời cho nhà máy may mặc',
    year: 2023,
    image: '/projects/hoang-tung.jpg',
    category: 'solar'
  },
  {
    id: 3,
    name: 'Dự án điện mặt trời áp mái',
    type: 'Năng lượng mặt trời',
    client: 'Công ty Jinyi Jewelry',
    description: 'Lắp đặt hệ thống năng lượng mặt trời cho nhà máy sản xuất',
    year: 2023,
    image: '/projects/jinyi.jpg',
    category: 'solar'
  },
  {
    id: 4,
    name: 'Dự án điện mặt trời áp mái Showroom',
    type: 'Năng lượng mặt trời',
    client: 'Công ty MG Thanh Hóa',
    description: 'Hệ thống điện mặt trời cho showroom',
    year: 2023,
    image: '/projects/mg-thanh-hoa.jpg',
    category: 'solar'
  },
  {
    id: 5,
    name: 'Dự án điện mặt trời tại đầm tôm',
    type: 'Năng lượng mặt trời',
    client: 'Anh Vương',
    description: 'Hệ thống điện mặt trời cho nuôi trồng thủy sản',
    year: 2023,
    image: '/projects/dam-tom.jpg',
    category: 'solar'
  },
  {
    id: 6,
    name: 'Dự án điện mặt trời áp mái Vinhome',
    type: 'Năng lượng mặt trời',
    client: 'NQ1 - 09',
    description: 'Lắp đặt hệ thống điện mặt trời cho khu dân cư',
    year: 2023,
    image: '/projects/vinhome.jpg',
    category: 'solar'
  }
]

// Đối tác khách hàng (có thể thêm logo sau)
export const partners = [
  {
    id: 1,
    name: 'TISCO',
    logo: '/partner_brand/tisco-logo.png',
    category: 'Thép',
    description: 'Tập đoàn sản xuất thép hàng đầu Việt Nam'
  },
  {
    id: 2,
    name: 'Hòa Phát',
    logo: '/partner_brand/hoa-phat-logo.png',
    category: 'Thép',
    description: 'Tập đoàn Hòa Phát - Sản xuất thép và bất động sản'
  },
  {
    id: 3,
    name: 'Vinacomin',
    logo: '/partner_brand/vinacomin-logo.png',
    category: 'Khai khoáng',
    description: 'Tập đoàn Công nghiệp Than - Khoáng sản Việt Nam'
  },
  {
    id: 4,
    name: 'VAS',
    logo: '/partner_brand/vas-logo.png',
    category: 'Thép',
    description: 'Công ty sản xuất thép VAS'
  },
  {
    id: 5,
    name: 'TQIS',
    logo: '/partner_brand/tqis-logo.png',
    category: 'Kiểm định',
    description: 'Dịch vụ kiểm định chất lượng'
  },
  {
    id: 6,
    name: 'Lideco',
    logo: '/partner_brand/lideco-logo.png',
    category: 'Xây dựng',
    description: 'Công ty phát triển bất động sản'
  },
  {
    id: 7,
    name: 'Komatsu',
    logo: '/partner_brand/komatsu-logo.png',
    category: 'Máy móc',
    description: 'Thiết bị và máy móc công nghiệp'
  },
  {
    id: 8,
    name: 'SCG',
    logo: '/partner_brand/scg-logo.png',
    category: 'Vật liệu xây dựng',
    description: 'Tập đoàn vật liệu xây dựng SCG'
  },
  {
    id: 9,
    name: 'SEV',
    logo: '/partner_brand/sev-logo.png',
    category: 'Năng lượng',
    description: 'Năng lượng cho thành phố xanh'
  },
  {
    id: 10,
    name: 'Vatec Saigon',
    logo: '/partner_brand/vatec-saigon-logo.png',
    category: 'Công nghệ',
    description: 'Giải pháp công nghệ và năng lượng'
  },
  {
    id: 11,
    name: 'BDO',
    logo: '/partner_brand/bdo-logo.png',
    category: 'Tư vấn',
    description: 'Dịch vụ tư vấn và kiểm toán'
  },
  {
    id: 12,
    name: 'SP Group',
    logo: '/partner_brand/sp-group-logo.png',
    category: 'Năng lượng',
    description: 'Tập đoàn năng lượng SP Group'
  },
  {
    id: 13,
    name: 'TYP Steel',
    logo: '/partner_brand/typ-steel-logo.png',
    category: 'Thép',
    description: 'Công ty sản xuất thép TYP'
  },
  {
    id: 14,
    name: 'Nami Energy',
    logo: '/partner_brand/nami-energy.png',
    category: 'Năng lượng',
    description: 'Giải pháp năng lượng tái tạo'
  },
  {
    id: 15,
    name: 'Sơn Hà',
    logo: '/partner_brand/son-ha-logo.png',
    category: 'Xây dựng',
    description: 'Công ty xây dựng và phát triển'
  },
  {
    id: 16,
    name: 'POMA',
    logo: '/partner_brand/poma-logo.png',
    category: 'Sản xuất',
    description: 'Công ty sản xuất công nghiệp'
  }
]

// Lĩnh vực hợp tác
export const partnerCategories = [
  {
    name: 'Thép & Kim loại',
    count: 50,
    icon: '🏭',
    description: 'Các công ty sản xuất thép và kim loại'
  },
  {
    name: 'Năng lượng mặt trời',
    count: 45,
    icon: '☀️',
    description: 'Các dự án lắp đặt hệ thống điện mặt trời'
  },
  {
    name: 'Xây dựng',
    count: 30,
    icon: '🏗️',
    description: 'Vật liệu nhôm cho công trình xây dựng'
  },
  {
    name: 'Công nghiệp',
    count: 25,
    icon: '⚙️',
    description: 'Cung cấp nhôm và phụ kiện cho nhà máy'
  }
]

// Testimonials từ đối tác
export const partnerTestimonials = [
  {
    name: 'Đại diện Công ty Huệ Anh',
    position: 'Giám đốc Dự án',
    company: 'Công ty TNHH Huệ Anh',
    avatar: '👨‍💼',
    rating: 5,
    quote: 'Quang Minh cung cấp sản phẩm chất lượng cao, đúng tiến độ. Đội ngũ kỹ thuật chuyên nghiệp, hỗ trợ tận tình.',
    project: 'Dự án điện mặt trời áp mái'
  },
  {
    name: 'Đại diện Công ty Hoàng Tùng',
    position: 'Trưởng phòng Kỹ thuật',
    company: 'Công ty TNHH May mặc Hoàng Tùng',
    avatar: '👩‍💼',
    rating: 5,
    quote: 'Hệ thống điện mặt trời hoạt động ổn định, giúp tiết kiệm chi phí điện năng đáng kể cho nhà máy.',
    project: 'Hệ thống điện mặt trời 500kW'
  },
  {
    name: 'Đại diện Công ty Jinyi',
    position: 'Giám đốc Sản xuất',
    company: 'Công ty Jinyi Jewelry',
    avatar: '🧑‍💼',
    rating: 5,
    quote: 'Sản phẩm nhôm của Quang Minh đạt tiêu chuẩn xuất khẩu, đáp ứng tốt yêu cầu kỹ thuật của chúng tôi.',
    project: 'Cung cấp nhôm định hình'
  }
]
