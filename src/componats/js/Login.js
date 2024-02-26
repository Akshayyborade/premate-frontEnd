import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Container, Row } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoLogin from '../img/admin.png';
import "../css/login.css";
import handleLoginSuccess from "./admin/js/AdminDashboard"
import { adminlogin, doLogin } from './admin/js/services/AuthServices';
export const isLoggedIn=()=>{
        
};
const Login = ({ onLoginSuccess }) => {
    // State variables

    const { type } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
   

    // Function to handle form submission
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        toast.error("Email and password are required");
        return;
    }
    try {
        // Send login request
        const response = await adminlogin(type, email, password);
        //save the data to local storage 
        doLogin(response.data, ()=>{
            console.log("login detail saved to local")
            toast.success(response.data.message, { position: "top-center", autoClose: 3000 });
            // Navigate to dashboard after a delay
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 3000); // Adjust delay as needed
        });
       
        // Show success message
       
    } catch (error) {
        setError(error.response?.data?.message || 'Login failed');
        toast.error("Login failed.", { position: "top-center" });
    }
    //logout
    
};

    // Function to get login URL based on login type
   

    return (
        <Container>
            <ToastContainer style={{ padding: '-2px' }} />
            <Row className="justify-content-center mt-4">
                <Col sm="10" md="4">
                    <Form onSubmit={handleSubmit} className="LoginForm form">
                        {/* Avatar */}
                        <div className="imgcontainer">
                            <img src={logoLogin} alt="Avatar" className="avatar" />
                            <p>Login</p>
                        </div>
                        {/* Form Inputs */}
                        <FormGroup>
                            <div className="input-container">
                                <Label for="username" loginLable><b>Username</b></Label>
                                <Input className='loginInput' type="text" name="email" id="username" placeholder="Enter Username" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="input-container " >
                                <Label for="password" className='loginLable'><b>Password</b></Label>
                                <Input className='loginInput' type="password" name="password" id="password" placeholder="Enter Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </FormGroup>
                        {/* Remember Me Checkbox */}
                        <FormGroup check>
                            <Label check className='loginLable'>
                                <Input className='loginInput' type="checkbox" name="remember" checked={true} />{' '}
                                Remember me
                            </Label>
                        </FormGroup>
                        {/* Login Button */}
                        <FormGroup className="input-container ">
                            <Button type="submit" color="success">Login</Button>
                        </FormGroup>
                        {/* Forgot Password */}
                        <div className="container1 mt-3">
                            <span className="psw">Forgot <a href="#">password?</a></span>
                            <span className="signup"> Don't have an account? <a href="registration.html">Sign Up</a></span>
                        </div>
        
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
