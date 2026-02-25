/**
 * LIVE ATTENDANCE - Real-Time & Reports
 * Comprehensive attendance tracking with analytics, exports, and real-time monitoring
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function LiveAttendance() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [view, setView] = useState('realtime'); // 'realtime' or 'historical'
    const [selectedClass, setSelectedClass] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [classes, setClasses] = useState([]);

    // Filters
    const [filterClass, setFilterClass] = useState('all');
    const [filterBatch, setFilterBatch] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDate, setFilterDate] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadData();
        // Real-time updates every 5 seconds
        const interval = setInterval(updateRealTimeData, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        filterAttendance();
    }, [filterClass, filterBatch, filterStatus, filterDate, searchQuery, attendanceData]);

    const loadData = () => {
        setUser(getCurrentUser());

        // Mock classes data
        const mockClasses = [
            { id: 1, title: 'Indian Polity - Fundamental Rights', batch: 'UPSC 2026 Batch A', date: '2026-02-07', startTime: '10:00', isLive: true, totalEnrolled: 450 },
            { id: 2, title: 'Modern History - Freedom Struggle', batch: 'UPSC 2026 Batch B', date: '2026-02-07', startTime: '14:00', isLive: true, totalEnrolled: 320 },
            { id: 3, title: 'Essay Writing Masterclass', batch: 'UPSC 2026 Batch C', date: '2026-02-06', startTime: '16:00', isLive: false, totalEnrolled: 280 },
            { id: 4, title: 'Current Affairs Weekly', batch: 'All Batches', date: '2026-02-05', startTime: '18:00', isLive: false, totalEnrolled: 520 }
        ];

        // Mock attendance data
        const mockAttendance = [
            {
                id: 1, classId: 1, studentName: 'Rahul Sharma', userId: 'STU001', batch: 'UPSC 2026 Batch A',
                joinTime: '10:02', leaveTime: null, duration: 45, deviceType: 'Desktop', status: 'Present',
                isOnline: true, lastSeen: new Date().toISOString()
            },
            {
                id: 2, classId: 1, studentName: 'Priya Patel', userId: 'STU002', batch: 'UPSC 2026 Batch A',
                joinTime: '10:15', leaveTime: null, duration: 32, deviceType: 'Mobile', status: 'Late',
                isOnline: true, lastSeen: new Date().toISOString()
            },
            {
                id: 3, classId: 1, studentName: 'Amit Kumar', userId: 'STU003', batch: 'UPSC 2026 Batch A',
                joinTime: '10:00', leaveTime: '10:35', duration: 35, deviceType: 'Tablet', status: 'Left Early',
                isOnline: false, lastSeen: new Date(Date.now() - 10 * 60000).toISOString()
            },
            {
                id: 4, classId: 1, studentName: 'Sneha Reddy', userId: 'STU004', batch: 'UPSC 2026 Batch A',
                joinTime: '10:01', leaveTime: null, duration: 46, deviceType: 'Desktop', status: 'Present',
                isOnline: true, lastSeen: new Date().toISOString()
            },
            {
                id: 5, classId: 2, studentName: 'Vikram Singh', userId: 'STU005', batch: 'UPSC 2026 Batch B',
                joinTime: '14:05', leaveTime: null, duration: 20, deviceType: 'Mobile', status: 'Late',
                isOnline: true, lastSeen: new Date().toISOString()
            },
            {
                id: 6, classId: 3, studentName: 'Anjali Gupta', userId: 'STU006', batch: 'UPSC 2026 Batch C',
                joinTime: '16:00', leaveTime: '17:30', duration: 90, deviceType: 'Desktop', status: 'Present',
                isOnline: false, lastSeen: new Date(Date.now() - 24 * 60 * 60000).toISOString()
            },
            {
                id: 7, classId: 3, studentName: 'Rohan Mehta', userId: 'STU007', batch: 'UPSC 2026 Batch C',
                joinTime: '16:20', leaveTime: '17:30', duration: 70, deviceType: 'Mobile', status: 'Late',
                isOnline: false, lastSeen: new Date(Date.now() - 24 * 60 * 60000).toISOString()
            }
        ];

        setClasses(mockClasses);
        setAttendanceData(mockAttendance);
        setFilteredData(mockAttendance);

        // Set first live class as selected by default
        const liveClass = mockClasses.find(c => c.isLive);
        if (liveClass) setSelectedClass(liveClass.id);
    };

    const updateRealTimeData = () => {
        // Simulate real-time duration updates
        setAttendanceData(prev => prev.map(att => {
            if (att.isOnline && !att.leaveTime) {
                return { ...att, duration: att.duration + 1, lastSeen: new Date().toISOString() };
            }
            return att;
        }));
    };

    const filterAttendance = () => {
        let filtered = attendanceData;

        if (view === 'realtime' && selectedClass) {
            filtered = filtered.filter(a => a.classId === selectedClass);
        }

        if (filterClass !== 'all') filtered = filtered.filter(a => a.classId === parseInt(filterClass));
        if (filterBatch !== 'all') filtered = filtered.filter(a => a.batch === filterBatch);
        if (filterStatus !== 'all') filtered = filtered.filter(a => a.status === filterStatus);

        if (searchQuery) {
            filtered = filtered.filter(a =>
                a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.userId.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    const getAnalytics = () => {
        const classData = selectedClass ? attendanceData.filter(a => a.classId === selectedClass) : attendanceData;
        const selectedClassInfo = classes.find(c => c.id === selectedClass);

        const total = selectedClassInfo?.totalEnrolled || 0;
        const present = classData.filter(a => a.status === 'Present').length;
        const late = classData.filter(a => a.status === 'Late').length;
        const leftEarly = classData.filter(a => a.status === 'Left Early').length;
        const absent = total - (present + late + leftEarly);
        const attendanceRate = total > 0 ? ((present + late) / total * 100).toFixed(1) : 0;
        const avgDuration = classData.length > 0 ? (classData.reduce((sum, a) => sum + a.duration, 0) / classData.length).toFixed(0) : 0;

        return { total, present, late, leftEarly, absent, attendanceRate, avgDuration, attended: present + late + leftEarly };
    };

    const getBatchSummary = () => {
        const batches = [...new Set(attendanceData.map(a => a.batch))];
        return batches.map(batch => {
            const batchData = attendanceData.filter(a => a.batch === batch);
            const batchClasses = classes.filter(c => c.batch === batch);
            const totalEnrolled = batchClasses.reduce((sum, c) => sum + c.totalEnrolled, 0);
            const attended = batchData.length;
            const present = batchData.filter(a => a.status === 'Present').length;
            const rate = totalEnrolled > 0 ? (attended / totalEnrolled * 100).toFixed(1) : 0;

            return { batch, totalEnrolled, attended, present, rate };
        });
    };

    const handleExport = (format) => {
        console.log(`Exporting to ${format}...`);
        alert(`Exporting attendance data to ${format}. This will download the file.`);
        // Implement actual export logic here
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return { bg: '#d1fae5', text: '#065f46', border: '#10b981' };
            case 'Late': return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' };
            case 'Left Early': return { bg: '#fed7aa', text: '#9a3412', border: '#f97316' };
            case 'Absent': return { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' };
            default: return { bg: '#f3f4f6', text: '#374151', border: '#9ca3af' };
        }
    };

    const formatDuration = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
    };

    const analytics = getAnalytics();
    const batchSummary = getBatchSummary();

    return (
        <div className="dashboard-container admin-dashboard">
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div><h2>LMS</h2><span className="role-badge admin">Admin</span></div>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>
                    <div className="nav-section-title">🔴 Live Class & Video</div>
                    <a href="/admin/live-classes" className="nav-item"><i className="ri-live-line"></i>Live Classes (AWS)</a>
                    <a href="/admin/live-schedule" className="nav-item"><i className="ri-calendar-event-line"></i>Live Class Schedule</a>
                    <a href="/admin/live-attendance" className="nav-item active"><i className="ri-user-follow-line"></i>Live Attendance</a>

                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><i className="ri-menu-2-line"></i></button>
                        <div><h1>Live Attendance</h1><p>Real-Time Tracking & Historical Reports</p></div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                {/* View Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setView('realtime')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: view === 'realtime' ? '2px solid #3b82f6' : '1px solid #d1d5db', background: view === 'realtime' ? '#eff6ff' : 'white', fontWeight: 600, cursor: 'pointer' }}>
                            <i className="ri-live-line"></i> Real-Time
                        </button>
                        <button onClick={() => setView('historical')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: view === 'historical' ? '2px solid #3b82f6' : '1px solid #d1d5db', background: view === 'historical' ? '#eff6ff' : 'white', fontWeight: 600, cursor: 'pointer' }}>
                            <i className="ri-history-line"></i> Historical
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleExport('Excel')} className="btn btn-outline">
                            <i className="ri-file-excel-line"></i> Export Excel
                        </button>
                        <button onClick={() => handleExport('PDF')} className="btn btn-outline">
                            <i className="ri-file-pdf-line"></i> Export PDF
                        </button>
                    </div>
                </div>

                {/* Class Selector for Real-Time */}
                {view === 'realtime' && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Select Live Class:</label>
                        <select value={selectedClass || ''} onChange={(e) => setSelectedClass(parseInt(e.target.value))} style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '1rem', minWidth: '300px' }}>
                            <option value="">Choose a class...</option>
                            {classes.filter(c => c.isLive).map(c => (
                                <option key={c.id} value={c.id}>🔴 {c.title} - {c.batch}</option>
                            ))}
                            {classes.filter(c => !c.isLive).map(c => (
                                <option key={c.id} value={c.id}>{c.title} - {c.batch} ({c.date})</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Analytics Cards */}
                {selectedClass && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.5rem' }}>TOTAL ENROLLED</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#374151' }}>{analytics.total}</div>
                        </div>
                        <div style={{ background: '#d1fae5', padding: '1.25rem', borderRadius: '12px', border: '2px solid #10b981' }}>
                            <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 600, marginBottom: '0.5rem' }}>PRESENT</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669' }}>{analytics.present}</div>
                        </div>
                        <div style={{ background: '#fef3c7', padding: '1.25rem', borderRadius: '12px', border: '2px solid #f59e0b' }}>
                            <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600, marginBottom: '0.5rem' }}>LATE</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706' }}>{analytics.late}</div>
                        </div>
                        <div style={{ background: '#fed7aa', padding: '1.25rem', borderRadius: '12px', border: '2px solid #f97316' }}>
                            <div style={{ fontSize: '0.75rem', color: '#9a3412', fontWeight: 600, marginBottom: '0.5rem' }}>LEFT EARLY</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ea580c' }}>{analytics.leftEarly}</div>
                        </div>
                        <div style={{ background: '#fee2e2', padding: '1.25rem', borderRadius: '12px', border: '2px solid #ef4444' }}>
                            <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 600, marginBottom: '0.5rem' }}>ABSENT</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#dc2626' }}>{analytics.absent}</div>
                        </div>
                        <div style={{ background: '#dbeafe', padding: '1.25rem', borderRadius: '12px', border: '2px solid #3b82f6' }}>
                            <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 600, marginBottom: '0.5rem' }}>ATTENDANCE RATE</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>{analytics.attendanceRate}%</div>
                        </div>
                        <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, marginBottom: '0.5rem' }}>AVG DURATION</div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#374151' }}>{formatDuration(parseInt(analytics.avgDuration))}</div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="filters-bar" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {view === 'historical' && (
                        <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="filter-select">
                            <option value="all">All Classes</option>
                            {classes.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    )}
                    <select value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)} className="filter-select">
                        <option value="all">All Batches</option>
                        {[...new Set(attendanceData.map(a => a.batch))].map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                        <option value="all">All Status</option>
                        <option value="Present">Present</option>
                        <option value="Late">Late</option>
                        <option value="Left Early">Left Early</option>
                    </select>
                    <div className="search-group" style={{ flex: 1, minWidth: '250px' }}>
                        <i className="ri-search-line"></i>
                        <input type="text" placeholder="Search student name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                    </div>
                </div>

                {/* Attendance Table */}
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', marginBottom: '2rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Student Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>User ID</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Batch</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Join Time</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Leave Time</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Duration</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Device</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Status</th>
                                {view === 'realtime' && <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Live</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(att => {
                                const statusStyle = getStatusColor(att.status);
                                return (
                                    <tr key={att.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '1rem', fontWeight: 600, color: '#374151' }}>{att.studentName}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280', fontFamily: 'monospace' }}>{att.userId}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{att.batch}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{att.joinTime}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{att.leaveTime || <span style={{ color: '#10b981', fontWeight: 600 }}>Active</span>}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>{formatDuration(att.duration)}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                                <i className={att.deviceType === 'Desktop' ? 'ri-computer-line' : att.deviceType === 'Mobile' ? 'ri-smartphone-line' : 'ri-tablet-line'}></i>
                                                {att.deviceType}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, background: statusStyle.bg, color: statusStyle.text, border: `2px solid ${statusStyle.border}` }}>
                                                {att.status.toUpperCase()}
                                            </span>
                                        </td>
                                        {view === 'realtime' && (
                                            <td style={{ padding: '1rem' }}>
                                                {att.isOnline ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 600, fontSize: '0.875rem' }}>
                                                        <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
                                                        Online
                                                    </div>
                                                ) : (
                                                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Offline</span>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {filteredData.length === 0 && (
                        <div className="empty-state" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                            <i className="ri-user-follow-line" style={{ fontSize: '3rem', color: '#9ca3af', marginBottom: '1rem' }}></i>
                            <p style={{ color: '#9ca3af' }}>No attendance records found</p>
                        </div>
                    )}
                </div>

                {/* Batch-wise Summary */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', border: '1px solid #e5e7eb' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111827' }}>Batch-wise Summary</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {batchSummary.map(batch => (
                            <div key={batch.batch} style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>{batch.batch}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
                                    <div>
                                        <div style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Total Enrolled</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151' }}>{batch.totalEnrolled}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Attended</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>{batch.attended}</div>
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <div style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Attendance Rate</div>
                                        <div style={{ background: '#e5e7eb', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ background: batch.rate >= 75 ? '#10b981' : batch.rate >= 50 ? '#f59e0b' : '#ef4444', height: '100%', width: `${batch.rate}%`, transition: 'width 0.3s' }}></div>
                                        </div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#374151', marginTop: '0.5rem' }}>{batch.rate}%</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
