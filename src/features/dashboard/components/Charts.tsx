import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp } from "lucide-react";

const progressData = [
    { week: "Week 1", hours: 10, target: 15 },
    { week: "Week 2", hours: 15, target: 15 },
    { week: "Week 3", hours: 12, target: 15 },
    { week: "Week 4", hours: 22, target: 15 },
    { week: "Week 5", hours: 18, target: 15 },
    { week: "Week 6", hours: 25, target: 15 },
];

const skillData = [
    { name: "React", score: 85, target: 90 },
    { name: "TypeScript", score: 70, target: 80 },
    { name: "Node.js", score: 65, target: 75 },
    { name: "AWS", score: 45, target: 70 },
    { name: "System Design", score: 40, target: 70 },
];

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const LearningActivityChart = () => {
    const [showTarget, setShowTarget] = useState(true);
    const totalHours = progressData.reduce((sum, week) => sum + week.hours, 0);
    const avgHours = Math.round(totalHours / progressData.length);

    return (
        <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Learning Activity
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            {totalHours}h total · {avgHours}h/week average
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTarget(!showTarget)}
                    >
                        {showTarget ? 'Hide' : 'Show'} Target
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis
                                dataKey="week"
                                axisLine={false}
                                tickLine={false}
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                style={{ fontSize: '12px' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            />
                            {showTarget && (
                                <Line
                                    type="monotone"
                                    dataKey="target"
                                    stroke="#94a3b8"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                            )}
                            <Line
                                type="monotone"
                                dataKey="hours"
                                stroke="#2563EB"
                                strokeWidth={3}
                                dot={{ fill: '#2563EB', r: 5 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export const SkillsChart = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const avgScore = Math.round(skillData.reduce((sum, skill) => sum + skill.score, 0) / skillData.length);

    return (
        <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Skill Proficiency
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        {avgScore}% average proficiency
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={skillData}
                            layout="vertical"
                            margin={{ left: 10, right: 40 }}
                        >
                            <CartesianGrid horizontal={false} stroke="#e5e7eb" />
                            <XAxis type="number" hide domain={[0, 100]} />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                width={100}
                                style={{ fontSize: '13px', fontWeight: 500 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                            />
                            <Bar
                                dataKey="score"
                                radius={[0, 8, 8, 0]}
                                onMouseEnter={(_, index) => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {skillData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.6}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Skill Legend */}
                <div className="flex flex-wrap gap-3 mt-4">
                    {skillData.map((skill, index) => (
                        <div
                            key={skill.name}
                            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-xs font-medium">
                                {skill.name}: {skill.score}%
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
