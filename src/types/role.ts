export type RoleId = 
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'devops'
  | 'data-engineer';

export interface Role {
  id: RoleId;
  name: string;
  description: string;
  icon: string;
}

export interface RoleWeights {
  dsa: number;
  frontend: number;
  backend: number;
  database: number;
  devops: number;
  systemDesign: number;
  projects: number;
}

export interface SimulationResult {
  roleId: RoleId;
  roleName: string;
  readinessScore: number;
  breakdown: SkillBreakdown[];
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export interface SkillBreakdown {
  skillName: string;
  weight: number;
  userLevel: number;
  contribution: number;
  maxContribution: number;
}
