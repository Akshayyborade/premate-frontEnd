import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert, FormGroup, Label, Input, Badge } from 'reactstrap';

const ProcessTerminationModal = ({ isOpen, toggle }) => {
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [terminationReason, setTerminationReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const employeeDetails = {
        employeeName: "Jane Smith",
        terminationDate: "2024-02-28",
        // Add more details as needed
    };

    const checkTerminationConditions = () => {
        return new Promise((resolve, reject) => {
            // Simulating asynchronous checks
            setTimeout(() => {
                // Simulated conditions
                const conditions = [
                    { label: 'Exit interviews conducted', value: true },
                    { label: 'Final paycheck issued', value: true },
                    { label: 'Equipment returned', value: false }, // Simulating a failed condition
                    { label: 'Access revoked', value: true }
                ];

                // Check if all conditions are met
                const allConditionsMet = conditions.every(condition => condition.value);

                if (allConditionsMet) {
                    resolve();
                } else {
                    reject('Error: Not all conditions are met.');
                }
            }, 2000); // Simulate delay for async operation
        });
    };

    const handleProcessTermination = () => {
        setIsProcessing(true);
        checkTerminationConditions()
            .then(() => {
                // All conditions are met, process termination
                console.log('Termination processed:', employeeDetails);
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
        setTerminationReason(value);
        if (value !== 'Other') {
            setOtherReason('');
        }
    };

    const handleOtherReasonChange = (e) => {
        setOtherReason(e.target.value);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Process Termination</ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">{error}</Alert>}
                <p>Processing an employee termination is a serious action.</p>
                <p>Before proceeding, please review the details of the employee and ensure all necessary steps have been taken.</p>
                {employeeDetails && (
                    <>
                        <p><strong>Employee Name:</strong> {employeeDetails.employeeName}</p>
                        <p><strong>Date of Termination:</strong> {employeeDetails.terminationDate}</p>
                        {/* Add more details as needed */}
                    </>
                )}
                <FormGroup>
                    <Label for="terminationReason">Termination Reason</Label>
                    <Input type="select" name="terminationReason" id="terminationReason" value={terminationReason} onChange={handleReasonChange}>
                        <option value="">Select a reason</option>
                        <option value="Performance">Performance</option>
                        <option value="Misconduct">Misconduct</option>
                        <option value="Other">Other</option>
                    </Input>
                    {terminationReason === 'Other' && (
                        <Input type="text" name="otherReason" placeholder="Please specify" value={otherReason} onChange={handleOtherReasonChange} />
                    )}
                </FormGroup>
                <p>Automated checks:</p>
                <ul>
                    <li>Exit interviews conducted: <Badge color={isProcessing ? 'secondary' : 'success'}>{isProcessing ? 'Checking...' : 'Yes'}</Badge></li>
                    <li>Final paycheck issued: <Badge color={isProcessing ? 'secondary' : 'success'}>{isProcessing ? 'Checking...' : 'Yes'}</Badge></li>
                    <li>Equipment returned: <Badge color={isProcessing ? 'secondary' : 'danger'}>{isProcessing ? 'Checking...' : 'No'}</Badge></li>
                    <li>Access revoked: <Badge color={isProcessing ? 'secondary' : 'success'}>{isProcessing ? 'Checking...' : 'Yes'}</Badge></li>
                </ul>
                <p>Please confirm that you have reviewed these points before proceeding.</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleProcessTermination} disabled={isProcessing}>Process Termination</Button>{' '}
                <Button color="secondary" onClick={toggle} disabled={isProcessing}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ProcessTerminationModal;
