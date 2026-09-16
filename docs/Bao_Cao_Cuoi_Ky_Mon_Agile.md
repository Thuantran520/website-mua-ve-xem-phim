# BÁO CÁO CUỐI KỲ MÔN AGILE / QUẢN LÝ DỰ ÁN
**Đề tài:** Phát triển Website Mua Vé Xem Phim bằng mô hình Agile/Scrum

---

## LỜI MỞ ĐẦU

### Lý do chọn đề tài
Trong thời đại số hóa, nhu cầu đặt vé xem phim trực tuyến ngày càng tăng. Tuy nhiên, nhiều hệ thống hiện tại vẫn gặp sự cố khi có lượng lớn người dùng cùng truy cập và tranh giành cùng một vị trí ghế (hiện tượng Race Condition). Do đó, nhóm quyết định chọn đề tài xây dựng "Website Mua Vé Xem Phim" tích hợp cơ chế giữ chỗ đồng thời (Concurrency Lock) nhằm giải quyết triệt để bài toán này, đồng thời tạo ra một trải nghiệm người dùng mượt mà.

### Mục tiêu và phạm vi nghiên cứu
- **Mục tiêu:** Áp dụng thành thạo mô hình Agile/Scrum vào thực tế phát triển phần mềm. Xây dựng thành công hệ thống đặt vé có tính năng giữ ghế tự động trong 5 phút bằng Redis và thanh toán qua cổng MoMo/VNPay.
- **Phạm vi:** Tập trung vào luồng (flow) dành cho Khách hàng: Xem suất chiếu -> Chọn ghế -> Giữ chỗ -> Thanh toán -> Nhận vé QR Code.

---

## CHƯƠNG 1: TỔNG QUAN VỀ DỰ ÁN VÀ PHƯƠNG PHÁP TIẾP CẬN

### 1.1. Bối cảnh dự án
Hệ thống rạp chiếu phim hiện đại đòi hỏi tốc độ xử lý nhanh và tính chính xác tuyệt đối trong giao dịch. Bài toán cốt lõi là ngăn chặn việc 2 người cùng thanh toán cho 1 ghế. Các chức năng cốt lõi dự kiến bao gồm: Quản lý phim/suất chiếu, Sơ đồ ghế thời gian thực, Giữ chỗ (Lock), và Thanh toán IPN.

### 1.2. Tổng quan về phương pháp Agile và Scrum
Nhóm quyết định chọn Agile/Scrum thay vì mô hình Thác nước (Waterfall) vì:
- **Tính linh hoạt (Flexibility):** Yêu cầu của hệ thống (đặc biệt là tích hợp thanh toán) thường xuyên phải thay đổi theo tài liệu API của đối tác. Agile cho phép nhóm thích ứng nhanh với các thay đổi này.
- **Ra mắt sản phẩm sớm (Early Delivery):** Ở cuối mỗi Sprint 2 tuần, nhóm đã có một phần mềm chạy được (Ví dụ hết Sprint 1 là đã demo được việc chọn và khóa ghế).
- **Phản hồi liên tục (Continuous Feedback):** Giúp nhóm sớm phát hiện các lỗi logic trong luồng thanh toán để điều chỉnh ngay lập tức.

### 1.3. Khảo sát các ứng dụng tương tự trên thị trường
Nhóm đã khảo sát 3 hệ thống lớn: CGV Cinemas, Galaxy Cinema, và Lotte Cinema.
- **Ưu điểm:** Giao diện trực quan, đa dạng phương thức thanh toán.
- **Khuyết điểm:** Đôi lúc app bị treo hoặc báo lỗi không rõ ràng khi ghế vừa bị người khác mua.
- **Giải pháp của nhóm:** Thêm đồng hồ đếm ngược 5 phút trực quan trên UI và kết nối WebSocket để đổi màu ghế (trống -> đang khóa -> đã bán) ngay lập tức trên màn hình của tất cả người dùng khác.

---

## CHƯƠNG 2: KHỞI TẠO DỰ ÁN VÀ LẬP KẾ HOẠCH (PROJECT INITIATION)

