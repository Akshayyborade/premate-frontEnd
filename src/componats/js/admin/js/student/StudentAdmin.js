import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdmissionDropoutGraph from '../chart/AdmissionDropoutGraph';
import RegistrationLinkForm from '../RegistrationLink';
import StudentAdmissionFormModal from './StudentAddmission';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../services/StudentAuthServices';
import { doLogOut } from '../services/AuthServices';
import EditStudentModel from './EditStudent';
import ApproveStudentModal from '../models/ApproveStudentModal';
import RejectStudentModal from '../models/RejectStudentModel';
import './studentAdmin.css';  // External CSS file

const StudentAdmin = ({ setMainContentComponent }) => {

  const [modals, setModals] = useState({
    isFormOpen: false,
    isEditStudent: false,
    isApproveOpen: false,
    isRejectOpen: false,
  });

  const toggleModal = (modalType) => {
    setModals({ ...modals, [modalType]: !modals[modalType] });
  };

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch student data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/student/getAllStudent');
        setStudents(response.data); 
      } catch (error) {
        if (error.response && error.response.status === 401) {
          doLogOut(() => navigate('/'));
        } else {
          console.error('Error fetching student data:', error);
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleStudentAction = (stud_id, actionType) => {
    const foundStudent = students.find(student => student.stud_id === stud_id);
    setSelectedStudent(foundStudent || null);
    toggleModal(actionType);
  };

  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <div className="admin-container">

        {/* Left Side: Cards in 4x4 grid */}
        <div className="cards-container">
          <div className="card-item">
            <h5>Total Students</h5>
            <strong>{students.length}</strong>
            <p className="text-muted">Application pending</p>
            <strong>{students.filter(student => !student.isactive).length}</strong>
          </div>

          <div className="card-item">
            <h5>Send Registration Link</h5>
            <RegistrationLinkForm />
          </div>

          <div className="card-item">
            <h5>Add Student</h5>
            <p className="text-muted">Add a student to the class.</p>
            <button className="btn btn-outline-primary" onClick={() => toggleModal('isFormOpen')}>Add</button>
          </div>

          <div className="card-item">
            <h5>Edit Student</h5>
            <p className="text-muted">Edit student information.</p>
            <button className="btn btn-outline-primary" onClick={() => toggleModal('isEditStudent')}>Edit</button>
          </div>
        </div>

        {/* Right Side: Chart */}
        <div className="chart-container">
          <AdmissionDropoutGraph />
        </div>

        {/* Bottom Section: Recent Activity */}
        <div className="activity-container">
          <h5>Recent Activity</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Standard</th>
                <th>Admission Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.stud_id}>
                  <td>{index + 1}</td>
                  <td>{student.name ? `${student.name.fname} ${student.name.lname}` : 'Name not provided'}</td>
                  <td>{student.grade?.gradeName || 'N/A'}</td>
                  <td>
                    {student.isactive ? <span className="badge badge-success">Admitted</span> : <span className="badge badge-danger">Not Admitted</span>}
                  </td>
                  <td>{student.dateOfAddmission}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleStudentAction(student.stud_id, 'isApproveOpen')}>Approve</button>
                    <button className="btn btn-danger" onClick={() => handleStudentAction(student.stud_id, 'isRejectOpen')}>Reject</button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        <StudentAdmissionFormModal isOpen={modals.isFormOpen} toggle={() => toggleModal('isFormOpen')} />
        <EditStudentModel isOpen={modals.isEditStudent} toggle={() => toggleModal('isEditStudent')} />
        <ApproveStudentModal 
          isOpen={modals.isApproveOpen} 
          toggle={() => toggleModal('isApproveOpen')} 
          studentData={selectedStudent} 
          onApprove={(approvedStudent) => {
            setStudents(students.map(student => student.stud_id === approvedStudent.stud_id ? { ...student, isactive: true } : student));
            toast.success(`Student ${approvedStudent.name?.fname} ${approvedStudent.name?.lname} approved successfully!`);
          }} 
        />
        <RejectStudentModal 
          isOpen={modals.isRejectOpen} 
          toggle={() => toggleModal('isRejectOpen')} 
          studentData={selectedStudent} 
          onReject={(rejectedStudent) => {
            setStudents(students.filter(student => student.stud_id !== rejectedStudent.stud_id));
            toast.error(`Student ${rejectedStudent.name?.fname} ${rejectedStudent.name?.lname} rejected successfully!`);
          }} 
        />
      </div>
    </>
  );
};

export default StudentAdmin;
