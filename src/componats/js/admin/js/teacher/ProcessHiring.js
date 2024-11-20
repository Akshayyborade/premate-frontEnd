import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Alert, Badge } from 'reactstrap';

const ProcessHiringModal = ({ isOpen, toggle }) => {
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(""); 
    const [registeredCandidates, setRegisteredCandidates] = useState([
        { id: 1, name: "Candidate 1", status: "Pending", documentsSubmitted: true, salaryInitiated: true, demoLectureDone: true },
        { id: 2, name: "Candidate 2", status: "Pending", documentsSubmitted: false, salaryInitiated: true, demoLectureDone: true },
        // Add more candidates as needed
    ]);

    useEffect(() => {
        // Fetch registered candidates data from API or database
        // Simulating asynchronous API call
        setTimeout(() => {
            // Simulated data fetch
            console.log("Registered candidates fetched:", registeredCandidates);
        }, 1000); // Simulate delay for async operation
    }, []);

    const handleApproveCandidate = () => {
        const candidate = registeredCandidates.find(candidate => candidate.id === selectedCandidate);
    if (candidate) {
        if (!candidate.documentsSubmitted || !candidate.salaryInitiated || !candidate.demoLectureDone) {
            setError("Some required steps are pending for this candidate.");
            return;
        }
    } else {
        setError("Please select a valid candidate.");
        return;
    }
        setIsProcessing(true);
        // Simulate API call or processing
        setTimeout(() => {
            // Simulated success
            const updatedCandidates = registeredCandidates.map(candidate =>
                candidate.id === selectedCandidate ? { ...candidate, status: "Approved" } : candidate
            );
            setRegisteredCandidates(updatedCandidates);
            setIsProcessing(false);
            setError(null);
            toggle();
        }, 2000);
    };

    const handleCandidateChange = (e) => {
        setSelectedCandidate(parseInt(e.target.value));
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Process Hiring</ModalHeader>
            <ModalBody>
                {error && <Alert color="danger">{error}</Alert>}
                <FormGroup>
                    <Label for="selectCandidate">Select Candidate</Label>
                    <Input type="select" id="selectCandidate" value={selectedCandidate} onChange={handleCandidateChange}>
                        <option value="">Select a candidate to approve...</option>
                        {registeredCandidates.map(candidate => (
                            <option key={candidate.id} value={candidate.id}>{candidate.name} - {candidate.status}</option>
                        ))}
                    </Input>
                </FormGroup>
                {selectedCandidate && (
                    <div>
                        <p>Status:</p>
                        <ul>
                            <li>Documents Submitted: <Badge color={registeredCandidates[selectedCandidate - 1].documentsSubmitted ? "success" : "danger"}>{registeredCandidates[selectedCandidate - 1].documentsSubmitted ? "Done" : "Pending"}</Badge></li>
                            <li>Salary Initiated: <Badge color={registeredCandidates[selectedCandidate - 1].salaryInitiated ? "success" : "danger"}>{registeredCandidates[selectedCandidate - 1].salaryInitiated ? "Done" : "Pending"}</Badge></li>
                            <li>Demo Lecture Done: <Badge color={registeredCandidates[selectedCandidate - 1].demoLectureDone ? "success" : "danger"}>{registeredCandidates[selectedCandidate - 1].demoLectureDone ? "Done" : "Pending"}</Badge></li>
                            {/* Add more status items as needed */}
                        </ul>
                    </div>
                )}
                <p>Please select a candidate to view their status for hiring.</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleApproveCandidate} disabled={isProcessing || !selectedCandidate}>Approve Candidate</Button>{' '}
                <Button color="secondary" onClick={toggle} disabled={isProcessing}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ProcessHiringModal;
