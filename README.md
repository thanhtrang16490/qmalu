# Nhôm Quang Minh Web

Website công ty Nhôm Quang Minh được xây dựng với Astro và Tailwind CSS.

Domain: https://qmalu.com

## Công nghệ

- **Astro** - Static Site Generator
- **React** - UI Components
- **Tailwind CSS** - Styling
- **Three.js** - 3D Graphics
- **TypeScript** - Type Safety

## Cấu trúc dự án

```
qmalu.com/
├── src/
│   ├── pages/          # Các trang web
│   ├── components/     # React components
│   ├── layouts/        # Layout templates
│   ├── data/          # Dữ liệu tĩnh (products, categories)
│   ├── lib/           # Utilities và helpers
│   └── i18n/          # Đa ngôn ngữ
├── public/            # Static assets
└── dist/              # Build output
```

## Development

```bash
npm install --legacy-peer-deps
npm run dev
```

Mở http://localhost:4321

## Build

```bash
npm run build
```

Build output sẽ ở thư mục `dist/`

## Preview

```bash
npm run preview
```

## Quản lý dữ liệu

Dự án sử dụng dữ liệu tĩnh thay vì database. Để thêm/sửa sản phẩm:

1. Mở file `src/data/products.ts`
2. Thêm/sửa trong mảng `products` hoặc `categories`
3. Build lại dự án

## Deployment

Build output là static files, có thể deploy lên:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- Bất kỳ static hosting nào

## Liên hệ

- Website: https://qmalu.com
- Email: info@qmalu.com
- Hotline: 0947 776 662
