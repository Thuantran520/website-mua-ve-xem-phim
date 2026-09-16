LỜI CẢM ƠN

Đầu tiên, nhóm chúng em xin gửi lời cảm ơn chân thành và sâu sắc nhất đến Giảng viên hướng dẫn môn học đã tận tình giảng dạy, truyền đạt những kiến thức quý báu về kỹ thuật phần mềm và quản lý dự án trong suốt học kỳ vừa qua. Những hướng dẫn chi tiết, dễ hiểu của thầy về phương pháp Agile và khung làm việc Scrum không chỉ là lý thuyết trên bục giảng, mà đã trở thành kim chỉ nam giúp nhóm chúng em có cái nhìn thực tế và áp dụng thành công vào đồ án "Website Mua Vé Xem Phim".

Trong quá trình thực hiện đồ án, từ khâu lên ý tưởng, viết User Story cho đến khi lập trình và giải quyết bài toán đụng độ dữ liệu, mặc dù nhóm đã nỗ lực hết sức để hoàn thiện nhưng chắc chắn hệ thống vẫn không tránh khỏi những thiếu sót nhất định (đặc biệt là trong khâu tối ưu hóa hạ tầng server khi triển khai thực tế). Nhóm rất mong nhận được sự góp ý, nhận xét từ thầy để rút kinh nghiệm và giúp hệ thống cũng như kỹ năng của các thành viên ngày càng hoàn thiện hơn trong tương lai. 
Xin chân thành cảm ơn!

---

LỜI MỞ ĐẦU

1. Lý do chọn đề tài
Trong thời đại số hóa bùng nổ, nhu cầu giải trí điện ảnh của người dân ngày càng tăng cao. Thói quen xếp hàng mua vé tại rạp đang dần được thay thế bằng việc đặt vé trực tuyến thông qua các ứng dụng web và di động. Tuy nhiên, một thực trạng dễ nhận thấy là vào các dịp lễ Tết hoặc khi có những bộ phim bom tấn ra mắt, lưu lượng truy cập tăng đột biến thường khiến các hệ thống đặt vé gặp tình trạng quá tải. Một trong những lỗi nghiêm trọng và gây ức chế nhất cho người dùng là lỗi "Race Condition" - xử lý giữ ghế trùng lặp. Nghĩa là hai hoặc nhiều người dùng cùng nhìn thấy một ghế trống, cùng bấm chọn và thanh toán, dẫn đến việc hệ thống ghi nhận sai lệch hoặc phải hoàn tiền thủ công rất mất thời gian.

Nhận thấy tính cấp thiết của vấn đề, nhóm quyết định chọn đề tài xây dựng "Website mua vé xem phim" tập trung giải quyết bài toán cốt lõi trên. Hơn thế nữa, để đảm bảo tiến độ và linh hoạt xử lý các rủi ro phát sinh, nhóm quyết định áp dụng triệt để mô hình Agile và khung làm việc Scrum. Việc sử dụng Scrum giúp nhóm chia nhỏ dự án thành các giai đoạn ngắn, liên tục đưa ra sản phẩm chạy được để kiểm thử và điều chỉnh kịp thời cơ chế Lock ghế (giữ chỗ) theo thời gian thực.

2. Mục tiêu và phạm vi nghiên cứu
- Mục tiêu: 
  + Về mặt quy trình: Áp dụng thành thạo và tuân thủ nghiêm ngặt các nguyên tắc của Scrum (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective) vào một dự án thực tế, từ đó rèn luyện kỹ năng làm việc nhóm.
  + Về mặt kỹ thuật: Xây dựng thành công hệ thống đặt vé với luồng tương tác mượt mà. Cốt lõi là tích hợp thành công Redis để giải quyết bài toán khóa ghế đồng thời (Concurrency Lock) và tích hợp API thanh toán trực tuyến MoMo/VNPay.
- Phạm vi nghiên cứu: Do giới hạn về thời gian của học kỳ, nhóm giới hạn phạm vi dự án tập trung hoàn toàn vào trải nghiệm của luồng Khách hàng (End-user). Các tính năng bao gồm: Khám phá lịch chiếu phim, tương tác với sơ đồ ghế thời gian thực, cơ chế giữ chỗ đếm ngược 5 phút, tiến hành thanh toán trực tuyến và cuối cùng là nhận vé điện tử dưới dạng QR Code.

---

CHƯƠNG 1: TỔNG QUAN VỀ DỰ ÁN VÀ PHƯƠNG PHÁP TIẾP CẬN

