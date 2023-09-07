import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import lightningBolt from '../../assets/lightningBolt.svg';
import roundedClose from '../../assets/closeRounded.svg';

import {
  CloseButton,
  HeadsUp,
  Info,
  LogoContainer,
  Message,
  Root,
} from './headsUpNotification.styled';

interface HeadsUpNotificationProps extends ComponentPropsWithoutRef<'div'> {
  onClose: () => void;
}

const HeadsUpNotification: FunctionComponent<HeadsUpNotificationProps> = (props) => {
  return (
    <Root {...props}>
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
      <CloseButton>
        <Image src={roundedClose} height={16} width={16} alt="close" />
      </CloseButton>
    </Root>
  );
};

export default styled(HeadsUpNotification)<HeadsUpNotificationProps>``;
