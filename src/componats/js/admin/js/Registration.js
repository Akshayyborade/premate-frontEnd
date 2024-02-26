import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, CardDeck, Table, Badge, ButtonGroup } from 'reactstrap';
import AdmissionDropoutGraph from './chart/AdmissionDropoutGraph';
import RegistrationLinkForm from './RegistrationLink';

const Registration = ({setMainContentComponent}) => {
    const handelFormSubmit=()=>{
        setMainContentComponent('AddmissionForm');

    }
    return (
        <Container className='p-5'>
            <Row>
            <Col>
            <Row className='md-10'>
                <Col className='p-3'>
                    {/* <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card> */}
                    <Card className='drop-shadow border-0  mx-auto'>
                        <CardBody>
                            <CardTitle tag="h5">
                                Total Students
                            </CardTitle>
                            <strong style={{ fontSize: '21px' }}>{"145"}</strong>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                              Application pending
                            </CardSubtitle>
                            <strong style={{ fontSize: '21px' }}>{"145"}</strong>
                            <CardText>
                    
                </CardText>
                            
                        </CardBody>
                    </Card>
                </Col>
                <Col className='p-3'>
                    <Card className='drop-shadow border-0  mx-auto' style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        <CardBody>
                            <CardTitle tag="h5">
                                Send Registration Link 
                            </CardTitle>
                            <RegistrationLinkForm/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className='p-3'>
                    <Card className='drop-shadow border-0  mx-auto'>
                        <CardBody>
                            <CardTitle tag="h5">
                                Add Student
                            </CardTitle>
                        
                            <CardSubtitle className="mb-2 text-muted  py-2"
                                tag="h6">
                                 add a student to the class. 
                            </CardSubtitle>
                            <Button color="success" size='sm'
                                outline onClick={handelFormSubmit}>
                                Add
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col className='p-3'>
                    <Card className='drop-shadow border-0  mx-auto'>
                        <CardBody>
                            <CardTitle tag="h5">
                                Edit Student
                            </CardTitle>
                        
                            <CardSubtitle className="mb-2 text-muted py-2"
                                tag="h6">
                                edit student information.
                            </CardSubtitle>
                            <Button color="success" size='sm'
                                outline>
                                Edit
                            </Button>
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
                                        Student Name
                                    </th>
                                    <th>
                                        Standard
                                    </th>
                                    <th>
                                        Addmission Status
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
                                        {"5th"}
                                    </td>
                                    <td>
                                        {<Badge color={"success"} pill>{ "Admitted" }</Badge>}
                                    </td>
                                    <td>
                                        {
                                            new Date().toLocaleDateString()
                                        }
                                    </td>
                                    <td>
                                        {
                                            <ButtonGroup >
                                                <Button color="outline-success">
                                                    Approved
                                                </Button>
                                                <Button color="outline-danger">Rejected</Button>
                                            </ButtonGroup>
                                            

                                        }
                                    </td>
                                </tr>
                               
                            </tbody>
                        </Table>

                    </CardBody>
                </Card>

            </Row>
        </Container>
    );
};

export default Registration;
