export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    avatar?: string;
    lastLogin?: string;
}

export interface Role {
    id: string;
    name: string;
    permissions: string[];
    description: string;
}

export interface SystemSetting {
    id: string;
    key: string;
    value: string;
    type: 'number' | 'boolean' | 'text';
    description: string;
}

export interface Permission {
    id: string;
    name: string;
    description: string;
    category: string;
}

export interface AuditLog {
    id: string;
    action: string;
    user: string;
    timestamp: string;
    details: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: string;
}

export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    totalRoles: number;
    totalSettings: number;
    recentActivities: AuditLog[];
    unreadNotifications: number;
} 