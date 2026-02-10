import type { SkillGap } from './skillgap';

export interface RoadmapTask {
  id: string;
  title: string;
  hours: number;
  done: boolean;
  skillId: string;
}

export interface RoadmapWeek {
  week: number;
  title: string;
  isCurrent: boolean;
  tasks: RoadmapTask[];
}

export interface RoadmapMilestone {
  week: number;
  title: string;
}

export interface GeneratedRoadmap {
  weeks: RoadmapWeek[];
  milestones: RoadmapMilestone[];
  totalWeeks: number;
}

// Task templates per skill
const TASK_TEMPLATES: Record<string, { title: string; hours: number }[]> = {
  dsa: [
    { title: 'Complete Binary Search problems', hours: 2 },
    { title: 'Practice Tree traversal problems', hours: 2 },
    { title: 'Solve Graph BFS/DFS problems', hours: 3 },
    { title: 'Study Dynamic Programming patterns', hours: 3 },
    { title: 'Complete 10 LeetCode medium problems', hours: 4 },
    { title: 'Practice sorting algorithm implementations', hours: 2 },
    { title: 'Solve Linked List problems set', hours: 2 },
    { title: 'Complete Hash Table challenge set', hours: 2 },
  ],
  frontend: [
    { title: 'Build a React component library', hours: 4 },
    { title: 'Implement state management patterns', hours: 3 },
    { title: 'Create responsive layouts project', hours: 3 },
    { title: 'Learn TypeScript advanced types', hours: 2 },
    { title: 'Build a form validation system', hours: 3 },
    { title: 'Implement API integration patterns', hours: 3 },
  ],
  backend: [
    { title: 'Build REST API mini-project', hours: 3 },
    { title: 'Implement authentication system', hours: 4 },
    { title: 'Create database models and migrations', hours: 3 },
    { title: 'Build middleware pipeline', hours: 2 },
    { title: 'Implement error handling patterns', hours: 2 },
    { title: 'Write API integration tests', hours: 3 },
  ],
  database: [
    { title: 'Practice SQL query optimization', hours: 2 },
    { title: 'Design a normalized database schema', hours: 3 },
    { title: 'Learn indexing strategies', hours: 2 },
    { title: 'Build data migration scripts', hours: 2 },
  ],
  'system-design': [
    { title: 'Read System Design primer', hours: 1 },
    { title: 'Study caching strategies', hours: 2 },
    { title: 'Learn load balancing concepts', hours: 2 },
    { title: 'Design a URL shortener system', hours: 3 },
    { title: 'Design a chat application', hours: 3 },
    { title: 'Study microservices patterns', hours: 2 },
  ],
  devops: [
    { title: 'Set up Docker development environment', hours: 2 },
    { title: 'Create CI/CD pipeline', hours: 3 },
    { title: 'Deploy app to cloud platform', hours: 3 },
    { title: 'Learn infrastructure monitoring', hours: 2 },
  ],
};

export function generateRoadmap(
  gaps: SkillGap[],
  weeklyHours: number = 10,
  durationDays: 30 | 60 | 90 = 30
): GeneratedRoadmap {
  const totalWeeks = Math.ceil(durationDays / 7);
  const weeks: RoadmapWeek[] = [];
  const milestones: RoadmapMilestone[] = [];

  // Get tasks for top gaps, ordered by priority
  const allTasks: { task: { title: string; hours: number }; skillId: string; skillName: string }[] = [];

  for (const gap of gaps) {
    const templates = TASK_TEMPLATES[gap.id] || [];
    const tasksNeeded = Math.min(templates.length, Math.ceil(gap.estimatedWeeks * 2));
    for (let i = 0; i < tasksNeeded; i++) {
      allTasks.push({ task: templates[i], skillId: gap.id, skillName: gap.skill });
    }
  }

  // Distribute tasks across weeks
  let taskIndex = 0;
  for (let w = 1; w <= totalWeeks; w++) {
    let hoursLeft = weeklyHours;
    const weekTasks: RoadmapTask[] = [];

    while (hoursLeft > 0 && taskIndex < allTasks.length) {
      const { task, skillId } = allTasks[taskIndex];
      if (task.hours <= hoursLeft + 1) {
        weekTasks.push({
          id: `task-${w}-${weekTasks.length}`,
          title: task.title,
          hours: task.hours,
          done: false,
          skillId,
        });
        hoursLeft -= task.hours;
        taskIndex++;
      } else {
        break;
      }
    }

    if (weekTasks.length === 0 && taskIndex >= allTasks.length) break;

    // Determine week title from dominant skill
    const skillCounts: Record<string, number> = {};
    weekTasks.forEach(t => {
      const name = allTasks.find(a => a.skillId === t.skillId)?.skillName || t.skillId;
      skillCounts[name] = (skillCounts[name] || 0) + 1;
    });
    const dominantSkill = Object.entries(skillCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'General';

    weeks.push({
      week: w,
      title: dominantSkill,
      isCurrent: w === 1,
      tasks: weekTasks,
    });

    // Add milestones every 4 weeks
    if (w % 4 === 0) {
      milestones.push({
        week: w,
        title: `Complete ${dominantSkill} fundamentals`,
      });
    }
  }

  // Add a final milestone
  if (weeks.length > 0) {
    milestones.push({
      week: weeks.length,
      title: 'Complete initial learning roadmap',
    });
  }

  return { weeks, milestones, totalWeeks };
}
