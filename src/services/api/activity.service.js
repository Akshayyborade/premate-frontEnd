import axios from 'axios';
import { API_BASE_URL } from '../config';

export const activityService = {
    getRecentActivities: async () => {
        const response = await axios.get(`${API_BASE_URL}/activities/recent`);
        return response.data;
    }
}; 