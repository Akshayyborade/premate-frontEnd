import { useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { authService } from '../../../../services/api/auth.service';
import { toast } from 'react-toastify';

const TokenRefresher = () => {
    const { user, logout } = useAuth();

    useEffect(() => {
        if (!user) return;

        const refreshToken = async () => {
            try {
                await authService.refreshToken();
            } catch (error) {
                console.error('Token refresh failed:', error);
                toast.error('Session expired. Please login again.');
                logout();
            }
        };

        // Refresh token every 14 minutes
        const interval = setInterval(refreshToken, 14 * 60 * 1000);

        // Initial refresh
        refreshToken();

        return () => clearInterval(interval);
    }, [user, logout]);

    return null;
};

export default TokenRefresher; 