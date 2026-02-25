/**
 * TEST MANAGEMENT PAGE
 * Manage Prelims, Mains, and Sectional tests
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy test data
const dummyTests = [
    { id: 1, title: 'UPSC Prelims Mock Test 1', type: 'Prelims', subject: 'General Studies', questions: 100, duration: '120 min', status: 'Published', attempts: 543 },
    { id: 2, title: 'History Sectional Test', type: 'Sectional', subject: 'History', questions: 50, duration: '60 min', status: 'Published', attempts: 321 },
    { id: 3, title: 'UPSC Mains Mock Test 1', type: 'Mains', subject: 'Essay', questions: 8, duration: '180 min', status: 'Draft', attempts: 0 },
    { id: 4, title: 'Economy Weekly Test', type: 'Sectional', subject: 'Economy', questions: 30, duration: '45 min', status: 'Published', attempts: 432 },
    { id: 5, title: 'CSAT Full Length Test', type: 'Prelims', subject: 'CSAT', questions: 80, duration: '120 min', status: 'Scheduled', attempts: 0 },
];

export default function TestManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setTests(dummyTests);
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
                    className="sidebar-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div><h2>LMS</h2><span className="role-badge admin">Admin Panel</span></div>
                    <button
                        className="mobile-close-btn bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Overview</a>
                    <div className="nav-section-title">Academic Content</div>
                    <a href="/admin/courses" className="nav-item"><i className="ri-book-2-line"></i>Courses</a>
                    <a href="/admin/tests" className="nav-item active"><i className="ri-file-list-3-line"></i>Test Management</a>
                    <a href="/admin/quizzes" className="nav-item"><i className="ri-questionnaire-line"></i>Topic Quizzes</a>
                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >

                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div><h1>Test Management</h1><p>Create and manage assessments</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>

                <div className="section">
                    <div className="filters-bar">
                        <div className="search-group"><i className="ri-search-line"></i><input type="text" placeholder="Search tests..." className="search-input" /></div>
                        <button className="btn btn-primary"><i className="ri-add-circle-line"></i> Create Test</button>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead><tr><th>Test Title</th><th>Type</th><th>Subject</th><th>Details</th><th>Status</th><th>Attempts</th><th>Actions</th></tr></thead>
                            <tbody>
                                {tests.map(test => (
                                    <tr key={test.id}>
                                        <td><strong>{test.title}</strong></td>
                                        <td><span className="badge" style={{ backgroundColor: '#f3f4f6', color: '#374151' }}>{test.type}</span></td>
                                        <td>{test.subject}</td>
                                        <td>{test.questions} Qs • {test.duration}</td>
                                        <td><span className={`status-badge ${test.status === 'Published' ? 'active' : test.status === 'Draft' ? 'pending' : 'inactive'}`}>{test.status}</span></td>
                                        <td>{test.attempts}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="Edit"><i className="ri-edit-line"></i></button>
                                                <button className="btn-icon" title="Results"><i className="ri-bar-chart-line"></i></button>
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
