import { StatsGrid } from './StatsGrid';
import { LearningActivityChart, SkillsChart } from './Charts';

export const DashboardView = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground">Welcome back, get ready for your next career move.</p>
                </div>
            </div>

            <StatsGrid />

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                <LearningActivityChart />
                <SkillsChart />
            </div>
        </div>
    );
};
