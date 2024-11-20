import React, { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { authService } from '../../../../services/api/auth.service';
import Button from '../../../common/Button';
import './EmailVerificationReminder.css';

const EmailVerificationReminder = () => {
    const { user, isEmailVerified } = useAuth();
    const [isResending, setIsResending] = useState(false);
    const [status, setStatus] = useState('');

    const handleResendVerification = async () => {
        setIsResending(true);
        try {
            await authService.resendVerificationEmail(user.email);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        } finally {
            setIsResending(false);
        }
    };

    if (isEmailVerified) return null;

    return (
        <div className="email-verification-reminder">
            <div className="reminder-content">
                <span className="reminder-icon">📧</span>
                <div className="reminder-text">
                    <h4>Verify Your Email</h4>
                    <p>Please verify your email address to access all features.</p>
                </div>
                <Button
                    variant="outline"
                    size="small"
                    onClick={handleResendVerification}
                    isLoading={isResending}
                    disabled={isResending}
                >
                    Resend Verification
                </Button>
            </div>
            {status === 'success' && (
                <div className="reminder-message success">
                    Verification email sent successfully!
                </div>
            )}
            {status === 'error' && (
                <div className="reminder-message error">
                    Failed to send verification email. Please try again.
                </div>
            )}
        </div>
    );
};

export default EmailVerificationReminder; 