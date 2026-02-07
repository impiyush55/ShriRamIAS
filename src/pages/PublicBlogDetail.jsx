/**
 * PUBLIC BLOG DETAIL PAGE
 * Accessible without login from landing page
 * Features: Text Highlighting, Bookmarking, Comments, Reader Mode, Progress Bar
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import BookmarkButton from '../components/common/BookmarkButton';
import RelatedArticles from '../components/blog/RelatedArticles';
import TrendingArticles from '../components/blog/TrendingArticles';
import { getBlogByIdApi, updateBlogEngagementApi } from '../api/blogApi';
import MentorshipModal from '../components/common/MentorshipModal';
// Remove strict CSS import if using Tailwind, or keep if standard CSS is needed for specific widgets
// import '../styles/blogs.css';

// --- New Reader Components ---

function ProgressBar() {
    const [width, setWidth] = useState(0);

    const scrollHeight = () => {
        const el = document.documentElement;
        const ScrollTop = el.scrollTop || document.body.scrollTop;
        const ScrollHeight = el.scrollHeight || document.body.scrollHeight;
        const percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;
        setWidth(percent);
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHeight);
        return () => window.removeEventListener('scroll', scrollHeight);
    });

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', zIndex: 9999, background: 'transparent' }}>
            <div style={{ height: '100%', background: '#4f46e5', width: `${width}%`, transition: 'width 0.1s' }}></div>
        </div>
    );
}

function ReaderControls({ fontSize, setFontSize, isDarkMode, setIsDarkMode }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: isDarkMode ? '#1e293b' : 'white',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            borderRadius: '999px',
            padding: '6px 16px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
            {/* Font Size Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px', borderRight: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0' }}>
                <button
                    onClick={() => setFontSize(prev => Math.max(prev - 2, 14))}
                    title="Smaller Text"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px'
                    }}
                >
                    <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'serif' }}>A</span>
                </button>
                <button
                    onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
                    title="Larger Text"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isDarkMode ? '#e2e8f0' : '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px'
                    }}
                >
                    <span style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'serif' }}>A</span>
                </button>
            </div>

            {/* Theme Toggle */}
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isDarkMode ? '#fbbf24' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                }}
            >
                <i className={isDarkMode ? "ri-sun-fill" : "ri-moon-line"} style={{ fontSize: '1.2rem' }}></i>
            </button>
        </div>
    );
}

