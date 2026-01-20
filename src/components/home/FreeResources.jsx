
import { Link } from 'react-router-dom';

export default function FreeResources() {
    return (
        <section id="free-resources" className="free-resources-section">
            <div className="container text-center">
                <div className="section-header">
                    <span className="program-badge badge-new" style={{ background: '#dbeafe', color: '#1e40af', marginBottom: '1rem' }}>Free Access</span>
                    <h2 className="section-title">Free Study Resources</h2>
                    <p className="section-desc">Goldmine of content for serious aspirants. Download high-quality notes, papers, and magazines for free.</p>
                </div>

                <div className="resource-preview-grid">
                    <Link to="/free-resources.html" className="resource-preview-card">
                        <div className="res-icon-wrapper">
                            <i className="ri-book-open-line text-blue" style={{ fontSize: '1.5rem', color: '#2563eb' }}></i>
                        </div>
                        <h3 className="res-title">NCERT Notes</h3>
                        <p className="res-desc">Chapter-wise summaries of class 6-12 NCERTs for all subjects.</p>
                    </Link>

                    <Link to="/free-resources.html" className="resource-preview-card">
                        <div className="res-icon-wrapper">
                            <i className="ri-newspaper-line text-purple" style={{ fontSize: '1.5rem', color: '#9333ea' }}></i>
                        </div>
                        <h3 className="res-title">Current Affairs</h3>
                        <p className="res-desc">Daily news analysis, monthly magazines, and budget highlights.</p>
                    </Link>

                    <Link to="/free-resources.html" className="resource-preview-card">
                        <div className="res-icon-wrapper">
                            <i className="ri-file-list-3-line text-orange" style={{ fontSize: '1.5rem', color: '#ea580c' }}></i>
                        </div>
                        <h3 className="res-title">Previous Papers</h3>
                        <p className="res-desc">Topic-wise segregated PYQs for Prelims (Last 25 Years).</p>
                    </Link>

                    <Link to="/free-resources.html" className="resource-preview-card">
                        <div className="res-icon-wrapper">
                            <i className="ri-map-pin-line text-green" style={{ fontSize: '1.5rem', color: '#16a34a' }}></i>
                            <span className="pulsing-dot" style={{ top: 0, right: 0 }}></span>
                            <i className="ri-road-map-line" style={{ fontSize: '1.5rem', color: '#16a34a' }}></i>
                        </div>
                        <h3 className="res-title">Mind Maps & Charts</h3>
                        <p className="res-desc">Visual aids for quick revision of complex topics.</p>
                    </Link>
                </div>

                <Link to="/free-resources.html" className="btn-explore-resources">Explore All Resources <i className="ri-arrow-right-line"></i></Link>
            </div>
        </section>
    );
}
