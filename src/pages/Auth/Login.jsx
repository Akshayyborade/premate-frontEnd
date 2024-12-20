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
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleLoginSuccess = () => {
        navigate('/admin/dashboard');
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