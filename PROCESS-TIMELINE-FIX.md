# Process Timeline Container Fix - PC Layout

## Vấn đề
Section "Quy trình làm việc" (ProcessTimeline) không hiển thị tốt trên PC do:
1. Container `max-w-7xl` giới hạn chiều rộng, khiến horizontal scroll bị cắt
2. Cards không thể scroll hết được trên màn hình lớn
3. Thiếu visual indicators cho scroll position
4. Scrollbar không đẹp và không có smooth scrolling

## Nguyên nhân
- Container `max-w-7xl` được áp dụng cho cả header và scroll container
- Trên desktop, horizontal scroll cần full-width để hiển thị tất cả cards
- Không có scroll indicators để người dùng biết có thể scroll
- Scrollbar mặc định không phù hợp với design

## Giải pháp đã áp dụng

### 1. Tách container cho header và scroll area

**Trước:**
```tsx
<section className="w-full py-16 md:py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    {/* Scroll container */}
  </div>
</section>
```

**Sau:**
```tsx
<section className="w-full py-16 md:py-20 bg-gray-50">
  {/* Header - Centered with max-width */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
    {/* Header content */}
  </div>

  {/* Scroll container - Full width on desktop */}
  <div className="
    process-timeline-scroll
    md:w-full md:overflow-x-auto
    max-w-7xl md:max-w-none mx-auto px-4 sm:px-6 lg:px-8 md:px-0
  ">
    {/* Cards */}
  </div>
</section>
```

### 2. Thêm scroll indicators với click functionality

```tsx
const scrollToCard = (index: number) => {
  const container = scrollContainerRef.current;
  const card = cardsRef.current[index];
  
  if (container && card) {
    const cardLeft = card.offsetLeft;
    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
};
```

Indicators giờ là buttons có thể click:
```tsx
<button
  onClick={() => scrollToCard(index)}
  aria-label={`Scroll to step ${step.number}`}
  className="
    w-2 h-2
    rounded-full
    bg-gray-300
    hover:bg-primary-400
    transition-colors
    cursor-pointer
  "
/>
```

### 3. Custom scrollbar styling

Thêm CSS cho scrollbar đẹp hơn:

```css
/* Process Timeline specific scrollbar */
.process-timeline-scroll::-webkit-scrollbar {
  height: 8px;
}

.process-timeline-scroll::-webkit-scrollbar-thumb {
  background: rgba(23, 94, 173, 0.3);
  border-radius: 4px;
}

.process-timeline-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(23, 94, 173, 0.5);
}

/* Smooth scrolling */
.process-timeline-scroll {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Hide scrollbar on mobile */
@media (max-width: 767px) {
  .process-timeline-scroll::-webkit-scrollbar {
    display: none;
  }
  
  .process-timeline-scroll {
    scrollbar-width: none;
  }
}
```

### 4. Responsive behavior

**Desktop (≥768px):**
- Full-width horizontal scroll
- Custom scrollbar (8px height, primary color)
- Snap points for smooth scrolling
- Click indicators to jump to specific card
- Padding left/right (32px) for visual breathing room

**Mobile (<768px):**
- Vertical stack layout
- Max-width container (7xl)
- No scrollbar
- No indicators (not needed for vertical scroll)
- Full-width cards with gap

## Kết quả

### Desktop
- ✅ Cards có thể scroll hết trên màn hình lớn
- ✅ Smooth scrolling với snap points
- ✅ Visual indicators cho scroll position
- ✅ Click indicators để jump to card
- ✅ Custom scrollbar đẹp với primary color
- ✅ Full-width container không bị giới hạn

### Mobile
- ✅ Vertical stack layout
- ✅ Centered với max-width
- ✅ No scrollbar (clean look)
- ✅ Touch-friendly spacing

## Layout Structure

```
Section (full-width, bg-gray-50)
├── Header Container (max-w-7xl, centered)
│   ├── Title
│   └── Subtitle
│
└── Scroll Area
    ├── Scroll Container (full-width on desktop, max-w-7xl on mobile)
    │   └── Cards Flex Container
    │       ├── Card 1 (320px × 400px)
    │       ├── Card 2
    │       ├── Card 3
    │       ├── Card 4
    │       ├── Card 5
    │       └── Card 6
    │
    └── Scroll Indicators (desktop only)
        ├── Dot 1 (clickable)
        ├── Dot 2
        ├── Dot 3
        ├── Dot 4
        ├── Dot 5
        └── Dot 6
```

## Breakpoints

- **Mobile**: < 768px
  - Vertical stack
  - Max-width container
  - No scrollbar
  - No indicators

- **Desktop**: ≥ 768px
  - Horizontal scroll
  - Full-width container
  - Custom scrollbar
  - Click indicators

## Files đã thay đổi

1. **src/components/ProcessTimeline.tsx**
   - Tách container cho header và scroll area
   - Thêm `scrollContainerRef` và `scrollToCard` function
   - Thay đổi indicators thành clickable buttons
   - Thêm class `process-timeline-scroll`

2. **src/styles/global.css**
   - Thêm custom scrollbar styles cho `.process-timeline-scroll`
   - Thêm smooth scrolling behavior
   - Thêm responsive hiding cho scrollbar trên mobile

## Testing Checklist

- [x] Desktop: Cards scroll hết được
- [x] Desktop: Smooth scrolling với snap points
- [x] Desktop: Click indicators để jump to card
- [x] Desktop: Custom scrollbar hiển thị đúng
- [x] Mobile: Vertical stack layout
- [x] Mobile: No scrollbar
- [x] Mobile: Cards full-width với spacing
- [x] Responsive: Layout chuyển đổi đúng tại 768px
- [x] Accessibility: Indicators có aria-label
- [x] Accessibility: Keyboard navigation works
- [x] Animation: Scroll-triggered animations work
- [x] Build: No errors

## Performance

- Smooth scrolling không ảnh hưởng performance
- Snap points giúp UX tốt hơn
- Intersection Observer cho animations (đã có sẵn)
- No layout shift khi scroll

## Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Lưu ý

- Scrollbar chỉ hiển thị trên desktop
- Indicators chỉ hiển thị trên desktop
- Mobile sử dụng vertical stack (không cần scroll)
- Smooth scrolling có thể bị disable nếu user có `prefers-reduced-motion`
