export type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export type SkillCategory = 
  | 'dsa'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'system-design'
  | 'soft-skills';

export interface SkillLevelInfo {
  level: SkillLevel;
  label: string;
  description: string;
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  currentLevel: SkillLevel;
  requiredLevel: SkillLevel;
  priority: 'critical' | 'important' | 'nice-to-have';
  demandPercentage: number;
  estimatedWeeks: number;
  suggestions: string[];
}

export interface SkillContribution {
  skillId: string;
  skillName: string;
  weight: number;
  userLevel: SkillLevel;
  contribution: number;
  maxContribution: number;
}
