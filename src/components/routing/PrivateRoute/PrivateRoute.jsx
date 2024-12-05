import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Spinner from '../../common/Spinner/Spinner';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children, role, redirectTo = '/login' }) => {
    const { user, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    // More robust loading and authentication check
    useEffect(() => {
        if (!loading && !isAuthenticated()) {
            toast.error('Please log in to access this page');
        }
    }, [loading, isAuthenticated]);

    // Show loading spinner during initial authentication check
    if (loading) {
        return <Spinner fullScreen />;
    }

    // Check authentication status
    if (!isAuthenticated()) {
        return <Navigate
            to={redirectTo}
            state={{ 
                from: location.pathname,
                message: 'You must be logged in to access this page'
            }}
            replace
        />;
    }
    console.log(user.appUserRole);
    // Check role-based authorization
    if (role && user?.appUserRole !== role) {
        toast.error('You are not authorized to access this page');
        return <Navigate
            to="/unauthorized"
            state={{ 
                from: location.pathname,
                requiredRole: role,
                userRole: user?.appUserRole
            }}
            replace
        />;
    }

    // If all checks pass, render children
    return children;
};

export default PrivateRoute;