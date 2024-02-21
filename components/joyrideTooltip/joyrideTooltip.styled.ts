import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';

import Column from '../Column/Column';
import Row from '../Row/Row';
import Typography from '../Typography/Typography';

import { ECHO_BLUE, MIDNIGHT_EXPRESS, WHITE } from '@/constants/colors';

export const TooltipBody = styled(Column)`
  background-color: ${MIDNIGHT_EXPRESS};
  border-radius: 12px;
  padding: 24px;
  gap: 12px;
  width: 372px;
`;

export const TooltipContent = muiStyled(Typography)(() => ({
  color: `${WHITE}`,
  fontWeight: 400,
}));

export const TooltipFooter = styled(Row)``;

export const TooltipTitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${ECHO_BLUE};
  margin: 0;
`;
