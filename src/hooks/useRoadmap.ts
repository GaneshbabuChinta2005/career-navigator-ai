import { useState, useMemo, useCallback } from 'react';
import { analyzeSkillGaps } from '@/services/skillgap';
import { generateRoadmap, type GeneratedRoadmap } from '@/services/roadmap';

const ROADMAP_TASKS_KEY = 'roadmap_tasks_done';

export function useRoadmap() {
  const [selectedDuration, setSelectedDuration] = useState<30 | 60 | 90>(30);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]);

  // Load completed task IDs
  const [doneTasks, setDoneTasks] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(ROADMAP_TASKS_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Load user data
  const userData = useMemo(() => {
    try {
      const saved = localStorage.getItem('onboarding_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          skills: parsed.skills || {},
          weeklyHours: parsed.weeklyHours || 10,
          targetRole: parsed.targetRole,
        };
      }
    } catch {}
    return {
      skills: { dsa: 3, frontend: 4, backend: 2, database: 3, 'system-design': 1, devops: 2 },
      weeklyHours: 10,
      targetRole: 'fullstack',
    };
  }, []);

  const roadmap: GeneratedRoadmap = useMemo(() => {
    const gaps = analyzeSkillGaps(userData.skills, userData.targetRole);
    const generated = generateRoadmap(gaps, userData.weeklyHours, selectedDuration);

    // Apply saved done states
    return {
      ...generated,
      weeks: generated.weeks.map(w => ({
        ...w,
        tasks: w.tasks.map(t => ({
          ...t,
          done: doneTasks.has(t.id),
        })),
      })),
    };
  }, [userData, selectedDuration, doneTasks]);

  const toggleTask = useCallback((taskId: string) => {
    setDoneTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      localStorage.setItem(ROADMAP_TASKS_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const toggleWeek = useCallback((week: number) => {
    setExpandedWeeks(prev =>
      prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week]
    );
  }, []);

  const completedTasks = roadmap.weeks.flatMap(w => w.tasks).filter(t => t.done).length;
  const totalTasks = roadmap.weeks.flatMap(w => w.tasks).length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    roadmap,
    selectedDuration,
    setSelectedDuration,
    expandedWeeks,
    toggleWeek,
    toggleTask,
    progress,
    completedTasks,
    totalTasks,
  };
}
