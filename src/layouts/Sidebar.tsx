import { cn } from '@/lib/utils';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Target,
    Map,
    PlayCircle,
    User,
    LogOut,
    Sparkles,
    ChevronRight,
    Zap,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';

const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard, color: 'hsl(185,100%,50%)' },
    { name: 'Skill Gap', href: '/app/skill-gap', icon: Target, color: 'hsl(38,100%,55%)' },
    { name: 'Roadmap', href: '/app/roadmap', icon: Map, color: 'hsl(270,100%,65%)' },
    { name: 'Simulation', href: '/app/simulation', icon: PlayCircle, color: 'hsl(150,80%,50%)' },
    { name: 'AI LaunchPad', href: '/app/ai-tools', icon: Sparkles, color: 'hsl(330,100%,65%)' },
    { name: 'Profile', href: '/app/profile', icon: User, color: 'hsl(200,90%,60%)' },
];

const Sidebar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name: string) =>
        name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-40">
            {/* Sidebar glass panel */}
            <div
                className="flex flex-col flex-1 min-h-0 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, hsl(230 28% 6%) 0%, hsl(230 25% 4%) 100%)',
                    borderRight: '1px solid hsl(230 20% 13%)',
                }}
            >
                {/* Ambient glow orbs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.06) 0%, transparent 70%)' }} />
                <div className="absolute bottom-32 left-0 w-32 h-32 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, hsl(270 100% 65% / 0.06) 0%, transparent 70%)' }} />

                {/* ── Logo ── */}
                <div className="flex items-center h-16 flex-shrink-0 px-5 relative">
                    <div className="flex items-center gap-3">
                        {/* Logo icon */}
                        <div className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))',
                                boxShadow: '0 0 20px hsl(185 100% 50% / 0.4)',
                            }}>
                            <Zap className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground tracking-tight">CareerNav</p>
                            <p className="text-[10px] font-medium" style={{ color: 'hsl(185 100% 55%)' }}>AI Platform</p>
                        </div>
                    </div>
                    {/* Bottom border with gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, hsl(185 100% 50% / 0.3), transparent)' }} />
                </div>

                {/* ── User Profile Card ── */}
                <div className="mx-3 mt-3 rounded-2xl p-3 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, hsl(230 25% 11%), hsl(230 25% 9%))',
                        border: '1px solid hsl(230 20% 16%)',
                    }}>
                    {/* Subtle shimmer overlay */}
                    <div className="absolute inset-0 shimmer rounded-2xl pointer-events-none opacity-40" />
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="relative">
                            <Avatar className="w-10 h-10 ring-2" style={{ '--tw-ring-color': 'hsl(185 100% 50% / 0.3)' } as any}>
                                <AvatarImage src={user?.avatarUrl} />
                                <AvatarFallback
                                    className="text-xs font-bold"
                                    style={{ background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))', color: 'black' }}>
                                    {user?.name ? getInitials(user.name) : 'U'}
                                </AvatarFallback>
                            </Avatar>
                            {/* Online indicator */}
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[hsl(230_25%_9%)]"
                                style={{ background: 'hsl(150 80% 50%)', boxShadow: '0 0 6px hsl(150 80% 50% / 0.8)' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{user?.name || 'User'}</p>
                            <p className="text-[11px] truncate" style={{ color: 'hsl(230 10% 50%)' }}>{user?.email || 'user@example.com'}</p>
                        </div>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'hsl(230 20% 15%)' }}>
                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* ── Navigation ── */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2"
                        style={{ color: 'hsl(230 10% 35%)' }}>Main Menu</p>
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group relative',
                                    isActive
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                )
                            }
                            style={({ isActive }) => isActive ? {
                                background: `linear-gradient(135deg, ${item.color}18, ${item.color}08)`,
                                border: `1px solid ${item.color}25`,
                                boxShadow: `0 0 20px ${item.color}10`,
                            } : {
                                background: 'transparent',
                                border: '1px solid transparent',
                            }}
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Active left indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[55%] rounded-r-full"
                                            style={{
                                                background: `linear-gradient(180deg, ${item.color}, ${item.color}60)`,
                                                boxShadow: `2px 0 12px ${item.color}80`,
                                            }} />
                                    )}
                                    {/* Icon container */}
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                                        style={isActive ? {
                                            background: `${item.color}20`,
                                            boxShadow: `0 0 12px ${item.color}30`,
                                        } : {
                                            background: 'hsl(230 20% 12%)',
                                        }}>
                                        <item.icon
                                            className="w-4 h-4 transition-all duration-200"
                                            style={{ color: isActive ? item.color : undefined }}
                                        />
                                    </div>
                                    <span className="flex-1">{item.name}</span>
                                    {isActive && (
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* ── Footer ── */}
                <div className="flex-shrink-0 p-3 relative">
                    {/* Top divider */}
                    <div className="h-px mb-3"
                        style={{ background: 'linear-gradient(90deg, transparent, hsl(230 20% 18%), transparent)' }} />
                    <div className="flex gap-2">
                        <button
                            onClick={handleLogout}
                            className="flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 text-muted-foreground hover:text-foreground group"
                            style={{ background: 'hsl(230 25% 9%)', border: '1px solid hsl(230 20% 13%)' }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = 'hsl(0 72% 51% / 0.1)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(0 72% 51% / 0.2)';
                                (e.currentTarget as HTMLElement).style.color = 'hsl(0 72% 61%)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = 'hsl(230 25% 9%)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(230 20% 13%)';
                                (e.currentTarget as HTMLElement).style.color = '';
                            }}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                        <ThemeToggle />
                    </div>

                    {/* Version badge */}
                    <div className="flex justify-center mt-3">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{
                                background: 'hsl(230 20% 10%)',
                                color: 'hsl(230 10% 40%)',
                                border: '1px solid hsl(230 20% 13%)',
                            }}>
                            v3.0 · Layered Architecture
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
