/**
 * FACULTY DASHBOARD - INTERACTIVE VERSION
 * Main dashboard for faculty/instructor users
 * Shows assigned courses and teaching statistics
 * 
 * INTERACTIVE FEATURES:
 * - Click any course card to view course-specific statistics
 * - Dashboard stats update dynamically based on selected course
 * - "View All Courses" button resets to overall statistics
 * - Visual highlight shows which course is currently selected
 * 
 * DATA SOURCE: All data comes from hardcoded facultyData.js (NO BACKEND)
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import { getCoursesByInstructorApi } from '../../api/courseApi';
import {
    getFacultyOverallStats,
    getCourseStats,
    transformCourseToDashboardStats
} from '../../data/facultyData';
import '../../styles/dashboard.css';

export default function FacultyDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);

    // Dashboard statistics (updates based on selected course)
    const [stats, setStats] = useState({
        assignedCourses: 0,
        totalStudents: 0,
        averageRating: 0,
        liveSessions: 0
    });

    // Track which course is currently selected (null = all courses view)
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // Additional course details shown when a course is selected
    const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Live Sessions State
    const [showLiveSessionModal, setShowLiveSessionModal] = useState(false);
    const [liveSessions, setLiveSessions] = useState([
        {
            id: 1,
            title: 'Modern Indian History - Revision',
            course: 'Foundation Course',
            scheduledTime: '2024-01-25 10:00 AM',
            duration: '2 hours',
            status: 'scheduled',
            studentsJoined: 0
        },
        {
            id: 2,
            title: 'Ethics Case Studies Discussion',
            course: 'Mains Answer Writing',
            scheduledTime: '2024-01-26 3:00 PM',
            duration: '1.5 hours',
            status: 'scheduled',
            studentsJoined: 0
        }
    ]);
    const [newSession, setNewSession] = useState({
        title: '',
        course: '',
        date: '',
        time: '',
        duration: '1'
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    /**
     * Load initial dashboard data
     * Fetches courses and sets overall statistics as default view
     */
    const loadDashboardData = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Fetch assigned courses from API
        const coursesRes = await getCoursesByInstructorApi(currentUser.id);

        if (coursesRes.success) {
            setCourses(coursesRes.data);

            // Load overall statistics from facultyData.js (default view)
            const overallStats = getFacultyOverallStats(currentUser.id);
            setStats(overallStats);
        }

        setLoading(false);
    };

    /**
     * Handle course selection
     * Updates dashboard stats to show course-specific data
     * @param {number} courseId - ID of the selected course
     */
    const handleCourseSelect = (courseId) => {
        // Get course-specific statistics from facultyData.js
        const courseStats = getCourseStats(user.id, courseId);

        if (courseStats) {
            // Update selected course ID (for visual highlight)
            setSelectedCourseId(courseId);

            // Store detailed course info for additional display
            setSelectedCourseDetails(courseStats);

            // Transform course stats to dashboard format and update
            const dashboardStats = transformCourseToDashboardStats(courseStats);
            setStats(dashboardStats);
        }
    };

    /**
     * Reset to overall view (all courses)
     * Shows aggregated statistics across all courses
     */
    const handleViewAllCourses = () => {
        // Clear selection
        setSelectedCourseId(null);
        setSelectedCourseDetails(null);

        // Load overall statistics
        const overallStats = getFacultyOverallStats(user.id);
        setStats(overallStats);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    // Live Session Handlers
    const handleScheduleSession = (e) => {
        e.preventDefault();
        const session = {
            id: liveSessions.length + 1,
            title: newSession.title,
            course: newSession.course,
            scheduledTime: `${newSession.date} ${newSession.time}`,
            duration: `${newSession.duration} hour${newSession.duration > 1 ? 's' : ''}`,
            status: 'scheduled',
            studentsJoined: 0
        };
        setLiveSessions([...liveSessions, session]);
        setShowLiveSessionModal(false);
        setNewSession({ title: '', course: '', date: '', time: '', duration: '1' });
    };

    const handleStartSession = (sessionId) => {
        setLiveSessions(liveSessions.map(session =>
            session.id === sessionId
                ? { ...session, status: 'live', studentsJoined: Math.floor(Math.random() * 50) + 10 }
                : session
        ));
    };

    const handleEndSession = (sessionId) => {
        setLiveSessions(liveSessions.map(session =>
            session.id === sessionId
                ? { ...session, status: 'completed' }
                : session
        ));
    };


    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
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
                        <span className="role-badge faculty">Faculty</span>
                    </div>
                    <button
                        className="mobile-close-btn md:hidden bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <a href="/faculty/dashboard" className="nav-item active">
                        <i className="ri-dashboard-line"></i>
                        Dashboard
                    </a>
                    <a href="/faculty/courses" className="nav-item">
                        <i className="ri-book-line"></i>
                        My Courses
                    </a>
                    <a href="/faculty/students" className="nav-item">
                        <i className="ri-user-line"></i>
                        My Students
                    </a>
                    <a href="/faculty/content" className="nav-item">
                        <i className="ri-file-add-line"></i>
                        Add Content
                    </a>
                    <a href="/faculty/blogs" className="nav-item">
                        <i className="ri-article-line"></i>
                        Blog Content
                    </a>
                    <a href="/" className="nav-item">
                        <i className="ri-home-line"></i>
                        Back to Home
                    </a>
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
                            <h1>Faculty Dashboard</h1>
                            <p>Welcome back, {user?.name}!</p>
                            {/* Show which view is active */}
                            {selectedCourseId ? (
                                <p className="view-indicator">
                                    <i className="ri-focus-line"></i>
                                    Viewing: <strong>{selectedCourseDetails?.courseName}</strong>
                                </p>
                            ) : (
                                <p className="view-indicator">
                                    <i className="ri-dashboard-line"></i>
                                    Viewing: <strong>All Courses Overview</strong>
                                </p>
                            )}
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

                {/* View Toggle Button */}
                {selectedCourseId && (
                    <div className="view-toggle">
                        <button
                            onClick={handleViewAllCourses}
                            className="btn btn-outline btn-sm"
                        >
                            <i className="ri-arrow-left-line"></i>
                            View All Courses
                        </button>
                    </div>
                )}

                {/* Stats Cards - DYNAMICALLY UPDATED */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-book-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.assignedCourses}</h3>
                            <p>{selectedCourseId ? 'Selected Course' : 'Assigned Courses'}</p>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-user-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.totalStudents}</h3>
                            <p>{selectedCourseId ? 'Enrolled Students' : 'Total Students'}</p>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-star-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.averageRating}</h3>
                            <p>{selectedCourseId ? 'Course Rating' : 'Average Rating'}</p>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-video-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.liveSessions}</h3>
                            <p>Live Sessions</p>
                        </div>
                    </div>
                </div>

                {/* Additional Course Details (shown when course is selected) */}
                {selectedCourseDetails && (
                    <div className="course-details-panel">
                        <h3>
                            <i className="ri-information-line"></i>
                            Course Details
                        </h3>
                        <div className="details-grid">
                            <div className="detail-item">
                                <i className="ri-user-follow-line"></i>
                                <div>
                                    <strong>{selectedCourseDetails.activeStudents}</strong>
                                    <span>Active Students</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <i className="ri-file-list-line"></i>
                                <div>
                                    <strong>{selectedCourseDetails.assignments}</strong>
                                    <span>Assignments</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <i className="ri-percent-line"></i>
                                <div>
                                    <strong>{selectedCourseDetails.completionRate}%</strong>
                                    <span>Completion Rate</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <i className="ri-trophy-line"></i>
                                <div>
                                    <strong>{selectedCourseDetails.averageScore}%</strong>
                                    <span>Average Score</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <i className="ri-user-add-line"></i>
                                <div>
                                    <strong>{selectedCourseDetails.studentsThisMonth}</strong>
                                    <span>New This Month</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <i className="ri-calendar-line"></i>
                                <div>
                                    <strong>{selectedCourseDetails.nextSession}</strong>
                                    <span>Next Session</span>
                                </div>
                            </div>
                        </div>
                        <div className="recent-activity">
                            <i className="ri-pulse-line"></i>
                            <strong>Recent Activity:</strong> {selectedCourseDetails.recentActivity}
                        </div>
                    </div>
                )}

                {/* My Courses - INTERACTIVE (Click to update stats) */}
                <div className="section">
                    <h2>
                        My Courses
                        <span className="section-hint">
                            <i className="ri-information-line"></i>
                            Click any course to view detailed statistics
                        </span>
                    </h2>
                    <div className="courses-grid">
                        {courses.map(course => (
                            <div
                                key={course.id}
                                className={`course-card cursor-pointer ${selectedCourseId === course.id ? 'selected' : ''}`}
                                onClick={() => handleCourseSelect(course.id)}
                            >
                                {/* Selection indicator */}
                                {selectedCourseId === course.id && (
                                    <div className="selection-badge">
                                        <i className="ri-check-line"></i> Selected
                                    </div>
                                )}

                                <img src={course.thumbnail} alt={course.title} />
                                <div className="course-info">
                                    <h3>{course.title}</h3>
                                    <p className="course-category">{course.category}</p>
                                    <div className="course-stats">
                                        <span>
                                            <i className="ri-user-line"></i>
                                            {course.enrolled} students
                                        </span>
                                        <span>
                                            <i className="ri-star-fill"></i>
                                            {course.rating}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering course selection
                                            navigate(`/faculty/courses/${course.id}`);
                                        }}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Manage Course
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Sessions Section */}
                <div className="section">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="m-0">Live Sessions</h2>
                        <button
                            onClick={() => setShowLiveSessionModal(true)}
                            className="btn btn-primary flex items-center gap-2"
                        >
                            <i className="ri-add-line"></i>
                            Schedule New Session
                        </button>
                    </div>

                    <div className="live-sessions-grid">
                        {liveSessions.map(session => (
                            <div key={session.id} className={`live-session-card ${session.status}`}>
                                <div className="session-header">
                                    <h3>{session.title}</h3>
                                    <span className={`status-badge ${session.status}`}>
                                        {session.status === 'live' && <i className="ri-live-fill"></i>}
                                        {session.status === 'scheduled' && <i className="ri-calendar-line"></i>}
                                        {session.status === 'completed' && <i className="ri-check-line"></i>}
                                        {session.status.toUpperCase()}
                                    </span>
                                </div>
                                <p className="session-course">{session.course}</p>
                                <div className="session-details">
                                    <div className="detail">
                                        <i className="ri-time-line"></i>
                                        <span>{session.scheduledTime}</span>
                                    </div>
                                    <div className="detail">
                                        <i className="ri-timer-line"></i>
                                        <span>{session.duration}</span>
                                    </div>
                                    {session.status === 'live' && (
                                        <div className="detail">
                                            <i className="ri-user-line"></i>
                                            <span>{session.studentsJoined} students joined</span>
                                        </div>
                                    )}
                                </div>
                                <div className="session-actions">
                                    {session.status === 'scheduled' && (
                                        <button
                                            onClick={() => handleStartSession(session.id)}
                                            className="btn btn-success"
                                        >
                                            <i className="ri-play-circle-line"></i>
                                            Start Session
                                        </button>
                                    )}
                                    {session.status === 'live' && (
                                        <>
                                            <button className="btn btn-primary">
                                                <i className="ri-vidicon-line"></i>
                                                Join Session
                                            </button>
                                            <button
                                                onClick={() => handleEndSession(session.id)}
                                                className="btn btn-danger"
                                            >
                                                <i className="ri-stop-circle-line"></i>
                                                End Session
                                            </button>
                                        </>
                                    )}
                                    {session.status === 'completed' && (
                                        <button className="btn btn-outline" disabled>
                                            <i className="ri-check-double-line"></i>
                                            Completed
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schedule Session Modal */}
                {showLiveSessionModal && (
                    <div className="modal-backdrop fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-4" onClick={() => setShowLiveSessionModal(false)}>
                        <div
                            className="bg-white rounded-xl shadow-2xl w-full max-w-[500px] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            style={{ backgroundColor: '#ffffff', color: '#1f2937' }}
                        >
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white" style={{ backgroundColor: '#ffffff' }}>
                                <h2 className="text-xl font-bold text-gray-800 m-0" style={{ color: '#1f2937' }}>Schedule Live Session</h2>
                                <button
                                    className="text-gray-400 hover:text-gray-600 transition-colors bg-transparent border-none cursor-pointer text-2xl flex items-center justify-center p-0"
                                    onClick={() => setShowLiveSessionModal(false)}
                                >
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto bg-white" style={{ backgroundColor: '#ffffff' }}>
                                <form onSubmit={handleScheduleSession} className="flex flex-col gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ color: '#374151' }}>
                                            Session Title
                                        </label>
                                        <input
                                            type="text"
                                            value={newSession.title}
                                            onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                                            placeholder="e.g., Modern Indian History - Revision"
                                            required
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 bg-white"
                                            style={{ backgroundColor: '#ffffff', color: '#374151' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ color: '#374151' }}>
                                            Course
                                        </label>
                                        <select
                                            value={newSession.course}
                                            onChange={(e) => setNewSession({ ...newSession, course: e.target.value })}
                                            required
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 bg-white"
                                            style={{ backgroundColor: '#ffffff', color: '#374151' }}
                                        >
                                            <option value="">Select a course</option>
                                            {courses.map(course => (
                                                <option key={course.id} value={course.title}>{course.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ color: '#374151' }}>
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                value={newSession.date}
                                                onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                                                required
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 bg-white"
                                                style={{ backgroundColor: '#ffffff', color: '#374151' }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ color: '#374151' }}>
                                                Time
                                            </label>
                                            <input
                                                type="time"
                                                value={newSession.time}
                                                onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                                                required
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 bg-white"
                                                style={{ backgroundColor: '#ffffff', color: '#374151' }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ color: '#374151' }}>
                                            Duration (hours)
                                        </label>
                                        <select
                                            value={newSession.duration}
                                            onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 bg-white"
                                            style={{ backgroundColor: '#ffffff', color: '#374151' }}
                                        >
                                            <option value="0.5">30 minutes</option>
                                            <option value="1">1 hour</option>
                                            <option value="1.5">1.5 hours</option>
                                            <option value="2">2 hours</option>
                                            <option value="3">3 hours</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all flex items-center justify-center gap-2 mt-2 border-none cursor-pointer"
                                    >
                                        <i className="ri-calendar-check-line"></i>
                                        Schedule Session
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <button
                            onClick={() => navigate('/faculty/content')}
                            className="action-card"
                        >
                            <i className="ri-video-add-line"></i>
                            <span>Upload Lecture</span>
                        </button>

                        <button
                            onClick={() => navigate('/faculty/students')}
                            className="action-card"
                        >
                            <i className="ri-user-search-line"></i>
                            <span>View Students</span>
                        </button>

                        <button
                            onClick={() => navigate('/faculty/schedule')}
                            className="action-card"
                        >
                            <i className="ri-calendar-line"></i>
                            <span>Schedule Class</span>
                        </button>

                        <button
                            onClick={() => navigate('/faculty/announcements')}
                            className="action-card"
                        >
                            <i className="ri-notification-line"></i>
                            <span>Send Announcement</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
