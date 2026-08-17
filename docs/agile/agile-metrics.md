# Agile Metrics & Time Tracking - Website Mua Vé Xem Phim

Tài liệu này lưu trữ các số liệu quản lý dự án (Agile Metrics), ước lượng thời gian và theo dõi hiệu suất làm việc của nhóm qua 2 Sprints.

---

## 1. Quy trình ước lượng Story Points (Planning Poker)
Nhóm áp dụng phương pháp **Planning Poker** với dãy số Fibonacci rút gọn (1, 2, 3, 5, 8, 13) để chấm điểm cho các User Stories dựa trên 3 tiêu chí:
1.  **Độ phức tạp** (Complexity of logic)
2.  **Khối lượng công việc** (Amount of work)
3.  **Mức độ rủi ro/chưa rõ ràng** (Risk or uncertainty)

*   **1 - 2 SP:** Task rất đơn giản, giao diện tĩnh hoặc cấu hình cơ bản.
*   **3 - 5 SP:** Task có logic nghiệp vụ trung bình, cần kết nối API, database.
*   **8 SP:** Task cốt lõi, logic phức tạp, yêu cầu bảo mật cao hoặc xử lý đồng thời (như Redis Lock, tích hợp cổng thanh toán).

---

## 2. Bảng theo dõi thời gian thực tế (Time Tracking)

Dưới đây là bảng tổng hợp giờ ước lượng (Estimated Hours - Est) và giờ thực tế làm việc (Actual Hours - Act) của từng thành viên trong suốt dự án.

### Sprint 1
| Task ID | Thành viên phụ trách | Nhiệm vụ chính | Est (Giờ) | Act (Giờ) | Chênh lệch |
| :--- | :---: | :--- | :---: | :---: | :---: |
| **TS1-BE-01** | T. M. Thuận | Thiết kế Database Schema | 6 | 5 | -1 |
| **TS1-BE-03** | T. M. Thuận | API Phim/Suất chiếu | 12 | 14 | +2 |
| **TS1-BE-06** | T. M. Thuận | API Lock ghế Redis | 16 | 18 | +2 |
| **TS1-BE-08** | T. M. Thuận | Script Integration Test | 8 | 8 | 0 |
| **TS1-BE-02** | P. V. Thư | Khởi tạo NodeJS Backend & Docker Compose | 10 | 12 | +2 |
| **TS1-BE-04** | P. V. Thư | API lấy sơ đồ ghế suất chiếu | 12 | 10 | -2 |
| **TS1-BE-05** | P. V. Thư | Module Redis Distributed Lock | 16 | 17 | +1 |
| **TS1-BE-07** | P. V. Thư | Event Listener tự động hủy lock | 14 | 16 | +2 |
| **TS1-FE-01** | P. T. Tài | Khởi tạo Frontend React/Vite | 8 | 7 | -1 |
| **TS1-FE-03** | P. T. Tài | Giao diện sơ đồ ghế Seat Map | 16 | 18 | +2 |
| **TS1-FE-05** | P. T. Tài | Ghép API sơ đồ ghế thời gian thực | 14 | 15 | +1 |
| **TS1-FE-07** | P. T. Tài & Ngọc Trâm | Kết nối Websocket / SSE | 12 | 15 | +3 |
| **TS1-FE-02** | N. Trâm | Thiết kế UI trang chủ & suất chiếu | 10 | 9 | -1 |
| **TS1-FE-04** | N. Trâm | Zustand state & đếm ngược 5 phút | 14 | 13 | -1 |
| **TS1-FE-06** | N. Trâm | Ghép API giữ chỗ (lock-seats) | 12 | 11 | -1 |
| **TỔNG CỘNG**| | | **170** | **178** | **+8** |

