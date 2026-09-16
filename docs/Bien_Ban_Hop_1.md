<div align="center">

# BIÊN BẢN HỌP NHÓM 9
## SPRINT 1 PLANNING
## Dự án Website Mua Vé Xem Phim

</div>

**MEETING MINUTES**
___

**Location:** Phòng học thư viện (hoặc qua Google Meet)  
**Date:** 15/07/2026  
**Attendees:** Trần Phan Minh Thuận, Phạm Văn Thư, Phạm Thị Ngọc Trâm, Phạm Thanh Tài  
**Next meeting date:** will be scheduled in 29/07/2026  

___

**Agenda and Notes**

- Phân tích yêu cầu hệ thống và lập Product Backlog.
- Thống nhất các công nghệ sử dụng và kiến trúc Database.
- Đánh giá (Estimate) các User Story cho Sprint 1 bằng Planning Poker.
- Thống nhất công nghệ: Sử dụng React (Vite) cho Frontend và Node.js cho Backend.
- Bài toán cốt lõi: Rủi ro lớn nhất là lỗi "Race Condition". Quyết định tập trung toàn lực Sprint 1 để giải quyết việc khóa ghế bằng Redis.
- Đẩy phần thanh toán MoMo/VNPay sang Sprint 2 để đảm bảo Sprint 1 có thể hoàn thành trọn vẹn luồng giữ chỗ.

**Action Points from the Meeting:**

| Action Items | Person(s) Responsible | Deadline | Status |
|---|---|---|---|
| Khởi tạo React, thiết kế giao diện UI Sơ đồ ghế (Seat Map) | Phạm Thanh Tài | 19/07/2026 | In progress |
| Thiết kế UI trang chủ và viết logic xử lý timeout đếm ngược 5 phút | Phạm Thị Ngọc Trâm | 17/07/2026 | Complete |
| Lên cấu trúc Database, viết API lấy danh sách phim và ghế | Trần Phan Minh Thuận | 17/07/2026 | In progress |
| Thiết lập môi trường Docker, config Redis và thuật toán Lock ghế đồng thời | Phạm Văn Thư | 21/07/2026 | In progress |
