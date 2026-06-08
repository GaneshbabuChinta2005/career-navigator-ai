import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Zap,
  Target,
  Map,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Star,
  ChevronRight,
  Globe,
  Shield,
  BarChart3,
  Cpu,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

// ── Animated counter component ──
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const numericTarget = parseFloat(value.replace(/[^0-9.]/g, ''));
        const suffix = value.replace(/[0-9.]/g, '');
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();
        const update = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = (eased * numericTarget).toFixed(numericTarget % 1 !== 0 ? 1 : 0);
          setDisplayed(current + suffix);
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{displayed}</span>;
};

const features = [
  {
    icon: Target,
    title: 'Skills Gap Analysis',
    description: 'AI-powered analysis that pinpoints exactly where your expertise falls short for your dream role.',
    color: 'hsl(185 100% 50%)',
    glow: 'hsl(185 100% 50% / 0.25)',
    bg: 'hsl(185 100% 50% / 0.08)',
    border: 'hsl(185 100% 50% / 0.15)',
  },
  {
    icon: Map,
    title: 'Interactive Roadmap',
    description: 'A personalized, step-by-step learning roadmap generated to close your skill gaps fast.',
    color: 'hsl(270 100% 65%)',
    glow: 'hsl(270 100% 65% / 0.25)',
    bg: 'hsl(270 100% 65% / 0.08)',
    border: 'hsl(270 100% 65% / 0.15)',
  },
  {
    icon: Zap,
    title: 'Career Simulation',
    description: 'Simulate real interview scenarios and job challenges with adaptive AI feedback.',
    color: 'hsl(330 100% 60%)',
    glow: 'hsl(330 100% 60% / 0.25)',
    bg: 'hsl(330 100% 60% / 0.08)',
    border: 'hsl(330 100% 60% / 0.15)',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Track your learning velocity and readiness score with detailed visual dashboards.',
    color: 'hsl(150 80% 45%)',
    glow: 'hsl(150 80% 45% / 0.25)',
    bg: 'hsl(150 80% 45% / 0.08)',
    border: 'hsl(150 80% 45% / 0.15)',
  },
  {
    icon: Sparkles,
    title: 'AI Cover Letters',
    description: 'Generate hyper-personalized cover letters matched perfectly to any job description.',
    color: 'hsl(38 100% 55%)',
    glow: 'hsl(38 100% 55% / 0.25)',
    bg: 'hsl(38 100% 55% / 0.08)',
    border: 'hsl(38 100% 55% / 0.15)',
  },
  {
    icon: BarChart3,
    title: 'Salary Negotiator',
    description: 'Get market data and persuasive scripts to confidently negotiate your compensation.',
    color: 'hsl(200 90% 55%)',
    glow: 'hsl(200 90% 55% / 0.25)',
    bg: 'hsl(200 90% 55% / 0.08)',
    border: 'hsl(200 90% 55% / 0.15)',
  },
];

const stats = [
  { value: '94', suffix: '%', label: 'Match Accuracy', icon: Target },
  { value: '3', suffix: 'x', label: 'Faster Growth', icon: TrendingUp },
  { value: '10', suffix: 'k+', label: 'Careers Launched', icon: Globe },
  { value: '99', suffix: '%', label: 'Satisfaction', icon: Star },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Frontend → Staff Eng',
    quote: 'CareerNav AI identified exactly what was missing. Got promoted to Staff Engineer in 8 months.',
    avatar: 'SC',
    color: 'hsl(185 100% 50%)',
  },
  {
    name: 'Marcus Johnson',
    role: 'CS Grad → Google SWE',
    quote: 'The simulation feature is insane — it prepared me for Google interview questions I actually got.',
    avatar: 'MJ',
    color: 'hsl(270 100% 65%)',
  },
  {
    name: 'Priya Nair',
    role: 'Backend → ML Engineer',
    quote: 'Followed the roadmap exactly and transitioned to ML in 6 months. Best career decision ever.',
    avatar: 'PN',
    color: 'hsl(330 100% 60%)',
  },
];

const trustBadges = [
  { icon: Shield, text: 'SOC 2 Secure' },
  { icon: Cpu, text: 'Gemini 1.5 AI' },
  { icon: Globe, text: '40+ Countries' },
  { icon: CheckCircle, text: 'No credit card' },
];

