/**
 * EVALUATION SYSTEM PAGE
 * Manage student answer copies, evaluator assignment, and grading
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';
import '../../styles/blog-management.css';

// Dummy evaluation data
const dummyEvaluations = [
    {
        id: 1,
        studentName: 'Amit Verma',
        studentId: 'SR-1004',
        testTitle: 'UPSC Mains Mock Test 1 - Essay',
        testType: 'Mains',
        subject: 'Essay Writing',
        submittedOn: '2024-02-05',
        evaluator: 'Dr. K. Sharma',
        status: 'Evaluated',
        score: 85,
        maxScore: 100,
        priority: 'Normal'
    },
    {
        id: 2,
        studentName: 'Sneha Patel',
        studentId: 'SR-1005',
        testTitle: 'Ethics Case Study Assignment',
        testType: 'Mains',
        subject: 'GS-4 Ethics',
        submittedOn: '2024-02-06',
        evaluator: 'Unassigned',
        status: 'Pending Assignment',
        score: null,
        maxScore: 100,
        priority: 'High'
    },
    {
        id: 3,
        studentName: 'Rajesh Kumar',
        studentId: 'SR-1001',
        testTitle: 'History Optional Mock Test',
        testType: 'Optional',
        subject: 'History',
        submittedOn: '2024-02-04',
        evaluator: 'Prof. Priya Singh',
        status: 'Under Evaluation',
        score: null,
        maxScore: 250,
        priority: 'High'
    },
    {
        id: 4,
        studentName: 'Priya Sharma',
        studentId: 'SR-1002',
        testTitle: 'Polity Answer Writing Practice',
        testType: 'Mains',
        subject: 'GS-2 Polity',
        submittedOn: '2024-02-03',
        evaluator: 'Dr. Rajesh Verma',
        status: 'Evaluated',
        score: 72,
        maxScore: 100,
        priority: 'Normal'
    },
    {
        id: 5,
        studentName: 'Vikram Singh',
        studentId: 'SR-1003',
        testTitle: 'Economy Essay Practice',
        testType: 'Mains',
        subject: 'GS-3 Economy',
        submittedOn: '2024-02-06',
        evaluator: 'Unassigned',
        status: 'Pending Assignment',
        score: null,
        maxScore: 100,
        priority: 'Medium'
    },
    {
        id: 6,
        studentName: 'Ananya Reddy',
        studentId: 'SR-1006',
        testTitle: 'International Relations Mock',
        testType: 'Mains',
        subject: 'GS-2 IR',
        submittedOn: '2024-02-02',
        evaluator: 'Dr. K. Sharma',
        status: 'Evaluated',
        score: 90,
        maxScore: 100,
        priority: 'Normal'
    }
];

export default function EvaluationSystem() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);

    // Filters State
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadEvaluations();
    }, []);

    const loadEvaluations = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setEvaluations(dummyEvaluations);
        setLoading(false);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login');
    };

    // Derived Stats
    const stats = {
        total: evaluations.length,
        pendingAssignment: evaluations.filter(e => e.status === 'Pending Assignment').length,
        underEvaluation: evaluations.filter(e => e.status === 'Under Evaluation').length,
        evaluated: evaluations.filter(e => e.status === 'Evaluated').length,
        avgScore: evaluations.filter(e => e.score !== null).length > 0
            ? Math.round(evaluations.filter(e => e.score !== null).reduce((sum, e) => sum + e.score, 0) / evaluations.filter(e => e.score !== null).length)
            : 0
    };

    // Filter Logic
    const filteredEvaluations = evaluations.filter(item => {
        const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.testTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.studentId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        const matchesType = filterType === 'all' || item.testType === filterType;
        const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });

    if (loading) return <div className="dashboard-loading"><i className="ri-loader-4-line rotating"></i></div>;

    return (
        <div className="dashboard-container admin-dashboard blog-management-page">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay fixed top-0 left-0 w-full h-full bg-black/50 z-[999]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header flex justify-between items-center">
                    <div><h2>LMS</h2><span className="role-badge admin">Admin Panel</span></div>
                    <button
                        className="mobile-close-btn bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item"><i className="ri-dashboard-line"></i>Dashboard</a>
                    <div className="nav-section-title">Academic Management</div>
                    <a href="/admin/tests" className="nav-item"><i className="ri-file-list-3-line"></i>Test Management</a>
                    <a href="/admin/evaluation" className="nav-item active"><i className="ri-file-search-line"></i>Evaluation System</a>
                </nav>

            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header sticky-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>Evaluation System</h1>
                            <p>Manage student submissions, evaluator assignment, and grading</p>
                        </div>
                    </div>

                    <div className="header-actions flex flex-wrap gap-3 items-center">
                        <button className="btn btn-primary whitespace-nowrap">
                            <i className="ri-user-add-line"></i> Assign Evaluator
                        </button>
                        <div className="user-info">
                            <div className="user-avatar">
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div className="user-details">
                                <span className="user-name">{user?.name || 'Admin User'}</span>
                                <span className="user-email">{user?.email || 'admin@lms.com'}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="section max-w-[1400px] mx-auto">

                    {/* Dashboard Summary Cards */}
                    <div className="blog-stats-grid">
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-purple-100 text-purple-700">
                                <i className="ri-file-list-3-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Total Submissions</h4>
                                <p>{stats.total}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-amber-100 text-amber-700">
                                <i className="ri-time-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Pending Assignment</h4>
                                <p>{stats.pendingAssignment}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-blue-100 text-blue-700">
                                <i className="ri-edit-circle-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Under Evaluation</h4>
                                <p>{stats.underEvaluation}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-emerald-100 text-emerald-700">
                                <i className="ri-checkbox-circle-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Evaluated</h4>
                                <p>{stats.evaluated}</p>
                            </div>
                        </div>
                        <div className="blog-stat-card">
                            <div className="stat-icon-wrapper bg-indigo-100 text-indigo-700">
                                <i className="ri-star-line"></i>
                            </div>
                            <div className="stat-info">
                                <h4>Average Score</h4>
                                <p>{stats.avgScore}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="blog-filters-bar">
                        <div className="filter-row">
                            <div className="search-field">
                                <i className="ri-search-line"></i>
                                <input
                                    type="text"
                                    placeholder="Search by student name, ID, or test title..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="Pending Assignment">Pending Assignment</option>
                                <option value="Under Evaluation">Under Evaluation</option>
                                <option value="Evaluated">Evaluated</option>
                            </select>
                            <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="all">All Types</option>
                                <option value="Mains">Mains</option>
                                <option value="Optional">Optional</option>
                                <option value="Essay">Essay</option>
                            </select>
                            <select className="filter-select" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                                <option value="all">All Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Normal">Normal</option>
                            </select>
                        </div>
                    </div>

                    {/* Evaluation Table */}
                    <div className="blog-table-wrapper">
                        <table className="blog-table">
                            <thead>
                                <tr>
                                    <th>Student Details</th>
                                    <th>Test Title</th>
                                    <th>Type</th>
                                    <th>Evaluator</th>
                                    <th>Status</th>
                                    <th>Score</th>
                                    <th>Submitted</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvaluations.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="blog-title-cell">
                                                <span className="font-semibold">{item.studentName}</span>
                                                <div className="blog-meta-sub">
                                                    ID: {item.studentId}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="blog-title-cell">
                                                <span>{item.testTitle}</span>
                                                <div className="blog-meta-sub">
                                                    {item.subject} • {item.priority} Priority
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge-pill category-badge">{item.testType}</span></td>
                                        <td>
                                            {item.evaluator === 'Unassigned' ? (
                                                <span className="text-slate-400 italic">Not assigned</span>
                                            ) : (
                                                <span className="font-medium">{item.evaluator}</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge-pill status-badge ${item.status === 'Evaluated' ? 'published' :
                                                item.status === 'Under Evaluation' ? 'review' :
                                                    'draft'
                                                }`}>
                                                {item.status === 'Evaluated' && <i className="ri-checkbox-circle-line"></i>}
                                                {item.status === 'Under Evaluation' && <i className="ri-edit-circle-line"></i>}
                                                {item.status === 'Pending Assignment' && <i className="ri-time-line"></i>}
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            {item.score !== null ? (
                                                <span className="font-semibold text-indigo-600">
                                                    {item.score}/{item.maxScore}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400">-</span>
                                            )}
                                        </td>
                                        <td>{item.submittedOn}</td>
                                        <td>
                                            <div className="action-buttons justify-end">
                                                <button className="btn-icon" title="View Submission" onClick={() => setSelectedEvaluation(item)}>
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                {item.status === 'Pending Assignment' && (
                                                    <button className="btn-icon" title="Assign Evaluator">
                                                        <i className="ri-user-add-line"></i>
                                                    </button>
                                                )}
                                                {item.status === 'Evaluated' && (
                                                    <button className="btn-icon" title="View Feedback">
                                                        <i className="ri-file-text-line"></i>
                                                    </button>
                                                )}
                                                <button className="btn-icon" title="Download">
                                                    <i className="ri-download-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredEvaluations.length === 0 && (
                            <div className="empty-state p-12 text-center text-slate-500">
                                <i className="ri-file-search-line text-5xl mb-4 block opacity-50"></i>
                                <p>No evaluations found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Preview Drawer */}
            <div className={`details-drawer ${selectedEvaluation ? 'open' : ''}`}>
                {selectedEvaluation && (
                    <>
                        <div className="drawer-header">
                            <h3>Submission Details</h3>
                            <button className="drawer-close" onClick={() => setSelectedEvaluation(null)}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="drawer-content">
                            <h2 className="drawer-title-large">{selectedEvaluation.testTitle}</h2>

                            <div className="drawer-section">
                                <h4>Student Information</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-xs text-slate-400">Name</label> <span className="font-medium">{selectedEvaluation.studentName}</span></div>
                                    <div><label className="block text-xs text-slate-400">Student ID</label> <span className="font-medium">{selectedEvaluation.studentId}</span></div>
                                    <div><label className="block text-xs text-slate-400">Submitted On</label> <span className="font-medium">{selectedEvaluation.submittedOn}</span></div>
                                    <div><label className="block text-xs text-slate-400">Priority</label> <span className="badge-pill badge-outline py-0.5 px-2">{selectedEvaluation.priority}</span></div>
                                </div>
                            </div>

                            <div className="drawer-section">
                                <h4>Test Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-xs text-slate-400">Type</label> <span className="font-medium">{selectedEvaluation.testType}</span></div>
                                    <div><label className="block text-xs text-slate-400">Subject</label> <span className="font-medium">{selectedEvaluation.subject}</span></div>
                                    <div><label className="block text-xs text-slate-400">Max Score</label> <span className="font-medium">{selectedEvaluation.maxScore}</span></div>
                                    <div><label className="block text-xs text-slate-400">Status</label> <span className="font-medium">{selectedEvaluation.status}</span></div>
                                </div>
                            </div>

                            <div className="drawer-section">
                                <h4>Evaluation Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-xs text-slate-400">Evaluator</label> <span className="font-medium">{selectedEvaluation.evaluator}</span></div>
                                    <div>
                                        <label className="block text-xs text-slate-400">Score</label>
                                        <span className="font-medium text-indigo-600 text-lg">
                                            {selectedEvaluation.score !== null ? `${selectedEvaluation.score}/${selectedEvaluation.maxScore}` : 'Not graded'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="drawer-section mt-auto">
                                <button className="btn btn-primary w-full mb-2">
                                    <i className="ri-download-line"></i> Download Answer Copy
                                </button>
                                {selectedEvaluation.status === 'Pending Assignment' && (
                                    <button className="btn btn-secondary w-full">
                                        <i className="ri-user-add-line"></i> Assign Evaluator
                                    </button>
                                )}
                                {selectedEvaluation.status === 'Evaluated' && (
                                    <button className="btn btn-secondary w-full">
                                        <i className="ri-file-text-line"></i> View Detailed Feedback
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
