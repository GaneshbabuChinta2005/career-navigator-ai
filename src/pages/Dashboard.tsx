import { PageHeader, StatCard, ProgressRing, SkillBar } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, TrendingUp, BookOpen, User, LogOut, ArrowRight } from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";
import { analyzeSkillGaps } from "@/services/skillgap";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_SKILLS } from "@/lib/constants";
import type { SkillLevel } from "@/types/skill";

const Dashboard = () => {
  const navigate = useNavigate();
  const { result, userData } = useSimulation();

  const gaps = useMemo(
    () => analyzeSkillGaps(userData.skills),
    [userData.skills]
  );

  const criticalGaps = gaps.filter(g => g.priority === 'critical');
  const importantGaps = gaps.filter(g => g.priority === 'important');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-xl">CareerSim</Link>
          <nav className="flex items-center gap-4">
            <Link to="/simulation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Simulation</Link>
            <Link to="/skill-gap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Skill Gap</Link>
            <Link to="/roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <PageHeader
          title="Dashboard"
          description="Your career simulation overview"
        />

        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Readiness Score Card */}
          <div className="md:col-span-2 lg:col-span-1 rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Role Readiness</h2>
            <div className="flex items-center gap-6">
              <ProgressRing value={result.readinessScore} size="lg" label="Ready" />
              <div>
                <p className="font-display font-bold text-lg">{result.roleName}</p>
                <p className="text-sm text-muted-foreground mt-1">{result.recommendation}</p>
                <Link to="/simulation">
                  <Button variant="outline" size="sm" className="mt-4">
                    Run New Simulation
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <StatCard
            label="Skills Tracked"
            value={Object.keys(userData.skills).length}
            icon={Target}
          />
          <StatCard
            label="Skill Gaps Found"
            value={gaps.length}
            icon={BookOpen}
            trend={criticalGaps.length > 0 ? { value: criticalGaps.length, isPositive: false } : undefined}
          />
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Your Strengths</h3>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            {result.strengths.length > 0 ? (
              <ul className="space-y-3">
                {result.strengths.map(s => (
                  <li key={s} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Complete onboarding to see strengths</p>
            )}
            <Link to="/simulation" className="inline-flex items-center gap-1 text-sm text-primary mt-4 hover:underline">
              View All Skills <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Focus Areas</h3>
              <Target className="h-4 w-4 text-destructive" />
            </div>
            {(criticalGaps.length > 0 || importantGaps.length > 0) ? (
              <ul className="space-y-3">
                {[...criticalGaps, ...importantGaps].slice(0, 4).map(g => (
                  <li key={g.id} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${g.priority === 'critical' ? 'bg-destructive' : 'bg-yellow-500'}`} />
                      {g.skill}
                    </span>
                    <span className="text-xs text-muted-foreground">{g.priority}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No critical gaps found!</p>
            )}
            <Link to="/skill-gap" className="inline-flex items-center gap-1 text-sm text-primary mt-4 hover:underline">
              Start Improving <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Quick Skills Overview */}
        <div className="rounded-xl border border-border bg-card p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Skills Overview</h3>
            <Link to="/profile">
              <Button variant="outline" size="sm">Edit Skills</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {DEFAULT_SKILLS.map(skill => (
              <SkillBar
                key={skill.id}
                name={skill.name}
                level={(userData.skills[skill.id] || 0) as SkillLevel}
                showLabel={false}
                size="sm"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
