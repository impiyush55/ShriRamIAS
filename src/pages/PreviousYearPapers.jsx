
import { useState } from 'react';

export default function PreviousYearPapers() {
    const [activeTab, setActiveTab] = useState('pyq-prelims');

    return (
        <div className="pyq-page-wrapper">
            <section className="pyq-header">
                <div className="container text-center">
                    <h1 className="pyq-title">Previous Year Question Papers</h1>
                    <p className="pyq-subtitle">Practice official UPSC papers to understand exam trends and difficulty</p>
                </div>
            </section>

            <section className="pyq-content section">
                <div className="container">
                    <div className="pyq-tabs-container">
                        <button className={`pyq-tab ${activeTab === 'pyq-prelims' ? 'active' : ''}`} onClick={() => setActiveTab('pyq-prelims')}>Prelims (GS I)</button>
                        <button className={`pyq-tab ${activeTab === 'pyq-csat' ? 'active' : ''}`} onClick={() => setActiveTab('pyq-csat')}>CSAT (GS II)</button>
                        <button className={`pyq-tab ${activeTab === 'pyq-mains' ? 'active' : ''}`} onClick={() => setActiveTab('pyq-mains')}>Mains Exam</button>
                    </div>

                    <div className="pyq-panes">
                        <div id="pyq-prelims" className={`pyq-pane ${activeTab === 'pyq-prelims' ? 'active' : ''}`}>
                            <div className="pyq-grid">
                                <div className="pyq-card">
                                    <div className="pyq-card-header">
                                        <span className="pyq-year-badge">2024</span>
                                        <span className="pyq-difficulty medium">Moderate</span>
                                    </div>
                                    <div className="pyq-card-body">
                                        <h3 className="pyq-paper-title">UPSC Prelims 2024 (GS Paper I)</h3>
                                        <ul className="pyq-meta">
                                            <li><i className="ri-question-line"></i> 100 Questions</li>
                                            <li><i className="ri-time-line"></i> 2 Hours</li>
                                            <li><i className="ri-file-list-line"></i> 200 Marks</li>
                                        </ul>
                                        <div className="pyq-actions">
                                            <a href="#" className="btn-attempt">Attempt Now</a>
                                            <a href="#" className="btn-details">View Analysis</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="pyq-card">
                                    <div className="pyq-card-header">
                                        <span className="pyq-year-badge">2023</span>
                                        <span className="pyq-difficulty hard">Hard</span>
                                    </div>
                                    <div className="pyq-card-body">
                                        <h3 className="pyq-paper-title">UPSC Prelims 2023 (GS Paper I)</h3>
                                        <ul className="pyq-meta">
                                            <li><i className="ri-question-line"></i> 100 Questions</li>
                                            <li><i className="ri-time-line"></i> 2 Hours</li>
                                            <li><i className="ri-file-list-line"></i> 200 Marks</li>
                                        </ul>
                                        <div className="pyq-actions">
                                            <a href="#" className="btn-attempt">Attempt Now</a>
                                            <a href="#" className="btn-details">View Analysis</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="pyq-card">
                                    <div className="pyq-card-header">
                                        <span className="pyq-year-badge">2022</span>
                                        <span className="pyq-difficulty medium">Moderate</span>
                                    </div>
                                    <div className="pyq-card-body">
                                        <h3 className="pyq-paper-title">UPSC Prelims 2022 (GS Paper I)</h3>
                                        <ul className="pyq-meta">
                                            <li><i className="ri-question-line"></i> 100 Questions</li>
                                            <li><i className="ri-time-line"></i> 2 Hours</li>
                                            <li><i className="ri-file-list-line"></i> 200 Marks</li>
                                        </ul>
                                        <div className="pyq-actions">
                                            <a href="#" className="btn-attempt">Attempt Now</a>
                                            <a href="#" className="btn-details">View Analysis</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="pyq-csat" className={`pyq-pane ${activeTab === 'pyq-csat' ? 'active' : ''}`}>
                            <div className="pyq-grid">
                                <div className="pyq-card">
                                    <div className="pyq-card-header">
                                        <span className="pyq-year-badge">2024</span>
                                        <span className="pyq-difficulty hard">Hard</span>
                                    </div>
                                    <div className="pyq-card-body">
                                        <h3 className="pyq-paper-title">UPSC CSAT 2024 (GS Paper II)</h3>
                                        <ul className="pyq-meta">
                                            <li><i className="ri-question-line"></i> 80 Questions</li>
                                            <li><i className="ri-time-line"></i> 2 Hours</li>
                                            <li><i className="ri-calculator-line"></i> Aptitude</li>
                                        </ul>
                                        <div className="pyq-actions">
                                            <a href="#" className="btn-attempt">Attempt Now</a>
                                            <a href="#" className="btn-details">View Solutions</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="pyq-mains" className={`pyq-pane ${activeTab === 'pyq-mains' ? 'active' : ''}`}>
                            <div className="pyq-mains-grid">
                                <div className="pyq-mains-card">
                                    <div className="icon-box red"><i className="ri-book-open-line"></i></div>
                                    <div className="mains-content">
                                        <h4>General Studies I</h4>
                                        <p>History, Geography, Society</p>
                                        <div className="year-chips">
                                            <a href="#">2024</a>
                                            <a href="#">2023</a>
                                            <a href="#">2022</a>
                                            <a href="#">2021</a>
                                        </div>
                                        <a href="#" className="link-arrow">Write Answers <i className="ri-arrow-right-line"></i></a>
                                    </div>
                                </div>

                                <div className="pyq-mains-card">
                                    <div className="icon-box blue"><i className="ri-government-line"></i></div>
                                    <div className="mains-content">
                                        <h4>General Studies II</h4>
                                        <p>Polity, Governance, IR</p>
                                        <div className="year-chips">
                                            <a href="#">2024</a>
                                            <a href="#">2023</a>
                                            <a href="#">2022</a>
                                            <a href="#">2021</a>
                                        </div>
                                        <a href="#" className="link-arrow">Write Answers <i className="ri-arrow-right-line"></i></a>
                                    </div>
                                </div>

                                <div className="pyq-mains-card">
                                    <div className="icon-box green"><i className="ri-stock-line"></i></div>
                                    <div className="mains-content">
                                        <h4>General Studies III</h4>
                                        <p>Economy, Environment, Sci-Tech</p>
                                        <div className="year-chips">
                                            <a href="#">2024</a>
                                            <a href="#">2023</a>
                                            <a href="#">2022</a>
                                            <a href="#">2021</a>
                                        </div>
                                        <a href="#" className="link-arrow">Write Answers <i className="ri-arrow-right-line"></i></a>
                                    </div>
                                </div>

                                <div className="pyq-mains-card">
                                    <div className="icon-box purple"><i className="ri-scales-3-line"></i></div>
                                    <div className="mains-content">
                                        <h4>General Studies IV</h4>
                                        <p>Ethics, Integrity, Aptitude</p>
                                        <div className="year-chips">
                                            <a href="#">2024</a>
                                            <a href="#">2023</a>
                                            <a href="#">2022</a>
                                            <a href="#">2021</a>
                                        </div>
                                        <a href="#" className="link-arrow">Write Answers <i className="ri-arrow-right-line"></i></a>
                                    </div>
                                </div>

                                <div className="pyq-mains-card">
                                    <div className="icon-box orange"><i className="ri-quill-pen-line"></i></div>
                                    <div className="mains-content">
                                        <h4>Essay Paper</h4>
                                        <p>Philosophical & Analytical Topics</p>
                                        <div className="year-chips">
                                            <a href="#">2024</a>
                                            <a href="#">2023</a>
                                            <a href="#">2022</a>
                                        </div>
                                        <a href="#" className="link-arrow">Write Essays <i className="ri-arrow-right-line"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