export default function PublicBlogDetail() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([
        { id: 1, user: 'Rahul Kumar', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Great insights! This really changed my perspective.', date: '2 hours ago' },
        { id: 2, user: 'Priya Singh', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Very helpful article. Thank you for sharing!', date: '5 hours ago' }
    ]);
    const [newComment, setNewComment] = useState('');
    const contentRef = useRef(null);

    // Reader Mode State
    const [fontSize, setFontSize] = useState(18);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showFloatingCTA, setShowFloatingCTA] = useState(false);
    const [showMentorshipModal, setShowMentorshipModal] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await getBlogByIdApi(blogId);
            if (res.success) {
                setBlog(res.data);
                if (res.data.comments) setComments([...res.data.comments, ...comments]);
            }
        };
        fetchBlog();
    }, [blogId]);

    // Floating CTA scroll handler
    useEffect(() => {
        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setShowFloatingCTA(scrollPercent > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        await updateBlogEngagementApi(blogId, 'comment', { text: newComment });

        const comment = {
            id: Date.now(),
            user: 'You',
            avatar: 'https://ui-avatars.com/api/?name=You&background=random',
            text: newComment,
            date: 'Just now'
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    const handleHighlight = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'highlight-text';
        span.style.backgroundColor = '#fef08a';
        span.style.cursor = 'pointer';
        span.title = 'Click to remove highlight';

        try {
            range.surroundContents(span);
            span.onclick = () => {
                const parent = span.parentNode;
                while (span.firstChild) parent.insertBefore(span.firstChild, span);
                parent.removeChild(span);
            };
        } catch (e) {
            console.log("Could not highlight across elements");
        }
        selection.removeAllRanges();
    };

    if (!blog) return <div className="page-loading"><i className="ri-loader-4-line rotating"></i></div>;

    return (
        <div className={`blog-detail-page ${isDarkMode ? 'bg-slate-900 text-slate-300' : 'bg-slate-50 text-slate-800'}`} style={{ minHeight: '100vh', paddingBottom: '4rem', transition: 'background-color 0.3s, color 0.3s' }}>
            <ProgressBar />

            {/* Floating CTA Button */}
            {showFloatingCTA && (
                <button
                    onClick={() => setShowMentorshipModal(true)}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        color: 'white',
                        padding: '14px 24px',
                        borderRadius: '50px',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
                        zIndex: 50,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s',
                        animation: 'slideInUp 0.5s ease-out'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 15px 30px rgba(79, 70, 229, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.4)';
                    }}
                >
                    <i className="ri-user-voice-line" style={{ fontSize: '1.25rem' }}></i>
                    Book Free Session
                </button>
            )}

            <style>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            {/* Header */}
            <header style={{
                background: isDarkMode ? '#1e293b' : 'white',
                padding: '1rem 5%',
                borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e5e7eb',
                position: 'sticky',
                top: 0,
                zIndex: 40,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.3s, border-color 0.3s'
            }}>
                <button onClick={() => navigate('/blogs')} style={{ border: 'none', background: 'transparent', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: isDarkMode ? '#cbd5e1' : '#4b5563', fontWeight: 500 }}>
                    <i className="ri-arrow-left-line"></i> Back to Blogs
                </button>

                {/* Centered Reader Controls */}
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                    <ReaderControls fontSize={fontSize} setFontSize={setFontSize} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                </div>

                <div className="actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <BookmarkButton blog={blog} size="small" showLabel={false} />
                    <button
                        onClick={() => window.print()}
                        title="Print"
                        style={{ border: 'none', background: 'transparent', fontSize: '1.25rem', cursor: 'pointer', color: isDarkMode ? '#94a3b8' : '#6b7280' }}
                    >
                        <i className="ri-printer-line"></i>
                    </button>
                    <button
                        title="Share on WhatsApp"
                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank')}
                        style={{ border: 'none', background: 'transparent', fontSize: '1.25rem', cursor: 'pointer', color: isDarkMode ? '#25D366' : '#25D366' }}
                    >
                        <i className="ri-whatsapp-line"></i>
                    </button>
                </div>
            </header>

            <div className="container" style={{
                maxWidth: '1280px',
                margin: '2rem auto',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) 350px',
                gap: '3rem',
                padding: '0 1.5rem'
            }}>
                {/* Mobile responsive styles */}
                <style>{`
                    @media (max-width: 1024px) {
                        .container {
                            grid-template-columns: 1fr !important;
                        }
                        .blog-sidebar {
                            display: none; /* Hide sidebar on small screens or move to bottom if preferred */
                        }
                    }
                    @media (max-width: 640px) {
                        .blog-main-content {
                            padding: 1.5rem !important;
                        }
                        .blog-main-content h1 {
                            font-size: 1.75rem !important;
                        }
                    }
                `}</style>

                {/* Main Content */}
                <main className="blog-main-content" style={{
                    background: isDarkMode ? '#1e293b' : 'white',
                    padding: '3rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    transition: 'background-color 0.3s'
                }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <span className="category-badge" style={{ background: isDarkMode ? '#312e81' : '#e0e7ff', color: isDarkMode ? '#818cf8' : '#4338ca', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                            {blog.category}
                        </span>
                    </div>

                    <h1 style={{ fontSize: '2.5rem', color: isDarkMode ? 'white' : '#111827', margin: '0 0 1.5rem 0', lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.025em' }}>
                        {blog.title}
                    </h1>

                    <div className="author-meta" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #f3f4f6' }}>
                        <img src={blog.authorAvatar || `https://ui-avatars.com/api/?name=${blog.author || 'Admin'}&background=4F46E5&color=fff`} alt="Author" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid white' }} />
                        <div>
                            <p style={{ fontWeight: 700, color: isDarkMode ? '#e2e8f0' : '#374151', margin: 0 }}>{blog.author}</p>
                            <span style={{ fontSize: '0.85rem', color: isDarkMode ? '#94a3b8' : '#6b7280' }}>{blog.publishedDate} · {blog.readTime}</span>
                        </div>
                    </div>

                    <div className="content-toolbar" style={{ marginBottom: '2rem', padding: '1rem', background: isDarkMode ? '#0f172a' : '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isDarkMode ? '#94a3b8' : '#64748b' }}>TOOLS:</span>
                        <button onClick={handleHighlight} style={{ border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1', background: isDarkMode ? '#1e293b' : 'white', color: isDarkMode ? '#e2e8f0' : '#475569', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                            <i className="ri-mark-pen-line" style={{ color: '#eab308' }}></i> Highlight Text
                        </button>
                    </div>

                    {/* Blog Body */}
                    <article
                        ref={contentRef}
                        className="prose"
                        style={{
                            fontSize: `${fontSize}px`,
                            lineHeight: 1.8,
                            color: isDarkMode ? '#cbd5e1' : '#374151',
                            whiteSpace: 'pre-line',
                            maxWidth: 'none'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: blog.content?.includes('<') ? blog.content : blog.content
                        }}
                    />

                    {/* Inline Lead Generation CTA */}
                    <div style={{
                        margin: '4rem 0',
                        padding: '2.5rem',
                        background: isDarkMode ? 'linear-gradient(135deg, #1e293b 0%, #312e81 100%)' : 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                        borderRadius: '16px',
                        border: isDarkMode ? '1px solid #475569' : '1px solid #c7d2fe',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: isDarkMode ? 'white' : '#1e293b' }}>
                                Ready to Excel in UPSC?
                            </h3>
                            <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem', color: isDarkMode ? '#cbd5e1' : '#475569' }}>
                                Get personalized mentorship from UPSC toppers and boost your preparation strategy.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {['One-on-one guidance', 'Personalized study plan', 'Answer writing practice', 'Mock interview prep'].map((benefit, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: isDarkMode ? '#e2e8f0' : '#334155' }}>
                                        <i className="ri-checkbox-circle-fill" style={{ color: '#10b981', fontSize: '1.25rem' }}></i>
                                        <span style={{ fontSize: '0.95rem' }}>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ background: isDarkMode ? '#0f172a' : 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: isDarkMode ? 'white' : '#1e293b', textAlign: 'center' }}>
                                Book Your Free Session
                            </h4>
                            <button
                                onClick={() => setShowMentorshipModal(true)}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                    color: 'white',
                                    padding: '14px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    marginBottom: '1rem',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Book Free Session →
                            </button>
                            <p style={{ fontSize: '0.8rem', textAlign: 'center', color: isDarkMode ? '#94a3b8' : '#64748b', margin: 0 }}>
                                No credit card required • 100% Free
                            </p>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="comments-section" style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e5e7eb' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 700, color: isDarkMode ? 'white' : '#111827' }}>
                            Discussion ({comments.length})
                        </h3>

                        <form onSubmit={handleAddComment} style={{ marginBottom: '3rem', display: 'flex', gap: '1.5rem' }}>
                            <img src="https://ui-avatars.com/api/?name=You" alt="You" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                            <div style={{ flex: 1 }}>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add to the discussion..."
                                    style={{
                                        width: '100%', padding: '1.25rem', borderRadius: '12px',
                                        border: isDarkMode ? '1px solid #475569' : '1px solid #e2e8f0',
                                        background: isDarkMode ? '#1e293b' : 'white',
                                        color: isDarkMode ? 'white' : 'inherit',
                                        minHeight: '120px', resize: 'vertical',
                                        outline: 'none', transition: 'border 0.2s',
                                        fontFamily: 'inherit'
                                    }}
                                />
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '10px 28px', borderRadius: '8px', cursor: 'pointer' }}>Post Comment</button>
                            </div>
                        </form>

                        <div className="comments-list">
                            {comments.map(comment => (
                                <div key={comment.id} className="comment" style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <img src={comment.avatar} alt={comment.user} style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 700, color: isDarkMode ? '#e2e8f0' : '#111827' }}>{comment.user}</span>
                                            <span style={{ fontSize: '0.85rem', color: isDarkMode ? '#94a3b8' : '#6b7280' }}>• {comment.date}</span>
                                        </div>
                                        <p style={{ color: isDarkMode ? '#cbd5e1' : '#4b5563', lineHeight: 1.6, fontSize: '1rem' }}>{comment.text}</p>
                                        <button style={{ background: 'none', border: 'none', color: isDarkMode ? '#818cf8' : '#4f46e5', fontSize: '0.85rem', marginTop: '0.5rem', cursor: 'pointer', padding: 0, fontWeight: 500 }}>Reply</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Sidebar - Sticky */}
                <aside className="blog-sidebar" style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>

                    {/* Lead Generation: Mentorship Widget */}
                    <div style={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        padding: '2rem',
                        borderRadius: '16px',
                        boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2)',
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        <i className="ri-user-voice-line" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', opacity: 0.95 }}></i>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700, color: 'white' }}>Need Guidance?</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.95, marginBottom: '1.25rem', lineHeight: 1.5 }}>Book a free mentorship session with UPSC toppers</p>
                        <button
                            onClick={() => setShowMentorshipModal(true)}
                            style={{
                                width: '100%',
                                background: 'white',
                                color: '#4f46e5',
                                padding: '12px',
                                borderRadius: '8px',
                                border: 'none',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Book Free Session →
                        </button>
                    </div>

                    {/* Related Articles */}
                    <div style={{ marginBottom: '2rem' }}>
                        <RelatedArticles currentBlog={blog} maxArticles={4} basePath="/blogs" />
                    </div>

                    {/* Trending Articles */}
                    <div style={{ marginBottom: '2rem' }}>
                        <TrendingArticles maxArticles={5} basePath="/blogs" />
                    </div>

                    {/* Newsletter */}
                    <div className="widget" style={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                        padding: '2rem',
                        borderRadius: '16px',
                        boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2)',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        <i className="ri-mail-send-line" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Stay Updated</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem' }}>Get notifications for new content and exam updates.</p>
                        <input type="email" placeholder="Email address" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', marginBottom: '0.75rem', fontSize: '0.9rem', outline: 'none' }} />
                        <button style={{ width: '100%', background: 'white', color: '#4f46e5', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Subscribe</button>
                    </div>
                </aside>
            </div>

            {/* Mentorship Modal */}
            <MentorshipModal
                isOpen={showMentorshipModal}
                onClose={() => setShowMentorshipModal(false)}
            />
        </div>
    );
}
