import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type InterviewCategory = 'behavioral' | 'technical' | 'system-design' | 'coding';

export interface InterviewQuestion {
  id: string;
  question: string;
  category: InterviewCategory;
  difficulty: DifficultyLevel;
  hint?: string;
  sampleAnswer?: string;
}

export interface QuestionResponse {
  questionId: string;
  answer: string;
  score: number; // 0-10
  feedback: string;
  timeTaken: number; // seconds
}

export interface InterviewSession {
  id: string;
  role: string;
  date: string; // ISO date
  questions: InterviewQuestion[];
  responses: QuestionResponse[];
  totalScore: number;
  duration: number; // total seconds
  completed: boolean;
  strengths: string[];
  improvements: string[];
}

interface InterviewStore {
  sessions: InterviewSession[];
  addSession: (session: InterviewSession) => void;
  updateSession: (id: string, updates: Partial<InterviewSession>) => void;
  deleteSession: (id: string) => void;
  getSession: (id: string) => InterviewSession | undefined;
}

export const useInterviewStore = create<InterviewStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      addSession: (session) =>
        set((s) => ({ sessions: [session, ...s.sessions] })),
      updateSession: (id, updates) =>
        set((s) => ({
          sessions: s.sessions.map((sess) =>
            sess.id === id ? { ...sess, ...updates } : sess
          ),
        })),
      deleteSession: (id) =>
        set((s) => ({ sessions: s.sessions.filter((sess) => sess.id !== id) })),
      getSession: (id) => get().sessions.find((s) => s.id === id),
    }),
    { name: 'interview-storage' }
  )
);
