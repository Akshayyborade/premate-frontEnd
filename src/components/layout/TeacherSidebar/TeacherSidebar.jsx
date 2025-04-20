import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './TeacherSidebar.css';

const TeacherSidebar = () => {
    const location = useLocation();
    const isRootOrHome = location.pathname === '/teacher' || location.pathname === '/teacher/';
    const { user } = useAuth();

    const menuItems = [
        { path: '/teacher/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/teacher/classes', icon: '👨‍🏫', label: 'Classes' },
        { path: '/teacher/exams', icon: '📝', label: 'Exams' },
        { path: '/teacher/students', icon: '👨‍🎓', label: 'Students' },
        { path: '/teacher/calendar', icon: '📅', label: 'Calendar' },
        { path: '/teacher/profile', icon: '👤', label: 'Profile' },
        { path: '/teacher/settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <aside className="teacher-sidebar">
            <div className="sidebar-header">
                <h2>Teacher Portal</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive || (isRootOrHome && item.path === '/teacher/dashboard')
                                        ? 'active'
                                        : ''
                                }
                            >
                                <span className="icon">{item.icon}</span>
                                <span className="label">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default TeacherSidebar; 