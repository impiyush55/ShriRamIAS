
import { useState, useEffect } from 'react';

function Flashcard({ badge, frontTitle, backTitle, backDesc }) {
    const [flipped, setFlipped] = useState(false);

    // Helper to get icon for badge
    const getCategoryIcon = (cat) => {
        const map = {
            'Polity': 'ri-government-line',
            'Economics': 'ri-money-dollar-circle-line',
            'History': 'ri-ancient-gate-line',
            'Geography': 'ri-earth-line',
            'Science': 'ri-flask-line'
        };
        return map[cat] || 'ri-book-open-line';
    };

    return (
        <div
            className={`flashcard-container ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(!flipped)}
            style={{
                minWidth: '280px',
                height: '340px',
                perspective: '1500px',
                cursor: 'pointer',
                flexShrink: 0
            }}
        >
            <div className="flashcard-inner" style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : ''
            }}>
                {/* Front Side */}
                <div className="flashcard-front" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'white',
                    borderRadius: '24px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <div className="card-top" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <span style={{
                            background: '#f3f4f6',
                            color: '#4b5563',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <i className={getCategoryIcon(badge)}></i> {badge}
                        </span>
                    </div>

                    <div className="card-center" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <h3 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            color: '#111827',
                            lineHeight: 1.2,
                            fontFamily: '"Playfair Display", serif'
                        }}>
                            {frontTitle}
                        </h3>
                    </div>

                    <div className="card-bottom">
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: '#f9fafb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6b7280',
                            border: '1px solid #e5e7eb'
                        }}>
                            <i className="ri-arrow-turn-back-line" style={{ fontSize: '1.25rem' }}></i>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem', fontWeight: 500 }}>Tap to Reveal</p>
                    </div>
                </div>

                {/* Back Side */}
                <div className="flashcard-back" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: '#111827',
                    backgroundImage: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    color: 'white',
                    borderRadius: '24px',
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'rotateY(180deg)',
                    boxShadow: '0 20px 40px -5px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <span style={{
                            color: '#fbbf24',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <i className="ri-lightbulb-flash-line"></i> Answer
                        </span>

                        <h4 style={{
                            fontSize: '1.4rem',
                            marginBottom: '1.5rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            color: '#f9fafb'
                        }}>{backTitle}</h4>

                        <p style={{
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            textAlign: 'center',
                            color: '#d1d5db',
                            fontWeight: 400
                        }}>{backDesc}</p>
                    </div>

                    {/* Decorative Elements */}
                    <div style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.1 }}>
                        <i className="ri-double-quotes-r" style={{ fontSize: '4rem', color: 'white' }}></i>
                    </div>

                    {/* Bottom Flip Button */}
                    <div style={{
                        marginTop: 'auto',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)'
                    }} onClick={(e) => { e.stopPropagation(); setFlipped(false); }}>
                        <i className="ri-close-line"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
                const { getAllBlogsApi } = await import('../../api/blogApi');
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

                <div className="flashcards-container mb-12">
                    <h3 className="subsection-title">Quick Revision Cards <i className="ri-flashlight-fill text-warning"></i></h3>
                    <div className="flashcards-scroll">
                        <Flashcard
                            badge="Polity"
                            frontTitle="Article 32"
                            backTitle="Constitutional Remedies"
                            backDesc={'Right to move the Supreme Court for enforcement of Fundamental Rights. Called the "Heart and Soul" of the Constitution.'}
                        />
                        <Flashcard
                            badge="Geography"
                            frontTitle="Albedo"
                            backTitle="Reflection Coefficient"
                            backDesc="The proportion of the incident light or radiation that is reflected by a surface. Fresh snow has high albedo."
                        />
                        <Flashcard
                            badge="Economy"
                            frontTitle="Repo Rate"
                            backTitle="Policy Rate"
                            backDesc="The rate at which RBI lends money to commercial banks in the event of any shortfall of funds."
                        />
                        <Flashcard
                            badge="History"
                            frontTitle="Dholavira"
                            backTitle="IVC Site"
                            backDesc="UNESCO World Heritage site (Gujarat). Known for its unique water management system and signage."
                        />
                    </div>
                </div>

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

