import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Animated glow orbs */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
        style={{
          background: "radial-gradient(ellipse, hsl(185 100% 50% / 0.1), transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container relative z-10 px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.7 }}
        >
          {/* CTA Card */}
          <div className="relative rounded-[2rem] overflow-hidden">
            {/* Glass background */}
            <div className="absolute inset-0 glass-premium" />
            
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-[2rem] p-px bg-gradient-to-br from-primary/50 via-transparent to-accent/50">
              <div className="absolute inset-px rounded-[calc(2rem-1px)] bg-card/90" />
            </div>
            
            {/* Content */}
            <motion.div 
              className="relative p-12 md:p-16 lg:p-20 text-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportSettings}
            >
              {/* Icon */}
              <motion.div 
                variants={staggerItem}
                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary mb-10 shadow-glow"
              >
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              {/* Heading */}
              <motion.h2 
                variants={staggerItem}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight"
              >
                Ready to{" "}
                <span className="text-gradient">Transform</span>
                <br />
                Your Career?
              </motion.h2>

              {/* Description */}
              <motion.p 
                variants={staggerItem}
                className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Join thousands of professionals who've used our AI-powered insights 
                to identify their gaps and accelerate their career growth.
              </motion.p>

              {/* CTA buttons */}
              <motion.div 
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
              >
                <Button variant="hero" size="xl" className="group text-lg">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="glass" size="xl" className="text-lg">
                  Schedule a Demo
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                variants={staggerItem}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  5-minute setup
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  10K+ active users
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
