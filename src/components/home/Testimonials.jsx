
export default function Testimonials() {
    return (
        <section id="testimonials" className="section bg-light">
            <div className="container">
                <div className="section-header">
                    <span className="hero-badge">Hall of Fame</span>
                    <h2 className="section-title">Success Stories</h2>
                    <p className="section-desc">Join the league of extraordinary achievers who turned their dreams into reality with LMS.</p>
                </div>

                <div className="testimonial-carousel">
                    <div className="testimonial-card">
                        <div className="quote-icon"><i className="ri-double-quotes-l"></i></div>
                        <p className="testimonial-text">"LMS provided me with the right direction. The faculty's dedication and the comprehensive study material were instrumental in my success."</p>
                        <div className="testimonial-profile">
                            <img src="/assets/topper-piyush.jpg" alt="Piyush Ranjan" />
                            <div className="profile-info">
                                <h4>Piyush Ranjan</h4>
                                <span className="rank-badge">AIR 1, CSE 2025</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="quote-icon"><i className="ri-double-quotes-l"></i></div>
                        <p className="testimonial-text">"The structured approach and the precise study material at LMS were game-changers for me. The mentorship program helped me stay consistent."</p>
                        <div className="testimonial-profile">
                            <img src="/assets/topper-1.png" alt="Topper 1" />
                            <div className="profile-info">
                                <h4>Arti Dogra</h4>
                                <span className="rank-badge">AIR 1, CSE 2024</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="quote-icon"><i className="ri-double-quotes-l"></i></div>
                        <p className="testimonial-text">"I owe my success to the rigorous test series and answer writing feedback. It helped me fine-tune my strategy for the Mains examination."</p>
                        <div className="testimonial-profile">
                            <img src="/assets/topper-2.png" alt="Topper 2" />
                            <div className="profile-info">
                                <h4>Rahul Singh</h4>
                                <span className="rank-badge">AIR 5, CSE 2024</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="quote-icon"><i className="ri-double-quotes-l"></i></div>
                        <p className="testimonial-text">"The interview guidance program was exceptional. Mock interviews with retired bureaucrats gave me the confidence to face the real board."</p>
                        <div className="testimonial-profile">
                            <img src="/assets/topper-3.png" alt="Topper 3" />
                            <div className="profile-info">
                                <h4>Sneha Gupta</h4>
                                <span className="rank-badge">AIR 12, CSE 2024</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <div className="quote-icon"><i className="ri-double-quotes-l"></i></div>
                        <p className="testimonial-text">"LMS is not just an institute; it's a family. The faculty is approachable and always ready to help. Grateful for their support."</p>
                        <div className="testimonial-profile">
                            <img src="/assets/topper-4.png" alt="Topper 4" />
                            <div className="profile-info">
                                <h4>Arjun Mehta</h4>
                                <span className="rank-badge">AIR 23, CSE 2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
