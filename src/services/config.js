import axios from 'axios';
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9095/api';

export const CONFIG = {
    API_TIMEOUT: 30000,
    TOKEN_KEY: 'token',
    USER_DATA_KEY: 'userData',
    ADMIN_ID_KEY: 'adminId',
}; 


const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
