/**
 * AUTHENTICATION API (FAKE/SIMULATED)
 * This simulates backend authentication using localStorage
 * In production, this would make real API calls to a backend server
 */

import { dummyUsers, findUserByEmail } from '../data/users';

/**
 * Simulated delay to mimic API call
 */
const simulateDelay = (ms = 500) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Login API
 * Validates credentials and returns user data
 */
export const loginApi = async (email, password) => {
    await simulateDelay(800);

    try {
        const user = findUserByEmail(email);

        if (!user) {
            return {
                success: false,
                message: 'User not found. Please check your email.',
                data: null
            };
        }

        if (user.password !== password) {
            return {
                success: false,
                message: 'Incorrect password. Please try again.',
                data: null
            };
        }

        // Create session token (fake JWT)
        const token = `fake_jwt_token_${user.id}_${Date.now()}`;

        // Store in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone
        }));

        return {
            success: true,
            message: 'Login successful!',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    avatar: user.avatar,
                    phone: user.phone
                },
                token: token
            }
        };
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred during login. Please try again.',
            data: null
        };
    }
};

/**
 * Logout API
 * Clears session data
 */
export const logoutApi = async () => {
    await simulateDelay(300);

    try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');

        return {
            success: true,
            message: 'Logged out successfully',
            data: null
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error during logout',
            data: null
        };
    }
};

/**
 * Register API (Dummy - just validates and stores)
 */
export const registerApi = async (userData) => {
    await simulateDelay(1000);

    try {
        // Check if user already exists
        const existingUser = findUserByEmail(userData.email);

        if (existingUser) {
            return {
                success: false,
                message: 'User with this email already exists',
                data: null
            };
        }

        // In a real app, this would save to database
        // For demo, we just return success
        return {
            success: true,
            message: 'Registration successful! Please login with your credentials.',
            data: {
                email: userData.email,
                name: userData.name
            }
        };
    } catch (error) {
        return {
            success: false,
            message: 'Registration failed. Please try again.',
            data: null
        };
    }
};

/**
 * Get Current User
 * Retrieves user from localStorage
 */
export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('currentUser');
        const token = localStorage.getItem('authToken');

        if (!userStr || !token) {
            return null;
        }

        return JSON.parse(userStr);
    } catch (error) {
        return null;
    }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    return !!(token && user);
};

/**
 * Check if user has specific role
 */
export const hasRole = (requiredRole) => {
    const user = getCurrentUser();
    if (!user) return false;

    if (Array.isArray(requiredRole)) {
        return requiredRole.includes(user.role);
    }

    return user.role === requiredRole;
};

/**
 * Update user profile (dummy)
 */
export const updateProfileApi = async (updates) => {
    await simulateDelay(600);

    try {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            return {
                success: false,
                message: 'User not authenticated',
                data: null
            };
        }

        // Update localStorage
        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        return {
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser
        };
    } catch (error) {
        return {
            success: false,
            message: 'Failed to update profile',
            data: null
        };
    }
};
