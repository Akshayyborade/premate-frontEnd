import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CourseList from './CourseList';
import CourseProfile from './CourseProfile';
import './CourseDetails.css';

const CourseDetails = () => {
    return (
        <Routes>
            <Route index element={<CourseList />} />
            <Route path=":id" element={<CourseProfile />} />
        </Routes>
    );
};

export default CourseDetails; 