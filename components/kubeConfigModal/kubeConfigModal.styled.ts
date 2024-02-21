import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';
import { ErrorOutlineOutlined } from '@mui/icons-material';

import Row from '../Row/Row';
import Column from '../Column/Column';
import Typography from '../Typography/Typography';

import { PRIMARY, TRUE_BLUE, VOLCANIC_SAND } from '@/constants/colors';

export const ButtonContainer = styled(Row)`
  justify-content: flex-end;
  margin-top: 18px;
`;

export const Content = styled(Column)`
  width: 100%;
  gap: 8px;
`;

export const ExclamationIcon = muiStyled(ErrorOutlineOutlined)(() => ({
  height: '24px',
  width: '24px',
  fill: TRUE_BLUE,
}));

export const ExternalLink = styled.a`
  text-decoration: none;
  color: ${PRIMARY};
`;

export const Main = styled(Row)`
  gap: 16px;
`;

export const StyledTypography = muiStyled(Typography)(() => ({
  color: VOLCANIC_SAND,
}));
