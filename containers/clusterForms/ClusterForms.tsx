import React, { FunctionComponent } from 'react';

import TerminalLogs from '../TerminalLogs/NoSSRTerminal';
import { FormStep } from '../../constants/installation';

import AuthForm from './shared/AuthForm/AuthForm';
import ClusterRunning from './shared/clusterRunning';
import SetupForm from './shared/setupForm';

const FORM_FLOW_MAP = {
  [FormStep.AUTHENTICATION]: AuthForm,
  [FormStep.SETUP]: SetupForm,
  [FormStep.PROVISIONING]: TerminalLogs,
  [FormStep.READY]: ClusterRunning,
};

export const ClusterForms: FunctionComponent<{ currentStep: FormStep }> = ({ currentStep }) => {
  const ActiveFormStep = FORM_FLOW_MAP[currentStep];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep />;
};
