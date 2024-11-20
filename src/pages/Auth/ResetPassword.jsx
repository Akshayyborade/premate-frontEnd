import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import AuthLayout from '../../components/layout/AuthLayout';
import { authService } from '../../services/api/auth.service';
import PasswordStrength from '../../components/common/PasswordStrength';
import './Auth.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const validateForm = () => {
        const newErrors = {};
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await authService.resetPassword(token, formData.password);
            setStatus({
                type: 'success',
                message: 'Password has been reset successfully'
            });
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to reset password'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="auth-container">
                <div className="auth-card">
                    <h1 className="auth-title">Set New Password</h1>
                    <p className="auth-subtitle">
                        Please enter your new password
                    </p>

                    {status.message && (
                        <div className={`alert alert-${status.type}`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <Input
                            type="password"
                            label="New Password"
                            value={formData.password}
                            onChange={(e) => setFormData({
                                ...formData,
                                password: e.target.value
                            })}
                            error={errors.password}
                            required
                        />

                        {formData.password && (
                            <PasswordStrength password={formData.password} />
                        )}

                        <Input
                            type="password"
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({
                                ...formData,
                                confirmPassword: e.target.value
                            })}
                            error={errors.confirmPassword}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isLoading={isSubmitting}
                        >
                            Reset Password
                        </Button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ResetPassword; 