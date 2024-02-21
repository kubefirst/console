import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';

import Typography from '../Typography/Typography';
import Row from '../Row/Row';

import { SALTBOX_BLUE, VOLCANIC_SAND, WASH_ME } from '@/constants/colors';

export const Command = muiStyled(Typography)(() => ({
  fontFamily: 'Roboto Mono',
  fontSize: '12px',
  fontWeight: 500,
  textTransform: 'uppercase',
  width: '450px',
  color: VOLCANIC_SAND,
}));

export const Container = styled(Row)`
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background-color: ${WASH_ME};

  button {
    background-color: ${WASH_ME};
    padding: 16px;

    p {
      font-family: 'Roboto';
      color: ${SALTBOX_BLUE};
      font-size: 14px;
      font-weight: 500;
    }
  }
`;
