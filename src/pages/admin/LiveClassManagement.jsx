/**
 * LIVE CLASS MANAGEMENT PAGE
 * Schedule and manage live sessions
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy live class data
const dummyLiveClasses = [
    { id: 1, title: 'Polity - Fundamental Rights', instructor: 'Dr. Rajesh Kumar', date: '2024-01-21', time: '10:00 AM', status: 'Live', attendees: 145 },
    { id: 2, title: 'History - Mughal Architecture', instructor: 'Prof. Anjali Desai', date: '2024-01-21', time: '02:00 PM', status: 'Scheduled', attendees: 0 },
    { id: 3, title: 'Current Affairs - Weekly Roundup', instructor: 'Mr. Vivek Singh', date: '2024-01-22', time: '06:00 PM', status: 'Scheduled', attendees: 0 },
    { id: 4, title: 'Geography - Monsoon System', instructor: 'Ms. Priya Sharma', date: '2024-01-20', time: '11:00 AM', status: 'Completed', attendees: 230 },
    { id: 5, title: 'Ethics - Case Study Discussion', instructor: 'Dr. Rajesh Kumar', date: '2024-01-19', time: '04:00 PM', status: 'Completed', attendees: 189 },
];

export default function LiveClassManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [liveClasses, setLiveClasses] = useState([]);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setLiveClasses(dummyLiveClasses);
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
                    <a href="/admin/live-classes" className="nav-item active"><i className="ri-live-line"></i>Live Classes</a>
                    <a href="/admin/tests" className="nav-item"><i className="ri-file-list-3-line"></i>Test Management</a>
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
                        <div><h1>Live Class Management</h1><p>Schedule and monitor live sessions</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>

                <div className="section">
                    <div className="filters-bar">
                        <div className="search-group"><i className="ri-search-line"></i><input type="text" placeholder="Search sessions..." className="search-input" /></div>
                        <button className="btn btn-primary"><i className="ri-calendar-event-line"></i> Schedule Class</button>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead><tr><th>Session Title</th><th>Instructor</th><th>Date & Time</th><th>Status</th><th>Attendees</th><th>Actions</th></tr></thead>
                            <tbody>
                                {liveClasses.map(cls => (
                                    <tr key={cls.id}>
                                        <td><strong>{cls.title}</strong></td>
                                        <td>{cls.instructor}</td>
                                        <td>{cls.date} <br /> <small style={{ color: '#6b7280' }}>{cls.time}</small></td>
                                        <td><span className={`status-badge ${cls.status === 'Live' ? 'inactive' : cls.status === 'Scheduled' ? 'pending' : 'active'}`} style={cls.status === 'Live' ? { backgroundColor: '#fee2e2', color: '#dc2626', animation: 'pulse 2s infinite' } : {}}>{cls.status}</span></td>
                                        <td>{cls.status === 'Scheduled' ? '-' : cls.attendees}</td>
                                        <td>
                                            <div className="action-buttons">
                                                {cls.status === 'Live' && <button className="btn-icon" title="Join"><i className="ri-play-circle-line" style={{ color: '#dc2626' }}></i></button>}
                                                <button className="btn-icon" title="Edit"><i className="ri-edit-line"></i></button>
                                                <button className="btn-icon" title="Cancel"><i className="ri-close-circle-line"></i></button>
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
