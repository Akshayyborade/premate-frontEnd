import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../components/features/Auth/LoginForm/LoginForm';
import AuthLayout from '../../components/layout/AuthLayout/AuthLayout';
import Spinner from '../../components/common/Spinner/Spinner';
import './Auth.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Login = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // Show loading spinner while checking auth status
    if (loading) {
        return (
            <AuthLayout>
                <div className="auth-loading">
                    <Spinner fullScreen></Spinner>
                </div>
            </AuthLayout>
        );
    }
   console.log(user);
    // Redirect if user is already logged in
    if (user) {
        // Check user role and redirect accordingly
        if (user.role === 'teacher') {
            return <Navigate to="/teacher/dashboard" replace />;
        } else if (user.role === 'admin') {
            return <Navigate to="/teacher/dashboard" replace />;
        }
        // Add more role checks here if needed
    }

    const handleLoginSuccess = () => {
        // Check user role and navigate accordingly
        if (user?.role === 'teacher') {
            navigate('/teacher/dashboard');
        } else if (user?.role === 'admin') {
            navigate('/teacher/dashboard');
        }
        // Add more role checks here if needed
    };

    return (
        <AuthLayout>
          
            <div className="auth-container">
                
            <Link to="/" className="back-link-login">
                ← Back to Home
            </Link> 
                <div className="auth-card">
                    <LoginForm onSuccess={handleLoginSuccess} />
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login; 