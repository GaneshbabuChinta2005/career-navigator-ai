import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    return children;
};
