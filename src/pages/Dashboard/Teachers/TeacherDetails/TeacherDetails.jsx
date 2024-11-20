import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherList from './TeacherList';
import TeacherProfile from './TeacherProfile';
import './TeacherDetails.css';

const TeacherDetails = () => {
    return (
        <Routes>
            <Route index element={<TeacherList />} />
            <Route path=":id" element={<TeacherProfile />} />
        </Routes>
    );
};

export default TeacherDetails; 