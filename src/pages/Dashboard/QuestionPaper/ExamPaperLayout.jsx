import React, { useState, useEffect, useCallback } from 'react';
import './ExamPaperLayout.css';
import Button from '../../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import QuestionPaperBuilder from './QuestionPaperBuilder';

const ExamPaperLayout = ({ onConfigSubmit }) => {
    const navigation= useNavigate();
    // Comprehensive State Management
    const [paperConfig, setPaperConfig] = useState({
        basicInfo: {
            subject: '',
            board: '',
            academicYear: '',
            examType: 'Final',
            totalMarks: '',
            duration: '',
        },
        questionSection: {
            sections: [
                {
                    sectionName: 'Section A',
                    questionTypes: [
                        { 
                            type: 'MCQ', 
                            count: 0, 
                            marksPerQuestion: 0,
                            optionCount: 4,
                            negativeMarking: false,
                            negativeMarkingValue: 0
                        },
                        { 
                            type: 'ShortAnswer', 
                            count: 0, 
                            marksPerQuestion: 0,
                            wordLimit: 0
                        }
                    ]
                }
            ]
        },
        paperStyle: {
            layout: 'Bullets',
            fontSize: 12,
            fontFamily: 'Arial',
            pageOrientation: 'Portrait',
            marginSettings: {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1
            }
        },
        additionalFeatures: {
            languageOptions: [],
            optionalQuestions: {
                enabled: false,
                optionalQuestionCount: 0,
                totalQuestionsToAttempt: 0
            },
            specialInstructions: '',
            assistiveTools: {
                calculatorAllowed: false,
                graphPaperAllowed: false,
                otherTools: []
            }
        }
    });

    const [sections, setSections] = useState([]);

    // Unified function to add sections
    const addSection = useCallback(() => {
        const newSection = {
            sectionName: `Section ${String.fromCharCode(65 + sections.length)}`,
            questionTypes: [{ type: 'MCQ', count: 0, marksPerQuestion: 0 }]
        };
        setSections(prev => [...prev, newSection]);
    }, [sections.length]);

    // Unified function to handle configuration submission
    const handleConfigSubmit = useCallback((newConfig) => {
        setPaperConfig(newConfig);
        onConfigSubmit(newConfig);
    }, [onConfigSubmit]);

    // Dynamic Section and Question Type Management
    const addQuestionType = (sectionIndex) => {
        const newQuestionTypes = [...paperConfig.questionSection.sections[sectionIndex].questionTypes];
        newQuestionTypes.push({ 
            type: 'ShortAnswer', 
            count: 0, 
            marksPerQuestion: 0,
            wordLimit: 0
        });

        const updatedSections = [...paperConfig.questionSection.sections];
        updatedSections[sectionIndex] = {
            ...updatedSections[sectionIndex],
            questionTypes: newQuestionTypes
        };

        setPaperConfig(prev => ({
            ...prev,
            questionSection: {
                ...prev.questionSection,
                sections: updatedSections
            }
        }));
    };

    // Comprehensive Update Methods
    const updateBasicInfo = (field, value) => {
        setPaperConfig(prev => ({
            ...prev,
            basicInfo: {
                ...prev.basicInfo,
                [field]: value
            }
        }));
    };

    const updateSectionQuestionType = (sectionIndex, questionTypeIndex, field, value) => {
        const updatedSections = [...paperConfig.questionSection.sections];
        updatedSections[sectionIndex].questionTypes[questionTypeIndex] = {
            ...updatedSections[sectionIndex].questionTypes[questionTypeIndex],
            [field]: value
        };

        setPaperConfig(prev => ({
            ...prev,
            questionSection: {
                ...prev.questionSection,
                sections: updatedSections
            }
        }));
    };

    const updatePaperStyle = (field, value) => {
        setPaperConfig(prev => ({
            ...prev,
            paperStyle: {
                ...prev.paperStyle,
                [field]: value
            }
        }));
    };

    const updateMarginSettings = (field, value) => {
        setPaperConfig(prev => ({
            ...prev,
            paperStyle: {
                ...prev.paperStyle,
                marginSettings: {
                    ...prev.paperStyle.marginSettings,
                    [field]: value
                }
            }
        }));
    };

    const updateAdditionalFeatures = (category, field, value) => {
        setPaperConfig(prev => ({
            ...prev,
            additionalFeatures: {
                ...prev.additionalFeatures,
                [category]: {
                    ...prev.additionalFeatures[category],
                    [field]: value
                }
            }
        }));
    };

    // Validation and Submission
    const validateConfiguration = () => {
        const errors = {};
        const { basicInfo, questionSection } = paperConfig;

        // Basic info validations
        if (!basicInfo.subject) errors.subject = 'Subject is required';
        if (!basicInfo.totalMarks || basicInfo.totalMarks <= 0) 
            errors.totalMarks = 'Total marks must be positive';

        // Calculate total marks
        const calculatedTotalMarks = questionSection.sections.reduce((total, section) => {
            return total + section.questionTypes.reduce((sectionTotal, qType) => {
                return sectionTotal + (qType.count * qType.marksPerQuestion);
            }, 0);
        }, 0);

        if (calculatedTotalMarks !== Number(basicInfo.totalMarks)) {
            errors.totalMarks = 'Total marks do not match question configuration';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { isValid, errors } = validateConfiguration();

        if (isValid) {
            onConfigSubmit(paperConfig);
        } else {
            console.error('Validation Errors:', errors);
            // Optionally set error state to display to user
        }
    };
    const handlePreview=() =>{
        navigation("/admin/exams/preview")
    }

    return (
        <div className="exam-paper-configuration">
            <h2>Advanced Exam Paper Configuration</h2>
            <form onSubmit={handleSubmit}>
                {/* Basic Information Section */}
                <div className="configuration-section">
                    <h3>Basic Information</h3>
                    <div className="form-grid">
                        <input 
                            placeholder="Subject" 
                            value={paperConfig.basicInfo.subject}
                            onChange={(e) => updateBasicInfo('subject', e.target.value)}
                        />
                        <select 
                            value={paperConfig.basicInfo.board}
                            onChange={(e) => updateBasicInfo('board', e.target.value)}
                        >
                            <option value="">Select Board</option>
                            <option value="CBSE">CBSE</option>
                            <option value="ICSE">ICSE</option>
                            <option value="State Board">State Board</option>
                        </select>
                        <input 
                            type="number" 
                            placeholder="Total Marks" 
                            value={paperConfig.basicInfo.totalMarks}
                            onChange={(e) => updateBasicInfo('totalMarks', e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="Duration (minutes)" 
                            value={paperConfig.basicInfo.duration}
                            onChange={(e) => updateBasicInfo('duration', e.target.value)}
                        />
                    </div>
                </div>

                {/* Question Sections */}
                <div className="configuration-section">
                    <h3>Question Configuration</h3>
                    {paperConfig.questionSection.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="section-container">
                            <h4>{section.sectionName}</h4>
                            {section.questionTypes.map((questionType, questionTypeIndex) => (
                                <div key={questionTypeIndex} className="question-type-config">
                                    <select 
                                        value={questionType.type}
                                        onChange={(e) => updateSectionQuestionType(
                                            sectionIndex, 
                                            questionTypeIndex, 
                                            'type', 
                                            e.target.value
                                        )}
                                    >
                                        <option value="MCQ">Multiple Choice</option>
                                        <option value="ShortAnswer">Short Answer</option>
                                        <option value="LongAnswer">Long Answer</option>
                                        <option value="Numerical">Numerical</option>
                                    </select>
                                    <input 
                                        type="number" 
                                        placeholder="Number of Questions"
                                        value={questionType.count}
                                        onChange={(e) => updateSectionQuestionType(
                                            sectionIndex, 
                                            questionTypeIndex, 
                                            'count', 
                                            e.target.value
                                        )}
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="Marks per Question"
                                        value={questionType.marksPerQuestion}
                                        onChange={(e) => updateSectionQuestionType(
                                            sectionIndex, 
                                            questionTypeIndex, 
                                            'marksPerQuestion', 
                                            e.target.value
                                        )}
                                    />
                                </div>
                            ))}
                            <button 
                                type="button" 
                                onClick={() => addQuestionType(sectionIndex)}
                            >
                                Add Question Type
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addSection}>
                        Add Section
                    </button>
                </div>

                {/* Paper Style Configuration */}
                <div className="configuration-section">
                    <h3>Paper Style</h3>
                    <div className="form-grid">
                        <select 
                            value={paperConfig.paperStyle.layout}
                            onChange={(e) => updatePaperStyle('layout', e.target.value)}
                        >
                            <option value="Bullets">Bullets</option>
                            <option value="Table">Table</option>
                            <option value="Grid">Grid</option>
                            <option value="Paragraph">Paragraph</option>
                        </select>
                        <select 
                            value={paperConfig.paperStyle.pageOrientation}
                            onChange={(e) => updatePaperStyle('pageOrientation', e.target.value)}
                        >
                            <option value="Portrait">Portrait</option>
                            <option value="Landscape">Landscape</option>
                        </select>
                        <input 
                            type="number" 
                            placeholder="Font Size" 
                            value={paperConfig.paperStyle.fontSize}
                            onChange={(e) => updatePaperStyle('fontSize', e.target.value)}
                        />
                    </div>
                </div>

                {/* Additional Features */}
                <div className="configuration-section">
                    <h3>Additional Features</h3>
                    <div className="feature-toggles">
                        <label>
                            <input 
                                type="checkbox"
                                checked={paperConfig.additionalFeatures.optionalQuestions.enabled}
                                onChange={() => updateAdditionalFeatures(
                                    'optionalQuestions', 
                                    'enabled', 
                                    !paperConfig.additionalFeatures.optionalQuestions.enabled
                                )}
                            />
                            Optional Questions
                        </label>
                        {paperConfig.additionalFeatures.optionalQuestions.enabled && (
                            <div>
                                <input 
                                    type="number"
                                    placeholder="Optional Question Count"
                                    value={paperConfig.additionalFeatures.optionalQuestions.optionalQuestionCount}
                                    onChange={(e) => updateAdditionalFeatures(
                                        'optionalQuestions', 
                                        'optionalQuestionCount', 
                                        e.target.value
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    <textarea 
                        placeholder="Special Instructions"
                        value={paperConfig.additionalFeatures.specialInstructions}
                        onChange={(e) => updateAdditionalFeatures(
                            'additionalFeatures', 
                            'specialInstructions', 
                            e.target.value
                        )}
                    />
                </div>
              
                <button type="submit">Generate Exam Paper Configuration</button>
            </form>
            
        </div>
    );
};

export default ExamPaperLayout;