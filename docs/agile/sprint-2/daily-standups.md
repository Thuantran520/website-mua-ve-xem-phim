# Daily Standup Meetings - Sprint 2

Nhật ký họp Daily Standup của nhóm trong 2 tuần của Sprint 2. Mỗi thành viên báo cáo 3 nội dung chính: Yesterday, Today, Blockers.

---

## Ngày 01/09/2026 (Ngày làm việc thứ 2 của Sprint 2)
*   **Trần Phan Minh Thuận (Backend):**
    *   **Yesterday:** Đọc tài liệu API MoMo và cấu hình ứng dụng Sandbox trên cổng MoMo Partner.
    *   **Today:** Viết Service Backend sinh chữ ký mã hóa `HMAC-SHA256` để gửi request tạo link thanh toán lên MoMo.
    *   **Blockers:** Tài liệu MoMo mới cập nhật cấu trúc JSON payload, mất chút thời gian để đồng bộ lại class model.
*   **Phạm Văn Thư (Backend):**
    *   **Yesterday:** Đọc tài liệu API VNPay, nghiên cứu thuật toán băm checksum `vnp_SecureHash` (HMAC-SHA512).
    *   **Today:** Hiện thực Service Backend tạo link thanh toán VNPay redirect.
    *   **Blockers:** Không có.
*   **Phạm Thanh Tài (Frontend):**
    *   **Yesterday:** Thiết kế giao diện trang chọn cổng thanh toán.
    *   **Today:** Gọi API lấy thông tin hóa đơn và hiển thị giao diện tổng quan hóa đơn đặt vé để người dùng review trước khi thanh toán.
    *   **Blockers:** Cần API Backend trả về tổng tiền tạm tính chính xác để hiển thị trên UI.
*   **Phạm Thị Ngọc Trâm (Frontend):**
    *   **Yesterday:** Vẽ wireframe trang thông báo kết quả thanh toán thành công và trang hiển thị vé.
    *   **Today:** Cài đặt UI của trang Thành công/Thất bại, thiết kế chỗ hiển thị mã QR Code động.
    *   **Blockers:** Không có.

---

## Ngày 04/09/2026 (Ngày làm việc thứ 5 của Sprint 2)
*   **Trần Phan Minh Thuận (Backend):**
    *   **Yesterday:** Hoàn tất endpoint nhận Webhook IPN từ MoMo.
    *   **Today:** Test nhận IPN từ MoMo thông qua `ngrok` local. Viết logic verify Signature phản hồi từ MoMo.
    *   **Blockers:** `ngrok` thỉnh thoảng bị ngắt kết nối đột ngột, đã cài lại bản stable.
*   **Phạm Văn Thư (Backend):**
    *   **Yesterday:** Viết xong endpoint nhận kết quả VNPay Return URL và IPN.
    *   **Today:** Viết Database Transaction: khi nhận IPN thành công -> cập nhật trạng thái Booking sang `PAID`, chuyển trạng thái các ghế liên quan trong DB sang `BOOKED` vĩnh viễn, và xóa key lock tương ứng trong Redis.
    *   **Blockers:** Gặp bug lock deadlock trong DB Postgres do cập nhật nhiều ghế cùng lúc. Đã xử lý bằng cách sort danh sách ID ghế trước khi update.
*   **Phạm Thanh Tài (Frontend):**
    *   **Yesterday:** Tích hợp nút click chuyển hướng sang link thanh toán MoMo/VNPay Sandbox.
    *   **Today:** Thiết kế UI trang Lịch sử đặt vé hiển thị thông tin vé đã mua.
    *   **Blockers:** Không có.
*   **Phạm Thị Ngọc Trâm (Frontend):**
    *   **Yesterday:** Hoàn tất giao diện trang hiển thị vé kèm QR Code.
    *   **Today:** Bắt đầu code UI lịch sử đặt vé, phân chia tab vé "Đã thanh toán" và vé "Đã hủy".
    *   **Blockers:** Cần API lịch sử đặt vé từ Thư để hiển thị dữ liệu thật.

---

## Ngày 09/09/2026 (Ngày làm việc thứ 8 của Sprint 2)
*   **Trần Phan Minh Thuận (Backend):**
    *   **Yesterday:** Tích hợp thư viện sinh ảnh QR Code và Nodemailer.
    *   **Today:** Viết hoàn chỉnh service tự động gửi Mail xác nhận đặt vé kèm ảnh QR Code đính kèm ngay sau khi nhận Webhook IPN hợp lệ.
    *   **Blockers:** Không có. Gmail SMTP yêu cầu bật App Password (mật khẩu ứng dụng) mới cho phép backend gửi mail tự động.
*   **Phạm Văn Thư (Backend):**
    *   **Yesterday:** Hoàn thành API lịch sử đặt vé (`GET /bookings/history`).
    *   **Today:** Viết API hủy booking sớm chủ động trước khi thanh toán để release ghế lập tức khỏi Redis.
    *   **Blockers:** Không có.
*   **Phạm Thanh Tài (Frontend):**
    *   **Yesterday:** Ghép nối API lịch sử đặt vé.
    *   **Today:** Test tích hợp E2E toàn bộ luồng thanh toán cùng Trâm và Backend.
    *   **Blockers:** Không có.
*   **Phạm Thị Ngọc Trâm (Frontend):**
    *   **Yesterday:** Kết nối API hủy booking sớm trên giao diện Lịch sử đặt vé.
    *   **Today:** Cùng Tài kiểm thử luồng hiển thị QR Code và quét thử QR Code bằng điện thoại xem có ra đúng ID vé không.
    *   **Blockers:** Định dạng QR Code cần chứa Token ký số (JWT) để tránh bị làm giả vé tại rạp.