### 2.1. Tổ chức nhóm (Scrum Team)
- **Scrum Master / Backend Developer:** Trần Phan Minh Thuận (Phụ trách điều phối các sự kiện Scrum, gỡ rối, thiết kế DB và API).
- **Backend Developer (Dev Team):** Phạm Văn Thư (Phụ trách module Redis Lock, VNPay).
- **Frontend Developer (Dev Team):** Phạm Thanh Tài (Phụ trách Seat Map UI, kết nối WebSocket).
- **Product Owner / Frontend Developer (Dev Team):** Phạm Thị Ngọc Trâm (Quản lý Product Backlog, phụ trách UI Trang chủ, đếm ngược và E2E Testing).

### 2.2. Chân dung người dùng (Personas)
1. **Khách hàng (Moviegoer):** Sinh viên, nhân viên văn phòng có nhu cầu xem phim, muốn đặt vé nhanh, thanh toán tiện lợi và không muốn ra rạp xếp hàng.
2. **Quản trị viên (Admin):** Nhân viên rạp phim cần lên lịch suất chiếu, kiểm tra trạng thái vé và doanh thu. (Trong phạm vi dự án tập trung chủ yếu vào Khách hàng).

### 2.3. Xây dựng Product Backlog
Dự án được phân rã thành các User Story (US) cốt lõi:
- **US-01:** Là một Khách mua vé, tôi muốn xem sơ đồ ghế trống theo thời gian thực để chọn được vị trí ngồi ưng ý nhất.
- **US-02:** Là một Khách mua vé, tôi muốn giữ chỗ ghế đã chọn trong 5 phút để có đủ thời gian hoàn tất thanh toán mà không sợ bị giành mất.
- **US-03:** Là một Khách mua vé, tôi muốn xem danh sách phim và lịch chiếu phim để chọn được suất chiếu phù hợp.
- **US-04:** Là một Hệ thống, tôi muốn chặn người dùng khác chọn vào ghế đang được giữ để tránh tình trạng trùng lặp ghế (Race Condition).
- **US-05:** Là một Khách mua vé, tôi muốn thanh toán trực tuyến qua cổng MoMo/VNPay để hoàn tất giao dịch một cách tiện lợi và an toàn.
- **US-06:** Là một Hệ thống, tôi muốn nhận kết quả giao dịch âm thầm qua Webhook (IPN) để tự động xuất vé cho khách ngay cả khi họ lỡ tắt trình duyệt quá sớm.
- **US-07:** Là một Khách mua vé, tôi muốn nhận được mã QR Code vé điện tử sau khi thanh toán để đi thẳng qua cửa soát vé.
- **US-08:** Là một Khách mua vé, tôi muốn xem lại danh sách lịch sử đặt vé của mình để dễ dàng quản lý.
*(Chi tiết các US khác nằm trong bảng Product Backlog đính kèm)*.

### 2.4. Tiêu chuẩn dự án
- **Phương pháp ước lượng:** Nhóm sử dụng Planning Poker với dãy Fibonacci (1, 2, 3, 5, 8). Các task rủi ro cao (như IPN Webhook, Redis) được đánh giá 8 điểm.
- **Definition of Done (DoD):** Code phải pass linter, không có bug nghiêm trọng, tính năng hoạt động được trên môi trường deploy, và API phải có document (Swagger/Postman).

---

## CHƯƠNG 3: QUÁ TRÌNH THỰC THI (SPRINT EXECUTION)

### 3.1. Sprint 1: Xây dựng nền tảng và Cơ chế khóa ghế
- **Sprint Planning:** Nhóm chọn US-01, US-02, US-03, US-04 đưa vào Sprint Backlog. **Sprint Goal:** "Xây dựng thành công giao diện chọn ghế và cơ chế khóa ghế đồng thời an toàn bằng Redis". Tổng điểm: 21 Story Points.
- **Daily Scrum:** Tổ chức họp 15 phút mỗi sáng qua Google Meet/Discord. Các thành viên báo cáo tiến độ và vướng mắc (ví dụ: lỗi CORS khi Frontend gọi Backend, khó khăn khi setup Redis).
- **Sprint Review:** Demo thành công cho giảng viên/Product Owner cảnh 2 trình duyệt cùng chọn 1 ghế, trình duyệt bấm sau sẽ bị chặn (báo lỗi ghế đang được người khác giữ).
- **Sprint Retrospective:**
  - *Làm tốt:* Tinh thần làm việc cao, giải quyết được cốt lõi bài toán Concurrency.
  - *Chưa tốt:* Mất quá nhiều thời gian config Docker và môi trường ban đầu.
  - *Cải tiến:* Ở Sprint 2, nhóm sẽ setup Postman Shared Workspace để test API chung nhanh hơn.