1.1. Bối cảnh dự án
Hệ thống rạp chiếu phim hiện đại đòi hỏi tốc độ phản hồi cực nhanh và tính toàn vẹn dữ liệu tuyệt đối trong giao dịch tài chính. Khi khách hàng thao tác trên màn hình, mọi trạng thái ghế phải được đồng bộ hóa lập tức đến hàng ngàn người dùng khác. Bài toán lớn nhất đặt ra cho nhóm không phải là vẽ một giao diện đẹp, mà là cấu trúc luồng dữ liệu sao cho ngăn chặn được việc 2 người cùng thanh toán cho 1 ghế tại cùng 1 phần nghìn giây. Vì vậy, các chức năng cốt lõi nhóm xác định bao gồm: Quản lý danh sách suất chiếu, Sơ đồ ghế thời gian thực (Real-time Seat Map), Thuật toán Giữ chỗ (Distributed Lock), và Xử lý IPN Webhook trả kết quả thanh toán tự động.

1.2. Tổng quan về phương pháp Agile và Scrum
Trước khi bắt tay vào dự án, nhóm đã cân nhắc giữa mô hình Thác nước (Waterfall) truyền thống và Agile. Cuối cùng, Scrum được lựa chọn vì những ưu điểm vượt trội:
- Tính linh hoạt cao (Flexibility): Quá trình tích hợp cổng thanh toán của bên thứ ba (MoMo, VNPay) thường gặp nhiều lỗi do môi trường Sandbox đôi khi không ổn định hoặc tài liệu API bị cập nhật. Nếu dùng Waterfall, nhóm phải thiết kế lại toàn bộ từ đầu. Với Agile, nhóm có thể thích ứng và xoay trục (pivot) ngay lập tức.
- Chuyển giao sản phẩm sớm (Early Delivery): Nhờ chia nhỏ dự án thành các Sprint kéo dài đúng 2 tuần, kết thúc Sprint 1 nhóm đã có thể chạy thử phần chọn ghế và demo cơ chế đếm ngược, trong khi chưa cần đụng đến một dòng code nào của phần thanh toán.
- Sửa sai và cải tiến liên tục (Continuous Improvement): Các buổi họp Daily Scrum buổi sáng giúp nhóm phát hiện ngay những lỗi vặt (như lỗi CORS kết nối backend, lỗi port Docker) để nhờ các thành viên khác hỗ trợ, không để một cá nhân nào bị kẹt tiến độ quá 24 giờ.

1.3. Khảo sát các ứng dụng tương tự trên thị trường
Để xây dựng UI/UX hợp lý, nhóm đã bỏ thời gian dùng thử và phân tích luồng đặt vé của các ông lớn như CGV Cinemas, Galaxy Cinema và Lotte Cinema.
- Điểm mạnh của họ: Giao diện trực quan, flow mua vé đi theo từng bước rõ ràng, cung cấp cực kỳ đa dạng các hình thức thanh toán từ thẻ nội địa, thẻ quốc tế đến các loại ví điện tử.
- Điểm yếu/Khuyết điểm tồn đọng: Khi một ghế vừa bị người khác mua mất, đôi lúc ứng dụng bị treo, xoay vòng vòng loading hoặc văng ra câu báo lỗi khó hiểu, bắt người dùng làm lại từ bước chọn phim ban đầu. 
- Hướng giải quyết đột phá của nhóm: Cải thiện trải nghiệm bằng cách thêm một đồng hồ đếm ngược 5 phút to và rõ ngay trên thanh điều hướng. Đồng thời, áp dụng công nghệ WebSocket để bất kỳ khi nào có một khách click chọn ghế, cái ghế đó trên màn hình của tất cả những khách hàng khác sẽ ngay lập tức đổi sang màu xám (bị khóa) mà không cần họ phải F5 tải lại trang.

---

CHƯƠNG 2: KHỞI TẠO DỰ ÁN VÀ LẬP KẾ HOẠCH (PROJECT INITIATION)

