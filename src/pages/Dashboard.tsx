import { useState, useEffect, useRef } from 'react';
import { StatsGrid } from '@/features/dashboard/components/StatsGrid';
import { LearningActivityChart, SkillsChart } from '@/features/dashboard/components/Charts';
import { Button } from '@/components/ui/button';
import {
  Target,
  TrendingUp,
  BookOpen,
  Award,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  Zap,
  Map,
  PlayCircle,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

interface Activity {
  id: string;
  type: 'completed' | 'started' | 'milestone';
  title: string;
  time: string;
  description: string;
}

const recentActivities: Activity[] = [
  { id: '1', type: 'completed', title: 'Completed React Hooks Module', time: '2 hours ago', description: 'useState, useEffect, and custom hooks' },
  { id: '2', type: 'milestone', title: 'Reached 70% Role Readiness', time: '5 hours ago', description: 'Frontend Developer track' },
  { id: '3', type: 'started', title: 'Started System Design Course', time: 'Yesterday', description: 'Scalability and Architecture Patterns' },
  { id: '4', type: 'completed', title: 'Finished TypeScript Generics', time: '2 days ago', description: 'Advanced type manipulation' },
];

const quickActions = [
  {
    icon: PlayCircle,
    label: 'Run Simulation',
    description: 'Check role readiness',
    link: '/app/simulation',
    gradient: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(200 90% 55%))',
    glow: 'hsl(185 100% 50% / 0.3)',
    bg: 'hsl(185 100% 50% / 0.08)',
    border: 'hsl(185 100% 50% / 0.2)',
  },
  {
    icon: TrendingUp,
    label: 'Skill Gap Analysis',
    description: 'Find what to learn',
    link: '/app/skill-gap',
    gradient: 'linear-gradient(135deg, hsl(150 80% 45%), hsl(185 100% 50%))',
    glow: 'hsl(150 80% 45% / 0.3)',
    bg: 'hsl(150 80% 45% / 0.08)',
    border: 'hsl(150 80% 45% / 0.2)',
  },
  {
    icon: Map,
    label: 'View Roadmap',
    description: '30/60/90 day plan',
    link: '/app/roadmap',
    gradient: 'linear-gradient(135deg, hsl(270 100% 65%), hsl(300 100% 60%))',
    glow: 'hsl(270 100% 65% / 0.3)',
    bg: 'hsl(270 100% 65% / 0.08)',
    border: 'hsl(270 100% 65% / 0.2)',
  },
  {
    icon: Sparkles,
    label: 'AI LaunchPad',
    description: 'AI-powered tools',
    link: '/app/ai-tools',
    gradient: 'linear-gradient(135deg, hsl(330 100% 60%), hsl(270 100% 65%))',
    glow: 'hsl(330 100% 60% / 0.3)',
    bg: 'hsl(330 100% 60% / 0.08)',
    border: 'hsl(330 100% 60% / 0.2)',
  },
];

// Animated counter hook
function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration]);

  return count;
}

