/**
 * BOOKMARK CONTEXT
 * Global state management for bookmarked blogs
 * Persists to localStorage
 */

import { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error('useBookmarks must be used within BookmarkProvider');
    }
    return context;
};

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load bookmarks from localStorage on mount
    useEffect(() => {
        try {
            const savedBookmarks = localStorage.getItem('blog_bookmarks');
            if (savedBookmarks) {
                setBookmarks(JSON.parse(savedBookmarks));
            }
        } catch (error) {
            console.error('Error loading bookmarks:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        if (!loading) {
            try {
                localStorage.setItem('blog_bookmarks', JSON.stringify(bookmarks));
            } catch (error) {
                console.error('Error saving bookmarks:', error);
            }
        }
    }, [bookmarks, loading]);

    // Check if a blog is bookmarked
    const isBookmarked = (blogId) => {
        return bookmarks.some(bookmark => bookmark.id === blogId);
    };

    // Add bookmark
    const addBookmark = (blog) => {
        if (!isBookmarked(blog.id)) {
            const newBookmark = {
                ...blog,
                bookmarkedAt: new Date().toISOString()
            };
            setBookmarks(prev => [newBookmark, ...prev]);
            return true;
        }
        return false;
    };

    // Remove bookmark
    const removeBookmark = (blogId) => {
        setBookmarks(prev => prev.filter(bookmark => bookmark.id !== blogId));
        return true;
    };

    // Toggle bookmark
    const toggleBookmark = (blog) => {
        if (isBookmarked(blog.id)) {
            removeBookmark(blog.id);
            return false; // Removed
        } else {
            addBookmark(blog);
            return true; // Added
        }
    };

    // Clear all bookmarks
    const clearAllBookmarks = () => {
        setBookmarks([]);
    };

    // Get bookmark count
    const getBookmarkCount = () => {
        return bookmarks.length;
    };

    const value = {
        bookmarks,
        loading,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        clearAllBookmarks,
        getBookmarkCount
    };

    return (
        <BookmarkContext.Provider value={value}>
            {children}
        </BookmarkContext.Provider>
    );
};
