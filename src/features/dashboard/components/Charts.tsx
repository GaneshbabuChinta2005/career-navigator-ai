import { useState } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp } from 'lucide-react';

const progressData = [
    { week: 'W1', hours: 10, target: 15 },
    { week: 'W2', hours: 15, target: 15 },
    { week: 'W3', hours: 12, target: 15 },
    { week: 'W4', hours: 22, target: 15 },
    { week: 'W5', hours: 18, target: 15 },
    { week: 'W6', hours: 25, target: 15 },
];

const skillData = [
    { name: 'React', score: 85, target: 90 },
    { name: 'TypeScript', score: 70, target: 80 },
    { name: 'Node.js', score: 65, target: 75 },
    { name: 'AWS', score: 45, target: 70 },
    { name: 'System Design', score: 40, target: 70 },
];

// Uses CSS vars so they work in both dark and light modes
const CHART_STROKE = 'hsl(var(--border))';
const CHART_TEXT = 'hsl(var(--muted-foreground))';

// Color palette that pops on any background
const COLORS = ['#00e5ff', '#a855f7', '#f472b6', '#34d399', '#f59e0b'];

const ChartTooltipStyle = {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '10px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    color: 'hsl(var(--foreground))',
    fontSize: '13px',
};

export const LearningActivityChart = () => {
    const [showTarget, setShowTarget] = useState(true);
    const totalHours = progressData.reduce((sum, w) => sum + w.hours, 0);
    const avgHours = Math.round(totalHours / progressData.length);

    return (
        <Card className="hover:shadow-card transition-shadow duration-300 col-span-2">
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
                        className="text-xs"
                    >
                        {showTarget ? 'Hide' : 'Show'} Target
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData} margin={{ left: -10, right: 10 }}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke={CHART_STROKE}
                                opacity={0.5}
                            />
                            <XAxis
                                dataKey="week"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: CHART_TEXT, fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: CHART_TEXT, fontSize: 12 }}
                            />
                            <Tooltip contentStyle={ChartTooltipStyle} cursor={{ stroke: CHART_STROKE, strokeWidth: 1 }} />
                            {showTarget && (
                                <Line
                                    type="monotone"
                                    dataKey="target"
                                    stroke="hsl(var(--muted-foreground))"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                    name="Target"
                                />
                            )}
                            <Line
                                type="monotone"
                                dataKey="hours"
                                stroke="hsl(var(--primary))"
                                strokeWidth={3}
                                dot={{ fill: 'hsl(var(--primary))', r: 5, strokeWidth: 0 }}
                                activeDot={{ r: 7, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                                name="Hours"
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
    const avgScore = Math.round(
        skillData.reduce((sum, s) => sum + s.score, 0) / skillData.length
    );

    return (
        <Card className="hover:shadow-card transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Skill Proficiency
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{avgScore}% average proficiency</p>
            </CardHeader>
            <CardContent>
                <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={skillData}
                            layout="vertical"
                            margin={{ left: 0, right: 40, top: 4, bottom: 4 }}
                        >
                            <CartesianGrid
                                horizontal={false}
                                stroke={CHART_STROKE}
                                opacity={0.4}
                            />
                            <XAxis
                                type="number"
                                hide
                                domain={[0, 100]}
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                width={105}
                                tick={{ fill: CHART_TEXT, fontSize: 12, fontWeight: 500 }}
                            />
                            <Tooltip
                                contentStyle={ChartTooltipStyle}
                                cursor={{ fill: 'hsl(var(--muted) / 0.4)' }}
                                formatter={(value: number) => [`${value}%`, 'Score']}
                            />
                            <Bar
                                dataKey="score"
                                radius={[0, 8, 8, 0]}
                                onMouseEnter={(_, index) => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {skillData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.4}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Skill Legend */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {skillData.map((skill, index) => (
                        <button
                            key={skill.name}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:scale-105"
                            style={{
                                backgroundColor: `${COLORS[index % COLORS.length]}18`,
                                color: COLORS[index % COLORS.length],
                                border: `1px solid ${COLORS[index % COLORS.length]}40`,
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            {skill.name}: {skill.score}%
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
