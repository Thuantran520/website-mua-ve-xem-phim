# Sprint 1 Planning - Website Mua Vé Xem Phim

Tài liệu này chi tiết hóa mục tiêu và bảng phân chia công việc (Sprint Backlog) cho **Sprint 1** của dự án.

## 1. Mục tiêu Sprint 1 (Sprint Goal)
> **Mục tiêu**: Xây dựng nền tảng hệ thống cơ bản, thiết kế cơ sở dữ liệu, phát triển giao diện sơ đồ ghế tương tác thời gian thực và hiện thực hóa cơ chế khóa giữ ghế tạm thời (lock 5 phút) xử lý đồng thời tốt (anti-race condition) sử dụng Redis.

---

## 2. Danh sách phân chia công việc (Sprint Backlog)

### Phân vai trò chủ đạo:
*   **Minh Thuận & Văn Thư**: Đảm nhiệm Backend, Database, Cơ chế Redis Lock, WebSocket API.
*   **Thanh Tài & Ngọc Trâm**: Đảm nhiệm Frontend UI/UX, Sơ đồ ghế tương tác, tích hợp API, Count-down timer.

| Task ID | Tên Task kỹ thuật chi tiết | Người phụ trách | Trạng thái |
| :--- | :--- | :---: | :---: |
| **TS1-BE-01** | Thiết kế Database Schema (PostgreSQL/MySQL) cho các thực thể: Movies, Showtimes, Rooms, Seats, Bookings, Users. | T. M. Thuận (`2311553791`) | To Do |
| **TS1-BE-02** | Khởi tạo cấu trúc dự án Backend (Node.js/Go/Java), setup Docker Compose chạy Postgres, Redis và RabbitMQ. | P. V. Thư (`2311553334`) | To Do |
| **TS1-BE-03** | Viết các REST API truy vấn danh sách Phim, lịch chiếu, và chi tiết suất chiếu (GET `/movies`, GET `/showtimes`). | T. M. Thuận (`2311553791`) | To Do |
| **TS1-BE-04** | Viết API lấy sơ đồ ghế và trạng thái tương ứng của suất chiếu (GET `/shows/{showId}/seats`). | P. V. Thư (`2311553334`) | To Do |
| **TS1-BE-05** | Thiết lập module Redis Client và hiện thực hàm Lock/Unlock ghế sử dụng Distributed Lock (`SET key value NX PX`). | P. V. Thư (`2311553334`) | To Do |
| **TS1-BE-06** | Xây dựng API POST `/bookings/lock-seats` nhận danh sách ghế cần khóa, validate trạng thái và tạo lock trong Redis với TTL 5 phút. Xử lý logic rollback nếu có ghế bị trùng. | T. M. Thuận (`2311553791`) | To Do |
| **TS1-BE-07** | Cài đặt Event Listener lắng nghe Keyspace Notification của Redis hoặc dùng Message Queue để tự động giải phóng ghế khi hết hạn 5 phút lock (nếu chưa thanh toán). | P. V. Thư (`2311553334`) | To Do |
| **TS1-BE-08** | Viết script Integration Test (kịch bản dùng K6 hoặc Autocannon) giả lập 100+ users đồng thời book trùng 1 ghế để xác minh cơ chế phòng chống Race Condition. | T. M. Thuận (`2311553791`) | To Do |
| **TS1-FE-01** | Khởi tạo source code Frontend (React/Next.js/Vue.js), setup linter, cấu hình routing và UI framework (Tailwind/Bootstrap nếu có). | P. T. Tài (`2311553867`) | To Do |
| **TS1-FE-02** | Thiết kế UI trang chủ hiển thị danh sách phim đang chiếu/sắp chiếu và giao diện lọc suất chiếu theo ngày/rạp. | N. Trâm (`2311559516`) | To Do |
| **TS1-FE-03** | Xây dựng component sơ đồ ghế (Seat Map Grid) tương tác: cho phép chọn ghế, hiển thị trạng thái ghế bằng màu sắc trực quan (Trống, Đang chọn, Bị khóa, Đã bán). | P. T. Tài (`2311553867`) | To Do |
| **TS1-FE-04** | Tích hợp State Management (Zustand/Redux) để quản lý danh sách ghế đang chọn cục bộ và xử lý bộ đếm ngược (Countdown Timer) 5 phút khi ghế được khóa thành công. | N. Trâm (`2311559516`) | To Do |
| **TS1-FE-05** | Tích hợp API hiển thị danh sách phim/suất chiếu và lấy sơ đồ ghế thời gian thực truyền vào component Seat Map. | P. T. Tài (`2311553867`) | To Do |
| **TS1-FE-06** | Gọi API POST `/bookings/lock-seats` khi click "Tiến hành giữ ghế". Xử lý hiển thị thông báo lỗi nếu ghế đã bị người khác khóa trước đó và reload lại sơ đồ ghế. | N. Trâm (`2311559516`) | To Do |
| **TS1-FE-07** | Triển khai kết nối Client-side tới Server qua Server-Sent Events (SSE) hoặc WebSockets để nhận cập nhật sơ đồ ghế real-time từ các client khác. | P. T. Tài & N. Trâm | To Do |

---

## 3. Kế hoạch kiểm thử & Tích hợp liên tục (CI) cho Sprint 1
- **Kiểm thử đơn vị (Unit Test)**: Backend chạy `jest` / `go test` đảm bảo các hàm logic lock ghế trong Redis hoạt động chính xác.
- **Kiểm thử tích hợp (Integration Test)**: Frontend call mock API để test luồng đếm ngược và hiển thị thông báo khóa ghế.
- **Review**: Tổ chức họp Daily Standup (10-15 phút hàng ngày) để cập nhật tiến độ và giải quyết blocker nhanh nhất.
