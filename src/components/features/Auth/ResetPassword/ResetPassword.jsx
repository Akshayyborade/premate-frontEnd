import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import Alert from '../../../common/Alert/Alert';
import Spinner from '../../../common/Spinner/Spinner';
import './ResetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [errors, setErrors] = useState({});
    const { resetPassword } = useAuth();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password) {
            return 'Password is required';
        }
        if (!passwordRegex.test(password)) {
            return 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character';
        }
        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            newErrors.password = passwordError;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({ ...prev, [name]: '' }));
        setAlert({ message: '', type: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // This would be replaced with actual API call in the backend
            await resetPassword(token, formData.password);
            setAlert({
                message: 'Password has been reset successfully',
                type: 'success'
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setAlert({
                message: error.message || 'Failed to reset password',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="reset-password">
            <div className="reset-password-card">
                <h2>Reset Your Password</h2>
                <p>Please enter your new password below.</p>

                {alert.message && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert({ message: '', type: '' })}
                    />
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="New Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Enter new password"
                        required
                    />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        placeholder="Confirm new password"
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Spinner size="small" />
                                <span>Resetting Password...</span>
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword; 