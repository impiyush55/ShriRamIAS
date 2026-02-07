import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/blog-management.css';

// Dummy Current Affairs Data
const dummyCurrentAffairs = [
    {
        id: 1,
        title: 'Monthly Current Affairs Magazine - January 2024',
        type: 'Magazine',
        category: 'Comprehensive',
        format: 'PDF',
        status: 'Published',
        date: '2024-01-31',
        downloads: 2450,
        pages: 120,
        size: '15 MB',
        topics: 'Polity, Economy, International Relations',
        importance: 'High'
    },
    {
        id: 2,
        title: 'Daily Current Affairs - 5th February 2024',
        type: 'Daily News',
        category: 'Economy',
        format: 'Article',
        status: 'Published',
        date: '2024-02-05',
        downloads: 890,
        pages: 5,
        size: '2 MB',
        topics: 'Budget 2024, Economic Survey',
        importance: 'High'
    },
    {
        id: 3,
        title: 'Weekly Current Affairs - Week 1, February 2024',
        type: 'Weekly Digest',
        category: 'Polity',
        format: 'PDF',
        status: 'Review',
        date: '2024-02-04',
        downloads: 0,
        pages: 25,
        size: '5 MB',
        topics: 'Supreme Court Judgments, Parliamentary Sessions',
        importance: 'Medium'
    },
    {
        id: 4,
        title: 'Daily Current Affairs - 4th February 2024',
        type: 'Daily News',
        category: 'International Relations',
        format: 'Article',
        status: 'Published',
        date: '2024-02-04',
        downloads: 1200,
        pages: 4,
        size: '1.5 MB',
        topics: 'India-US Relations, UNSC',
        importance: 'High'
    },
    {
        id: 5,
        title: 'Environment & Ecology - January Compilation',
        type: 'Topic-wise',
        category: 'Environment',
        format: 'PDF',
        status: 'Draft',
        date: '2024-01-28',
        downloads: 0,
        pages: 40,
        size: '8 MB',
        topics: 'Climate Change, Biodiversity, Pollution',
        importance: 'Medium'
    },
    {
        id: 6,
        title: 'Science & Technology Updates - January 2024',
        type: 'Topic-wise',
        category: 'Science & Tech',
        format: 'PDF',
        status: 'Published',
        date: '2024-01-25',
        downloads: 1850,
        pages: 30,
        size: '6 MB',
        topics: 'Space, AI, Biotechnology',
        importance: 'High'
    }
];

