'use client';
import React from 'react';
import styled from 'styled-components';
import { Meta, StoryObj } from '@storybook/react';

import TextFieldComponent from './TextField';

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;

const meta: Meta<typeof TextFieldComponent> = {
  title: 'Form Elements/TextField',
  component: TextFieldComponent,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TextFieldComponent>;

export const Default: Story = {
  args: {
    label: 'Default',
    fullWidth: true,
    helperText: 'test',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    color: 'primary',
    disabled: true,
    value: 'Text',
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    required: true,
    error: true,
    id: 'standard-error-helper-text',
    helperText: 'Incorrect entry.',
  },
};
