import React, { 
    createContext, 
    useState, 
    useEffect, 
    useContext 
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { authService } from '../services/api/auth.service';

const AuthContext = createContext({
    user: null,
    loading: true,
    error: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    verifyEmail: async () => {},
    checkEmail: async () => {},
    isAuthenticated: () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            setLoading(true);
            const currentUser = authService.getCurrentUser();
            const isAuthenticated = authService.isAuthenticated();
            console.log('Current User:', currentUser);
            console.log('Is Authenticated:', isAuthenticated);

            if (currentUser && isAuthenticated) {
                setUser(currentUser);
            } else {
                setUser(null);
                authService.clearAuth();
            }
        } catch (err) {
            console.error('Auth check failed:', err);
            setError(err.message);
            authService.clearAuth();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await authService.login(email, password);
            setUser(response.admin);
            setError(null);
            
            // Navigate based on user role
            switch (response.admin.appUserRole) {
                case 'ADMIN':
                    navigate('/admin/dashboard');
                    break;
                case 'USER':
                    navigate('/dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (err) {
            const errorMessage = err.message || 'Login failed';
            console.log(errorMessage);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            await authService.register(userData);
        } catch (err) {
            const errorMessage = err.message || 'Registration failed';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setError(null);
            navigate('/login');
            toast.success('Logged out successfully');
        } catch (err) {
            console.error('Logout failed:', err);
            toast.error('Logout failed. Please try again.');
        }
    };

    const verifyEmail = async (token) => {
        try {
            const response = await authService.verifyEmail(token);
            toast.success(response.message || 'Email verified successfully');
            navigate('/login');
        } catch (err) {
            const errorMessage = err.message || 'Email verification failed';
            toast.error(errorMessage);
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

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        verifyEmail,
        checkEmail,
        isAuthenticated: () => authService.isAuthenticated()
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContext;