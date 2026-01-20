
export default function Mentors() {
    const mentors = [
        {
            name: "Dr. Rajesh Kumar",
            role: "Senior Faculty, Polity & Governance",
            experience: "25+ Years Experience",
            background: "Ex-Faculty, Delhi University",
            bio: "A renowned constitution expert known for simplifying complex legal concepts. He has mentored over 500+ successful aspirants.",
            image: "/assets/mentor-1.png"
        },
        {
            name: "Prof. Anjali Sharma",
            role: "Head of Dept, History & Culture",
            experience: "18 Years Experience",
            background: "Gold Medalist, JNU",
            bio: "Specializes in connecting ancient history with modern relevance. Her storytelling teaching style makes history unforgettable.",
            image: "/assets/mentor-2.png"
        },
        {
            name: "Mr. Vikram Singh (Retd. IES)",
            role: "Economist & Strategy Mentor",
            experience: "22 Years Experience",
            background: "Former Economic Advisor",
            bio: "Expert in Macroeconomics and Indian Economy. His simplified approach to economic survey and budget is highly acclaimed.",
            image: "/assets/mentor-3.png"
        },
        {
            name: "Dr. S.K. Jha",
            role: "Senior Faculty, Geography",
            experience: "20+ Years Experience",
            background: "PhD, Cartography",
            bio: "Renowned for his map-based teaching methodology. He ensures that Geography becomes the most scoring subject for his students.",
            image: "/assets/mentor-4.png"
        },
        {
            name: "Ms. Priya Simpson",
            role: "Faculty, International Relations",
            experience: "12 Years Experience",
            background: "Ex-Diplomat",
            bio: "Brings real-world diplomatic experience to the classroom. Her analysis of geopolitical events is insightful and exam-oriented.",
            image: "/assets/mentor-5.png"
        },
        {
            name: "Mr. R. Sharma",
            role: "Faculty, Science & Tech",
            experience: "15 Years Experience",
            background: "M.Tech, IIT Delhi",
            bio: "Simplifies complex scientific concepts for non-science background students. Covers current developments in S&T comprehensively.",
            image: "/assets/mentor-6.png"
        }
    ];

    return (
        <section id="mentors" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Meet Our Mentors</h2>
                    <p className="section-desc">Guided by the best minds in the country. Our faculty comprises former civil servants and subject matter experts.</p>
                </div>

                <div className="mentors-scroll-container">
                    {mentors.map((mentor, index) => (
                        <div className="mentor-card" key={index}>
                            <div className="mentor-details">
                                <h3 className="mentor-name">{mentor.name}</h3>
                                <p className="mentor-designation text-gradient">{mentor.role}</p>
                                <ul className="mentor-meta">
                                    <li><i className="ri-briefcase-line"></i> {mentor.experience}</li>
                                    <li><i className="ri-building-line"></i> {mentor.background}</li>
                                </ul>
                                <p className="mentor-bio">{mentor.bio}</p>
                            </div>
                            <div className="mentor-image">
                                <img src={mentor.image} alt={mentor.name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
