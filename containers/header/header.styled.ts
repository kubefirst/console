'use client';
import styled from 'styled-components';
import { Avatar as AvatarMui, Box } from '@mui/material';

import row from '@/components/Row/Row';
import { CHEFS_HAT } from '@/constants/colors';

export const Avatar = styled(AvatarMui)`
  cursor: pointer;
`;

export const Container = styled(row)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 4px rgba(31, 41, 55, 0.06);
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  min-height: 64px;
  padding: 0 24px;
  width: calc(100% - 50px);

  & > svg {
    cursor: pointer;
  }
`;

export const Menu = styled(Box)`
  position: absolute;
  bottom: -180px;
  right: 80px;
  width: 215px;
  background-color: white;
  border: 1px solid ${CHEFS_HAT};
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(100, 116, 139, 0.25);
  z-index: 1;
`;

export const ProfileMenu = styled(Box)`
  position: absolute;
  top: 60px;
  right: 20px;
  width: 215px;
  background-color: white;
  border: 1px solid ${CHEFS_HAT};
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(100, 116, 139, 0.25);
  z-index: 1;
`;
