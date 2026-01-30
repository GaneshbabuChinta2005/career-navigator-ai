import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow opacity-60 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.15),transparent_70%)] opacity-60 blur-3xl" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="animate-fade-in">
            <Badge variant="glow" className="px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Intelligence
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight animate-slide-up">
            Know Your{" "}
            <span className="text-gradient">Career Gaps</span>
            <br />
            Before They Know You
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Simulate your job readiness, uncover hidden skill gaps, and get a personalized roadmap to land your dream role.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl">
              Start Your Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              See How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <StatItem icon={Target} value="94%" label="Accuracy Rate" />
            <StatItem icon={TrendingUp} value="3x" label="Faster Growth" />
            <StatItem icon={Sparkles} value="10K+" label="Career Plans" />
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-20 h-20 rounded-2xl bg-gradient-card border border-border/50 shadow-card animate-float hidden lg:flex items-center justify-center">
        <Target className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-32 left-16 w-16 h-16 rounded-xl bg-gradient-card border border-border/50 shadow-card animate-float hidden lg:flex items-center justify-center" style={{ animationDelay: "2s" }}>
        <Sparkles className="w-6 h-6 text-accent" />
      </div>
    </section>
  );
}

function StatItem({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-primary mr-2" />
        <span className="text-3xl font-bold font-display text-gradient">{value}</span>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
