import React, { useState } from 'react';
import { studentService } from '../../../../services/api/student.service';
import Button from '../../../common/Button';
import FileUpload from '../../../common/FileUpload';
import Modal from '../../../common/Modal';
import './BulkOperations.css';

const BulkOperations = ({ onSuccess }) => {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [importPreview, setImportPreview] = useState(null);

    const handleImport = async () => {
        if (!importFile) {
            setError('Please select a file to import');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', importFile);
            
            // First get preview
            const preview = await studentService.previewImport(formData);
            setImportPreview(preview);
            
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to import students');
        } finally {
            setLoading(false);
        }
    };

    const confirmImport = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', importFile);
            await studentService.bulkImport(formData);
            setIsImportModalOpen(false);
            onSuccess?.();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to import students');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            const blob = await studentService.bulkExport();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `students_${new Date().toISOString()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    const downloadTemplate = async () => {
        try {
            const blob = await studentService.downloadImportTemplate();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'student_import_template.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Template download failed:', error);
        }
    };

    return (
        <>
            <div className="bulk-operations">
                <Button 
                    variant="outline" 
                    onClick={() => setIsImportModalOpen(true)}
                >
                    Import Students
                </Button>
                <Button 
                    variant="outline"
                    onClick={handleExport}
                >
                    Export Students
                </Button>
            </div>

            <Modal
                isOpen={isImportModalOpen}
                onClose={() => {
                    setIsImportModalOpen(false);
                    setImportFile(null);
                    setError('');
                    setImportPreview(null);
                }}
                title="Import Students"
            >
                <div className="import-modal-content">
                    {!importPreview ? (
                        <>
                            <div className="import-instructions">
                                <h4>Instructions:</h4>
                                <ol>
                                    <li>Download the template file</li>
                                    <li>Fill in the student details</li>
                                    <li>Upload the completed file</li>
                                    <li>Review and confirm the import</li>
                                </ol>
                                <Button 
                                    variant="outline" 
                                    onClick={downloadTemplate}
                                >
                                    Download Template
                                </Button>
                            </div>

                            <FileUpload
                                label="Select Excel File"
                                accept=".xlsx,.xls"
                                onChange={setImportFile}
                                error={error}
                            />

                            {importFile && (
                                <div className="selected-file">
                                    <span>Selected: {importFile.name}</span>
                                    <Button 
                                        variant="text" 
                                        onClick={() => setImportFile(null)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="import-preview">
                            <h4>Preview Import Data</h4>
                            <div className="preview-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Total Records</span>
                                    <span className="stat-value">{importPreview.totalRecords}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Valid Records</span>
                                    <span className="stat-value success">
                                        {importPreview.validRecords}
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Invalid Records</span>
                                    <span className="stat-value error">
                                        {importPreview.invalidRecords}
                                    </span>
                                </div>
                            </div>

                            {importPreview.invalidRecords > 0 && (
                                <div className="validation-errors">
                                    <h5>Validation Errors:</h5>
                                    <ul>
                                        {importPreview.errors.map((error, index) => (
                                            <li key={index}>
                                                Row {error.row}: {error.message}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="preview-table">
                                <table>
                                    <thead>
                                        <tr>
                                            {importPreview.headers.map((header) => (
                                                <th key={header}>{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importPreview.data.slice(0, 5).map((row, index) => (
                                            <tr key={index}>
                                                {Object.values(row).map((cell, cellIndex) => (
                                                    <td key={cellIndex}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {importPreview.data.length > 5 && (
                                    <div className="preview-more">
                                        And {importPreview.data.length - 5} more records...
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="modal-actions">
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                if (importPreview) {
                                    setImportPreview(null);
                                } else {
                                    setIsImportModalOpen(false);
                                }
                            }}
                        >
                            {importPreview ? 'Back' : 'Cancel'}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={importPreview ? confirmImport : handleImport}
                            isLoading={loading}
                            disabled={!importFile}
                        >
                            {importPreview ? 'Confirm Import' : 'Preview Import'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default BulkOperations; 