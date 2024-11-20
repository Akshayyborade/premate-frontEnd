import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Spinner from '../../common/Spinner/Spinner';

const PrivateRoute = ({ children, role, redirectTo = '/login' }) => {
    const { user, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Spinner fullScreen />;
    }

    const isAuth = isAuthenticated();
    
    if (!isAuth) {
        return <Navigate 
            to={redirectTo} 
            state={{ from: location.pathname }} 
            replace 
        />;
    }

    if (role && user?.appUserRole !== role) {
        return <Navigate 
            to="/unauthorized" 
            state={{ from: location.pathname }} 
            replace 
        />;
    }

    return children;
};

export default PrivateRoute; 