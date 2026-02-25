/**
 * WALLET PAGE
 * Student wallet and transaction history
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { getWalletBalance } from '../../api/paymentApi';
import '../../styles/dashboard.css';

export default function WalletPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWalletData();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const loadWalletData = async () => {
        const currentUser = getCurrentUser();

        // Get dynamic balance for demo
        const balance = getWalletBalance();
        setUser({ ...currentUser, walletBalance: balance });

        // Merge dummy transactions with mock enrollments
        const mockEnrollments = JSON.parse(localStorage.getItem('mockEnrollments') || '[]');
        const userEnrollments = mockEnrollments
            .filter(e => e.studentId === currentUser.id)
            .map(e => ({
                id: e.id,
                type: 'debit',
                description: `Course Purchase: ${e.courseTitle}`,
                amount: e.amount,
                date: e.enrolledAt,
                status: 'Success'
            }));

        setTransactions([
            ...userEnrollments,
            { id: 'initial', type: 'credit', description: 'Initial Wallet Credit', amount: 100000, date: '2026-01-01', status: 'Success' },
        ]);

        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading wallet...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
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

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2>LMS</h2>
                        <span className="role-badge student">Student</span>
                    </div>
                    <button
                        className="mobile-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <a href="/student/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard
                    </a>
                    <a href="/student/courses" className="nav-item">
                        <i className="ri-book-line"></i>
                        My Courses
                    </a>
                    <a href="/student/browse-courses" className="nav-item">
                        <i className="ri-search-line"></i>
                        Browse Courses
                    </a>
                    <a href="/student/tests" className="nav-item">
                        <i className="ri-file-list-line"></i>
                        Tests & Quizzes
                    </a>
                    <a href="/wallet" className="nav-item active">
                        <i className="ri-wallet-3-line"></i>
                        Wallet
                    </a>
                    <a href="/student/blogs" className="nav-item">
                        <i className="ri-article-line"></i>
                        Blogs & Resources
                    </a>
                    <a href="/" className="nav-item">
                        <i className="ri-home-line"></i>
                        Back to Home
                    </a>
                </nav>


            </aside>

            {/* Main Content */}
            <main className="dashboard-main" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', marginLeft: window.innerWidth > 768 ? '280px' : '0' }}>
                <header className="dashboard-header" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="menu-toggle-btn"
                            onClick={toggleSidebar}
                            style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>My Wallet</h1>
                            <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Manage your balance and transactions</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <div className="wallet-card" style={{ cursor: 'default', borderColor: '#667eea', background: '#f5f3ff' }}>
                            <div className="wallet-icon" style={{ background: '#667eea', color: 'white' }}>
                                <i className="ri-wallet-3-line"></i>
                            </div>
                            <div className="wallet-info">
                                <span className="wallet-label">Current Balance</span>
                                <span className="wallet-amount" style={{ fontSize: '1.1rem' }}>₹{(user?.walletBalance || 0).toLocaleString()}</span>
                            </div>
                        </div>
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                    </div>
                </header>

                {/* Balance Card Section */}
                <section style={{ marginBottom: '2.5rem' }}>
                    <div className="section" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                            <div>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Wallet Balance</p>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>₹{(user?.walletBalance || 0).toLocaleString()}.00</h2>
                            </div>
                            <button
                                style={{
                                    background: 'white',
                                    color: '#4f46e5',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <i className="ri-add-line"></i> Add Money
                            </button>
                        </div>
                    </div>
                </section>

                {/* Transactions Section */}
                <section>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>Transaction History</h2>

                    <div className="section" style={{ padding: 0, overflow: 'hidden' }}>
                        <div className="table-container">
                            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                    <tr>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#4b5563' }}>Date</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#4b5563' }}>Description</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#4b5563' }}>Status</th>
                                        <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#4b5563' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(tx => (
                                        <tr key={tx.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                            <td style={{ padding: '1rem', color: '#6b7280' }} data-label="Date">
                                                {new Date(tx.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td style={{ padding: '1rem', fontWeight: 500 }} data-label="Description">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{
                                                        width: '32px', height: '32px', borderRadius: '50%',
                                                        background: tx.type === 'credit' ? '#ecfdf5' : '#fff1f2',
                                                        color: tx.type === 'credit' ? '#10b981' : '#ef4444',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}>
                                                        <i className={tx.type === 'credit' ? "ri-arrow-down-line" : "ri-arrow-up-line"}></i>
                                                    </div>
                                                    {tx.description}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }} data-label="Status">
                                                <span style={{
                                                    padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
                                                    background: '#ecfdf5', color: '#059669'
                                                }}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }} data-label="Amount">
                                                <span style={{ color: tx.type === 'credit' ? '#10b981' : '#ef4444' }}>
                                                    {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
