import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './MobileMenu.css';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/students', label: 'Students', icon: '👥' },
        { path: '/courses', label: 'Courses', icon: '📚' },
        { path: '/teachers', label: 'Teachers', icon: '👨‍🏫' },
        { path: '/schedule', label: 'Schedule', icon: '📅' },
        { path: '/reports', label: 'Reports', icon: '📈' },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };

    return (
        <>
            <button 
                className={`mobile-menu-toggle ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <div className="mobile-menu-user">
                        <div className="mobile-menu-avatar">
                            {user?.institutionName?.charAt(0)}
                        </div>
                        <div className="mobile-menu-user-info">
                            <h3>{user?.institutionName}</h3>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </div>

                <nav className="mobile-menu-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => 
                                `mobile-menu-link ${isActive ? 'active' : ''}`
                            }
                            onClick={toggleMenu}
                        >
                            <span className="mobile-menu-icon">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="mobile-menu-footer">
                    <button 
                        className="mobile-menu-logout"
                        onClick={() => {
                            logout();
                            toggleMenu();
                        }}
                    >
                        <span className="mobile-menu-icon">🚪</span>
                        Logout
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="mobile-menu-overlay" onClick={toggleMenu} />
            )}
        </>
    );
};

export default MobileMenu; 