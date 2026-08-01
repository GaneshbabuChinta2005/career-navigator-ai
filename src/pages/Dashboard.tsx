import { useState } from 'react';
import { StatsGrid } from '@/features/dashboard/components/StatsGrid';
import { LearningActivityChart, SkillsChart } from '@/features/dashboard/components/Charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  TrendingUp,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
  Brain,
  CalendarDays,
  Flame,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScheduleStore } from '@/store/useScheduleStore';
import { useInterviewStore } from '@/store/useInterviewStore';
import { useResumeStore } from '@/store/useResumeStore';

interface Activity {
  id: string;
  type: 'completed' | 'started' | 'milestone';
  title: string;
  time: string;
  description: string;
}

const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'completed',
    title: 'Completed React Hooks Module',
    time: '2 hours ago',
    description: 'useState, useEffect, and custom hooks'
  },
  {
    id: '2',
    type: 'milestone',
    title: 'Reached 70% Role Readiness',
    time: '5 hours ago',
    description: 'Frontend Developer track'
  },
  {
    id: '3',
    type: 'started',
    title: 'Started System Design Course',
    time: 'Yesterday',
    description: 'Scalability and Architecture Patterns'
  },
  {
    id: '4',
    type: 'completed',
    title: 'Finished TypeScript Generics',
    time: '2 days ago',
    description: 'Advanced type manipulation'
  }
];

const quickActions = [
  {
    icon: FileText,
    label: 'Resume Analyzer',
    description: 'AI-powered resume review',
    link: '/app/resume',
    color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
  },
  {
    icon: Target,
    label: 'Run Simulation',
    description: 'Check role readiness',
    link: '/app/simulation',
    color: 'text-blue-600 bg-blue-50 hover:bg-blue-100'
  },
  {
    icon: Brain,
    label: 'Mock Interview',
    description: 'Practice & get feedback',
    link: '/app/mock-interview',
    color: 'text-purple-600 bg-purple-50 hover:bg-purple-100'
  },
  {
    icon: CalendarDays,
    label: 'Daily Schedule',
    description: 'Track today\'s tasks',
    link: '/app/schedule',
    color: 'text-orange-600 bg-orange-50 hover:bg-orange-100'
  },
  {
    icon: TrendingUp,
    label: 'Skill Gap Analysis',
    description: 'Find what to learn',
    link: '/app/skill-gap',
    color: 'text-green-600 bg-green-50 hover:bg-green-100'
  }
];

