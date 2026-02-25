/**
 * ENQUIRY MANAGEMENT PAGE
 * Manage student enquiries - track, respond, convert
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy enquiry data
const dummyEnquiries = [
    {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 98765 43210',
        course: 'Foundation Course - Complete UPSC Preparation',
        message: 'I want to know about the course duration and fee structure.',
        status: 'pending',
        priority: 'high',
        source: 'Website',
        date: '2024-01-20',
        assignedTo: null
    },
    {
        id: 2,
        name: 'Priya Patel',
        email: 'priya.patel@email.com',
        phone: '+91 98765 43211',
        course: 'Prelims Intensive 2025',
        message: 'When is the next batch starting?',
        status: 'contacted',
        priority: 'medium',
        source: 'Phone',
        date: '2024-01-19',
        assignedTo: 'Admin User'
    },
    {
        id: 3,
        name: 'Amit Kumar',
        email: 'amit.kumar@email.com',
        phone: '+91 98765 43212',
        course: 'Mains Answer Writing Masterclass',
        message: 'Do you provide study material in Hindi?',
        status: 'converted',
        priority: 'low',
        source: 'Social Media',
        date: '2024-01-18',
        assignedTo: 'Admin User'
    },
    {
        id: 4,
        name: 'Sneha Gupta',
        email: 'sneha.gupta@email.com',
        phone: '+91 98765 43213',
        course: 'Current Affairs 2024-25 Complete',
        message: 'Is there any discount available for students?',
        status: 'pending',
        priority: 'high',
        source: 'Website',
        date: '2024-01-20',
        assignedTo: null
    },
    {
        id: 5,
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        phone: '+91 98765 43214',
        course: 'Optional - History Complete Course',
        message: 'Can I get a demo class before enrolling?',
        status: 'contacted',
        priority: 'medium',
        source: 'Email',
        date: '2024-01-19',
        assignedTo: 'Admin User'
    },
    {
        id: 6,
        name: 'Anjali Verma',
        email: 'anjali.verma@email.com',
        phone: '+91 98765 43215',
        course: 'Foundation Course - Complete UPSC Preparation',
        message: 'What is the refund policy?',
        status: 'rejected',
        priority: 'low',
        source: 'Website',
        date: '2024-01-17',
        assignedTo: 'Admin User'
    }
];

export default function EnquiryManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [enquiries, setEnquiries] = useState([]);
    const [filteredEnquiries, setFilteredEnquiries] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEnquiries();
    }, []);

    useEffect(() => {
        filterEnquiries();
    }, [filterStatus, filterPriority, searchQuery, enquiries]);

    const loadEnquiries = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        setEnquiries(dummyEnquiries);
        setFilteredEnquiries(dummyEnquiries);

        setLoading(false);
    };

    const filterEnquiries = () => {
        let filtered = enquiries;

        if (filterStatus !== 'all') {
            filtered = filtered.filter(e => e.status === filterStatus);
        }

        if (filterPriority !== 'all') {
            filtered = filtered.filter(e => e.priority === filterPriority);
        }

        if (searchQuery) {
            filtered = filtered.filter(e =>
                e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.course.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredEnquiries(filtered);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const getStatusStats = () => {
        return {
            all: enquiries.length,
            pending: enquiries.filter(e => e.status === 'pending').length,
            contacted: enquiries.filter(e => e.status === 'contacted').length,
            converted: enquiries.filter(e => e.status === 'converted').length,
            rejected: enquiries.filter(e => e.status === 'rejected').length
        };
    };

    const getStatusBadgeClass = (status) => {
        const statusMap = {
            pending: 'status-badge pending',
            contacted: 'status-badge active',
            converted: 'status-badge active',
            rejected: 'status-badge inactive'
        };
        return statusMap[status] || 'status-badge';
    };

    const getPriorityBadgeClass = (priority) => {
        const priorityMap = {
            high: 'priority-badge high',
            medium: 'priority-badge medium',
            low: 'priority-badge low'
        };
        return priorityMap[priority] || 'priority-badge';
    };

    const stats = getStatusStats();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading enquiries...</p>
            </div>
        );
    }

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
                        <h2>LMS</h2>
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
                    <a href="/admin/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard Overview
                    </a>


                    <a href="/admin/enquiries" className="nav-item active">
                        <i className="ri-customer-service-2-line"></i>
                        Enquiries
                        <span className="badge badge-warning">{stats.pending}</span>
                    </a>

                    <a href="/admin/mentor-assignments" className="nav-item">
                        <i className="ri-user-shared-line"></i>
                        Mentor Assignments
                    </a>

                </nav>


            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >

                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>Enquiry Management</h1>
                            <p>Track and manage student enquiries</p>
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
                            <i className="ri-questionnaire-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.all}</h3>
                            <p>Total Enquiries</p>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-time-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.pending}</h3>
                            <p>Pending</p>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-phone-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.contacted}</h3>
                            <p>Contacted</p>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-check-double-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.converted}</h3>
                            <p>Converted</p>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="section">
                    <div className="filters-bar">
                        <div className="filter-group">
                            <label>Status:</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Status ({stats.all})</option>
                                <option value="pending">Pending ({stats.pending})</option>
                                <option value="contacted">Contacted ({stats.contacted})</option>
                                <option value="converted">Converted ({stats.converted})</option>
                                <option value="rejected">Rejected ({stats.rejected})</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Priority:</label>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Priority</option>
                                <option value="high">High Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="low">Low Priority</option>
                            </select>
                        </div>

                        <div className="search-group">
                            <i className="ri-search-line"></i>
                            <input
                                type="text"
                                placeholder="Search enquiries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    {/* Enquiries Table */}
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Contact</th>
                                    <th>Course</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEnquiries.map(enquiry => (
                                    <tr key={enquiry.id}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="user-avatar-placeholder">
                                                    {enquiry.name.charAt(0)}
                                                </div>
                                                <span>{enquiry.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="contact-info">
                                                <div>{enquiry.email}</div>
                                                <div className="phone-number">{enquiry.phone}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="course-name">{enquiry.course}</span>
                                        </td>
                                        <td>
                                            <div className="message-preview">
                                                {enquiry.message}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={getStatusBadgeClass(enquiry.status)}>
                                                {enquiry.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={getPriorityBadgeClass(enquiry.priority)}>
                                                {enquiry.priority}
                                            </span>
                                        </td>
                                        <td>{enquiry.date}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn-icon"
                                                    title="View Details"
                                                    onClick={() => setSelectedEnquiry(enquiry)}
                                                >
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Mark as Contacted">
                                                    <i className="ri-phone-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Convert">
                                                    <i className="ri-check-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredEnquiries.length === 0 && (
                            <div className="empty-state">
                                <i className="ri-questionnaire-line"></i>
                                <p>No enquiries found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enquiry Detail Modal */}
                {selectedEnquiry && (
                    <div className="modal-overlay" onClick={() => setSelectedEnquiry(null)}>
                        <div className="modal-content enquiry-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Enquiry Details</h2>
                                <button className="modal-close" onClick={() => setSelectedEnquiry(null)}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="enquiry-details">
                                    <div className="detail-row">
                                        <label>Student Name:</label>
                                        <span>{selectedEnquiry.name}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Email:</label>
                                        <span>{selectedEnquiry.email}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Phone:</label>
                                        <span>{selectedEnquiry.phone}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Course Interested:</label>
                                        <span>{selectedEnquiry.course}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Source:</label>
                                        <span>{selectedEnquiry.source}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Date:</label>
                                        <span>{selectedEnquiry.date}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Status:</label>
                                        <span className={getStatusBadgeClass(selectedEnquiry.status)}>
                                            {selectedEnquiry.status}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Priority:</label>
                                        <span className={getPriorityBadgeClass(selectedEnquiry.priority)}>
                                            {selectedEnquiry.priority}
                                        </span>
                                    </div>
                                    <div className="detail-row full-width">
                                        <label>Message:</label>
                                        <p className="message-full">{selectedEnquiry.message}</p>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn btn-primary">
                                        <i className="ri-phone-line"></i>
                                        Mark as Contacted
                                    </button>
                                    <button className="btn btn-primary">
                                        <i className="ri-check-line"></i>
                                        Convert to Student
                                    </button>
                                    <button className="btn btn-outline">
                                        <i className="ri-close-line"></i>
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
