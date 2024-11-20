import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ContentLoader from 'react-content-loader';
import axiosInstance, { getStudents } from '../services/StudentAuthServices';
import { toast } from 'react-toastify';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Box, IconButton, Tabs } from '@mui/joy';
import { useTabsContext } from '@mui/base';
import { EditNote } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { doLogOut } from '../services/AuthServices';
import { useNavigate } from 'react-router-dom';

const EditStudentModel = ({ isOpen, toggle }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const navigate = useNavigate();// Separate state for selected student object

    // Function to fetch students from the API
    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const studentsData = await getStudents();
            if (studentsData.status === 401) {
                // Handle 401 error: trigger logout functionality
                doLogOut(() => {
                    navigate('/')
                })

            }
            if (Array.isArray(studentsData.data)) {
                setStudents(studentsData.data);
            } else {
                console.error('Invalid data returned from getStudents():', studentsData);
                toast.error('An error occurred while fetching students.');
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('An error occurred while fetching students.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedStudentId) {
            toast.error('Please select a student.');
            return;
        }
        console.log(selectedStudent);

        setIsLoading(true);
        axiosInstance
            .put(`/student/updateStudent/${selectedStudentId}`, selectedStudent)
            .then((response) => {
                console.log(response.data);
                if (response.status === 401) {
                    // Handle 401 error: trigger logout functionality
                    doLogOut(() => {
                        navigate('/')
                    })

                }
                toast.success('Student updated successfully');
                fetchStudents(); // Fetch the updated students list
                toggle(); // Close the modal
            })
            .catch((error) => {
                console.error('Error updating student:', error);
                toast.error('An error occurred while updating the student');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const [activeTab, setActiveTab] = useState('0');
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Function to handle when a student is selected from the dropdown
    const handleStudentSelect = (e) => {
        const selectedId = parseInt(e.target.value);
        setSelectedStudentId(selectedId);
        const foundStudent = students.find(student => student.stud_id === selectedId);
        setSelectedStudent(foundStudent || null); // Set selectedStudent or null if not found
    };

    const [isEditingTabs, setIsEditingTabs] = useState({
        personal: false, // Edit state for each tab
        education: false,
        family: false,
        moreInfo: false,
    });

    const toggleEditTab = (tabName) => {
        setIsEditingTabs({
            ...isEditingTabs,
            [tabName]: !isEditingTabs[tabName], // Toggle edit state for the tab
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>
                
               
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="studentSelect">Select Student:</Label>
                        <Input
                            type="select"
                            id="studentSelect"
                            name="studentSelect"
                            value={selectedStudentId || ''}
                            disabled={isLoading}
                            onChange={handleStudentSelect}
                        >
                            {isLoading ? (
                                <option value="" disabled>
                                    Loading Students...
                                </option>
                            ) : (
                                <>
                                    <option value="">Select Student</option>
                                    {students.map((student) => (
                                        <option key={student.stud_id} value={student.stud_id}>
                                            {`${student.name.fname} ${student.name.lname}`}
                                        </option>
                                    ))}
                                </>
                            )}
                        </Input>
                    </FormGroup>
                    <Tabs value={activeTab} onChange={handleChange} orientation="vertical" variant="scrollable">
                        <TabList aria-label="vertical tabs example">
                            <Tab eventKey="0">Personal Information</Tab>
                            <Tab eventKey='1'>Family Information</Tab>
                            <Tab eventKey="2">Education</Tab>
                            <Tab eventKey="3">More information</Tab>
                        </TabList>
                        <TabPanel value={0}  style={{ maxHeight: '400px', overflowY: 'auto' }} >
                            <IconButton onClick={() => toggleEditTab('personal')} className="edit-icon">
                                <EditNote /> {/* Edit icon component */}
                            </IconButton>
                            {selectedStudent && (
                                isEditingTabs.personal ? (
                                    <>
                                        <FormGroup>
                                            <Label for="fname">First Name:</Label>
                                            <Input
                                                type="text"
                                                id="fname"
                                                name="fname"
                                                value={selectedStudent?.name?.fname || ''}
                                                onChange={(e) =>
                                                    setSelectedStudent({
                                                        ...selectedStudent,
                                                        name: { ...selectedStudent.name, fname: e.target.value },
                                                    })
                                                }
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="lname">Last Name:</Label>
                                            <Input
                                                type="text"
                                                id="lname"
                                                name="lname"
                                                value={selectedStudent?.name?.lname || ''}
                                                onChange={(e) =>
                                                    setSelectedStudent({
                                                        ...selectedStudent,
                                                        name: { ...selectedStudent.name, lname: e.target.value },
                                                    })
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email" className="email-label">Email:</Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={selectedStudent?.email || ''}
                                                onChange={(e) =>
                                                    setSelectedStudent({
                                                        ...selectedStudent,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="mobNumber" className="mob-label">Mobile Number:</Label>
                                            <Input
                                                type="text"
                                                id="mobNumber"
                                                name="mobNumber"
                                                value={selectedStudent?.mobNumber}
                                                onChange={(e) =>
                                                    setSelectedStudent({
                                                        ...selectedStudent,
                                                        mobNumber: e.target.value,
                                                    })
                                                }
                                            />
                                        </FormGroup>
                                    </>
                                ) : (
                                    <>
                                        <FormGroup>
                                            <Label for="fname">First Name:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="fname"
                                                name="fname"
                                                value={selectedStudent?.name?.fname || ''}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="lname">Last Name:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="lname"
                                                name="lname"
                                                value={selectedStudent?.name?.lname || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email" className="email-label">Email:</Label>
                                            <Input
                                                disabled
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={selectedStudent?.email || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="mobNumber" className="mob-label">Mobile Number:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="mobNumber"
                                                name="mobNumber"
                                                value={selectedStudent?.mobNumber}
                                            />
                                        </FormGroup>
                                    </>
                                )
                            )}
                        </TabPanel>
                        <TabPanel value={1}style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <IconButton onClick={() => toggleEditTab('family')} className="edit-icon">
                                <EditNote /> {/* Edit icon component */}
                            </IconButton>
                            {selectedStudent && (
                                isEditingTabs.family ? (
                                    <>
                                        <FormGroup>
                                            <Label for="parentName" className="state-label">Parent's Name:</Label>
                                            <Input
                                                type="text"
                                                id="parentName"
                                                name="parentName"
                                                value={selectedStudent?.parents?.parentName || ''}
                                                onChange={(e) =>
                                                    setSelectedStudent({
                                                        ...selectedStudent,
                                                        parents: { ...selectedStudent.parents, parentName: e.target.value },
                                                    })
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="parentsEmail" className="state-label">Email:</Label>
                                            <Input
                                                type="text"
                                                id="parentsEmail"
                                                name="parentsEmail"
                                                value={selectedStudent?.parents?.email || ''}
                                                onChange={(e) =>
                                                    setSelectedStudent({
                                                        ...selectedStudent,
                                                        parents: { ...selectedStudent.parents, email: e.target.value },
                                                    })
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="relation" className="state-label">Relation:</Label>
                                            <Input
                                                type="text"
                                                id="relation"
                                                name="relation"
                                                value={selectedStudent?.parents?.relationWithStud || ''}
                                                onChange={(e) =>
                                                    setSelectedStudent({
                                                        ...selectedStudent,
                                                        parents: { ...selectedStudent.parents, relationWithStud: e.target.value },
                                                    })
                                                }
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="parentPhone" className="state-label">Phone:</Label>
                                            <Input
                                                type="text"
                                                id="parentPhone"
                                                name="parentPhone"
                                                value={selectedStudent?.parents?.mobNo || ''}
                                                onChange={(e) =>
                                                    setSelectedStudent({
                                                        ...selectedStudent,
                                                        parents: { ...selectedStudent.parents, mobNo: e.target.value },
                                                    })
                                                }
                                            />
                                        </FormGroup>
                                    </>
                                ) : (
                                    <>
                                        <FormGroup>
                                            <Label for="parentName" className="state-label">Parent's Name:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="parentName"
                                                name="parentName"
                                                value={selectedStudent?.parents?.parentName || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="parentsEmail" className="state-label">Email:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="parentsEmail"
                                                name="parentsEmail"
                                                value={selectedStudent?.parents?.email || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="relation" className="state-label">Relation:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="relation"
                                                name="relation"
                                                value={selectedStudent?.parents?.relationWithStud || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="parentPhone" className="state-label">Phone:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="parentPhone"
                                                name="parentPhone"
                                                value={selectedStudent?.parents?.mobNo || ''}
                                            />
                                        </FormGroup>
                                    </>
                                )
                            )}
                        </TabPanel>
                        <TabPanel value={2}style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <IconButton onClick={() => toggleEditTab('education')} className="edit-icon">
                                <EditNote /> {/* Edit icon component */}
                            </IconButton>
                            {selectedStudent && (
                                isEditingTabs.education ? (
                                    <>
                                        <FormGroup>
                                            <Label for="schoolName" className="state-label">School Name:</Label>
                                            <Input
                                                type="text"
                                                id="schoolName"
                                                name="schoolName"
                                                value={selectedStudent?.schoolName || ''}
                                                onChange={(e) => setSelectedStudent({ ...selectedStudent, schoolName: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="gradeName" className="state-label">Grade Name:</Label>
                                            <Input
                                                type="text"
                                                id="gradeName"
                                                name="gradeName"
                                                value={selectedStudent?.grade?.gradeName || ''}
                                                onChange={(e) => setSelectedStudent({ ...selectedStudent, grade: { ...selectedStudent.grade, gradeName: e.target.value } })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="stream" className="state-label">Stream:</Label>
                                            <Input
                                                type="text"
                                                id="stream"
                                                name="stream"
                                                value={selectedStudent?.grade?.stream || ''}
                                                onChange={(e) => setSelectedStudent({ ...selectedStudent, grade: { ...selectedStudent.grade, stream: e.target.value } })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="board" className="state-label">Board:</Label>
                                            <Input
                                                type="text"
                                                id="board"
                                                name="board"
                                                value={selectedStudent?.grade?.board || ''}
                                                onChange={(e) => setSelectedStudent({ ...selectedStudent, grade: { ...selectedStudent.grade, board: e.target.value } })}
                                            />
                                        </FormGroup>
                                    </>
                                ) : (
                                    <>
                                        <FormGroup>
                                            <Label for="schoolName" className="state-label">School Name:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="schoolName"
                                                name="schoolName"
                                                value={selectedStudent?.schoolName || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="gradeName" className="state-label">Grade Name:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="gradeName"
                                                name="gradeName"
                                                value={selectedStudent?.grade?.gradeName || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="stream" className="state-label">Stream:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="stream"
                                                name="stream"
                                                value={selectedStudent?.grade?.stream || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="board" className="state-label">Board:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="board"
                                                name="board"
                                                value={selectedStudent?.grade?.board || ''}
                                            />
                                        </FormGroup>
                                    </>
                                )
                            )}
                        </TabPanel>
                        <TabPanel value={3}style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <IconButton onClick={() => toggleEditTab('moreInfo')} className="edit-icon">
                                <EditNote /> {/* Edit icon component */}
                            </IconButton>
                            {selectedStudent && (
                                isEditingTabs.moreInfo ? (
                                    <>
                                        <FormGroup>
                                            <Label for="address" className="state-label">Address:</Label>

                                                <Input
                                                    type="text"
                                                    id="street"
                                                    name="street"
                                                    placeholder='street'
                                                    value={selectedStudent?.address?.street || ''}
                                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, address: { ...selectedStudent.address, street: e.target.value } })} />
                                                <Input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    placeholder='city'
                                                    value={selectedStudent?.address?.city || ''}
                                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, address: { ...selectedStudent.address, city: e.target.value } })} />

                                                <Input
                                                    type="text"
                                                    id="state"
                                                    name="state"
                                                    placeholder='state'
                                                    value={selectedStudent?.address?.state || ''}
                                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, address: { ...selectedStudent.address, state: e.target.value } })} />
                                         

                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="dob" className="state-label">Date of Birth:</Label>
                                            <Input

                                                type="date"
                                                id="dobDate"
                                                name="dobDate"
                                                value={selectedStudent?.dobDate || ''}
                                                onChange={(e) => setSelectedStudent({ ...selectedStudent, dobDate: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="gender" className="state-label">Gender:</Label>
                                            <Input
                                                type="text"
                                                id="gender"
                                                name="gender"
                                                value={selectedStudent?.gender || ''}
                                                onChange={(e) => setSelectedStudent({ ...selectedStudent, gender: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="isActive" className="state-label">Status:</Label>
                                            <div className='mx-4'>
                                                <Badge color={selectedStudent?.isactive ? 'success' : 'error'} badgeContent={selectedStudent?.isactive ? 'Active' : 'Inactive'} />
                                            </div>
                                        </FormGroup>
                                    </>
                                ) : (
                                    <>
                                        <FormGroup >
                                            <Label for="address" className="state-label">Address:</Label>
                                           
                                                <Input
                                                    disabled
                                                    type="text"
                                                    id="street"
                                                    name="street"
                                                    placeholder='street'
                                                    value={selectedStudent?.address?.street || ''}
                                                />
                                                <Input
                                                disabled
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    placeholder='city'
                                                    value={selectedStudent?.address?.city || ''}
                                                />

                                                <Input
                                                disabled
                                                    type="text"
                                                    id="state"
                                                    name="state"
                                                    placeholder='state'
                                                    value={selectedStudent?.address?.state || ''}
                                                />
                                        


                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="dob" className="state-label">Date of Birth:</Label>
                                            <Input
                                                disabled
                                                type="date"
                                                id="dobDate"
                                                name="dobDate"
                                                value={selectedStudent?.dobDate || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="gender" className="state-label">Gender:</Label>
                                            <Input
                                                disabled
                                                type="text"
                                                id="gender"
                                                name="gender"
                                                value={selectedStudent?.gender || ''}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="isActive" className="state-label">Status:</Label>
                                            <div className='mx-4'>
                                                <Badge color={selectedStudent?.isactive ? 'success' : 'error'} badgeContent={selectedStudent?.isactive ? 'Active' : 'Inactive'} />
                                            </div>
                                        </FormGroup>
                                    </>
                                )
                            )}
                        </TabPanel>
                    </Tabs>

                    <Button type="submit" color="success" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update'}
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default EditStudentModel;