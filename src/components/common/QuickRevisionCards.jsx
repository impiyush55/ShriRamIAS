
import { useState } from 'react';

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

export default function QuickRevisionCards() {
    return (
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
    );
}
