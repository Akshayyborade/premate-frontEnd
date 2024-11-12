export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9095/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/signup',
        LOGOUT: '/auth/logout'
    },
    USERS: {
        PROFILE: '/users/profile',
        UPDATE: '/users/update'
    }
}; 