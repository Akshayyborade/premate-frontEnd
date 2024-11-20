import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Col, InputGroup, InputGroupText, Container, Row, Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSchool, faMobileAlt, faEnvelope, faLock, faCalendarAlt, faVenusMars, faRoad, faCity, faStream, faMapMarkerAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import "../../../student/css/studentRegistration.css";
import ContentLoader from "react-content-loader"
import axiosInstance from '../services/StudentAuthServices';
import { toast } from 'react-toastify';


const StudentAdmissionFormModal = ({ isOpen, toggle }) => {
    const [adminId, setAdminId] = useState(0);

    const [tooltipOpen, setTooltipOpen] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
   
   
    useEffect(() => {
        // Fetch adminId from localStorage
        const storedAdminId = localStorage.getItem('adminId');
        // If adminId exists in localStorage, set it in the component state
        if (storedAdminId) {
            setAdminId(parseInt(storedAdminId)); // You may need to parse it to an integer if needed
        }
    }, []);
   
    const [formData, setFormData] = useState({ // Combined state object
        adminId: localStorage.getItem('adminId') ? parseInt(localStorage.getItem('adminId')) : 0,
        studentDto: {
          name: {
            fname: '',
            mname: '',
            lname: '',
          },
          schoolName: '',
          mobNumber: '',
          email: '',
          password: '',
          gender: '',
          dobDate: '',
          grade: {
            gradeName: ''
          },
          stream: '',
          board: '',
          address: {
            street: '',
            city: '',
            state: '',
            zip: '',
          },
          parents: {
            email: '',
            location: '',
            mobNo: '',
            parentName: '',
            relationWithStud: ''
          }
        },
      });
    
    // const data ={

    //     adminId:adminId,

    //     studentDto:formData.studentDto

    // };

    useEffect(() => {
        // Set tooltip states for all fields
        const tooltipStates = Object.keys(formData.studentDto).reduce((acc, key) => {
            return { ...acc, [key]: false };
        }, {});
        setTooltipOpen(tooltipStates);
    }, [formData.studentDto]);

    const toggleTooltip = (field) => {
        setTooltipOpen(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
          // Form is valid, proceed with submission
          setIsLoading(true);
         
          console.log(formData)
          axiosInstance.post('/student/register', formData)
            .then((response) => {
              console.log(response.data);
              toast.success("Student added successfully");
              setIsLoading(false);
              toggle(); // Close the modal
            })
            .catch((error) => {
              console.error(error);
              toast.error("An error occurred while adding the student");
              setIsLoading(false);
            });
        } else {
          // Form has validation errors, display them
          setValidationErrors(validationErrors);
        }
      };
    
    const validateForm = () => {
        let validationErrors = {};
        if (!formData.studentDto.name.fname.trim()) {
            validationErrors.fname = 'First name is required';
        }
        if (!formData.studentDto.name.lname.trim()) {
            validationErrors.lname = 'Last name is required';
        }
        if (!formData.studentDto.schoolName.trim()) {
            validationErrors.schoolName = 'School name is required';
        }
        if (!formData.studentDto.mobNumber.trim()) {
            validationErrors.mobNumber = 'Mobile number is required';
        } else if (!/^\d+$/.test(formData.studentDto.mobNumber)) {
            validationErrors.mobNumber = 'Mobile number should contain only digits';
        }
        if (!formData.studentDto.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.studentDto.email)) {
            validationErrors.email = 'Email address is invalid';
        }
        if (!formData.studentDto.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (formData.studentDto.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }
        if (!formData.studentDto.gender) {
            validationErrors.gender = 'Gender is required';
        }
        if (!formData.studentDto.dobDate) {
            validationErrors.dobDate = 'Date of birth is required';
        }
        if (!formData.studentDto.grade.gradeName.trim()) {
            validationErrors.gradeName = 'Grade name is required';
        }
        if (!formData.studentDto.stream.trim()) {
            validationErrors.stream = 'Stream is required';
        }
        if (!formData.studentDto.board.trim()) {
            validationErrors.board = 'Board is required';
        }
        if (!formData.studentDto.address.street.trim()) {
            validationErrors.street = 'Street address is required';
        }
        if (!formData.studentDto.address.city.trim()) {
            validationErrors.city = 'City is required';
        }
        if (!formData.studentDto.address.state.trim()) {
            validationErrors.state = 'State is required';
        }
        if (!formData.studentDto.address.zip.trim()) {
            validationErrors.zip = 'ZIP code is required';
        } else if (!/^\d+$/.test(formData.studentDto.address.zip)) {
            validationErrors.zip = 'ZIP code should contain only digits';
        }
        return validationErrors;
    };

    const handleChange = (e) => {
        console.log(formData.studentDto)
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          studentDto: {
            ...prevState.studentDto,
            [name]: value
          }
        }));
      };
    
      const handleNameChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          studentDto: {
            ...prevState.studentDto,
            name: {
              ...prevState.studentDto.name,
              [name]: value
            }
          }
        }));
      }
    
      const handleGradeChange =(e)=>{
        const { name,value}=e.target;
        setFormData(prevState => ({
          ...prevState,
          studentDto: {
            ...prevState.studentDto,
            grade:{
              ...prevState.studentDto.grade,
              [name]:value
            }
          }
        }));
      };
      const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          studentDto: {
            ...prevState.studentDto,
            address: {
              ...prevState.studentDto.address,
              [name]: value
            }
          }
        }));
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
                    <Form onSubmit={handleSubmit} className="student-admission-form justify-content-between" action='post'>
                        <Col md="5">
                            <FormGroup>
                                <Label for="studentName" className="student-label">First Name:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faUser} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        value={formData.studentDto.name.fname}
                                        onChange={handleNameChange}
                                        invalid={!!validationErrors.fname}
                                    />
                                     {validationErrors.fname&&
                                    <Tooltip
                                        isOpen={tooltipOpen.fname}
                                        target="fname"
                                        toggle={() => toggleTooltip('fname')}
                                    >
                                        {validationErrors.fname}
                                    </Tooltip>   }                             </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="studentName" className="student-label">Last Name:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faUser} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="lname"
                                        name="lname"
                                        value={formData.studentDto.name.lname}
                                        onChange={handleNameChange}
                                        invalid={validationErrors.lname}
                                    />
                                     {validationErrors.lname&&
                                    <Tooltip
                                        isOpen={tooltipOpen.lname}
                                        target="lname"
                                        toggle={() => toggleTooltip('lname')}
                                    >
                                        {validationErrors.lname}
                                    </Tooltip> }                               </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="schoolName" className="school-label">School Name:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faSchool} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="schoolName"
                                        name="schoolName"
                                        value={formData.studentDto.schoolName}
                                        onChange={handleChange}
                                        invalid={!!validationErrors.schoolName}
                                    />
                                     {validationErrors.schoolName&&
                                    <Tooltip
                                        isOpen={tooltipOpen.schoolName}
                                        target="schoolName"
                                        toggle={() => toggleTooltip('schoolName')}
                                    >
                                        {validationErrors.schoolName}
                                    </Tooltip> }                               </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="mobNumber" className="mob-label">Mobile Number:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faMobileAlt} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="mobNumber"
                                        name="mobNumber"
                                        value={formData.studentDto.mobNumber}
                                        onChange={handleChange}
                                        invalid={!!validationErrors.mobNumber}
                                    />
                                     {validationErrors.mobNumber&&
                                    <Tooltip
                                        isOpen={tooltipOpen.mobNumber}
                                        target="mobNumber"
                                        toggle={() => toggleTooltip('mobNumber')}
                                    >
                                        {validationErrors.mobNumber}
                                    </Tooltip>  }                              </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="email" className="email-label">Email:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.studentDto.email}
                                        onChange={handleChange}
                                        invalid={!!validationErrors.email}
                                    />
                                     {validationErrors.email&&
                                    <Tooltip
                                        isOpen={tooltipOpen.email}
                                        target="email"
                                        toggle={() => toggleTooltip('email')}
                                    >
                                        {validationErrors.email}
                                    </Tooltip>   }                             </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="password" className="password-label">Password:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faLock} /></InputGroupText>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.studentDto.password}
                                        onChange={handleChange}
                                        invalid={!!validationErrors.password}
                                    />
                                     {validationErrors.password&&
                                    <Tooltip
                                        isOpen={tooltipOpen.password}
                                        target="password"
                                        toggle={() => toggleTooltip('password')}
                                    >
                                        {validationErrors.password}
                                    </Tooltip> }                               </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="gender" className="gender-label">Gender:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faVenusMars} /></InputGroupText>
                                    <Input
                                        type="select"
                                        id="gender"
                                        name="gender"
                                        value={formData.studentDto.gender}
                                        onChange={handleChange}
                                        invalid={!!validationErrors.gender}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Input>
                                    {validationErrors.gender&&
                                    <Tooltip
                                        isOpen={tooltipOpen.gender}
                                        target="gender"
                                        toggle={() => toggleTooltip('gender')}
                                    >
                                        {validationErrors.gender}
                                    </Tooltip>}
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="dobDate" className="dob-label">Date of Birth:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faCalendarAlt} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input
                                        type="date"
                                        id="dobDate"
                                        name="dobDate"
                                        value={formData.studentDto.dobDate}
                                        onChange={handleChange}
                                        invalid={!!validationErrors.dobDate}
                                    />
                                     {validationErrors.dobDate&&
                                    <Tooltip
                                        isOpen={tooltipOpen.dobDate}
                                        target="dobDate"
                                        toggle={() => toggleTooltip('dobDate')}
                                    >
                                        {validationErrors.dobDate}
                                    </Tooltip>}                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md="5" >
                            <FormGroup >
                                <Label for="gradeName">Grade Name:</Label>

                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faStream} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="gradeName"
                                        name="gradeName"
                                        value={formData.studentDto.grade.gradeName}
                                        onChange={handleGradeChange}
                                        invalid={!!validationErrors.gradeName}
                                    />
                                     {validationErrors.gradeName&&
                                    <Tooltip
                                        isOpen={tooltipOpen.gradeName}
                                        target="gradeName"
                                        toggle={() => toggleTooltip('gradeName')}
                                    >
                                        {validationErrors.gradeName}
                                    </Tooltip>}
                                </InputGroup>

                            </FormGroup>
                            <FormGroup>
                                <Label for="stream" className="stream-label">Stream:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faStream} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="stream"
                                        name="stream"
                                        value={formData.studentDto.stream}
                                        onChange={handleChange}
                                        invalid={!!validationErrors.stream}
                                    />
                                     {validationErrors.stream&&
                                    <Tooltip
                                        isOpen={tooltipOpen.stream}
                                        target="stream"
                                        toggle={() => toggleTooltip('stream')}
                                    >
                                        {validationErrors.stream}
                                    </Tooltip> }                               </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="board" className="board-label">Board:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faSchool} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="board"
                                        name="board"
                                        value={formData.studentDto.board}
                                        onChange={handleChange}
                                        invalid={!!validationErrors.board}
                                    />
                                     {validationErrors.board&&
                                    <Tooltip
                                        isOpen={tooltipOpen.board}
                                        target="board"
                                        toggle={() => toggleTooltip('board')}
                                    >
                                        {validationErrors.board}
                                    </Tooltip>}                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="street" className="street-label">Street:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faRoad} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="street"
                                        name="street"
                                        value={formData.studentDto.address.street}
                                        onChange={handleAddressChange}
                                        invalid={!!validationErrors.street}
                                    />
                                     {validationErrors.street&&
                                    <Tooltip
                                        isOpen={tooltipOpen.street}
                                        target="street"
                                        toggle={() => toggleTooltip('street')}
                                    >
                                        {validationErrors.street}
                                    </Tooltip>  }                              </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="city" className="city-label">City:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faCity} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.studentDto.address.city}
                                        onChange={handleAddressChange}
                                        invalid={!!validationErrors.city}
                                    />
                                    {validationErrors.city&&
                                    
                                    <Tooltip
                                        isOpen={tooltipOpen.city}
                                        target="city"
                                        toggle={() => toggleTooltip('city')}
                                    >
                                        {validationErrors.city}
                                    </Tooltip>   }                            </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="state" className="state-label">State:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.studentDto.address.state}
                                        onChange={handleAddressChange}
                                        invalid={!!validationErrors.state}
                                    />
                                    {validationErrors.state&&
                                    <Tooltip
                                        isOpen={tooltipOpen.state}
                                        target="state"
                                        toggle={() => toggleTooltip('state')}
                                    >
                                        {validationErrors.state}
                                    </Tooltip> }                               </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="zip" className="zip-label">Zip:</Label>
                                <InputGroup>
                                    <InputGroupText style={{ minWidth: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '16px' }} /></InputGroupText>
                                    <Input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        value={formData.studentDto.address.zip}
                                        onChange={handleAddressChange}
                                        invalid={!!validationErrors.zip}
                                    />
                                    {validationErrors.zip&&<Tooltip
                                        isOpen={tooltipOpen.zip}
                                        target="zip"
                                        toggle={() => toggleTooltip('zip')}
                                    >
                                        {validationErrors.zip}
                                    </Tooltip>    }                            </InputGroup>
                            </FormGroup>
                            <FormGroup >
                                <Button type="submit" color='success' outline className="submit-button mx-auto
                             " size="sm" onClick={handleSubmit} disabled={isLoading}>{isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}</Button>
                            </FormGroup>


                        </Col>
                    </Form>
                </Row>
            </ModalBody>

        </Modal>
    );
};

export default StudentAdmissionFormModal;
