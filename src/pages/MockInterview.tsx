import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  ChevronRight, RotateCcw, Trophy, Clock,
  Lightbulb, CheckCircle, AlertTriangle, Brain, Play,
  BarChart2, ArrowLeft, Star
} from 'lucide-react';
import { useInterviewStore } from '@/store/useInterviewStore';
import { getQuestionsForRole, ROLE_OPTIONS } from '@/features/interview/data/questions';
import { scoreAnswer, computeSessionResults } from '@/features/interview/utils/scoring';
import type { InterviewSession, QuestionResponse, InterviewQuestion } from '@/store/useInterviewStore';
import { Link } from 'react-router-dom';

type Step = 'setup' | 'interview' | 'results';

const uid = () => Math.random().toString(36).slice(2, 9);

const CATEGORY_COLORS: Record<string, string> = {
  behavioral: 'bg-blue-100 text-blue-700 border-blue-200',
  technical: 'bg-purple-100 text-purple-700 border-purple-200',
  'system-design': 'bg-orange-100 text-orange-700 border-orange-200',
  coding: 'bg-green-100 text-green-700 border-green-200',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'bg-green-50 text-green-700',
  medium: 'bg-yellow-50 text-yellow-700',
  hard: 'bg-red-50 text-red-700',
};

function ScoreRing({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / 1200, 1);
      setDisplayed(Math.round(progress * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (displayed / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="52" fill="none"
          stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{displayed}%</span>
        <span className="text-xs text-muted-foreground">Score</span>
      </div>
    </div>
  );
}

// ── Setup Screen ─────────────────────────────────────────────────────────────
function SetupScreen({ onStart }: { onStart: (role: string) => void }) {
  const [selected, setSelected] = useState('fullstack');
  const [questionCount, setQuestionCount] = useState(5);
  const { sessions } = useInterviewStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary" /> Mock Interview
        </h1>
        <p className="text-muted-foreground mt-1">
          Practice realistic interview questions and get instant AI-powered feedback
        </p>
      </div>

      {sessions.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">Previous sessions: {sessions.length}</p>
              <p className="text-xs text-muted-foreground">
                Last: {sessions[0].role} — {sessions[0].totalScore}% score
              </p>
            </div>
            <Link to="/app/mock-interview/history">
              <Button variant="outline" size="sm">
                <BarChart2 className="w-4 h-4 mr-2" /> View History
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Choose a Role</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {ROLE_OPTIONS.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selected === role.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/40 hover:bg-accent/40'
                }`}
              >
                <div className="text-3xl mb-2">{role.icon}</div>
                <div className="font-semibold text-sm">{role.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{role.duration}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Number of Questions</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {[3, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-all ${
                  questionCount === n
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                {n} questions
                <div className="text-xs font-normal text-muted-foreground">
                  ~{n * 4} min
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" className="gap-2 px-10" onClick={() => onStart(selected)}>
          <Play className="w-5 h-5" /> Start Interview
        </Button>
      </div>
    </div>
  );
}

// ── Interview Screen ──────────────────────────────────────────────────────────
function InterviewScreen({
  questions,
  role,
  onComplete,
}: {
  questions: InterviewQuestion[];
  role: string;
  onComplete: (responses: QuestionResponse[], duration: number) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [questionStart, setQuestionStart] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [lastResponse, setLastResponse] = useState<QuestionResponse | null>(null);
  const totalStart = useRef(Date.now());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setAnswer('');
    setShowHint(false);
    setSubmitted(false);
    setLastResponse(null);
    setQuestionStart(Date.now());
    textareaRef.current?.focus();
  }, [currentIdx]);

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx + (submitted ? 1 : 0)) / questions.length) * 100;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleSubmitAnswer = useCallback(() => {
    const timeTaken = Math.round((Date.now() - questionStart) / 1000);
    const response = scoreAnswer(currentQ, answer, timeTaken);
    setLastResponse(response);
    setSubmitted(true);
  }, [currentQ, answer, questionStart]);

  const handleNext = () => {
    if (!lastResponse) return;
    const updated = [...responses, lastResponse];
    if (currentIdx + 1 >= questions.length) {
      const totalDuration = Math.round((Date.now() - totalStart.current) / 1000);
      onComplete(updated, totalDuration);
    } else {
      setResponses(updated);
      setCurrentIdx((i) => i + 1);
    }
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">
            Question {currentIdx + 1} of {questions.length}
          </h2>
          <p className="text-xs text-muted-foreground capitalize">{role} Interview</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" /> {formatTime(elapsed)}
          </span>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      {/* Question Card */}
      <Card className="border-primary/20">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex gap-2 flex-wrap">
              <Badge className={CATEGORY_COLORS[currentQ.category]} variant="outline">
                {currentQ.category.replace('-', ' ')}
              </Badge>
              <Badge className={DIFFICULTY_COLORS[currentQ.difficulty]} variant="outline">
                {currentQ.difficulty}
              </Badge>
            </div>
          </div>

          <p className="text-base font-medium leading-relaxed">{currentQ.question}</p>

          {currentQ.hint && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              onClick={() => setShowHint(!showHint)}
            >
              <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
              {showHint ? 'Hide hint' : 'Show hint'}
            </Button>
          )}
          {showHint && currentQ.hint && (
            <div className="text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 rounded-lg p-3">
              💡 {currentQ.hint}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Answer Area */}
      {!submitted ? (
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Your Answer</span>
              <span className="text-xs text-muted-foreground">
                {answer.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <Textarea
              ref={textareaRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here... Be specific and use examples."
              className="min-h-[150px] resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {currentQ.category === 'behavioral'
                  ? 'Tip: Use the STAR method (Situation, Task, Action, Result)'
                  : 'Tip: Be specific, explain trade-offs, and give examples'}
              </p>
              <Button onClick={handleSubmitAnswer} disabled={answer.trim().length < 5}>
                Submit Answer <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className={lastResponse && lastResponse.score >= 7
          ? 'border-green-200 bg-green-50/50'
          : lastResponse && lastResponse.score >= 5
          ? 'border-yellow-200 bg-yellow-50/50'
          : 'border-red-200 bg-red-50/50'}>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Feedback</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < (lastResponse?.score || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm font-bold ml-1">{lastResponse?.score}/10</span>
              </div>
            </div>
            <p className="text-sm">{lastResponse?.feedback}</p>
            {currentQ.sampleAnswer && (
              <details className="text-sm">
                <summary className="cursor-pointer text-primary font-medium">
                  View sample answer
                </summary>
                <p className="mt-2 text-muted-foreground bg-background rounded-lg p-3 border">
                  {currentQ.sampleAnswer}
                </p>
              </details>
            )}
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                {currentIdx + 1 >= questions.length ? (
                  <><Trophy className="w-4 h-4 mr-2" /> View Results</>
                ) : (
                  <>Next Question <ChevronRight className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Results Screen ────────────────────────────────────────────────────────────
function ResultsScreen({
  session,
  onRestart,
}: {
  session: InterviewSession;
  onRestart: () => void;
}) {
  const score = session.totalScore;
  const verdict =
    score >= 80
      ? { label: 'Outstanding', color: 'text-green-600', bg: 'bg-green-50 border-green-200' }
      : score >= 65
      ? { label: 'Strong', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' }
      : score >= 50
      ? { label: 'Decent', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' }
      : { label: 'Needs Work', color: 'text-red-600', bg: 'bg-red-50 border-red-200' };

  const formatTime = (s: number) =>
    s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Interview Complete 🎉</h2>
        <p className="text-muted-foreground">{session.role} — {new Date(session.date).toLocaleDateString()}</p>
      </div>

      {/* Score Card */}
      <Card className={`border-2 ${verdict.bg}`}>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ScoreRing score={score} />
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <p className="text-sm text-muted-foreground">Overall Performance</p>
                <p className={`text-3xl font-bold ${verdict.color}`}>{verdict.label}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Questions</p>
                  <p className="font-bold">{session.questions.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-bold">{formatTime(session.duration)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Strong Answers</p>
                  <p className="font-bold text-green-600">{session.strengths.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">To Improve</p>
                  <p className="font-bold text-orange-600">{session.improvements.length}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Per-question breakdown */}
      <Card>
        <CardHeader><CardTitle>Question Breakdown</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {session.questions.map((q, i) => {
            const r = session.responses[i];
            if (!r) return null;
            return (
              <div key={q.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-muted-foreground">Q{i + 1}</span>
                      <Badge className={CATEGORY_COLORS[q.category]} variant="outline">
                        {q.category}
                      </Badge>
                      <Badge className={DIFFICULTY_COLORS[q.difficulty]} variant="outline">
                        {q.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{q.question}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {r.score >= 7 ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    )}
                    <span className="font-bold text-sm">{r.score}/10</span>
                  </div>
                </div>
                <Progress value={(r.score / 10) * 100} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{r.feedback}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="w-4 h-4 mr-2" /> Try Again
        </Button>
        <Link to="/app/schedule">
          <Button>
            <CheckCircle className="w-4 h-4 mr-2" /> Schedule Practice
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const MockInterview = () => {
  const [step, setStep] = useState<Step>('setup');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [completedSession, setCompletedSession] = useState<InterviewSession | null>(null);
  const { addSession } = useInterviewStore();

  const handleStart = (role: string) => {
    const roleLabel =
      ROLE_OPTIONS.find((r) => r.id === role)?.label || role;
    const qs = getQuestionsForRole(role, 5);
    setSelectedRole(roleLabel);
    setQuestions(qs);
    setStep('interview');
  };

  const handleComplete = (
    responses: QuestionResponse[],
    duration: number
  ) => {
    const { totalScore, strengths, improvements } = computeSessionResults(responses);
    const session: InterviewSession = {
      id: uid(),
      role: selectedRole,
      date: new Date().toISOString(),
      questions,
      responses,
      totalScore,
      duration,
      completed: true,
      strengths,
      improvements,
    };
    addSession(session);
    setCompletedSession(session);
    setStep('results');
  };

  const handleRestart = () => {
    setCompletedSession(null);
    setStep('setup');
  };

  return (
    <div className="space-y-6">
      {step !== 'setup' && (
        <button
          onClick={handleRestart}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to setup
        </button>
      )}

      {step === 'setup' && <SetupScreen onStart={handleStart} />}
      {step === 'interview' && (
        <InterviewScreen
          questions={questions}
          role={selectedRole}
          onComplete={handleComplete}
        />
      )}
      {step === 'results' && completedSession && (
        <ResultsScreen session={completedSession} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default MockInterview;
