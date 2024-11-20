export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9095/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN_ADMIN: '/auth/adminLogin',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh-token',
        REGISTER: '/auth/signup',
        CHECK_EMAIL: '/auth/check-email',
        VERIFY_EMAIL: '/auth/verify-email'
    },
    USERS: {
        PROFILE: '/users/profile',
        UPDATE: '/users/update'
    }
}; 