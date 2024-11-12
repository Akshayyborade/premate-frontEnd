import { useEffect } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { authService } from '../../../../services/api/auth.service';

const TokenRefresher = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const refreshToken = async () => {
            try {
                const response = await authService.refreshToken();
                localStorage.setItem('token', response.token);
            } catch (error) {
                console.error('Failed to refresh token:', error);
            }
        };

        // Refresh token every 14 minutes (assuming token expires in 15 minutes)
        const interval = setInterval(refreshToken, 14 * 60 * 1000);

        return () => clearInterval(interval);
    }, [user]);

    return null;
};

export default TokenRefresher; 