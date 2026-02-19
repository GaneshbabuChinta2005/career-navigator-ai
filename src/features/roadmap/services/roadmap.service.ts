import { api } from '@/lib/api';

export interface RoadmapTask {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
}

export interface RoadmapMilestone {
    id: string;
    phase: string;
    title: string;
    startDate: string;
    endDate: string;
    tasks: RoadmapTask[];
    progress: number;
}

export interface Roadmap {
    targetRole: string;
    milestones: RoadmapMilestone[];
    overallProgress: number;
}

// Mock roadmap data
const mockRoadmapData: Roadmap = {
    targetRole: 'Senior Full-Stack Developer',
    overallProgress: 42,
    milestones: [
        {
            id: '1',
            phase: '30 Days',
            title: 'Foundation Building',
            startDate: '2026-02-01',
            endDate: '2026-03-03',
            progress: 75,
            tasks: [
                {
                    id: 't1',
                    title: 'Complete React Advanced Patterns course',
                    description: 'Focus on hooks, context, and performance optimization',
                    completed: true,
                    dueDate: '2026-02-15',
                },
                {
                    id: 't2',
                    title: 'Build a real-time chat application',
                    description: 'Using WebSockets and React',
                    completed: true,
                    dueDate: '2026-02-20',
                },
                {
                    id: 't3',
                    title: 'Learn React Query fundamentals',
                    description: 'Data fetching, caching, and mutations',
                    completed: false,
                    dueDate: '2026-02-28',
                },
            ],
        },
        {
            id: '2',
            phase: '60 Days',
            title: 'Skill Enhancement',
            startDate: '2026-03-04',
            endDate: '2026-04-04',
            progress: 30,
            tasks: [
                {
                    id: 't4',
                    title: 'Master TypeScript advanced types',
                    description: 'Generics, utility types, and type guards',
                    completed: false,
                    dueDate: '2026-03-15',
                },
                {
                    id: 't5',
                    title: 'Implement CI/CD pipeline',
                    description: 'Set up GitHub Actions for automated testing and deployment',
                    completed: false,
                    dueDate: '2026-03-25',
                },
                {
                    id: 't6',
                    title: 'Study system design fundamentals',
                    description: 'Scalability, databases, caching strategies',
                    completed: false,
                    dueDate: '2026-04-01',
                },
            ],
        },
        {
            id: '3',
            phase: '90 Days',
            title: 'Project Portfolio',
            startDate: '2026-04-05',
            endDate: '2026-05-05',
            progress: 10,
            tasks: [
                {
                    id: 't7',
                    title: 'Build full-stack SaaS application',
                    description: 'Complete production-ready project with authentication, payments, and analytics',
                    completed: false,
                    dueDate: '2026-04-20',
                },
                {
                    id: 't8',
                    title: 'Contribute to open source projects',
                    description: 'Make meaningful contributions to 2-3 projects',
                    completed: false,
                    dueDate: '2026-04-30',
                },
                {
                    id: 't9',
                    title: 'Prepare for technical interviews',
                    description: 'Practice coding challenges and system design questions',
                    completed: false,
                    dueDate: '2026-05-05',
                },
            ],
        },
    ],
};

export const roadmapService = {
    /**
     * Get user's career roadmap
     */
    async getRoadmap(): Promise<Roadmap> {
        try {
            // Mock API call - replace with real API
            // const response = await api.get<Roadmap>('/roadmap');
            // return response.data;

            await new Promise((resolve) => setTimeout(resolve, 800));
            return mockRoadmapData;
        } catch (error) {
            throw new Error('Failed to fetch roadmap');
        }
    },

    /**
     * Toggle task completion status
     */
    async toggleTaskCompletion(taskId: string): Promise<RoadmapTask> {
        try {
            // Mock API call - replace with real API
            // const response = await api.patch<RoadmapTask>(`/roadmap/tasks/${taskId}/toggle`);
            // return response.data;

            await new Promise((resolve) => setTimeout(resolve, 500));

            let task: RoadmapTask | undefined;
            for (const milestone of mockRoadmapData.milestones) {
                task = milestone.tasks.find(t => t.id === taskId);
                if (task) break;
            }

            if (!task) throw new Error('Task not found');

            return { ...task, completed: !task.completed };
        } catch (error) {
            throw new Error('Failed to update task');
        }
    },
};
