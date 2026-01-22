/**
 * DUMMY COURSE DATA
 * This file contains hardcoded course information
 * In production, this would come from a real database
 */

export const dummyCourses = [
    {
        id: 1,
        title: 'Foundation Course - Complete UPSC Preparation',
        category: 'Foundation',
        description: 'Comprehensive foundation course covering all basics for UPSC CSE preparation',
        fullDescription: 'This comprehensive foundation course is designed for beginners starting their UPSC journey. It covers all fundamental concepts across History, Geography, Polity, Economy, and Current Affairs with a structured approach.',
        instructor: 'Dr. Rajesh Kumar',
        instructorId: 2,
        duration: '6 months',
        price: 25000,
        discountedPrice: 19999,
        thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
        enrolled: 245,
        rating: 4.8,
        totalRatings: 156,
        level: 'Beginner',
        language: 'Hindi & English',
        syllabus: [
            'Indian History - Ancient, Medieval, Modern',
            'Indian Polity & Governance',
            'Geography - Physical & Human',
            'Indian Economy Basics',
            'Current Affairs Foundation'
        ],
        features: [
            'Live Interactive Classes',
            'Recorded Lectures Access',
            'Study Material PDF',
            'Weekly Tests',
            'Doubt Clearing Sessions'
        ],
        startDate: '2024-02-01',
        status: 'active'
    },
    {
        id: 2,
        title: 'Prelims Intensive 2025',
        category: 'Prelims',
        description: 'Intensive prelims preparation with focus on MCQs and test series',
        fullDescription: 'Specially designed intensive course for UPSC Prelims 2025. Includes comprehensive coverage of all subjects with emphasis on MCQ practice and test-taking strategies.',
        instructor: 'Prof. Priya Sharma',
        instructorId: 3,
        duration: '4 months',
        price: 18000,
        discountedPrice: 14999,
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
        enrolled: 389,
        rating: 4.9,
        totalRatings: 234,
        level: 'Intermediate',
        language: 'Hindi & English',
        syllabus: [
            'CSAT - Quantitative & Logical Reasoning',
            'General Studies Paper I - Complete',
            'Current Affairs 2024-25',
            '50+ Full Length Mock Tests',
            'Previous Year Papers Analysis'
        ],
        features: [
            '50+ Mock Tests',
            'Daily Current Affairs',
            'Answer Writing Practice',
            'Performance Analytics',
            'Telegram Support Group'
        ],
        startDate: '2024-03-01',
        status: 'active'
    },
    {
        id: 3,
        title: 'Mains Answer Writing Masterclass',
        category: 'Mains',
        description: 'Master the art of answer writing for UPSC Mains examination',
        fullDescription: 'Exclusive masterclass focused on developing excellent answer writing skills for UPSC Mains. Learn structure, presentation, and content enrichment techniques.',
        instructor: 'Dr. Rajesh Kumar',
        instructorId: 2,
        duration: '3 months',
        price: 15000,
        discountedPrice: 11999,
        thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
        enrolled: 178,
        rating: 4.7,
        totalRatings: 98,
        level: 'Advanced',
        language: 'Hindi & English',
        syllabus: [
            'Answer Writing Techniques',
            'Essay Writing Skills',
            'GS Paper 1 - Answer Practice',
            'GS Paper 2 - Answer Practice',
            'GS Paper 3 & 4 - Answer Practice'
        ],
        features: [
            'Personalized Evaluation',
            'Model Answers',
            'Weekly Writing Tests',
            'One-on-One Mentorship',
            'Telegram Discussion Group'
        ],
        startDate: '2024-02-15',
        status: 'active'
    },
    {
        id: 4,
        title: 'Current Affairs 2024-25 Complete',
        category: 'Current Affairs',
        description: 'Daily current affairs coverage with weekly compilations and tests',
        fullDescription: 'Stay updated with comprehensive current affairs coverage. Daily analysis, weekly compilations, monthly magazines, and regular tests to ensure thorough preparation.',
        instructor: 'Prof. Priya Sharma',
        instructorId: 3,
        duration: '12 months',
        price: 8000,
        discountedPrice: 5999,
        thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
        enrolled: 567,
        rating: 4.6,
        totalRatings: 342,
        level: 'All Levels',
        language: 'Hindi & English',
        syllabus: [
            'Daily News Analysis',
            'Weekly Current Affairs Compilation',
            'Monthly Magazine',
            'PIB Analysis',
            'Editorials & Opinion'
        ],
        features: [
            'Daily Updates',
            'Weekly Tests',
            'Monthly Magazine PDF',
            'Mobile App Access',
            'Revision Notes'
        ],
        startDate: '2024-01-01',
        status: 'active'
    },
    {
        id: 5,
        title: 'Optional - History Complete Course',
        category: 'Optional',
        description: 'Complete History optional preparation for UPSC Mains',
        fullDescription: 'Comprehensive course for History optional covering both Paper I and Paper II with detailed lectures, notes, and answer writing practice.',
        instructor: 'Dr. Rajesh Kumar',
        instructorId: 2,
        duration: '8 months',
        price: 30000,
        discountedPrice: 24999,
        thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400',
        enrolled: 123,
        rating: 4.9,
        totalRatings: 87,
        level: 'Advanced',
        language: 'Hindi & English',
        syllabus: [
            'World History - Paper I',
            'Indian History - Paper II',
            'Historiography',
            'Answer Writing Practice',
            'Previous Year Papers Discussion'
        ],
        features: [
            'Detailed Video Lectures',
            'Comprehensive Notes',
            'Answer Evaluation',
            'Test Series',
            'Doubt Sessions'
        ],
        startDate: '2024-02-01',
        status: 'active'
    }
];

/**
 * Helper function to get course by ID
 */
export const getCourseById = (id) => {
    return dummyCourses.find(course => course.id === parseInt(id));
};

/**
 * Helper function to get courses by category
 */
export const getCoursesByCategory = (category) => {
    return dummyCourses.filter(course => course.category === category);
};

/**
 * Helper function to get courses by instructor ID
 */
export const getCoursesByInstructor = (instructorId) => {
    return dummyCourses.filter(course => course.instructorId === instructorId);
};
