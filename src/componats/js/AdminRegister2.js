import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, InputGroup, InputGroupText, Tooltip } from 'reactstrap';
import { faBuilding, faEnvelope, faLock, faCalendarAlt, faGlobe, faBullseye, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from "react-toastify";
import manImg from './img/Richie_3.png';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';

const AdminRegister2 = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // Track current step of the form
    //impliment stepper using material ui
    const steps = [
        'Credential',
        'Personal information',
        'Other information',
    ];
    const [tooltipOpen, setTooltipOpen] = useState({
        email: false,
        confirmEmail: false,
        password: false,
        confirmPassword: false,
        institutionName: false,
        website: false,
        foundingDate: false,
        slogan: false
    });

    const toggleTooltip = (field) => {
        setTooltipOpen(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        validateField(name, value);
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
            // If all validations pass, proceed to the next step or submit the form
            if (step === 3) {
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
            } else {
                setStep(step + 1); // Proceed to the next step
            }
        }
    };
    const handleNext = () => {
        // Validate form fields for the current step
        const validationErrors = {};
        switch (step) {
            case 1:
                if (!formData.email) {
                    validationErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    validationErrors.email = 'Invalid email format';
                }
                if (!formData.confirmEmail) {
                    validationErrors.confirmEmail = 'Confirm Email is required';
                } else if (formData.confirmEmail !== formData.email) {
                    validationErrors.confirmEmail = 'Emails do not match';
                }
                if (!formData.password) {
                    validationErrors.password = 'Password is required';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(formData.password)) {
                    validationErrors.password = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character';
                }
                if (!formData.confirmPassword) {
                    validationErrors.confirmPassword = 'Confirm Password is required';
                } else if (formData.confirmPassword !== formData.password) {
                    validationErrors.confirmPassword = 'Passwords do not match';
                }
                break;
            case 2:
                if (!formData.institutionName) {
                    validationErrors.institutionName = 'Institution Name is required';
                }
                if (!formData.website) {
                    validationErrors.website = 'Website is required';
                }
                if (!formData.foundingDate) {
                    validationErrors.foundingDate = 'Founding Date is required';
                }
                if (!formData.slogan) {
                    validationErrors.slogan = 'Mission Statement is required';
                }
                break;
            case 3:
                // Add validation for step 3 fields if needed
                break;
            default:
                break;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setStep(step + 1); // Proceed to the next step
        }
    };
    const handleBack = () => {
        setStep(step - 1); // Go back to the previous step
    };

    return (
        <Container className="registration my-5" style={{
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
            backgroundColor: 'white',
            backdropFilter: 'blur(6px)',
            padding: '20px',
            overflow: 'scroll'
        }}>
            <ToastContainer />
            <Row>
                <Col xs={6} lg={6} md={8}>
                    <Row>
                        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Typography variant='h4' component='h4' >Admin Registration</Typography>
                            <p>Please fill out this form with the required information</p>
                        </Col>
                    </Row>
                    <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Col md={9} className='p-5'>
                            {/* implimenting stepper  */}
                            <Box sx={{ width: '100%' }}>
                                <Stepper activeStep={step-1} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                            </Box>
                            <Form onSubmit={handleSubmit}>
                                {/* Conditionally render form sections based on the current step */}
                                {step === 1 && (
                                    <>  <FormGroup>
                                        <Label for="email" className="reg-label-ad">Email:</Label>
                                        <InputGroup>
                                            <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                                            <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="reg-input-ad" invalid={errors.email} />
                                        </InputGroup>
                                        {errors.email &&
                                            <Tooltip
                                                placement="bottom"
                                                isOpen={tooltipOpen.email}
                                                autohide={false}
                                                target="email"
                                                toggle={() => toggleTooltip('email')}
                                            >
                                                <span >{errors.email}</span>
                                            </Tooltip>}

                                    </FormGroup>
                                        <FormGroup>
                                            <Label for="confirmEmail" className="reg-label-ad">Confirm Email:</Label>
                                            <InputGroup>
                                                <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                                                <Input type="email" name="confirmEmail" id="confirmEmail" value={formData.confirmEmail} onChange={handleChange} className="reg-input-ad" invalid={errors.confirmEmail} />
                                            </InputGroup>
                                            {errors.confirmEmail &&
                                                <Tooltip
                                                    placement="bottom"
                                                    isOpen={tooltipOpen.confirmEmail}
                                                    autohide={false}
                                                    target="confirmEmail"
                                                    toggle={() => toggleTooltip('confirmEmail')}
                                                >
                                                    <span >{errors.confirmEmail}</span>
                                                </Tooltip>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password" className="reg-label-ad">Password:</Label>
                                            <InputGroup>
                                                <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faLock} /></InputGroupText>
                                                <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className="reg-input-ad" invalid={errors.password} />
                                            </InputGroup>
                                            {errors.password &&
                                                <Tooltip
                                                    placement="bottom"
                                                    isOpen={tooltipOpen.password}
                                                    autohide={false}
                                                    target="password"
                                                    toggle={() => toggleTooltip('password')}
                                                >
                                                    <span >{errors.password}</span>
                                                </Tooltip>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="confirmPassword" className="reg-label-ad">Confirm Password:</Label>
                                            <InputGroup>
                                                <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faLock} /></InputGroupText>
                                                <Input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="reg-input-ad" invalid={errors.confirmPassword} />
                                            </InputGroup>
                                            {errors.confirmPassword &&
                                                <Tooltip
                                                    placement="bottom"
                                                    isOpen={tooltipOpen.confirmPassword}
                                                    autohide={false}
                                                    target="confirmPassword"
                                                    toggle={() => toggleTooltip('confirmPassword')}
                                                >
                                                    <span>{errors.confirmPassword}</span>
                                                </Tooltip>}
                                        </FormGroup>

                                        {/* Other input fields for step 1 */}
                                        <Row lg={3} style={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Button className="submit" type="button" style={{ backgroundColor: 'green' }} onClick={handleNext}>
                                                Next
                                            </Button>

                                        </Row>
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <FormGroup>
                                            <Label for="institutionName" className="reg-label-ad">Institution Name:</Label>
                                            <InputGroup className="animated-input">
                                                <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faBuilding} /></InputGroupText>
                                                <Input type="text" name="institutionName" id="institutionName" value={formData.institutionName} onChange={handleChange} className="reg-input-ad" invalid={errors.institutionName} />
                                            </InputGroup>
                                            <div className='invalid-feedback'>{errors.email}</div>
                                            {errors.institutionName &&
                                                <Tooltip
                                                    placement="bottom"
                                                    isOpen={tooltipOpen.institutionName}
                                                    autohide={false}
                                                    target="institutionName"
                                                    toggle={() => toggleTooltip('institutionName')}
                                                >
                                                    <span >{errors.institutionName}</span>
                                                </Tooltip>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="website" className="reg-label-ad">Website:</Label>
                                            <InputGroup>
                                                <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faGlobe} /></InputGroupText>
                                                <Input type="text" name="website" id="website" value={formData.website} onChange={handleChange} className="reg-input-ad" invalid={errors.website} />
                                            </InputGroup>
                                            {errors.website &&
                                                <Tooltip
                                                    placement="bottom"
                                                    isOpen={tooltipOpen.website}
                                                    autohide={false}
                                                    target="website"
                                                    toggle={() => toggleTooltip('website')}
                                                >
                                                    <span >{errors.website}</span>
                                                </Tooltip>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="foundingDate" className="reg-label-ad">Founding Date:</Label>
                                            <InputGroup>
                                                <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faCalendarAlt} /></InputGroupText>
                                                <Input type="date" name="foundingDate" id="foundingDate" value={formData.foundingDate} onChange={handleChange} className="reg-input-ad" invalid={errors.foundingDate} />
                                            </InputGroup>
                                            {errors.foundingDate &&
                                                <Tooltip
                                                    placement="bottom"
                                                    isOpen={tooltipOpen.foundingDate}
                                                    autohide={false}
                                                    target="foundingDate"
                                                    toggle={() => toggleTooltip('foundingDate')}
                                                >
                                                    <span >{errors.foundingDate}</span>
                                                </Tooltip>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="slogan" className="reg-label-ad">Mission Statement:</Label>
                                            <InputGroup>
                                                <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faBullseye} /></InputGroupText>
                                                <Input type="text" name="slogan" id="slogan" value={formData.slogan} onChange={handleChange} className="reg-input-ad" invalid={errors.slogan} />
                                            </InputGroup>
                                            {errors.slogan &&
                                                <Tooltip
                                                    placement="bottom"
                                                    isOpen={tooltipOpen.slogan}
                                                    autohide={false}
                                                    target="slogan"
                                                    toggle={() => toggleTooltip('slogan')}
                                                >
                                                    <span >{errors.slogan}</span>
                                                </Tooltip>}
                                        </FormGroup>
                                        {/* Input fields for step 2 */}
                                        <Row lg={3} style={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Button className="submit" type="button" style={{ backgroundColor: 'green' }} onClick={handleNext}>
                                                Next
                                            </Button>
                                            <Button className="submit" type="button" onClick={handleBack}>
                                                Back
                                            </Button>
                                        </Row>

                                    </>
                                )}
                                {step === 3 && (
                                    <>
                                        {/* Input fields for step 3 */}
                                        <Button className="submit" type="submit" style={{ backgroundColor: 'green' }} disabled={isLoading}>
                                            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Register'}
                                        </Button>
                                        <Button className="submit" type="button" onClick={handleBack}>
                                            Back
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} lg={6} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <img src={manImg} alt='3dman' className="img-fluid " style={{ maxWidth: '500px' }}></img>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminRegister2;
