import React, { useState } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'; // Assuming you're using Reactstrap for UI components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const TeacherAttendance = () => {
    const [attendance, setAttendance] = useState([]); // State to store attendance data
    const [leaveRequests, setLeaveRequests] = useState([]); // State to store leave requests
    const [modal, setModal] = useState(false); // State for leave request modal
    const [selectedTeacher, setSelectedTeacher] = useState(null); // State for the selected teacher in leave request
 
    const [startDate, setStartDate] = useState(''); // State for start date in leave request form
    const [endDate, setEndDate] = useState(''); // State for end date in leave request form
 // Define teacherId state variable
 const [teacherId, setTeacherId] = useState(123); // Default value, replace with actual logic to fetch or set teacherId


    // Function to toggle the leave request modal
    const toggleModal = (teacherId) => {
        setModal(!modal);
        setSelectedTeacher(teacherId);
    };

    // Function to record teacher attendance
    const recordAttendance = (teacherId) => {
        // Logic to record attendance for the specified teacher
        const newAttendanceRecord = {
            teacherId: teacherId,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            status: 'Present' // Defaulting to 'Present', can be modified based on UI or business logic
        };
        setAttendance([...attendance, newAttendanceRecord]); // Update attendance state
    };

    // Function to handle leave requests
    const requestLeave = () => {
        // Logic to handle leave request
        // This can include validating leave dates, adding the request to the database, etc.
        // For simplicity, we'll just add the request to state here
        const newLeaveRequest = {
            teacherId: selectedTeacher,
            startDate: startDate,
            endDate: endDate,
            status: 'Pending' // Defaulting to 'Pending', can be updated based on approval/rejection
        };
        setLeaveRequests([...leaveRequests, newLeaveRequest]);
        toggleModal(); // Close the modal after submitting the request
    };

    // Function to approve or reject leave requests
    const handleLeaveStatusChange = (index, status) => {
        // Logic to update leave request status
        const updatedRequests = [...leaveRequests];
        updatedRequests[index].status = status;
        setLeaveRequests(updatedRequests);
    };

    return (
        <div>
            <h2>Teacher Attendance</h2>
            <Button onClick={() => recordAttendance(teacherId)}>Record Attendance</Button>

            <h3>Attendance Records</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Teacher ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((record, index) => (
                        <tr key={index}>
                            <td>{record.teacherId}</td>
                            <td>{record.date}</td>
                            <td>{record.time}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h3>Leave Management</h3>
            <Button onClick={() => toggleModal(teacherId)}>Request Leave</Button>

            {/* Leave request modal */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Request Leave</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="startDate"><FontAwesomeIcon icon={faCalendarAlt} /> Start Date</Label>
                            <Input type="date" id="startDate" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="endDate"><FontAwesomeIcon icon={faCalendarAlt} /> End Date</Label>
                            <Input type="date" id="endDate" />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={requestLeave}>Submit Request</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* Leave requests table */}
            <Table>
                <thead>
                    <tr>
                        <th>Teacher ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request, index) => (
                        <tr key={index}>
                            <td>{request.teacherId}</td>
                            <td>{request.startDate}</td>
                            <td>{request.endDate}</td>
                            <td>{request.status}</td>
                            <td>
                                {request.status === 'Pending' && (
                                    <div>
                                        <Button color="success" onClick={() => handleLeaveStatusChange(index, 'Approved')}><FontAwesomeIcon icon={faCheckCircle} /></Button>{' '}
                                        <Button color="danger" onClick={() => handleLeaveStatusChange(index, 'Rejected')}><FontAwesomeIcon icon={faTimesCircle} /></Button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TeacherAttendance;
