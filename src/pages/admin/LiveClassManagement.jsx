/**
 * ENTERPRISE LIVE CLASSES (AWS) MANAGEMENT
 * Production-grade admin panel with card grid, filters, KPIs, and detail drawer
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function LiveClassManagement() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [liveClasses, setLiveClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    // Filters
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCourse, setFilterCourse] = useState('all');
    const [filterBatch, setFilterBatch] = useState('all');
    const [filterInstructor, setFilterInstructor] = useState('all');
    const [filterDate, setFilterDate] = useState('all');
    const [filterChannel, setFilterChannel] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [quickFilter, setQuickFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLiveClasses();
        const interval = setInterval(updateLiveStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        filterClasses();
    }, [filterStatus, filterCourse, filterBatch, filterInstructor, filterDate, filterChannel, searchQuery, quickFilter, liveClasses]);

    const loadLiveClasses = async () => {
        setLoading(true);
        setUser(getCurrentUser());

        const mockClasses = [
            {
                id: 1, title: 'Indian Polity - Fundamental Rights Deep Dive', instructor: 'Dr. Rajesh Kumar',
                instructorAvatar: 'https://i.pravatar.cc/150?img=12', course: 'GS Foundation',
                batch: 'UPSC 2026 Batch A', status: 'live', thumbnail: 'https://picsum.photos/400/225?random=1',
                startTime: new Date().toISOString(), duration: 120, currentViewers: 234, totalEnrolled: 450,
                streamHealth: 'excellent', awsStatus: 'active', awsChannel: 'AWS-CH-001',
                bitrate: '4500 kbps', latency: '2.3s', droppedFrames: 0.1,
                chatEnabled: true, recordingEnabled: true, startedBy: 'Admin Kumar', startedAt: new Date(Date.now() - 45 * 60000).toISOString()
            },
            {
                id: 2, title: 'Modern Indian History - Freedom Struggle', instructor: 'Prof. Anita Sharma',
                instructorAvatar: 'https://i.pravatar.cc/150?img=5', course: 'Prelims 2026',
                batch: 'UPSC 2026 Batch B', status: 'live', thumbnail: 'https://picsum.photos/400/225?random=2',
                startTime: new Date(Date.now() - 30 * 60000).toISOString(), duration: 90, currentViewers: 189, totalEnrolled: 320,
                streamHealth: 'good', awsStatus: 'active', awsChannel: 'AWS-CH-002',
                bitrate: '4200 kbps', latency: '3.1s', droppedFrames: 0.3,
                chatEnabled: true, recordingEnabled: true, startedBy: 'Admin Sharma', startedAt: new Date(Date.now() - 30 * 60000).toISOString()
            },
            {
                id: 3, title: 'Essay Writing Masterclass', instructor: 'Dr. Vikram Singh',
                instructorAvatar: 'https://i.pravatar.cc/150?img=33', course: 'Mains 2026',
                batch: 'UPSC 2026 Batch C', status: 'upcoming', thumbnail: 'https://picsum.photos/400/225?random=3',
                startTime: new Date(Date.now() + 30 * 60000).toISOString(), duration: 150, currentViewers: 0, totalEnrolled: 280,
                streamHealth: 'pending', awsStatus: 'standby', awsChannel: 'AWS-CH-003',
                chatEnabled: true, recordingEnabled: true
            },
            {
                id: 4, title: 'Current Affairs - Weekly Wrap', instructor: 'Ms. Priya Patel',
                instructorAvatar: 'https://i.pravatar.cc/150?img=9', course: 'Current Affairs',
                batch: 'All Batches', status: 'upcoming', thumbnail: 'https://picsum.photos/400/225?random=4',
                startTime: new Date(Date.now() + 24 * 60 * 60000).toISOString(), duration: 60, currentViewers: 0, totalEnrolled: 520,
                streamHealth: 'pending', awsStatus: 'standby', awsChannel: 'AWS-CH-004',
                chatEnabled: true, recordingEnabled: true
            },
            {
                id: 5, title: 'Geography - Climate Systems', instructor: 'Dr. Rajesh Kumar',
                instructorAvatar: 'https://i.pravatar.cc/150?img=12', course: 'GS Foundation',
                batch: 'UPSC 2026 Batch A', status: 'ended', thumbnail: 'https://picsum.photos/400/225?random=5',
                startTime: new Date(Date.now() - 4 * 60 * 60000).toISOString(), duration: 120, currentViewers: 0, totalEnrolled: 450,
                streamHealth: 'completed', awsStatus: 'stopped', awsChannel: 'AWS-CH-001',
                chatEnabled: false, recordingEnabled: true, recordingUrl: 'https://recordings.example.com/class-5.mp4',
                attendanceCount: 412, endedBy: 'Admin Kumar', endedAt: new Date(Date.now() - 2 * 60 * 60000).toISOString()
            },
            {
                id: 6, title: 'Ethics Case Studies', instructor: 'Prof. Anita Sharma',
                instructorAvatar: 'https://i.pravatar.cc/150?img=5', course: 'Mains 2026',
                batch: 'UPSC 2026 Batch B', status: 'ended', thumbnail: 'https://picsum.photos/400/225?random=6',
                startTime: new Date(Date.now() - 24 * 60 * 60000).toISOString(), duration: 90, currentViewers: 0, totalEnrolled: 320,
                streamHealth: 'completed', awsStatus: 'stopped', awsChannel: 'AWS-CH-002',
                chatEnabled: false, recordingEnabled: true, recordingUrl: 'https://recordings.example.com/class-6.mp4',
                attendanceCount: 298, endedBy: 'Admin Patel', endedAt: new Date(Date.now() - 22 * 60 * 60000).toISOString()
            }
        ];

        setLiveClasses(mockClasses);
        setFilteredClasses(mockClasses);
        setLoading(false);
    };

    const updateLiveStatus = () => {
        setLiveClasses(prev => prev.map(cls =>
            cls.status === 'live' ? { ...cls, currentViewers: Math.max(0, cls.currentViewers + Math.floor(Math.random() * 10 - 5)) } : cls
        ));
    };

    const filterClasses = () => {
        let filtered = liveClasses;

        if (quickFilter === 'live') filtered = filtered.filter(c => c.status === 'live');
        else if (quickFilter === 'soon') {
            filtered = filtered.filter(c => c.status === 'upcoming' && new Date(c.startTime) - new Date() < 60 * 60000);
        }
        else if (quickFilter === 'issues') filtered = filtered.filter(c => c.streamHealth === 'poor' || c.streamHealth === 'critical');

        if (filterStatus !== 'all') filtered = filtered.filter(c => c.status === filterStatus);
        if (filterCourse !== 'all') filtered = filtered.filter(c => c.course === filterCourse);
        if (filterBatch !== 'all') filtered = filtered.filter(c => c.batch === filterBatch);
        if (filterInstructor !== 'all') filtered = filtered.filter(c => c.instructor === filterInstructor);
        if (filterChannel !== 'all') filtered = filtered.filter(c => c.awsChannel === filterChannel);

        if (searchQuery) {
            filtered = filtered.filter(c =>
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.batch.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredClasses(filtered);
    };

    const getKPIs = () => {
        const live = liveClasses.filter(c => c.status === 'live');
        const totalViewers = live.reduce((sum, c) => sum + c.currentViewers, 0);
        const startingSoon = liveClasses.filter(c => c.status === 'upcoming' && new Date(c.startTime) - new Date() < 60 * 60000).length;
        const issues = liveClasses.filter(c => c.streamHealth === 'poor' || c.streamHealth === 'critical').length;
        return { liveNow: live.length, totalViewers, startingSoon, issues };
    };

    const handleBulkAction = (action) => {
        console.log(`Bulk action: ${action} on`, selectedClasses);
        alert(`${action} applied to ${selectedClasses.length} classes`);
        setSelectedClasses([]);
    };

    const toggleSelectClass = (id) => {
        setSelectedClasses(prev => prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]);
    };

    const openDetailDrawer = (cls) => {
        setSelectedClass(cls);
        setDetailDrawerOpen(true);
    };

    const kpis = getKPIs();
    const stats = { all: liveClasses.length, live: liveClasses.filter(c => c.status === 'live').length, upcoming: liveClasses.filter(c => c.status === 'upcoming').length, ended: liveClasses.filter(c => c.status === 'ended').length };

    if (loading) return <div className="dashboard-loading"><i className="ri-loader-4-line rotating"></i><p>Loading...</p></div>;

    return (
        <div className="dashboard-container admin-dashboard">
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div><h2>SRIRAM's IAS</h2><span className="role-badge admin">Admin</span></div>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>
                    <div className="nav-section-title">🔴 Live Class & Video</div>
                    <a href="/admin/live-classes" className="nav-item active"><i className="ri-live-line"></i>Live Classes (AWS)<span className="badge badge-danger">{stats.live} Live</span></a>
                    <a href="/admin/live-schedule" className="nav-item"><i className="ri-calendar-event-line"></i>Live Class Schedule</a>
                    <a href="/admin/live-attendance" className="nav-item"><i className="ri-user-follow-line"></i>Live Attendance</a>
                    <a href="/admin/live-recordings" className="nav-item"><i className="ri-video-line"></i>Live Recordings</a>
                    <a href="/admin/video-library" className="nav-item"><i className="ri-film-line"></i>Video Library</a>
                    <a href="/admin/streaming-health" className="nav-item"><i className="ri-pulse-line"></i>Streaming Health (AWS)</a>
                    <a href="/admin/live-reports" className="nav-item"><i className="ri-file-chart-line"></i>Live Class Reports</a>
                </nav>
                <button onClick={async () => { await logoutApi(); navigate('/login.html'); }} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><i className="ri-menu-2-line"></i></button>
                        <div><h1>Live Classes (AWS)</h1><p>Enterprise Control Panel</p></div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                {/* KPI Summary Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '12px', border: '2px solid #fca5a5' }}>
                        <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 600, marginBottom: '0.25rem' }}>🔴 LIVE NOW</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#dc2626' }}>{kpis.liveNow}</div>
                    </div>
                    <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '12px', border: '2px solid #93c5fd' }}>
                        <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 600, marginBottom: '0.25rem' }}>👥 TOTAL VIEWERS</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>{kpis.totalViewers}</div>
                    </div>
                    <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '12px', border: '2px solid #fcd34d' }}>
                        <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600, marginBottom: '0.25rem' }}>⏰ STARTING SOON</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706' }}>{kpis.startingSoon}</div>
                    </div>
                    <div style={{ background: kpis.issues > 0 ? '#fee2e2' : '#d1fae5', padding: '1rem', borderRadius: '12px', border: `2px solid ${kpis.issues > 0 ? '#fca5a5' : '#6ee7b7'}` }}>
                        <div style={{ fontSize: '0.75rem', color: kpis.issues > 0 ? '#991b1b' : '#065f46', fontWeight: 600, marginBottom: '0.25rem' }}>⚠️ ISSUES</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: kpis.issues > 0 ? '#dc2626' : '#059669' }}>{kpis.issues}</div>
                    </div>
                </div>

                {/* Quick Filters */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {[
                        { id: 'all', label: 'All Classes', icon: 'ri-list-check' },
                        { id: 'live', label: 'Live Now', icon: 'ri-live-line', color: '#dc2626' },
                        { id: 'soon', label: 'Starting Soon', icon: 'ri-time-line', color: '#d97706' },
                        { id: 'issues', label: 'Issues Detected', icon: 'ri-error-warning-line', color: '#dc2626' }
                    ].map(qf => (
                        <button
                            key={qf.id}
                            onClick={() => setQuickFilter(qf.id)}
                            style={{
                                padding: '0.5rem 1rem', borderRadius: '8px', border: quickFilter === qf.id ? '2px solid #3b82f6' : '1px solid #d1d5db',
                                background: quickFilter === qf.id ? '#eff6ff' : 'white', color: qf.color || '#374151',
                                fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            <i className={qf.icon}></i>{qf.label}
                        </button>
                    ))}
                </div>

                {/* Advanced Filters */}
                <div className="filters-bar" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select" style={{ minWidth: '150px' }}>
                        <option value="all">All Status</option>
                        <option value="live">Live</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ended">Ended</option>
                    </select>
                    <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="filter-select" style={{ minWidth: '150px' }}>
                        <option value="all">All Courses</option>
                        {[...new Set(liveClasses.map(c => c.course))].map(course => <option key={course} value={course}>{course}</option>)}
                    </select>
                    <select value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)} className="filter-select" style={{ minWidth: '150px' }}>
                        <option value="all">All Batches</option>
                        {[...new Set(liveClasses.map(c => c.batch))].map(batch => <option key={batch} value={batch}>{batch}</option>)}
                    </select>
                    <select value={filterInstructor} onChange={(e) => setFilterInstructor(e.target.value)} className="filter-select" style={{ minWidth: '150px' }}>
                        <option value="all">All Instructors</option>
                        {[...new Set(liveClasses.map(c => c.instructor))].map(inst => <option key={inst} value={inst}>{inst}</option>)}
                    </select>
                    <div className="search-group" style={{ flex: 1, minWidth: '250px' }}>
                        <i className="ri-search-line"></i>
                        <input type="text" placeholder="Search classes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                    </div>
                    <button className="btn btn-primary"><i className="ri-add-circle-line"></i>Schedule New</button>
                </div>

                {/* Bulk Actions Bar */}
                {selectedClasses.length > 0 && (
                    <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: '#1f2937', color: 'white', padding: '1rem 2rem', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600 }}>{selectedClasses.length} selected</span>
                        <button onClick={() => handleBulkAction('End Live')} style={{ padding: '0.5rem 1rem', background: '#dc2626', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>End Live</button>
                        <button onClick={() => handleBulkAction('Enable Recording')} style={{ padding: '0.5rem 1rem', background: '#059669', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Enable Recording</button>
                        <button onClick={() => handleBulkAction('Send Notification')} style={{ padding: '0.5rem 1rem', background: '#2563eb', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Send Notification</button>
                        <button onClick={() => setSelectedClasses([])} style={{ padding: '0.5rem 1rem', background: '#6b7280', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Clear</button>
                    </div>
                )}

                {/* Card Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                    {filteredClasses.map(cls => (
                        <div key={cls.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.2s', cursor: 'pointer', position: 'relative' }} onClick={() => openDetailDrawer(cls)}>
                            <input type="checkbox" checked={selectedClasses.includes(cls.id)} onChange={(e) => { e.stopPropagation(); toggleSelectClass(cls.id); }} style={{ position: 'absolute', top: '1rem', left: '1rem', width: '20px', height: '20px', cursor: 'pointer', zIndex: 10 }} />
                            <div style={{ position: 'relative' }}>
                                <img src={cls.thumbnail} alt={cls.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: cls.status === 'live' ? '#dc2626' : cls.status === 'upcoming' ? '#d97706' : '#6b7280', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {cls.status === 'live' && <><span style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>LIVE</>}
                                    {cls.status === 'upcoming' && 'UPCOMING'}
                                    {cls.status === 'ended' && 'ENDED'}
                                </div>
                                {cls.status === 'live' && <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 600 }}><i className="ri-eye-line"></i> {cls.currentViewers} watching</div>}
                            </div>
                            <div style={{ padding: '1.25rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem', lineHeight: 1.3 }}>{cls.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                    <img src={cls.instructorAvatar} alt={cls.instructor} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>{cls.instructor}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{cls.batch}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                                    <div><span style={{ color: '#6b7280' }}>Course:</span> <span style={{ fontWeight: 600, color: '#374151' }}>{cls.course}</span></div>
                                    <div><span style={{ color: '#6b7280' }}>Duration:</span> <span style={{ fontWeight: 600, color: '#374151' }}>{cls.duration}m</span></div>
                                    <div><span style={{ color: '#6b7280' }}>Enrolled:</span> <span style={{ fontWeight: 600, color: '#374151' }}>{cls.totalEnrolled}</span></div>
                                    <div><span style={{ color: '#6b7280' }}>Channel:</span> <span style={{ fontWeight: 600, color: '#374151' }}>{cls.awsChannel}</span></div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: cls.streamHealth === 'excellent' ? '#d1fae5' : cls.streamHealth === 'good' ? '#dbeafe' : cls.streamHealth === 'poor' ? '#fed7aa' : '#fee2e2', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }} title={cls.bitrate ? `${cls.bitrate}, ${cls.latency} latency, ${cls.droppedFrames}% dropped` : ''}>
                                        <i className="ri-pulse-line"></i>{cls.streamHealth}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: cls.awsStatus === 'active' ? '#d1fae5' : '#e5e7eb', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                                        <i className="ri-cloud-line"></i>{cls.awsStatus}
                                    </div>
                                    {cls.recordingEnabled && <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: '#fef3c7', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}><i className="ri-record-circle-line"></i>REC</div>}
                                    {cls.chatEnabled && <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: '#dbeafe', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}><i className="ri-chat-3-line"></i>Chat</div>}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} onClick={(e) => e.stopPropagation()}>
                                    {cls.status === 'live' && <button className="btn btn-sm btn-primary" style={{ flex: 1 }}><i className="ri-user-settings-line"></i>Join Admin</button>}
                                    {cls.status === 'live' && <button className="btn btn-sm btn-danger"><i className="ri-stop-circle-line"></i>End</button>}
                                    {cls.status === 'upcoming' && <button className="btn btn-sm btn-success" style={{ flex: 1 }}><i className="ri-play-circle-line"></i>Start Live</button>}
                                    {cls.status === 'ended' && cls.recordingUrl && <button className="btn btn-sm btn-info" style={{ flex: 1 }}><i className="ri-video-line"></i>Recording</button>}
                                    <button className="btn btn-sm btn-outline"><i className="ri-pulse-line"></i></button>
                                    <button className="btn btn-sm btn-outline"><i className="ri-user-follow-line"></i></button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div >

                {filteredClasses.length === 0 && <div className="empty-state"><i className="ri-live-line"></i><p>No classes found</p></div>}
            </main >

            {/* Detail Drawer */}
            {
                detailDrawerOpen && selectedClass && (
                    <div style={{ position: 'fixed', top: 0, right: 0, width: '500px', height: '100vh', background: 'white', boxShadow: '-4px 0 20px rgba(0,0,0,0.15)', zIndex: 2000, overflowY: 'auto', padding: '2rem' }}>
                        <button onClick={() => setDetailDrawerOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}><i className="ri-close-line"></i></button>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{selectedClass.title}</h2>
                        <img src={selectedClass.thumbnail} alt="" style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }} />
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Instructor</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <img src={selectedClass.instructorAvatar} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                <div><div style={{ fontWeight: 600 }}>{selectedClass.instructor}</div><div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{selectedClass.batch}</div></div>
                            </div>
                        </div>
                        {selectedClass.status === 'live' && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>AWS Stream Metrics</h3>
                                <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                                    <div style={{ marginBottom: '0.5rem' }}><strong>Bitrate:</strong> {selectedClass.bitrate}</div>
                                    <div style={{ marginBottom: '0.5rem' }}><strong>Latency:</strong> {selectedClass.latency}</div>
                                    <div><strong>Dropped Frames:</strong> {selectedClass.droppedFrames}%</div>
                                </div>
                            </div>
                        )}
                        {selectedClass.startedBy && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Audit Trail</h3>
                                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                    <div>Started by: <strong>{selectedClass.startedBy}</strong></div>
                                    <div>At: {new Date(selectedClass.startedAt).toLocaleString()}</div>
                                    {selectedClass.endedBy && <><div>Ended by: <strong>{selectedClass.endedBy}</strong></div><div>At: {new Date(selectedClass.endedAt).toLocaleString()}</div></>}
                                </div>
                            </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {selectedClass.status === 'live' && <button className="btn btn-primary" style={{ width: '100%' }}><i className="ri-user-settings-line"></i>Join as Admin</button>}
                            {selectedClass.status === 'live' && <button className="btn btn-danger" style={{ width: '100%' }}><i className="ri-stop-circle-line"></i>End Live Class</button>}
                            <button className="btn btn-outline" style={{ width: '100%' }}><i className="ri-pulse-line"></i>View Stream Health</button>
                            <button className="btn btn-outline" style={{ width: '100%' }}><i className="ri-user-follow-line"></i>View Attendance</button>
                        </div>
                    </div>
                )
            }
            {detailDrawerOpen && <div onClick={() => setDetailDrawerOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1999 }}></div>}
        </div >
    );
}
