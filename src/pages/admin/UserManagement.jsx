/**
 * USER MANAGEMENT PAGE - MODERN REDESIGN
 * Management of users, roles, and permissions with a premium interface
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { dummyUsers } from '../../data/users';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/drawer.css';

export default function UserManagement() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // View State: only 'student' now
    const [currentView, setCurrentView] = useState('student');

    // Filter States
    const [filterRole, setFilterRole] = useState('all'); // kept for 'all' view
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Specific Filters for Student/Faculty
    const [filterCourse, setFilterCourse] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDate, setFilterDate] = useState('');

    // Add User Drawer State
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'student',
        status: 'active',
        // Student specific
        course: '',
        batch: '',
        walletBalance: '0.00',
        enrollmentDate: new Date().toISOString().split('T')[0],
        // Faculty specific
        department: '',
        subjects: '',
        permissions: 'standard'
    });

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        // Reset filters when view changes
        setSearchQuery('');
        setFilterCourse('all');
        setFilterStatus('all');
        setFilterDate('');

        // If view is strictly 'student' or 'faculty', set default role filter internally or logic
        if (currentView === 'student') {
            setFilterRole('student');
        } else if (currentView === 'faculty') {
            setFilterRole('faculty');
        } else {
            setFilterRole('all');
        }
    }, [currentView]);

    useEffect(() => {
        filterUsers();
    }, [filterRole, searchQuery, users, currentView, filterCourse, filterStatus, filterDate]);

    const loadUsers = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        // Load all users from dummy data
        // Enrich dummy data if needed for demo
        const enrichedUsers = dummyUsers.map(u => ({
            ...u,
            walletBalance: u.walletBalance || (Math.random() * 1000).toFixed(2),
            enrolledCourses: u.enrolledCourses || (u.role === 'student' ? 'GS Foundation 2025' : '-'),
            subjects: u.subjects || (u.role === 'faculty' ? 'History, Polity' : '-'),
            liveClassesCount: u.liveClassesCount || (u.role === 'faculty' ? Math.floor(Math.random() * 20) : 0),
            enrollmentDate: u.enrollmentDate || '2024-01-15'
        }));
        setUsers(enrichedUsers);
        setFilteredUsers(enrichedUsers);
        setLoading(false);
    };

    const filterUsers = () => {
        let filtered = users;

        // Role Filter (Based on View or Dropdown)
        if (currentView === 'student') {
            filtered = filtered.filter(u => u.role === 'student');
        } else if (currentView === 'faculty') {
            filtered = filtered.filter(u => u.role === 'faculty');
        } else if (filterRole !== 'all') {
            filtered = filtered.filter(u => u.role === filterRole);
        }

        // Search Filter
        if (searchQuery) {
            filtered = filtered.filter(u =>
                u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (u.id && u.id.toString().includes(searchQuery))
            );
        }

        // Additional Filters
        if (filterCourse !== 'all') {
            filtered = filtered.filter(u => u.enrolledCourses && u.enrolledCourses.includes(filterCourse));
        }
        if (filterStatus !== 'all') {
            filtered = filtered.filter(u => u.status === filterStatus);
        }
        if (filterDate) {
            filtered = filtered.filter(u => u.enrollmentDate === filterDate);
        }

        setFilteredUsers(filtered);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        // Simulation of adding a user
        const newId = users.length + 1;
        const createdUser = {
            id: newId,
            ...newUser,
            avatar: 'https://ui-avatars.com/api/?name=' + newUser.name + '&background=random',
            role: currentView === 'student' ? 'student' : (currentView === 'faculty' ? 'faculty' : newUser.role),
            enrolledCourses: newUser.course || '-',
            subjects: newUser.subjects || '-'
        };

        const updatedUsers = [createdUser, ...users];
        setUsers(updatedUsers);
        // setFilteredUsers will update via effect
        setIsAddUserOpen(false);

        // Reset form
        setNewUser({
            name: '',
            email: '',
            phone: '',
            role: 'student',
            status: 'active',
            course: '',
            batch: '',
            department: '',
            subjects: '',
            permissions: 'standard',
            walletBalance: '0.00',
            enrollmentDate: new Date().toISOString().split('T')[0]
        });

        alert('User created successfully (Simulated)');
    };

    const getRoleBadgeClass = (role) => {
        const roleMap = {
            admin: 'role-badge admin',
            faculty: 'role-badge faculty',
            student: 'role-badge student'
        };
        return roleMap[role] || 'role-badge';
    };

    const getRoleStats = () => {
        return {
            all: users.length,
            admin: users.filter(u => u.role === 'admin').length,
            faculty: users.filter(u => u.role === 'faculty').length,
            student: users.filter(u => u.role === 'student').length
        };
    };

    const stats = getRoleStats();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading users...</p>
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

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div>
                        <h2>SRIRAM's IAS</h2>
                        <span className="role-badge admin">Admin Panel</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>

                    <div className="nav-section-title">User & Content Admin</div>
                    <a href="/admin/user-management" className="nav-item active"><i className="ri-graduation-cap-line"></i>Students Management</a>
                    <a href="/admin/mentor-assignments" className="nav-item"><i className="ri-user-shared-line"></i>Mentor Assignments</a>


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
                            <h1>Students Management</h1>
                            <p>Manage student enrollments & status</p>
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

                {/* Summary Cards */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-graduation-cap-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.student}</h3>
                            <p>Total Students</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Learners enrolled</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-user-check-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{users.filter(u => u.role === 'student' && u.status === 'active').length}</h3>
                            <p>Active Students</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Currently enrolled</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-wallet-3-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>₹{users.filter(u => u.role === 'student').reduce((sum, u) => sum + parseFloat(u.walletBalance || 0), 0).toFixed(0)}</h3>
                            <p>Total Wallet Balance</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Across all students</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unified Search & Filter Control Bar */}
                <div className="unified-controls">
                    <div className="search-pill-container">
                        <i className="ri-search-line search-icon-pill"></i>
                        <input
                            type="text"
                            placeholder="Search by name, email, or ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-pill"
                        />
                    </div>

                    <div className="filters-actions">
                        <select
                            className="pill-select"
                            value={filterCourse}
                            onChange={(e) => setFilterCourse(e.target.value)}
                        >
                            <option value="all">All Courses</option>
                            <option value="GS Foundation 2025">GS Foundation</option>
                            <option value="History Optional">History Optional</option>
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
                        <input
                            type="date"
                            className="pill-select"
                            style={{ minWidth: 'auto', paddingRight: '1rem' }}
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            placeholder="Enrollment Date"
                        />

                        <button
                            className="btn-pill-primary"
                            onClick={() => setIsAddUserOpen(true)}
                        >
                            <i className="ri-user-add-line"></i>
                            Add New Student
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="section" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="table-container" style={{ margin: 0 }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: '1.5rem' }}>Student Name</th>
                                    <th>Email</th>
                                    <th>Enrolled Courses</th>
                                    <th>Wallet Balance</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right', paddingRight: '1.5rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(u => (
                                    <tr key={u.id}>
                                        <td style={{ paddingLeft: '1.5rem' }}>
                                            <div className="user-cell">
                                                <img src={u.avatar} alt={u.name} className="table-avatar" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 600, color: '#111827' }}>{u.name}</span>
                                                    {currentView !== 'all' && <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>ID: SR-{1000 + u.id}</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{u.email}</td>
                                        <td>{u.enrolledCourses}</td>
                                        <td>₹{u.walletBalance}</td>

                                        <td>
                                            <span className={`status-badge ${u.status === 'active' ? 'active' : 'inactive'}`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
                                            <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                                                <button className="btn-icon" title="View Profile">
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Edit User">
                                                    <i className="ri-pencil-line"></i>
                                                </button>
                                                <button className="btn-icon" style={{ color: '#dc2626', background: '#fee2e2' }} title="Block/Disable">
                                                    <i className="ri-prohibited-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="empty-state" style={{ padding: '4rem 2rem' }}>
                                <i className="ri-user-search-line"></i>
                                <p>No users found matching your criteria</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add User Drawer (Right Side Modal) */}
            {isAddUserOpen && (
                <div className="drawer-backdrop" onClick={() => setIsAddUserOpen(false)}></div>
            )}

            <div className={`user-drawer ${isAddUserOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h2>Add New Student</h2>
                    <button className="close-drawer-btn" onClick={() => setIsAddUserOpen(false)}>
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <form className="drawer-body" onSubmit={handleAddUser}>
                    <div className="form-section">
                        <h4 className="form-section-title">Basic Information</h4>
                        <div className="drawer-form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newUser.name}
                                onChange={handleInputChange}
                                className="drawer-input"
                                required
                                placeholder="e.g. Rahul Kumar"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                className="drawer-input"
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={newUser.phone}
                                onChange={handleInputChange}
                                className="drawer-input"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>



                    {/* Student Enrollment Fields */}
                    <div className="form-section">
                        <h4 className="form-section-title">Enrollment</h4>
                        <div className="drawer-form-group">
                            <label>Assign Course(s)</label>
                            <select
                                name="course"
                                value={newUser.course}
                                onChange={handleInputChange}
                                className="drawer-select"
                            >
                                <option value="">Select Course</option>
                                <option value="GS Foundation 2025">GS Foundation 2025</option>
                                <option value="History Optional">History Optional</option>
                                <option value="CSAT Mastery">CSAT Mastery</option>
                            </select>
                        </div>
                        <div className="drawer-form-group">
                            <label>Account Status</label>
                            <select
                                name="status"
                                value={newUser.status}
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
                    <button className="btn-secondary" onClick={() => setIsAddUserOpen(false)}>
                        Cancel
                    </button>
                    <button className="btn-primary-form" onClick={handleAddUser}>
                        Create Student
                    </button>
                </div>
            </div>
        </div>
    );
}
