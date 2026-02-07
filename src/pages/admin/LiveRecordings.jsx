/**
 * LIVE RECORDINGS MANAGEMENT
 * Manage archived live class recordings, VOD assets, and publishing
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function LiveRecordings() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [recordings, setRecordings] = useState([]);
    const [filteredRecordings, setFilteredRecordings] = useState([]);
    const [selectedRecording, setSelectedRecording] = useState(null);

    // Filters
    const [filterCourse, setFilterCourse] = useState('all');
    const [filterDate, setFilterDate] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadRecordings();
    }, []);

    useEffect(() => {
        filterData();
    }, [filterCourse, filterDate, filterStatus, searchQuery, recordings]);

    const loadRecordings = () => {
        setUser(getCurrentUser());

        // Mock recordings data
        const mockRecordings = [
            {
                id: 1, title: 'Indian Polity - Fundamental Rights Part 1', instructor: 'Dr. Rajesh Kumar',
                course: 'GS Foundation', batch: 'UPSC 2026 Batch A', date: '2026-02-07', duration: '1h 45m',
                size: '1.2 GB', format: 'MP4', status: 'Ready', views: 1245,
                thumbnail: 'https://picsum.photos/400/225?random=10', url: 'https://example.com/video1.mp4'
            },
            {
                id: 2, title: 'Modern History - Non-Cooperation Movement', instructor: 'Prof. Anita Sharma',
                course: 'Prelims 2026', batch: 'UPSC 2026 Batch B', date: '2026-02-06', duration: '1h 30m',
                size: '950 MB', format: 'MP4', status: 'Ready', views: 856,
                thumbnail: 'https://picsum.photos/400/225?random=11', url: 'https://example.com/video2.mp4'
            },
            {
                id: 3, title: 'Essay Writing - Structuring Arguments', instructor: 'Dr. Vikram Singh',
                course: 'Mains 2026', batch: 'UPSC 2026 Batch C', date: '2026-02-07', duration: '2h 10m',
                size: '1.8 GB', format: 'MP4', status: 'Processing', views: 0,
                thumbnail: 'https://picsum.photos/400/225?random=12', url: ''
            },
            {
                id: 4, title: 'Current Affairs - Budget 2026 Analysis', instructor: 'Ms. Priya Patel',
                course: 'Current Affairs', batch: 'All Batches', date: '2026-02-05', duration: '1h 15m',
                size: '800 MB', format: 'MP4', status: 'Ready', views: 3420,
                thumbnail: 'https://picsum.photos/400/225?random=13', url: 'https://example.com/video4.mp4'
            },
            {
                id: 5, title: 'Geography - Monsoon Mechanism', instructor: 'Dr. Rajesh Kumar',
                course: 'GS Foundation', batch: 'UPSC 2026 Batch A', date: '2026-02-04', duration: '1h 50m',
                size: '1.3 GB', format: 'MP4', status: 'Archived', views: 120,
                thumbnail: 'https://picsum.photos/400/225?random=14', url: 'https://example.com/video5.mp4'
            }
        ];

        setRecordings(mockRecordings);
        setFilteredRecordings(mockRecordings);
    };

    const filterData = () => {
        let filtered = recordings;

        if (filterCourse !== 'all') filtered = filtered.filter(r => r.course === filterCourse);
        if (filterStatus !== 'all') filtered = filtered.filter(r => r.status === filterStatus);

        if (searchQuery) {
            filtered = filtered.filter(r =>
                r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.instructor.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredRecordings(filtered);
    };

    const handlePlay = (recording) => {
        if (recording.status === 'Processing') {
            alert('This recording is still processing. Please try again later.');
            return;
        }
        setSelectedRecording(recording);
    };

    const handleDownload = (recording) => {
        alert(`Starting download for: ${recording.title}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this recording? This action cannot be undone.')) {
            setRecordings(prev => prev.filter(r => r.id !== id));
        }
    };

    const handlePublish = (id) => {
        setRecordings(prev => prev.map(r => r.id === id ? { ...r, status: 'Ready' } : r));
        alert('Recording published successfully!');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Ready': return { bg: '#d1fae5', text: '#065f46' };
            case 'Processing': return { bg: '#dbeafe', text: '#1e40af' };
            case 'Archived': return { bg: '#f3f4f6', text: '#374151' };
            case 'Failed': return { bg: '#fee2e2', text: '#991b1b' };
            default: return { bg: '#f3f4f6', text: '#374151' };
        }
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
                    <div className="nav-section-title">🔴 Live Class & Video</div>
                    <a href="/admin/live-classes" className="nav-item"><i className="ri-live-line"></i>Live Classes (AWS)</a>
                    <a href="/admin/live-schedule" className="nav-item"><i className="ri-calendar-event-line"></i>Live Class Schedule</a>
                    <a href="/admin/live-attendance" className="nav-item"><i className="ri-user-follow-line"></i>Live Attendance</a>
                    <a href="/admin/live-recordings" className="nav-item active"><i className="ri-video-line"></i>Live Recordings</a>
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
                        <div><h1>Live Recordings</h1><p>Manage archived sessions & VODs</p></div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                {/* Filters */}
                <div className="filters-bar" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="filter-select">
                        <option value="all">All Courses</option>
                        {[...new Set(recordings.map(r => r.course))].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                        <option value="all">All Status</option>
                        <option value="Ready">Ready</option>
                        <option value="Processing">Processing</option>
                        <option value="Archived">Archived</option>
                    </select>
                    <div className="search-group" style={{ flex: 1, minWidth: '250px' }}>
                        <i className="ri-search-line"></i>
                        <input type="text" placeholder="Search recordings..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                    </div>
                    <button className="btn btn-outline" title="Refresh List"><i className="ri-refresh-line"></i></button>
                </div>

                {/* Recordings Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredRecordings.map(recording => (
                        <div key={recording.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.2s', position: 'relative' }}>
                            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => handlePlay(recording)}>
                                <img src={recording.thumbnail} alt={recording.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s', ':hover': { opacity: 1 } }} className="hover:opacity-100">
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="ri-play-fill" style={{ fontSize: '24px', color: '#111827' }}></i>
                                    </div>
                                </div>
                                <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                                    {recording.duration}
                                </div>
                                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, background: getStatusColor(recording.status).bg, color: getStatusColor(recording.status).text }}>
                                        {recording.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div style={{ padding: '1.25rem' }}>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{new Date(recording.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    <span>{recording.size} • {recording.views} views</span>
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem', lineHeight: 1.4, height: '2.8em', overflow: 'hidden' }}>{recording.title}</h3>
                                <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem' }}>
                                    <i className="ri-user-line" style={{ marginRight: '0.3rem' }}></i> {recording.instructor}
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
                                    <button onClick={() => handlePlay(recording)} className="btn btn-sm btn-outline" style={{ flex: 1 }}>
                                        <i className="ri-play-circle-line"></i> Play
                                    </button>
                                    <button onClick={() => handleDownload(recording)} className="btn btn-sm btn-outline" title="Download">
                                        <i className="ri-download-line"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline" title="Edit Details">
                                        <i className="ri-edit-line"></i>
                                    </button>
                                    <button onClick={() => handleDelete(recording.id)} className="btn btn-sm btn-outline" title="Delete" style={{ color: '#dc2626', borderColor: '#fee2e2' }}>
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Video Player Modal */}
                {selectedRecording && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedRecording(null)}>
                        <div style={{ width: '90%', maxWidth: '900px', background: 'black', borderRadius: '12px', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                                <video controls autoPlay src={selectedRecording.url} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></video>
                            </div>
                            <div style={{ padding: '1.5rem', background: '#1f2937', color: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{selectedRecording.title}</h2>
                                        <p style={{ color: '#9ca3af' }}>{selectedRecording.instructor} • {selectedRecording.course}</p>
                                    </div>
                                    <button onClick={() => setSelectedRecording(null)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
