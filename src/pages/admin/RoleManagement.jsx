/**
 * ROLE MANAGEMENT & PERMISSIONS
 * Manage staff members (Admins, Faculty) and define access controls
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function RoleManagement() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('staff'); // 'staff' or 'permissions'

    // Staff Data (Mock)
    const [staff, setStaff] = useState([
        { id: 1, name: 'Admin User', email: 'admin@shriramias.com', role: 'Super Admin', status: 'Active', lastLogin: '2026-02-07 10:00 AM' },
        { id: 2, name: 'Dr. Rajesh Kumar', email: 'rajesh.k@shriramias.com', role: 'Faculty', status: 'Active', lastLogin: '2026-02-06 02:30 PM' },
        { id: 3, name: 'Sarah Jenkins', email: 'sarah.j@shriramias.com', role: 'Content Manager', status: 'Active', lastLogin: '2026-02-07 09:15 AM' },
        { id: 4, name: 'Support Team', email: 'support@shriramias.com', role: 'Support Agent', status: 'Offline', lastLogin: '2026-02-05 06:00 PM' },
    ]);

    // Role Definitions (Mock)
    const [roles, setRoles] = useState([
        { id: 'super_admin', name: 'Super Admin', users: 1, desc: 'Full access to all modules' },
        { id: 'faculty', name: 'Faculty', users: 12, desc: 'Can manage courses, live classes, and view student progress' },
        { id: 'content_mgr', name: 'Content Manager', users: 3, desc: 'Can manage blogs, library, and static content' },
        { id: 'support', name: 'Support Agent', users: 5, desc: 'Can view enquiries and manage support tickets' },
    ]);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const handleAddStaff = () => {
        alert('Open modal to add new staff member');
    };

    const handleEditRole = (roleId) => {
        alert(`Edit permissions for role: ${roleId}`);
    };

    return (
        <div className="dashboard-container admin-dashboard">
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div><h2>SRIRAM's IAS</h2><span className="role-badge admin">Admin</span></div>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>

                    <div className="nav-section-title">User & Content Admin</div>

                    <a href="/admin/roles-permissions" className="nav-item active"><i className="ri-shield-user-line"></i>Roles & Permissions</a>

                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><i className="ri-menu-2-line"></i></button>
                        <div><h1>Roles & Permissions</h1><p>Manage staff access and security policies</p></div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                <div className="tabs-container" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '2rem' }}>
                    <button
                        className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
                        onClick={() => setActiveTab('staff')}
                        style={{ padding: '0.75rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'staff' ? '2px solid #3b82f6' : '2px solid transparent', fontWeight: 600, color: activeTab === 'staff' ? '#3b82f6' : '#6b7280', cursor: 'pointer' }}
                    >
                        Staff Directory
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'permissions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('permissions')}
                        style={{ padding: '0.75rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'permissions' ? '2px solid #3b82f6' : '2px solid transparent', fontWeight: 600, color: activeTab === 'permissions' ? '#3b82f6' : '#6b7280', cursor: 'pointer' }}
                    >
                        Role Definitions
                    </button>
                </div>

                {activeTab === 'staff' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div className="search-group" style={{ minWidth: '300px' }}>
                                <i className="ri-search-line"></i>
                                <input type="text" placeholder="Search staff..." className="search-input" />
                            </div>
                            <button className="btn btn-primary" onClick={handleAddStaff}><i className="ri-user-add-line"></i> Add New Staff</button>
                        </div>

                        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                    <tr>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Staff Name</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Role</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Last Login</th>
                                        <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#6b7280' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staff.map(s => (
                                        <tr key={s.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: 600, color: '#111827' }}>{s.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{s.email}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span className={`role-badge ${s.role.toLowerCase().replace(' ', '-')}`}>{s.role}</span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: s.status === 'Active' ? '#059669' : '#9ca3af', background: s.status === 'Active' ? '#d1fae5' : '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '999px' }}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{s.lastLogin}</td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <button className="btn-icon"><i className="ri-more-2-fill"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'permissions' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {roles.map(role => (
                            <div key={role.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#111827' }}>{role.name}</div>
                                    <button className="btn-icon" onClick={() => handleEditRole(role.id)}><i className="ri-settings-3-line"></i></button>
                                </div>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem', minHeight: '40px' }}>{role.desc}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ display: 'flex' }}>
                                            {[...Array(Math.min(3, role.users))].map((_, i) => (
                                                <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e5e7eb', border: '2px solid white', marginLeft: i > 0 ? '-8px' : '0' }}></div>
                                            ))}
                                        </div>
                                        <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 600 }}>{role.users} Users</span>
                                    </div>
                                    <button className="text-blue-600 text-sm font-semibold hover:underline">Manage Access</button>
                                </div>
                            </div>
                        ))}
                        <div style={{ border: '2px dashed #d1d5db', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', cursor: 'pointer', flexDirection: 'column', gap: '1rem', color: '#6b7280' }}>
                            <i className="ri-shield-keyhole-line" style={{ fontSize: '2rem' }}></i>
                            <span style={{ fontWeight: 600 }}>Create New Role</span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
