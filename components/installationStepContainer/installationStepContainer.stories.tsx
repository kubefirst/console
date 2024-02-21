import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { LocalFormStep } from '../../constants/installation';
import { GitProvider } from '../../types';
import { useInstallation } from '../../hooks/useInstallation';
import useStep from '../../hooks/useStep';
import { InstallationType } from '../../types/redux';

import InstallationStepContainer from './InstallationStepContainer';

const meta: Meta<typeof InstallationStepContainer> = {
  component: InstallationStepContainer,
};

export default meta;

const InstallationStepContainerWithHooks = () => {
  const { stepTitles, installTitles } = useInstallation(
    InstallationType.LOCAL,
    GitProvider.GITHUB,
    LocalFormStep.SETUP,
  );
  const { currentStep, goToPrev } = useStep(0);

  const installTitle = installTitles[currentStep];

  return (
    <InstallationStepContainer
      installationTitle={installTitle}
      steps={stepTitles}
      activeStep={currentStep}
      showBackButton={currentStep > 0}
      onBackButtonClick={goToPrev}
      isProvisionStep={false}
      showNextButton
    >
      <h1 style={{ margin: '0 auto' }}>Current Step: {currentStep}</h1>
    </InstallationStepContainer>
  );
};

export const Default: StoryObj<typeof InstallationStepContainer> = {
  render: () => <InstallationStepContainerWithHooks />,
};
