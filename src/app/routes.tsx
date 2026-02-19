import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { Loader2 } from 'lucide-react';
import { GlobalError } from '@/components/GlobalError';

// Lazy load layouts
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const MainLayout = lazy(() => import('@/layouts/MainLayout'));

// Lazy load pages
const Index = lazy(() => import('@/pages/Index'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Roadmap = lazy(() => import('@/pages/Roadmap'));
const SkillGap = lazy(() => import('@/pages/SkillGap'));
const Simulation = lazy(() => import('@/pages/Simulation'));
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const PageLoader = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
);

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <GlobalError />,
        element: (
            <Suspense fallback={<PageLoader />}>
                <Index />
            </Suspense>
        ),
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<PageLoader />}>
                <AuthLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Login />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/signup',
        element: (
            <Suspense fallback={<PageLoader />}>
                <AuthLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Signup />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/app',
        errorElement: <GlobalError />,
        element: (
            <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                    <MainLayout />
                </Suspense>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/app/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: 'roadmap',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Roadmap />
                    </Suspense>
                ),
            },
            {
                path: 'skill-gap',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <SkillGap />
                    </Suspense>
                ),
            },
            {
                path: 'simulation',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Simulation />
                    </Suspense>
                ),
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Profile />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '*',
        element: (
            <Suspense fallback={<PageLoader />}>
                <NotFound />
            </Suspense>
        ),
    },
]);
