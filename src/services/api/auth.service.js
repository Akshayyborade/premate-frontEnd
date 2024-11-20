import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../Constant/api';
import { CONFIG } from '../config';

class AuthService {
    constructor() {
        this._accessToken = null;
        this._user = null;

        this.api = axios.create({
            baseURL: API_BASE_URL,
            timeout: CONFIG.API_TIMEOUT,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        // Update request interceptor
        this.api.interceptors.request.use(
            (config) => {
                if (this._accessToken) {
                    config.headers.Authorization = `Bearer ${this._accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Update response interceptor
        this.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        // Refresh token endpoint will use the HTTP-only cookie
                        const response = await this.api.post('/auth/refresh-token');
                        this._accessToken = response.data.accessToken;
                        
                        // Retry the original request with new token
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

    async register(formData) {
        console.log('Starting registration process...', { formData }); // Debug
        try {
            const response = await this.api.post('/auth/signup', {
                email: formData.email,
                password: formData.password,
                institutionName: formData.institutionName,
                website: formData.website,
                foundingDate: formData.foundingDate,
                slogan: formData.slogan,
                appUserRole: 'ADMIN',
                locked: false,
                enabled: false
            });

            console.log('Registration successful:', response.data); // Debug
            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            console.error('Registration error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            }); // Enhanced error logging

            // If there's a response from the server
            if (error.response) {
                const errorMessage = error.response.data?.message || 'Registration failed';
                switch (error.response.status) {
                    case 409:
                        throw new Error('already registered.');
                    case 400:
                        throw new Error(errorMessage || 'Invalid registration data');
                    case 422:
                        throw new Error('Invalid email or password format');
                    case 500:
                        throw new Error('Server error. Please try again later.');
                    default:
                        throw new Error(errorMessage);
                }
            }
            
            // Network or other errors
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
    }

    async login(email, password) {
        try {
            const response = await this.api.post(API_ENDPOINTS.AUTH.LOGIN_ADMIN, {
                email,
                password
            });
            console.log(response.data);
            if (response.data) {
                const { admin, accessToken } = response.data;
                this._accessToken = accessToken;
                this._user = admin;

                // Store non-sensitive user data
                localStorage.setItem(CONFIG.USER_DATA_KEY, JSON.stringify({
                    id: admin.institutionId,
                    email: admin.email,
                    institutionName: admin.institutionName
                }));

                return response.data;
            }
            throw new Error('Invalid response format');
        } catch (error) {
            console.error('Login error:', error);
            this.handleLoginError(error);
        }
    }

    async logout() {
        try {
            await this.api.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuth();
        }
    }

    clearAuth() {
        this._accessToken = null;
        this._user = null;
        localStorage.removeItem(CONFIG.USER_DATA_KEY);
    }

    getCurrentUser() {
        if (this._user) return this._user;
        
        const userData = localStorage.getItem(CONFIG.USER_DATA_KEY);
        if (userData) {
            this._user = JSON.parse(userData);
            return this._user;
        }
        return null;
    }

    isAuthenticated() {
        return !!this.getAccessToken() && !!this.getCurrentUser();
    }

    handleLoginError(error) {
        console.error('Handling login error:', error); // Debugging line
        const status = error.response?.status;
        const message = error.response?.data?.message;

        switch (status) {
            case 401:
                throw new Error('Invalid email or password');
            case 423:
                throw new Error('Account not verified. Please check your email');
            case 429:
                throw new Error('Too many login attempts. Please try again later');
            default:
                throw new Error(message || 'Login failed');
        }
    }

    async verifyEmail(token) {
        console.log('Verifying email with token:', token); // Debugging line
        try {
            const response = await this.api.get(`/api/auth/verify-email?token=${token}`);
            console.log('Verify email response:', response); // Debugging line
            return {
                success: true,
                message: response.data
            };
        } catch (error) {
            console.error('Verify email error:', error); // Debugging line
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

    getAccessToken() {
        return this._accessToken;
    }
}

export const authService = new AuthService(); 
