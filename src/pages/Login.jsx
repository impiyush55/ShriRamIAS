
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="register-container">
            {/* Left Side: Visual/Branding */}
            <div className="register-branding" style={{ backgroundImage: "url('/assets/hero-bg.png')" }}>
                <div className="branding-content">
                    <Link to="/" className="logo text-white mb-4" style={{ display: 'inline-block', fontSize: '2rem' }}>LMS</Link>
                    <h1 className="branding-title">Welcome Back, <br /> <span className="text-highlight">Future Leader</span></h1>
                    <p className="branding-desc">Continue your preparation journey. Access your dashboard, live classes, and test series.</p>

                    <div className="branding-features">
                        <div className="feature-item">
                            <i className="ri-checkbox-circle-fill"></i> <span>Resume Learning</span>
                        </div>
                        <div className="feature-item">
                            <i className="ri-checkbox-circle-fill"></i> <span>Track Progress</span>
                        </div>
                    </div>
                </div>
                <div className="branding-overlay"></div>
            </div>

            {/* Right Side: Login Form */}
            <div className="register-form-wrapper">
                <div className="form-header">
                    <h2>Login to Account</h2>
                    <p>New to LMS? <Link to="/register.html">Create an Account</Link></p>
                </div>

                <form className="register-form">
                    <div className="form-group">
                        <label htmlFor="username">Phone Number or Email</label>
                        <div className="input-wrapper">
                            <i className="ri-user-line"></i>
                            <input type="text" id="username" placeholder="Enter your registered email or phone" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <i className="ri-lock-line"></i>
                            <input type="password" id="password" placeholder="Enter your password" required />
                        </div>
                    </div>

                    <div className="form-check" style={{ justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" style={{ margin: 0, fontWeight: 400 }}>Remember me</label>
                        </div>
                        <a href="#" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Login <i className="ri-login-box-line"></i></button>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}>
                        <p>Or login with</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                            <button type="button" className="btn btn-white" style={{ border: '1px solid #e2e8f0', borderRadius: '50%', width: '48px', height: '48px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="ri-google-fill" style={{ fontSize: '1.5rem', color: '#ea4335' }}></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
