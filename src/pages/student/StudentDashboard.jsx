/**
 * STUDENT DASHBOARD
 * Modern, card-based dashboard for students
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { getEnrolledCoursesApi } from '../../api/courseApi';
import { getStudentAttemptsApi } from '../../api/testApi';
import { getWalletBalance } from '../../api/paymentApi';
import { dummyUsers } from '../../data/users';
import '../../styles/dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [testAttempts, setTestAttempts] = useState([]);
    const [stats, setStats] = useState({
        averageScore: 0,
        testsAttempted: 0,
        bestRank: '-',
        accuracy: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();

        // Listen for changes in other tabs (e.g. Admin Approval)
        const handleStorageChange = (e) => {
            if (e.key === 'mockEnrollments') {
                loadDashboardData();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const loadDashboardData = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();

        // Update user object with latest wallet balance for the UI
        const balance = getWalletBalance();
        const userWithBalance = { ...currentUser, walletBalance: balance };
        setUser(userWithBalance);

        // Filter for ONLY approved enrollments for the student dashboard
        const mockEnrollments = JSON.parse(localStorage.getItem('mockEnrollments') || '[]');
        const approvedEnrollmentIds = mockEnrollments
            .filter(e => e.studentId === currentUser.id && e.status === 'approved')
            .map(e => e.courseId);

        const studentData = dummyUsers.find(u => u.id === currentUser.id);
        const allEnrolledIds = [...new Set([...approvedEnrollmentIds])]; // ONLY show what was bought in the demo

        if (allEnrolledIds.length > 0) {
            // Fetch enrolled courses
            const coursesRes = await getEnrolledCoursesApi(currentUser.id, allEnrolledIds);
            if (coursesRes.success) {
                // Add some dummy progress data for demo
                const coursesWithProgress = coursesRes.data.map(c => {
                    return {
                        ...c,
                        isNew: true,
                        progress: 0,
                        buttonText: 'Start'
                    };
                });
                setEnrolledCourses(coursesWithProgress);
            }

            // Fetch test attempts
            const attemptsRes = await getStudentAttemptsApi(currentUser.id);
            if (attemptsRes.success) {
                setTestAttempts(attemptsRes.data);

                // Calculate stats
                const attempts = attemptsRes.data;
                const avgScore = attempts.length ? (attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length).toFixed(1) : 0;
                const bestRank = attempts.length ? Math.min(...attempts.map(a => a.rank)) : '-';

                // Calculate accuracy (dummy calculation based on score for demo)
                const accuracy = attempts.length ? (avgScore * 0.9).toFixed(1) : 0;

                setStats({
                    averageScore: avgScore,
                    testsAttempted: attempts.length,
                    bestRank: bestRank,
                    accuracy: accuracy
                });
            }
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/');
    };

    // Helper for Status/Score Colors
    const getScoreColor = (score) => {
        if (score >= 75) return '#10b981'; // Green
        if (score >= 50) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading dashboard...</p>
            </div>
        );
    }

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

            {/* Sidebar */}
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
                    <a href="/student/dashboard" className="nav-item active">
                        <i className="ri-dashboard-line"></i>
                        Dashboard
                    </a>
                    <a href="/student/courses" className="nav-item">
                        <i className="ri-book-line"></i>
                        My Courses
                    </a>
                    <a href="/student/browse-courses" className="nav-item">
                        <i className="ri-search-line"></i>
                        Browse Courses
                    </a>
                    <a href="/student/tests" className="nav-item">
                        <i className="ri-file-list-line"></i>
                        Tests & Quizzes
                    </a>
                    <a href="/student/blogs" className="nav-item">
                        <i className="ri-article-line"></i>
                        Blogs & Resources
                    </a>
                    <a href="/" className="nav-item">
                        <i className="ri-home-line"></i>
                        Back to Home
                    </a>
                </nav>


            </aside>

            {/* Main Content */}
            <main className="dashboard-main" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', marginLeft: window.innerWidth > 768 ? '280px' : '0' }}>
                <header className="dashboard-header" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="menu-toggle-btn"
                            onClick={toggleSidebar}
                            style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>Hello, {user?.name.split(' ')[0]}! 👋</h1>
                            <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Ready to continue your preparation today?</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <div className="wallet-card" onClick={() => navigate('/wallet')}>
                            <div className="wallet-icon">
                                <i className="ri-wallet-3-line"></i>
                            </div>
                            <div className="wallet-info">
                                <span className="wallet-label">Wallet Balance</span>
                                <span className="wallet-amount">₹{(user?.walletBalance || 0).toLocaleString()}</span>
                            </div>
                        </div>
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                    </div>
                </header>

                {/* 1. Learning Progress Section (Horizontal Cards) */}
                <section style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>Continue Learning</h2>
                        <button style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/student/courses')}>
                            View All Courses <i className="ri-arrow-right-line"></i>
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {enrolledCourses.length > 0 ? (
                            enrolledCourses.slice(0, 2).map(course => (
                                <div key={course.id} style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '1.25rem',
                                    display: 'flex',
                                    gap: '1.25rem',
                                    alignItems: 'center',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                    border: '1px solid #f3f4f6'
                                }}>
                                    <div style={{
                                        width: '80px',
                                        height: '70px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        flexShrink: 0
                                    }}>
                                        <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem', lineHeight: 1.3 }}>{course.title}</h3>

                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                <span>Progress</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <div style={{ width: '100%', height: '6px', backgroundColor: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                                                <div style={{ width: `${course.progress}%`, height: '100%', backgroundColor: '#4f46e5', borderRadius: '10px' }}></div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/course-details/${course.id}`)}
                                            style={{
                                                background: course.isNew ? '#2ecc71' : '#e0e7ff',
                                                color: course.isNew ? 'white' : '#4338ca',
                                                border: 'none',
                                                padding: '0.4rem 1rem',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                            }}
                                        >
                                            <i className={course.isNew ? "ri-play-circle-line" : "ri-play-fill"}></i> {course.isNew ? 'Start Now' : 'Continue'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{
                                gridColumn: '1/-1',
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                background: 'white',
                                borderRadius: '16px',
                                border: '1px dashed #cbd5e1',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', color: '#64748b', marginBottom: '1rem'
                                }}>
                                    <i className="ri-book-3-line"></i>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>No active courses yet</h3>
                                <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '400px' }}>Your enrolled courses will appear here once you purchase and get approval.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/student/browse-courses')} style={{ padding: '0.75rem 2rem' }}>
                                    Find Your Course
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* 2. Performance Overview (Visual Cards) */}
                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>Performance Overview</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {/* Avg Score */}
                        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                <i className="ri-bar-chart-fill"></i>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{stats.averageScore}%</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Average Score</p>
                            </div>
                        </div>

                        {/* Tests Attempted */}
                        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                <i className="ri-file-list-3-line"></i>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{stats.testsAttempted}</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Tests Attempted</p>
                            </div>
                        </div>

                        {/* Best Rank */}
                        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                <i className="ri-trophy-fill"></i>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{stats.bestRank}</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Best Rank Achieved</p>
                            </div>
                        </div>

                        {/* Accuracy */}
                        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                <i className="ri-focus-3-line"></i>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{stats.accuracy}%</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Accuracy Rate</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>

                    {/* 3. Recent Test Results (Grid) */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>Recent Test Results</h2>
                            <button onClick={() => navigate('/student/tests')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.9rem' }}>
                                View All
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {testAttempts.length > 0 ? (
                                testAttempts.slice(0, 4).map((attempt, index) => (
                                    <div key={index} style={{
                                        background: 'white',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                        border: '1px solid #e5e7eb',
                                        transition: 'transform 0.2s',
                                        cursor: 'default'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                color: '#6b7280',
                                                background: '#f3f4f6',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '50px'
                                            }}>
                                                Test #{attempt.testId}
                                            </span>
                                            <span style={{ fontWeight: 500, color: '#9ca3af', fontSize: '0.85rem' }}>
                                                {new Date().toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: getScoreColor(attempt.percentage), lineHeight: 1 }}>
                                                {attempt.percentage}%
                                            </div>
                                            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Score Achieved</span>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0 1rem' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <i className="ri-check-line"></i> {attempt.correctAnswers}
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Correct</span>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <i className="ri-close-line"></i> {attempt.incorrectAnswers}
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Incorrect</span>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ color: '#d97706', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <i className="ri-trophy-line"></i> #{attempt.rank}
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Rank</span>
                                            </div>
                                        </div>

                                        <button style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'white',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            color: '#374151',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                            onMouseOver={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#9ca3af'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                                        >
                                            View Full Analysis
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px' }}>
                                    <p style={{ color: '#6b7280' }}>No tests attempted yet. Start a quiz to see results!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4. Analytics Chart (Sidebar style) */}
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>Analytics</h2>
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            border: '1px solid #e5e7eb',
                            height: '400px'
                        }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>Subject Performance</h3>
                            <ResponsiveContainer width="100%" height="90%">
                                <BarChart
                                    data={[
                                        { subject: 'Polity', score: 78 },
                                        { subject: 'History', score: 65 },
                                        { subject: 'Economy', score: 82 },
                                        { subject: 'Env', score: 90 },
                                        { subject: 'S&T', score: 55 },
                                    ]}
                                    margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="subject" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                                    <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
