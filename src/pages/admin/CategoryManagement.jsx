/**
 * CATEGORY MANAGEMENT PAGE
 * Manage course categories and subcategories
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy category data
const dummyCategories = [
    {
        id: 1,
        name: 'Foundation',
        description: 'Comprehensive courses for beginners',
        coursesCount: 12,
        status: 'active',
        icon: 'ri-seedling-line',
        color: 'success'
    },
    {
        id: 2,
        name: 'Prelims',
        description: 'Focused preparation for Preliminary exam',
        coursesCount: 15,
        status: 'active',
        icon: 'ri-file-list-line',
        color: 'primary'
    },
    {
        id: 3,
        name: 'Mains',
        description: 'In-depth study for Mains exam',
        coursesCount: 10,
        status: 'active',
        icon: 'ri-file-text-line',
        color: 'warning'
    },
    {
        id: 4,
        name: 'Optional',
        description: 'Subject-specific optional courses',
        coursesCount: 8,
        status: 'active',
        icon: 'ri-book-2-line',
        color: 'info'
    },
    {
        id: 5,
        name: 'Current Affairs',
        description: 'Daily and monthly current affairs updates',
        coursesCount: 5,
        status: 'active',
        icon: 'ri-newspaper-line',
        color: 'danger'
    },
    {
        id: 6,
        name: 'Interview',
        description: 'Mock interviews and personality tests',
        coursesCount: 3,
        status: 'inactive',
        icon: 'ri-user-voice-line',
        color: 'primary'
    }
];

export default function CategoryManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setCategories(dummyCategories);
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading categories...</p>
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
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard Overview</a>

                    <div className="nav-section-title">Academic Content</div>
                    <a href="/admin/courses" className="nav-item"><i className="ri-book-2-line"></i>Courses</a>
                    <a href="/admin/categories" className="nav-item active"><i className="ri-folder-settings-line"></i>Categories</a>
                    <a href="/admin/content" className="nav-item"><i className="ri-folder-video-line"></i>Content Library</a>

                </nav>

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
                        <div>
                            <h1>Category Management</h1>
                            <p>Organize your course structure</p>
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

                <div className="section">
                    <div className="filters-bar">
                        <div className="search-group">
                            <i className="ri-search-line"></i>
                            <input type="text" placeholder="Search categories..." className="search-input" />
                        </div>
                        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                            <i className="ri-add-line"></i> Add Category
                        </button>
                    </div>

                    <div className="categories-grid grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                        {categories.map(cat => (
                            <div key={cat.id} className="course-card p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`module-icon ${cat.color} w-[50px] h-[50px] text-2xl`}>
                                        <i className={cat.icon}></i>
                                    </div>
                                    <div>
                                        <h3 className="m-0 text-xl">{cat.name}</h3>
                                        <span className={`status-badge ${cat.status === 'active' ? 'active' : 'inactive'}`}>{cat.status}</span>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-[0.95rem] mb-4">{cat.description}</p>
                                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                    <span className="font-semibold text-gray-700">{cat.coursesCount} Courses</span>
                                    <div className="action-buttons">
                                        <button className="btn-icon"><i className="ri-edit-line"></i></button>
                                        <button className="btn-icon"><i className="ri-delete-bin-line"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                        <div className="modal-content max-w-[400px]" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Add Category</h2>
                                <button className="modal-close" onClick={() => setIsModalOpen(false)}><i className="ri-close-line"></i></button>
                            </div>
                            <div className="modal-body">
                                <form className="flex flex-col gap-4">
                                    <div className="form-group">
                                        <label className="block mb-2 font-semibold">Name</label>
                                        <input type="text" className="search-input" placeholder="Category Name" />
                                    </div>
                                    <div className="form-group">
                                        <label className="block mb-2 font-semibold">Description</label>
                                        <textarea className="search-input" rows="3" placeholder="Description"></textarea>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Create Category</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
