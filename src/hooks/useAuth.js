import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/api/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on mount
        const initAuth = () => {
            try {
                // Only set user if there's a current user
                const currentUser = authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (err) {
                console.error('Auth initialization error:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (type, email, password) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await authService.login(type, email, password);
            setUser(response.admin);
            
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        try {
            authService.logout();
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
            setError(err);
        }
    };

    const updateProfile = async (data) => {
        try {
            setLoading(true);
            const updatedUser = await authService.updateProfile(data);
            setUser(updatedUser);
            return updatedUser;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        updateProfile,
        // Remove isAuthenticated if not needed for public routes
        isAuthenticated: !!user  // Or keep authService.isAuthenticated() if needed
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 