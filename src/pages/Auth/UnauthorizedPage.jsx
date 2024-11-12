import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import './Auth.css';

const UnauthorizedPage = () => {
    const { user } = useAuth();

    return (
        <div className="unauthorized-page">
            <div className="unauthorized-content">
                <div className="unauthorized-icon">🔒</div>
                <h1>Access Denied</h1>
                <p>
                    {user 
                        ? "You don't have permission to access this page."
                        : "Please log in to access this page."}
                </p>
                <div className="unauthorized-actions">
                    <Link to="/">
                        <Button variant="outline">Go to Home</Button>
                    </Link>
                    {!user && (
                        <Link to="/login">
                            <Button variant="primary">Log In</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage; 