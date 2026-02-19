import { api } from '@/lib/api';
import { User } from '@/store/useAuthStore';

interface LoginCredentials {
    email: string;
    password: string;
}

interface SignupCredentials extends LoginCredentials {
    name: string;
    targetRole?: string;
}

interface AuthResponse {
    status: string;
    token: string;
    data: {
        user: User;
    };
}

// Real authentication service interacting with the backend
export const authService = {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            return {
                user: response.data.data.user,
                token: response.data.token
            };
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    },

    /**
     * Register new user
     */
    async signup(credentials: SignupCredentials): Promise<{ user: User; token: string }> {
        try {
            const response = await api.post<AuthResponse>('/auth/signup', credentials);
            return {
                user: response.data.data.user,
                token: response.data.token
            };
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Signup failed. Please try again.');
        }
    },

    /**
     * Logout current user
     */
    async logout(): Promise<void> {
        try {
            // Optional: Call backend to invalidate token if using blacklist
            // await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    /**
     * Verify current token and get user data
     */
    async verifyToken(_token: string): Promise<User> {
        try {
            const response = await api.get<{ status: string; data: { user: User } }>('/auth/me');
            return response.data.data.user;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Token verification failed');
        }
    },
};
