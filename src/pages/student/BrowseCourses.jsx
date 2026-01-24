/**
 * BROWSE COURSES PAGE (Student)
 * Allows students to browse and enroll in available courses with Centre-based pricing
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCoursesApi } from '../../api/courseApi';
import { payWithWallet, getWalletBalance } from '../../api/paymentApi';
import '../../styles/browse-courses.css';
import '../../styles/gateway-modal.css';

export default function BrowseCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCentre, setSelectedCentre] = useState('Delhi');
    const [loading, setLoading] = useState(true);

    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [paymentStep, setPaymentStep] = useState(1); // 1: Summary, 2: Gateway, 3: Success

    const categories = ['All', 'Foundation', 'Prelims', 'Mains', 'Optional', 'Current Affairs'];
    const centres = ['Delhi', 'Pune', 'Hyderabad'];

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [selectedCategory, courses]);

    const loadCourses = async () => {
        setLoading(true);
        const response = await getAllCoursesApi();
        if (response.success) {
            // Ensure we have numeric prices for calculations
            const processedCourses = response.data.map(c => ({
                ...c,
                // Ensure price is a number, remove commas if any
                rawPrice: typeof c.price === 'string' ? parseInt(c.price.replace(/,/g, '')) : c.price
            }));
            setCourses(processedCourses);
            setFilteredCourses(processedCourses);
        }
        setLoading(false);
    };

    const filterCourses = () => {
        if (selectedCategory === 'All') {
            setFilteredCourses(courses);
        } else {
            setFilteredCourses(courses.filter(course => course.category === selectedCategory));
        }
    };

    // Pricing Logic
    const getPriceDetails = (basePrice, centre) => {
        let multiplier = 1;
        if (centre === 'Delhi') multiplier = 1.2;
        if (centre === 'Hyderabad') multiplier = 0.9;

        // Base price calculation (simulated logic for the demo)
        const price = basePrice || 10000;

        const adjustedBase = Math.round(price * multiplier);
        const gst = Math.round(adjustedBase * 0.18);
        const total = adjustedBase + gst;

        return {
            base: adjustedBase.toLocaleString('en-IN'),
            gst: gst.toLocaleString('en-IN'),
            total: total.toLocaleString('en-IN'),
            rawTotal: total
        };
    };

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setPaymentStep(1);
        setShowPaymentModal(true);
    };

    const handleProceedToPay = () => {
        setPaymentStep(2);
    };

    const handlePaymentSuccess = () => {
        setPaymentStep(3);
    };

    const handleWalletPayment = async () => {
        try {
            setLoading(true);
            const result = await payWithWallet(selectedCourse.id, selectedCentre);
            if (result.success) {
                setPaymentStep(3);
            }
        } catch (error) {
            alert(error.message || "Payment failed");
            if (error.redirectTo) {
                navigate(error.redirectTo);
            }
        } finally {
            setLoading(false);
        }
    };

    const closePaymentModal = () => {
        const isSuccess = paymentStep === 3;
        setShowPaymentModal(false);
        setSelectedCourse(null);
        setPaymentStep(1);

        if (isSuccess) {
            navigate('/student/dashboard');
        }
    };

    if (loading) {
        return (
            <div className="page-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading courses...</p>
            </div>
        );
    }

    return (
        <div className="browse-courses-page">
            <div className="page-header">
                <button onClick={() => navigate('/student/dashboard')} className="back-btn">
                    <i className="ri-arrow-left-line"></i>
                    Back to Dashboard
                </button>
                <h1>Browse Courses</h1>
                <p>Explore our comprehensive course catalog and start learning today</p>
            </div>

            {/* Centre Selection */}
            <div className="centre-selection-container">
                <span className="centre-label">Select Institute Centre:</span>
                <div className="centre-pills">
                    {centres.map(centre => (
                        <button
                            key={centre}
                            className={`centre-btn ${selectedCentre === centre ? 'active' : ''}`}
                            onClick={() => setSelectedCentre(centre)}
                        >
                            <i className="ri-map-pin-line"></i>
                            {centre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Courses Grid */}
            <div className="courses-container">
                {filteredCourses.length > 0 ? (
                    <div className="courses-grid">
                        {filteredCourses.map(course => {
                            const pricing = getPriceDetails(course.rawPrice, selectedCentre);

                            return (
                                <div key={course.id} className="course-card-detailed">
                                    <div className="course-image">
                                        <img src={course.thumbnail} alt={course.title} />
                                        <span className="course-badge">{course.category}</span>
                                    </div>

                                    <div className="course-content">
                                        <h3>{course.title}</h3>
                                        <p className="course-description">{course.description}</p>

                                        <div className="course-meta">
                                            <div className="meta-item">
                                                <i className="ri-user-line"></i>
                                                <span>{course.instructor}</span>
                                            </div>
                                            <div className="meta-item">
                                                <i className="ri-time-line"></i>
                                                <span>{course.duration}</span>
                                            </div>
                                            <div className="meta-item">
                                                <i className="ri-star-fill"></i>
                                                <span>{course.rating}</span>
                                            </div>
                                        </div>

                                        <div className="pricing-box">
                                            <div className="price-row">
                                                <span className="price-label">Fee ({selectedCentre}):</span>
                                                <span className="price-value">₹{pricing.base}</span>
                                            </div>
                                            <div className="price-row gst">
                                                <span className="price-label">GST (18%):</span>
                                                <span className="price-value">+ ₹{pricing.gst}</span>
                                            </div>
                                            <div className="price-row total">
                                                <span className="price-label">Total:</span>
                                                <span className="price-value">₹{pricing.total}</span>
                                            </div>
                                        </div>

                                        <div className="card-actions">
                                            <button className="view-details-btn" onClick={() => navigate(`/course-details/${course.id}`)}>
                                                View Details
                                            </button>
                                            <button
                                                className="enroll-btn-primary"
                                                onClick={() => handleEnrollClick(course)}
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="empty-state">
                        <i className="ri-book-line"></i>
                        <p>No courses found in this category</p>
                    </div>
                )}
            </div>

            {/* Payment Flow Modal - NEW GATEWAY STYLE */}
            {showPaymentModal && selectedCourse && (
                <div className="modal-backdrop">
                    {/* Step 1 & 2 Merged: The "Gateway" View */}
                    {paymentStep < 3 && (
                        <div className="gateway-modal">
                            {/* Left Sidebar - Summary & Branding */}
                            <div className="gateway-sidebar">
                                <div className="gateway-brand">
                                    <div style={{ background: 'white', padding: '8px', borderRadius: '8px' }}>
                                        <span style={{ fontWeight: 800, color: '#EE5253', fontSize: '1.2rem' }}>SR</span>
                                    </div>
                                    <div>
                                        <span className="brand-name">SRIRAM's IAS</span>
                                        <span className="trusted-badge"><i className="ri-shield-check-fill"></i> Trusted Business</span>
                                    </div>
                                </div>

                                <div className="price-summary-box">
                                    <div className="summary-label">Amount to Pay</div>
                                    {(() => {
                                        const pricing = getPriceDetails(selectedCourse.rawPrice, selectedCentre);
                                        return <div className="summary-amount">₹{pricing.total}</div>;
                                    })()}
                                </div>

                                <div className="user-details">
                                    <div className="user-row">
                                        <i className="ri-user-smile-line"></i>
                                        <span>Student User</span>
                                    </div>
                                    <div className="user-row">
                                        <i className="ri-mail-line"></i>
                                        <span>student@shriramias.com</span>
                                    </div>
                                    <div className="user-row">
                                        <i className="ri-phone-line"></i>
                                        <span>+91 98765 43210</span>
                                    </div>
                                </div>

                                <div className="offers-strip">
                                    <i className="ri-percent-line"></i>
                                    <span>Save ₹500 using UPI</span>
                                </div>
                            </div>

                            {/* Right Content - Payment Options */}
                            <div className="gateway-content">
                                <div className="gateway-header">
                                    <div>
                                        <h3>Payment Options</h3>
                                        {(() => {
                                            const pricing = getPriceDetails(selectedCourse.rawPrice, selectedCentre);
                                            return (
                                                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                                                    <span>Course Fee: ₹{pricing.base}</span>
                                                    <span style={{ margin: '0 0.5rem' }}>•</span>
                                                    <span>GST (18%): ₹{pricing.gst}</span>
                                                    <span style={{ margin: '0 0.5rem' }}>•</span>
                                                    <span><i className="ri-map-pin-line"></i> {selectedCentre} Centre</span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                    <button className="gateway-close" onClick={closePaymentModal}>
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>

                                <div className="gateway-body">
                                    {/* View 1: List of Methods */}
                                    {paymentStep === 1 && (
                                        <>
                                            <div className="payment-section-title">Recommended</div>
                                            <div className="payment-options-list">
                                                <div className="gateway-option" onClick={() => setPaymentStep(2)}>
                                                    <div className="option-icon" style={{ color: '#2ecc71', background: '#e8f8f5' }}>
                                                        <i className="ri-qr-code-line"></i>
                                                    </div>
                                                    <div className="option-details">
                                                        <div className="option-name">UPI QR</div>
                                                        <div className="option-sub">Scan and pay with any UPI app</div>
                                                    </div>
                                                    <i className="ri-arrow-right-s-line option-arrow"></i>
                                                </div>

                                                <div className="payment-section-title" style={{ marginTop: '1.5rem' }}>Other Payment Methods</div>

                                                <div className="gateway-option" onClick={() => setPaymentStep(2.5)}>
                                                    <div className="option-icon" style={{ color: '#3498db', background: '#ebf5fb' }}>
                                                        <i className="ri-bank-card-line"></i>
                                                    </div>
                                                    <div className="option-details">
                                                        <div className="option-name">Card</div>
                                                        <div className="option-sub">Visa, Mastercard, RuPay, Amex</div>
                                                    </div>
                                                    <i className="ri-arrow-right-s-line option-arrow"></i>
                                                </div>

                                                <div className="gateway-option" onClick={handlePaymentSuccess}>
                                                    <div className="option-icon" style={{ color: '#9b59b6', background: '#f5eef8' }}>
                                                        <i className="ri-bank-line"></i>
                                                    </div>
                                                    <div className="option-details">
                                                        <div className="option-name">Netbanking</div>
                                                        <div className="option-sub">All Indian banks supported</div>
                                                    </div>
                                                    <i className="ri-arrow-right-s-line option-arrow"></i>
                                                </div>

                                                <div className="gateway-option" onClick={handlePaymentSuccess}>
                                                    <div className="option-icon" style={{ color: '#e67e22', background: '#fdf2e9' }}>
                                                        <i className="ri-wallet-3-line"></i>
                                                    </div>
                                                    <div className="option-details">
                                                        <div className="option-name">Other Wallets</div>
                                                        <div className="option-sub">PhonePe, Paytm, Amazon Pay</div>
                                                    </div>
                                                    <i className="ri-arrow-right-s-line option-arrow"></i>
                                                </div>

                                                <div className="gateway-option" onClick={handleWalletPayment} style={{ border: '2px solid #EE5253', background: '#fffef0' }}>
                                                    <div className="option-icon" style={{ color: '#EE5253', background: '#fff5f5' }}>
                                                        <i className="ri-wallet-fill"></i>
                                                    </div>
                                                    <div className="option-details">
                                                        <div className="option-name">SRIRAM Wallet (₹{getWalletBalance()})</div>
                                                        <div className="option-sub" style={{ color: '#EE5253', fontWeight: 'bold' }}>Pay securely using your wallet balance</div>
                                                    </div>
                                                    <i className="ri-arrow-right-s-line option-arrow"></i>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* View 2: QR Code Scan */}
                                    {paymentStep === 2 && (
                                        <div className="qr-payment-view">
                                            <button
                                                onClick={() => setPaymentStep(1)}
                                                style={{ border: 'none', background: 'none', color: '#666', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            >
                                                <i className="ri-arrow-left-line"></i> Back to options
                                            </button>

                                            <h3>Scan to Pay</h3>
                                            <div className="qr-container">
                                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=shriramias@upi&pn=ShriRamIAS&am=10000" alt="Payment QR" />
                                                <div className="payment-timer">14:59</div>
                                            </div>
                                            <p className="scan-instruction">Open any UPI app (GooglePay, PhonePe, Paytm) on your phone and scan the QR code to pay.</p>

                                            <button
                                                className="enroll-btn-primary"
                                                onClick={handlePaymentSuccess}
                                                style={{ maxWidth: '200px', margin: '0 auto' }}
                                            >
                                                Simulate Payment Done
                                            </button>
                                        </div>
                                    )}

                                    {/* View 2.5: Card Details Form */}
                                    {paymentStep === 2.5 && (
                                        <div className="card-payment-view">
                                            <button
                                                onClick={() => setPaymentStep(1)}
                                                style={{ border: 'none', background: 'none', color: '#666', cursor: 'pointer', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            >
                                                <i className="ri-arrow-left-line"></i> Back to options
                                            </button>

                                            <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Enter Card Details</h3>

                                            <form onSubmit={(e) => { e.preventDefault(); handlePaymentSuccess(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>
                                                        Card Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength="19"
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            fontSize: '1rem',
                                                            fontFamily: 'monospace'
                                                        }}
                                                    />
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>
                                                            Expiry Date
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            maxLength="5"
                                                            required
                                                            style={{
                                                                width: '100%',
                                                                padding: '0.75rem',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '8px',
                                                                fontSize: '1rem',
                                                                fontFamily: 'monospace'
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>
                                                            CVV
                                                        </label>
                                                        <input
                                                            type="password"
                                                            placeholder="123"
                                                            maxLength="3"
                                                            required
                                                            style={{
                                                                width: '100%',
                                                                padding: '0.75rem',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '8px',
                                                                fontSize: '1rem',
                                                                fontFamily: 'monospace'
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>
                                                        Cardholder Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Name as on card"
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.75rem',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            fontSize: '1rem',
                                                            textTransform: 'uppercase'
                                                        }}
                                                    />
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: '#f0f9ff', borderRadius: '8px', fontSize: '0.85rem', color: '#0369a1' }}>
                                                    <i className="ri-shield-check-line" style={{ fontSize: '1.2rem' }}></i>
                                                    <span>Your card details are encrypted and secure</span>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="enroll-btn-primary"
                                                    style={{ marginTop: '0.5rem' }}
                                                >
                                                    Pay Now
                                                </button>
                                            </form>
                                        </div>
                                    )}

                                    <div className="gateway-security-footer">
                                        <i className="ri-lock-2-fill"></i>
                                        Secured by <strong>Razorpay</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Success View */}
                    {paymentStep === 3 && (
                        <div className="payment-modal" style={{ background: '#1a202c', color: 'white', maxWidth: '400px' }}>
                            <div className="modal-body" style={{ textAlign: 'center', padding: '3rem' }}>
                                <div className="success-icon" style={{
                                    background: '#2ecc71',
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifySelf: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    fontSize: '3rem',
                                    color: 'white'
                                }}>
                                    <i className="ri-checkbox-circle-fill"></i>
                                </div>
                                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Payment Successful!</h3>
                                <p style={{ color: '#a0aec0', marginBottom: '1.5rem' }}>You have successfully enrolled in <strong>{selectedCourse.title}</strong>.</p>
                                <p style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '2rem' }}>Transaction ID: #SR{Math.floor(Math.random() * 1000000)}</p>
                                <button
                                    className="modal-cta-btn"
                                    onClick={closePaymentModal}
                                    style={{
                                        marginTop: '0',
                                        background: '#EE5253',
                                        color: 'white',
                                        height: '50px',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 14px rgba(238, 82, 83, 0.4)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    Go to My Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
