/**
 * COURSE API (FAKE/SIMULATED)
 * This simulates backend course operations
 * In production, this would make real API calls to a backend server
 */

import { dummyCourses, getCourseById, getCoursesByCategory, getCoursesByInstructor } from '../data/courses';

/**
 * Simulated delay to mimic API call
 */
const simulateDelay = (ms = 500) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get all courses
 */
export const getAllCoursesApi = async () => {
    await simulateDelay(600);

    try {
        return {
            success: true,
            message: 'Courses fetched successfully',
            data: dummyCourses
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch courses',
            data: []
        };
    }
};

/**
 * Get course by ID
 */
export const getCourseByIdApi = async (courseId) => {
    await simulateDelay(400);

    try {
        const course = getCourseById(courseId);

        if (!course) {
            return {
                success: false,
                message: 'Course not found',
                data: null
            };
        }

        return {
            success: true,
            message: 'Course fetched successfully',
            data: course
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch course',
            data: null
        };
    }
};

/**
 * Get courses by category
 */
export const getCoursesByCategoryApi = async (category) => {
    await simulateDelay(500);

    try {
        const courses = getCoursesByCategory(category);

        return {
            success: true,
            message: 'Courses fetched successfully',
            data: courses
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch courses',
            data: []
        };
    }
};

/**
 * Get courses by instructor (for faculty)
 */
export const getCoursesByInstructorApi = async (instructorId) => {
    await simulateDelay(500);

    try {
        const courses = getCoursesByInstructor(instructorId);

        return {
            success: true,
            message: 'Courses fetched successfully',
            data: courses
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch courses',
            data: []
        };
    }
};

/**
 * Enroll in course (dummy)
 */
export const enrollCourseApi = async (courseId, studentId) => {
    await simulateDelay(800);

    try {
        const course = getCourseById(courseId);

        if (!course) {
            return {
                success: false,
                message: 'Course not found',
                data: null
            };
        }

        // In real app, this would save enrollment to database
        return {
            success: true,
            message: `Successfully enrolled in ${course.title}`,
            data: {
                courseId: course.id,
                studentId: studentId,
                enrolledDate: new Date().toISOString(),
                status: 'active'
            }
        };
    } catch (error) {
        return {
            success: false,
            message: 'Enrollment failed',
            data: null
        };
    }
};

/**
 * Add new course (Admin only - dummy)
 */
export const addCourseApi = async (courseData) => {
    await simulateDelay(700);

    try {
        // In real app, this would save to database
        const newCourse = {
            id: dummyCourses.length + 1,
            ...courseData,
            enrolled: 0,
            rating: 0,
            totalRatings: 0,
            status: 'active'
        };

        return {
            success: true,
            message: 'Course added successfully',
            data: newCourse
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to add course',
            data: null
        };
    }
};

/**
 * Update course (Admin only - dummy)
 */
export const updateCourseApi = async (courseId, updates) => {
    await simulateDelay(700);

    try {
        const course = getCourseById(courseId);

        if (!course) {
            return {
                success: false,
                message: 'Course not found',
                data: null
            };
        }

        // In real app, this would update in database
        const updatedCourse = { ...course, ...updates };

        return {
            success: true,
            message: 'Course updated successfully',
            data: updatedCourse
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to update course',
            data: null
        };
    }
};

/**
 * Delete course (Admin only - dummy)
 */
export const deleteCourseApi = async (courseId) => {
    await simulateDelay(600);

    try {
        const course = getCourseById(courseId);

        if (!course) {
            return {
                success: false,
                message: 'Course not found',
                data: null
            };
        }

        // In real app, this would delete from database
        return {
            success: true,
            message: 'Course deleted successfully',
            data: { courseId }
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to delete course',
            data: null
        };
    }
};

/**
 * Get student's enrolled courses
 */
export const getEnrolledCoursesApi = async (studentId, enrolledCourseIds) => {
    await simulateDelay(500);

    try {
        const enrolledCourses = dummyCourses.filter(course =>
            enrolledCourseIds.includes(course.id)
        );

        return {
            success: true,
            message: 'Enrolled courses fetched successfully',
            data: enrolledCourses
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to fetch enrolled courses',
            data: []
        };
    }
};
