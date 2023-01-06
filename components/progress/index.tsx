import {
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  stepLabelClasses,
  StepLabel,
  Stepper,
  styled,
} from '@mui/material';
import React, { FunctionComponent } from 'react';

import Typography from '../typography';
import themeST from '../../theme';

import { Container } from './progress.styled';

export interface ProgressProps {
  activeStep: number;
  steps: Array<string>;
}

const Label = styled(StepLabel)(() => ({
  [`& .${stepLabelClasses.label}`]: {
    color: '#334155',
  },
  [`& .${stepLabelClasses.disabled}`]: {
    color: themeST.colors.saltboxBlue,
  },
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    left: 'calc(-50% + 26px)',
    right: 'calc(50% + 26px)',
    top: 25,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: '#424867',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: 'transparent',
  border: '2px solid #424867',
  zIndex: 1,
  color: themeST.colors.saltboxBlue,
  width: 52,
  height: 52,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }),
  ...(ownerState.completed && {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {props.icon}
    </ColorlibStepIconRoot>
  );
}

const Progress: FunctionComponent<ProgressProps> = ({ activeStep, steps }) => {
  return (
    <Container>
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
};

export default Progress;
