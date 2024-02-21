'use client';
import React, { ComponentPropsWithoutRef, FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

import { Container, FormContent } from './FormContainer.styled';

interface FormContainerProps extends ComponentPropsWithoutRef<'div'> {
  footerContent?: ReactNode;
}

const FormContainer: FunctionComponent<FormContainerProps> = ({
  children,
  footerContent,
  ...rest
}) => (
  <Container {...rest}>
    <FormContent>{children}</FormContent>
    {footerContent}
  </Container>
);

export default styled(FormContainer)<FormContainerProps>``;
