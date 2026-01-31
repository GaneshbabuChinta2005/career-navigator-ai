import type { RoleId, RoleWeights, Role } from '@/types/role';
import type { SkillLevelInfo, SkillCategory } from '@/types/skill';

// Role definitions
export const ROLES: Role[] = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    description: 'Build user interfaces with React, Vue, or Angular',
    icon: 'Layout',
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    description: 'Design APIs and server-side systems',
    icon: 'Server',
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    description: 'End-to-end application development',
    icon: 'Layers',
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    description: 'Infrastructure, CI/CD, and cloud systems',
    icon: 'Cloud',
  },
  {
    id: 'data-engineer',
    name: 'Data Engineer',
    description: 'Build data pipelines and analytics systems',
    icon: 'Database',
  },
];

// Role weights for simulation scoring
export const ROLE_WEIGHTS: Record<RoleId, RoleWeights> = {
  frontend: {
    dsa: 0.15,
    frontend: 0.40,
    backend: 0.10,
    database: 0.05,
    devops: 0.05,
    systemDesign: 0.10,
    projects: 0.15,
  },
  backend: {
    dsa: 0.25,
    frontend: 0.05,
    backend: 0.35,
    database: 0.15,
    devops: 0.05,
    systemDesign: 0.10,
    projects: 0.05,
  },
  fullstack: {
    dsa: 0.20,
    frontend: 0.20,
    backend: 0.20,
    database: 0.10,
    devops: 0.05,
    systemDesign: 0.15,
    projects: 0.10,
  },
  devops: {
    dsa: 0.10,
    frontend: 0.00,
    backend: 0.15,
    database: 0.10,
    devops: 0.40,
    systemDesign: 0.20,
    projects: 0.05,
  },
  'data-engineer': {
    dsa: 0.20,
    frontend: 0.00,
    backend: 0.15,
    database: 0.30,
    devops: 0.15,
    systemDesign: 0.15,
    projects: 0.05,
  },
};

// Skill level descriptions
export const SKILL_LEVELS: SkillLevelInfo[] = [
  { level: 0, label: 'No experience', description: 'Never worked with this' },
  { level: 1, label: 'Beginner', description: 'Just starting, know basics' },
  { level: 2, label: 'Familiar', description: 'Can complete simple tasks' },
  { level: 3, label: 'Intermediate', description: 'Can solve medium problems' },
  { level: 4, label: 'Advanced', description: 'Built production systems' },
  { level: 5, label: 'Expert', description: 'Can teach others, deep knowledge' },
];

// Skill categories for onboarding
export const SKILL_CATEGORIES: { id: SkillCategory; name: string; skills: string[] }[] = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    skills: ['Arrays & Strings', 'Trees & Graphs', 'Dynamic Programming', 'Sorting & Searching'],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    skills: ['React/Vue/Angular', 'HTML/CSS', 'JavaScript/TypeScript', 'State Management'],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    skills: ['Node.js/Python/Java', 'REST APIs', 'Authentication', 'Testing'],
  },
  {
    id: 'database',
    name: 'Databases',
    skills: ['SQL', 'NoSQL', 'Database Design', 'Query Optimization'],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    skills: ['Docker', 'CI/CD', 'AWS/GCP/Azure', 'Linux'],
  },
  {
    id: 'system-design',
    name: 'System Design',
    skills: ['Scalability', 'Caching', 'Load Balancing', 'Microservices'],
  },
];

// Default skills for onboarding (simplified view)
export const DEFAULT_SKILLS = [
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'dsa' as SkillCategory },
  { id: 'frontend', name: 'Frontend (React/Vue/Angular)', category: 'frontend' as SkillCategory },
  { id: 'backend', name: 'Backend (Node/Python/Java)', category: 'backend' as SkillCategory },
  { id: 'database', name: 'Databases (SQL/NoSQL)', category: 'database' as SkillCategory },
  { id: 'system-design', name: 'System Design', category: 'system-design' as SkillCategory },
  { id: 'devops', name: 'DevOps & Cloud', category: 'devops' as SkillCategory },
];

// Common tech stack options for projects
export const TECH_STACK_OPTIONS = [
  'React', 'Vue', 'Angular', 'Next.js', 'TypeScript',
  'Node.js', 'Express', 'Python', 'Django', 'FastAPI',
  'Java', 'Spring Boot', 'Go', 'Rust',
  'PostgreSQL', 'MongoDB', 'Redis', 'MySQL',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'GraphQL', 'REST API', 'WebSockets',
];

// Availability time slots
export const TIME_PREFERENCES = [
  { id: 'morning', label: 'Morning (6am - 12pm)' },
  { id: 'afternoon', label: 'Afternoon (12pm - 6pm)' },
  { id: 'evening', label: 'Evening (6pm - 12am)' },
] as const;
