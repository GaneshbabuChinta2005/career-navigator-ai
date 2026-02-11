import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

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

          {/* Single focused CTA */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link to="/signup">
              <Button variant="hero" size="xl" className="group">
                Start Your Assessment
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl">
                Log In
              </Button>
            </Link>
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
            <HeroStatCard icon={Target} value="94%" label="Accuracy Rate" delay={0} />
            <HeroStatCard icon={TrendingUp} value="3x" label="Faster Growth" delay={0.1} />
            <HeroStatCard icon={Sparkles} value="10K+" label="Career Plans" delay={0.2} />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

function HeroStatCard({ icon: Icon, value, label, delay }: { icon: any; value: string; label: string; delay: number }) {
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