2.1. Tổ chức nhóm (Scrum Team)
Để dự án vận hành trơn tru, nhóm tự tổ chức và phân công vai trò chéo nhau, đảm bảo tính liên chức năng (cross-functional) của Scrum:
- Trần Phan Minh Thuận (Scrum Master / Backend Developer): Đóng vai trò điều phối các buổi họp Scrum, tháo gỡ các rào cản cản trở tiến độ của team. Về kỹ thuật, phụ trách thiết kế Database kiến trúc linh hoạt và xử lý luồng API bảo mật chữ ký số của MoMo.
- Phạm Văn Thư (Backend / DevOps - Development Team): Xử lý việc thiết lập môi trường (Vite, Node.js), chịu trách nhiệm chính về module khóa ghế (Redis Distributed Lock) và tích hợp API thanh toán VNPay.
- Phạm Thanh Tài (Frontend Developer - Development Team): Xử lý toàn bộ logic giao diện của sơ đồ ghế (Seat Map Grid), thao tác click chọn/bỏ chọn, và kết nối mạng để nhận tín hiệu WebSocket thay đổi màu ghế.
- Phạm Thị Ngọc Trâm (Product Owner / Frontend - Development Team): Đại diện cho tiếng nói của người dùng, quản lý và sắp xếp độ ưu tiên của Product Backlog. Phụ trách thiết kế giao diện màn hình trang chủ, quản lý State giỏ hàng, viết logic đồng hồ đếm ngược thời gian và đảm nhiệm vai trò kiểm thử luồng từ đầu đến cuối (E2E Testing).

2.2. Chân dung người dùng (Personas)
Trong phạm vi đồ án này, nhóm tập trung toàn lực phục vụ một đối tượng người dùng duy nhất nhằm tối ưu hóa trải nghiệm:
- Tên đại diện: Khách hàng (Moviegoer).
- Đặc điểm: Sinh viên hoặc nhân viên văn phòng, độ tuổi từ 16 - 35. Thành thạo sử dụng smartphone và thanh toán online.
- Nỗi đau (Pain points): Rất ghét việc phải đến rạp sớm xếp hàng chờ mua vé, dễ bực mình khi hệ thống báo lỗi vào phút chót sau khi đã tốn công chọn chỗ đẹp.
- Mục tiêu (Goals): Muốn mở web lên là thấy ngay lịch chiếu, mua vé thành công chỉ trong vòng 3 phút thao tác và nhận được vé điện tử QR Code để đi thẳng qua cửa soát vé.

2.3. Xây dựng Product Backlog
Toàn bộ yêu cầu hệ thống được thảo luận và phân rã thành các User Story (US) theo chuẩn định dạng "Là một... Tôi muốn... Để...". Một số US cốt lõi bao gồm:
- US-01: Là một Khách mua vé, tôi muốn xem sơ đồ ghế trống theo thời gian thực để chọn được vị trí ngồi ưng ý nhất.
- US-02: Là một Khách mua vé, tôi muốn giữ chỗ ghế đã chọn trong 5 phút để có đủ thời gian hoàn tất thanh toán mà không sợ bị giành mất.
- US-03: Là một Khách mua vé, tôi muốn xem danh sách phim và lịch chiếu phim để chọn được suất chiếu phù hợp.
- US-04: Là một Hệ thống, tôi muốn chặn người dùng khác chọn vào ghế đang được giữ để tránh tình trạng trùng lặp ghế (Race Condition).
- US-05: Là một Khách mua vé, tôi muốn thanh toán trực tuyến qua cổng MoMo/VNPay để hoàn tất giao dịch một cách tiện lợi và an toàn.
- US-06: Là một Hệ thống, tôi muốn nhận kết quả giao dịch âm thầm qua Webhook (IPN) để tự động xuất vé cho khách ngay cả khi họ lỡ tắt trình duyệt quá sớm.
- US-07: Là một Khách mua vé, tôi muốn nhận được mã QR Code vé điện tử sau khi thanh toán để đi thẳng qua cửa soát vé.
- US-08: Là một Khách mua vé, tôi muốn xem lại danh sách lịch sử đặt vé của mình để dễ dàng quản lý.

2.4. Tiêu chuẩn dự án (Estimation & DoD)
- Phương pháp ước lượng (Estimation): Nhóm không dùng số giờ để ước lượng mà dùng phương pháp Planning Poker với dãy số Fibonacci (1, 2, 3, 5, 8, 13). Các task khó như setup Redis hoặc xử lý mã hóa bảo mật thanh toán được gán 8 điểm (Story Points). Các giao diện đơn giản tĩnh được gán 3 điểm.
- Định nghĩa Hoàn thành (Definition of Done - DoD): Để một User Story được kéo sang cột "Done", nó phải thỏa mãn các tiêu chí khắt khe: Code không văng lỗi vặt (Pass linter), thực hiện đúng toàn bộ Acceptance Criteria của User Story, code đã được review, đẩy lên Github thành công (không bị conflict) và phải chạy mượt mà trên máy tính của ít nhất một thành viên khác trong nhóm kiểm chứng.

