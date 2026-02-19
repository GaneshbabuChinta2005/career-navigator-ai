import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ChevronDown,
    ChevronUp,
    Plus,
    Trash2,
    Pencil,
    MoreVertical,
    ArrowUp,
    ArrowDown,
    Target,
    RotateCcw,
    ExternalLink,
    CheckCircle2,
    Layers,
    Calendar,
    Link as LinkIcon,
    Sparkles,
} from 'lucide-react';
import { useRoadmapStore, type Priority, type Task, type Phase } from '@/features/roadmap/store/useRoadmapStore';
import { AIGenerateRoadmapDialog } from './AIGenerateRoadmapDialog';
import { cn } from '@/lib/utils';

const priorityConfig: Record<Priority, { label: string; class: string }> = {
    high: { label: 'High', class: 'bg-red-500/15 text-red-400 border-red-400/30' },
    medium: { label: 'Medium', class: 'bg-amber-500/15 text-amber-400 border-amber-400/30' },
    low: { label: 'Low', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-400/30' },
};

const colorConfig: Record<string, { gradient: string; border: string; glow: string; text: string }> = {
    cyan: {
        gradient: 'from-cyan-500 to-cyan-400',
        border: 'border-cyan-500/30',
        glow: 'shadow-[0_0_20px_rgba(0,229,255,0.15)]',
        text: 'text-cyan-400',
    },
    violet: {
        gradient: 'from-violet-500 to-violet-400',
        border: 'border-violet-500/30',
        glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
        text: 'text-violet-400',
    },
    pink: {
        gradient: 'from-pink-500 to-pink-400',
        border: 'border-pink-500/30',
        glow: 'shadow-[0_0_20px_rgba(244,114,182,0.15)]',
        text: 'text-pink-400',
    },
    emerald: {
        gradient: 'from-emerald-500 to-emerald-400',
        border: 'border-emerald-500/30',
        glow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]',
        text: 'text-emerald-400',
    },
    orange: {
        gradient: 'from-orange-500 to-orange-400',
        border: 'border-orange-500/30',
        glow: 'shadow-[0_0_20px_rgba(251,146,60,0.15)]',
        text: 'text-orange-400',
    },
};

const PHASE_COLORS = ['cyan', 'violet', 'pink', 'emerald', 'orange'];

// ─── Task Dialog ──────────────────────────────────────────────────────────────
interface TaskDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (title: string, priority: Priority, deadline: string, resource: string) => void;
    initial?: Partial<Task>;
    mode: 'add' | 'edit';
}

const TaskDialog = ({ open, onClose, onSave, initial, mode }: TaskDialogProps) => {
    const [title, setTitle] = useState(initial?.title ?? '');
    const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'medium');
    const [deadline, setDeadline] = useState(initial?.deadline ?? '');
    const [resource, setResource] = useState(initial?.resource ?? '');

    const handleSave = () => {
        if (!title.trim()) return;
        onSave(title.trim(), priority, deadline, resource.trim());
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{mode === 'add' ? 'Add Task' : 'Edit Task'}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Task Title</label>
                        <Textarea
                            placeholder="What do you need to accomplish?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="min-h-[80px] resize-none"
                            autoFocus
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Priority</label>
                            <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">🔴 High</SelectItem>
                                    <SelectItem value="medium">🟡 Medium</SelectItem>
                                    <SelectItem value="low">🟢 Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" /> Deadline
                            </label>
                            <Input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium flex items-center gap-1">
                            <LinkIcon className="w-3.5 h-3.5" /> Resource URL or Note
                        </label>
                        <Input
                            placeholder="https://... or a brief note"
                            value={resource}
                            onChange={(e) => setResource(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!title.trim()}>
                        {mode === 'add' ? 'Add Task' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// ─── Inline Label Editor ──────────────────────────────────────────────────────
interface InlineLabelProps {
    value: string;
    onSave: (v: string) => void;
    className?: string;
}

const InlineLabel = ({ value, onSave, className }: InlineLabelProps) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    const commit = () => {
        if (draft.trim()) onSave(draft.trim());
        setEditing(false);
    };

    if (editing) {
        return (
            <Input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') commit();
                    if (e.key === 'Escape') { setDraft(value); setEditing(false); }
                }}
                className={cn('h-7 text-sm py-0 px-2 font-semibold', className)}
            />
        );
    }

    return (
        <span
            className={cn('cursor-pointer hover:text-primary transition-colors', className)}
            onClick={() => setEditing(true)}
            title="Click to rename"
        >
            {value}
        </span>
    );
};

