/**
 * CONTENT LIBRARY PAGE
 * Manage videos, PDFs, and study materials
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy content data
const dummyContent = [
    { id: 1, title: 'Indian Polity - Lecture 1', type: 'video', size: '1.2 GB', date: '2024-01-20', category: 'Foundation', status: 'Published' },
    { id: 2, title: 'Modern History Notes PDF', type: 'pdf', size: '15 MB', date: '2024-01-19', category: 'Foundation', status: 'Published' },
    { id: 3, title: 'Economy Weekly Update', type: 'document', size: '2 MB', date: '2024-01-18', category: 'Current Affairs', status: 'Draft' },
    { id: 4, title: 'Geography Mains Q&A', type: 'pdf', size: '5 MB', date: '2024-01-17', category: 'Mains', status: 'Published' },
    { id: 5, title: 'Ethics Case Studies Video', type: 'video', size: '850 MB', date: '2024-01-16', category: 'Foundation', status: 'Published' },
    { id: 6, title: 'CSAT Practice Set', type: 'pdf', size: '8 MB', date: '2024-01-15', category: 'Prelims', status: 'Archived' },
];

export default function ContentLibrary() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setContents(dummyContent);
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video': return 'ri-video-line';
            case 'pdf': return 'ri-file-pdf-line';
            case 'document': return 'ri-file-text-line';
            default: return 'ri-file-line';
        }
    };

    if (loading) return <div className="dashboard-loading"><i className="ri-loader-4-line rotating"></i></div>;

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
                    <div className="nav-section-title">Academic Content</div>
                    <a href="/admin/courses" className="nav-item"><i className="ri-book-2-line"></i>Courses</a>
                    <a href="/admin/categories" className="nav-item"><i className="ri-folder-settings-line"></i>Categories</a>
                    <a href="/admin/content" className="nav-item active"><i className="ri-folder-video-line"></i>Content Library</a>
                    <a href="/admin/live-classes" className="nav-item"><i className="ri-live-line"></i>Live Classes</a>
                    <a href="/" className="nav-item"><i className="ri-home-line"></i>Back to Home</a>
                </nav>
                <button onClick={handleLogout} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
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
                        <div><h1>Content Library</h1><p>Manage all your digital assets</p></div>
                    </div>
                    <div className="user-info"><img src={user?.avatar} alt={user?.name} className="user-avatar" /><div><p className="user-name">{user?.name}</p></div></div>
                </header>

                <div className="section">
                    <div className="filters-bar">
                        <div className="search-group"><i className="ri-search-line"></i><input type="text" placeholder="Search files..." className="search-input" /></div>
                        <button className="btn btn-primary"><i className="ri-upload-cloud-line"></i> Upload Content</button>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead><tr><th>Name</th><th>Type</th><th>Size</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                            <tbody>
                                {contents.map(item => (
                                    <tr key={item.id}>
                                        <td><div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl text-indigo-500"><i className={getTypeIcon(item.type)}></i></div>
                                            <span className="font-semibold text-gray-700">{item.title}</span>
                                        </div></td>
                                        <td className="capitalize">{item.type}</td>
                                        <td>{item.size}</td>
                                        <td><span className="badge badge-warning bg-blue-50 text-blue-800">{item.category}</span></td>
                                        <td><span className={`status-badge ${item.status === 'Published' ? 'active' : item.status === 'Draft' ? 'pending' : 'inactive'}`}>{item.status}</span></td>
                                        <td>{item.date}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="Preview"><i className="ri-eye-line"></i></button>
                                                <button className="btn-icon" title="Download"><i className="ri-download-line"></i></button>
                                                <button className="btn-icon" title="Delete"><i className="ri-delete-bin-line"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
