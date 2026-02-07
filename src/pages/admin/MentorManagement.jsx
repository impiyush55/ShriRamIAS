/**
 * MENTOR MANAGEMENT PAGE - MODERN REDESIGN
 * Management of faculty/mentors with a premium interface
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { dummyUsers } from '../../data/users';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/drawer.css';

export default function MentorManagement() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [mentors, setMentors] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterSubject, setFilterSubject] = useState('all');

    // Add Mentor Drawer State
    const [isAddMentorOpen, setIsAddMentorOpen] = useState(false);
    const [newMentor, setNewMentor] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'active',
        subjects: '',
        course: '',
        permissions: 'standard',
        department: ''
    });

    useEffect(() => {
        loadMentors();
    }, []);

    useEffect(() => {
        filterMentors();
    }, [searchQuery, mentors, filterStatus, filterSubject]);

    const loadMentors = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Load only faculty users from dummy data
        const facultyUsers = dummyUsers
            .filter(u => u.role === 'faculty')
            .map(u => ({
                ...u,
                subjects: u.subjects || 'History, Polity',
                liveClassesCount: u.liveClassesCount || Math.floor(Math.random() * 20),
                coursesManaged: u.coursesManaged || 'GS Foundation, Opt. History',
                department: u.department || 'Social Sciences'
            }));

        setMentors(facultyUsers);
        setFilteredMentors(facultyUsers);
        setLoading(false);
    };

    const filterMentors = () => {
        let filtered = mentors;

        // Search Filter
        if (searchQuery) {
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Status Filter
        if (filterStatus !== 'all') {
            filtered = filtered.filter(m => m.status === filterStatus);
        }

        // Subject Filter
        if (filterSubject !== 'all') {
            filtered = filtered.filter(m =>
                m.subjects && m.subjects.toLowerCase().includes(filterSubject.toLowerCase())
            );
        }

        setFilteredMentors(filtered);
    };

    const handleLogout = async () => {
        try {
            await logoutApi();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMentor(prev => ({ ...prev, [name]: value }));
    };

    const handleAddMentor = () => {
        const mentorToAdd = {
            id: Date.now(),
            ...newMentor,
            role: 'faculty',
            liveClassesCount: 0,
            coursesManaged: newMentor.course
        };
        setMentors([...mentors, mentorToAdd]);
        setIsAddMentorOpen(false);
        // Reset form
        setNewMentor({
            name: '',
            email: '',
            phone: '',
            status: 'active',
            subjects: '',
            course: '',
            permissions: 'standard',
            department: ''
        });
    };

    const stats = {
        total: mentors.length,
        active: mentors.filter(m => m.status === 'active').length,
        totalClasses: mentors.reduce((sum, m) => sum + (m.liveClassesCount || 0), 0)
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'admin': return 'badge badge-danger';
            case 'faculty': return 'badge badge-success';
            case 'student': return 'badge badge-primary';
            default: return 'badge badge-secondary';
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-section">
                        <h2>SRIRAM's IAS</h2>
                        <span className="admin-badge">ADMIN PANEL</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section-title">Main</div>
                    <div
                        className="nav-item"
                        onClick={() => navigate('/admin/dashboard')}
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="ri-dashboard-3-line"></i>
                        Dashboard Overview
                    </div>



                    <div className="nav-item active">
                        <i className="ri-user-star-line"></i>
                        Mentor Management
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <i className="ri-logout-box-line"></i>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1>Mentor Management</h1>
                            <p>Manage teaching staff & permissions</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="user-details">
                            <span className="user-name">{user?.name || 'Admin User'}</span>
                            <span className="user-email">{user?.email || 'admin@shriramias.com'}</span>
                        </div>
                    </div>
                </header>

                {/* Summary Cards */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-user-star-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.total}</h3>
                            <p>Total Mentors</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Teaching faculty</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-user-check-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.active}</h3>
                            <p>Active Mentors</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Currently teaching</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-live-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.totalClasses}</h3>
                            <p>Total Live Classes</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Across all mentors</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unified Search & Filter Control Bar */}
                <div className="unified-controls">
                    <div className="search-bar-container">
                        <i className="ri-search-line search-icon"></i>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by name, email, or subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filters-actions">
                        <select
                            className="pill-select"
                            value={filterSubject}
                            onChange={(e) => setFilterSubject(e.target.value)}
                        >
                            <option value="all">All Subjects</option>
                            <option value="history">History</option>
                            <option value="polity">Polity</option>
                            <option value="geography">Geography</option>
                            <option value="ethics">Ethics</option>
                        </select>
                        <select
                            className="pill-select"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <button
                            className="btn-pill-primary"
                            onClick={() => setIsAddMentorOpen(true)}
                        >
                            <i className="ri-user-add-line"></i>
                            Add New Mentor
                        </button>
                    </div>
                </div>

                {/* Mentors Table */}
                <div className="table-container">
                    {loading ? (
                        <div className="loading-state">Loading mentors...</div>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: '1.5rem' }}>Mentor Name</th>
                                    <th>Email</th>
                                    <th>Assigned Subjects</th>
                                    <th>Courses Managed</th>
                                    <th>Live Classes</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMentors.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                                            No mentors found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMentors.map((m) => (
                                        <tr key={m.id}>
                                            <td style={{ paddingLeft: '1.5rem' }}>
                                                <div className="user-cell">
                                                    <div className="user-avatar-sm">
                                                        {m.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="user-name-text">{m.name}</span>
                                                </div>
                                            </td>
                                            <td>{m.email}</td>
                                            <td>{m.subjects}</td>
                                            <td>{m.coursesManaged || 'GS Foundation, Opt. History'}</td>
                                            <td>
                                                <span className="badge badge-info">{m.liveClassesCount} Classes</span>
                                            </td>

                                            <td>
                                                <span className={`status-badge ${m.status === 'active' ? 'active' : 'inactive'}`}>
                                                    {m.status}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
                                                <div className="action-buttons">
                                                    <button className="action-btn view-btn" title="View Details">
                                                        <i className="ri-eye-line"></i>
                                                    </button>
                                                    <button className="action-btn edit-btn" title="Edit">
                                                        <i className="ri-edit-line"></i>
                                                    </button>
                                                    <button className="action-btn delete-btn" title="Delete">
                                                        <i className="ri-delete-bin-line"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            {/* Add Mentor Drawer */}
            <div className={`user-drawer ${isAddMentorOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h2>Add New Mentor</h2>
                    <button className="close-drawer-btn" onClick={() => setIsAddMentorOpen(false)}>
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <form className="drawer-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-section">
                        <h4 className="form-section-title">Basic Information</h4>
                        <div className="drawer-form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newMentor.name}
                                onChange={handleInputChange}
                                className="drawer-input"
                                placeholder="Enter mentor's full name"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={newMentor.email}
                                onChange={handleInputChange}
                                className="drawer-input"
                                placeholder="mentor@shriramias.com"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={newMentor.phone}
                                onChange={handleInputChange}
                                className="drawer-input"
                                placeholder="+91 XXXXX XXXXX"
                            />
                        </div>
                    </div>

                    {/* Mentor Specific Fields */}
                    <div className="form-section">
                        <h4 className="form-section-title">Teaching Assignments</h4>
                        <div className="drawer-form-group">
                            <label>Subjects</label>
                            <input
                                type="text"
                                name="subjects"
                                value={newMentor.subjects}
                                onChange={handleInputChange}
                                className="drawer-input"
                                placeholder="e.g. Modern History, Ethics"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Course Assignment</label>
                            <input
                                type="text"
                                name="course"
                                value={newMentor.course}
                                onChange={handleInputChange}
                                className="drawer-input"
                                placeholder="Courses this mentor manages"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={newMentor.department}
                                onChange={handleInputChange}
                                className="drawer-input"
                                placeholder="e.g. Social Sciences"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Permissions</label>
                            <select
                                name="permissions"
                                value={newMentor.permissions}
                                onChange={handleInputChange}
                                className="drawer-select"
                            >
                                <option value="standard">Standard (Content & Live)</option>
                                <option value="restricted">Restricted (Live Only)</option>
                                <option value="full">Full Access</option>
                            </select>
                        </div>
                        <div className="drawer-form-group">
                            <label>Account Status</label>
                            <select
                                name="status"
                                value={newMentor.status}
                                onChange={handleInputChange}
                                className="drawer-select"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                </form>

                <div className="drawer-footer">
                    <button className="btn-secondary-form" onClick={() => setIsAddMentorOpen(false)}>
                        Cancel
                    </button>
                    <button className="btn-primary-form" onClick={handleAddMentor}>
                        Create Mentor
                    </button>
                </div>
            </div>
        </div>
    );
}
