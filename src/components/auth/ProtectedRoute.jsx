/**
 * PROTECTED ROUTE COMPONENT
 * This component wraps routes that require authentication
 * It checks if user is logged in and has the required role
 */

import { Navigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../../api/authApi';

/**
 * ProtectedRoute Component
 * @param {Object} props
 * @param {React.Component} props.children - The component to render if authorized
 * @param {string|string[]} props.allowedRoles - Role(s) that can access this route
 */
export default function ProtectedRoute({ children, allowedRoles }) {
    // Check if user is authenticated
    if (!isAuthenticated()) {
        // Redirect to login if not authenticated
        return <Navigate to="/" replace />;
    }

    // Get current user
    const currentUser = getCurrentUser();

    // Check if user has required role
    if (allowedRoles) {
        const userHasRole = Array.isArray(allowedRoles)
            ? allowedRoles.includes(currentUser.role)
            : currentUser.role === allowedRoles;

        if (!userHasRole) {
            // Redirect to appropriate dashboard based on user's actual role
            const redirectPath = getRoleBasedRedirect(currentUser.role);
            return <Navigate to={redirectPath} replace />;
        }
    }

    // User is authenticated and has correct role, render children
    return children;
}

/**
 * Helper function to get redirect path based on role
 */
function getRoleBasedRedirect(role) {
    switch (role) {
        case 'admin':
            return '/admin/dashboard';
        case 'faculty':
            return '/faculty/dashboard';
        case 'student':
            return '/student/dashboard';
        default:
            return '/';
    }
}
