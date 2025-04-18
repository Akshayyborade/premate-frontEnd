import React, { useState } from 'react';
import { FaUpload, FaDownload, FaTrash } from 'react-icons/fa';
import Button from '../../../common/Button/Button';
import FileUpload from '../../../common/FileUpload/FileUpload';
import Modal from '../../../common/Modal/Modal';
import './BulkOperations.css';

const BulkOperations = ({ onSuccess }) => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setError(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload');
            return;
        }

        try {
            setUploadProgress(0);
            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);

            // Here you would typically make an API call to upload the file
            // await studentService.bulkUpload(selectedFile);
            
            setTimeout(() => {
                clearInterval(interval);
                setShowUploadModal(false);
                setSelectedFile(null);
                setUploadProgress(0);
                onSuccess?.();
            }, 2000);
        } catch (error) {
            setError('Failed to upload file. Please try again.');
            console.error('Upload error:', error);
        }
    };

    const handleBulkDelete = async () => {
        try {
            // Here you would typically make an API call to delete selected students
            // await studentService.bulkDelete(selectedStudents);
            setShowDeleteModal(false);
            onSuccess?.();
        } catch (error) {
            setError('Failed to delete students. Please try again.');
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="bulk-operations">
            <Button
                variant="outline"
                onClick={() => setShowUploadModal(true)}
                icon={<FaUpload />}
            >
                Bulk Upload
            </Button>
            <Button
                variant="outline"
                onClick={() => setShowDeleteModal(true)}
                icon={<FaTrash />}
            >
                Bulk Delete
            </Button>
            <Button
                variant="outline"
                onClick={() => {/* Implement download template */}}
                icon={<FaDownload />}
            >
                Download Template
            </Button>

            <Modal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                title="Bulk Upload Students"
            >
                <div className="upload-modal-content">
                    <FileUpload
                        onFileSelect={handleFileSelect}
                        accept=".csv,.xlsx"
                    />
                    {selectedFile && (
                        <div className="selected-file">
                            <p>Selected file: {selectedFile.name}</p>
                            <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                    )}
                    {uploadProgress > 0 && (
                        <div className="upload-progress">
                            <div 
                                className="progress-bar" 
                                style={{ width: `${uploadProgress}%` }}
                            />
                            <span>{uploadProgress}%</span>
                        </div>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <Button
                            variant="secondary"
                            onClick={() => setShowUploadModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleUpload}
                            disabled={!selectedFile || uploadProgress > 0}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Bulk Delete Students"
            >
                <div className="delete-modal-content">
                    <p>Are you sure you want to delete the selected students? This action cannot be undone.</p>
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <Button
                            variant="secondary"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleBulkDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BulkOperations; 