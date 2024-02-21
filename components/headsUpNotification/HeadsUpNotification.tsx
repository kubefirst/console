'use client';
import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Image from 'next/image';
import styled from 'styled-components';

import {
  CloseButton,
  HeadsUp,
  Info,
  LogoContainer,
  Message,
  Root,
} from './HeadsUpNotification.styled';

import lightningBolt from '@/assets/lightningBolt.svg';

interface HeadsUpNotificationProps extends Omit<ComponentPropsWithoutRef<'div'>, 'key'> {
  onClose: () => void;
}

const HeadsUpNotification: FunctionComponent<HeadsUpNotificationProps> = ({ onClose, ...rest }) => {
  return (
    <Root {...rest}>
      <LogoContainer>
        <Image src={lightningBolt} height={32} width={32} alt="lightning bolt" />
      </LogoContainer>
      <Info>
        <HeadsUp variant="subtitle3">A heads up!</HeadsUp>
        <Message variant="body3">
          Please note that provisioning physical clusters via the UI may be subject to paywall
          restrictions in the future. We’ll give you plenty of notice when that happens.
        </Message>
      </Info>
      <CloseButton type="button" onClick={onClose}>
        <CloseRoundedIcon />
      </CloseButton>
    </Root>
  );
};

export default styled(HeadsUpNotification)<HeadsUpNotificationProps>``;
