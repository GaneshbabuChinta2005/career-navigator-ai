import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  CheckCircle2, Circle, Plus, Trash2, CalendarDays, Flame,
  ChevronLeft, ChevronRight, Target, Clock, BookOpen,
  Code2, Briefcase, MoreHorizontal, Edit2
} from 'lucide-react';
import {
  useScheduleStore,
  type DailyTask,
  type TaskCategory,
  type TaskPriority,
} from '@/store/useScheduleStore';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';

const CATEGORY_META: Record<TaskCategory, { label: string; icon: any; color: string }> = {
  study: { label: 'Study', icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
  practice: { label: 'Practice', icon: Code2, color: 'bg-purple-100 text-purple-700' },
  interview: { label: 'Interview', icon: Briefcase, color: 'bg-pink-100 text-pink-700' },
  project: { label: 'Project', icon: Target, color: 'bg-green-100 text-green-700' },
  other: { label: 'Other', icon: MoreHorizontal, color: 'bg-gray-100 text-gray-700' },
};

const PRIORITY_META: Record<TaskPriority, { label: string; color: string }> = {
  high: { label: 'High', color: 'text-red-600 bg-red-50' },
  medium: { label: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
  low: { label: 'Low', color: 'text-green-600 bg-green-50' },
};

const toDateStr = (d: Date) => d.toISOString().split('T')[0];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  const today = toDateStr(new Date());
  const yesterday = toDateStr(new Date(Date.now() - 86400000));
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

// ── Add Task Dialog ───────────────────────────────────────────────────────────
interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Omit<DailyTask, 'id' | 'completed'>) => void;
  editing?: DailyTask | null;
}

