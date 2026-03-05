# HOMEPAGE CTA BUTTONS AUDIT

**Ngày**: 2026-03-05  
**Mục đích**: Audit và tối ưu CTA buttons theo đề xuất Phase 1.5

---

## 📊 HIỆN TRẠNG CTA BUTTONS

### 1. Hero Section
- **Primary**: "Liên hệ báo giá dự án" (red button)
- **Secondary**: "Xem năng lực sản xuất" (white button)

### 2. Company Introduction Section
- **Primary**: "Tìm hiểu thêm"
- **Secondary**: "Liên hệ ngay"

### 3. Products Section
- **Per Product Card**: "Xem chi tiết" (6 cards = 6 CTAs)
- **Bottom**: "Xem tất cả sản phẩm & bảng giá"

### 4. Bảng Giá Section
- **Primary**: "Nhận báo giá chi tiết"
- **Secondary**: "Xem catalog đầy đủ"

### 5. Năng Lực Cốt Lõi Section
- **Primary**: "Liên hệ báo giá dự án"
- **Secondary**: "Xem catalog sản phẩm"

### 6. Why Choose Us Section
- **Primary**: "Tư vấn miễn phí ngay"

### 7. Final CTA Section
- **Primary**: "Yêu cầu báo giá dự án" (button)
- **Secondary**: "Xem năng lực sản xuất" (link)
- **Tertiary**: "Tải catalog sản phẩm" (link)

---

## ⚠️ VẤN ĐỀ

### 1. Quá Nhiều CTA
- Tổng: 15+ CTA buttons
- User không biết nên click vào đâu
- Giảm conversion rate

### 2. Không Nhất Quán
- "Liên hệ báo giá dự án" vs "Nhận báo giá chi tiết" vs "Yêu cầu báo giá dự án"
- "Xem năng lực sản xuất" vs "Tìm hiểu thêm"
- "Xem catalog sản phẩm" vs "Xem catalog đầy đủ" vs "Tải catalog sản phẩm"

### 3. Thiếu Hierarchy Rõ Ràng
- Không phân biệt rõ Primary vs Secondary CTA
- Nhiều Primary CTAs cạnh tranh nhau

---

## 🎯 ĐỀ XUẤT TỐI ƯU

### Primary CTA (Màu đỏ - 3 vị trí)
**Text nhất quán**: "Liên hệ báo giá dự án"

1. **Hero Section** - Giữ nguyên
2. **After Bảng Giá** - Đổi từ "Nhận báo giá chi tiết" → "Liên hệ báo giá dự án"
3. **Final CTA** - Đổi từ "Yêu cầu báo giá dự án" → "Liên hệ báo giá dự án"

### Secondary CTA (Màu trắng/text - 2 vị trí)
**Text nhất quán**: "Xem catalog sản phẩm"

1. **Hero Section** - Đổi từ "Xem năng lực sản xuất" → "Xem catalog sản phẩm"
2. **After Năng Lực Cốt Lõi** - Giữ "Xem catalog sản phẩm"

### Xóa/Gộp CTAs
1. **Company Introduction**: Xóa cả 2 CTAs (không cần thiết)
2. **Products Section**: Giữ "Xem tất cả sản phẩm & bảng giá"
3. **Bảng Giá**: Xóa "Xem catalog đầy đủ" (trùng với Secondary CTA)
4. **Năng Lực Cốt Lõi**: Xóa Primary CTA (đã có ở Bảng Giá)
5. **Why Choose Us**: Xóa "Tư vấn miễn phí ngay"
6. **Final CTA**: Xóa 2 links phụ

---

## 📋 IMPLEMENTATION PLAN

### Step 1: Chuẩn hóa Primary CTA
- [ ] Hero: Giữ "Liên hệ báo giá dự án"
- [ ] Bảng Giá: "Nhận báo giá chi tiết" → "Liên hệ báo giá dự án"
- [ ] Final CTA: "Yêu cầu báo giá dự án" → "Liên hệ báo giá dự án"

### Step 2: Chuẩn hóa Secondary CTA
- [ ] Hero: "Xem năng lực sản xuất" → "Xem catalog sản phẩm"
- [ ] Năng Lực Cốt Lõi: Giữ "Xem catalog sản phẩm"

### Step 3: Xóa CTAs Thừa
- [ ] Company Introduction: Xóa 2 CTAs
- [ ] Bảng Giá: Xóa "Xem catalog đầy đủ"
- [ ] Năng Lực Cốt Lõi: Xóa "Liên hệ báo giá dự án"
- [ ] Why Choose Us: Xóa "Tư vấn miễn phí ngay"
- [ ] Final CTA: Xóa 2 secondary links

---

## 📊 KẾT QUẢ MONG ĐỢI

### Trước
- 15+ CTA buttons
- Không nhất quán
- User confused

### Sau
- 6 CTA buttons (3 Primary + 2 Secondary + 1 Products)
- Nhất quán về text và style
- Clear hierarchy
- Tăng conversion rate

---

## 🎨 CTA HIERARCHY

```
PRIMARY (Red, Bold)
└─ "Liên hệ báo giá dự án"
   ├─ Hero Section
   ├─ After Bảng Giá
   └─ Final CTA

SECONDARY (White/Text, Normal)
└─ "Xem catalog sản phẩm"
   ├─ Hero Section
   └─ After Năng Lực Cốt Lõi

TERTIARY (Link style)
└─ "Xem tất cả sản phẩm & bảng giá"
   └─ After Products Grid
```

---

## ✅ NEXT STEPS

1. Implement Step 1: Chuẩn hóa Primary CTA
2. Implement Step 2: Chuẩn hóa Secondary CTA
3. Implement Step 3: Xóa CTAs thừa
4. Test conversion tracking
5. Monitor user behavior
