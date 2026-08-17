# Sprint 2 Review - Website Mua Vé Xem Phim

**Thời gian:** 11/09/2026  
**Thành phần tham gia:**  
*   Nhóm phát triển: Trần Phan Minh Thuận, Phạm Thanh Tài, Phạm Văn Thư, Phạm Thị Ngọc Trâm.
*   Vai trò đánh giá: Product Owner / Giảng viên hướng dẫn.

---

## 1. Kết quả đạt được (Demo)
Nhóm đã hoàn thành toàn bộ các tính năng cốt lõi của Sprint 2 và demo thành công trước hội đồng:
1.  **Luồng thanh toán tích hợp MoMo & VNPay (Sandbox)**:
    *   Sau khi chọn ghế và click giữ chỗ, người dùng chọn cổng thanh toán MoMo hoặc VNPay.
    *   Hệ thống chuyển hướng mượt mà sang trang thanh toán của MoMo/VNPay.
    *   Sau khi nhập tài khoản test Sandbox và xác nhận thanh toán, người dùng được redirect về trang thông báo thành công của website.
2.  **Luồng xử lý Webhook (IPN)**:
    *   Backend nhận request Webhook từ MoMo/VNPay gửi về.
    *   Xác minh chữ ký số (Checksum) thành công.
    *   Tự động cập nhật Database: Chuyển booking sang `PAID`, ghế sang `BOOKED` vĩnh viễn, giải phóng key khóa trong Redis.
3.  **Luồng xuất vé & Email QR Code**:
    *   Backend tạo thành công QR Code chứa token ký số của vé.
    *   Hệ thống gửi Email xác nhận thông tin vé kèm ảnh QR Code đính kèm ngay lập tức.
    *   Demo quét QR Code bằng máy quét/điện thoại hiển thị đúng thông tin xác thực vé.
4.  **Trang lịch sử đặt vé**:
    *   Người dùng xem được danh sách các vé đã mua và trạng thái tương ứng.
    *   Có nút "Hủy giữ chỗ" đối với các vé chưa thanh toán, click sẽ giải phóng ghế tức thì.

---

## 2. Thống kê User Stories trong Sprint 2

| User Story ID | Nội dung tóm tắt | Trạng thái | Ghi chú |
| :--- | :--- | :---: | :--- |
| **US-05** | Thanh toán vé qua cổng MoMo hoặc VNPay | **Done** | Hoạt động tốt trên môi trường Sandbox. |
| **US-06** | Nhận và xử lý Webhook (IPN) thanh toán | **Done** | Đã verify signature bảo mật thành công. |
| **US-07** | Nhận email xác nhận đặt vé kèm QR Code | **Done** | Email gửi thành công kèm ảnh QR đính kèm. |
| **US-08** | Xem lịch sử đặt vé và hủy giữ chỗ sớm | **Done** | Tích hợp đầy đủ trên Frontend & Backend. |

**Tỷ lệ hoàn thành Sprint 2:** 4/4 User Stories (100% Story Points đã cam kết - 21 Story Points).

---

## 3. Tổng kết toàn dự án sau 2 Sprints
*   **Tổng số User Stories đã hoàn thành:** 8/8 User Stories (100%).
*   **Tổng Story Points hoàn thành:** 42 Story Points.
*   **Sản phẩm cuối cùng:** Đáp ứng đầy đủ các tiêu chí kỹ thuật đề ra, chạy ổn định, giao diện trực quan, giải quyết triệt để bài toán xử lý concurrency bằng Redis và tích hợp cổng thanh toán bảo mật.
*   **Đánh giá từ giảng viên:** Đánh giá cao cơ chế kiểm thử tải (Load Test Concurrency) và tính hoàn chỉnh của tài liệu Agile/Scrum.
