/**
 * TEST SERIES PAGE
 * List of available tests and quizzes for students
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../api/authApi';
import '../../styles/dashboard.css';

// Dummy Test Data
const availableTests = [
    { id: 1, title: 'UPSC Prelims Mock 1 - GS', subject: 'General Studies', questions: 100, duration: '120 min', status: 'Available', difficulty: 'Hard' },
    { id: 2, title: 'History Sectional - Ancient India', subject: 'History', questions: 50, duration: '60 min', status: 'Available', difficulty: 'Medium' },
    { id: 3, title: 'Polity - Constitution', subject: 'Polity', questions: 30, duration: '45 min', status: 'Completed', score: '78%', difficulty: 'Medium' },
    { id: 4, title: 'Economy - Budget 2024', subject: 'Economy', questions: 25, duration: '30 min', status: 'Available', difficulty: 'Hard' },
    { id: 5, title: 'CSAT Practice Set 1', subject: 'CSAT', questions: 80, duration: '120 min', status: 'Available', difficulty: 'Medium' },
    { id: 6, title: 'Geography - Physical Features', subject: 'Geography', questions: 40, duration: '50 min', status: 'Locked', difficulty: 'Easy' },
];

export default function TestSeries() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const filteredTests = filter === 'All' ? availableTests : availableTests.filter(t => t.subject === filter || t.status === filter);

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
                    <a href="/student/courses" className="nav-item"><i className="ri-book-line"></i>My Courses</a>
                    <a href="/student/browse-courses" className="nav-item"><i className="ri-search-line"></i>Browse Courses</a>
                    <a href="/student/tests" className="nav-item active"><i className="ri-file-list-line"></i>Tests & Quizzes</a>
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
                            <h1>Test Series</h1>
                            <p>Evaluate your preparation with our comprehensive tests</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                <div className="section">
                    <div className="filters-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        {['All', 'Available', 'Completed', 'History', 'Polity', 'CSAT'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`btn-outline ${filter === f ? 'active' : ''}`}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    border: filter === f ? '2px solid #667eea' : '1px solid #e5e7eb',
                                    background: filter === f ? '#eff6ff' : 'white',
                                    color: filter === f ? '#667eea' : '#4b5563',
                                    cursor: 'pointer'
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="tests-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {filteredTests.map(test => (
                            <div key={test.id} className="course-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: `4px solid ${test.status === 'Completed' ? '#10b981' : '#667eea'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <span className="badge" style={{ background: '#f3f4f6', color: '#374151', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{test.subject}</span>
                                    {test.status === 'Completed' && <span style={{ color: '#10b981', fontWeight: 'bold' }}><i className="ri-checkbox-circle-fill"></i> {test.score}</span>}
                                </div>

                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{test.title}</h3>

                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                                    <span><i className="ri-question-answer-line"></i> {test.questions} Qs</span>
                                    <span><i className="ri-time-line"></i> {test.duration}</span>
                                </div>

                                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                                    {test.status === 'Available' ? (
                                        <button className="btn btn-primary" style={{ width: '100%' }}>Start Test</button>
                                    ) : test.status === 'Completed' ? (
                                        <button className="btn-outline" style={{ width: '100%', textAlign: 'center' }}>View Analysis</button>
                                    ) : (
                                        <button className="btn" disabled style={{ width: '100%', background: '#e5e7eb', color: '#9ca3af', cursor: 'not-allowed' }}>Locked</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
