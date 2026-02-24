import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { dummyUsers } from '../../data/users';
import { dummyCourses } from '../../data/courses';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/drawer.css';

// Extended Dummy Data for Assignments
const dummyAssignments = [
    {
        id: 1,
        mentorId: 2,
        mentorName: 'Dr. Rajesh Kumar',
        courseId: 1,
        courseName: 'GS Foundation - Complete UPSC Preparation',
        assignedCount: 45,
        status: 'active',
        date: '2024-01-15'
    },
    {
        id: 2,
        mentorId: 3,
        mentorName: 'Prof. Priya Sharma',
        courseId: 2,
        courseName: 'Prelims Intensive 2025',
        assignedCount: 32,
        status: 'active',
        date: '2024-01-18'
    },
    {
        id: 3,
        mentorId: 2,
        mentorName: 'Dr. Rajesh Kumar',
        courseId: 3,
        courseName: 'Mains Answer Writing Masterclass',
        assignedCount: 28,
        status: 'active',
        date: '2024-01-20'
    },
    {
        id: 4,
        mentorId: 3,
        mentorName: 'Prof. Priya Sharma',
        courseId: 4,
        courseName: 'Current Affairs 2024-25 Complete',
        assignedCount: 15,
        status: 'active',
        date: '2024-01-22'
    }
];

