
import { useState } from 'react';

export default function LiveCourses() {
    const [activeTab, setActiveTab] = useState('live-now');

    return (
        <div className="live-learning-wrapper">
            <section className="live-page-header">
                <div className="container text-center">
                    <h1 className="live-title">Live Classes</h1>
                    <p className="live-subtitle">Learn with India’s top educators in real time</p>
                </div>
            </section>

            <section className="live-content-section">
                <div className="container">
                    <div className="live-tabs-nav">
                        <button
                            className={`live-tab-pill ${activeTab === 'live-now' ? 'active' : ''}`}
                            onClick={() => setActiveTab('live-now')}
                        >
                            <span className="live-indicator"></span> Ongoing Courses
                        </button>
                        <button
                            className={`live-tab-pill ${activeTab === 'upcoming' ? 'active' : ''}`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            <i className="ri-calendar-event-line"></i> Upcoming Batches
                        </button>
                    </div>

                    <div id="live-now" className={`live-tab-panel ${activeTab === 'live-now' ? 'active' : ''}`}>
                        <div className="live-grid">
                            {/* Course 1 */}
                            <div className="live-class-card active-live">
                                <div className="card-header-status">
                                    <span className="status-badge"><span className="pulse-dot"></span> LIVE NOW</span>
                                    <span className="course-schedule-badge"><i className="ri-calendar-check-line"></i> MWF Batches</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-1.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0D8ABC&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Dr. Rajesh Kumar & Team</h5>
                                            <span className="subject">General Studies</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">GS Foundation Course 2026 (Prelims + Mains)</h3>
                                    <div className="live-meta">
                                        <span className="time-started text-dark"><i className="ri-time-line"></i> 05:00 PM - 07:30 PM</span>
                                        <span className="batch-days text-muted display-block mt-1">Mon, Wed, Fri</span>
                                    </div>
                                    <a href="#" className="btn-join-live">Join Class <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>

                            {/* Course 2 */}
                            <div className="live-class-card active-live">
                                <div className="card-header-status">
                                    <span className="status-badge"><span className="pulse-dot"></span> LIVE NOW</span>
                                    <span className="course-schedule-badge"><i className="ri-calendar-check-line"></i> TTS Batches</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-2.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Anjali+Sharma&background=e65100&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Prof. Anjali Sharma</h5>
                                            <span className="subject">Optional Subject</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">Geography Optional Complete Course</h3>
                                    <div className="live-meta">
                                        <span className="time-started text-dark"><i className="ri-time-line"></i> 02:00 PM - 04:30 PM</span>
                                        <span className="batch-days text-muted display-block mt-1">Tue, Thu, Sat</span>
                                    </div>
                                    <a href="#" className="btn-join-live">Join Class <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>

                            {/* Course 3 */}
                            <div className="live-class-card">
                                <div className="card-header-status">
                                    <span className="status-badge gray"><i className="ri-radio-button-line"></i> ONGOING</span>
                                    <span className="course-schedule-badge"><i className="ri-calendar-check-line"></i> MWF Batches</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-3.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Vikram+Singh&background=6a1b9a&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Mr. Vikram Singh</h5>
                                            <span className="subject">CSAT</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">CSAT Mastery Course (Quant + Reasoning)</h3>
                                    <div className="live-meta">
                                        <span className="time-started text-dark"><i className="ri-time-line"></i> 10:00 AM - 12:00 PM</span>
                                        <span className="batch-days text-muted display-block mt-1">Mon, Wed, Fri</span>
                                    </div>
                                    <a href="#" className="btn-join-live outline-style">View Structure <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>

                            {/* Course 4 */}
                            <div className="live-class-card">
                                <div className="card-header-status">
                                    <span className="status-badge gray"><i className="ri-radio-button-line"></i> ONGOING</span>
                                    <span className="course-schedule-badge"><i className="ri-calendar-check-line"></i> TTS Batches</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-4.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=History+Dept&background=00695c&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">History Dept.</h5>
                                            <span className="subject">Optional Subject</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">History Optional Comprehensive Batch</h3>
                                    <div className="live-meta">
                                        <span className="time-started text-dark"><i className="ri-time-line"></i> 11:00 AM - 01:30 PM</span>
                                        <span className="batch-days text-muted display-block mt-1">Tue, Thu, Sat</span>
                                    </div>
                                    <a href="#" className="btn-join-live outline-style">View Structure <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>

                            {/* Course 5 */}
                            <div className="live-class-card">
                                <div className="card-header-status">
                                    <span className="status-badge gray"><i className="ri-radio-button-line"></i> ONGOING</span>
                                    <span className="course-schedule-badge"><i className="ri-calendar-check-line"></i> Daily</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-5.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=News+Team&background=d81b60&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Editorial Team</h5>
                                            <span className="subject">Current Affairs</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">Daily News & Editorial Analysis</h3>
                                    <div className="live-meta">
                                        <span className="time-started text-dark"><i className="ri-time-line"></i> 08:00 AM - 09:30 AM</span>
                                        <span className="batch-days text-muted display-block mt-1">Monday - Saturday</span>
                                    </div>
                                    <a href="#" className="btn-join-live outline-style">View Structure <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>

                            {/* Course 6 */}
                            <div className="live-class-card active-live">
                                <div className="card-header-status">
                                    <span className="status-badge"><span className="pulse-dot"></span> LIVE NOW</span>
                                    <span className="course-schedule-badge"><i className="ri-calendar-check-line"></i> Weekend</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-6.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Essay+Expert&background=3f51b5&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Dr. K. Siddhartha</h5>
                                            <span className="subject">Mains Enrichment</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">Essay Writing & Ethics Module</h3>
                                    <div className="live-meta">
                                        <span className="time-started text-dark"><i className="ri-time-line"></i> 06:00 PM - 08:30 PM</span>
                                        <span className="batch-days text-muted display-block mt-1">Sat, Sun</span>
                                    </div>
                                    <a href="#" className="btn-join-live">Join Class <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="upcoming" className={`live-tab-panel ${activeTab === 'upcoming' ? 'active' : ''}`}>
                        <div className="live-grid">
                            {/* Upcoming 1 */}
                            <div className="live-class-card upcoming">
                                <div className="card-header-status blue">
                                    <span className="status-badge-blue">Starts Feb 1st</span>
                                    <span className="course-schedule-badge text-muted">MWF Batch</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-7.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Polity+Expert&background=0284c7&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Polity Faculty</h5>
                                            <span className="subject">New Batch</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">Polity & Constitution (Pre + Mains)</h3>
                                    <div className="venue-meta">
                                        <span><i className="ri-time-line"></i> 06:00 PM - 08:30 PM</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn-notify">Enroll Now</button>
                                        <button className="btn-details">Details</button>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming 2 */}
                            <div className="live-class-card upcoming">
                                <div className="card-header-status blue">
                                    <span className="status-badge-blue">Starts Feb 5th</span>
                                    <span className="course-schedule-badge text-muted">TTS Batch</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-8.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Econ+Sir&background=0284c7&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Economy Expert</h5>
                                            <span className="subject">New Batch</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">Indian Economy Foundation</h3>
                                    <div className="venue-meta">
                                        <span><i className="ri-time-line"></i> 11:00 AM - 01:00 PM</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn-notify">Enroll Now</button>
                                        <button className="btn-details">Details</button>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming 3 */}
                            <div className="live-class-card upcoming">
                                <div className="card-header-status blue">
                                    <span className="status-badge-blue">Starts Feb 10th</span>
                                    <span className="course-schedule-badge text-muted">Weekend Batch</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-9.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Science+Tech&background=0284c7&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Sci & Tech Team</h5>
                                            <span className="subject">New Batch</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">Science & Technology Module</h3>
                                    <div className="venue-meta">
                                        <span><i className="ri-time-line"></i> Sat-Sun, 10:00 AM</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn-notify">Enroll Now</button>
                                        <button className="btn-details">Details</button>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming 4 */}
                            <div className="live-class-card upcoming">
                                <div className="card-header-status blue">
                                    <span className="status-badge-blue">Starts Mar 1st</span>
                                    <span className="course-schedule-badge text-muted">MWF Batch</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-10.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Socio+Mam&background=0284c7&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">Sociology Faculty</h5>
                                            <span className="subject">Optional</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">Sociology Optional Foundation</h3>
                                    <div className="venue-meta">
                                        <span><i className="ri-time-line"></i> 02:00 PM - 04:30 PM</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn-notify">Enroll Now</button>
                                        <button className="btn-details">Details</button>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming 5 */}
                            <div className="live-class-card upcoming">
                                <div className="card-header-status blue">
                                    <span className="status-badge-blue">Starts Mar 5th</span>
                                    <span className="course-schedule-badge text-muted">TTS Batch</span>
                                </div>
                                <div className="card-body">
                                    <div className="educator-profile">
                                        <div className="educator-img">
                                            <img src="/assets/educator-11.jpg" onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=PSIR+Sir&background=0284c7&color=fff'} alt="Educator" />
                                        </div>
                                        <div className="educator-details">
                                            <h5 className="name">PSIR Expert</h5>
                                            <span className="subject">Optional</span>
                                        </div>
                                    </div>
                                    <h3 className="class-title">PSIR Optional Foundation</h3>
                                    <div className="venue-meta">
                                        <span><i className="ri-time-line"></i> 05:00 PM - 07:30 PM</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn-notify">Enroll Now</button>
                                        <button className="btn-details">Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
