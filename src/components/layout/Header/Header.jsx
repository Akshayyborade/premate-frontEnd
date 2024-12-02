// Header.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

const Header = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { user, logout } = useAuth();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        
        if (isLoggingOut) return;

        try {
            setIsLoggingOut(true);
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally add user feedback here
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className={`admin-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-content">
                <div className="header-title" role="banner">
                    <h1>{user?.institutionName || 'Dashboard'}</h1>
                </div>
                <div className="header-actions">
                    <div 
                        className="user-info"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <div className="user-avatar">
                            {user?.institutionName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="user-name" aria-label="User name">
                            {user?.ownerName || 'User'}
                        </span>
                        <div className={`user-dropdown ${showDropdown ? 'show' : ''}`}>
                            <div className="dropdown-content">
                                <button 
                                    className={`logout-btn ${isLoggingOut ? 'logging-out' : ''}`}
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    aria-label={isLoggingOut ? "Logging out..." : "Logout"}
                                >
                                    <span className="logout-icon">➜</span>
                                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;