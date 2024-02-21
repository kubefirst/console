'use client';
import styled from 'styled-components';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Column from '../Column/Column';
import NextLinkComp from '../NextLink/NextLink';
import Row from '../Row/Row';
import Typography from '../Typography/Typography';
import TextFieldWithRef from '../TextField/TextField';

import { LAUGHING_ORANGE, VOLCANIC_SAND } from '@/constants/colors';

export const Container = styled(Row)`
  gap: 16px;
`;

export const Content = styled(Column)`
  gap: 8px;
`;

export const ErrorIcon = styled(ErrorOutlineIcon).attrs({ htmlColor: LAUGHING_ORANGE })``;

export const Footer = styled(Row)`
  gap: 8px;
  justify-content: flex-end;
`;

export const GapContainer = styled(Column)`
  gap: 32px;
`;

export const MainMessage = styled(Typography).attrs({ variant: 'subtitle2' })`
  color: ${VOLCANIC_SAND};
`;
export const Text = styled(MainMessage).attrs({ variant: 'body2' })``;

export const TextField = styled(TextFieldWithRef).attrs({ required: true })`
  width: 100%;
`;

export const NextLink = styled(NextLinkComp)`
  a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
`;
