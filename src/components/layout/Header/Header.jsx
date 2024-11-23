// Header.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import './Header.css';

const Header = () => {
    const auth = useAuth(); // Get the entire auth context
    const [showDropdown, setShowDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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
        
        if (!auth?.logout || isLoggingOut) return; // Guard clause

        try {
            setIsLoggingOut(true);
            await auth.logout();
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
                    <h1>Dashboard</h1>
                </div>
                <div className="header-actions">
                    <div 
                        className="user-info"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <div className="user-avatar">
                            {auth?.user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="user-name" aria-label="User name">
                            {auth?.user?.name || 'User'}
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