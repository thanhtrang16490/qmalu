# CONTENT OPTIMIZATION RECOMMENDATIONS

**Ngày**: 2026-03-05  
**Status**: 📋 RECOMMENDATIONS

---

## 📊 TỔNG QUAN

Document này chứa các đề xuất tối ưu nội dung và SEO có thể thực hiện trong tương lai để cải thiện thêm trang chủ.

---

## 🔗 INTERNAL LINKING STRATEGY

### Current State
Hiện tại trang chủ có các internal links:
- `/lien-he` - Contact page (5 links)
- `/san-pham` - Products page (4 links)

### Recommendations

#### 1. Add Product Category Links
**Mục đích**: Tăng internal linking đến các trang sản phẩm cụ thể

**Locations to add**:
- Products section: Link mỗi product card đến trang chi tiết
- Bảng Giá section: Link đến product pages
- Năng Lực Cốt Lõi: Link đến related products

**Example**:
```html
<!-- Instead of generic /san-pham -->
<a href="/san-pham/thanh-ray-nhom">Thanh Ray Nhôm A6005-T6</a>
<a href="/san-pham/kep-giua-kep-bien">Kẹp Giữa & Kẹp Biên</a>
```

#### 2. Add Blog/Resource Links
**Mục đích**: Tăng engagement và time on site

**Locations to add**:
- After FAQ: "Đọc thêm bài viết về..."
- Company Introduction: Link to "Về chúng tôi" page
- Case Studies: Link to detailed case study pages

**Example**:
```html
<a href="/blog/huong-dan-chon-gia-do-solar">
  Hướng dẫn chọn giá đỡ solar phù hợp
</a>
```

#### 3. Add Contextual Links
**Mục đích**: Improve SEO with natural anchor text

**Opportunities**:
- "nhôm A6005-T6" → link to product page
- "dự án EPC" → link to services page
- "ISO 9001:2015" → link to certifications page

---

## 📝 CONTENT IMPROVEMENTS

### 1. Long-tail Keywords

#### Current Keywords
- Giá đỡ solar
- Kết cấu nhôm
- Dự án MWp
- EPC contractor

#### Recommended Long-tail Keywords to Add
- "giá đỡ pin mặt trời mái bằng"
- "kết cấu nhôm điện mặt trời giá rẻ"
- "nhà cung cấp giá đỡ solar uy tín"
- "giải pháp EPC điện mặt trời trọn gói"
- "thanh ray nhôm A6005-T6 chất lượng cao"

**Where to add**:
- FAQ answers (natural integration)
- Product descriptions
- Section headings (H2/H3)

---

### 2. Content Expansion

#### Company Introduction
**Current**: 1 paragraph
**Recommendation**: Add 1-2 more paragraphs about:
- Company history (founded 2008)
- Key milestones
- Export markets (Cambodia, Laos, Myanmar)

#### Case Studies
**Current**: 6 case studies with basic info
**Recommendation**: Add more details:
- Project timeline
- Challenges faced
- Technical specifications
- ROI calculations
- Customer testimonials with photos

#### FAQ
**Current**: 10 questions
**Recommendation**: Add 5 more questions:
- "Có hỗ trợ vận chuyển đến công trình không?"
- "Sản phẩm có đạt tiêu chuẩn quốc tế nào?"
- "Có cung cấp dịch vụ bảo trì không?"
- "Thời gian bảo hành được tính từ khi nào?"
- "Có chương trình ưu đãi cho khách hàng thân thiết không?"

---

### 3. Meta Descriptions

#### Current State
- Homepage has meta description in BaseLayout
- Individual sections don't have descriptions

#### Recommendations

**Add section descriptions for**:
1. Products Section
2. Pricing Section
3. Core Capabilities Section
4. Order Process Section
5. Case Studies Section

