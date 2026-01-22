/**
 * WALLET MANAGEMENT PAGE
 * Manage student wallets - credits, refunds, usage tracking
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy wallet data
const dummyWallets = [
    {
        id: 1,
        studentName: 'Rahul Sharma',
        studentEmail: 'rahul.sharma@email.com',
        balance: 5000,
        totalCredits: 15000,
        totalUsed: 10000,
        totalRefunds: 0,
        status: 'active',
        lastTransaction: '2024-01-20',
        transactions: [
            { id: 1, type: 'credit', amount: 10000, description: 'Course enrollment refund', date: '2024-01-15' },
            { id: 2, type: 'credit', amount: 5000, description: 'Promotional credit', date: '2024-01-10' },
            { id: 3, type: 'debit', amount: 10000, description: 'Foundation Course purchase', date: '2024-01-18' }
        ]
    },
    {
        id: 2,
        studentName: 'Priya Patel',
        studentEmail: 'priya.patel@email.com',
        balance: 12000,
        totalCredits: 12000,
        totalUsed: 0,
        totalRefunds: 0,
        status: 'active',
        lastTransaction: '2024-01-19',
        transactions: [
            { id: 1, type: 'credit', amount: 12000, description: 'Initial wallet credit', date: '2024-01-19' }
        ]
    },
    {
        id: 3,
        studentName: 'Amit Kumar',
        studentEmail: 'amit.kumar@email.com',
        balance: 0,
        totalCredits: 8000,
        totalUsed: 8000,
        totalRefunds: 0,
        status: 'active',
        lastTransaction: '2024-01-18',
        transactions: [
            { id: 1, type: 'credit', amount: 8000, description: 'Refund processed', date: '2024-01-10' },
            { id: 2, type: 'debit', amount: 8000, description: 'Prelims Course purchase', date: '2024-01-18' }
        ]
    },
    {
        id: 4,
        studentName: 'Sneha Gupta',
        studentEmail: 'sneha.gupta@email.com',
        balance: 3000,
        totalCredits: 5000,
        totalUsed: 2000,
        totalRefunds: 2000,
        status: 'pending_refund',
        lastTransaction: '2024-01-20',
        transactions: [
            { id: 1, type: 'credit', amount: 5000, description: 'Course cancellation refund', date: '2024-01-15' },
            { id: 2, type: 'debit', amount: 2000, description: 'Test series purchase', date: '2024-01-17' },
            { id: 3, type: 'refund_pending', amount: 2000, description: 'Refund requested', date: '2024-01-20' }
        ]
    },
    {
        id: 5,
        studentName: 'Vikram Singh',
        studentEmail: 'vikram.singh@email.com',
        balance: 7500,
        totalCredits: 20000,
        totalUsed: 12500,
        totalRefunds: 0,
        status: 'active',
        lastTransaction: '2024-01-19',
        transactions: [
            { id: 1, type: 'credit', amount: 20000, description: 'Bulk credit added', date: '2024-01-05' },
            { id: 2, type: 'debit', amount: 12500, description: 'Multiple course purchases', date: '2024-01-19' }
        ]
    }
];

// Pending refund requests
const pendingRefunds = [
    {
        id: 1,
        studentName: 'Sneha Gupta',
        studentEmail: 'sneha.gupta@email.com',
        amount: 2000,
        reason: 'Course not as expected',
        requestDate: '2024-01-20',
        status: 'pending'
    },
    {
        id: 2,
        studentName: 'Anjali Verma',
        studentEmail: 'anjali.verma@email.com',
        amount: 5000,
        reason: 'Technical issues with platform',
        requestDate: '2024-01-19',
        status: 'pending'
    },
    {
        id: 3,
        studentName: 'Rohit Mehta',
        studentEmail: 'rohit.mehta@email.com',
        amount: 3500,
        reason: 'Duplicate payment',
        requestDate: '2024-01-18',
        status: 'pending'
    }
];

export default function WalletManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [wallets, setWallets] = useState([]);
    const [refunds, setRefunds] = useState([]);
    const [filteredWallets, setFilteredWallets] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [activeTab, setActiveTab] = useState('wallets'); // 'wallets' or 'refunds'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWallets();
    }, []);

    useEffect(() => {
        filterWallets();
    }, [filterStatus, searchQuery, wallets]);

    const loadWallets = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        setWallets(dummyWallets);
        setRefunds(pendingRefunds);
        setFilteredWallets(dummyWallets);

        setLoading(false);
    };

    const filterWallets = () => {
        let filtered = wallets;

        if (filterStatus !== 'all') {
            filtered = filtered.filter(w => w.status === filterStatus);
        }

        if (searchQuery) {
            filtered = filtered.filter(w =>
                w.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                w.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredWallets(filtered);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const getWalletStats = () => {
        const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
        const totalCredits = wallets.reduce((sum, w) => sum + w.totalCredits, 0);
        const totalUsed = wallets.reduce((sum, w) => sum + w.totalUsed, 0);
        const activeWallets = wallets.filter(w => w.status === 'active').length;

        return {
            totalBalance,
            totalCredits,
            totalUsed,
            activeWallets,
            pendingRefunds: refunds.length
        };
    };

    const getStatusBadgeClass = (status) => {
        const statusMap = {
            active: 'status-badge active',
            pending_refund: 'status-badge pending',
            inactive: 'status-badge inactive'
        };
        return statusMap[status] || 'status-badge';
    };

    const stats = getWalletStats();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading wallets...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container admin-dashboard">
            {/* Sidebar */}
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
                        <h2>SRIRAM's IAS</h2>
                        <span className="role-badge admin">Admin Panel</span>
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
                    <a href="/admin/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard Overview
                    </a>

                    <div className="nav-section-title">User Management</div>
                    <a href="/admin/users" className="nav-item">
                        <i className="ri-user-settings-line"></i>
                        User & Roles
                    </a>
                    <a href="/admin/enquiries" className="nav-item">
                        <i className="ri-customer-service-2-line"></i>
                        Enquiries
                    </a>
                    <a href="/admin/wallets" className="nav-item active">
                        <i className="ri-wallet-3-line"></i>
                        Wallet Management
                        <span className="badge badge-warning">{stats.pendingRefunds}</span>
                    </a>

                    <div className="nav-section-title">Academic Content</div>
                    <a href="/admin/courses" className="nav-item">
                        <i className="ri-book-2-line"></i>
                        Courses
                    </a>
                    <a href="/admin/categories" className="nav-item">
                        <i className="ri-folder-settings-line"></i>
                        Categories
                    </a>
                    <a href="/admin/content" className="nav-item">
                        <i className="ri-folder-video-line"></i>
                        Content Library
                    </a>

                    <a href="/" className="nav-item">
                        <i className="ri-home-line"></i>
                        Back to Home
                    </a>
                </nav>

                <button onClick={handleLogout} className="logout-btn">
                    <i className="ri-logout-box-line"></i>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
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
                        <div>
                            <h1>Wallet Management</h1>
                            <p>Manage credits, refunds & usage</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div>
                            <p className="user-name">{user?.name}</p>
                            <p className="user-email">{user?.email}</p>
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-wallet-3-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>₹{(stats.totalBalance / 1000).toFixed(1)}K</h3>
                            <p>Total Balance</p>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-money-rupee-circle-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>₹{(stats.totalCredits / 1000).toFixed(1)}K</h3>
                            <p>Total Credits</p>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-shopping-cart-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>₹{(stats.totalUsed / 1000).toFixed(1)}K</h3>
                            <p>Total Used</p>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-refund-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.pendingRefunds}</h3>
                            <p>Pending Refunds</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs-container">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'wallets' ? 'active' : ''}`}
                            onClick={() => setActiveTab('wallets')}
                        >
                            <i className="ri-wallet-line"></i>
                            Student Wallets
                        </button>
                        <button
                            className={`tab ${activeTab === 'refunds' ? 'active' : ''}`}
                            onClick={() => setActiveTab('refunds')}
                        >
                            <i className="ri-refund-2-line"></i>
                            Pending Refunds
                            {refunds.length > 0 && (
                                <span className="tab-badge">{refunds.length}</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Wallets Tab */}
                {activeTab === 'wallets' && (
                    <div className="section">
                        <div className="filters-bar">
                            <div className="filter-group">
                                <label>Status:</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="pending_refund">Pending Refund</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="search-group">
                                <i className="ri-search-line"></i>
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <button className="btn btn-primary">
                                <i className="ri-add-circle-line"></i>
                                Add Credits
                            </button>
                        </div>

                        {/* Wallets Table */}
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Balance</th>
                                        <th>Total Credits</th>
                                        <th>Total Used</th>
                                        <th>Refunds</th>
                                        <th>Status</th>
                                        <th>Last Transaction</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredWallets.map(wallet => (
                                        <tr key={wallet.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar-placeholder">
                                                        {wallet.studentName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div>{wallet.studentName}</div>
                                                        <div className="email-small">{wallet.studentEmail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="amount-highlight">₹{wallet.balance}</span>
                                            </td>
                                            <td>₹{wallet.totalCredits}</td>
                                            <td>₹{wallet.totalUsed}</td>
                                            <td>₹{wallet.totalRefunds}</td>
                                            <td>
                                                <span className={getStatusBadgeClass(wallet.status)}>
                                                    {wallet.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td>{wallet.lastTransaction}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-icon"
                                                        title="View Transactions"
                                                        onClick={() => setSelectedWallet(wallet)}
                                                    >
                                                        <i className="ri-eye-line"></i>
                                                    </button>
                                                    <button className="btn-icon" title="Add Credits">
                                                        <i className="ri-add-circle-line"></i>
                                                    </button>
                                                    <button className="btn-icon" title="Process Refund">
                                                        <i className="ri-refund-line"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredWallets.length === 0 && (
                                <div className="empty-state">
                                    <i className="ri-wallet-line"></i>
                                    <p>No wallets found</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Refunds Tab */}
                {activeTab === 'refunds' && (
                    <div className="section">
                        <h3 className="section-title">
                            <i className="ri-refund-2-line"></i>
                            Pending Refund Requests
                        </h3>

                        <div className="refunds-grid">
                            {refunds.map(refund => (
                                <div key={refund.id} className="refund-card">
                                    <div className="refund-header">
                                        <div className="user-cell">
                                            <div className="user-avatar-placeholder">
                                                {refund.studentName.charAt(0)}
                                            </div>
                                            <div>
                                                <strong>{refund.studentName}</strong>
                                                <div className="email-small">{refund.studentEmail}</div>
                                            </div>
                                        </div>
                                        <div className="refund-amount">
                                            ₹{refund.amount}
                                        </div>
                                    </div>
                                    <div className="refund-body">
                                        <div className="refund-detail">
                                            <label>Reason:</label>
                                            <p>{refund.reason}</p>
                                        </div>
                                        <div className="refund-detail">
                                            <label>Request Date:</label>
                                            <span>{refund.requestDate}</span>
                                        </div>
                                    </div>
                                    <div className="refund-actions">
                                        <button className="btn btn-sm btn-primary">
                                            <i className="ri-check-line"></i>
                                            Approve
                                        </button>
                                        <button className="btn btn-sm btn-outline">
                                            <i className="ri-close-line"></i>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {refunds.length === 0 && (
                            <div className="empty-state">
                                <i className="ri-refund-2-line"></i>
                                <p>No pending refunds</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Wallet Detail Modal */}
                {selectedWallet && (
                    <div className="modal-overlay" onClick={() => setSelectedWallet(null)}>
                        <div className="modal-content wallet-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Wallet Transactions</h2>
                                <button className="modal-close" onClick={() => setSelectedWallet(null)}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="wallet-summary">
                                    <h3>{selectedWallet.studentName}</h3>
                                    <p>{selectedWallet.studentEmail}</p>
                                    <div className="balance-display">
                                        <span className="balance-label">Current Balance</span>
                                        <span className="balance-amount">₹{selectedWallet.balance}</span>
                                    </div>
                                </div>

                                <h4>Transaction History</h4>
                                <div className="transactions-list">
                                    {selectedWallet.transactions.map(txn => (
                                        <div key={txn.id} className={`transaction-item ${txn.type}`}>
                                            <div className="transaction-icon">
                                                <i className={
                                                    txn.type === 'credit' ? 'ri-arrow-down-circle-line' :
                                                        txn.type === 'debit' ? 'ri-arrow-up-circle-line' :
                                                            'ri-time-line'
                                                }></i>
                                            </div>
                                            <div className="transaction-details">
                                                <strong>{txn.description}</strong>
                                                <span className="transaction-date">{txn.date}</span>
                                            </div>
                                            <div className={`transaction-amount ${txn.type}`}>
                                                {txn.type === 'credit' ? '+' : txn.type === 'debit' ? '-' : ''}₹{txn.amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
