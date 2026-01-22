/**
 * RELATED ARTICLES COMPONENT
 * Shows related blog articles based on category, tags, and GS paper
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogsApi } from '../../api/blogApi';

export default function RelatedArticles({ currentBlog, maxArticles = 4, basePath = '/student/blogs' }) {
    const navigate = useNavigate();
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentBlog) {
            loadRelatedArticles();
        }
    }, [currentBlog]);

    const loadRelatedArticles = async () => {
        setLoading(true);
        try {
            const response = await getAllBlogsApi();
            if (response.success) {
                const related = findRelatedArticles(response.data, currentBlog);
                setRelatedArticles(related.slice(0, maxArticles));
            }
        } catch (error) {
            console.error('Error loading related articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const findRelatedArticles = (allBlogs, current) => {
        // Filter out current blog
        const otherBlogs = allBlogs.filter(blog => blog.id !== current.id);

        // Score each blog based on similarity
        const scoredBlogs = otherBlogs.map(blog => {
            let score = 0;

            // Same category (highest weight - 70%)
            if (blog.category === current.category) {
                score += 70;
            }

            // Same GS Paper (20%)
            if (blog.gsPaper && current.gsPaper && blog.gsPaper === current.gsPaper) {
                score += 20;
            }

            // Same exam stage (10%)
            if (blog.examStage && current.examStage && blog.examStage === current.examStage) {
                score += 10;
            }

            // Same author (bonus 5%)
            if (blog.author === current.author) {
                score += 5;
            }

            // Featured blogs get slight boost
            if (blog.featured) {
                score += 3;
            }

            return { ...blog, score };
        });

        // Sort by score (descending) and then by views
        return scoredBlogs
            .sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return (b.views || 0) - (a.views || 0);
            });
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

    if (loading) {
        return (
            <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
                <div style={{ textAlign: 'center', color: '#9CA3AF' }}>
                    <i className="ri-loader-4-line rotating" style={{ fontSize: '2rem' }}></i>
                    <p style={{ marginTop: '1rem' }}>Loading related articles...</p>
                </div>
            </div>
        );
    }

    if (relatedArticles.length === 0) {
        return null;
    }

    return (
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <i className="ri-article-line" style={{ color: '#4F46E5' }}></i>
                Related Articles
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {relatedArticles.map(article => (
                    <div
                        key={article.id}
                        onClick={() => navigate(`${basePath}/${article.id}`)}
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            padding: '1rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            border: '1px solid #F3F4F6'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F9FAFB';
                            e.currentTarget.style.borderColor = '#E5E7EB';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = '#F3F4F6';
                        }}
                    >
                        {/* Thumbnail */}
                        {article.thumbnail && (
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '8px',
                                background: `url(${article.thumbnail}) center/cover`,
                                flexShrink: 0,
                                position: 'relative'
                            }}>
                                {article.category && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '4px',
                                        left: '4px',
                                        padding: '2px 6px',
                                        background: getCategoryColor(article.category),
                                        color: 'white',
                                        fontSize: '0.65rem',
                                        fontWeight: '600',
                                        borderRadius: '4px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {article.category.substring(0, 3)}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                color: '#111827',
                                marginBottom: '0.5rem',
                                lineHeight: '1.4',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {article.title}
                            </h4>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                fontSize: '0.75rem',
                                color: '#9CA3AF'
                            }}>
                                {article.author && (
                                    <span>
                                        <i className="ri-user-line"></i> {article.author}
                                    </span>
                                )}
                                {article.readTime && (
                                    <span>
                                        <i className="ri-time-line"></i> {article.readTime}
                                    </span>
                                )}
                                {article.views && (
                                    <span>
                                        <i className="ri-eye-line"></i> {article.views}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/student/blogs')}
                style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    padding: '0.75rem',
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#4F46E5',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#EEF2FF';
                    e.currentTarget.style.borderColor = '#4F46E5';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                }}
            >
                <i className="ri-article-line"></i> View All Blogs
            </button>
        </div>
    );
}
