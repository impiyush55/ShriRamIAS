/**
 * FACULTY DASHBOARD DATA
 * This file contains hardcoded faculty-specific statistics for demo purposes
 * Each course has detailed metrics that will be displayed when selected
 * 
 * NO BACKEND - NO API - PURE FRONTEND DEMO DATA
 */

/**
 * Faculty-specific course statistics
 * Each faculty member has detailed stats for their assigned courses
 */
export const facultyCourseStats = {
    // Dr. Rajesh Kumar (instructorId: 2)
    2: {
        // Overall stats (when no course is selected)
        overall: {
            assignedCourses: 3,
            totalStudents: 546,  // Sum of all students across courses
            averageRating: 4.8,  // Average of all course ratings
            liveSessions: 72     // Total live sessions across all courses
        },
        // Individual course stats
        courses: {
            1: {  // Foundation Course
                courseId: 1,
                courseName: 'Foundation Course - Complete UPSC Preparation',
                students: 245,
                rating: 4.8,
                liveSessions: 24,
                completionRate: 78,
                activeStudents: 198,
                assignments: 12,
                averageScore: 76,
                lastSession: '2024-01-15',
                nextSession: '2024-01-22',
                studentsThisMonth: 45,
                recentActivity: 'High engagement in History module'
            },
            3: {  // Mains Answer Writing
                courseId: 3,
                courseName: 'Mains Answer Writing Masterclass',
                students: 178,
                rating: 4.7,
                liveSessions: 18,
                completionRate: 82,
                activeStudents: 156,
                assignments: 15,
                averageScore: 81,
                lastSession: '2024-01-18',
                nextSession: '2024-01-25',
                studentsThisMonth: 32,
                recentActivity: 'Excellent performance in Essay writing'
            },
            5: {  // History Optional
                courseId: 5,
                courseName: 'Optional - History Complete Course',
                students: 123,
                rating: 4.9,
                liveSessions: 30,
                completionRate: 85,
                activeStudents: 112,
                assignments: 20,
                averageScore: 84,
                lastSession: '2024-01-20',
                nextSession: '2024-01-27',
                studentsThisMonth: 18,
                recentActivity: 'World History Paper I discussion ongoing'
            }
        }
    },

    // Prof. Priya Sharma (instructorId: 3)
    3: {
        overall: {
            assignedCourses: 2,
            totalStudents: 956,
            averageRating: 4.75,
            liveSessions: 58
        },
        courses: {
            2: {  // Prelims Intensive
                courseId: 2,
                courseName: 'Prelims Intensive 2025',
                students: 389,
                rating: 4.9,
                liveSessions: 32,
                completionRate: 71,
                activeStudents: 334,
                assignments: 50,
                averageScore: 72,
                lastSession: '2024-01-19',
                nextSession: '2024-01-23',
                studentsThisMonth: 67,
                recentActivity: 'Mock test series in progress'
            },
            4: {  // Current Affairs
                courseId: 4,
                courseName: 'Current Affairs 2024-25 Complete',
                students: 567,
                rating: 4.6,
                liveSessions: 26,
                completionRate: 88,
                activeStudents: 523,
                assignments: 24,
                averageScore: 79,
                lastSession: '2024-01-21',
                nextSession: '2024-01-24',
                studentsThisMonth: 89,
                recentActivity: 'Daily news analysis - Budget 2024 coverage'
            }
        }
    }
};

/**
 * Get overall faculty statistics
 * @param {number} instructorId - Faculty instructor ID
 * @returns {object} Overall statistics for the faculty
 */
export const getFacultyOverallStats = (instructorId) => {
    const facultyData = facultyCourseStats[instructorId];
    if (!facultyData) {
        return {
            assignedCourses: 0,
            totalStudents: 0,
            averageRating: 0,
            liveSessions: 0
        };
    }
    return facultyData.overall;
};

/**
 * Get statistics for a specific course
 * @param {number} instructorId - Faculty instructor ID
 * @param {number} courseId - Course ID
 * @returns {object} Course-specific statistics
 */
export const getCourseStats = (instructorId, courseId) => {
    const facultyData = facultyCourseStats[instructorId];
    if (!facultyData || !facultyData.courses[courseId]) {
        return null;
    }
    return facultyData.courses[courseId];
};

/**
 * Get all courses for a faculty member with their stats
 * @param {number} instructorId - Faculty instructor ID
 * @returns {array} Array of course statistics
 */
export const getAllFacultyCourseStats = (instructorId) => {
    const facultyData = facultyCourseStats[instructorId];
    if (!facultyData || !facultyData.courses) {
        return [];
    }
    return Object.values(facultyData.courses);
};

/**
 * Transform course stats to dashboard format
 * Used when a specific course is selected
 * @param {object} courseStats - Course statistics object
 * @returns {object} Dashboard-formatted statistics
 */
export const transformCourseToDashboardStats = (courseStats) => {
    return {
        assignedCourses: 1,  // Only one course is selected
        totalStudents: courseStats.students,
        averageRating: courseStats.rating,
        liveSessions: courseStats.liveSessions
    };
};
