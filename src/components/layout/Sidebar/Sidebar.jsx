import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const isRootOrHome = location.pathname === '/admin' || location.pathname === '/admin/';

    const menuItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/students', icon: '👨‍🎓', label: 'Students' },
        { path: '/admin/teachers', icon: '👨‍🏫', label: 'Teachers' },
        { path: '/admin/courses', icon: '📚', label: 'Courses' },
        { path: '/admin/exams', icon: '📝', label: 'Exams' },
        { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <img src="/logo.png" alt="Logo" className="sidebar-logo" />
                <h2 className="sidebar-title">Admin Panel</h2>
            </div>
            
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => 
                            `sidebar-link ${isActive || (isRootOrHome && item.path === '/admin/dashboard') ? 'active' : ''}`
                        }
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar; 