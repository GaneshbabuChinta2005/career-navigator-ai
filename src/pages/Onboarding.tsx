import { useNavigate } from 'react-router-dom';
import {
  OnboardingLayout,
  RoleSelector,
  SkillRater,
  ProjectAdder,
  AvailabilityPicker,
} from '@/components/onboarding';
import { useOnboardingState } from '@/hooks/useOnboardingState';

const Onboarding = () => {
  const navigate = useNavigate();
  const {
    state,
    updateState,
    nextStep,
    prevStep,
    updateSkill,
    addProject,
    removeProject,
    complete,
  } = useOnboardingState();

  const handleSkip = () => {
    navigate('/');
  };

  const handleComplete = () => {
    complete();
    navigate('/dashboard');
  };

  return (
    <OnboardingLayout
      step={state.currentStep}
      totalSteps={4}
      onSkip={handleSkip}
    >
      {state.currentStep === 1 && (
        <RoleSelector
          selectedRole={state.targetRole}
          onSelectRole={(roleId) => updateState({ targetRole: roleId })}
          onNext={nextStep}
        />
      )}

      {state.currentStep === 2 && (
        <SkillRater
          skills={state.skills}
          onUpdateSkill={updateSkill}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {state.currentStep === 3 && (
        <ProjectAdder
          projects={state.projects}
          onAddProject={addProject}
          onRemoveProject={removeProject}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}

      {state.currentStep === 4 && (
        <AvailabilityPicker
          weeklyHours={state.weeklyHours}
          preferredTime={state.preferredTime}
          onUpdateHours={(hours) => updateState({ weeklyHours: hours })}
          onUpdateTime={(time) => updateState({ preferredTime: time })}
          onNext={handleComplete}
          onPrev={prevStep}
        />
      )}
    </OnboardingLayout>
  );
};

export default Onboarding;
