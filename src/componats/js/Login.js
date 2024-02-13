
import { Button, Form, FormGroup, Label, Input, Col, Container, Row } from 'reactstrap';
import "../css/login.css";
import logoLogin from '../img/admin.png'
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Login = ({ onLoginSuccess}) => {
    const { type } = useParams();
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(getLoginUrl(type), {
          email,
          password,
        });
  
        // Handle successful login (e.g., store token, redirect)
        console.log('Login successful:', response.data);
        // TODO: Replace with your actual success handling logic
      } catch (error) {
        setError(error.response?.data || 'Login failed');
      }
    };
  
    const getLoginUrl = (loginType) => {
        console.log("LOGINTYPE IS : ", loginType); 
      switch (loginType) {
        case 'teacher':
          return 'http://localhost:9095/api/auth/adminLogin'; // Adjust paths according to your setup
        case 'student':
          return '/api/auth/student-login';
        case 'admin':
          return '/api/auth/llogin';
        default:
          console.error('Invalid login type');
          return ''; // Handle invalid type more gracefully
      }
    };

    return (
        <Container>
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
                            <Label for="username"><b>Username</b></Label>
                                <Input type="text" name="email" id="username" placeholder="Enter Username" value={email}
                onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            
                            <div className="input-container " >
                            <Label for="password"><b>Password</b></Label>
                                <Input type="password" name="password" id="password" placeholder="Enter Password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </FormGroup>
                        {/* Remember Me Checkbox */}
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember" checked={true} />{' '}
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
                            <span className="signup">Don't have an account? <a href="registration.html">Sign Up</a></span>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
