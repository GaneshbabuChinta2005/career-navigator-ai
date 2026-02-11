import { PageHeader, ProgressRing } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Target } from "lucide-react";
import { useRoadmap } from "@/hooks/useRoadmap";

const Roadmap = () => {
  const {
    roadmap,
    selectedDuration,
    setSelectedDuration,
    expandedWeeks,
    toggleWeek,
    toggleTask,
    progress,
    completedTasks,
    totalTasks,
  } = useRoadmap();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <PageHeader
          title="Your Learning Roadmap"
          description="Personalized plan to reach your career goals"
        />

        {/* Duration selector and progress */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <div className="flex gap-2">
            {([30, 60, 90] as const).map((days) => (
              <Button
                key={days}
                variant={selectedDuration === days ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDuration(days)}
              >
                {days} Days
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {completedTasks}/{totalTasks} tasks
            </span>
            <ProgressRing value={progress} size="sm" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-8">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-4">
            {roadmap.weeks.map((week) => {
              const isExpanded = expandedWeeks.includes(week.week);
              const weekCompleted = week.tasks.filter(t => t.done).length;
              const weekTotal = week.tasks.length;

              return (
                <div key={week.week} className="relative pl-10">
                  <div className={`absolute left-2 top-6 w-4 h-4 rounded-full border-2 ${
                    week.isCurrent
                      ? 'bg-primary border-primary'
                      : weekCompleted === weekTotal && weekTotal > 0
                        ? 'bg-primary/50 border-primary/50'
                        : 'bg-background border-border'
                  }`} />

                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <button
                      onClick={() => toggleWeek(week.week)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">
                          Week {week.week} {week.isCurrent && '(Current)'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {week.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          ✓ {weekCompleted}/{weekTotal}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-border p-4 space-y-3">
                        {week.tasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-3">
                            <Checkbox
                              checked={task.done}
                              onCheckedChange={() => toggleTask(task.id)}
                            />
                            <div className="flex-1">
                              <p className={task.done ? 'line-through text-muted-foreground' : ''}>
                                {task.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {task.hours} hrs
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Milestones */}
          {roadmap.milestones.map((milestone) => (
            <div key={milestone.week} className="relative pl-10 mt-6">
              <div className="absolute left-2 top-3 w-4 h-4">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <p className="text-sm font-medium text-primary">
                  🎯 Week {milestone.week}: {milestone.title}
                </p>
              </div>
            </div>
          ))}

          {roadmap.weeks.length === 0 && (
            <div className="pl-10 mt-4">
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">Complete onboarding to generate your personalized roadmap.</p>
                <Link to="/onboarding">
                  <Button variant="outline" size="sm" className="mt-4">Start Onboarding</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
