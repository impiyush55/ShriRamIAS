/**
 * MY BOOKMARKS PAGE
 * Display all bookmarked blogs for students
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../../context/BookmarkContext';
import BookmarkButton from '../../components/common/BookmarkButton';
import '../../styles/dashboard.css';
import '../../styles/blogs.css';

export default function MyBookmarks() {
    const navigate = useNavigate();
    const { bookmarks, clearAllBookmarks } = useBookmarks();
    const [sortBy, setSortBy] = useState('recent'); // recent, oldest, title
    const [filterCategory, setFilterCategory] = useState('all');

    // Get unique categories from bookmarks
    const categories = ['all', ...new Set(bookmarks.map(b => b.category).filter(Boolean))];

    // Filter and sort bookmarks
    const getFilteredBookmarks = () => {
        let filtered = [...bookmarks];

        // Filter by category
        if (filterCategory !== 'all') {
            filtered = filtered.filter(b => b.category === filterCategory);
        }

        // Sort
        switch (sortBy) {
            case 'recent':
                filtered.sort((a, b) => new Date(b.bookmarkedAt) - new Date(a.bookmarkedAt));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.bookmarkedAt) - new Date(b.bookmarkedAt));
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredBookmarks = getFilteredBookmarks();

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to remove all bookmarks?')) {
            clearAllBookmarks();
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Strategy': '#4F46E5',
            'Current Affairs': '#059669',
            'Environment': '#10B981',
            'Ethics': '#8B5CF6',
            'Governance': '#0EA5E9',
            'Motivation': '#F59E0B'
        };
        return colors[category] || '#6B7280';
    };

    return (
        <div className="dashboard-container student-dashboard">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>LMS</h2>
                    <span className="role-badge student">Student</span>
                </div>

                <nav className="sidebar-nav">
                    <a href="/student/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard
                    </a>
                    <a href="/student/courses" className="nav-item">
                        <i className="ri-book-2-line"></i>
                        My Courses
                    </a>
                    <a href="/student/browse-courses" className="nav-item">
                        <i className="ri-shopping-cart-line"></i>
                        Browse Courses
                    </a>
                    <a href="/student/tests" className="nav-item">
                        <i className="ri-file-list-3-line"></i>
                        Test Series
                    </a>
                    <a href="/student/blogs" className="nav-item">
                        <i className="ri-article-line"></i>
                        Blogs
                    </a>
                    <a href="/student/bookmarks" className="nav-item active">
                        <i className="ri-bookmark-line"></i>
                        My Bookmarks
                        {bookmarks.length > 0 && (
                            <span className="badge badge-primary">{bookmarks.length}</span>
                        )}
                    </a>
                    <a href="/" className="nav-item">
                        <i className="ri-home-line"></i>
                        Back to Home
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="dashboard-header">
                    <div>
                        <h1>My Bookmarks</h1>
                        <p>Your saved articles for later reading</p>
                    </div>
                    {bookmarks.length > 0 && (
                        <button
                            className="btn-danger"
                            onClick={handleClearAll}
                            style={{ padding: '0.75rem 1.5rem' }}
                        >
                            <i className="ri-delete-bin-line"></i>
                            Clear All
                        </button>
                    )}
                </header>

                {/* Filters */}
                {bookmarks.length > 0 && (
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '2rem',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#6B7280' }}>
                                Sort by:
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="recent">Most Recent</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">Title (A-Z)</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#6B7280' }}>
                                Category:
                            </label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E7EB',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginLeft: 'auto', fontSize: '0.9rem', color: '#6B7280' }}>
                            {filteredBookmarks.length} {filteredBookmarks.length === 1 ? 'article' : 'articles'}
                        </div>
                    </div>
                )}

                {/* Bookmarks Grid */}
                {filteredBookmarks.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <i className="ri-bookmark-line" style={{
                            fontSize: '4rem',
                            color: '#D1D5DB',
                            marginBottom: '1rem'
                        }}></i>
                        <h3 style={{ fontSize: '1.25rem', color: '#111827', marginBottom: '0.5rem' }}>
                            {filterCategory !== 'all' ? 'No bookmarks in this category' : 'No bookmarks yet'}
                        </h3>
                        <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
                            {filterCategory !== 'all'
                                ? 'Try selecting a different category'
                                : 'Start bookmarking articles to read them later'}
                        </p>
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/student/blogs')}
                            style={{ padding: '0.75rem 2rem' }}
                        >
                            <i className="ri-article-line"></i>
                            Browse Blogs
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {filteredBookmarks.map(blog => (
                            <div
                                key={blog.id}
                                style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                                onClick={() => navigate(`/student/blogs/${blog.id}`)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                }}
                            >
                                {/* Bookmark Button */}
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
                                    <BookmarkButton blog={blog} size="medium" />
                                </div>

                                {/* Thumbnail */}
                                {blog.thumbnail && (
                                    <div style={{
                                        height: '180px',
                                        background: `url(${blog.thumbnail}) center/cover`,
                                        position: 'relative'
                                    }}>
                                        {blog.category && (
                                            <span style={{
                                                position: 'absolute',
                                                bottom: '1rem',
                                                left: '1rem',
                                                padding: '0.4rem 0.875rem',
                                                background: getCategoryColor(blog.category),
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                borderRadius: '6px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {blog.category}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        marginBottom: '0.75rem',
                                        fontSize: '0.8rem',
                                        color: '#9CA3AF'
                                    }}>
                                        {blog.date && (
                                            <span>
                                                <i className="ri-calendar-line"></i> {blog.date}
                                            </span>
                                        )}
                                        {blog.readTime && (
                                            <span>
                                                <i className="ri-time-line"></i> {blog.readTime}
                                            </span>
                                        )}
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#111827',
                                        marginBottom: '0.5rem',
                                        lineHeight: '1.4',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {blog.title}
                                    </h3>

                                    {blog.excerpt && (
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: '#6B7280',
                                            lineHeight: '1.6',
                                            marginBottom: '1rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {blog.excerpt}
                                        </p>
                                    )}

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid #F3F4F6'
                                    }}>
                                        {blog.author && (
                                            <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                                                <i className="ri-user-line"></i> {blog.author}
                                            </span>
                                        )}
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: '#9CA3AF',
                                            fontStyle: 'italic'
                                        }}>
                                            Saved {new Date(blog.bookmarkedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
