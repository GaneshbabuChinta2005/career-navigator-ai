import { useState, useCallback } from 'react';

export interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  targetRole: string | null;
  skills: Record<string, number>;
  projects: Array<{
    id: string;
    name: string;
    techStack: string[];
    complexity: number;
  }>;
  weeklyHours: number;
  preferredTime: 'morning' | 'afternoon' | 'evening' | null;
  isComplete: boolean;
}

const STORAGE_KEY = 'onboarding_state';

const DEFAULT_STATE: OnboardingState = {
  currentStep: 1,
  targetRole: null,
  skills: {
    dsa: 0,
    frontend: 0,
    backend: 0,
    database: 0,
    'system-design': 0,
    devops: 0,
  },
  projects: [],
  weeklyHours: 20,
  preferredTime: null,
  isComplete: false,
};

export const useOnboardingState = () => {
  const [state, setState] = useState<OnboardingState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  const updateState = useCallback((newState: Partial<OnboardingState>) => {
    setState((prev) => {
      const updated = { ...prev, ...newState };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep < 4) {
        const updated = { ...prev, currentStep: (prev.currentStep + 1) as 1 | 2 | 3 | 4 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep > 1) {
        const updated = { ...prev, currentStep: (prev.currentStep - 1) as 1 | 2 | 3 | 4 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  }, []);

  const updateSkill = useCallback((skillId: string, level: number) => {
    setState((prev) => {
      const updated = {
        ...prev,
        skills: { ...prev.skills, [skillId]: level },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addProject = useCallback(
    (project: OnboardingState['projects'][0]) => {
      setState((prev) => {
        const updated = {
          ...prev,
          projects: [...prev.projects, project],
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const removeProject = useCallback((projectId: string) => {
    setState((prev) => {
      const updated = {
        ...prev,
        projects: prev.projects.filter((p) => p.id !== projectId),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const complete = useCallback(() => {
    setState((prev) => {
      const updated = { ...prev, isComplete: true };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    state,
    updateState,
    nextStep,
    prevStep,
    updateSkill,
    addProject,
    removeProject,
    complete,
    reset,
  };
};
