/**
 * DUMMY BLOG DATA
 * This file contains hardcoded blog posts
 * In production, this would come from a real CMS or database
 */

export const dummyBlogs = [
    {
        id: 1,
        title: 'How to Start UPSC Preparation from Scratch',
        slug: 'how-to-start-upsc-preparation',
        excerpt: 'A comprehensive guide for beginners on how to start their UPSC CSE journey with the right strategy and resources.',
        content: `
      <h2>Introduction</h2>
      <p>Starting UPSC preparation can be overwhelming for beginners. This guide will help you understand the basics and create a solid foundation.</p>
      
      <h2>Understanding the Exam Pattern</h2>
      <p>UPSC CSE consists of three stages: Prelims, Mains, and Interview. Each stage requires different preparation strategies.</p>
      
      <h2>Building Your Foundation</h2>
      <ul>
        <li>Start with NCERT books from Class 6 to 12</li>
        <li>Read newspapers daily (The Hindu or Indian Express)</li>
        <li>Choose your optional subject wisely</li>
        <li>Create a realistic study schedule</li>
      </ul>
      
      <h2>Important Resources</h2>
      <p>Focus on standard books and avoid information overload. Quality matters more than quantity.</p>
    `,
        author: 'Dr. Rajesh Kumar',
        authorId: 2,
        category: 'Strategy',
        tags: ['UPSC', 'Preparation', 'Beginners', 'Strategy'],
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
        publishedDate: '2024-01-15',
        readTime: '8 min read',
        views: 2456,
        likes: 189,
        featured: true
    },
    {
        id: 2,
        title: 'Top 10 Current Affairs Topics for UPSC 2025',
        slug: 'top-current-affairs-topics-2025',
        excerpt: 'Stay ahead with the most important current affairs topics that are crucial for UPSC CSE 2025 preparation.',
        content: `
      <h2>Why Current Affairs Matter</h2>
      <p>Current affairs form the backbone of both Prelims and Mains examination. Here are the top topics to focus on.</p>
      
      <h2>Top 10 Topics</h2>
      <ol>
        <li>Climate Change and COP Summits</li>
        <li>India's Foreign Policy</li>
        <li>Digital India Initiatives</li>
        <li>Economic Reforms</li>
        <li>Social Justice Issues</li>
        <li>Science and Technology Developments</li>
        <li>Internal Security Challenges</li>
        <li>Governance and Transparency</li>
        <li>Environmental Conservation</li>
        <li>International Relations</li>
      </ol>
      
      <h2>How to Study Current Affairs</h2>
      <p>Make daily notes, create mind maps, and regularly revise to retain information effectively.</p>
    `,
        author: 'Prof. Priya Sharma',
        authorId: 3,
        category: 'Current Affairs',
        tags: ['Current Affairs', 'UPSC 2025', 'Topics'],
        thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600',
        publishedDate: '2024-01-20',
        readTime: '6 min read',
        views: 3421,
        likes: 267,
        featured: true
    },
    {
        id: 3,
        title: 'Mastering Answer Writing for UPSC Mains',
        slug: 'mastering-answer-writing-upsc-mains',
        excerpt: 'Learn the art and science of writing effective answers that score high marks in UPSC Mains examination.',
        content: `
      <h2>The Importance of Answer Writing</h2>
      <p>Answer writing is a skill that can make or break your Mains performance. It's not just about what you know, but how you present it.</p>
      
      <h2>Key Principles</h2>
      <ul>
        <li>Structure: Introduction, Body, Conclusion</li>
        <li>Clarity: Use simple, direct language</li>
        <li>Relevance: Stick to the question</li>
        <li>Balance: Present multiple perspectives</li>
        <li>Presentation: Use diagrams, flowcharts, tables</li>
      </ul>
      
      <h2>Practice Strategy</h2>
      <p>Write at least 5 answers daily and get them evaluated by mentors or peers.</p>
      
      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Writing too much or too little</li>
        <li>Poor handwriting</li>
        <li>Lack of structure</li>
        <li>Ignoring the question's demand</li>
      </ul>
    `,
        author: 'Dr. Rajesh Kumar',
        authorId: 2,
        category: 'Mains Preparation',
        tags: ['Answer Writing', 'Mains', 'Strategy', 'Tips'],
        thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600',
        publishedDate: '2024-01-18',
        readTime: '10 min read',
        views: 1987,
        likes: 156,
        featured: false
    },
    {
        id: 4,
        title: 'NCERT Books: The Foundation of UPSC Preparation',
        slug: 'ncert-books-upsc-foundation',
        excerpt: 'Why NCERT books are essential and how to effectively use them for UPSC preparation.',
        content: `
      <h2>Why NCERT?</h2>
      <p>NCERT books provide conceptual clarity and form the foundation for advanced topics in UPSC syllabus.</p>
      
      <h2>Subject-wise NCERT Coverage</h2>
      <h3>History</h3>
      <p>Class 6-12 History NCERTs cover Ancient, Medieval, and Modern Indian History comprehensively.</p>
      
      <h3>Geography</h3>
      <p>Class 6-12 Geography NCERTs are crucial for both physical and human geography.</p>
      
      <h3>Polity</h3>
      <p>Class 11-12 Political Science NCERTs are fundamental for understanding Indian polity.</p>
      
      <h2>How to Read NCERTs</h2>
      <ul>
        <li>Read actively, not passively</li>
        <li>Make notes of important points</li>
        <li>Revise multiple times</li>
        <li>Solve exercise questions</li>
      </ul>
    `,
        author: 'Prof. Priya Sharma',
        authorId: 3,
        category: 'Resources',
        tags: ['NCERT', 'Books', 'Foundation', 'Resources'],
        thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600',
        publishedDate: '2024-01-12',
        readTime: '7 min read',
        views: 2134,
        likes: 178,
        featured: false
    },
    {
        id: 5,
        title: 'Time Management Tips for UPSC Aspirants',
        slug: 'time-management-tips-upsc',
        excerpt: 'Effective time management strategies to balance your UPSC preparation with other commitments.',
        content: `
      <h2>The Challenge of Time Management</h2>
      <p>UPSC preparation is a marathon, not a sprint. Managing your time effectively is crucial for success.</p>
      
      <h2>Creating Your Study Schedule</h2>
      <ul>
        <li>Identify your productive hours</li>
        <li>Allocate time for each subject</li>
        <li>Include breaks and leisure time</li>
        <li>Be flexible and realistic</li>
      </ul>
      
      <h2>Daily Routine Suggestions</h2>
      <p>Morning: Newspaper reading and current affairs<br>
      Afternoon: Core subjects study<br>
      Evening: Revision and answer writing<br>
      Night: Light reading and planning for next day</p>
      
      <h2>Avoiding Burnout</h2>
      <p>Take regular breaks, maintain hobbies, exercise, and ensure adequate sleep.</p>
    `,
        author: 'Dr. Rajesh Kumar',
        authorId: 2,
        category: 'Strategy',
        tags: ['Time Management', 'Study Plan', 'Productivity'],
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
        publishedDate: '2024-01-10',
        readTime: '5 min read',
        views: 1765,
        likes: 134,
        featured: false
    },
    {
        id: 6,
        title: 'Interview Preparation: What Toppers Don\'t Tell You',
        slug: 'upsc-interview-preparation-secrets',
        excerpt: 'Insider tips and strategies for acing the UPSC personality test from successful candidates.',
        content: `
      <h2>Understanding the Interview</h2>
      <p>The UPSC interview is not just about knowledge, but about your personality, attitude, and awareness.</p>
      
      <h2>Preparation Strategy</h2>
      <ul>
        <li>Know your DAF (Detailed Application Form) thoroughly</li>
        <li>Stay updated with current affairs</li>
        <li>Develop opinions on contemporary issues</li>
        <li>Practice mock interviews</li>
        <li>Work on communication skills</li>
      </ul>
      
      <h2>Common Interview Topics</h2>
      <ul>
        <li>Your educational background</li>
        <li>Hobbies and interests</li>
        <li>Home state/district</li>
        <li>Current national and international issues</li>
        <li>Ethical dilemmas</li>
      </ul>
      
      <h2>Body Language and Presentation</h2>
      <p>Maintain eye contact, sit confidently, speak clearly, and be honest in your responses.</p>
    `,
        author: 'Admin User',
        authorId: 1,
        category: 'Interview',
        tags: ['Interview', 'Personality Test', 'Tips', 'Strategy'],
        thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
        publishedDate: '2024-01-08',
        readTime: '9 min read',
        views: 2891,
        likes: 234,
        featured: true
    }
];

/**
 * Helper function to get blog by ID
 */
export const getBlogById = (id) => {
    return dummyBlogs.find(blog => blog.id === parseInt(id));
};

/**
 * Helper function to get blog by slug
 */
export const getBlogBySlug = (slug) => {
    return dummyBlogs.find(blog => blog.slug === slug);
};

/**
 * Helper function to get blogs by category
 */
export const getBlogsByCategory = (category) => {
    return dummyBlogs.filter(blog => blog.category === category);
};

/**
 * Helper function to get featured blogs
 */
export const getFeaturedBlogs = () => {
    return dummyBlogs.filter(blog => blog.featured);
};

/**
 * Helper function to get blogs by author
 */
export const getBlogsByAuthor = (authorId) => {
    return dummyBlogs.filter(blog => blog.authorId === authorId);
};
