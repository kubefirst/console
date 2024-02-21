import React, { FunctionComponent } from 'react';
import { TooltipRenderProps } from 'react-joyride';

import Button from '../Button/Button';

import { TooltipBody, TooltipContent, TooltipFooter, TooltipTitle } from './JoyrideTooltip.styled';

const JoyrideTooltip: FunctionComponent<TooltipRenderProps> = ({
  continuous,
  step,
  closeProps,
  primaryProps,
  tooltipProps,
  isLastStep,
}) => (
  <TooltipBody {...tooltipProps}>
    {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
    <TooltipContent variant="body2">{step.content}</TooltipContent>
    <TooltipFooter>
      {continuous ? (
        <Button color="primary" variant="contained" {...primaryProps}>
          {isLastStep ? "Let's jump into it!" : primaryProps.title}
        </Button>
      ) : (
        <Button color="primary" variant="contained" {...closeProps}>
          {closeProps.title}
        </Button>
      )}
    </TooltipFooter>
  </TooltipBody>
);

export default JoyrideTooltip;
