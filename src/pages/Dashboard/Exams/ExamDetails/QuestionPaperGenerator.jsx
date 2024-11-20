import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './QuestionPaperGenerator.css';
import { Select, Slider, Button, Tooltip, message, Modal, Spin } from 'antd';
import { CloudDownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';

const QuestionPaperGenerator = () => {
    const [paperConfig, setPaperConfig] = useState({
        board: 'CBSE',
        state: 'Maharashtra',
        subject: 'Mathematics',
        class: '10',
        totalMarks: 100,
        duration: 180,
        difficultyDistribution: {
            easy: 30,
            medium: 50,
            hard: 20
        },
        questionTypes: {
            mcq: 30,
            shortAnswer: 40,
            longAnswer: 30
        },
        examType: 'semester',
        language: 'English',
        paperFormat: 'PDF',
        includeAnswerKey: true,
        blueprint: {
            totalQuestions: 50,
            mandatoryQuestions: 35,
            optionalQuestions: 15,
            sectionWiseMarks: {
                'Section A': 30,
                'Section B': 40,
                'Section C': 30
            }
        }
    });

    const [sections, setSections] = useState([
        {
            name: 'Section A - MCQ',
            marks: 30,
            questions: []
        },
        {
            name: 'Section B - Short Answer',
            marks: 40,
            questions: []
        },
        {
            name: 'Section C - Long Answer',
            marks: 30,
            questions: []
        },
        {
            name: 'Section D - Case Studies',
            marks: 20,
            questions: []
        }
    ]);

    const [questionBank, setQuestionBank] = useState({
        mcq: [
            { id: 1, text: 'Sample MCQ 1', difficulty: 'easy', marks: 1 },
            { id: 2, text: 'Sample MCQ 2', difficulty: 'medium', marks: 1 }
            // Add more questions
        ],
        shortAnswer: [
            { id: 1, text: 'Sample Short Answer 1', difficulty: 'medium', marks: 3 },
            { id: 2, text: 'Sample Short Answer 2', difficulty: 'hard', marks: 4 }
            // Add more questions
        ],
        longAnswer: [
            { id: 1, text: 'Sample Long Answer 1', difficulty: 'medium', marks: 5 },
            { id: 2, text: 'Sample Long Answer 2', difficulty: 'hard', marks: 8 }
            // Add more questions
        ]
    });

    const handleConfigChange = (field, value) => {
        setPaperConfig(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDifficultyChange = (level, value) => {
        setPaperConfig(prev => ({
            ...prev,
            difficultyDistribution: {
                ...prev.difficultyDistribution,
                [level]: parseInt(value)
            }
        }));
    };

    const handleQuestionTypeChange = (type, value) => {
        setPaperConfig(prev => ({
            ...prev,
            questionTypes: {
                ...prev.questionTypes,
                [type]: parseInt(value)
            }
        }));
    };

    const [loading, setLoading] = useState(false);
    const [generatedPaper, setGeneratedPaper] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState('blueprint');

    const generateAIQuestions = async (type, count, difficulty) => {
        try {
            // This would be your AI service endpoint
            const response = await axios.post('/api/generate-questions', {
                type,
                count,
                difficulty,
                subject: paperConfig.subject,
                class: paperConfig.class,
                language: paperConfig.language
            });
            return response.data.questions;
        } catch (error) {
            console.error('Error generating AI questions:', error);
            throw error;
        }
    };

    const generatePaper = async () => {
        try {
            setLoading(true);
            // Validate distributions
            const totalDifficulty = Object.values(paperConfig.difficultyDistribution).reduce((a, b) => a + b, 0);
            const totalQuestionTypes = Object.values(paperConfig.questionTypes).reduce((a, b) => a + b, 0);

            if (totalDifficulty !== 100 || totalQuestionTypes !== 100) {
                throw new Error('Distribution percentages must sum to 100%');
            }

            // Generate questions for each section
            const generatedSections = await Promise.all(
                sections.map(async (section) => {
                    const questionCount = Math.ceil((section.marks / paperConfig.totalMarks) * paperConfig.blueprint.totalQuestions);
                    
                    // Determine question type based on section name
                    const type = section.name.toLowerCase().includes('mcq') ? 'mcq' : 
                                section.name.toLowerCase().includes('short') ? 'shortAnswer' : 'longAnswer';

                    // Generate questions using AI
                    const questions = await generateAIQuestions(type, questionCount, paperConfig.difficultyDistribution);

                    return {
                        ...section,
                        questions
                    };
                })
            );

            setGeneratedPaper({
                metadata: {
                    ...paperConfig,
                    generatedDate: new Date().toISOString(),
                    paperID: Math.random().toString(36).substr(2, 9)
                },
                sections: generatedSections
            });

            setShowPreview(true);
            message.success('Question paper generated successfully!');
        } catch (error) {
            message.error('Error generating paper: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadPaper = async (format = 'PDF') => {
        try {
            setLoading(true);
            // Call backend API to generate document
            const response = await axios.post('/api/download-paper', {
                paper: generatedPaper,
                format
            }, {
                responseType: 'blob'
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `question_paper_${generatedPaper.metadata.paperID}.${format.toLowerCase()}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            message.success(`Paper downloaded successfully in ${format} format!`);
        } catch (error) {
            message.error('Error downloading paper: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const PreviewModal = () => (
        <Modal
            title="Question Paper Preview"
            visible={showPreview}
            onCancel={() => setShowPreview(false)}
            width={800}
            footer={[
                <Button key="pdf" onClick={() => downloadPaper('PDF')} icon={<CloudDownloadOutlined />}>
                    Download PDF
                </Button>,
                <Button key="word" onClick={() => downloadPaper('DOCX')} icon={<CloudDownloadOutlined />}>
                    Download Word
                </Button>
            ]}
        >
            {generatedPaper && (
                <div className="paper-preview-content">
                    <div className="paper-header">
                        <h2>{paperConfig.board} - {paperConfig.subject}</h2>
                        <p>Class: {paperConfig.class} | Total Marks: {paperConfig.totalMarks}</p>
                        <p>Duration: {paperConfig.duration} minutes</p>
                    </div>
                    
                    {generatedPaper.sections.map((section, index) => (
                        <div key={index} className="preview-section">
                            <h3>{section.name}</h3>
                            <p>Total Marks: {section.marks}</p>
                            <div className="questions-list">
                                {section.questions.map((question, qIndex) => (
                                    <div key={qIndex} className="question-item">
                                        <p><strong>Q{qIndex + 1}.</strong> {question.text}</p>
                                        {question.options && (
                                            <div className="options">
                                                {question.options.map((option, oIndex) => (
                                                    <p key={oIndex}>{String.fromCharCode(65 + oIndex)}. {option}</p>
                                                ))}
                                            </div>
                                        )}
                                        <p className="marks">({question.marks} marks)</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Modal>
    );

    return (
        <Spin spinning={loading}>
            <div className="question-paper-generator">
                <div className="generator-header">
                    <h1>Question Paper Generator</h1>
                    <button onClick={generatePaper} className="generate-btn">
                        Generate Paper
                    </button>
                </div>

                <div className="generator-content">
                    {/* Basic Configuration */}
                    <div className="config-section">
                        <h2>Basic Configuration</h2>
                        <div className="config-grid">
                            <div className="form-group">
                                <label>Board</label>
                                <select 
                                    value={paperConfig.board}
                                    onChange={(e) => handleConfigChange('board', e.target.value)}
                                >
                                    <option value="CBSE">CBSE</option>
                                    <option value="State">State Board</option>
                                    <option value="ICSE">ICSE</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>State</label>
                                <select 
                                    value={paperConfig.state}
                                    onChange={(e) => handleConfigChange('state', e.target.value)}
                                >
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Gujarat">Gujarat</option>
                                    {/* Add more states */}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Subject</label>
                                <select 
                                    value={paperConfig.subject}
                                    onChange={(e) => handleConfigChange('subject', e.target.value)}
                                >
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Science">Science</option>
                                    <option value="English">English</option>
                                    {/* Add more subjects */}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Class</label>
                                <select 
                                    value={paperConfig.class}
                                    onChange={(e) => handleConfigChange('class', e.target.value)}
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Difficulty Distribution */}
                    <div className="config-section">
                        <h2>Difficulty Distribution (%)</h2>
                        <div className="difficulty-sliders">
                            {Object.entries(paperConfig.difficultyDistribution).map(([level, value]) => (
                                <div key={level} className="difficulty-slider">
                                    <label>{level.charAt(0).toUpperCase() + level.slice(1)}</label>
                                    <input 
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={value}
                                        onChange={(e) => handleDifficultyChange(level, e.target.value)}
                                    />
                                    <span>{value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Question Types Distribution */}
                    <div className="config-section">
                        <h2>Question Types Distribution (%)</h2>
                        <div className="question-type-sliders">
                            {Object.entries(paperConfig.questionTypes).map(([type, value]) => (
                                <div key={type} className="question-type-slider">
                                    <label>{type.split(/(?=[A-Z])/).join(' ')}</label>
                                    <input 
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={value}
                                        onChange={(e) => handleQuestionTypeChange(type, e.target.value)}
                                    />
                                    <span>{value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Configuration */}
                    <div className="config-section">
                        <h2>Advanced Configuration</h2>
                        <div className="config-grid">
                            <div className="form-group">
                                <label>Exam Type</label>
                                <Select 
                                    value={paperConfig.examType}
                                    onChange={(value) => handleConfigChange('examType', value)}
                                    options={[
                                        { value: 'semester', label: 'Semester Exam' },
                                        { value: 'entrance', label: 'Entrance Test' },
                                        { value: 'competitive', label: 'Competitive Exam' }
                                    ]}
                                />
                            </div>

                            <div className="form-group">
                                <label>Language</label>
                                <Select
                                    value={paperConfig.language}
                                    onChange={(value) => handleConfigChange('language', value)}
                                    options={[
                                        { value: 'English', label: 'English' },
                                        { value: 'Hindi', label: 'Hindi' },
                                        { value: 'Marathi', label: 'Marathi' }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Preview Section */}
                    <div className="preview-section">
                        <div className="preview-header">
                            <h2>Preview</h2>
                            <div className="preview-controls">
                                <Button.Group>
                                    <Tooltip title="Blueprint View">
                                        <Button 
                                            type={previewMode === 'blueprint' ? 'primary' : 'default'}
                                            icon={<EyeOutlined />}
                                            onClick={() => setPreviewMode('blueprint')}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Final Paper View">
                                        <Button 
                                            type={previewMode === 'final' ? 'primary' : 'default'}
                                            icon={<EditOutlined />}
                                            onClick={() => setPreviewMode('final')}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Download">
                                        <Button 
                                            icon={<CloudDownloadOutlined />}
                                            onClick={() => downloadPaper()}
                                        />
                                    </Tooltip>
                                </Button.Group>
                            </div>
                        </div>
                        <div className="paper-preview">
                            {sections.map((section, index) => (
                                <div key={index} className="preview-section">
                                    <h3>{section.name}</h3>
                                    <p>Total Marks: {section.marks}</p>
                                    {/* Add question preview */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add PreviewModal */}
                <PreviewModal />
            </div>
        </Spin>
    );
};

export default QuestionPaperGenerator; 