
import { useState, useEffect } from 'react';

function Flashcard({ badge, frontTitle, backTitle, backDesc }) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
            <div className="flashcard-inner">
                <div className="flashcard-front">
                    <span className="card-badge">{badge}</span>
                    <h4>{frontTitle}</h4>
                    <p className="tap-hint"><i className="ri-refresh-line"></i> Tap to Flip</p>
                </div>
                <div className="flashcard-back">
                    <h4>{backTitle}</h4>
                    <p>{backDesc}</p>
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
                        <article className="blog-card">
                            <div className="blog-thumb">
                                <img src="/assets/blog-pollution.png" alt="Air Pollution in India" />
                                <span className="blog-tag">Environment</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="ri-calendar-line"></i> Jan 03, 2026</span>
                                </div>
                                <h3 className="blog-title"><a href="#">Air Pollution in India: A Silent Public Emergency</a></h3>
                                <p className="blog-summary">India’s air quality crisis has become a silent emergency. This blog explores causes, health impacts, and policy gaps...</p>
                                <a href="#" className="read-more">Read More <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </article>

                        <article className="blog-card">
                            <div className="blog-thumb">
                                <img src="/assets/blog-governance.png" alt="New Policy" />
                                <span className="blog-tag">Governance</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="ri-calendar-line"></i> Jan 02, 2026</span>
                                </div>
                                <h3 className="blog-title"><a href="#">Analyzing the New Digital Data Protection Act</a></h3>
                                <p className="blog-summary">Understanding the implications of the new data privacy laws on governance and individual rights in the digital age...</p>
                                <a href="#" className="read-more">Read More <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </article>

                        <article className="blog-card">
                            <div className="blog-thumb">
                                <img src="/assets/blog-study.png" alt="Strategy" />
                                <span className="blog-tag">Strategy</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="ri-calendar-line"></i> Dec 28, 2025</span>
                                </div>
                                <h3 className="blog-title"><a href="#">From Mocks to Marks: Art of Note Making</a></h3>
                                <p className="blog-summary">Effective note-making is crucial for revision. Learn how to condense huge volumes of information into crisp notes.</p>
                                <a href="#" className="read-more">Read More <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </article>

                        <article className="blog-card">
                            <div className="blog-thumb">
                                <img src="/assets/blog-study.png" alt="Ethics" style={{ filter: 'hue-rotate(45deg)' }} />
                                <span className="blog-tag">Ethics</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="ri-calendar-line"></i> Dec 25, 2025</span>
                                </div>
                                <h3 className="blog-title"><a href="#">Case Studies in GS Paper 4: An Approach</a></h3>
                                <p className="blog-summary">How to tackle ethical dilemmas in the exam with balanced reasoning and constitutional morality.</p>
                                <a href="#" className="read-more">Read More <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </article>

                        <article className="blog-card">
                            <div className="blog-thumb">
                                <img src="/assets/blog-pollution.png" alt="Current Affairs" style={{ filter: 'sepia(0.5)' }} />
                                <span className="blog-tag">Current Affairs</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="ri-calendar-line"></i> Dec 24, 2025</span>
                                </div>
                                <h3 className="blog-title"><a href="#">International Relations: India's G20 Presidency</a></h3>
                                <p className="blog-summary">A retrospective on key outcomes and the path forward for India's global diplomatic standing.</p>
                                <a href="#" className="read-more">Read More <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </article>

                        <article className="blog-card">
                            <div className="blog-thumb">
                                <img src="/assets/blog-governance.png" alt="Motivation" style={{ filter: 'contrast(1.2)' }} />
                                <span className="blog-tag">Motivation</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span><i className="ri-calendar-line"></i> Dec 20, 2025</span>
                                </div>
                                <h3 className="blog-title"><a href="#">Overcoming the Plateau in Preparation</a></h3>
                                <p className="blog-summary">Dealing with burnout and staying motivated during the long marathon of Civil Services preparation.</p>
                                <a href="#" className="read-more">Read More <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </article>
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
                                <li><a href="#">Unconventional Wisdom</a></li>
                                <li><a href="#">What, Where, When?</a></li>
                                <li><a href="#">From News - Let's talk..</a></li>
                                <li><a href="#">From The Arts</a></li>
                                <li><a href="#">Personalities We Love</a></li>
                                <li><a href="#">The Universe & Our Environment</a></li>
                                <li><a href="#">History, Thoughts & The World</a></li>
                                <li><a href="#">From The World Of Science & Tech</a></li>
                                <li><a href="#">Law & Society</a></li>
                                <li><a href="#">Philosophy & Civilisation</a></li>
                                <li><a href="#">Psychology & The Individual</a></li>
                                <li><a href="#">Media & Creativity</a></li>
                                <li><a href="#">Motivating The Self</a></li>
                                <li><a href="#">UPSC Preparation Tips</a></li>
                                <li><a href="#">State PCS Preparation: RAS</a></li>
                                <li><a href="#">State PCS Preparation: UPPCS</a></li>
                                <li><a href="#">State PCS Preparation: UKPCS</a></li>
                                <li><a href="#">State PCS Preparation: WBCS</a></li>
                                <li><a href="#">State PCS Preparation: MPSC</a></li>
                                <li><a href="#">State PCS Preparation: Punjab PSC</a></li>
                                <li><a href="#">State PCS Preparation: MPPSC</a></li>
                                <li><a href="#">State PCS Preparation: BPSC</a></li>
                                <li><a href="#">Exam Notification</a></li>
                                <li><a href="#">From Mocks to Marks</a></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
