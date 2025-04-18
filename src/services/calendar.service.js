import axios from 'axios';
import { API_BASE_URL } from '../services/config';

const calendarService = {
    // Get all events
    getAllEvents: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/calendar/events`);
            return response.data;
        } catch (error) {
            console.error('Error fetching calendar events:', error);
            throw error;
        }
    },

    // Get events for a specific date range
    getEventsByDateRange: async (startDate, endDate) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/calendar/events`, {
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching events by date range:', error);
            throw error;
        }
    },

    // Create a new event
    createEvent: async (eventData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/calendar/events`, eventData);
            return response.data;
        } catch (error) {
            console.error('Error creating calendar event:', error);
            throw error;
        }
    },

    // Update an event
    updateEvent: async (eventId, eventData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/calendar/events/${eventId}`, eventData);
            return response.data;
        } catch (error) {
            console.error('Error updating calendar event:', error);
            throw error;
        }
    },

    // Delete an event
    deleteEvent: async (eventId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/calendar/events/${eventId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting calendar event:', error);
            throw error;
        }
    },

    // Get recurring events
    getRecurringEvents: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/calendar/recurring-events`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recurring events:', error);
            throw error;
        }
    }
};

export default calendarService; 