const Dashboard = () => {
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  });

  const today = new Date().toISOString().split('T')[0];
  const { schedules, getCompletionRate, getStreak, toggleTask } = useScheduleStore();
  const { sessions } = useInterviewStore();
  const { getLatest: getLatestResume } = useResumeStore();
  const latestResume = getLatestResume();

  const todayData = schedules.find((s) => s.date === today) || { date: today, tasks: [] };
  const completionRate = getCompletionRate(today);
  const streak = getStreak();
  const pendingTasks = todayData.tasks.filter((t) => !t.completed).slice(0, 4);
  const doneTasks = todayData.tasks.filter((t) => t.completed).length;
  const lastInterview = sessions[0];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'milestone':
        return <Award className="w-4 h-4 text-purple-600" />;
      case 'started':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'milestone':
        return 'bg-purple-50 border-purple-200';
      case 'started':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {greeting}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your learning progress and recommendations
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/app/schedule">
            <Button variant="outline" size="sm">
              <CalendarDays className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </Link>
          <Link to="/app/mock-interview">
            <Button size="sm">
              <Brain className="w-4 h-4 mr-2" />
              Mock Interview
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.link}>
                <div className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${action.color}`}>
                  <action.icon className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold mb-1">{action.label}</h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LearningActivityChart />
        <SkillsChart />
      </div>

      {/* Today's Schedule + Interview Summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule Widget */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="w-4 h-4 text-primary" />
              Today's Schedule
              {streak > 0 && (
                <span className="flex items-center gap-1 text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                  <Flame className="w-3 h-3" /> {streak}d
                </span>
              )}
            </CardTitle>
            <Link to="/app/schedule">
              <Button variant="ghost" size="sm" className="text-xs">
                Open <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {todayData.tasks.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{doneTasks}/{todayData.tasks.length} done</span>
                  <span className="font-bold text-primary">{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
                <div className="space-y-2 mt-2">
                  {pendingTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(today, task.id)}
                      className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <Circle className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                      <span className="text-sm truncate">{task.title}</span>
                      <Badge
                        variant="outline"
                        className={`ml-auto text-xs shrink-0 ${
                          task.priority === 'high' ? 'border-red-200 text-red-600' :
                          task.priority === 'medium' ? 'border-yellow-200 text-yellow-600' :
                          'border-green-200 text-green-600'
                        }`}
                      >
                        {task.priority}
                      </Badge>
                    </button>
                  ))}
                  {todayData.tasks.length > 4 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{todayData.tasks.length - 4} more tasks
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <CalendarDays className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">No tasks scheduled for today</p>
                <Link to="/app/schedule">
                  <Button variant="outline" size="sm" className="mt-3">Plan my day</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mock Interview Widget */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="w-4 h-4 text-primary" />
              Mock Interview
            </CardTitle>
            <Link to="/app/mock-interview">
              <Button variant="ghost" size="sm" className="text-xs">
                Start <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {lastInterview ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Last Session</p>
                    <p className="text-xs text-muted-foreground">{lastInterview.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(lastInterview.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      lastInterview.totalScore >= 75 ? 'text-green-600' :
                      lastInterview.totalScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {lastInterview.totalScore}%
                    </p>
                    <p className="text-xs text-muted-foreground">{lastInterview.questions.length} questions</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress
                    value={lastInterview.totalScore}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{sessions.length} total sessions</span>
                    <span>
                      Avg: {Math.round(sessions.reduce((s, sess) => s + sess.totalScore, 0) / sessions.length)}%
                    </span>
                  </div>
                </div>
                <Link to="/app/mock-interview">
                  <Button variant="outline" size="sm" className="w-full">Practice Again</Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <Brain className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">No interviews yet</p>
                <p className="text-xs text-muted-foreground mt-1">Practice builds confidence</p>
                <Link to="/app/mock-interview">
                  <Button size="sm" className="mt-3">Start Practice</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resume Analyzer Widget */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="w-4 h-4 text-primary" /> Resume Analysis
          </CardTitle>
          <Link to="/app/resume">
            <Button variant="ghost" size="sm" className="text-xs">
              {latestResume ? 'Re-analyze' : 'Analyze'} <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {latestResume ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <FileText className="w-8 h-8 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{latestResume.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {latestResume.targetRole} · {new Date(latestResume.analyzedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    latestResume.readinessScore >= 75 ? 'text-green-600' :
                    latestResume.readinessScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>{latestResume.readinessScore}%</p>
                  <p className="text-xs text-muted-foreground">fit</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-blue-50">
                  <p className="font-bold text-blue-700">{latestResume.detectedSkills.length}</p>
                  <p className="text-muted-foreground">Skills</p>
                </div>
                <div className="p-2 rounded-lg bg-orange-50">
                  <p className="font-bold text-orange-700">{latestResume.missingSkills.length}</p>
                  <p className="text-muted-foreground">Missing</p>
                </div>
                <div className="p-2 rounded-lg bg-green-50">
                  <p className="font-bold text-green-700">{latestResume.atsScore}%</p>
                  <p className="text-muted-foreground">ATS</p>
                </div>
              </div>
              {latestResume.prioritySkills.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  🎯 Top priority: <span className="font-medium text-foreground">{latestResume.prioritySkills[0].skill}</span>
                  {' '}— {latestResume.prioritySkills[0].timeToLearn}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <FileText className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">No resume analyzed yet</p>
              <p className="text-xs text-muted-foreground mt-1">Upload your resume to get AI insights</p>
              <Link to="/app/resume">
                <Button size="sm" className="mt-3">Analyze Resume</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${getActivityColor(activity.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
