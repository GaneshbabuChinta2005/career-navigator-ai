import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { SKILL_LEVELS } from '@/lib/constants';

const SKILLS = [
  { id: 'dsa', name: 'Data Structures & Algorithms' },
  { id: 'frontend', name: 'Frontend (React/Vue/Angular)' },
  { id: 'backend', name: 'Backend (Node/Python/Java)' },
  { id: 'database', name: 'Databases (SQL/NoSQL)' },
  { id: 'system-design', name: 'System Design' },
  { id: 'devops', name: 'DevOps & Cloud' },
];

interface SkillRaterProps {
  skills: Record<string, number>;
  onUpdateSkill: (skillId: string, level: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const SkillRater = ({
  skills,
  onUpdateSkill,
  onNext,
  onPrev,
}: SkillRaterProps) => {
  const getSkillLabel = (level: number) => {
    const skillLevel = SKILL_LEVELS.find((s) => s.level === level);
    return skillLevel ? skillLevel.label : 'No experience';
  };

  const getSkillDescription = (level: number) => {
    const skillLevel = SKILL_LEVELS.find((s) => s.level === level);
    return skillLevel ? skillLevel.description : '';
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold font-display">Rate your current skills</h2>
        <p className="text-muted-foreground">
          Be honest—this helps us identify real gaps. You can always update
          these later.
        </p>
      </div>

      <div className="space-y-8">
        {SKILLS.map((skill) => (
          <div key={skill.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">{skill.name}</label>
              <span className="text-sm font-mono text-muted-foreground">
                {skills[skill.id]}/5
              </span>
            </div>
            <Slider
              min={0}
              max={5}
              step={1}
              value={[skills[skill.id]]}
              onValueChange={(value) => onUpdateSkill(skill.id, value[0])}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground italic">
              {getSkillDescription(skills[skill.id])}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onPrev}>
          ← Back
        </Button>
        <Button onClick={onNext}>Continue →</Button>
      </div>
    </div>
  );
};
