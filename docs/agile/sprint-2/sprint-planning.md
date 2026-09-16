# Sprint 2 Planning - Website Mua Vé Xem Phim

Tài liệu này chi tiết hóa mục tiêu và bảng phân chia công việc (Sprint Backlog) cho **Sprint 2** của dự án.

## 1. Mục tiêu Sprint 2 (Sprint Goal)
> **Mục tiêu**: Tích hợp hoàn chỉnh cổng thanh toán MoMo/VNPay (môi trường Sandbox), xử lý thành công Webhook (IPN) từ nhà cung cấp dịch vụ để cập nhật trạng thái đặt vé tự động, tạo và gửi vé điện tử QR Code qua email khách hàng, và hoàn thành trang lịch sử giao dịch.

---

## 2. Danh sách phân chia công việc (Sprint Backlog)

### Phân vai trò chủ đạo:
*   **Minh Thuận & Văn Thư**: Đảm nhiệm Tích hợp Payment Gateway, Xử lý Webhook bảo mật, Service gửi mail, Sinh QR Code, Transaction trong Database.
*   **Thanh Tài & Ngọc Trâm**: Đảm nhiệm UI chọn cổng thanh toán, UI hiển thị QR Code, UI lịch sử đặt vé, xử lý flow redirect thanh toán.

| Task ID | Tên Task kỹ thuật chi tiết | Người phụ trách | Trạng thái |
| :--- | :--- | :---: | :---: |
| **TS2-BE-01** | Nghiên cứu tài liệu API MoMo, viết module tạo yêu cầu thanh toán (Request Payment) gửi MoMo Sandbox để nhận link thanh toán. | T. M. Thuận (`2311553791`) | To Do |
| **TS2-BE-02** | Nghiên cứu tài liệu API VNPay, viết module tạo URL thanh toán (Payment URL) gửi cổng VNPay Sandbox. | P. V. Thư (`2311553334`) | To Do |
| **TS2-BE-03** | Xây dựng API Webhook (IPN Endpoint) nhận kết quả thanh toán từ MoMo và VNPay. Thực hiện giải thuật verify chữ ký bảo mật (Signature Verification). | T. M. Thuận (`2311553791`) | To Do |
| **TS2-BE-04** | Viết logic nghiệp vụ cập nhật trạng thái Database trong DB Transaction: Đổi trạng thái Booking sang `PAID`, cập nhật ghế sang `BOOKED` vĩnh viễn, xóa key lock trong Redis. | P. V. Thư (`2311553334`) | To Do |
| **TS2-BE-05** | Viết service sinh mã QR Code (chứa thông tin mã hóa của vé) và tích hợp hệ thống gửi email tự động (Nodemailer) kèm file ảnh QR Code cho khách hàng khi giao dịch thành công. | T. M. Thuận (`2311553791`) | To Do |
| **TS2-BE-06** | Xây dựng API lịch sử đặt vé (`GET /bookings/history`) và API hủy booking sớm (`POST /bookings/cancel`) để giải phóng ghế lập tức. | P. V. Thư (`2311553334`) | To Do |
| **TS2-FE-01** | Thiết kế giao diện hiển thị thông tin hóa đơn (tên phim, suất chiếu, số ghế, tổng tiền) và lựa chọn phương thức thanh toán (MoMo/VNPay). | P. T. Tài (`2311553867`) | To Do |
| **TS2-FE-02** | Thiết kế trang thông báo kết quả thanh toán (Success/Failure Page), hiển thị chi tiết vé và hình ảnh mã QR Code để người dùng kiểm tra. | N. Trâm (`2311559516`) | To Do |
| **TS2-FE-03** | Viết hàm gọi API thanh toán từ backend và thực hiện redirect người dùng sang cổng thanh toán của MoMo/VNPay. | P. T. Tài (`2311553867`) | To Do |
| **TS2-FE-04** | Thiết kế giao diện trang Lịch sử đặt vé của người dùng, hiển thị thông tin chi tiết từng vé đã mua và trạng thái (Đã thanh toán, Đã hủy, Chờ thanh toán). | N. Trâm (`2311559516`) | To Do |
| **TS2-FE-05** | Ghép nối các API lịch sử đặt vé và API hủy giữ chỗ sớm từ Frontend. | P. T. Tài (`2311553867`) | To Do |
| **TS2-FE-06** | Viết tài liệu API hoàn chỉnh của Sprint 2 lên Postman Workspace và tổ chức test luồng thanh toán End-to-End nội bộ nhóm. | Cả nhóm | To Do |

---

## 3. Kế hoạch kiểm thử & DoD cho Sprint 2
- **Môi trường Test**: Sử dụng tài khoản MoMo/VNPay Sandbox được cấp để kiểm thử giao dịch giả lập.
- **Xác thực Webhook**: Dùng công cụ `ngrok` để public backend local nhằm nhận được request IPN trực tiếp từ server MoMo/VNPay.
- **DoD bắt buộc**: Mọi giao dịch thành công phải gửi được Email chứa đúng mã QR Code có thể quét ra chuỗi định danh duy nhất.
