# Deployment Guide for Dokploy/Nixpacks

## Option 1: Using Nixpacks (Recommended for Dokploy)

Dokploy sẽ tự động detect `nixpacks.toml` và build theo cấu hình.

### Cấu hình trong Dokploy:

1. **Build Command**: `npm run build`
2. **Start Command**: `npm start` hoặc `node dist/server/entry.mjs`
3. **Port**: `3000`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=3000
   PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
   ```

### Lưu ý:
- Nixpacks sẽ tự động cài Chromium từ nixPkgs
- Puppeteer sẽ sử dụng Chromium từ system

---

## Option 2: Using Dockerfile

Nếu Nixpacks không hoạt động, sử dụng Dockerfile:

### Cấu hình trong Dokploy:

1. Chọn **Docker** build method
2. **Dockerfile Path**: `./Dockerfile`
3. **Port**: `3000`
4. **Environment Variables**: (same as above)

---

## Testing Locally

### Test with Node:
```bash
npm run build
npm start
```

### Test with Docker:
```bash
docker build -t qmalu-web .
docker run -p 3000:3000 qmalu-web
```

Truy cập: http://localhost:3000

---

## Troubleshooting

### Issue: "Index of dist/client/server/"
**Cause**: Server không chạy, chỉ serve static files

**Solution**: 
- Đảm bảo start command là `node dist/server/entry.mjs`
- Kiểm tra logs để xem server có start không

### Issue: Puppeteer không tìm thấy Chromium
**Cause**: Chromium chưa được cài

**Solution**:
- Với Nixpacks: Đã config trong `nixpacks.toml`
- Với Docker: Đã config trong `Dockerfile`
- Set env var: `PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium`

### Issue: Memory issues
**Solution**: Tăng memory limit trong Dokploy settings (recommend: 1GB+)

---

## Production Checklist

- [ ] Build thành công: `npm run build`
- [ ] Server chạy local: `npm start`
- [ ] Test PDF generation: Thử download PDF từ modal
- [ ] Check logs: Xem có error không
- [ ] Memory: Đảm bảo có đủ RAM (1GB+)
- [ ] Environment variables đã set đúng
