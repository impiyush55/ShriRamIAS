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
                    className="sidebar-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div><h2>SRIRAM's IAS</h2><span className="role-badge admin">Admin Panel</span></div>
                    <button
                        className="mobile-close-btn bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Overview</a>
                    <div className="nav-section-title">Content & Media</div>
                    <a href="/admin/blogs" className="nav-item active"><i className="ri-article-line"></i>Blog Management</a>

                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>
                <button onClick={handleLogout} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header sticky-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>Blog Management</h1>
                            <p>Create and manage UPSC-related articles and current affairs</p>
                        </div>
                    </div>

                    <div className="header-actions flex flex-wrap gap-3 items-center">
                        <button className="btn btn-primary whitespace-nowrap" onClick={() => navigate('/admin/blogs/create')}>
                            <i className="ri-edit-box-line"></i> Write New Blog
                        </button>
                        <div className="user-info">
                            <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        </div>
                    </div>
                </header>

                <div className="section max-w-[1400px] mx-auto">

                    {/* Dashboard Summary Cards */}
                    <div className="blog-stats-grid">
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-indigo-100 text-indigo-700">
                                <i className="ri-article-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Total Blogs</h4>
                                <p>{stats.total}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-emerald-100 text-emerald-700">
                                <i className="ri-check-double-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Published</h4>
                                <p>{stats.published}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-slate-100 text-slate-700">
                                <i className="ri-draft-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Drafts</h4>
                                <p>{stats.drafts}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-amber-100 text-amber-800">
                                <i className="ri-time-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Pending Review</h4>
                                <p>{stats.review}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-fuchsia-100 text-fuchsia-700">
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
                                            <div className="action-buttons justify-end">
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
                            <div className="empty-state p-12 text-center text-slate-500">
                                <i className="ri-article-line text-5xl mb-4 block opacity-50"></i>
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
                                <i className="ri-image-line text-5xl"></i>
                                <span className="block mt-4">Featured Image</span>
                            </div>

                            <div className="drawer-section">
                                <h4>Summary</h4>
                                <p className="leading-relaxed text-slate-600">
                                    This blog covers key aspects of {selectedBlog.category} specifically tailored for {selectedBlog.examStage}.
                                    It includes detailed analysis relevant to {selectedBlog.gsPaper}.
                                </p>
                            </div>

                            <div className="drawer-section">
                                <h4>Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-xs text-slate-400">Author</label> <span className="font-medium">{selectedBlog.author}</span></div>
                                    <div><label className="block text-xs text-slate-400">Date</label> <span className="font-medium">{selectedBlog.date}</span></div>
                                    <div><label className="block text-xs text-slate-400">GS Paper</label> <span className="font-medium">{selectedBlog.gsPaper}</span></div>
                                    <div><label className="block text-xs text-slate-400">Importance</label> <span className="badge-pill badge-outline py-0.5 px-2">{selectedBlog.importance}</span></div>
                                </div>
                            </div>

                            <div className="drawer-section">
                                <h4>Attributes</h4>
                                <div className="flex gap-6">
                                    <div className={`flex items-center gap-2 ${selectedBlog.pyqLinked ? 'opacity-100' : 'opacity-40'}`}>
                                        <i className="ri-links-line indicator-icon visible"></i>
                                        <span className="text-[0.85rem]">PYQ Linked</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${selectedBlog.featured ? 'opacity-100' : 'opacity-40'}`}>
                                        <i className="ri-star-fill indicator-icon active"></i>
                                        <span className="text-[0.85rem]">Featured</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className={`ri-eye-${selectedBlog.seoScore > 50 ? 'fill' : 'off-line'} ${selectedBlog.seoScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`}></i>
                                        <span className="text-[0.85rem]">SEO Score: {selectedBlog.seoScore}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="drawer-section mt-auto">
                                <button className="btn btn-primary w-full">Edit Blog Content</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
