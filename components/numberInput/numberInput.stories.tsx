import { Meta, StoryObj } from '@storybook/react';

import NumberInput from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  component: NumberInput,
};

export default meta;

export const Default: StoryObj<typeof NumberInput> = {
  args: {
    label: 'Number of nodes',
    inputProps: {
      required: true,
    },
  },
};
