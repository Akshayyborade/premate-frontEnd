import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import DashboardHome from './DashboardHome';
import StudentList from './Students/StudentList';

import './Dashboard.css';

const Dashboard = () => {
    return (
        <MainLayout>
            <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="students/*" element={<StudentList />} />
                {/* <Route path="courses/*" element={<CourseList />} />
                <Route path="teachers/*" element={<TeacherList />} /> */}
            </Routes>
        </MainLayout>
    );
};

export default Dashboard; 