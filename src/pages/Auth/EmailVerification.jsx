import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import { authService } from '../../services/api/auth.service';
import './Auth.css';

const EmailVerification = () => {
    const { token } = useParams();
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        verifyEmail();
    }, [token]);

    const verifyEmail = async () => {
        try {
            await authService.verifyEmail(token);
            setStatus({
                type: 'success',
                message: 'Email verified successfully! You can now login.'
            });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Verification failed'
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AuthLayout>
                <div className="auth-container">
                    <div className="auth-card">
                        <div className="loading-spinner">Verifying email...</div>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="auth-container">
                <div className="auth-card">
                    <div className={`verification-status ${status.type}`}>
                        {status.type === 'success' ? '✓' : '✕'}
                    </div>
                    <h1 className="auth-title">
                        {status.type === 'success' ? 'Verification Successful' : 'Verification Failed'}
                    </h1>
                    <p className="auth-message">{status.message}</p>
                    <div className="auth-actions">
                        <Link to="/login" className="btn btn-primary">
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default EmailVerification; 