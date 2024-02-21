'use client';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import Typography from '../Typography/Typography';
import Button from '../Button/Button';

import TooltipComponent from './Tooltip';

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 150px;
`;

const meta: Meta<typeof TooltipComponent> = {
  component: TooltipComponent,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

export const DefaultTemplate: StoryObj<typeof TooltipComponent> = {
  render: () => (
    <TooltipComponent title="This is a tooltip" placement="bottom">
      <Button variant="contained" color="primary">
        <Typography variant="body2">Hover here</Typography>
      </Button>
    </TooltipComponent>
  ),
};
