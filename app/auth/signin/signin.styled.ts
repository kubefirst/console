'use client';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Link from 'next/link';

import Typography from '../../../components/Typography/Typography';

import { CELERY_MOUSSE } from '@/constants/colors';
import { media } from '@/utils/media';
import Column from '@/components/Column/Column';

export const Background = styled.div`
  align-items: center;
  background: linear-gradient(to right, #181626 19%, #3c356c 72.6%, #d0bae9 180%);
  display: none;
  flex-direction: column;
  padding-bottom: 34px;
  padding-top: 80px;
  width: calc(100% - 400px);
  justify-content: space-between;

  ${media.greaterThan('md')`
    display: flex;
  `}
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Content = styled(Column)`
  align-items: center;
  justify-content: center;
`;

export const Form = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Panel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 40px;
  position: relative;
  width: 400;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  width: 478px;
`;

export const ExternalLink = styled(Link)`
  color: ${CELERY_MOUSSE};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
