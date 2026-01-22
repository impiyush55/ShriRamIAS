/**
 * ADMIN SETTINGS PAGE
 * System-wide configuration and preferences
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function AdminSettings() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const [saveStatus, setSaveStatus] = useState('');

    // Settings State
    const [settings, setSettings] = useState({
        siteName: "SRIRAM's IAS",
        supportEmail: "support@sriramias.com",
        supportPhone: "+91 98765 43210",
        maintenanceMode: false,
        allowRegistration: true,
        emailNotifications: true,
        smsNotifications: true,
        razorpayKey: "rzp_test_1234567890",
        razorpaySecret: "****************",
        twoFactorAuth: false,
        sessionTimeout: "30"
    });

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setSaveStatus('');
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSaveStatus('saving');

        // Simulate API call
        setTimeout(() => {
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(''), 3000);
        }, 1000);
    };

    return (
        <div className="dashboard-container admin-dashboard">
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

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2>SRIRAM's IAS</h2>
                        <span className="role-badge admin">Admin Panel</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard Overview
                    </a>

                    <div className="nav-section-title">User Management</div>
                    <a href="/admin/users" className="nav-item">
                        <i className="ri-user-settings-line"></i>
                        User & Roles
                    </a>
                    <a href="/admin/enquiries" className="nav-item">
                        <i className="ri-customer-service-2-line"></i>
                        Enquiries
                    </a>

                    <div className="nav-section-title">Communication</div>
                    <a href="/admin/notifications" className="nav-item">
                        <i className="ri-notification-3-line"></i>
                        Notifications
                    </a>
                    <a href="/admin/support" className="nav-item">
                        <i className="ri-customer-service-line"></i>
                        Support Desk
                    </a>

                    {/* Copied from other pages for consistency */}
                    <div className="nav-section-title">System</div>
                    <a href="/admin/analytics" className="nav-item">
                        <i className="ri-bar-chart-box-line"></i>
                        Analytics & Reports
                    </a>
                    <div className="nav-item active">
                        <i className="ri-settings-3-line"></i>
                        Settings
                    </div>
                </nav>

                <button onClick={handleLogout} className="logout-btn">
                    <i className="ri-logout-box-line"></i>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="menu-toggle-btn"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>System Settings</h1>
                            <p>Configure platform preferences and integrations</p>
                        </div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div>
                            <p className="user-name">{user?.name}</p>
                            <p className="user-email">{user?.email}</p>
                        </div>
                    </div>
                </header>

                <div className="settings-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Settings Tabs */}
                    <div className="settings-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
                        {['general', 'security', 'notifications', 'payment'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '1rem 1.5rem',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: activeTab === tab ? '2px solid #4f46e5' : '2px solid transparent',
                                    color: activeTab === tab ? '#4f46e5' : '#6b7280',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    textTransform: 'capitalize',
                                    fontSize: '0.95rem'
                                }}
                            >
                                {tab} Settings
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSave}>
                        {activeTab === 'general' && (
                            <div className="settings-section">
                                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>General Configuration</h3>

                                <div className="user-details-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Site Name</label>
                                        <input
                                            type="text"
                                            name="siteName"
                                            value={settings.siteName}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Support Email</label>
                                        <input
                                            type="email"
                                            name="supportEmail"
                                            value={settings.supportEmail}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Support Phone</label>
                                        <input
                                            type="text"
                                            name="supportPhone"
                                            value={settings.supportPhone}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            name="maintenanceMode"
                                            checked={settings.maintenanceMode}
                                            onChange={handleInputChange}
                                            style={{ width: '1.2rem', height: '1.2rem' }}
                                        />
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 600 }}>Maintenance Mode</span>
                                            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Temporarily disable public access to the site</span>
                                        </div>
                                    </label>

                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            name="allowRegistration"
                                            checked={settings.allowRegistration}
                                            onChange={handleInputChange}
                                            style={{ width: '1.2rem', height: '1.2rem' }}
                                        />
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 600 }}>Allow New Registrations</span>
                                            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Enable or disable student sign-ups</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="settings-section">
                                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Security Preferences</h3>

                                <div className="form-group" style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Session Timeout (Minutes)</label>
                                    <select
                                        name="sessionTimeout"
                                        value={settings.sessionTimeout}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                                    >
                                        <option value="15">15 Minutes</option>
                                        <option value="30">30 Minutes</option>
                                        <option value="60">1 Hour</option>
                                        <option value="120">2 Hours</option>
                                    </select>
                                </div>

                                <div style={{ marginTop: '1rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            name="twoFactorAuth"
                                            checked={settings.twoFactorAuth}
                                            onChange={handleInputChange}
                                            style={{ width: '1.2rem', height: '1.2rem' }}
                                        />
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 600 }}>Enforce Two-Factor Authentication (2FA)</span>
                                            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Require 2FA for all admin and faculty accounts</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="settings-section">
                                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Notification Channels</h3>
                                <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Control how the system sends alerts to users.</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Email Notifications</strong>
                                            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Send course updates and alerts via email</span>
                                        </div>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                name="emailNotifications"
                                                checked={settings.emailNotifications}
                                                onChange={handleInputChange}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>

                                    <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <strong style={{ display: 'block', marginBottom: '0.25rem' }}>SMS Alerts</strong>
                                            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Send urgent otp and reminders via SMS</span>
                                        </div>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                name="smsNotifications"
                                                checked={settings.smsNotifications}
                                                onChange={handleInputChange}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'payment' && (
                            <div className="settings-section">
                                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Payment Gateway (Razorpay)</h3>

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Key ID</label>
                                    <input
                                        type="text"
                                        name="razorpayKey"
                                        value={settings.razorpayKey}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontFamily: 'monospace' }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Key Secret</label>
                                    <input
                                        type="password"
                                        name="razorpaySecret"
                                        value={settings.razorpaySecret}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontFamily: 'monospace' }}
                                    />
                                </div>

                                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '8px', fontSize: '0.9rem', color: '#92400e' }}>
                                    <i className="ri-alert-line" style={{ marginRight: '0.5rem' }}></i>
                                    Changing these keys will immediately affect live transactions. Proceed with caution.
                                </div>
                            </div>
                        )}

                        {/* Save Actions */}
                        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={saveStatus === 'saving'}
                                style={{
                                    background: '#4f46e5', color: 'white', border: 'none',
                                    padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 600,
                                    cursor: 'pointer', opacity: saveStatus === 'saving' ? 0.7 : 1
                                }}
                            >
                                {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
                            </button>

                            {saveStatus === 'success' && (
                                <span style={{ color: '#10b981', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <i className="ri-checkbox-circle-line"></i>
                                    Settings saved successfully!
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

// Add simple switch styles locally or rely on global
const styles = `
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: #4f46e5;
}
input:focus + .slider {
  box-shadow: 0 0 1px #4f46e5;
}
input:checked + .slider:before {
  -webkit-transform: translateX(24px);
  -ms-transform: translateX(24px);
  transform: translateX(24px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
`;
