import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import Alert from '../../../common/Alert/Alert';
import Spinner from '../../../common/Spinner/Spinner';
import logoLogin from '../../../../assets/images/cloud security.png';
import './LoginForm.css';

const LoginForm = ({ onSuccess }) => {
    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [errors, setErrors] = useState({});
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useAuth();
    const emailInputRef = useRef(null);

    // Focus email input on mount
    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    // Load saved email if exists
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value.trim()
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        // Clear alert when user starts typing
        if (alert.message) {
            setAlert({ message: '', type: '' });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
            
            // Handle remember me
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            setAlert({ message: 'Login successful!', type: 'success' });
            onSuccess?.();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
            setAlert({ message: errorMessage, type: 'error' });
            // Focus email input on error
            emailInputRef.current?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-form-wrapper">
            {isLoading && <div className="loading-overlay"><Spinner /></div>}

            <form onSubmit={handleSubmit} className="login-form">
                {/* Logo and Title */}
                <div className="login-header">
                    <div className="logo-container">
                        <img src={logoLogin} alt="Logo" className="login-logo" />
                    </div>
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Please enter your credentials to continue</p>
                </div>

                {/* Alert Messages */}
                {alert.message && (
                    <Alert 
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert({ message: '', type: '' })}
                        autoClose={5000}
                    />
                )}

                {/* Email Field */}
                <div className="form-group">
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                        ref={emailInputRef}
                    />
                </div>

                {/* Password Field */}
                <div className="form-group">
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />
                </div>

                {/* Remember Me Checkbox */}
                <div className="form-group-horizontal">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="forgot-password">
                        Forgot password?
                    </Link>
                </div>

                {/* Login Button */}
                <div className="form-group">
                    <Button 
                        type="submit" 
                        variant="primary" 
                        fullWidth
                        disabled={isLoading}
                        className="login-button"
                    >
                        {isLoading ? (
                            <>
                                <Spinner size="small" />
                                <span>Logging in...</span>
                            </>
                        ) : 'Log In'}
                    </Button>
                </div>

                {/* Sign Up Link */}
                <div className="signup-link">
                    Don't have an account?{' '}
                    <Link to="/admin-register">Create Account</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;