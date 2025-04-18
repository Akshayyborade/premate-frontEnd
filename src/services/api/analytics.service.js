import axios from 'axios';
import { API_BASE_URL } from './config';

class AnalyticsService {
    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/analytics`,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    async getDashboardStats() {
        try {
            const response = await this.api.get('/dashboard-stats');
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    }

    async getEnrollmentTrends(timeframe = 'monthly') {
        try {
            const response = await this.api.get(`/enrollment-trends?timeframe=${timeframe}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching enrollment trends:', error);
            throw error;
        }
    }

    async getAttendanceStats(timeframe = 'weekly') {
        try {
            const response = await this.api.get(`/attendance-stats?timeframe=${timeframe}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching attendance stats:', error);
            throw error;
        }
    }

    async getRevenueAnalytics(timeframe = 'monthly') {
        try {
            const response = await this.api.get(`/revenue-analytics?timeframe=${timeframe}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching revenue analytics:', error);
            throw error;
        }
    }
}

export default new AnalyticsService(); 