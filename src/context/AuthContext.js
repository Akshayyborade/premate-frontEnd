import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api/auth.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            setLoading(true);
            const currentUser = authService.getCurrentUser();
            const accessToken = authService.getAccessToken();
            
            if (currentUser && accessToken) {
                setUser(currentUser);
                setIsEmailVerified(currentUser.enabled);
            } else {
                setUser(null);
                setIsEmailVerified(false);
                authService.clearAuth();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setError(error.message);
            authService.clearAuth();
            setUser(null);
            setIsEmailVerified(false);
        } finally {
            setLoading(false);
        }
    };

    const isAuthenticated = () => {
        const currentUser = authService.getCurrentUser();
        const accessToken = authService.getAccessToken();
        return Boolean(currentUser && accessToken);
    };

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            setUser(response.admin);
            console.log(response.admin);
            setIsEmailVerified(response.admin.enabled);
            
            if (response.admin.appUserRole === 'ADMIN') {
                navigate('/admin/dashboard');
            }
            
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (formData) => {
        try {
            const response = await authService.register(formData);
            return response;
        } catch (error) {
            // Make sure we're not modifying any state here that could trigger a re-render
            throw error; // Just propagate the error
        }
    };

    const checkEmail = async (email) => {
        try {
            const response = await authService.checkEmail(email);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsEmailVerified(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again.');
        }
    };

    const value = {
        user,
        loading,
        isEmailVerified,
        error,
        login,
        register,
        logout,
        checkAuth,
        checkEmail,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
}; 