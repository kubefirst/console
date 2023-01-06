import React, { FunctionComponent } from 'react';

import SetupForm from './setupForm';
import PreparingForm from './preparingForm';

enum LOCAL_FORM_STEPS {
  SETUP = 1,
  PREPARING = 2,
}

const LOCAL_FORMS_FLOW = {
  [LOCAL_FORM_STEPS.SETUP]: SetupForm,
  [LOCAL_FORM_STEPS.PREPARING]: PreparingForm,
};

export interface LocalFormsProps {
  step: number;
}

const LocalForms: FunctionComponent<LocalFormsProps> = ({ step }) => {
  const ActiveFormStep = LOCAL_FORMS_FLOW[step as LOCAL_FORM_STEPS];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep />;
};

export default LocalForms;
