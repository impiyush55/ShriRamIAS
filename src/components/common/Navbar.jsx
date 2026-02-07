

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const getHashLink = (hash) => isHome ? hash : `/${hash}`;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMegaCategory, setActiveMegaCategory] = useState('foundation');
    const [activeTestSeriesCategory, setActiveTestSeriesCategory] = useState('ts-prelims');
    const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
    const loginDropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside for login dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
                setIsLoginDropdownOpen(false);
            }
        };

        if (isLoginDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLoginDropdownOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
    };

    const toggleMobileDropdown = (e) => {
        e.currentTarget.parentElement.classList.toggle('active');
    };

    return (
        <>
            <header className="navbar">
                <div className="container navbar-container">
                    <Link to="/" className="logo">
                        <span className="logo-text-fallback">SRIRAM's<span>IAS</span></span>
                    </Link>

                    <nav className="nav-menu">
                        <div className="nav-item dropdown">
                            <a href={getHashLink('#courses')} className="nav-link">Courses <i className="ri-arrow-down-s-line"></i></a>
                            <div className="mega-menu">
                                <div className="mega-sidebar">
                                    {['foundation', 'prelims', 'mains', 'optional', 'current-affairs', 'interview', 'mentorship-prog', 'special'].map((id) => (
                                        <div
                                            key={id}
                                            className={`mega-category ${activeMegaCategory === id ? 'active' : ''}`}
                                            onMouseEnter={() => setActiveMegaCategory(id)}
                                        >
                                            <span>{id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                                            <i className="ri-arrow-right-s-line arrow"></i>
                                        </div>
                                    ))}
                                </div>
                                <div className="mega-content-area">
                                    <div id="foundation" className={`mega-panel ${activeMegaCategory === 'foundation' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Foundation Courses</h3>
                                        <div className="panel-grid">
                                            <a href="#" className="mega-link">UPSC Foundation Course (Prelims + Mains)</a>
                                            <a href="#" className="mega-link">3 Years Integrated Foundation Program</a>
                                            <a href="#" className="mega-link">General Studies Foundation (Hindi)</a>
                                            <a href="#" className="mega-link">GS Foundation (English)</a>
                                        </div>
                                        <a href="#" className="view-all-link">View All Courses <i className="ri-arrow-right-line"></i></a>
                                    </div>
                                    <div id="prelims" className={`mega-panel ${activeMegaCategory === 'prelims' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Prelims Focused Courses</h3>
                                        <div className="panel-grid">
                                            <a href="#" className="mega-link">UPSC Prelims Crash Course 2026</a>
                                            <a href="#" className="mega-link">GS Prelims Test Series</a>
                                            <a href="#" className="mega-link">CSAT Qualifying Course</a>
                                        </div>
                                        <a href="#" className="view-all-link">View All Courses <i className="ri-arrow-right-line"></i></a>
                                    </div>
                                    <div id="mains" className={`mega-panel ${activeMegaCategory === 'mains' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Mains Focused Courses</h3>
                                        <div className="panel-grid">
                                            <a href="#" className="mega-link">UPSC Mains Answer Writing Program</a>
                                            <a href="#" className="mega-link">GS Mains Full Course</a>
                                            <a href="#" className="mega-link">Ethics (GS Paper IV)</a>
                                            <a href="#" className="mega-link">Essay Writing Program</a>
                                            <a href="#" className="mega-link">Mains Test Series</a>
                                        </div>
                                    </div>
                                    <div id="optional" className={`mega-panel ${activeMegaCategory === 'optional' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Optional Subject Courses</h3>
                                        <div className="panel-grid">
                                            <a href="#" className="mega-link">Optional – Geography</a>
                                            <a href="#" className="mega-link">Optional – History</a>
                                            <a href="#" className="mega-link">Optional – Sociology</a>
                                            <a href="#" className="mega-link">Optional – Public Administration</a>
                                            <a href="#" className="mega-link">Optional – Anthropology</a>
                                            <a href="#" className="mega-link">Optional – PSIR</a>
                                        </div>
                                    </div>
                                    <div id="current-affairs" className={`mega-panel ${activeMegaCategory === 'current-affairs' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Current Affairs & Magazine</h3>
                                        <div className="panel-grid">
                                            <a href="#" className="mega-link">Daily Current Affairs Classes</a>
                                            <a href="#" className="mega-link">Monthly Current Affairs Magazine</a>
                                            <a href="#" className="mega-link">PIB Analysis</a>
                                            <a href="#" className="mega-link">Yojana & Kurukshetra Analysis</a>
                                            <a href="#" className="mega-link">Economic Survey & Budget Analysis</a>
                                        </div>
                                    </div>
                                    <div id="interview" className={`mega-panel ${activeMegaCategory === 'interview' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Interview / Personality Test</h3>
                                        <div className="panel-grid">
                                            <a href="#" className="mega-link">UPSC Interview Guidance Program</a>
                                            <a href="#" className="mega-link">Mock Interview Sessions</a>
                                            <a href="#" className="mega-link">DAF Analysis Course</a>
                                            <a href="#" className="mega-link">Personality Development Program</a>
                                        </div>
                                    </div>
                                    <div id="mentorship-prog" className={`mega-panel ${activeMegaCategory === 'mentorship-prog' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Mentorship & Guidance</h3>
                                        <div className="panel-grid">
                                            <a href="#" className="mega-link">One-to-One Mentorship Program</a>
                                            <a href="#" className="mega-link">Strategy & Planning Sessions</a>
                                            <a href="#" className="mega-link">Study Plan Customization</a>
                                            <a href="#" className="mega-link">Doubt Clearing Sessions</a>
                                        </div>
                                    </div>
                                    <div id="special" className={`mega-panel ${activeMegaCategory === 'special' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Special Programs</h3>
                                        <div className="panel-grid">
                                            <a href="#" className="mega-link">Late Starter Course</a>
                                            <a href="#" className="mega-link">Working Professionals Program</a>
                                            <a href="#" className="mega-link">Hindi Medium Special Batch</a>
                                            <a href="#" className="mega-link">Regional Language Batches</a>
                                            <a href="#" className="mega-link">Weekend Classes Program</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/live-courses.html" className={`nav-link ${location.pathname === '/live-courses.html' ? 'active' : ''}`}>Live Classes</Link>

                        <div className="nav-item dropdown">
                            <a href={getHashLink('#test-series')} className="nav-link">Test Series <i className="ri-arrow-down-s-line"></i></a>
                            <div className="mega-menu">
                                <div className="mega-sidebar">
                                    {['ts-prelims', 'ts-csat', 'ts-mains', 'ts-pyq', 'ts-optional', 'ts-essay', 'ts-integrated', 'ts-interview'].map((id) => (
                                        <div
                                            key={id}
                                            className={`mega-category ${activeTestSeriesCategory === id ? 'active' : ''}`}
                                            onMouseEnter={() => setActiveTestSeriesCategory(id)}
                                        >
                                            <span>{id.replace('ts-', '').replace(/-/g, ' ').toUpperCase()}</span>
                                            <i className="ri-arrow-right-s-line arrow"></i>
                                        </div>
                                    ))}
                                </div>

                                <div className="mega-content-area">
                                    <div id="ts-prelims" className={`mega-panel ${activeTestSeriesCategory === 'ts-prelims' ? 'active' : ''}`}>
                                        <h3 className="panel-title">UPSC Prelims Test Series</h3>
                                        <div className="mm-card-grid">
                                            <div className="mm-card">
                                                <div className="mm-card-header">
                                                    <span className="mm-badge mm-badge-blue">FULL LENGTH</span>
                                                </div>
                                                <h4 className="mm-card-title">UPSC Prelims 2026 – Full Length Test Series</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-file-list-line"></i> 25 Tests (15 GS + 10 CSAT)</div>
                                                    <div className="mm-meta-item"><i className="ri-bar-chart-line"></i> All India Ranking</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                            <div className="mm-card">
                                                <div className="mm-card-header">
                                                    <span className="mm-badge mm-badge-green">SECTIONAL</span>
                                                </div>
                                                <h4 className="mm-card-title">UPSC Prelims Sectional Test Series</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-book-2-line"></i> Subject-wise Tests</div>
                                                    <div className="mm-meta-item"><i className="ri-focus-3-line"></i> Concept Building</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                            <div className="mm-card">
                                                <div className="mm-card-header">
                                                    <span className="mm-badge mm-badge-red">CRASH COURSE</span>
                                                </div>
                                                <h4 className="mm-card-title">UPSC Prelims Rapid Revision</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-timer-flash-line"></i> High-Yield Questions</div>
                                                    <div className="mm-meta-item"><i className="ri-calendar-check-line"></i> Last 3 Months</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ... Other Test Series Panels ... simplified for brevity but I need to include all content */}
                                    <div id="ts-csat" className={`mega-panel ${activeTestSeriesCategory === 'ts-csat' ? 'active' : ''}`}>
                                        <h3 className="panel-title">UPSC CSAT Test Series</h3>
                                        <div className="mm-card-grid">
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-orange">QUALIFYING</span></div>
                                                <h4 className="mm-card-title">UPSC CSAT Qualifying Test Series</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-checkbox-circle-line"></i> 10 Full Length Tests</div>
                                                    <div className="mm-meta-item"><i className="ri-line-chart-line"></i> Difficulty Levels</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="ts-mains" className={`mega-panel ${activeTestSeriesCategory === 'ts-mains' ? 'active' : ''}`}>
                                        <h3 className="panel-title">UPSC Mains Test Series</h3>
                                        <div className="mm-card-grid">
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-purple">ANSWER WRITING</span></div>
                                                <h4 className="mm-card-title">Mains GS Answer Writing</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-file-edit-line"></i> Daily Practice</div>
                                                    <div className="mm-meta-item"><i className="ri-user-voice-line"></i> Expert Feedback</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-indigo">FULL LENGTH</span></div>
                                                <h4 className="mm-card-title">Mains Full-Length Tests</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-time-line"></i> Exam Simulation</div>
                                                    <div className="mm-meta-item"><i className="ri-star-smile-line"></i> Model Answers</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="ts-pyq" className={`mega-panel ${activeTestSeriesCategory === 'ts-pyq' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Previous Year Question Papers</h3>
                                        <div className="mm-card-grid">
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-blue">PRELIMS</span></div>
                                                <h4 className="mm-card-title">UPSC Prelims PYQ (2014-2024)</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-file-text-line"></i> GS Paper I & CSAT</div>
                                                </div>
                                                <Link to="/previous-year-papers.html" className="mm-cta">Practice Now <i className="ri-arrow-right-s-line"></i></Link>
                                            </div>
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-purple">MAINS</span></div>
                                                <h4 className="mm-card-title">UPSC Mains PYQ (2014-2024)</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-book-open-line"></i> GS I, II, III, IV & Essay</div>
                                                </div>
                                                <Link to="/previous-year-papers.html" className="mm-cta">View Papers <i className="ri-arrow-right-s-line"></i></Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="ts-optional" className={`mega-panel ${activeTestSeriesCategory === 'ts-optional' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Optional Subject Test Series</h3>
                                        <div className="mm-card-grid">
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-pink">POPULAR</span></div>
                                                <h4 className="mm-card-title">Sociology Optional Test Series</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-file-text-line"></i> 10 Tests</div>
                                                    <div className="mm-meta-item"><i className="ri-discuss-line"></i> Personal Feedback</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-pink">NEW BATCH</span></div>
                                                <h4 className="mm-card-title">PSIR Optional Test Series</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-file-text-line"></i> 12 Tests</div>
                                                    <div className="mm-meta-item"><i className="ri-discuss-line"></i> Model Answers</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="ts-essay" className={`mega-panel ${activeTestSeriesCategory === 'ts-essay' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Essay Writing Test Series</h3>
                                        <div className="mm-card-grid">
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-teal">ESSAY</span></div>
                                                <h4 className="mm-card-title">Essay Mastery Program 2026</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-quill-pen-line"></i> 10 Tests</div>
                                                    <div className="mm-meta-item"><i className="ri-lightbulb-flash-line"></i> Brainstorming Sessions</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="ts-integrated" className={`mega-panel ${activeTestSeriesCategory === 'ts-integrated' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Integrated Test Series</h3>
                                        <div className="mm-card-grid">
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-yellow">BEST VALUE</span></div>
                                                <h4 className="mm-card-title">Prelims + Mains Integrated 2026</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-stack-line"></i> 40 Tests Total</div>
                                                    <div className="mm-meta-item"><i className="ri-vip-crown-line"></i> Complete Guidance</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="ts-interview" className={`mega-panel ${activeTestSeriesCategory === 'ts-interview' ? 'active' : ''}`}>
                                        <h3 className="panel-title">Interview Guidance</h3>
                                        <div className="mm-card-grid">
                                            <div className="mm-card">
                                                <div className="mm-card-header"><span className="mm-badge mm-badge-purple">INTERVIEW</span></div>
                                                <h4 className="mm-card-title">Mock Interview Program</h4>
                                                <div className="mm-meta">
                                                    <div className="mm-meta-item"><i className="ri-user-voice-line"></i> Panel of Bureaucrats</div>
                                                    <div className="mm-meta-item"><i className="ri-video-chat-line"></i> Recorded Session</div>
                                                </div>
                                                <a href="#" className="mm-cta">View Details <i className="ri-arrow-right-s-line"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* I am handling the rest generically to save space in thought but I will write full code in file */}
                                </div>
                            </div>
                        </div>

                        <Link to="/blogs" className="nav-link">Blogs</Link>
                        <a href={getHashLink('#mentorship')} className="nav-link">Mentorship</a>
                    </nav>

                    <div className="nav-search">
                        <i className="ri-search-line"></i>
                        <input type="text" placeholder="Search courses, test series, blogs..." />
                    </div>

                    <div className="nav-right">
                        <div className="auth-buttons">
                            <LanguageSelector />
                            <div className="nav-item dropdown login-dropdown" ref={loginDropdownRef}>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                                >
                                    Login <i className="ri-arrow-down-s-line"></i>
                                </button>
                                {isLoginDropdownOpen && (
                                    <div className="login-dropdown-menu">
                                        <Link to="/common-login?role=student" className="login-dropdown-item">
                                            <i className="ri-user-line"></i>
                                            <div>
                                                <strong>Student Login</strong>
                                                <span>Access courses & tests</span>
                                            </div>
                                        </Link>
                                        <Link to="/common-login?role=faculty" className="login-dropdown-item">
                                            <i className="ri-user-star-line"></i>
                                            <div>
                                                <strong>Faculty Login</strong>
                                                <span>Manage courses & students</span>
                                            </div>
                                        </Link>
                                        <Link to="/common-login?role=admin" className="login-dropdown-item">
                                            <i className="ri-admin-line"></i>
                                            <div>
                                                <strong>Admin Login</strong>
                                                <span>Platform management</span>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link to="/register.html" className="btn btn-primary">Register</Link>
                        </div>
                    </div>

                    <div className="hamburger" onClick={toggleMobileMenu}>
                        <i className="ri-menu-3-line"></i>
                    </div>
                </div>
            </header>

            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-header">
                    <Link to="/" className="logo">SRIRAM's <span>IAS</span></Link>
                    <div className="close-menu" onClick={toggleMobileMenu}><i className="ri-close-line"></i></div>
                </div>
                <div className="mobile-nav-links">
                    <div className="mobile-dropdown">
                        <div className="mobile-dropdown-header" onClick={toggleMobileDropdown}>
                            <span>Courses</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                        <div className="mobile-dropdown-content">
                            <a href={getHashLink('#foundation')}>Foundation Courses</a>
                            <a href={getHashLink('#prelims')}>Prelims Focused</a>
                            <a href={getHashLink('#mains')}>Mains Focused</a>
                            <a href={getHashLink('#optional')}>Optional Subjects</a>
                            <a href={getHashLink('#current-affairs')}>Current Affairs</a>
                            <a href={getHashLink('#interview')}>Interview Guidance</a>
                        </div>
                    </div>
                    <Link to="/live-courses.html" className={location.pathname === '/live-courses.html' ? 'active' : ''}>Live Classes</Link>
                    <div className="mobile-dropdown">
                        <div className="mobile-dropdown-header" onClick={toggleMobileDropdown}>
                            <span>Test Series</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                        <div className="mobile-dropdown-content">
                            <a href={getHashLink('#ts-prelims')}>UPSC Prelims</a>
                            <a href={getHashLink('#ts-csat')}>UPSC CSAT</a>
                            <a href={getHashLink('#ts-mains')}>UPSC Mains</a>
                            <Link to="/previous-year-papers.html">Previous Year Papers</Link>
                            <a href={getHashLink('#ts-optional')}>Optional Subjects</a>
                        </div>
                    </div>
                    <Link to="/blogs">Blogs</Link>
                    <a href={getHashLink('#mentorship')}>Mentorship</a>

                    <div className="mobile-dropdown">
                        <div className="mobile-dropdown-header" onClick={toggleMobileDropdown}>
                            <span>Login</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                        <div className="mobile-dropdown-content">
                            <Link to="/common-login?role=student"><i className="ri-user-line"></i> Student Login</Link>
                            <Link to="/common-login?role=faculty"><i className="ri-user-star-line"></i> Faculty Login</Link>
                            <Link to="/common-login?role=admin"><i className="ri-admin-line"></i> Admin Login</Link>
                        </div>
                    </div>

                    <div className="mobile-auth-buttons" style={{ marginTop: '1rem' }}>
                        <Link to="/register.html" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}>Register</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
