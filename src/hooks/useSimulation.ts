import { useState, useMemo } from 'react';
import { simulateRole } from '@/services/simulation';
import type { RoleId, SimulationResult } from '@/types/role';

export function useSimulation() {
  const [selectedRole, setSelectedRole] = useState<RoleId>('fullstack');

  // Load user data from onboarding
  const userData = useMemo(() => {
    try {
      const saved = localStorage.getItem('onboarding_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          skills: parsed.skills || {},
          projects: parsed.projects || [],
          targetRole: parsed.targetRole || 'fullstack',
        };
      }
    } catch {}
    return {
      skills: { dsa: 3, frontend: 4, backend: 2, database: 3, 'system-design': 1, devops: 2 },
      projects: [{ complexity: 3 }],
      targetRole: 'fullstack',
    };
  }, []);

  const result: SimulationResult = useMemo(
    () => simulateRole(selectedRole, userData.skills, userData.projects),
    [selectedRole, userData]
  );

  return {
    selectedRole,
    setSelectedRole,
    result,
    userData,
  };
}
