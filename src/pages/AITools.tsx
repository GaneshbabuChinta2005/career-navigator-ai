import { Link } from "react-router-dom";
import {
  Mail,
  Sparkles,
  Linkedin,
  DollarSign,
  Target,
  Map,
  PlayCircle,
  ChevronRight,
  Zap,
  ArrowUpRight,
} from "lucide-react";

interface ToolItem {
  name: string;
  tagline: string;
  description: string;
  icon: any;
  href: string;
  color: string;
  glow: string;
  bg: string;
  border: string;
  gradient: string;
  span: string;
  badge?: string;
}

const tools: ToolItem[] = [
  {
    name: "Cover Letter Generator",
    tagline: "Tailored in seconds",
    description: "Generate hyper-personalized cover letters matched to any job description. Stand out from hundreds of applicants instantly.",
    icon: Mail,
    href: "/app/ai-tools/cover-letter",
    color: "hsl(270 100% 70%)",
    glow: "hsl(270 100% 65% / 0.3)",
    bg: "hsl(270 100% 65% / 0.07)",
    border: "hsl(270 100% 65% / 0.18)",
    gradient: "linear-gradient(135deg, hsl(270 100% 65%), hsl(300 100% 60%))",
    span: "lg:col-span-3",
    badge: "Most Popular",
  },
  {
    name: "LinkedIn Optimizer",
    tagline: "Rank higher, get found",
    description: "AI-powered profile analysis that rewrites your headline, summary, and bullets to attract top recruiters.",
    icon: Linkedin,
    href: "/app/ai-tools/linkedin",
    color: "hsl(200 90% 55%)",
    glow: "hsl(200 90% 55% / 0.3)",
    bg: "hsl(200 90% 55% / 0.07)",
    border: "hsl(200 90% 55% / 0.18)",
    gradient: "linear-gradient(135deg, hsl(200 90% 55%), hsl(185 100% 50%))",
    span: "lg:col-span-3",
  },
  {
    name: "Salary Negotiator",
    tagline: "Earn what you deserve",
    description: "Market data + personalized email & verbal scripts for every negotiation scenario.",
    icon: DollarSign,
    href: "/app/ai-tools/salary",
    color: "hsl(150 80% 50%)",
    glow: "hsl(150 80% 50% / 0.3)",
    bg: "hsl(150 80% 50% / 0.07)",
    border: "hsl(150 80% 50% / 0.18)",
    gradient: "linear-gradient(135deg, hsl(150 80% 50%), hsl(180 80% 45%))",
    span: "lg:col-span-2",
    badge: "New",
  },
  {
    name: "Skill Gap Analyzer",
    tagline: "Know your gaps",
    description: "Pinpoint what's missing and get learning priority recommendations for your target role.",
    icon: Target,
    href: "/app/skill-gap",
    color: "hsl(38 100% 55%)",
    glow: "hsl(38 100% 55% / 0.3)",
    bg: "hsl(38 100% 55% / 0.07)",
    border: "hsl(38 100% 55% / 0.18)",
    gradient: "linear-gradient(135deg, hsl(38 100% 55%), hsl(55 100% 50%))",
    span: "lg:col-span-2",
  },
  {
    name: "Role Simulator",
    tagline: "Practice makes perfect",
    description: "Real-time AI interview simulation with adaptive feedback and scoring.",
    icon: PlayCircle,
    href: "/app/simulation",
    color: "hsl(330 100% 65%)",
    glow: "hsl(330 100% 65% / 0.3)",
    bg: "hsl(330 100% 65% / 0.07)",
    border: "hsl(330 100% 65% / 0.18)",
    gradient: "linear-gradient(135deg, hsl(330 100% 65%), hsl(270 100% 65%))",
    span: "lg:col-span-2",
  },
];

const AITools = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto page-enter">

      {/* ── Header ── */}
      <div className="relative rounded-3xl p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(230 28% 8%), hsl(230 25% 6%))',
          border: '1px solid hsl(230 20% 13%)',
        }}>
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(circle, hsl(270 100% 65% / 0.1), transparent 70%)' }} />
          <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full blur-[60px]"
            style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.08), transparent 70%)' }} />
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, hsl(185 100% 50% / 0.15), hsl(270 100% 65% / 0.15))',
                border: '1px solid hsl(185 100% 50% / 0.25)',
                color: 'hsl(185 100% 60%)',
              }}>
              <Sparkles className="w-3 h-3" />
              AI Tools Suite · 5 Tools
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Career{' '}
              <span style={{
                background: 'linear-gradient(135deg, hsl(185 100% 55%), hsl(270 100% 70%), hsl(330 100% 65%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                LaunchPad
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              AI-powered utilities to craft applications, optimize profiles, and negotiate offers — all in one hub.
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4 flex-shrink-0">
            {[
              { value: '5', label: 'AI Tools', color: 'hsl(185 100% 50%)' },
              { value: '∞', label: 'Generations', color: 'hsl(270 100% 65%)' },
            ].map(s => (
              <div key={s.label} className="text-center px-6 py-4 rounded-2xl"
                style={{
                  background: 'hsl(230 25% 10%)',
                  border: '1px solid hsl(230 20% 15%)',
                }}>
                <div className="text-3xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.name}
              to={tool.href}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${tool.span}`}
              style={{ background: tool.bg, border: `1px solid ${tool.border}` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 50px ${tool.glow}`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)` }} />

              {/* Background orb on hover */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${tool.glow}, transparent 70%)` }} />

              <div className="relative z-10 flex flex-col h-full p-6 min-h-[200px] justify-between">
                <div className="space-y-4">
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: tool.gradient, boxShadow: `0 0 24px ${tool.glow}` }}>
                      <Icon className="w-7 h-7 text-black" strokeWidth={2} />
                    </div>
                    {tool.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full"
                        style={{ background: tool.gradient, color: 'black' }}>
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: tool.color }}>
                      {tool.tagline}
                    </p>
                    <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                  </div>
                </div>

                {/* Action row */}
                <div className="flex items-center justify-between pt-5 mt-5"
                  style={{ borderTop: `1px solid ${tool.border}` }}>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: tool.color }}>
                    Launch Tool
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                    style={{ background: tool.bg, border: `1px solid ${tool.border}`, color: tool.color }}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Bottom tip ── */}
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
        style={{
          background: 'hsl(185 100% 50% / 0.06)',
          border: '1px solid hsl(185 100% 50% / 0.12)',
        }}>
        <Zap className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(185 100% 55%)' }} />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Pro tip:</span>{' '}
          Start with the Skill Gap Analyzer to personalize your roadmap, then use Cover Letter Generator for your top job matches.
        </p>
      </div>
    </div>
  );
};

export default AITools;
