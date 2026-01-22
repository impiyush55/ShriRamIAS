/**
 * BOOKMARK BUTTON COMPONENT
 * Reusable bookmark toggle button for blog cards
 */

import { useState } from 'react';
import { useBookmarks } from '../../context/BookmarkContext';
import '../../styles/bookmark.css';

export default function BookmarkButton({ blog, size = 'medium', showLabel = false }) {
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const [isAnimating, setIsAnimating] = useState(false);
    const bookmarked = isBookmarked(blog.id);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAnimating(true);
        toggleBookmark(blog);

        setTimeout(() => setIsAnimating(false), 600);
    };

    const sizeClasses = {
        small: 'bookmark-btn-small',
        medium: 'bookmark-btn-medium',
        large: 'bookmark-btn-large'
    };

    return (
        <button
            className={`bookmark-btn ${sizeClasses[size]} ${bookmarked ? 'bookmarked' : ''} ${isAnimating ? 'animating' : ''}`}
            onClick={handleClick}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}
        >
            <i className={bookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'}></i>
            {showLabel && <span>{bookmarked ? 'Saved' : 'Save'}</span>}
        </button>
    );
}
