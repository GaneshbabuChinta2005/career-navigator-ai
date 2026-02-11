import { Badge } from "@/components/ui/badge";
import { ClipboardList, Brain, Target, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Build Your Profile",
    description: "Rate your skills, add projects, and define your target role. Smart onboarding takes just 5 minutes.",
    features: ["Skill assessment", "Project portfolio", "Goal setting"],
    color: "primary",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes Gaps",
    description: "Our AI scans real job postings and compares them against your profile to find exact skill gaps.",
    features: ["JD parsing", "Gap detection", "Priority ranking"],
    color: "accent",
  },
  {
    number: "03",
    icon: Target,
    title: "Simulate Readiness",
    description: "Get a precise readiness score for each role using our weighted algorithm based on industry standards.",
    features: ["Role matching", "Score breakdown", "Strength mapping"],
    color: "tertiary",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Follow Your Roadmap",
    description: "Receive a personalized 30/60/90 day learning plan with weekly goals aligned to your availability.",
    features: ["Daily tasks", "Progress tracking", "Milestone rewards"],
    color: "primary",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden" id="how-it-works">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-background to-muted/5" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-glow opacity-30 blur-3xl pointer-events-none" />
      
      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="glow" className="mb-6">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight">
            From Profile to{" "}
            <span className="text-gradient">Career Clarity</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Four simple steps to understand your career position and chart a path forward.
          </p>
        </motion.div>

        {/* Steps - Vertical timeline on mobile, horizontal on desktop */}
        <motion.div 
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportSettings}
        >
          {/* Connection line - desktop */}
          <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
          
          {/* Connection line - mobile/tablet */}
          <div className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-border via-border to-transparent lg:hidden" />
          
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className="relative"
              >
                {/* Step card */}
                <div className="group relative lg:pt-12">
                  {/* Number badge - positioned on timeline */}
                  <motion.div 
                    className={`absolute left-0 lg:left-1/2 lg:-translate-x-1/2 -translate-y-0 lg:-translate-y-12
                      w-16 h-16 rounded-2xl bg-${step.color} flex items-center justify-center
                      shadow-lg z-10 font-display font-bold text-xl text-${step.color}-foreground`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                      background: step.color === 'primary' ? 'hsl(185 100% 50%)' : 
                                 step.color === 'accent' ? 'hsl(270 100% 65%)' : 
                                 'hsl(330 100% 60%)'
                    }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Card content */}
                  <div className="glass-premium rounded-3xl p-6 lg:p-8 ml-20 lg:ml-0 h-full 
                    transition-all duration-500 hover:shadow-glow group-hover:border-primary/20"
                  >
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <step.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold font-display group-hover:text-gradient transition-all duration-300">
                        {step.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-2">
                      {step.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow connector - desktop only */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-[88px] -right-3 hidden lg:block z-20">
                      <ArrowRight className="w-6 h-6 text-border" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            Ready to start?{" "}
            <a href="#" className="text-primary font-medium hover:underline underline-offset-4">
              Create your free profile →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