export default function MentorAssignments() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [filteredAssignments, setFilteredAssignments] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [filterMentor, setFilterMentor] = useState('all');
    const [filterCourse, setFilterCourse] = useState('all');

    // Drawer State
    const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        mentorId: '',
        courseId: '',
        status: 'active'
    });

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, assignments, filterMentor, filterCourse]);

    const loadData = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Simulate API fetch delay
        setTimeout(() => {
            setAssignments(dummyAssignments);
            setFilteredAssignments(dummyAssignments);
            setLoading(false);
        }, 500);
    };

    const filterData = () => {
        let filtered = assignments;

        if (searchQuery) {
            filtered = filtered.filter(a =>
                a.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.courseName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterMentor !== 'all') {
            filtered = filtered.filter(a => a.mentorId === parseInt(filterMentor));
        }

        if (filterCourse !== 'all') {
            filtered = filtered.filter(a => a.courseId === parseInt(filterCourse));
        }

        setFilteredAssignments(filtered);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAssignment(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        const mentor = dummyUsers.find(u => u.id === parseInt(newAssignment.mentorId));
        const course = dummyCourses.find(c => c.id === parseInt(newAssignment.courseId));

        if (!mentor || !course) {
            alert('Please select both mentor and course');
            return;
        }

        const assignment = {
            id: Date.now(),
            mentorId: mentor.id,
            mentorName: mentor.name,
            courseId: course.id,
            courseName: course.title,
            assignedCount: 0,
            status: 'active',
            date: new Date().toISOString().split('T')[0]
        };

        setAssignments([assignment, ...assignments]);
        setIsAssignDrawerOpen(false);
        setNewAssignment({ mentorId: '', courseId: '', status: 'active' });
    };

    const stats = {
        total: assignments.length,
        activeMentors: new Set(assignments.map(a => a.mentorId)).size,
        totalCoverage: assignments.reduce((sum, a) => sum + a.assignedCount, 0),
        pendingGroups: 4
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading assignments...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container admin-dashboard">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>SRIRAM's IAS</h2>
                    <span className="role-badge admin">Admin Panel</span>
                </div>

                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i> Dashboard
                    </a>

                    <div className="nav-section-title">Support & Guidance</div>
                    <a href="/admin/mentors" className="nav-item">
                        <i className="ri-user-star-line"></i> Mentor Management
                    </a>
                    <a href="/admin/mentor-assignments" className="nav-item active">
                        <i className="ri-user-shared-line"></i> Mentor Assignments
                    </a>
                    <a href="/admin/enquiries" className="nav-item">
                        <i className="ri-question-answer-line"></i> Student Enquiries
                    </a>
                </nav>

                <button onClick={handleLogout} className="logout-btn">
                    <i className="ri-logout-box-line"></i> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>Mentor Assignments</h1>
                            <p>Allocate mentors to specific courses and student batches</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div className="hidden sm:block">
                            <p className="user-name">{user?.name}</p>
                            <p className="user-email">{user?.email}</p>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-links-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.total}</h3>
                            <p>Total Assignments</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Across all courses</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-user-follow-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.activeMentors}</h3>
                            <p>Active Mentors</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Currently assigned</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-group-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.totalCoverage}</h3>
                            <p>Students Managed</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Total mentorship coverage</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="unified-controls">
                    <div className="search-pill-container">
                        <i className="ri-search-line search-icon-pill"></i>
                        <input
                            type="text"
                            placeholder="Search by mentor or course..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-pill"
                        />
                    </div>

                    <div className="filters-actions">
                        <select
                            className="pill-select"
                            value={filterMentor}
                            onChange={(e) => setFilterMentor(e.target.value)}
                        >
                            <option value="all">All Mentors</option>
                            {dummyUsers.filter(u => u.role === 'faculty').map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>

                        <select
                            className="pill-select"
                            value={filterCourse}
                            onChange={(e) => setFilterCourse(e.target.value)}
                        >
                            <option value="all">All Courses</option>
                            {dummyCourses.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>

                        <button
                            className="btn-pill-primary"
                            onClick={() => setIsAssignDrawerOpen(true)}
                        >
                            <i className="ri-link-m"></i>
                            Assign New Mentor
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="section" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="table-container" style={{ margin: 0 }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: '2rem' }}>Mentor</th>
                                    <th>Assigned Course</th>
                                    <th>Students Assigned</th>
                                    <th>Status</th>
                                    <th>Assignment Date</th>
                                    <th style={{ textAlign: 'right', paddingRight: '2rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAssignments.map(a => (
                                    <tr key={a.id}>
                                        <td style={{ paddingLeft: '2rem' }}>
                                            <div className="user-cell">
                                                <div className="user-avatar-sm">
                                                    {a.mentorName.charAt(0)}
                                                </div>
                                                <span className="font-semibold">{a.mentorName}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-medium text-gray-800">{a.courseName}</div>
                                            <span className="text-xs text-gray-500">ID: COURSE-{a.courseId}</span>
                                        </td>
                                        <td>
                                            <span className="badge badge-info px-3 py-1">
                                                {a.assignedCount} Students
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${a.status === 'active' ? 'active' : 'inactive'}`}>
                                                {a.status}
                                            </span>
                                        </td>
                                        <td>{a.date}</td>
                                        <td style={{ textAlign: 'right', paddingRight: '2rem' }}>
                                            <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                                                <button className="btn-icon" title="View Details">
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Edit Assignment">
                                                    <i className="ri-pencil-line"></i>
                                                </button>
                                                <button className="btn-icon text-danger" title="Remove Assignment">
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredAssignments.length === 0 && (
                            <div className="empty-state" style={{ padding: '5rem 2rem' }}>
                                <i className="ri-links-line" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                                <p className="mt-4 text-gray-500">No mentor assignments found</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Assignments Drawer */}
            {isAssignDrawerOpen && (
                <div className="drawer-backdrop" onClick={() => setIsAssignDrawerOpen(false)}></div>
            )}

            <div className={`user-drawer ${isAssignDrawerOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h2>Assign Mentor to Course</h2>
                    <button className="close-drawer-btn" onClick={() => setIsAssignDrawerOpen(false)}>
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <form className="drawer-body" onSubmit={handleCreateAssignment}>
                    <div className="form-section">
                        <h4 className="form-section-title">Assignment Details</h4>

                        <div className="drawer-form-group">
                            <label>Select Mentor</label>
                            <select
                                name="mentorId"
                                value={newAssignment.mentorId}
                                onChange={handleInputChange}
                                className="drawer-select"
                                required
                            >
                                <option value="">Choose a mentor</option>
                                {dummyUsers.filter(u => u.role === 'faculty').map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="drawer-form-group">
                            <label>Select Course</label>
                            <select
                                name="courseId"
                                value={newAssignment.courseId}
                                onChange={handleInputChange}
                                className="drawer-select"
                                required
                            >
                                <option value="">Choose a course</option>
                                {dummyCourses.map(c => (
                                    <option key={c.id} value={c.id}>{c.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="drawer-form-group">
                            <label>Initial Status</label>
                            <select
                                name="status"
                                value={newAssignment.status}
                                onChange={handleInputChange}
                                className="drawer-select"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="info-box mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                            <p className="text-xs text-blue-700 leading-relaxed">
                                <i className="ri-information-line"></i> By assigning a mentor to a course, they will be able to view students enrolled in that course, manage content, and host live sessions.
                            </p>
                        </div>
                    </div>
                </form>

                <div className="drawer-footer">
                    <button className="btn-secondary" onClick={() => setIsAssignDrawerOpen(false)}>
                        Cancel
                    </button>
                    <button className="btn-primary-form" onClick={handleCreateAssignment}>
                        Confirm Assignment
                    </button>
                </div>
            </div>
        </div>
    );
}
