import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Col, InputGroup, InputGroupText, Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSchool, faMobileAlt, faEnvelope, faLock, faCalendarAlt, faVenusMars, faRoad, faCity, faStream, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import "../../../student/css/studentRegistration.css";
import ContentLoader from "react-content-loader"
import axiosInstance from '../services/StudentAuthServices';


const StudentAdmissionFormModal = ({ isOpen, toggle }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken]=useState("");
    // get admin token 
    const setAdminToken =()=>{
        setToken(localStorage.getItem('token'));
    }
// to be work on animation loading on page ===>>>
    useEffect(() => {
        // Simulate loading data or any asynchronous operation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 20000); // Simulated delay for loading

        // Clean up function
        return () => clearTimeout(timer);
    }, []);
    ///<<<===
    const [studentInfo, setStudentInfo] = useState({
        studentName: '',
        schoolName: '',
        mobNumber: '',
        email: '',
        password: '',
        gender: '',
        dobDate: '',
        grade: {
           gradeName:''
        },
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
        console.log(studentInfo);
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
        console.log(" submitting data")
        axiosInstance.get('/student/register')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
        setToken(localStorage.getItem('token'));
        console.log(token)
        e.preventDefault();
        // Handle form submission, e.g., send data to backend

        console.log(studentInfo);
        // Close the modal after submission
        toggle();
    };

    return (

        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>
            {/*to be work on animation loading on page ===>>>*/}
                <div>
                    {isLoading ? (
                        <ContentLoader
                            speed={2}
                            width={400}
                            height={160}
                            viewBox="0 0 400 160"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            {/* Placeholder content */}
                            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                            <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                            <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                            <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                            <circle cx="20" cy="20" r="20" />
                        </ContentLoader>
                    ) : (
                        <iframe src="https://lottie.host/embed/b6379899-57fb-4ac5-b6e8-723d76f494b6/S4SsJVrj2y.json" style={{ width: '70px', height: '70px' }} title="Lottie Animation"></iframe>
                    )}
                    {/* <<====== */}
                </div>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Form onSubmit={handleSubmit} className="student-admission-form justify-content-between">
                        <Col md="5">
                            <FormGroup>
                                <Label for="studentName" className="student-label">Student Name:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faUser} /></InputGroupText>
                                    <Input type="text" id="studentName" name="studentName" value={studentInfo.studentName} onChange={handleChange} required className="student-name" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="schoolName" className="school-label">School Name:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faSchool} /></InputGroupText>
                                    <Input type="text" id="schoolName" name="schoolName" value={studentInfo.schoolName} onChange={handleChange} required className="school-name" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="mobNumber" className="mob-label">Mobile Number:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faMobileAlt} /></InputGroupText>
                                    <Input type="text" id="mobNumber" name="mobNumber" value={studentInfo.mobNumber} onChange={handleChange} required className="mobile-number" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="email" className="email-label">Email:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                                    <Input type="email" id="email" name="email" value={studentInfo.email} onChange={handleChange} required className="email" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="password" className="password-label">Password:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faLock} /></InputGroupText>
                                    <Input type="password" id="password" name="password" value={studentInfo.password} onChange={handleChange} required className="password" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="gender" className="gender-label">Gender:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faVenusMars} /></InputGroupText>
                                    <Input type="select" id="gender" name="gender" value={studentInfo.gender} onChange={handleChange} required className="gender" size="sm">
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
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faCalendarAlt} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input type="date" id="dobDate" name="dobDate" value={studentInfo.dobDate} onChange={handleChange} required className="dob-date" size="sm" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md="5" >
                            <FormGroup>
                                <Label for="stream" className="stream-label">Stream:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faStream} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input type="text" id="stream" name="stream" value={studentInfo.stream} onChange={handleChange} required className="stream" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="board" className="board-label">Board:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faSchool} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input type="text" id="board" name="board" value={studentInfo.board} onChange={handleChange} required className="board" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="street" className="street-label">Street:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faRoad} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input type="text" id="street" name="street" value={studentInfo.address.street} onChange={handleAddressChange} required className="street" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="city" className="city-label">City:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faCity} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input type="text" id="city" name="city" value={studentInfo.address.city} onChange={handleAddressChange} required className="city" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="state" className="state-label">State:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input type="text" id="state" name="state" value={studentInfo.address.state} onChange={handleAddressChange} required className="state" size="sm" />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="zip" className="zip-label">Zip:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input type="text" id="zip" name="zip" value={studentInfo.address.zip} onChange={handleAddressChange} required className="zip" size="sm" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup >
                                <Button type="submit" color='success' outline className="submit-button mx-auto
                             " size="sm" onClick={handleSubmit}>Submit</Button>
                            </FormGroup>


                        </Col>
                    </Form>
                </Row>
            </ModalBody>

        </Modal>
    );
};

export default StudentAdmissionFormModal;
