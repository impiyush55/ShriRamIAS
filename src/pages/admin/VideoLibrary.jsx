/**
 * VIDEO LIBRARY MANAGEMENT
 * Central repository for all video content, VOD uploads, and organization
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function VideoLibrary() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [view, setView] = useState('grid'); // 'grid' or 'list'
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Filters
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        loadVideos();
    }, []);

    useEffect(() => {
        filterData();
    }, [filterCategory, searchQuery, sortBy, videos]);

    const loadVideos = () => {
        setUser(getCurrentUser());

        // Mock video data
        const mockVideos = [
            {
                id: 1, title: 'Introduction to UPSC Syllabus', category: 'Orientation',
                duration: '45m 20s', size: '450 MB', uploadDate: '2026-01-15T10:00:00',
                thumbnail: 'https://picsum.photos/400/225?random=20', views: 5024,
                author: 'Dr. Rajesh Kumar', status: 'Published'
            },
            {
                id: 2, title: 'How to Read The Hindu', category: 'Strategy',
                duration: '30m 15s', size: '320 MB', uploadDate: '2026-01-20T14:30:00',
                thumbnail: 'https://picsum.photos/400/225?random=21', views: 8900,
                author: 'Prof. Anita Sharma', status: 'Published'
            },
            {
                id: 3, title: 'NCERT Geography - Class 6 Summary', category: 'Geography',
                duration: '2h 10m', size: '1.5 GB', uploadDate: '2026-02-01T09:00:00',
                thumbnail: 'https://picsum.photos/400/225?random=22', views: 2100,
                author: 'Dr. Vikram Singh', status: 'Draft'
            },
            {
                id: 4, title: 'Economics Survey 2025-26 Highlights', category: 'Economics',
                duration: '1h 45m', size: '1.2 GB', uploadDate: '2026-02-05T16:00:00',
                thumbnail: 'https://picsum.photos/400/225?random=23', views: 340,
                author: 'Ms. Priya Patel', status: 'Published'
            }
        ];

        setVideos(mockVideos);
        setFilteredVideos(mockVideos);
    };

    const filterData = () => {
        let filtered = videos;

        if (filterCategory !== 'all') filtered = filtered.filter(v => v.category === filterCategory);

        if (searchQuery) {
            filtered = filtered.filter(v =>
                v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        } else if (sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
        } else if (sortBy === 'most_viewed') {
            filtered.sort((a, b) => b.views - a.views);
        }

        setFilteredVideos([...filtered]);
    };

    const handleUpload = () => {
        alert('Opening file uploader...');
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this video from library?')) {
            setVideos(prev => prev.filter(v => v.id !== id));
        }
    };

    const getCategories = () => [...new Set(videos.map(v => v.category))];

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
                    <a href="/admin/live-attendance" className="nav-item"><i className="ri-user-follow-line"></i>Live Attendance</a>
                    <a href="/admin/live-recordings" className="nav-item"><i className="ri-video-line"></i>Live Recordings</a>
                    <a href="/admin/video-library" className="nav-item active"><i className="ri-film-line"></i>Video Library</a>
                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><i className="ri-menu-2-line"></i></button>
                        <div><h1>Video Library</h1><p>Central repository for all video content</p></div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div className="search-group" style={{ minWidth: '300px' }}>
                            <i className="ri-search-line"></i>
                            <input type="text" placeholder="Search videos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                        </div>
                        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
                            <option value="all">All Categories</option>
                            {getCategories().map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="most_viewed">Most Viewed</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setView('grid')} className={`btn btn-icon ${view === 'grid' ? 'active' : ''}`} style={{ background: view === 'grid' ? '#eff6ff' : 'white', border: view === 'grid' ? '2px solid #3b82f6' : '1px solid #d1d5db' }}><i className="ri-grid-fill"></i></button>
                        <button onClick={() => setView('list')} className={`btn btn-icon ${view === 'list' ? 'active' : ''}`} style={{ background: view === 'list' ? '#eff6ff' : 'white', border: view === 'list' ? '2px solid #3b82f6' : '1px solid #d1d5db' }}><i className="ri-list-check"></i></button>
                        <button onClick={handleUpload} className="btn btn-primary"><i className="ri-upload-cloud-2-line"></i> Upload Video</button>
                    </div>
                </div>

                {view === 'grid' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {filteredVideos.map(video => (
                            <div key={video.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                                    <span style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '0.125rem 0.375rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{video.duration}</span>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={video.title}>{video.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                                        <span>{video.category}</span>
                                        <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: video.status === 'Published' ? '#059669' : '#d97706', background: video.status === 'Published' ? '#d1fae5' : '#fef3c7', padding: '0.125rem 0.5rem', borderRadius: '999px' }}>
                                            {video.status}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <button className="btn-icon-sm"><i className="ri-edit-line"></i></button>
                                            <button onClick={() => handleDelete(video.id)} className="btn-icon-sm text-red-600"><i className="ri-delete-bin-line"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {view === 'list' && (
                    <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <tr>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Video</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Category</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Author</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Date</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Stats</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                                    <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: '#6b7280' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVideos.map(video => (
                                    <tr key={video.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img src={video.thumbnail} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                                <div>
                                                    <div style={{ fontWeight: 600, color: '#111827' }}>{video.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{video.duration} • {video.size}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{video.category}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{video.author}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{new Date(video.uploadDate).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{video.views} views</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: video.status === 'Published' ? '#059669' : '#d97706', background: video.status === 'Published' ? '#d1fae5' : '#fef3c7', padding: '0.125rem 0.5rem', borderRadius: '999px' }}>
                                                {video.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button className="btn-icon-sm"><i className="ri-edit-line"></i></button>
                                                <button onClick={() => handleDelete(video.id)} className="btn-icon-sm text-red-600"><i className="ri-delete-bin-line"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
