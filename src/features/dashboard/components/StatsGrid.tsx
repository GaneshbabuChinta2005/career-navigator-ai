import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, CheckCircle2, Clock, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface StatProps {
    label: string;
    value: number;
    suffix?: string;
    change: number;
    icon: React.ElementType;
    gradient: string;
    glow: string;
}

const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 1000 / steps);
        return () => clearInterval(timer);
    }, [target]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
};

const StatCard = ({ label, value, suffix, change, icon: Icon, gradient, glow }: StatProps) => {
    const isPositive = change >= 0;

    return (
        <Card className="relative overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer group shadow-card">
            {/* Gradient top border */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${gradient}`} />
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
                        <h3 className="text-3xl font-bold tracking-tight mb-2">
                            <AnimatedCounter target={value} suffix={suffix} />
                        </h3>
                        <div className="flex items-center gap-1 text-xs">
                            {isPositive ? (
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                                <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                            )}
                            <span className={isPositive ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                                {isPositive ? '+' : ''}
                                {change}%
                            </span>
                            <span className="text-muted-foreground ml-0.5">vs last week</span>
                        </div>
                    </div>
                    {/* Icon circle with gradient */}
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${gradient}`}
                        style={{ boxShadow: glow }}
                    >
                        <Icon className="w-6 h-6 text-background" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const StatsGrid = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                label="Role Readiness"
                value={72}
                suffix="%"
                change={8}
                icon={Target}
                gradient="bg-gradient-to-r from-cyan-500 to-cyan-400"
                glow="0 0 20px rgba(0, 229, 255, 0.3)"
            />
            <StatCard
                label="Skills Mastered"
                value={15}
                suffix="/28"
                change={12}
                icon={CheckCircle2}
                gradient="bg-gradient-to-r from-emerald-500 to-emerald-400"
                glow="0 0 20px rgba(52, 211, 153, 0.3)"
            />
            <StatCard
                label="Study Hours"
                value={32}
                suffix="h"
                change={15}
                icon={Clock}
                gradient="bg-gradient-to-r from-violet-500 to-violet-400"
                glow="0 0 20px rgba(168, 85, 247, 0.3)"
            />
            <StatCard
                label="Action Items"
                value={6}
                change={-25}
                icon={AlertCircle}
                gradient="bg-gradient-to-r from-orange-500 to-orange-400"
                glow="0 0 20px rgba(249, 115, 22, 0.3)"
            />
        </div>
    );
};
