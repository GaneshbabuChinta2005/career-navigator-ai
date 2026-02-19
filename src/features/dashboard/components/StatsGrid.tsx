import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle2, Clock, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

interface StatProps {
    label: string;
    value: number;
    suffix?: string;
    change: number;
    icon: React.ElementType;
    colorClass: string;
}

const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 1000;
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
        }, duration / steps);

        return () => clearInterval(timer);
    }, [target]);

    return <span>{count}{suffix}</span>;
};

const StatCard = ({ label, value, suffix, change, icon: Icon, colorClass }: StatProps) => {
    const isPositive = change >= 0;

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
                        <h3 className="text-3xl font-bold tracking-tight mb-2">
                            <AnimatedCounter target={value} suffix={suffix} />
                        </h3>
                        <div className="flex items-center gap-1 text-sm">
                            {isPositive ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={isPositive ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {isPositive ? '+' : ''}{change}%
                            </span>
                            <span className="text-muted-foreground">vs last week</span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-opacity-10 group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
                        <Icon className="w-6 h-6" />
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
                colorClass="text-blue-600 bg-blue-500"
            />
            <StatCard
                label="Skills Mastered"
                value={15}
                suffix="/28"
                change={12}
                icon={CheckCircle2}
                colorClass="text-green-600 bg-green-500"
            />
            <StatCard
                label="Study Hours"
                value={32}
                suffix="h"
                change={15}
                icon={Clock}
                colorClass="text-purple-600 bg-purple-500"
            />
            <StatCard
                label="Action Items"
                value={6}
                change={-25}
                icon={AlertCircle}
                colorClass="text-orange-600 bg-orange-500"
            />
        </div>
    );
};
