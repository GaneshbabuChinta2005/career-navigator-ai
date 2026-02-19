import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: Priority;
    deadline?: string; // ISO date string
    resource?: string; // optional URL or note
}

export interface Week {
    id: string;
    title: string;
    tasks: Task[];
}

export interface Phase {
    id: string;
    title: string;
    color: string; // tailwind gradient class suffix, e.g. 'cyan' | 'violet' | 'pink'
    weeks: Week[];
}

interface RoadmapState {
    goalRole: string;
    phases: Phase[];

    // Goal
    setGoalRole: (role: string) => void;

    // Phase CRUD
    addPhase: (title: string, color: string) => void;
    renamePhase: (phaseId: string, title: string) => void;
    deletePhase: (phaseId: string) => void;

    // Week CRUD
    addWeek: (phaseId: string, title: string) => void;
    renameWeek: (phaseId: string, weekId: string, title: string) => void;
    deleteWeek: (phaseId: string, weekId: string) => void;

    // Task CRUD
    addTask: (phaseId: string, weekId: string, title: string, priority: Priority, deadline?: string, resource?: string) => void;
    updateTask: (phaseId: string, weekId: string, taskId: string, updates: Partial<Task>) => void;
    toggleTask: (phaseId: string, weekId: string, taskId: string) => void;
    deleteTask: (phaseId: string, weekId: string, taskId: string) => void;
    moveTaskUp: (phaseId: string, weekId: string, taskId: string) => void;
    moveTaskDown: (phaseId: string, weekId: string, taskId: string) => void;

    // Reset to defaults
    resetToDefault: () => void;
}

const uid = () => Math.random().toString(36).slice(2, 9);

const defaultPhases: Phase[] = [
    {
        id: '30-days',
        title: '30-Day Foundation',
        color: 'cyan',
        weeks: [
            {
                id: 'week-1',
                title: 'Week 1: React Fundamentals',
                tasks: [
                    { id: 't1', title: 'Complete React hooks tutorial', completed: true, priority: 'high', resource: 'https://react.dev/learn' },
                    { id: 't2', title: 'Build todo app with useState', completed: true, priority: 'high' },
                    { id: 't3', title: 'Learn useEffect patterns', completed: false, priority: 'medium' },
                ],
            },
            {
                id: 'week-2',
                title: 'Week 2: TypeScript Basics',
                tasks: [
                    { id: 't4', title: 'TypeScript types and interfaces', completed: false, priority: 'high', resource: 'https://www.typescriptlang.org/docs' },
                    { id: 't5', title: 'Generic types practice', completed: false, priority: 'medium' },
                ],
            },
        ],
    },
    {
        id: '60-days',
        title: '60-Day Intermediate',
        color: 'violet',
        weeks: [
            {
                id: 'week-5',
                title: 'Week 5: State Management',
                tasks: [
                    { id: 't6', title: 'Learn Zustand basics', completed: false, priority: 'high', resource: 'https://zustand-demo.pmnd.rs' },
                    { id: 't7', title: 'Implement global state', completed: false, priority: 'high' },
                ],
            },
        ],
    },
    {
        id: '90-days',
        title: '90-Day Advanced',
        color: 'pink',
        weeks: [
            {
                id: 'week-10',
                title: 'Week 10: System Design',
                tasks: [
                    { id: 't8', title: 'Study scalability patterns', completed: false, priority: 'high', resource: 'https://github.com/donnemartin/system-design-primer' },
                    { id: 't9', title: 'Practice mock interviews', completed: false, priority: 'high', deadline: '2026-03-15' },
                ],
            },
        ],
    },
];

