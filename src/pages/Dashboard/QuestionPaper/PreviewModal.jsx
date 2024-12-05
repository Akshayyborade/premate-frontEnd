import React, { useState } from "react";
import Modal from "react-modal";
import './PreviewModal.css';

/**
 * PreviewModal Component
 * 
 * Displays a preview of the generated question paper with different layout options.
 * Features:
 * - Multiple layout views (preview and details)
 * - Section-wise question display
 * - Paper metadata display
 * 
 * @param {Object} props
 * @param {Array} props.sections - Array of paper sections
 * @param {Object} props.paperDetails - Paper configuration details
 * @param {Function} props.onClose - Handler for modal close
 */
const PreviewModal = ({ sections, paperDetails, onClose }) => {
    // -----------------------------
    // State Management
    // -----------------------------
    const [activeTab, setActiveTab] = useState('preview');

    // -----------------------------
    // Layout Rendering Functions
    // -----------------------------
    
    // Utility function for rendering different layout types
    const renderSection = (section) => {
        switch (section.layout) {
            case "Bullets":
                return renderBulletsLayout(section);
            case "Table":
                return renderTableLayout(section);
            case "Paragraph":
                return renderParagraphLayout(section);
            case "Grid":
                return renderGridLayout(section);
            default:
                return <div className="no-layout">No specific layout selected</div>;
        }
    };

    // Bullets Layout
    const renderBulletsLayout = (section) => (
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

    // Table Layout
    const renderTableLayout = (section) => (
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

    // Paragraph Layout
    const renderParagraphLayout = (section) => (
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

    // Grid Layout
    const renderGridLayout = (section) => (
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

    // -----------------------------
    // Render Component
    // -----------------------------
    return (
        <Modal 
            isOpen={true} 
            onRequestClose={onClose}
            className="preview-modal"
            overlayClassName="preview-modal-overlay"
        >
            <div className="preview-modal-container">
                {/* Modal Header */}
                <div className="modal-header">
                    <h2>{paperDetails?.title || 'Question Paper Preview'}</h2>
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

                {/* Modal Content */}
                {activeTab === 'preview' ? (
                    <div className="preview-content">
                        {/* Paper Metadata */}
                        <div className="paper-metadata">
                            {paperDetails?.schoolName && (
                                <div className="metadata-item">
                                    <strong>School:</strong> {paperDetails.schoolName}
                                </div>
                            )}
                            {paperDetails?.standard && (
                                <div className="metadata-item">
                                    <strong>Standard:</strong> {paperDetails.standard}
                                </div>
                            )}
                            {paperDetails?.subject && (
                                <div className="metadata-item">
                                    <strong>Subject:</strong> {paperDetails.subject}
                                </div>
                            )}
                            {paperDetails?.language && (
                                <div className="metadata-item">
                                    <strong>Language:</strong> {paperDetails.language}
                                </div>
                            )}
                        </div>

                        {/* Sections Preview */}
                        {sections?.map((section, index) => (
                            <div key={index} className="section-preview">
                                <h3>Section {index + 1}: {section?.title || "Untitled Section"}</h3>
                                {section?.instructions && (
                                    <p className="section-instructions">
                                        <em>{section.instructions}</em>
                                    </p>
                                )}
                                {renderSection(section)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="paper-details">
                        <h3>Paper Configuration</h3>
                        {/* Add detailed paper configuration view here */}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default PreviewModal;