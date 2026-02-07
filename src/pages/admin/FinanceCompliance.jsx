/**
 * FINANCE & COMPLIANCE MODULE
 * Centralized system for managing multi-center financial operations
 * 
 * FEATURES:
 * - Centre-wise Fee Structure (Delhi, Pune, Hyderabad)
 * - Separate GSTIN for each Centre
 * - Finance & Transaction Reports
 * - Wallet Integration
 * - Revenue Analytics
 * - Tax Compliance
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function FinanceCompliance() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedCentre, setSelectedCentre] = useState('all');
    const [dateRange, setDateRange] = useState('thisMonth');
    const [loading, setLoading] = useState(false);

    // Centre Configuration
    const centres = [
        {
            id: 'delhi',
            name: 'Delhi Centre',
            gstin: '07AABCU9603R1ZM',
            address: 'Rajendra Place, New Delhi - 110008',
            contactPerson: 'Rajesh Kumar',
            phone: '+91-9876543210',
            email: 'delhi@shriramias.com',
            status: 'active'
        },
        {
            id: 'pune',
            name: 'Pune Centre',
            gstin: '27AABCU9603R1ZN',
            address: 'FC Road, Pune - 411004',
            contactPerson: 'Priya Sharma',
            phone: '+91-9876543211',
            email: 'pune@shriramias.com',
            status: 'active'
        },
        {
            id: 'hyderabad',
            name: 'Hyderabad Centre',
            gstin: '36AABCU9603R1ZO',
            address: 'Ameerpet, Hyderabad - 500016',
            contactPerson: 'Anil Reddy',
            phone: '+91-9876543212',
            email: 'hyderabad@shriramias.com',
            status: 'active'
        }
    ];

    // Fee Structure by Centre
    const feeStructure = {
        delhi: {
            foundation: { amount: 45000, gst: 8100, total: 53100 },
            prelims: { amount: 35000, gst: 6300, total: 41300 },
            mains: { amount: 55000, gst: 9900, total: 64900 },
            optional: { amount: 25000, gst: 4500, total: 29500 },
            testSeries: { amount: 15000, gst: 2700, total: 17700 }
        },
        pune: {
            foundation: { amount: 42000, gst: 7560, total: 49560 },
            prelims: { amount: 32000, gst: 5760, total: 37760 },
            mains: { amount: 52000, gst: 9360, total: 61360 },
            optional: { amount: 23000, gst: 4140, total: 27140 },
            testSeries: { amount: 14000, gst: 2520, total: 16520 }
        },
        hyderabad: {
            foundation: { amount: 40000, gst: 7200, total: 47200 },
            prelims: { amount: 30000, gst: 5400, total: 35400 },
            mains: { amount: 50000, gst: 9000, total: 59000 },
            optional: { amount: 22000, gst: 3960, total: 25960 },
            testSeries: { amount: 13000, gst: 2340, total: 15340 }
        }
    };

    // Financial Statistics
    const financialStats = {
        all: {
            totalRevenue: 12450000,
            thisMonth: 1245000,
            gstCollected: 2241000,
            pendingPayments: 234000,
            refundsProcessed: 45000,
            walletBalance: 2450000,
            enrollments: 1247,
            averageTicket: 9980
        },
        delhi: {
            totalRevenue: 5200000,
            thisMonth: 520000,
            gstCollected: 936000,
            pendingPayments: 98000,
            refundsProcessed: 18000,
            walletBalance: 1020000,
            enrollments: 520,
            averageTicket: 10000
        },
        pune: {
            totalRevenue: 4150000,
            thisMonth: 415000,
            gstCollected: 747000,
            pendingPayments: 76000,
            refundsProcessed: 15000,
            walletBalance: 830000,
            enrollments: 437,
            averageTicket: 9496
        },
        hyderabad: {
            totalRevenue: 3100000,
            thisMonth: 310000,
            gstCollected: 558000,
            pendingPayments: 60000,
            refundsProcessed: 12000,
            walletBalance: 600000,
            enrollments: 290,
            averageTicket: 10690
        }
    };

    // Recent Transactions
    const recentTransactions = [
        {
            id: 'TXN001',
            centre: 'delhi',
            studentName: 'Amit Sharma',
            course: 'Foundation Course',
            amount: 53100,
            gst: 8100,
            paymentMode: 'Online',
            status: 'completed',
            date: '2026-01-22',
            invoiceNo: 'INV-DEL-2026-001'
        },
        {
            id: 'TXN002',
            centre: 'pune',
            studentName: 'Priya Patel',
            course: 'Prelims Focused',
            amount: 37760,
            gst: 5760,
            paymentMode: 'UPI',
            status: 'completed',
            date: '2026-01-22',
            invoiceNo: 'INV-PUN-2026-045'
        },
        {
            id: 'TXN003',
            centre: 'hyderabad',
            studentName: 'Karthik Reddy',
            course: 'Mains Course',
            amount: 59000,
            gst: 9000,
            paymentMode: 'Card',
            status: 'completed',
            date: '2026-01-21',
            invoiceNo: 'INV-HYD-2026-089'
        },
        {
            id: 'TXN004',
            centre: 'delhi',
            studentName: 'Neha Singh',
            course: 'Test Series',
            amount: 17700,
            gst: 2700,
            paymentMode: 'Wallet',
            status: 'pending',
            date: '2026-01-21',
            invoiceNo: 'INV-DEL-2026-002'
        },
        {
            id: 'TXN005',
            centre: 'pune',
            studentName: 'Rahul Deshmukh',
            course: 'Optional Course',
            amount: 27140,
            gst: 4140,
            paymentMode: 'Online',
            status: 'completed',
            date: '2026-01-20',
            invoiceNo: 'INV-PUN-2026-046'
        }
    ];

    const currentStats = financialStats[selectedCentre] || financialStats.all;

    const formatCurrency = (amount) => {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(2)}L`;
        }
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    const getCentreColor = (centreId) => {
        const colors = {
            delhi: '#4F46E5',
            pune: '#059669',
            hyderabad: '#DC2626',
            all: '#6366F1'
        };
        return colors[centreId] || colors.all;
    };

    return (
        <div className="dashboard-container admin-dashboard">
            {/* Sidebar */}
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div>
                        <h2>SRIRAM's IAS</h2>
                        <span className="role-badge admin">Finance & Compliance</span>
                    </div>
                    <button
                        className="mobile-close-btn bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <a href="/admin" className="nav-item">
                        <i className="ri-arrow-left-line"></i>
                        Back to Dashboard
                    </a>

                    <div className="nav-section-title">Finance Modules</div>
                    <a
                        href="#overview"
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
                    >
                        <i className="ri-dashboard-line"></i>
                        Overview
                    </a>
                    <a
                        href="#fee-structure"
                        className={`nav-item ${activeTab === 'fee-structure' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('fee-structure'); }}
                    >
                        <i className="ri-price-tag-3-line"></i>
                        Fee Structure
                    </a>
                    <a
                        href="#transactions"
                        className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('transactions'); }}
                    >
                        <i className="ri-exchange-line"></i>
                        Transactions
                    </a>
                    <a
                        href="#gst-compliance"
                        className={`nav-item ${activeTab === 'gst-compliance' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('gst-compliance'); }}
                    >
                        <i className="ri-file-text-line"></i>
                        GST & Compliance
                    </a>
                    <a
                        href="#reports"
                        className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('reports'); }}
                    >
                        <i className="ri-file-chart-line"></i>
                        Reports
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                    <button
                    className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >

                                <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>Finance & Compliance Module</h1>
                            <p>Multi-center financial operations management</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {/* Centre Filter */}
                        <select
                            value={selectedCentre}
                            onChange={(e) => setSelectedCentre(e.target.value)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="all">All Centres</option>
                            <option value="delhi">Delhi Centre</option>
                            <option value="pune">Pune Centre</option>
                            <option value="hyderabad">Hyderabad Centre</option>
                        </select>

                        {/* Date Range Filter */}
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="today">Today</option>
                            <option value="thisWeek">This Week</option>
                            <option value="thisMonth">This Month</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="thisYear">This Year</option>
                        </select>
                    </div>
                </header>

                {/* Financial Stats Grid */}
                <div className="stats-grid stats-grid-extended">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-money-rupee-circle-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(currentStats.totalRevenue)}</h3>
                            <p>Total Revenue</p>
                            <div className="stat-meta">
                                <span className="stat-change positive">+14%</span>
                                <span className="stat-subtitle">vs last period</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-calendar-check-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(currentStats.thisMonth)}</h3>
                            <p>This Month</p>
                            <div className="stat-meta">
                                <span className="stat-change positive">+8%</span>
                                <span className="stat-subtitle">vs last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-file-list-3-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(currentStats.gstCollected)}</h3>
                            <p>GST Collected</p>
                            <div className="stat-meta">
                                <span className="stat-change neutral">18%</span>
                                <span className="stat-subtitle">of revenue</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-time-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(currentStats.pendingPayments)}</h3>
                            <p>Pending Payments</p>
                            <div className="stat-meta">
                                <span className="stat-change negative">Needs attention</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-wallet-3-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(currentStats.walletBalance)}</h3>
                            <p>Wallet Balance</p>
                            <div className="stat-meta">
                                <span className="stat-change neutral">Active credits</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-danger">
                        <div className="stat-icon">
                            <i className="ri-refund-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(currentStats.refundsProcessed)}</h3>
                            <p>Refunds Processed</p>
                            <div className="stat-meta">
                                <span className="stat-change neutral">This period</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-user-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{currentStats.enrollments}</h3>
                            <p>Total Enrollments</p>
                            <div className="stat-meta">
                                <span className="stat-change positive">+12%</span>
                                <span className="stat-subtitle">growth</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-bar-chart-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{formatCurrency(currentStats.averageTicket)}</h3>
                            <p>Average Ticket Size</p>
                            <div className="stat-meta">
                                <span className="stat-change neutral">Per enrollment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <>
                        {/* Centre Overview Cards */}
                        <div className="section">
                            <div className="section-header">
                                <h2>
                                    <i className="ri-building-line"></i>
                                    Centre Overview
                                </h2>
                                <p className="section-description">
                                    Financial performance across all centres
                                </p>
                            </div>
                            <div className="management-modules-grid">
                                {centres.map(centre => {
                                    const stats = financialStats[centre.id];
                                    return (
                                        <div
                                            key={centre.id}
                                            className="module-card"
                                            style={{ borderLeft: `4px solid ${getCentreColor(centre.id)}` }}
                                        >
                                            <div className="module-icon" style={{ background: getCentreColor(centre.id) }}>
                                                <i className="ri-building-4-line"></i>
                                            </div>
                                            <div className="module-content">
                                                <h3>{centre.name}</h3>
                                                <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                                                    GSTIN: {centre.gstin}
                                                </p>
                                                <div className="module-stats">
                                                    <span className="module-stat">
                                                        <strong>{formatCurrency(stats.thisMonth)}</strong> This Month
                                                    </span>
                                                    <span className="module-stat">
                                                        <strong>{stats.enrollments}</strong> Enrollments
                                                    </span>
                                                </div>
                                                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#6B7280' }}>
                                                    <div><i className="ri-user-line"></i> {centre.contactPerson}</div>
                                                    <div><i className="ri-phone-line"></i> {centre.phone}</div>
                                                </div>
                                            </div>
                                            <div className="module-arrow">
                                                <i className="ri-arrow-right-line"></i>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="section">
                            <div className="section-header">
                                <h2>
                                    <i className="ri-exchange-line"></i>
                                    Recent Transactions
                                </h2>
                                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    <i className="ri-download-line"></i> Export
                                </button>
                            </div>
                            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                                        <tr>
                                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Invoice No</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Centre</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Student</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Course</th>
                                            <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Amount</th>
                                            <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>GST</th>
                                            <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Mode</th>
                                            <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Status</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentTransactions.map(txn => (
                                            <tr key={txn.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#4F46E5', fontWeight: '500' }}>{txn.invoiceNo}</td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '6px',
                                                        background: `${getCentreColor(txn.centre)}15`,
                                                        color: getCentreColor(txn.centre),
                                                        fontWeight: '500'
                                                    }}>
                                                        {centres.find(c => c.id === txn.centre)?.name.split(' ')[0]}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#111827' }}>{txn.studentName}</td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#6B7280' }}>{txn.course}</td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#111827', textAlign: 'right', fontWeight: '500' }}>
                                                    ₹{txn.amount.toLocaleString('en-IN')}
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#6B7280', textAlign: 'right' }}>
                                                    ₹{txn.gst.toLocaleString('en-IN')}
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', textAlign: 'center' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        background: '#F3F4F6',
                                                        color: '#374151',
                                                        fontSize: '0.75rem'
                                                    }}>
                                                        {txn.paymentMode}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '6px',
                                                        background: txn.status === 'completed' ? '#DEF7EC' : '#FEF3C7',
                                                        color: txn.status === 'completed' ? '#03543F' : '#92400E',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500'
                                                    }}>
                                                        {txn.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#6B7280' }}>{txn.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'fee-structure' && (
                    <div className="section">
                        <div className="section-header">
                            <h2>
                                <i className="ri-price-tag-3-line"></i>
                                Centre-wise Fee Structure
                            </h2>
                            <p className="section-description">
                                Course fees and GST breakdown for each centre
                            </p>
                        </div>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {centres.map(centre => {
                                const fees = feeStructure[centre.id];
                                return (
                                    <div key={centre.id} style={{
                                        background: 'white',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        borderLeft: `4px solid ${getCentreColor(centre.id)}`
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                                                    {centre.name}
                                                </h3>
                                                <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                                                    GSTIN: <strong>{centre.gstin}</strong>
                                                </p>
                                            </div>
                                            <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                                <i className="ri-edit-line"></i> Edit Fees
                                            </button>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                            {Object.entries(fees).map(([courseType, pricing]) => (
                                                <div key={courseType} style={{
                                                    padding: '1rem',
                                                    background: '#F9FAFB',
                                                    borderRadius: '8px',
                                                    border: '1px solid #E5E7EB'
                                                }}>
                                                    <div style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.5rem' }}>
                                                        {courseType.replace(/([A-Z])/g, ' $1').trim()}
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '0.25rem' }}>
                                                        Base: <strong>₹{pricing.amount.toLocaleString('en-IN')}</strong>
                                                    </div>
                                                    <div style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '0.25rem' }}>
                                                        GST (18%): <strong>₹{pricing.gst.toLocaleString('en-IN')}</strong>
                                                    </div>
                                                    <div style={{ fontSize: '0.9rem', color: '#111827', fontWeight: '600', paddingTop: '0.5rem', borderTop: '1px solid #E5E7EB' }}>
                                                        Total: ₹{pricing.total.toLocaleString('en-IN')}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'gst-compliance' && (
                    <div className="section">
                        <div className="section-header">
                            <h2>
                                <i className="ri-file-text-line"></i>
                                GST & Compliance
                            </h2>
                            <p className="section-description">
                                Tax compliance and GSTIN management
                            </p>
                        </div>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {centres.map(centre => {
                                const stats = financialStats[centre.id];
                                return (
                                    <div key={centre.id} style={{
                                        background: 'white',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                    }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: getCentreColor(centre.id) }}>
                                                    {centre.name}
                                                </h3>
                                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#F9FAFB', borderRadius: '6px' }}>
                                                        <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>GSTIN</span>
                                                        <strong style={{ color: '#111827', fontSize: '0.9rem' }}>{centre.gstin}</strong>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#F9FAFB', borderRadius: '6px' }}>
                                                        <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>GST Collected (This Month)</span>
                                                        <strong style={{ color: '#111827', fontSize: '0.9rem' }}>{formatCurrency(stats.gstCollected)}</strong>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#F9FAFB', borderRadius: '6px' }}>
                                                        <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Revenue (This Month)</span>
                                                        <strong style={{ color: '#111827', fontSize: '0.9rem' }}>{formatCurrency(stats.thisMonth)}</strong>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#F9FAFB', borderRadius: '6px' }}>
                                                        <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Compliance Status</span>
                                                        <strong style={{ color: '#059669', fontSize: '0.9rem' }}>✓ Up to Date</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                <button className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}>
                                                    <i className="ri-download-line"></i> Download GSTR-1
                                                </button>
                                                <button className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}>
                                                    <i className="ri-download-line"></i> Download GSTR-3B
                                                </button>
                                                <button className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}>
                                                    <i className="ri-file-chart-line"></i> Tax Summary
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="section">
                        <div className="section-header">
                            <h2>
                                <i className="ri-file-chart-line"></i>
                                Financial Reports
                            </h2>
                            <p className="section-description">
                                Generate comprehensive financial reports
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {[
                                { title: 'Revenue Report', icon: 'ri-money-rupee-circle-line', color: '#4F46E5', desc: 'Detailed revenue breakdown by centre and course' },
                                { title: 'GST Report', icon: 'ri-file-list-3-line', color: '#059669', desc: 'GST collected and compliance summary' },
                                { title: 'Transaction Report', icon: 'ri-exchange-line', color: '#DC2626', desc: 'All transactions with payment details' },
                                { title: 'Refund Report', icon: 'ri-refund-line', color: '#F59E0B', desc: 'Refunds processed and pending' },
                                { title: 'Wallet Report', icon: 'ri-wallet-3-line', color: '#8B5CF6', desc: 'Wallet balance and usage analytics' },
                                { title: 'Enrollment Report', icon: 'ri-user-add-line', color: '#10B981', desc: 'Student enrollments and revenue' }
                            ].map((report, idx) => (
                                <div key={idx} style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    borderTop: `4px solid ${report.color}`,
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: `${report.color}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: report.color,
                                            fontSize: '1.5rem'
                                        }}>
                                            <i className={report.icon}></i>
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>{report.title}</h3>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1rem' }}>{report.desc}</p>
                                    <button className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}>
                                        <i className="ri-download-line"></i> Generate Report
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
