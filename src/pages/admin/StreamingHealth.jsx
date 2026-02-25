/**
 * STREAMING HEALTH DASHBOARD (AWS IVS)
 * Technical monitoring for live streams including bitrate, latency, and error logs
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function StreamingHealth() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [activeStreams, setActiveStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState(null);
    const [healthMetrics, setHealthMetrics] = useState(null);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        loadData();
        const interval = setInterval(updateMetrics, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadData = () => {
        setUser(getCurrentUser());

        // Mock active streams
        const mockStreams = [
            { id: 'st-001', name: 'GS Foundation Live', channel: 'AWS-CH-001', status: 'Healthy', viewers: 450, startTime: '10:00 AM' },
            { id: 'st-002', name: 'History Optional', channel: 'AWS-CH-002', status: 'Degraded', viewers: 320, startTime: '11:30 AM' },
        ];
        setActiveStreams(mockStreams);
        setSelectedStream(mockStreams[0]);

        // Initial logs
        setLogs([
            { time: '10:00:05', level: 'Info', message: 'Stream started successfully' },
            { time: '10:00:15', level: 'Info', message: 'Ingest bitrate stable at 4500 kbps' },
            { time: '10:15:22', level: 'Warning', message: 'Minor packet loss detected (0.5%)' },
        ]);
    };

    const updateMetrics = () => {
        // Simulate fluctuating metrics
        setHealthMetrics({
            bitrate: Math.floor(4000 + Math.random() * 1000), // Random between 4000-5000 kbps
            fps: Math.floor(29 + Math.random() * 2), // 29-31 fps
            latency: (2 + Math.random()).toFixed(1), // 2.0-3.0s latency
            keyframeInterval: (1.9 + Math.random() * 0.2).toFixed(2), // ~2s
            cpuUsage: Math.floor(20 + Math.random() * 10), // 20-30%
            droppedFrames: Math.random() > 0.8 ? 1 : 0
        });

        if (Math.random() > 0.9) {
            const newLog = {
                time: new Date().toLocaleTimeString(),
                level: Math.random() > 0.7 ? 'Warning' : 'Info',
                message: Math.random() > 0.7 ? 'Bitrate fluctuation detected' : 'Stream health check passed'
            };
            setLogs(prev => [newLog, ...prev].slice(0, 50));
        }
    };

    const getStatusColor = (status) => {
        return status === 'Healthy' ? '#10b981' : status === 'Degraded' ? '#f59e0b' : '#ef4444';
    };

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
                    <a href="/admin/video-library" className="nav-item"><i className="ri-film-line"></i>Video Library</a>
                    <a href="/admin/streaming-health" className="nav-item active"><i className="ri-pulse-line"></i>Streaming Health (AWS)</a>
                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><i className="ri-menu-2-line"></i></button>
                        <div><h1>Streaming Health</h1><p>AWS IVS Technical Monitoring</p></div>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                    {/* Stream Selection List */}
                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', fontWeight: 700, background: '#f9fafb' }}>Active Streams ({activeStreams.length})</div>
                        <div>
                            {activeStreams.map(stream => (
                                <div
                                    key={stream.id}
                                    onClick={() => setSelectedStream(stream)}
                                    style={{
                                        padding: '1rem',
                                        borderBottom: '1px solid #f3f4f6',
                                        cursor: 'pointer',
                                        background: selectedStream?.id === stream.id ? '#eff6ff' : 'white',
                                        borderLeft: selectedStream?.id === stream.id ? '4px solid #3b82f6' : '4px solid transparent'
                                    }}
                                >
                                    <div style={{ fontWeight: 600, color: '#111827', marginBottom: '0.25rem' }}>{stream.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{stream.channel}</span>
                                        <span style={{ color: getStatusColor(stream.status), fontWeight: 600 }}>● {stream.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Metrics Area */}
                    {selectedStream && healthMetrics ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Key Metrics Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>INGEST BITRATE</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6', marginTop: '0.25rem' }}>
                                        {(healthMetrics.bitrate / 1000).toFixed(2)} <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Mbps</span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: healthMetrics.bitrate > 3500 ? '#10b981' : '#f59e0b', marginTop: '0.25rem' }}>
                                        {healthMetrics.bitrate > 3500 ? '● Excellent' : '● Low Bandwidth'}
                                    </div>
                                </div>
                                <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>FRAME RATE</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginTop: '0.25rem' }}>
                                        {healthMetrics.fps} <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>FPS</span>
                                    </div>
                                    <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '2px', marginTop: '0.5rem', overflow: 'hidden' }}>
                                        <div style={{ width: `${(healthMetrics.fps / 60) * 100}%`, background: '#10b981', height: '100%' }}></div>
                                    </div>
                                </div>
                                <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>LATENCY</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginTop: '0.25rem' }}>
                                        {healthMetrics.latency} <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>sec</span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: healthMetrics.latency < 5 ? '#10b981' : '#f59e0b', marginTop: '0.25rem' }}>
                                        {healthMetrics.latency < 5 ? '● Low Latency' : '● High Latency'}
                                    </div>
                                </div>
                                <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>KEYFRAME INTERVAL</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#374151', marginTop: '0.25rem' }}>
                                        {healthMetrics.keyframeInterval} <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>s</span>
                                    </div>
                                </div>
                            </div>

                            {/* Live Technical Logs */}
                            <div style={{ background: '#1f2937', color: '#e5e7eb', borderRadius: '12px', padding: '1.5rem', height: '300px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 700, color: 'white' }}>Live Event Log</span>
                                    <span style={{ color: '#10b981' }}>● Live Monitoring Active</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {logs.map((log, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                                            <span style={{ color: '#9ca3af', minWidth: '80px' }}>[{log.time}]</span>
                                            <span style={{ color: log.level === 'Info' ? '#60a5fa' : log.level === 'Warning' ? '#facc15' : '#f87171', fontWeight: 600, minWidth: '60px' }}>{log.level.toUpperCase()}</span>
                                            <span>{log.message}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stream Settings Info */}
                            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>Stream Configuration</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
                                    <div><span style={{ color: '#6b7280' }}>Service:</span> AWS IVS Low-Latency</div>
                                    <div><span style={{ color: '#6b7280' }}>Region:</span> ap-south-1 (Mumbai)</div>
                                    <div><span style={{ color: '#6b7280' }}>Ingest Server:</span> rtmps://a.rtmps.ivs.ap-south-1.amazonaws.com:443/app/</div>
                                    <div><span style={{ color: '#6b7280' }}>Channel Type:</span> Standard</div>
                                    <div><span style={{ color: '#6b7280' }}>Recording:</span> Enabled (S3 Bucket: shriam-live-recordings)</div>
                                    <div><span style={{ color: '#6b7280' }}>Resolution:</span> 1080p Full HD</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', color: '#6b7280' }}>
                            <i className="ri-router-line" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                            <p>Select a stream to view health metrics</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