---

CHƯƠNG 3: QUÁ TRÌNH THỰC THI (SPRINT EXECUTION)

Dự án được thực thi cực kỳ nghiêm túc trong 2 Sprint, mỗi Sprint kéo dài chuẩn xác 2 tuần (14 ngày).

3.1. Sprint 1: Xây dựng nền tảng và Đặt vé cơ bản (Từ 15/07 đến 29/07)
- Sprint Planning: Nhóm đã ngồi lại chọn các User Story về khởi tạo dự án, hiển thị lịch chiếu phim và giao diện sơ đồ ghế. Mục tiêu cốt lõi của Sprint này là chứng minh được luồng đồng bộ: 2 máy tính mở cùng lúc thấy chung 1 sơ đồ ghế, máy này bấm thì máy kia mờ đi. Tổng khối lượng cam kết là 21 Story Points.
- Daily Scrum: Nhóm lập nhóm chat Discord, mỗi sáng dành 15 phút cập nhật tiến độ. Lúc đầu (ngày 1-2) tiến độ khá chậm do mọi người chật vật cấu hình môi trường Docker cho Database và cài đặt các thư viện React, nhưng sau đó đã bắt kịp nhịp độ.
- Sprint Review: 
  [CHÈN ẢNH MÀN HÌNH CHỌN GHẾ VÀ ĐỒNG HỒ ĐẾM NGƯỢC VÀO ĐÂY]
  Kết quả đạt được rất khả quan. Nhóm đã demo thành công giao diện Seat Map trực quan. Khi click vào ghế, một đồng hồ đếm ngược 5 phút xuất hiện góc trên, và nếu thử mở tab ẩn danh đóng vai người thứ 2 click vào ghế đó, hệ thống sẽ hiện thông báo "Ghế đang được giữ".
- Sprint Retrospective: 
  - Điểm mạnh: Cả nhóm rất nỗ lực, giải quyết được cốt lõi bài toán Redis Lock, không ai bỏ cuộc.
  - Điểm yếu: Setup môi trường ban đầu tốn quá nhiều thời gian, ghép API giữa Frontend và Backend hay bị lỗi định dạng JSON.
  - Hành động cải tiến: Thống nhất dùng chung Postman Shared Workspace để định nghĩa chuẩn dữ liệu (Mock API) trước khi code ở Sprint 2.

3.2. Sprint 2: Tích hợp thanh toán và Quản lý vé (Từ 01/08 đến 15/08)
- Sprint Planning: Rút kinh nghiệm Sprint 1, nhóm cẩn thận chia nhỏ task tích hợp thanh toán ra làm 2 phần: luồng gọi API chuyển hướng và luồng nhận Webhook trả về. Khối lượng tiếp tục là 21 Story Points.
- Daily Scrum: Tiến độ trơn tru và chuyên nghiệp hơn hẳn. Rào cản lớn nhất phát sinh là đôi lúc server thử nghiệm (Sandbox) của MoMo phản hồi Webhook bị trễ vài phút khiến nhóm mất thời gian debug vì tưởng code của mình bị lỗi.
- Sprint Review: 
  [CHÈN ẢNH MÀN HÌNH THANH TOÁN THÀNH CÔNG HOẶC GIAO DIỆN MÃ VÉ QR VÀO ĐÂY]
  Kết quả: Hoàn thiện luồng mua vé end-to-end. Thanh toán thử nghiệm quét mã thành công, hệ thống tự động redirect về trang Success và nhả ra mã vé điện tử QR Code chứa thông tin bảo mật.
- Sprint Retrospective: Nhóm phối hợp xử lý bug chéo cho nhau rất ăn ý ở những ngày cuối. Các thành viên tự tin dự án đã hoàn thiện tốt để tiến hành đóng gói nộp bài.

3.3. Các công cụ hỗ trợ
Trong suốt 4 tuần phát triển, việc áp dụng các công cụ quản lý Agile là yếu tố then chốt giúp nhóm không bị trượt tiến độ. 
Nhóm sử dụng Trello (Kanban Board) làm Taskboard để kéo thả các thẻ công việc (từ To Do -> In Progress -> In Review -> Done). Điều này tạo ra sự minh bạch tuyệt đối, bất cứ lúc nào nhìn vào bảng cũng biết ai đang làm phần nào, tránh việc hai người làm trùng một module.
[CHÈN ẢNH CHỤP MÀN HÌNH BẢNG TRELLO (KANBAN BOARD) VÀO ĐÂY]

