import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, Zap, Map, BarChart3, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewportSettings, cardHoverStyle } from "@/lib/animations";

const features = [
  {
    icon: Brain,
    title: "AI Skill Gap Analysis",
    description: "Our AI parses real job descriptions to identify exactly what skills you're missing for your target role.",
    badge: "AI-Powered",
    gradient: "from-primary to-accent",
    span: "col-span-1 lg:col-span-2",
    highlight: true,
  },
  {
    icon: Target,
    title: "Role Simulator",
    description: "Get a precise readiness score using weighted algorithms that mirror real hiring decisions.",
    badge: "Core",
    gradient: "from-accent to-tertiary",
    span: "col-span-1",
  },
  {
    icon: BarChart3,
    title: "Interview Intel",
    description: "Track feedback and uncover patterns in your rejections.",
    badge: "Unique",
    gradient: "from-tertiary to-primary",
    span: "col-span-1",
  },
  {
    icon: Map,
    title: "Personalized Roadmaps",
    description: "Generate 30/60/90 day learning plans tailored to your schedule and career goals.",
    badge: "Actionable",
    gradient: "from-primary to-tertiary",
    span: "col-span-1",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Monitor your skill growth over time with detailed analytics and milestone tracking.",
    badge: "Analytics",
    gradient: "from-accent to-primary",
    span: "col-span-1 lg:col-span-2",
    highlight: true,
  },
];

export function Features() {
  return (
    <section className="relative py-32 overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      
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
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight">
            Everything to{" "}
            <span className="text-gradient">Accelerate</span>
            <br />
            Your Career
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            AI intelligence combined with actionable insights to transform your career trajectory.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportSettings}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className={`group relative ${feature.span}`}
            >
              <div className={`h-full glass-premium rounded-3xl p-8 overflow-hidden transition-all duration-500 
                hover:border-primary/30 ${feature.highlight ? 'min-h-[280px]' : 'min-h-[220px]'}`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 
                  group-hover:opacity-[0.03] transition-opacity duration-500`} 
                />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} bg-opacity-10`}>
                      <feature.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {feature.badge}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold font-display mb-3 group-hover:text-gradient transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Learn more link */}
                  <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 
                    group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span>Learn more</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                {/* Corner decoration */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full 
                  bg-gradient-to-br ${feature.gradient} opacity-[0.03] blur-2xl 
                  group-hover:opacity-[0.08] transition-opacity duration-500`} 
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportSettings}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            <span>More features coming soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