const Index = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleGetStarted = () => {
    login({ id: 'demo-user-123', name: 'Demo User', email: 'demo@career.ai', role: 'user' }, 'demo-jwt-token-auto');
    navigate('/app/dashboard');
  };

  // Parallax mouse movement
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Background system ───────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base mesh */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        {/* Dot grid */}
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        {/* Main orb — parallax */}
        <div
          className="absolute top-[15%] left-1/2 w-[900px] h-[700px] rounded-full blur-[120px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse, hsl(185 100% 50% / 0.12), hsl(270 100% 65% / 0.08) 50%, transparent 70%)',
            transform: `translate(calc(-50% + ${mousePos.x * 30}px), ${mousePos.y * 20}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-30"
          style={{ background: 'radial-gradient(ellipse, hsl(330 100% 60% / 0.12), transparent 70%)' }} />
      </div>

      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))',
              boxShadow: '0 0 20px hsl(185 100% 50% / 0.4)',
            }}>
            <Zap className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight">CareerNav AI</span>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-medium">
          {['Features', 'Roadmap', 'Pricing', 'Blog'].map(link => (
            <button key={link} className="hover:text-foreground transition-colors">{link}</button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleGetStarted}
            className="text-muted-foreground hover:text-foreground">Sign In</Button>
          <button onClick={handleGetStarted}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))',
              boxShadow: '0 0 20px hsl(185 100% 50% / 0.3)',
              color: 'black',
            }}>
            Get Started <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* ── Hero Section ────────────────────────────────────── */}
      <section ref={heroRef} className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-6xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
          style={{
            background: 'hsl(185 100% 50% / 0.08)',
            border: '1px solid hsl(185 100% 50% / 0.2)',
            color: 'hsl(185 100% 55%)',
            boxShadow: '0 0 30px hsl(185 100% 50% / 0.1)',
          }}>
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Gemini 1.5 AI
          <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full font-bold"
            style={{ background: 'hsl(185 100% 50%)', color: 'black' }}>NEW</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-[-0.03em] mb-6 max-w-5xl">
          Navigate Your Career
          <br />
          <span style={{
            background: 'linear-gradient(135deg, hsl(185 100% 55%), hsl(270 100% 70%), hsl(330 100% 65%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% 100%',
            animation: 'gradient-x 4s ease infinite',
          }}>
            With AI Precision
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Bridge your skill gaps, simulate real interviews, and follow a personalized roadmap —
          all powered by advanced AI that knows exactly what top employers want.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-10">
          <button onClick={handleGetStarted}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))',
              boxShadow: '0 0 40px hsl(185 100% 50% / 0.35), 0 4px 20px hsl(0 0% 0% / 0.3)',
              color: 'black',
            }}>
            <Zap className="w-5 h-5" />
            Start for Free — No Card
            <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={handleGetStarted}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: 'hsl(230 25% 9%)',
              border: '1px solid hsl(230 20% 18%)',
              color: 'hsl(0 0% 85%)',
            }}>
            <Star className="w-5 h-5" style={{ color: 'hsl(38 100% 55%)' }} />
            See Demo
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-6 flex-wrap justify-center mb-16">
          {trustBadges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon className="w-3.5 h-3.5" style={{ color: 'hsl(185 100% 55%)' }} />
              {text}
            </div>
          ))}
        </div>

        {/* Stats counter row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center p-4 rounded-2xl"
              style={{
                background: 'hsl(230 25% 8%)',
                border: '1px solid hsl(230 20% 13%)',
              }}>
              <div className="text-3xl md:text-4xl font-extrabold mb-1"
                style={{
                  background: 'linear-gradient(135deg, hsl(185 100% 55%), hsl(270 100% 70%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'hsl(270 100% 65% / 0.08)',
              border: '1px solid hsl(270 100% 65% / 0.2)',
              color: 'hsl(270 100% 70%)',
            }}>
            <Cpu className="w-3 h-3" /> Everything you need
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            One Platform.{' '}
            <span style={{
              background: 'linear-gradient(135deg, hsl(270 100% 65%), hsl(330 100% 60%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Infinite Possibilities.
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From AI skill analysis to career simulation — everything to get you hired faster and earn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden"
              style={{ background: f.bg, border: `1px solid ${f.border}` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${f.glow}`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`, opacity: 0.6 }} />

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                style={{ background: f.bg, border: `1px solid ${f.border}`, boxShadow: `0 0 20px ${f.glow}`, color: f.color }}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>

              <div className="flex items-center gap-1 mt-4 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: f.color }}>
                Learn more <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Real Results. Real Careers.
          </h2>
          <p className="text-muted-foreground">Hear from professionals who transformed their careers with CareerNav AI.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(145deg, hsl(230 25% 9%), hsl(230 25% 7%))',
                border: '1px solid hsl(230 20% 14%)',
              }}>
              <div className="absolute top-0 left-0 w-full h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${t.color}60, transparent)` }} />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'hsl(38 100% 55%)' }} />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{t.quote}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-24 max-w-4xl mx-auto">
        <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(230 28% 10%), hsl(230 25% 7%))',
            border: '1px solid hsl(185 100% 50% / 0.15)',
            boxShadow: '0 0 80px hsl(185 100% 50% / 0.08)',
          }}>
          {/* Background orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full blur-[100px]"
              style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.08), transparent 70%)' }} />
          </div>
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{
                background: 'hsl(185 100% 50% / 0.1)',
                border: '1px solid hsl(185 100% 50% / 0.2)',
                color: 'hsl(185 100% 55%)',
              }}>
              <Sparkles className="w-3.5 h-3.5" />
              Join 10,000+ professionals
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ready to accelerate
              <br />
              <span style={{
                background: 'linear-gradient(135deg, hsl(185 100% 55%), hsl(270 100% 70%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                your career?
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
              Start for free. No credit card. Get your personalized career roadmap in under 2 minutes.
            </p>

            <button onClick={handleGetStarted}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-200 hover:scale-105 hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))',
                boxShadow: '0 0 50px hsl(185 100% 50% / 0.4), 0 4px 20px hsl(0 0% 0% / 0.3)',
                color: 'black',
              }}>
              <Zap className="w-5 h-5" />
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="relative z-10 px-6 py-8 max-w-7xl mx-auto"
        style={{ borderTop: '1px solid hsl(230 20% 10%)' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, hsl(185 100% 50%), hsl(270 100% 65%))' }}>
              <Zap className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="text-sm font-semibold">CareerNav AI</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 CareerNav AI. Built with Gemini 1.5 Flash.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Privacy</button>
            <button className="hover:text-foreground transition-colors">Terms</button>
            <button className="hover:text-foreground transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
