import React from 'react';
import TeacherSidebar from '../../components/layout/TeacherSidebar/TeacherSidebar';
import TeacherHeader from '../../components/layout/Header/Header';
import './TeacherLayout.css';

const TeacherLayout = ({ children }) => {
    return (
        <div className="teacher-layout">
            <TeacherSidebar />
            <div className="teacher-main">
                <TeacherHeader />
                <main className="teacher-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default TeacherLayout; 