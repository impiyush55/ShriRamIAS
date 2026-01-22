/**
 * STUDENT DASHBOARD
 * Modern, card-based dashboard for students
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { getEnrolledCoursesApi } from '../../api/courseApi';
import { getStudentAttemptsApi } from '../../api/testApi';
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
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const loadDashboardData = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        const studentData = dummyUsers.find(u => u.id === currentUser.id);

        if (studentData && studentData.enrolledCourses) {
            // Fetch enrolled courses
            const coursesRes = await getEnrolledCoursesApi(currentUser.id, studentData.enrolledCourses);
            if (coursesRes.success) {
                // Add some dummy progress data for demo
                const coursesWithProgress = coursesRes.data.map(c => ({
                    ...c,
                    progress: Math.floor(Math.random() * 80) + 10 // Random progress 10-90%
                }));
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
        navigate('/login.html');
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

                <button onClick={handleLogout} className="logout-btn">
                    <i className="ri-logout-box-line"></i>
                    Logout
                </button>
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
                                <span className="wallet-amount">₹{user?.walletBalance ?? 50}</span>
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
                                            onClick={() => navigate(`/student/courses/${course.id}`)}
                                            style={{
                                                background: '#e0e7ff',
                                                color: '#4338ca',
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
                                            <i className="ri-play-fill"></i> Continue
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px', border: '1px dashed #d1d5db' }}>
                                <i className="ri-book-open-line" style={{ fontSize: '2rem', color: '#9ca3af', marginBottom: '1rem', display: 'block' }}></i>
                                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>You haven't enrolled in any courses yet.</p>
                                <button className="btn btn-primary" onClick={() => navigate('/student/browse-courses')}>Browse Courses</button>
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
