import { useState, useEffect } from 'react'; // Added imports
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Mentors from '../components/home/Mentors';
import Testimonials from '../components/home/Testimonials';
import PremiumCourses from '../components/home/PremiumCourses';
import FreeResources from '../components/home/FreeResources';
import BlogSection from '../components/home/BlogSection';
import MentorshipCTA from '../components/home/MentorshipCTA';
import NewsTicker from '../components/home/NewsTicker';
import { getActiveBanners } from '../data/bannerData'; // Import data service

export default function Home() {
    const [banners, setBanners] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentPopup, setCurrentPopup] = useState(null);

    useEffect(() => {
        const fetchBanners = () => {
            const res = getActiveBanners();
            if (res.success) {
                setBanners(res.data);

                // Check for popup
                const popup = res.data.find(b => b.position === 'popup');
                if (popup) {
                    // Simple logic: Show popup if it exists. 
                    // In real app, you might check sessionStorage to show only once per session.
                    setCurrentPopup(popup);
                    setShowPopup(true);
                }
            }
        };

        fetchBanners();

        // Listen for updates from Admin panel
        window.addEventListener('storage', fetchBanners);
        return () => window.removeEventListener('storage', fetchBanners);
    }, []);

    const announcements = banners.filter(b => b.type === 'announcement' && b.position === 'ticker');

    return (
        <main>
            {/* Promo Modal / Popup */}
            {showPopup && currentPopup && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowPopup(false)}>
                    <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full text-gray-700 transition-colors z-10"
                        >
                            <i className="ri-close-line text-xl"></i>
                        </button>

                        {currentPopup.image && (
                            <div className="w-full h-48 sm:h-56 relative">
                                <img src={currentPopup.image} alt={currentPopup.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <h3 className="text-white text-xl font-bold leading-tight drop-shadow-md">{currentPopup.title}</h3>
                                </div>
                            </div>
                        )}

                        {!currentPopup.image && (
                            <div className="p-8 pb-4 text-center">
                                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                    <i className="ri-notification-3-line"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{currentPopup.title}</h3>
                            </div>
                        )}

                        <div className="p-6 pt-0 mt-4 text-center">
                            {currentPopup.link && (
                                <a
                                    href={currentPopup.link}
                                    className="inline-block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-indigo-200"
                                >
                                    Check it Out <i className="ri-arrow-right-line ml-1"></i>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <NewsTicker announcements={announcements} />
            <Hero />

            {/* Display Hero Ad Banner if exists */}
            {banners.find(b => b.position === 'hero' && b.type === 'ad') && (
                <div className="container mx-auto px-4 mt-8 mb-4">
                    {(() => {
                        const heroAd = banners.find(b => b.position === 'hero' && b.type === 'ad');
                        return (
                            <a href={heroAd.link || '#'} className="block w-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all group relative">
                                <img src={heroAd.image} alt={heroAd.title} className="w-full h-auto object-cover max-h-[120px] sm:max-h-[160px]" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-medium shadow-sm transition-all transform translate-y-2 group-hover:translate-y-0">
                                        Explore <i className="ri-arrow-right-up-line"></i>
                                    </span>
                                </div>
                            </a>
                        );
                    })()}
                </div>
            )}

            <Features />
            <Mentors />
            <Testimonials />
            <PremiumCourses />
            <FreeResources />
            <BlogSection />
            <MentorshipCTA />
        </main>
    );
}