### Sprint 2
| Task ID | Thành viên phụ trách | Nhiệm vụ chính | Est (Giờ) | Act (Giờ) | Chênh lệch |
| :--- | :---: | :--- | :---: | :---: | :---: |
| **TS2-BE-01** | T. M. Thuận | Tích hợp MoMo Sandbox | 16 | 15 | -1 |
| **TS2-BE-03** | T. M. Thuận | Xử lý Webhook IPN & verify chữ ký | 14 | 14 | 0 |
| **TS2-BE-05** | T. M. Thuận | Sinh QR Code & Email service | 12 | 11 | -1 |
| **TS2-BE-02** | P. V. Thư | Tích hợp VNPay Sandbox | 16 | 17 | +1 |
| **TS2-BE-04** | P. V. Thư | DB Transaction đổi trạng thái vé | 12 | 11 | -1 |
| **TS2-BE-06** | P. V. Thư | API lịch sử & hủy giữ chỗ sớm | 10 | 10 | 0 |
| **TS2-FE-01** | P. T. Tài | UI tóm tắt hóa đơn chọn cổng | 10 | 9 | -1 |
| **TS2-FE-03** | P. T. Tài | Xử lý redirect MoMo/VNPay | 12 | 11 | -1 |
| **TS2-FE-05** | P. T. Tài & Ngọc Trâm | Ghép API Lịch sử & Hủy đặt vé | 12 | 11 | -1 |
| **TS2-FE-02** | N. Trâm | UI Success/Failure & hiển thị QR | 12 | 13 | +1 |
| **TS2-FE-04** | N. Trâm | UI trang Lịch sử đặt vé | 14 | 13 | -1 |
| **TS2-FE-06** | Cả nhóm | E2E Testing toàn luồng & viết API doc | 16 | 15 | -1 |
| **TỔNG CỘNG**| | | **146** | **140** | **-6** |

---

## 3. Biểu đồ Burndown Chart (Tiến độ thực tế)

### Sprint 1 Burndown (21 Story Points)
Biểu đồ thể hiện sự sụt giảm của khối lượng công việc còn lại (Remaining SP) theo 10 ngày làm việc của Sprint 1.

```mermaid
gantt
    title Sprint 1 Burndown Chart (Story Points)
    dateFormat  X
    axisFormat %d
    
    section Lý thuyết (Kế hoạch)
    Điểm lý thuyết còn lại : active, 0, 10
    
    section Thực tế hoàn thành
    Ngày 1-2 (Khởi tạo DB & Project) : done, 0, 2
    Ngày 3-5 (Vẽ Seat Map & API cơ bản) : done, 2, 5
    Ngày 6-8 (Redis Lock & countdown timer) : done, 5, 8
    Ngày 9-10 (WebSocket E2E & Concurrency Test) : done, 8, 10
```

*   **Nhận xét:** Trong 3 ngày đầu, tiến độ hơi chậm do phải setup môi trường Docker và sửa lỗi CORS. Từ ngày thứ 5 trở đi sau khi đã thông suốt API, tốc độ hoàn thành công việc của nhóm tăng vọt và kết thúc Sprint 1 đúng hạn.

---

## 4. Tốc độ làm việc của nhóm (Velocity Chart)
Biểu đồ so sánh lượng Story Points hoàn thành giữa 2 Sprints.

```mermaid
xychart-beta
    title "Năng suất làm việc của nhóm (Velocity Chart)"
    x-axis [Sprint 1, Sprint 2]
    y-axis "Story Points" 0 --> 30
    bar [21, 21]
```

*   **Phân tích:** 
    *   Cả hai Sprint đều hoàn thành xuất sắc 100% mục tiêu cam kết (21 Story Points/Sprint).
    *   Ở Sprint 2, dù khối lượng kỹ thuật tích hợp cổng thanh toán rất phức tạp, nhưng nhờ rút kinh nghiệm từ Sprint 1 (áp dụng Postman Shared Workspace và họp daily buổi sáng sớm), nhóm đã tiêu tốn ít thời gian thực tế hơn (140 giờ so với 178 giờ ở Sprint 1) để hoàn thành cùng số lượng Story Points.
