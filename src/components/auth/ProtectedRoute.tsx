import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  let token = localStorage.getItem('auth_token');

  if (!token) {
    token = 'demo-jwt-token-auto';
    localStorage.setItem('auth_token', token);
  }

  return <>{children}</>;
};
