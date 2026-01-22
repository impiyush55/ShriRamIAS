/**
 * QUIZ MANAGEMENT PAGE
 * Manage topic-wise quizzes and daily MCQs
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy quiz data
const dummyQuizzes = [
    { id: 1, title: 'President of India', topic: 'Polity', questions: 10, status: 'Active', attempts: 1200 },
    { id: 2, title: 'Indus Valley Civilization', topic: 'History', questions: 15, status: 'Active', attempts: 980 },
    { id: 3, title: 'National Parks', topic: 'Environment', questions: 10, status: 'Draft', attempts: 0 },
    { id: 4, title: 'Monetary Policy', topic: 'Economy', questions: 12, status: 'Active', attempts: 1500 },
    { id: 5, title: 'Isro Missions', topic: 'Science & Tech', questions: 10, status: 'Inactive', attempts: 450 },
];

export default function QuizManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setQuizzes(dummyQuizzes);
    }, []);

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    return (
        <div className="dashboard-container admin-dashboard">
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
                    <div><h2>SRIRAM's IAS</h2><span className="role-badge admin">Admin Panel</span></div>
                    <button
                        className="mobile-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Overview</a>
                    <div className="nav-section-title">Academic Content</div>
                    <a href="/admin/courses" className="nav-item"><i className="ri-book-2-line"></i>Courses</a>
                    <a href="/admin/tests" className="nav-item"><i className="ri-file-list-3-line"></i>Test Management</a>
                    <a href="/admin/quizzes" className="nav-item active"><i className="ri-questionnaire-line"></i>Topic Quizzes</a>
                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>
                <button onClick={handleLogout} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="menu-toggle-btn"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div><h1>Topic Quizzes</h1><p>Manage daily MCQs and topic-wise practice</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>

                <div className="section">
                    <div className="filters-bar">
                        <div className="search-group"><i className="ri-search-line"></i><input type="text" placeholder="Search quizzes..." className="search-input" /></div>
                        <button className="btn btn-primary"><i className="ri-add-line"></i> Create Quiz</button>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead><tr><th>Quiz Title</th><th>Topic</th><th>Questions</th><th>Status</th><th>Attempts</th><th>Actions</th></tr></thead>
                            <tbody>
                                {quizzes.map(quiz => (
                                    <tr key={quiz.id}>
                                        <td><strong>{quiz.title}</strong></td>
                                        <td>{quiz.topic}</td>
                                        <td>{quiz.questions}</td>
                                        <td><span className={`status-badge ${quiz.status === 'Active' ? 'active' : quiz.status === 'Draft' ? 'pending' : 'inactive'}`}>{quiz.status}</span></td>
                                        <td>{quiz.attempts}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="Edit"><i className="ri-edit-line"></i></button>
                                                <button className="btn-icon" title="Delete"><i className="ri-delete-bin-line"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
