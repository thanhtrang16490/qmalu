/**
 * Case Studies Data
 * 
 * Real project examples showcasing successful implementations
 */

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  capacity: string;
  image: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
    icon: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'bac-ninh-5mw',
    title: 'Dự án Điện Mặt Trời 5MW Bắc Ninh',
    client: 'Công ty Năng lượng Mặt trời Hà Nội',
    industry: 'Năng lượng tái tạo',
    location: 'Bắc Ninh',
    capacity: '5MW',
    image: '/images/projects/bac-ninh-5mw.jpg',
    challenge: 'Khách hàng cần lắp đặt hệ thống 5MW trong thời gian ngắn (2 tháng) với chi phí tối ưu. Địa hình phức tạp với nhiều loại mái khác nhau.',
    solution: 'Cung cấp giá đỡ nhôm A6005-T6 với thiết kế modular, dễ lắp đặt. Hỗ trợ kỹ thuật 24/7 và giao hàng đúng tiến độ theo từng giai đoạn thi công.',
    results: [
      { label: 'Tiết kiệm chi phí', value: '30%', icon: '💰' },
      { label: 'Rút ngắn thời gian', value: '33%', icon: '⚡' },
      { label: 'Chất lượng', value: '100%', icon: '✓' }
    ],
    testimonial: {
      quote: 'Giá đỡ nhôm A6005-T6 của Quang Minh giúp chúng tôi tiết kiệm 30% chi phí lắp đặt và rút ngắn thời gian thi công từ 3 tháng xuống 2 tháng. Sau 2 năm vận hành, hệ thống vẫn ổn định tuyệt đối.',
      author: 'Nguyễn Văn Thành',
      role: 'Giám đốc Dự án'
    }
  },
  {
    id: 'khu-do-thi-2mw',
    title: 'Hệ Thống Mái Nghiêng 2MW Khu Đô Thị',
    client: 'Công ty Xây dựng Mai',
    industry: 'Bất động sản',
    location: 'Hà Nội',
    capacity: '2MW',
    image: '/images/projects/khu-do-thi-2mw.jpg',
    challenge: 'Lắp đặt trên 150 mái nhà nghiêng với góc độ khác nhau. Yêu cầu thẩm mỹ cao và không làm hỏng kết cấu mái hiện có.',
    solution: 'Thiết kế hệ thống giá đỡ mái nghiêng linh hoạt với chân L điều chỉnh được. Sử dụng vít tôn chuyên dụng và đệm cao su EPDM chống thấm.',
    results: [
      { label: 'Hoàn thành sớm', value: '2 tuần', icon: '📅' },
      { label: 'Mái nhà', value: '150+', icon: '🏠' },
      { label: 'Hài lòng', value: '100%', icon: '⭐' }
    ],
    testimonial: {
      quote: 'Hệ thống giá đỡ mái nghiêng của Quang Minh rất dễ lắp đặt, tiết kiệm nhân công. Chất lượng nhôm A6005-T6 cao cấp, chịu được mưa bão tốt. Giao hàng đúng hẹn, hỗ trợ kỹ thuật nhiệt tình.',
      author: 'Trần Thị Mai',
      role: 'Chủ đầu tư'
    }
  },
  {
    id: 'hai-phong-10mw',
    title: 'Dự Án Mái Bằng 10MW Hải Phòng',
    client: 'Công ty Điện lực Hải Phòng',
    industry: 'Điện lực',
    location: 'Hải Phòng',
    capacity: '10MW',
    image: '/images/projects/hai-phong-10mw.jpg',
    challenge: 'Dự án quy mô lớn trên mái bằng nhà xưởng. Yêu cầu chịu tải cao do gần biển, chịu gió mạnh. Cần đảm bảo an toàn tuyệt đối.',
    solution: 'Cung cấp hệ thống giá đỡ mái bằng với ballast block, không cần khoan mái. Tính toán kỹ thuật chi tiết theo tiêu chuẩn AS/NZS 1170 để chịu gió cấp 12.',
    results: [
      { label: 'Lắp đặt nhanh', value: '2x', icon: '⚡' },
      { label: 'An toàn', value: '100%', icon: '🛡️' },
      { label: 'Chịu gió', value: 'Cấp 12', icon: '💨' }
    ],
    testimonial: {
      quote: 'Giá đỡ mái bằng của Quang Minh thiết kế thông minh, chịu tải tốt, lắp đặt nhanh gấp đôi so với hệ thống cũ. Đội ngũ kỹ thuật hỗ trợ tính toán chi tiết, đảm bảo an toàn tuyệt đối cho công trình.',
      author: 'Phạm Đức Long',
      role: 'Trưởng phòng Kỹ thuật'
    }
  }
];

