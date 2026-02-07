

import { useState, useEffect } from 'react';
import { getAllBlogsApi } from '../../api/blogApi';
import QuickRevisionCards from '../common/QuickRevisionCards'; // Import new component


function ExamTracker() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const examDate = new Date('May 26, 2026 09:00:00').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = examDate - now;

            if (distance < 0) {
                setStarted(true);
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="sidebar-widget tracker-widget">
            <h3 className="widget-title"><i className="ri-timer-flash-line"></i> UPSC Prelims 2026</h3>
            <div id="exam-countdown" className="countdown-timer">
                {started ? "EXAM STARTED" : (
                    <>
                        <div className="time-box">
                            <span id="days">{timeLeft.days < 10 ? '0' + timeLeft.days : timeLeft.days}</span>
                            <label>Days</label>
                        </div>
                        <div className="time-box">
                            <span id="hours">{timeLeft.hours < 10 ? '0' + timeLeft.hours : timeLeft.hours}</span>
                            <label>Hrs</label>
                        </div>
                        <div className="time-box">
                            <span id="minutes">{timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}</span>
                            <label>Mins</label>
                        </div>
                        <div className="time-box">
                            <span id="seconds">{timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds}</span>
                            <label>Secs</label>
                        </div>
                    </>
                )}
            </div>
            <p className="tracker-note">Target Date: May 26, 2026</p>
        </div>
    );
}

