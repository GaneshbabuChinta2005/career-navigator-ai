import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, Zap, Map, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Skill Gap Analysis",
    description: "Our AI parses real job descriptions to identify exactly what skills you're missing for your target role.",
    badge: "AI-Powered",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "Role Readiness Simulator",
    description: "Get a precise readiness score using weighted algorithms that mirror real hiring decisions.",
    badge: "Core Feature",
    color: "text-accent",
  },
  {
    icon: BarChart3,
    title: "Interview Intelligence",
    description: "Track your interview feedback and uncover patterns in your rejections to fix recurring issues.",
    badge: "Unique",
    color: "text-status-warning",
  },
  {
    icon: Map,
    title: "Personalized Roadmaps",
    description: "Generate 30/60/90 day learning plans tailored to your schedule and career goals.",
    badge: "Actionable",
    color: "text-status-success",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your skill growth over time with detailed analytics and milestone tracking.",
    badge: "Analytics",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Stay current with job market trends and adjust your learning path as demands evolve.",
    badge: "Live Data",
    color: "text-accent",
  },
];

export function Features() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container relative z-10 px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="glow" className="mb-6">
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Accelerate Your Career</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            A comprehensive platform that combines AI intelligence with actionable insights to transform your career trajectory.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="feature"
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-secondary ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
