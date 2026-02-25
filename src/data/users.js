/**
 * DUMMY USER DATA
 * This file contains hardcoded users for demo authentication
 * In production, this would come from a real database
 */

export const dummyUsers = [
    // Admin Users
    {
        id: 1,
        email: 'admin@lms.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        phone: '9876543210',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=fff'
    },

    // Faculty Users
    {
        id: 2,
        email: 'faculty@lms.com',
        password: 'faculty123',
        role: 'faculty',
        name: 'Dr. Rajesh Kumar',
        phone: '9876543211',
        avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=059669&color=fff',
        specialization: 'History & Polity',
        experience: '15 years',
        assignedCourses: [1, 2, 3]
    },
    {
        id: 3,
        email: 'faculty2@lms.com',
        password: 'faculty123',
        role: 'faculty',
        name: 'Prof. Priya Sharma',
        phone: '9876543212',
        avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=059669&color=fff',
        specialization: 'Geography & Environment',
        experience: '12 years',
        assignedCourses: [4, 5]
    },

    // Student Users
    {
        id: 4,
        email: 'student@lms.com',
        password: 'student123',
        role: 'student',
        name: 'Amit Verma',
        phone: '9876543213',
        avatar: 'https://ui-avatars.com/api/?name=Amit+Verma&background=dc2626&color=fff',
        enrolledCourses: [1, 3, 5],
        batch: '2024',
        targetExam: 'UPSC CSE 2025'
    },
    {
        id: 5,
        email: 'student2@lms.com',
        password: 'student123',
        role: 'student',
        name: 'Sneha Patel',
        phone: '9876543214',
        avatar: 'https://ui-avatars.com/api/?name=Sneha+Patel&background=dc2626&color=fff',
        enrolledCourses: [2, 4],
        batch: '2024',
        targetExam: 'UPSC CSE 2025'
    }
];

/**
 * Helper function to find user by email
 */
export const findUserByEmail = (email) => {
    return dummyUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Helper function to find user by ID
 */
export const findUserById = (id) => {
    return dummyUsers.find(user => user.id === id);
};
