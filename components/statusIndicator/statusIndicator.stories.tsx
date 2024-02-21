import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import StatusIndicator from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  component: StatusIndicator,
};

export default meta;

export const Default: StoryObj<typeof StatusIndicator> = {
  args: {
    available: false,
  },
};

export const WithChild: StoryObj<typeof StatusIndicator> = {
  args: {
    available: false,
    children: (
      <a
        target="_blank"
        rel="noreferrer"
        href="https://kubefirst.io"
        style={{ textDecoration: 'none' }}
      >
        Link to something
      </a>
    ),
  },
};
