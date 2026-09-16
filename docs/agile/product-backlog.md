# Danh sách Product Backlog - Website Mua Vé Xem Phim

Dưới đây là danh sách đầy đủ các User Story (US) của dự án, được ước lượng bằng Planning Poker theo dãy Fibonacci (1, 2, 3, 5, 8) và phân bổ đều cho 2 Sprint (mỗi Sprint 21 Story Points).

| ID | As a... (Là một) | I want to... (Tôi muốn) | So that... (Để) | SP | Priority | Sprint | Status |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **US-01** | Khách mua vé | xem sơ đồ ghế trống theo thời gian thực | chọn được vị trí ngồi ưng ý nhất. | 5 | High | Sprint 1 | ✅ Done |
| **US-02** | Khách mua vé | giữ chỗ ghế đã chọn trong 5 phút | có đủ thời gian hoàn tất thanh toán mà không sợ bị giành mất. | 8 | High | Sprint 1 | ✅ Done |
| **US-03** | Khách mua vé | xem danh sách phim và lịch chiếu phim | chọn được bộ phim và suất chiếu phù hợp với thời gian rảnh. | 5 | Medium | Sprint 1 | ✅ Done |
| **US-04** | Hệ thống | chặn người dùng khác chọn vào ghế đang được giữ | tránh tình trạng trùng lặp ghế (Race Condition). | 3 | High | Sprint 1 | ✅ Done |
| **US-05** | Khách mua vé | thanh toán trực tuyến qua cổng MoMo/VNPay | hoàn tất giao dịch một cách tiện lợi và an toàn. | 8 | High | Sprint 2 | ✅ Done |
| **US-06** | Hệ thống | nhận kết quả giao dịch âm thầm qua Webhook (IPN) | tự động xuất vé cho khách ngay cả khi họ lỡ tắt trình duyệt quá sớm. | 5 | High | Sprint 2 | ✅ Done |
| **US-07** | Khách mua vé | nhận được mã QR Code vé điện tử sau khi thanh toán | đi thẳng qua cửa soát vé mà không cần in vé giấy. | 5 | Medium | Sprint 2 | ✅ Done |
| **US-08** | Khách mua vé | xem lại danh sách lịch sử đặt vé của mình | dễ dàng quản lý và kiểm tra các vé đã mua. | 3 | Low | Sprint 2 | ✅ Done |

## Tổng kết Story Points:
- **Sprint 1:** 21 Story Points (Mục tiêu: Xây dựng nền tảng, sơ đồ ghế và cơ chế khóa ghế đồng thời).
- **Sprint 2:** 21 Story Points (Mục tiêu: Hoàn thiện thanh toán MoMo/VNPay và sinh vé QR Code).
- **Tổng cộng dự án:** 42 Story Points (Đã hoàn thành 100%).
