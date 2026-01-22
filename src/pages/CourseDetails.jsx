
import { useParams, Link } from 'react-router-dom';

const courseData = {
    'foundation-2026': {
        title: 'UPSC Foundation Course (Prelims + Mains) 2026',
        subtitle: 'Comprehensive coverage of GS Prelims & Mains syllabus',
        price: '₹1,25,000',
        originalPrice: '₹1,60,000',
        discount: '22% OFF',
        batchStart: '19th January, 2026',
        mode: 'Live Online',
        language: 'English',
        duration: '18 Months',
        description: 'Our flagship Foundation Course is designed to build your UPSC preparation from scratch. It covers General Studies for both Prelims and Mains, along with CSAT, Essay, and Current Affairs. The course follows a structured approach starting with NCERTs and moving to advanced standard books.',
        highlights: [
            '1000+ Hours of Live Classes',
            'Comprehensive Study Material (Hard Copy)',
            'Weekly Current Affairs Classes',
            'Prelims & Mains Test Series Included',
            'One-to-One Mentorship'
        ],
        syllabus: [
            { title: 'Phase 1: Foundation (NCERTs)', content: 'Building strong fundamentals across History, Geography, Polity, and Economy.' },
            { title: 'Phase 2: Core GS (Prelims + Mains)', content: 'In-depth coverage of GS Papers I, II, III, and IV.' },
            { title: 'Phase 3: CSAT & Optional', content: 'Dedicated modules for CSAT and Optional Subjects.' },
            { title: 'Phase 4: Revision & Test Series', content: 'Intensive revision and full-length mock tests.' }
        ]
    },
    'integrated-3-year': {
        title: '3-Year Integrated Foundation Program',
        subtitle: 'Builds a strong base from NCERT to Advanced level',
        price: '₹2,15,000',
        originalPrice: '₹2,50,000',
        discount: '14% OFF',
        batchStart: 'July 2026',
        mode: 'Offline (Delhi)',
        language: 'English',
        duration: '36 Months',
        description: 'Perfect for college students, this 3-year program allows you to prepare for UPSC alongside your graduation. It moves at a comfortable pace, ensuring you master every concept thoroughly without affecting your college studies.',
        highlights: [
            'Gradual pacing suitable for undergraduates',
            'Focus on soft skills and personality development',
            'Regular interaction with toppers and bureaucrats',
            'Weekend batches available',
            'Complete degree support'
        ],
        syllabus: [
            { title: 'Year 1: The Base', content: 'Focus on NCERTs and basic concepts of Polity, History, and Geography.' },
            { title: 'Year 2: The Core', content: 'Advanced specialized topics of Mains and Ethics.' },
            { title: 'Year 3: The Edge', content: 'Current Affairs integration, Answer Writing, and Test Series.' }
        ]
    },
    'prelims-crash-2026': {
        title: 'Prelims Crash Course 2026',
        subtitle: 'Rapid revision of entire GS syllabus via clusters',
        price: '₹18,000',
        originalPrice: '₹25,000',
        discount: '28% OFF',
        batchStart: 'Feb 1st, 2026',
        mode: 'Live + Recorded',
        language: 'Hinglish',
        duration: '4 Months',
        description: 'A high-intensity course designed for aspirants targeting the upcoming Prelims. We focus on "High Yielding Topics" to maximize your score in the shortest time possible.',
        highlights: [
            'Daily 4-hour classes',
            '15 Full-length Mock Tests',
            'CSAT Special Weekend Classes',
            'Budget & Economic Survey Analysis',
            'd'
        ],
        syllabus: [
            { title: 'Module 1: Polity & Economy', content: 'Focus on trends, new acts, and economic survey.' },
            { title: 'Module 2: Environment & Sci-Tech', content: 'Current affairs driven high-scoring areas.' },
            { title: 'Module 3: History & Geography', content: 'Map work and timeline-based history revision.' }
        ]
    },
    'sociology-optional': {
        title: 'Optional Subject: Sociology',
        subtitle: 'Paper I & II comprehensive coverage',
        price: '₹45,000',
        originalPrice: '₹55,000',
        discount: '18% OFF',
        batchStart: 'Nov 15, 2025',
        mode: 'Live Online',
        language: 'English',
        duration: '5 Months',
        description: 'Master Sociology with our expert faculty. This course covers both Paper I and Paper II in detail, with a special focus on applying sociological thinkers to Indian society.',
        highlights: [
            'Detailed coverage of Thinkers',
            'Answer Writing Practice from Week 1',
            'Previous Year Questions Analysis',
            'Printed Notes Included'
        ],
        syllabus: [
            { title: 'Paper I: Fundamentals', content: 'Sociology as a discipline, Thinkers, Stratification.' },
            { title: 'Paper II: Indian Society', content: 'Caste system, Social Movements, Kinship.' }
        ]
    }
};

export default function CourseDetails() {
    const { courseId } = useParams();
    const course = courseData[courseId];

    if (!course) {
        return (
            <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>
                <h2>Course Not Found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="course-details-page">
            {/* Header */}
            <div className="course-header-section" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '4rem 0' }}>
                <div className="container">
                    <span className="badge badge-primary" style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '1rem', display: 'inline-block' }}>{course.mode}</span>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>{course.title}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '700px' }}>{course.subtitle}</p>

                    <div className="header-meta" style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                        <span><i className="ri-calendar-event-line"></i> Starts: {course.batchStart}</span>
                        <span><i className="ri-time-line"></i> Duration: {course.duration}</span>
                        <span><i className="ri-translate-2"></i> {course.language}</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 0' }}>
                <div className="details-grid">

                    {/* Main Content */}
                    <div className="details-content">
                        <section className="mb-8" style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1e293b' }}>Course Overview</h2>
                            <p style={{ lineHeight: '1.8', color: '#475569' }}>{course.description}</p>
                        </section>

                        <section className="mb-8" style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#1e293b' }}>Key Highlights</h2>
                            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0 }}>
                                {course.highlights.map((highlight, index) => (
                                    <li key={index} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                        <i className="ri-check-double-line" style={{ color: '#2563eb', marginRight: '0.5rem' }}></i> {highlight}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#1e293b' }}>Course Syllabus</h2>
                            <div className="syllabus-accordion" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                                {course.syllabus.map((item, index) => (
                                    <div key={index} className="accordion-item" style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <div style={{ background: '#f1f5f9', padding: '1rem 1.5rem', fontWeight: '600', color: '#334155' }}>
                                            {item.title}
                                        </div>
                                        <div style={{ padding: '1rem 1.5rem', color: '#64748b', background: 'white' }}>
                                            {item.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="details-sidebar">
                        <div className="enrollment-card">
                            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Course Fee</span>
                                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>{course.price}</span>
                                    <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{course.originalPrice}</span>
                                </div>
                                <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '0.9rem' }}>{course.discount}</span>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem' }}>
                                Enroll Now
                            </button>
                            <button className="btn btn-outline-primary" style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer' }}>
                                Download Brochure
                            </button>

                            <div style={{ marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <i className="ri-shield-check-line" style={{ color: '#16a34a' }}></i>
                                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>7-Day Money Back Guarantee</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <i className="ri-secure-payment-line" style={{ color: '#16a34a' }}></i>
                                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Secure Payment Gateway</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
