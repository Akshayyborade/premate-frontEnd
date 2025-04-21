import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        username: string;
        role: string;
        name: string;
    };
}

class ApiService {
    private static instance: ApiService;
    private token: string | null = null;

    private constructor() {
        // Initialize axios instance
        axios.defaults.baseURL = API_BASE_URL;
        
        // Add token to requests if it exists
        axios.interceptors.request.use(config => {
            if (this.token) {
                config.headers.Authorization = `Bearer ${this.token}`;
            }
            return config;
        });
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    // Login endpoint
    public async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const response = await axios.post('/auth/login', credentials);
            this.token = response.data.token;
            localStorage.setItem('adminToken', "");
            return response.data;
        } catch (error) {
            throw new Error('Login failed: ' + (error as any).response?.data?.message || 'Unknown error');
        }
    }

    // Dashboard data endpoint
    public async getDashboardData() {
        try {
            const response = await axios.get('/admin/dashboard');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch dashboard data');
        }
    }

    // Check if user is authenticated
    public isAuthenticated(): boolean {
        return !!this.token;
    }

    // Get stored token
    public getToken(): string | null {
        return this.token;
    }

    // Logout
    public logout(): void {
        this.token = null;
        localStorage.removeItem('adminToken');
    }
}

export default ApiService; 