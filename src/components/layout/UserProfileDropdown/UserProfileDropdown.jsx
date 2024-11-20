import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './UserProfileDropdown.css';

const UserProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        {
            label: 'Profile Settings',
            icon: '👤',
            path: '/profile'
        },
        {
            label: 'Institution Settings',
            icon: '🏫',
            path: '/settings'
        },
        {
            label: 'Notifications',
            icon: '🔔',
            path: '/notifications'
        },
        {
            label: 'Help & Support',
            icon: '❓',
            path: '/support'
        }
    ];

    return (
        <div className="user-profile-dropdown" ref={dropdownRef}>
            <button 
                className="profile-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="profile-avatar">
                    {user?.institutionName?.charAt(0)}
                </div>
                <div className="profile-info">
                    <span className="profile-name">{user?.institutionName}</span>
                    <span className="profile-role">{user?.role}</span>
                </div>
                <span className={`profile-arrow ${isOpen ? 'up' : 'down'}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <div className="profile-dropdown-menu">
                    <div className="dropdown-header">
                        <div className="dropdown-user-info">
                            <h4>{user?.institutionName}</h4>
                            <p>{user?.email}</p>
                        </div>
                    </div>

                    <div className="dropdown-menu-items">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="dropdown-item"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="dropdown-item-icon">
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="dropdown-footer">
                        <button 
                            className="dropdown-logout"
                            onClick={logout}
                        >
                            <span className="dropdown-item-icon">🚪</span>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown; 