export const useRoadmapStore = create<RoadmapState>()(
    persist(
        (set) => ({
            goalRole: 'Senior Frontend Engineer',
            phases: defaultPhases,

            setGoalRole: (role) => set({ goalRole: role }),

            addPhase: (title, color) =>
                set((s) => ({
                    phases: [...s.phases, { id: uid(), title, color, weeks: [] }],
                })),

            renamePhase: (phaseId, title) =>
                set((s) => ({
                    phases: s.phases.map((p) => (p.id === phaseId ? { ...p, title } : p)),
                })),

            deletePhase: (phaseId) =>
                set((s) => ({ phases: s.phases.filter((p) => p.id !== phaseId) })),

            addWeek: (phaseId, title) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? { ...p, weeks: [...p.weeks, { id: uid(), title, tasks: [] }] }
                            : p
                    ),
                })),

            renameWeek: (phaseId, weekId, title) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? {
                                ...p,
                                weeks: p.weeks.map((w) => (w.id === weekId ? { ...w, title } : w)),
                            }
                            : p
                    ),
                })),

            deleteWeek: (phaseId, weekId) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? { ...p, weeks: p.weeks.filter((w) => w.id !== weekId) }
                            : p
                    ),
                })),

            addTask: (phaseId, weekId, title, priority, deadline, resource) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? {
                                ...p,
                                weeks: p.weeks.map((w) =>
                                    w.id === weekId
                                        ? {
                                            ...w,
                                            tasks: [
                                                ...w.tasks,
                                                { id: uid(), title, completed: false, priority, deadline, resource },
                                            ],
                                        }
                                        : w
                                ),
                            }
                            : p
                    ),
                })),

            updateTask: (phaseId, weekId, taskId, updates) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? {
                                ...p,
                                weeks: p.weeks.map((w) =>
                                    w.id === weekId
                                        ? {
                                            ...w,
                                            tasks: w.tasks.map((t) =>
                                                t.id === taskId ? { ...t, ...updates } : t
                                            ),
                                        }
                                        : w
                                ),
                            }
                            : p
                    ),
                })),

            toggleTask: (phaseId, weekId, taskId) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? {
                                ...p,
                                weeks: p.weeks.map((w) =>
                                    w.id === weekId
                                        ? {
                                            ...w,
                                            tasks: w.tasks.map((t) =>
                                                t.id === taskId ? { ...t, completed: !t.completed } : t
                                            ),
                                        }
                                        : w
                                ),
                            }
                            : p
                    ),
                })),

            deleteTask: (phaseId, weekId, taskId) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? {
                                ...p,
                                weeks: p.weeks.map((w) =>
                                    w.id === weekId
                                        ? { ...w, tasks: w.tasks.filter((t) => t.id !== taskId) }
                                        : w
                                ),
                            }
                            : p
                    ),
                })),

            moveTaskUp: (phaseId, weekId, taskId) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? {
                                ...p,
                                weeks: p.weeks.map((w) => {
                                    if (w.id !== weekId) return w;
                                    const idx = w.tasks.findIndex((t) => t.id === taskId);
                                    if (idx <= 0) return w;
                                    const tasks = [...w.tasks];
                                    [tasks[idx - 1], tasks[idx]] = [tasks[idx], tasks[idx - 1]];
                                    return { ...w, tasks };
                                }),
                            }
                            : p
                    ),
                })),

            moveTaskDown: (phaseId, weekId, taskId) =>
                set((s) => ({
                    phases: s.phases.map((p) =>
                        p.id === phaseId
                            ? {
                                ...p,
                                weeks: p.weeks.map((w) => {
                                    if (w.id !== weekId) return w;
                                    const idx = w.tasks.findIndex((t) => t.id === taskId);
                                    if (idx === -1 || idx >= w.tasks.length - 1) return w;
                                    const tasks = [...w.tasks];
                                    [tasks[idx], tasks[idx + 1]] = [tasks[idx + 1], tasks[idx]];
                                    return { ...w, tasks };
                                }),
                            }
                            : p
                    ),
                })),

            resetToDefault: () => set({ phases: defaultPhases, goalRole: 'Senior Frontend Engineer' }),
        }),
        { name: 'roadmap-storage' }
    )
);
