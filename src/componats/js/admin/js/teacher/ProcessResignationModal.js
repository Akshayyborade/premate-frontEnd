import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert, Input, FormGroup, Label, Badge, CustomInput } from 'reactstrap';

const ProcessResignationModal = ({ isOpen, toggle }) => {
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resignationDetails, setResignationDetails] = useState({
        employeeName: "John Doe",
        resignationDate: "",
        resignationReason: "",
        // Add more details as needed
    });
    const [selectedCandidate, setSelectedCandidate] = useState(""); // State to hold selected hiring candidate
    const [automatedChecks, setAutomatedChecks] = useState([
        { label: 'Resignation letter received', value: true },
        { label: 'Pending tasks transferred', value: true },
        { label: 'Exit interviews conducted', value: false }, // Simulating a failed condition
        { label: 'No outstanding issues', value: true }
        // Add more automated checks
    ]);

    useEffect(() => {
        // Fetch employee data from API or database
        const fetchEmployeeData = () => {
            // Simulating asynchronous API call
            setTimeout(() => {
                // Simulated employee details
                setResignationDetails(prevDetails => ({
                    ...prevDetails,
                    resignationDate: new Date().toISOString().slice(0, 10) // Current date
                }));
            }, 1000); // Simulate delay for async operation
        };

        // Fetch employee data when modal is opened
        if (isOpen) {
            fetchEmployeeData();
        }
    }, [isOpen]);

    const checkResignationConditions = () => {
        return new Promise((resolve, reject) => {
            // Simulating asynchronous checks
            setTimeout(() => {
                // Simulated conditions
                const allConditionsMet = automatedChecks.every(check => check.value);

                if (allConditionsMet) {
                    resolve();
                } else {
                    reject('Error: Not all conditions are met.');
                }
            }, 2000); // Simulate delay for async operation
        });
    };

    const handleProcessResignation = () => {
        setIsProcessing(true);
        checkResignationConditions()
            .then(() => {
                // All conditions are met, process resignation
                console.log('Resignation processed:', resignationDetails);
                console.log('resignation for:', selectedCandidate); // Log the selected hiring candidate
                setIsProcessing(false);
                toggle();
            })
            .catch((error) => {
                setError(error);
                setIsProcessing(false);
            });
    };

    const handleReasonChange = (e) => {
        const { value } = e.target;
        setResignationDetails(prevDetails => ({
            ...prevDetails,
            resignationReason: value
        }));
    };

    const handleCandidateChange = (e) => {
        setSelectedCandidate(e.target.value);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Process Resignation</ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">{error}</Alert>}
                <p>Processing a resignation is a serious action.</p>
                <p>Before proceeding, please review the details of the resignation and ensure all necessary steps have been taken.</p>
                <p><strong>Employee Name:</strong> {resignationDetails.employeeName}</p>
                <p><strong>Date of Resignation:</strong> {resignationDetails.resignationDate}</p>
                <FormGroup>
                    <Label for="selectCandidate">Select Initiated resignation of Candidate</Label>
                    <Input type="select" id="selectCandidate" value={selectedCandidate} onChange={handleCandidateChange}>
                        <option value="">Select candidate...</option>
                        <option value="Candidate 1">Candidate 1</option>
                        <option value="Candidate 2">Candidate 2</option>
                        {/* Add more options as needed */}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="resignationReason">Reason for Resignation</Label>
                    <Input type="textarea" name="resignationReason" id="resignationReason" value={resignationDetails.resignationReason} onChange={handleReasonChange} />
                </FormGroup>
                
                <p>Automated checks:</p>
                <ul>
                    {automatedChecks.map((check, index) => (
                        <li key={index}>
                            {check.label}: {' '}
                            {check.value ? <Badge color="success">Passed</Badge> : <Badge color="danger">Failed</Badge>}
                            {' '} {isProcessing && 'Checking...'}
                        </li>
                    ))}
                </ul>
                <p>Please confirm that you have reviewed these points before proceeding.</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleProcessResignation} disabled={isProcessing}>Process Resignation</Button>{' '}
                <Button color="secondary" onClick={toggle} disabled={isProcessing}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ProcessResignationModal;
