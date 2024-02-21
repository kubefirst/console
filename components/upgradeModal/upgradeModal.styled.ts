'use client';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

import Column from '../Column/Column';
import Row from '../Row/Row';

import { MIDNIGHT_EXPRESS } from '@/constants/colors';

export const Container = styled(Column)`
  background-color: ${MIDNIGHT_EXPRESS};
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(100, 116, 139, 0.1);
  padding: 16px 24px;
  height: 408px;
  width: 400px;
`;

export const Content = styled(Column)`
  align-items: center;
  margin: 24px;
`;

export const Close = styled(CloseIcon)`
  cursor: pointer;
  position: fixed;
  top: 25px;
  right: 25px;
`;

export const Footer = styled(Row)`
  gap: 16px;
  justify-content: center;
  padding: 16px 24px;
`;

export const Header = styled(Row)`
  gap: 16px;
  padding-top: 24px;
  text-transform: capitalize;
`;
