import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExamList from './ExamList';
import ExamProfile from './ExamProfile';
import ExamPaperLayout from '../../QuestionPaper/ExamPaperLayout';
import './ExamDetails.css';
import PreviewModal from '../../QuestionPaper/PreviewModal';
import { PaperConfigProvider } from '../../QuestionPaper/context/PaperConfigContext';

/**
 * ExamDetails Component
 * 
 * Main router container for exam-related features. Handles routing between:
 * - Exam list (main view)
 * - Individual exam profiles
 * - Question paper generator tool
 */
const ExamDetails = () => {
    return (
        <PaperConfigProvider>
            <div className="exam-details-wrapper">
                <Routes>
                    {/* Main exam list view */}
                    <Route 
                        index 
                        element={<ExamList />} 
                    />
                    
                    {/* Individual exam profile view */}
                    <Route 
                        path=":id" 
                        element={<ExamProfile />} 
                    />
                    
                    {/* Question paper generator tool */}
                    <Route 
                        path="new" 
                        element={<ExamPaperLayout />} 
                    />
                    
                    {/* Preview Modal Route */}
                    <Route 
                        path="preview" 
                        element={<PreviewModal />} 
                    />
                </Routes>
            </div>
        </PaperConfigProvider>
    );
};

export default ExamDetails; 