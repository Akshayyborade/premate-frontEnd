import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import StudentList from '../../Dashboard/Students/StudentDetails/StudentList';
import StudentDetails from '../../Dashboard/Students/StudentDetails/StudentDetails';
import StudentForm from '../../../components/features/Students/StudentForm/StudentForm';
import TeacherDetails from '../../Dashboard/Teachers/TeacherDetails/TeacherDetails';
import CourseDetails from '../../Dashboard/Courses/CourseDetails/CourseDetails';
import ExamDetails from '../../Dashboard/Exams/ExamDetails/ExamDetails';
import Settings from '../Settings/Settings';
import Breadcrumbs from '../../../components/common/Breadcrumbs/Breadcrumbs';
import TeacherList from '../../Dashboard/Teachers/TeacherDetails/TeacherList';
import TeacherProfile from '../../Dashboard/Teachers/TeacherDetails/TeacherProfile';
import QuestionPaperBuilder from '../../Dashboard/QuestionPaper/QuestionPaperBuilder';

const Dashboard = () => {
    return (
        <>
            <Breadcrumbs />
            <Routes>
                {/* Most specific routes first */}
                <Route path="students/new" element={<StudentForm />} />
                <Route path="students/:id/edit" element={<StudentForm />} />
                <Route path="students/:id" element={<StudentDetails />} />
                <Route path="students" element={<StudentList />} />

                {/* Teachers Routing */}
                <Route path="teachers" element={<TeacherList/>}/>
                <Route path="teachers/:id" element={<TeacherProfile/>}/>

                {/* Exam section */}
                <Route path="exams/new" element={<QuestionPaperBuilder/>}/>

                {/* Default dashboard route */}
                <Route index element={<DashboardHome />} />
                <Route path="dashboard" element={<DashboardHome />} />

                {/* Other specific routes */}
                <Route path="courses" element={<CourseDetails />} />
                <Route path="exams" element={<ExamDetails />} />
                <Route path="settings" element={<Settings />} />

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
        </>
    );
};

export default Dashboard;