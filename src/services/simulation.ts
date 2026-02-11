import { ROLE_WEIGHTS, DEFAULT_SKILLS } from '@/lib/constants';
import type { RoleId, SkillBreakdown, SimulationResult } from '@/types/role';
import type { SkillLevel } from '@/types/skill';

// Map skill IDs used in onboarding to weight keys
const SKILL_TO_WEIGHT_KEY: Record<string, keyof typeof ROLE_WEIGHTS['fullstack']> = {
  dsa: 'dsa',
  frontend: 'frontend',
  backend: 'backend',
  database: 'database',
  'system-design': 'systemDesign',
  devops: 'devops',
};

export function simulateRole(
  roleId: RoleId,
  userSkills: Record<string, number>,
  projects: { complexity: number }[] = []
): SimulationResult {
  const weights = ROLE_WEIGHTS[roleId];
  const roleName = DEFAULT_SKILLS.length > 0 ? getRoleName(roleId) : roleId;

  // Calculate project score (average complexity / 5)
  const projectScore = projects.length > 0
    ? Math.round((projects.reduce((s, p) => s + (p.complexity || 3), 0) / projects.length))
    : 0;

  const breakdown: SkillBreakdown[] = [];

  for (const skill of DEFAULT_SKILLS) {
    const weightKey = SKILL_TO_WEIGHT_KEY[skill.id];
    if (!weightKey) continue;
    const weight = weights[weightKey];
    if (weight === 0) continue;

    const userLevel = (userSkills[skill.id] || 0) as SkillLevel;
    const maxContribution = Math.round(weight * 100);
    const contribution = Math.round((userLevel / 5) * maxContribution);

    breakdown.push({
      skillName: skill.name,
      weight: Math.round(weight * 100),
      userLevel,
      contribution,
      maxContribution,
    });
  }

  // Add projects contribution if weight > 0
  if (weights.projects > 0) {
    const maxContribution = Math.round(weights.projects * 100);
    const contribution = Math.round((projectScore / 5) * maxContribution);
    breakdown.push({
      skillName: 'Projects',
      weight: Math.round(weights.projects * 100),
      userLevel: projectScore as SkillLevel,
      contribution,
      maxContribution,
    });
  }

  const readinessScore = breakdown.reduce((s, b) => s + b.contribution, 0);

  // Find strengths (contribution >= 60% of max) and weaknesses (< 50% of max)
  const strengths = breakdown
    .filter(b => b.maxContribution > 0 && b.contribution / b.maxContribution >= 0.6)
    .sort((a, b) => b.contribution / b.maxContribution - a.contribution / a.maxContribution)
    .map(b => b.skillName);

  const weaknesses = breakdown
    .filter(b => b.maxContribution > 0 && b.contribution / b.maxContribution < 0.5)
    .sort((a, b) => a.contribution / a.maxContribution - b.contribution / b.maxContribution)
    .map(b => b.skillName);

  // Generate recommendation
  const topGaps = breakdown
    .filter(b => b.maxContribution > 0)
    .sort((a, b) => (b.maxContribution - b.contribution) - (a.maxContribution - a.contribution))
    .slice(0, 2);

  const recommendation = topGaps.length > 0
    ? `Focus on ${topGaps.map(g => `${g.skillName} (+${g.maxContribution - g.contribution}%)`).join(' and ')} to improve fastest.`
    : 'Great job! Keep refining your skills.';

  return {
    roleId,
    roleName,
    readinessScore,
    breakdown,
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 3),
    recommendation,
  };
}

function getRoleName(id: RoleId): string {
  const names: Record<RoleId, string> = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    fullstack: 'Full Stack Developer',
    devops: 'DevOps Engineer',
    'data-engineer': 'Data Engineer',
  };
  return names[id];
}
