import React from 'react';
import './AuthLayout.css';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="auth-background"></div>
           
            <main className="auth-main">
                {children}
            </main>
        </div>
    );
};

export default AuthLayout; 