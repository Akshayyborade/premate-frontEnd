import axios from 'axios';
import { API_BASE_URL } from '../services/config';

const taskService = {
    // Get all tasks
    getAllTasks: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tasks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    // Create a new task
    createTask: async (taskData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    // Update a task
    updateTask: async (taskId, taskData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    // Delete a task
    deleteTask: async (taskId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    },

    // Update task status
    updateTaskStatus: async (taskId, status) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}/status`, { status });
            return response.data;
        } catch (error) {
            console.error('Error updating task status:', error);
            throw error;
        }
    }
};

export default taskService; 