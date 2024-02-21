import { Meta, StoryObj } from '@storybook/react';

import Progress from './Progress';

const meta: Meta<typeof Progress> = {
  component: Progress,
};

export default meta;

export const Default: StoryObj<typeof Progress> = {
  args: {
    steps: ['Select platform', 'Readiness check', 'Set up cluster', 'Preparing', 'Ready'],
    activeStep: 0,
  },
};
