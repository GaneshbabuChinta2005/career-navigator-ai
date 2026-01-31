export type RoadmapDuration = 30 | 60 | 90;

export interface Roadmap {
  id: string;
  userId: string;
  roleId: string;
  duration: RoadmapDuration;
  weeks: RoadmapWeek[];
  milestones: Milestone[];
  createdAt: Date;
  progress: number;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  tasks: RoadmapTask[];
  isComplete: boolean;
  isCurrent: boolean;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description?: string;
  estimatedHours: number;
  skillId: string;
  isComplete: boolean;
  completedAt?: Date;
}

export interface Milestone {
  id: string;
  title: string;
  weekNumber: number;
  isComplete: boolean;
  description?: string;
}

export interface RoadmapProgress {
  totalTasks: number;
  completedTasks: number;
  percentComplete: number;
  currentWeek: number;
  totalWeeks: number;
}
