/**
 * SUPPORT HELPDESK PAGE
 * Manage student queries, complaints, and technical tickets.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy data for support tickets
const dummyTickets = [
    { id: 'TKT-1001', student: 'Rahul Kumar', subject: 'Video not playing', category: 'Technical', status: 'Open', priority: 'High', date: '2024-01-21' },
    { id: 'TKT-1002', student: 'Priya Singh', subject: 'Polity Notes PDF missing', category: 'Content', status: 'In Progress', priority: 'Medium', date: '2024-01-20' },
    { id: 'TKT-1003', student: 'Amit Verma', subject: 'Refund Request', category: 'Payment', status: 'Closed', priority: 'High', date: '2024-01-18' },
    { id: 'TKT-1004', student: 'Sneha Gupta', subject: 'Test Series Access', category: 'Access', status: 'Open', priority: 'Low', date: '2024-01-21' },
];

export default function SupportHelpdesk() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setTickets(dummyTickets);
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
                    <a href="/admin/notifications" className="nav-item"><i className="ri-notification-3-line"></i>Notifications</a>
                    <a href="/admin/support" className="nav-item active"><i className="ri-customer-service-line"></i>Support Desk</a>

                    <div className="nav-section-title">Content & Media</div>
                    <a href="/admin/blogs" className="nav-item"><i className="ri-article-line"></i>Blog Management</a>

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
                        <div><h1>Support Helpdesk</h1><p>Resolve student queries and technical issues</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>

                <div className="section">
                    <div className="filters-bar">
                        <div className="search-group"><i className="ri-search-line"></i><input type="text" placeholder="Search Ticket ID or Student..." className="search-input" /></div>
                        <select className="search-input" style={{ width: '150px' }}>
                            <option>All Status</option>
                            <option>Open</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead><tr><th>Ticket ID</th><th>Student</th><th>Subject</th><th>Category</th><th>Priority</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                            <tbody>
                                {tickets.map(ticket => (
                                    <tr key={ticket.id}>
                                        <td><strong>{ticket.id}</strong></td>
                                        <td>{ticket.student}</td>
                                        <td>{ticket.subject}</td>
                                        <td><span className="badge badge-info">{ticket.category}</span></td>
                                        <td><span className={`badge ${ticket.priority === 'High' ? 'badge-danger' : 'badge-warning'}`}>{ticket.priority}</span></td>
                                        <td><span className={`status-badge ${ticket.status === 'Open' ? 'active' : ticket.status === 'Closed' ? 'inactive' : 'warning'}`}>{ticket.status}</span></td>
                                        <td>{ticket.date}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="Reply"><i className="ri-reply-line"></i></button>
                                                <button className="btn-icon" title="Close Ticket"><i className="ri-checkbox-circle-line"></i></button>
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
