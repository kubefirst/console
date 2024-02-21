'use client';
import React from 'react';
import styled from 'styled-components';
import { Meta, StoryObj } from '@storybook/react';

import PasswordComponent from './Password';

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;

const meta: Meta<typeof PasswordComponent> = {
  title: 'Form Elements/Password',
  component: PasswordComponent,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof PasswordComponent> = {
  args: {
    label: 'Password',
  },
};
