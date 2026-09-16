# Daily Standup Meetings - Sprint 1

Nhật ký họp Daily Standup (10-15 phút hàng ngày) của nhóm trong 2 tuần của Sprint 1. Mỗi thành viên trả lời 3 câu hỏi cốt lõi:
1. *Hôm qua đã làm gì? (Yesterday)*
2. *Hôm nay sẽ làm gì? (Today)*
3. *Có khó khăn/trở ngại gì không? (Blockers)*

---

## Ngày 18/08/2026 (Ngày làm việc thứ 2 của Sprint)
*   **Trần Phan Minh Thuận (Backend):**
    *   **Yesterday:** Nghiên cứu yêu cầu dự án và thống nhất Database schema sơ bộ với Thư.
    *   **Today:** Khởi tạo Database PostgreSQL trên Docker, viết script SQL khởi tạo các bảng: `Movies`, `Showtimes`, `Rooms`, `Seats`.
    *   **Blockers:** Không có.
*   **Phạm Văn Thư (Backend):**
    *   **Yesterday:** Thống nhất mô hình thực thể và cấu trúc DB.
    *   **Today:** Setup khung source code Backend NodeJS (Express, TypeScript), cấu hình Docker Compose chạy Postgres và Redis.
    *   **Blockers:** Lỗi cổng port Redis bị trùng với Redis service đang chạy local, đã sửa bằng cách đổi cổng map trong docker-compose sang 6380.
*   **Phạm Thanh Tài (Frontend):**
    *   **Yesterday:** Nghiên cứu UI một số trang đặt vé phim phổ biến (CGV, Lotte).
    *   **Today:** Khởi tạo project React + Next.js, cài đặt Tailwind CSS và cấu hình Router cơ bản.
    *   **Blockers:** Không có.
*   **Phạm Thị Ngọc Trâm (Frontend):**
    *   **Yesterday:** Phác thảo UI Wireframe cho các trang chủ và trang đặt vé.
    *   **Today:** Thiết kế giao diện Header, Footer và trang chủ danh sách phim.
    *   **Blockers:** Đang chờ Tài setup xong project framework để push code UI lên.

---

## Ngày 21/08/2026 (Ngày làm việc thứ 5 của Sprint)
*   **Trần Phan Minh Thuận (Backend):**
    *   **Yesterday:** Hoàn tất API lấy danh sách suất chiếu (`GET /showtimes`).
    *   **Today:** Bắt đầu viết API khóa giữ chỗ ghế (`POST /bookings/lock-seats`), tích hợp gọi module Redis Lock của Thư.
    *   **Blockers:** Gặp khó khăn ở việc xử lý roll-back trong Postgres nếu một trong các ghế được chọn bị khóa thất bại ở Redis.
*   **Phạm Văn Thư (Backend):**
    *   **Yesterday:** Viết xong API lấy sơ đồ ghế kèm trạng thái (`GET /shows/{showId}/seats`).
    *   **Today:** Triển khai module Redis Distributed Lock sử dụng `SETNX` với TTL 5 phút, cấu hình Redis Keyspace Notification để lắng nghe sự kiện key expire.
    *   **Blockers:** Phải bật config `notify-keyspace-events Ex` trong file `redis.conf` thì sự kiện hết hạn mới được bắn ra.
*   **Phạm Thanh Tài (Frontend):**
    *   **Yesterday:** Hoàn thành vẽ khung cơ bản sơ đồ ghế Seat Map Grid.
    *   **Today:** Viết logic đổi màu trạng thái ghế (Trống: Xám, Đang chọn: Xanh, Đang khóa: Đỏ nhạt, Đã đặt: Đỏ đậm) dựa trên data mock.
    *   **Blockers:** Cần cấu trúc dữ liệu trả về từ API sơ đồ ghế của Thư để mapping chính xác tọa độ hàng/cột.
*   **Phạm Thị Ngọc Trâm (Frontend):**
    *   **Yesterday:** Hoàn thành UI trang danh sách phim.
    *   **Today:** Thiết lập state management bằng Zustand để quản lý danh sách ghế đang chọn và countdown timer 5 phút.
    *   **Blockers:** Không có.

---

## Ngày 26/08/2026 (Ngày làm việc thứ 8 của Sprint)
*   **Trần Phan Minh Thuận (Backend):**
    *   **Yesterday:** Tích hợp thành công API Lock ghế với DB Transaction, giải quyết triệt để lỗi rollback.
    *   **Today:** Viết script test concurrency bằng `K6` hoặc `Autocannon` để test khả năng chống race-condition khi 100+ requests tranh chấp 1 ghế.
    *   **Blockers:** Không có.
*   **Phạm Văn Thư (Backend):**
    *   **Yesterday:** Hoàn thành module tự động giải phóng ghế khi key Redis expire (kết nối webhook hoặc rabbitmq để cập nhật lại DB).
    *   **Today:** Tối ưu hóa hiệu năng truy vấn Redis, hỗ trợ Thuận test concurrency.
    *   **Blockers:** Tần suất listen sự kiện expire đôi khi bị trễ vài giây nếu server tải nặng.
*   **Phạm Thanh Tài (Frontend):**
    *   **Yesterday:** Ghép nối API lấy sơ đồ ghế thực tế từ Backend.
    *   **Today:** Tích hợp cơ chế realtime sử dụng WebSockets/Server-Sent Events (SSE) để cập nhật trạng thái ghế ngay lập tức khi người khác khóa.
    *   **Blockers:** Đang gặp lỗi CORS khi kết nối SSE từ Frontend sang Backend port 5000.
*   **Phạm Thị Ngọc Trâm (Frontend):**
    *   **Yesterday:** Ghép nối API giữ chỗ (`POST /bookings/lock-seats`).
    *   **Today:** Xử lý UX khi countdown timer về 0: Hiển thị modal thông báo hết giờ giữ ghế và tự động reset trạng thái ghế, đưa user về trang sơ đồ ghế sạch.
    *   **Blockers:** Sửa lỗi hiển thị đồng bộ bộ đếm ngược timer với thời gian thực tế còn lại của key trên Redis.
