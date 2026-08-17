# Sprint 1 Retrospective - Website Mua Vé Xem Phim

**Thời gian:** 28/08/2026  
**Thành phần tham gia:** Cả nhóm 4 người (Thuận, Tài, Trâm, Thư)  
**Phương pháp áp dụng:** Start - Stop - Continue

---

## 1. Kết quả thảo luận

### What Went Well (Những điểm tốt nên duy trì - CONTINUE)
*   **Tinh thần tự giác cao:** Các thành viên trong nhóm giao tiếp liên tục, đặc biệt là khi ghép nối API giữa Backend và Frontend (Tài - Thư, Trâm - Thuận).
*   **Kỹ thuật vững vàng:** Cơ chế giải quyết race condition bằng Redis Distributed Lock hoạt động trơn tru ngay từ lần tích hợp đầu tiên nhờ test kỹ lưỡng trên local.
*   **Git workflow chuẩn chỉ:** Sử dụng nhánh tính năng (`feature/`), pull request được review chéo nghiêm túc trước khi merge vào nhánh `main`.

### What Went Wrong (Những điểm chưa tốt cần dừng lại - STOP)
*   **Ước lượng thời gian (Estimation) chưa chuẩn:** Một số task kỹ thuật như cấu hình Redis Keyspace Notification và xử lý CORS mất nhiều thời gian hơn dự kiến, gây ra OT nhẹ vào những ngày cuối.
*   **Chia sẻ tài liệu chậm:** Tài liệu API lúc đầu lưu trữ rải rác trên máy cá nhân, gây khó khăn cho việc tra cứu của Frontend.

### Action Items (Hành động cải tiến cho Sprint 2 - START)
*   **Quy chuẩn hóa tài liệu API:** Đưa toàn bộ tài liệu API lên Swagger/Postman Shared Workspace ngay từ ngày đầu tiên của Sprint 2 (Người phụ trách: **Văn Thư**).
*   **Họp Daily Standup đúng giờ:** Di chuyển giờ họp standup lên đầu giờ sáng (9:00 AM) thay vì họp cuối ngày để định hướng công việc tốt hơn (Người phụ trách: **Minh Thuận**).
*   **Quản lý rủi ro:** Nếu một task kỹ thuật bị block quá 4 tiếng, thành viên phải chủ động ping lên group chat để mọi người hỗ trợ ngay lập tức thay vì tự giải quyết một mình.

---

## 2. Bảng theo dõi Action Items

| Action Item | Người phụ trách | Hạn chót (Due Date) | Trạng thái |
| :--- | :---: | :---: | :---: |
| Chuyển tài liệu API sang Postman Shared Workspace | Văn Thư | 30/08/2026 | **To Do** |
| Đặt lịch họp Daily Standup 9:00 AM mỗi sáng trên Google Meet | Minh Thuận | 31/08/2026 | **To Do** |
| Setup môi trường Test và Config Webhook Sandbox (MoMo/VNPay) | Minh Thuận & Văn Thư | 03/09/2026 | **To Do** |
