import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import DashboardHome from './DashboardHome';
import Breadcrumbs from '../../../components/common/Breadcrumbs/Breadcrumbs';

// Student Related Components
import StudentList from '../../Dashboard/Students/StudentDetails/StudentList';
import StudentDetails from '../../Dashboard/Students/StudentDetails/StudentDetails';
import StudentForm from '../../../components/features/Students/StudentForm/StudentForm';

// Teacher Related Components
import TeacherList from '../../Dashboard/Teachers/TeacherDetails/TeacherList';
import TeacherProfile from '../../Dashboard/Teachers/TeacherDetails/TeacherProfile';
import TeacherDetails from '../../Dashboard/Teachers/TeacherDetails/TeacherDetails';

// Course and Exam Components
import CourseDetails from '../../Dashboard/Courses/CourseDetails/CourseDetails';
import ExamDetails from '../../Dashboard/Exams/ExamDetails/ExamDetails';
import QuestionPaperBuilder from '../../Dashboard/QuestionPaper/QuestionPaperBuilder';

// Settings Component
import Settings from '../Settings/Settings';

/**
 * Dashboard Component
 * 
 * Main routing component for the admin dashboard.
 * Handles navigation between different sections:
 * - Dashboard Home
 * - Student Management
 * - Teacher Management
 * - Course Management
 * - Exam Management
 * - Settings
 */
const Dashboard = () => {
    return (
        <>
            {/* Navigation Breadcrumbs */}
            <Breadcrumbs />

            {/* Main Route Configuration */}
            <Routes>
                {/* Dashboard Home Routes */}
                <Route index element={<DashboardHome />} />
                <Route path="dashboard" element={<DashboardHome />} />

                {/* Student Management Routes */}
                <Route path="students">
                    <Route index element={<StudentList />} />
                    <Route path="new" element={<StudentForm />} />
                    <Route path=":id">
                        <Route index element={<StudentDetails />} />
                        <Route path="edit" element={<StudentForm />} />
                    </Route>
                </Route>

                {/* Teacher Management Routes */}
                <Route path="teachers">
                    <Route index element={<TeacherList />} />
                    <Route path=":id" element={<TeacherProfile />} />
                </Route>

                {/* Course Management Route */}
                <Route path="courses" element={<CourseDetails />} />

                {/* Exam Management Routes */}
                <Route path="exams">
                    <Route index element={<ExamDetails />} />
                    <Route path="new" element={<QuestionPaperBuilder />} />
                </Route>

                {/* Settings Route */}
                <Route path="settings" element={<Settings />} />

                {/* Fallback Route - Redirect to Dashboard */}
                <Route 
                    path="*" 
                    element={<Navigate to="/admin/dashboard" replace />} 
                />
            </Routes>
        </>
    );
};

export default Dashboard;