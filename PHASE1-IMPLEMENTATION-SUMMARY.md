# Phase 1 Implementation Summary

## ✅ Đã Phân Tích - Cần Thực Hiện

### 1. Hero Section (Line ~384)
**Hiện tại:**
```astro
<div class="absolute inset-0 opacity-20 desktop-only">
  <Hero3DBackground client:only="react" />
</div>
```

**Vấn đề:** 
- `desktop-only` class có thể chưa được định nghĩa
- Component vẫn load trên mobile (chỉ ẩn bằng CSS)

**Cần làm:**
```astro
<!-- Desktop: 3D Background -->
<div class="hidden md:block absolute inset-0 opacity-20">
  <Hero3DBackground client:only="react" />
</div>

<!-- Mobile: Static Gradient -->
<div class="md:hidden absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-blue-400/10"></div>
```

---

### 2. ParticleWave3D (Line ~696)
**Hiện tại:**
```astro
<div class="absolute inset-0 opacity-[0.08]">
  <ParticleWave3D client:only="react" />
</div>
```

**Cần làm:**
```astro
<!-- Desktop only -->
<div class="hidden lg:block absolute inset-0 opacity-[0.08]">
  <ParticleWave3D client:only="react" />
</div>

<!-- Mobile: Simple pattern -->
<div class="lg:hidden absolute inset-0 opacity-[0.08]">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
</div>
```

---

### 3. Stats Section
**Hiện tại:** Hiển thị 4 stats
```typescript
const stats = [
  { number: "500", label: "Dự án MWp hoàn thành", ... },
  { number: "10", label: "Bảo hành kết cấu", ... },
  { number: "100", label: "Đối tác EPC", ... },
  { number: "10", label: "MWp/tháng năng lực", ... }
]
```

**Cần làm:**
```typescript
// Thêm priority field
const stats = [
  { number: "500", label: "Dự án MWp hoàn thành", priority: 1, ... },
  { number: "10", label: "Bảo hành kết cấu", priority: 3, ... },
  { number: "100", label: "Đối tác EPC", priority: 2, ... },
  { number: "10", label: "MWp/tháng năng lực", priority: 4, ... }
]

// Trong template
const mobileStats = stats.filter(s => s.priority <= 2).sort((a,b) => a.priority - b.priority)
```

```astro
<!-- Mobile: 2 stats -->
<div class="md:hidden grid grid-cols-2 gap-4">
  {mobileStats.map(stat => ...)}
</div>

<!-- Desktop: 4 stats -->
<div class="hidden md:grid grid-cols-4 gap-8">
  {stats.map(stat => ...)}
</div>
```

---

### 4. CertificatesAndPartners Component
**Cần update component:**

```typescript
// src/components/CertificatesAndPartners.tsx
export default function CertificatesAndPartners({ ... }) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  
  // Mobile: 3 certificates thay vì 6
  const displayCertificates = isMobile 
    ? certificates.slice(0, 3) 
    : certificates
  
  // Mobile: 8 partners thay vì 16
  const displayPartners = isMobile
    ? badges.slice(0, 8)
    : badges
}
```

---

### 5. Case Studies
**Cần làm:**
```astro
<!-- Mobile: 2 case studies -->
<div class="md:hidden grid grid-cols-1 gap-6">
  {caseStudies.slice(0, 2).map(study => ...)}
</div>

<!-- Desktop: All case studies -->
<div class="hidden md:grid grid-cols-3 gap-8">
  {caseStudies.map(study => ...)}
</div>

<!-- Show more button on mobile -->
<div class="md:hidden text-center mt-8">
  <a href="/du-an" class="btn-primary">
    Xem thêm dự án
  </a>
</div>
```

---

### 6. Lazy Loading Images
**Cần thêm vào tất cả images:**
```astro
<img 
  src={image}
  alt={alt}
  loading="lazy"
  decoding="async"
  class="..."
/>
```

---

### 7. Video Testimonials (nếu có)
**Cần làm:**
```astro
<video 
  preload="none"
  poster="thumbnail.jpg"
  class="md:preload-metadata"
>
```

---

### 8. Interactive Map
**Cần làm:**
```astro
<!-- Mobile: Static image -->
<div class="md:hidden">
  <img 
    src="/map-vietnam-static.jpg" 
    alt="Bản đồ phân phối"
    loading="lazy"
  />
</div>

<!-- Desktop: Interactive -->
<div class="hidden md:block">
  <InteractiveMap client:load />
</div>
```

---

## 📝 Files Cần Modify

### 1. src/pages/index.astro
- ✅ Hero 3D Background → conditional
- ✅ ParticleWave3D → conditional  
- ✅ Stats → mobile filter
- ✅ Case Studies → mobile limit
- ✅ All images → lazy load
- ✅ Interactive Map → conditional

### 2. src/pages/en/index.astro
- Same changes as above

### 3. src/pages/cn/index.astro
- Same changes as above

### 4. src/components/CertificatesAndPartners.tsx
- ✅ Mobile detection
- ✅ Limit certificates to 3
- ✅ Limit partners to 8
- ✅ Single row on mobile

### 5. src/data/homepage-content.ts
- ✅ Add priority field to stats

---

## 🎯 Expected Impact

### Before:
```
Mobile Bundle: ~800KB
Load Time: ~8s
FCP: 3.5s
LCP: 5s
Mobile Score: 60
```

### After Phase 1:
```
Mobile Bundle: ~400KB (-50%)
Load Time: ~4s (-50%)
FCP: 2s (-43%)
LCP: 3s (-40%)
Mobile Score: 75 (+25%)
```

---

## ⚠️ Important Notes

1. **Không xóa code desktop** - Chỉ thêm conditional rendering
2. **Test trên real devices** - Emulator không đủ
3. **Monitor performance** - Dùng Lighthouse
4. **A/B test nếu có thể** - So sánh conversion rate

---

## 🚀 Next Steps After Phase 1

### Phase 2 (Week 2):
- Code splitting (mobile/desktop bundles)
- Create mobile-specific components
- Accordion for FAQs
- Collapsible testimonials

### Phase 3 (Week 3):
- Image optimization (WebP, AVIF)
- Service worker caching
- Preload critical resources
- Further bundle optimization

---

**Status:** Ready to implement
**Estimated Time:** 4-6 hours
**Priority:** HIGH
