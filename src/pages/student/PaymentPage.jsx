/**
 * PAYMENT PAGE
 * Secure checkout for course enrollment
 */

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../api/authApi';
import '../../styles/payment-page.css'; // Will create this next

export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const [gstBranch, setGstBranch] = useState('pune');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // GST Configuration
    const gstBranches = [
        { id: 'pune', name: 'Pune Branch (MH)', number: '27AAAAA0000A1Z5' },
        { id: 'delhi', name: 'Delhi Branch (DL)', number: '07BBBBB0000B1Z5' },
        { id: 'hyderabad', name: 'Hyderabad Branch (TG)', number: '36CCCCC0000C1Z5' }
    ];

    useEffect(() => {
        // Get course from navigation state
        if (location.state && location.state.course) {
            setCourse(location.state.course);
        } else {
            // Redirect if accessed directly without course
            navigate('/student/browse-courses');
        }

        setUser(getCurrentUser());
    }, [location, navigate]);

    if (!course || !user) return null;

    // Calculations
    const basePrice = course.discountedPrice || course.price;
    const gstRate = 0.18;
    const gstAmount = Math.round(basePrice * gstRate);
    const totalAmount = basePrice + gstAmount;

    const handlePayment = async (e) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            setPaymentSuccess(true);

            // After success, redirect to dashboard or course page after a delay
            setTimeout(() => {
                navigate('/student/dashboard', {
                    state: {
                        paymentSuccess: true,
                        courseName: course.title
                    }
                });
            }, 2000);
        }, 2000);
    };

    if (paymentSuccess) {
        return (
            <div className="payment-success-container">
                <div className="success-content">
                    <div className="success-icon">
                        <i className="ri-check-line"></i>
                    </div>
                    <h2>Payment Successful!</h2>
                    <p>Thank you for enrolling in <strong>{course.title}</strong></p>
                    <p className="redirect-msg">Redirecting to your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-page">
            <div className="payment-header">
                <button onClick={() => navigate(-1)} className="back-btn-simple">
                    <i className="ri-arrow-left-line"></i> Back
                </button>
                <h1>Secure Checkout</h1>
            </div>

            <div className="payment-container">
                {/* Left Column - Payment Details */}
                <div className="payment-details">

                    {/* GST Branch Selection */}
                    <div className="payment-section">
                        <h3><i className="ri-building-line"></i> Select GST Branch</h3>
                        <p className="section-desc">Choose the branch for your tax invoice</p>

                        <div className="gst-options">
                            {gstBranches.map(branch => (
                                <label key={branch.id} className={`gst-option ${gstBranch === branch.id ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="gstBranch"
                                        value={branch.id}
                                        checked={gstBranch === branch.id}
                                        onChange={(e) => setGstBranch(e.target.value)}
                                    />
                                    <div className="gst-info">
                                        <span className="branch-name">{branch.name}</span>
                                        <span className="gst-number">GSTIN: {branch.number}</span>
                                    </div>
                                    {gstBranch === branch.id && <i className="ri-check-circle-fill check-icon"></i>}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="payment-section">
                        <h3><i className="ri-secure-payment-line"></i> Payment Method</h3>

                        <div className="payment-methods-tabs">
                            <button
                                className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                <i className="ri-bank-card-line"></i> Card
                            </button>
                            <button
                                className={`method-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('upi')}
                            >
                                <i className="ri-qr-code-line"></i> UPI
                            </button>
                            <button
                                className={`method-tab ${paymentMethod === 'razorpay' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('razorpay')}
                            >
                                <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="razorpay-icon" /> Razorpay
                            </button>
                        </div>

                        <div className="payment-form">
                            {paymentMethod === 'card' && (
                                <form onSubmit={handlePayment} className="card-form">
                                    <div className="form-group">
                                        <label>Card Number</label>
                                        <div className="input-with-icon">
                                            <i className="ri-bank-card-2-line"></i>
                                            <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" maxLength="5" required />
                                        </div>
                                        <div className="form-group">
                                            <label>CVV</label>
                                            <input type="password" placeholder="123" maxLength="3" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Cardholder Name</label>
                                        <input type="text" placeholder="Name on card" required />
                                    </div>
                                </form>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="upi-form">
                                    <div className="form-group">
                                        <label>Enter UPI ID</label>
                                        <div className="input-with-icon">
                                            <i className="ri-at-line"></i>
                                            <input type="text" placeholder="username@bank" />
                                        </div>
                                    </div>
                                    <div className="upi-apps">
                                        <span>Or pay using:</span>
                                        <div className="app-icons">
                                            <span className="app-icon gpay">GPay</span>
                                            <span className="app-icon phonepe">PhonePe</span>
                                            <span className="app-icon paytm">Paytm</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'razorpay' && (
                                <div className="razorpay-info">
                                    <div className="razorpay-logo-large">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" />
                                    </div>
                                    <p>You will be redirected to Razorpay secure payment gateway to complete your transaction.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="order-summary-container">
                    <div className="order-summary">
                        <h3>Order Summary</h3>

                        <div className="course-preview">
                            <img src={course.thumbnail} alt={course.title} />
                            <div className="preview-details">
                                <h4>{course.title}</h4>
                                <span className="cat-badge">{course.category}</span>
                            </div>
                        </div>

                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>Course Price</span>
                                <span>₹{basePrice.toLocaleString()}</span>
                            </div>
                            <div className="price-row">
                                <span>GST (18%)</span>
                                <span>₹{gstAmount.toLocaleString()}</span>
                            </div>
                            {/* GST Branch Info Highlight */}
                            <div className="gst-badge-info">
                                <small>Invoice from: {gstBranches.find(b => b.id === gstBranch)?.name}</small>
                            </div>
                            <div className="divider"></div>
                            <div className="price-row total">
                                <span>Total Amount</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            className="pay-btn"
                            onClick={handlePayment}
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <i className="ri-loader-4-line rotating"></i> Processing...
                                </>
                            ) : (
                                <>
                                    Pay ₹{totalAmount.toLocaleString()}
                                </>
                            )}
                        </button>

                        <p className="secure-badge">
                            <i className="ri-shield-check-line"></i> 100% Secure Payment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
