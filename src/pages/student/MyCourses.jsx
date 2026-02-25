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

        // Listen for changes in other tabs (e.g. Admin Approval)
        const handleStorageChange = (e) => {
            if (e.key === 'mockEnrollments') {
                loadCourses();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const loadCourses = async () => {
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Filter for ONLY approved enrollments for the student dashboard
        const mockEnrollments = JSON.parse(localStorage.getItem('mockEnrollments') || '[]');
        const approvedEnrollmentIds = mockEnrollments
            .filter(e => e.studentId === currentUser.id && e.status === 'approved')
            .map(e => e.courseId);

        const studentData = dummyUsers.find(u => u.id === currentUser.id);
        const allEnrolledIds = [...new Set([...approvedEnrollmentIds])]; // Start empty for demo

        if (allEnrolledIds.length > 0) {
            const res = await getEnrolledCoursesApi(currentUser.id, allEnrolledIds);
            if (res.success) {
                // Determine if a course is new (purchased during demo) or default
                const coursesWithProgress = res.data.map(c => {
                    return {
                        ...c,
                        isNew: true,
                        progress: 0,
                        nextLesson: 'Chapter 1: Introduction',
                        buttonText: 'Start Now'
                    };
                });
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
                        <h2>LMS</h2>
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
                                        style={{ width: '100%', background: course.isNew ? '#2ecc71' : '' }}
                                    >
                                        {course.buttonText}
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="empty-state-premium" style={{
                                textAlign: 'center',
                                padding: '5rem 2rem',
                                background: 'rgba(255, 255, 255, 0.4)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                gridColumn: '1 / -1',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
                            }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3.5rem',
                                    color: '#4f46e5',
                                    marginBottom: '2rem',
                                    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.05)'
                                }}>
                                    <i className="ri-book-read-line"></i>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1f2937', marginBottom: '1rem' }}>No Courses Found</h2>
                                <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
                                    You haven student enrolled in any courses yet. Explore our world-class curriculum and take the first step towards your UPSC goals.
                                </p>
                                <button
                                    onClick={() => navigate('/student/browse-courses')}
                                    className="btn-primary-premium"
                                    style={{
                                        padding: '1rem 2.5rem',
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = '0 15px 20px -5px rgba(79, 70, 229, 0.4)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 70, 229, 0.3)';
                                    }}
                                >
                                    Browse Courses
                                    <i className="ri-arrow-right-line"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
