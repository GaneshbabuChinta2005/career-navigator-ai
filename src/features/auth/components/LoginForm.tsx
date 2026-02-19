import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '../services/auth.service';
import { demoAuthService, isDemoMode } from '../services/demo-auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import { loginSchema, LoginCredentials } from '../types';
import { toast } from 'sonner';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
    });

    // Use demo auth service if demo mode is enabled
    const authSvc = isDemoMode() ? demoAuthService : authService;

    const mutation = useMutation({
        mutationFn: authSvc.login,
        onSuccess: (data) => {
            login(data.user, data.token);
            toast.success(isDemoMode() ? '🎭 Demo mode - Login successful!' : 'Login successful');
            navigate('/app/dashboard');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Login failed');
        },
    });

    const onSubmit = (data: LoginCredentials) => {
        // Create explicitly typed credentials object
        const credentials: LoginCredentials = data;
        mutation.mutate(credentials);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your email and password to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="student@example.com" {...register('email')} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register('password')} />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                    Don't have an account? <Link to="/signup" className="text-primary cursor-pointer hover:underline font-medium">Sign up</Link>
                </p>
            </CardFooter>
        </Card>
    );
};
