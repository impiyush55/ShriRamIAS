/**
 * NOTIFICATION MANAGEMENT PAGE
 * Manage system-wide announcements, push notifications, and scrolling tickers.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy notifications data
const dummyNotifications = [
    { id: 1, title: 'UPSC Prelims Admit Card Out', message: 'Download your admit cards from official site.', type: 'System Alert', audience: 'All Users', status: 'Active', date: '2024-05-15' },
    { id: 2, title: 'History Class Rescheduled', message: 'Today history class is moved to 5 PM.', type: 'Class Update', audience: 'Foundation Batch', status: 'Sent', date: '2024-01-20' },
    { id: 3, title: 'New Test Series Launched', message: 'Join the new Mains Answer Writing program.', type: 'Promotional', audience: 'Students', status: 'Active', date: '2024-01-18' },
    { id: 4, title: 'Server Maintenance', message: 'System will be down for 2 hours on Sunday.', type: 'System Alert', audience: 'All Users', status: 'Scheduled', date: '2024-01-25' },
];

export default function NotificationManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setNotifications(dummyNotifications);
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    if (loading) return <div className="dashboard-loading"><i className="ri-loader-4-line rotating"></i></div>;

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

                    <div className="nav-section-title">Communication</div>
                    <a href="/admin/notifications" className="nav-item active"><i className="ri-notification-3-line"></i>Notifications</a>
                    <a href="/admin/support" className="nav-item"><i className="ri-customer-service-line"></i>Support Desk</a>



                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'none' }}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div><h1>Notifications & Alerts</h1><p>Manage announcements and push notifications</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>

                <div className="section">
                    <div className="filters-bar">
                        <div className="search-group"><i className="ri-search-line"></i><input type="text" placeholder="Search notifications..." className="search-input" /></div>
                        <button className="btn btn-primary"><i className="ri-send-plane-fill"></i> Send Notification</button>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead><tr><th>Title</th><th>Message</th><th>Type</th><th>Audience</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                            <tbody>
                                {notifications.map(notif => (
                                    <tr key={notif.id}>
                                        <td><strong>{notif.title}</strong></td>
                                        <td><span className="text-truncate" style={{ maxWidth: '200px', display: 'inline-block' }}>{notif.message}</span></td>
                                        <td><span className="badge badge-info">{notif.type}</span></td>
                                        <td>{notif.audience}</td>
                                        <td><span className={`status-badge ${notif.status === 'Active' ? 'active' : notif.status === 'Sent' ? 'success' : 'warning'}`}>{notif.status}</span></td>
                                        <td>{notif.date}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="Resend"><i className="ri-repeat-line"></i></button>
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
