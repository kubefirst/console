'use client';
import React from 'react';
import styled from 'styled-components';
import { Meta, StoryObj } from '@storybook/react';

import CheckboxComponent from './Checkbox';

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  height: 100vh;
  align-items: center;
`;

const meta: Meta<typeof CheckboxComponent> = {
  component: CheckboxComponent,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof CheckboxComponent> = {
  args: {
    required: true,
  },
};

export const Checked: StoryObj<typeof CheckboxComponent> = {
  args: {
    checked: true,
  },
};

export const Disabled: StoryObj<typeof CheckboxComponent> = {
  args: {
    disabled: true,
  },
};
