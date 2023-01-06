import React, { FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import TooltipMUI, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import Typography from '../typography';

const Tooltip: FunctionComponent<TooltipProps> = ({ children, title, ...props }) => {
  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <TooltipMUI {...props} arrow classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#334155',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      alignItems: 'center',
      backgroundColor: '#334155',
      borderRadius: '2px',
      display: 'flex',
      height: '34px',
    },
  }));

  return (
    <StyledTooltip
      {...props}
      title={<Typography variant="tooltip">{title}</Typography>}
      placement="bottom"
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      arrow
    >
      <span>{children}</span>
    </StyledTooltip>
  );
};

export default Tooltip;
