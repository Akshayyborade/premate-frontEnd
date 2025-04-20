import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PaperConfigProvider } from '../../../pages/Dashboard/QuestionPaper/context/PaperConfigContext';

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
import TeacherForm from '../../Dashboard/Teachers/TeacherDetails/TeacherForm';
import TeacherManagement from '../TeacherSection/TeacherManagement.tsx';
import TeacherRegistration from '../TeacherSection/TeacherRegistration.tsx';
import TeacherPerformance from '../TeacherSection/TeacherPerformance.tsx';
import TeacherLeave from '../TeacherSection/TeacherLeave.tsx';
import TeacherQualifications from '../TeacherSection/TeacherQualifications.tsx';
import TeacherCommunication from '../TeacherSection/TeacherCommunication.tsx';
import TeacherTraining from '../TeacherSection/TeacherTraining.tsx';

// Course and Exam Components
import CourseDetails from '../../Dashboard/Courses/CourseDetails/CourseDetails';
import CourseForm from '../../Dashboard/Courses/CourseDetails/CourseForm';



// Add imports for StudentSection components
import StudentManagement from '../StudentSection/StudentManagement.tsx';
import StudentRegistration from '../StudentSection/StudentRegistration.tsx';
import StudentAttendance from '../StudentSection/StudentAttendance.tsx';
import StudentPerformance from '../StudentSection/StudentPerformance.tsx';

// Add imports for ExamSection components
import {
  ExamManagement,
  ExamList,
  ExamSchedule,
  ExamResults,
  ExamAnalysis,
  ExamFeedback,
  ExamDetails,
} from '../ExamSection/index.ts';

// Inside the Routes component
import {
  CourseManagement,
  CourseList,
  CourseCreate,
  CourseSchedule,
  CourseEnrollment,
} from '../CoursesSection/index.ts';

import Settings from '../Settings/Settings.tsx';

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
        <PaperConfigProvider>
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
                        <Route index element={<StudentManagement />} />
                        <Route path="list" element={<StudentList />} />
                        <Route path="registration" element={<StudentRegistration />} />
                        <Route path="attendance" element={<StudentAttendance />} />
                        <Route path="performance" element={<StudentPerformance />} />
                        <Route path="new" element={<StudentForm />} />
                        <Route path=":id">
                            <Route index element={<StudentDetails />} />
                            <Route path="edit" element={<StudentForm />} />
                        </Route>
                    </Route>

                    {/* Teacher Management Routes */}
                    <Route path="teachers">
                        <Route index element={<TeacherManagement />} />
                        <Route path="list" element={<TeacherList />} />
                        <Route path="register" element={<TeacherRegistration />} />
                        <Route path="performance" element={<TeacherPerformance />} />
                        <Route path="leave" element={<TeacherLeave />} />
                        <Route path="qualifications" element={<TeacherQualifications />} />
                        <Route path="communication" element={<TeacherCommunication />} />
                        <Route path="training" element={<TeacherTraining />} />
                        <Route path=":id">
                            <Route index element={<TeacherProfile />} />
                            <Route path="edit" element={<TeacherForm />} />
                        </Route>
                    </Route>

                    {/* Course Management Routes */}
                    <Route path="courses">
                        <Route index element={<CourseManagement />} />
                        <Route path="list" element={<CourseList />} />
                        <Route path="create" element={<CourseCreate />} />
                        <Route path="schedule" element={<CourseSchedule />} />
                        <Route path="enrollment" element={<CourseEnrollment />} />
                        <Route path=":id">
                            <Route index element={<CourseDetails />} />
                            <Route path="edit" element={<CourseForm />} />
                        </Route>
                    </Route>

                    {/* Exam Management Routes */}
                    <Route path="exams">
                        <Route index element={<ExamManagement />} />
                        <Route path="list" element={<ExamList />} />
                        <Route path="schedule" element={<ExamSchedule />} />
                        <Route path="results" element={<ExamResults />} />
                        <Route path="analysis" element={<ExamAnalysis />} />
                        <Route path="feedback" element={<ExamFeedback />} />
                        <Route path=":id">
                            <Route index element={<ExamDetails />} />
                        </Route>
                    </Route>

                    {/* Settings Route */}
                    <Route path="settings" element={<Settings />} />

                    {/* Redirect to Dashboard Home for unknown routes */}
                    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
            </>
        </PaperConfigProvider>
    );
};

export default Dashboard;