// ─── TaskRow ──────────────────────────────────────────────────────────────────
interface TaskRowProps {
    task: Task;
    phaseId: string;
    weekId: string;
    isFirst: boolean;
    isLast: boolean;
}

const TaskRow = ({ task, phaseId, weekId, isFirst, isLast }: TaskRowProps) => {
    const { toggleTask, deleteTask, updateTask, moveTaskUp, moveTaskDown } = useRoadmapStore();
    const [editOpen, setEditOpen] = useState(false);
    const p = priorityConfig[task.priority];

    return (
        <>
            <div
                className={cn(
                    'group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 border border-transparent',
                    task.completed
                        ? 'bg-muted/20 opacity-60'
                        : 'hover:bg-accent/20 hover:border-border/40'
                )}
            >
                {/* Checkbox */}
                <div className="mt-0.5">
                    <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(phaseId, weekId, task.id)}
                        className="w-4 h-4"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className={cn('text-sm leading-snug', task.completed && 'line-through text-muted-foreground')}>
                        {task.title}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                        <Badge className={cn('text-[10px] px-1.5 py-0 border', p.class)}>{p.label}</Badge>
                        {task.deadline && (
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Calendar className="w-2.5 h-2.5" />
                                {new Date(task.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                            </span>
                        )}
                        {task.resource && (
                            <a
                                href={task.resource.startsWith('http') ? task.resource : '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                                onClick={(e) => !task.resource?.startsWith('http') && e.preventDefault()}
                            >
                                <ExternalLink className="w-2.5 h-2.5" />
                                Resource
                            </a>
                        )}
                    </div>
                </div>

                {/* Actions (visible on hover) */}
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost" size="icon"
                        className="h-6 w-6"
                        disabled={isFirst}
                        onClick={() => moveTaskUp(phaseId, weekId, task.id)}
                    >
                        <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                        variant="ghost" size="icon"
                        className="h-6 w-6"
                        disabled={isLast}
                        onClick={() => moveTaskDown(phaseId, weekId, task.id)}
                    >
                        <ArrowDown className="w-3 h-3" />
                    </Button>
                    <Button
                        variant="ghost" size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => setEditOpen(true)}
                    >
                        <Pencil className="w-3 h-3" />
                    </Button>
                    <Button
                        variant="ghost" size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(phaseId, weekId, task.id)}
                    >
                        <Trash2 className="w-3 h-3" />
                    </Button>
                </div>
            </div>

            {/* Edit Task dialog */}
            {editOpen && (
                <TaskDialog
                    open={editOpen}
                    mode="edit"
                    initial={task}
                    onClose={() => setEditOpen(false)}
                    onSave={(title, priority, deadline, resource) =>
                        updateTask(phaseId, weekId, task.id, { title, priority, deadline, resource })
                    }
                />
            )}
        </>
    );
};

