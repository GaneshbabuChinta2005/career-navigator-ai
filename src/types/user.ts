export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  onboardingComplete: boolean;
}

export interface UserProfile {
  userId: string;
  targetRole: string | null;
  skills: Record<string, number>;
  projects: Project[];
  weeklyHours: number;
  preferredTime: 'morning' | 'afternoon' | 'evening' | null;
}

export interface Project {
  id: string;
  name: string;
  techStack: string[];
  complexity: 1 | 2 | 3 | 4 | 5;
  description?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
