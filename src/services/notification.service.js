import axios from 'axios';
import { API_BASE_URL } from '../config';

const notificationService = {
    // Get all notifications
    getAllNotifications: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/notifications`);
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    },

    // Mark notification as read
    markAsRead: async (notificationId) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/notifications/${notificationId}/read`);
            return response.data;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    },

    // Mark all notifications as read
    markAllAsRead: async () => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/notifications/read-all`);
            return response.data;
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            throw error;
        }
    },

    // Delete a notification
    deleteNotification: async (notificationId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    },

    // Get unread notification count
    getUnreadCount: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/notifications/unread-count`);
            return response.data;
        } catch (error) {
            console.error('Error fetching unread notification count:', error);
            throw error;
        }
    }
};

export default notificationService; 