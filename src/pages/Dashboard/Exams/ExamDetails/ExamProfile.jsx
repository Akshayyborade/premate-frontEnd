import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ExamProfile.css';

const ExamProfile = () => {
    const { id } = useParams();
    const [exam, setExam] = useState({
        id: 1,
        name: 'Mid-Term Mathematics',
        subject: 'Mathematics',
        class: '10th',
        date: '2024-03-15',
        duration: '3 hours',
        totalMarks: 100,
        status: 'upcoming',
        sections: [
            {
                name: 'Section A - MCQ',
                totalMarks: 30,
                questions: [
                    {
                        id: 1,
                        type: 'mcq',
                        text: 'What is the value of π (pi) to two decimal places?',
                        options: ['3.12', '3.14', '3.16', '3.18'],
                        correctAnswer: '3.14',
                        marks: 1,
                        difficulty: 'easy'
                    },
                    // Add more questions
                ]
            },
            {
                name: 'Section B - Short Answer',
                totalMarks: 40,
                questions: [
                    {
                        id: 1,
                        type: 'short',
                        text: 'Solve the quadratic equation: x² + 5x + 6 = 0',
                        marks: 4,
                        difficulty: 'medium'
                    },
                    // Add more questions
                ]
            },
            {
                name: 'Section C - Long Answer',
                totalMarks: 30,
                questions: [
                    {
                        id: 1,
                        type: 'long',
                        text: 'Prove the Pythagorean theorem and give two real-world applications.',
                        marks: 8,
                        difficulty: 'hard'
                    },
                    // Add more questions
                ]
            }
        ],
        instructions: [
            'Read all questions carefully',
            'Attempt all sections',
            'Each MCQ has only one correct answer',
            'Show all working for numerical problems'
        ],
        settings: {
            shuffleQuestions: true,
            showCalculator: true,
            negativeMarking: false,
            passingPercentage: 35
        }
    });

    const [activeTab, setActiveTab] = useState('overview');
    const [editMode, setEditMode] = useState(false);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Implement save logic
        setEditMode(false);
    };

    const handleQuestionEdit = (sectionIndex, questionIndex, updatedQuestion) => {
        const updatedExam = { ...exam };
        updatedExam.sections[sectionIndex].questions[questionIndex] = updatedQuestion;
        setExam(updatedExam);
    };

    return (
        <div className="exam-profile">
            <div className="exam-profile-header">
                <div className="header-content">
                    <h1>{exam.name}</h1>
                    <span className={`status-badge ${exam.status}`}>
                        {exam.status}
                    </span>
                </div>
                <div className="header-actions">
                    {editMode ? (
                        <>
                            <button className="save-btn" onClick={handleSave}>
                                Save Changes
                            </button>
                            <button className="cancel-btn" onClick={handleEditToggle}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className="edit-btn" onClick={handleEditToggle}>
                            Edit Exam
                        </button>
                    )}
                </div>
            </div>

            <div className="exam-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('questions')}
                >
                    Questions
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    Settings
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
                    onClick={() => setActiveTab('results')}
                >
                    Results
                </button>
            </div>

            <div className="exam-content">
                {activeTab === 'overview' && (
                    <motion.div 
                        className="overview-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="exam-details">
                            <div className="detail-card">
                                <h3>Basic Information</h3>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <label>Subject</label>
                                        <p>{exam.subject}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Class</label>
                                        <p>{exam.class}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Date</label>
                                        <p>{new Date(exam.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Duration</label>
                                        <p>{exam.duration}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Total Marks</label>
                                        <p>{exam.totalMarks}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-card">
                                <h3>Instructions</h3>
                                <ul className="instructions-list">
                                    {exam.instructions.map((instruction, index) => (
                                        <li key={index}>{instruction}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="detail-card">
                                <h3>Sections Overview</h3>
                                <div className="sections-grid">
                                    {exam.sections.map((section, index) => (
                                        <div key={index} className="section-card">
                                            <h4>{section.name}</h4>
                                            <p>Total Marks: {section.totalMarks}</p>
                                            <p>Questions: {section.questions.length}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'questions' && (
                    <motion.div 
                        className="questions-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {exam.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="section-block">
                                <h3>{section.name}</h3>
                                <div className="questions-list">
                                    {section.questions.map((question, questionIndex) => (
                                        <div key={questionIndex} className="question-card">
                                            <div className="question-header">
                                                <span className="question-number">
                                                    Q{questionIndex + 1}
                                                </span>
                                                <span className={`difficulty-badge ${question.difficulty}`}>
                                                    {question.difficulty}
                                                </span>
                                                <span className="marks-badge">
                                                    {question.marks} marks
                                                </span>
                                            </div>
                                            <div className="question-content">
                                                <p>{question.text}</p>
                                                {question.type === 'mcq' && (
                                                    <div className="options-list">
                                                        {question.options.map((option, optionIndex) => (
                                                            <div key={optionIndex} className="option-item">
                                                                <input 
                                                                    type="radio" 
                                                                    name={`question-${question.id}`}
                                                                    disabled={!editMode}
                                                                    checked={option === question.correctAnswer}
                                                                />
                                                                <label>{option}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {editMode && (
                                                <div className="question-actions">
                                                    <button className="edit-question-btn">Edit</button>
                                                    <button className="delete-question-btn">Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'settings' && (
                    <motion.div 
                        className="settings-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="settings-card">
                            <h3>Exam Settings</h3>
                            <div className="settings-grid">
                                <div className="setting-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={exam.settings.shuffleQuestions}
                                            disabled={!editMode}
                                            onChange={() => {/* Handle change */}}
                                        />
                                        Shuffle Questions
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={exam.settings.showCalculator}
                                            disabled={!editMode}
                                            onChange={() => {/* Handle change */}}
                                        />
                                        Show Calculator
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={exam.settings.negativeMarking}
                                            disabled={!editMode}
                                            onChange={() => {/* Handle change */}}
                                        />
                                        Negative Marking
                                    </label>
                                </div>
                                <div className="setting-item">
                                    <label>Passing Percentage</label>
                                    <input
                                        type="number"
                                        value={exam.settings.passingPercentage}
                                        disabled={!editMode}
                                        onChange={() => {/* Handle change */}}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'results' && (
                    <motion.div 
                        className="results-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="results-card">
                            <h3>Exam Results</h3>
                            <p>Results will be available after the exam is completed.</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ExamProfile; 