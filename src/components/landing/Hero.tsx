import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, TrendingUp, Zap, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, floatTransition, rotateTransition, viewportSettings } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(185 100% 50% / 0.12), transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{ y: [-10, 10] }}
        transition={floatTransition}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270 100% 65% / 0.1), transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{ y: [10, -10] }}
        transition={{ ...floatTransition, delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(330 100% 60% / 0.08), transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{ y: [-15, 15] }}
        transition={{ ...floatTransition, delay: 2 }}
      />

      {/* Rotating ring decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={rotateTransition}
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-border/30" />
      </motion.div>
      
      <div className="container relative z-10 px-4 py-20">
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={staggerItem}>
            <Badge variant="glow" className="px-5 py-2.5 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Intelligence
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            variants={staggerItem}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.1] tracking-tight"
          >
            Know Your{" "}
            <span className="text-gradient relative">
              Career Gaps
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-primary rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </span>
            <br />
            <span className="text-muted-foreground">Before They Know You</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={staggerItem}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Simulate your job readiness, uncover hidden skill gaps with AI, 
            and get a personalized roadmap to land your{" "}
            <span className="text-foreground font-medium">dream role</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button variant="hero" size="xl" className="group">
              Start Your Assessment
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="xl" className="group">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Watch Demo
              </span>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={staggerItem}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2"
          >
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-primary" />
              5-minute setup
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Free forever plan</span>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={staggerItem}
            className="grid grid-cols-3 gap-6 sm:gap-12 pt-16 max-w-3xl mx-auto"
          >
            <StatCard icon={Target} value="94%" label="Accuracy Rate" delay={0} />
            <StatCard icon={TrendingUp} value="3x" label="Faster Growth" delay={0.1} />
            <StatCard icon={Sparkles} value="10K+" label="Career Plans" delay={0.2} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating cards */}
      <FloatingCard 
        className="top-32 right-[15%]" 
        delay={0}
        icon={<Target className="w-6 h-6 text-primary" />}
      />
      <FloatingCard 
        className="bottom-40 left-[10%]" 
        delay={2}
        icon={<Brain className="w-6 h-6 text-accent" />}
      />
      <FloatingCard 
        className="top-1/2 right-[8%]" 
        delay={4}
        icon={<TrendingUp className="w-5 h-5 text-tertiary" />}
        size="sm"
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

function StatCard({ icon: Icon, value, label, delay }: { icon: any; value: string; label: string; delay: number }) {
  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="glass-premium rounded-2xl p-6 text-center transition-all duration-300 group-hover:shadow-glow">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-primary" />
          <span className="text-3xl sm:text-4xl font-bold font-display text-gradient">{value}</span>
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

function FloatingCard({ 
  className, 
  delay, 
  icon,
  size = "md" 
}: { 
  className: string; 
  delay: number; 
  icon: React.ReactNode;
  size?: "sm" | "md";
}) {
  const sizeClasses = size === "sm" ? "w-14 h-14 rounded-xl" : "w-20 h-20 rounded-2xl";
  
  return (
    <motion.div 
      className={`absolute hidden lg:flex items-center justify-center ${sizeClasses} glass-premium shadow-elevated ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay * 0.3 },
        scale: { duration: 0.5, delay: delay * 0.3 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {icon}
    </motion.div>
  );
}
