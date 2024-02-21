'use client';
import React from 'react';
import { noop } from 'lodash';
import styled from 'styled-components';
import { Meta, StoryObj } from '@storybook/react';

import Navigation from './Navigation';

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const meta: Meta<typeof Navigation> = {
  component: Navigation,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof Navigation> = {
  args: {
    domLoaded: true,
    handleIsActiveItem: () => true,
    handleOpenContent: noop,
    handleOpenGame: noop,
    kubefirstVersion: 'v1.0.0',
    routes: [],
  },
};
