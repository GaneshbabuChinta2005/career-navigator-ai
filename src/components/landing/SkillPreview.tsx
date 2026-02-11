import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings } from "@/lib/animations";

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
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      
      {/* Glow effects */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-glow opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(270 100% 65% / 0.15), transparent 60%)" }}
      />
      
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.7 }}
          >
            <Badge variant="glow">Live Preview</Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
              See Your{" "}
              <span className="text-gradient">Skills</span>
              <br />
              Visualized
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get instant clarity on where you stand. Our dashboard transforms your self-assessment 
              into <span className="text-foreground">actionable insights</span> with beautiful visualizations.
            </p>
            
            {/* Skill levels legend */}
            <motion.div 
              className="grid grid-cols-2 gap-4 pt-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportSettings}
            >
              {[
                { color: "bg-skill-expert", label: "Expert", range: "80-100%" },
                { color: "bg-skill-advanced", label: "Advanced", range: "60-79%" },
                { color: "bg-skill-intermediate", label: "Intermediate", range: "40-59%" },
                { color: "bg-skill-beginner", label: "Beginner", range: "0-39%" },
              ].map((item) => (
                <motion.div 
                  key={item.label}
                  variants={staggerItem}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/50"
                >
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.range}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Preview cards */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Skills card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="elevated" className="p-8 glass-premium">
                <h3 className="text-lg font-semibold font-display mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary shadow-glow" />
                  Skill Assessment
                </h3>
                <div className="space-y-6">
                  {sampleSkills.map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportSettings}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full ${
                            skill.level >= 80 ? "bg-skill-expert" :
                            skill.level >= 60 ? "bg-skill-advanced" :
                            skill.level >= 40 ? "bg-skill-intermediate" :
                            "bg-skill-beginner"
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={viewportSettings}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Role readiness card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glow" className="p-8 glass-premium border-primary/20">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-semibold font-display">{roleReadiness.role}</h3>
                    <p className="text-sm text-muted-foreground">Role Readiness Score</p>
                  </div>
                  <motion.div 
                    className="text-5xl font-bold font-display text-gradient"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={viewportSettings}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {roleReadiness.score}%
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
                      Strengths
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {roleReadiness.strengths.map((s) => (
                        <Badge key={s} variant="success" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
                      Focus Areas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {roleReadiness.gaps.map((g) => (
                        <Badge key={g} variant="warning" className="text-xs">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
