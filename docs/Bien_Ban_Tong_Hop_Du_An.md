# BIÊN BẢN TỔNG HỢP CÁC CUỢC HỌP DỰ ÁN AGILE/SCRUM
**Tên dự án:** Website Mua Vé Xem Phim (Final Assignment)
**Nhóm thực hiện:** Nhóm 9 (Trần Phan Minh Thuận, Phạm Văn Thư, Phạm Thanh Tài, Phạm Thị Ngọc Trâm)

---

## 1. Mục đích biên bản
Biên bản này được lập nhằm mục đích tổng kết và tóm tắt lại toàn bộ tiến độ, các cột mốc quan trọng, và kết quả đạt được thông qua 4 cuộc họp chính thức của Nhóm 9 trong suốt 2 Sprints (chu kỳ 4 tuần).

## 2. Tóm tắt tiến độ qua các cuộc họp

### 2.1. Cuộc họp Đợt 1 (Đầu Sprint 1)
- **Nội dung chính:** Lên kế hoạch (Sprint Planning) cho Sprint 1. Phân chia vai trò (Scrum Master, PO, Dev). Phân tích yêu cầu bài toán đặt vé đồng thời.
- **Tiến độ ghi nhận:** Bắt đầu khởi tạo dự án. Backend thiết lập Docker, cấu trúc Database PostgreSQL, nghiên cứu thuật toán Redis Distributed Lock. Frontend dựng khung React/Vite và thiết kế UI sơ đồ ghế.
- **Kết quả:** Thống nhất định hướng kỹ thuật và 21 Story Points mục tiêu.

### 2.2. Cuộc họp Đợt 2 (Cuối Sprint 1)
- **Nội dung chính:** Review lại kết quả Sprint 1 (Sprint Review & Retrospective).
- **Tiến độ ghi nhận:** 
  - Backend đã hoàn thiện API lấy danh sách phim, suất chiếu, và cơ chế giữ chỗ 5 phút với Redis thành công.
  - Frontend hoàn thiện UI đếm ngược 5 phút, ghép nối WebSocket/SSE để cập nhật sơ đồ ghế realtime.
- **Kết quả:** Hoàn thành 100% (21/21 SP) khối lượng công việc của Sprint 1, khắc phục thành công lỗi CORS và tối ưu giao tiếp Frontend-Backend.

### 2.3. Cuộc họp Đợt 3 (Đầu Sprint 2)
- **Nội dung chính:** Lên kế hoạch (Sprint Planning) cho Sprint 2. Trọng tâm là luồng Thanh toán (Payment) trực tuyến.
- **Tiến độ ghi nhận:** Bắt tay vào nghiên cứu tài liệu tích hợp ví MoMo và VNPay Sandbox. Phân công xử lý API Webhook (IPN), sinh QR Code, gửi Email tự động và giao diện Lịch sử đặt vé.
- **Kết quả:** Thống nhất 21 Story Points mục tiêu cho Sprint 2. Rút kinh nghiệm từ Sprint 1 để tối ưu quá trình trao đổi API qua Postman Shared Workspace.

### 2.4. Cuộc họp Đợt 4 (Cuối Sprint 2 & Đóng dự án)
- **Nội dung chính:** Tổng kết dự án, nghiệm thu chéo toàn bộ hệ thống (End-to-End Testing) và chuẩn bị hồ sơ báo cáo cuối kỳ.
- **Tiến độ ghi nhận:**
  - Hoàn thiện hoàn toàn luồng thanh toán E2E: Từ chọn ghế -> Đặt chỗ -> Thanh toán qua MoMo/VNPay -> Cập nhật trạng thái vé -> Nhận email QR Code.
  - Các tài liệu quản lý (Burndown Chart, Velocity Chart, Biên bản họp) đã được cập nhật đầy đủ và chuẩn hóa.
- **Kết quả:** Hoàn thành 100% (21/21 SP) của Sprint 2 với lượng thời gian tiết kiệm hơn so với Sprint 1 (150 giờ thực tế so với 188 giờ). 

## 3. Kết luận chung
Sau 2 Sprints và 4 cuộc họp tổng kết định kỳ, Nhóm 9 đã hoàn thành **100% yêu cầu đề ra** của đồ án "Website Mua Vé Xem Phim". Các buổi họp đã diễn ra nghiêm túc, tuân thủ đúng tinh thần của quy trình Agile/Scrum, giúp nhóm kịp thời phát hiện rủi ro, hỗ trợ chéo lẫn nhau và đảm bảo sản phẩm bàn giao cuối cùng đạt chất lượng tốt nhất cả về mặt tài liệu lẫn mã nguồn.

**Đại diện nhóm ký xác nhận:**
*(Đã ký)*
- Scrum Master: Trần Phan Minh Thuận
- Product Owner: Phạm Thị Ngọc Trâm
- Developers: Phạm Văn Thư, Phạm Thanh Tài
