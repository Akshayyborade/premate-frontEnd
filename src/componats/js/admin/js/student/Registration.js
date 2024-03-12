import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup, Table, Badge } from 'reactstrap';
import AdmissionDropoutGraph from '../chart/AdmissionDropoutGraph';
import RegistrationLinkForm from '../RegistrationLink';
import StudentAdmissionFormModal from './StudentAddmission'; // Import the modal component

const Registration = ({setMainContentComponent}) => {
    const [isFormOpen, setIsFormOpen] = useState(false); // State to control form/modal visibility

    const handleFormToggle = () => {
        setIsFormOpen(!isFormOpen); // Toggle form/modal visibility
    };

    const handleFormSubmit = () => {
        setMainContentComponent('AddmissionForm');
    };

    return (
        <Container className='p-5'>
            <Row>
                <Col>
                    <Row className='md-10'>
                        <Col className='p-3'>
                            <Card className='drop-shadow border-0  mx-auto'>
                                <CardBody>
                                    <CardTitle tag="h5">Total Students</CardTitle>
                                    <strong style={{ fontSize: '21px' }}>{"145"}</strong>
                                    <CardSubtitle className="mb-2 text-muted" tag="h6">Application pending</CardSubtitle>
                                    <strong style={{ fontSize: '21px' }}>{"145"}</strong>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className='p-3'>
                            <Card className='drop-shadow border-0  mx-auto' style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                <CardBody>
                                    <CardTitle tag="h5">Send Registration Link</CardTitle>
                                    <RegistrationLinkForm/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='p-3'>
                            <Card className='drop-shadow border-0  mx-auto'>
                                <CardBody>
                                    <CardTitle tag="h5">Add Student</CardTitle>
                                    <CardSubtitle className="mb-2 text-muted  py-2" tag="h6">Add a student to the class.</CardSubtitle>
                                    <Button color="success" size='sm' outline onClick={handleFormToggle}>Add</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className='p-3'>
                            <Card className='drop-shadow border-0  mx-auto'>
                                <CardBody>
                                    <CardTitle tag="h5">Edit Student</CardTitle>
                                    <CardSubtitle className="mb-2 text-muted py-2" tag="h6">Edit student information.</CardSubtitle>
                                    <Button color="success" size='sm' outline>Edit</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <AdmissionDropoutGraph/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className='drop-shadow border-0  mx-auto'>
                        <CardBody>
                            <CardTitle tag="h5">Recent Activity</CardTitle>
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Student Name</th>
                                        <th>Standard</th>
                                        <th>Admission Status</th>
                                        <th>Date</th>
                                        <th>Approve and Reject</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Rajesh Oswal</td>
                                        <td>5th</td>
                                        <td><Badge color={"success"} pill>{"Admitted"}</Badge></td>
                                        <td>{new Date().toLocaleDateString()}</td>
                                        <td>
                                            <ButtonGroup >
                                                <Button color="outline-success">Approved</Button>
                                                <Button color="outline-danger">Rejected</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* Student Admission Form Modal */}
            <StudentAdmissionFormModal isOpen={isFormOpen} toggle={handleFormToggle} />
        </Container>
    );
};

export default Registration;
