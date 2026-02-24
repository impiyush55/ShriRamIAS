/**
 * COUPON MANAGEMENT PAGE
 * Create and manage discount coupons and promotional offers
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/blog-management.css';

// Dummy Coupon Data
const dummyCoupons = [
    {
        id: 1,
        code: 'WELCOME50',
        description: 'Welcome offer for new students',
        type: 'Percentage',
        discount: 50,
        minPurchase: 999,
        maxDiscount: 500,
        validFrom: '2024-01-01',
        validUntil: '2024-12-31',
        usageLimit: 100,
        usedCount: 45,
        status: 'Active',
        applicableOn: 'All Courses'
    },
    {
        id: 2,
        code: 'PRELIMS2024',
        description: 'Special discount for Prelims courses',
        type: 'Flat',
        discount: 300,
        minPurchase: 1500,
        maxDiscount: 300,
        validFrom: '2024-02-01',
        validUntil: '2024-06-30',
        usageLimit: 200,
        usedCount: 128,
        status: 'Active',
        applicableOn: 'Prelims Courses'
    },
    {
        id: 3,
        code: 'MAINS100',
        description: 'Flat ₹100 off on Mains courses',
        type: 'Flat',
        discount: 100,
        minPurchase: 500,
        maxDiscount: 100,
        validFrom: '2024-01-15',
        validUntil: '2024-03-15',
        usageLimit: 50,
        usedCount: 50,
        status: 'Expired',
        applicableOn: 'Mains Courses'
    },
    {
        id: 4,
        code: 'EARLYBIRD20',
        description: 'Early bird discount - 20% off',
        type: 'Percentage',
        discount: 20,
        minPurchase: 2000,
        maxDiscount: 1000,
        validFrom: '2024-02-10',
        validUntil: '2024-02-28',
        usageLimit: 150,
        usedCount: 0,
        status: 'Scheduled',
        applicableOn: 'All Courses'
    },
    {
        id: 5,
        code: 'FLASH500',
        description: 'Flash sale - ₹500 instant discount',
        type: 'Flat',
        discount: 500,
        minPurchase: 3000,
        maxDiscount: 500,
        validFrom: '2024-02-05',
        validUntil: '2024-02-07',
        usageLimit: 75,
        usedCount: 72,
        status: 'Active',
        applicableOn: 'Premium Courses'
    },
    {
        id: 6,
        code: 'STUDENT15',
        description: 'Student special - 15% discount',
        type: 'Percentage',
        discount: 15,
        minPurchase: 1000,
        maxDiscount: 750,
        validFrom: '2024-01-01',
        validUntil: '2024-12-31',
        usageLimit: 500,
        usedCount: 234,
        status: 'Active',
        applicableOn: 'All Courses'
    }
];

export default function CouponManagement() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filters State
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setCoupons(dummyCoupons);
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login');
    };

    // Derived Stats
    const stats = {
        total: coupons.length,
        active: coupons.filter(c => c.status === 'Active').length,
        expired: coupons.filter(c => c.status === 'Expired').length,
        scheduled: coupons.filter(c => c.status === 'Scheduled').length,
        totalUsage: coupons.reduce((sum, c) => sum + c.usedCount, 0),
        totalSavings: coupons.reduce((sum, c) => {
            if (c.type === 'Flat') {
                return sum + (c.discount * c.usedCount);
            } else {
                // Approximate savings for percentage discounts
                return sum + (c.maxDiscount * c.usedCount * 0.7);
            }
        }, 0)
    };

    // Filter Logic
    const filteredCoupons = coupons.filter(item => {
        const matchesSearch = item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || item.type === filterType;
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
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
                    <div className="nav-section-title">Sales & Marketing</div>
                    <a href="/admin/coupons" className="nav-item active"><i className="ri-ticket-2-line"></i>Coupon Management</a>
                </nav>

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
                            <h1>Coupon Management</h1>
                            <p>Create and manage discount coupons and promotional offers</p>
                        </div>
                    </div>

                    <div className="header-actions flex flex-wrap gap-3 items-center">
                        <button className="btn btn-primary whitespace-nowrap">
                            <i className="ri-add-circle-line"></i> Create New Coupon
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
                            <div className="stat-icon-wrapper bg-purple-100 text-purple-700">
                                <i className="ri-ticket-2-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Total Coupons</h4>
                                <p>{stats.total}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-emerald-100 text-emerald-700">
                                <i className="ri-checkbox-circle-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Active Coupons</h4>
                                <p>{stats.active}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-blue-100 text-blue-700">
                                <i className="ri-calendar-check-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Scheduled</h4>
                                <p>{stats.scheduled}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-slate-100 text-slate-700">
                                <i className="ri-time-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Expired</h4>
                                <p>{stats.expired}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-amber-100 text-amber-700">
                                <i className="ri-shopping-cart-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Total Usage</h4>
                                <p>{stats.totalUsage}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-green-100 text-green-700">
                                <i className="ri-money-rupee-circle-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Total Savings</h4>
                                <p>₹{Math.round(stats.totalSavings).toLocaleString()}</p>
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
                                    placeholder="Search by code or description..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="all">All Types</option>
                                <option value="Percentage">Percentage</option>
                                <option value="Flat">Flat Discount</option>
                            </select>
                            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Expired">Expired</option>
                            </select>
                        </div>
                    </div>

                    {/* Coupons Table */}
                    <div className="blog-table-wrapper">
                        <table className="blog-table">
                            <thead>
                                <tr>
                                    <th>Coupon Code</th>
                                    <th>Type</th>
                                    <th>Discount</th>
                                    <th>Usage</th>
                                    <th>Validity</th>
                                    <th>Status</th>
                                    <th>Applicable On</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoupons.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="blog-title-cell">
                                                <span className="font-bold text-indigo-600 text-lg">{item.code}</span>
                                                <div className="blog-meta-sub">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge-pill category-badge">{item.type}</span></td>
                                        <td>
                                            <span className="font-semibold text-green-600">
                                                {item.type === 'Percentage' ? `${item.discount}%` : `₹${item.discount}`}
                                            </span>
                                            {item.type === 'Percentage' && (
                                                <div className="text-xs text-slate-500">Max: ₹{item.maxDiscount}</div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.usedCount} / {item.usageLimit}</span>
                                                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                                                    <div
                                                        className="bg-indigo-600 h-1.5 rounded-full"
                                                        style={{ width: `${(item.usedCount / item.usageLimit) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                <div>{item.validFrom}</div>
                                                <div className="text-slate-500">to {item.validUntil}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge-pill status-badge ${item.status === 'Active' ? 'published' :
                                                item.status === 'Scheduled' ? 'review' :
                                                    'draft'
                                                }`}>
                                                {item.status === 'Active' && <i className="ri-checkbox-circle-line"></i>}
                                                {item.status === 'Scheduled' && <i className="ri-calendar-check-line"></i>}
                                                {item.status === 'Expired' && <i className="ri-time-line"></i>}
                                                {item.status}
                                            </span>
                                        </td>
                                        <td><span className="text-sm">{item.applicableOn}</span></td>
                                        <td>
                                            <div className="action-buttons justify-end">
                                                <button className="btn-icon" title="View Details" onClick={() => setSelectedCoupon(item)}>
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Edit">
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Copy Code">
                                                    <i className="ri-file-copy-line"></i>
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
                        {filteredCoupons.length === 0 && (
                            <div className="empty-state p-12 text-center text-slate-500">
                                <i className="ri-ticket-2-line text-5xl mb-4 block opacity-50"></i>
                                <p>No coupons found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Preview Drawer */}
            <div className={`details-drawer ${selectedCoupon ? 'open' : ''}`}>
                {selectedCoupon && (
                    <>
                        <div className="drawer-header">
                            <h3>Coupon Details</h3>
                            <button className="drawer-close" onClick={() => setSelectedCoupon(null)}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="drawer-content">
                            <div className="text-center mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <h2 className="text-3xl font-bold text-indigo-600 mb-2">{selectedCoupon.code}</h2>
                                <p className="text-slate-600">{selectedCoupon.description}</p>
                            </div>

                            <div className="drawer-section">
                                <h4>Discount Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-400">Type</label>
                                        <span className="font-medium">{selectedCoupon.type}</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400">Discount</label>
                                        <span className="font-medium text-green-600 text-lg">
                                            {selectedCoupon.type === 'Percentage' ? `${selectedCoupon.discount}%` : `₹${selectedCoupon.discount}`}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400">Min Purchase</label>
                                        <span className="font-medium">₹{selectedCoupon.minPurchase}</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400">Max Discount</label>
                                        <span className="font-medium">₹{selectedCoupon.maxDiscount}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="drawer-section">
                                <h4>Validity Period</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-400">Valid From</label>
                                        <span className="font-medium">{selectedCoupon.validFrom}</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400">Valid Until</label>
                                        <span className="font-medium">{selectedCoupon.validUntil}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="drawer-section">
                                <h4>Usage Statistics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-400">Used</label>
                                        <span className="font-medium">{selectedCoupon.usedCount}</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400">Limit</label>
                                        <span className="font-medium">{selectedCoupon.usageLimit}</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400">Status</label>
                                        <span className="badge-pill badge-outline py-0.5 px-2">{selectedCoupon.status}</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400">Applicable On</label>
                                        <span className="font-medium">{selectedCoupon.applicableOn}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="drawer-section mt-auto">
                                <button className="btn btn-primary w-full mb-2">
                                    <i className="ri-file-copy-line"></i> Copy Coupon Code
                                </button>
                                <button className="btn btn-secondary w-full">
                                    <i className="ri-edit-line"></i> Edit Coupon
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