Ngoài ra, nhóm sử dụng biểu đồ Burndown Chart (đốt task) và biểu đồ Vận tốc (Velocity) để đánh giá hiệu suất. Biểu đồ Burndown giúp theo dõi tốc độ hoàn thành công việc mỗi ngày so với đường tiến độ lý tưởng. 
[CHÈN ẢNH CHỤP BURNDOWN CHART TỪ EXCEL VÀO ĐÂY]
Quan sát biểu đồ Sprint 1 có thể thấy, ở những ngày đầu tiên đường thực tế (Actual effort) đi ngang do nhóm bị kẹt lỗi môi trường. Nhưng nhờ có Daily Scrum để tháo gỡ rào cản kịp thời, từ ngày thứ 5 trở đi tiến độ đã tăng tốc mạnh mẽ và hoàn thành kịp 100% khối lượng công việc khi kết thúc Sprint. Đồng thời, biểu đồ Velocity cũng cho thấy nhóm đã duy trì năng suất ổn định (21 Story Points) qua cả 2 Sprint.

---

CHƯƠNG 4: TỔNG KẾT VÀ BÀI HỌC KINH NGHIỆM

4.1. Kết quả đạt được
Nhìn lại toàn bộ hành trình, nhóm tự hào đã hoàn thành 100% khối lượng công việc (đạt tối đa Story Points đề ra cho cả 2 Sprint). 
Sản phẩm phần mềm mô phỏng đặt vé hoạt động mượt mà, phản hồi nhanh. Quan trọng nhất, hệ thống đã giải quyết hoàn toàn triệt để sự cố đặt trùng ghế (Race Condition) - vấn đề nhức nhối nhất của các hệ thống bán vé, đồng thời kết nối thành công với cổng thanh toán thực tế trên môi trường Sandbox, mang lại trải nghiệm sát với các ứng dụng thương mại đang có trên thị trường.
[CHÈN ẢNH CHỤP LỊCH SỬ GIT (GIT LOG) CỦA CẢ NHÓM TRÊN GITHUB VÀO ĐÂY ĐỂ CHỨNG MINH TIẾN ĐỘ]

4.2. Khó khăn và Bài học kinh nghiệm
- Khó khăn lớn nhất: Ước lượng thời gian (estimate) ban đầu cho việc đọc tài liệu API của bên thứ 3 (như MoMo, VNPay) bị sai lệch khá nhiều. Tài liệu của đối tác khá phức tạp, đặc biệt là phần thuật toán tạo chữ ký bảo mật (Signature) mã hóa SHA256 làm nhóm mất nhiều ngày loay hoay thử nghiệm mã hóa đi mã hóa lại mới trùng khớp.
- Bài học đắt giá: Khi lập kế hoạch Sprint bằng Planning Poker, đối với những phần phụ thuộc vào hệ thống của bên ngoài, bắt buộc phải cộng thêm điểm rủi ro (Risk buffer) để không bị vỡ tiến độ. Ngoài ra, việc tuân thủ triệt để họp Daily Scrum 15 phút mỗi ngày đã "cứu" nhóm rất nhiều bàn thua trông thấy, vì hễ ai bị bí logic là được nguyên team xúm vào hỗ trợ giải quyết ngay trong ngày.

4.3. Hướng phát triển mở rộng
Dù đã hoàn thành mục tiêu cốt lõi, phần mềm vẫn còn nhiều không gian để phát triển. Nếu đồ án có thêm thời gian để chạy Sprint 3 và Sprint 4, nhóm sẽ định hướng phát triển thêm:
- Xây dựng phân hệ Admin Dashboard (bảng điều khiển) cho người quản lý rạp phim để thêm/sửa/xóa suất chiếu, và xem biểu đồ thống kê doanh thu theo thời gian thực.
- Thêm tính năng chọn mua Combo Bắp/Nước và tích hợp các mã Giảm giá (Voucher) vào khâu thanh toán.
- Triển khai (Deploy) toàn bộ hệ thống lên Cloud Server (AWS hoặc Vercel) để người dùng thực sự có thể truy cập qua domain thay vì chỉ chạy ở môi trường localhost.

---

