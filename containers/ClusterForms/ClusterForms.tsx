import React, { FunctionComponent } from 'react';

import NoSSRTerminal from '../TerminalLogs/NoSSRTerminal';

import AuthForm from './shared/AuthForm/AuthForm';
import ClusterRunning from './shared/ClusterRunning';
import SetupForm from './shared/SetupForm';

import { FormStep } from '@/constants/installation';

const FORM_FLOW_MAP = {
  [FormStep.AUTHENTICATION]: AuthForm,
  [FormStep.SETUP]: SetupForm,
  [FormStep.PROVISIONING]: NoSSRTerminal,
  [FormStep.READY]: ClusterRunning,
};

export const ClusterForms: FunctionComponent<{ currentStep: FormStep }> = ({ currentStep }) => {
  const ActiveFormStep = FORM_FLOW_MAP[currentStep];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep />;
};
