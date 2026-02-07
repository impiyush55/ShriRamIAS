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
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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

                <div className="settings-container max-w-[1000px] mx-auto">
                    {/* Settings Tabs */}
                    <div className="settings-tabs flex gap-4 mb-8 border-b border-gray-200">
                        {['general', 'security', 'notifications', 'payment'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 bg-transparent border-none font-semibold capitalize text-[0.95rem] cursor-pointer ${activeTab === tab
                                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                                    : 'border-b-2 border-transparent text-gray-500'
                                    }`}
                            >
                                {tab} Settings
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSave}>
                        {activeTab === 'general' && (
                            <div className="settings-section">
                                <h3 className="mb-6 text-gray-800">General Configuration</h3>

                                <div className="user-details-grid grid-cols-2 gap-8">
                                    <div className="form-group">
                                        <label className="block mb-2 font-medium">Site Name</label>
                                        <input
                                            type="text"
                                            name="siteName"
                                            value={settings.siteName}
                                            onChange={handleInputChange}
                                            className="form-control w-full px-3 py-3 rounded-lg border border-gray-300"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="block mb-2 font-medium">Support Email</label>
                                        <input
                                            type="email"
                                            name="supportEmail"
                                            value={settings.supportEmail}
                                            onChange={handleInputChange}
                                            className="form-control w-full px-3 py-3 rounded-lg border border-gray-300"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="block mb-2 font-medium">Support Phone</label>
                                        <input
                                            type="text"
                                            name="supportPhone"
                                            value={settings.supportPhone}
                                            onChange={handleInputChange}
                                            className="form-control w-full px-3 py-3 rounded-lg border border-gray-300"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col gap-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="maintenanceMode"
                                            checked={settings.maintenanceMode}
                                            onChange={handleInputChange}
                                            className="w-5 h-5"
                                        />
                                        <div>
                                            <span className="block font-semibold">Maintenance Mode</span>
                                            <span className="text-[0.85rem] text-gray-500">Temporarily disable public access to the site</span>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="allowRegistration"
                                            checked={settings.allowRegistration}
                                            onChange={handleInputChange}
                                            className="w-5 h-5"
                                        />
                                        <div>
                                            <span className="block font-semibold">Allow New Registrations</span>
                                            <span className="text-[0.85rem] text-gray-500">Enable or disable student sign-ups</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="settings-section">
                                <h3 className="mb-6 text-gray-800">Security Preferences</h3>

                                <div className="form-group mb-6 max-w-[400px]">
                                    <label className="block mb-2 font-medium">Session Timeout (Minutes)</label>
                                    <select
                                        name="sessionTimeout"
                                        value={settings.sessionTimeout}
                                        onChange={handleInputChange}
                                        className="form-control w-full px-3 py-3 rounded-lg border border-gray-300"
                                    >
                                        <option value="15">15 Minutes</option>
                                        <option value="30">30 Minutes</option>
                                        <option value="60">1 Hour</option>
                                        <option value="120">2 Hours</option>
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="twoFactorAuth"
                                            checked={settings.twoFactorAuth}
                                            onChange={handleInputChange}
                                            className="w-5 h-5"
                                        />
                                        <div>
                                            <span className="block font-semibold">Enforce Two-Factor Authentication (2FA)</span>
                                            <span className="text-[0.85rem] text-gray-500">Require 2FA for all admin and faculty accounts</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="settings-section">
                                <h3 className="mb-6 text-gray-800">Notification Channels</h3>
                                <p className="text-gray-500 mb-6">Control how the system sends alerts to users.</p>

                                <div className="flex flex-col gap-6">
                                    <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                                        <div>
                                            <strong className="block mb-1">Email Notifications</strong>
                                            <span className="text-gray-500 text-sm">Send course updates and alerts via email</span>
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

                                    <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                                        <div>
                                            <strong className="block mb-1">SMS Alerts</strong>
                                            <span className="text-gray-500 text-sm">Send urgent otp and reminders via SMS</span>
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
                                <h3 className="mb-6 text-gray-800">Payment Gateway (Razorpay)</h3>

                                <div className="form-group mb-6">
                                    <label className="block mb-2 font-medium">Key ID</label>
                                    <input
                                        type="text"
                                        name="razorpayKey"
                                        value={settings.razorpayKey}
                                        onChange={handleInputChange}
                                        className="form-control w-full px-3 py-3 rounded-lg border border-gray-300 font-mono"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="block mb-2 font-medium">Key Secret</label>
                                    <input
                                        type="password"
                                        name="razorpaySecret"
                                        value={settings.razorpaySecret}
                                        onChange={handleInputChange}
                                        className="form-control w-full px-3 py-3 rounded-lg border border-gray-300 font-mono"
                                    />
                                </div>

                                <div className="mt-6 p-4 bg-amber-100 rounded-lg text-sm text-amber-900">
                                    <i className="ri-alert-line mr-2"></i>
                                    Changing these keys will immediately affect live transactions. Proceed with caution.
                                </div>
                            </div>
                        )}

                        {/* Save Actions */}
                        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center gap-4">
                            <button
                                type="submit"
                                className="btn-primary bg-indigo-600 text-white border-none px-8 py-3 rounded-lg font-semibold cursor-pointer disabled:opacity-70"
                                disabled={saveStatus === 'saving'}
                            >
                                {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
                            </button>

                            {saveStatus === 'success' && (
                                <span className="text-success font-medium flex items-center gap-2">
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
