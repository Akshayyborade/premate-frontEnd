import axios from 'axios';
import { CONFIG } from '../config';
import { API_BASE_URL } from '../config';

class AuthService {
    constructor() {
        this._accessToken = null;
        this._user = null;

        this.api = axios.create({
            baseURL: API_BASE_URL || 'https://api.yourapp.com',
            timeout: CONFIG.API_TIMEOUT,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        this.setupInterceptors();
    }

    setupInterceptors() {
        // Request Interceptor
        this.api.interceptors.request.use(
            (config) => {
                const token = this.getAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response Interceptor
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Handle token refresh for 401 errors
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const response = await this.refreshToken();
                        this._accessToken = response.accessToken;
                        
                        // Retry original request
                        originalRequest.headers.Authorization = `Bearer ${this._accessToken}`;
                        return this.api(originalRequest);
                    } catch (refreshError) {
                        this.clearAuth();
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    async register(userData) {
        try {
            const response = await this.api.post('/auth/signup', {
                ...userData,
                appUserRole: 'ADMIN',
                locked: false,
                enabled: false
            });

            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            this.handleRegistrationError(error);
        }
    }

    async login(email, password) {
        try {
            const response = await this.api.post('/auth/adminLogin', { email, password });
            console.log(response);
            
            if (response.data) {
                const { admin, accessToken } = response.data;
                this.setAuthData(admin, accessToken);
                // // Store access token in localStorage
                localStorage.setItem('accessToken', accessToken);
                return response.data;
            }
            throw new Error('Invalid response format');
        } catch (error) {
            this.handleLoginError(error);
        }
    }

    async logout() {
        try {
            await this.api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuth();
        }
    }

    async refreshToken() {
        try {
            const response = await this.api.post('/auth/refresh-token');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    setAuthData(admin, accessToken) {
        console.log('Setting auth data:', admin, accessToken); // Debug log
        this._accessToken = accessToken;
        this._user = admin;
        
        // Store non-sensitive user data
        localStorage.setItem(CONFIG.USER_DATA_KEY, JSON.stringify({
            id: admin.institutionId,
            email: admin.email,
            appUserRole: admin.appUserRole
        }));
    }

    clearAuth() {
        this._accessToken = null;
        this._user = null;
        localStorage.removeItem(CONFIG.USER_DATA_KEY);
    }

    getCurrentUser() {
        if (this._user) return this._user;
        
        const userData = localStorage.getItem(CONFIG.USER_DATA_KEY);
        console.log('Retrieved user data:', userData); // Debug log
        return userData ? JSON.parse(userData) : null;
    }

    isAuthenticated() {
        const isAuth = !!this.getAccessToken() && !!this.getCurrentUser();
        console.log('Is Authenticated:', isAuth); // Debug log
        console.log('Access Token:', this.getAccessToken()); // Debug log
        console.log('Current User:', this.getCurrentUser()); // Debug log
        return isAuth;
    }

    getAccessToken() {
        return this._accessToken || localStorage.getItem('accessToken');
    }

    handleRegistrationError(error) {
        const errorMap = {
            409: 'User already exists',
            400: 'Invalid registration data',
            422: 'Invalid email or password format',
            500: 'Server error. Please try again later.'
        };

        const status = error.response?.status;
        const message = error.response?.data?.message || errorMap[status] || 'Registration failed';
        
        throw new Error(message);
    }

    handleLoginError(error) {
        const errorMap = {
            401: 'Invalid email or password',
            423: 'Account not verified',
            429: 'Too many login attempts'
        };

        const status = error.response?.status;
        const message = error.response?.data?.message || errorMap[status] || 'Login failed';
        
        throw new Error(message);
    }

    async verifyEmail(token) {
        try {
            const response = await this.api.get(`/auth/verify-email?token=${token}`);
            return {
                success: true,
                message: response.data
            };
        } catch (error) {
            throw new Error(error.response?.data || 'Email verification failed');
        }
    }

    async checkEmail(email) {
        try {
            console.log('Checking email availability:', email);
            const response = await this.api.post('/auth/check-email', null, {
                params: { email }  // Send email as query parameter
            });

            console.log('Email check response:', response.data);

            // Handle the ApiResponse structure from your backend
            if (response.data.data === true) {
                // Email exists
                return { isAvailable: false };
            } else {
                // Email is available
                return { isAvailable: true };
            }
        } catch (error) {
            console.error('Email check error:', error);
            if (error.response?.status === 400) {
                // Invalid email format
                throw new Error('Invalid email format');
            }
            throw error;
        }
    }
}

export const authService = new AuthService();