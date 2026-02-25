/**
 * AUDIT LOGS PAGE
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function AuditLogs() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    return (
        <div className="dashboard-container admin-dashboard">
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header"><div><h2>LMS</h2><span className="role-badge admin">Admin</span></div></div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>
                    <div className="nav-section-title">System</div>
                    <a href="/admin/audit-logs" className="nav-item active"><i className="ri-file-history-line"></i>Audit Logs</a>
                </nav>

            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <div><h1>Audit Logs</h1><p>View system activity and security logs</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>
                <div className="table-container">
                    <table className="data-table">
                        <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>IP Address</th></tr></thead>
                        <tbody>
                            <tr><td>2024-02-09 10:30:00</td><td>Admin User</td><td>Login</td><td>192.168.1.1</td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
