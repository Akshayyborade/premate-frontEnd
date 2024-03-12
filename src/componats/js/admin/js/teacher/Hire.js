import React, { useState } from 'react';
import { Card, CardBody, Form, CardTitle, CardSubtitle, Row, Col, Button, Table, Badge, ButtonGroup, Container, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus, faUserTimes, faUserClock , faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import TeacherRegistrationForm from './TeacherRegistrationFrom';
import ProcessResignationModal from './ProcessResignationModal';
import ProcessTerminationModal from './ProcessTerminationModel';
import ProcessHiringModal from './ProcessHiring';

const TeacherManagement = ({ setMainContentComponent }) => {
    // Dummy data for demonstration
    const totalTeachers = 50; // Assuming this is fetched from the backend
    const hiringInProgress = 5;
    const resignations = 2;
    const terminations = 1;
    const teacherHire = false;

    const [isTeacherAproved, setIsTeacherAproved] = useState(false);
    const [isTeacherRejected, setIsTeacherRejected] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [terminationModalOpen,  setTerminationModalOpen] = useState(false);
    const [hireModelOpen,  setHireModelOpen] = useState(false);
    const toggleTermination=()=>{
        setTerminationModalOpen( !terminationModalOpen);
    }
        const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };
    const toggleModalHire =()=>{
        setHireModelOpen(!hireModelOpen)
    }
    const handleHiring = () => {
        // Add logic for hiring process
        setMainContentComponent('HireTeacher')
        console.log('Hiring process initiated');
    };

    const handleResignation = () => {
        // Add logic for resignation process
        console.log('Resignation process initiated');
    };

    const handleTermination = () => {
        // Add logic for termination process
        console.log('Termination process initiated');
    };
    const isTeacherAprovedHandle = () => {


        setIsTeacherAproved(true);

    }
    const onTeacherAprovedHandle = () => {

        setIsTeacherAproved(true)
    }
    const isTeacherRejectedHandle = () => {
        setIsTeacherRejected(true);
    }


    return (
        <Container>
            <Row className="p-3">
                <Card>
                    <CardBody className='text-center'>
                        <CardTitle tag="h5">Teacher Management</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Actions and Information</CardSubtitle>
                    </CardBody>
                </Card>
            </Row>


            <Row className="p-3">
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Hiring</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Hiring in progress: {hiringInProgress}</CardSubtitle>
                            <Button color="primary" onClick={toggleModal} >
                                <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Initiate Hiring
                            </Button>
                        </CardBody>
                    </Card>
                    
                </Col>
                <Col md={6}>
                <Card>
                        <CardBody>
                            <CardTitle tag="h5">Hiring</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Hiring in progress: {hireModelOpen}</CardSubtitle>
                            <Button color="warning" onClick={toggleModalHire} >
                                <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Process Hiring
                            </Button>
                        </CardBody>
                    </Card>
                </Col >
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Terminations</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Terminations pending: {terminations}</CardSubtitle>
                            <Button color="danger" onClick={toggleTermination}>
                                <FontAwesomeIcon icon={faUserTimes} className="mr-2" /> Initiate Termination
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Resignations</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Resignations pending: {resignations}</CardSubtitle>
                            <Button color="warning" onClick={toggleEditModal}>
                                <FontAwesomeIcon icon={faUserMinus} className="mr-2" /> Process Resignations
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className="p-3">
              
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Total Teachers</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Total number of teachers: {totalTeachers}</CardSubtitle>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="p-3">
                <Card className='drop-shadow border-0  mx-auto'>
                    <CardBody>
                        <CardTitle tag="h5">
                            Recent Activity
                        </CardTitle>
                        <Table borderless>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Teacher Name
                                    </th>
                                    <th>
                                        Post
                                    </th>
                                    <th>
                                        Hiring Status
                                    </th>
                                    <th>
                                        Date
                                    </th>
                                    <th>
                                        Aprove and  Reject
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        {1}
                                    </th>
                                    <td>
                                        {"Rajesh Oswal"}
                                    </td>
                                    <td>
                                        {"Computer Teacher"}
                                    </td>
                                    <td>
                                        {isTeacherAproved ? (
                                            <Badge color="success" pill>Hired</Badge>
                                        ) : (
                                            isTeacherRejected ? (
                                                <Badge color="danger" pill>Rejected</Badge>
                                            ) : (
                                                <Badge color="warning" pill>Not Hired</Badge>
                                            )
                                        )}
                                    </td>
                                    <td>
                                        {
                                            new Date().toLocaleDateString()
                                        }
                                    </td>
                                    <td>
                                        {
                                            <ButtonGroup >
                                                <Button color="outline-success" disabled={isTeacherAproved} onClick={onTeacherAprovedHandle}>
                                                    Approved
                                                </Button>
                                                <Button color="outline-danger" onClick={isTeacherRejectedHandle}disabled={isTeacherAproved}>Rejected</Button>
                                            </ButtonGroup>


                                        }
                                    </td>
                                </tr>

                            </tbody>
                        </Table>

                    </CardBody>
                </Card>

            </Row>

            {/* Add more cards or sections for other relevant information */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal} >Register Teacher</ModalHeader>
                <ModalBody>
                    <TeacherRegistrationForm/>
                </ModalBody>
              
            </Modal>
            <ProcessResignationModal isOpen={editModalOpen} toggle={toggleEditModal}/>
            <ProcessTerminationModal isOpen={terminationModalOpen} toggle={toggleTermination}/>
            <ProcessHiringModal isOpen={hireModelOpen} toggle={toggleModalHire}/>

        </Container>
    );

}
export default TeacherManagement;