TÀI LIỆU THAM KHẢO
[1] Hướng dẫn tích hợp thanh toán trực tuyến MoMo / VNPay (Cổng thông tin Developer Portal).
[2] Tài liệu chính thức Redis Documentation (Chuyên đề cơ chế Distributed Locks and Key Expiration).
[3] Jeff Sutherland, "Scrum: The Art of Doing Twice the Work in Half the Time" - Sách kinh điển về nguyên lý vận hành Scrum.
[4] Các diễn đàn công nghệ StackOverflow và Viblo (Tham khảo cách xử lý lỗi CORS và cấu hình Vite/React).

---

PHỤ LỤC 1: BIÊN BẢN CUỘC HỌP NHÓM

BIÊN BẢN HỌP SỐ 1 - LẬP KẾ HOẠCH SPRINT 1 (Ngày: 15/07/2026)
- Thành phần: Trần Phan Minh Thuận, Phạm Văn Thư, Phạm Thanh Tài, Phạm Thị Ngọc Trâm.
- Nội dung chính: Cả nhóm chơi Planning Poker để ước lượng điểm cho các tính năng cơ bản như Xem lịch chiếu và Chọn ghế. Quyết định chiến lược: Dời toàn bộ phần Thanh toán sang Sprint 2 vì độ rủi ro cao, dồn lực Sprint 1 giải quyết bằng được bài toán giữ ghế. Thống nhất kiến trúc Database.
- Phân công: Tài nhận phần vẽ UI sơ đồ ghế, Thư chuẩn bị backend và config Redis, Thuận viết API cốt lõi xử lý lock ghế, Trâm đảm nhận logic đếm ngược thời gian và giao diện trang chủ.

BIÊN BẢN HỌP SỐ 2 - TỔNG KẾT VÀ CẢI TIẾN SPRINT 1 (Ngày: 29/07/2026)
- Thành phần: Đầy đủ 4 thành viên.
- Nội dung chính: Tổ chức Sprint Review, demo chéo thành công tính năng chọn ghế không bị trùng trên 2 máy tính khác nhau. Tiếp đó họp Retrospective nhìn nhận lại quá trình làm việc: mất quá nhiều thời gian setup ban đầu do không thống nhất phiên bản Node.js.
- Hành động cải tiến (Action Items): Yêu cầu mọi người bắt buộc phải đẩy code lên Github mỗi ngày (push code daily) thay vì dồn vào cuối tuần để tránh bị conflict (xung đột code) nặng nề như tuần vừa qua.

BIÊN BẢN HỌP SỐ 3 - LẬP KẾ HOẠCH SPRINT 2 (Ngày: 01/08/2026)
- Thành phần: Đầy đủ 4 thành viên.
- Nội dung chính: Bắt đầu đưa các task xử lý cổng thanh toán vào Backlog. Phân tích tài liệu kỹ thuật, thống nhất phải dùng luồng dữ liệu IPN Webhook chạy ngầm để cập nhật trạng thái vé, tránh tình trạng mất tiền khi khách hàng tắt trình duyệt quá sớm.
- Phân công: Thuận và Thư đảm nhiệm phần mã hóa API và bảo mật chữ ký giao dịch, Tài và Trâm thiết kế màn hình xuất vé điện tử QR Code và giao diện Lịch sử mua vé cho người dùng.

BIÊN BẢN HỌP SỐ 4 - NGHIỆM THU TỔNG THỂ DỰ ÁN (Ngày: 15/08/2026)
- Thành phần: Đầy đủ 4 thành viên.
- Nội dung chính: Cả nhóm cùng kiểm thử (E2E Test) toàn bộ luồng từ lúc chọn phim đến lúc ra mã QR thanh toán thành công. Đánh giá luồng mượt mà, không giật lag.
- Quyết định cuối cùng: Chốt hạ không code thêm tính năng mới. Phân công nhau dọn dẹp code, xóa các file nháp, comments thừa và nén thư mục dự án chuẩn bị nộp bài. Hoàn thiện các thông số trong báo cáo bản Word. Lịch sử Git đã được đồng bộ cực kỳ đầy đủ lên repository để sẵn sàng nộp cho Giảng viên.

---

PHỤ LỤC 2: LINK SOURCE CODE VÀ HÌNH ẢNH
- Link source code (GitHub/GitLab): [Điền link Github của nhóm vào đây]
- Hình ảnh giao diện bảng quản lý công việc (Kanban board): [Chèn hình ảnh vào đây]
