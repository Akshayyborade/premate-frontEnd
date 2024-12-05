import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExamList from './ExamList';
import ExamProfile from './ExamProfile';
import QuestionPaperGenerator from './QuestionPaperGenerator';
import './ExamDetails.css';

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
                    path="generator" 
                    element={<QuestionPaperGenerator />} 
                />
            </Routes>
        </div>
    );
};

export default ExamDetails; 