// ─── AddPhase Dialog ──────────────────────────────────────────────────────────
interface AddPhaseDialogProps {
    open: boolean;
    onClose: () => void;
}
const AddPhaseDialog = ({ open, onClose }: AddPhaseDialogProps) => {
    const { addPhase } = useRoadmapStore();
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('cyan');

    const handleAdd = () => {
        if (!title.trim()) return;
        addPhase(title.trim(), color);
        setTitle('');
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add New Phase</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Phase Title</label>
                        <Input
                            autoFocus
                            placeholder="e.g. 120-Day Expert"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Color</label>
                        <div className="flex gap-2">
                            {PHASE_COLORS.map((c) => {
                                const cfg = colorConfig[c];
                                return (
                                    <button
                                        key={c}
                                        className={cn(
                                            'w-8 h-8 rounded-full bg-gradient-to-br transition-all',
                                            cfg.gradient,
                                            color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-background scale-110' : 'opacity-60 hover:opacity-100'
                                        )}
                                        onClick={() => setColor(c)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAdd} disabled={!title.trim()}>Add Phase</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// ─── Main RoadmapTimeline ─────────────────────────────────────────────────────
export const RoadmapTimeline = () => {
    const {
        goalRole, setGoalRole,
        phases,
        addWeek, renameWeek, deleteWeek,
        addTask, renamePhase, deletePhase, resetToDefault,
    } = useRoadmapStore();

    const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
        new Set(phases.map((p) => p.id))
    );
    const [addPhaseOpen, setAddPhaseOpen] = useState(false);
    const [aiGenerateOpen, setAiGenerateOpen] = useState(false);
    const [addTaskState, setAddTaskState] = useState<{ phaseId: string; weekId: string } | null>(null);
    const [addWeekState, setAddWeekState] = useState<string | null>(null); // phaseId
    const [newWeekTitle, setNewWeekTitle] = useState('');
    const [goalEditing, setGoalEditing] = useState(false);
    const [goalDraft, setGoalDraft] = useState(goalRole);

    const togglePhase = (id: string) => {
        setExpandedPhases((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const calcProgress = (phase: Phase) => {
        const all = phase.weeks.flatMap((w) => w.tasks);
        const done = all.filter((t) => t.completed).length;
        return all.length > 0 ? Math.round((done / all.length) * 100) : 0;
    };

    const totalTasks = phases.flatMap((p) => p.weeks.flatMap((w) => w.tasks)).length;
    const doneTasks = phases.flatMap((p) => p.weeks.flatMap((w) => w.tasks)).filter((t) => t.completed).length;
    const overallProgress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-display">Career Roadmap</h1>
                    <p className="text-muted-foreground mt-1">Your personalized 30/60/90-day learning journey</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Button
                        onClick={() => setAiGenerateOpen(true)}
                        className="bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:opacity-90 shadow-lg"
                    >
                        <Sparkles className="w-4 h-4 mr-2" /> Generate with AI
                    </Button>
                    <Button
                        onClick={() => setAddPhaseOpen(true)}
                        className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Phase
                    </Button>
                    <Button variant="outline" size="icon" onClick={resetToDefault} title="Reset to defaults">
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* ── Goal Banner ── */}
            <div className="glass rounded-2xl border border-primary/20 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Target Role</p>
                    {goalEditing ? (
                        <Input
                            autoFocus
                            value={goalDraft}
                            onChange={(e) => setGoalDraft(e.target.value)}
                            onBlur={() => { setGoalRole(goalDraft.trim() || goalRole); setGoalEditing(false); }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') { setGoalRole(goalDraft.trim() || goalRole); setGoalEditing(false); }
                                if (e.key === 'Escape') { setGoalDraft(goalRole); setGoalEditing(false); }
                            }}
                            className="h-8 text-base font-semibold"
                        />
                    ) : (
                        <p
                            className="text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                            onClick={() => { setGoalDraft(goalRole); setGoalEditing(true); }}
                            title="Click to edit goal"
                        >
                            {goalRole} <Pencil className="w-3.5 h-3.5 inline ml-1 opacity-50" />
                        </p>
                    )}
                </div>
                <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-gradient">{overallProgress}%</p>
                    <p className="text-xs text-muted-foreground">{doneTasks}/{totalTasks} tasks done</p>
                </div>
            </div>

            {/* ── Overall progress ── */}
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Overall Progress</span>
                    <span>{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
            </div>

            {/* ── Phases ── */}
            <div className="space-y-5">
                {phases.map((phase) => {
                    const cfg = colorConfig[phase.color] ?? colorConfig['cyan'];
                    const progress = calcProgress(phase);
                    const isExpanded = expandedPhases.has(phase.id);
                    const allTasksInPhase = phase.weeks.flatMap((w) => w.tasks);

                    return (
                        <Card
                            key={phase.id}
                            className={cn(
                                'border overflow-hidden transition-shadow duration-300',
                                cfg.border,
                                isExpanded && cfg.glow
                            )}
                        >
                            {/* Phase top gradient line */}
                            <div className={cn('h-0.5 bg-gradient-to-r w-full', cfg.gradient)} />

                            {/* Phase Header */}
                            <CardHeader className="py-4 px-5">
                                <div className="flex items-center gap-3">
                                    {/* Expand toggle */}
                                    <button onClick={() => togglePhase(phase.id)} className="shrink-0">
                                        {isExpanded
                                            ? <ChevronUp className={cn('w-5 h-5', cfg.text)} />
                                            : <ChevronDown className={cn('w-5 h-5', cfg.text)} />}
                                    </button>

                                    {/* Phase icon */}
                                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br shrink-0', cfg.gradient)}>
                                        <Layers className="w-4 h-4 text-background" />
                                    </div>

                                    {/* Phase title (inline editable) */}
                                    <div className="flex-1 min-w-0">
                                        <InlineLabel
                                            value={phase.title}
                                            onSave={(v) => renamePhase(phase.id, v)}
                                            className={cn('text-base font-bold font-display', cfg.text)}
                                        />
                                        <div className="flex items-center gap-2 mt-1">
                                            <Progress value={progress} className="h-1.5 flex-1" />
                                            <span className="text-xs text-muted-foreground shrink-0">
                                                {progress}% · {allTasksInPhase.filter((t) => t.completed).length}/{allTasksInPhase.length}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Phase actions */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => {
                                                setAddWeekState(phase.id);
                                                setNewWeekTitle('');
                                                setExpandedPhases((prev) => new Set([...prev, phase.id]));
                                            }}>
                                                <Plus className="w-4 h-4 mr-2" /> Add Week
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-destructive focus:text-destructive"
                                                onClick={() => deletePhase(phase.id)}
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" /> Delete Phase
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>

                            {/* Phase Content */}
                            {isExpanded && (
                                <CardContent className="px-5 pb-5 space-y-5">
                                    {phase.weeks.map((week) => (
                                        <div key={week.id} className="space-y-1">
                                            {/* Week header */}
                                            <div className="flex items-center gap-2 group/week">
                                                <div className={cn('w-0.5 h-5 rounded-full bg-gradient-to-b', cfg.gradient)} />
                                                <InlineLabel
                                                    value={week.title}
                                                    onSave={(v) => renameWeek(phase.id, week.id, v)}
                                                    className="text-sm font-semibold flex-1"
                                                />
                                                <div className="flex items-center gap-1 opacity-0 group-hover/week:opacity-100 transition-opacity">
                                                    <Button
                                                        variant="ghost" size="icon"
                                                        className="h-6 w-6 text-muted-foreground"
                                                        onClick={() => setAddTaskState({ phaseId: phase.id, weekId: week.id })}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost" size="icon"
                                                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                        onClick={() => deleteWeek(phase.id, week.id)}
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Tasks */}
                                            <div className="ml-3 space-y-1">
                                                {week.tasks.length === 0 && (
                                                    <p className="text-xs text-muted-foreground italic py-2 pl-2">
                                                        No tasks yet — click + to add one.
                                                    </p>
                                                )}
                                                {week.tasks.map((task, idx) => (
                                                    <TaskRow
                                                        key={task.id}
                                                        task={task}
                                                        phaseId={phase.id}
                                                        weekId={week.id}
                                                        isFirst={idx === 0}
                                                        isLast={idx === week.tasks.length - 1}
                                                    />
                                                ))}

                                                {/* Inline Add Task button */}
                                                <button
                                                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/20 w-full text-left"
                                                    onClick={() => setAddTaskState({ phaseId: phase.id, weekId: week.id })}
                                                >
                                                    <Plus className="w-3.5 h-3.5" /> Add task
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Week inline */}
                                    {addWeekState === phase.id ? (
                                        <div className="flex gap-2 items-center mt-2">
                                            <Input
                                                autoFocus
                                                placeholder="Week title, e.g. Week 3: Node.js"
                                                value={newWeekTitle}
                                                onChange={(e) => setNewWeekTitle(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && newWeekTitle.trim()) {
                                                        addWeek(phase.id, newWeekTitle.trim());
                                                        setAddWeekState(null);
                                                    }
                                                    if (e.key === 'Escape') setAddWeekState(null);
                                                }}
                                                className="h-8 text-sm"
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    if (newWeekTitle.trim()) {
                                                        addWeek(phase.id, newWeekTitle.trim());
                                                        setAddWeekState(null);
                                                    }
                                                }}
                                                disabled={!newWeekTitle.trim()}
                                            >
                                                Add
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => setAddWeekState(null)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <button
                                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/20 w-full text-left border border-dashed border-border/50 hover:border-primary/30"
                                            onClick={() => {
                                                setAddWeekState(phase.id);
                                                setNewWeekTitle('');
                                            }}
                                        >
                                            <Plus className="w-3.5 h-3.5" /> Add week to this phase
                                        </button>
                                    )}
                                </CardContent>
                            )}
                        </Card>
                    );
                })}

                {/* Empty state */}
                {phases.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No phases yet</p>
                        <p className="text-sm mt-1">Click "Add Phase" to start building your roadmap.</p>
                    </div>
                )}
            </div>

            {/* ── Task Add Dialog ── */}
            {addTaskState && (
                <TaskDialog
                    open
                    mode="add"
                    onClose={() => setAddTaskState(null)}
                    onSave={(title, priority, deadline, resource) =>
                        addTask(addTaskState.phaseId, addTaskState.weekId, title, priority, deadline, resource)
                    }
                />
            )}

            {/* ── Add Phase Dialog ── */}
            <AddPhaseDialog open={addPhaseOpen} onClose={() => setAddPhaseOpen(false)} />

            {/* ── AI Generate Dialog ── */}
            <AIGenerateRoadmapDialog open={aiGenerateOpen} onClose={() => setAiGenerateOpen(false)} />
        </div>
    );
};
