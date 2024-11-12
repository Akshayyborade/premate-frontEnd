import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const menuItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/students', icon: '👨‍🎓', label: 'Students' },
        { path: '/admin/teachers', icon: '👨‍🏫', label: 'Teachers' },
        { path: '/admin/courses', icon: '📚', label: 'Courses' },
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
                            `sidebar-link ${isActive ? 'active' : ''}`
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