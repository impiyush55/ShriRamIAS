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
        navigate('/');
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
                    className="sidebar-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div>
                        <h2>LMS</h2>
                        <span className="role-badge faculty">Faculty Panel</span>
                    </div>
                    <button
                        className="mobile-close-btn md:hidden bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
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
                            <h1>Blog Management</h1>
                            <p>Create and manage your blog posts</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <i className="ri-add-line"></i>
                        Create New Blog
                    </button>
                </header>

                {/* Stats */}
                <div className="stats-grid mb-8">
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
                    <h2 className="mb-6">My Blog Posts</h2>
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
                                            <p className="text-sm text-slate-500 mt-1">
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
                                            <div className="flex gap-2">
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
                    <div
                        onClick={() => setShowModal(false)}
                        style={{
                            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)',
                            zIndex: 2000, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', padding: '1rem'
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: '#fff', borderRadius: '16px',
                                boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
                                width: '100%', maxWidth: '680px',
                                overflow: 'hidden', display: 'flex', flexDirection: 'column'
                            }}
                        >
                            {/* Modal Header */}
                            <div style={{
                                padding: '1.25rem 1.75rem',
                                borderBottom: '1px solid #e5e7eb',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'linear-gradient(135deg, #0056D2 0%, #003ea1 100%)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '8px',
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontSize: '1.1rem'
                                    }}>
                                        <i className="ri-article-line"></i>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>
                                        {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        background: 'rgba(255,255,255,0.15)', border: 'none',
                                        borderRadius: '8px', width: '32px', height: '32px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontSize: '1.25rem', cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                                >
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div style={{
                                padding: '1.75rem', overflowY: 'auto',
                                maxHeight: '75vh', backgroundColor: '#fff'
                            }}>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                                    {/* Blog Title */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                                            Blog Title <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Enter blog title"
                                            required
                                            style={{
                                                width: '100%', padding: '0.6rem 0.875rem',
                                                borderRadius: '8px', border: '1.5px solid #d1d5db',
                                                fontSize: '0.9375rem', color: '#111827',
                                                outline: 'none', boxSizing: 'border-box',
                                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                                backgroundColor: '#f9fafb'
                                            }}
                                            onFocus={e => { e.target.style.borderColor = '#0056D2'; e.target.style.boxShadow = '0 0 0 3px rgba(0,86,210,0.12)'; e.target.style.backgroundColor = '#fff'; }}
                                            onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = '#f9fafb'; }}
                                        />
                                    </div>

                                    {/* Category + Status Row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                style={{
                                                    width: '100%', padding: '0.6rem 0.875rem',
                                                    borderRadius: '8px', border: '1.5px solid #d1d5db',
                                                    fontSize: '0.9375rem', color: '#111827',
                                                    outline: 'none', boxSizing: 'border-box',
                                                    backgroundColor: '#f9fafb', cursor: 'pointer'
                                                }}
                                            >
                                                <option value="Strategy">Strategy</option>
                                                <option value="Subject Guide">Subject Guide</option>
                                                <option value="Current Affairs">Current Affairs</option>
                                                <option value="Tips & Tricks">Tips &amp; Tricks</option>
                                                <option value="Motivation">Motivation</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Status</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                style={{
                                                    width: '100%', padding: '0.6rem 0.875rem',
                                                    borderRadius: '8px', border: '1.5px solid #d1d5db',
                                                    fontSize: '0.9375rem', color: '#111827',
                                                    outline: 'none', boxSizing: 'border-box',
                                                    backgroundColor: '#f9fafb', cursor: 'pointer'
                                                }}
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                                            Excerpt <span style={{ color: '#6b7280', fontWeight: 400 }}>(shown in blog list)</span>
                                        </label>
                                        <textarea
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            placeholder="Brief description shown in the blog listing..."
                                            rows="2"
                                            required
                                            style={{
                                                width: '100%', padding: '0.6rem 0.875rem',
                                                borderRadius: '8px', border: '1.5px solid #d1d5db',
                                                fontSize: '0.9375rem', color: '#111827',
                                                outline: 'none', boxSizing: 'border-box',
                                                resize: 'vertical', minHeight: '72px',
                                                backgroundColor: '#f9fafb', lineHeight: 1.6
                                            }}
                                            onFocus={e => { e.target.style.borderColor = '#0056D2'; e.target.style.boxShadow = '0 0 0 3px rgba(0,86,210,0.12)'; e.target.style.backgroundColor = '#fff'; }}
                                            onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = '#f9fafb'; }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                                            Content <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            placeholder="Write your full blog content here..."
                                            rows="8"
                                            required
                                            style={{
                                                width: '100%', padding: '0.6rem 0.875rem',
                                                borderRadius: '8px', border: '1.5px solid #d1d5db',
                                                fontSize: '0.9375rem', color: '#111827',
                                                outline: 'none', boxSizing: 'border-box',
                                                resize: 'vertical', minHeight: '180px',
                                                backgroundColor: '#f9fafb', lineHeight: 1.7
                                            }}
                                            onFocus={e => { e.target.style.borderColor = '#0056D2'; e.target.style.boxShadow = '0 0 0 3px rgba(0,86,210,0.12)'; e.target.style.backgroundColor = '#fff'; }}
                                            onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = '#f9fafb'; }}
                                        />
                                    </div>

                                    {/* Footer Buttons */}
                                    <div style={{
                                        display: 'flex', justifyContent: 'flex-end', gap: '0.75rem',
                                        paddingTop: '1.25rem', borderTop: '1px solid #e5e7eb', marginTop: '0.25rem'
                                    }}>
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            style={{
                                                padding: '0.6rem 1.25rem', borderRadius: '8px',
                                                border: '1.5px solid #d1d5db', backgroundColor: '#fff',
                                                color: '#374151', fontSize: '0.9rem', fontWeight: 600,
                                                cursor: 'pointer', transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            style={{
                                                padding: '0.6rem 1.5rem', borderRadius: '8px',
                                                border: 'none', background: 'linear-gradient(135deg, #0056D2 0%, #003ea1 100%)',
                                                color: '#fff', fontSize: '0.9rem', fontWeight: 600,
                                                cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,86,210,0.35)',
                                                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem'
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,86,210,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,86,210,0.35)'; e.currentTarget.style.transform = 'none'; }}
                                        >
                                            <i className={editingBlog ? 'ri-save-line' : 'ri-add-line'}></i>
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
