import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/blog-management.css'; // Reusing blog management styles

export default function CreateBlog() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Strategy',
        examStage: 'Prelims',
        gsPaper: 'GS-1',
        type: 'Static',
        importance: 'Medium',
        content: '',
        status: 'Draft',
        featured: false,
        pyqLinked: false
    });

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { addBlogApi } = await import('../../api/blogApi');
            const result = await addBlogApi(formData);
            if (result.success) {
                if (window.confirm('Blog published successfully! Do you want to view it on the Home Page now?')) {
                    navigate('/#blogs');
                } else {
                    navigate('/admin/blogs');
                }
            } else {
                alert(result.message || 'Failed to publish blog');
            }
        } catch (error) {
            console.error('Error publishing blog:', error);
            alert('An error occurred while publishing');
        }
    };

    return (
        <div className="dashboard-container admin-dashboard blog-management-page">
            {/* Mobile Sidebar Overlay */}
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

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><h2>SRIRAM's IAS</h2><span className="role-badge admin">Admin Panel</span></div>
                    <button
                        className="mobile-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Overview</a>
                    <div className="nav-section-title">Content & Media</div>
                    <a href="/admin/blogs" className="nav-item active"><i className="ri-article-line"></i>Blog Management</a>
                    <a href="/admin/content" className="nav-item"><i className="ri-folder-video-line"></i>Content Library</a>

                    <div className="nav-section-title">Academic Content</div>
                    <a href="/admin/courses" className="nav-item"><i className="ri-book-2-line"></i>Courses</a>
                    <a href="/admin/tests" className="nav-item"><i className="ri-file-list-3-line"></i>Test Management</a>
                    <a href="/admin/quizzes" className="nav-item"><i className="ri-questionnaire-line"></i>Topic Quizzes</a>

                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>
                <button onClick={handleLogout} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header sticky-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="menu-toggle-btn"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <button
                            onClick={() => navigate('/admin/blogs')}
                            className="btn-icon"
                            title="Back to Blogs"
                            style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                        >
                            <i className="ri-arrow-left-line"></i>
                        </button>
                        <div>
                            <h1>Write New Blog</h1>
                            <p>Create quality content for students</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                <div className="section" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit} className="blog-form-container" style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                        <div className="form-group mb-4">
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Blog Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter an engaging title"
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                            />
                        </div>

                        <div className="grid-2-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="Strategy">Strategy</option>
                                    <option value="Polity">Polity</option>
                                    <option value="Economy">Economy</option>
                                    <option value="History">History</option>
                                    <option value="Environment">Environment</option>
                                    <option value="Ethics">Ethics</option>
                                    <option value="Current Affairs">Current Affairs</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Exam Stage</label>
                                <select
                                    name="examStage"
                                    value={formData.examStage}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="Prelims">Prelims</option>
                                    <option value="Mains">Mains</option>
                                    <option value="Interview">Interview</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>GS Paper</label>
                                <select
                                    name="gsPaper"
                                    value={formData.gsPaper}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="GS-1">GS-1</option>
                                    <option value="GS-2">GS-2</option>
                                    <option value="GS-3">GS-3</option>
                                    <option value="GS-4">GS-4</option>
                                    <option value="Essay">Essay</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                >
                                    <option value="Static">Static</option>
                                    <option value="Current Affairs">Current Affairs</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Blog Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="form-textarea"
                                placeholder="Write your blog content here..."
                                rows="15"
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', resize: 'vertical', fontFamily: 'inherit' }}
                            ></textarea>
                            <p className="helper-text" style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>Use Markdown for formatting.</p>
                        </div>

                        <div className="settings-panel mb-4" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                            <h4 style={{ marginBottom: '1rem', color: '#334155' }}>Settings & Meta</h4>
                            <div className="grid-2-cols" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        style={{ width: '1.25rem', height: '1.25rem' }}
                                    />
                                    <span>Mark as Featured</span>
                                </label>
                                <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name="pyqLinked"
                                        checked={formData.pyqLinked}
                                        onChange={handleChange}
                                        style={{ width: '1.25rem', height: '1.25rem' }}
                                    />
                                    <span>Links to PYQs</span>
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
                                    <span style={{ fontWeight: 500 }}>Importance:</span>
                                    <select
                                        name="importance"
                                        value={formData.importance}
                                        onChange={handleChange}
                                        style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/blogs')}
                                className="btn btn-outline"
                                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', background: '#f1f5f9', color: '#334155', cursor: 'pointer' }}
                                onClick={() => alert('Saved as draft')}
                            >
                                Save Draft
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', background: '#4f46e5', color: 'white', cursor: 'pointer', fontWeight: 600 }}
                            >
                                Publish Blog
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
