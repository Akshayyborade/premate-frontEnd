import axios from 'axios';
import { API_BASE_URL } from './config';

class NotificationService {
    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/notifications`,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    async getNotifications() {
        try {
            const response = await this.api.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }

    async markAsRead(notificationId) {
        try {
            const response = await this.api.patch(`/${notificationId}/read`);
            return response.data;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }

    async markAllAsRead() {
        try {
            const response = await this.api.patch('/read-all');
            return response.data;
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            throw error;
        }
    }

    async deleteNotification(notificationId) {
        try {
            const response = await this.api.delete(`/${notificationId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    }

    async getUnreadCount() {
        try {
            const response = await this.api.get('/unread-count');
            return response.data;
        } catch (error) {
            console.error('Error fetching unread notification count:', error);
            throw error;
        }
    }

    async createNotification(notificationData) {
        try {
            const response = await this.api.post('/', notificationData);
            return response.data;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    }
}

export default new NotificationService(); 