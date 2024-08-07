'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';

import Typography from '@/components/Typography/Typography';
import Column from '@/components/Column/Column';
import Row from '@/components/Row/Row';
import Drawer from '@/components/Drawer/Drawer';
import { VOLCANIC_SAND } from '@/constants/colors';

export const Content = styled(Column)`
  flex: 1;
  width: 100%;
`;

export const Description = styled(Typography)`
  color: ${VOLCANIC_SAND};
  margin-top: 8px;
`;

export const Header = styled(Row)`
  color: ${({ theme }) => theme.colors.volcanicSand};
  height: 70px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-top: 1px solid #e2e8f0;
`;

export const LearnMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

export const LeftContainer = styled(Row)`
  align-items: center;
  margin-left: 24px;
  gap: 42px;
`;

export const StyledDrawer = muiStyled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'isBannerOpen',
})(({ isBannerOpen }: { isBannerOpen: boolean }) => ({
  '&.MuiDrawer-root': {
    '.MuiBackdrop-root': {
      backgroundColor: 'transparent',
    },
  },
  '.MuiDrawer-paper': {
    top: isBannerOpen ? '72px' : '65px',
    boxShadow: '0px 2px 4px rgba(100, 116, 139, 0.16)',
    width: '684px',
    height: 'calc(100% - 65px)',
  },
}));
