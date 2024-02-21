import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';

import { CardContainer } from './Card.styled';

export interface CardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'key'> {
  active?: boolean;
  withHoverEffect?: boolean;
}

const Card: FunctionComponent<CardProps> = ({ children, ...rest }) => (
  <CardContainer {...rest}>{children}</CardContainer>
);

export default Card;
