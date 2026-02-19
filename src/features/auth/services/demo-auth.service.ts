import { User } from '@/store/useAuthStore';

interface LoginCredentials {
    email: string;
    password: string;
}

interface SignupCredentials extends LoginCredentials {
    name: string;
    targetRole?: string;
}

// Demo mode - accepts any credentials
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const DEMO_USER: User = {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@career.ai',
    role: 'user',
    avatarUrl: undefined,
};

const DEMO_TOKEN = 'demo-jwt-token-' + Math.random().toString(36);

/**
 * Demo authentication service - works without backend
 */
export const demoAuthService = {
    /**
     * Demo login - accepts ANY email/password
     */
    async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Accept any credentials in demo mode
        return {
            user: {
                ...DEMO_USER,
                email: credentials.email,
            },
            token: DEMO_TOKEN,
        };
    },

    /**
     * Demo signup - accepts any credentials
     */
    async signup(credentials: SignupCredentials): Promise<{ user: User; token: string }> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            user: {
                ...DEMO_USER,
                name: credentials.name,
                email: credentials.email,
                role: 'user',
            },
            token: DEMO_TOKEN,
        };
    },

    /**
     * Demo logout
     */
    async logout(): Promise<void> {
        // No-op in demo mode
    },

    /**
     * Demo token verification
     */
    async verifyToken(_token: string): Promise<User> {
        return DEMO_USER;
    },
};

/**
 * Check if demo mode is enabled
 */
export const isDemoMode = () => DEMO_MODE;
