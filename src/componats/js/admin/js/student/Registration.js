import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup, Table, Badge } from 'reactstrap';
import AdmissionDropoutGraph from '../chart/AdmissionDropoutGraph';
import RegistrationLinkForm from '../RegistrationLink';
import StudentAdmissionFormModal from './StudentAddmission'; // Import the modal component
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../services/StudentAuthServices';
import { doLogOut } from '../services/AuthServices';
import { Navigate, useNavigate } from 'react-router-dom';
import EditStudentModel from './EditStudent';
import ApproveStudentModal from '../models/ApproveStudentModal';
import RejectStudentModal from '../models/RejectStudentModel';

const Registration = ({ setMainContentComponent }) => {

  //////////models handling code////////////
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control form/modal visibility
  const [isEditStudent, setIsEditStudent] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  //////////////////////////////////////////
  const navigate = useNavigate();

  const [students, setStudents] = useState([]); // State variable for fetched data
  const [selectedStudent, setSelectedStudent] = useState(null); // Selected student for approval

  // Consider removing these state variables if not used in JSX
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/student/getAllStudent');
        const studentsData = response.data;

        // ... sorting logic (if applicable)

        setStudents(studentsData);
        console.log(studentsData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle 401 error: trigger logout functionality
          doLogOut(() => {
            navigate('/');
          });
        } else {
          console.error('Error fetching data:', error);
          // Optionally display a user-friendly error message to the user
        }
      }
    };

    fetchData();
  }, []);

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen); // Toggle form/modal visibility (defined in StudentAdmissionFormModal)
  };

  const handleEditStudent = () => {
    setIsEditStudent(!isEditStudent); // Toggle edit modal visibility (defined in EditStudentModel)
  };

  const handleRejectToggle = (stud_id) => {
    const foundStudent = students.find(student => student.stud_id === stud_id);
    setSelectedStudent(foundStudent || null);
    setIsRejectOpen(!isRejectOpen)// Set selectedStudent or null if not found
  }

  const handleApprovalToggle = (stud_id) => {
    const foundStudent = students.find(student => student.stud_id === stud_id);
    setSelectedStudent(foundStudent || null); // Set selectedStudent or null if not found
    setIsApproveOpen(!isApproveOpen); // Toggle approval modal visibility (defined in ApproveStudentModal)
  };

  // Consider handling form submission logic here (if needed)
  const handleFormSubmit = () => {
    setMainContentComponent('AddmissionForm');
  };
  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <Container className='p-5 styled-element' style={{ backgroundColor: 'whitesmoke', maxHeight: "80vh", overflow: 'scroll', minHeight: '80vh', }}  >


        <Row>
          <Col>
            <Row className='md-10'>
              <Col className='p-3'>
                <Card className='drop-shadow border-0  mx-auto' style={{ boxShadow: 'inherit' }}>
                  <CardBody>
                    <CardTitle tag="h5">Total Students</CardTitle>
                    <strong style={{ fontSize: '21px' }}>{students.length}</strong>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">Application pending</CardSubtitle>
                    <strong style={{ fontSize: '21px' }}>{students.filter(student => !student.isactive).length}</strong>
                  </CardBody>
                </Card>
              </Col>
              <Col className='p-3'>
                <Card className='drop-shadow border-0  mx-auto' style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  <CardBody>
                    <CardTitle tag="h5">Send Registration Link</CardTitle>
                    <RegistrationLinkForm />
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
                    <Button color="success" size='sm' outline onClick={handleEditStudent}>Edit</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            <AdmissionDropoutGraph />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className='drop-shadow' style={{ maxHeight: 'inherit', overflow: 'scroll' }}>
              <CardBody>
                <CardTitle tag="h5">Recent Activity</CardTitle>
                <Table bordered responsive striped hover> {/* Added responsive and hover classes */}
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
                    {students.map((student, index) => (
                      <tr key={student.stud_id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {student.name ? student.name.fname + ' ' + student.name.lname : 'Name not provided'}
                        </td>
                        <td>{student.grade.gradeName ? student.grade.gradeName : 'N/A'}</td>
                        <td>
                          {student.isactive ? (
                            <Badge color={"success"} pill>{"Admitted"}</Badge>
                          ) : (
                            <Badge color={"danger"} pill>{"Not Admitted"}</Badge>
                          )}
                        </td>
                        <td>{student.dateOfAddmission}</td>
                        <td>
                          <ButtonGroup>
                            <Button color="outline-success" onClick={() => handleApprovalToggle(student.stud_id)}>Approved</Button>
                            <Button color="outline-danger" onClick={() => handleRejectToggle(student.stud_id)}>Rejected</Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                    {students.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>
                          No data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Student Admission Form Modal */}
        <StudentAdmissionFormModal isOpen={isFormOpen} toggle={handleFormToggle} />
        <EditStudentModel isOpen={isEditStudent} toggle={handleEditStudent} />
        <ApproveStudentModal isOpen={isApproveOpen} toggle={handleApprovalToggle} studentData={selectedStudent} onApprove={(approvedStudent) => {
          // Update students state and display success message
          setStudents(prevStudents => prevStudents.map(student => {
            if (student.stud_id === approvedStudent.stud_id) {
              return { ...student, isActive: true }; // Update only the approved student
            } else {
              return student;
            }
          }));
          toast.success(`Student ${approvedStudent.name?.fname} ${approvedStudent.name?.lname} approved successfully!`);
        }} />
        <RejectStudentModal isOpen={isRejectOpen} toggle={handleRejectToggle} studentData={selectedStudent} onReject={(rejectedStudent) => {
          setStudents(prevStudents => prevStudents.filter(student => student.stud_id !== rejectedStudent.stud_id));
          toast.error(`Student ${rejectedStudent.name?.fname} ${rejectedStudent.name?.lname} rejected successfully!`);
        }} />
      </Container></>
  );
};

export default Registration;
