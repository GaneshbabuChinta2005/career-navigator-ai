import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ClipboardList, Brain, Target, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Build Your Profile",
    description: "Rate your skills, add your projects, and tell us about your target role. Our smart onboarding takes just 5 minutes.",
    color: "from-primary to-primary/50",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes Gaps",
    description: "Our AI scans real job postings and compares them against your profile to find exact skill gaps.",
    color: "from-accent to-accent/50",
  },
  {
    number: "03",
    icon: Target,
    title: "Simulate Readiness",
    description: "Get a precise readiness score for each role using our weighted algorithm based on industry standards.",
    color: "from-status-success to-status-success/50",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Follow Your Roadmap",
    description: "Receive a personalized 30/60/90 day learning plan with weekly goals aligned to your availability.",
    color: "from-status-warning to-status-warning/50",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-40 blur-3xl" />
      
      <div className="container relative z-10 px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="glow" className="mb-6">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            From Profile to{" "}
            <span className="text-gradient">Career Clarity</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Four simple steps to understand your career position and chart a path forward.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                <Card variant="glass" className="p-6 h-full hover:border-primary/30 transition-all duration-500">
                  {/* Step number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} text-primary-foreground font-bold font-display text-lg mb-6`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex items-center mb-4">
                    <step.icon className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold font-display group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
                
                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 w-8 h-8 hidden lg:flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-glow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
