import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROLES } from '@/lib/constants';

interface RoleSelectorProps {
  selectedRole: string | null;
  onSelectRole: (roleId: string) => void;
  onNext: () => void;
}

export const RoleSelector = ({
  selectedRole,
  onSelectRole,
  onNext,
}: RoleSelectorProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold font-display">
          What role are you preparing for?
        </h2>
        <p className="text-muted-foreground">
          We'll customize your simulation based on the skills that matter most
          for this role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROLES.map((role) => (
          <Card
            key={role.id}
            variant={selectedRole === role.id ? 'elevated' : 'interactive'}
            className="p-6 cursor-pointer transition-all"
            onClick={() => onSelectRole(role.id)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{role.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedRole === role.id
                    ? 'border-primary bg-primary'
                    : 'border-muted'
                }`}
              >
                {selectedRole === role.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" disabled>
          ← Back
        </Button>
        <Button onClick={onNext} disabled={!selectedRole}>
          Continue →
        </Button>
      </div>
    </div>
  );
};
