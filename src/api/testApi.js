/**
 * TEST/QUIZ API (FAKE/SIMULATED)
 * This simulates backend test operations
 * In production, this would make real API calls to a backend server
 */

import { dummyTests, getTestById, getTestsByCategory, getStudentAttempts, getTestQuestions, sampleQuestions } from '../data/tests';

/**
 * Simulated delay to mimic API call
 */
const simulateDelay = (ms = 500) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get all tests
 */
export const getAllTestsApi = async () => {
    await simulateDelay(600);

    try {
        return {
            success: true,
            message: 'Tests fetched successfully',
            data: dummyTests
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch tests',
            data: []
        };
    }
};

/**
 * Get test by ID
 */
export const getTestByIdApi = async (testId) => {
    await simulateDelay(400);

    try {
        const test = getTestById(testId);

        if (!test) {
            return {
                success: false,
                message: 'Test not found',
                data: null
            };
        }

        return {
            success: true,
            message: 'Test fetched successfully',
            data: test
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch test',
            data: null
        };
    }
};

/**
 * Get test questions
 */
export const getTestQuestionsApi = async (testId) => {
    await simulateDelay(800);

    try {
        // For demo, return sample questions
        const questions = getTestQuestions(testId);

        // If no specific questions, return sample questions
        const questionsToReturn = questions.length > 0 ? questions : sampleQuestions;

        return {
            success: true,
            message: 'Questions fetched successfully',
            data: questionsToReturn
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch questions',
            data: []
        };
    }
};

/**
 * Submit test answers (dummy)
 */
export const submitTestApi = async (testId, studentId, answers) => {
    await simulateDelay(1000);

    try {
        const test = getTestById(testId);

        if (!test) {
            return {
                success: false,
                message: 'Test not found',
                data: null
            };
        }

        // Calculate dummy score (in real app, this would be calculated on backend)
        const totalQuestions = test.totalQuestions;
        const correctAnswers = Math.floor(Math.random() * (totalQuestions * 0.8)) + (totalQuestions * 0.2);
        const incorrectAnswers = Math.floor((totalQuestions - correctAnswers) * 0.8);
        const unattempted = totalQuestions - correctAnswers - incorrectAnswers;

        const score = (correctAnswers * 2) - (incorrectAnswers * test.negativeMarks);
        const percentage = (score / test.totalMarks) * 100;

        const result = {
            testId: test.id,
            studentId: studentId,
            attemptDate: new Date().toISOString(),
            score: Math.round(score),
            totalMarks: test.totalMarks,
            percentage: Math.round(percentage),
            correctAnswers: correctAnswers,
            incorrectAnswers: incorrectAnswers,
            unattempted: unattempted,
            rank: Math.floor(Math.random() * 100) + 1,
            totalAttempts: test.attempts + 1
        };

        return {
            success: true,
            message: 'Test submitted successfully',
            data: result
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to submit test',
            data: null
        };
    }
};

/**
 * Get student's test attempts
 */
export const getStudentAttemptsApi = async (studentId) => {
    await simulateDelay(500);

    try {
        const attempts = getStudentAttempts(studentId);

        return {
            success: true,
            message: 'Attempts fetched successfully',
            data: attempts
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch attempts',
            data: []
        };
    }
};

/**
 * Add new test (Admin/Faculty - dummy)
 */
export const addTestApi = async (testData) => {
    await simulateDelay(700);

    try {
        // In real app, this would save to database
        const newTest = {
            id: dummyTests.length + 1,
            ...testData,
            attempts: 0,
            averageScore: 0,
            status: 'active'
        };

        return {
            success: true,
            message: 'Test created successfully',
            data: newTest
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to create test',
            data: null
        };
    }
};

/**
 * Update test (Admin/Faculty - dummy)
 */
export const updateTestApi = async (testId, updates) => {
    await simulateDelay(700);

    try {
        const test = getTestById(testId);

        if (!test) {
            return {
                success: false,
                message: 'Test not found',
                data: null
            };
        }

        // In real app, this would update in database
        const updatedTest = { ...test, ...updates };

        return {
            success: true,
            message: 'Test updated successfully',
            data: updatedTest
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to update test',
            data: null
        };
    }
};

/**
 * Delete test (Admin only - dummy)
 */
export const deleteTestApi = async (testId) => {
    await simulateDelay(600);

    try {
        const test = getTestById(testId);

        if (!test) {
            return {
                success: false,
                message: 'Test not found',
                data: null
            };
        }

        // In real app, this would delete from database
        return {
            success: true,
            message: 'Test deleted successfully',
            data: { testId }
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to delete test',
            data: null
        };
    }
};
