export const PERMISSIONS = {
    // System Admin Permissions
    MANAGE_LICENSES: 'Manage Licenses',
    MANAGE_SUBSCRIPTIONS: 'Manage Subscriptions',
    VIEW_BILLING: 'View Billing',
    MANAGE_PAYMENTS: 'Manage Payments',
    SYSTEM_CONFIG: 'System Configuration',
    
    // Admin Permissions
    MANAGE_USERS: 'Manage Users',
    MANAGE_ROLES: 'Manage Roles',
    SYSTEM_SETTINGS: 'System Settings',
    VIEW_REPORTS: 'View Reports',
    MANAGE_COURSES: 'Manage Courses',
    MANAGE_EXAMS: 'Manage Exams',
    VIEW_STUDENTS: 'View Students',
    
    // Teacher Permissions
    GRADE_ASSIGNMENTS: 'Grade Assignments',
    VIEW_COURSES: 'View Courses',
    TAKE_EXAMS: 'Take Exams',
    
    // Student Permissions
    SUBMIT_ASSIGNMENTS: 'Submit Assignments',
    VIEW_GRADES: 'View Grades'
} as const;

export const PERMISSION_CATEGORIES = {
    USER_MANAGEMENT: 'User Management',
    ROLE_MANAGEMENT: 'Role Management',
    SETTINGS_MANAGEMENT: 'Settings Management',
    AUDIT_LOGS: 'Audit Logs',
    DASHBOARD: 'Dashboard'
};

export const USER_ROLES = {
    SYSTEM_ADMIN: 'System Admin',
    ADMIN: 'Admin',
    TEACHER: 'Teacher',
    STUDENT: 'Student'
} as const;

export const SETTING_TYPES = {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean'
} as const;

export const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
};

export const TABLE_PAGE_SIZE = 10;

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const API_ENDPOINTS = {
    USERS: '/api/admin/users',
    ROLES: '/api/admin/roles',
    SETTINGS: '/api/admin/settings',
    AUDIT_LOGS: '/api/admin/audit-logs',
    NOTIFICATIONS: '/api/admin/notifications',
    DASHBOARD: '/api/admin/dashboard'
};

export const LICENSE_TYPES = {
    FREE: 'free',
    BASIC: 'basic',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise'
} as const;

export const SUBSCRIPTION_STATUS = {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    PENDING: 'pending'
} as const; 