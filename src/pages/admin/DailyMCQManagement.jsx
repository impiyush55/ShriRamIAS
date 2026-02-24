/**
 * DAILY MCQ MANAGEMENT PAGE
 * Admin interface to manage daily quizzes
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutApi } from '../../api/authApi';
import '../../styles/dashboard.css';
import '../../styles/admin-dashboard.css';

// Dummy Data for MCQs
const dummyMCQs = [
    {
        id: 1,
        date: '2025-06-15',
        question: 'Which of the following articles of the Indian Constitution deals with the Election Commission?',
        category: 'Polity',
        status: 'published',
        options: {
            A: 'Article 324',
            B: 'Article 325',
            C: 'Article 326',
            D: 'Article 327'
        },
        correct: 'A',
        explanation: 'Article 324 of the Constitution provides that the power of superintendence, direction and control of elections to parliament, state legislatures, the office of president of India and the office of vice-president of India shall be vested in the election commission.'
    },
    {
        id: 2,
        date: '2025-06-15',
        question: 'The term "Green Hydrogen" refers to hydrogen produced by?',
        category: 'Science & Tech',
        status: 'published',
        options: {
            A: 'Steam Methane Reforming',
            B: 'Coal Gasification',
            C: 'Electrolysis using Renewable Energy',
            D: 'Nuclear Energy'
        },
        correct: 'C',
        explanation: 'Green hydrogen is defined as hydrogen produced by splitting water into hydrogen and oxygen using renewable electricity.'
    },
    {
        id: 3,
        date: '2025-06-14',
        question: 'Who among the following was the founder of the "Servants of India Society"?',
        category: 'History',
        status: 'archived',
        options: {
            A: 'Bal Gangadhar Tilak',
            B: 'Gopal Krishna Gokhale',
            C: 'Dadabhai Naoroji',
            D: 'M.G. Ranade'
        },
        correct: 'B',
        explanation: 'The Servants of India Society was formed in Pune, Maharashtra, on June 12, 1905 by Gopal Krishna Gokhale.'
    }
];

export default function DailyMCQManagement() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [mcqs, setMcqs] = useState([]);
    const [filteredMcqs, setFilteredMcqs] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Filter States
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDateFilter, setSelectedDateFilter] = useState('');
    const [loading, setLoading] = useState(true);

    // Add MCQ Drawer State
    const [isAddMCQOpen, setIsAddMCQOpen] = useState(false);
    const [newMCQ, setNewMCQ] = useState({
        question: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Current Affairs',
        status: 'published',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: 'A',
        explanation: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterData();
    }, [filterCategory, searchQuery, selectedDateFilter, mcqs]);

    const loadData = async () => {
        setLoading(true);
        const currentUser = getCurrentUser();
        setUser(currentUser);
        // Load data
        setMcqs(dummyMCQs);
        setFilteredMcqs(dummyMCQs);
        setLoading(false);
    };

    const filterData = () => {
        let filtered = mcqs;

        if (filterCategory !== 'all') {
            filtered = filtered.filter(item => item.category === filterCategory);
        }

        if (selectedDateFilter) {
            filtered = filtered.filter(item => item.date === selectedDateFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.question.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredMcqs(filtered);
    };

    const handleLogout = async () => {
        await logoutApi();
        navigate('/login.html');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMCQ(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddMCQ = (e) => {
        e.preventDefault();

        const newItem = {
            id: mcqs.length + 1,
            date: newMCQ.date,
            question: newMCQ.question,
            category: newMCQ.category,
            status: newMCQ.status,
            options: {
                A: newMCQ.optionA,
                B: newMCQ.optionB,
                C: newMCQ.optionC,
                D: newMCQ.optionD
            },
            correct: newMCQ.correctOption,
            explanation: newMCQ.explanation
        };

        const updatedList = [newItem, ...mcqs];
        setMcqs(updatedList);
        setIsAddMCQOpen(false);

        // Reset form
        setNewMCQ({
            question: '',
            date: new Date().toISOString().split('T')[0],
            category: 'Current Affairs',
            status: 'published',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            correctOption: 'A',
            explanation: ''
        });

        alert('Daily MCQ created successfully!');
    };

    const getStatusClass = (status) => {
        return status === 'published' ? 'status-badge active' : 'status-badge inactive';
    };

    // Stats
    const stats = {
        total: mcqs.length,
        today: mcqs.filter(m => m.date === new Date().toISOString().split('T')[0]).length,
        polity: mcqs.filter(m => m.category === 'Polity').length,
        history: mcqs.filter(m => m.category === 'History').length
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <i className="ri-loader-4-line rotating"></i>
                <p>Loading mcqs...</p>
            </div>
        );
    }

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
                    <button
                        className="mobile-close-btn bg-transparent border-none text-white text-2xl cursor-pointer"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <a href="/admin/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard Overview
                    </a>



                    <div className="nav-section-title">Academic Content</div>

                    <a href="/admin/daily-mcqs" className="nav-item active">
                        <i className="ri-question-mark"></i>
                        Daily MCQs
                    </a>



                </nav>


            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="flex items-center gap-4">
                        <button
                            className="menu-toggle-btn md:hidden bg-transparent border-none text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1>Daily MCQ Management</h1>
                            <p>Create and manage daily current affairs questions</p>
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

                {/* Summary Cards */}
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">
                            <i className="ri-question-answer-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.total}</h3>
                            <p>Total MCQs</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">All time</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-success">
                        <div className="stat-icon">
                            <i className="ri-calendar-check-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.today}</h3>
                            <p>Active Today</p>
                            <div className="stat-meta">
                                <span className="stat-change positive">Live</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-info">
                        <div className="stat-icon">
                            <i className="ri-book-open-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.polity}</h3>
                            <p>Polity Qs</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Category focus</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card stat-warning">
                        <div className="stat-icon">
                            <i className="ri-history-line"></i>
                        </div>
                        <div className="stat-content">
                            <h3>{stats.history}</h3>
                            <p>History Qs</p>
                            <div className="stat-meta">
                                <span className="stat-subtitle">Category focus</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unified Search & Filter Control Bar */}
                <div className="unified-controls">
                    <div className="search-pill-container">
                        <i className="ri-search-line search-icon-pill"></i>
                        <input
                            type="text"
                            placeholder="Search question text..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-pill"
                        />
                    </div>

                    <div className="filters-actions">
                        <input
                            type="date"
                            className="pill-select min-w-auto pr-4"
                            value={selectedDateFilter}
                            onChange={(e) => setSelectedDateFilter(e.target.value)}
                        />

                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="pill-select"
                        >
                            <option value="all">All Categories</option>
                            <option value="Polity">Polity</option>
                            <option value="History">History</option>
                            <option value="Geography">Geography</option>
                            <option value="Economy">Economy</option>
                            <option value="Science & Tech">Science & Tech</option>
                            <option value="Current Affairs">Current Affairs</option>
                        </select>

                        <button
                            className="btn-pill-primary"
                            onClick={() => setIsAddMCQOpen(true)}
                        >
                            <i className="ri-add-line"></i>
                            Add MCQ
                        </button>
                    </div>
                </div>

                {/* Question Table */}
                <div className="section p-0 overflow-hidden">
                    <div className="table-container m-0">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th className="pl-6 w-[120px]">Date</th>
                                    <th>Question</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th className="text-center">Correct</th>
                                    <th className="text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMcqs.map(item => (
                                    <tr key={item.id}>
                                        <td className="pl-6 whitespace-nowrap">
                                            {new Date(item.date).toLocaleDateString('en-GB')}
                                        </td>
                                        <td>
                                            <div className="font-medium text-gray-800 max-w-[400px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {item.question}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="role-badge bg-gray-100 text-gray-700">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={getStatusClass(item.status)}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="text-center font-bold text-emerald-500">
                                            {item.correct}
                                        </td>
                                        <td className="text-right pr-6">
                                            <div className="action-buttons justify-end">
                                                <button className="btn-icon" title="View Details">
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                <button className="btn-icon" title="Edit">
                                                    <i className="ri-pencil-line"></i>
                                                </button>
                                                <button className="btn-icon text-red-600 bg-red-100" title="Delete">
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredMcqs.length === 0 && (
                            <div className="empty-state py-16 px-8">
                                <i className="ri-question-answer-line"></i>
                                <p>No MCQs found matching your criteria</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add MCQ Drawer */}
            {isAddMCQOpen && (
                <div className="drawer-backdrop" onClick={() => setIsAddMCQOpen(false)}></div>
            )}

            <div className={`user-drawer ${isAddMCQOpen ? 'open' : ''} w-[550px]`}>
                <div className="drawer-header">
                    <h2>Add Daily MCQ</h2>
                    <button className="close-drawer-btn" onClick={() => setIsAddMCQOpen(false)}>
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <form className="drawer-body" onSubmit={handleAddMCQ}>
                    <div className="form-section">
                        <h4 className="form-section-title">Question Details</h4>

                        <div className="drawer-form-group">
                            <label>Question Text</label>
                            <textarea
                                name="question"
                                value={newMCQ.question}
                                onChange={handleInputChange}
                                className="drawer-textarea"
                                required
                                placeholder="Type the question here..."
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="flex gap-4">
                            <div className="drawer-form-group flex-1">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newMCQ.date}
                                    onChange={handleInputChange}
                                    className="drawer-input"
                                    required
                                />
                            </div>
                            <div className="drawer-form-group flex-1">
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={newMCQ.category}
                                    onChange={handleInputChange}
                                    className="drawer-select"
                                >
                                    <option value="Polity">Polity</option>
                                    <option value="History">History</option>
                                    <option value="Geography">Geography</option>
                                    <option value="Economy">Economy</option>
                                    <option value="Science & Tech">Science & Tech</option>
                                    <option value="Current Affairs">Current Affairs</option>
                                    <option value="Environment">Environment</option>
                                </select>
                            </div>
                        </div>

                        <div className="drawer-form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={newMCQ.status}
                                onChange={handleInputChange}
                                className="drawer-select"
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-section">
                        <h4 className="form-section-title">Options & Answer</h4>

                        <div className="drawer-form-group">
                            <label>Option A</label>
                            <input
                                type="text"
                                name="optionA"
                                value={newMCQ.optionA}
                                onChange={handleInputChange}
                                className="drawer-input"
                                required
                                placeholder="Option A text"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Option B</label>
                            <input
                                type="text"
                                name="optionB"
                                value={newMCQ.optionB}
                                onChange={handleInputChange}
                                className="drawer-input"
                                required
                                placeholder="Option B text"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Option C</label>
                            <input
                                type="text"
                                name="optionC"
                                value={newMCQ.optionC}
                                onChange={handleInputChange}
                                className="drawer-input"
                                required
                                placeholder="Option C text"
                            />
                        </div>
                        <div className="drawer-form-group">
                            <label>Option D</label>
                            <input
                                type="text"
                                name="optionD"
                                value={newMCQ.optionD}
                                onChange={handleInputChange}
                                className="drawer-input"
                                required
                                placeholder="Option D text"
                            />
                        </div>

                        <div className="drawer-form-group">
                            <label>Correct Answer</label>
                            <div className="flex gap-4">
                                {['A', 'B', 'C', 'D'].map(opt => (
                                    <label key={opt} className="flex items-center gap-2 cursor-pointer font-normal">
                                        <input
                                            type="radio"
                                            name="correctOption"
                                            value={opt}
                                            checked={newMCQ.correctOption === opt}
                                            onChange={handleInputChange}
                                        />
                                        Option {opt}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="drawer-form-group">
                            <label>Explanation</label>
                            <textarea
                                name="explanation"
                                value={newMCQ.explanation}
                                onChange={handleInputChange}
                                className="drawer-textarea"
                                placeholder="Why is this answer correct?"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </form>

                <div className="drawer-footer">
                    <button className="btn-secondary" onClick={() => setIsAddMCQOpen(false)}>
                        Cancel
                    </button>
                    <button className="btn-primary-form" onClick={handleAddMCQ}>
                        Create Question
                    </button>
                </div>
            </div>
        </div>
    );
}
