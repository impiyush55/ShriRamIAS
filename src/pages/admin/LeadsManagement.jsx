/**
 * LEADS MANAGEMENT PAGE
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function LeadsManagement() {
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
                <div className="sidebar-header"><div><h2>SRIRAM's IAS</h2><span className="role-badge admin">Admin</span></div></div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>
                    <div className="nav-section-title">Business & Operations</div>
                    <a href="/admin/leads" className="nav-item active"><i className="ri-user-search-line"></i>Leads Management</a>

                </nav>

            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <div><h1>Leads Management</h1><p>Track potential student leads</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>
                <div className="table-container">
                    <table className="data-table">
                        <thead><tr><th>Name</th><th>Phone</th><th>Source</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            <tr><td>Amit Verma</td><td>+91 98765 12345</td><td>Facebook Ad</td><td><span className="badge badge-warning">New</span></td><td><button className="btn-icon"><i className="ri-eye-line"></i></button></td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
