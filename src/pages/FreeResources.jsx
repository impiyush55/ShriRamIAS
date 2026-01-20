
import { Link } from 'react-router-dom';
import '../styles/free-resources-page.css';

export default function FreeResourcesPage() {
    return (
        <div>
            {/* Navbar (Simplified) */}
            <header className="navbar" style={{ position: 'relative', background: 'white', padding: '1rem 0' }}>
                <div className="container navbar-container">
                    <Link to="/" className="logo">
                        <span className="logo-text-fallback">SRIRAM's<span>IAS</span></span>
                    </Link>
                    <Link to="/" className="btn btn-outline" style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}>Back to Home</Link>
                </div>
            </header>

            {/* Hero */}
            <section className="resources-hero">
                <div className="container">
                    <h1>Free Study Materials</h1>
                    <p>Unlock your potential with our curated collection of free resources, including NCERT notes, daily modules, and previous year papers.</p>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="resource-category-section">
                <div className="container">
                    {/* Category 1 */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#334155' }}>Essential NCERT Summaries</h2>
                    <div className="resource-card-grid">
                        {/* Card 1 */}
                        <div className="free-resource-card">
                            <div className="resource-card-thumb" style={{ background: '#eff6ff' }}>
                                <i className="ri-book-read-line" style={{ color: '#2563eb' }}></i>
                                <span className="resource-type-badge">History</span>
                            </div>
                            <div className="resource-card-content">
                                <h3 className="resource-card-title">Ancient India (RS Sharma) Summary</h3>
                                <p className="resource-card-desc">Comprehensive chapter-wise summary of Old NCERT Ancient India. Essential for Prelims Art & Culture.</p>
                                <div className="resource-footer">
                                    <span className="download-count"><i className="ri-download-cloud-line"></i> 15k+ Downloads</span>
                                    <a href="#" className="btn-download-sm">Download PDF <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="free-resource-card">
                            <div className="resource-card-thumb" style={{ background: '#f0fdf4' }}>
                                <i className="ri-earth-line" style={{ color: '#16a34a' }}></i>
                                <span className="resource-type-badge">Geography</span>
                            </div>
                            <div className="resource-card-content">
                                <h3 className="resource-card-title">Class 11 Physical Geography Notes</h3>
                                <p className="resource-card-desc">Detailed notes on Geomorphology, Climatology, and Oceanography with diagrams.</p>
                                <div className="resource-footer">
                                    <span className="download-count"><i className="ri-download-cloud-line"></i> 12k+ Downloads</span>
                                    <a href="#" className="btn-download-sm">Download PDF <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="free-resource-card">
                            <div className="resource-card-thumb" style={{ background: '#fff7ed' }}>
                                <i className="ri-government-line" style={{ color: '#ea580c' }}></i>
                                <span className="resource-type-badge">Polity</span>
                            </div>
                            <div className="resource-card-content">
                                <h3 className="resource-card-title">Class 11 Indian Constitution at Work</h3>
                                <p className="resource-card-desc">Key concepts of the Constitution explained simply. Foundation for Laxmikanth.</p>
                                <div className="resource-footer">
                                    <span className="download-count"><i className="ri-download-cloud-line"></i> 18k+ Downloads</span>
                                    <a href="#" className="btn-download-sm">Download PDF <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category 2 */}
                    <h2 style={{ fontSize: '1.5rem', marginTop: '4rem', marginBottom: '1rem', color: '#334155' }}>Current Affairs Modules</h2>
                    <div className="resource-card-grid">
                        {/* Card 4 */}
                        <div className="free-resource-card">
                            <div className="resource-card-thumb" style={{ background: '#faf5ff' }}>
                                <i className="ri-calendar-event-line" style={{ color: '#9333ea' }}></i>
                                <span className="resource-type-badge">Monthly</span>
                            </div>
                            <div className="resource-card-content">
                                <h3 className="resource-card-title">January 2026 Monthly Magazine</h3>
                                <p className="resource-card-desc">Consolidated current affairs analysis for Jan 2026. Covers Polity, Economy, IR, and Science.</p>
                                <div className="resource-footer">
                                    <span className="download-count"><i className="ri-download-cloud-line"></i> 5k+ Downloads</span>
                                    <a href="#" className="btn-download-sm">Download PDF <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="free-resource-card">
                            <div className="resource-card-thumb" style={{ background: '#fff1f2' }}>
                                <i className="ri-pie-chart-line" style={{ color: '#e11d48' }}></i>
                                <span className="resource-type-badge">Budget</span>
                            </div>
                            <div className="resource-card-content">
                                <h3 className="resource-card-title">Union Budget 2026 Highlights</h3>
                                <p className="resource-card-desc">Key schemes, allocations, and economic indicators from the Interim Budget 2026.</p>
                                <div className="resource-footer">
                                    <span className="download-count"><i className="ri-download-cloud-line"></i> 8k+ Downloads</span>
                                    <a href="#" className="btn-download-sm">Download PDF <i className="ri-arrow-right-line"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer (Simplified) */}
            <footer style={{ background: '#0f172a', color: 'white', padding: '2rem 0', textAlign: 'center' }}>
                <div className="container">
                    <p>&copy; 2026 SRIRAM's IAS. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
