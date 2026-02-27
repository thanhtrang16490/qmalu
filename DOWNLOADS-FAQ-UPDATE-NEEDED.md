# Cập Nhật Cần Thiết: Trang Downloads và FAQ

## Tóm Tắt

Đã phát hiện nội dung cũ về "thức ăn chăn nuôi" (animal feed) còn tồn tại trong:
1. Trang Downloads (đã sửa ✅)
2. Trang FAQ (cần sửa ⚠️)

## 1. Trang Downloads - ĐÃ SỬA ✅

### Files đã cập nhật:
- `src/pages/tai-lieu.astro` ✅
- `src/pages/en/downloads.astro` ✅  
- `src/pages/cn/downloads.astro` ✅

### Thay đổi:
- ❌ "Pig Feed, Poultry Feed và Fish Feed"
- ✅ "A6005-T6 aluminum products for solar energy"

- ❌ "nhôm heo thịt" 
- ✅ "nhôm A6005-T6"

- ❌ "HACCP, GMP certificates"
- ✅ "JIS A6005, Test Results certificates"

## 2. Trang FAQ - CẦN SỬA ⚠️

### File cần cập nhật:
`src/i18n/faq-translations.ts`

### Nội dung cần thay đổi:

#### Tiếng Việt (Vietnamese):
```typescript
// CŨ - SAI:
"Quang Minh cung cấp 3 dòng sản phẩm chính: Pig Feed, Poultry Feed và Fish Feed"
"Liều lượng phụ thuộc vào loại vật nuôi, độ tuổi và mục đích sản xuất nhôm"
"Sản phẩm có thể kết hợp với các nguồn thức ăn khác"

// MỚI - ĐÚNG:
"Quang Minh cung cấp nhôm công nghiệp A6005-T6: thanh ray solar, kẹp giữa/biên, chân L, phụ kiện tiếp địa"
"Liều lượng phụ thuộc vào kích thước dự án, loại hệ thống và yêu cầu kỹ thuật"
"Sản phẩm có thể kết hợp với các hệ thống mounting khác nhau"
```

#### Tiếng Anh (English):
```typescript
// OLD - WRONG:
"Pig Feed, Poultry Feed, and Fish Feed"
"Dosage depends on the type of aluminum industry, age and farming purpose"
"Can products be combined with other feeds?"

// NEW - CORRECT:
"A6005-T6 industrial aluminum: solar rails, mid/end clamps, L-brackets, grounding accessories"
"Specifications depend on project size, system type and technical requirements"
"Can products be combined with other mounting systems?"
```

#### Tiếng Trung (Chinese):
```typescript
// 旧 - 错误:
"猪饲料、家禽饲料和鱼饲料"
"用量取决于牲畜类型、年龄和养殖目的"
"产品可以与其他饲料来源混合使用吗？"

// 新 - 正确:
"A6005-T6工业铝材：太阳能导轨、中间夹/端夹、L型支架、接地配件"
"规格取决于项目规模、系统类型和技术要求"
"产品可以与其他安装系统结合使用吗？"
```

## 3. Các Câu Hỏi FAQ Cần Cập Nhật

### Sản phẩm (Products):
1. ✅ "Quang Minh cung cấp những loại sản phẩm nào?"
   - Đổi từ "Pig Feed, Poultry Feed, Fish Feed" 
   - Sang "Nhôm A6005-T6 cho năng lượng mặt trời"

2. ✅ "Sản phẩm có chứng nhận chất lượng không?"
   - Đổi từ "HACCP, GMP"
   - Sang "JIS A6005, ISO 9001:2015"

3. ✅ "Sản phẩm có hạn sử dụng bao lâu?"
   - Đổi từ "6 tháng kể từ ngày sản xuất"
   - Sang "Không có hạn sử dụng (nhôm công nghiệp)"

### Kỹ thuật (Technical):
1. ✅ "Làm sao để bảo quản sản phẩm đúng cách?"
   - Đổi từ "Bảo quản nơi khô ráo, tránh ẩm"
   - Sang "Bảo quản nơi khô ráo, tránh ăn mòn"

2. ✅ "Liều lượng sử dụng như thế nào?"
   - Đổi từ "Liều lượng phụ thuộc vào loại vật nuôi"
   - Sang "Số lượng phụ thuộc vào kích thước dự án"

3. ✅ "Sản phẩm có thể kết hợp với thức ăn khác không?"
   - Đổi từ "Kết hợp với các nguồn thức ăn khác"
   - Sang "Kết hợp với các hệ thống mounting khác"

## 4. Hướng Dẫn Cập Nhật

### Bước 1: Cập nhật file FAQ translations
```bash
# Mở file
code src/i18n/faq-translations.ts

# Tìm và thay thế tất cả:
- "Pig Feed" → "Solar Rails"
- "Poultry Feed" → "Solar Clamps"  
- "Fish Feed" → "Mounting Brackets"
- "vật nuôi" → "dự án solar"
- "thức ăn" → "nhôm"
- "HACCP" → "JIS A6005"
- "GMP" → "Test Results"
```

### Bước 2: Build và kiểm tra
```bash
npm run build
grep -r "Pig Feed\|Poultry Feed\|Fish Feed" dist/ | wc -l
# Kết quả mong đợi: 0
```

### Bước 3: Verify trên browser
- Kiểm tra `/cau-hoi-thuong-gap`
- Kiểm tra `/en/faq`
- Kiểm tra `/cn/faq`

## 5. Checklist

### Downloads Pages ✅
- [x] `/tai-lieu` - Vietnamese
- [x] `/en/downloads` - English
- [x] `/cn/downloads` - Chinese

### FAQ Pages ⚠️
- [ ] `src/i18n/faq-translations.ts` - Cần cập nhật
- [ ] `/cau-hoi-thuong-gap` - Sẽ tự động cập nhật sau khi sửa translations
- [ ] `/en/faq` - Sẽ tự động cập nhật sau khi sửa translations
- [ ] `/cn/faq` - Sẽ tự động cập nhật sau khi sửa translations

## 6. Ước Tính Thời Gian

- Cập nhật FAQ translations: 15-20 phút
- Build và test: 5 phút
- Tổng: ~25 phút

## 7. Lưu Ý Quan Trọng

⚠️ File `src/i18n/faq-translations.ts` rất dài (>300 dòng)
⚠️ Cần cẩn thận khi tìm và thay thế để không làm hỏng cấu trúc JSON
⚠️ Nên backup file trước khi sửa

## 8. Kết Luận

Trang Downloads đã được cập nhật hoàn toàn. Trang FAQ cần được cập nhật để loại bỏ hoàn toàn các tham chiếu đến "thức ăn chăn nuôi" và thay thế bằng nội dung về "nhôm công nghiệp A6005-T6 cho năng lượng mặt trời".

---

**Date:** 2025-02-27
**Status:** Downloads ✅ | FAQ ⚠️ (Cần cập nhật)
**Priority:** 🟡 MEDIUM - Nên hoàn thành trong 1-2 ngày
