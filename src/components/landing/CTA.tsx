import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container relative z-10 px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 glass-premium" />
            <div className="absolute inset-0 rounded-[2rem] p-px bg-gradient-to-br from-primary/50 via-transparent to-accent/50">
              <div className="absolute inset-px rounded-[calc(2rem-1px)] bg-card/90" />
            </div>

            <motion.div
              className="relative p-12 md:p-16 lg:p-20 text-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportSettings}
            >
              <motion.div
                variants={staggerItem}
                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary mb-10 shadow-glow"
              >
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              <motion.h2
                variants={staggerItem}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight"
              >
                Ready to{" "}
                <span className="text-gradient">Transform</span>
                <br />
                Your Career?
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Identify your gaps, get a personalized roadmap, and accelerate your career growth.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
              >
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="group text-lg">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>

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
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
