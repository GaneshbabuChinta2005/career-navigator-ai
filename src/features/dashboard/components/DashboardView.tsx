import { StatsGrid } from './StatsGrid';
import { LearningActivityChart, SkillsChart } from './Charts';
import { useAuthStore } from '@/store/useAuthStore';

export const DashboardView = () => {
    const { user } = useAuthStore();
    const firstName = user?.name?.split(' ')[0] || 'there';

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-display">
                        Welcome back, {firstName} 👋
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Here's how your career journey is progressing.
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Live dashboard
                </div>
            </div>

            {/* Stats */}
            <StatsGrid />

            {/* Charts — Learning spans 2 cols, Skills 1 col */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <LearningActivityChart />
                <SkillsChart />
            </div>
        </div>
    );
};
