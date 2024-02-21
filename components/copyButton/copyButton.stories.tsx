'use client';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import CopyButton from './CopyButton';

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const meta: Meta<typeof CopyButton> = {
  component: CopyButton,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof CopyButton> = {
  args: {
    withoutTooltip: false,
    textToCopy: 'nice',
    buttonText: 'nice',
  },
};
