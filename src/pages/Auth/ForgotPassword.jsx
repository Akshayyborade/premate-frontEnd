import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import AuthLayout from '../../components/layout/AuthLayout';
import { authService } from '../../services/api/auth.service';
import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await authService.forgotPassword(email);
            setStatus({
                type: 'success',
                message: 'Password reset link has been sent to your email'
            });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send reset link'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="auth-container">
                <div className="auth-card">
                    <h1 className="auth-title">Reset Password</h1>
                    <p className="auth-subtitle">
                        Enter your email address and we'll send you a link to reset your password
                    </p>

                    {status.message && (
                        <div className={`alert alert-${status.type}`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <Input
                            type="email"
                            label="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isLoading={isSubmitting}
                        >
                            Send Reset Link
                        </Button>

                        <div className="auth-links">
                            Remember your password?{' '}
                            <Link to="/login">Back to Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword; 