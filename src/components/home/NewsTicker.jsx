import { useState } from 'react';
import './NewsTicker.css';

export default function NewsTicker({ announcements, speed = 30, pauseOnHover = true }) {
    const [isPaused, setIsPaused] = useState(false);

    // Default announcements if none provided
    const defaultAnnouncements = [
        { id: 1, text: "🎉 New batch starting March 2026 - Limited seats available!", icon: "ri-megaphone-fill" },
        { id: 2, text: "📢 Free mock test series for UPSC Prelims 2026 now live", icon: "ri-notification-badge-fill" },
        { id: 3, text: "⭐ Join our free mentorship session this weekend", icon: "ri-star-fill" },
        { id: 4, text: "🔥 Early bird discount: 30% off on all courses until Feb 15", icon: "ri-fire-fill" }
    ];

    const items = announcements || defaultAnnouncements;

    return (
        <div className="news-ticker-wrapper">
            <div className="ticker-label">
                <i className="ri-notification-badge-line"></i>
                <span>Latest Updates</span>
            </div>
            <div
                className="ticker-content"
                onMouseEnter={() => pauseOnHover && setIsPaused(true)}
                onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            >
                <div
                    className="ticker-scroll"
                    style={{
                        animationDuration: `${speed}s`,
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {/* Duplicate items for seamless loop */}
                    {[...items, ...items].map((item, index) => (
                        <div key={`${item.id}-${index}`} className="ticker-item">
                            <i className={item.icon || "ri-megaphone-fill"}></i>
                            {/* Support both 'text' (default) and 'title' (dynamic banner) */}
                            <span>{item.text || item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
