import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Target,
    Map,
    PlayCircle,
    User,
    LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';

const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Skill Gap', href: '/app/skill-gap', icon: Target },
    { name: 'Roadmap', href: '/app/roadmap', icon: Map },
    { name: 'Simulation', href: '/app/simulation', icon: PlayCircle },
    { name: 'Profile', href: '/app/profile', icon: User },
];

const Sidebar = () => {
    const { user, logout } = useAuthStore();

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
            <div className="flex flex-col flex-1 min-h-0 bg-card border-r">
                {/* Logo */}
                <div className="flex items-center h-16 flex-shrink-0 px-6 border-b">
                    <Target className="h-8 w-8 text-primary" />
                    <span className="ml-2 text-xl font-bold">CareerNav</span>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 p-4 border-b">
                    <Avatar>
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                )
                            }
                        >
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer - Logout & Theme Toggle */}
                <div className="flex-shrink-0 p-4 border-t space-y-2">
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            className="flex-1 justify-start gap-3"
                            onClick={logout}
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
