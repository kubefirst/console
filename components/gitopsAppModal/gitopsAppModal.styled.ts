'use client';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

import Column from '../Column/Column';
import Row from '../Row/Row';

export const Container = styled(Column)`
  max-width: 630px;
  min-width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(100, 116, 139, 0.1);
`;

export const Content = styled(Column)`
  gap: 24px;
  padding: 32px 24px;
  min-height: 148px;
  max-height: 50vh;
  overflow-y: scroll;
`;

export const Close = styled(CloseIcon)`
  cursor: pointer;
  position: fixed;
  top: 25px;
  right: 25px;
`;

export const Footer = styled(Row)`
  gap: 16px;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
`;

export const Header = styled(Row)`
  gap: 16px;
  padding: 24px;
  text-transform: capitalize;
  border-bottom: 1px solid #e0e0e0;
`;