**Example**:
```html
<!-- Products Section -->
<section aria-label="Sản phẩm kết cấu nhôm" 
         aria-describedby="products-description">
  <p id="products-description" class="sr-only">
    Cung cấp trọn bộ hệ giá đỡ pin NLMT bao gồm thanh ray, 
    kẹp, chân đế và phụ kiện chất lượng cao
  </p>
  ...
</section>
```

---

## 🎯 H1/H2/H3 HIERARCHY

### Current Structure
```
H1: Giải Pháp Kết Cấu Nhôm Cho Dự Án Điện Mặt Trời MWp
  H2: Đối Tác Tin Cậy Cho Dự Án Của Bạn
  H2: Sản phẩm kết cấu nhôm
  H2: Giá Cạnh Tranh, Minh Bạch
  H2: Đối Tác Tin Cậy Cho Dự Án MWp
  H2: 5 Bước Đơn Giản
  H2: Tại Sao Chọn Quang Minh?
  H2: Nhận Báo Giá Dự Án EPC
  H2: Câu hỏi thường gặp
```

### Recommendations

#### 1. Add H3 Subheadings
**Products Section**:
```
H2: Sản phẩm kết cấu nhôm
  H3: Thanh Ray Nhôm
  H3: Kẹp Giữa & Kẹp Biên
  H3: Chân L & Kết Cấu
```

**Core Capabilities**:
```
H2: Năng Lực Cốt Lõi
  H3: Sản Xuất
    - Nhôm Hợp Kim Chất Lượng Cao
    - Quy Trình Sản Xuất Khép Kín
  H3: Giải Pháp EPC
    - Thiết Kế Kỹ Thuật
    - Cung Cấp Trọn Gói
```

#### 2. Optimize H2 Text
**Current**: Generic headings
**Recommended**: Keyword-rich headings

Examples:
- "Sản phẩm kết cấu nhôm" → "Sản Phẩm Giá Đỡ Solar Chất Lượng Cao"
- "Giá Cạnh Tranh" → "Bảng Giá Giá Đỡ Pin Mặt Trời Cạnh Tranh"
- "5 Bước Đơn Giản" → "Quy Trình Đặt Hàng Giá Đỡ Solar Đơn Giản"

---

## 🖼️ IMAGE OPTIMIZATION

### Current State
- Images use PNG/SVG format
- Some images have good alt text
- No lazy loading implemented
- No responsive images (srcset)

### Recommendations

#### 1. Convert to WebP
**Priority**: High
**Impact**: 30-40% file size reduction

**Files to convert**:
- `/nha-may.png` → `/nha-may.webp`
- Product images
- Case study images

**Implementation**:
```html
<picture>
  <source srcset="/nha-may.webp" type="image/webp">
  <img src="/nha-may.png" alt="Nhà máy Quang Minh">
</picture>
```

#### 2. Add Lazy Loading
**Priority**: Medium
**Impact**: Faster initial page load

**Implementation**:
```html
<!-- Images below fold -->
<img loading="lazy" src="..." alt="...">

<!-- Hero image -->
<img loading="eager" fetchpriority="high" src="..." alt="...">
```

#### 3. Responsive Images
**Priority**: Medium
**Impact**: Better mobile performance

**Implementation**:
```html
<img 
  srcset="
    /nha-may-400.webp 400w,
    /nha-may-800.webp 800w,
    /nha-may-1200.webp 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  src="/nha-may-800.webp"
  alt="Nhà máy Quang Minh"
>
```

#### 4. Improve Alt Text
**Current**: Basic alt text
**Recommended**: Descriptive, keyword-rich alt text

**Examples**:
```html
<!-- Before -->
<img alt="Thanh ray nhôm">

<!-- After -->
<img alt="Thanh ray nhôm A6005-T6 chất lượng cao cho hệ thống điện mặt trời">
```

---

## 📱 MOBILE OPTIMIZATION

### Content Adjustments

#### 1. Shorter Paragraphs
**Current**: Long paragraphs on mobile
**Recommendation**: Break into 2-3 sentences max

