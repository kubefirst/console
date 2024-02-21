'use client';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';

import Column from '../Column/Column';
import Typography from '../Typography/Typography';

import { media } from '@/utils/media';

export const Container = styled(Column)`
  align-items: center;
  color: ${({ theme }) => theme.colors.volcanicSand};
  width: 100%;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.white};
  text-transform: none;
  text-decoration: none;
`;

export const Title = muiStyled(Typography)(() => ({
  'margin': '40px 0 16px 0',
  'textAlign': 'center',

  '& strong': {
    fontSize: '16px',
  },
}));

export const PasswordContainer = styled(Column)`
  align-items: center;
  gap: 8px;
  margin: 18px 0 32px 0;
  width: 100%;
  max-width: 470px;

  ${media.greaterThan('sm')`
    flex-direction: row;
  `}
`;
