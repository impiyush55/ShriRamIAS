/**
 * COMMON LOGIN PAGE
 * Single login page for all user roles (Admin, Faculty, Student)
 * Redirects to appropriate dashboard based on user role after successful login
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../api/authApi';
import '../styles/auth.css';

export default function CommonLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginApi(formData.email, formData.password);

            if (response.success) {
                // Redirect based on user role
                const userRole = response.data.user.role;

                switch (userRole) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'faculty':
                        navigate('/faculty/dashboard');
                        break;
                    case 'student':
                        navigate('/student/dashboard');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to access your dashboard</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                        <i className="ri-error-warning-line"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="ri-loader-4-line rotating"></i>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <i className="ri-login-box-line"></i>
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register.html">Register here</Link></p>
                </div>

                {/* Demo Credentials Info */}
                <div className="demo-credentials">
                    <h3>Demo Credentials</h3>
                    <div className="credential-box">
                        <strong>Admin:</strong> admin@shriramias.com / admin123
                    </div>
                    <div className="credential-box">
                        <strong>Faculty:</strong> faculty@shriramias.com / faculty123
                    </div>
                    <div className="credential-box">
                        <strong>Student:</strong> student@shriramias.com / student123
                    </div>
                </div>
            </div>
        </div>
    );
}
