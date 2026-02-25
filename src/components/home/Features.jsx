
export default function Features() {
    return (
        <section id="why-choose-us" className="section bg-light">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why LMS?</h2>
                    <p className="section-desc">We don't just teach; we mentor you to become the future leaders of India.</p>
                </div>

                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon bg-blue-opt">
                            <i className="ri-user-star-line text-blue"></i>
                        </div>
                        <h3 className="feature-title">India's Best Faculty</h3>
                        <p className="feature-desc">Learn from India's most experienced educators, retired bureaucrats, and subject matter experts.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon bg-orange-opt">
                            <i className="ri-route-line" style={{ color: '#e65100' }}></i>
                        </div>
                        <h3 className="feature-title">360° Syllabus Coverage</h3>
                        <p className="feature-desc">A structured and integrated approach covering Prelims, Mains, and Interview preparation comprehensively.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon bg-purple-opt">
                            <i className="ri-book-3-line" style={{ color: '#6a1b9a' }}></i>
                        </div>
                        <h3 className="feature-title">Concise Study Material</h3>
                        <p className="feature-desc">Access scientifically designed, updated, and concise study notes that are loved by toppers.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon bg-green-opt">
                            <i className="ri-heart-pulse-line" style={{ color: '#2e7d32' }}></i>
                        </div>
                        <h3 className="feature-title">1-on-1 Mentorship</h3>
                        <p className="feature-desc">Personalized guidance and doubt-clearing sessions to keep your preparation on the right track.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon bg-red-opt">
                            <i className="ri-edit-circle-line" style={{ color: '#c62828' }}></i>
                        </div>
                        <h3 className="feature-title">Rigorous Test Series</h3>
                        <p className="feature-desc">Weekly objective and subjective tests with detailed performance analysis and feedback.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon bg-teal-opt">
                            <i className="ri-laptop-line" style={{ color: '#00695c' }}></i>
                        </div>
                        <h3 className="feature-title">Hybrid Learning Model</h3>
                        <p className="feature-desc">Seamlessly switch between Offline and Live Online classes without missing a beat.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
