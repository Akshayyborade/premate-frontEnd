import "../css/registration.css";
import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        institutionName: '',
        password: '',
        confirmPassword: '',
        website: '',
        foundingDate: '',
        slogan: ''

    });
    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        website: '',
        foundingDate: '',
        missionStatement: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData);
        validateField(name, value);
    };
    

    const validateField = (name, value) => {
        let error = '';
      
        switch (name) {
          case 'email':
            error = !value ? 'Email is required' : (!/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : '');
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
        // Validate form fields
        const validationErrors = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        } else if (
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(formData.password)
        ) {
            validationErrors.password =
                'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character';
        }

        // Check if there are validation errors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Form is valid, proceed with form submission
            console.log('Form data:', formData);
            // Call API, etc.
            try {
                const response = await fetch('http://localhost:9095/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
    
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
    
                // Registration successful, handle the response as needed
                console.log('Registration successful');
                navigate('/login');
            } catch (error) {
                console.error('Error registering:', error.message);
            }
        }
        
       
    };

    return (
        <Container className="registration" style={{
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
            backgroundColor: 'rgba(244, 244, 244, 0.7)',
            backdropFilter: 'blur(6px)',
            width: 'min-content',
            padding: '20px'
        }}>
            <Row >
                <Col className="info" xs={4} lg={6}>
                    {/* SVG content */}
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="744" height="539.28592"
                        viewBox="0 0 744 539.28592" xmlnsXlink="http://www.w3.org/1999/xlink">
                        {/* SVG Paths */}
                    </svg>
                </Col>
                <Col xs={6} lg={6}>
                    <Row>
                        <Col>
                            <h1>Admin Registration</h1>
                            <p>Please fill out this form with the required information</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Institution Name:</Label>
                                    <Input type="text" name="institutionName" id="name" value={formData.institutionName} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email:</Label>
                                    <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password:</Label>
                                    <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange}  required />
                                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirmPassword">Confirm Password:</Label>
                                    <Input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} minLength={6} required />
                                    
                                </FormGroup>
                                <FormGroup>
                                    <Label for="website">Website:</Label>
                                    <Input type="text" name="website" id="website" value={formData.website} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="foundingDate">Founding Date:</Label>
                                    <Input type="date" name="foundingDate" id="foundingDate" value={formData.foundingDate} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="missionStatement">Mission Statement:</Label>
                                    <Input type="text" name="slogan" id="missionStatement" value={formData.slogan} onChange={handleChange} />
                                </FormGroup>
                                <Button className="submit" type="submit" style={{ backgroundColor: 'green' }}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminRegister;
