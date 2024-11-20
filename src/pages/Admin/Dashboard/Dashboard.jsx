import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import StudentDetails from '../../Dashboard/Students/StudentDetails/StudentDetails';
import TeacherDetails from '../../Dashboard/Teachers/TeacherDetails/TeacherDetails';
import CourseDetails from '../../Dashboard/Courses/CourseDetails/CourseDetails';
import ExamDetails from '../../Dashboard/Exams/ExamDetails/ExamDetails';
import Settings from '../Settings/Settings';

const Dashboard = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard/*" element={<DashboardHome />} />
            <Route path="students/*" element={<StudentDetails />} />
            <Route path="teachers/*" element={<TeacherDetails />} />
            <Route path="courses/*" element={<CourseDetails />} />
            <Route path="exams/*" element={<ExamDetails />} />
            <Route path="settings/*" element={<Settings />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
    );
};

export default Dashboard; 