import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExamList from './ExamList';
import ExamProfile from './ExamProfile';
import QuestionPaperGenerator from './QuestionPaperGenerator';
import './ExamDetails.css';

const ExamDetails = () => {
    return (
        <div className="exam-details-wrapper">
            <Routes>
                <Route index element={<ExamList />} />
                <Route path=":id" element={<ExamProfile />} />
                <Route path="generator" element={<QuestionPaperGenerator />} />
            </Routes>
        </div>
    );
};

export default ExamDetails; 