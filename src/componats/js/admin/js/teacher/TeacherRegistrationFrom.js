import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, InputGroupText, InputGroup, Container, Col, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faGraduationCap, faChalkboardTeacher, faCalendarAlt, faSpinner, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const TeacherRegistrationForm = () => {
    const [teacherInfo, setTeacherInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        expertise: '',
        experience: '',
        education: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear error message when user starts typing
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setLoading(true);
        // Simulate form submission delay
        setTimeout(() => {
            setLoading(false);
            console.log(teacherInfo);
            setSuccess(true);
            setTeacherInfo({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                expertise: '',
                experience: '',
                education: ''
            });
        }, 2000);
    };

    const validateForm = () => {
        const errors = {};
        if (!teacherInfo.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!teacherInfo.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!teacherInfo.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(teacherInfo.email)) {
            errors.email = 'Invalid email format';
        }
        if (!teacherInfo.password.trim()) {
            errors.password = 'Password is required';
        }
        if (!teacherInfo.expertise.trim()) {
            errors.expertise = 'Subject expertise is required';
        }
        if (!teacherInfo.experience.trim()) {
            errors.experience = 'Teaching experience is required';
        }
        if (!teacherInfo.education.trim()) {
            errors.education = 'Highest education is required';
        }
        return errors;
    };

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <Container className='registration'>
            <Col className=''>
              
                {success && <Alert color="success">Registration successful!</Alert>}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <InputGroup>
                            <InputGroupText><FontAwesomeIcon icon={faUser} /></InputGroupText>
                            <Input type="text" name="firstName" id="firstName" value={teacherInfo.firstName} onChange={handleChange} invalid={errors.firstName} />
                        </InputGroup>
                        <div className="invalid-feedback">{errors.firstName}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <InputGroup>
                            <InputGroupText><FontAwesomeIcon icon={faUser} /></InputGroupText>
                            <Input type="text" name="lastName" id="lastName" value={teacherInfo.lastName} onChange={handleChange} invalid={errors.lastName} />
                        </InputGroup>
                        <div className="invalid-feedback">{errors.lastName}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <InputGroup>
                            <InputGroupText><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                            <Input type="email" name="email" id="email" value={teacherInfo.email} onChange={handleChange} invalid={errors.email} />
                        </InputGroup>
                        <div className="invalid-feedback">{errors.email}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <InputGroup>
                            <InputGroupText><FontAwesomeIcon icon={faLock} /></InputGroupText>
                            <Input type="password" name="password" id="password" value={teacherInfo.password} onChange={handleChange} invalid={errors.password} />
                        </InputGroup>
                        <div className="invalid-feedback">{errors.password}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="expertise">Subject Expertise</Label>
                        <InputGroup>
                            <InputGroupText><FontAwesomeIcon icon={faChalkboardTeacher} /></InputGroupText>
                            <Input type="select" name="expertise" id="expertise" value={teacherInfo.expertise} onChange={handleChange} invalid={errors.expertise}>
                                <option>Select Your Subject Expertise...</option>
                                <option value="Biology">Biology</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Physics">Physics</option>
                                <option value="Literature">Literature</option>
                                <option value="Music">Music</option>
                                <option value="Visual Arts">Visual Arts</option>
                                <option value="Accounting">Accounting</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Other">Other (Please Specify)</option>
                            </Input>
                        </InputGroup>
                        <div className="invalid-feedback">{errors.expertise}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="experience">Teaching Experience</Label>
                        <InputGroup>
                            <InputGroupText><FontAwesomeIcon icon={faCalendarAlt} /></InputGroupText>
                            <Input type="select" name="experience" id="experience" value={teacherInfo.experience} onChange={handleChange} invalid={errors.experience}>
                                <option>Select Years...</option>
                                <option value="1">1 Year</option>
                                <option value="2">2 Years</option>
                                <option value="3">3 Years</option>
                                <option value="4">4 Years</option>
                                <option value="5">5 Years</option>
                                <option value="6">6 Years</option>
                                <option value="7">7 Years</option>
                                <option value="8">8 Years</option>
                                <option value="9">9 Years</option>
                                <option value="10+">10+ Years</option>
                            </Input>
                        </InputGroup>
                        <div className="invalid-feedback">{errors.experience}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="education">Highest Education</Label>
                        <InputGroup>
                            <InputGroupText><FontAwesomeIcon icon={faGraduationCap} /></InputGroupText>
                            <Input type="select" name="education" id="education" value={teacherInfo.education} onChange={handleChange} invalid={errors.education}>
                                <option>Select Education...</option>
                                <option value="M.Ed.">Master of Education</option>
                                <option value="B.Ed.">Bachelor of Education</option>
                                <option value="PhD">Doctor of Philosophy</option>
                                <option value="M.Phil.">Master of Philosophy</option>
                                <option value="M.Sc.">Master of Science</option>
                                <option value="M.A.">Master of Arts</option>
                                <option value="M.Com.">Master of Commerce</option>
                                <option value="B.Sc.">Bachelor of Science</option>
                                <option value="B.A.">Bachelor of Arts</option>
                                <option value="B.Com.">Bachelor of Commerce</option>
                                <option value="Other">Other (Please Specify)</option>
                            </Input>
                        </InputGroup>
                        <div className="invalid-feedback">{errors.education}</div>
                    </FormGroup>
                    <Button type="submit" color="primary" disabled={loading}>
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Register'}
                    </Button>
                </Form>
            </Col>
        </Container>
    );
};

export default TeacherRegistrationForm;