### 3.2. Sprint 2: Tích hợp thanh toán và QR Code vé
- **Sprint Planning:** Nhóm đưa US-05, US-06, US-07, US-08 vào Sprint Backlog. **Sprint Goal:** "Hoàn thiện luồng thanh toán thực tế với MoMo/VNPay và sinh vé điện tử QR Code". Tổng điểm: 21 Story Points.
- **Daily Scrum:** Đã áp dụng cải tiến từ Sprint 1, tiến độ trơn tru hơn. Khó khăn chính là chờ Sandbox của MoMo phản hồi Webhook đôi khi bị delay do mạng.
- **Sprint Review:** Trình bày được luồng đi từ chọn ghế -> Chuyển hướng VNPay -> Quẹt mã -> Tự động quay về trang Success với mã vé QR.
- **Sprint Retrospective:** Nhóm đã phối hợp test (E2E) rất tốt luồng thanh toán. Nhóm tự tin đã hoàn thiện dự án đúng hạn.

### 3.3. Các công cụ hỗ trợ
- Nhóm sử dụng **Github Projects / Trello** làm Kanban board để kéo thả các task (To Do, In Progress, Review, Done).
- Sử dụng **Burndown Chart** (đã vẽ trong file agile-metrics.md) để theo dõi tốc độ đốt task mỗi ngày và **Velocity Chart** để đánh giá năng suất qua các Sprint. Kết quả cho thấy Sprint 2 nhóm đốt task nhanh và đều đặn hơn Sprint 1 nhờ làm quen với công nghệ, và duy trì vận tốc ổn định (21 Story Points).

---

## CHƯƠNG 4: TỔNG KẾT VÀ BÀI HỌC KINH NGHIỆM

### 4.1. Kết quả đạt được
- So với kỳ vọng ban đầu, nhóm đã hoàn thành 100% (42/42 Story Points).
- Ứng dụng mô phỏng đặt vé hoạt động mượt mà, giải quyết được bài toán concurrency và tích hợp thành công cổng thanh toán thật (môi trường Sandbox).

### 4.2. Khó khăn và Bài học kinh nghiệm
- **Khó khăn:** Ban đầu ước lượng (estimate) thời gian cho phần cấu hình Redis và viết thuật toán tạo chữ ký bảo mật (Signature) cho MoMo bị sai (thấp hơn thực tế), dẫn đến phải làm thêm giờ.
- **Bài học:** Các task liên quan đến tích hợp bên thứ ba (Third-party API) luôn tiềm ẩn rủi ro về mạng và tài liệu cũ, cần cộng thêm điểm rủi ro (Risk Points) khi Planning Poker. Việc có Daily Standup giúp nhóm phát hiện ra ai đang bị kẹt để hỗ trợ ngay lập tức.

### 4.3. Hướng phát triển mở rộng
Nếu dự án tiếp tục (Sprint 3, 4), nhóm sẽ phát triển hệ thống Admin Dashboard quản lý doanh thu dạng biểu đồ, và phát triển thêm chức năng đặt kèm Bắp/Nước, Voucher khuyến mãi.

---
## TÀI LIỆU THAM KHẢO
1. Sách "Scrum: The Art of Doing Twice the Work in Half the Time" - Jeff Sutherland.
2. Tài liệu tích hợp API MoMo, VNPay (Developer Portal).
3. Redis Documentation (Distributed Locks with Redis).

## PHỤ LỤC
- **Link Source Code:** [Link Github của nhóm]
- **Biểu đồ Burndown Chart:** (Đính kèm hình ảnh biểu đồ trong báo cáo)
- **Hình ảnh Kanban Board:** (Đính kèm ảnh chụp màn hình Trello/Github Projects)
