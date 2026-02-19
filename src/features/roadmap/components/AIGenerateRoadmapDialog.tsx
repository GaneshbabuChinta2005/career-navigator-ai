import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { aiService } from '@/services/ai/gemini.service';
import { useRoadmapStore } from '@/features/roadmap/store/useRoadmapStore';
import type { Phase, Week, Task, Priority } from '@/features/roadmap/store/useRoadmapStore';

const TIMELINE_OPTIONS = [
    { value: '30', label: '30 Days (1 month)' },
    { value: '60', label: '60 Days (2 months)' },
    { value: '90', label: '90 Days (3 months)' },
    { value: '120', label: '120 Days (4 months)' },
];

const uid = () => Math.random().toString(36).slice(2, 9);

type Status = 'idle' | 'generating' | 'success' | 'error';

interface AIGenerateRoadmapDialogProps {
    open: boolean;
    onClose: () => void;
}

export const AIGenerateRoadmapDialog = ({ open, onClose }: AIGenerateRoadmapDialogProps) => {
    const { goalRole, setGoalRole } = useRoadmapStore();

    const [targetRole, setTargetRole] = useState(goalRole);
    const [currentSkills, setCurrentSkills] = useState('');
    const [focusAreas, setFocusAreas] = useState('');
    const [timeline, setTimeline] = useState('90');
    const [status, setStatus] = useState<Status>('idle');
    const [preview, setPreview] = useState<Phase[] | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const isConfigured = aiService.isConfigured();

    const parsePhases = (raw: any): Phase[] => {
        const phases: Phase[] = (raw.phases ?? []).map((p: any) => ({
            id: uid(),
            title: String(p.title ?? 'Phase'),
            color: ['cyan', 'violet', 'pink', 'emerald', 'orange'].includes(p.color)
                ? p.color
                : 'cyan',
            weeks: (p.weeks ?? []).map((w: any): Week => ({
                id: uid(),
                title: String(w.title ?? 'Week'),
                tasks: (w.tasks ?? []).map((t: any): Task => ({
                    id: uid(),
                    title: String(t.title ?? 'Task'),
                    completed: false,
                    priority: (['high', 'medium', 'low'].includes(t.priority) ? t.priority : 'medium') as Priority,
                    resource: t.resource ?? '',
                    deadline: t.deadline ?? '',
                })),
            })),
        }));
        return phases;
    };

    const handleGenerate = async () => {
        if (!targetRole.trim()) return;
        setStatus('generating');
        setPreview(null);
        setErrorMsg('');

        try {
            const raw = await aiService.generateRoadmapStructured(
                targetRole.trim(),
                currentSkills.trim(),
                Number(timeline),
                focusAreas.trim()
            );
            const phases = parsePhases(raw);
            if (phases.length === 0) throw new Error('No phases generated');
            setPreview(phases);
            setStatus('success');
        } catch (err: any) {
            setErrorMsg(err?.message ?? 'Generation failed. Try again.');
            setStatus('error');
        }
    };

    const handleApply = () => {
        if (!preview) return;
        // Apply to store
        const store = useRoadmapStore.getState();
        setGoalRole(targetRole.trim());
        // Replace phases
        (store as any).phases.splice(0);
        preview.forEach((p) => store.addPhase(p.title, p.color));
        // Rebuild weeks & tasks for each phase via store helpers
        // Easiest: set state directly via persist store
        useRoadmapStore.setState({ goalRole: targetRole.trim(), phases: preview });
        onClose();
    };

    const handleClose = () => {
        setStatus('idle');
        setPreview(null);
        setErrorMsg('');
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Generate Roadmap with AI
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-5 py-2 pr-1">
                    {/* Config warning */}
                    {!isConfigured && (
                        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>
                                <strong>Demo mode</strong> — No Gemini API key configured. A mock roadmap will be generated.
                                Set <code className="text-xs bg-muted px-1 rounded">VITE_GEMINI_API_KEY</code> in <code className="text-xs bg-muted px-1 rounded">.env</code> for real AI generation.
                            </span>
                        </div>
                    )}

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Target Role *</label>
                            <Input
                                placeholder="e.g. Senior Frontend Engineer"
                                value={targetRole}
                                onChange={(e) => setTargetRole(e.target.value)}
                                disabled={status === 'generating'}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Timeline</label>
                            <Select value={timeline} onValueChange={setTimeline} disabled={status === 'generating'}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {TIMELINE_OPTIONS.map((o) => (
                                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Current Skills</label>
                        <Textarea
                            placeholder="e.g. React, JavaScript basics, HTML/CSS, some Node.js..."
                            value={currentSkills}
                            onChange={(e) => setCurrentSkills(e.target.value)}
                            className="resize-none min-h-[80px]"
                            disabled={status === 'generating'}
                        />
                        <p className="text-xs text-muted-foreground">Tell the AI what you already know — it'll skip basics and personalise your plan.</p>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Focus Areas (optional)</label>
                        <Input
                            placeholder="e.g. System Design, Testing, TypeScript, AWS..."
                            value={focusAreas}
                            onChange={(e) => setFocusAreas(e.target.value)}
                            disabled={status === 'generating'}
                        />
                    </div>

                    {/* Generating state */}
                    {status === 'generating' && (
                        <div className="flex flex-col items-center gap-3 py-8 text-muted-foreground">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Sparkles className="w-7 h-7 text-primary animate-pulse" />
                                </div>
                                <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                            </div>
                            <p className="font-medium text-foreground">AI is designing your roadmap...</p>
                            <p className="text-sm text-center max-w-xs">
                                Crafting a personalised {timeline}-day plan for <strong>{targetRole}</strong>
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {status === 'error' && (
                        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {/* Preview */}
                    {status === 'success' && preview && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                AI generated {preview.length} phase{preview.length !== 1 ? 's' : ''} — review before applying:
                            </div>
                            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                                {preview.map((phase) => {
                                    const totalTasks = phase.weeks.flatMap((w) => w.tasks).length;
                                    return (
                                        <div
                                            key={phase.id}
                                            className="rounded-xl border border-border/60 bg-card p-4 space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-semibold text-sm">{phase.title}</h4>
                                                <Badge variant="secondary" className="text-xs">
                                                    {totalTasks} tasks · {phase.weeks.length} weeks
                                                </Badge>
                                            </div>
                                            <div className="space-y-1.5">
                                                {phase.weeks.map((week) => (
                                                    <div key={week.id} className="pl-3 border-l border-border/60">
                                                        <p className="text-xs font-medium text-muted-foreground">{week.title}</p>
                                                        <ul className="mt-0.5 space-y-0.5">
                                                            {week.tasks.map((task) => (
                                                                <li key={task.id} className="text-xs text-foreground/80 flex items-start gap-1.5">
                                                                    <span className="mt-1 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                                                                    {task.title}
                                                                    <Badge
                                                                        className={`ml-auto shrink-0 text-[9px] px-1 py-0 ${task.priority === 'high'
                                                                                ? 'bg-red-500/15 text-red-400 border-red-400/30'
                                                                                : task.priority === 'medium'
                                                                                    ? 'bg-amber-500/15 text-amber-400 border-amber-400/30'
                                                                                    : 'bg-emerald-500/15 text-emerald-400 border-emerald-400/30'
                                                                            } border`}
                                                                    >
                                                                        {task.priority}
                                                                    </Badge>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={handleClose}>Cancel</Button>
                    {status === 'success' ? (
                        <>
                            <Button variant="outline" onClick={handleGenerate}>
                                <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
                            </Button>
                            <Button
                                onClick={handleApply}
                                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                            >
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Apply Roadmap
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={handleGenerate}
                            disabled={!targetRole.trim() || status === 'generating'}
                            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                        >
                            {status === 'generating' ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                            ) : (
                                <><Sparkles className="w-4 h-4 mr-2" /> Generate with AI</>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
