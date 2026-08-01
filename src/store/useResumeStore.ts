import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DetectedSkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'soft-skills' | 'other';
  yearsOfExperience: number | null;
}

export interface PrioritySkill {
  skill: string;
  importance: 'critical' | 'high' | 'medium';
  timeToLearn: string;
}

export interface ResumeAnalysis {
  id: string;
  analyzedAt: string;
  fileName: string;
  fileSize: number;
  targetRole: string;
  rawText: string;

  // Candidate profile
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary: string;

  // Experience
  totalYears: number;
  seniorityLevel: 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'principal';
  currentRole?: string;
  roles: string[];
  companies: string[];
  education: string[];

  // Skills
  detectedSkills: DetectedSkill[];
  missingSkills: string[];
  matchingSkills: string[];

  // Scores
  readinessScore: number;
  atsScore: number;       // ATS friendliness 0-100
  clarityScore: number;   // Resume clarity 0-100

  // Insights
  recommendations: string[];
  prioritySkills: PrioritySkill[];
  strengths: string[];
  redFlags: string[];

  // Categorised skill counts
  skillsByCategory: Record<string, number>;
}

interface ResumeStore {
  analyses: ResumeAnalysis[];
  currentAnalysis: ResumeAnalysis | null;
  addAnalysis: (analysis: ResumeAnalysis) => void;
  setCurrentAnalysis: (analysis: ResumeAnalysis | null) => void;
  deleteAnalysis: (id: string) => void;
  getLatest: () => ResumeAnalysis | null;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      analyses: [],
      currentAnalysis: null,

      addAnalysis: (analysis) =>
        set((s) => ({
          analyses: [analysis, ...s.analyses],
          currentAnalysis: analysis,
        })),

      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),

      deleteAnalysis: (id) =>
        set((s) => ({
          analyses: s.analyses.filter((a) => a.id !== id),
          currentAnalysis: s.currentAnalysis?.id === id ? null : s.currentAnalysis,
        })),

      getLatest: () => {
        const analyses = get().analyses;
        return analyses.length > 0 ? analyses[0] : null;
      },
    }),
    { name: 'resume-analysis-storage' }
  )
);
