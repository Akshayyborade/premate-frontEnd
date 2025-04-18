import axios from 'axios';
import { API_BASE_URL } from '../services/config';

const timetableService = {
    // Get all timetables
    getAllTimetables: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/timetables`);
            return response.data;
        } catch (error) {
            console.error('Error fetching timetables:', error);
            throw error;
        }
    },

    // Get timetable by ID
    getTimetableById: async (timetableId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/timetables/${timetableId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching timetable:', error);
            throw error;
        }
    },

    // Create a new timetable
    createTimetable: async (timetableData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/timetables`, timetableData);
            return response.data;
        } catch (error) {
            console.error('Error creating timetable:', error);
            throw error;
        }
    },

    // Update a timetable
    updateTimetable: async (timetableId, timetableData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/timetables/${timetableId}`, timetableData);
            return response.data;
        } catch (error) {
            console.error('Error updating timetable:', error);
            throw error;
        }
    },

    // Delete a timetable
    deleteTimetable: async (timetableId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/timetables/${timetableId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting timetable:', error);
            throw error;
        }
    },

    // Get timetable by date range
    getTimetableByDateRange: async (startDate, endDate) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/timetables/range`, {
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching timetable by date range:', error);
            throw error;
        }
    },

    // Get timetable by user
    getTimetableByUser: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/timetables/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user timetable:', error);
            throw error;
        }
    }
};

export default timetableService; 