import { api } from '@/lib/api';

export interface Skill {
    id: string;
    name: string;
    currentLevel: number;
    targetLevel: number;
    priority: 'high' | 'medium' | 'low';
    category: string;
    description: string;
    estimatedHours: number;
}

export interface SkillGapAnalysis {
    targetRole: string;
    overallGap: number;
    missingSkills: Skill[];
    improvingSkills: Skill[];
}

// Mock data for skill gap analysis
const mockSkillGapData: SkillGapAnalysis = {
    targetRole: 'Senior Full-Stack Developer',
    overallGap: 36,
    missingSkills: [
        {
            id: '1',
            name: 'React Query',
            currentLevel: 0,
            targetLevel: 80,
            priority: 'high',
            category: 'Frontend',
            description: 'Data fetching and state management library',
            estimatedHours: 20,
        },
        {
            id: '2',
            name: 'AWS Lambda',
            currentLevel: 0,
            targetLevel: 70,
            priority: 'high',
            category: 'Backend',
            description: 'Serverless computing service',
            estimatedHours: 30,
        },
        {
            id: '3',
            name: 'Docker',
            currentLevel: 20,
            targetLevel: 75,
            priority: 'medium',
            category: 'DevOps',
            description: 'Container platform for deployment',
            estimatedHours: 25,
        },
    ],
    improvingSkills: [
        {
            id: '4',
            name: 'TypeScript',
            currentLevel: 60,
            targetLevel: 85,
            priority: 'medium',
            category: 'Frontend',
            description: 'Typed superset of JavaScript',
            estimatedHours: 15,
        },
        {
            id: '5',
            name: 'System Design',
            currentLevel: 40,
            targetLevel: 80,
            priority: 'high',
            category: 'Architecture',
            description: 'Scalable system architecture patterns',
            estimatedHours: 40,
        },
    ],
};

export const skillGapService = {
    /**
     * Get skill gap analysis for current user
     */
    async getSkillGapAnalysis(): Promise<SkillGapAnalysis> {
        try {
            // Mock API call - replace with real API
            // const response = await api.get<SkillGapAnalysis>('/skill-gap/analysis');
            // return response.data;

            await new Promise((resolve) => setTimeout(resolve, 800));
            return mockSkillGapData;
        } catch (error) {
            throw new Error('Failed to fetch skill gap analysis');
        }
    },

    /**
     * Update skill progress
     */
    async updateSkillProgress(skillId: string, currentLevel: number): Promise<Skill> {
        try {
            // Mock API call - replace with real API
            // const response = await api.patch<Skill>(`/skills/${skillId}`, { currentLevel });
            // return response.data;

            await new Promise((resolve) => setTimeout(resolve, 500));

            const allSkills = [...mockSkillGapData.missingSkills, ...mockSkillGapData.improvingSkills];
            const skill = allSkills.find(s => s.id === skillId);

            if (!skill) throw new Error('Skill not found');

            return { ...skill, currentLevel };
        } catch (error) {
            throw new Error('Failed to update skill progress');
        }
    },
};
