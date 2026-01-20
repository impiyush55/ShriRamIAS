
import { Link } from 'react-router-dom';

export default function PremiumCourses() {
    return (
        <section id="courses" className="section courses-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Premium Programs</h2>
                    <p className="section-desc">Tailored courses designed to help you ace every stage of the Civil Services Examination.</p>
                </div>

                <div className="courses-grid">
                    <div className="course-card-premium">
                        <div className="card-header">
                            <span className="program-badge badge-bestseller">BESTSELLER</span>
                            <h3 className="course-title">UPSC Foundation Course (Prelims + Mains) 2026</h3>
                        </div>

                        <div className="meta-info">
                            <div className="meta-item" title="Duration"><i className="ri-time-line"></i> 18 Months</div>
                            <div className="meta-item" title="Mode"><i className="ri-broadcast-line"></i> Live Online</div>
                            <div className="meta-item" title="Language"><i className="ri-translate-2"></i> English</div>
                            <div className="meta-item" title="Validity"><i className="ri-calendar-check-line"></i> Valid till Mains 2027</div>
                        </div>

                        <div className="value-highlights">
                            <ul>
                                <li>Comprehensive coverage of GS Prelims & Mains syllabus.</li>
                                <li>CSAT, Essay, and Current Affairs integrated.</li>
                                <li>Weekly answer writing & One-to-one mentorship.</li>
                            </ul>
                        </div>

                        <div className="pricing-section">
                            <div className="price-row">
                                <span className="current-price">₹1,25,000</span>
                                <span className="original-price">₹1,60,000</span>
                                <span className="discount-off">22% OFF</span>
                            </div>
                            <p className="emi-info">EMI starting at ₹6,250/month</p>
                        </div>

                        <div className="cta-section">
                            <Link to="/course-details/foundation-2026" className="btn btn-view-details">View Details</Link>
                            <Link to="/register.html" className="btn btn-enroll-now">Enroll Now</Link>
                        </div>
                    </div>

                    <div className="course-card-premium">
                        <div className="card-header">
                            <span className="program-badge badge-popular">POPULAR</span>
                            <h3 className="course-title">3-Year Integrated Foundation Program</h3>
                        </div>

                        <div className="meta-info">
                            <div className="meta-item"><i className="ri-time-line"></i> 36 Months</div>
                            <div className="meta-item"><i className="ri-building-line"></i> Offline (Delhi)</div>
                            <div className="meta-item"><i className="ri-translate-2"></i> English</div>
                            <div className="meta-item"><i className="ri-calendar-check-line"></i> College Students Spl.</div>
                        </div>

                        <div className="value-highlights">
                            <ul>
                                <li>Builds a strong base from NCERT to Advanced level.</li>
                                <li>Gradual progression perfectly suited for undergrads.</li>
                                <li>Includes degrees support & soft skills training.</li>
                            </ul>
                        </div>

                        <div className="pricing-section">
                            <div className="price-row">
                                <span className="current-price">₹2,15,000</span>
                                <span className="original-price">₹2,50,000</span>
                                <span className="discount-off">14% OFF</span>
                            </div>
                            <p className="emi-info">EMI starting at ₹10,500/month</p>
                        </div>

                        <div className="cta-section">
                            <Link to="/course-details/integrated-3-year" className="btn btn-view-details">View Details</Link>
                            <Link to="/register.html" className="btn btn-enroll-now">Enroll Now</Link>
                        </div>
                    </div>

                    <div className="course-card-premium">
                        <div className="card-header">
                            <span className="program-badge badge-new">NEW BATCH</span>
                            <h3 className="course-title">Prelims Crash Course 2026</h3>
                        </div>

                        <div className="meta-info">
                            <div className="meta-item"><i className="ri-time-line"></i> 4 Months</div>
                            <div className="meta-item"><i className="ri-broadcast-line"></i> Live + Recorded</div>
                            <div className="meta-item"><i className="ri-translate-2"></i> Hinglish</div>
                            <div className="meta-item"><i className="ri-calendar-check-line"></i> Target Prelims 2026</div>
                        </div>

                        <div className="value-highlights">
                            <ul>
                                <li>Rapid revision of entire GS syllabus via clusters.</li>
                                <li>Special focus on High Yielding Topics (HYT).</li>
                                <li>Includes Full Length Mock Tests & CSAT Modules.</li>
                            </ul>
                        </div>

                        <div className="pricing-section">
                            <div className="price-row">
                                <span className="current-price">₹18,000</span>
                                <span className="original-price">₹25,000</span>
                                <span className="discount-off">28% OFF</span>
                            </div>
                            <p className="emi-info">No Cost EMI available</p>
                        </div>

                        <div className="cta-section">
                            <Link to="/course-details/prelims-crash-2026" className="btn btn-view-details">View Details</Link>
                            <Link to="/register.html" className="btn btn-enroll-now">Enroll Now</Link>
                        </div>
                    </div>

                    <div className="course-card-premium">
                        <div className="card-header">
                            <span className="program-badge badge-trending">TRENDING</span>
                            <h3 className="course-title">Optional Subject: Sociology</h3>
                        </div>

                        <div className="meta-info">
                            <div className="meta-item"><i className="ri-time-line"></i> 5 Months</div>
                            <div className="meta-item"><i className="ri-macbook-line"></i> Live Online</div>
                            <div className="meta-item"><i className="ri-translate-2"></i> English</div>
                            <div className="meta-item"><i className="ri-calendar-check-line"></i> Extensive Theory</div>
                        </div>

                        <div className="value-highlights">
                            <ul>
                                <li>Paper I & II comprehensive coverage.</li>
                                <li>Answer writing sessions included.</li>
                                <li>Taught by renowned faculty with 20+ years exp.</li>
                            </ul>
                        </div>

                        <div className="pricing-section">
                            <div className="price-row">
                                <span className="current-price">₹45,000</span>
                                <span className="original-price">₹55,000</span>
                                <span className="discount-off">18% OFF</span>
                            </div>
                            <p className="emi-info">EMI starting at ₹3,750/month</p>
                        </div>

                        <div className="cta-section">
                            <Link to="/course-details/sociology-optional" className="btn btn-view-details">View Details</Link>
                            <Link to="/register.html" className="btn btn-enroll-now">Enroll Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
