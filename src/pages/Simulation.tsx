import { PageHeader, ProgressRing } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { ROLES } from "@/lib/constants";
import { useSimulation } from "@/hooks/useSimulation";
import type { RoleId } from "@/types/role";
import { useState } from "react";

const Simulation = () => {
  const { selectedRole, setSelectedRole, result } = useSimulation();
  const [showExplainer, setShowExplainer] = useState(false);

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
              variant={role.id === selectedRole ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRole(role.id)}
            >
              {role.name}
            </Button>
          ))}
        </div>

        {/* Score Display */}
        <div className="rounded-xl border border-border bg-card p-8 mt-8 text-center">
          <h2 className="text-lg text-muted-foreground mb-4">{result.roleName} Readiness</h2>
          <ProgressRing value={result.readinessScore} size="lg" />
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            {result.recommendation}
          </p>
        </div>

        {/* Breakdown Table */}
        <div className="rounded-xl border border-border bg-card mt-8 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Skill Breakdown</h3>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => setShowExplainer(!showExplainer)}
            >
              <Info className="h-4 w-4" />
              How we calculate
            </Button>
          </div>

          {showExplainer && (
            <div className="p-4 border-b border-border bg-muted/30 text-sm text-muted-foreground">
              <p className="mb-2 font-medium text-foreground">Scoring Algorithm</p>
              <p>Each skill has a weight based on its importance for the selected role. Your level (0-5) is multiplied by the weight to get your contribution. The total is your readiness score out of 100.</p>
              <p className="mt-2">Formula: <code className="text-primary">contribution = (your_level / 5) × weight_percentage</code></p>
            </div>
          )}

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
                {result.breakdown.map((item) => (
                  <tr key={item.skillName} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium">{item.skillName}</td>
                    <td className="p-4 text-center text-muted-foreground">{item.weight}%</td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <div className="w-24">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-300"
                              style={{ width: `${(item.userLevel / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center font-mono">{item.contribution}/{item.maxContribution}</td>
                  </tr>
                ))}
                <tr className="bg-muted/50 font-semibold">
                  <td className="p-4">TOTAL</td>
                  <td className="p-4 text-center">100%</td>
                  <td className="p-4"></td>
                  <td className="p-4 text-center font-mono">{result.readinessScore}/100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-3">💪 Strengths</h3>
            {result.strengths.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {result.strengths.map(s => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Rate your skills higher to see strengths</p>
            )}
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-3">🎯 Areas to Improve</h3>
            {result.weaknesses.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {result.weaknesses.map(s => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Great! No major weaknesses detected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
