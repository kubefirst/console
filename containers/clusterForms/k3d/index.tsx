import React, { FunctionComponent } from 'react';

import ClusterRunningMessage from '../shared/clusterRunning';
import TerminalLogs from '../../TerminalLogs/NoSSRTerminal';
import { LocalFormStep } from '../../../constants/installation';

import { LocalSetupForm } from './setupForm';
import { ContentContainer } from './k3d.styled';

const K3D_FORM_FLOW = {
  [LocalFormStep.SETUP]: LocalSetupForm,
  [LocalFormStep.PROVISIONING]: TerminalLogs,
  [LocalFormStep.READY]: ClusterRunningMessage,
};

export const LocalFormFlow: FunctionComponent<{ currentStep: LocalFormStep }> = ({
  currentStep,
}) => {
  const ActiveFormStep = K3D_FORM_FLOW[currentStep];

  if (!ActiveFormStep) {
    return null;
  }

  return (
    <ContentContainer>
      <ActiveFormStep />
    </ContentContainer>
  );
};
