
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg">
                <video autoPlay muted loop playsInline className="hero-video">
                    <source src="/assets/hero_background.mp4" type="video/mp4" />
                    <img src="/assets/hero-bg.png" alt="Students studying" className="hero-image" />
                </video>
                <div className="hero-overlay"></div>
            </div>
            <div className="container hero-content">
                <div className="hero-badge"><span className="pulsing-dot"></span> Prelims 2026 Batch – Admissions Open</div>
                <h1 className="hero-title">Crack UPSC with <br /> <span className="text-gradient">LMS</span></h1>
                <p className="hero-subtitle">Join India’s most trusted Civil Services coaching platform. Expert guidance, comprehensive study material, and a legacy of success.</p>
                <div className="hero-buttons">
                    <a href="#courses" className="btn btn-primary btn-lg">Explore Courses <i className="ri-arrow-right-line"></i></a>
                    <a href="#mentorship" className="btn btn-white btn-lg">Schedule Free Mentorship</a>
                </div>

                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">25+</span>
                        <span className="stat-label">Years of Excellence</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">5k+</span>
                        <span className="stat-label">Selections</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">All India</span>
                        <span className="stat-label">Top Faculty</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
