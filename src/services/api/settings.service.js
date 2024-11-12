import axios from 'axios';
import { API_BASE_URL } from '../config';

export const settingsService = {
    getDashboardSettings: async () => {
        const response = await axios.get(`${API_BASE_URL}/settings/dashboard`);
        return response.data;
    },

    updateDashboardSettings: async (settings) => {
        const response = await axios.put(`${API_BASE_URL}/settings/dashboard`, settings);
        return response.data;
    }
}; 