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
    id: 'hue-anh-rooftop',
    title: 'Dự Án Điện Mặt Trời Áp Mái - Công ty TNHH Huế Anh',
    client: 'Công ty TNHH Huế Anh',
    industry: 'Sản xuất - Công nghiệp',
    location: 'Huế',
    capacity: '1.5MWp',
    image: '/images/projects/hue-anh-rooftop.jpg',
    challenge: 'Lắp đặt hệ thống điện mặt trời trên mái nhà xưởng sản xuất với diện tích lớn. Yêu cầu đảm bảo chịu tải tốt, không ảnh hưởng đến hoạt động sản xuất, và thi công nhanh để sớm đưa vào vận hành.',
    solution: 'Cung cấp hệ thống giá đỡ mái bằng chuyên dụng với thanh ray nhôm A6005-T6, kẹp giữa/biên chất lượng cao. Thiết kế tối ưu giúp lắp đặt nhanh chóng, đảm bảo an toàn kết cấu. Hỗ trợ kỹ thuật 24/7 trong suốt quá trình thi công.',
    results: [
      { label: 'Công suất', value: '1.5MWp', icon: '⚡' },
      { label: 'Tiết kiệm điện', value: '40%', icon: '💰' },
      { label: 'Hoàn thành đúng hạn', value: '100%', icon: '✓' }
    ],
    testimonial: {
      quote: 'Hệ thống giá đỡ của Quang Minh chất lượng tốt, lắp đặt nhanh chóng và chuyên nghiệp. Sau khi đưa vào vận hành, nhà máy tiết kiệm được 40% chi phí điện hàng tháng.',
      author: 'Đại diện Công ty',
      role: 'Giám đốc - Công ty TNHH Huế Anh'
    }
  },
  {
    id: 'hoang-tung-rooftop',
    title: 'Dự Án Điện Mặt Trời Áp Mái - Công ty TNHH May Mặc Hoàng Tùng',
    client: 'Công ty TNHH May Mặc Hoàng Tùng',
    industry: 'May mặc - Dệt may',
    location: 'Bắc Ninh',
    capacity: '2MWp',
    image: '/images/projects/hoang-tung-rooftop.jpg',
    challenge: 'Dự án lắp đặt trên mái nhà xưởng may mặc với diện tích rộng. Yêu cầu hệ thống chịu tải tốt, chống ăn mòn cao do môi trường sản xuất, và đảm bảo thẩm mỹ.',
    solution: 'Cung cấp trọn bộ hệ giá đỡ nhôm A6005-T6 với lớp anodized chống ăn mòn. Thiết kế hệ thống ballast không cần khoan mái, đảm bảo không thấm nước. Giao hàng đúng tiến độ và hỗ trợ kỹ thuật tận tình.',
    results: [
      { label: 'Công suất', value: '2MWp', icon: '⚡' },
      { label: 'Giảm chi phí', value: '35%', icon: '💰' },
      { label: 'Không thấm nước', value: '100%', icon: '🛡️' }
    ],
    testimonial: {
      quote: 'Quang Minh cung cấp giải pháp tối ưu cho nhà xưởng của chúng tôi. Hệ thống lắp đặt nhanh, không ảnh hưởng đến sản xuất, và giúp tiết kiệm đáng kể chi phí điện.',
      author: 'Đại diện Công ty',
      role: 'Giám đốc - Công ty TNHH May Mặc Hoàng Tùng'
    }
  },
  {
    id: 'jinyi-jewelry-rooftop',
    title: 'Dự Án Điện Mặt Trời Áp Mái - Công ty Jinyi Jewelry',
    client: 'Công ty Công ty Jinyi Jewelry',
    industry: 'Sản xuất trang sức',
    location: 'Bắc Ninh',
    capacity: '1.2MWp',
    image: '/images/projects/jinyi-jewelry-rooftop.jpg',
    challenge: 'Lắp đặt hệ thống điện mặt trời trên nhiều mái nhà xưởng với kết cấu khác nhau. Yêu cầu cao về thẩm mỹ và đảm bảo an toàn tuyệt đối cho khu vực sản xuất trang sức cao cấp.',
    solution: 'Thiết kế hệ thống giá đỡ linh hoạt phù hợp với từng loại mái. Sử dụng nhôm A6005-T6 cao cấp với bề mặt hoàn thiện đẹp. Thi công cẩn thận, đảm bảo không ảnh hưởng đến hoạt động sản xuất.',
    results: [
      { label: 'Công suất', value: '1.2MWp', icon: '⚡' },
      { label: 'Thẩm mỹ cao', value: '100%', icon: '⭐' },
      { label: 'An toàn', value: '100%', icon: '✓' }
    ],
    testimonial: {
      quote: 'Hệ thống giá đỡ của Quang Minh không chỉ chất lượng tốt mà còn đẹp mắt, phù hợp với tiêu chuẩn cao của nhà máy chúng tôi. Đội ngũ thi công chuyên nghiệp và cẩn thận.',
      author: 'Đại diện Công ty',
      role: 'Giám đốc - Công ty Jinyi Jewelry'
    }
  },
  {
    id: 'mg-thanh-hoa-showroom',
    title: 'Dự Án Điện Mặt Trời Áp Mái Showroom - Công ty MG Thanh Hóa',
    client: 'Công ty MG Thanh Hóa',
    industry: 'Showroom ô tô',
    location: 'Thanh Hóa',
    capacity: '800kWp',
    image: '/images/projects/mg-thanh-hoa-showroom.jpg',
    challenge: 'Lắp đặt hệ thống điện mặt trời trên mái showroom ô tô với yêu cầu thẩm mỹ cao và không ảnh hưởng đến hình ảnh thương hiệu. Cần đảm bảo an toàn tuyệt đối cho khách hàng và xe.',
    solution: 'Thiết kế hệ thống giá đỡ tối giản, thẩm mỹ cao phù hợp với showroom cao cấp. Sử dụng vật liệu nhôm A6005-T6 với bề mặt hoàn thiện đẹp. Thi công nhanh chóng trong thời gian nghỉ để không ảnh hưởng kinh doanh.',
    results: [
      { label: 'Công suất', value: '800kWp', icon: '⚡' },
      { label: 'Thẩm mỹ', value: 'Cao cấp', icon: '⭐' },
      { label: 'Không gián đoạn KD', value: '100%', icon: '✓' }
    ],
    testimonial: {
      quote: 'Quang Minh hiểu rõ yêu cầu của showroom cao cấp. Hệ thống lắp đặt đẹp mắt, hài hòa với kiến trúc, và giúp chúng tôi tiết kiệm chi phí điện đáng kể.',
      author: 'Đại diện Công ty',
      role: 'Giám đốc - Công ty MG Thanh Hóa'
    }
  },
  {
    id: 'dam-tom-solar',
    title: 'Dự Án Điện Mặt Trời Tại Đầm Tôm',
    client: 'Anh Vương',
    industry: 'Nuôi trồng thủy sản',
    location: 'Miền Trung',
    capacity: '500kWp',
    image: '/images/projects/dam-tom-solar.jpg',
    challenge: 'Lắp đặt hệ thống điện mặt trời trên mặt nước đầm tôm với môi trường khắc nghiệt (nước mặn, độ ẩm cao, gió mạnh). Yêu cầu chống ăn mòn cao và đảm bảo an toàn.',
    solution: 'Thiết kế hệ thống giá đỡ nổi chuyên dụng với nhôm A6005-T6 và lớp anodized 15µm chống ăn mòn muối. Sử dụng phụ kiện inox 316 chống gỉ. Tính toán kỹ thuật chịu gió mạnh và sóng.',
    results: [
      { label: 'Công suất', value: '500kWp', icon: '⚡' },
      { label: 'Chống ăn mòn', value: 'Cao', icon: '🛡️' },
      { label: 'Tiết kiệm điện', value: '50%', icon: '💰' }
    ],
    testimonial: {
      quote: 'Hệ thống của Quang Minh hoạt động rất tốt trong môi trường nước mặn khắc nghiệt. Giúp tôi tiết kiệm 50% chi phí điện cho hệ thống sục khí và máy bơm.',
      author: 'Anh Vương',
      role: 'Chủ đầm tôm'
    }
  },
  {
    id: 'vinhome-rooftop',
    title: 'Dự Án Điện Mặt Trời Áp Mái Vinhome',
    client: 'Khu đô thị Vinhome',
    industry: 'Bất động sản - Khu đô thị',
    location: 'Hà Nội',
    capacity: '3MWp',
    image: '/images/projects/vinhome-rooftop.jpg',
    challenge: 'Lắp đặt hệ thống điện mặt trời trên nhiều tòa nhà cao tầng trong khu đô thị cao cấp. Yêu cầu thẩm mỹ cao, an toàn tuyệt đối, và không ảnh hưởng đến cư dân.',
    solution: 'Thiết kế hệ thống giá đỡ mái bằng ballast cao cấp, không cần khoan mái. Sử dụng vật liệu nhôm A6005-T6 với bề mặt hoàn thiện đẹp. Thi công theo từng tòa, đảm bảo an toàn và không gây ồn.',
    results: [
      { label: 'Công suất', value: '3MWp', icon: '⚡' },
      { label: 'Số tòa nhà', value: '15+', icon: '🏢' },
      { label: 'Hài lòng cư dân', value: '100%', icon: '⭐' }
    ],
    testimonial: {
      quote: 'Quang Minh thực hiện dự án rất chuyên nghiệp. Hệ thống lắp đặt đẹp, an toàn, và giúp khu đô thị tiết kiệm chi phí điện chung đáng kể.',
      author: 'Ban quản lý',
      role: 'Đại diện Ban quản lý Vinhome'
    }
  }
];

