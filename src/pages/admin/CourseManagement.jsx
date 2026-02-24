/**
 * COURSE MANAGEMENT PAGE
 * Manage all courses - create, edit, delete
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { getAllCoursesApi } from '../../api/courseApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function CourseManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [filterCategory, searchQuery, courses]);

    const loadCourses = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        const coursesRes = await getAllCoursesApi();
        if (coursesRes.success) {
            setCourses(coursesRes.data);
            setFilteredCourses(coursesRes.data);
        }

        setLoading(false);
    };

    const filterCourses = () => {
        let filtered = courses;

        if (filterCategory !== 'all') {
            filtered = filtered.filter(c => c.category === filterCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(c =>
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredCourses(filtered);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const getCategoryStats = () => {
        return {
            all: courses.length,
            Foundation: courses.filter(c => c.category === 'Foundation').length,
            Prelims: courses.filter(c => c.category === 'Prelims').length,
            Mains: courses.filter(c => c.category === 'Mains').length,
            Optional: courses.filter(c => c.category === 'Optional').length,
            'Current Affairs': courses.filter(c => c.category === 'Current Affairs').length
        };
    };

    const stats = getCategoryStats();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading courses...</p>
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
                    <a href="/admin/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard Overview
                    </a>


                    <div className="nav-section-title">Academic Content</div>
                    <a href="/admin/courses" className="nav-item active">
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
                            <h1>Course Management</h1>
                            <p>Create and manage all courses</p>
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
                            <i className="ri-book-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.all}</h3>
                            <p>Total Courses</p>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-seedling-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.Foundation}</h3>
                            <p>Foundation</p>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-file-list-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.Prelims}</h3>
                            <p>Prelims</p>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-file-text-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.Mains}</h3>
                            <p>Mains</p>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="section">
                    <div className="filters-bar">
                        <div className="filter-group">
                            <label>Filter by Category:</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Categories ({stats.all})</option>
                                <option value="Foundation">Foundation ({stats.Foundation})</option>
                                <option value="Prelims">Prelims ({stats.Prelims})</option>
                                <option value="Mains">Mains ({stats.Mains})</option>
                                <option value="Optional">Optional ({stats.Optional})</option>
                                <option value="Current Affairs">Current Affairs ({stats['Current Affairs']})</option>
                            </select>
                        </div>

                        <div className="search-group">
                            <i className="ri-search-line"></i>
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <button className="btn btn-primary">
                            <i className="ri-add-circle-line"></i>
                            Add New Course
                        </button>
                    </div>

                    {/* Courses Grid */}
                    <div className="courses-grid">
                        {filteredCourses.map(course => (
                            <div key={course.id} className="course-card">
                                <img src={course.thumbnail} alt={course.title} />
                                <div className="course-info">
                                    <span className="course-category">{course.category}</span>
                                    <h3>{course.title}</h3>
                                    <p className="course-instructor">
                                        <i className="ri-user-line"></i>
                                        {course.instructor}
                                    </p>
                                    <div className="course-stats">
                                        <span>
                                            <i className="ri-user-line"></i>
                                            {course.enrolled} students
                                        </span>
                                        <span>
                                            <i className="ri-star-fill"></i>
                                            {course.rating}
                                        </span>
                                    </div>
                                    <div className="course-price">
                                        <span className="price-original">₹{course.price}</span>
                                        <span className="price-discounted">₹{course.discountedPrice}</span>
                                    </div>
                                    <div className="action-buttons">
                                        <button className="btn btn-sm btn-primary">
                                            <i className="ri-edit-line"></i>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline">
                                            <i className="ri-delete-bin-line"></i>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="empty-state">
                            <i className="ri-book-line"></i>
                            <p>No courses found</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
