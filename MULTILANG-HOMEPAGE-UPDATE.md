# Cập nhật Trang chủ Đa ngôn ngữ

## Tóm tắt

Đã áp dụng cấu trúc trang chủ mới (với sections đã được sắp xếp lại) cho tiếng Anh và tiếng Trung.

## Công việc đã thực hiện

### 1. Tạo Script Generate Tự động

Tạo file `scripts/generate-multilang-homepage.js` để tự động generate các trang chủ tiếng Anh và tiếng Trung từ template tiếng Việt.

**Lợi ích:**
- Đảm bảo cấu trúc HTML giống hệt nhau giữa 3 ngôn ngữ
- Dễ dàng cập nhật khi có thay đổi cấu trúc
- Tự động dịch các text quan trọng

### 2. Cấu trúc Sections Mới

Cả 3 ngôn ngữ (Việt, Anh, Trung) đều có cấu trúc sections giống nhau:

#### PHASE 1: ATTENTION & TRUST
1. Hero Section
2. Urgency Banner
3. Trust Badges Carousel
4. Stats Section + Animated Counter (merged)

#### PHASE 2: INTEREST & PRODUCTS
5. Products Section
6. Product 3D Carousel
7. Comparison Slider

#### PHASE 3: DESIRE & SOCIAL PROOF
8. Why Choose Us
9. Video Testimonials
10. Live Metrics Dashboard

#### PHASE 4: DECISION SUPPORT
11. Price Preview
12. Comparison Calculator
13. Process Timeline

#### PHASE 5: ACTION & CONTACT
14. FAQ Section
15. Interactive Map
16. CTA Section

### 3. Translations Đã Áp dụng

Script tự động dịch các text quan trọng:

**Tiếng Anh:**
- SEO titles và descriptions
- Hero section (badge, heading, benefits, CTAs)
- Stats labels
- Section titles
- Product descriptions
- FAQ questions
- CTA buttons

**Tiếng Trung:**
- Tất cả các text tương tự tiếng Anh
- Sử dụng ký tự Trung Quốc giản thể

### 4. Files Đã Tạo/Cập nhật

**Mới:**
- `scripts/generate-multilang-homepage.js` - Script generate tự động
- `src/pages/en/index.astro` - Trang chủ tiếng Anh mới
- `src/pages/cn/index.astro` - Trang chủ tiếng Trung mới

**Backup:**
- `src/pages/en/index.astro.old` - Backup trang cũ tiếng Anh
- `src/pages/cn/index.astro.old` - Backup trang cũ tiếng Trung

### 5. Kết quả Build

✅ Build thành công
✅ Không có lỗi
✅ Tất cả 3 trang chủ (vi, en, cn) được generate đúng

## Cách sử dụng Script

Khi cần cập nhật cấu trúc trang chủ cho tất cả ngôn ngữ:

```bash
# 1. Cập nhật file tiếng Việt
# src/pages/index.astro

# 2. Chạy script để generate lại tiếng Anh và tiếng Trung
node scripts/generate-multilang-homepage.js

# 3. Build để kiểm tra
npm run build
```

## Lưu ý

### Translations Cần Bổ sung Thủ công

Một số nội dung cần được dịch thủ công vì phức tạp hơn:

1. **Product descriptions** - Mô tả chi tiết sản phẩm
2. **Testimonials** - Đánh giá khách hàng
3. **FAQ answers** - Câu trả lời chi tiết
4. **Company info** - Thông tin công ty

### Cập nhật Translations

Để thêm translations mới vào script:

1. Mở `scripts/generate-multilang-homepage.js`
2. Thêm vào object `translations.en` hoặc `translations.cn`
3. Format: `"Text tiếng Việt": "Translated text"`
4. Chạy lại script

### Components Đa ngôn ngữ

Các components React/Astro sử dụng data từ:
- `src/data/homepage-content.ts` - Nội dung chính
- `src/data/company-info.ts` - Thông tin công ty
- `src/i18n/homepage-translations.ts` - Translations

Nếu cần đa ngôn ngữ cho components, cần tạo:
- `src/data/homepage-content-en.ts`
- `src/data/homepage-content-cn.ts`

## URLs

- Tiếng Việt: `/`
- Tiếng Anh: `/en/`
- Tiếng Trung: `/cn/`

## Testing

### Manual Testing

1. **Tiếng Việt:** http://localhost:4321/
2. **Tiếng Anh:** http://localhost:4321/en/
3. **Tiếng Trung:** http://localhost:4321/cn/

### Kiểm tra

- ✅ Cấu trúc sections giống nhau
- ✅ All components render correctly
- ✅ Responsive design works
- ✅ Interactive features work
- ✅ SEO meta tags correct
- ✅ Canonical URLs correct

## Cải tiến Tương lai

### 1. Tạo Data Files Riêng

Tạo các file data riêng cho từng ngôn ngữ:

```typescript
// src/data/homepage-content-en.ts
export const homepageContentEn = {
  processTimeline: { ... },
  animatedCounter: { ... },
  // ...
}

// src/data/homepage-content-cn.ts
export const homepageContentCn = {
  processTimeline: { ... },
  animatedCounter: { ... },
  // ...
}
```

### 2. Dynamic Import Based on Language

```astro
---
const lang = 'en' // or 'cn'
const { homepageContent } = await import(`../data/homepage-content-${lang}.ts`)
---
```

### 3. Centralized Translation System

Sử dụng i18n library như `astro-i18next` hoặc tạo custom translation system.

### 4. Automated Translation

Tích hợp API dịch tự động (Google Translate API, DeepL) cho nội dung mới.

## Ngày hoàn thành

27/02/2026

## Trạng thái

✅ HOÀN THÀNH - Đã áp dụng cấu trúc mới cho cả 3 ngôn ngữ