// Export for multilingual support
export const caseStudiesEn: CaseStudy[] = [
  {
    id: 'bac-ninh-5mw',
    title: '5MWp Solar Power Project in Bac Ninh',
    client: 'Vietnam Green Energy Co., Ltd. (EPC Contractor)',
    industry: 'EPC - Renewable Energy',
    location: 'Que Vo Industrial Park, Bac Ninh',
    capacity: '5MWp',
    image: '/images/projects/bac-ninh-5mw.jpg',
    challenge: 'EPC contractor needed complete mounting structure package for 5MWp project in short time (2 months) with optimized costs. Complex terrain with flat factory roofs and tilted metal roofs. Required to ensure construction schedule and international quality standards.',
    solution: 'Provided complete A6005-T6 aluminum mounting package including: 4.2m rails, flat roof ballast mounts, L-feet for tilted roofs, mid/end clamps, grounding accessories and stainless steel bolts. Free technical design support, structural calculations per AS/NZS 1170. Delivery in 3 batches matching construction schedule. 24/7 on-site technical team support.',
    results: [
      { label: 'Cost Savings', value: '30%', icon: '💰' },
      { label: 'Time Reduction', value: '33%', icon: '⚡' },
      { label: 'Material Sync', value: '100%', icon: '✓' }
    ],
    testimonial: {
      quote: 'Quang Minh is a reliable partner for our EPC project. High-quality A6005-T6 aluminum mounting, 30% more competitive than imports. Especially the free technical design service and on-time delivery helped us complete the project 1 month early. After 2 years of operation, the system remains absolutely stable.',
      author: 'Nguyen Van Thanh',
      role: 'Project Director - Vietnam Green Energy'
    }
  },
  {
    id: 'khu-do-thi-2mw',
    title: '2MWp Tilted Roof System in Urban Area',
    client: 'Mai Construction & Energy JSC (EPC Contractor)',
    industry: 'EPC - Real Estate & Energy',
    location: 'Ecopark Urban Area, Hung Yen',
    capacity: '2MWp',
    image: '/images/projects/khu-do-thi-2mw.jpg',
    challenge: 'Project to install solar system on 150 villa roofs with different angles and roof types (tile, metal, concrete). High aesthetic requirements, no damage to existing roof structure, absolute waterproofing. Contractor needed flexible and easy-to-install solution to save labor.',
    solution: 'Designed versatile tilted roof mounting system with adjustable L-feet (10-30 degrees), suitable for all roof types. Provided complete: aluminum L-feet, tile hooks for tile roofs, specialized roofing screws, EPDM rubber gaskets for waterproofing. Detailed installation guidance and technical support at 5 simultaneous construction points. Flexible delivery according to each housing cluster schedule.',
    results: [
      { label: 'Early Completion', value: '2 weeks', icon: '📅' },
      { label: 'Roofs Installed', value: '150+', icon: '🏠' },
      { label: 'Labor Savings', value: '40%', icon: '⭐' }
    ],
    testimonial: {
      quote: 'Quang Minh\'s tilted roof mounting system is very intelligently designed, easy to install, helping us save 40% labor compared to plan. High-quality A6005-T6 aluminum withstands storms well. Especially the flexible delivery service and enthusiastic technical support helped complete the project 2 weeks early.',
      author: 'Tran Thi Mai',
      role: 'CEO - Mai Construction & Energy'
    }
  },
  {
    id: 'hai-phong-10mw',
    title: '10MWp Flat Roof Project in Hai Phong',
    client: 'Hai Phong Power & Energy JSC (EPC Contractor)',
    industry: 'EPC - Power & Industrial',
    location: 'VSIP Hai Phong Industrial Park',
    capacity: '10MWp',
    image: '/images/projects/hai-phong-10mw.jpg',
    challenge: 'Contractor\'s largest project, installation on 50,000m² flat factory roof. High load requirements due to coastal location (5km from sea), level 12 wind resistance, salt corrosion. Absolute safety required, no roof drilling to avoid leaks. Tight construction time (3 months) to catch FIT price.',
    solution: 'Provided specialized ballast block flat roof mounting system, no roof drilling needed. Detailed technical calculations per AS/NZS 1170 standards for level 12 wind and 1.5kN/m² snow load. Used A6005-T6 aluminum with 15µm anodized layer for salt corrosion resistance. Complete package: concrete ballast blocks, 4.2m rails, mid/end clamps, grounding wire, 316 stainless steel bolts. 5 engineers on-site support throughout construction.',
    results: [
      { label: 'Fast Installation', value: '2x', icon: '⚡' },
      { label: 'Absolute Safety', value: '100%', icon: '🛡️' },
      { label: 'Wind Resistance', value: 'Level 12', icon: '💨' }
    ],
    testimonial: {
      quote: 'This is our largest project and Quang Minh proved to be a reliable partner. Ballast flat roof mounting intelligently designed, bears loads well, installs twice as fast as old systems. Technical team provided detailed calculations ensuring absolute project safety. Thanks to that we completed the project on time and achieved COD certification timely.',
      author: 'Pham Duc Long',
      role: 'Technical Manager - Hai Phong Power & Energy'
    }
  }
];

