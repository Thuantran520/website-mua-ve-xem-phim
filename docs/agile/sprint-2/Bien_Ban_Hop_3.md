<div align="center">

# BIÊN BẢN HỌP NHÓM 9
## SPRINT 2 PLANNING
## Dự án Website Mua Vé Xem Phim

</div>

**MEETING MINUTES**
___

**Location:** Phòng học thư viện  
**Date:** 01/08/2026  
**Attendees:** Trần Phan Minh Thuận, Phạm Văn Thư, Phạm Thị Ngọc Trâm, Phạm Thanh Tài  
**Next meeting date:** will be scheduled in 15/08/2026  

___

**Agenda and Notes**

- Lập kế hoạch và đánh giá các Task cho phần Thanh toán điện tử (MoMo/VNPay).
- Phân tích rủi ro: Tích hợp cổng thanh toán Sandbox dễ gặp lỗi do tài liệu đối tác phức tạp, đòi hỏi cấu hình mã hóa bảo mật SHA256 chuẩn xác.
- Đưa 4 User Story cuối cùng vào Sprint Backlog và chơi Planning Poker.
- Chốt giải pháp: Thống nhất bắt buộc phải dùng kỹ thuật IPN Webhook để bắt thông tin thanh toán, tránh trường hợp khách hàng mua xong tắt luôn trình duyệt thì hệ thống không ghi nhận được vé.

**Action Points from the Meeting:**

| Action Items | Person(s) Responsible | Deadline | Status |
|---|---|---|---|
| Tìm hiểu tài liệu API và tích hợp luồng tạo thanh toán VNPay và MoMo | Phạm Văn Thư | 04/08/2026 | In progress |
| Xử lý bảo mật chữ ký và luồng nhận tín hiệu IPN Webhook để tự động xuất vé | Trần Phan Minh Thuận | 07/08/2026 | In progress |
| Thiết kế trang kết quả thanh toán thành công và render mã vạch QR Code | Phạm Thanh Tài | 10/08/2026 | In progress |
| Viết tính năng Lịch sử đặt vé và chịu trách nhiệm E2E Testing toàn bộ hệ thống | Phạm Thị Ngọc Trâm | 12/08/2026 | In progress |
