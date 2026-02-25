/**
 * ANALYTICS DASHBOARD PAGE
 * Detailed system analytics and reports
 * Includes: Faculty Reports, Financial Reports, Branch-wise Reports
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/analytics-dashboard.css';

import ChatWidget from '../../components/common/ChatWidget';

// Dummy Data
const facultyData = [
    { id: 1, name: 'Dr. Sharma', subject: 'Polity', classesTaken: 45, hoursTaught: 90, studentsTaught: 1200, rating: 4.8 },
    { id: 2, name: 'Prof. Rajesh Kumar', subject: 'History', classesTaken: 38, hoursTaught: 76, studentsTaught: 980, rating: 4.7 },
    { id: 3, name: 'Ms. Priya Verma', subject: 'Economy', classesTaken: 42, hoursTaught: 84, studentsTaught: 1100, rating: 4.9 },
    { id: 4, name: 'Mr. Amit Singh', subject: 'Geography', classesTaken: 30, hoursTaught: 60, studentsTaught: 850, rating: 4.6 },
    { id: 5, name: 'Dr. K. Srinivas', subject: 'Science & Tech', classesTaken: 25, hoursTaught: 50, studentsTaught: 700, rating: 4.8 },
];

const financialData = {
    totalRevenue: 12450000,
    totalExpenses: 4500000,
    netProfit: 7950000,
    monthlyBreakdown: [
        { month: 'Jan', revenue: 1200000, expense: 400000 },
        { month: 'Feb', revenue: 1350000, expense: 420000 },
        { month: 'Mar', revenue: 1100000, expense: 380000 },
        { month: 'Apr', revenue: 1500000, expense: 450000 },
    ]
};

const branchData = [
    { id: 1, city: 'Delhi', students: 4500, faculty: 15, revenue: 5600000, status: 'Active' },
    { id: 2, city: 'Pune', students: 3200, faculty: 12, revenue: 4200000, status: 'Active' },
    { id: 3, city: 'Hyderabad', students: 2800, faculty: 10, revenue: 3800000, status: 'Active' },
];

const userActivityData = [
    { id: 1, name: 'Rahul Sharma', role: 'Student', lastActive: '2 mins ago', sessionsToday: 5, totalHours: 12.5, coursesEnrolled: 3, status: 'Online' },
    { id: 2, name: 'Priya Patel', role: 'Student', lastActive: '15 mins ago', sessionsToday: 3, totalHours: 8.2, coursesEnrolled: 2, status: 'Online' },
    { id: 3, name: 'Amit Kumar', role: 'Student', lastActive: '1 hour ago', sessionsToday: 2, totalHours: 15.7, coursesEnrolled: 4, status: 'Away' },
    { id: 4, name: 'Dr. Rajesh', role: 'Faculty', lastActive: '5 mins ago', sessionsToday: 4, totalHours: 6.5, coursesEnrolled: 0, status: 'Online' },
    { id: 5, name: 'Sneha Reddy', role: 'Student', lastActive: '3 hours ago', sessionsToday: 1, totalHours: 22.3, coursesEnrolled: 5, status: 'Offline' },
];

const testPerformanceData = [
    { id: 1, testName: 'Prelims Mock Test 1', totalStudents: 450, avgScore: 78.5, passRate: 85, topScore: 98, date: '2024-01-15' },
    { id: 2, testName: 'Mains Answer Writing Test', totalStudents: 320, avgScore: 65.2, passRate: 72, topScore: 92, date: '2024-01-18' },
    { id: 3, testName: 'Current Affairs Quiz', totalStudents: 580, avgScore: 82.1, passRate: 90, topScore: 100, date: '2024-01-20' },
    { id: 4, testName: 'History Sectional Test', totalStudents: 280, avgScore: 71.8, passRate: 78, topScore: 95, date: '2024-01-22' },
    { id: 5, testName: 'Economy Full Length Test', totalStudents: 410, avgScore: 68.9, passRate: 75, topScore: 94, date: '2024-01-23' },
];

const enquiryData = [
    { id: 1, name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 98765 43210', course: 'Foundation Course', status: 'Pending', date: '2024-01-22', priority: 'High' },
    { id: 2, name: 'Anjali Mehta', email: 'anjali@email.com', phone: '+91 98765 43211', course: 'Mains Program', status: 'Contacted', date: '2024-01-22', priority: 'Medium' },
    { id: 3, name: 'Karthik Rao', email: 'karthik@email.com', phone: '+91 98765 43212', course: 'Test Series', status: 'Converted', date: '2024-01-21', priority: 'Low' },
    { id: 4, name: 'Neha Gupta', email: 'neha@email.com', phone: '+91 98765 43213', course: 'Optional Subjects', status: 'Pending', date: '2024-01-21', priority: 'High' },
    { id: 5, name: 'Rohan Desai', email: 'rohan@email.com', phone: '+91 98765 43214', course: 'Interview Guidance', status: 'Follow-up', date: '2024-01-20', priority: 'Medium' },
];

export default function AnalyticsDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('user-activity'); // user-activity, test-performance, financial, enquiry

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    // Render Functions
    const renderFacultyReport = () => (
        <div className="report-section fade-in">
            <div className="section-header">
                <h3><i className="ri-user-star-line"></i> Faculty Performance Report</h3>
                <button className="btn btn-primary btn-sm"><i className="ri-download-cloud-line"></i> Export CSV</button>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Faculty Name</th>
                            <th>Subject</th>
                            <th>Classes Taken</th>
                            <th>Hours Taught</th>
                            <th>Students Taught</th>
                            <th>Avg Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facultyData.map(f => (
                            <tr key={f.id}>
                                <td><strong>{f.name}</strong></td>
                                <td><span className="badge badge-info">{f.subject}</span></td>
                                <td>{f.classesTaken}</td>
                                <td>{f.hoursTaught} hrs</td>
                                <td>{f.studentsTaught}</td>
                                <td><span className="rating-badge"><i className="ri-star-fill"></i> {f.rating}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderFinancialReport = () => (
        <div className="report-section fade-in">
            <div className="section-header">
                <h3><i className="ri-money-dollar-circle-line"></i> Financial Health Report</h3>
                <button className="btn btn-primary btn-sm"><i className="ri-file-pdf-line"></i> Download PDF</button>
            </div>

            <div className="financial-stats-grid">
                <div className="financial-stat-card theme-success">
                    <div className="f-icon"><i className="ri-money-rupee-circle-line"></i></div>
                    <div className="f-content">
                        <span className="f-label">Total Revenue</span>
                        <h3 className="f-value">₹{(financialData.totalRevenue / 100000).toFixed(2)}L</h3>
                    </div>
                </div>
                <div className="financial-stat-card theme-danger">
                    <div className="f-icon"><i className="ri-funds-line"></i></div>
                    <div className="f-content">
                        <span className="f-label">Total Expenses</span>
                        <h3 className="f-value">₹{(financialData.totalExpenses / 100000).toFixed(2)}L</h3>
                    </div>
                </div>
                <div className="financial-stat-card theme-primary">
                    <div className="f-icon"><i className="ri-wallet-3-line"></i></div>
                    <div className="f-content">
                        <span className="f-label">Net Profit</span>
                        <h3 className="f-value">₹{(financialData.netProfit / 100000).toFixed(2)}L</h3>
                    </div>
                </div>
            </div>

            <div className="chart-container-wrapper">
                <div className="chart-header">
                    <h4>Revenue vs Expenses</h4>
                    <span className="chart-period">Last 4 Months</span>
                </div>

                <div className="chart-body">
                    {/* Y-Axis Labels */}
                    <div className="chart-y-axis">
                        <span>15 Lakhs</span>
                        <span>10 Lakhs</span>
                        <span>5 Lakhs</span>
                        <span>0</span>
                    </div>

                    {/* Plot Area */}
                    <div className="chart-plot-area">
                        {/* Grid Lines */}
                        <div className="grid-lines">
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                            <div className="grid-line"></div>
                        </div>

                        {/* Bars */}
                        {financialData.monthlyBreakdown.map((m, index) => (
                            <div key={index} className="bar-group">
                                {/* Revenue Bar */}
                                <div className="bar revenue" style={{ height: `${(m.revenue / 1500000) * 100}%` }}>
                                    <div className="tooltip">Rev: ₹{(m.revenue / 100000).toFixed(1)}L</div>
                                </div>
                                {/* Expense Bar */}
                                <div className="bar expense" style={{ height: `${(m.expense / 1500000) * 100}%` }}>
                                    <div className="tooltip">Exp: ₹{(m.expense / 100000).toFixed(1)}L</div>
                                </div>
                                {/* X-Axis Label */}
                                <span className="bar-label">{m.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chart-legend">
                    <span className="legend-item"><span className="dot revenue"></span> Revenue</span>
                    <span className="legend-item"><span className="dot expense"></span> Expense</span>
                </div>
            </div>
        </div>
    );

    const renderBranchReport = () => (
        <div className="report-section fade-in">
            <div className="section-header">
                <h3><i className="ri-building-line"></i> Branch-wise Performance</h3>
                <div className="filters">
                    <select className="search-input"><option>All Time</option><option>This Month</option></select>
                </div>
            </div>

            <div className="branch-cards-grid">
                {branchData.map(branch => (
                    <div key={branch.id} className="branch-card">
                        <div className="branch-header">
                            <h4>{branch.city} Branch</h4>
                            <span className="status-badge active">{branch.status}</span>
                        </div>
                        <div className="branch-stats">
                            <div className="b-stat">
                                <span className="label">Revenue</span>
                                <span className="value">₹{(branch.revenue / 100000).toFixed(2)}L</span>
                            </div>
                            <div className="b-stat">
                                <span className="label">Students</span>
                                <span className="value">{branch.students}</span>
                            </div>
                            <div className="b-stat">
                                <span className="label">Faculty</span>
                                <span className="value">{branch.faculty}</span>
                            </div>
                        </div>
                        <div className="branch-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '75%' }}></div>
                            </div>
                            <span className="progress-text">Target Achieved: 75%</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="table-container mt-4">
                <table className="data-table">
                    <thead><tr><th>Branch</th><th>Students</th><th>Faculty</th><th>Revenue</th><th>Status</th></tr></thead>
                    <tbody>
                        {branchData.map(b => (
                            <tr key={b.id}>
                                <td><i className="ri-map-pin-line text-primary"></i> <strong>{b.city}</strong></td>
                                <td>{b.students}</td>
                                <td>{b.faculty}</td>
                                <td>₹{(b.revenue / 100000).toFixed(2)} Lakhs</td>
                                <td><span className="status-badge active">Active</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderUserActivityReport = () => (
        <div className="report-section fade-in">
            <div className="section-header">
                <h3><i className="ri-user-line"></i> User Activity Reports</h3>
                <button className="btn btn-primary btn-sm"><i className="ri-download-cloud-line"></i> Export CSV</button>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Role</th>
                            <th>Last Active</th>
                            <th>Sessions Today</th>
                            <th>Total Hours</th>
                            <th>Courses</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userActivityData.map(u => (
                            <tr key={u.id}>
                                <td><strong>{u.name}</strong></td>
                                <td><span className={`badge ${u.role === 'Faculty' ? 'badge-success' : 'badge-info'}`}>{u.role}</span></td>
                                <td>{u.lastActive}</td>
                                <td>{u.sessionsToday}</td>
                                <td>{u.totalHours} hrs</td>
                                <td>{u.coursesEnrolled || '-'}</td>
                                <td>
                                    <span className={`status-badge ${u.status.toLowerCase()}`}>
                                        {u.status === 'Online' && <i className="ri-checkbox-blank-circle-fill"></i>}
                                        {u.status === 'Away' && <i className="ri-time-line"></i>}
                                        {u.status === 'Offline' && <i className="ri-close-circle-line"></i>}
                                        {u.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderTestPerformanceReport = () => (
        <div className="report-section fade-in">
            <div className="section-header">
                <h3><i className="ri-file-list-3-line"></i> Test Performance Analytics</h3>
                <button className="btn btn-primary btn-sm"><i className="ri-bar-chart-line"></i> View Analytics</button>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Total Students</th>
                            <th>Avg Score</th>
                            <th>Pass Rate</th>
                            <th>Top Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testPerformanceData.map(t => (
                            <tr key={t.id}>
                                <td><strong>{t.testName}</strong></td>
                                <td>{t.totalStudents}</td>
                                <td>
                                    <span className={`badge ${t.avgScore >= 75 ? 'badge-success' : t.avgScore >= 60 ? 'badge-warning' : 'badge-danger'}`}>
                                        {t.avgScore}%
                                    </span>
                                </td>
                                <td>
                                    <div className="progress-bar-inline">
                                        <div className="progress-fill" style={{ width: `${t.passRate}%` }}></div>
                                        <span>{t.passRate}%</span>
                                    </div>
                                </td>
                                <td><span className="rating-badge"><i className="ri-trophy-line"></i> {t.topScore}%</span></td>
                                <td>{t.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderEnquiryReport = () => (
        <div className="report-section fade-in">
            <div className="section-header">
                <h3><i className="ri-question-answer-line"></i> Enquiry Tracking Reports</h3>
                <div className="filters">
                    <select className="search-input">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Contacted</option>
                        <option>Converted</option>
                        <option>Follow-up</option>
                    </select>
                </div>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Course Interest</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiryData.map(e => (
                            <tr key={e.id}>
                                <td><strong>{e.name}</strong></td>
                                <td>
                                    <div style={{ fontSize: '0.875rem' }}>
                                        <div>{e.email}</div>
                                        <div style={{ color: '#64748b' }}>{e.phone}</div>
                                    </div>
                                </td>
                                <td><span className="badge badge-info">{e.course}</span></td>
                                <td>
                                    <span className={`badge ${e.status === 'Converted' ? 'badge-success' :
                                        e.status === 'Contacted' ? 'badge-info' :
                                            e.status === 'Follow-up' ? 'badge-warning' :
                                                'badge-secondary'
                                        }`}>
                                        {e.status}
                                    </span>
                                </td>
                                <td>
                                    <span className={`priority-badge ${e.priority.toLowerCase()}`}>
                                        {e.priority === 'High' && <i className="ri-arrow-up-line"></i>}
                                        {e.priority === 'Medium' && <i className="ri-subtract-line"></i>}
                                        {e.priority === 'Low' && <i className="ri-arrow-down-line"></i>}
                                        {e.priority}
                                    </span>
                                </td>
                                <td>{e.date}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn btn-sm btn-outline" title="Call">
                                            <i className="ri-phone-line"></i>
                                        </button>
                                        <button className="btn btn-sm btn-outline" title="Email">
                                            <i className="ri-mail-line"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container admin-dashboard">
            <ChatWidget />
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div><h2>LMS</h2><span className="role-badge admin">Admin Panel</span></div>
                    <button
                        className="mobile-close-btn bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Overview</a>

                    <div className="nav-section-title">Reports</div>
                    <a href="#" className={`nav-item ${activeTab === 'faculty' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('faculty'); }}>
                        <i className="ri-user-star-line"></i> Faculty Reports
                    </a>
                    <a href="#" className={`nav-item ${activeTab === 'financial' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('financial'); }}>
                        <i className="ri-money-dollar-circle-line"></i> Financial Reports
                    </a>
                    <a href="#" className={`nav-item ${activeTab === 'branch' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('branch'); }}>
                        <i className="ri-building-line"></i> Branch Reports
                    </a>

                    <div className="nav-section-title">System</div>
                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>
                <button onClick={handleLogout} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="btn-icon mr-2 cursor-pointer"
                            title="Back to Dashboard"
                        >
                            <i className="ri-arrow-left-line"></i>
                        </button>
                        <div>
                            <h1>Analytics & Reports</h1>
                            <p>
                                {activeTab === 'user-activity' && 'Monitor user engagement and activity patterns'}
                                {activeTab === 'test-performance' && 'Analyze test results and student performance'}
                                {activeTab === 'financial' && 'Monitor revenue, expenses, and growth'}
                                {activeTab === 'enquiry' && 'Track and manage student enquiries'}
                                {activeTab === 'branch' && 'Monitor performance across different branches'}
                            </p>
                        </div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>

                <div className="analytics-content-wrapper">
                    {/* Tab Navigation for Mobile/Quick Access */}
                    <div className="analytics-tabs">
                        <button className={`tab-btn ${activeTab === 'user-activity' ? 'active' : ''}`} onClick={() => setActiveTab('user-activity')}>
                            <i className="ri-user-line"></i> User Activity
                        </button>
                        <button className={`tab-btn ${activeTab === 'test-performance' ? 'active' : ''}`} onClick={() => setActiveTab('test-performance')}>
                            <i className="ri-file-list-3-line"></i> Test Performance
                        </button>
                        <button className={`tab-btn ${activeTab === 'financial' ? 'active' : ''}`} onClick={() => setActiveTab('financial')}>
                            <i className="ri-money-dollar-circle-line"></i> Financial Reports
                        </button>
                        <button className={`tab-btn ${activeTab === 'enquiry' ? 'active' : ''}`} onClick={() => setActiveTab('enquiry')}>
                            <i className="ri-question-answer-line"></i> Enquiry Tracking
                        </button>
                        <button className={`tab-btn ${activeTab === 'branch' ? 'active' : ''}`} onClick={() => setActiveTab('branch')}>
                            <i className="ri-building-line"></i> Branch Reports
                        </button>
                    </div>

                    {/* Report Content */}
                    <div className="report-content">
                        {activeTab === 'user-activity' && renderUserActivityReport()}
                        {activeTab === 'test-performance' && renderTestPerformanceReport()}
                        {activeTab === 'financial' && renderFinancialReport()}
                        {activeTab === 'enquiry' && renderEnquiryReport()}
                        {activeTab === 'branch' && renderBranchReport()}
                    </div>
                </div>
            </main>
        </div>
    );
}
