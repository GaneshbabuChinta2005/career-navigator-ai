import { PageHeader, ProgressRing, SkillBar, EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { ROLES } from "@/lib/constants";
import type { SkillLevel } from "@/types/skill";

// Mock data for demonstration
const mockBreakdown = [
  { skill: "DSA", weight: 20, level: 3 as SkillLevel, contribution: 12, max: 20 },
  { skill: "Frontend", weight: 20, level: 4 as SkillLevel, contribution: 16, max: 20 },
  { skill: "Backend", weight: 20, level: 2 as SkillLevel, contribution: 8, max: 20 },
  { skill: "Database", weight: 10, level: 3 as SkillLevel, contribution: 6, max: 10 },
  { skill: "System Design", weight: 15, level: 1 as SkillLevel, contribution: 3, max: 15 },
  { skill: "Projects", weight: 15, level: 4 as SkillLevel, contribution: 12, max: 15 },
];

const totalScore = mockBreakdown.reduce((sum, item) => sum + item.contribution, 0);

const Simulation = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <PageHeader 
          title="Role Simulation" 
          description="See how ready you are for different roles"
        />

        {/* Role Selector */}
        <div className="flex flex-wrap gap-2 mt-6">
          {ROLES.map((role) => (
            <Button
              key={role.id}
              variant={role.id === 'fullstack' ? 'default' : 'outline'}
              size="sm"
            >
              {role.name}
            </Button>
          ))}
        </div>

        {/* Score Display */}
        <div className="rounded-xl border border-border bg-card p-8 mt-8 text-center">
          <h2 className="text-lg text-muted-foreground mb-4">Full Stack Developer Readiness</h2>
          <ProgressRing value={totalScore} size="lg" />
          <p className="text-muted-foreground mt-4">
            You're on track! Focus on System Design and Backend to reach 85%.
          </p>
        </div>

        {/* Breakdown Table */}
        <div className="rounded-xl border border-border bg-card mt-8 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Skill Breakdown</h3>
            <Button variant="ghost" size="sm" className="gap-1">
              <Info className="h-4 w-4" />
              How we calculate
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium">Skill</th>
                  <th className="text-center p-4 text-sm font-medium">Weight</th>
                  <th className="text-center p-4 text-sm font-medium">Your Level</th>
                  <th className="text-center p-4 text-sm font-medium">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {mockBreakdown.map((item) => (
                  <tr key={item.skill} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium">{item.skill}</td>
                    <td className="p-4 text-center text-muted-foreground">{item.weight}%</td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <div className="w-24">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(item.level / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center font-mono">{item.contribution}/{item.max}</td>
                  </tr>
                ))}
                <tr className="bg-muted/50 font-semibold">
                  <td className="p-4">TOTAL</td>
                  <td className="p-4 text-center">100%</td>
                  <td className="p-4"></td>
                  <td className="p-4 text-center font-mono">{totalScore}/100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
