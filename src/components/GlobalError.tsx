import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export const GlobalError = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
            <div className="flex max-w-md flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-destructive/10 p-4">
                    <AlertCircle className="h-10 w-10 text-destructive" />
                </div>
                <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
                <p className="text-muted-foreground">
                    {isRouteErrorResponse(error)
                        ? `${error.status} ${error.statusText}`
                        : error instanceof Error
                            ? error.message
                            : 'An unexpected error occurred'}
                </p>
                <div className="flex gap-2">
                    <Button onClick={() => window.location.reload()} variant="default">
                        Try Again
                    </Button>
                    <Button onClick={() => window.location.href = '/'} variant="outline">
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
};
