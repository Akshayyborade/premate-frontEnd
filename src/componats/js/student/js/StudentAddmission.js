import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Container, Row, InputGroup,  InputGroupText } from 'reactstrap';
import "../css/studentRegistration.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSchool,
    faMobileAlt,
    faEnvelope,
    faLock,
    faCalendarAlt,
    faVenusMars,
    faRoad,
    faCity,
    faStream,
    faMapMarkerAlt

} from '@fortawesome/free-solid-svg-icons';
const StudentAdmissionForm = () => {
    const [studentInfo, setStudentInfo] = useState({
        studentName: '',
        schoolName: '',
        mobNumber: '',
        email: '',
        password: '',
        gender: '',
        dobDate: '',
        stream: '',
        board: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setStudentInfo(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to backend
        console.log(studentInfo);
    };

    return (
        <Container className='py-4'>
            <Row className="align-items-center justify-content-center">
                <Col xs="auto" className="pr-2">
                    {/* Lottie Animation */}
                    <div>
                        <iframe src="https://lottie.host/embed/b6379899-57fb-4ac5-b6e8-723d76f494b6/S4SsJVrj2y.json" style={{ width: '100px', height: '100px' }} title="Lottie Animation"></iframe>
                    </div>
                </Col>
                <Col xs="auto" className="pr-2">
                    {/* Title */}
                    <h2 className="student-form-title text-center mb-0">Admission Form</h2>
                </Col>
            </Row>
            <Row>
                <Form onSubmit={handleSubmit} className="student-admission-form mr-auto">
                    <Col md="4" className='mx-auto my-auto p-2'>
                        <FormGroup>
                            <Label for="studentName" className="student-label">Student Name:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faUser} /></InputGroupText>
                                <Input type="text" id="studentName" name="studentName" value={studentInfo.studentName} onChange={handleChange} required className="student-name" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="schoolName" className="school-label">School Name:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faSchool} /></InputGroupText>
                                <Input type="text" id="schoolName" name="schoolName" value={studentInfo.schoolName} onChange={handleChange} required className="school-name" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="mobNumber" className="mob-label">Mobile Number:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faMobileAlt} /></InputGroupText>
                                <Input type="text" id="mobNumber" name="mobNumber" value={studentInfo.mobNumber} onChange={handleChange} required className="mobile-number" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="email" className="email-label">Email:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                                <Input type="email" id="email" name="email" value={studentInfo.email} onChange={handleChange} required className="email" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password" className="password-label">Password:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faLock} /></InputGroupText>
                                <Input type="password" id="password" name="password" value={studentInfo.password} onChange={handleChange} required className="password" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="gender" className="gender-label">Gender:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faVenusMars} /></InputGroupText>
                                <Input type="select" id="gender" name="gender" value={studentInfo.gender} onChange={handleChange} required className="gender">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Input>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="dobDate" className="dob-label">Date of Birth:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faCalendarAlt} /></InputGroupText>
                                <Input type="date" id="dobDate" name="dobDate" value={studentInfo.dobDate} onChange={handleChange} required className="dob-date" />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4" className='mx-auto my-auto p-2'>
                        <FormGroup>
                            <Label for="stream" className="stream-label">Stream:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faStream} /></InputGroupText>
                                <Input type="text" id="stream" name="stream" value={studentInfo.stream} onChange={handleChange} required className="stream" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="board" className="board-label">Board:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faSchool} /></InputGroupText>
                                <Input type="text" id="board" name="board" value={studentInfo.board} onChange={handleChange} required className="board" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="street" className="street-label">Street:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faRoad} /></InputGroupText>
                                <Input type="text" id="street" name="street" value={studentInfo.address.street} onChange={handleAddressChange} required className="street" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="city" className="city-label">City:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faCity} /></InputGroupText>
                                <Input type="text" id="city" name="city" value={studentInfo.address.city} onChange={handleAddressChange} required className="city" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="state" className="state-label">State:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faMapMarkerAlt} /></InputGroupText>
                                <Input type="text" id="state" name="state" value={studentInfo.address.state} onChange={handleAddressChange} required className="state" />
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label for="zip" className="zip-label">Zip:</Label>
                            <InputGroup>
                                <InputGroupText><FontAwesomeIcon icon={faMapMarkerAlt} /></InputGroupText>
                                <Input type="text" id="zip" name="zip" value={studentInfo.address.zip} onChange={handleAddressChange} required className="zip" />
                            </InputGroup>
                        </FormGroup>

                        <Button type="submit" color='success' outline className="submit-button">Submit</Button>
                    </Col>
                </Form>
            </Row>

        </Container>
    );
};

export default StudentAdmissionForm;
