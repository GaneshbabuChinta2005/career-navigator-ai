import type { SkillLevel } from '@/types/skill';

export interface SkillGap {
  id: string;
  skill: string;
  priority: 'critical' | 'important' | 'nice-to-have';
  demandPercent: number;
  userLevel: SkillLevel;
  estimatedWeeks: number;
  suggestions: string[];
}

// Simulated market demand data per skill
const MARKET_DEMAND: Record<string, { demand: number; suggestions: string[] }> = {
  dsa: {
    demand: 76,
    suggestions: ['Focus on Graph and DP problems', 'Complete 50 LeetCode medium problems', 'Practice whiteboard coding daily'],
  },
  frontend: {
    demand: 85,
    suggestions: ['Build 2 React projects with state management', 'Learn TypeScript deeply', 'Contribute to open source UI libraries'],
  },
  backend: {
    demand: 82,
    suggestions: ['Build a REST API project with auth', 'Learn authentication & authorization patterns', 'Practice database integration'],
  },
  database: {
    demand: 68,
    suggestions: ['Learn SQL query optimization', 'Build a project with PostgreSQL', 'Study database design patterns'],
  },
  'system-design': {
    demand: 89,
    suggestions: ['Complete "Grokking System Design" course', 'Practice 2 design problems weekly', 'Study real-world architectures'],
  },
  devops: {
    demand: 55,
    suggestions: ['Set up a CI/CD pipeline', 'Learn Docker fundamentals', 'Deploy an app on AWS/GCP'],
  },
};

const SKILL_NAMES: Record<string, string> = {
  dsa: 'Data Structures & Algorithms',
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  database: 'Databases',
  'system-design': 'System Design',
  devops: 'DevOps & Cloud',
};

function estimateWeeks(userLevel: number, demand: number): number {
  const gap = 5 - userLevel;
  const urgency = demand / 100;
  return Math.max(1, Math.round(gap * 1.5 * urgency));
}

export function analyzeSkillGaps(
  userSkills: Record<string, number>,
  _targetRole?: string
): SkillGap[] {
  const gaps: SkillGap[] = [];

  for (const [skillId, level] of Object.entries(userSkills)) {
    const market = MARKET_DEMAND[skillId];
    if (!market) continue;

    const userLevel = level as SkillLevel;
    let priority: SkillGap['priority'];

    if (market.demand >= 80 && userLevel < 3) {
      priority = 'critical';
    } else if (market.demand >= 50 && userLevel < 4) {
      priority = 'important';
    } else {
      priority = 'nice-to-have';
    }

    // Only include actual gaps (level < 5)
    if (userLevel >= 5) continue;

    gaps.push({
      id: skillId,
      skill: SKILL_NAMES[skillId] || skillId,
      priority,
      demandPercent: market.demand,
      userLevel,
      estimatedWeeks: estimateWeeks(userLevel, market.demand),
      suggestions: market.suggestions.slice(0, 2),
    });
  }

  // Sort: critical first, then important, then nice-to-have
  const priorityOrder = { critical: 0, important: 1, 'nice-to-have': 2 };
  return gaps.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}
