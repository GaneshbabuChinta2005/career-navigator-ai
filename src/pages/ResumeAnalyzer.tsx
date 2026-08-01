import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  FileText, Upload, CheckCircle, AlertTriangle, Sparkles,
  TrendingUp, User, Briefcase, GraduationCap,
  RotateCcw, Clock, Zap,
  ShieldCheck, Star, History, Trash2, BookOpen, Brain, Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResumeStore, type ResumeAnalysis } from '@/store/useResumeStore';
import { analyzeResumeWithGemini, extractTextFromFile } from '@/features/resume/services/resumeAnalyzer';
import { toast } from 'sonner';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const ROLE_OPTIONS = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'DevOps Engineer', 'Data Engineer', 'Mobile Developer',
  'Machine Learning Engineer', 'Cloud Architect', 'Product Manager',
  'UI/UX Designer',
];

const CATEGORY_META: Record<string, { label: string; color: string; bg: string }> = {
  frontend:    { label: 'Frontend',    color: 'text-blue-700',   bg: 'bg-blue-100' },
  backend:     { label: 'Backend',     color: 'text-green-700',  bg: 'bg-green-100' },
  database:    { label: 'Database',    color: 'text-orange-700', bg: 'bg-orange-100' },
  devops:      { label: 'DevOps',      color: 'text-purple-700', bg: 'bg-purple-100' },
  'soft-skills':{ label: 'Soft Skills',color: 'text-pink-700',   bg: 'bg-pink-100' },
  other:       { label: 'Other',       color: 'text-gray-700',   bg: 'bg-gray-100' },
};

const LEVEL_META: Record<string, { label: string; width: number; color: string }> = {
  beginner:     { label: 'Beginner',     width: 25,  color: 'bg-red-400' },
  intermediate: { label: 'Intermediate', width: 55,  color: 'bg-yellow-400' },
  advanced:     { label: 'Advanced',     width: 80,  color: 'bg-blue-500' },
  expert:       { label: 'Expert',       width: 100, color: 'bg-green-500' },
};

const SENIORITY_LABEL: Record<string, string> = {
  entry: 'Entry Level', junior: 'Junior', mid: 'Mid-Level',
  senior: 'Senior', lead: 'Lead', principal: 'Principal / Staff',
};

