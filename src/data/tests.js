/**
 * DUMMY TEST/QUIZ DATA
 * This file contains hardcoded test series and MCQ data
 * In production, this would come from a real database
 */

export const dummyTests = [
    {
        id: 1,
        title: 'UPSC Prelims Mock Test - 1',
        description: 'Full length mock test covering all subjects for UPSC Prelims',
        category: 'Prelims',
        duration: 120, // minutes
        totalQuestions: 100,
        totalMarks: 200,
        negativeMarking: true,
        negativeMarks: 0.33,
        difficulty: 'Medium',
        createdBy: 'Dr. Rajesh Kumar',
        createdById: 2,
        attempts: 456,
        averageScore: 68.5,
        status: 'active',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
    },
    {
        id: 2,
        title: 'Current Affairs Quiz - January 2024',
        description: 'Test your knowledge of current affairs from January 2024',
        category: 'Current Affairs',
        duration: 30,
        totalQuestions: 25,
        totalMarks: 50,
        negativeMarking: true,
        negativeMarks: 0.25,
        difficulty: 'Easy',
        createdBy: 'Prof. Priya Sharma',
        createdById: 3,
        attempts: 789,
        averageScore: 35.2,
        status: 'active',
        thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400'
    },
    {
        id: 3,
        title: 'Indian Polity - Practice Test',
        description: 'Comprehensive test on Indian Constitution and Polity',
        category: 'Polity',
        duration: 60,
        totalQuestions: 50,
        totalMarks: 100,
        negativeMarking: true,
        negativeMarks: 0.33,
        difficulty: 'Hard',
        createdBy: 'Dr. Rajesh Kumar',
        createdById: 2,
        attempts: 234,
        averageScore: 52.8,
        status: 'active',
        thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400'
    }
];

/**
 * Sample MCQ Questions for Demo Test
 */
export const sampleQuestions = [
    {
        id: 1,
        testId: 1,
        questionNumber: 1,
        question: 'Which of the following is NOT a fundamental right under the Indian Constitution?',
        options: [
            'Right to Equality',
            'Right to Freedom',
            'Right to Property',
            'Right against Exploitation'
        ],
        correctAnswer: 2, // index of correct option (0-based)
        explanation: 'Right to Property was removed from fundamental rights by the 44th Amendment Act, 1978. It is now a constitutional right under Article 300A.',
        marks: 2,
        subject: 'Polity'
    },
    {
        id: 2,
        testId: 1,
        questionNumber: 2,
        question: 'The term "Gross Domestic Product" (GDP) represents:',
        options: [
            'Total value of goods and services produced within a country',
            'Total value of exports minus imports',
            'Per capita income of citizens',
            'Government revenue in a fiscal year'
        ],
        correctAnswer: 0,
        explanation: 'GDP is the total monetary value of all finished goods and services produced within a country\'s borders in a specific time period.',
        marks: 2,
        subject: 'Economy'
    },
    {
        id: 3,
        testId: 1,
        questionNumber: 3,
        question: 'Which river does NOT originate in India?',
        options: [
            'Ganga',
            'Brahmaputra',
            'Godavari',
            'Krishna'
        ],
        correctAnswer: 1,
        explanation: 'Brahmaputra originates in Tibet (China) from the Angsi Glacier. It enters India through Arunachal Pradesh.',
        marks: 2,
        subject: 'Geography'
    },
    {
        id: 4,
        testId: 1,
        questionNumber: 4,
        question: 'The Battle of Plassey was fought in which year?',
        options: [
            '1757',
            '1764',
            '1857',
            '1947'
        ],
        correctAnswer: 0,
        explanation: 'The Battle of Plassey was fought on 23 June 1757 between the British East India Company and the Nawab of Bengal.',
        marks: 2,
        subject: 'History'
    },
    {
        id: 5,
        testId: 1,
        questionNumber: 5,
        question: 'Which of the following is a biodiversity hotspot in India?',
        options: [
            'Thar Desert',
            'Western Ghats',
            'Indo-Gangetic Plain',
            'Deccan Plateau'
        ],
        correctAnswer: 1,
        explanation: 'Western Ghats is one of the four biodiversity hotspots in India. The others are Eastern Himalayas, Indo-Burma region, and Sundaland.',
        marks: 2,
        subject: 'Environment'
    }
];

/**
 * Student Test Attempts (for demo)
 */
export const studentTestAttempts = [
    {
        id: 1,
        studentId: 4,
        testId: 1,
        attemptDate: '2024-01-20',
        score: 142,
        totalMarks: 200,
        percentage: 71,
        timeTaken: 115, // minutes
        correctAnswers: 75,
        incorrectAnswers: 20,
        unattempted: 5,
        rank: 45,
        totalAttempts: 456
    },
    {
        id: 2,
        studentId: 4,
        testId: 2,
        attemptDate: '2024-01-22',
        score: 38,
        totalMarks: 50,
        percentage: 76,
        timeTaken: 28,
        correctAnswers: 20,
        incorrectAnswers: 4,
        unattempted: 1,
        rank: 23,
        totalAttempts: 789
    }
];

/**
 * Helper function to get test by ID
 */
export const getTestById = (id) => {
    return dummyTests.find(test => test.id === parseInt(id));
};

/**
 * Helper function to get tests by category
 */
export const getTestsByCategory = (category) => {
    return dummyTests.filter(test => test.category === category);
};

/**
 * Helper function to get student's test attempts
 */
export const getStudentAttempts = (studentId) => {
    return studentTestAttempts.filter(attempt => attempt.studentId === studentId);
};

/**
 * Helper function to get questions for a test
 */
export const getTestQuestions = (testId) => {
    return sampleQuestions.filter(q => q.testId === parseInt(testId));
};
