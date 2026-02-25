/**
 * HOMEPAGE CONTENT MANAGEMENT
 * Manage sections of the homepage (Hero, Features, Testimonials, etc.)
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function HomepageContent() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sections, setSections] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [editingSection, setEditingSection] = useState(null);

    // Mock Homepage Sections Data
    const mockSections = [
        { id: 1, title: 'Hero Banner', key: 'hero_banner', lastUpdated: '2026-02-08', status: 'Published' },
        { id: 2, title: 'About Us Summary', key: 'about_summary', lastUpdated: '2026-01-20', status: 'Published' },
        { id: 3, title: 'Key Features', key: 'features', lastUpdated: '2025-12-15', status: 'Published' },
        { id: 4, title: 'Testimonials', key: 'testimonials', lastUpdated: '2026-02-05', status: 'Published' },
        { id: 5, title: 'Call to Action', key: 'cta_section', lastUpdated: '2026-01-10', status: 'Published' },
    ];

    useEffect(() => {
        setUser(getCurrentUser());
        setSections(mockSections);
    }, []);

    const handleEdit = (section) => {
        setEditingSection(section);
        setIsEditDrawerOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Mock save logic
        setSections(prev => prev.map(s => s.id === editingSection.id ? editingSection : s));
        setIsEditDrawerOpen(false);
        alert('Section updated successfully!');
    };

    const toggleStatus = (id) => {
        setSections(prev => prev.map(s => {
            if (s.id === id) {
                return { ...s, status: s.status === 'Published' ? 'Draft' : 'Published' };
            }
            return s;
        }));
    };

    const filteredSections = sections.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.key.toLowerCase().includes(searchQuery.toLowerCase())
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

                    <a href="/admin/homepage-content" className="nav-item active"><i className="ri-home-4-line"></i>Homepage Content</a>



                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        {/* Removed menu toggle button as per previous request */}
                        <div><h1>Homepage Content</h1><p>Manage homepage sections and layout</p></div>
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
                        <input type="text" placeholder="Search sections..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                    </div>
                    {/* Add New Section Button - Optional if fixed sections */}
                    <button className="btn btn-primary" onClick={() => { setEditingSection({ id: Date.now(), title: '', key: '', status: 'Draft' }); setIsEditDrawerOpen(true); }}>
                        <i className="ri-add-line"></i> Add New Section
                    </button>
                </div>

                {/* Responsive Table */}
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Section Title</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Key</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Last Updated</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#6b7280' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSections.map(section => (
                                <tr key={section.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: '#111827' }}>{section.title}</td>
                                    <td style={{ padding: '1rem', color: '#6b7280', fontFamily: 'monospace' }}>{section.key}</td>
                                    <td style={{ padding: '1rem', color: '#374151' }}>{section.lastUpdated}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span
                                            onClick={() => toggleStatus(section.id)}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                background: section.status === 'Published' ? '#d1fae5' : '#f3f4f6',
                                                color: section.status === 'Published' ? '#065f46' : '#374151'
                                            }}
                                        >
                                            {section.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button className="btn-icon" onClick={() => handleEdit(section)} title="Edit">
                                            <i className="ri-edit-line"></i>
                                        </button>
                                        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-icon" title="View Live">
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
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{editingSection?.id ? 'Edit Section' : 'Add Section'}</h2>
                            <button onClick={() => setIsEditDrawerOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}><i className="ri-close-line"></i></button>
                        </div>
                        <form style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }} onSubmit={handleSave}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Section Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={editingSection?.title || ''}
                                    onChange={e => setEditingSection({ ...editingSection, title: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Key (Identifier)</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={editingSection?.key || ''}
                                    onChange={e => setEditingSection({ ...editingSection, key: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Content Data (JSON/HTML)</label>
                                <textarea
                                    className="input-field"
                                    rows="15"
                                    placeholder="Enter content here..."
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontFamily: 'monospace' }}
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
