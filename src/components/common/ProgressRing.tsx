import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizes = {
  sm: { ring: 80, stroke: 6, text: "text-lg" },
  md: { ring: 120, stroke: 8, text: "text-2xl" },
  lg: { ring: 160, stroke: 10, text: "text-4xl" },
};

export function ProgressRing({ 
  value, 
  size = "md", 
  showLabel = true, 
  label,
  className 
}: ProgressRingProps) {
  const { ring, stroke, text } = sizes[size];
  const radius = (ring - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={ring} height={ring} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
        />
        {/* Progress circle */}
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold font-display", text)}>
            {Math.round(value)}%
          </span>
          {label && (
            <span className="text-xs text-muted-foreground mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}
