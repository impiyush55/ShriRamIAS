import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/blog-management.css';

// Enhanced Dummy Blog Data
const dummyBlogs = [
    {
        id: 1,
        title: 'Strategy for UPSC Prelims 2024: 100 Day Plan',
        author: 'Dr. Sharma',
        category: 'Strategy',
        examStage: 'Prelims',
        gsPaper: 'GS-1',
        type: 'Static',
        status: 'Published',
        date: '2024-01-20',
        views: 1240,
        importance: 'High',
        pyqLinked: true,
        featured: true,
        seoScore: 92
    },
    {
        id: 2,
        title: 'Analysis of Interim Budget 2024',
        author: 'Priya Verma',
        category: 'Economy',
        examStage: 'Mains',
        gsPaper: 'GS-3',
        type: 'Current Affairs',
        status: 'Review',
        date: '2024-01-19',
        views: 0,
        importance: 'High',
        pyqLinked: false,
        featured: false,
        seoScore: 85
    },
    {
        id: 3,
        title: 'Understanding Anti-Defection Law',
        author: 'Rajan Singh',
        category: 'Polity',
        examStage: 'Prelims',
        gsPaper: 'GS-2',
        type: 'Static',
        status: 'Draft',
        date: '2024-01-18',
        views: 0,
        importance: 'Medium',
        pyqLinked: true,
        featured: false,
        seoScore: 0
    },
    {
        id: 4,
        title: 'Weekly Environment Current Affairs: Jan Week 3',
        author: 'Editorial Team',
        category: 'Environment',
        examStage: 'Prelims',
        gsPaper: 'GS-3',
        type: 'Current Affairs',
        status: 'Published',
        date: '2024-01-15',
        views: 3500,
        importance: 'Medium',
        pyqLinked: false,
        featured: true,
        seoScore: 88
    },
    {
        id: 5,
        title: 'Ethics Case Study: Crisis Management',
        author: 'Dr. K. Srinivas',
        category: 'Ethics',
        examStage: 'Mains',
        gsPaper: 'GS-4',
        type: 'Static',
        status: 'Published',
        date: '2024-01-12',
        views: 890,
        importance: 'High',
        pyqLinked: true,
        featured: false,
        seoScore: 95
    },
    {
        id: 6,
        title: 'Overcoming the Plateau in Preparation',
        author: 'Senior Mentor',
        category: 'Motivation',
        examStage: 'Mains',
        gsPaper: 'GS-4',
        type: 'Static',
        status: 'Published',
        date: '2025-12-20',
        views: 4500,
        importance: 'High',
        pyqLinked: false,
        featured: true,
        seoScore: 98
    },
    {
        id: 7,
        title: 'Policy Update: India\'s New Law',
        author: 'Legal Team',
        category: 'Current Affairs',
        examStage: 'Prelims',
        gsPaper: 'GS-2',
        type: 'Current Affairs',
        status: 'Published',
        date: '2025-12-18',
        views: 3200,
        importance: 'High',
        pyqLinked: true,
        featured: true,
        seoScore: 94
    },
    {
        id: 8,
        title: 'State PCS Preparation: UPPCS Strategy',
        author: 'State Exam Expert',
        category: 'Strategy',
        examStage: 'Prelims',
        gsPaper: 'GS-1',
        type: 'Static',
        status: 'Published',
        date: '2025-12-15',
        views: 2100,
        importance: 'Medium',
        pyqLinked: true,
        featured: false,
        seoScore: 88
    },
    {
        id: 9,
        title: 'State PCS Preparation: RAS Roadmap',
        author: 'State Exam Expert',
        category: 'Strategy',
        examStage: 'Prelims',
        gsPaper: 'GS-1',
        type: 'Static',
        status: 'Published',
        date: '2025-12-14',
        views: 1800,
        importance: 'Medium',
        pyqLinked: false,
        featured: false,
        seoScore: 85
    }
];

