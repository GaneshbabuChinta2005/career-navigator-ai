import axios from 'axios';

// Create an Axios instance with default configuration
// In a real app, VITE_API_URL would be in .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the auth token to requests
api.interceptors.request.use(
    (config) => {
        // We would typically get the token from localStorage or Zustand store here
        // For now, we'll check localStorage as a fallback or integration point
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login, clear token)
            // window.location.href = '/login'; // Simple redirect, or use a customized event
            console.warn('Unauthorized access - redirecting to login...');
        }
        return Promise.reject(error);
    }
);