// Export for multilingual support
export const caseStudiesEn: CaseStudy[] = [
  {
    id: 'bac-ninh-5mw',
    title: '5MW Solar Power Project in Bac Ninh',
    client: 'Hanoi Solar Energy Company',
    industry: 'Renewable Energy',
    location: 'Bac Ninh',
    capacity: '5MW',
    image: '/images/projects/bac-ninh-5mw.jpg',
    challenge: 'Client needed to install a 5MW system in a short time (2 months) with optimized costs. Complex terrain with various roof types.',
    solution: 'Provided A6005-T6 aluminum mounting structures with modular design for easy installation. 24/7 technical support and on-time delivery according to construction phases.',
    results: [
      { label: 'Cost Savings', value: '30%', icon: '💰' },
      { label: 'Time Reduction', value: '33%', icon: '⚡' },
      { label: 'Quality', value: '100%', icon: '✓' }
    ],
    testimonial: {
      quote: 'Quang Minh\'s A6005-T6 aluminum mounting helped us save 30% on installation costs and reduced construction time from 3 months to 2 months. After 2 years of operation, the system remains absolutely stable.',
      author: 'Nguyen Van Thanh',
      role: 'Project Director'
    }
  },
  {
    id: 'khu-do-thi-2mw',
    title: '2MW Tilted Roof System in Urban Area',
    client: 'Mai Construction Company',
    industry: 'Real Estate',
    location: 'Hanoi',
    capacity: '2MW',
    image: '/images/projects/khu-do-thi-2mw.jpg',
    challenge: 'Installation on 150 tilted roofs with different angles. High aesthetic requirements without damaging existing roof structure.',
    solution: 'Designed flexible tilted roof mounting system with adjustable L-feet. Used specialized roofing screws and EPDM rubber gaskets for waterproofing.',
    results: [
      { label: 'Early Completion', value: '2 weeks', icon: '📅' },
      { label: 'Roofs', value: '150+', icon: '🏠' },
      { label: 'Satisfaction', value: '100%', icon: '⭐' }
    ],
    testimonial: {
      quote: 'Quang Minh\'s tilted roof mounting system is very easy to install and saves labor. High-quality A6005-T6 aluminum withstands storms well. On-time delivery with enthusiastic technical support.',
      author: 'Tran Thi Mai',
      role: 'Project Owner'
    }
  },
  {
    id: 'hai-phong-10mw',
    title: '10MW Flat Roof Project in Hai Phong',
    client: 'Hai Phong Power Company',
    industry: 'Power',
    location: 'Hai Phong',
    capacity: '10MW',
    image: '/images/projects/hai-phong-10mw.jpg',
    challenge: 'Large-scale project on factory flat roofs. High load requirements due to coastal location with strong winds. Absolute safety required.',
    solution: 'Provided flat roof mounting system with ballast blocks, no roof drilling needed. Detailed technical calculations according to AS/NZS 1170 standards to withstand level 12 winds.',
    results: [
      { label: 'Fast Installation', value: '2x', icon: '⚡' },
      { label: 'Safety', value: '100%', icon: '🛡️' },
      { label: 'Wind Resistance', value: 'Level 12', icon: '💨' }
    ],
    testimonial: {
      quote: 'Quang Minh\'s flat roof mounting is intelligently designed, bears loads well, and installs twice as fast as old systems. Technical team provided detailed calculations ensuring absolute safety for the project.',
      author: 'Pham Duc Long',
      role: 'Technical Manager'
    }
  }
];

export const caseStudiesCn: CaseStudy[] = [
  {
    id: 'bac-ninh-5mw',
    title: '北宁5MW太阳能项目',
    client: '河内太阳能公司',
    industry: '可再生能源',
    location: '北宁',
    capacity: '5MW',
    image: '/images/projects/bac-ninh-5mw.jpg',
    challenge: '客户需要在短时间内（2个月）以优化成本安装5MW系统。地形复杂，屋顶类型多样。',
    solution: '提供A6005-T6铝合金支架，模块化设计，易于安装。24/7技术支持，按施工阶段准时交货。',
    results: [
      { label: '节省成本', value: '30%', icon: '💰' },
      { label: '缩短时间', value: '33%', icon: '⚡' },
      { label: '质量', value: '100%', icon: '✓' }
    ],
    testimonial: {
      quote: '光明的A6005-T6铝合金支架帮助我们节省了30%的安装成本，将施工时间从3个月缩短到2个月。运行2年后，系统仍然绝对稳定。',
      author: '阮文成',
      role: '项目总监'
    }
  },
  {
    id: 'khu-do-thi-2mw',
    title: '城市2MW斜屋顶系统',
    client: '梅建筑公司',
    industry: '房地产',
    location: '河内',
    capacity: '2MW',
    image: '/images/projects/khu-do-thi-2mw.jpg',
    challenge: '在150个不同角度的斜屋顶上安装。高美学要求，不损坏现有屋顶结构。',
    solution: '设计灵活的斜屋顶支架系统，配有可调L型支脚。使用专用屋顶螺钉和EPDM橡胶垫片防水。',
    results: [
      { label: '提前完成', value: '2周', icon: '📅' },
      { label: '屋顶', value: '150+', icon: '🏠' },
      { label: '满意度', value: '100%', icon: '⭐' }
    ],
    testimonial: {
      quote: '光明的斜屋顶支架系统非常容易安装，节省人工。高质量A6005-T6铝材抗风暴性能好。准时交货，技术支持热情。',
      author: '陈氏梅',
      role: '项目业主'
    }
  },
  {
    id: 'hai-phong-10mw',
    title: '海防10MW平屋顶项目',
    client: '海防电力公司',
    industry: '电力',
    location: '海防',
    capacity: '10MW',
    image: '/images/projects/hai-phong-10mw.jpg',
    challenge: '工厂平屋顶大型项目。由于靠近海岸，风力强，需要高承载要求。需要绝对安全。',
    solution: '提供带压载块的平屋顶支架系统，无需钻孔。根据AS/NZS 1170标准进行详细技术计算，抗12级风。',
    results: [
      { label: '快速安装', value: '2倍', icon: '⚡' },
      { label: '安全', value: '100%', icon: '🛡️' },
      { label: '抗风', value: '12级', icon: '💨' }
    ],
    testimonial: {
      quote: '光明的平屋顶支架设计巧妙，承载力好，安装速度是旧系统的两倍。技术团队提供详细计算，确保项目绝对安全。',
      author: '范德龙',
      role: '技术经理'
    }
  }
];
