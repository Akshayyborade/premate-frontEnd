import axios from 'axios';
import { API_BASE_URL } from '../config';

export const taskService = {
    getTasks: async () => {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        return response.data;
    },

    createTask: async (taskData) => {
        const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
        return response.data;
    },

    toggleTask: async (taskId) => {
        const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}/toggle`);
        return response.data;
    },

    deleteTask: async (taskId) => {
        await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    }
}; 