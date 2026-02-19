import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
}

interface Week {
    id: string;
    title: string;
    tasks: Task[];
}

interface Phase {
    id: string;
    title: string;
    weeks: Week[];
}

const mockRoadmapData: Phase[] = [
    {
        id: '30-days',
        title: '30-Day Foundation',
        weeks: [
            {
                id: 'week-1',
                title: 'Week 1: React Fundamentals',
                tasks: [
                    { id: 't1', title: 'Complete React hooks tutorial', completed: true, priority: 'high' },
                    { id: 't2', title: 'Build todo app with useState', completed: true, priority: 'high' },
                    { id: 't3', title: 'Learn useEffect patterns', completed: false, priority: 'medium' },
                ],
            },
            {
                id: 'week-2',
                title: 'Week 2: TypeScript Basics',
                tasks: [
                    { id: 't4', title: 'TypeScript types and interfaces', completed: false, priority: 'high' },
                    { id: 't5', title: 'Generic types practice', completed: false, priority: 'medium' },
                ],
            },
        ],
    },
    {
        id: '60-days',
        title: '60-Day Intermediate',
        weeks: [
            {
                id: 'week-5',
                title: 'Week 5: State Management',
                tasks: [
                    { id: 't6', title: 'Learn Zustand basics', completed: false, priority: 'high' },
                    { id: 't7', title: 'Implement global state', completed: false, priority: 'high' },
                ],
            },
        ],
    },
    {
        id: '90-days',
        title: '90-Day Advanced',
        weeks: [
            {
                id: 'week-10',
                title: 'Week 10: System Design',
                tasks: [
                    { id: 't8', title: 'Study scalability patterns', completed: false, priority: 'high' },
                ],
            },
        ],
    },
];

export const RoadmapTimeline = () => {
    const [expandedPhase, setExpandedPhase] = useState<string>('30-days');
    const [tasks, setTasks] = useState(mockRoadmapData);

    const togglePhase = (phaseId: string) => {
        setExpandedPhase(expandedPhase === phaseId ? '' : phaseId);
    };

    const toggleTask = (phaseId: string, weekId: string, taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((phase) =>
                phase.id === phaseId
                    ? {
                        ...phase,
                        weeks: phase.weeks.map((week) =>
                            week.id === weekId
                                ? {
                                    ...week,
                                    tasks: week.tasks.map((task) =>
                                        task.id === taskId ? { ...task, completed: !task.completed } : task
                                    ),
                                }
                                : week
                        ),
                    }
                    : phase
            )
        );
    };

    const calculateProgress = (phase: Phase) => {
        const allTasks = phase.weeks.flatMap((w) => w.tasks);
        const completed = allTasks.filter((t) => t.completed).length;
        return allTasks.length > 0 ? (completed / allTasks.length) * 100 : 0;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Career Roadmap</h1>
                <p className="text-muted-foreground">Track your 30/60/90-day learning journey</p>
            </div>

            <div className="space-y-4">
                {tasks.map((phase) => {
                    const progress = calculateProgress(phase);
                    const isExpanded = expandedPhase === phase.id;

                    return (
                        <Card key={phase.id}>
                            <CardHeader
                                className="cursor-pointer hover:bg-accent/50 transition-colors"
                                onClick={() => togglePhase(phase.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="flex items-center gap-3">
                                            {phase.title}
                                            <Badge variant={progress === 100 ? 'default' : 'secondary'}>
                                                {Math.round(progress)}% Complete
                                            </Badge>
                                        </CardTitle>
                                        <Progress value={progress} className="mt-3 h-2" />
                                    </div>
                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                            </CardHeader>

                            {isExpanded && (
                                <CardContent className="space-y-4">
                                    {phase.weeks.map((week) => (
                                        <div key={week.id} className="border-l-2 border-primary pl-4 space-y-2">
                                            <h4 className="font-semibold text-sm">{week.title}</h4>
                                            <div className="space-y-2">
                                                {week.tasks.map((task) => (
                                                    <div
                                                        key={task.id}
                                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors"
                                                    >
                                                        <Checkbox
                                                            checked={task.completed}
                                                            onCheckedChange={() => toggleTask(phase.id, week.id, task.id)}
                                                        />
                                                        <span
                                                            className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''
                                                                }`}
                                                        >
                                                            {task.title}
                                                        </span>
                                                        <Badge
                                                            variant={
                                                                task.priority === 'high'
                                                                    ? 'destructive'
                                                                    : task.priority === 'medium'
                                                                        ? 'default'
                                                                        : 'secondary'
                                                            }
                                                            className="text-xs"
                                                        >
                                                            {task.priority}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
