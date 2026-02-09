import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
  onSkip?: () => void;
}

export const OnboardingLayout = ({
  children,
  step,
  totalSteps,
  onSkip,
}: OnboardingLayoutProps) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-12">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip for now
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};
