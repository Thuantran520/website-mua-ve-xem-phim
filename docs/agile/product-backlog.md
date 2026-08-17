# Product Backlog - Website Mua Vé Xem Phim

Tài liệu này lưu trữ danh sách các tính năng (User Stories) được ưu tiên cho dự án **Website Mua Vé Xem Phim** trong cả 2 Sprints.

## 1. Bảng Product Backlog

| ID | User Story | Độ ưu tiên | Story Points | Definition of Done (DoD) |
| :--- | :--- | :---: | :---: | :--- |
| **US-01** | Là một **Khách mua vé**, tôi muốn **xem sơ đồ ghế trống/đã đặt** của một suất chiếu theo thời gian thực, để **lựa chọn vị trí ghế phù hợp**. | High | 5 | - API GET `/shows/{id}/seats` trả về danh sách ghế và trạng thái chính xác.<br>- UI hiển thị sơ đồ ghế động, đổi màu theo trạng thái (Trống, Đang chọn, Đang khóa, Đã bán).<br>- Tự động reload trạng thái ghế qua WebSockets/SSE. |
| **US-02** | Là một **Khách mua vé**, tôi muốn **khóa giữ chỗ ghế đã chọn trong 5 phút**, để **yên tâm hoàn thành thủ tục thanh toán mà không bị người khác giành mất**. | High | 8 | - API POST `/bookings/lock-seats` lock thành công ghế trong Redis bằng Distributed Lock (TTL 5 phút).<br>- Trả về mã lỗi xung đột nếu ghế đã bị lock hoặc đã thanh toán.<br>- Giải phóng lock tự động sau 5 phút nếu không nhận được thanh toán.<br>- Đảm bảo xử lý đồng thời (Concurrency) tốt dưới tải 100+ requests/giây trùng ghế. |
| **US-03** | Là một **Khách mua vé**, tôi muốn **đăng nhập/đăng ký tài khoản và cập nhật thông tin**, để **lưu lịch sử đặt vé và nhận các thông tin ưu đãi**. | Medium | 3 | - API Đăng ký/Đăng nhập bằng JWT.<br>- Mật khẩu được mã hóa an toàn bằng `bcrypt`.<br>- UI form Đăng ký/Đăng nhập có validation đầy đủ. |
| **US-04** | Là một **Khách mua vé**, tôi muốn **tìm kiếm và lọc suất chiếu theo phim, rạp và khung giờ**, để **nhanh chóng chọn suất chiếu mong muốn**. | High | 5 | - API tìm kiếm suất chiếu theo bộ lọc (phim, rạp, ngày chiếu, khung giờ).<br>- Giao diện trang chủ và trang chi tiết phim hiển thị danh sách suất chiếu trực quan.<br>- Trả về kết quả tìm kiếm < 500ms. |
| **US-05** | Là một **Khách mua vé**, tôi muốn **thanh toán vé qua cổng MoMo hoặc VNPay**, để **hoàn tất giao dịch đặt vé một cách nhanh chóng và an toàn**. | High | 8 | - Tích hợp SDK/API của MoMo và VNPay.<br>- Redirect người dùng sang trang thanh toán thành công.<br>- Nhận và lưu trữ thông tin giao dịch tạm thời với trạng thái PENDING. |
| **US-06** | Là một **Hệ thống**, tôi muốn **nhận kết quả giao dịch qua Webhook (IPN)**, để **cập nhật trạng thái vé tức thời và chính xác kể cả khi người dùng đóng trình duyệt**. | High | 5 | - Cài đặt endpoint nhận IPN/Webhook từ MoMo và VNPay.<br>- Xác thực chữ ký số (Checksum/Signature) từ cổng thanh toán.<br>- Cập nhật trạng thái Booking thành PAID, chuyển ghế sang trạng thái BOOKED vĩnh viễn trong Database, đồng thời xóa lock trong Redis. |
| **US-07** | Là một **Khách mua vé**, tôi muốn **nhận email xác nhận đặt vé kèm QR Code**, để **dễ dàng check-in soát vé khi đến rạp**. | High | 5 | - Hệ thống tự động tạo mã QR Code chứa chuỗi định danh vé (đã mã hóa/ký số).<br>- Gửi email tự động (Nodemailer/SendGrid) kèm thông tin chi tiết vé và hình ảnh QR Code ngay khi thanh toán thành công.<br>- UI hiển thị trang vé thành công kèm mã QR Code. |
| **US-08** | Là một **Khách mua vé**, tôi muốn **xem lịch sử đặt vé và thực hiện hủy giữ chỗ sớm**, để **quản lý chi tiêu và giải phóng ghế cho người khác nếu đổi ý**. | Low | 3 | - UI lịch sử đặt vé hiển thị danh sách vé PENDING, PAID, CANCELLED.<br>- API hủy giữ chỗ chủ động, xóa ngay key lock trong Redis và chuyển booking sang CANCELLED trước khi hết 5 phút. |

---

## 2. Tiêu chuẩn Definition of Done (DoD) chung cho toàn bộ dự án
- **Mã nguồn**: Code sạch (Clean Code), không có warning từ Linter, đã được refactor và được review chéo (Pull Request có ít nhất 1 phê duyệt).
- **Kiểm thử**: Đã chạy qua Unit Test (Backend coverage > 70%) và kiểm thử thủ công trên môi trường Development.
- **Triển khai**: Đã deploy lên môi trường Staging/Development ổn định.
- **Tài liệu**: API được viết tài liệu đầy đủ trên Postman/Swagger.
