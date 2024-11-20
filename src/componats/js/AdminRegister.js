import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { faBuilding, faEnvelope, faLock, faCalendarAlt, faGlobe, faBullseye, faSpinner, faArrowLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from "react-toastify";
import  manImg  from './img/Richie_3.png';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
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
    const [errors, setErrors] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        institutionName: '',
        website: '',
        foundingDate: '',
        slogan: ''
    });
    const [passwordStrength, setPasswordStrength] = useState(0);

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
        let error = '';

        switch (name) {
            case 'email':
            case 'confirmEmail':
                error = !value ? 'Email is required' : (!/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : '');
                if (name === 'confirmEmail' && value !== formData.email) {
                    error = 'Emails do not match';
                }
                break;
            case 'password':
                error = !value ? 'Password is required' : (
                    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value) ?
                        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character' :
                        ''
                );
                break;
            case 'confirmPassword':
                error = value !== formData.password ? 'Passwords do not match' : '';
                break;
            case 'institutionName':
            case 'website':
            case 'foundingDate':
            case 'slogan':
                error = !value ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : '';
                break;
            default:
                break;
        }

        setErrors(prevState => ({
            ...prevState,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        // Validate form fields
        const validationErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                validationErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });
        if (!validationErrors.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }
        if (!validationErrors.password &&
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(formData.password)) {
            validationErrors.password = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character';
        }
        if (!validationErrors.confirmPassword && formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }
        if (!validationErrors.email && formData.email !== formData.confirmEmail) {
            validationErrors.confirmEmail = 'Emails do not match';
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
        } else {
            try {
                const response = await fetch('http://localhost:9095/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                console.log(data.message);
                if (!response.ok) {
                    throw new Error(data.message || 'An error occurred while registering');
                    console.log(data.message);
                }
    
                setIsLoading(false);
                toast.success('Registration successful');
                navigate(`/login/admin`);
            } catch (error) {
                setIsLoading(false);
                toast.error(error.message || 'An error occurred while registering');
            }
        }
    };
    

    return (
        <Container fluid className="registration-container py-4">
            <ToastContainer />
            <Link to="/" className="back-button mb-3 d-inline-block">
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
            </Link>
            
            <div className="registration-card">
                <Row className="g-0">
                    <Col xs={12} lg={6} className="registration-form-container">
                        <div className="text-center mb-4">
                            <h1 className="registration-title">Admin Registration</h1>
                            <p className="registration-subtitle">Create your institution's account</p>
                        </div>
                        
                        <Form onSubmit={handleSubmit} className="registration-form">
                            <FormGroup>
                                <Label for="institutionName" className="reg-label-ad">Institution Name:</Label>
                                <InputGroup className="animated-input">
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faBuilding} /></InputGroupText>
                                    <Input type="text" name="institutionName" id="institutionName" value={formData.institutionName} onChange={handleChange} className="reg-input-ad" />
                                </InputGroup>
                                {errors.institutionName && <span style={{ color: 'red' }}>{errors.institutionName}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="email" className="reg-label-ad">Email:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                                    <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="reg-input-ad" />
                                </InputGroup>
                                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmEmail" className="reg-label-ad">Confirm Email:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                                    <Input type="email" name="confirmEmail" id="confirmEmail" value={formData.confirmEmail} onChange={handleChange} className="reg-input-ad" />
                                </InputGroup>
                                {errors.confirmEmail && <span style={{ color: 'red' }}>{errors.confirmEmail}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="password" className="reg-label-ad">Password:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faLock} /></InputGroupText>
                                    <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className="reg-input-ad" />
                                </InputGroup>
                                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirmPassword" className="reg-label-ad">Confirm Password:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faLock} /></InputGroupText>
                                    <Input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="reg-input-ad" />
                                </InputGroup>
                                {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="website" className="reg-label-ad">Website:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faGlobe} /></InputGroupText>
                                    <Input type="text" name="website" id="website" value={formData.website} onChange={handleChange} className="reg-input-ad" />
                                </InputGroup>
                                {errors.website && <span style={{ color: 'red' }}>{errors.website}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="foundingDate" className="reg-label-ad">Founding Date:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faCalendarAlt} /></InputGroupText>
                                    <Input type="date" name="foundingDate" id="foundingDate" value={formData.foundingDate} onChange={handleChange} className="reg-input-ad" />
                                </InputGroup>
                                {errors.foundingDate && <span style={{ color: 'red' }}>{errors.foundingDate}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="slogan" className="reg-label-ad">Mission Statement:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faBullseye} /></InputGroupText>
                                    <Input type="text" name="slogan" id="slogan" value={formData.slogan} onChange={handleChange} className="reg-input-ad" />
                                </InputGroup>
                                {errors.slogan && <span style={{ color: 'red' }}>{errors.slogan}</span>}
                            </FormGroup>

                            {formData.password && (
                                <div className="password-strength-meter mb-3">
                                    <div className="strength-bars">
                                        {[...Array(5)].map((_, index) => (
                                            <div
                                                key={index}
                                                className={`strength-bar ${
                                                    index < passwordStrength ? 'active' : ''
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <small className="text-muted">
                                        Password strength: {
                                            ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong']
                                            [passwordStrength - 1] || 'Very Weak'
                                        }
                                    </small>
                                </div>
                            )}

                            <Button 
                                className="submit-button w-100" 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin /> 
                                        Processing...
                                    </>
                                ) : 'Register Institution'}
                            </Button>

                            <div className="mt-3 text-center">
                                <small className="text-muted">
                                    Already have an account? <Link to="/login/admin">Sign in</Link>
                                </small>
                            </div>
                        </Form>
                    </Col>
                    
                    <Col xs={12} lg={6} className="registration-image-container">
                        <img 
                            src={manImg} 
                            alt="Registration illustration" 
                            className="registration-image"
                        />
                        <div className="features-overlay">
                            <h3>Why Choose Us?</h3>
                            <ul>
                                <li>✓ Comprehensive Institution Management</li>
                                <li>✓ Secure Data Protection</li>
                                <li>✓ 24/7 Technical Support</li>
                                <li>✓ Custom Reporting Tools</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default AdminRegister;
