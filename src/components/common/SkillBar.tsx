import { cn } from "@/lib/utils";
import { SKILL_LEVELS } from "@/lib/constants";
import type { SkillLevel } from "@/types/skill";

interface SkillBarProps {
  name: string;
  level: SkillLevel;
  maxLevel?: number;
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function SkillBar({ 
  name, 
  level, 
  maxLevel = 5, 
  showLabel = true,
  size = "md",
  className 
}: SkillBarProps) {
  const percentage = (level / maxLevel) * 100;
  const levelInfo = SKILL_LEVELS.find(l => l.level === level);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className={cn(
          "font-medium",
          size === "sm" ? "text-sm" : "text-base"
        )}>
          {name}
        </span>
        <span className="text-sm text-muted-foreground font-mono">
          {level}/{maxLevel}
        </span>
      </div>
      <div className={cn(
        "w-full rounded-full bg-muted overflow-hidden",
        size === "sm" ? "h-2" : "h-3"
      )}>
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && levelInfo && (
        <p className="text-xs text-muted-foreground italic">
          "{levelInfo.description}"
        </p>
      )}
    </div>
  );
}
