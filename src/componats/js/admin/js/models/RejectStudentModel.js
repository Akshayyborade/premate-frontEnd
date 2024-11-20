import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axiosInstance from '../services/StudentAuthServices';

const RejectStudentModal = ({ isOpen, toggle, studentData, onReject }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmRejection = async () => {
    setIsConfirming(true);
    try {
      // Call API to reject student (replace with your API call)
      const response = await axiosInstance.delete(`/student/deleteStudent/${studentData.stud_id}`);
      onReject(studentData); // Call parent function to handle success (optional)
      toggle(); // Close the modal
      setIsConfirming(false);
    } catch (error) {
      console.error('Error rejecting student:', error);
      // Display error message to admin
      setIsConfirming(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Reject Student</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to reject the following student?</p>
        <ul>
          <li>Name: {studentData?.name ? studentData?.name?.fname + ' ' + studentData?.name?.lname : 'Name not provided'}</li>
          <li>Standard: {studentData?.grade?.gradeName ? studentData?.grade?.gradeName : 'N/A'}</li>
          <li>Date of Admission: {studentData?.dateOfAddmission}</li>
          {/* Add other relevant student details here */}
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        {isConfirming ? (
          <Button color="danger" disabled>
            Rejecting...
          </Button>
        ) : (
          <Button color="danger" onClick={handleConfirmRejection}>
            Reject
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default RejectStudentModal;
