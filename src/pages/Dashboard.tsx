import { PageHeader, StatCard, ProgressRing, EmptyState } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, TrendingUp, BookOpen, User } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple header */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-xl">CareerSim</Link>
          <nav className="flex items-center gap-4">
            <Link to="/simulation" className="text-sm text-muted-foreground hover:text-foreground">Simulation</Link>
            <Link to="/skill-gap" className="text-sm text-muted-foreground hover:text-foreground">Skill Gap</Link>
            <Link to="/roadmap" className="text-sm text-muted-foreground hover:text-foreground">Roadmap</Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
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
              <ProgressRing value={72} size="lg" label="Ready" />
              <div>
                <p className="font-display font-bold text-lg">Full Stack Developer</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  +5% from last week
                </p>
                <Link to="/simulation">
                  <Button variant="outline" size="sm" className="mt-4">
                    Run New Simulation
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <StatCard 
            label="Skills Tracked" 
            value={6} 
            icon={Target}
          />
          <StatCard 
            label="Tasks Completed" 
            value={12}
            icon={BookOpen}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Coming Soon Sections */}
        <div className="grid gap-6 mt-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Your Strengths</h3>
            <EmptyState
              title="Strengths Panel"
              description="Complete onboarding to see your strengths"
              className="py-6"
            />
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold mb-4">Focus Areas</h3>
            <EmptyState
              title="Focus Areas Panel"
              description="Complete onboarding to see areas to improve"
              className="py-6"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
