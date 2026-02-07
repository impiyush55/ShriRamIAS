import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { getAllBanners, saveBanner, deleteBanner, toggleBannerStatus } from '../../data/bannerData';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function BannerManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    // UI State
    const [showModal, setShowModal] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);

    // Filter State
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        link: '',
        type: 'announcement',
        position: 'ticker',
        priority: 1,
        status: 'active'
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        const res = getAllBanners();
        if (res.success) {
            setBanners(res.data);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    // CRUD Handlers
    const handleOpenModal = (banner = null) => {
        if (banner) {
            setEditingBanner(banner);
            setFormData({
                title: banner.title,
                image: banner.image,
                link: banner.link,
                type: banner.type,
                position: banner.position,
                priority: banner.priority,
                status: banner.status
            });
        } else {
            setEditingBanner(null);
            setFormData({
                title: '',
                image: '',
                link: '',
                type: 'announcement',
                position: 'ticker',
                priority: 1,
                status: 'active'
            });
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData };
        if (editingBanner) payload.id = editingBanner.id;

        const res = saveBanner(payload);
        if (res.success) {
            loadData();
            setShowModal(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            deleteBanner(id);
            loadData();
        }
    };

    const handleToggleStatus = (id) => {
        toggleBannerStatus(id);
        loadData();
    };

    // Stats Calculation
    const getStats = () => {
        return {
            total: banners.length,
            active: banners.filter(b => b.status === 'active').length,
            announcements: banners.filter(b => b.type === 'announcement').length,
            ads: banners.filter(b => b.type === 'ad').length
        };
    };
    const stats = getStats();

    // Filter Logic
    const filteredBanners = banners.filter(banner => {
        const matchesType = filterType === 'all' || banner.type === filterType;
        const matchesSearch = banner.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading banners...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container admin-dashboard">
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

                    <a href="/admin/banners" className="nav-item active">
                        <i className="ri-advertisement-line"></i>
                        Banner Management
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
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>Banner Management</h1>
                            <p>Manage website announcements and advertisements</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar || "https://ui-avatars.com/api/?name=Admin"} alt={user?.name} className="user-avatar" />
                        <div>
                            <p className="user-name">{user?.name || "Admin User"}</p>
                            <p className="user-email">{user?.email || "admin@shriramias.com"}</p>
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-flag-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.total}</h3>
                            <p>Total Banners</p>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-checkbox-circle-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.active}</h3>
                            <p>Active Now</p>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-megaphone-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.announcements}</h3>
                            <p>Announcements</p>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-advertisement-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.ads}</h3>
                            <p>Advertisements</p>
                        </div>
                    </div>
                </div>

                {/* Filter & Data Section */}
                <div className="section">
                    <div className="filters-bar">
                        <div className="filter-group">
                            <label>Filter by Type:</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="filter-select"
                            >

                                <option value="announcement">Announcements</option>
                                <option value="ad">Advertisements</option>
                            </select>
                        </div>

                        <div className="search-group">
                            <i className="ri-search-line"></i>
                            <input
                                type="text"
                                placeholder="Search banners..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                            <i className="ri-add-circle-line"></i>
                            Add New Banner
                        </button>
                    </div>

                    {/* Table View */}
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '35%' }}>Title / Content</th>
                                    <th style={{ width: '15%' }}>Type</th>
                                    <th style={{ width: '12%' }}>Position</th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>Priority</th>
                                    <th style={{ width: '13%', textAlign: 'center' }}>Status</th>
                                    <th style={{ width: '15%', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBanners.map(banner => (
                                    <tr key={banner.id}>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.95rem' }}>{banner.title}</span>
                                                {banner.link && (
                                                    <a href={banner.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <i className="ri-link"></i> {banner.link}
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${banner.type === 'announcement' ? 'pending' : 'active'}`} style={{ backgroundColor: banner.type === 'announcement' ? '#eff6ff' : '#f3e8ff', color: banner.type === 'announcement' ? '#1d4ed8' : '#6b21a8' }}>
                                                {banner.type === 'announcement' ? <i className="ri-megaphone-line mr-1"></i> : <i className="ri-advertisement-line mr-1"></i>}
                                                {banner.type}
                                            </span>
                                        </td>
                                        <td style={{ textTransform: 'capitalize' }}>
                                            <i className={`ri-${banner.position === 'ticker' ? 'layout-top' : banner.position === 'popup' ? 'window' : 'layout-row'}-line mr-2 text-gray-400`}></i>
                                            {banner.position}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span style={{ display: 'inline-block', padding: '2px 8px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, color: '#4b5563' }}>
                                                #{banner.priority}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                onClick={() => handleToggleStatus(banner.id)}
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${banner.status === 'active' ? 'bg-green-500' : 'bg-gray-200'}`}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${banner.status === 'active' ? 'translate-x-5' : 'translate-x-0'}`}
                                                />
                                            </button>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => handleOpenModal(banner)}
                                                    className="btn-icon"
                                                    title="Edit"
                                                >
                                                    <i className="ri-pencil-line"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(banner.id)}
                                                    className="btn-icon"
                                                    style={{ color: '#ef4444', backgroundColor: '#fef2f2' }}
                                                    title="Delete"
                                                >
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredBanners.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af' }}>
                                                <i className="ri-search-line" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                                                <p>No banners found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 transition-opacity">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 animate-fade-in-up">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{editingBanner ? 'Edit Banner' : 'Create Banner'}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Configure banner details</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-200">
                                <i className="ri-close-line text-xl"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Banner Title / Content <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm transition-all shadow-sm placeholder-gray-400"
                                    placeholder="Enter content..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
                                    <div className="relative">
                                        <select
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm appearance-none bg-white shadow-sm transition-all"
                                        >
                                            <option value="announcement">Announcement</option>
                                            <option value="ad">Advertisement</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <i className="ri-arrow-down-s-line text-gray-400"></i>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Position</label>
                                    <div className="relative">
                                        <select
                                            value={formData.position}
                                            onChange={e => setFormData({ ...formData, position: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm appearance-none bg-white shadow-sm transition-all"
                                        >
                                            <option value="ticker">News Ticker</option>
                                            <option value="popup">Popup Modal</option>
                                            <option value="hero">Hero Section</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <i className="ri-arrow-down-s-line text-gray-400"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm transition-all"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Link <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
                                <input
                                    type="text"
                                    value={formData.link}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm transition-all"
                                    placeholder="/courses/..."
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-0">Priority:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.priority}
                                    onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                    className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all transform active:scale-95"
                                >
                                    {editingBanner ? 'Save Changes' : 'Create Banner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
