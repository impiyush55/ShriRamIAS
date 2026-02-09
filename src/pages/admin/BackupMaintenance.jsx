/**
 * BACKUP MAINTENANCE PAGE
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function BackupMaintenance() {
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
                    <div className="nav-section-title">System</div>

                    <a href="/admin/backup-maintenance" className="nav-item active"><i className="ri-database-2-line"></i>Backup & Maintenance</a>
                </nav>
                <button onClick={async () => { await logoutApi(); navigate('/login.html'); }} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <div><h1>Backup & Maintenance</h1><p>System backups and maintenance tools</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    <i className="ri-save-3-line" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                    <h3>System Backups</h3>
                    <p>Schedule and manage database backups and maintenance capability.</p>
                </div>
            </main>
        </div>
    );
}
