import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogsApi } from '../../api/blogApi';
import '../../styles/dashboard.css';
import '../../styles/blogs.css';

function Flashcard({ badge, frontTitle, backTitle, backDesc }) {
    const [flipped, setFlipped] = useState(false);

    const getCategoryIcon = (cat) => {
        const map = {
            'Polity': 'ri-government-line',
            'Economics': 'ri-money-dollar-circle-line',
            'History': 'ri-ancient-gate-line',
            'Geography': 'ri-earth-line',
            'Science': 'ri-flask-line'
        };
        return map[cat] || 'ri-book-open-line';
    };

    return (
        <div
            className={`flashcard-container ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(!flipped)}
            style={{
                minWidth: '280px',
                height: '340px',
                perspective: '1500px',
                cursor: 'pointer',
                flexShrink: 0
            }}
        >
            <div className="flashcard-inner" style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : ''
            }}>
                {/* Front Side */}
                <div className="flashcard-front" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'white',
                    borderRadius: '24px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <div className="card-top" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <span style={{
                            background: '#f3f4f6',
                            color: '#4b5563',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <i className={getCategoryIcon(badge)}></i> {badge}
                        </span>
                    </div>

                    <div className="card-center" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <h3 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: '#111827',
                            lineHeight: 1.2,
                            fontFamily: '"Playfair Display", serif'
                        }}>
                            {frontTitle}
                        </h3>
                    </div>

                    <div className="card-bottom">
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: '#f9fafb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6b7280',
                            border: '1px solid #e5e7eb'
                        }}>
                            <i className="ri-arrow-turn-back-line" style={{ fontSize: '1.25rem' }}></i>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem', fontWeight: 500 }}>Tap to Reveal</p>
                    </div>
                </div>

                {/* Back Side */}
                <div className="flashcard-back" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: '#111827', /* Very Dark Grey/Black */
                    backgroundImage: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    color: 'white',
                    borderRadius: '24px',
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'rotateY(180deg)',
                    boxShadow: '0 20px 40px -5px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <span style={{
                            color: '#fbbf24', /* Amber/Gold */
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <i className="ri-lightbulb-flash-line"></i> Answer
                        </span>

                        <h4 style={{
                            fontSize: '1.4rem',
                            marginBottom: '1.5rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            color: '#f9fafb'
                        }}>{backTitle}</h4>

                        <p style={{
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            textAlign: 'center',
                            color: '#d1d5db',
                            fontWeight: 400
                        }}>{backDesc}</p>
                    </div>

                    {/* Decorative Elements */}
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        opacity: 0.1
                    }}>
                        <i className="ri-double-quotes-r" style={{ fontSize: '4rem', color: 'white' }}></i>
                    </div>

                    {/* Bottom Flip Button */}
                    <div style={{
                        marginTop: 'auto',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)'
                    }} onClick={(e) => { e.stopPropagation(); setFlipped(false); }}>
                        <i className="ri-close-line"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Featured blog mock (override if API returns featured)
const featuredBlogMock = {
    id: 99,
    title: 'Cracking UPSC CSE 2025: A Comprehensive Strategy',
    excerpt: 'An in-depth guide to mastering the changing patterns of the Civil Services Examination. Learn how to balance Prelims and Mains preparation effectively.',
    author: 'Dr. Vivek Singh',
    date: 'Jan 20, 2025',
    category: 'Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    readTime: '12 min read'
};

export default function StudentBlogs() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Strategy', 'Current Affairs', 'Mains Preparation', 'Resources', 'Interview', 'Motivation'];

    useEffect(() => {
        loadBlogs();
    }, []);

    useEffect(() => {
        filterBlogs();
    }, [selectedCategory, searchQuery, blogs]);

    const loadBlogs = async () => {
        setLoading(true);
        const response = await getAllBlogsApi();
        if (response.success) {
            setBlogs(response.data);
            setFilteredBlogs(response.data);
        }
        setLoading(false);
    };

    const filterBlogs = () => {
        let result = blogs;

        // Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(blog => blog.category === selectedCategory);
        }

        // Filter by Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(blog =>
                blog.title.toLowerCase().includes(query) ||
                blog.excerpt?.toLowerCase().includes(query)
            );
        }

        setFilteredBlogs(result);
    };

    const handleReadBlog = (blogId) => {
        navigate(`/student/blogs/${blogId}`);
    };

    if (loading) {
        return <div className="page-loading"><i className="ri-loader-4-line rotating"></i></div>;
    }

    return (
        <div className="dashboard-container">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999
                    }}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2>SRIRAM's IAS</h2>
                        <span className="role-badge student">Student</span>
                    </div>
                    <button
                        className="mobile-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <a href="/student/dashboard" className="nav-item">
                        <i className="ri-dashboard-line"></i>
                        Dashboard
                    </a>
                    <a href="/student/courses" className="nav-item">
                        <i className="ri-book-line"></i>
                        My Courses
                    </a>
                    <a href="/student/browse-courses" className="nav-item">
                        <i className="ri-search-line"></i>
                        Browse Courses
                    </a>
                    <a href="/student/tests" className="nav-item">
                        <i className="ri-file-list-line"></i>
                        Tests & Quizzes
                    </a>
                    <a href="/student/blogs" className="nav-item active">
                        <i className="ri-article-line"></i>
                        Blogs & Resources
                    </a>
                    <a href="/" className="nav-item">
                        <i className="ri-home-line"></i>
                        Back to Home
                    </a>
                </nav>


            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="menu-toggle-btn"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                        >
                            <i className="ri-menu-2-line"></i>
                        </button>
                        <div>
                            <h1 style={{ margin: 0 }}>Student Blogs</h1>
                            <p style={{ margin: 0, color: '#6b7280' }}>Knowledge & Resources</p>
                        </div>
                    </div>

                    <div className="header-right" style={{ display: 'flex', gap: '1rem' }}>
                        <button className="notification-btn" style={{
                            background: 'white', border: '1px solid #e5e7eb',
                            color: '#4b5563', width: '40px', height: '40px',
                            borderRadius: '50%', cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', position: 'relative'
                        }}>
                            <i className="ri-notification-3-line" style={{ fontSize: '1.2rem' }}></i>
                            <span className="badge" style={{ position: 'absolute', top: '0', right: '0', background: '#ef4444', border: '2px solid white', width: '10px', height: '10px', borderRadius: '50%' }}></span>
                        </button>
                    </div>
                </header>

                <div className="blogs-content">
                    {/* Featured Hero */}
                    <div className="blogs-hero" style={{
                        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${featuredBlogMock.thumbnail}) center/cover no-repeat`,
                        color: 'white',
                        padding: '4rem 2rem',
                        borderRadius: '24px',
                        marginBottom: '2rem',
                        position: 'relative'
                    }}>
                        <div className="hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <span className="hero-category" style={{ background: '#667eea', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block' }}>{featuredBlogMock.category}</span>
                            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>{featuredBlogMock.title}</h1>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', lineHeight: 1.6 }}>{featuredBlogMock.excerpt}</p>
                            <button onClick={() => handleReadBlog(featuredBlogMock.id)} className="btn btn-primary btn-lg" style={{ padding: '12px 32px', fontSize: '1.1rem' }}>Read Featured Article</button>
                            <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                                <span><i className="ri-calendar-line"></i> {featuredBlogMock.date}</span> &bull; <span><i className="ri-time-line"></i> {featuredBlogMock.readTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Flash Cards Section */}
                    <div className="section mb-12" style={{ marginBottom: '4rem' }}>
                        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Daily Flash Cards <span style={{ fontSize: '1rem', background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px' }}>Active Recall</span></h2>
                        </div>

                        <div className="flashcards-scroll no-scrollbar" style={{
                            display: 'flex',
                            overflowX: 'auto',
                            padding: '0.5rem 0.5rem 2rem 0.5rem',
                            scrollSnapType: 'x mandatory',
                            gap: '2rem'
                        }}>
                            <Flashcard
                                badge="Polity"
                                frontTitle="Article 32"
                                backTitle="Constitutional Remedies"
                                backDesc={'Right to move the Supreme Court for enforcement of Fundamental Rights. Called the "Heart and Soul" of the Constitution.'}
                            />
                            <Flashcard
                                badge="Economics"
                                frontTitle="Fiscal Deficit"
                                backTitle="Budgetary Glossary"
                                backDesc="The difference between the total income of the government (total taxes and non-debt capital receipts) and its total expenditure."
                            />
                            <Flashcard
                                badge="History"
                                frontTitle="Quit India Movement"
                                backTitle="August 8, 1942"
                                backDesc="Launched at the Bombay session of the All-India Congress Committee by Mahatma Gandhi, demanding an end to British Rule of India."
                            />
                            <Flashcard
                                badge="Geography"
                                frontTitle="El Niño"
                                backTitle="Climate Pattern"
                                backDesc="Associated with a band of warm ocean water that develops in the central and east-central equatorial Pacific."
                            />
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="filters-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div className="category-scroll" style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', flex: 1 }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: 'none',
                                        background: selectedCategory === cat ? '#1f2937' : '#f3f4f6',
                                        color: selectedCategory === cat ? 'white' : '#4b5563',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontWeight: 500
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="search-box" style={{ position: 'relative', minWidth: '250px' }}>
                            <i className="ri-search-line" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                            <input
                                type="text"
                                placeholder="Search topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '24px', border: '1px solid #e5e7eb', outline: 'none' }}
                            />
                        </div>
                    </div>

                    {/* Blogs Grid */}
                    {filteredBlogs.length > 0 ? (
                        <div className="blogs-grid modern-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                            {filteredBlogs.map(blog => (
                                <article key={blog.id} className="blog-card" style={{ border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
                                    <div className="blog-image-wrapper" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', marginBottom: '1rem' }}>
                                        <img src={blog.thumbnail} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-scale" />
                                        <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'white', color: '#1f2937', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{blog.category}</span>
                                    </div>

                                    <div className="blog-content">
                                        <div style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{blog.publishedDate}</span>
                                            <span>{blog.readTime}</span>
                                        </div>

                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.4, color: '#111827' }}>{blog.title}</h3>
                                        <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.excerpt}</p>

                                        <button
                                            onClick={() => handleReadBlog(blog.id)}
                                            style={{ background: 'none', border: 'none', color: '#667eea', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                                        >
                                            Read More <i className="ri-arrow-right-line"></i>
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state" style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af' }}>
                            <i className="ri-article-line" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                            <p>No articles found matching your criteria</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
