import React, { useState, useEffect, useRef } from 'react';
import { 
  Film, 
  Clock, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  Mail, 
  Lock, 
  Unlock, 
  Calendar, 
  ChevronRight, 
  Info,
  Users,
  Database
} from 'lucide-react';

// Mock Showtime Data
const MOCK_SHOWTIME = {
  id: 102,
  movieTitle: "Đào, Phở và Piano",
  moviePoster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&auto=format&fit=crop&q=80",
  roomName: "Phòng chiếu số 5 (IMAX)",
  date: "17/08/2026",
  time: "20:30 - 22:15",
  prices: {
    STANDARD: 85000,
    VIP: 120000,
    COUPLE: 200000
  }
};

// Generate Seat List (A-D: Standard, E-G: VIP, H: Couple)
const generateSeats = () => {
  const list = [];
  // Standard Rows
  ['A', 'B', 'C', 'D'].forEach(row => {
    for (let i = 1; i <= 10; i++) {
      list.push({
        id: `${row}-${i}`,
        row,
        number: i,
        type: 'STANDARD',
        status: (row === 'B' && (i === 3 || i === 4)) ? 'BOOKED' : 'AVAILABLE',
        price: MOCK_SHOWTIME.prices.STANDARD
      });
    }
  });
  // VIP Rows
  ['E', 'F', 'G'].forEach(row => {
    for (let i = 1; i <= 10; i++) {
      list.push({
        id: `${row}-${i}`,
        row,
        number: i,
        type: 'VIP',
        status: (row === 'F' && i === 5) ? 'BOOKED' : 'AVAILABLE',
        price: MOCK_SHOWTIME.prices.VIP
      });
    }
  });
  // Couple Row
  for (let i = 1; i <= 5; i++) {
    list.push({
      id: `H-${i}`,
      row: 'H',
      number: i,
      type: 'COUPLE',
      status: (i === 1) ? 'BOOKED' : 'AVAILABLE',
      price: MOCK_SHOWTIME.prices.COUPLE
    });
  }
  return list;
};

