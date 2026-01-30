import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const sampleSkills = [
  { name: "React / Frontend", level: 85, category: "expert" },
  { name: "Node.js / Backend", level: 70, category: "advanced" },
  { name: "Data Structures", level: 55, category: "intermediate" },
  { name: "System Design", level: 40, category: "intermediate" },
  { name: "Cloud / DevOps", level: 30, category: "beginner" },
];

const roleReadiness = {
  role: "Full Stack Developer",
  score: 72,
  strengths: ["Frontend Development", "API Design", "React Ecosystem"],
  gaps: ["System Design", "Cloud Infrastructure", "Advanced DSA"],
};

export function SkillPreview() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            <Badge variant="glow">Live Preview</Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              See Your{" "}
              <span className="text-gradient">Skills Visualized</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Get instant clarity on where you stand. Our dashboard transforms your self-assessment into actionable insights with beautiful visualizations.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-skill-expert" />
                <span className="text-sm">Expert (80-100%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-skill-advanced" />
                <span className="text-sm">Advanced (60-79%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-skill-intermediate" />
                <span className="text-sm">Intermediate (40-59%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-skill-beginner" />
                <span className="text-sm">Beginner (0-39%)</span>
              </div>
            </div>
          </div>

          {/* Right side - Preview cards */}
          <div className="space-y-6">
            {/* Skills card */}
            <Card variant="elevated" className="p-6">
              <h3 className="text-lg font-semibold font-display mb-6 flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary mr-3" />
                Skill Assessment
              </h3>
              <div className="space-y-5">
                {sampleSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          skill.level >= 80 ? "bg-skill-expert" :
                          skill.level >= 60 ? "bg-skill-advanced" :
                          skill.level >= 40 ? "bg-skill-intermediate" :
                          "bg-skill-beginner"
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Role readiness card */}
            <Card variant="glow" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold font-display">{roleReadiness.role}</h3>
                  <p className="text-sm text-muted-foreground">Role Readiness Score</p>
                </div>
                <div className="text-4xl font-bold font-display text-gradient">
                  {roleReadiness.score}%
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Strengths</p>
                  <div className="space-y-1">
                    {roleReadiness.strengths.map((s) => (
                      <Badge key={s} variant="success" className="mr-1 mb-1 text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Focus Areas</p>
                  <div className="space-y-1">
                    {roleReadiness.gaps.map((g) => (
                      <Badge key={g} variant="warning" className="mr-1 mb-1 text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
