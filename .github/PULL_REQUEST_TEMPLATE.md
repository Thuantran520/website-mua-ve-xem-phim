## 📝 Mô tả Pull Request
Mô tả chi tiết những thay đổi trong PR này (Ví dụ: Thêm API đặt vé, vẽ UI sơ đồ ghế, tối ưu hóa locking Redis...).

- Liên kết tới Issue: Fixes #[Nhập số Issue]

## 🛠️ Những thay đổi chính
- [ ] Thiết kế/Thay đổi cấu trúc database
- [ ] Thêm API mới hoặc sửa logic Backend
- [ ] Phát triển component UI hoặc sửa CSS Frontend
- [ ] Cập nhật file cấu hình hoặc Dockerfile/Docker Compose

## 🧪 Quy trình kiểm thử
Mô tả cách thức bạn đã test đoạn code này:
1. Chạy lệnh test: `npm run test`
2. Test thủ công: Truy cập `/booking` -> Click chọn 2 ghế -> Click nút khóa -> Xác nhận Redis lưu đúng key với TTL 5 phút.

## Checklist trước khi merge
- [ ] Code của tôi tuân thủ các quy chuẩn coding standard của dự án.
- [ ] Tôi đã tự review code (self-review) trước khi gửi PR.
- [ ] Đã giải quyết hết các xung đột (conflict) nếu có.
- [ ] Đã cập nhật tài liệu liên quan (API doc, Database schema) nếu thay đổi logic.
