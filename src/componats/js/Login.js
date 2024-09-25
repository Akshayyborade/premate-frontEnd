import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Container, Row, Tooltip } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { adminlogin, doLogin } from './admin/js/services/AuthServices';
import { Alert, Backdrop, CircularProgress, Typography } from '@mui/material';
import logoLogin from './img/cloud security.png';

const Login = () => {
    const { type } = useParams();
    const navigate = useNavigate();

    // State hooks for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Loading and alert state hooks
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ msg: '', type: '' });

    // Tooltip state
    const [tooltipOpen, setTooltipOpen] = useState({
        email: false,
        password: false,
    });

    // Error state for form validation
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    // Function to toggle tooltips based on field
    const toggleTooltip = (field) => {
        setTooltipOpen((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        // Clear previous errors
        setErrors({ email: '', password: '' });
    
        // Basic validation
        const emailError = !email.trim() ? 'Please enter your email address' : validateEmail(email) ? '' : 'Invalid email format';
        const passwordError = !password.trim() ? 'Please enter your password' : '';
    
        // If validation fails, reset loading state and stop submission
        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            setIsLoading(false);
            return;
        }
    
        try {
            // Call the backend API for login
            const response = await adminlogin(type, email, password);
            
            doLogin(response.data, () => {
                setAlert({ msg: response.data.message, type: 'success' });
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 3000);
            });
        } catch (error) {
            // Handle network or server errors
            if (!error.response) {
                // Network error or backend server down
                setAlert({ msg: 'Server is unavailable. Please try again later.', type: 'error' });
            } else {
                // Other API error (e.g., 4xx/5xx errors)
                setAlert({ msg: error.response?.data?.message || 'Login failed', type: 'error' });
            }
        } finally {
            setIsLoading(false); // Always reset loading state
        }
    };
    

    return (
        <Container style={{ margin: '0 auto' }} className="my-8">
            {/* Backdrop for loading state */}
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Row className="justify-content-center mt-4">
                <Col sm="8" md="6" lg={4} style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', backgroundColor: 'white', padding: 25 }}>
                    <Form onSubmit={handleSubmit} className="LoginForm form">
                        {/* Avatar and Title */}
                        <Row className="justify-content-center mt-2 mb-2">
                            <Col sm={5} md={2} className="text-center">
                                <div className="imgcontainer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <img src={logoLogin} alt="Avatar" className="avatar" style={{ maxWidth: '100px', borderRadius: '50%' }} />
                                    <Typography variant="h5">Login</Typography>
                                </div>
                            </Col>
                        </Row>

                        {/* Alert for success/failure */}
                        {alert.msg && <Alert severity={alert.type}>{alert.msg}</Alert>}

                        {/* Email Field */}
                        <FormGroup>
                            <Label for="email"><b>Username</b></Label>
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter Username"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((prev) => ({ ...prev, email: '' })); // Clear email error on change
                                }}
                                invalid={!!errors.email}
                            />
                            {errors.email && (
                                <Tooltip
                                    placement="top"
                                    isOpen={tooltipOpen.email}
                                    autohide={false}
                                    target="email"
                                    toggle={() => toggleTooltip('email')}
                                >
                                    {errors.email}
                                </Tooltip>
                            )}
                        </FormGroup>

                        {/* Password Field */}
                        <FormGroup>
                            <Label for="password"><b>Password</b></Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setErrors((prev) => ({ ...prev, password: '' })); // Clear password error on change
                                }}
                                invalid={!!errors.password}
                            />
                            {errors.password && (
                                <Tooltip
                                    placement="top"
                                    isOpen={tooltipOpen.password}
                                    autohide={false}
                                    target="password"
                                    toggle={() => toggleTooltip('password')}
                                >
                                    {errors.password}
                                </Tooltip>
                            )}
                        </FormGroup>

                        {/* Login Button */}
                        <FormGroup className="input-container">
                            <Button type="submit" color="success" disabled={isLoading}>
                                {isLoading ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Login'}
                            </Button>
                        </FormGroup>

                        {/* Forgot Password and Sign Up Links */}
                        <Row className="justify-content-between">
                            <Col sm={5}>
                                <span className="psw text-muted">Forgot <a href="#" className="text-primary">password?</a></span>
                            </Col>
                            <Col sm={5} className="text-right">
                                <span className="signup text-muted">Don't have an account? <a href="/admin-register" className="text-primary">Sign Up</a></span>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
