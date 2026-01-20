
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="#" className="logo text-white">SRIRAM's <span>IAS</span></a>
                        <p>Empowering aspirants since 2001. We believe in holistic education that builds character and competence.</p>
                        <div className="social-links">
                            <a href="#"><i className="ri-facebook-fill"></i></a>
                            <a href="#"><i className="ri-twitter-x-line"></i></a>
                            <a href="#"><i className="ri-instagram-line"></i></a>
                            <a href="#"><i className="ri-youtube-line"></i></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Courses</a></li>
                            <li><a href="#">Faculty</a></li>
                            <li><a href="#">Results</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Blogs</a></li>
                            <li><a href="#">Daily News</a></li>
                            <li><a href="#">NCERT Notes</a></li>
                            <li><Link to="/previous-year-papers.html">Previous Papers</Link></li>
                            <li><a href="#">Syllabus</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Our Centers</h4>
                        <p style={{ marginBottom: '0.5rem' }}><i className="ri-map-pin-line"></i> <strong>Delhi:</strong> Old Rajinder Nagar</p>
                        <p style={{ marginBottom: '0.5rem' }}><i className="ri-map-pin-line"></i> <strong>Pune:</strong> Sadashiv Peth</p>
                        <p style={{ marginBottom: '1.5rem' }}><i className="ri-map-pin-line"></i> <strong>Hyderabad:</strong> Ashland, Ashok Nagar</p>

                        <p><i className="ri-phone-line"></i> +91 6201004532</p>
                        <p><i className="ri-mail-line"></i> piyushranjan6291@gmail.com</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 SRIRAM's IAS. All Rights Reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
