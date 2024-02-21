import React, { FunctionComponent, ReactNode } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { Close, Container, Text } from './Banner.styled';

import { IVY_LEAGUE, RED_VITALITY, WHITE } from '@/constants/colors';

export type BannerType = 'success' | 'error';

export interface BannerProps {
  children: ReactNode | string;
  close: () => void;
  type: BannerType;
}

const BANNER_OPTIONS: Record<
  BannerType,
  { icon: OverridableComponent<SvgIconTypeMap> & { muiName: string }; backgroundColor: string }
> = {
  success: {
    icon: CheckCircleIcon,
    backgroundColor: IVY_LEAGUE,
  },
  error: {
    icon: ErrorIcon,
    backgroundColor: RED_VITALITY,
  },
};

const Banner: FunctionComponent<BannerProps> = ({ children, close, type }) => {
  const { backgroundColor, icon: Icon } = BANNER_OPTIONS[type];

  return (
    <Container backgroundColor={backgroundColor}>
      <Icon htmlColor={WHITE} />
      <Text>{children}</Text>
      <Close onClick={close} htmlColor={WHITE} fontSize="medium" />
    </Container>
  );
};

export default Banner;
