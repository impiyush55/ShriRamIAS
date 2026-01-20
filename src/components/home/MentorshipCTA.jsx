
export default function MentorshipCTA() {
    return (
        <section id="mentorship" className="mentorship-section">
            <div className="mentorship-container">
                <div className="mentorship-content">
                    <span className="mentorship-badge">PREMIUM GUIDANCE</span>
                    <h2>Get expert 1:1 guidance to unlock your true potential</h2>
                    <p>Don't prepare in isolation. Get a personalized study plan, answer writing evaluation, and direct access to mentors who have cracked the code.</p>

                    <ul className="mentorship-features">
                        <li><i className="ri-check-line"></i> Personalized Strategy</li>
                        <li><i className="ri-check-line"></i> Daily Doubt Solving</li>
                        <li><i className="ri-check-line"></i> Answer Evaluation</li>
                        <li><i className="ri-check-line"></i> Mock Interviews</li>
                    </ul>

                    <button className="btn btn-primary btn-lg" style={{ background: '#38bdf8', border: 'none', color: '#0f172a', fontWeight: 700 }}>Book Free Session <i className="ri-arrow-right-line"></i></button>
                </div>

                <div className="mentorship-visual">
                    <div className="mentor-card-stack">
                        <div className="stack-card stack-2"></div>
                        <div className="stack-card stack-1">
                            <div className="mentor-profile">
                                <img src="https://ui-avatars.com/api/?name=Raman+Sir&background=0D8ABC&color=fff" alt="Mentor" />
                                <div className="mentor-info">
                                    <h4>Raman Sir</h4>
                                    <p>Ex-IAS, Senior Mentor</p>
                                </div>
                            </div>
                            <div className="mentor-msg">
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>"Your answer structure is good, but you need to work on the introduction. Let's discuss this in our next call at 5 PM."</p>
                            </div>
                            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Just now</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
