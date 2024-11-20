import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import manImg from '../../assets/images/Richie_3.png';
import './Register.css';
import { useAuth } from '../../hooks/useAuth';
import { debounce } from 'lodash';


const Register = () => {
    // Hooks
    const navigate = useNavigate();
    const { register, checkEmail } = useAuth();

    // State Management
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        confirmEmail: '',
        institutionName: '',
        password: '',
        confirmPassword: '',
        website: '',
        foundingDate: '',
        slogan: ''
    });

    const steps = ['Credentials', 'Institution Details', 'Review & Submit'];

    // At the top of your component
    useEffect(() => {
        console.log('Step changed to:', step);
    }, [step]);

    // Validation Functions
    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    // Add new function to check email availability
    const checkEmailAvailability = async (email) => {
        try {
            const response = await checkEmail(email);
            return response;
        } catch (error) {
            if (error.message.includes('already registered')) {
                return { isAvailable: false };
            }
            throw error;
        }
    };

    // Update validateField function
    const validateField = async (name, value) => {
        const newErrors = { ...errors };
        
        switch (name) {
            case 'email':
                if (!value) {
                    newErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = 'Email is invalid';
                } else {
                    try {
                        const { isAvailable } = await checkEmailAvailability(value);
                        if (!isAvailable) {
                            newErrors.email = 'This email is already registered';
                        } else {
                            delete newErrors.email;
                        }
                    } catch (error) {
                        console.error('Email check failed:', error);
                        // Don't block the user if the check fails
                        delete newErrors.email;
                    }
                }
                break;
            
            case 'confirmEmail':
                if (!value) {
                    newErrors.confirmEmail = 'Please confirm your email';
                } else if (value !== formData.email) {
                    newErrors.confirmEmail = 'Emails do not match';
                } else {
                    delete newErrors.confirmEmail;
                }
                break;

            case 'password':
                if (!value) {
                    newErrors.password = 'Password is required';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value)) {
                    newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character';
                } else {
                    delete newErrors.password;
                }
                break;

            case 'confirmPassword':
                if (!value) {
                    newErrors.confirmPassword = 'Please confirm your password';
                } else if (value !== formData.password) {
                    newErrors.confirmPassword = 'Passwords do not match';
                } else {
                    delete newErrors.confirmPassword;
                }
                break;

            case 'institutionName':
            case 'website':
            case 'foundingDate':
            case 'slogan':
                if (!value) {
                    newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
                } else {
                    delete newErrors[name];
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Update handleChange to use async validation
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        if (name === 'email') {
            // Add debounce for email validation
            clearTimeout(emailCheckTimeout.current);
            emailCheckTimeout.current = setTimeout(() => {
                validateField(name, value);
            }, 500); // Wait 500ms after user stops typing
        } else {
            validateField(name, value);
        }

        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const handleStepChange = (newStep) => {
        console.log('Attempting to change step from', step, 'to', newStep);
        setStep(newStep);
    };

    const handleBack = () => {
        handleStepChange(step - 1);
        setErrors({});
    };

    // Update handleNext
    const handleNext = async () => {
        if (step === 1) {
            // Validate email and password fields
            const emailValid = await validateField('email', formData.email);
            const confirmEmailValid = await validateField('confirmEmail', formData.confirmEmail);
            const passwordValid = await validateField('password', formData.password);
            const confirmPasswordValid = await validateField('confirmPassword', formData.confirmPassword);

            if (emailValid && confirmEmailValid && passwordValid && confirmPasswordValid) {
                handleStepChange(step + 1);
            }
        } else if (step === 2) {
            // Validate institution details
            ['institutionName', 'website', 'foundingDate', 'slogan'].forEach(field => {
                validateField(field, formData[field]);
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step !== 3) return;

        setIsLoading(true);
        try {
            console.log('Attempting registration...');
            await register(formData);
            
            toast.success('Registration successful!');
            setTimeout(() => navigate('/login/admin'), 2000);

        } catch (error) {
            console.error('Registration error:', error);
            if (error.message.includes('already registered')) {
                toast.error('This email is already registered.');
            } else {
                toast.error(error.message || 'Registration failed.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Add ref for debouncing
    const emailCheckTimeout = useRef(null);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (emailCheckTimeout.current) {
                clearTimeout(emailCheckTimeout.current);
            }
        };
    }, []);

    // Render Functions
    const renderCredentialsStep = () => (
        <>
            <div className="admin-register-form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="admin-register-error-message">{errors.email}</span>}
            </div>

            <div className="admin-register-form-group">
                <label htmlFor="confirmEmail">Confirm Email</label>
                <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    className={errors.confirmEmail ? 'error' : ''}
                />
                {errors.confirmEmail && <span className="admin-register-error-message">{errors.confirmEmail}</span>}
            </div>

            <div className="admin-register-form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="admin-register-error-message">{errors.password}</span>}
                {formData.password && (
                    <div className="admin-register-password-strength">
                        <div className="admin-register-strength-bars">
                            {[...Array(5)].map((_, index) => (
                                <div 
                                    key={index} 
                                    className={`admin-register-strength-bar ${index < passwordStrength ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                        <span>Password Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'Very Weak'}</span>
                    </div>
                )}
            </div>

            <div className="admin-register-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="admin-register-error-message">{errors.confirmPassword}</span>}
            </div>
        </>
    );

    const renderInstitutionDetailsStep = () => (
        <>
            <div className="admin-register-form-group">
                <label htmlFor="institutionName">Institution Name</label>
                <input
                    type="text"
                    id="institutionName"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    className={errors.institutionName ? 'error' : ''}
                />
                {errors.institutionName && <span className="admin-register-error-message">{errors.institutionName}</span>}
            </div>

            <div className="admin-register-form-group">
                <label htmlFor="website">Website</label>
                <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={errors.website ? 'error' : ''}
                    placeholder="https://"
                />
                {errors.website && <span className="admin-register-error-message">{errors.website}</span>}
            </div>

            <div className="admin-register-form-group">
                <label htmlFor="foundingDate">Founding Date</label>
                <input
                    type="date"
                    id="foundingDate"
                    name="foundingDate"
                    value={formData.foundingDate}
                    onChange={handleChange}
                    className={errors.foundingDate ? 'error' : ''}
                />
                {errors.foundingDate && <span className="admin-register-error-message">{errors.foundingDate}</span>}
            </div>

            <div className="admin-register-form-group">
                <label htmlFor="slogan">Mission Statement</label>
                <textarea
                    id="slogan"
                    name="slogan"
                    value={formData.slogan}
                    onChange={handleChange}
                    className={errors.slogan ? 'error' : ''}
                    rows="3"
                />
                {errors.slogan && <span className="admin-register-error-message">{errors.slogan}</span>}
            </div>
        </>
    );

    const renderReviewStep = () => (
        <div className="admin-register-review-content">
            <div className="admin-register-review-section">
                <h4>Account Credentials</h4>
                <div className="admin-register-review-item">
                    <span>Email:</span>
                    <span>{formData.email}</span>
                </div>
            </div>

            <div className="admin-register-review-section">
                <h4>Institution Details</h4>
                <div className="admin-register-review-item">
                    <span>Institution Name:</span>
                    <span>{formData.institutionName}</span>
                </div>
                <div className="admin-register-review-item">
                    <span>Website:</span>
                    <span>{formData.website}</span>
                </div>
                <div className="admin-register-review-item">
                    <span>Founding Date:</span>
                    <span>{formData.foundingDate}</span>
                </div>
                <div className="admin-register-review-item">
                    <span>Mission Statement:</span>
                    <span>{formData.slogan}</span>
                </div>
            </div>
        </div>
    );

    const validateEmail = async (email) => {
        if (!email) {
            return 'Email is required';
        }

        // Basic email format validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Please enter a valid email address';
        }

        try {
            const { isAvailable } = await checkEmail(email);
            if (!isAvailable) {
                return 'This email is already registered';
            }
            return ''; // No error
        } catch (error) {
            if (error.message === 'Invalid email format') {
                return 'Please enter a valid email address';
            }
            console.error('Email validation error:', error);
            return 'Unable to verify email availability';
        }
    };

    // Add debouncing for email validation
    const debouncedEmailCheck = useCallback(
        debounce(async (email, callback) => {
            const error = await validateEmail(email);
            callback(error);
        }, 500),
        []
    );

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, email: value }));
        
        // Clear previous error immediately when user starts typing
        setErrors(prev => ({ ...prev, email: '' }));
        
        // Debounced validation
        debouncedEmailCheck(value, (error) => {
            setErrors(prev => ({ ...prev, email: error }));
        });
    };

    return (
        <>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="admin-register-container">
                <Link to="/" className="admin-register-back-link">
                    ← Back to Home
                </Link>
                
                <div className="admin-register-card">
                    <div className="admin-register-content">
                        <div className="admin-register-form-section">
                            <header className="admin-register-header">
                                <h1>Admin Registration</h1>
                                <p>Create your institution's account</p>
                            </header>

                            <div className="admin-register-stepper">
                                {steps.map((stepName, index) => (
                                    <div 
                                        key={index} 
                                        className={`admin-register-step ${index + 1 === step ? 'active' : ''} 
                                                  ${index + 1 < step ? 'completed' : ''}`}
                                    >
                                        <div className="admin-register-step-number">{index + 1}</div>
                                        <div className="admin-register-step-name">{stepName}</div>
                                    </div>
                                ))}
                            </div>
                            
                            <form onSubmit={handleSubmit} className="admin-register-form">
                                {step === 1 && (
                                    <>
                                        {renderCredentialsStep()}
                                        <div className="admin-register-form-actions">
                                            <button type="button" onClick={handleNext}>
                                                Next
                                            </button>
                                        </div>
                                    </>
                                )}

                                {step === 2 && (
                                    <>
                                        {renderInstitutionDetailsStep()}
                                        <div className="admin-register-form-actions">
                                            <button type="button" onClick={handleBack}>
                                                Back
                                            </button>
                                            <button type="button" onClick={handleNext}>
                                                Next
                                            </button>
                                        </div>
                                    </>
                                )}

                                {step === 3 && (
                                    <>
                                        {renderReviewStep()}
                                        <div className="admin-register-form-actions">
                                            <button type="button" onClick={handleBack}>
                                                Back
                                            </button>
                                            <button 
                                                type="submit" 
                                                className={isLoading ? 'loading' : ''}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Processing...' : 'Submit'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>

                        <div className="admin-register-image-section">
                            <div className="admin-register-image-container">
                                <img 
                                    src={manImg} 
                                    alt="Registration illustration" 
                                    className="admin-register-image"
                                />
                            </div>
                            <div className="admin-register-features-list">
                                <h3>Why Choose Us?</h3>
                                <ul>
                                    <li>✓ Comprehensive Institution Management</li>
                                    <li>✓ Secure Data Protection</li>
                                    <li>✓ 24/7 Technical Support</li>
                                    <li>✓ Custom Reporting Tools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register; 