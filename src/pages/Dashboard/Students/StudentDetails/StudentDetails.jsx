import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../../../../services/api/student.service';
import Button from '../../../../components/common/Button/Button';
import Alert from '../../../../components/common/Alert/Alert';
import LoadingSpinner from '../../../../components/common/Spinner/Spinner';
import FileUpload from '../../../../components/common/FileUpload/FileUpload';
import Modal from '../../../../components/common/Modal/Modal';
import AttendanceChart from './AttendanceChart';
import FeeHistory from './FeeHistory';
import ProgressReport from './ProgressReport';
import './StudentDetails.css';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchStudentDetails();
        fetchDocuments();
    }, [id]);

    const fetchStudentDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await studentService.getStudentById(id);
            setStudent(data);
        } catch (error) {
            setError('Failed to fetch student details. Please try again.');
            console.error('Error fetching student details:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDocuments = async () => {
        try {
            const data = await studentService.getStudentDocuments(id);
            setDocuments(data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const handleDocumentUpload = async (file) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('studentId', id);
            formData.append('documentType', 'other'); // You might want to add a type selector

            await studentService.uploadDocument(formData);
            await fetchDocuments();
            setShowUploadModal(false);
        } catch (error) {
            setError('Failed to upload document. Please try again.');
            console.error('Error uploading document:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleDownloadDocument = async (documentId) => {
        try {
            const response = await studentService.downloadDocument(documentId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `document_${documentId}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError('Failed to download document. Please try again.');
            console.error('Error downloading document:', error);
        }
    };

    const handleDeleteDocument = async (documentId) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            try {
                await studentService.deleteDocument(documentId);
                await fetchDocuments();
            } catch (error) {
                setError('Failed to delete document. Please try again.');
                console.error('Error deleting document:', error);
            }
        }
    };

    if (loading && !student) {
        return <LoadingSpinner />;
    }

    if (!student) {
        return (
            <div className="error-container">
                <Alert type="error" message="Student not found" />
                <Button onClick={() => navigate('/admin/dashboard/students')}>
                    Back to Students
                </Button>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'fees', label: 'Fees' },
        { id: 'progress', label: 'Progress' },
        { id: 'documents', label: 'Documents' }
    ];

    return (
        <div className="student-details">
            {error && <Alert type="error" message={error} />}

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
                        onClick={() => navigate(`/admin/students/${id}/edit`)}
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
                                    <span>{student.parents.mobNo}</span>
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
                        <div className="documents-header">
                            <h3>Student Documents</h3>
                            <Button
                                variant="outline"
                                onClick={() => setShowUploadModal(true)}
                            >
                                Upload Document
                            </Button>
                        </div>
                        <div className="documents-grid">
                            {documents.map(doc => (
                                <div key={doc.id} className="document-card">
                                    <div className="document-info">
                                        <h4>{doc.name}</h4>
                                        <p>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="document-actions">
                                        <Button
                                            variant="text"
                                            onClick={() => handleDownloadDocument(doc.id)}
                                        >
                                            Download
                                        </Button>
                                        <Button
                                            variant="text"
                                            onClick={() => handleDeleteDocument(doc.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {documents.length === 0 && (
                                <p className="no-documents">No documents uploaded yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Modal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                title="Upload Document"
            >
                <div className="upload-modal-content">
                    <FileUpload
                        onFileSelect={handleDocumentUpload}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        loading={uploading}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default StudentDetails; 