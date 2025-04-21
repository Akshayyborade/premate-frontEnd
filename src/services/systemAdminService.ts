import axios from 'axios';
import { message } from 'antd';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface SystemAdminCredentials {
    username: string;
    password: string;
}

export interface SystemAdminToken {
    token: string;
    expiresIn: number;
}

// Mock system admin credentials
const MOCK_ADMIN = {
    username: 'admin',
    password: 'admin123',
    token: 'mock-system-admin-token-123456789',
    expiresIn: 3600 // 1 hour in seconds
};

class SystemAdminService {
    private static instance: SystemAdminService;
    private token: string | null = null;
    private tokenExpiration: number | null = null;

    private constructor() {}

    public static getInstance(): SystemAdminService {
        if (!SystemAdminService.instance) {
            SystemAdminService.instance = new SystemAdminService();
        }
        return SystemAdminService.instance;
    }

    public async login(credentials: SystemAdminCredentials): Promise<boolean> {
        try {
            // Mock authentication
            if (credentials.username === MOCK_ADMIN.username && 
                credentials.password === MOCK_ADMIN.password) {
                
                this.token = MOCK_ADMIN.token;
                this.tokenExpiration = Date.now() + MOCK_ADMIN.expiresIn * 1000;
                
                // Store token in localStorage
                localStorage.setItem('systemAdminToken', this.token);
                localStorage.setItem('systemAdminTokenExpiration', this.tokenExpiration.toString());
                
                console.log('Mock system admin login successful');
                return true;
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('System admin login failed:', error);
            message.error('System admin login failed. Please check your credentials.');
            return false;
        }
    }

    public async logout(): Promise<void> {
        this.token = null;
        this.tokenExpiration = null;
        localStorage.removeItem('systemAdminToken');
        localStorage.removeItem('systemAdminTokenExpiration');
        console.log('System admin logged out');
    }

    public isAuthenticated(): boolean {
        if (!this.token || !this.tokenExpiration) {
            return false;
        }
        return Date.now() < this.tokenExpiration;
    }

    public getToken(): string | null {
        return this.token;
    }

    public async initialize(): Promise<void> {
        const storedToken = localStorage.getItem('systemAdminToken');
        const storedExpiration = localStorage.getItem('systemAdminTokenExpiration');
        
        if (storedToken && storedExpiration) {
            const expirationTime = parseInt(storedExpiration);
            if (Date.now() < expirationTime) {
                this.token = storedToken;
                this.tokenExpiration = expirationTime;
                console.log('System admin session restored');
            } else {
                await this.logout();
            }
        }
    }

    // Mock API methods
    public async mockApiCall(endpoint: string, data?: any): Promise<any> {
        if (!this.isAuthenticated()) {
            throw new Error('Not authenticated');
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock responses for different endpoints
        switch (endpoint) {
            case '/users':
                return {
                    data: [
                        { id: 1, name: 'John Doe', role: 'teacher' },
                        { id: 2, name: 'Jane Smith', role: 'student' }
                    ]
                };
            case '/settings':
                return {
                    data: {
                        systemName: 'School Management System',
                        version: '1.0.0',
                        maintenanceMode: false
                    }
                };
            default:
                return { data: 'Mock API response' };
        }
    }
}

export default SystemAdminService; 