const Dashboard = () => {
  const { user } = useAuthStore();
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  });

  const streak = useCounter(12);
  const score = useCounter(73);

  const getActivityConfig = (type: Activity['type']) => {
    switch (type) {
      case 'completed': return {
        icon: <CheckCircle className="w-4 h-4" />,
        color: 'hsl(150 80% 45%)',
        bg: 'hsl(150 80% 45% / 0.1)',
        border: 'hsl(150 80% 45% / 0.2)',
        label: 'Completed',
      };
      case 'milestone': return {
        icon: <Star className="w-4 h-4" />,
        color: 'hsl(270 100% 65%)',
        bg: 'hsl(270 100% 65% / 0.1)',
        border: 'hsl(270 100% 65% / 0.2)',
        label: 'Milestone',
      };
      case 'started': return {
        icon: <BookOpen className="w-4 h-4" />,
        color: 'hsl(185 100% 50%)',
        bg: 'hsl(185 100% 50% / 0.1)',
        border: 'hsl(185 100% 50% / 0.2)',
        label: 'Started',
      };
    }
  };

  return (
    <div className="space-y-6 page-enter">
      {/* ── Hero Header ─────────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden p-7"
        style={{
          background: 'linear-gradient(135deg, hsl(230 28% 8%), hsl(230 25% 6%))',
          border: '1px solid hsl(230 20% 13%)',
          boxShadow: '0 8px 40px hsl(0 0% 0% / 0.4)',
        }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.15), transparent 70%)' }} />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, hsl(270 100% 65% / 0.15), transparent 70%)' }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="space-y-2">
            {/* Greeting badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'hsl(185 100% 50% / 0.1)',
                border: '1px solid hsl(185 100% 50% / 0.2)',
                color: 'hsl(185 100% 55%)',
              }}>
              <Zap className="w-3 h-3" />
              AI Career Navigator
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {greeting},{' '}
              <span className="text-gradient">{user?.name?.split(' ')[0] || 'Explorer'}!</span>{' '}
              <span className="wave-emoji">👋</span>
            </h1>
            <p className="text-muted-foreground text-base">
              You're on a <span className="font-semibold" style={{ color: 'hsl(38 100% 55%)' }}>{streak}-day streak</span> — keep the momentum going!
            </p>
          </div>

          {/* Mini stat pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
              style={{ background: 'hsl(185 100% 50% / 0.1)', border: '1px solid hsl(185 100% 50% / 0.2)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(200 90% 55%))', boxShadow: '0 0 12px hsl(185 100% 50% / 0.4)' }}>
                <Target className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">Readiness</p>
                <p className="text-lg font-bold" style={{ color: 'hsl(185 100% 55%)' }}>{score}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
              style={{ background: 'hsl(270 100% 65% / 0.1)', border: '1px solid hsl(270 100% 65% / 0.2)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, hsl(270 100% 65%), hsl(300 90% 60%))', boxShadow: '0 0 12px hsl(270 100% 65% / 0.4)' }}>
                <Award className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">Streak</p>
                <p className="text-lg font-bold" style={{ color: 'hsl(270 100% 70%)' }}>{streak} days</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to="/app/roadmap">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{ background: 'hsl(230 20% 14%)', border: '1px solid hsl(230 20% 18%)', color: 'hsl(0 0% 80%)' }}>
                  <Calendar className="w-4 h-4" />
                  My Plan
                </button>
              </Link>
              <Link to="/app/simulation">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))',
                    boxShadow: '0 0 20px hsl(185 100% 50% / 0.3)',
                    color: 'black',
                  }}>
                  <Target className="w-4 h-4" />
                  Simulate Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ───────────────────────────────────────── */}
      <StatsGrid />

      {/* ── Quick Actions ────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
          <span className="text-xs text-muted-foreground font-medium">4 tools available</span>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, i) => (
            <Link key={action.label} to={action.link}>
              <div
                className="group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.04] overflow-hidden"
                style={{
                  background: action.bg,
                  border: `1px solid ${action.border}`,
                  animationDelay: `${i * 80}ms`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${action.glow}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Gradient accent top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-70"
                  style={{ background: action.gradient }} />

                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: action.gradient, boxShadow: `0 0 16px ${action.glow}` }}>
                  <action.icon className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-0.5">{action.label}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>

                <div className="flex items-center gap-1 mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: 'hsl(185 100% 55%)' }}>
                  Open <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Charts ───────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LearningActivityChart />
        <SkillsChart />
      </div>

      {/* ── Recent Activity Timeline ─────────────────────────── */}
      <div className="rounded-3xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, hsl(230 25% 8%), hsl(230 25% 6%))',
          border: '1px solid hsl(230 20% 13%)',
        }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.04), transparent 70%)' }} />

        <div className="flex items-center justify-between mb-5 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))' }}>
              <Clock className="w-4 h-4 text-black" />
            </div>
            <h2 className="text-lg font-bold">Recent Activity</h2>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: 'hsl(185 100% 55%)', background: 'hsl(185 100% 50% / 0.08)', border: '1px solid hsl(185 100% 50% / 0.15)' }}>
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Timeline */}
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, hsl(185 100% 50% / 0.3), hsl(270 100% 65% / 0.1), transparent)' }} />

          {recentActivities.map((activity, idx) => {
            const cfg = getActivityConfig(activity.type);
            return (
              <div key={activity.id}
                className="flex gap-4 py-3.5 group cursor-pointer transition-all duration-200 hover:pl-1 rounded-xl"
                style={{ paddingLeft: idx === 0 ? '0' : undefined }}>
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 z-10">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
                    {cfg.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                          style={{ background: cfg.bg, color: cfg.color }}>
                          {cfg.label}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-foreground leading-snug">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1 flex-shrink-0 mt-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
