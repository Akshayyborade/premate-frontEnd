import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="admin-header">
            <div className="header-content">
                <div className="header-title">
                    <h1>Dashboard</h1>
                </div>
                <div className="header-actions">
                    <div className="user-info">
                        <span className="user-name">{user?.name}</span>
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 