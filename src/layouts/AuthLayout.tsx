import { ReactNode } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
    children?: ReactNode;
    title?: string;
    subtitle?: string;
    footerText?: ReactNode;
}

const AuthLayout = ({ children, title, subtitle, footerText }: AuthLayoutProps) => {
    // Check if we have props (meaning it's being used as a wrapper component)
    const isWrapper = !!(children || title);

    if (isWrapper) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-3">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to home
                        </Link>
                        {title && <h1 className="text-3xl font-bold font-display text-foreground">{title}</h1>}
                        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
                    </div>

                    {children}

                    {footerText && (
                        <div className="text-center text-sm text-muted-foreground">
                            {footerText}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default router layout usage
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
