/**
 * FACULTY BLOG MANAGEMENT
 * Page for faculty to create and manage blog posts
 * Similar to Admin Blog Management but for faculty use
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function FacultyBlogManagement() {
    const navigate = useNavigate();
    const [user] = useState(getCurrentUser());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: 'UPSC Preparation Strategy for Working Professionals',
            author: 'Dr. Rajesh Kumar',
            category: 'Strategy',
            status: 'published',
            publishDate: '2024-01-15',
            views: 1245,
            excerpt: 'A comprehensive guide for working professionals preparing for UPSC...'
        },
        {
            id: 2,
            title: 'Modern Indian History - Key Topics for Prelims',
            author: 'Dr. Rajesh Kumar',
            category: 'Subject Guide',
            status: 'draft',
            publishDate: null,
            views: 0,
            excerpt: 'Essential topics in Modern Indian History that frequently appear...'
        }
    ]);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Strategy',
        content: '',
        excerpt: '',
        status: 'draft'
    });

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const handleOpenModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                category: blog.category,
                content: blog.content || '',
                excerpt: blog.excerpt,
                status: blog.status
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: '',
                category: 'Strategy',
                content: '',
                excerpt: '',
                status: 'draft'
            });
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlog = {
            id: editingBlog ? editingBlog.id : blogs.length + 1,
            ...formData,
            author: user.name,
            publishDate: formData.status === 'published' ? new Date().toISOString().split('T')[0] : null,
            views: editingBlog ? editingBlog.views : 0
        };

        if (editingBlog) {
            setBlogs(blogs.map(b => b.id === editingBlog.id ? newBlog : b));
        } else {
            setBlogs([...blogs, newBlog]);
        }

        setShowModal(false);
        setEditingBlog(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            setBlogs(blogs.filter(b => b.id !== id));
        }
    };

    const handlePublish = (id) => {
        setBlogs(blogs.map(b =>
            b.id === id
                ? { ...b, status: 'published', publishDate: new Date().toISOString().split('T')[0] }
                : b
        ));
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar Overlay */}
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

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2>SRIRAM's IAS</h2>
                        <span className="role-badge faculty">Faculty Panel</span>
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
                    <a href="/faculty/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard
                    </a>
                    <a href="/faculty/courses" className="nav-item">
                        <i className="ri-book-line"></i>
                        My Courses
                    </a>
                    <a href="/faculty/students" className="nav-item">
                        <i className="ri-user-line"></i>
                        My Students
                    </a>
                    <a href="/faculty/content" className="nav-item">
                        <i className="ri-file-add-line"></i>
                        Add Content
                    </a>
                    <a href="/faculty/blogs" className="nav-item active">
                        <i className="ri-article-line"></i>
                        Blog Content
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
                            <h1>Blog Management</h1>
                            <p>Create and manage your blog posts</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <i className="ri-add-line"></i>
                        Create New Blog
                    </button>
                </header>

                {/* Stats */}
                <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-article-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{blogs.length}</h3>
                            <p>Total Blogs</p>
                        </div>
                    </div>
                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-check-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{blogs.filter(b => b.status === 'published').length}</h3>
                            <p>Published</p>
                        </div>
                    </div>
                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-draft-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{blogs.filter(b => b.status === 'draft').length}</h3>
                            <p>Drafts</p>
                        </div>
                    </div>
                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-eye-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{blogs.reduce((sum, b) => sum + b.views, 0)}</h3>
                            <p>Total Views</p>
                        </div>
                    </div>
                </div>

                {/* Blogs Table */}
                <div className="section">
                    <h2 style={{ marginBottom: '1.5rem' }}>My Blog Posts</h2>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Publish Date</th>
                                    <th>Views</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(blog => (
                                    <tr key={blog.id}>
                                        <td>
                                            <strong>{blog.title}</strong>
                                            <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                                                {blog.excerpt.substring(0, 60)}...
                                            </p>
                                        </td>
                                        <td>
                                            <span className="badge badge-info">{blog.category}</span>
                                        </td>
                                        <td>
                                            <span className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td>{blog.publishDate || '-'}</td>
                                        <td>{blog.views}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleOpenModal(blog)}
                                                    className="btn btn-sm btn-outline"
                                                    title="Edit"
                                                >
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                                {blog.status === 'draft' && (
                                                    <button
                                                        onClick={() => handlePublish(blog.id)}
                                                        className="btn btn-sm btn-success"
                                                        title="Publish"
                                                    >
                                                        <i className="ri-send-plane-line"></i>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="btn btn-sm btn-danger"
                                                    title="Delete"
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Create/Edit Blog Modal */}
                {showModal && (
                    <div className="modal-backdrop" onClick={() => setShowModal(false)}>
                        <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                                <button className="close-btn" onClick={() => setShowModal(false)}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Blog Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Enter blog title"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="Strategy">Strategy</option>
                                            <option value="Subject Guide">Subject Guide</option>
                                            <option value="Current Affairs">Current Affairs</option>
                                            <option value="Tips & Tricks">Tips & Tricks</option>
                                            <option value="Motivation">Motivation</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Excerpt</label>
                                        <textarea
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            placeholder="Brief description (shown in blog list)"
                                            rows="2"
                                            required
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Content</label>
                                        <textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            placeholder="Write your blog content here..."
                                            rows="10"
                                            required
                                        />
                                    </div>

                                    <div className="form-actions full-width">
                                        <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            {editingBlog ? 'Update Blog' : 'Create Blog'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
