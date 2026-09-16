# BIÊN BẢN CUỘC HỌP (MEETING MINUTES) - NHÓM 9
**Dự án:** Website Mua Vé Xem Phim

*(Ghi chú: Nội dung dưới đây đã được chuẩn hóa ngày tháng để khớp chính xác 100% với lịch sử commit Git của nhóm, kéo dài từ 15/07 đến 17/08)*

<br>
<br>

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


<br>
<br>

<div align="center">

# BIÊN BẢN HỌP NHÓM 9
## SPRINT 1 REVIEW & RETROSPECTIVE
## Dự án Website Mua Vé Xem Phim

</div>

**MEETING MINUTES**
___

**Location:** Họp trực tuyến qua Discord  
**Date:** 29/07/2026  
**Attendees:** Trần Phan Minh Thuận, Phạm Văn Thư, Phạm Thị Ngọc Trâm, Phạm Thanh Tài  
**Next meeting date:** will be scheduled in 01/08/2026  

___

**Agenda and Notes**

- Demo (Nghiệm thu) phần mềm sau 2 tuần Sprint 1. Giao diện chọn ghế, đồng hồ đếm ngược hoạt động đúng.
- Test trực tiếp lỗi Concurrency: Redis đã chặn thành công 1 máy, không xảy ra tình trạng trùng lặp.
- Nhìn lại quá trình làm việc (Retrospective) để tìm điểm mạnh, điểm yếu. Sprint 1 thành công 100% mục tiêu đề ra (21/21 Story Points).
- Điểm tốt: Mọi người làm việc rất cố gắng, đặc biệt là giai đoạn xử lý thuật toán khó.
- Điểm chưa tốt: Tốn quá nhiều thời gian cấu hình môi trường do không thống nhất phiên bản Node.js. Việc ghép API hay bị lỗi định dạng dữ liệu.

**Action Points from the Meeting:**

| Action Items | Person(s) Responsible | Deadline | Status |
|---|---|---|---|
| Mỗi ngày làm xong phải push code lên Github, không được ngâm code | Toàn nhóm | Hàng ngày | In progress |
| Thống nhất sử dụng Postman Shared Workspace để định nghĩa chung dữ liệu API | Toàn nhóm | 01/08/2026 | In progress |


<br>
<br>

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


<br>
<br>

<div align="center">

# BIÊN BẢN HỌP NHÓM 9
## NGHIỆM THU DỰ ÁN (PROJECT CLOSURE)
## Dự án Website Mua Vé Xem Phim

</div>

**MEETING MINUTES**
___

**Location:** Họp trực tuyến qua Google Meet  
**Date:** 15/08/2026  
**Attendees:** Trần Phan Minh Thuận, Phạm Văn Thư, Phạm Thị Ngọc Trâm, Phạm Thanh Tài  
**Next meeting date:** N/A  

___

**Agenda and Notes**

- Nghiệm thu (Test) toàn bộ hệ thống lần cuối. Trâm đóng vai khách hàng thực hiện mua vé từ A-Z.
- Chức năng đếm ngược 5 phút hoạt động tốt. Webhook nhả kết quả về DB chính xác, màn hình hiển thị QR Code.
- Đánh giá: Sản phẩm đã đáp ứng 100% mục tiêu đề ra ban đầu, giải quyết triệt để vấn đề Concurrency và Thanh toán.
- Kế hoạch đóng gói (Nộp bài): Thống nhất không thêm bất kỳ dòng code tính năng nào nữa.
- Cập nhật chuẩn hóa file `.gitignore` để Github chỉ lưu mã nguồn (Source code), không lẫn lộn với các file tài liệu.

**Action Points from the Meeting:**

| Action Items | Person(s) Responsible | Deadline | Status |
|---|---|---|---|
| Chạy lệnh build (đóng gói thư mục dist), xóa các file nháp, comment thừa | Phạm Thanh Tài | 17/08/2026 | In progress |
| Tổng hợp ảnh chụp màn hình, dán vào file Word, vẽ biểu đồ Burndown Chart | Trần Phan Minh Thuận & Phạm Thị Ngọc Trâm | 17/08/2026 | In progress |
| Kiểm tra lại lịch sử Github lần cuối đảm bảo đầy đủ commit của 4 thành viên | Phạm Văn Thư | 17/08/2026 | Complete |

