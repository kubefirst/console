import React, { FunctionComponent } from 'react';
import LinearProgressMui, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { ASMANI_SKY, LIGHT_GREY, PRIMARY, VOLCANIC_SAND } from '../../constants/colors';

import { Container } from './LinearProgress.styled';

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  const isCompleted = props.value === 100;
  return (
    <Box sx={{ width: '512px' }}>
      <Box
        sx={{
          minWidth: 35,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle3" color={VOLCANIC_SAND}>
          {isCompleted ? 'Completed!' : 'Provisioning cluster:'}
        </Typography>
        <Typography variant="subtitle3" color={VOLCANIC_SAND}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%', mt: 1 }}>
        <LinearProgressMui
          variant="determinate"
          color="primary"
          {...props}
          sx={{
            'borderRadius': '55px',
            'background': LIGHT_GREY,
            'height': '9px',
            '> span': {
              background: isCompleted
                ? ASMANI_SKY
                : `linear-gradient(270deg, ${PRIMARY} 0%, ${ASMANI_SKY} 100%)`,
              borderRadius: '55px',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export interface LinearProgressParams {
  progress: number;
}

const LinearProgress: FunctionComponent<LinearProgressParams> = ({ progress }) => {
  return (
    <Container>
      <LinearProgressWithLabel value={progress} />
    </Container>
  );
};

export default LinearProgress;
