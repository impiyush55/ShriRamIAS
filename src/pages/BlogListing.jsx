import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogsApi } from '../api/blogApi';
import '../styles/modern-blog.css'; // Importing the CSS file we just created
import MentorshipModal from '../components/common/MentorshipModal';
import QuickRevisionCards from '../components/common/QuickRevisionCards';

export default function BlogListing() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [expandedClusters, setExpandedClusters] = useState({
        'All Blogs': true
    });
    const [showMentorshipModal, setShowMentorshipModal] = useState(false);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        const response = await getAllBlogsApi();
        if (response.success) {
            setBlogs(response.data);
        }
    };

    const toggleCluster = (clusterName) => {
        setExpandedClusters(prev => ({
            ...prev,
            [clusterName]: !prev[clusterName]
        }));
    };

    // Cluster Configuration
    const clusters = [
        {
            name: 'Knowledge & Awareness',
            group: 'Knowledge',
            subcategories: [
                'Unconventional Wisdom',
                'What, Where, When?',
                'From News – Let\'s Talk',
                'From The Arts',
                'History, Thoughts & The World'
            ]
        },
        {
            name: 'Science & Society',
            group: 'Knowledge',
            subcategories: [
                'The Universe & Our Environment',
                'From The World Of Science & Tech',
                'Law & Society',
                'Philosophy & Civilisation'
            ]
        },
        {
            name: 'Personal Growth',
            group: 'Self Development',
            subcategories: [
                'Personalities We Love',
                'Psychology & The Individual',
                'Media & Creativity',
                'Motivating The Self'
            ]
        },
        {
            name: 'Exam Prep',
            icon: 'ri-book-open-line',
            group: 'Self Development',
            subcategories: [
                'UPSC Preparation Tips',
                'Exam Notification',
                'From Mocks to Marks',
                'RAS Preparation',
                'UPPCS Preparation',
                'BPSC Preparation',
                'WBSC Preparation',
                'MPSC Preparation',
                'MPPSC Preparation',
                'Other State PCS Preparation'
            ],
            displayGroups: [
                {
                    title: 'Central Services',
                    items: ['UPSC Preparation Tips', 'Exam Notification', 'From Mocks to Marks']
                },
                {
                    title: 'State PCS Exams',
                    items: ['RAS Preparation', 'UPPCS Preparation', 'BPSC Preparation', 'WBSC Preparation', 'MPSC Preparation', 'MPPSC Preparation', 'Other State PCS Preparation']
                }
            ]
        },
        {
            name: 'Current Affairs',
            icon: 'ri-newspaper-line',
            group: 'Updates',
            subcategories: [
                'Daily News',
                'Weekly Analysis',
                'Monthly Digest',
                'Editorials',
                'National',
                'International'
            ]
        }
    ];

    // Helper to get grouped clusters
    const getGroupedClusters = () => {
        const groups = {};
        clusters.forEach(cluster => {
            const groupName = cluster.group || 'Other';
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(cluster);
        });
        return groups;
    };

    const filterBlogsByCluster = (clusterName) => {
        let filtered = blogs;

        // Search Filter
        if (searchQuery) {
            filtered = filtered.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Active Category Filter (Nav)
        if (activeCategory !== 'All') {
            if (activeCategory === 'Trending') {
                // Mock Trending Logic: blogs with views > X, or just random subset
                // Since we don't have views in dummy data, let's take even ID blogs
                filtered = filtered.filter((b, i) => i % 2 === 0);
            } else if (activeCategory === 'Editor\'s Picks') {
                // Mock Editor's Picks: blogs with specific IDs
                filtered = filtered.filter((b, i) => i % 3 === 0);
            }
            // If active category is a Cluster Name
            else if (activeCategory === clusterName) {
                // Keep all in this cluster
            }
            // If active category is a specific subcategory
            else {
                // Check if any subcategory matches the active category, AND if the blog belongs to that category
                // This logic logic might be strict. Let's start with basic filtering.
                // For now, let's filter by matching "category" or "cluster" fields:
                const isSubcategoryOfCluster = clusters.find(c => c.name === clusterName)?.subcategories.includes(activeCategory);

                if (isSubcategoryOfCluster) {
                    filtered = filtered.filter(b => b.category === activeCategory);
                } else {
                    // If the active category doesn't belong to this cluster at all, we might show nothing?
                    // Let's implement global filtering that HIDES clusters that don't match.
                }
            }
        }

        // If sorting strictly by clusters, we need to ensure "All" or Search doesn't break
        if (activeCategory === 'Trending' || activeCategory === 'Editor\'s Picks') {
            return filtered; // Return cross-cluster results
        }

        return filtered.filter(b => b.cluster === clusterName || !b.cluster); // Fallback for legacy data
    };

    // Helper to determine if a cluster should be visible based on active category
    const isClusterVisible = (cluster) => {
        if (activeCategory === 'All') return true;
        if (activeCategory === cluster.name) return true; // User selected "Exam Prep"
        if (cluster.subcategories.includes(activeCategory)) return true; // User selected "UPSC Preparation Tips"
        return false;
    };

    return (
        <div className="modern-blog-page">

            {/* 1. Hero Section */}
            <section className="blog-hero">
                <h1>LMS <span className="highlight">Insights</span></h1>
                <p>Deep dives into Civil Services, Policy, and Human Thought.</p>

                {/* Search Bar */}
                <div className="hero-search-container">
                    <i className="ri-search-line hero-search-icon"></i>
                    <input
                        type="text"
                        placeholder="Search topics, keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="hero-search-input"
                    />
                </div>
            </section>

            {/* 2. Category Navbar (New Requirement) */}
            {/* 2. Category Explorer (Mega-Menu Style) */}
            <div className="category-explorer">
                <div className="explorer-sidebar modern-scrollbar">
                    {/* Quick Filters */}
                    <div className="sidebar-section">
                        <h4 className="sidebar-section-title">Quick Filters</h4>
                        <div className="sidebar-menu">
                            <div className={`sidebar-item ${activeCategory === 'Editor\'s Picks' ? 'active' : ''}`} onClick={() => setActiveCategory('Editor\'s Picks')}>
                                <span>Editor's Picks</span>
                            </div>
                            <div className={`sidebar-item ${activeCategory === 'Trending' ? 'active' : ''}`} onClick={() => setActiveCategory('Trending')}>
                                <span>Trending</span>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-divider"></div>

                    <div
                        className={`sidebar-item ${activeCategory === 'All' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('All')}
                    >
                        <span>All Categories</span>
                        <span className="item-badge">{blogs.length}</span>
                    </div>

                    {Object.entries(getGroupedClusters()).map(([groupName, groupClusters]) => (
                        <div key={groupName} className="sidebar-section">
                            <h4 className="sidebar-section-title">{groupName}</h4>
                            <div className="sidebar-menu">
                                {groupClusters.map(cluster => (
                                    <div
                                        key={cluster.name}
                                        className={`sidebar-item ${activeCategory === cluster.name ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveCategory(cluster.name);
                                            setSearchQuery('');
                                        }}
                                    >
                                        <span>{cluster.name}</span>
                                        <span className="item-badge">
                                            {blogs.filter(b => b.cluster === cluster.name || !b.cluster).length}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="explorer-content">
                    {activeCategory === 'All' ? (
                        <>
                            <h3>Browse Ideas</h3>
                            <div className="subcat-grid">
                                {clusters.flatMap(c => c.subcategories).slice(0, 12).map(sub => (
                                    <div key={sub} className="subcat-card" onClick={() => setSearchQuery(sub)}>
                                        {sub} <i className="ri-arrow-right-s-line"></i>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h3>{activeCategory}</h3>
                            {/* Find the cluster object */}
                            {(() => {
                                const cluster = clusters.find(c => c.name === activeCategory);
                                if (!cluster) return <p>Latest updates and analytics.</p>;

                                return (
                                    <div className="subcat-grid">
                                        {cluster.subcategories.map(sub => (
                                            <div
                                                key={sub}
                                                className="subcat-card"
                                                onClick={() => setSearchQuery(sub)}
                                                style={{ borderColor: searchQuery === sub ? 'var(--primary-color)' : '' }}
                                            >
                                                {sub} <i className="ri-arrow-right-s-line"></i>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}
                        </>
                    )}
                </div>
            </div>


            {/* Quick Revision Cards */}
            <div className="container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <QuickRevisionCards />
            </div>

            <div className="blog-container">

                {/* Main Content - Single Category Section */}
                <main>
                    <div className="cluster-section">
                        <div className="cluster-header" onClick={() => setExpandedClusters({ ...expandedClusters, 'All Blogs': !expandedClusters['All Blogs'] })}>
                            <h2 className="cluster-title">Latest Articles</h2>
                            <i className={`ri-arrow-down-s-line ${expandedClusters['All Blogs'] ? 'rotate-180' : ''}`} style={{ transition: 'transform 0.3s', fontSize: '1.5rem' }}></i>
                        </div>

                        {expandedClusters['All Blogs'] !== false && (
                            <div className="cluster-grid">
                                {blogs.length > 0 ? (
                                    blogs.slice(0, 12).map(blog => (
                                        <BlogCard key={blog.id} blog={blog} onClick={() => navigate(`/blogs/${blog.id}`)} />
                                    ))
                                ) : (
                                    <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: '#94a3b8', border: '1px dashed #e2e8f0', borderRadius: '12px' }}>
                                        No articles found.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>

                {/* 4. Sidebar Widgets */}
                <aside>
                    {/* Mentorship Session Widget */}
                    <div className="sidebar-widget" style={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        <i className="ri-user-voice-line" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', opacity: 0.95 }}></i>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700, color: 'white' }}>Book Your Free Mentorship Session</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.95, marginBottom: '1.25rem', lineHeight: 1.5 }}>Get personalized guidance from UPSC toppers</p>
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

                    {/* Popular Tags */}
                    <div className="sidebar-widget">
                        <h3 className="widget-title"><i className="ri-hashtag" style={{ color: '#4f46e5' }}></i> Trending Topics</h3>
                        <div className="tag-cloud">
                            {['Ethics', 'Science', 'Motivation', 'UPSC', 'Environment', 'Budget 2024', 'Mental Health'].map(tag => (
                                <span
                                    key={tag}
                                    className="tag-chip"
                                    onClick={() => setSearchQuery(tag)}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Recent Posts Widget */}
                    <div className="sidebar-widget">
                        <h3 className="widget-title">Recent Posts</h3>
                        <div>
                            {blogs.slice(0, 4).map(blog => (
                                <div key={blog.id} className="recent-post-item" onClick={() => navigate(`/blogs/${blog.id}`)}>
                                    <img src={blog.thumbnail || 'https://via.placeholder.com/150'} alt="" className="recent-thumb" />
                                    <div>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem', lineHeight: 1.3 }}>
                                            {blog.title}
                                        </h4>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{blog.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lead Generation: Free Study Material */}
                    <div className="sidebar-widget">
                        <h3 className="widget-title">
                            <i className="ri-file-download-line" style={{ color: '#4f46e5' }}></i> Free Study Material
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { title: 'UPSC Syllabus 2024', icon: 'ri-file-text-line' },
                                { title: 'Previous Year Papers', icon: 'ri-file-list-line' },
                                { title: 'Current Affairs PDF', icon: 'ri-newspaper-line' },
                                { title: 'Essay Writing Guide', icon: 'ri-quill-pen-line' }
                            ].map((resource, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        background: '#f8fafc',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        border: '1px solid transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#eef2ff';
                                        e.currentTarget.style.borderColor = '#4f46e5';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#f8fafc';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                >
                                    <i className={resource.icon} style={{ fontSize: '1.25rem', color: '#4f46e5' }}></i>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155', flex: 1 }}>{resource.title}</span>
                                    <i className="ri-download-line" style={{ fontSize: '1rem', color: '#94a3b8' }}></i>
                                </div>
                            ))}
                        </div>
                        <button
                            style={{
                                width: '100%',
                                marginTop: '1rem',
                                background: '#4f46e5',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'none',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Get Free Access
                        </button>
                    </div>

                    {/* Lead Generation: Community Widget */}
                    <div className="sidebar-widget" style={{
                        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
                        border: '1px solid #c7d2fe'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <i className="ri-group-line" style={{ fontSize: '2rem', color: '#4f46e5' }}></i>
                            </div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 700, color: '#1e293b' }}>Join Our Community</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4f46e5' }}>50K+</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Students</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981' }}>92%</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Success Rate</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowMentorshipModal(true)}
                                style={{
                                    width: '100%',
                                    background: '#4f46e5',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </aside>

            </div>

            {/* Mentorship Modal */}
            <MentorshipModal
                isOpen={showMentorshipModal}
                onClose={() => setShowMentorshipModal(false)}
            />
        </div >
    );
}

// Blog Card Component (Standard CSS)
function BlogCard({ blog, onClick }) {
    return (
        <article className="modern-blog-card" onClick={onClick}>
            <div className="card-thumb-wrapper">
                <img
                    src={blog.thumbnail || 'https://via.placeholder.com/400x250'}
                    alt={blog.title}
                    className="card-thumb-img"
                />
                <div className="card-category-badge">
                    {blog.category}
                </div>
            </div>

            <div className="card-content">
                <div className="card-meta">
                    <span><i className="ri-time-line"></i> {blog.readTime || '5 min'}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                </div>

                <h3 className="card-title">
                    {blog.title}
                </h3>

                <p className="card-excerpt">
                    {blog.excerpt}
                </p>

                <div className="card-footer">
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>By {blog.author}</span>
                    <span className="read-more-btn">
                        Read <i className="ri-arrow-right-line"></i>
                    </span>
                </div>
            </div>
        </article>
    );
}
