import React, { useState } from "react";
import Modal from "react-modal";
import './PreviewModal.css'

// Utility function for rendering different layout types
const renderSection = (section) => {
    switch (section.layout) {
        case "Bullets":
            return (
                <ul className="section-list bullets-layout">
                    {section.subsections.map((subsection, i) => (
                        <li key={i} className="section-list-item">
                            <div className="question-info">
                                <span className="question-number">{i + 1}.</span>
                                <span className="question-type">{subsection.type} Question</span>
                                <span className="question-marks">({subsection.marksPerQuestion} marks)</span>
                            </div>
                            {subsection.guidelines && (
                                <p className="question-guidelines">
                                    <em>Guidelines: {subsection.guidelines}</em>
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            );

        case "Table":
            return (
                <table className="section-table">
                    <thead>
                        <tr>
                            <th>Question #</th>
                            <th>Type</th>
                            <th>Marks</th>
                            <th>Guidelines</th>
                        </tr>
                    </thead>
                    <tbody>
                        {section?.subsections.map((subsection, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{subsection.type}</td>
                                <td>{subsection.marksPerQuestion}</td>
                                <td>{subsection.guidelines || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );

        case "Paragraph":
            return (
                <div className="section-paragraph">
                    {section?.subsections.map((subsection, i) => (
                        <div key={i} className="paragraph-question">
                            <p>
                                <strong>{i + 1}.</strong> {subsection.type} Question 
                                <span className="question-marks">({subsection.marksPerQuestion} marks)</span>
                            </p>
                            {subsection.guidelines && (
                                <p className="question-guidelines">
                                    <em>Guidelines: {subsection.guidelines}</em>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            );

        case "Grid":
            return (
                <div className="section-grid">
                    {section?.subsections.map((subsection, i) => (
                        <div key={i} className="grid-question-card">
                            <div className="grid-question-header">
                                <span className="question-number">{i + 1}</span>
                                <span className="question-type">{subsection.type}</span>
                            </div>
                            <div className="grid-question-details">
                                <p>Marks: {subsection.marksPerQuestion}</p>
                                {subsection.guidelines && (
                                    <p className="question-guidelines">
                                        Guidelines: {subsection.guidelines}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            );

        default:
            return <div className="no-layout">No specific layout selected</div>;
    }
};

const PreviewModal = ({ 
    sections, 
    paperDetails, 
    onClose, 
    onPrint, 
    onDownload 
}) => {
    const [activeTab, setActiveTab] = useState('preview');

    // Calculated Paper Statistics
    const calculatePaperStatistics = () => {
        const totalQuestions = sections?.reduce((total, section) => 
            total + section?.subsections?.length, 0);
        
        const totalMarks = sections?.reduce((total, section) => 
            total + section?.subsections.reduce((sectionTotal, subsection) => 
                sectionTotal + subsection?.marksPerQuestion, 0), 0);

        return { totalQuestions, totalMarks };
    };

    const paperStats = calculatePaperStatistics();

    // Modal Styling
    const customModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '12px',
            padding: '20px'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        }
    };

    return (
        <Modal 
            isOpen={true} 
            onRequestClose={onClose}
            style={customModalStyles}
            contentLabel="Exam Paper Preview"
        >
            <div className="preview-modal-container">
                {/* Header Section */}
                <div className="modal-header">
                    <h2>{paperDetails?.title}</h2>
                    <div className="modal-tabs">
                        <button 
                            className={activeTab === 'preview' ? 'active' : ''}
                            onClick={() => setActiveTab('preview')}
                        >
                            Preview
                        </button>
                        <button 
                            className={activeTab === 'details' ? 'active' : ''}
                            onClick={() => setActiveTab('details')}
                        >
                            Paper Details
                        </button>
                    </div>
                </div>

                {/* Content Based on Active Tab */}
                {activeTab === 'preview' ? (
                    <div className="preview-content">
                        <div className="paper-metadata">
                            <div className="metadata-item">
                                <strong>School:</strong> {paperDetails?.schoolName}
                            </div>
                            <div className="metadata-item">
                                <strong>Standard:</strong> {paperDetails?.standard}
                            </div>
                            <div className="metadata-item">
                                <strong>Subject:</strong> {paperDetails?.subject}
                            </div>
                            <div className="metadata-item">
                                <strong>Language:</strong> {paperDetails?.language}
                            </div>
                        </div>

                        {sections?.map((section, index) => (
                            <div key={index} className="section-preview">
                                <h3>Section {index + 1}: {section?.title || "Untitled Section"}</h3>
                                {section?.instructions && (
                                    <p className="section-instructions">
                                        <em>{section?.instructions}</em>
                                    </p>
                                )}
                                {renderSection(section)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="paper-details">
                        <h3>Paper Configuration</h3>
                        <div className="details-grid">
                            <div>
                                <strong>Total Questions:</strong> {paperStats?.totalQuestions}
                            </div>
                            <div>
                                <strong>Total Marks:</strong> {paperStats?.totalMarks}
                            </div>
                            <div>
                                <strong>Timing:</strong> {paperDetails?.timing}
                            </div>
                            <div>
                                <strong>Watermark:</strong> {paperDetails?.watermark}
                            </div>
                        </div>
                        <h4>General Instructions</h4>
                        <p>{paperDetails?.instructions}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="modal-actions">
                    {onPrint && (
                        <button 
                            onClick={onPrint} 
                            className="action-button print-button"
                        >
                            Print
                        </button>
                    )}
                    {onDownload && (
                        <button 
                            onClick={onDownload} 
                            className="action-button download-button"
                        >
                            Download
                        </button>
                    )}
                    <button 
                        onClick={onClose} 
                        className="action-button close-button"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default PreviewModal;