import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Container, Row, Tooltip } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
// import logoLogin from '../img/admin.png';
import { adminlogin, doLogin } from './admin/js/services/AuthServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoLogin from './img/cloud security.png'
import { Alert, Backdrop, CircularProgress, Typography } from '@mui/material';

const Login = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = React.useState(false);
    const [alert , setAlert]=useState({
        msg:'',
        type:''
    })
    const [tooltipOpen, setTooltipOpen] = useState({
        email: false,
        password: false,
    });
    console.log(type)
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false); // Added for loading state

    const toggleTooltip = (field) => {
        setTooltipOpen(prevState => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };
    const handleOpen = () => {
        setOpen(true);
      };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state

        setErrors({ email: '', password: '' }); // Clear previous errors

        const emailError = !email.trim() ? 'Please enter your email address' : validateEmail(email) ? '' : 'Invalid email format';
        const passwordError = !password.trim() ? 'Please enter your password' : '';

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            setIsLoading(false); // Reset loading state on validation failure
            return;
        }

        try {
            const response = await adminlogin(type, email, password);
            // Handle successful login (e.g., store data in local storage)
            doLogin(response.data, () => {
              
                setAlert({ msg:response.data.message, type:'success'})
                setOpen(true);
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 3000);
                
            });
        } catch (error) {
            setOpen(false);
            setAlert({msg:error.response?.data?.message || 'Login failed', type:'error'})
        } finally {
            setIsLoading(false); // Reset loading state after request completes
        }
    };

    return (
        <Container style={{ margin: '0 auto' }} className='my-8'>
             <Backdrop 
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2, width: '100%',
                                height: '100%',
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center', }}
                                open={open}>
                                    <CircularProgress color='inherit'/>
                                </Backdrop>
            <Row className="justify-content-center mt-4">
                <Col sm="8" md="6" lg={4} style={{
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                    backgroundColor: 'white',
                    backdropFilter: 'blur(6px)', padding: 25
                }}>
                    <Form onSubmit={handleSubmit} className="LoginForm form" >
                        {/* Avatar */}
                        <Row className="justify-content-center mt-2 mb-2"> {/* Add spacing and centering */}
                            <Col sm={5} md={2} className="text-center"> {/* Responsive layout and center content */}
                                <div className="imgcontainer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <img src={logoLogin} alt="Avatar" className="avatar" style={{ maxWidth: '100px', borderRadius: '50%' }} /> {/* Add a border radius for a circular avatar */}
                                    <Typography variant='h5' >Login</Typography>
                                </div>
                            </Col>
                        </Row>
                        
                            { alert.msg&&<Alert severity={alert.type}>{alert.msg}</Alert>}
                            
                        
                        {/* Form Inputs */}
                        <FormGroup>
                            <div className="input-container">
                                <Label for="username" loginLable>
                                    <b>Username</b>
                                </Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    invalid={errors.email}
                                />
                                {errors.email && <Tooltip
                                    placement="top"
                                    isOpen={tooltipOpen.email}
                                    autohide={false}
                                    target="email"
                                    toggle={() => toggleTooltip('email')}
                                >
                                    {errors.email}
                                </Tooltip>}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="input-container ">
                                <Label for="password" className="loginLable">
                                    <b>Password</b>
                                </Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    invalid={errors.password}
                                />
                              
                                {errors.password &&
                                    <Tooltip
                                        placement="top"
                                        isOpen={tooltipOpen.password}
                                        autohide={false}
                                        target="password"
                                        toggle={() => toggleTooltip('password')}
                                    >
                                        {errors.password}
                                    </Tooltip>}
                            </div>
                        </FormGroup>
                        {/* Remember Me Checkbox */}
                        {/* Removed as functionality is not provided in the code snippet */}
                        {/* Login Button */}
                        <FormGroup className="input-container ">
                            <Button type="submit" color="success" disabled={isLoading} onClick={handleOpen}>
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm mr-2"></span>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </FormGroup>
                        {/* Forgot Password */}
                        <Row className="justify-content-between"> {/* Add spacing and justification */}
                            <Col sm={5} className="text-left"> {/* Use Col for responsive layout */}
                                <span className="psw text-muted justify-content-end">
                                    Forgot <a href="#" className='text-primary'>password?</a>
                                </span>
                            </Col>
                            <Col sm={5} className="text-right"> {/* Use Col for responsive layout and text-right for right alignment */}
                                <span className="signup text-muted justify-content-end">
                                    Don't have an account? <a href="/admin-register" className="text-primary">Sign Up</a>
                                </span>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

