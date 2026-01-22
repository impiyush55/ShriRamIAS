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

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Load all admin data from adminData.js
        const stats = getAdminDashboardStats();
        const qStats = getQuickStats();
        const activities = getRecentActivities(8);
        const modules = getManagementModules();

        setDashboardStats(stats);
        setQuickStats(qStats);
        setRecentActivities(activities);
        setManagementModules(modules);

        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
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
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div>
                            <p className="user-name">{user?.name}</p>
                            <p className="user-email">{user?.email}</p>
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

                {/* Recent Activity */}
                <div className="recent-activity">
                    <h2>
                        <i className="ri-time-line"></i>
                        Recent Activity
                    </h2>
                    <div className="activity-list">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="activity-item">
                                <div className={`activity-icon ${activity.iconClass}`}>
                                    <i className={activity.icon}></i>
                                </div>
                                <div className="activity-content">
                                    <p>
                                        <strong>{activity.title}:</strong> {activity.description}
                                    </p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                                {activity.priority === 'high' && (
                                    <span className="priority-badge high">
                                        <i className="ri-error-warning-line"></i>
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
