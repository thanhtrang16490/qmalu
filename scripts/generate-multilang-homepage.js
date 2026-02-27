#!/usr/bin/env node

/**
 * Script to generate English and Chinese homepage from Vietnamese template
 * This ensures all three language versions have the same structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the Vietnamese homepage template
const viTemplate = fs.readFileSync(path.join(__dirname, '../src/pages/index.astro'), 'utf-8');

// Translation mappings
const translations = {
  en: {
    // Language marker
    "const lang = 'vi'": "const lang = 'en'",
    // Imports
    "from '../": "from '../../",
    "canonical=\"/\"": "canonical=\"/en/\"",
    
    // SEO
    "Quang Minh - Sản xuất nhôm công nghiệp và năng lượng mặt trời": "Quang Minh - Industrial Aluminum and Solar Energy Manufacturing",
    "Quang Minh chuyên sản xuất, gia công vật tư thiết bị phụ kiện điện năng lượng mặt trời và nhôm công nghiệp A6005. Sản phẩm siêu bền, chống cháy, dễ vệ sinh. Nhà máy 3,000m² tại KCN Nguyên Khê, Xã Phúc Thịnh, Hà Nội.": "Quang Minh specializes in manufacturing and processing solar energy electrical equipment accessories and A6005 industrial aluminum. Super durable, fire-resistant, easy to clean products. 3,000m² factory at Nguyen Khe Industrial Park, Phuc Thinh Commune, Hanoi.",
    
    // Stats
    "Giao hàng trong 24h": "Delivery within 24h",
    "Bảo hành lên đến": "Warranty up to",
    "Đổi trả miễn phí": "Free returns",
    "Phí tư vấn": "Consultation fee",
    
    // Hero
    "Thương hiệu uy tín 16+ năm • KCN Nguyên Khê": "Trusted Brand 16+ Years • Nguyen Khe Industrial Park",
    "Siêu Bền - Chống Cháy": "Super Durable - Fire Resistant",
    "Giải pháp nhôm công nghiệp và năng lượng mặt trời": "Industrial aluminum and solar energy solutions",
    "Siêu bền mọi thời tiết": "Super durable in all weather",
    "Chống cháy an toàn": "Fire resistant and safe",
    "Dễ vệ sinh bảo trì": "Easy to clean and maintain",
    "Xem sản phẩm & giá ngay": "View Products & Prices Now",
    "Tư vấn miễn phí 24/7": "Free Consultation 24/7",
    "Chứng nhận quốc tế": "International Certification",
    "Kinh nghiệm": "Years Experience",
    "Khách hàng": "Customers",
    "Xuất khẩu": "Export",
    "Đông Nam Á & Châu Âu": "Southeast Asia & Europe",
    "Khám phá thêm": "Discover More",
    
    // Urgency Banner
    "Ưu đãi đặc biệt tháng 3": "Special Offer March",
    "Giảm": "Save",
    "cho đơn hàng trên 10 triệu": "for orders over 10 million",
    "Còn 5 ngày": "5 days left",
    
    // Products
    "Sản phẩm của chúng tôi": "Our Products",
    "Nhôm công nghiệp A6005 và thiết bị năng lượng mặt trời chất lượng cao": "High-quality A6005 industrial aluminum and solar energy equipment",
    "Xem tất cả sản phẩm & bảng giá": "View All Products & Price List",
    "Giá công khai • Giao hàng 24h • Hỗ trợ kỹ thuật 24/7": "Public Prices • 24h Delivery • 24/7 Technical Support",
    
    // Why Choose Us
    "Tại sao chọn Quang Minh?": "Why Choose Quang Minh?",
    "So sánh với các nhà cung cấp khác trên thị trường": "Comparison with other suppliers in the market",
    "Tiêu chí": "Criteria",
    "Đối thủ": "Competitors",
    "Giá cả": "Price",
    "Giao hàng": "Delivery",
    "Bảo hành": "Warranty",
    "Đổi trả": "Returns",
    "giờ": "hours",
    "ngày": "days",
    "năm": "years",
    "ngày miễn phí": "days free",
    "Không hỗ trợ": "Not supported",
    "Chất lượng hàng đầu": "Top Quality",
    "100% nhôm nguyên chất dòng 6xxx": "100% pure 6xxx series aluminum",
    "Giá tốt nhất": "Best Price",
    "Cam kết hoàn tiền nếu tìm được giá rẻ hơn": "Money-back guarantee if you find a better price",
    "Giao hàng nhanh": "Fast Delivery",
    "24h tại Hà Nội và các tỉnh lân cận": "24h in Hanoi and neighboring provinces",
    
    // Price Preview
    "Bảng giá tham khảo": "Reference Price List",
    "Giá cạnh tranh nhất thị trường • Miễn phí vận chuyển đơn hàng trên 20 triệu": "Most competitive prices • Free shipping for orders over 20 million",
    "Phổ biến nhất": "Most Popular",
    "Gọi đặt hàng ngay": "Order Now",
    "Xem bảng giá đầy đủ": "View Full Price List",
    
    // FAQ
    "Câu hỏi thường gặp": "Frequently Asked Questions",
    "Giải đáp những thắc mắc phổ biến về sản phẩm và dịch vụ": "Answers to common questions about products and services",
    
    // Map
    "Địa chỉ": "Address",
    "Điện thoại": "Phone",
    "Quy mô": "Scale",
    "Nhà máy": "Factory",
    
    // CTA
    "Sẵn sàng nâng cao hiệu quả sản xuất nhôm?": "Ready to improve aluminum production efficiency?",
    "Liên hệ ngay để được tư vấn miễn phí từ chuyên gia": "Contact now for free consultation from experts",
    "Gọi ngay": "Call Now",
    "Đăng ký tư vấn": "Register for Consultation",
    
    // Testimonials
    "Anh Nguyễn Văn Thành": "Mr. Nguyen Van Thanh",
    "Giám đốc Công ty Năng lượng Mặt trời Hà Nội": "Director of Hanoi Solar Energy Company",
    "Sử dụng sản phẩm Quang Minh được 2 năm, tiết kiệm 30% chi phí so với nhà cung cấp trước. Chất lượng ổn định, siêu bền dưới mọi thời tiết.": "Using Quang Minh products for 2 years, saving 30% costs compared to previous supplier. Stable quality, super durable in all weather conditions.",
    "Sử dụng sản phẩm Quang Minh được 2 years, tiết kiệm 30% chi phí so với nhà cung cấp trước. Chất lượng ổn định, siêu bền dưới mọi thời tiết.": "Using Quang Minh products for 2 years, saving 30% costs compared to previous supplier. Stable quality, super durable in all weather conditions.",
    "Tiết kiệm 30% chi phí": "Save 30% costs",
    
    "Chị Trần Thị Mai": "Ms. Tran Thi Mai",
    "Chủ đầu tư Dự án Khu đô thị Bắc Ninh": "Investor of Bac Ninh Urban Area Project",
    "Aluminum A6005 của Quang Minh chất lượng cao, độ bền tốt. Delivery đúng hẹn, giúp dự án hoàn thành sớm 2 tuần.": "Quang Minh's A6005 aluminum is high quality, good durability. On-time delivery helped the project complete 2 weeks early.",
    "Nhôm A6005 của Quang Minh chất lượng cao, độ bền tốt. Giao hàng đúng hẹn, giúp dự án hoàn thành sớm 2 tuần.": "Quang Minh's A6005 aluminum is high quality, good durability. On-time delivery helped the project complete 2 weeks early.",
    "Hoàn thành sớm 2 tuần": "Completed 2 weeks early",
    
    "Anh Phạm Đức Long": "Mr. Pham Duc Long",
    "Trưởng phòng Kỹ thuật Công ty Điện lực": "Head of Technical Department, Power Company",
    "Điện lực Hải Phòng": "Hai Phong Power",
    "Phụ kiện điện năng lượng mặt trời của Quang Minh tăng 40% hiệu suất so với sản phẩm cũ. Chống cháy tốt, an toàn tuyệt đối.": "Quang Minh's solar energy electrical accessories increased efficiency by 40% compared to old products. Good fire resistance, absolute safety.",
    "Tăng 40% hiệu suất": "Increased 40% efficiency",
    
    // FAQ
    "Giá nhôm A6005 bao nhiêu?": "What is the price of A6005 aluminum?",
    "Giá nhôm A6005 từ 85,000đ/kg tùy theo khối lượng đặt hàng. Liên hệ 0947 776 662 để nhận báo giá chi tiết và ưu đãi đặc biệt.": "A6005 aluminum price from 85,000đ/kg depending on order volume. Contact 0947 776 662 for detailed quotes and special offers.",
    
    "Thời gian giao hàng bao lâu?": "How long is the delivery time?",
    "Giao hàng trong vòng 24h tại Hà Nội và các tỉnh lân cận. Các tỉnh xa hơn từ 2-3 ngày. Miễn phí vận chuyển cho đơn hàng trên 20 triệu.": "Delivery within 24 hours in Hanoi and neighboring provinces. More distant provinces 2-3 days. Free shipping for orders over 20 million.",
    
    "Có chính sách bảo hành không?": "Is there a warranty policy?",
    "Bảo hành 5 năm cho sản phẩm nhôm A6005 và thiết bị năng lượng mặt trời. Đổi trả miễn phí trong 30 ngày nếu có lỗi từ nhà sản xuất.": "5-year warranty for A6005 aluminum products and solar energy equipment. Free returns within 30 days if there are manufacturing defects.",
    
    "Thanh toán như thế nào?": "How to pay?",
    "Hỗ trợ thanh toán linh hoạt: Chuyển khoản, tiền mặt, trả góp 0% cho đơn hàng trên 50 triệu. Đặt cọc 30%, thanh toán 70% khi nhận hàng.": "Flexible payment support: Bank transfer, cash, 0% installment for orders over 50 million. 30% deposit, 70% payment upon receipt.",
    
    // Products
    "Nhôm A6005": "Aluminum A6005",
    "HỢP KIM NHÔM KẾT CẤU": "STRUCTURAL ALUMINUM ALLOY",
    "Hợp kim kết cấu có độ bền tốt, kết hợp tốt giữa độ bền, độ dẻo dai, độ hoàn thiện bề mặt. Phù hợp cho quá trình anodizing trang trí.": "Structural alloy with good strength, combining strength, toughness, surface finish. Suitable for decorative anodizing process.",
    "Grade 6063 T5, 6005 T5/6061 T6": "Grade 6063 T5, 6005 T5/6061 T6",
    "Độ bền kéo: 260-270 MPa": "Tensile strength: 260-270 MPa",
    "Ứng dụng kết cấu, đường sắt, giao thông": "Structural, railway, transportation applications",
    "Chống mài mòn, dẻo và định hình tốt": "Wear resistant, ductile and formable",
    
    "Thiết bị năng lượng mặt trời": "Solar energy equipment",
    "PHỤ KIỆN ĐIỆN MẶT TRỜI": "SOLAR ELECTRICAL ACCESSORIES",
    "Vật tư thiết bị phụ kiện điện năng lượng mặt trời chất lượng cao, siêu bền dưới mọi thời tiết, chống cháy.": "High-quality solar energy electrical equipment accessories, super durable in all weather conditions, fire-resistant.",
    "Siêu bền dưới mọi thời tiết": "Super durable in all weather",
    "Chống cháy, an toàn tuyệt đối": "Fire resistant, absolutely safe",
    "Dễ vệ sinh, bảo trì đơn giản": "Easy to clean, simple maintenance",
    "Lắp đặt nhanh chóng, chuyên nghiệp": "Fast, professional installation",
    
    "Nhôm đùn ép": "Aluminum extrusion",
    "GIA CÔNG NHÔM CHUYÊN NGHIỆP": "PROFESSIONAL ALUMINUM PROCESSING",
    "Dịch vụ đùn ép nhôm, si mạ nhôm, sơn tĩnh điện với độ dày lớp phủ từ 6µm đến 18µm. Gia công chính xác đến từng chi tiết.": "Aluminum extrusion, aluminum plating, powder coating services with coating thickness from 6µm to 18µm. Precise processing down to every detail.",
    "Đùn ép nhôm theo khuôn mẫu": "Aluminum extrusion according to mold",
    "Si mạ nhôm chất lượng cao": "High quality aluminum plating",
    "Sơn tĩnh điện bền màu": "Durable powder coating",
    "Gia công chính xác, tỉ mỉ": "Precise, meticulous processing",
    
    "Gia công theo yêu cầu": "Custom processing",
    "GIẢI PHÁP TÙY CHỈNH": "CUSTOM SOLUTIONS",
    "Chế tạo khuôn mẫu mới, gia công sản phẩm theo yêu cầu khách hàng với độ chính xác cao, đáp ứng mọi yêu cầu kỹ thuật.": "Manufacturing new molds, processing products according to customer requirements with high precision, meeting all technical requirements.",
    "Chế tạo khuôn mẫu theo yêu cầu": "Custom mold manufacturing",
    "Nghiên cứu sản phẩm mới": "New product research",
    "Đáp ứng yêu cầu kỹ thuật cao": "Meeting high technical requirements",
    
    // Price items
    "Nhôm định hình 50x50": "50x50 aluminum profile",
    "Độ dày 1.2mm": "Thickness 1.2mm",
    "Giao hàng 24h": "24h delivery",
    "Tấm nhôm 2mm": "2mm aluminum sheet",
    "Bề mặt nhẵn": "Smooth surface",
    "Chống ăn mòn": "Corrosion resistant",
    "Cắt theo size": "Cut to size",
    "Phụ kiện điện mặt trời": "Solar electrical accessories",
    "Liên hệ": "Contact",
    "Chống cháy": "Fire resistant",
    "Bảo hành 5 năm": "5-year warranty",
    "Lắp đặt miễn phí": "Free installation",
    
    // Testimonials section title
    "Khách hàng nói gì": "What Customers Say",
    "Hàng nghìn khách hàng tin tưởng và đồng hành cùng Quang Minh": "Thousands of customers trust and accompany Quang Minh",
    
    // Social proof numbers
    "Khách hàng tin dùng": "Trusted Customers",
    "Đối tác phân phối": "Distribution Partners",
    "Dự án hoàn thành": "Completed Projects",
    "Khách hài lòng": "Satisfied Customers"
  },
  cn: {
    // Language marker
    "const lang = 'vi'": "const lang = 'cn'",
    // Imports
    "from '../": "from '../../",
    "canonical=\"/\"": "canonical=\"/cn/\"",
    
    // SEO
    "Quang Minh - Sản xuất nhôm công nghiệp và năng lượng mặt trời": "Quang Minh - 工业铝和太阳能制造",
    "Quang Minh chuyên sản xuất, gia công vật tư thiết bị phụ kiện điện năng lượng mặt trời và nhôm công nghiệp A6005. Sản phẩm siêu bền, chống cháy, dễ vệ sinh. Nhà máy 3,000m² tại KCN Nguyên Khê, Xã Phúc Thịnh, Hà Nội.": "Quang Minh专业生产和加工太阳能电气设备配件和A6005工业铝。超耐用、防火、易清洁的产品。位于河内福盛社阮溪工业区的3,000平方米工厂。",
    
    // Stats
    "Giao hàng trong 24h": "24小时内交货",
    "Bảo hành lên đến": "保修期长达",
    "Đổi trả miễn phí": "免费退换",
    "Phí tư vấn": "咨询费",
    
    // Hero
    "Thương hiệu uy tín 16+ năm • KCN Nguyên Khê": "信誉品牌16+年 • 阮溪工业区",
    "Siêu Bền - Chống Cháy": "超耐用 - 防火",
    "Giải pháp nhôm công nghiệp và năng lượng mặt trời": "工业铝和太阳能解决方案",
    "Siêu bền mọi thời tiết": "全天候超耐用",
    "Chống cháy an toàn": "防火安全",
    "Dễ vệ sinh bảo trì": "易于清洁和维护",
    "Xem sản phẩm & giá ngay": "立即查看产品和价格",
    "Tư vấn miễn phí 24/7": "24/7免费咨询",
    "Chứng nhận quốc tế": "国际认证",
    "Kinh nghiệm": "年经验",
    "Khách hàng": "客户",
    "Xuất khẩu": "出口",
    "Đông Nam Á & Châu Âu": "东南亚和欧洲",
    "Khám phá thêm": "了解更多",
    
    // Urgency Banner
    "Ưu đãi đặc biệt tháng 3": "3月特别优惠",
    "Giảm": "节省",
    "cho đơn hàng trên 10 triệu": "订单超过1000万",
    "Còn 5 ngày": "还剩5天",
    
    // Products
    "Sản phẩm của chúng tôi": "我们的产品",
    "Nhôm công nghiệp A6005 và thiết bị năng lượng mặt trời chất lượng cao": "高质量A6005工业铝和太阳能设备",
    "Xem tất cả sản phẩm & bảng giá": "查看所有产品和价格表",
    "Giá công khai • Giao hàng 24h • Hỗ trợ kỹ thuật 24/7": "公开价格 • 24小时交货 • 24/7技术支持",
    
    // Why Choose Us
    "Tại sao chọn Quang Minh?": "为什么选择Quang Minh？",
    "So sánh với các nhà cung cấp khác trên thị trường": "与市场上其他供应商的比较",
    "Tiêu chí": "标准",
    "Đối thủ": "竞争对手",
    "Giá cả": "价格",
    "Giao hàng": "交货",
    "Bảo hành": "保修",
    "Đổi trả": "退换",
    "giờ": "小时",
    "ngày": "天",
    "năm": "年",
    "ngày miễn phí": "天免费",
    "Không hỗ trợ": "不支持",
    "Chất lượng hàng đầu": "顶级质量",
    "100% nhôm nguyên chất dòng 6xxx": "100%纯6xxx系列铝",
    "Giá tốt nhất": "最优价格",
    "Cam kết hoàn tiền nếu tìm được giá rẻ hơn": "如果找到更便宜的价格，保证退款",
    "Giao hàng nhanh": "快速交货",
    "24h tại Hà Nội và các tỉnh lân cận": "河内及周边省份24小时",
    
    // Price Preview
    "Bảng giá tham khảo": "参考价格表",
    "Giá cạnh tranh nhất thị trường • Miễn phí vận chuyển đơn hàng trên 20 triệu": "市场最具竞争力的价格 • 订单超过2000万免运费",
    "Phổ biến nhất": "最受欢迎",
    "Gọi đặt hàng ngay": "立即订购",
    "Xem bảng giá đầy đủ": "查看完整价格表",
    
    // FAQ
    "Câu hỏi thường gặp": "常见问题",
    "Giải đáp những thắc mắc phổ biến về sản phẩm và dịch vụ": "解答有关产品和服务的常见问题",
    
    // Map
    "Địa chỉ": "地址",
    "Điện thoại": "电话",
    "Quy mô": "规模",
    "Nhà máy": "工厂",
    
    // CTA
    "Sẵn sàng nâng cao hiệu quả sản xuất nhôm?": "准备提高铝生产效率？",
    "Liên hệ ngay để được tư vấn miễn phí từ chuyên gia": "立即联系获取专家免费咨询",
    "Gọi ngay": "立即致电",
    "Đăng ký tư vấn": "注册咨询",
    
    // Testimonials
    "Anh Nguyễn Văn Thành": "阮文成先生",
    "Giám đốc Công ty Năng lượng Mặt trời Hà Nội": "河内太阳能公司董事",
    "Sử dụng sản phẩm Quang Minh được 2 năm, tiết kiệm 30% chi phí so với nhà cung cấp trước. Chất lượng ổn định, siêu bền dưới mọi thời tiết.": "使用Quang Minh产品2年，与之前的供应商相比节省30%的成本。质量稳定，全天候超耐用。",
    "Tiết kiệm 30% chi phí": "节省30%成本",
    
    "Chị Trần Thị Mai": "陈氏梅女士",
    "Chủ đầu tư Dự án Khu đô thị Bắc Ninh": "北宁城市区项目投资者",
    "Nhôm A6005 của Quang Minh chất lượng cao, độ bền tốt. Giao hàng đúng hẹn, giúp dự án hoàn thành sớm 2 tuần.": "Quang Minh的A6005铝质量高，耐用性好。准时交货帮助项目提前2周完成。",
    "Hoàn thành sớm 2 tuần": "提前2周完成",
    
    "Anh Phạm Đức Long": "范德龙先生",
    "Trưởng phòng Kỹ thuật Công ty Điện lực": "电力公司技术部主任",
    "Điện lực Hải Phòng": "海防电力",
    "Phụ kiện điện năng lượng mặt trời của Quang Minh tăng 40% hiệu suất so với sản phẩm cũ. Chống cháy tốt, an toàn tuyệt đối.": "Quang Minh的太阳能电气配件与旧产品相比效率提高40%。良好的防火性能，绝对安全。",
    "Tăng 40% hiệu suất": "效率提高40%",
    
    // FAQ
    "Giá nhôm A6005 bao nhiêu?": "A6005铝的价格是多少？",
    "Giá nhôm A6005 từ 85,000đ/kg tùy theo khối lượng đặt hàng. Liên hệ 0947 776 662 để nhận báo giá chi tiết và ưu đãi đặc biệt.": "A6005铝价格从85,000越南盾/公斤起，具体取决于订单量。联系0947 776 662获取详细报价和特别优惠。",
    
    "Thời gian giao hàng bao lâu?": "交货时间多长？",
    "Giao hàng trong vòng 24h tại Hà Nội và các tỉnh lân cận. Các tỉnh xa hơn từ 2-3 ngày. Miễn phí vận chuyển cho đơn hàng trên 20 triệu.": "河内及周边省份24小时内交货。更远的省份2-3天。订单超过2000万免运费。",
    
    "Có chính sách bảo hành không?": "有保修政策吗？",
    "Bảo hành 5 năm cho sản phẩm nhôm A6005 và thiết bị năng lượng mặt trời. Đổi trả miễn phí trong 30 ngày nếu có lỗi từ nhà sản xuất.": "A6005铝产品和太阳能设备5年保修。如有制造缺陷，30天内免费退换。",
    
    "Thanh toán như thế nào?": "如何付款？",
    "Hỗ trợ thanh toán linh hoạt: Chuyển khoản, tiền mặt, trả góp 0% cho đơn hàng trên 50 triệu. Đặt cọc 30%, thanh toán 70% khi nhận hàng.": "灵活的付款支持：银行转账、现金、订单超过5000万的0%分期付款。30%定金，收货时支付70%。",
    
    // Products
    "Nhôm A6005": "铝A6005",
    "HỢP KIM NHÔM KẾT CẤU": "结构铝合金",
    "Hợp kim kết cấu có độ bền tốt, kết hợp tốt giữa độ bền, độ dẻo dai, độ hoàn thiện bề mặt. Phù hợp cho quá trình anodizing trang trí.": "具有良好强度的结构合金，结合了强度、韧性和表面光洁度。适合装饰性阳极氧化工艺。",
    "Grade 6063 T5, 6005 T5/6061 T6": "等级6063 T5, 6005 T5/6061 T6",
    "Độ bền kéo: 260-270 MPa": "抗拉强度：260-270 MPa",
    "Ứng dụng kết cấu, đường sắt, giao thông": "结构、铁路、交通应用",
    "Chống mài mòn, dẻo và định hình tốt": "耐磨、延展性好、易成型",
    
    "Thiết bị năng lượng mặt trời": "太阳能设备",
    "PHỤ KIỆN ĐIỆN MẶT TRỜI": "太阳能电气配件",
    "Vật tư thiết bị phụ kiện điện năng lượng mặt trời chất lượng cao, siêu bền dưới mọi thời tiết, chống cháy.": "高质量太阳能电气设备配件，全天候超耐用，防火。",
    "Siêu bền dưới mọi thời tiết": "全天候超耐用",
    "Chống cháy, an toàn tuyệt đối": "防火，绝对安全",
    "Dễ vệ sinh, bảo trì đơn giản": "易于清洁，维护简单",
    "Lắp đặt nhanh chóng, chuyên nghiệp": "快速、专业安装",
    
    "Nhôm đùn ép": "铝挤压",
    "GIA CÔNG NHÔM CHUYÊN NGHIỆP": "专业铝加工",
    "Dịch vụ đùn ép nhôm, si mạ nhôm, sơn tĩnh điện với độ dày lớp phủ từ 6µm đến 18µm. Gia công chính xác đến từng chi tiết.": "铝挤压、铝电镀、粉末涂层服务，涂层厚度从6µm到18µm。精确加工到每个细节。",
    "Đùn ép nhôm theo khuôn mẫu": "按模具挤压铝",
    "Si mạ nhôm chất lượng cao": "高质量铝电镀",
    "Sơn tĩnh điện bền màu": "耐用粉末涂层",
    "Gia công chính xác, tỉ mỉ": "精确、细致的加工",
    
    "Gia công theo yêu cầu": "定制加工",
    "GIẢI PHÁP TÙY CHỈNH": "定制解决方案",
    "Chế tạo khuôn mẫu mới, gia công sản phẩm theo yêu cầu khách hàng với độ chính xác cao, đáp ứng mọi yêu cầu kỹ thuật.": "制造新模具，根据客户要求高精度加工产品，满足所有技术要求。",
    "Chế tạo khuôn mẫu theo yêu cầu": "定制模具制造",
    "Nghiên cứu sản phẩm mới": "新产品研发",
    "Đáp ứng yêu cầu kỹ thuật cao": "满足高技术要求",
    
    // Price items
    "Nhôm định hình 50x50": "50x50铝型材",
    "Độ dày 1.2mm": "厚度1.2mm",
    "Giao hàng 24h": "24小时交货",
    "Tấm nhôm 2mm": "2mm铝板",
    "Bề mặt nhẵn": "光滑表面",
    "Chống ăn mòn": "防腐蚀",
    "Cắt theo size": "按尺寸切割",
    "Phụ kiện điện mặt trời": "太阳能电气配件",
    "Liên hệ": "联系",
    "Chống cháy": "防火",
    "Bảo hành 5 năm": "5年保修",
    "Lắp đặt miễn phí": "免费安装",
    
    // Testimonials section title
    "Khách hàng nói gì": "客户评价",
    "Hàng nghìn khách hàng tin tưởng và đồng hành cùng Quang Minh": "数千客户信任并与Quang Minh合作",
    
    // Social proof numbers
    "Khách hàng tin dùng": "信赖客户",
    "Đối tác phân phối": "分销合作伙伴",
    "Dự án hoàn thành": "完成项目",
    "Khách hài lòng": "满意客户"
  }
};

// Function to apply translations
function applyTranslations(template, lang) {
  let result = template;
  const langTranslations = translations[lang];
  
  for (const [vi, translated] of Object.entries(langTranslations)) {
    // Use global replace with proper escaping
    const escapedVi = vi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escapedVi, 'g'), translated);
  }
  
  return result;
}

// Generate English version
const enContent = applyTranslations(viTemplate, 'en');
fs.writeFileSync(path.join(__dirname, '../src/pages/en/index.astro'), enContent);
console.log('✅ Generated English homepage: src/pages/en/index.astro');

// Generate Chinese version
const cnContent = applyTranslations(viTemplate, 'cn');
fs.writeFileSync(path.join(__dirname, '../src/pages/cn/index.astro'), cnContent);
console.log('✅ Generated Chinese homepage: src/pages/cn/index.astro');

console.log('\n🎉 Successfully generated multilingual homepages!');
console.log('📝 Note: You may need to manually adjust some content-specific translations.');
