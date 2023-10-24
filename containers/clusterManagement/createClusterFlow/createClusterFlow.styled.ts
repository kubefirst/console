'use client';
import styled from 'styled-components';
import { Box } from '@mui/material';

import Row from '@/components/row';
import Column from '@/components/column';
import HeadsUpNotification from '@/components/headsUpNotification';
import { CHEFS_HAT } from '@/constants/colors';

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FormContent = styled(Column)`
  flex: 1;
  padding: 0 24px;
  overflow-y: auto;

  ${HeadsUpNotification} {
    margin-top: 20px;
  }
`;

export const Menu = styled(Box)`
  position: absolute;
  bottom: -60px;
  left: -95px;
  width: 160px;
  background-color: white;
  border: 1px solid ${CHEFS_HAT};
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(100, 116, 139, 0.25);
  z-index: 1;
`;

export const MenuHeader = styled(Row)`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.volcanicSand};
  height: 70px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 24px;
  border-bottom: 1px solid #e2e8f0;
`;
