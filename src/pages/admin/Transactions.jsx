/**
 * TRANSACTIONS PAGE
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function Transactions() {
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

                    <a href="/admin/transactions" className="nav-item active"><i className="ri-exchange-line"></i>Transactions</a>

                </nav>
                <button onClick={async () => { await logoutApi(); navigate('/login.html'); }} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <div><h1>Transactions</h1><p>View all financial transactions</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>
                <div className="table-container">
                    <table className="data-table">
                        <thead><tr><th>Transaction ID</th><th>User</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr><td>#TRX-12345</td><td>John Doe</td><td>₹4,999</td><td>2024-02-09</td><td><span className="badge badge-success">Success</span></td></tr>
                            <tr><td>#TRX-12344</td><td>Jane Smith</td><td>₹1,999</td><td>2024-02-08</td><td><span className="badge badge-success">Success</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
