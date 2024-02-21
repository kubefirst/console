'use client';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';

import Typography from '../Typography/Typography';
import { textTruncate } from '../../utils/theme';
import { CHEFS_HAT, DR_WHITE, VOLCANIC_SAND } from '../../constants/colors';
import Row from '../Row/Row';
import Column from '../Column/Column';

export const App = styled(Row)`
  align-items: center;
  gap: 16px;
`;

export const Body = styled(Column)`
  height: calc(100% - 30px);
  justify-content: space-between;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 12px;
  height: 194px;
  padding: 24px;
  width: 372px;
`;

export const Category = styled(Row)``;

export const Description = styled(Typography)<{ excludeTruncate: boolean }>`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  margin-top: 8px !important;
  margin-bottom: 16px !important;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ excludeTruncate }) => !excludeTruncate && textTruncate(3)}

  & a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

export const DisplayName = muiStyled(Typography)(() => ({
  textTransform: 'capitalize',
  fontWeight: 600,
  color: VOLCANIC_SAND,
}));

export const Header = styled(Row)`
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Installing = styled(Row)`
  background-color: ${DR_WHITE};
  border: 1px solid ${CHEFS_HAT};
  gap: 16px;
  height: 40px;
  padding: 16px;
  width: calc(100% - 32px);
`;
