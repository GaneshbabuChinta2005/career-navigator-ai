import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText: ReactNode;
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  footerText,
}: AuthLayoutProps) => {
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
          <h1 className="text-3xl font-bold font-display text-foreground">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {children}

        <div className="text-center text-sm text-muted-foreground">
          {footerText}
        </div>
      </div>
    </div>
  );
};
