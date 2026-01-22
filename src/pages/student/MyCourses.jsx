/**
 * MY COURSES PAGE
 * Detailed view of enrolled courses
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../api/authApi';
import { getEnrolledCoursesApi } from '../../api/courseApi';
import { dummyUsers } from '../../data/users';
import '../../styles/dashboard.css';

export default function MyCourses() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Simulating fetching enrolled courses
        const studentData = dummyUsers.find(u => u.id === currentUser.id);
        if (studentData && studentData.enrolledCourses) {
            const res = await getEnrolledCoursesApi(currentUser.id, studentData.enrolledCourses);
            if (res.success) {
                // Add dummy progress data
                const coursesWithProgress = res.data.map(c => ({
                    ...c,
                    progress: Math.floor(Math.random() * 80) + 10, // Random progress 10-90%
                    nextLesson: 'Chapter 4: Constitutional Framework'
                }));
                setCourses(coursesWithProgress);
            }
        }
        setLoading(false);
    };

    if (loading) return <div className="dashboard-loading"><i className="ri-loader-4-line rotating"></i></div>;

    return (
        <div className="dashboard-container">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999
                    }}
                ></div>
            )}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2>SRIRAM's IAS</h2>
                        <span className="role-badge student">Student</span>
                    </div>
                    <button
                        className="mobile-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="/student/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>
                    <a href="/student/courses" className="nav-item active"><i className="ri-book-line"></i>My Courses</a>
                    <a href="/student/browse-courses" className="nav-item"><i className="ri-search-line"></i>Browse Courses</a>
                    <a href="/student/tests" className="nav-item"><i className="ri-file-list-line"></i>Tests & Quizzes</a>
                    <a href="/student/blogs" className="nav-item"><i className="ri-article-line"></i>Blogs & Resources</a>
                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>

                <button onClick={() => navigate('/login.html')} className="logout-btn">
                    <i className="ri-logout-box-line"></i>
                    Logout
                </button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="menu-toggle-btn"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>My Courses</h1>
                            <p>Continue where you left off</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                <div className="section">
                    <div className="courses-grid">
                        {courses.length > 0 ? courses.map(course => (
                            <div key={course.id} className="course-card detailed" style={{ flexDirection: 'column' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                                    <span className="badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white' }}>{course.category}</span>
                                </div>
                                <div className="course-info" style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6b7280' }}>
                                        <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                        <span>{course.instructor}</span>
                                    </div>

                                    <div className="progress-section" style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                            <span>Progress</span>
                                            <span style={{ fontWeight: 'bold', color: '#667eea' }}>{course.progress}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${course.progress}%`, height: '100%', background: '#667eea' }}></div>
                                        </div>
                                    </div>

                                    <div style={{ background: '#f3f4f6', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>Up Next:</span>
                                        <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <i className="ri-play-circle-line" style={{ color: '#667eea' }}></i>
                                            {course.nextLesson}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/course-details/${course.id}`)}
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                    >
                                        Resume Learning
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="empty-state">
                                <p>No enrolled courses found.</p>
                                <button onClick={() => navigate('/student/browse-courses')} className="btn btn-primary">Browse Courses</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
