/**
 * ANSWER SHEET REVIEW PAGE
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function AnswerSheetReview() {
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
                    <div className="nav-section-title">Academic Tools</div>

                    <a href="/admin/answer-sheets" className="nav-item active"><i className="ri-file-text-line"></i>Answer Sheet Review</a>

                </nav>

            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <div><h1>Answer Sheet Review</h1><p>Review and grade student answer sheets</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    <i className="ri-file-search-line" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                    <h3>No Answer Sheets Pending Review</h3>
                    <p>All submitted answer sheets have been evaluated.</p>
                </div>
            </main>
        </div>
    );
}