export const caseStudiesCn: CaseStudy[] = [
  {
    id: 'bac-ninh-5mw',
    title: '北宁5MWp太阳能项目',
    client: '越南绿色能源有限公司（EPC承包商）',
    industry: 'EPC - 可再生能源',
    location: '北宁桂武工业园',
    capacity: '5MWp',
    image: '/images/projects/bac-ninh-5mw.jpg',
    challenge: 'EPC承包商需要在短时间内（2个月）以优化成本为5MWp项目提供完整的支架包。地形复杂，有平屋顶工厂和倾斜金属屋顶。需要确保施工进度和国际质量标准。',
    solution: '提供完整的A6005-T6铝合金支架包，包括：4.2m导轨、平屋顶压载支架、倾斜屋顶L型支脚、中间/端部夹具、接地配件和不锈钢螺栓。免费技术设计支持，按AS/NZS 1170标准进行结构计算。分3批交货，配合施工进度。24/7现场技术团队支持。',
    results: [
      { label: '节省成本', value: '30%', icon: '💰' },
      { label: '缩短时间', value: '33%', icon: '⚡' },
      { label: '材料同步', value: '100%', icon: '✓' }
    ],
    testimonial: {
      quote: '光明是我们EPC项目的可靠合作伙伴。高质量A6005-T6铝合金支架，比进口产品便宜30%。特别是免费技术设计服务和准时交货帮助我们提前1个月完成项目。运行2年后，系统仍然绝对稳定。',
      author: '阮文成',
      role: '项目总监 - 越南绿色能源'
    }
  },
  {
    id: 'khu-do-thi-2mw',
    title: '城市2MWp斜屋顶系统',
    client: '梅建筑与能源股份公司（EPC承包商）',
    industry: 'EPC - 房地产与能源',
    location: 'Ecopark城市区，兴安',
    capacity: '2MWp',
    image: '/images/projects/khu-do-thi-2mw.jpg',
    challenge: '在150个别墅屋顶上安装太阳能系统，角度和屋顶类型不同（瓦片、金属、混凝土）。高美学要求，不损坏现有屋顶结构，绝对防水。承包商需要灵活且易于安装的解决方案以节省人工。',
    solution: '设计多功能斜屋顶支架系统，配有可调L型支脚（10-30度），适合所有屋顶类型。提供完整：铝制L型支脚、瓦片屋顶挂钩、专用屋顶螺钉、EPDM橡胶垫片防水。详细安装指导和5个同时施工点的技术支持。根据每个住宅群进度灵活交货。',
    results: [
      { label: '提前完成', value: '2周', icon: '📅' },
      { label: '安装屋顶', value: '150+', icon: '🏠' },
      { label: '节省人工', value: '40%', icon: '⭐' }
    ],
    testimonial: {
      quote: '光明的斜屋顶支架系统设计非常智能，易于安装，帮助我们节省了40%的人工成本。高质量A6005-T6铝材抗风暴性能好。特别是灵活的交货服务和热情的技术支持帮助项目提前2周完成。',
      author: '陈氏梅',
      role: '首席执行官 - 梅建筑与能源'
    }
  },
  {
    id: 'hai-phong-10mw',
    title: '海防10MWp平屋顶项目',
    client: '海防电力与能源股份公司（EPC承包商）',
    industry: 'EPC - 电力与工业',
    location: 'VSIP海防工业园',
    capacity: '10MWp',
    image: '/images/projects/hai-phong-10mw.jpg',
    challenge: '承包商最大项目，在50,000平方米平屋顶工厂上安装。由于靠近海岸（距海5公里），需要高承载要求，抗12级风，耐盐腐蚀。需要绝对安全，不钻孔以避免漏水。紧张的施工时间（3个月）以赶上FIT价格。',
    solution: '提供专用压载块平屋顶支架系统，无需钻孔。按AS/NZS 1170标准进行详细技术计算，抗12级风和1.5kN/m²雪载。使用A6005-T6铝材，15µm阳极氧化层抗盐腐蚀。完整包装：混凝土压载块、4.2m导轨、中间/端部夹具、接地线、316不锈钢螺栓。5名工程师全程现场支持。',
    results: [
      { label: '快速安装', value: '2倍', icon: '⚡' },
      { label: '绝对安全', value: '100%', icon: '🛡️' },
      { label: '抗风', value: '12级', icon: '💨' }
    ],
    testimonial: {
      quote: '这是我们最大的项目，光明证明是可靠的合作伙伴。压载平屋顶支架设计巧妙，承载力好，安装速度是旧系统的两倍。技术团队提供详细计算，确保项目绝对安全。因此我们按时完成项目并及时获得COD认证。',
      author: '范德龙',
      role: '技术经理 - 海防电力与能源'
    }
  }
];
