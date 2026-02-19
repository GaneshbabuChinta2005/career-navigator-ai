import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, X, Plus, Sparkles, Loader2 } from 'lucide-react';
import { aiService } from '@/services/ai/gemini.service';

interface SkillGapItem {
  id: string;
  skill: string;
  priority: 'critical' | 'important' | 'nice-to-have';
  estimatedHours: number;
  completed: boolean;
}

const initialGaps: SkillGapItem[] = [
  { id: '1', skill: 'React Advanced Patterns', priority: 'critical', estimatedHours: 20, completed: false },
  { id: '2', skill: 'System Design', priority: 'important', estimatedHours: 40, completed: false },
  { id: '3', skill: 'TypeScript Generics', priority: 'important', estimatedHours: 15, completed: false },
  { id: '4', skill: 'DevOps & CI/CD', priority: 'nice-to-have', estimatedHours: 25, completed: false },
  { id: '5', skill: 'Testing (Jest/Vitest)', priority: 'critical', estimatedHours: 18, completed: false },
];

const priorityConfig = {
  critical: { label: '🔴 Critical', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  important: { label: '🟡 Important', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  'nice-to-have': { label: '🟢 Nice to Have', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
};

const SkillGap = () => {
  const [gaps, setGaps] = useState<SkillGapItem[]>(initialGaps);
  const [newSkill, setNewSkill] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

  const toggleComplete = (id: string) => {
    setGaps(gaps.map(gap =>
      gap.id === id ? { ...gap, completed: !gap.completed } : gap
    ));
  };

  const removeGap = (id: string) => {
    setGaps(gaps.filter(gap => gap.id !== id));
  };

  const addGap = () => {
    if (!newSkill.trim()) return;

    const newGap: SkillGapItem = {
      id: Date.now().toString(),
      skill: newSkill,
      priority: 'important',
      estimatedHours: 10,
      completed: false,
    };

    setGaps([...gaps, newGap]);
    setNewSkill('');
    setShowAddForm(false);
  };

  const handleAIAnalysis = async () => {
    setAiAnalyzing(true);
    setAiRecommendations([]);

    // Mock skills data
    const userSkills = {
      'React': 75,
      'TypeScript': 60,
      'System Design': 40,
      'Testing': 50,
      'DevOps': 35
    };

    try {
      const analysis = await aiService.analyzeSkillGaps(userSkills, 'Frontend Developer');
      setAiRecommendations(analysis.recommendations);
    } catch (error) {
      console.error('AI analysis error:', error);
    } finally {
      setAiAnalyzing(false);
    }
  };

  const completedCount = gaps.filter(g => g.completed).length;
  const totalHours = gaps.reduce((sum, gap) => sum + gap.estimatedHours, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skill Gap Analysis</h1>
          <p className="text-muted-foreground">
            {completedCount} of {gaps.length} gaps closed · {totalHours} hours total
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAIAnalysis}
            disabled={aiAnalyzing}
            variant="outline"
            className="gap-2"
          >
            {aiAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                AI Analysis
              </>
            )}
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill Gap
          </Button>
        </div>
      </div>

      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Sparkles className="w-5 h-5" />
              AI Recommendations
            </CardTitle>
            <CardDescription>
              Personalized insights based on your skill profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {aiRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-purple-600 mt-0.5">✨</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Skill Gap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skill">Skill Name</Label>
              <Input
                id="skill"
                placeholder="e.g., GraphQL"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGap()}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addGap}>Add</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {gaps.map((gap) => (
          <Card key={gap.id} className={gap.completed ? 'opacity-60' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <button
                    onClick={() => toggleComplete(gap.id)}
                    className={`mt-1 flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${gap.completed
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-muted-foreground/30 hover:border-primary'
                      }`}
                  >
                    {gap.completed && <Check className="h-3 w-3" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-semibold ${gap.completed ? 'line-through' : ''}`}>
                        {gap.skill}
                      </h3>
                      <Badge variant="outline" className={priorityConfig[gap.priority].color}>
                        {priorityConfig[gap.priority].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ⏱️ {gap.estimatedHours} hours estimated
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeGap(gap.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {gaps.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No skill gaps yet. Add your first one above!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillGap;
