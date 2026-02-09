/**
 * TEST SERIES MANAGEMENT
 * Manage Test Series packages (Prelims, Mains, Integrated, etc.)
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function TestSeries() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [series, setSeries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [editingSeries, setEditingSeries] = useState(null);

    // Mock Test Series Data
    const mockSeries = [
        { id: 1, title: 'UPSC Prelims 2026 - Full Length', category: 'Prelims', price: 4999, testsCount: 25, students: 1250, status: 'Published' },
        { id: 2, title: 'UPSC Mains Answer Writing', category: 'Mains', price: 8999, testsCount: 20, students: 850, status: 'Published' },
        { id: 3, title: 'CSAT Qualifying Series', category: 'Prelims', price: 1999, testsCount: 10, students: 430, status: 'Published' },
        { id: 4, title: 'Sociology Optional Tests', category: 'Optional', price: 5999, testsCount: 12, students: 210, status: 'Draft' },
        { id: 5, title: 'Prelims + Mains Integrated', category: 'Integrated', price: 12999, testsCount: 45, students: 1560, status: 'Published' },
    ];

    useEffect(() => {
        setUser(getCurrentUser());
        setSeries(mockSeries);
    }, []);

    const handleEdit = (item) => {
        setEditingSeries(item);
        setIsEditDrawerOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Mock save logic
        setSeries(prev => prev.map(s => s.id === editingSeries.id ? editingSeries : s));
        setIsEditDrawerOpen(false);
        alert('Test Series updated successfully!');
    };

    const toggleStatus = (id) => {
        setSeries(prev => prev.map(s => {
            if (s.id === id) {
                return { ...s, status: s.status === 'Published' ? 'Draft' : 'Published' };
            }
            return s;
        }));
    };

    const filteredSeries = series.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard-container admin-dashboard">
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div><h2>SRIRAM's IAS</h2><span className="role-badge admin">Admin</span></div>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>



                    <div className="nav-section-title">Academic Tools</div>

                    <a href="/admin/test-series" className="nav-item active"><i className="ri-file-list-2-line"></i>Test Series</a>
                </nav>
                <button onClick={async () => { await logoutApi(); navigate('/login.html'); }} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        {/* No toggle button as per previous request */}
                        <div><h1>Test Series</h1><p>Manage test series packages and bundles</p></div>
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
                        <input type="text" placeholder="Search test series..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                    </div>
                    <button className="btn btn-primary" onClick={() => { setEditingSeries({ id: Date.now(), title: '', category: 'Prelims', price: 0, testsCount: 0, status: 'Draft' }); setIsEditDrawerOpen(true); }}>
                        <i className="ri-add-line"></i> Create Test Series
                    </button>
                </div>

                {/* Responsive Table */}
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Title</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Category</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Price</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Tests / Students</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#6b7280' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSeries.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: '#111827' }}>{item.title}</td>
                                    <td style={{ padding: '1rem' }}><span className="badge" style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{item.category}</span></td>
                                    <td style={{ padding: '1rem', color: '#374151', fontWeight: 600 }}>₹{item.price.toLocaleString()}</td>
                                    <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                        <div>{item.testsCount} Tests</div>
                                        <div style={{ fontSize: '0.75rem', marginTop: '2px' }}>{item.students} Active Students</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span
                                            onClick={() => toggleStatus(item.id)}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                background: item.status === 'Published' ? '#d1fae5' : '#f3f4f6',
                                                color: item.status === 'Published' ? '#065f46' : '#374151'
                                            }}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button className="btn-icon" onClick={() => handleEdit(item)} title="Edit">
                                            <i className="ri-edit-line"></i>
                                        </button>
                                        <button className="btn-icon" title="View Students">
                                            <i className="ri-group-line"></i>
                                        </button>
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
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{editingSeries?.id ? 'Edit Test Series' : 'New Test Series'}</h2>
                            <button onClick={() => setIsEditDrawerOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}><i className="ri-close-line"></i></button>
                        </div>
                        <form style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }} onSubmit={handleSave}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Series Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={editingSeries?.title || ''}
                                    onChange={e => setEditingSeries({ ...editingSeries, title: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Category</label>
                                <select
                                    className="input-field"
                                    value={editingSeries?.category || 'Prelims'}
                                    onChange={e => setEditingSeries({ ...editingSeries, category: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                >
                                    <option value="Prelims">Prelims</option>
                                    <option value="Mains">Mains</option>
                                    <option value="Integrated">Integrated (Prelims + Mains)</option>
                                    <option value="Optional">Optional Subject</option>
                                    <option value="CSAT">CSAT</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Price (₹)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={editingSeries?.price || 0}
                                        onChange={e => setEditingSeries({ ...editingSeries, price: parseInt(e.target.value) })}
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Total Tests</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={editingSeries?.testsCount || 0}
                                        onChange={e => setEditingSeries({ ...editingSeries, testsCount: parseInt(e.target.value) })}
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Description</label>
                                <textarea
                                    className="input-field"
                                    rows="4"
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
