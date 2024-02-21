import React, { FunctionComponent } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepIconProps } from '@mui/material/StepIcon';
import CheckIcon from '@mui/icons-material/Check';

import Typography from '../Typography/Typography';

import {
  CompletedStep,
  ColorlibStepIconRoot,
  Container,
  Label,
  ColorlibConnector,
} from './Progress.styled';

export interface ProgressProps {
  activeStep: number;
  steps: Array<string>;
}

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return completed ? (
    <CompletedStep>
      <CheckIcon color="primary" />
    </CompletedStep>
  ) : (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {props.icon}
    </ColorlibStepIconRoot>
  );
}

const Progress: FunctionComponent<ProgressProps> = ({ activeStep, steps, ...rest }) => (
  <Container {...rest}>
    <Stepper activeStep={activeStep} alternativeLabel connector={<ColorlibConnector />}>
      {steps &&
        steps.map((label) => (
          <Step key={label} sx={{ width: 130 }}>
            <Label StepIconComponent={ColorlibStepIcon}>
              <Typography variant="subtitle2">{label}</Typography>
            </Label>
          </Step>
        ))}
    </Stepper>
  </Container>
);

export default Progress;
