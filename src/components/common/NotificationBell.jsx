/**
 * NOTIFICATION BELL COMPONENT
 * Displays notification count and dropdown
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import '../../styles/notifications.css';

export default function NotificationBell() {
    const navigate = useNavigate();
    const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleNotificationClick = (notification) => {
        markAsRead(notification.id);
        if (notification.link) {
            navigate(notification.link);
        }
        setIsOpen(false);
    };

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    const getNotificationColor = (color) => {
        const colors = {
            primary: '#4F46E5',
            success: '#059669',
            warning: '#F59E0B',
            danger: '#DC2626',
            info: '#0EA5E9'
        };
        return colors[color] || colors.primary;
    };

    return (
        <div className="notification-bell-container" ref={dropdownRef}>
            <button
                className="notification-bell-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Notifications"
            >
                <i className="ri-notification-3-line"></i>
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                className="mark-all-read-btn"
                                onClick={markAllAsRead}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="no-notifications">
                                <i className="ri-notification-off-line"></i>
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.slice(0, 10).map(notification => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div
                                        className="notification-icon"
                                        style={{ background: `${getNotificationColor(notification.color)}15`, color: getNotificationColor(notification.color) }}
                                    >
                                        <i className={notification.icon}></i>
                                    </div>
                                    <div className="notification-content">
                                        <h4>{notification.title}</h4>
                                        <p>{notification.message}</p>
                                        <span className="notification-time">{getTimeAgo(notification.createdAt)}</span>
                                    </div>
                                    <button
                                        className="notification-delete-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNotification(notification.id);
                                        }}
                                        aria-label="Delete notification"
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {notifications.length > 10 && (
                        <div className="notification-footer">
                            <button onClick={() => {
                                navigate('/student/notifications');
                                setIsOpen(false);
                            }}>
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
