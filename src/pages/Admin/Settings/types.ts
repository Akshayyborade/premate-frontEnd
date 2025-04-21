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

export interface License {
    id: string;
    type: 'free' | 'basic' | 'premium' | 'enterprise';
    name: string;
    description: string;
    features: string[];
    price: number;
    duration: number; // in months
    maxUsers: number;
    isActive: boolean;
}

export interface Subscription {
    id: string;
    licenseId: string;
    organizationId: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'cancelled' | 'pending';
    paymentStatus: 'paid' | 'unpaid' | 'pending';
    totalAmount: number;
    currency: string;
    billingCycle: 'monthly' | 'yearly';
    autoRenew: boolean;
}

export interface Payment {
    id: string;
    subscriptionId: string;
    amount: number;
    currency: string;
    status: 'success' | 'failed' | 'pending';
    paymentMethod: string;
    transactionId: string;
    paymentDate: string;
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
    totalSubscriptions: number;
    activeSubscriptions: number;
    totalRevenue: number;
    recentActivities: AuditLog[];
    unreadNotifications: number;
} 