function App() {
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentView, setCurrentView] = useState('SELECTION'); // SELECTION, PAYMENT, GATEWAY, SUCCESS
  const [paymentMethod, setPaymentMethod] = useState('MOMO'); // MOMO or VNPAY
  const [isConcurrencyMode, setIsConcurrencyMode] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Timer State (300 seconds = 5 minutes)
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Countdown timer logic
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      // Expiry logic: Unlock seats
      setIsTimerRunning(false);
      // Reset seat statuses
      setSeats(prev => prev.map(s => 
        selectedSeats.includes(s.id) ? { ...s, status: 'AVAILABLE' } : s
      ));
      setSelectedSeats([]);
      setCurrentView('SELECTION');
      setErrorMessage("Hết hạn 5 phút giữ ghế! Redis đã tự động xóa khóa (Key TTL Expired) để nhường quyền đặt ghế cho người khác.");
      setShowErrorModal(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isTimerRunning]);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle seat click
  const handleSeatClick = (seatId) => {
    if (currentView !== 'SELECTION') return;
    
    const clickedSeat = seats.find(s => s.id === seatId);
    if (clickedSeat.status === 'BOOKED' || clickedSeat.status === 'LOCKED') return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  // Lock seats (Distributed Lock Simulator)
  const handleLockSeats = () => {
    if (selectedSeats.length === 0) return;

    // SIMULATE CONCURRENCY: If Concurrency Mode is on and User selects a specific target seat (e.g., F-8)
    if (isConcurrencyMode) {
      const targetSeatId = selectedSeats[0];
      setErrorMessage(`Lỗi Concurrency (Đã chặn ở Redis): Ghế [${targetSeatId}] đang bị người dùng khác khóa giữ chỗ. Chi tiết log: REDIS_LOCK_CONFLICT (SET NX PX failed). Vui lòng tải lại trang hoặc chọn ghế khác.`);
      setShowErrorModal(true);
      setSelectedSeats([]);
      return;
    }

    // Lock seats locally
    setSeats(prev => prev.map(s => 
      selectedSeats.includes(s.id) ? { ...s, status: 'LOCKED' } : s
    ));
    
    // Start 5-minute countdown (300 seconds)
    setTimeLeft(300);
    setIsTimerRunning(true);
    setCurrentView('PAYMENT');
  };

  // Cancel / Unlock seats early
  const handleCancelBooking = () => {
    setSeats(prev => prev.map(s => 
      selectedSeats.includes(s.id) ? { ...s, status: 'AVAILABLE' } : s
    ));
    setSelectedSeats([]);
    setIsTimerRunning(false);
    setTimeLeft(0);
    setCurrentView('SELECTION');
  };

  // Simulating Payment redirection
  const handlePay = () => {
    setCurrentView('GATEWAY');
  };

  // Simulating IPN / Webhook call success from Gateway
  const handleSimulateWebhook = () => {
    // 1. Change locked status to BOOKED
    setSeats(prev => prev.map(s => 
      selectedSeats.includes(s.id) ? { ...s, status: 'BOOKED' } : s
    ));
    
    // 2. Stop timer
    setIsTimerRunning(false);
    
    // 3. Move to Success view
    setCurrentView('SUCCESS');
  };

  // Calculate total payment price
  const calculateTotalPrice = () => {
    return selectedSeats.reduce((sum, id) => {
      const seat = seats.find(s => s.id === id);
      return sum + (seat ? seat.price : 0);
    }, 0);
  };

  return (
    <div className="container">
      {/* Header Panel */}
      <header>
        <div className="logo-container">
          <Film className="pulse" color="#f59e0b" size={32} />
          <div>
            <h2 className="logo-text">CINEMA BOOKING</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Scrum Team 4 members</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span className="team-badge">Sprint 1 & 2 Demo</span>
          <span className="team-badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}>
            Tech Lead: Minh Thuận
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      {currentView === 'SELECTION' && (
        <div className="movie-grid">
          {/* Left panel: Seat Map Selection */}
          <div className="glass-card">
            <div className="movie-banner">
              <img className="movie-poster" src={MOCK_SHOWTIME.moviePoster} alt="Poster" />
              <div className="movie-info">
                <h1>{MOCK_SHOWTIME.movieTitle}</h1>
                <div className="movie-meta">
                  <span className="movie-tag">13+</span>
                  <span>IMAX 2D</span>
                  <span>105 phút</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <Calendar size={16} />
                  <span>Suất chiếu: <strong>{MOCK_SHOWTIME.time}</strong> ngày {MOCK_SHOWTIME.date}</span>
                </div>
              </div>
            </div>

            {/* Screen representation */}
            <div className="screen-container">
              <div className="screen-curve"></div>
              <span className="screen-label">MÀN HÌNH CHIẾU PHIM</span>
            </div>

            {/* Interactive Seat map */}
            <div className="seat-map">
              {/* Render row by row */}
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
                <div className="seat-row" key={row}>
                  <span className="row-label">{row}</span>
                  {seats.filter(s => s.row === row).map(seat => {
                    const isSelected = selectedSeats.includes(seat.id);
                    const classes = `seat ${seat.type.toLowerCase()} ${
                      seat.status === 'BOOKED' ? 'booked' : ''
                    } ${seat.status === 'LOCKED' ? 'locked' : ''} ${
                      isSelected ? 'selected' : ''
                    }`;

                    return (
                      <div 
                        key={seat.id} 
                        className={classes}
                        onClick={() => handleSeatClick(seat.id)}
                      >
                        {seat.status === 'LOCKED' ? (
                          <Lock size={12} />
                        ) : seat.type === 'COUPLE' ? (
                          `H-${seat.number}`
                        ) : (
                          seat.number
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="seat-legend">
              <div className="legend-item">
                <div className="legend-dot available"></div>
                <span>Thường (85k)</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot vip"></div>
                <span>VIP (120k)</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot couple"></div>
                <span>Đôi (200k)</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot selected"></div>
                <span>Đang chọn</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot locked"></div>
                <span>Đang giữ chỗ (5 phút)</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot booked"></div>
                <span>Đã bán</span>
              </div>
            </div>
          </div>

          {/* Right panel: Ticket Booking Summary & Simulator widget */}
          <div className="booking-summary-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card booking-summary">
              <h3 className="summary-title">Thông tin giữ chỗ</h3>
              
              <div className="summary-row">
                <span className="summary-label">Rạp</span>
                <span className="summary-value">{MOCK_SHOWTIME.roomName}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Ghế đã chọn</span>
                <span className="summary-value">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn ghế'}
                </span>
              </div>

              <div className="summary-row" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <span className="summary-label">Tạm tính</span>
                <span className="summary-value price">
                  {calculateTotalPrice().toLocaleString('vi-VN')} đ
                </span>
              </div>

              <button 
                className="btn-primary" 
                disabled={selectedSeats.length === 0}
                onClick={handleLockSeats}
              >
                <Lock size={18} />
                Tiến hành giữ ghế (5 phút)
              </button>
            </div>

            {/* Agile Concurrency Simulator Control Widget */}
            <div className="simulator-panel">
              <div className="simulator-header">
                <Database size={18} />
                <span>Agile Concurrency Simulator</span>
              </div>
              <p className="simulator-desc">
                Giả lập Race Condition: Khi bật chế độ này và bạn chọn ghế F-8 để nhấn giữ chỗ, hệ thống sẽ mô phỏng tình huống một User khác nhấn nút cùng mili-giây và bị chặn bởi Redis Distributed Lock.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input 
                  type="checkbox" 
                  id="concurrency_toggle"
                  checked={isConcurrencyMode}
                  onChange={(e) => setIsConcurrencyMode(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="concurrency_toggle" style={{ fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600, color: '#93c5fd' }}>
                  Kích hoạt tranh chấp ghế (Race Condition)
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Invoice overview & Select payment gateways */}
      {currentView === 'PAYMENT' && (
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="summary-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard color="#f59e0b" />
            Chọn phương thức thanh toán
          </h2>
          
          <div className="timer-box" style={{ margin: '1.5rem 0' }}>
            <Clock size={20} />
            <div style={{ flex: 1 }}>
              <span>Thời gian còn lại để hoàn tất thanh toán:</span>
            </div>
            <span className="timer-value">{formatTime(timeLeft)}</span>
          </div>

          <div style={{ margin: '1.5rem 0' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hóa đơn đặt vé:</p>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div className="summary-row" style={{ marginBottom: '0.5rem' }}>
                <span>Phim: <strong>{MOCK_SHOWTIME.movieTitle}</strong></span>
              </div>
              <div className="summary-row" style={{ marginBottom: '0.5rem' }}>
                <span>Ghế: <strong>{selectedSeats.join(', ')}</strong></span>
              </div>
              <div className="summary-row">
                <span>Tổng tiền: <strong style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{calculateTotalPrice().toLocaleString('vi-VN')} đ</strong></span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Cổng thanh toán điện tử (Sandbox):</p>
          <div className="payment-methods-grid">
            <div 
              className={`payment-method-card ${paymentMethod === 'MOMO' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('MOMO')}
            >
              <img className="payment-logo" src="https://img.icons8.com/color/96/momo-wallet.png" alt="MoMo" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Ví Điện Tử MoMo</span>
            </div>
            <div 
              className={`payment-method-card ${paymentMethod === 'VNPAY' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('VNPAY')}
            >
              <img className="payment-logo" src="https://img.icons8.com/color/96/vietnam-post-office.png" alt="VNPay" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Cổng VNPay</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ background: '#334155', color: '#f1f5f9' }} onClick={handleCancelBooking}>
              Hủy giao dịch
            </button>
            <button className="btn-primary" onClick={handlePay}>
              Thanh toán ngay
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* View 3: Gateway Simulator Screen */}
      {currentView === 'GATEWAY' && (
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <div className="payment-gateway-mockup">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <img 
                src={paymentMethod === 'MOMO' ? "https://img.icons8.com/color/96/momo-wallet.png" : "https://img.icons8.com/color/96/vietnam-post-office.png"} 
                alt="Logo" 
                style={{ height: '32px' }} 
              />
              <span className="payment-gateway-title">
                {paymentMethod === 'MOMO' ? 'MOMO SANDBOX GATEWAY' : 'VNPAY SANDBOX'}
              </span>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Đang giả lập thanh toán hóa đơn của website mua vé xem phim.
            </p>

            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', margin: '1rem 0' }}>
              {/* Simulating QR Payment scanner */}
              <div style={{ width: '150px', height: '150px', margin: '0 auto', border: '4px solid #000', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                <QrCode size={120} color="#000" />
              </div>
              <p style={{ color: '#000', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.5rem' }}>
                Số tiền: {calculateTotalPrice().toLocaleString('vi-VN')} đ
              </p>
            </div>

            <div className="simulator-panel" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)', width: '100%' }}>
              <div className="simulator-header" style={{ color: '#f87171' }}>
                <Database size={16} />
                <span>Simulate Webhook / IPN Event</span>
              </div>
              <p className="simulator-desc" style={{ textAlign: 'left' }}>
                Trong thực tế, khi bạn quét mã thành công, MoMo/VNPay sẽ gửi tín hiệu Webhook (IPN API) về cho Backend một cách bất đồng bộ để thực hiện lưu trữ DB và xác nhận đặt vé, kể cả khi bạn tắt trình duyệt.
              </p>
              <button className="btn-primary" style={{ background: '#ef4444', color: '#ffffff' }} onClick={handleSimulateWebhook}>
                Xác nhận Webhook thành công (IPN)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View 4: Success Ticket Screen */}
      {currentView === 'SUCCESS' && (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="ticket">
            <div className="ticket-header">
              <div>
                <span className="team-badge" style={{ fontSize: '0.7rem' }}>VÉ XEM PHIM ĐIỆN TỬ</span>
                <h3 style={{ marginTop: '0.5rem', color: '#f8fafc' }}>{MOCK_SHOWTIME.movieTitle}</h3>
              </div>
              <CheckCircle2 color="#10b981" size={40} className="pulse" />
            </div>
            
            <div className="ticket-body">
              <div className="ticket-grid">
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SUẤT CHIẾU</span>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{MOCK_SHOWTIME.time}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>RẠP</span>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{MOCK_SHOWTIME.roomName}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>GHẾ</span>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)' }}>{selectedSeats.join(', ')}</p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>NGÀY CHIẾU</span>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{MOCK_SHOWTIME.date}</p>
                </div>
              </div>

              <div className="ticket-qr-container">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>MÃ SOÁT VÉ QR CODE</span>
                <div className="ticket-qr" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={110} color="#000" />
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Mã vé ký số: SECURE_JWT_TICKET_9851</span>
              </div>
            </div>
          </div>

          <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Mail color="#10b981" size={24} />
            <div style={{ fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 700, color: '#34d399' }}>Hệ thống đã gửi email tự động!</span>
              <p style={{ color: 'var(--text-secondary)' }}>Vé điện tử kèm QR Code đã gửi về hòm thư của bạn.</p>
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={() => {
              // Reset all to selection
              setSelectedSeats([]);
              setCurrentView('SELECTION');
            }}
          >
            Quay lại trang chủ đặt vé
          </button>
        </div>
      )}

      {/* Agile Information Footer Bar */}
      <div className="agile-info-bar">
        <div className="info-bar-item">
          <Info size={16} color="var(--accent)" />
          <span>Sprint 1: Concurrency Seat Lock (Redis Distributed Lock)</span>
        </div>
        <div className="info-bar-item">
          <CreditCard size={16} color="var(--accent)" />
          <span>Sprint 2: Payment Integration (Momo & VNPay Webhook IPN)</span>
        </div>
        <div className="info-bar-item">
          <Users size={16} color="var(--accent)" />
          <span>Nhóm: Thuận, Tài, Trâm, Thư (Công nghệ phần mềm)</span>
        </div>
      </div>

      {/* Error / Warning Modal for Concurrency & Timeout */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-title">
              <AlertTriangle color="#ef4444" size={24} />
              <span>CẢNH BÁO HỆ THỐNG</span>
            </div>
            <p className="modal-desc">{errorMessage}</p>
            <button className="btn-primary" style={{ background: '#ef4444', color: 'white' }} onClick={() => setShowErrorModal(false)}>
              Xác nhận và tiếp tục
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
