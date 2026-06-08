import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, login } = useAuthStore();

    if (!isAuthenticated) {
        // Auto-login with default demo credentials
        login({
            id: 'demo-user-123',
            name: 'Demo User',
            email: 'demo@career.ai',
            role: 'user',
        }, 'demo-jwt-token-auto');
    }

    return children;
};
