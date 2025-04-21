import { User, Role, SystemSetting, AuditLog, Notification, DashboardStats } from './types';

// Mock API calls - replace with actual API endpoints
const API_BASE_URL = '/api/admin';

export const adminService = {
    // User Management
    async getUsers(): Promise<User[]> {
        // Mock implementation
        return [];
    },

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        // Mock implementation
        return { ...user, id: '1' };
    },

    async updateUser(id: string, user: Partial<User>): Promise<User> {
        // Mock implementation
        return { ...user, id } as User;
    },

    async deleteUser(id: string): Promise<void> {
        // Mock implementation
    },

    // Role Management
    async getRoles(): Promise<Role[]> {
        // Mock implementation
        return [];
    },

    async createRole(role: Omit<Role, 'id'>): Promise<Role> {
        // Mock implementation
        return { ...role, id: '1' };
    },

    async updateRole(id: string, role: Partial<Role>): Promise<Role> {
        // Mock implementation
        return { ...role, id } as Role;
    },

    async deleteRole(id: string): Promise<void> {
        // Mock implementation
    },

    // System Settings
    async getSettings(): Promise<SystemSetting[]> {
        // Mock implementation
        return [];
    },

    async createSetting(setting: Omit<SystemSetting, 'id'>): Promise<SystemSetting> {
        // Mock implementation
        return { ...setting, id: '1' };
    },

    async updateSetting(id: string, setting: Partial<SystemSetting>): Promise<SystemSetting> {
        // Mock implementation
        return { ...setting, id } as SystemSetting;
    },

    async deleteSetting(id: string): Promise<void> {
        // Mock implementation
    },

    // Audit Logs
    getAuditLogs: async (): Promise<AuditLog[]> => {
        const response = await fetch(`${API_BASE_URL}/audit-logs`);
        return response.json();
    },

    // Notifications
    getNotifications: async (): Promise<Notification[]> => {
        const response = await fetch(`${API_BASE_URL}/notifications`);
        return response.json();
    },

    markNotificationAsRead: async (id: string): Promise<void> => {
        await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
            method: 'PUT'
        });
    },

    // Dashboard Stats
    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        return response.json();
    }
}; 