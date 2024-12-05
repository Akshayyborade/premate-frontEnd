import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Spin, message } from 'antd';
import { PrinterOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import './QuestionPaperPreview.css';

/**
 * QuestionPaperPreview Component
 * 
 * Displays a preview of the generated question paper with options to print and download.
 * Features:
 * - Paper preview in different formats
 * - Print functionality
 * - Download options
 * - Edit capabilities
 */
const QuestionPaperPreview = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // -----------------------------
    // State Management
    // -----------------------------
    const [paperData, setPaperData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewMode, setPreviewMode] = useState('formatted'); // 'formatted' or 'raw'

    // -----------------------------
    // Data Fetching
    // -----------------------------
    const fetchPaperData = useCallback(async () => {
        try {
            setLoading(true);
            // TODO: Replace with actual API call
            const response = await fetch(`/api/papers/${id}`);
            const data = await response.json();
            setPaperData(data);
        } catch (error) {
            message.error('Failed to fetch paper data');
            console.error('Error fetching paper data:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPaperData();
    }, [fetchPaperData]);

    // -----------------------------
    // Action Handlers
    // -----------------------------
    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    const handleDownload = async (format) => {
        try {
            // TODO: Implement download functionality
            message.success(`Paper downloaded in ${format} format`);
        } catch (error) {
            message.error('Failed to download paper');
            console.error('Error downloading paper:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/admin/exams/${id}/edit`);
    };

    // -----------------------------
    // Render Helpers
    // -----------------------------
    const renderHeader = () => (
        <div className="paper-header">
            <div className="school-info">
                <h1>{paperData?.schoolName}</h1>
                <p>{paperData?.address}</p>
            </div>
            <div className="exam-info">
                <h2>{paperData?.examName}</h2>
                <p>Class: {paperData?.class}</p>
                <p>Subject: {paperData?.subject}</p>
                <p>Time: {paperData?.duration}</p>
                <p>Maximum Marks: {paperData?.totalMarks}</p>
            </div>
        </div>
    );

    const renderInstructions = () => (
        <div className="instructions">
            <h3>General Instructions:</h3>
            <ul>
                {paperData?.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ul>
        </div>
    );

    const renderSection = (section, index) => (
        <div key={index} className="paper-section">
            <h3>Section {String.fromCharCode(65 + index)}</h3>
            {section.instructions && (
                <p className="section-instructions">{section.instructions}</p>
            )}
            <div className="questions">
                {section.questions.map((question, qIndex) => (
                    <div key={qIndex} className="question">
                        <div className="question-number">{qIndex + 1}.</div>
                        <div className="question-content">
                            <div className="question-text">{question.text}</div>
                            {question.type === 'MCQ' && (
                                <div className="options">
                                    {question.options.map((option, oIndex) => (
                                        <div key={oIndex} className="option">
                                            {String.fromCharCode(97 + oIndex)}) {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {question.marks && (
                                <div className="marks">[{question.marks} marks]</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // -----------------------------
    // Main Render
    // -----------------------------
    if (loading) {
        return (
            <div className="loading-container">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="question-paper-preview">
            {/* Action Buttons */}
            <div className="preview-actions">
                <Button 
                    icon={<PrinterOutlined />} 
                    onClick={handlePrint}
                >
                    Print
                </Button>
                <Button 
                    icon={<DownloadOutlined />} 
                    onClick={() => handleDownload('pdf')}
                >
                    Download PDF
                </Button>
                <Button 
                    icon={<EditOutlined />} 
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            </div>

            {/* Preview Content */}
            <Card className="preview-content">
                {renderHeader()}
                {renderInstructions()}
                <div className="paper-content">
                    {paperData?.sections.map((section, index) => 
                        renderSection(section, index)
                    )}
                </div>
            </Card>
        </div>
    );
};

export default QuestionPaperPreview; 