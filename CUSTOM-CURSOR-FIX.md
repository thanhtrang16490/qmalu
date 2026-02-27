# Custom Cursor Fix - Không hiển thị ở một số nơi

## Vấn đề
Custom cursor không hiển thị hoặc bị ẩn ở một số vị trí trên trang web, đặc biệt là:
- Form elements (input, select, checkbox, radio)
- Elements có `cursor: pointer` trong CSS
- Dynamic content được thêm sau khi page load

## Nguyên nhân
1. **CSS Override**: Nhiều elements có `cursor: pointer` trong global.css không được override bởi `cursor: none`
2. **Z-index thấp**: Custom cursor có z-index 9999 có thể bị che bởi một số elements
3. **Thiếu selectors**: Không có event listeners cho tất cả interactive elements (form elements, labels, etc.)
4. **Dynamic content**: Không tự động cập nhật khi có content mới được thêm vào

## Giải pháp đã áp dụng

### 1. Tăng CSS specificity và coverage
```css
/* Trước */
body.custom-cursor-active {
  cursor: none;
}

/* Sau */
body.custom-cursor-active,
body.custom-cursor-active * {
  cursor: none !important;
}
```

Thêm các selectors cho form elements:
- `.form-checkbox`
- `.form-radio`
- `.form-toggle`
- `.form-file`
- `.form-range-thumb`
- `label`
- `[onclick]`

### 2. Tăng z-index
```css
/* Trước */
z-index: 9999;

/* Sau */
z-index: 99999;
```

### 3. Thêm MutationObserver
Tự động phát hiện và cập nhật event listeners khi có dynamic content:

```typescript
const observer = new MutationObserver((mutations) => {
  let shouldUpdate = false;
  
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      shouldUpdate = true;
    }
  });

  if (shouldUpdate) {
    setTimeout(() => {
      updateCustomCursorElements();
    }, 100);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
```

### 4. Mở rộng interactive selectors
Thêm các selectors mới vào danh sách:
```typescript
const interactiveSelectors = [
  'a',
  'button',
  '[role="button"]',
  'input',
  'textarea',
  'select',
  '[draggable="true"]',
  '.draggable',
  '[data-draggable]',
  'label',                    // NEW
  '[onclick]',                // NEW
  '.form-checkbox',           // NEW
  '.form-radio',              // NEW
  '.form-toggle',             // NEW
  '.form-file',               // NEW
  '.form-range-thumb',        // NEW
];
```

## Kết quả
- ✅ Custom cursor hiển thị trên tất cả interactive elements
- ✅ Không bị override bởi CSS `cursor: pointer`
- ✅ Tự động cập nhật khi có dynamic content
- ✅ Z-index đủ cao để hiển thị trên tất cả elements
- ✅ Form elements (checkbox, radio, toggle, file, range) đều hoạt động

## Testing
1. Kiểm tra trên các buttons, links
2. Kiểm tra trên form elements (input, select, checkbox, radio)
3. Kiểm tra trên elements có `cursor: pointer` trong CSS
4. Kiểm tra khi thêm dynamic content (React components, AJAX)
5. Kiểm tra trên mobile (cursor phải ẩn)

## Files đã thay đổi
- `src/lib/custom-cursor.ts` - Main implementation
  - Thêm CSS selectors mới
  - Tăng z-index
  - Thêm MutationObserver
  - Mở rộng interactive selectors
  - Cập nhật cleanup function

## Lưu ý
- Custom cursor chỉ hoạt động trên desktop (hover: hover)
- Tự động ẩn trên touch devices
- Respects prefers-reduced-motion
- Fade out sau 3s không hoạt động
- MutationObserver có thể ảnh hưởng performance nếu có quá nhiều DOM changes

## Cách sử dụng
```typescript
import { initCustomCursor, updateCustomCursorElements } from './lib/custom-cursor';

// Initialize on page load
initCustomCursor();

// Manually update if needed (usually not required due to MutationObserver)
updateCustomCursorElements();
```
