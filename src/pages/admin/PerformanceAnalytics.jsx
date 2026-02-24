/**
 * PERFORMANCE ANALYTICS PAGE
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function PerformanceAnalytics() {
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

                    <a href="/admin/performance-analytics" className="nav-item active"><i className="ri-line-chart-line"></i>Performance Analytics</a>
                </nav>

            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <div><h1>Performance Analytics</h1><p>Analyze student performance and trends</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon"><i className="ri-bar-chart-groupped-line"></i></div>
                        <div className="stat-content"><h3>85%</h3><p>Avg. Test Score</p></div>
                    </div>
                    <div className="stat-card stat-success">
                        <div className="stat-icon"><i className="ri-user-star-line"></i></div>
                        <div className="stat-content"><h3>120</h3><p>Top Performers</p></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
