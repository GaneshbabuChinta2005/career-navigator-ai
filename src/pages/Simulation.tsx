import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Play
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  icon: string;
  requiredSkills: { name: string; weight: number }[];
}

interface SkillScore {
  name: string;
  yourLevel: number;
  required: number;
  contribution: number;
}

const roles: Role[] = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    icon: '🎨',
    requiredSkills: [
      { name: 'React', weight: 30 },
      { name: 'TypeScript', weight: 25 },
      { name: 'CSS/Design', weight: 20 },
      { name: 'System Design', weight: 15 },
      { name: 'Testing', weight: 10 }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    icon: '⚙️',
    requiredSkills: [
      { name: 'Node.js', weight: 30 },
      { name: 'Database', weight: 25 },
      { name: 'API Design', weight: 20 },
      { name: 'System Design', weight: 15 },
      { name: 'DevOps', weight: 10 }
    ]
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    icon: '🚀',
    requiredSkills: [
      { name: 'React', weight: 20 },
      { name: 'Node.js', weight: 20 },
      { name: 'TypeScript', weight: 20 },
      { name: 'Database', weight: 20 },
      { name: 'System Design', weight: 20 }
    ]
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    icon: '🔧',
    requiredSkills: [
      { name: 'AWS/Cloud', weight: 30 },
      { name: 'CI/CD', weight: 25 },
      { name: 'Kubernetes', weight: 20 },
      { name: 'Monitoring', weight: 15 },
      { name: 'Scripting', weight: 10 }
    ]
  }
];

// Mock user skill levels (0-100)
const userSkills: Record<string, number> = {
  'React': 85,
  'TypeScript': 70,
  'CSS/Design': 75,
  'Node.js': 65,
  'Database': 60,
  'API Design': 55,
  'System Design': 45,
  'DevOps': 40,
  'AWS/Cloud': 35,
  'CI/CD': 30,
  'Kubernetes': 25,
  'Monitoring': 30,
  'Scripting': 50,
  'Testing': 60
};

const AnimatedScore = ({ target }: { target: number }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setScore(target);
        clearInterval(timer);
      } else {
        setScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{score}%</span>;
};

const Simulation = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(roles[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const calculateScore = (role: Role): number => {
    const totalScore = role.requiredSkills.reduce((sum, skill) => {
      const userLevel = userSkills[skill.name] || 0;
      return sum + (userLevel * skill.weight / 100);
    }, 0);
    return Math.round(totalScore);
  };

  const getSkillScores = (role: Role): SkillScore[] => {
    return role.requiredSkills.map(skill => ({
      name: skill.name,
      yourLevel: userSkills[skill.name] || 0,
      required: 80, // Target level
      contribution: Math.round((userSkills[skill.name] || 0) * skill.weight / 100)
    }));
  };

  const readinessScore = calculateScore(selectedRole);
  const skillScores = getSkillScores(selectedRole);
  const strengths = skillScores.filter(s => s.yourLevel >= 70);
  const weaknesses = skillScores.filter(s => s.yourLevel < 50);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowDetails(true);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getRecommendation = (score: number) => {
    if (score >= 75) return "You're ready! Apply to roles now and keep practicing.";
    if (score >= 50) return "Almost there! Focus on your weaknesses for 2-4 weeks.";
    return "More preparation needed. Follow your roadmap for 1-2 months.";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Target className="w-8 h-8 text-primary" />
          Role Readiness Simulation
        </h1>
        <p className="text-muted-foreground mt-2">
          Select a role and run the simulation to see how ready you are
        </p>
      </div>

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Target Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role);
                  setShowDetails(false);
                }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${role.id === selectedRole.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/50 hover:shadow'
                  }`}
              >
                <div className="text-3xl mb-2">{role.icon}</div>
                <div className="font-semibold">{role.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {role.requiredSkills.length} key skills
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Run Simulation Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="gap-2"
        >
          {isRunning ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Running Simulation...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Run Simulation for {selectedRole.name}
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {showDetails && (
        <>
          {/* Score Display */}
          <Card className={`${getScoreBg(readinessScore)} border-2`}>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <Badge variant="outline" className="text-sm">
                  {selectedRole.name}
                </Badge>
                <div>
                  <h2 className="text-lg text-muted-foreground mb-2">
                    Your Readiness Score
                  </h2>
                  <div className={`text-7xl font-bold ${getScoreColor(readinessScore)}`}>
                    <AnimatedScore target={readinessScore} />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  {readinessScore >= 75 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  )}
                  <p className="text-muted-foreground max-w-md">
                    {getRecommendation(readinessScore)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Breakdown */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Skill Breakdown</CardTitle>
                <Button variant="ghost" size="sm">
                  <Info className="w-4 h-4 mr-2" />
                  How it's calculated
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillScores.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="outline" className="text-xs">
                        Weight: {selectedRole.requiredSkills.find(s => s.name === skill.name)?.weight}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {skill.yourLevel}% / {skill.required}%
                      </span>
                      {skill.yourLevel >= skill.required ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                  </div>
                  <Progress value={skill.yourLevel} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Strengths & Weaknesses */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <TrendingUp className="w-5 h-5" />
                  Strengths ({strengths.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {strengths.map((skill) => (
                      <li key={skill.name} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">({skill.yourLevel}%)</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No skills above 70% yet. Keep learning!
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <TrendingDown className="w-5 h-5" />
                  Areas to Improve ({weaknesses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {weaknesses.map((skill) => (
                      <li key={skill.name} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">({skill.yourLevel}%)</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Great! No major weaknesses detected.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Simulation;
