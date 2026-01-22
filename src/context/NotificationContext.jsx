/**
 * NOTIFICATION CONTEXT
 * Global state management for notifications
 * Handles blog notifications, comment notifications, etc.
 */

import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Load notifications from localStorage on mount
    useEffect(() => {
        try {
            const savedNotifications = localStorage.getItem('notifications');
            if (savedNotifications) {
                const parsed = JSON.parse(savedNotifications);
                setNotifications(parsed);
                setUnreadCount(parsed.filter(n => !n.read).length);
            }
        } catch (error) {
            console.error('Error loading notifications:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Save notifications to localStorage whenever they change
    useEffect(() => {
        if (!loading) {
            try {
                localStorage.setItem('notifications', JSON.stringify(notifications));
                setUnreadCount(notifications.filter(n => !n.read).length);
            } catch (error) {
                console.error('Error saving notifications:', error);
            }
        }
    }, [notifications, loading]);

    // Add new notification
    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now() + Math.random(),
            ...notification,
            read: false,
            createdAt: new Date().toISOString()
        };
        setNotifications(prev => [newNotification, ...prev]);
        return newNotification;
    };

    // Mark notification as read
    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
    };

    // Mark all as read
    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, read: true }))
        );
    };

    // Delete notification
    const deleteNotification = (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    };

    // Clear all notifications
    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Get unread notifications
    const getUnreadNotifications = () => {
        return notifications.filter(n => !n.read);
    };

    // Notification types helper
    const createBlogNotification = (blog) => {
        return addNotification({
            type: 'new_blog',
            title: 'New Blog Post',
            message: `New article: "${blog.title}"`,
            icon: 'ri-article-line',
            color: 'primary',
            link: `/student/blogs/${blog.id}`,
            data: blog
        });
    };

    const createCommentNotification = (comment, blogTitle) => {
        return addNotification({
            type: 'new_comment',
            title: 'New Comment',
            message: `${comment.author} commented on "${blogTitle}"`,
            icon: 'ri-chat-3-line',
            color: 'success',
            link: `/student/blogs/${comment.blogId}`,
            data: comment
        });
    };

    const createQuizNotification = () => {
        return addNotification({
            type: 'daily_quiz',
            title: 'Daily Quiz Available',
            message: 'New daily quiz is ready! Test your knowledge.',
            icon: 'ri-question-answer-line',
            color: 'warning',
            link: '/student/blogs'
        });
    };

    const createExamReminderNotification = (daysLeft) => {
        return addNotification({
            type: 'exam_reminder',
            title: 'Exam Reminder',
            message: `UPSC Prelims in ${daysLeft} days!`,
            icon: 'ri-alarm-warning-line',
            color: 'danger',
            link: '/student/dashboard'
        });
    };

    const value = {
        notifications,
        unreadCount,
        loading,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        getUnreadNotifications,
        // Helper methods
        createBlogNotification,
        createCommentNotification,
        createQuizNotification,
        createExamReminderNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
