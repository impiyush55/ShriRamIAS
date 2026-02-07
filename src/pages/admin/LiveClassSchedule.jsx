/**
 * LIVE CLASS SCHEDULE - Calendar & Planner
 * Professional scheduling interface with calendar/list views, conflict detection, and timezone support
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

export default function LiveClassSchedule() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [view, setView] = useState('calendar'); // 'calendar' or 'list'
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [schedules, setSchedules] = useState([]);
    const [filteredSchedules, setFilteredSchedules] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [conflicts, setConflicts] = useState([]);

    // Filters
    const [filterCourse, setFilterCourse] = useState('all');
    const [filterInstructor, setFilterInstructor] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        title: '', course: '', batch: '', instructor: '', awsChannel: '',
        date: '', startTime: '', duration: 60, timezone: 'Asia/Kolkata',
        recurring: 'none', recurringDays: [], recurringEndDate: '',
        maxStudents: 500, description: '', status: 'scheduled'
    });

    useEffect(() => {
        loadSchedules();
    }, []);

    useEffect(() => {
        filterSchedules();
    }, [filterCourse, filterInstructor, filterStatus, searchQuery, schedules]);

    const loadSchedules = () => {
        setUser(getCurrentUser());

        // Mock schedule data
        const mockSchedules = [
            {
                id: 1, title: 'Indian Polity - Fundamental Rights', course: 'GS Foundation',
                batch: 'UPSC 2026 Batch A', instructor: 'Dr. Rajesh Kumar', awsChannel: 'AWS-CH-001',
                date: '2026-02-08', startTime: '10:00', duration: 120, timezone: 'Asia/Kolkata',
                maxStudents: 500, enrolled: 234, status: 'scheduled', recurring: 'none'
            },
            {
                id: 2, title: 'Modern History - Freedom Struggle', course: 'Prelims 2026',
                batch: 'UPSC 2026 Batch B', instructor: 'Prof. Anita Sharma', awsChannel: 'AWS-CH-002',
                date: '2026-02-08', startTime: '14:00', duration: 90, timezone: 'Asia/Kolkata',
                maxStudents: 400, enrolled: 189, status: 'scheduled', recurring: 'none'
            },
            {
                id: 3, title: 'Essay Writing Masterclass', course: 'Mains 2026',
                batch: 'UPSC 2026 Batch C', instructor: 'Dr. Vikram Singh', awsChannel: 'AWS-CH-003',
                date: '2026-02-09', startTime: '16:00', duration: 150, timezone: 'Asia/Kolkata',
                maxStudents: 300, enrolled: 280, status: 'scheduled', recurring: 'weekly',
                recurringDays: ['Monday'], recurringEndDate: '2026-03-31'
            },
            {
                id: 4, title: 'Current Affairs Weekly', course: 'Current Affairs',
                batch: 'All Batches', instructor: 'Ms. Priya Patel', awsChannel: 'AWS-CH-004',
                date: '2026-02-10', startTime: '18:00', duration: 60, timezone: 'Asia/Kolkata',
                maxStudents: 600, enrolled: 520, status: 'scheduled', recurring: 'weekly',
                recurringDays: ['Sunday'], recurringEndDate: '2026-06-30'
            },
            {
                id: 5, title: 'Geography - Climate Systems', course: 'GS Foundation',
                batch: 'UPSC 2026 Batch A', instructor: 'Dr. Rajesh Kumar', awsChannel: 'AWS-CH-001',
                date: '2026-02-07', startTime: '10:00', duration: 120, timezone: 'Asia/Kolkata',
                maxStudents: 500, enrolled: 450, status: 'completed', recurring: 'none'
            },
            {
                id: 6, title: 'Ethics Case Studies', course: 'Mains 2026',
                batch: 'UPSC 2026 Batch B', instructor: 'Prof. Anita Sharma', awsChannel: 'AWS-CH-002',
                date: '2026-02-12', startTime: '15:00', duration: 90, timezone: 'Asia/Kolkata',
                maxStudents: 400, enrolled: 0, status: 'cancelled', recurring: 'none'
            }
        ];

        setSchedules(mockSchedules);
        setFilteredSchedules(mockSchedules);
    };

    const filterSchedules = () => {
        let filtered = schedules;

        if (filterCourse !== 'all') filtered = filtered.filter(s => s.course === filterCourse);
        if (filterInstructor !== 'all') filtered = filtered.filter(s => s.instructor === filterInstructor);
        if (filterStatus !== 'all') filtered = filtered.filter(s => s.status === filterStatus);

        if (searchQuery) {
            filtered = filtered.filter(s =>
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.instructor.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredSchedules(filtered);
    };

    const detectConflicts = (newSchedule) => {
        const newStart = new Date(`${newSchedule.date}T${newSchedule.startTime}`);
        const newEnd = new Date(newStart.getTime() + newSchedule.duration * 60000);

        const conflicts = schedules.filter(s => {
            if (s.id === newSchedule.id) return false;
            if (s.status === 'cancelled') return false;

            const existingStart = new Date(`${s.date}T${s.startTime}`);
            const existingEnd = new Date(existingStart.getTime() + s.duration * 60000);

            // Check instructor conflict
            if (s.instructor === newSchedule.instructor) {
                if (newStart < existingEnd && newEnd > existingStart) return true;
            }

            // Check AWS channel conflict
            if (s.awsChannel === newSchedule.awsChannel) {
                if (newStart < existingEnd && newEnd > existingStart) return true;
            }

            return false;
        });

        return conflicts;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const conflictingSchedules = detectConflicts(formData);

        if (conflictingSchedules.length > 0) {
            setConflicts(conflictingSchedules);
            if (!window.confirm(`Found ${conflictingSchedules.length} conflict(s). Continue anyway?`)) {
                return;
            }
        }

        if (editingSchedule) {
            setSchedules(prev => prev.map(s => s.id === editingSchedule.id ? { ...formData, id: s.id } : s));
        } else {
            setSchedules(prev => [...prev, { ...formData, id: Date.now(), enrolled: 0 }]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '', course: '', batch: '', instructor: '', awsChannel: '',
            date: '', startTime: '', duration: 60, timezone: 'Asia/Kolkata',
            recurring: 'none', recurringDays: [], recurringEndDate: '',
            maxStudents: 500, description: '', status: 'scheduled'
        });
        setEditingSchedule(null);
        setShowModal(false);
        setConflicts([]);
    };

    const handleEdit = (schedule) => {
        setFormData(schedule);
        setEditingSchedule(schedule);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this schedule?')) {
            setSchedules(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleCancel = (id) => {
        if (window.confirm('Cancel this live class?')) {
            setSchedules(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' } : s));
        }
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        // Add empty cells for days before the first of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // Add all days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        // Pad the end to complete the final week (ensure we have complete rows of 7)
        const remainingCells = days.length % 7;
        if (remainingCells !== 0) {
            for (let i = 0; i < (7 - remainingCells); i++) {
                days.push(null);
            }
        }
        return days;
    };

    const getSchedulesForDate = (date) => {
        if (!date) return [];
        const dateStr = date.toISOString().split('T')[0];
        return filteredSchedules.filter(s => s.date === dateStr);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled': return '#3b82f6';
            case 'completed': return '#10b981';
            case 'cancelled': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const monthDays = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
                    <a href="/admin/live-schedule" className="nav-item active"><i className="ri-calendar-event-line"></i>Live Class Schedule</a>
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
                        <div><h1>Live Class Schedule</h1><p>Calendar & Planning Interface</p></div>
                    </div>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                        <div><p className="user-name">{user?.name}</p></div>
                    </div>
                </header>

                {/* View Toggle & Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setView('calendar')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: view === 'calendar' ? '2px solid #3b82f6' : '1px solid #d1d5db', background: view === 'calendar' ? '#eff6ff' : 'white', fontWeight: 600, cursor: 'pointer' }}>
                            <i className="ri-calendar-line"></i> Calendar View
                        </button>
                        <button onClick={() => setView('list')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: view === 'list' ? '2px solid #3b82f6' : '1px solid #d1d5db', background: view === 'list' ? '#eff6ff' : 'white', fontWeight: 600, cursor: 'pointer' }}>
                            <i className="ri-list-check"></i> List View
                        </button>
                    </div>
                    <button onClick={() => setShowModal(true)} className="btn btn-primary">
                        <i className="ri-add-circle-line"></i> Schedule New Class
                    </button>
                </div>

                {/* Filters */}
                <div className="filters-bar" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="filter-select">
                        <option value="all">All Courses</option>
                        {[...new Set(schedules.map(s => s.course))].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={filterInstructor} onChange={(e) => setFilterInstructor(e.target.value)} className="filter-select">
                        <option value="all">All Instructors</option>
                        {[...new Set(schedules.map(s => s.instructor))].map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                        <option value="all">All Status</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <div className="search-group" style={{ flex: 1, minWidth: '250px' }}>
                        <i className="ri-search-line"></i>
                        <input type="text" placeholder="Search classes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                    </div>
                </div>

                {/* Calendar View */}
                {view === 'calendar' && (
                    <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 600 }}>
                                <i className="ri-arrow-left-line"></i> Previous
                            </button>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{monthName}</h2>
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 600 }}>
                                Next <i className="ri-arrow-right-line"></i>
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: '#e5e7eb', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} style={{ background: '#f9fafb', padding: '0.75rem', textAlign: 'center', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>{day}</div>
                            ))}
                            {monthDays.map((date, idx) => {
                                const daySchedules = date ? getSchedulesForDate(date) : [];
                                const isToday = date && date.toDateString() === new Date().toDateString();

                                return (
                                    <div key={idx} style={{ background: 'white', minHeight: '120px', padding: '0.5rem', position: 'relative', border: isToday ? '2px solid #3b82f6' : 'none' }}>
                                        {date && (
                                            <>
                                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: isToday ? '#3b82f6' : '#374151', marginBottom: '0.5rem' }}>{date.getDate()}</div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                    {daySchedules.slice(0, 3).map(schedule => (
                                                        <div key={schedule.id} onClick={() => handleEdit(schedule)} style={{ background: schedule.status === 'cancelled' ? '#fee2e2' : schedule.enrolled >= schedule.maxStudents ? '#fef3c7' : '#eff6ff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', borderLeft: `3px solid ${getStatusColor(schedule.status)}`, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {schedule.startTime} {schedule.title}
                                                        </div>
                                                    ))}
                                                    {daySchedules.length > 3 && (
                                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>+{daySchedules.length - 3} more</div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* List View */}
                {view === 'list' && (
                    <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                                <tr>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Date & Time</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Class Title</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Instructor</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Course</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Enrollment</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Status</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSchedules.map(schedule => (
                                    <tr key={schedule.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: 600, color: '#374151' }}>{new Date(schedule.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{schedule.startTime} • {schedule.duration}m</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: 600, color: '#374151' }}>{schedule.title}</div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{schedule.batch}</div>
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{schedule.instructor}</td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{schedule.course}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: schedule.enrolled >= schedule.maxStudents ? '#dc2626' : '#374151' }}>
                                                {schedule.enrolled} / {schedule.maxStudents}
                                            </div>
                                            {schedule.enrolled >= schedule.maxStudents && <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>FULL</div>}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, background: schedule.status === 'scheduled' ? '#dbeafe' : schedule.status === 'completed' ? '#d1fae5' : '#fee2e2', color: schedule.status === 'scheduled' ? '#1e40af' : schedule.status === 'completed' ? '#065f46' : '#991b1b' }}>
                                                {schedule.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleEdit(schedule)} className="btn-icon" title="Edit"><i className="ri-edit-line"></i></button>
                                                {schedule.status === 'scheduled' && <button onClick={() => handleCancel(schedule.id)} className="btn-icon" title="Cancel"><i className="ri-close-circle-line" style={{ color: '#dc2626' }}></i></button>}
                                                <button onClick={() => handleDelete(schedule.id)} className="btn-icon" title="Delete"><i className="ri-delete-bin-line" style={{ color: '#dc2626' }}></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Schedule Modal */}
                {showModal && (
                    <>
                        <div onClick={() => resetForm()} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1999 }}></div>
                        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', background: 'white', borderRadius: '16px', padding: '2rem', zIndex: 2000, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{editingSchedule ? 'Edit Schedule' : 'Schedule New Live Class'}</h2>

                            {conflicts.length > 0 && (
                                <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem' }}>⚠️ Conflicts Detected:</div>
                                    {conflicts.map(c => (
                                        <div key={c.id} style={{ fontSize: '0.875rem', color: '#7f1d1d' }}>• {c.title} at {c.startTime} ({c.instructor})</div>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Class Title *</label>
                                        <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Course *</label>
                                        <select required value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                                            <option value="">Select Course</option>
                                            <option value="GS Foundation">GS Foundation</option>
                                            <option value="Prelims 2026">Prelims 2026</option>
                                            <option value="Mains 2026">Mains 2026</option>
                                            <option value="Current Affairs">Current Affairs</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Batch *</label>
                                        <input required type="text" value={formData.batch} onChange={(e) => setFormData({ ...formData, batch: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Instructor *</label>
                                        <select required value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                                            <option value="">Select Instructor</option>
                                            <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</option>
                                            <option value="Prof. Anita Sharma">Prof. Anita Sharma</option>
                                            <option value="Dr. Vikram Singh">Dr. Vikram Singh</option>
                                            <option value="Ms. Priya Patel">Ms. Priya Patel</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>AWS Channel *</label>
                                        <select required value={formData.awsChannel} onChange={(e) => setFormData({ ...formData, awsChannel: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                                            <option value="">Select Channel</option>
                                            <option value="AWS-CH-001">AWS-CH-001</option>
                                            <option value="AWS-CH-002">AWS-CH-002</option>
                                            <option value="AWS-CH-003">AWS-CH-003</option>
                                            <option value="AWS-CH-004">AWS-CH-004</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Date *</label>
                                        <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Start Time *</label>
                                        <input required type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Duration (mins) *</label>
                                        <input required type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Timezone</label>
                                        <select value={formData.timezone} onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                                            <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
                                            <option value="UTC">UTC</option>
                                            <option value="America/New_York">EST (New York)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Max Students</label>
                                        <input type="number" value={formData.maxStudents} onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Recurring</label>
                                        <select value={formData.recurring} onChange={(e) => setFormData({ ...formData, recurring: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                                            <option value="none">None</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                    {formData.recurring !== 'none' && (
                                        <div>
                                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Recurring End Date</label>
                                            <input type="date" value={formData.recurringEndDate} onChange={(e) => setFormData({ ...formData, recurringEndDate: e.target.value })} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                                    <button type="button" onClick={resetForm} className="btn btn-outline">Cancel</button>
                                    <button type="submit" className="btn btn-primary">{editingSchedule ? 'Update Schedule' : 'Create Schedule'}</button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
