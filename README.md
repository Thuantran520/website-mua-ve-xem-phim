# Website Mua Vé Xem Phim - Dự án Agile/Scrum (Final Exam)

> Dự án báo cáo cuối kỳ môn Công nghệ phần mềm / Quản lý dự án theo mô hình Agile/Scrum.

Dự án phát triển hệ thống **Website Mua Vé Xem Phim** ứng dụng mô hình Agile/Scrum, giải quyết bài toán đặt vé đồng thời (Concurrency Seat Booking) bằng Redis và tích hợp cổng thanh toán trực tuyến MoMo/VNPay.


---

## 👥 Thành viên nhóm phát triển

| Họ và Tên | MSSV | Vai trò chính | Nhiệm vụ chính |
| :--- | :---: | :---: | :--- |
| **Trần Phan Minh Thuận** | `2311553791` | **Scrum Master / Backend Dev** | Thiết kế DB, Viết API quản lý Phim/Suất chiếu, Xử lý Webhook thanh toán MoMo, sinh QR Code. |
| **Phạm Văn Thư** | `2311553334` | **Backend Developer** | Thiết lập Redis Distributed Lock, xử lý Concurrency trùng ghế, tự động giải phóng ghế sau 5 phút. |
| **Phạm Thanh Tài** | `2311553867` | **Frontend Developer** | Vẽ giao diện tương tác Sơ đồ ghế (Seat Map Grid), kết nối API hiển thị ghế, xử lý chuyển hướng MoMo/VNPay. |
| **Phạm Thị Ngọc Trâm** | `2311559516` | **Frontend Developer** | Quản lý State giỏ hàng & đếm ngược 5 phút, UI Lịch sử đặt vé, UI thông báo thành công và hiển thị vé QR Code. |

---

## 📂 Cấu trúc thư mục dự án

Dự án được tổ chức chuẩn hóa để phục vụ cho việc chấm điểm báo cáo cuối kỳ và quản lý mã nguồn:

```text
/ (Root Directory)
├── .github/                      # Quy chuẩn hóa đóng góp mã nguồn (GitHub Templates)
│   ├── ISSUE_TEMPLATE/           # Template tự động khi mở Issue
│   │   ├── user-story.md         # Template mô tả User Story
│   │   └── bug-report.md         # Template mô tả Bug Report
│   └── PULL_REQUEST_TEMPLATE.md  # Template checklist khi tạo Pull Request (PR)
├── docs/                         # Toàn bộ tài liệu dự án
│   ├── agile/                    # Tài liệu quản lý theo Agile/Scrum
│   │   ├── product-backlog.md    # Backlog tổng hợp các User Stories (Sprint 1 & 2)
│   │   ├── sprint-1/             # Tài liệu Sprint 1 (Tuần 1 & 2)
│   │   │   ├── sprint-planning.md
│   │   │   ├── daily-standups.md
│   │   │   ├── sprint-review.md
│   │   │   └── sprint-retro.md
│   │   └── sprint-2/             # Tài liệu Sprint 2 (Tuần 3 & 4)
│   │       ├── sprint-planning.md
│   │       ├── daily-standups.md
│   │       ├── sprint-review.md
│   │       └── sprint-retro.md
│   └── architecture/             # Tài liệu kỹ thuật
│       ├── database-schema.md    # Thiết kế Database Schema chi tiết (PostgreSQL)
│       └── api-specifications.md # Đặc tả các API Endpoints & Webhooks
├── src/                          # Mã nguồn Mini App
│   ├── assets/                   # Nơi chứa hình ảnh, icon tĩnh
│   ├── components/               # Các React/Vue components tái sử dụng
│   ├── pages/                    # Các trang màn hình chính (Trang chủ, Chọn ghế, Thanh toán...)
│   ├── services/                 # Gọi API, tích hợp cổng thanh toán
│   └── utils/                    # Các hàm helper, format tiền tệ, đếm ngược thời gian
├── .gitignore                    # Quản lý các file bỏ qua không push lên Git
├── package.json                  # Script khởi chạy và cấu hình monorepo
└── README.md                     # Tài liệu giới thiệu tổng quan dự án
```

---

## 🚀 Đặc trưng kiến trúc kỹ thuật nổi bật

### 1. Cơ chế khóa ghế Concurrency (Sprint 1)
*   **Vấn đề:** Tránh hiện tượng 2 người dùng thanh toán cùng 1 ghế tại cùng 1 thời điểm (Race Condition).
*   **Giải pháp:** Áp dụng **Distributed Lock** thông qua Redis. Khi chọn ghế, Client gửi yêu cầu đến Backend. Backend sử dụng command `SET key value NX PX 300000` để giữ ghế trong Redis đúng 5 phút (300 giây).
*   **Giải phóng ghế:** Backend sử dụng Redis Keyspace Notifications (`__keyevent@0__:expired`) để bắt sự kiện key hết hạn, tự động chuyển đổi trạng thái ghế về `AVAILABLE` trong DB nếu không thanh toán.

### 2. Tích hợp thanh toán bảo mật & Webhook IPN (Sprint 2)
*   **Thanh toán:** Tích hợp ví điện tử MoMo và cổng VNPay (Sandbox) thông qua cơ chế ký số bảo mật SHA256/SHA512.
*   **Webhook (IPN):** Cho phép hệ thống nhận dữ liệu giao dịch trực tiếp từ MoMo/VNPay gửi về bất đồng bộ, bảo mật bằng kiểm tra chữ ký checksum để cập nhật trạng thái đặt vé vĩnh viễn sang Database PostgreSQL.
*   **QR Code & Email:** Sử dụng thư viện tạo ảnh QR Code chứa mã vé đã ký số (JWT) để tránh gian lận. Vé sẽ được gửi tự động qua email của khách hàng sau khi thanh toán thành công.

---

## 🛠️ Hướng dẫn cài đặt và chạy thử

### 1. Yêu cầu hệ thống
*   Docker & Docker Compose
*   Node.js (phiên bản v18+) hoặc runtime tương đương.

### 2. Khởi chạy Database & Redis (Docker Compose)
```bash
npm run docker:up
```

### 3. Cài đặt Dependencies và khởi chạy dự án
*   **Backend:**
    ```bash
    cd src/backend
    npm install
    npm run dev
    ```
*   **Frontend:**
    ```bash
    cd src/frontend
    npm install
    npm run dev
    ```

---

## 🔗 Liên kết tài liệu Agile
*   Xem [Product Backlog](file:///mnt/c/Agile/docs/agile/product-backlog.md) để biết kế hoạch 8 User Stories chi tiết.
*   Xem [Sprint 1 Planning](file:///mnt/c/Agile/docs/agile/sprint-1/sprint-planning.md) và [Sprint 2 Planning](file:///mnt/c/Agile/docs/agile/sprint-2/sprint-planning.md) để theo dõi phân chia công việc.
*   Xem [Database Schema](file:///mnt/c/Agile/docs/architecture/database-schema.md) và [API Specs](file:///mnt/c/Agile/docs/architecture/api-specifications.md) để nắm bắt thông tin kỹ thuật dự án.