// ── Drop Zone ─────────────────────────────────────────────────────────────────
function DropZone({
  onFile,
  disabled,
}: {
  onFile: (file: File) => void;
  disabled: boolean;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
        dragging
          ? 'border-primary bg-primary/10 scale-[1.01]'
          : 'border-border hover:border-primary/50 hover:bg-accent/30'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        disabled={disabled}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <div>
          <p className="text-lg font-semibold">
            {dragging ? 'Drop your resume here' : 'Drag & drop your resume'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse — PDF, DOC, DOCX up to 5MB
          </p>
        </div>
        <Button variant="outline" size="sm" disabled={disabled} onClick={(e) => e.stopPropagation()}>
          <FileText className="w-4 h-4 mr-2" /> Browse Files
        </Button>
      </div>
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────────
function OverviewTab({ analysis }: { analysis: ResumeAnalysis }) {
  return (
    <div className="space-y-6">
      {/* Candidate Card */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold">{analysis.name || 'Candidate'}</h2>
                  <p className="text-muted-foreground text-sm">{analysis.currentRole || analysis.roles[0] || 'Professional'}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{SENIORITY_LABEL[analysis.seniorityLevel]}</Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    {analysis.totalYears} yr{analysis.totalYears !== 1 ? 's' : ''} exp
                  </Badge>
                </div>
              </div>
              <p className="text-sm mt-3 text-muted-foreground leading-relaxed">{analysis.summary}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                {analysis.email && <span>📧 {analysis.email}</span>}
                {analysis.phone && <span>📞 {analysis.phone}</span>}
                {analysis.location && <span>📍 {analysis.location}</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Trinity */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { score: analysis.readinessScore, label: 'Role Fit', icon: Target },
          { score: analysis.atsScore,        label: 'ATS Score', icon: ShieldCheck },
          { score: analysis.clarityScore,    label: 'Clarity',   icon: Star },
        ].map(({ score, label, icon: Icon }) => (
          <Card key={label} className="text-center">
            <CardContent className="p-4 space-y-2">
              <Icon className="w-5 h-5 mx-auto text-primary" />
              <div className={`text-3xl font-bold ${
                score >= 75 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>{score}%</div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <Progress value={score} className="h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strengths + Red Flags */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-green-700">
              <TrendingUp className="w-4 h-4" /> Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.strengths.length > 0 ? analysis.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <span>{s}</span>
              </div>
            )) : <p className="text-sm text-muted-foreground">No specific strengths detected.</p>}
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" /> Areas to Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.redFlags.length > 0 ? analysis.redFlags.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>{f}</span>
              </div>
            )) : (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" /> No major red flags detected
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Target Role Verdict */}
      <Card className={`border-2 ${
        analysis.readinessScore >= 75
          ? 'border-green-200 bg-green-50/30'
          : analysis.readinessScore >= 50
          ? 'border-yellow-200 bg-yellow-50/30'
          : 'border-red-200 bg-red-50/30'
      }`}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Target Role Match
              </p>
              <p className="text-lg font-bold mt-0.5">{analysis.targetRole}</p>
            </div>
            <div className="text-right">
              <p className={`text-4xl font-bold ${
                analysis.readinessScore >= 75 ? 'text-green-600'
                : analysis.readinessScore >= 50 ? 'text-yellow-600'
                : 'text-red-600'
              }`}>{analysis.readinessScore}%</p>
              <p className="text-xs text-muted-foreground">readiness</p>
            </div>
          </div>
          <Progress value={analysis.readinessScore} className="mt-3 h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {analysis.readinessScore >= 75
              ? "Strong match — you're well-positioned for this role. Apply with confidence."
              : analysis.readinessScore >= 50
              ? 'Decent match — address the priority skill gaps to significantly improve your chances.'
              : 'Significant gaps exist — focus on the critical skills before applying.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Skills Tab ────────────────────────────────────────────────────────────────
function SkillsTab({ analysis }: { analysis: ResumeAnalysis }) {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Object.keys(CATEGORY_META)];
  const filtered = filter === 'all'
    ? analysis.detectedSkills
    : analysis.detectedSkills.filter((s) => s.category === filter);

  // Radar chart data
  const radarData = Object.entries(analysis.skillsByCategory).map(([cat, count]) => ({
    subject: CATEGORY_META[cat]?.label || cat,
    count,
    fullMark: 10,
  }));

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filter === cat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:border-primary/40'
            }`}
          >
            {cat === 'all' ? 'All Skills' : (CATEGORY_META[cat]?.label || cat)}
            {' '}({cat === 'all' ? analysis.detectedSkills.length : (analysis.skillsByCategory[cat] || 0)})
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Skill list — 3 columns */}
        <div className="lg:col-span-3 space-y-2">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No skills detected in this category.
            </p>
          )}
          {filtered.map((skill) => {
            const lvl = LEVEL_META[skill.level] || LEVEL_META.intermediate;
            const cat = CATEGORY_META[skill.category];
            return (
              <div key={skill.name} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="font-medium text-sm">{skill.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cat?.bg} ${cat?.color}`}>
                      {cat?.label}
                    </span>
                    {skill.yearsOfExperience && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />{skill.yearsOfExperience}y
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${lvl.color}`}
                        style={{ width: `${lvl.width}%`, transition: 'width 0.8s ease' }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-20 shrink-0">{lvl.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Radar chart — 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              {radarData.length > 2 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <Radar name="Skills" dataKey="count" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Not enough categories for chart
                </div>
              )}
            </CardContent>
          </Card>

          {/* Missing skills */}
          {analysis.missingSkills.length > 0 && (
            <Card className="mt-4 border-orange-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="w-4 h-4" /> Missing for {analysis.targetRole}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((s) => (
                    <span key={s} className="px-2 py-1 rounded-md bg-orange-50 text-orange-700 text-xs border border-orange-200">
                      + {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Experience Tab ────────────────────────────────────────────────────────────
function ExperienceTab({ analysis }: { analysis: ResumeAnalysis }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Experience</p>
              <p className="text-xl font-bold">{analysis.totalYears} years</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Seniority Level</p>
              <p className="text-xl font-bold">{SENIORITY_LABEL[analysis.seniorityLevel]}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Skills Detected</p>
              <p className="text-xl font-bold">{analysis.detectedSkills.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles */}
      {analysis.roles.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Job Titles Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {analysis.roles.map((r) => (
              <Badge key={r} variant="outline" className="text-sm">{r}</Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Companies */}
      {analysis.companies.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Companies
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {analysis.companies.map((c) => (
              <Badge key={c} variant="secondary">{c}</Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {analysis.education.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analysis.education.map((e, i) => (
              <div key={i} className="flex items-start gap-2 text-sm p-3 rounded-lg bg-muted/30">
                <GraduationCap className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <span>{e}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {analysis.roles.length === 0 && analysis.companies.length === 0 && analysis.education.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto opacity-30 mb-3" />
          <p>Could not extract structured experience data from this resume.</p>
          <p className="text-sm mt-1">Try uploading a text-based PDF for better results.</p>
        </div>
      )}
    </div>
  );
}

// ── Recommendations Tab ───────────────────────────────────────────────────────
function RecommendationsTab({ analysis }: { analysis: ResumeAnalysis }) {
  return (
    <div className="space-y-6">
      {/* Priority skills to learn */}
      {analysis.prioritySkills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="w-5 h-5 text-yellow-500" /> Priority Skills to Learn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.prioritySkills.map((ps, i) => {
              const impColor =
                ps.importance === 'critical' ? 'bg-red-50 border-red-200 text-red-700'
                : ps.importance === 'high' ? 'bg-orange-50 border-orange-200 text-orange-700'
                : 'bg-yellow-50 border-yellow-200 text-yellow-700';
              return (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${impColor}`}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {ps.importance === 'critical' ? '🔴' : ps.importance === 'high' ? '🟠' : '🟡'}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{ps.skill}</p>
                      <p className="text-xs opacity-70 capitalize">{ps.importance} priority</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3" /> {ps.timeToLearn}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Resume improvement recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="w-5 h-5 text-primary" /> Resume Improvement Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {analysis.recommendations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No specific recommendations — great work!</p>
          ) : (
            analysis.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm">{rec}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* CTA — go practice */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold">Ready to close the gaps?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Practice mock interviews or update your daily schedule with the skills above.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/app/mock-interview">
              <Button variant="outline" size="sm">
                <Brain className="w-4 h-4 mr-2" /> Mock Interview
              </Button>
            </Link>
            <Link to="/app/schedule">
              <Button size="sm">
                <BookOpen className="w-4 h-4 mr-2" /> Plan Learning
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── History Panel ──────────────────────────────────────────────────────────────
function HistoryPanel({
  analyses,
  currentId,
  onSelect,
  onDelete,
}: {
  analyses: ResumeAnalysis[];
  currentId?: string;
  onSelect: (a: ResumeAnalysis) => void;
  onDelete: (id: string) => void;
}) {
  if (analyses.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <History className="w-4 h-4 text-primary" /> Analysis History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {analyses.map((a) => (
          <div
            key={a.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${
              a.id === currentId ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-muted/40'
            }`}
            onClick={() => onSelect(a)}
          >
            <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{a.fileName}</p>
              <p className="text-xs text-muted-foreground">
                {a.targetRole} · {new Date(a.analyzedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-sm font-bold ${
                a.readinessScore >= 75 ? 'text-green-600' :
                a.readinessScore >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>{a.readinessScore}%</span>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(a.id); }}
                className="p-1 rounded hover:bg-red-50 hover:text-red-500 transition-colors"
                aria-label="Delete analysis"
              >
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
type PageView = 'upload' | 'analyzing' | 'results';

const ResumeAnalyzer = () => {
  const [view, setView] = useState<PageView>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');

  const { analyses, currentAnalysis, addAnalysis, setCurrentAnalysis, deleteAnalysis } =
    useResumeStore();

  // Bring back results view if we have a current analysis
  const displayedAnalysis = currentAnalysis;

  const handleFile = (file: File) => {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large — maximum 5MB');
      return;
    }
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowed.includes(ext)) {
      toast.error('Only PDF, DOC, and DOCX files are supported');
      return;
    }
    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setView('analyzing');
    setProgress(0);

    try {
      setProgressLabel('Reading file...');
      setProgress(15);
      const text = await extractTextFromFile(selectedFile);

      if (!text || text.length < 30) {
        throw new Error(
          'Could not extract text from this file. Try a text-based PDF (not a scanned image).'
        );
      }

      setProgressLabel('Sending to AI...');
      setProgress(35);

      // Simulate incremental progress while Gemini processes
      const tick = setInterval(() => {
        setProgress((p) => Math.min(p + 3, 85));
      }, 400);

      setProgressLabel('Analyzing skills & experience...');
      const analysis = await analyzeResumeWithGemini(
        text,
        targetRole,
        selectedFile.name,
        selectedFile.size
      );

      clearInterval(tick);
      setProgressLabel('Generating insights...');
      setProgress(95);

      await new Promise((r) => setTimeout(r, 400));
      setProgress(100);

      addAnalysis(analysis);
      setView('results');
      toast.success('Resume analyzed successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Analysis failed. Please try again.');
      setView('upload');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setProgress(0);
    setView('upload');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" /> Resume Analyzer
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload your resume and get AI-powered insights into your skills, experience, and role fit
          </p>
        </div>
        {view === 'results' && (
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" /> Analyze New Resume
          </Button>
        )}
      </div>

      {/* Upload View */}
      {view === 'upload' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <DropZone onFile={handleFile} disabled={false} />

            {selectedFile && (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Target Role</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={targetRole} onValueChange={setTargetRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  The AI will evaluate your resume specifically against this role's requirements
                </p>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleAnalyze}
              disabled={!selectedFile}
            >
              <Sparkles className="w-5 h-5" /> Analyze Resume
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <HistoryPanel
              analyses={analyses}
              currentId={currentAnalysis?.id}
              onSelect={(a) => { setCurrentAnalysis(a); setView('results'); }}
              onDelete={deleteAnalysis}
            />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">What you'll get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: '🧠', label: 'Skill extraction & levels' },
                  { icon: '📊', label: 'Role fit readiness score' },
                  { icon: '🛡️', label: 'ATS compatibility check' },
                  { icon: '🎯', label: 'Priority skills to learn' },
                  { icon: '💡', label: 'Actionable improvement tips' },
                  { icon: '📋', label: 'Experience & background summary' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <span>{icon}</span>
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Analyzing View */}
      {view === 'analyzing' && (
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Analyzing your resume...</h2>
              <p className="text-muted-foreground text-sm mt-1">{progressLabel}</p>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-xs text-muted-foreground">{progress}% complete</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results View */}
      {view === 'results' && displayedAnalysis && (
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {/* File meta bar */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-muted/30 rounded-lg border text-sm flex-wrap">
              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="font-medium">{displayedAnalysis.fileName}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{displayedAnalysis.targetRole}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">
                {new Date(displayedAnalysis.analyzedAt).toLocaleString()}
              </span>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="grid grid-cols-4 w-full mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
              </TabsList>
              <TabsContent value="overview"><OverviewTab analysis={displayedAnalysis} /></TabsContent>
              <TabsContent value="skills"><SkillsTab analysis={displayedAnalysis} /></TabsContent>
              <TabsContent value="experience"><ExperienceTab analysis={displayedAnalysis} /></TabsContent>
              <TabsContent value="recommendations"><RecommendationsTab analysis={displayedAnalysis} /></TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <HistoryPanel
              analyses={analyses}
              currentId={displayedAnalysis.id}
              onSelect={setCurrentAnalysis}
              onDelete={deleteAnalysis}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
