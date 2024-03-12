import React, { useState } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormFeedback, Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';

const SalarySection = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [salaryDetails, setSalaryDetails] = useState([]);
    const [newSalary, setNewSalary] = useState({
        id: '',
        employeeName: '',
        salaryAmount: ''
    });
    const [selectedSalaryId, setSelectedSalaryId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [errors, setErrors] = useState({});

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSalary(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddSalary = () => {
        // Validate input
        if (!newSalary.employeeName.trim()) {
            setErrors(prevState => ({ ...prevState, employeeName: 'Employee name is required' }));
            return;
        }
        if (!newSalary.salaryAmount.trim() || isNaN(newSalary.salaryAmount) || Number(newSalary.salaryAmount) <= 0) {
            setErrors(prevState => ({ ...prevState, salaryAmount: 'Salary amount must be a positive number' }));
            return;
        }

        // Add new salary details to the list
        setSalaryDetails([...salaryDetails, { ...newSalary, id: Date.now() }]);

        // Clear the form fields
        setNewSalary({
            id: '',
            employeeName: '',
            salaryAmount: ''
        });

        // Close the modal
        toggleModal();
    };

    const handleEditSalary = () => {
        // Validate input
        if (!newSalary.employeeName.trim()) {
            setErrors(prevState => ({ ...prevState, employeeName: 'Employee name is required' }));
            return;
        }
        if (!newSalary.salaryAmount.trim() || isNaN(newSalary.salaryAmount) || Number(newSalary.salaryAmount) <= 0) {
            setErrors(prevState => ({ ...prevState, salaryAmount: 'Salary amount must be a positive number' }));
            return;
        }

        // Find the salary detail to edit
        const salaryIndex = salaryDetails.findIndex(salary => salary.id === selectedSalaryId);
        if (salaryIndex === -1) {
            return;
        }

        // Update the salary detail
        const updatedSalaryDetails = [...salaryDetails];
        updatedSalaryDetails[salaryIndex] = newSalary;
        setSalaryDetails(updatedSalaryDetails);

        // Clear the form fields
        setNewSalary({
            id: '',
            employeeName: '',
            salaryAmount: ''
        });

        // Close the edit modal
        toggleEditModal();
    };

    const handleDeleteSalary = (id) => {
        // Filter out the salary detail to delete
        const updatedSalaryDetails = salaryDetails.filter(salary => salary.id !== id);
        setSalaryDetails(updatedSalaryDetails);
    };

    const handleEditClick = (id) => {
        // Find the salary detail to edit
        const salaryToEdit = salaryDetails.find(salary => salary.id === id);
        if (!salaryToEdit) {
            return;
        }

        // Set the selected salary ID and open the edit modal
        setSelectedSalaryId(id);
        setNewSalary(salaryToEdit);
        toggleEditModal();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSalaryDetails = salaryDetails.filter(salary =>
        salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedSalaryDetails = [...filteredSalaryDetails].sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.employeeName.localeCompare(b.employeeName);
        } else {
            return b.employeeName.localeCompare(a.employeeName);
        }
    });

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <Container>
            <h2 className='text-center'>Salary Management</h2>
            <Row className='p-4'>
                <Col>
                    <Card className="mr-2">
                        <CardBody>
                            <CardTitle tag="h5">Paid</CardTitle>
                            <CardText>10 Employees</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card className="mr-2">
                        <CardBody>
                            <CardTitle tag="h5">Pending</CardTitle>
                            <CardText>5 Employees</CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Overdue</CardTitle>
                            <CardText>3 Employees</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className='p-4'>
                <div className="d-flex align-items-center mb-3">
                    <Button color="primary" onClick={toggleModal}><FontAwesomeIcon icon={faPlus} /> Add Salary</Button>
                    <div className="ml-auto d-flex align-items-center">
                        <div className="mr-2">
                            <Input type="text" placeholder="Search by Employee Name" value={searchTerm} onChange={handleSearch} />
                        </div>
                        <Button color="info" onClick={toggleSortDirection}>
                            <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortAlphaDown : faSortAlphaUp} />
                        </Button>
                    </div>
                </div>
            </Row>
            <Row className='p-4'>
                <Table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Salary Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedSalaryDetails.map(salary => (
                            <tr key={salary.id}>
                                <td>{salary.employeeName}</td>
                                <td>{salary.salaryAmount}</td>
                                <td>
                                    <Button color="warning" onClick={() => handleEditClick(salary.id)}><FontAwesomeIcon icon={faEdit} /> Edit</Button>{' '}
                                    <Button color="danger" onClick={() => handleDeleteSalary(salary.id)}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>

            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add Salary</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="employeeName">Employee Name</Label>
                        <Input type="text" name="employeeName" id="employeeName" value={newSalary.employeeName} onChange={handleChange} invalid={errors.employeeName} />
                        {errors.employeeName && <FormFeedback>{errors.employeeName}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="salaryAmount">Salary Amount</Label>
                        <Input type="number" name="salaryAmount" id="salaryAmount" value={newSalary.salaryAmount} onChange={handleChange} invalid={errors.salaryAmount} />
                        {errors.salaryAmount && <FormFeedback>{errors.salaryAmount}</FormFeedback>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddSalary}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit Salary</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="employeeName">Employee Name</Label>
                        <Input type="text" name="employeeName" id="employeeName" value={newSalary.employeeName} onChange={handleChange} invalid={errors.employeeName} />
                        {errors.employeeName && <FormFeedback>{errors.employeeName}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="salaryAmount">Salary Amount</Label>
                        <Input type="number" name="salaryAmount" id="salaryAmount" value={newSalary.salaryAmount} onChange={handleChange} invalid={errors.salaryAmount} />
                        {errors.salaryAmount && <FormFeedback>{errors.salaryAmount}</FormFeedback>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditSalary}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default SalarySection;
