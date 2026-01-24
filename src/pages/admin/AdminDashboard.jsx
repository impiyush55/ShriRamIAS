/**
 * COMPREHENSIVE ADMIN DASHBOARD
 * Complete LMS Admin Panel with all management modules
 * 
 * FEATURES:
 * - User & Role Management
 * - Enquiry Management System
 * - Wallet Management (credits, refunds, usage)
 * - Course & Category Management
 * - Live Class Management
 * - Test Management (Prelims/Mains/Sectional)
 * - Topic-wise Quizzes
 * - Daily MCQs
 * - Analytics & Reports
 * - System Health Monitoring
 * 
 * DATA SOURCE: All data from hardcoded adminData.js (NO BACKEND)
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import {
    getAdminDashboardStats,
    getRecentActivities,
    getQuickStats,
    getManagementModules
} from '../../data/adminData';
import { getAdminPaymentStats, approveEnrollment } from '../../api/paymentApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [quickStats, setQuickStats] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [managementModules, setManagementModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [paymentStats, setPaymentStats] = useState(null);
    const [recentEnrollments, setRecentEnrollments] = useState([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        const stats = getAdminDashboardStats();
        const qStats = getQuickStats();
        const activities = getRecentActivities(8);
        const modules = getManagementModules();

        // Load simulated payment stats
        const pStats = await getAdminPaymentStats();
        if (pStats.success) {
            setPaymentStats(pStats.stats);
            setRecentEnrollments(pStats.recentEnrollments);

            // Update quick stats with real-time demo data
            const updatedQStats = qStats.map(s => {
                if (s.id === 'revenue') return { ...s, value: `₹${pStats.stats.totalSales.toLocaleString()}` };
                if (s.id === 'active-courses') return { ...s, value: s.value + pStats.stats.totalEnrollments };
                if (s.id === 'pending-approvals') return { ...s, value: pStats.stats.pendingApprovals, changeColor: 'warning' };
                if (s.id === 'wallet-balance') return { ...s, value: `₹${pStats.stats.walletRevenue.toLocaleString()}` };
                return s;
            });
            setQuickStats(updatedQStats);
        }

        setDashboardStats(stats);
        setRecentActivities(activities);
        setManagementModules(modules);

        setLoading(false);
    };

    const handleApprove = async (id) => {
        const result = await approveEnrollment(id);
        if (result.success) {
            loadDashboardData(); // Refresh to show updated status and stats
        }
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const handleResetPrototype = () => {
        if (window.confirm('Reset all demo data? (Purchases, Blogs, and Wallet balances will be cleared)')) {
            localStorage.removeItem('mockEnrollments');
            localStorage.removeItem('mockBlogs');
            // Clear all user-specific wallets
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('walletBalance_')) {
                    localStorage.removeItem(key);
                }
            });
            window.location.reload();
        }
    };

    const getColorClass = (color) => {
        const colorMap = {
            primary: 'stat-primary',
            success: 'stat-success',
            warning: 'stat-warning',
            danger: 'stat-danger',
            info: 'stat-info'
        };
        return colorMap[color] || 'stat-primary';
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading admin dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container admin-dashboard">
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

            {/* Enhanced Sidebar */}
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
                    <a
                        href="#overview"
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
                    >
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
                        <span className="badge badge-warning">45</span>
                    </a>
                    <a href="/admin/wallets" className="nav-item">
                        <i className="ri-wallet-3-line"></i>
                        Wallet Management
                    </a>

                    <div className="nav-section-title">Communication</div>
                    <a href="/admin/notifications" className="nav-item">
                        <i className="ri-notification-3-line"></i>
                        Notifications
                    </a>
                    <a href="/admin/support" className="nav-item">
                        <i className="ri-customer-service-line"></i>
                        Support Desk
                    </a>

                    <div className="nav-section-title">Content & Media</div>
                    <a href="/admin/blogs" className="nav-item">
                        <i className="ri-article-line"></i>
                        Blog Management
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

                    <div className="nav-section-title">Live & Interactive</div>
                    <a href="/admin/live-classes" className="nav-item">
                        <i className="ri-live-line"></i>
                        Live Classes
                        <span className="badge badge-danger">3 Live</span>
                    </a>
                    <a href="/admin/tests" className="nav-item">
                        <i className="ri-file-list-3-line"></i>
                        Test Management
                    </a>
                    <a href="/admin/quizzes" className="nav-item">
                        <i className="ri-questionnaire-line"></i>
                        Topic Quizzes
                    </a>
                    <a href="/admin/daily-mcqs" className="nav-item">
                        <i className="ri-question-mark"></i>
                        Daily MCQs
                    </a>

                    <div className="nav-section-title">Finance</div>
                    <a href="/admin/finance-compliance" className="nav-item">
                        <i className="ri-money-rupee-circle-line"></i>
                        Finance & Compliance
                    </a>

                    <div className="nav-section-title">System</div>
                    <a href="/admin/analytics" className="nav-item">
                        <i className="ri-bar-chart-box-line"></i>
                        Analytics & Reports
                    </a>
                    <a href="/admin/settings" className="nav-item">
                        <i className="ri-settings-3-line"></i>
                        Settings
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
                {/* Header */}
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
                            <h1>Admin Dashboard</h1>
                            <p>Welcome back, {user?.name}!</p>
                            <div className="system-status">
                                <span className="status-indicator status-healthy"></span>
                                <span>System Status: <strong>Healthy</strong></span>
                                <span className="separator">•</span>
                                <span>Uptime: <strong>99.8%</strong></span>
                                <span className="separator">•</span>
                                <span>Active Users: <strong>456</strong></span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button
                            onClick={() => window.open('/', '_blank')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.6rem 0.8rem',
                                background: '#f0f9ff',
                                color: '#0369a1',
                                border: '1px solid #e0f2fe',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <i className="ri-external-link-line"></i>
                            View Site
                        </button>
                        <button
                            onClick={handleResetPrototype}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.6rem 0.8rem',
                                background: '#fef2f2',
                                color: '#dc2626',
                                border: '1px solid #fee2e2',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#fef2f2'}
                        >
                            <i className="ri-refresh-line"></i>
                            Reset Demo
                        </button>
                        <div className="user-info">
                            <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                            <div>
                                <p className="user-name">{user?.name}</p>
                                <p className="user-email">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Quick Stats Grid - 8 Cards */}
                <div className="stats-grid stats-grid-extended">
                    {quickStats.map(stat => (
                        <div key={stat.id} className={`stat-card ${getColorClass(stat.color)}`}>
                            <div className="stat-icon">
                                <i className={stat.icon}></i>
                            </div>
                            <div className="stat-content">
                                <h3>{stat.value}</h3>
                                <p>{stat.title}</p>
                                <div className="stat-meta">
                                    <span className={`stat-change ${stat.changeType}`}>
                                        {stat.change}
                                    </span>
                                    <span className="stat-subtitle">{stat.subtitle}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Course Approvals & Recent Sales - High Priority for Demo */}
                <div className="section" style={{ marginTop: '2.5rem' }}>
                    <div className="section-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <i className="ri-shield-check-line" style={{ color: '#f97316' }}></i>
                                Course Approvals & Recent Sales
                            </h2>
                            <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Verify and approve new wallet-based student enrollments</p>
                        </div>
                        <div style={{ padding: '0.5rem 1rem', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fed7aa', color: '#9a3412', fontWeight: 600, fontSize: '0.9rem' }}>
                            <i className="ri-time-line"></i> {paymentStats?.pendingApprovals || 0} Pending Approvals
                        </div>
                    </div>

                    <div className="activity-list" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        {recentEnrollments.length > 0 ? (
                            recentEnrollments.map(enrollment => (
                                <div key={enrollment.id} className="activity-item" style={{
                                    padding: '1.5rem',
                                    borderBottom: '1px solid #f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    background: enrollment.status === 'pending' ? '#fffcf0' : 'transparent',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <div className="activity-icon" style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '14px',
                                        flexShrink: 0,
                                        overflow: 'hidden',
                                        border: '2px solid',
                                        borderColor: enrollment.status === 'approved' ? '#2ecc71' : '#f97316'
                                    }}>
                                        <img src={enrollment.studentAvatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    <div className="activity-content" style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>
                                                    {enrollment.studentName}
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#6b7280', marginLeft: '0.5rem' }}>
                                                        ({enrollment.studentEmail})
                                                    </span>
                                                </h4>
                                                <p style={{ fontSize: '0.95rem', color: '#4b5563' }}>
                                                    Course: <span style={{ fontWeight: 600, color: '#1f2937' }}>{enrollment.courseTitle}</span>
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>₹{enrollment.amount}</p>
                                                <span className={`status-badge ${enrollment.status}`} style={{
                                                    fontSize: '0.75rem',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    textTransform: 'uppercase',
                                                    fontWeight: 700,
                                                    background: enrollment.status === 'approved' ? '#ecfdf5' : '#fff7ed',
                                                    color: enrollment.status === 'approved' ? '#059669' : '#f97316'
                                                }}>
                                                    {enrollment.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <i className="ri-calendar-line"></i> {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <i className="ri-time-line"></i> {new Date(enrollment.enrolledAt).toLocaleTimeString()}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <i className="ri-bank-card-line"></i> SR Wallet
                                            </span>
                                            {enrollment.centre && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#4f46e5', fontWeight: 600 }}>
                                                    <i className="ri-map-pin-line"></i> {enrollment.centre}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="activity-actions" style={{ flexShrink: 0 }}>
                                        {enrollment.status === 'pending' ? (
                                            <button
                                                onClick={() => handleApprove(enrollment.id)}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: '#2ecc71',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 14px rgba(46, 204, 113, 0.3)',
                                                    transition: 'all 0.2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                            >
                                                <i className="ri-check-double-line"></i> Approve Enrollment
                                            </button>
                                        ) : (
                                            <div style={{ textAlign: 'center', color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                                                <i className="ri-checkbox-circle-fill" style={{ fontSize: '1.25rem', display: 'block', marginBottom: '0.25rem' }}></i>
                                                Access Active
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#9ca3af' }}>
                                <i className="ri-inbox-line" style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}></i>
                                <p>No new enrollments to show.</p>
                                <p style={{ fontSize: '0.85rem' }}>Enrollments purchased via Student Wallet will appear here for verification.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Management Modules Grid */}
                <div className="section">
                    <div className="section-header">
                        <h2>
                            <i className="ri-apps-line"></i>
                            Management Modules
                        </h2>
                        <p className="section-description">
                            Comprehensive LMS management tools for academic and operational workflows
                        </p>
                    </div>
                    <div className="management-modules-grid">
                        {managementModules.map(module => (
                            <div
                                key={module.id}
                                className="module-card"
                                onClick={() => navigate(module.route)}
                            >
                                <div className={`module-icon ${module.color}`}>
                                    <i className={module.icon}></i>
                                </div>
                                <div className="module-content">
                                    <h3>{module.title}</h3>
                                    <p>{module.description}</p>
                                    <div className="module-stats">
                                        {Object.entries(module.stats).map(([key, value]) => (
                                            <span key={key} className="module-stat">
                                                <strong>{value}</strong> {key}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="module-arrow">
                                    <i className="ri-arrow-right-line"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Statistics Sections */}
                <div className="stats-sections">
                    {/* User Statistics */}
                    <div className="stats-section">
                        <h3>
                            <i className="ri-user-line"></i>
                            User Statistics
                        </h3>
                        <div className="stats-details">
                            <div className="stat-detail-item">
                                <span className="label">Total Users</span>
                                <span className="value">{dashboardStats.users.total}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Students</span>
                                <span className="value">{dashboardStats.users.students}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Faculty</span>
                                <span className="value">{dashboardStats.users.faculty}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Centre Admins</span>
                                <span className="value">{dashboardStats.users.centreAdmins}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Active Today</span>
                                <span className="value highlight">{dashboardStats.users.activeToday}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Pending Approvals</span>
                                <span className="value warning">{dashboardStats.users.pendingApprovals}</span>
                            </div>
                        </div>
                    </div>

                    {/* Academic Statistics */}
                    <div className="stats-section">
                        <h3>
                            <i className="ri-book-open-line"></i>
                            Academic Content
                        </h3>
                        <div className="stats-details">
                            <div className="stat-detail-item">
                                <span className="label">Total Courses</span>
                                <span className="value">{dashboardStats.courses.total}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Active Courses</span>
                                <span className="value">{dashboardStats.courses.active}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Total Tests</span>
                                <span className="value">{dashboardStats.tests.total}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Topic Quizzes</span>
                                <span className="value">{dashboardStats.quizzes.total}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Daily MCQs</span>
                                <span className="value">{dashboardStats.dailyMCQs.total}</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Live Classes</span>
                                <span className="value">{dashboardStats.liveClasses.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Financial Statistics */}
                    <div className="stats-section">
                        <h3>
                            <i className="ri-money-rupee-circle-line"></i>
                            Financial Overview
                        </h3>
                        <div className="stats-details">
                            <div className="stat-detail-item">
                                <span className="label">Total Revenue</span>
                                <span className="value">₹{(dashboardStats.revenue.totalRevenue / 100000).toFixed(2)}L</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">This Month</span>
                                <span className="value highlight">₹{(dashboardStats.revenue.thisMonth / 100000).toFixed(2)}L</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Wallet Credits</span>
                                <span className="value">₹{(dashboardStats.wallets.totalCredits / 100000).toFixed(2)}L</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Pending Payments</span>
                                <span className="value warning">₹{(dashboardStats.revenue.pendingPayments / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Refunds Processed</span>
                                <span className="value">₹{(dashboardStats.revenue.refundsProcessed / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="stat-detail-item">
                                <span className="label">Pending Refunds</span>
                                <span className="value warning">{dashboardStats.wallets.pendingRefunds}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

