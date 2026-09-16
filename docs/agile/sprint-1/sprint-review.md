# Sprint 1 Review - Website Mua Vé Xem Phim

**Thời gian:** 28/08/2026  
**Thành phần tham gia:**  
*   Nhóm phát triển: Trần Phan Minh Thuận, Phạm Thanh Tài, Phạm Văn Thư, Phạm Thị Ngọc Trâm.
*   Vai trò đánh giá: Product Owner / Giảng viên hướng dẫn (Đóng vai trò Khách hàng).

---

## 1. Kết quả đạt được (Demo)
Nhóm đã hoàn thành các tính năng cốt lõi của Sprint 1 và demo thành công các luồng sau:
1.  **Luồng xem suất chiếu & sơ đồ ghế**: Người dùng tìm phim -> Chọn suất chiếu -> Hiển thị sơ đồ ghế động trực quan theo thời gian thực (realtime update qua Server-Sent Events khi có user khác tương tác).
2.  **Luồng giữ chỗ tạm thời (Seat Lock)**:
    *   Người dùng click chọn ghế trống và bấm "Tiến hành giữ ghế".
    *   Hệ thống khóa ghế trong Redis (TTL 5 phút) và hiển thị bộ đếm ngược (countdown timer) trên UI của người dùng.
    *   Sơ đồ ghế của người dùng khác lập tức đổi màu sang "Bị khóa" (màu đỏ nhạt).
    *   Sau 5 phút, nếu không thanh toán, ghế tự động được giải phóng (hết hạn key Redis) và sơ đồ ghế cập nhật lại trạng thái "Trống" cho mọi người.
3.  **Kiểm thử Concurrency**: Demo chạy script `Autocannon` gửi đồng thời 150 requests đặt cùng 1 ghế tại cùng 1 phần trăm giây. Hệ thống chỉ xử lý thành công đúng 1 request đầu tiên, 149 requests còn lại nhận mã lỗi `409 Conflict` (Không bị trùng lặp ghế).

---

## 2. Thống kê User Stories trong Sprint 1

| User Story ID | Nội dung tóm tắt | Trạng thái | Ghi chú |
| :--- | :--- | :---: | :--- |
| **US-01** | Xem sơ đồ ghế trống/đã đặt thời gian thực | **Done** | Đã nghiệm thu và pass toàn bộ DoD. |
| **US-02** | Khóa giữ chỗ ghế đã chọn trong 5 phút | **Done** | Cơ chế lock Redis chạy tốt dưới tải cao. |
| **US-03** | Đăng nhập/Đăng ký tài khoản (JWT) | **Done** | Cấu hình mã hóa mật khẩu và token JWT đầy đủ. |
| **US-04** | Tìm kiếm và lọc suất chiếu | **Done** | Response API < 200ms. |

**Tỷ lệ hoàn thành Sprint 1:** 4/4 User Stories (100% Story Points đã cam kết - 21 Story Points).

---

## 3. Phản hồi và Đánh giá (Feedback)
*   **Điểm tốt:**
    *   Cơ chế lock ghế bằng Redis xử lý đồng thời rất tốt, chứng minh được bằng kết quả test concurrency trực quan.
    *   Giao diện sơ đồ ghế mượt mà, phản hồi realtime nhanh chóng.
*   **Điểm cần cải tiến:**
    *   UI timer countdown cần hiển thị nổi bật hơn để cảnh báo người dùng khi sắp hết giờ.
    *   Cần tối ưu hóa thêm DB Index cho bảng `Seats` và `Showtimes` để giảm thiểu thời gian truy vấn khi dữ liệu rạp phim lớn lên.

---

## 4. Kế hoạch tiếp theo (Chuẩn bị cho Sprint 2)
*   Bắt đầu tích hợp cổng thanh toán MoMo và VNPay (Nhận kết quả và cập nhật trạng thái đặt vé vĩnh viễn qua Webhook).
*   Thực hiện xuất vé QR Code gửi qua email khách hàng.
