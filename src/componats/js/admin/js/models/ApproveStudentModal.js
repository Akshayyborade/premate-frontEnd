import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axiosInstance from '../services/StudentAuthServices';
import { useNavigate } from 'react-router-dom';
import { doLogOut } from '../services/AuthServices';

const ApproveStudentModal = ({ isOpen, toggle, studentData, onApprove }) => {
    const navigate = useNavigate();
    const [isConfirming, setIsConfirming] = useState(false);
    

  const handleConfirmApproval = async () => {
    setIsConfirming(true);
    try {

      const updatedStudent = { ...studentData, isactive: true };
      // Call API to update student status (replace with your API call)
      const response = await axiosInstance.put(`/student/updateStudent/${studentData.stud_id}`, updatedStudent);
      onApprove(studentData); // Call parent function to handle success (optional)
      setIsConfirming(false);
      toggle(); // Close the modal
          } catch (error) {
       
      console.error('Error approving student:', error);
      // Display error message to admin
      setIsConfirming(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Approve Student</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to approve the following student?</p>
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
          <Button color="primary" disabled>
            Confirming...
          </Button>
        ) : (
          <Button color="primary" onClick={handleConfirmApproval}>
            Approve
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ApproveStudentModal;
