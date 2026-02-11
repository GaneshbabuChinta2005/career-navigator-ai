import { PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ChevronDown } from "lucide-react";
import { analyzeSkillGaps } from "@/services/skillgap";
import { useMemo, useState } from "react";

const priorityColors = {
  critical: 'text-destructive bg-destructive/10',
  important: 'text-yellow-500 bg-yellow-500/10',
  'nice-to-have': 'text-muted-foreground bg-muted',
};

const priorityLabels = {
  critical: '🔴 Critical Gap',
  important: '🟡 Important Gap',
  'nice-to-have': '🟢 Nice to Have',
};

const SkillGap = () => {
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const userData = useMemo(() => {
    try {
      const saved = localStorage.getItem('onboarding_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { skills: parsed.skills || {}, targetRole: parsed.targetRole };
      }
    } catch {}
    return {
      skills: { dsa: 3, frontend: 4, backend: 2, database: 3, 'system-design': 1, devops: 2 },
      targetRole: 'fullstack',
    };
  }, []);

  const gaps = useMemo(
    () => analyzeSkillGaps(userData.skills, userData.targetRole),
    [userData]
  );

  const visibleGaps = showAll ? gaps : gaps.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <PageHeader
          title="Skill Gap Analysis"
          description="Prioritized list of skills to focus on"
        />

        <p className="text-muted-foreground mt-4">
          Based on market demand analysis for your target role.
          Priority is determined by job market prevalence and your current skill level.
        </p>

        {/* Gap Cards */}
        <div className="space-y-4 mt-8">
          {visibleGaps.map((gap) => {
            const isExpanded = expandedId === gap.id;
            return (
              <div
                key={gap.id}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[gap.priority]}`}>
                        {priorityLabels[gap.priority]}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Est: {gap.estimatedWeeks} weeks
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold font-display">{gap.skill}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Required by {gap.demandPercent}% of job postings. You rated: {gap.userLevel}/5
                    </p>

                    {isExpanded && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-2">Suggested Actions:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {gap.suggestions.map((s, i) => (
                            <li key={i}>• {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link to="/roadmap">
                      <Button size="sm" variant="outline">Add to Roadmap</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setExpandedId(isExpanded ? null : gap.id)}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {gaps.length > 3 && !showAll && (
          <Button variant="ghost" className="w-full mt-4" onClick={() => setShowAll(true)}>
            Show {gaps.length - 3} more gaps...
          </Button>
        )}

        {gaps.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-8 mt-8 text-center">
            <p className="text-muted-foreground">No skill gaps detected. Complete onboarding to see your analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillGap;
