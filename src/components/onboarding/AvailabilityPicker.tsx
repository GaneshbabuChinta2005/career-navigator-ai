import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TIME_PREFERENCES } from '@/lib/constants';

interface AvailabilityPickerProps {
  weeklyHours: number;
  preferredTime: 'morning' | 'afternoon' | 'evening' | null;
  onUpdateHours: (hours: number) => void;
  onUpdateTime: (time: 'morning' | 'afternoon' | 'evening') => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AvailabilityPicker = ({
  weeklyHours,
  preferredTime,
  onUpdateHours,
  onUpdateTime,
  onNext,
  onPrev,
}: AvailabilityPickerProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold font-display">
          How much time can you dedicate?
        </h2>
        <p className="text-muted-foreground">
          This helps us create a realistic and achievable roadmap for you.
        </p>
      </div>

      {/* Weekly Hours */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">
            Weekly study hours: <span className="text-primary">{weeklyHours}h</span>
          </label>
          <p className="text-xs text-muted-foreground mt-1">
            How many hours per week can you dedicate to learning?
          </p>
        </div>
        <Slider
          min={0}
          max={40}
          step={5}
          value={[weeklyHours]}
          onValueChange={(value) => onUpdateHours(value[0])}
          className="w-full"
        />
      </div>

      {/* Preferred Time */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Preferred learning time</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TIME_PREFERENCES.map((time) => (
            <button
              key={time.id}
              onClick={() =>
                onUpdateTime(
                  time.id as 'morning' | 'afternoon' | 'evening'
                )
              }
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                preferredTime === time.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onPrev}>
          ← Back
        </Button>
        <Button onClick={onNext} disabled={!preferredTime || weeklyHours === 0}>
          Complete Setup →
        </Button>
      </div>
    </div>
  );
};
