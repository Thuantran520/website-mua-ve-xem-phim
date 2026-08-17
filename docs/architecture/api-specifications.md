# API Specifications - Website Mua Vé Xem Phim

Tài liệu này đặc tả các REST API chính của hệ thống, tập trung vào luồng sơ đồ ghế, giữ chỗ và thanh toán.

---

## 1. API Sơ đồ ghế (Sprint 1)

### 1.1 Lấy danh sách ghế của Suất chiếu
*   **Endpoint:** `/api/v1/showtimes/{showtimeId}/seats`
*   **Method:** `GET`
*   **Headers:** `Content-Type: application/json`
*   **Phản hồi thành công (200 OK):**
```json
{
  "showtime_id": 102,
  "room_name": "Phòng chiếu 05",
  "seats": [
    {
      "seat_id": 1201,
      "seat_row": "F",
      "seat_number": 8,
      "seat_type": "VIP",
      "status": "AVAILABLE",
      "price": 120000.00
    },
    {
      "seat_id": 1202,
      "seat_row": "F",
      "seat_number": 9,
      "seat_type": "VIP",
      "status": "LOCKED",
      "locked_until": "2026-08-17T20:35:00+07:00",
      "price": 120000.00
    },
    {
      "seat_id": 1203,
      "seat_row": "F",
      "seat_number": 10,
      "seat_type": "VIP",
      "status": "BOOKED",
      "price": 120000.00
    }
  ]
}
```

---

### 1.2 Khóa giữ chỗ ghế tạm thời (Redis Lock)
*   **Endpoint:** `/api/v1/bookings/lock-seats`
*   **Method:** `POST`
*   **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <JWT_TOKEN>`
*   **Yêu cầu (Request Body):**
```json
{
  "showtime_id": 102,
  "seat_ids": [1201, 1202]
}
```
*   **Phản hồi thành công (201 Created):**
```json
{
  "booking_id": 9851,
  "status": "PENDING",
  "locked_seats": [1201, 1202],
  "expires_in_seconds": 300,
  "total_price": 240000.00,
  "message": "Ghế đã được giữ thành công trong 5 phút. Vui lòng thanh toán."
}
```
*   **Phản hồi lỗi xung đột (409 Conflict - Ghế đã bị người khác khóa/mua):**
```json
{
  "error": "SEAT_ALREADY_LOCKED_OR_BOOKED",
  "message": "Một hoặc nhiều ghế bạn chọn đã bị khóa hoặc đã được mua bởi người khác. Vui lòng chọn ghế khác."
}
```

---

## 2. API Thanh toán & Webhook (Sprint 2)

### 2.1 Tạo yêu cầu thanh toán (Redirect)
*   **Endpoint:** `/api/v1/payments/create-payment`
*   **Method:** `POST`
*   **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer <JWT_TOKEN>`
*   **Yêu cầu (Request Body):**
```json
{
  "booking_id": 9851,
  "payment_method": "MOMO" // Hoặc "VNPAY"
}
```
*   **Phản hồi thành công (200 OK):**
```json
{
  "booking_id": 9851,
  "payment_url": "https://test-payment.momo.vn/v2/gateway/api/payment?signature=...",
  "message": "Chuyển hướng người dùng đến cổng thanh toán."
}
```

---

### 2.2 Endpoint Webhook / IPN nhận kết quả thanh toán từ MoMo
*   **Endpoint:** `/api/v1/payments/webhook/momo`
*   **Method:** `POST`
*   **Headers:** `Content-Type: application/json`
*   **Mô tả:** Được gọi bất đồng bộ từ Server MoMo đến Server của chúng ta khi giao dịch hoàn tất.
*   **Yêu cầu (Request Body từ MoMo):**
```json
{
  "partnerCode": "MOMOBKUN20180529",
  "orderId": "BOOKING-9851",
  "requestId": "REQ-9851-171822",
  "amount": 240000,
  "orderInfo": "Thanh toan ve xem phim booking 9851",
  "orderType": "momo_wallet",
  "transId": 2305819385,
  "resultCode": 0, // 0 nghĩa là giao dịch thành công
  "message": "Successful.",
  "payType": "qr",
  "responseTime": 1718222384,
  "signature": "8a3bb45db47ff567bc...23194" // Chữ ký số dùng để đối chiếu bảo mật
}
```
*   **Phản hồi trả về MoMo (200 OK):**
```json
{
  "partnerCode": "MOMOBKUN20180529",
  "orderId": "BOOKING-9851",
  "resultCode": 0,
  "message": "Received."
}
```
