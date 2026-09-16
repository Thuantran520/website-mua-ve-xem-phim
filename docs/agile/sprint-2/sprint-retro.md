# Sprint 2 Retrospective - Website Mua Vé Xem Phim

**Thời gian:** 11/09/2026  
**Thành phần tham gia:** Cả nhóm 4 người (Thuận, Tài, Trâm, Thư)  
**Phương pháp áp dụng:** Start - Stop - Continue

---

## 1. Kết quả thảo luận cải tiến từ Sprint 1
Nhóm đã cải tiến tốt các điểm yếu từ Sprint 1:
*   **API Documentation:** Được đưa lên Postman Shared Workspace ngay từ ngày đầu tiên của Sprint 2, giúp việc tích hợp cổng thanh toán diễn ra cực kỳ nhanh chóng.
*   **Giờ giấc họp Standup:** Đã dời sang 9:00 AM hàng ngày, giúp định hướng công việc đầu ngày rất tốt, các thành viên không còn bị chậm trễ deadline.

---

## 2. Kết quả thảo luận Sprint 2

### What Went Well (CONTINUE)
*   **Hỗ trợ chéo tốt:** Thuận và Thư cùng nghiên cứu tài liệu hai cổng thanh toán khác nhau nhưng chia sẻ thuật toán hash và tạo query string cho nhau, tiết kiệm 50% thời gian code.
*   **Quản lý rủi ro:** Khi gặp lỗi CORS ở Webhook IPN, nhóm lập tức dùng `ngrok` và cấu hình reverse proxy, giải quyết vấn đề trong vòng 2 tiếng.
*   **Chất lượng sản phẩm:** Luồng E2E hoàn thành mượt mà, không gặp lỗi sót dữ liệu hoặc sai lệch trạng thái ghế.

### What Went Wrong (STOP)
*   **Thiếu Unit Test cho phần Payment:** Phần tích hợp API MoMo/VNPay chủ yếu được test thủ công (Manual E2E Test), thiếu các unit test mock HTTP request dẫn đến khó maintain nếu API phía đối tác thay đổi.

### Lessons Learned (Kinh nghiệm quý báu cho các dự án sau)
*   **Tầm quan trọng của Môi trường Sandbox:** Việc chuẩn bị kỹ tài khoản test sandbox và cấu hình ngrok sớm là yếu tố quyết định giúp tích hợp cổng thanh toán đúng hạn.
*   **Bảo mật dữ liệu thanh toán:** Việc lưu trữ IPN secret key trong file `.env` và verify signature cẩn thận là bắt buộc để tránh các cuộc tấn công gian lận tiền đặt vé.

---

## 3. Tổng kết hoạt động Scrum của nhóm
Dự án đã kết thúc thành công tốt đẹp. Nhóm 4 thành viên đã phối hợp ăn ý, áp dụng đúng tinh thần Agile/Scrum: tôn trọng tiến độ, tự chủ công việc, phản hồi nhanh và cải tiến liên tục. Đây là tiền đề rất tốt cho các môn học chuyên ngành tiếp theo.
