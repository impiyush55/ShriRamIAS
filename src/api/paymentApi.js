/**
 * PAYMENT API (SIMULATED)
 * This file simulates a real backend for demonstration purposes.
 * It uses localStorage to persist wallet balances and enrollments.
 */

import { dummyCourses } from '../data/courses';

const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Get or initialize wallet balance (USER SPECIFIC)
export const getWalletBalance = () => {
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) return 0;
    const user = JSON.parse(userStr);

    const balanceKey = `walletBalance_${user.id}`;
    const balance = localStorage.getItem(balanceKey);

    if (balance === null) {
        localStorage.setItem(balanceKey, '100000'); // Default ₹1L for demo purposes
        return 100000;
    }
    return parseFloat(balance);
};

// Helper: Get or initialize enrollments
const getMockEnrollments = () => {
    const enrollments = localStorage.getItem('mockEnrollments');
    return enrollments ? JSON.parse(enrollments) : [];
};

export const payWithWallet = async (courseId, centre = 'Online') => {
    await simulateDelay(1000);

    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) throw { message: 'User not logged in' };
    const user = JSON.parse(userStr);

    const course = dummyCourses.find(c => c.id === parseInt(courseId));
    if (!course) throw { message: 'Course not found' };

    // 1. Check if already enrolled
    const enrollments = getMockEnrollments();
    const isEnrolled = enrollments.some(e => e.studentId === user.id && e.courseId === course.id);

    if (isEnrolled) {
        return { success: true, message: 'Already enrolled' };
    }

    // 2. Check balance
    const currentBalance = getWalletBalance();
    const coursePrice = course.discountedPrice || course.price;

    if (currentBalance < coursePrice) {
        throw {
            message: 'Insufficient wallet balance',
            redirectTo: '/wallet',
            balance: currentBalance,
            required: coursePrice
        };
    }

    // 3. Process Transaction (USER SPECIFIC)
    const newBalance = currentBalance - coursePrice;
    localStorage.setItem(`walletBalance_${user.id}`, newBalance.toString());

    // 4. Save Enrollment (PENDING APPROVAL)
    const newEnrollment = {
        id: Date.now(),
        studentId: user.id,
        studentName: user.name,
        studentEmail: user.email,
        studentAvatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}`,
        courseId: course.id,
        courseTitle: course.title,
        amount: coursePrice,
        paymentMethod: 'wallet',
        centre: centre, // Save the branch/centre
        status: 'pending', // Starts as pending for manual approval
        enrolledAt: new Date().toISOString()
    };

    localStorage.setItem('mockEnrollments', JSON.stringify([...enrollments, newEnrollment]));

    return {
        success: true,
        message: 'Course purchased successfully!',
        newBalance
    };
};

export const getAdminPaymentStats = async () => {
    await simulateDelay(600);

    const enrollments = getMockEnrollments();
    const approvedEnrollments = enrollments.filter(e => e.status === 'approved');

    const stats = {
        totalSales: approvedEnrollments.reduce((sum, e) => sum + e.amount, 0),
        totalEnrollments: approvedEnrollments.length,
        walletRevenue: approvedEnrollments.filter(e => e.paymentMethod === 'wallet').reduce((sum, e) => sum + e.amount, 0),
        pendingApprovals: enrollments.filter(e => e.status === 'pending').length
    };

    return {
        success: true,
        stats,
        recentEnrollments: enrollments.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt)).slice(0, 15)
    };
};

export const approveEnrollment = async (enrollmentId) => {
    await simulateDelay(500);
    const enrollments = getMockEnrollments();
    const updated = enrollments.map(e => {
        if (e.id === enrollmentId) {
            return { ...e, status: 'approved' };
        }
        return e;
    });
    localStorage.setItem('mockEnrollments', JSON.stringify(updated));
    return { success: true, message: 'Enrollment approved successfully!' };
};
