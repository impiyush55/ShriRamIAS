/**
 * PUBLIC BLOG DETAIL PAGE
 * Accessible without login from landing page
 * Features: Text Highlighting, Bookmarking, Comments
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import BookmarkButton from '../components/common/BookmarkButton';
import RelatedArticles from '../components/blog/RelatedArticles';
import TrendingArticles from '../components/blog/TrendingArticles';
import '../styles/blogs.css';

// Mock blog data for public blogs
const publicBlogs = {
    '1': {
        id: 1,
        title: 'Unconventional Wisdom: Breaking the Mold in UPSC Preparation',
        category: 'Strategy',
        author: 'Dr. Rajesh Kumar',
        authorAvatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=4F46E5&color=fff',
        publishedDate: 'Jan 15, 2026',
        readTime: '10 min read',
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        content: `
            <p>The Civil Services Examination demands not just hard work, but smart work. While conventional wisdom suggests following a rigid study pattern, successful candidates often chart their own unique paths.</p>
            
            <h3>1. The Myth of 18-Hour Study Days</h3>
            <p>Many aspirants believe that studying for 18 hours a day is the key to success. However, research shows that quality trumps quantity. A focused 6-8 hour study session with proper breaks is far more effective than marathon study sessions that lead to burnout.</p>
            
            <h3>2. Embrace Your Learning Style</h3>
            <p>Not everyone learns the same way. Some are visual learners who benefit from diagrams and flowcharts, while others are auditory learners who retain information better through discussions and lectures. Identify your learning style and customize your preparation accordingly.</p>
            
            <h3>3. The Power of Strategic Ignorance</h3>
            <p>One of the most unconventional yet effective strategies is knowing what NOT to study. The UPSC syllabus is vast, but not everything carries equal weight. Focus on high-yield topics and don't get lost in the minutiae.</p>
            
            <h3>4. Build a Personal Knowledge Network</h3>
            <p>Instead of studying in isolation, create a network of fellow aspirants. Regular discussions, mock interviews, and peer teaching can provide perspectives you might miss while studying alone.</p>
            
            <h3>5. The Art of Intelligent Guessing</h3>
            <p>In Prelims, elimination is as important as knowledge. Develop the skill of intelligent guessing by understanding question patterns and eliminating obviously wrong options.</p>
            
            <h3>Conclusion</h3>
            <p>Success in UPSC is not about following a predetermined path but about finding what works for YOU. Be willing to experiment, adapt, and create your own unconventional wisdom.</p>
        `
    },
    '2': {
        id: 2,
        title: 'What, Where, When? Mastering Current Affairs',
        category: 'Current Affairs',
        author: 'Priya Sharma',
        authorAvatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=059669&color=fff',
        publishedDate: 'Jan 12, 2026',
        readTime: '8 min read',
        thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        content: `
            <p>Current affairs form the backbone of UPSC preparation. The "What, Where, When" framework helps you organize and retain vast amounts of information effectively.</p>
            
            <h3>The WWW Framework</h3>
            <p><strong>What:</strong> Understand the core issue or event<br>
            <strong>Where:</strong> Geographical context and stakeholders<br>
            <strong>When:</strong> Timeline and historical background</p>
            
            <h3>Daily Current Affairs Routine</h3>
            <p>Dedicate 2-3 hours daily to current affairs. Read The Hindu, Indian Express, and PIB releases. Make concise notes focusing on facts, not opinions.</p>
            
            <h3>Linking Current Affairs to Static Syllabus</h3>
            <p>Every current event has roots in static topics. For example, a new environmental policy connects to constitutional provisions, international agreements, and governance mechanisms.</p>
        `
    },
    '3': {
        id: 3,
        title: 'From News - Let\'s Talk: Analyzing Daily Headlines',
        category: 'Current Affairs',
        author: 'Amit Verma',
        authorAvatar: 'https://ui-avatars.com/api/?name=Amit+Verma&background=F59E0B&color=fff',
        publishedDate: 'Jan 10, 2026',
        readTime: '12 min read',
        thumbnail: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        content: `
            <p>Newspaper reading is an art that every UPSC aspirant must master. It's not about reading everything, but about reading the right things in the right way.</p>
            
            <h3>The 3-Pass Method</h3>
            <p><strong>First Pass:</strong> Scan headlines and identify important news<br>
            <strong>Second Pass:</strong> Read selected articles in detail<br>
            <strong>Third Pass:</strong> Make notes and link to syllabus</p>
            
            <h3>Critical Analysis</h3>
            <p>Don't just consume news passively. Ask: Why is this important? What are the implications? How does it affect governance, economy, or society?</p>
        `
    }
};

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

    useEffect(() => {
        const fetchBlog = async () => {
            const { getBlogByIdApi } = await import('../api/blogApi');
            const res = await getBlogByIdApi(blogId);
            if (res.success) {
                setBlog(res.data);
                if (res.data.comments) setComments([...res.data.comments, ...comments]);
            }
        };
        fetchBlog();
    }, [blogId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const { updateBlogEngagementApi } = await import('../api/blogApi');
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
        <div className="blog-detail-page" style={{ background: '#f9fafb', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Header */}
            <header style={{
                background: 'white',
                padding: '2rem 5%',
                borderBottom: '1px solid #e5e7eb',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <button onClick={() => navigate('/')} style={{ border: 'none', background: 'transparent', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                    <i className="ri-arrow-left-line"></i> Back to Home
                </button>

                <div className="actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <BookmarkButton blog={blog} size="large" showLabel={true} />
                    <button
                        onClick={() => window.print()}
                        title="Print / Save as PDF"
                        style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280' }}
                    >
                        <i className="ri-printer-line"></i>
                    </button>
                    <button
                        title="Share"
                        style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280' }}
                    >
                        <i className="ri-share-line"></i>
                    </button>
                </div>
            </header>

            <div className="container" style={{
                maxWidth: '1200px',
                margin: '2rem auto',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) 1fr',
                gap: '2rem',
                padding: '0 1rem'
            }}>
                {/* Mobile responsive styles */}
                <style>{`
                    @media (max-width: 968px) {
                        .container {
                            grid-template-columns: 1fr !important;
                        }
                        .blog-sidebar {
                            order: -1;
                        }
                    }
                    @media (max-width: 640px) {
                        .blog-detail-page header {
                            padding: 1rem 5% !important;
                        }
                        .blog-detail-page header .actions {
                            gap: 0.5rem !important;
                        }
                        .blog-main-content {
                            padding: 1.5rem !important;
                        }
                        .blog-main-content h1 {
                            font-size: 1.75rem !important;
                        }
                    }
                `}</style>

                {/* Main Content */}
                <main className="blog-main-content" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <span className="category-badge" style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>{blog.category}</span>

                    <h1 style={{ fontSize: '2.5rem', color: '#111827', margin: '1rem 0', lineHeight: 1.2 }}>{blog.title}</h1>

                    <div className="author-meta" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                        <img src={blog.authorAvatar || `https://ui-avatars.com/api/?name=${blog.author || 'Admin'}&background=4F46E5&color=fff`} alt="Author" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <div>
                            <p style={{ fontWeight: 600, color: '#374151', margin: 0 }}>{blog.author}</p>
                            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{blog.publishedDate} · {blog.readTime}</span>
                        </div>
                    </div>

                    <div className="content-toolbar" style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>TOOLS:</span>
                        <button onClick={handleHighlight} style={{ border: '1px solid #cbd5e1', background: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <i className="ri-mark-pen-line" style={{ color: '#eab308' }}></i> Highlight Text
                        </button>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>(Select text and click highlight)</span>
                    </div>

                    {/* Blog Body */}
                    <article
                        ref={contentRef}
                        className="prose"
                        style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#374151', whiteSpace: 'pre-line' }}
                        dangerouslySetInnerHTML={{
                            __html: blog.content?.includes('<') ? blog.content : blog.content
                        }}
                    />

                    {/* Comments Section */}
                    <div className="comments-section" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Discussion ({comments.length})</h3>

                        <form onSubmit={handleAddComment} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                            <img src="https://ui-avatars.com/api/?name=You" alt="You" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                            <div style={{ flex: 1 }}>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add to the discussion..."
                                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', minHeight: '100px', resize: 'vertical' }}
                                />
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '8px 24px' }}>Post Comment</button>
                            </div>
                        </form>

                        <div className="comments-list">
                            {comments.map(comment => (
                                <div key={comment.id} className="comment" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <img src={comment.avatar} alt={comment.user} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 600, color: '#111827' }}>{comment.user}</span>
                                            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>• {comment.date}</span>
                                        </div>
                                        <p style={{ color: '#4b5563', lineHeight: 1.5 }}>{comment.text}</p>
                                        <button style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '0.85rem', marginTop: '0.5rem', cursor: 'pointer', padding: 0 }}>Reply</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="blog-sidebar">
                    {/* Search Widget */}
                    <div className="widget" style={{ marginBottom: '2rem' }}>
                        <div style={{ position: 'relative' }}>
                            <i className="ri-search-line" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '12px', border: '1px solid #e5e7eb', outline: 'none' }}
                            />
                        </div>
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
                    <div className="widget" style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Stay Updated</h3>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>Get notifications for new content and exam updates.</p>
                        <button className="btn btn-primary" style={{ width: '100%' }}>Subscribe</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