export default function CurrentAffairsManagement() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [currentAffairs, setCurrentAffairs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filters State
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadCurrentAffairs();
    }, []);

    const loadCurrentAffairs = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setCurrentAffairs(dummyCurrentAffairs);
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login');
    };

    // Derived Stats
    const stats = {
        total: currentAffairs.length,
        published: currentAffairs.filter(ca => ca.status === 'Published').length,
        drafts: currentAffairs.filter(ca => ca.status === 'Draft').length,
        review: currentAffairs.filter(ca => ca.status === 'Review').length,
        totalDownloads: currentAffairs.reduce((sum, ca) => sum + ca.downloads, 0)
    };

    // Filter Logic
    const filteredCurrentAffairs = currentAffairs.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.topics.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || item.type === filterType;
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchesSearch && matchesType && matchesCategory && matchesStatus;
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
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>

                    <a href="/admin/current-affairs" className="nav-item active"><i className="ri-newspaper-line"></i>Current Affairs</a>


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
                            <h1>Current Affairs Management</h1>
                            <p>Publish daily news, weekly digests, and monthly magazines</p>
                        </div>
                    </div>

                    <div className="header-actions flex flex-wrap gap-3 items-center">
                        <button className="btn btn-primary whitespace-nowrap">
                            <i className="ri-upload-cloud-line"></i> Upload New Content
                        </button>
                        <div className="user-info">
                            <div className="user-avatar">
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.name || 'Admin User'}</span>
                                <span className="user-email">{user?.email || 'admin@shriramias.com'}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="section max-w-[1400px] mx-auto">

                    {/* Dashboard Summary Cards */}
                    <div className="blog-stats-grid">
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-blue-100 text-blue-700">
                                <i className="ri-newspaper-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Total Content</h4>
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
                            <div className="stat-icon-wrapper bg-purple-100 text-purple-700">
                                <i className="ri-download-cloud-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Total Downloads</h4>
                                <p>{stats.totalDownloads}</p>
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
                                    placeholder="Search by title or topic..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="all">All Types</option>
                                <option value="Daily News">Daily News</option>
                                <option value="Weekly Digest">Weekly Digest</option>
                                <option value="Magazine">Monthly Magazine</option>
                                <option value="Topic-wise">Topic-wise</option>
                            </select>
                            <select className="filter-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                                <option value="all">All Categories</option>
                                <option value="Comprehensive">Comprehensive</option>
                                <option value="Polity">Polity</option>
                                <option value="Economy">Economy</option>
                                <option value="International Relations">International Relations</option>
                                <option value="Environment">Environment</option>
                                <option value="Science & Tech">Science & Tech</option>
                            </select>
                            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                                <option value="Review">Review</option>
                            </select>
                        </div>
                    </div>

                    {/* Current Affairs Table */}
                    <div className="blog-table-wrapper">
                        <table className="blog-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Format</th>
                                    <th>Status</th>
                                    <th>Published</th>
                                    <th>Downloads</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCurrentAffairs.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="blog-title-cell">
                                                <span>{item.title}</span>
                                                <div className="blog-meta-sub">
                                                    {item.pages} pages • {item.size} • {item.importance} Priority
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge-pill category-badge">{item.type}</span></td>
                                        <td><span className="badge-pill badge-outline">{item.category}</span></td>
                                        <td>{item.format}</td>
                                        <td>
                                            <span className={`badge-pill status-badge ${item.status.toLowerCase()}`}>
                                                {item.status === 'Published' && <i className="ri-checkbox-circle-line"></i>}
                                                {item.status === 'Draft' && <i className="ri-edit-circle-line"></i>}
                                                {item.status === 'Review' && <i className="ri-time-line"></i>}
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>{item.date}</td>
                                        <td>{item.downloads}</td>
                                        <td>
                                            <div className="action-buttons justify-end">
                                                <button className="btn-icon" title="View Details" onClick={() => setSelectedItem(item)}>
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Download">
                                                    <i className="ri-download-line"></i>
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
                        {filteredCurrentAffairs.length === 0 && (
                            <div className="empty-state p-12 text-center text-slate-500">
                                <i className="ri-newspaper-line text-5xl mb-4 block opacity-50"></i>
                                <p>No current affairs content found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Preview Drawer */}
            <div className={`details-drawer ${selectedItem ? 'open' : ''}`}>
                {selectedItem && (
                    <>
                        <div className="drawer-header">
                            <h3>Content Preview</h3>
                            <button className="drawer-close" onClick={() => setSelectedItem(null)}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="drawer-content">
                            <h2 className="drawer-title-large">{selectedItem.title}</h2>
                            <div className="cover-image-preview">
                                <i className="ri-file-pdf-line text-5xl"></i>
                                <span className="block mt-4">{selectedItem.format} Document</span>
                            </div>

                            <div className="drawer-section">
                                <h4>Summary</h4>
                                <p className="leading-relaxed text-slate-600">
                                    This {selectedItem.type} covers {selectedItem.topics}.
                                    It contains {selectedItem.pages} pages of comprehensive analysis and updates.
                                </p>
                            </div>

                            <div className="drawer-section">
                                <h4>Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-xs text-slate-400">Type</label> <span className="font-medium">{selectedItem.type}</span></div>
                                    <div><label className="block text-xs text-slate-400">Category</label> <span className="font-medium">{selectedItem.category}</span></div>
                                    <div><label className="block text-xs text-slate-400">Published</label> <span className="font-medium">{selectedItem.date}</span></div>
                                    <div><label className="block text-xs text-slate-400">Downloads</label> <span className="font-medium">{selectedItem.downloads}</span></div>
                                    <div><label className="block text-xs text-slate-400">File Size</label> <span className="font-medium">{selectedItem.size}</span></div>
                                    <div><label className="block text-xs text-slate-400">Pages</label> <span className="font-medium">{selectedItem.pages}</span></div>
                                </div>
                            </div>

                            <div className="drawer-section">
                                <h4>Topics Covered</h4>
                                <p className="text-slate-600">{selectedItem.topics}</p>
                            </div>

                            <div className="drawer-section mt-auto">
                                <button className="btn btn-primary w-full mb-2">
                                    <i className="ri-download-line"></i> Download PDF
                                </button>
                                <button className="btn btn-secondary w-full">
                                    <i className="ri-edit-line"></i> Edit Content
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
