import { QueryClient } from '@tanstack/react-query';

// Create a client for React Query
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
            retry: 1, // Retry failed requests once
            refetchOnWindowFocus: false, // Do not refetch when window gains focus (optional, good for UX)
        },
    },
});
