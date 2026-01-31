import { PageHeader, ProgressRing } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Target } from "lucide-react";
import { useState } from "react";

// Mock roadmap data
const mockWeeks = [
  {
    week: 1,
    title: 'DSA Fundamentals',
    isCurrent: true,
    tasks: [
      { id: '1', title: 'Complete Binary Search problems', hours: 2, done: true },
      { id: '2', title: 'Read System Design primer', hours: 1, done: true },
      { id: '3', title: 'Set up learning environment', hours: 0.5, done: true },
      { id: '4', title: 'Complete Tree traversal problems', hours: 2, done: false },
      { id: '5', title: 'Build REST API mini-project', hours: 3, done: false },
    ],
  },
  {
    week: 2,
    title: 'Advanced Data Structures',
    isCurrent: false,
    tasks: [
      { id: '6', title: 'Learn Graph algorithms', hours: 3, done: false },
      { id: '7', title: 'Practice Dynamic Programming', hours: 4, done: false },
      { id: '8', title: 'Build portfolio project v1', hours: 5, done: false },
    ],
  },
  {
    week: 3,
    title: 'System Design Basics',
    isCurrent: false,
    tasks: [
      { id: '9', title: 'Study caching strategies', hours: 2, done: false },
      { id: '10', title: 'Learn load balancing', hours: 2, done: false },
      { id: '11', title: 'Design a URL shortener', hours: 3, done: false },
    ],
  },
];

const Roadmap = () => {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]);
  const [selectedDuration, setSelectedDuration] = useState<30 | 60 | 90>(30);

  const toggleWeek = (week: number) => {
    setExpandedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week)
        : [...prev, week]
    );
  };

  const completedTasks = mockWeeks.flatMap(w => w.tasks).filter(t => t.done).length;
  const totalTasks = mockWeeks.flatMap(w => w.tasks).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

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
            {[30, 60, 90].map((days) => (
              <Button
                key={days}
                variant={selectedDuration === days ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDuration(days as 30 | 60 | 90)}
              >
                {days} Days
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Progress:</span>
            <ProgressRing value={progress} size="sm" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-8">
          {/* Progress line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          {/* Week cards */}
          <div className="space-y-4">
            {mockWeeks.map((week) => {
              const isExpanded = expandedWeeks.includes(week.week);
              const weekCompleted = week.tasks.filter(t => t.done).length;
              const weekTotal = week.tasks.length;

              return (
                <div key={week.week} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-2 top-6 w-4 h-4 rounded-full border-2 ${
                    week.isCurrent 
                      ? 'bg-primary border-primary' 
                      : weekCompleted === weekTotal 
                        ? 'bg-green-500 border-green-500'
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
                          ✓ {weekCompleted}/{weekTotal} Complete
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
                            <Checkbox checked={task.done} />
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

          {/* Milestone */}
          <div className="relative pl-10 mt-6">
            <div className="absolute left-2 top-3 w-4 h-4">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="text-sm font-medium text-primary">
                🎯 Milestone: Complete DSA fundamentals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
