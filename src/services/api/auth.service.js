import axios from 'axios';
import { API_BASE_URL } from '../config';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Login URL mapping
const LOGIN_ENDPOINTS = {
    teacher: '/api/auth/adminLogin',
    student: '/api/auth/student-login',
    admin: '/api/auth/adminLogin'
};

class AuthService {
    async login(type, email, password) {
        try {
            const endpoint = LOGIN_ENDPOINTS[type];
            if (!endpoint) {
                throw new Error('Invalid login type');
            }

            const response = await api.post(endpoint, { email, password });
            
            if (response.data) {
                this.setUserData(response.data);
            }

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        localStorage.removeItem('adminId');
    }

    setUserData(data) {
        localStorage.setItem('userData', JSON.stringify(data.admin));
        localStorage.setItem('token', data.jwtToken);
        localStorage.setItem('adminId', data.admin.institutionId);
    }

    getCurrentUser() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            return user;
        } catch (error) {
            return null;
        }
    }

    isAuthenticated() {
        return !!this.getCurrentUser();
    }

    async updateProfile(adminData) {
        try {
            const response = await api.put('/admin/profile', adminData);
            
            if (response.data) {
                // Update stored user data if necessary
                const currentUser = this.getCurrentUser();
                const updatedUser = { ...currentUser, ...response.data };
                localStorage.setItem('userData', JSON.stringify(updatedUser));
            }

            return response.data;
        } catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    }

    async changePassword(currentPassword, newPassword) {
        try {
            const response = await api.put('/admin/password', {
                currentPassword,
                newPassword
            });
            return response.data;
        } catch (error) {
            console.error('Change password error:', error);
            throw error;
        }
    }

    getAuthHeader() {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}

export const authService = new AuthService(); 