function DailyQuiz() {
    const [answered, setAnswered] = useState(false);
    const [result, setResult] = useState(null);

    const checkAnswer = (isCorrect, btnId) => {
        if (answered) return;
        setAnswered(true);
        if (isCorrect) {
            setResult({ correct: true, msg: 'Correct! Article 44 states that the State shall endeavor to secure for the citizens a Uniform Civil Code.', userChoice: btnId });
        } else {
            setResult({ correct: false, msg: 'Incorrect. The correct answer is Article 44.', userChoice: btnId });
        }
    };

    const getBtnClass = (isCorrectOption, btnId) => {
        if (!answered) return 'quiz-option';
        if (result && result.userChoice === btnId) {
            return isCorrectOption ? 'quiz-option correct' : 'quiz-option incorrect';
        }
        if (answered && isCorrectOption) {
            if (result && !result.correct) return 'quiz-option correct';
        }
        return 'quiz-option';
    };

    return (
        <div className="sidebar-widget quiz-widget">
            <h3 className="widget-title"><i className="ri-question-answer-line"></i> Daily Quiz</h3>
            <div className="quiz-container">
                <p className="quiz-question">Which Article of the Constitution deals with the Uniform Civil Code?</p>
                <div className="quiz-options">
                    <button className={getBtnClass(false, 1)} disabled={answered} onClick={() => checkAnswer(false, 1)}>Article 42</button>
                    <button className={getBtnClass(true, 2)} disabled={answered} onClick={() => checkAnswer(true, 2)}>Article 44</button>
                    <button className={getBtnClass(false, 3)} disabled={answered} onClick={() => checkAnswer(false, 3)}>Article 45</button>
                    <button className={getBtnClass(false, 4)} disabled={answered} onClick={() => checkAnswer(false, 4)}>Article 51A</button>
                </div>
                {result && (
                    <div id="quiz-result" className="quiz-result">
                        <span className={result.correct ? "text-green" : "text-red"} style={{ color: result.correct ? '#166534' : '#991b1b' }}>
                            <i className={result.correct ? "ri-check-line" : "ri-close-line"}></i> {result.msg}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function BlogSection() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getAllBlogsApi();
                if (res.success && Array.isArray(res.data)) {
                    // Get latest 6 blogs (Newest first)
                    setBlogs(res.data.slice(0, 6));
                }
            } catch (err) {
                console.error("Failed to load blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();

        // Listen for blog changes (from Admin panel)
        const handleStorage = (e) => {
            if (e.key === 'mockBlogs') fetchBlogs();
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <section id="blogs" className="section bg-light blog-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Insights & Strategy</h2>
                    <p className="section-desc">Stay updated with current affairs, exam notifications, and preparation strategies.</p>
                </div>

                <QuickRevisionCards />

                <div className="blog-layout">
                    <div className="blog-grid">
                        {loading ? (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
                                <i className="ri-loader-4-line rotating" style={{ fontSize: '2rem', color: '#4f46e5' }}></i>
                            </div>
                        ) : (
                            blogs.length > 0 ? (
                                blogs.map(blog => (
                                    <article key={blog.id} className="blog-card" style={{ opacity: 1, visibility: 'visible' }}>
                                        <div className="blog-thumb">
                                            <img
                                                src={blog.thumbnail || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600'}
                                                alt={blog.title}
                                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600' }}
                                            />
                                            <span className="blog-tag">{blog.category}</span>
                                        </div>
                                        <div className="blog-content">
                                            <div className="blog-meta">
                                                <span><i className="ri-calendar-line"></i> {blog.publishedDate}</span>
                                            </div>
                                            <h3 className="blog-title">
                                                <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                                            </h3>
                                            <p className="blog-summary">
                                                {blog.excerpt || (blog.content ? blog.content.substring(0, 100).replace(/<[^>]*>/g, '') + '...' : 'Interesting read about UPSC preparation...')}
                                            </p>
                                            <a href={`/blogs/${blog.id}`} className="read-more">Read More <i className="ri-arrow-right-line"></i></a>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b7280' }}>
                                    No blogs published yet.
                                </div>
                            )
                        )}
                    </div>

                    <aside className="blog-sidebar">
                        <ExamTracker />
                        <DailyQuiz />

                        <div className="sidebar-search">
                            <input type="text" placeholder="Search..." />
                            <button><i className="ri-search-line"></i></button>
                        </div>

                        <div id="blog-collection">
                            <h3 className="sidebar-title">BLOG COLLECTION</h3>
                            <ul className="category-list">
                                <li><a href="/blogs/1">Unconventional Wisdom</a></li>
                                <li><a href="/blogs/2">What, Where, When?</a></li>
                                <li><a href="/blogs/3">From News - Let's talk..</a></li>
                                <li><a href="/blogs/1">From The Arts</a></li>
                                <li><a href="/blogs/2">Personalities We Love</a></li>
                                <li><a href="/blogs/3">The Universe & Our Environment</a></li>
                                <li><a href="/blogs/1">History, Thoughts & The World</a></li>
                                <li><a href="/blogs/2">From The World Of Science & Tech</a></li>
                                <li><a href="/blogs/3">Law & Society</a></li>
                                <li><a href="/blogs/1">Philosophy & Civilisation</a></li>
                                <li><a href="/blogs/2">Psychology & The Individual</a></li>
                                <li><a href="/blogs/3">Media & Creativity</a></li>
                                <li><a href="/blogs/1">Motivating The Self</a></li>
                                <li><a href="/blogs/2">UPSC Preparation Tips</a></li>
                                <li><a href="/blogs/3">State PCS Preparation: RAS</a></li>
                                <li><a href="/blogs/1">State PCS Preparation: UPPCS</a></li>
                                <li><a href="/blogs/2">State PCS Preparation: UKPCS</a></li>
                                <li><a href="/blogs/3">State PCS Preparation: WBCS</a></li>
                                <li><a href="/blogs/1">State PCS Preparation: MPSC</a></li>
                                <li><a href="/blogs/2">State PCS Preparation: Punjab PSC</a></li>
                                <li><a href="/blogs/3">State PCS Preparation: MPPSC</a></li>
                                <li><a href="/blogs/1">State PCS Preparation: BPSC</a></li>
                                <li><a href="/blogs/2">Exam Notification</a></li>
                                <li><a href="/blogs/3">From Mocks to Marks</a></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}

