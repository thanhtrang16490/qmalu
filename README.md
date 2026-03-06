# Quang Minh Solar - Website Dự Án

Website chính thức của Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh - Nhà sản xuất kết cấu nhôm và phụ kiện điện mặt trời.

## 🏢 Thông Tin Công Ty

- **Tên**: Công ty Cổ phần Kỹ thuật Công nghệ Quang Minh
- **Địa chỉ**: Lô CN09, KCN Nguyên Khê, Đông Anh, Hà Nội
- **Tọa độ**: 21.165485, 105.835003
- **Google Maps**: https://maps.app.goo.gl/43W5jSshicKhDimG8
- **Điện thoại**: 0947 776 662
- **Email**: info@qmalu.com
- **Website**: https://qmalu.com

## 🚀 Tech Stack

- **Framework**: Astro 5.1.3
- **UI**: React 18.3.1 + Tailwind CSS 3.4.17
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Railway
- **Languages**: TypeScript, Vietnamese/English/Chinese

## 📦 Cấu Trúc Dự Án

```
qmalu.com/
├── src/
│   ├── components/          # React components
│   │   ├── Product3DCarousel.tsx
│   │   ├── CertificatesCarousel.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── InteractiveMap.tsx
│   │   └── ...
│   ├── data/               # Data files
│   │   ├── company-info.ts
│   │   ├── products.ts
│   │   ├── case-studies.ts
│   │   └── homepage-content.ts
│   ├── layouts/            # Layout components
│   ├── lib/                # Utilities & helpers
│   ├── pages/              # Astro pages
│   │   ├── index.astro     # Homepage (Vietnamese)
│   │   ├── en/             # English pages
│   │   ├── cn/             # Chinese pages
│   │   └── san-pham/       # Products pages
│   └── styles/             # CSS files
├── public/                 # Static assets
│   ├── certificate/        # Certificate images
│   └── ...
└── scripts/               # Build scripts
```

## 🎯 Tính Năng Chính

### 1. Homepage B2B Focus
- Hero section với 3D background effects
- Stats section với animated counters
- Product 3D carousel
- Certificates carousel (6 chứng nhận)
- Case studies (6 dự án thực tế)
- Interactive map với Leaflet
- Trust badges carousel
- FAQ section với 10 câu hỏi

### 2. SEO Optimization
- **Structured Data**: FAQPage, Organization, Product schemas
- **Meta Tags**: Open Graph, Twitter Cards
- **Sitemap**: Auto-generated với image sitemap
- **Performance**: Lazy loading, code splitting
- **Mobile**: Responsive design, PWA ready

### 3. Multi-language Support
- Vietnamese (default)
- English (/en/)
- Chinese (/cn/)

### 4. Interactive Components
- 3D Product Carousel với perspective transforms
- Certificates Carousel với swipe gestures
- Animated counters
- Comparison calculator
- Video testimonials
- Interactive map

### 5. Mobile Optimization
- Bottom navigation
- Touch gestures (swipe, pull-to-refresh)
- Haptic feedback
- Collapsible sections
- Mobile-first CSS

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm hoặc yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📊 Dữ Liệu Quan Trọng

### Case Studies (6 dự án)
1. Công ty TNHH Huế Anh - 1.5MWp
2. Công ty TNHH May Mặc Hoàng Tùng - 2MWp
3. Công ty Jinyi Jewelry - 1.2MWp
4. Công ty MG Thanh Hóa - 800kWp
5. Đầm tôm - Anh Vương - 500kWp
6. Khu đô thị Vinhome - 3MWp

### Certificates (6 chứng nhận)
- ISO 9001:2015
- Test Report - Kiểm tra tải trọng
- Giấy phép xuất khẩu
- Chứng nhận chất lượng sản phẩm
- Certificate of Conformity
- Chứng nhận an toàn

### Products
- Thanh ray nhôm A6005-T6
- Kẹp giữa & kẹp biên
- Chân L & kết cấu mái
- Phụ kiện tiếp địa
- Thang cáp & máng cáp
- Thang leo & sàn thao tác

## 🎨 Design System

### Colors
- Primary: #e6282b (Red)
- Secondary: #4fb348 (Green)
- Neutral: Gray scale

### Typography
- Font: System fonts (San Francisco, Segoe UI, Roboto)
- Headings: Bold, tracking-tight
- Body: Regular, leading-relaxed

### Components Style
- Apple-inspired minimalist design
- Smooth animations (700ms cubic-bezier)
- 3D transforms với perspective
- Glassmorphism effects
- Rounded corners (xl, 2xl, 3xl)

## 📱 Mobile Features

### Bottom Navigation
- Home, Products, Quote, Contact
- Fixed position với safe-area support
- Active state indicators

### Touch Optimizations
- Minimum touch target: 44x44px
- Swipe gestures for carousels
- Pull-to-refresh
- Haptic feedback

### Performance
- Lazy loading images
- Code splitting
- Reduced animations on mobile
- Simplified 3D transforms

## 🔧 Configuration Files

- `astro.config.mjs` - Astro configuration
- `tailwind.config.extended.mjs` - Tailwind CSS config
- `tsconfig.json` - TypeScript config
- `nixpacks.toml` - Railway deployment config

## 📈 Analytics & Monitoring

- Google Analytics (optional)
- Performance monitoring
- Error tracking

## 🚢 Deployment

### Railway
```bash
# Auto-deploy on push to main branch
git push origin main
```

### Environment Variables
```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## 📝 Recent Updates (March 2026)

### March 6, 2026
- ✅ Updated company location with GPS coordinates
- ✅ Added Google Maps short link
- ✅ Fixed certificates carousel mobile display
- ✅ Added debug logging for carousel

### March 5, 2026
- ✅ Added 6 real project case studies
- ✅ Implemented certificates carousel with 3D effects
- ✅ Added SEO structured data (FAQ, Organization, Product)
- ✅ Updated homepage with B2B focus

## 🐛 Known Issues

### Certificates Carousel Mobile
- Issue: Carousel not displaying properly on mobile
- Status: In progress
- Debug: Added console.log for state tracking
- Next steps: Check browser console for logs

## 📞 Support

For technical support or questions:
- Email: info@qmalu.com
- Phone: 0947 776 662

## 📄 License

Proprietary - © 2026 Quang Minh Technology Engineering JSC

---

**Last Updated**: March 6, 2026
**Version**: 2.0.0
**Maintained by**: Quang Minh Development Team
