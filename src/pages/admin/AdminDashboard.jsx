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
        navigate('/');
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
                    className="sidebar-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Enhanced Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div>
                        <h2>SRIRAM's IAS</h2>
                        <span className="role-badge admin">Admin Panel</span>
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
                    <a
                        href="#overview"
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
                    >
                        <i className="ri-dashboard-line"></i>
                        Dashboard Overview
                    </a>

                    {/* 🔴 Live Class & Video */}
                    <div className="nav-section-title">🔴 Live Class & Video</div>
                    <a href="/admin/live-classes" className="nav-item">
                        <i className="ri-live-line"></i>
                        Live Classes (AWS)
                        <span className="badge badge-danger">3 Live</span>
                    </a>
                    <a href="/admin/live-schedule" className="nav-item">
                        <i className="ri-calendar-event-line"></i>
                        Live Class Schedule
                    </a>
                    <a href="/admin/live-attendance" className="nav-item">
                        <i className="ri-user-follow-line"></i>
                        Live Attendance
                    </a>
                    <a href="/admin/live-recordings" className="nav-item">
                        <i className="ri-video-line"></i>
                        Live Recordings
                    </a>
                    <a href="/admin/video-library" className="nav-item">
                        <i className="ri-film-line"></i>
                        Video Library
                    </a>
                    <a href="/admin/streaming-health" className="nav-item">
                        <i className="ri-pulse-line"></i>
                        Streaming Health (AWS)
                    </a>
                    <a href="/admin/live-reports" className="nav-item">
                        <i className="ri-file-chart-line"></i>
                        Live Class Reports
                    </a>

                    {/* 🟦 User & Content Admin */}
                    <div className="nav-section-title">🟦 User & Content Admin</div>
                    <a href="/admin/user-management" className="nav-item">
                        <i className="ri-user-settings-line"></i>
                        User Management
                    </a>
                    <a href="/admin/roles-permissions" className="nav-item">
                        <i className="ri-shield-user-line"></i>
                        Roles & Permissions
                    </a>
                    <a href="/admin/categories" className="nav-item">
                        <i className="ri-folder-settings-line"></i>
                        Categories
                    </a>
                    <a href="/admin/banners" className="nav-item">
                        <i className="ri-image-edit-line"></i>
                        Banner Management
                    </a>
                    <a href="/admin/cms-pages" className="nav-item">
                        <i className="ri-pages-line"></i>
                        CMS Pages
                    </a>
                    <a href="/admin/homepage-content" className="nav-item">
                        <i className="ri-home-4-line"></i>
                        Homepage Content
                    </a>
                    <a href="/admin/content" className="nav-item">
                        <i className="ri-folder-video-line"></i>
                        Content Library
                    </a>
                    <a href="/admin/blogs" className="nav-item">
                        <i className="ri-article-line"></i>
                        Blog Management
                    </a>

                    {/* 🟩 Academic Tools */}
                    <div className="nav-section-title">🟩 Academic Tools</div>
                    <a href="/admin/current-affairs" className="nav-item">
                        <i className="ri-newspaper-line"></i>
                        Current Affairs
                    </a>
                    <a href="/admin/daily-mcqs" className="nav-item">
                        <i className="ri-question-mark"></i>
                        Daily MCQs
                    </a>
                    <a href="/admin/quizzes" className="nav-item">
                        <i className="ri-questionnaire-line"></i>
                        Topic Quizzes
                    </a>
                    <a href="/admin/tests" className="nav-item">
                        <i className="ri-file-list-3-line"></i>
                        Test Management
                    </a>
                    <a href="/admin/test-series" className="nav-item">
                        <i className="ri-file-list-2-line"></i>
                        Test Series
                    </a>
                    <a href="/admin/evaluation" className="nav-item">
                        <i className="ri-file-search-line"></i>
                        Evaluation System
                    </a>
                    <a href="/admin/answer-sheets" className="nav-item">
                        <i className="ri-file-text-line"></i>
                        Answer Sheet Review
                    </a>
                    <a href="/admin/performance-analytics" className="nav-item">
                        <i className="ri-line-chart-line"></i>
                        Performance Analytics
                    </a>

                    {/* 🟨 Business & Operations */}
                    <div className="nav-section-title">🟨 Business & Operations</div>
                    <a href="/admin/courses" className="nav-item">
                        <i className="ri-shopping-cart-line"></i>
                        Course Sales
                    </a>
                    <a href="/admin/coupons" className="nav-item">
                        <i className="ri-ticket-2-line"></i>
                        Coupon Management
                    </a>
                    <a href="/admin/wallets" className="nav-item">
                        <i className="ri-wallet-3-line"></i>
                        Wallet Management
                    </a>
                    <a href="/admin/transactions" className="nav-item">
                        <i className="ri-exchange-line"></i>
                        Transactions
                    </a>
                    <a href="/admin/refund-requests" className="nav-item">
                        <i className="ri-refund-2-line"></i>
                        Refund Requests
                    </a>
                    <a href="/admin/leads" className="nav-item">
                        <i className="ri-user-search-line"></i>
                        Leads Management
                    </a>
                    <a href="/admin/lead-assignment" className="nav-item">
                        <i className="ri-user-add-line"></i>
                        Lead Assignment
                    </a>

                    {/* 🟪 Support & Guidance */}
                    <div className="nav-section-title">🟪 Support & Guidance</div>
                    <a href="/admin/mentors" className="nav-item">
                        <i className="ri-user-star-line"></i>
                        Mentor Management
                    </a>
                    <a href="/admin/mentor-assignments" className="nav-item">
                        <i className="ri-user-shared-line"></i>
                        Mentor Assignments
                    </a>
                    <a href="/admin/enquiries" className="nav-item">
                        <i className="ri-question-answer-line"></i>
                        Student Enquiries
                        <span className="badge badge-warning">45</span>
                    </a>
                    <a href="/admin/support-tickets" className="nav-item">
                        <i className="ri-customer-service-line"></i>
                        Support Tickets
                    </a>
                    <a href="/admin/student-feedback" className="nav-item">
                        <i className="ri-feedback-line"></i>
                        Student Feedback
                    </a>

                    {/* ⚙️ System Controls */}
                    <div className="nav-section-title">⚙️ System Controls</div>
                    <a href="/admin/system-configuration" className="nav-item">
                        <i className="ri-settings-3-line"></i>
                        System Configuration
                    </a>
                    <a href="/admin/push-notifications" className="nav-item">
                        <i className="ri-notification-3-line"></i>
                        Push Notifications
                    </a>
                    <a href="/admin/email-sms-templates" className="nav-item">
                        <i className="ri-mail-send-line"></i>
                        Email & SMS Templates
                    </a>
                    <a href="/admin/analytics" className="nav-item">
                        <i className="ri-bar-chart-box-line"></i>
                        Reports & Analytics
                    </a>
                    <a href="/admin/audit-logs" className="nav-item">
                        <i className="ri-file-list-line"></i>
                        Audit Logs
                    </a>
                    <a href="/admin/website-management" className="nav-item">
                        <i className="ri-global-line"></i>
                        Website Management
                    </a>
                    <a href="/admin/seo-settings" className="nav-item">
                        <i className="ri-seo-line"></i>
                        SEO Settings
                    </a>
                    <a href="/admin/backup-maintenance" className="nav-item">
                        <i className="ri-database-2-line"></i>
                        Backup & Maintenance
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
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'none' }}
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
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => window.open('/', '_blank')}
                            className="flex items-center gap-1.5 px-3 py-2.5 bg-cyan-50 text-cyan-700 border border-cyan-100 rounded-lg text-[0.8rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-cyan-100"
                        >
                            <i className="ri-external-link-line"></i>
                            View Site
                        </button>
                        <button
                            onClick={handleResetPrototype}
                            className="flex items-center gap-1.5 px-3 py-2.5 bg-red-50 text-danger border border-red-200 rounded-lg text-[0.8rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-red-100"
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
                            <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                                <i className="ri-shield-check-line text-orange-500"></i>
                                Course Approvals & Recent Sales
                            </h2>
                            <p className="text-gray-500 mt-1">Verify and approve new wallet-based student enrollments</p>
                        </div>
                        <div className="py-2 px-4 bg-amber-50 rounded-lg border border-orange-200 text-orange-900 font-semibold text-sm">
                            <i className="ri-time-line"></i> {paymentStats?.pendingApprovals || 0} Pending Approvals
                        </div>
                    </div>

                    <div className="activity-list bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                        {recentEnrollments.length > 0 ? (
                            recentEnrollments.map(enrollment => (
                                <div key={enrollment.id} className={`activity-item p-6 border-b border-gray-100 flex items-center gap-6 transition-all duration-200 ${enrollment.status === 'pending' ? 'bg-amber-50' : 'bg-transparent'}`}>
                                    <div className={`activity-icon w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden border-2 ${enrollment.status === 'approved' ? 'border-green-500' : 'border-orange-500'}`}>
                                        <img src={enrollment.studentAvatar} alt="" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="activity-content flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-1">
                                                    {enrollment.studentName}
                                                    <span className="text-[0.85rem] font-medium text-gray-500 ml-2">
                                                        ({enrollment.studentEmail})
                                                    </span>
                                                </h4>
                                                <p className="text-[0.95rem] text-gray-600">
                                                    Course: <span className="font-semibold text-gray-800">{enrollment.courseTitle}</span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-extrabold text-gray-900">₹{enrollment.amount}</p>
                                                <span className={`status-badge ${enrollment.status} text-xs px-2 py-0.5 rounded uppercase font-bold ${enrollment.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-500'}`}>
                                                    {enrollment.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mt-3 text-[0.85rem] text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <i className="ri-calendar-line"></i> {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i className="ri-time-line"></i> {new Date(enrollment.enrolledAt).toLocaleTimeString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i className="ri-bank-card-line"></i> SR Wallet
                                            </span>
                                            {enrollment.centre && (
                                                <span className="flex items-center gap-1 text-indigo-600 font-semibold">
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