export default function BlogManagement() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filters State
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStage, setFilterStage] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setBlogs(dummyBlogs);
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    // Derived Stats
    const stats = {
        total: blogs.length,
        published: blogs.filter(b => b.status === 'Published').length,
        drafts: blogs.filter(b => b.status === 'Draft').length,
        review: blogs.filter(b => b.status === 'Review').length,
        thisMonth: blogs.filter(b => new Date(b.date).getMonth() === new Date().getMonth()).length
    };

    // Filter Logic
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
        const matchesStage = filterStage === 'all' || blog.examStage === filterStage;
        const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStage && matchesStatus;
    });

    if (loading) return <div className="dashboard-loading"><i className="ri-loader-4-line rotating"></i></div>;

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
                        <div>
                            <h1>Blog Management</h1>
                            <p>Create and manage UPSC-related articles and current affairs</p>
                        </div>
                    </div>

                    <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button className="btn btn-primary" onClick={() => navigate('/admin/blogs/create')}>
                            <i className="ri-edit-box-line"></i> Write New Blog
                        </button>
                        <div className="user-info">
                            <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        </div>
                    </div>
                </header>

                <div className="section" style={{ maxWidth: '1400px', margin: '0 auto' }}>

                    {/* Dashboard Summary Cards */}
                    <div className="blog-stats-grid">
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                                <i className="ri-article-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Total Blogs</h4>
                                <p>{stats.total}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper" style={{ background: '#dcfce7', color: '#166534' }}>
                                <i className="ri-check-double-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Published</h4>
                                <p>{stats.published}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper" style={{ background: '#f1f5f9', color: '#475569' }}>
                                <i className="ri-draft-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Drafts</h4>
                                <p>{stats.drafts}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper" style={{ background: '#ffedd5', color: '#9a3412' }}>
                                <i className="ri-time-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Pending Review</h4>
                                <p>{stats.review}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper" style={{ background: '#fae8ff', color: '#86198f' }}>
                                <i className="ri-calendar-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>This Month</h4>
                                <p>{stats.thisMonth}</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="blog-filters-bar">
                        <div className="filter-row">
                            <div className="search-field">
                                <i className="ri-search-line"></i>
                                <input
                                    type="text"
                                    placeholder="Search blogs by title, topic, or keyword"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                                <option value="all">All Categories</option>
                                <option value="Strategy">Strategy</option>
                                <option value="Polity">Polity</option>
                                <option value="Economy">Economy</option>
                                <option value="History">History</option>
                                <option value="Environment">Environment</option>
                                <option value="Ethics">Ethics</option>
                                <option value="Current Affairs">Current Affairs</option>
                            </select>
                            <select className="filter-select" value={filterStage} onChange={(e) => setFilterStage(e.target.value)}>
                                <option value="all">Exam Stage</option>
                                <option value="Prelims">Prelims</option>
                                <option value="Mains">Mains</option>
                            </select>
                            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                                <option value="Review">Review</option>
                            </select>
                        </div>
                    </div>

                    {/* Blog Table */}
                    <div className="blog-table-wrapper">
                        <table className="blog-table">
                            <thead>
                                <tr>
                                    <th>Blog Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Stage</th>
                                    <th>Content Type</th>
                                    <th>Status</th>
                                    <th>Published</th>
                                    <th>Views</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map(blog => (
                                    <tr key={blog.id}>
                                        <td>
                                            <div className="blog-title-cell">
                                                <span>{blog.title}</span>
                                                <div className="blog-meta-sub">
                                                    {blog.gsPaper} • {blog.importance} Priority
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-medium">{blog.author}</td>
                                        <td><span className="badge-pill category-badge">{blog.category}</span></td>
                                        <td><span className="badge-pill badge-outline">{blog.examStage}</span></td>
                                        <td>{blog.type}</td>
                                        <td>
                                            <span className={`badge-pill status-badge ${blog.status.toLowerCase()}`}>
                                                {blog.status === 'Published' && <i className="ri-checkbox-circle-line"></i>}
                                                {blog.status === 'Draft' && <i className="ri-edit-circle-line"></i>}
                                                {blog.status === 'Review' && <i className="ri-time-line"></i>}
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td>{blog.date}</td>
                                        <td>{blog.views}</td>
                                        <td>
                                            <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                                                <button className="btn-icon" title="View Details" onClick={() => setSelectedBlog(blog)}>
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Edit">
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Delete">
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredBlogs.length === 0 && (
                            <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                                <i className="ri-article-line" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block', opacity: 0.5 }}></i>
                                <p>No blogs found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Preview Drawer */}
            <div className={`details-drawer ${selectedBlog ? 'open' : ''}`}>
                {selectedBlog && (
                    <>
                        <div className="drawer-header">
                            <h3>Blog Preview</h3>
                            <button className="drawer-close" onClick={() => setSelectedBlog(null)}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="drawer-content">
                            <h2 className="drawer-title-large">{selectedBlog.title}</h2>
                            <div className="cover-image-preview">
                                <i className="ri-image-line" style={{ fontSize: '3rem' }}></i>
                                <span style={{ display: 'block', marginTop: '1rem' }}>Featured Image</span>
                            </div>

                            <div className="drawer-section">
                                <h4>Summary</h4>
                                <p style={{ lineHeight: 1.6, color: '#475569' }}>
                                    This blog covers key aspects of {selectedBlog.category} specifically tailored for {selectedBlog.examStage}.
                                    It includes detailed analysis relevant to {selectedBlog.gsPaper}.
                                </p>
                            </div>

                            <div className="drawer-section">
                                <h4>Details</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>Author</label> <span className="font-medium">{selectedBlog.author}</span></div>
                                    <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>Date</label> <span className="font-medium">{selectedBlog.date}</span></div>
                                    <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>GS Paper</label> <span className="font-medium">{selectedBlog.gsPaper}</span></div>
                                    <div><label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>Importance</label> <span className="badge-pill badge-outline" style={{ padding: '0.1rem 0.5rem' }}>{selectedBlog.importance}</span></div>
                                </div>
                            </div>

                            <div className="drawer-section">
                                <h4>Attributes</h4>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: selectedBlog.pyqLinked ? 1 : 0.4 }}>
                                        <i className="ri-links-line indicator-icon visible"></i>
                                        <span style={{ fontSize: '0.85rem' }}>PYQ Linked</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: selectedBlog.featured ? 1 : 0.4 }}>
                                        <i className="ri-star-fill indicator-icon active"></i>
                                        <span style={{ fontSize: '0.85rem' }}>Featured</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <i className={`ri-eye-${selectedBlog.seoScore > 50 ? 'fill' : 'off-line'}`} style={{ color: selectedBlog.seoScore > 80 ? '#10b981' : '#f59e0b' }}></i>
                                        <span style={{ fontSize: '0.85rem' }}>SEO Score: {selectedBlog.seoScore}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="drawer-section" style={{ marginTop: 'auto' }}>
                                <button className="btn btn-primary" style={{ width: '100%' }}>Edit Blog Content</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
