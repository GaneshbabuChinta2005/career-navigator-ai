import { PageHeader, EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, Clock, ChevronDown } from "lucide-react";

// Mock skill gaps
const mockGaps = [
  {
    id: '1',
    skill: 'System Design',
    priority: 'critical' as const,
    demandPercent: 89,
    userLevel: 1,
    estimatedWeeks: 4,
    suggestions: [
      'Complete "Grokking System Design" course',
      'Practice 2 design problems weekly',
    ],
  },
  {
    id: '2',
    skill: 'Advanced DSA',
    priority: 'important' as const,
    demandPercent: 76,
    userLevel: 3,
    estimatedWeeks: 2,
    suggestions: [
      'Focus on Graph and DP problems',
      'Complete 50 LeetCode medium problems',
    ],
  },
  {
    id: '3',
    skill: 'Backend APIs',
    priority: 'important' as const,
    demandPercent: 82,
    userLevel: 2,
    estimatedWeeks: 3,
    suggestions: [
      'Build a REST API project',
      'Learn authentication patterns',
    ],
  },
];

const priorityColors = {
  critical: 'text-red-500 bg-red-500/10',
  important: 'text-amber-500 bg-amber-500/10',
  'nice-to-have': 'text-muted-foreground bg-muted',
};

const SkillGap = () => {
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
          action={
            <Button variant="outline" size="sm">
              Refresh Analysis
            </Button>
          }
        />

        <p className="text-muted-foreground mt-4">
          Based on <span className="text-foreground font-medium">127 job postings</span> for "Full Stack Developer"
        </p>

        {/* Gap Cards */}
        <div className="space-y-4 mt-8">
          {mockGaps.map((gap, index) => (
            <div 
              key={gap.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[gap.priority]}`}>
                      {gap.priority === 'critical' ? '🔴 Critical Gap' : '🟡 Important Gap'}
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

                  {index === 0 && (
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
                  <Button size="sm" variant="outline">Add to Roadmap</Button>
                  {index !== 0 && (
                    <Button size="sm" variant="ghost">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" className="w-full mt-4">
          Show 5 more gaps...
        </Button>
      </div>
    </div>
  );
};

export default SkillGap;
