import { useState } from 'react';
import { StatsGrid } from '@/features/dashboard/components/StatsGrid';
import { LearningActivityChart, SkillsChart } from '@/features/dashboard/components/Charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  TrendingUp,
  BookOpen,
  Award,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    icon: Target,
    label: 'Run Simulation',
    description: 'Check role readiness',
    link: '/app/simulation',
    color: 'text-blue-600 bg-blue-50 hover:bg-blue-100'
  },
  {
    icon: TrendingUp,
    label: 'Skill Gap Analysis',
    description: 'Find what to learn',
    link: '/app/skill-gap',
    color: 'text-green-600 bg-green-50 hover:bg-green-100'
  },
  {
    icon: Calendar,
    label: 'View Roadmap',
    description: '30/60/90 day plan',
    link: '/app/roadmap',
    color: 'text-purple-600 bg-purple-50 hover:bg-purple-100'
  },
  {
    icon: Award,
    label: 'Track Progress',
    description: 'See achievements',
    link: '/app/profile',
    color: 'text-orange-600 bg-orange-50 hover:bg-orange-100'
  }
];

const Dashboard = () => {
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  });

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
          <Link to="/app/roadmap">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              View Plan
            </Button>
          </Link>
          <Link to="/app/simulation">
            <Button size="sm">
              <Target className="w-4 h-4 mr-2" />
              Run Simulation
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
