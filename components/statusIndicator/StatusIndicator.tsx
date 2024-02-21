import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

import { AvailabilityIdicator, Container } from './StatusIndicator.styled';

import { MINT_GREEN, PASTEL_LIGHT_BLUE } from '@/constants/colors';

interface StatusIdicatorProps extends Omit<ComponentPropsWithoutRef<'div'>, 'key'> {
  available?: boolean;
}

const StatusIdicator: FunctionComponent<StatusIdicatorProps> = ({
  available,
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <AvailabilityIdicator color={available ? MINT_GREEN : PASTEL_LIGHT_BLUE} />
      {children}
      {!available && <CircularProgress size={15} />}
    </Container>
  );
};

export default styled(StatusIdicator)<StatusIdicatorProps>``;
