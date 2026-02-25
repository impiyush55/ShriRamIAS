/**
 * CMS PAGES MANAGEMENT
 * Manage static pages content, SEO, and visibility.
 * Mobile Responsive Design.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function CMSPages() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [pages, setPages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [editingPage, setEditingPage] = useState(null);

    // Mock CMS Data
    const mockPages = [
        { id: 1, title: 'About Us', slug: 'about-us', status: 'Published', lastUpdated: '2026-01-15' },
        { id: 2, title: 'Terms & Conditions', slug: 'terms', status: 'Published', lastUpdated: '2025-12-10' },
        { id: 3, title: 'Privacy Policy', slug: 'privacy-policy', status: 'Published', lastUpdated: '2025-11-20' },
        { id: 4, title: 'Contact Us', slug: 'contact', status: 'Published', lastUpdated: '2026-02-01' },
        { id: 5, title: 'FAQ', slug: 'faq', status: 'Draft', lastUpdated: '2026-02-08' },
    ];

    useEffect(() => {
        setUser(getCurrentUser());
        setPages(mockPages);
    }, []);

    const handleEdit = (page) => {
        setEditingPage(page);
        setIsEditDrawerOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Mock save logic
        setPages(prev => prev.map(p => p.id === editingPage.id ? editingPage : p));
        setIsEditDrawerOpen(false);
        alert('Page updated successfully!');
    };

    const toggleStatus = (id) => {
        setPages(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, status: p.status === 'Published' ? 'Draft' : 'Published' };
            }
            return p;
        }));
    };

    const filteredPages = pages.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard-container admin-dashboard">
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div><h2>LMS</h2><span className="role-badge admin">Admin</span></div>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>

                    <div className="nav-section-title">User & Content Admin</div>

                    <a href="/admin/cms-pages" className="nav-item active"><i className="ri-pages-line"></i>CMS Pages</a>



                </nav>
                <button onClick={async () => { await logoutApi(); navigate('/login.html'); }} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">

                        <div><h1>CMS Pages</h1><p>Manage static website content</p></div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                {/* Controls */}
                <div className="unified-controls" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div className="search-group" style={{ flex: 1, minWidth: '250px' }}>
                        <i className="ri-search-line"></i>
                        <input type="text" placeholder="Search pages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                    </div>
                    <button className="btn btn-primary" onClick={() => { setEditingPage({ id: Date.now(), title: '', slug: '', status: 'Draft' }); setIsEditDrawerOpen(true); }}>
                        <i className="ri-add-line"></i> Create New Page
                    </button>
                </div>

                {/* Responsive Table */}
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Page Title</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Slug</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Last Updated</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#6b7280' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPages.map(page => (
                                <tr key={page.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: '#111827' }}>{page.title}</td>
                                    <td style={{ padding: '1rem', color: '#6b7280', fontFamily: 'monospace' }}>/{page.slug}</td>
                                    <td style={{ padding: '1rem', color: '#374151' }}>{page.lastUpdated}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span
                                            onClick={() => toggleStatus(page.id)}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                background: page.status === 'Published' ? '#d1fae5' : '#f3f4f6',
                                                color: page.status === 'Published' ? '#065f46' : '#374151'
                                            }}
                                        >
                                            {page.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button className="btn-icon" onClick={() => handleEdit(page)} title="Edit">
                                            <i className="ri-edit-line"></i>
                                        </button>
                                        <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="btn-icon" title="View Live">
                                            <i className="ri-external-link-line"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Edit Drawer */}
            {isEditDrawerOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setIsEditDrawerOpen(false)}></div>
                    <div style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '100%',
                        maxWidth: '500px',
                        background: 'white',
                        boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column'
                    }} className="drawer-animate-in">
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{editingPage?.id ? 'Edit Page' : 'Create Page'}</h2>
                            <button onClick={() => setIsEditDrawerOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}><i className="ri-close-line"></i></button>
                        </div>
                        <form style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }} onSubmit={handleSave}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Page Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={editingPage?.title || ''}
                                    onChange={e => setEditingPage({ ...editingPage, title: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Slug (URL)</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={editingPage?.slug || ''}
                                    onChange={e => setEditingPage({ ...editingPage, slug: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Page Content (HTML/Markdown)</label>
                                <textarea
                                    className="input-field"
                                    rows="10"
                                    placeholder="Enter page content here..."
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontFamily: 'monospace' }}
                                ></textarea>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>SEO Meta Description</label>
                                <textarea
                                    className="input-field"
                                    rows="3"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
