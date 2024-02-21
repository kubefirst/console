import React, { FunctionComponent } from 'react';
import Fade from '@mui/material/Fade';
import { TooltipProps } from '@mui/material/Tooltip';

import Typography from '../Typography/Typography';

import { StyledTooltip } from './Tooltip.styled';

export interface ITooltipProps extends TooltipProps {
  maxWidth?: string;
  whiteSpace?: string;
}

const Tooltip: FunctionComponent<ITooltipProps> = ({ children, title, ...rest }) => (
  <StyledTooltip
    {...rest}
    title={<Typography variant="tooltip">{title}</Typography>}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
    arrow={true}
  >
    <span>{children}</span>
  </StyledTooltip>
);

export default Tooltip;
