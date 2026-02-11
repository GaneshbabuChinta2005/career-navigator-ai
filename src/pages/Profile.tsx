import { PageHeader, SkillBar } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { DEFAULT_SKILLS, ROLES } from "@/lib/constants";
import type { SkillLevel } from "@/types/skill";
import { useMemo } from "react";

const Profile = () => {
  const navigate = useNavigate();

  const userData = useMemo(() => {
    try {
      const saved = localStorage.getItem('onboarding_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          skills: parsed.skills || {},
          targetRole: parsed.targetRole || 'fullstack',
        };
      }
    } catch {}
    return {
      skills: { dsa: 3, frontend: 4, backend: 2, database: 3, 'system-design': 1, devops: 2 },
      targetRole: 'fullstack',
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <PageHeader
          title="Profile & Settings"
          description="Manage your skills, goals, and account"
        />

        {/* Target Role */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold font-display mb-4">Target Role</h2>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <Button
                key={role.id}
                variant={role.id === userData.targetRole ? 'default' : 'outline'}
                size="sm"
              >
                {role.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-display">Your Skills</h2>
            <Link to="/onboarding">
              <Button variant="outline" size="sm">
                Edit Skills
              </Button>
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            {DEFAULT_SKILLS.map((skill) => (
              <SkillBar
                key={skill.id}
                name={skill.name}
                level={(userData.skills[skill.id] || 0) as SkillLevel}
                showLabel={false}
                size="sm"
              />
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold font-display mb-4">Actions</h2>
          <div className="space-y-3">
            <Link to="/simulation" className="block">
              <Button variant="outline" className="w-full justify-start">
                Run New Simulation
              </Button>
            </Link>
            <Link to="/roadmap" className="block">
              <Button variant="outline" className="w-full justify-start">
                View Learning Roadmap
              </Button>
            </Link>
            <Link to="/onboarding" className="block">
              <Button variant="outline" className="w-full justify-start">
                Redo Onboarding
              </Button>
            </Link>
          </div>
        </section>

        {/* Account */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold font-display mb-4">Account</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
