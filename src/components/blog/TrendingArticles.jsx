/**
 * TRENDING ARTICLES WIDGET
 * Shows trending/popular articles based on views
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogsApi } from '../../api/blogApi';

export default function TrendingArticles({ maxArticles = 5, timeframe = 'week', basePath = '/student/blogs' }) {
    const navigate = useNavigate();
    const [trendingArticles, setTrendingArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTrendingArticles();
    }, [timeframe]);

    const loadTrendingArticles = async () => {
        setLoading(true);
        try {
            const response = await getAllBlogsApi();
            if (response.success) {
                // Sort by views (descending) and take top N
                const trending = response.data
                    .filter(blog => blog.status === 'Published')
                    .sort((a, b) => (b.views || 0) - (a.views || 0))
                    .slice(0, maxArticles);
                setTrendingArticles(trending);
            }
        } catch (error) {
            console.error('Error loading trending articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatViews = (views) => {
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}k`;
        }
        return views;
    };

    if (loading) {
        return (
            <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
                <div style={{ textAlign: 'center', color: '#9CA3AF' }}>
                    <i className="ri-loader-4-line rotating"></i>
                </div>
            </div>
        );
    }

    if (trendingArticles.length === 0) {
        return null;
    }

    return (
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <i className="ri-fire-line" style={{ color: '#F59E0B' }}></i>
                Trending Now
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {trendingArticles.map((article, index) => (
                    <div
                        key={article.id}
                        onClick={() => navigate(`${basePath}/${article.id}`)}
                        style={{
                            display: 'flex',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F9FAFB';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        {/* Rank Number */}
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: index < 3 ? 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)' : '#F3F4F6',
                            color: index < 3 ? 'white' : '#6B7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            flexShrink: 0
                        }}>
                            {index + 1}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#111827',
                                marginBottom: '0.4rem',
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
                                {article.category && (
                                    <span style={{
                                        padding: '2px 6px',
                                        background: '#F3F4F6',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        fontWeight: '600'
                                    }}>
                                        {article.category}
                                    </span>
                                )}
                                <span>
                                    <i className="ri-eye-line"></i> {formatViews(article.views || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
