import axios from 'axios';
import { API_BASE_URL } from '../config';

export const alertService = {
    getAlerts: async () => {
        const response = await axios.get(`${API_BASE_URL}/alerts`);
        return response.data;
    },

    dismissAlert: async (alertId) => {
        await axios.patch(`${API_BASE_URL}/alerts/${alertId}/dismiss`);
    }
}; 