export interface AIMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface SkillGapAnalysis {
    criticalGaps: string[];
    importantGaps: string[];
    recommendations: string[];
    estimatedTime: string;
    resources: { skill: string; links: string[] }[];
}

export interface CareerAdvice {
    answer: string;
    relatedTopics: string[];
    actionItems: string[];
}

export interface AIInsight {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    category: 'skill' | 'career' | 'learning';
}