function AddTaskDialog({ open, onClose, onAdd, editing }: AddTaskDialogProps) {
  const [title, setTitle] = useState(editing?.title || '');
  const [category, setCategory] = useState<TaskCategory>(editing?.category || 'study');
  const [priority, setPriority] = useState<TaskPriority>(editing?.priority || 'medium');
  const [minutes, setMinutes] = useState(String(editing?.estimatedMinutes || 30));
  const [notes, setNotes] = useState(editing?.notes || '');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), category, priority, estimatedMinutes: parseInt(minutes) || 30, notes });
    onClose();
    setTitle(''); setCategory('study'); setPriority('medium'); setMinutes('30'); setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit Task' : 'Add Task'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Task Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solve 3 LeetCode problems"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select value={category} onValueChange={(v) => setCategory(v as TaskCategory)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_META).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Priority</label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(PRIORITY_META).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Estimated Time (minutes)</label>
            <Input
              type="number"
              min={5}
              max={480}
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Notes (optional)</label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            {editing ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Task Item ─────────────────────────────────────────────────────────────────
function TaskItem({
  task,
  dateStr,
  onEdit,
}: {
  task: DailyTask;
  dateStr: string;
  onEdit: (task: DailyTask) => void;
}) {
  const { toggleTask, deleteTask } = useScheduleStore();
  const meta = CATEGORY_META[task.category];
  const CatIcon = meta.icon;

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 group ${
        task.completed ? 'bg-muted/40 opacity-70' : 'bg-background hover:shadow-sm'
      }`}
    >
      <button
        onClick={() => toggleTask(dateStr, task.id)}
        className="mt-0.5 shrink-0 text-muted-foreground hover:text-primary transition-colors"
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </span>
          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-1 rounded hover:bg-accent"
              aria-label="Edit task"
            >
              <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button
              onClick={() => deleteTask(dateStr, task.id)}
              className="p-1 rounded hover:bg-red-50 hover:text-red-500"
              aria-label="Delete task"
            >
              <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${meta.color}`}>
            <CatIcon className="w-3 h-3" />
            {meta.label}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_META[task.priority].color}`}>
            {PRIORITY_META[task.priority].label}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {task.estimatedMinutes}m
          </span>
          {task.completed && task.completedAt && (
            <span className="text-xs text-green-600">
              ✓ {new Date(task.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        {task.notes && (
          <p className="text-xs text-muted-foreground mt-1">{task.notes}</p>
        )}
      </div>
    </div>
  );
}

// ── Weekly Mini Calendar ──────────────────────────────────────────────────────
function WeekStrip({
  selectedDate,
  onSelect,
}: {
  selectedDate: string;
  onSelect: (d: string) => void;
}) {
  const { schedules, getCompletionRate } = useScheduleStore();
  const today = toDateStr(new Date());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 3 + i);
    return toDateStr(d);
  });

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {days.map((dateStr) => {
        const d = new Date(dateStr + 'T00:00:00');
        const rate = getCompletionRate(dateStr);
        const hasData = schedules.some((s) => s.date === dateStr && s.tasks.length > 0);
        const isSelected = dateStr === selectedDate;
        const isToday = dateStr === today;

        return (
          <button
            key={dateStr}
            onClick={() => onSelect(dateStr)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[56px] border-2 transition-all ${
              isSelected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-transparent hover:border-primary/30 hover:bg-accent'
            }`}
          >
            <span className={`text-xs font-medium uppercase ${isSelected ? '' : 'text-muted-foreground'}`}>
              {d.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <span className={`text-base font-bold ${isToday && !isSelected ? 'text-primary' : ''}`}>
              {d.getDate()}
            </span>
            {hasData && (
              <div
                className={`w-4 h-1 rounded-full ${
                  rate === 100 ? 'bg-green-400' : rate > 0 ? 'bg-yellow-400' : 'bg-gray-300'
                } ${isSelected ? 'bg-white/60' : ''}`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── History Heatmap (last 14 days) ───────────────────────────────────────────
function HistoryHeatmap() {
  const { schedules, getCompletionRate } = useScheduleStore();

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return toDateStr(d);
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-primary" /> 14-Day Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((dateStr) => {
            const rate = getCompletionRate(dateStr);
            const has = schedules.some((s) => s.date === dateStr && s.tasks.length > 0);
            const d = new Date(dateStr + 'T00:00:00');

            let bg = 'bg-muted/40';
            if (has) {
              if (rate === 100) bg = 'bg-green-500';
              else if (rate >= 60) bg = 'bg-green-300';
              else if (rate >= 30) bg = 'bg-yellow-300';
              else bg = 'bg-red-200';
            }

            return (
              <div
                key={dateStr}
                className={`aspect-square rounded-md ${bg} relative group cursor-default`}
                title={`${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${has ? rate + '% complete' : 'No tasks'}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-medium text-foreground/60">
                    {d.getDate()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span>Less</span>
          {['bg-muted/40', 'bg-red-200', 'bg-yellow-300', 'bg-green-300', 'bg-green-500'].map((c) => (
            <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Schedule Page ────────────────────────────────────────────────────────
const Schedule = () => {
  const today = toDateStr(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<DailyTask | null>(null);
  const [focusInput, setFocusInput] = useState('');
  const [editingFocus, setEditingFocus] = useState(false);

  const { schedules, addTask, updateTask, setFocusGoal, getCompletionRate, getStreak } =
    useScheduleStore();

  const dayData = schedules.find((s) => s.date === selectedDate) || {
    date: selectedDate,
    tasks: [],
    focusGoal: undefined,
  };
  const completionRate = getCompletionRate(selectedDate);
  const streak = getStreak();

  const completed = dayData.tasks.filter((t) => t.completed);
  const pending = dayData.tasks.filter((t) => !t.completed);
  const totalMinutes = dayData.tasks.reduce((s, t) => s + t.estimatedMinutes, 0);
  const doneMinutes = completed.reduce((s, t) => s + t.estimatedMinutes, 0);

  const handleAdd = (taskData: Omit<DailyTask, 'id' | 'completed'>) => {
    addTask(selectedDate, taskData);
  };

  const handleEditSave = (taskData: Omit<DailyTask, 'id' | 'completed'>) => {
    if (!editingTask) return;
    updateTask(selectedDate, editingTask.id, taskData);
    setEditingTask(null);
  };

  const handleFocusSave = () => {
    setFocusGoal(selectedDate, focusInput);
    setEditingFocus(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CalendarDays className="w-8 h-8 text-primary" /> Daily Schedule
          </h1>
          <p className="text-muted-foreground mt-1">Track your daily learning tasks and build consistency</p>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-600">{streak} day streak</span>
            </div>
          )}
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Task
          </Button>
        </div>
      </div>

      {/* Week Strip */}
      <Card>
        <CardContent className="p-4">
          <WeekStrip selectedDate={selectedDate} onSelect={setSelectedDate} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Day View */}
        <div className="lg:col-span-2 space-y-4">
          {/* Day Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{formatDate(selectedDate)}</h2>
              <p className="text-sm text-muted-foreground">
                {dayData.tasks.length === 0
                  ? 'No tasks yet'
                  : `${completed.length} of ${dayData.tasks.length} done · ${doneMinutes}/${totalMinutes} min`}
              </p>
            </div>
            {dayData.tasks.length > 0 && (
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{completionRate}%</div>
                <div className="text-xs text-muted-foreground">complete</div>
              </div>
            )}
          </div>

          {dayData.tasks.length > 0 && (
            <Progress value={completionRate} className="h-2.5" />
          )}

          {/* Focus Goal */}
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Daily Focus
                  </p>
                  {editingFocus ? (
                    <div className="flex gap-2">
                      <Input
                        value={focusInput}
                        onChange={(e) => setFocusInput(e.target.value)}
                        placeholder="What's your main goal today?"
                        className="text-sm h-8"
                        onKeyDown={(e) => e.key === 'Enter' && handleFocusSave()}
                        autoFocus
                      />
                      <Button size="sm" onClick={handleFocusSave}>Save</Button>
                    </div>
                  ) : (
                    <p className={`text-sm ${dayData.focusGoal ? 'font-medium' : 'text-muted-foreground italic'}`}>
                      {dayData.focusGoal || 'Set your focus goal for today...'}
                    </p>
                  )}
                </div>
                {!editingFocus && (
                  <Button
                    variant="ghost" size="sm"
                    onClick={() => { setFocusInput(dayData.focusGoal || ''); setEditingFocus(true); }}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          {pending.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Pending ({pending.length})
              </h3>
              {pending
                .sort((a, b) => {
                  const order = { high: 0, medium: 1, low: 2 };
                  return order[a.priority] - order[b.priority];
                })
                .map((task) => (
                  <TaskItem key={task.id} task={task} dateStr={selectedDate} onEdit={setEditingTask} />
                ))}
            </div>
          )}

          {/* Completed Tasks */}
          {completed.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Completed ({completed.length})
              </h3>
              {completed.map((task) => (
                <TaskItem key={task.id} task={task} dateStr={selectedDate} onEdit={setEditingTask} />
              ))}
            </div>
          )}

          {dayData.tasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No tasks for this day</p>
              <p className="text-sm mt-1">Click "Add Task" to plan your day</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <HistoryHeatmap />

          {/* Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i));
                const ds = toDateStr(d);
                const rate = getCompletionRate(ds);
                const hasTasks = schedules.some((s) => s.date === ds && s.tasks.length > 0);
                return (
                  <div key={ds} className="flex items-center gap-2">
                    <span className="text-xs w-8 text-muted-foreground">
                      {d.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <Progress value={hasTasks ? rate : 0} className="flex-1 h-2" />
                    <span className="text-xs w-8 text-right text-muted-foreground">
                      {hasTasks ? `${rate}%` : '—'}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <AddTaskDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAdd}
      />
      <AddTaskDialog
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        onAdd={handleEditSave}
        editing={editingTask}
      />
    </div>
  );
};

export default Schedule;
