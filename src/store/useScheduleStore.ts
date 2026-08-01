import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskCategory = 'study' | 'practice' | 'interview' | 'project' | 'other';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface DailyTask {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  estimatedMinutes: number;
  completed: boolean;
  completedAt?: string; // ISO datetime
  notes?: string;
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD
  tasks: DailyTask[];
  focusGoal?: string; // optional daily focus
}

interface ScheduleStore {
  schedules: DaySchedule[];

  // Get or create schedule for a date
  getOrCreateDay: (date: string) => DaySchedule;

  // Task operations
  addTask: (date: string, task: Omit<DailyTask, 'id' | 'completed'>) => void;
  toggleTask: (date: string, taskId: string) => void;
  updateTask: (date: string, taskId: string, updates: Partial<DailyTask>) => void;
  deleteTask: (date: string, taskId: string) => void;

  // Day operations
  setFocusGoal: (date: string, goal: string) => void;
  clearDay: (date: string) => void;

  // Stats helpers
  getCompletionRate: (date: string) => number;
  getStreak: () => number;
}

const uid = () => Math.random().toString(36).slice(2, 9);

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set, get) => ({
      schedules: [],

      getOrCreateDay: (date) => {
        const existing = get().schedules.find((s) => s.date === date);
        if (existing) return existing;
        const newDay: DaySchedule = { date, tasks: [] };
        set((s) => ({ schedules: [...s.schedules, newDay] }));
        return newDay;
      },

      addTask: (date, taskData) => {
        const newTask: DailyTask = {
          id: uid(),
          completed: false,
          ...taskData,
        };
        set((s) => {
          const exists = s.schedules.find((d) => d.date === date);
          if (exists) {
            return {
              schedules: s.schedules.map((d) =>
                d.date === date ? { ...d, tasks: [...d.tasks, newTask] } : d
              ),
            };
          }
          return {
            schedules: [...s.schedules, { date, tasks: [newTask] }],
          };
        });
      },

      toggleTask: (date, taskId) =>
        set((s) => ({
          schedules: s.schedules.map((d) =>
            d.date === date
              ? {
                  ...d,
                  tasks: d.tasks.map((t) =>
                    t.id === taskId
                      ? {
                          ...t,
                          completed: !t.completed,
                          completedAt: !t.completed ? new Date().toISOString() : undefined,
                        }
                      : t
                  ),
                }
              : d
          ),
        })),

      updateTask: (date, taskId, updates) =>
        set((s) => ({
          schedules: s.schedules.map((d) =>
            d.date === date
              ? {
                  ...d,
                  tasks: d.tasks.map((t) =>
                    t.id === taskId ? { ...t, ...updates } : t
                  ),
                }
              : d
          ),
        })),

      deleteTask: (date, taskId) =>
        set((s) => ({
          schedules: s.schedules.map((d) =>
            d.date === date
              ? { ...d, tasks: d.tasks.filter((t) => t.id !== taskId) }
              : d
          ),
        })),

      setFocusGoal: (date, goal) =>
        set((s) => {
          const exists = s.schedules.find((d) => d.date === date);
          if (exists) {
            return {
              schedules: s.schedules.map((d) =>
                d.date === date ? { ...d, focusGoal: goal } : d
              ),
            };
          }
          return {
            schedules: [...s.schedules, { date, tasks: [], focusGoal: goal }],
          };
        }),

      clearDay: (date) =>
        set((s) => ({
          schedules: s.schedules.filter((d) => d.date !== date),
        })),

      getCompletionRate: (date) => {
        const day = get().schedules.find((d) => d.date === date);
        if (!day || day.tasks.length === 0) return 0;
        const done = day.tasks.filter((t) => t.completed).length;
        return Math.round((done / day.tasks.length) * 100);
      },

      getStreak: () => {
        const schedules = get().schedules;
        const today = new Date();
        let streak = 0;
        for (let i = 0; i < 365; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          const day = schedules.find((s) => s.date === dateStr);
          if (day && day.tasks.length > 0 && day.tasks.some((t) => t.completed)) {
            streak++;
          } else if (i > 0) {
            break;
          }
        }
        return streak;
      },
    }),
    { name: 'schedule-storage' }
  )
);
