import axios from 'axios';
import { API_BASE_URL } from '../config';

const analyticsService = {
    // Fetch enrollment analytics
    getEnrollmentAnalytics: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/analytics/enrollments`);
            return response.data;
        } catch (error) {
            console.error('Error fetching enrollment analytics:', error);
            throw error;
        }
    },

    // Fetch attendance analytics
    getAttendanceAnalytics: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/analytics/attendance`);
            return response.data;
        } catch (error) {
            console.error('Error fetching attendance analytics:', error);
            throw error;
        }
    },

    // Fetch revenue analytics
    getRevenueAnalytics: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/analytics/revenue`);
            return response.data;
        } catch (error) {
            console.error('Error fetching revenue analytics:', error);
            throw error;
        }
    },

    // Fetch student performance analytics
    getStudentPerformance: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/analytics/performance`);
            return response.data;
        } catch (error) {
            console.error('Error fetching student performance:', error);
            throw error;
        }
    }
};

export default analyticsService; 