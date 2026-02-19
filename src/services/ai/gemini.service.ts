import { GoogleGenerativeAI } from '@google/generative-ai';
import { SKILL_GAP_PROMPT, CAREER_COACH_PROMPT, ROADMAP_GENERATOR_PROMPT } from './prompts';
import type { SkillGapAnalysis, CareerAdvice } from './types';

// Initialize Gemini API
const getAI = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
        console.warn('⚠️ Gemini API key not configured. Using mock responses.');
        return null;
    }
    return new GoogleGenerativeAI(apiKey);
};

const genAI = getAI();

// Mock responses for when API key is not configured
const getMockSkillGapAnalysis = (): SkillGapAnalysis => ({
    criticalGaps: ['System Design', 'Advanced TypeScript'],
    importantGaps: ['Testing', 'DevOps'],
    recommendations: [
        'Start with System Design fundamentals - read "Designing Data-Intensive Applications"',
        'Practice TypeScript generics and advanced types daily',
        'Complete testing courses (Jest, React Testing Library)',
        'Set up a personal project with CI/CD pipeline'
    ],
    estimatedTime: '8-12 weeks with consistent practice',
    resources: [
        {
            skill: 'System Design',
            links: [
                'System Design Primer on GitHub',
                'Grokking System Design Interview',
                'ByteByteGo YouTube channel'
            ]
        },
        {
            skill: 'TypeScript',
            links: [
                'TypeScript Handbook',
                'Type Challenges on GitHub',
                'Total TypeScript course'
            ]
        }
    ]
});

const getMockCareerAdvice = (question: string): CareerAdvice => ({
    answer: `Great question! Here's my advice: ${question.includes('interview')
        ? 'For interview prep, focus on practicing coding problems daily, reviewing system design patterns, and preparing behavioral stories using the STAR method. Schedule mock interviews to build confidence.'
        : 'Focus on building practical projects that demonstrate your skills. Contribute to open source, write technical blogs, and network with other developers. Consistency is key!'
        }`,
    relatedTopics: ['Technical Interview Prep', 'Portfolio Building', 'Networking'],
    actionItems: [
        'Practice 2-3 coding problems daily',
        'Build and deploy one project per month',
        'Attend local developer meetups'
    ]
});

export const aiService = {
    /**
     * Analyze skill gaps and provide personalized recommendations
     */
    analyzeSkillGaps: async (
        skills: Record<string, number>,
        targetRole: string
    ): Promise<SkillGapAnalysis> => {
        if (!genAI) {
            return getMockSkillGapAnalysis();
        }

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const prompt = SKILL_GAP_PROMPT(skills, targetRole);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Parse JSON response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            return getMockSkillGapAnalysis();
        } catch (error) {
            console.error('AI Error:', error);
            return getMockSkillGapAnalysis();
        }
    },

    /**
     * Chat with AI career coach
     */
    chatWithCoach: async (
        question: string,
        context?: string
    ): Promise<CareerAdvice> => {
        if (!genAI) {
            return getMockCareerAdvice(question);
        }

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const prompt = CAREER_COACH_PROMPT(question, context);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const answer = response.text();

            return {
                answer,
                relatedTopics: ['Career Growth', 'Skill Development'],
                actionItems: []
            };
        } catch (error) {
            console.error('AI Error:', error);
            return getMockCareerAdvice(question);
        }
    },

    /**
     * Generate learning roadmap
     */
    generateRoadmap: async (
        gaps: string[],
        timeframe: number
    ): Promise<string> => {
        if (!genAI) {
            return `# ${timeframe}-Day Learning Roadmap\n\n## Week 1-2\n- Study ${gaps[0]} fundamentals\n- Complete beginner tutorials\n\n## Week 3-4\n- Build practice projects\n- Review best practices`;
        }

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const prompt = ROADMAP_GENERATOR_PROMPT(gaps, timeframe);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('AI Error:', error);
            return '# Roadmap generation failed. Please try again.';
        }
    },

    /**
     * Test if AI is configured
     */
    isConfigured: (): boolean => {
        return genAI !== null;
    }
};
