
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className="register-container">
            {/* Left Side: Visual/Branding */}
            <div className="register-branding" style={{ backgroundImage: "url('/assets/hero-bg.png')" }}>
                <div className="branding-content">
                    <Link to="/" className="logo text-white mb-4" style={{ display: 'inline-block', fontSize: '2rem' }}>LMS</Link>
                    <h1 className="branding-title">Begin Your Journey to <br /> <span className="text-highlight">LBSNAA</span></h1>
                    <p className="branding-desc">Join 5000+ successful officers who started their preparation with LMS. Your dream deserves the best guidance.</p>

                    <div className="branding-features">
                        <div className="feature-item">
                            <i className="ri-checkbox-circle-fill"></i> <span>Personalized Mentorship</span>
                        </div>
                        <div className="feature-item">
                            <i className="ri-checkbox-circle-fill"></i> <span>Comprehensive Study Material</span>
                        </div>
                        <div className="feature-item">
                            <i className="ri-checkbox-circle-fill"></i> <span>India's Best Faculty</span>
                        </div>
                    </div>

                    <div className="branding-testimonial">
                        <p>"The guidance I received here was pivotal in my success."</p>
                        <div className="topper-mini">
                            <img src="/assets/topper-piyush.jpg" alt="Topper" />
                            <div>
                                <strong>Piyush Ranjan</strong>
                                <span>AIR 1, CSE 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="branding-overlay"></div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="register-form-wrapper">
                <div className="form-header">
                    <h2>Create Account</h2>
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>

                <form className="register-form">
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className="input-wrapper">
                            <i className="ri-user-line"></i>
                            <input type="text" id="name" placeholder="Enter your full name" required />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="input-wrapper">
                            <i className="ri-phone-line"></i>
                            <input type="tel" id="phone" placeholder="9876543210" required />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <i className="ri-mail-line"></i>
                            <input type="email" id="email" placeholder="you@example.com" required />
                        </div>
                    </div>

                    {/* Background Selector */}
                    <div className="form-group">
                        <label htmlFor="background">Current Status / Background</label>
                        <div className="input-wrapper">
                            <i className="ri-graduation-cap-line"></i>
                            <select id="background" required defaultValue="">
                                <option value="" disabled>Select your background</option>
                                <option value="student">College Student</option>
                                <option value="graduate">Graduate</option>
                                <option value="working">Working Professional</option>
                                <option value="graduate_not_working">Graduate (Not Working)</option>
                            </select>
                            <i className="ri-arrow-down-s-line select-arrow"></i>
                        </div>
                    </div>

                    {/* Course Interest Selector */}
                    <div className="form-group">
                        <label htmlFor="course_interest">Course Interested In</label>
                        <div className="input-wrapper">
                            <i className="ri-book-open-line"></i>
                            <select id="course_interest" required defaultValue="">
                                <option value="" disabled>Select a course type</option>
                                <option value="foundation">GS Foundation (Prelims + Mains)</option>
                                <option value="prelims">Prelims Focused / Crash Course</option>
                                <option value="mains">Mains Focused / Answer Writing</option>
                                <option value="optional">Optional Subject</option>
                                <option value="interview">Interview Guidance</option>
                                <option value="mentorship">Personal Mentorship</option>
                            </select>
                            <i className="ri-arrow-down-s-line select-arrow"></i>
                        </div>
                    </div>

                    <div className="form-check">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a></label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Register Now <i className="ri-arrow-right-line"></i></button>
                </form>
            </div>
        </div>
    );
}
