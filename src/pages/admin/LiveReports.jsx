/**
 * LIVE CLASS REPORTS & ENGAGEMENT ANALYTICS
 * Comprehensive reporting on user engagement, chat activity, polls, and Q&A
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function LiveReports() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [timeRange, setTimeRange] = useState('7days');
    const [stats, setStats] = useState(null);
    const [topStudents, setTopStudents] = useState([]);

    useEffect(() => {
        loadData();
    }, [timeRange]);

    const loadData = () => {
        setUser(getCurrentUser());

        // Mock aggregated stats
        setStats({
            totalSessions: 12,
            avgAttendance: '78%',
            avgWatchTime: '42m',
            chatMessages: 3450,
            pollsConducted: 24,
            avgPollResponse: '65%',
            questionsAsked: 156,
            questionsAnswered: 142
        });

        // Mock top students
        setTopStudents([
            { id: 1, name: 'Rahul Sharma', batch: 'UPSC 2026 Batch A', attendance: '100%', engagementScore: 95 },
            { id: 2, name: 'Priya Patel', batch: 'UPSC 2026 Batch A', attendance: '98%', engagementScore: 92 },
            { id: 3, name: 'Amit Kumar', batch: 'UPSC 2026 Batch B', attendance: '95%', engagementScore: 88 },
            { id: 4, name: 'Sneha Reddy', batch: 'Mains 2026', attendance: '92%', engagementScore: 85 },
            { id: 5, name: 'Vikram Singh', batch: 'Prelims 2026', attendance: '90%', engagementScore: 82 },
        ]);
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
                    <a href="/admin/live-recordings" className="nav-item"><i className="ri-video-line"></i>Live Recordings</a>
                    <a href="/admin/video-library" className="nav-item"><i className="ri-film-line"></i>Video Library</a>
                    <a href="/admin/streaming-health" className="nav-item"><i className="ri-pulse-line"></i>Streaming Health (AWS)</a>
                    <a href="/admin/live-reports" className="nav-item active"><i className="ri-file-chart-line"></i>Live Class Reports</a>
                </nav>
                <button onClick={async () => { await logoutApi(); navigate('/login.html'); }} className="logout-btn"><i className="ri-logout-box-line"></i>Logout</button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><i className="ri-menu-2-line"></i></button>
                        <div><h1>Live Reports</h1><p>Engagement & Performance Analytics</p></div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="90days">Last 3 Months</option>
                    </select>
                </div>

                {stats && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="stat-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>AVG ATTENDANCE</div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>{stats.avgAttendance}</div>
                            <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem' }}>▲ 5% vs last week</div>
                        </div>
                        <div className="stat-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>AVG WATCH TIME</div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#8b5cf6' }}>{stats.avgWatchTime}</div>
                            <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem' }}>▲ 2m vs last week</div>
                        </div>
                        <div className="stat-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>CHAT MESSAGES</div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ec4899' }}>{stats.chatMessages}</div>
                            <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem' }}>High Engagement</div>
                        </div>
                        <div className="stat-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>POLL RESPONSE</div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>{stats.avgPollResponse}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>From {stats.pollsConducted} polls</div>
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>Top Engaged Students</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 0', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>STUDENT</th>
                                    <th style={{ textAlign: 'left', padding: '0.75rem 0', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>BATCH</th>
                                    <th style={{ textAlign: 'center', padding: '0.75rem 0', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>ATTENDANCE</th>
                                    <th style={{ textAlign: 'right', padding: '0.75rem 0', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>SCORE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topStudents.map((student, idx) => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                        <td style={{ padding: '0.75rem 0', fontWeight: 600, color: '#374151' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>{idx + 1}</div>
                                                {student.name}
                                            </div>
                                        </td>
                                        <td style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: '#6b7280' }}>{student.batch}</td>
                                        <td style={{ padding: '0.75rem 0', textAlign: 'center', fontWeight: 600, color: '#10b981' }}>{student.attendance}</td>
                                        <td style={{ padding: '0.75rem 0', textAlign: 'right', fontWeight: 700, color: '#3b82f6' }}>{student.engagementScore}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>Q&A Effectiveness</h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', background: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db', color: '#9ca3af' }}>
                            [Chart Placeholder: Q&A Response Times]
                        </div>
                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                            <div>
                                <div style={{ color: '#6b7280' }}>Total Questions</div>
                                <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#374151' }}>{stats?.questionsAsked}</div>
                            </div>
                            <div>
                                <div style={{ color: '#6b7280' }}>Answered</div>
                                <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#10b981' }}>{stats?.questionsAnswered} ({Math.round(stats?.questionsAnswered / stats?.questionsAsked * 100)}%)</div>
                            </div>
                            <div>
                                <div style={{ color: '#6b7280' }}>Avg Response Time</div>
                                <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#f59e0b' }}>2.5m</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
