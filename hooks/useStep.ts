import { useState } from 'react';

export default function useStep(startingStep = 0) {
  const [currentStep, setCurrentStep] = useState(startingStep);

  return {
    currentStep,
    goTo: (step: number) => setCurrentStep(step),
    goToPrev: () => setCurrentStep(currentStep - 1),
    goToNext: () => setCurrentStep(currentStep + 1),
    goToFirstStep: () => setCurrentStep(1),
  };
}
