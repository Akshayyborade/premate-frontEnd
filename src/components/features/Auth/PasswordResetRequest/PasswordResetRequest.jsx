import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import Alert from '../../../common/Alert/Alert';
import Spinner from '../../../common/Spinner/Spinner';
import './PasswordResetRequest.css';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [errors, setErrors] = useState({});
    const { checkEmail } = useAuth();

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!email) {
            return 'Email is required';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailError = validateEmail(email);
        
        if (emailError) {
            setErrors({ email: emailError });
            return;
        }

        setIsLoading(true);
        try {
            // This would be replaced with actual API call in the backend
            const response = await checkEmail(email);
            if (response.isAvailable) {
                setAlert({
                    message: 'Email not found in our system',
                    type: 'error'
                });
            } else {
                setAlert({
                    message: 'Password reset link has been sent to your email',
                    type: 'success'
                });
                setEmail('');
            }
        } catch (error) {
            setAlert({
                message: 'An error occurred. Please try again.',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="password-reset-request">
            <div className="password-reset-card">
                <h2>Reset Password</h2>
                <p>Enter your email address and we'll send you a link to reset your password.</p>

                {alert.message && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert({ message: '', type: '' })}
                    />
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({});
                            setAlert({ message: '', type: '' });
                        }}
                        error={errors.email}
                        placeholder="Enter your email"
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
                                <span>Sending Reset Link...</span>
                            </>
                        ) : (
                            'Send Reset Link'
                        )}
                    </Button>
                </form>

                <div className="password-reset-links">
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetRequest; 