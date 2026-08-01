import { useState } from 'react';
import { Menu, Bell, Search, Sparkles, X, CheckCircle, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLocation } from 'react-router-dom';

const routeLabels: Record<string, { title: string; subtitle: string }> = {
    '/app/dashboard': { title: 'Dashboard', subtitle: 'Your career at a glance' },
    '/app/skill-gap': { title: 'Skill Gap Analysis', subtitle: 'Identify what to learn next' },
    '/app/roadmap': { title: 'Learning Roadmap', subtitle: 'Your personalized path' },
    '/app/simulation': { title: 'Role Simulator', subtitle: 'Practice makes perfect' },
    '/app/ai-tools': { title: 'AI LaunchPad', subtitle: 'Career-boosting AI tools' },
    '/app/ai-tools/cover-letter': { title: 'Cover Letter Generator', subtitle: 'AI-crafted letters' },
    '/app/ai-tools/linkedin': { title: 'LinkedIn Optimizer', subtitle: 'Stand out to recruiters' },
    '/app/ai-tools/salary': { title: 'Salary Negotiator', subtitle: 'Earn what you deserve' },
    '/app/profile': { title: 'Profile', subtitle: 'Manage your account' },
};

const notifications = [
    { id: 1, icon: Star, color: 'hsl(38 100% 55%)', title: 'Milestone reached!', desc: 'You hit 70% role readiness 🎉', time: '2m ago' },
    { id: 2, icon: Sparkles, color: 'hsl(270 100% 65%)', title: 'AI insight ready', desc: 'Your skill gap analysis is updated', time: '1h ago' },
    { id: 3, icon: CheckCircle, color: 'hsl(150 80% 50%)', title: 'Weekly goal complete!', desc: '5/5 tasks finished this week', time: '3h ago' },
    { id: 4, icon: BookOpen, color: 'hsl(185 100% 50%)', title: 'New resource added', desc: 'React Query deep dive course', time: 'Yesterday' },
];

const Navbar = () => {
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');

    const routeInfo = routeLabels[location.pathname] || { title: 'CareerNav', subtitle: 'AI Platform' };

    return (
        <header
            className="flex h-16 items-center gap-4 px-4 lg:px-6 relative z-30"
            style={{
                background: 'linear-gradient(180deg, hsl(230 28% 6% / 0.95), hsl(230 25% 5% / 0.9))',
                borderBottom: '1px solid hsl(230 20% 12%)',
                backdropFilter: 'blur(20px)',
            }}
        >
            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="lg:hidden flex-shrink-0">
                <Menu className="h-5 w-5" />
            </Button>

            {/* Page title area */}
            <div className="flex-1 flex items-center gap-4">
                {!searchOpen && (
                    <div className="hidden md:block">
                        <h1 className="text-base font-bold text-foreground leading-tight">{routeInfo.title}</h1>
                        <p className="text-[11px] text-muted-foreground">{routeInfo.subtitle}</p>
                    </div>
                )}

                {/* Search */}
                <div className={`flex-1 max-w-sm transition-all duration-300 ${searchOpen ? 'max-w-full' : 'max-w-xs'}`}>
                    {searchOpen ? (
                        <div className="relative flex items-center">
                            <Search className="absolute left-3 h-4 w-4 text-muted-foreground z-10" />
                            <input
                                autoFocus
                                value={searchVal}
                                onChange={e => setSearchVal(e.target.value)}
                                placeholder="Search skills, resources, tools..."
                                className="w-full pl-9 pr-10 py-2 text-sm rounded-xl outline-none transition-all"
                                style={{
                                    background: 'hsl(230 25% 10%)',
                                    border: '1px solid hsl(185 100% 50% / 0.3)',
                                    color: 'hsl(0 0% 95%)',
                                    boxShadow: '0 0 20px hsl(185 100% 50% / 0.1)',
                                }}
                            />
                            <button onClick={() => { setSearchOpen(false); setSearchVal(''); }}
                                className="absolute right-2.5 p-0.5 rounded-md transition-colors hover:bg-white/10">
                                <X className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="flex items-center gap-2 px-3 py-2 w-full rounded-xl text-sm text-muted-foreground transition-all hover:text-foreground group"
                            style={{ background: 'hsl(230 25% 10%)', border: '1px solid hsl(230 20% 14%)' }}>
                            <Search className="h-4 w-4" />
                            <span className="hidden md:block flex-1 text-left">Search...</span>
                            <span className="hidden md:flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded"
                                style={{ background: 'hsl(230 20% 14%)', color: 'hsl(230 10% 45%)' }}>
                                ⌘K
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
                <ThemeToggle />

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105"
                            style={{ background: 'hsl(230 25% 10%)', border: '1px solid hsl(230 20% 14%)' }}>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            {/* Notification dot */}
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                                style={{ background: 'hsl(330 100% 60%)', boxShadow: '0 0 6px hsl(330 100% 60% / 0.8)' }} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden"
                        style={{
                            background: 'hsl(230 25% 8%)',
                            border: '1px solid hsl(230 20% 14%)',
                            boxShadow: '0 20px 60px hsl(0 0% 0% / 0.5)',
                        }}>
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3"
                            style={{ borderBottom: '1px solid hsl(230 20% 12%)' }}>
                            <DropdownMenuLabel className="p-0 text-sm font-bold">Notifications</DropdownMenuLabel>
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                                style={{ background: 'hsl(185 100% 50% / 0.1)', color: 'hsl(185 100% 55%)', border: '1px solid hsl(185 100% 50% / 0.2)' }}>
                                {notifications.length} new
                            </span>
                        </div>

                        <div className="divide-y" style={{ borderColor: 'hsl(230 20% 10%)' }}>
                            {notifications.map(n => (
                                <DropdownMenuItem key={n.id}
                                    className="flex items-start gap-3 p-4 cursor-pointer transition-colors"
                                    style={{ outline: 'none' }}
                                    onFocus={e => (e.currentTarget.style.background = 'hsl(230 20% 11%)')}
                                    onBlur={e => (e.currentTarget.style.background = '')}>
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ background: `${n.color.replace(')', ' / 0.12)')}`, color: n.color }}>
                                        <n.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-foreground leading-tight">{n.title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                                        <p className="text-[10px] mt-1" style={{ color: 'hsl(230 10% 40%)' }}>{n.time}</p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>

                        <div className="px-4 py-3 text-center" style={{ borderTop: '1px solid hsl(230 20% 12%)' }}>
                            <button className="text-xs font-semibold" style={{ color: 'hsl(185 100% 55%)' }}>
                                View all notifications →
                            </button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Navbar;