#### 2. Collapsible Sections
**Recommendation**: Make long sections collapsible on mobile
- Core Capabilities (6 items)
- FAQ (10 questions) - Already collapsible ✅
- Case Studies

#### 3. Mobile-First CTAs
**Recommendation**: Sticky bottom CTA on mobile
```html
<div class="fixed bottom-0 left-0 right-0 md:hidden">
  <a href="/lien-he" class="block w-full py-4 bg-primary text-white">
    Liên hệ báo giá ngay
  </a>
</div>
```

---

## 🔍 SEO TECHNICAL

### 1. Add More Structured Data

#### LocalBusiness Schema
```json
{
  "@type": "LocalBusiness",
  "name": "Quang Minh",
  "address": {...},
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "21.1234",
    "longitude": "105.5678"
  },
  "openingHours": "Mo-Sa 08:00-17:00"
}
```

#### Review Schema
```json
{
  "@type": "Review",
  "author": "Nguyễn Văn A",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "reviewBody": "..."
}
```

### 2. Add Breadcrumbs
**Current**: No breadcrumbs
**Recommendation**: Add breadcrumb navigation

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Trang chủ</a></li>
    <li>Sản phẩm</li>
  </ol>
</nav>
```

### 3. Canonical URLs
**Current**: Set in BaseLayout ✅
**Recommendation**: Verify all pages have correct canonical

---

## 📊 PERFORMANCE OPTIMIZATION

### 1. Code Splitting
**Recommendation**: Split large components
- CaseStudies component
- TrustBadgesCarousel
- InteractiveMap

### 2. Defer Non-Critical JS
```html
<script defer src="..."></script>
```

### 3. Preload Critical Resources
```html
<link rel="preload" href="/fonts/..." as="font">
<link rel="preload" href="/nha-may.webp" as="image">
```

---

## ✅ IMPLEMENTATION PRIORITY

### High Priority (Do First)
1. ✅ Add Structured Data (Organization, Product) - DONE
2. ⏳ Improve alt text for all images
3. ⏳ Add internal links to product pages
4. ⏳ Convert images to WebP

### Medium Priority (Do Next)
5. ⏳ Add lazy loading for images
6. ⏳ Expand FAQ to 15 questions
7. ⏳ Add H3 subheadings
8. ⏳ Add blog/resource links

### Low Priority (Nice to Have)
9. ⏳ Add LocalBusiness schema
10. ⏳ Add Review schema
11. ⏳ Add breadcrumbs
12. ⏳ Implement responsive images

---

## 📈 EXPECTED IMPACT

### SEO
- **Structured Data**: +20-30% CTR from search
- **Internal Linking**: +15% page views per session
- **Long-tail Keywords**: +25% organic traffic
- **Image Optimization**: +10-15% search ranking

### Performance
- **WebP Images**: -30-40% page size
- **Lazy Loading**: -50% initial load time
- **Code Splitting**: -20% JavaScript bundle size

### User Experience
- **Better Navigation**: +20% engagement
- **Faster Load**: -30% bounce rate
- **Mobile Optimization**: +25% mobile conversions

---

## 🎯 SUCCESS METRICS

### Track These Metrics
1. **Organic Traffic**: Google Analytics
2. **Page Load Speed**: Google PageSpeed Insights
3. **Search Rankings**: Google Search Console
4. **Conversion Rate**: Contact form submissions
5. **Bounce Rate**: Google Analytics
6. **Time on Page**: Google Analytics

### Target Improvements
- Organic traffic: +30% in 3 months
- Page load speed: <2s (currently ~3s)
- Bounce rate: <40% (currently ~50%)
- Conversion rate: +20% in 3 months

---

## 📝 NOTES

- Tất cả recommendations đều dựa trên best practices
- Ưu tiên các thay đổi có impact cao, effort thấp
- Test từng thay đổi trước khi deploy production
- Monitor metrics sau mỗi thay đổi

---

**Date**: 2026-03-05  
**Author**: Kiro AI Assistant  
**Status**: Ready for implementation
