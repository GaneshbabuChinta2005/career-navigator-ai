import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Target, Map, TrendingUp, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Skills Gap Analysis',
    description: 'AI-powered analysis that pinpoints exactly where your expertise falls short for your dream role.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border-cyan-400/20',
  },
  {
    icon: Map,
    title: 'Interactive Roadmap',
    description: 'A personalized, step-by-step learning roadmap generated to close your skill gaps fast.',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10 border-violet-400/20',
  },
  {
    icon: Zap,
    title: 'Career Simulation',
    description: 'Simulate real interview scenarios and job challenges with adaptive AI feedback.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10 border-pink-400/20',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Track your learning velocity and readiness score with detailed visual dashboards.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/20',
  },
];

const stats = [
  { value: '94%', label: 'Role Match Accuracy' },
  { value: '3x', label: 'Faster Skill Growth' },
  { value: '10k+', label: 'Careers Transformed' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Mesh background */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none" />
      <div className="fixed inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      {/* Glow blobs */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Target className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-display">CareerNav AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              Get Started <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
          <Zap className="w-3.5 h-3.5" />
          AI-Powered Career Intelligence
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
          Navigate Your Career
          <br />
          <span className="text-gradient">With AI Precision</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Bridge your skill gaps, simulate real interviews, and follow a personalized roadmap — all powered by advanced AI that knows what top employers want.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-16">
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow px-8 h-14 text-base font-semibold">
              Start for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-border/60 hover:bg-secondary">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex gap-12 justify-center flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-gradient-secondary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Everything you need to level up</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From skill gap analysis to career simulation — one platform to get you hired faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`glass rounded-2xl p-6 border ${f.bg} hover:scale-[1.02] transition-transform duration-300 cursor-pointer group`}
            >
              <div className={`w-12 h-12 rounded-xl ${f.bg} border flex items-center justify-center mb-4`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24 max-w-3xl mx-auto text-center">
        <div className="glass rounded-3xl p-12 border border-primary/20 shadow-glow">
          <h2 className="text-3xl font-bold font-display mb-4">Ready to accelerate your career?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of professionals who already use CareerNav AI to reach their goals faster.</p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 px-10 h-14 text-base font-semibold shadow-glow">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
