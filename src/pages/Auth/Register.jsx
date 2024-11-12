import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import manImg from '../../assets/images/Richie_3.png';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
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
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);

    const steps = ['Credentials', 'Institution Details', 'Review & Submit'];

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateField(name, value);
        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        
        switch (name) {
            case 'email':
                if (!value) {
                    newErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = 'Email is invalid';
                } else {
                    delete newErrors.email;
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

            case 'institutionName':
                if (!value) {
                    newErrors.institutionName = 'Institution name is required';
                } else {
                    delete newErrors.institutionName;
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
    };

    const handleNext = () => {
        const stepErrors = {};
        
        if (step === 1) {
            if (!formData.email) stepErrors.email = 'Email is required';
            if (!formData.confirmEmail) stepErrors.confirmEmail = 'Confirm email is required';
            if (!formData.password) stepErrors.password = 'Password is required';
            if (!formData.confirmPassword) stepErrors.confirmPassword = 'Confirm password is required';
            
            if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
                stepErrors.email = 'Invalid email format';
            }
            if (formData.email !== formData.confirmEmail) {
                stepErrors.confirmEmail = 'Emails do not match';
            }
            if (formData.password !== formData.confirmPassword) {
                stepErrors.confirmPassword = 'Passwords do not match';
            }
        }
        
        if (step === 2) {
            if (!formData.institutionName) stepErrors.institutionName = 'Institution name is required';
            if (!formData.website) stepErrors.website = 'Website is required';
            if (!formData.foundingDate) stepErrors.foundingDate = 'Founding date is required';
            if (!formData.slogan) stepErrors.slogan = 'Mission statement is required';
        }

        if (Object.keys(stepErrors).length === 0) {
            setStep(step + 1);
            setErrors({});
        } else {
            setErrors(stepErrors);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:9095/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            toast.success('Registration successful!');
            navigate('/login/admin');
        } catch (error) {
            toast.error(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Add missing form fields for step 1
    const renderCredentialsStep = () => (
        <>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="confirmEmail">Confirm Email</label>
                <input
                    type="email"
                    id="confirmEmail"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    className={errors.confirmEmail ? 'error' : ''}
                />
                {errors.confirmEmail && <span className="error-message">{errors.confirmEmail}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
                {formData.password && (
                    <div className="password-strength">
                        <div className="strength-bars">
                            {[...Array(5)].map((_, index) => (
                                <div 
                                    key={index} 
                                    className={`strength-bar ${index < passwordStrength ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                        <span>Password Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'Very Weak'}</span>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
        </>
    );

    // Add missing form fields for step 2
    const renderInstitutionDetailsStep = () => (
        <>
            <div className="form-group">
                <label htmlFor="institutionName">Institution Name</label>
                <input
                    type="text"
                    id="institutionName"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    className={errors.institutionName ? 'error' : ''}
                />
                {errors.institutionName && <span className="error-message">{errors.institutionName}</span>}
            </div>

            <div className="form-group">
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
                {errors.website && <span className="error-message">{errors.website}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="foundingDate">Founding Date</label>
                <input
                    type="date"
                    id="foundingDate"
                    name="foundingDate"
                    value={formData.foundingDate}
                    onChange={handleChange}
                    className={errors.foundingDate ? 'error' : ''}
                />
                {errors.foundingDate && <span className="error-message">{errors.foundingDate}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="slogan">Mission Statement</label>
                <textarea
                    id="slogan"
                    name="slogan"
                    value={formData.slogan}
                    onChange={handleChange}
                    className={errors.slogan ? 'error' : ''}
                    rows="3"
                />
                {errors.slogan && <span className="error-message">{errors.slogan}</span>}
            </div>
        </>
    );

    // Add review step content
    const renderReviewStep = () => (
        <div className="review-content">
            <div className="review-section">
                <h4>Account Credentials</h4>
                <div className="review-item">
                    <span>Email:</span>
                    <span>{formData.email}</span>
                </div>
            </div>

            <div className="review-section">
                <h4>Institution Details</h4>
                <div className="review-item">
                    <span>Institution Name:</span>
                    <span>{formData.institutionName}</span>
                </div>
                <div className="review-item">
                    <span>Website:</span>
                    <span>{formData.website}</span>
                </div>
                <div className="review-item">
                    <span>Founding Date:</span>
                    <span>{formData.foundingDate}</span>
                </div>
                <div className="review-item">
                    <span>Mission Statement:</span>
                    <span>{formData.slogan}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="register-container">
            <Link to="/" className="back-link">
                ← Back to Home
            </Link>
            
            <div className="register-card">
                <div className="register-content">
                    <div className="register-form-section">
                        <header className="register-header">
                            <h1>Admin Registration</h1>
                            <p>Create your institution's account</p>
                        </header>

                        <div className="stepper">
                            {steps.map((stepName, index) => (
                                <div 
                                    key={index} 
                                    className={`step ${index + 1 === step ? 'active' : ''} 
                                              ${index + 1 < step ? 'completed' : ''}`}
                                >
                                    <div className="step-number">{index + 1}</div>
                                    <div className="step-name">{stepName}</div>
                                </div>
                            ))}
                        </div>
                        
                        <form onSubmit={handleSubmit} className="register-form">
                            {step === 1 && (
                                <>
                                    {renderCredentialsStep()}
                                    <div className="form-actions">
                                        <button type="button" onClick={handleNext}>
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    {renderInstitutionDetailsStep()}
                                    <div className="form-actions">
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
                                    <div className="form-actions">
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

                    <div className="register-image-section">
                        <div className="register-image-container">
                        <img 
                            src={manImg} 
                            alt="Registration illustration" 
                            className="register-image"
                        />
                        </div>
                      
                        <div className="features-list">
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
    );
};

export default Register; 