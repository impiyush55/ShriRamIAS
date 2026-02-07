import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllBlogsApi, getBlogByIdApi, updateBlogEngagementApi } from '../../api/blogApi';
import BookmarkButton from '../../components/common/BookmarkButton';
import RelatedArticles from '../../components/blog/RelatedArticles';
import TrendingArticles from '../../components/blog/TrendingArticles';
import '../../styles/blogs.css';

// Mock data for the detailed view if API doesn't provide enough content
const blogContentMock = `
<p>The Civil Services Examination (CSE) is not just a test of knowledge but a test of character. Every year, lakhs of aspirants start their journey, but only a few make it to the final list. What makes the difference?</p>

<h3>Understanding the Exam Pattern</h3>
<p>The first step is to thoroughly understand the syllabus. The UPSC syllabus is vast, but it is defined. Stick to the syllabus and previous year questions (PYQs).</p>

<h3>The Art of Note Making</h3>
<p>Notes should be concise and revision-friendly. Do not just copy the books. Make flowcharts, diagrams, and bullet points. Your notes should be your primary material for the last month before the exam.</p>

<h3>Consistency is Key</h3>
<p>It is better to study for 6 hours daily for a year than to study 14 hours for a week and then burn out. Create a sustainable schedule.</p>

<h3>Answer Writing</h3>
<p>Knowledge without expression is futile in Mains. Practice answer writing daily after you are done with a significant portion of the syllabus.</p>
`;

export default function StudentBlogDetail() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([
        { id: 1, user: 'Rahul Kumar', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Great strategy! The point about consistency really hit home.', date: '2 hours ago' },
        { id: 2, user: 'Priya Singh', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Could you please elaborate more on the note-making process for Ethics paper?', date: '5 hours ago' }
    ]);
    const [newComment, setNewComment] = useState('');
    const contentRef = useRef(null);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            const response = await getBlogByIdApi(blogId);
            if (response.success) {
                setBlog(response.data);
                if (response.data.comments) setComments([...response.data.comments, ...comments]);
            }
            setLoading(false);
        };
        fetchBlog();
    }, [blogId]);

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

    if (loading) return <div className="page-loading"><i className="ri-loader-4-line rotating"></i></div>;
    if (!blog) return <div className="error-state">Blog not found</div>;

    return (
        <div className="blog-detail-page" style={{ background: '#f9fafb', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Header / Hero */}
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
                <button onClick={() => navigate('/student/blogs')} style={{ border: 'none', background: 'transparent', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                    <i className="ri-arrow-left-line"></i> Back
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

                {/* Add mobile responsive styles */}
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
                        .blog-detail-page header .actions button:not(.bookmark-btn) {
                            width: 36px !important;
                            height: 36px !important;
                            font-size: 1.2rem !important;
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
                        <img src={blog.authorAvatar || "https://ui-avatars.com/api/?name=Author"} alt="Author" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <div>
                            <p style={{ fontWeight: 600, color: '#374151', margin: 0 }}>{blog.author || "SRIRAM's IAS Team"}</p>
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

                    {/* Related Articles - Dynamic */}
                    <div style={{ marginBottom: '2rem' }}>
                        <RelatedArticles currentBlog={blog} maxArticles={4} />
                    </div>

                    {/* Trending Articles */}
                    <div style={{ marginBottom: '2rem' }}>
                        <TrendingArticles maxArticles={5} />
                    </div>

                    {/* Flashcards Widget */}
                    <div className="widget" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1.5rem', borderRadius: '16px', color: 'white', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Revision Card</h3>
                            <i className="ri-flashlight-fill"></i>
                        </div>
                        <div className="mini-flashcard" style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', backdropFilter: 'blur(5px)' }}>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Polity</span>
                            <h4 style={{ fontSize: '1.25rem', margin: '0.5rem 0' }}>Article 21</h4>
                            <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.5 }}>Protection of Life and Personal Liberty. No person shall be deprived of his life or personal liberty except according to procedure established by law.</p>
                        </div>
                        <button style={{ width: '100%', marginTop: '1rem', padding: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>View All Cards</button>
                    </div>

                    {/* Newsletter / Updates */}
                    <div className="widget" style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Stay Updated</h3>
                        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>Get notifications for new content and exam updates.</p>
                        <button className="btn btn-primary" style={{ width: '100%' }}>Turn On Notifications</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
