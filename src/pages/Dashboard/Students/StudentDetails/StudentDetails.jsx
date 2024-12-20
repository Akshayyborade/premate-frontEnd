import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../../../../services/api/student.service';
import Button from '../../../../components/common/Button/Button';
import AttendanceChart from './AttendanceChart';
import FeeHistory from './FeeHistory';
import ProgressReport from './ProgressReport';
import './StudentDetails.css';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchStudentDetails();
    }, [id]);

    const fetchStudentDetails = async () => {
        try {
            const data = await studentService.getStudentById(id);
            setStudent(data);
        } catch (error) {
            console.error('Error fetching student details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!student) return <div>Student not found</div>;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'fees', label: 'Fees' },
        { id: 'progress', label: 'Progress' },
        { id: 'documents', label: 'Documents' }
    ];

    return (
        <div className="student-details">
            <div className="details-header">
                <div className="student-profile">
                    <div className="student-avatar">
                        {student.photo ? (
                            <img src={student.photo} alt={`${student.name.fname} ${student.name.lname}`} />
                        ) : (
                            <span>{student.name.fname.charAt(0)}</span>
                        )}
                    </div>
                    <div className="student-info">
                        <h1>{`${student.name.fname} ${student.name.lname}`}</h1>
                        <div className="student-meta">
                            <span>ID: {student.stud_id}</span>
                            <span>Course: {student.grade.gradeName}</span>
                            <span>Batch: {student.grade.batch || 'N/A'}</span>
                            <span className={`status ${student.isactive ? 'active' : 'inactive'}`}>
                                {student.isactive ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="details-actions">
                    <Button
                        variant="outline"
                        onClick={() => {
                            console.log(`Navigating to edit for student ID: ${id}`);
                            navigate(`/admin/students/${id}/edit`);
                        }}
                    >
                        Edit
                    </Button>
                    <Button variant="primary">
                        Download Report
                    </Button>
                </div>
            </div>

            <div className="details-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="details-content">
                {activeTab === 'overview' && (
                    <div className="overview-grid">
                        <div className="info-card">
                            <h3>Personal Information</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Date of Birth</label>
                                    <span>{student.dobDate}</span>
                                </div>
                                <div className="info-item">
                                    <label>Gender</label>
                                    <span>{student.gender}</span>
                                </div>
                                <div className="info-item">
                                    <label>Email</label>
                                    <span>{student.email}</span>
                                </div>
                                <div className="info-item">
                                    <label>Phone</label>
                                    <span>{student.mobNumber}</span>
                                </div>
                                <div className="info-item">
                                    <label>Address</label>
                                    <span>{`${student.address?.city}, ${student.address?.state}, ${student.address?.zip}`}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Parent/Guardian Information</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Parent Name</label>
                                    <span>{student.parents.parentName}</span>
                                </div>
                                <div className="info-item">
                                    <label>Parent Phone</label>
                                    <span>{student.parents.mobNo}</span>
                                </div>
                                <div className="info-item">
                                    <label>Emergency Contact</label>
                                    <span>{student.parents.mobNo}</span> {/* Assuming this is the emergency contact */}
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Academic Information</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Admission Date</label>
                                    <span>{student.dateOfAddmission}</span>
                                </div>
                                <div className="info-item">
                                    <label>Previous School</label>
                                    <span>{student.schoolName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'attendance' && (
                    <AttendanceChart studentId={id} />
                )}

                {activeTab === 'fees' && (
                    <FeeHistory studentId={id} />
                )}

                {activeTab === 'progress' && (
                    <ProgressReport studentId={id} />
                )}

                {activeTab === 'documents' && (
                    <div className="documents-section">
                        {/* Documents section implementation */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDetails; 