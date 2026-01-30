import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-glow opacity-50 blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Glass card */}
            <div className="absolute inset-0 bg-gradient-card opacity-80" />
            <div className="absolute inset-0 border border-border/50 rounded-3xl" />
            
            <div className="relative p-12 md:p-16 text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-8 shadow-glow">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Ready to{" "}
                <span className="text-gradient">Transform Your Career?</span>
              </h2>

              {/* Description */}
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Join thousands of professionals who've used our AI-powered insights to identify their gaps and accelerate their career growth.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="glass" size="xl">
                  Schedule a Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <p className="text-sm text-muted-foreground mt-8">
                No credit card required • 5-minute setup • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
