
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Mentors from '../components/home/Mentors';
import Testimonials from '../components/home/Testimonials';
import PremiumCourses from '../components/home/PremiumCourses';
import FreeResources from '../components/home/FreeResources';
import BlogSection from '../components/home/BlogSection';
import MentorshipCTA from '../components/home/MentorshipCTA';

export default function Home() {
    return (
        <main>
            <Hero />
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
